"use client";

// "Atlântico" — the house grade for 25 Horas, applied as a fragment shader
// over the hero reel. Reference look in MANUAL.md §6.4.
//
// Tuning happens here. Edit the constants in the shader and the look updates
// across every video on the site.

const VERT = /* glsl */ `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAG = /* glsl */ `
precision mediump float;

varying vec2 v_uv;
uniform sampler2D u_video;
uniform float u_time;
uniform vec2 u_res;
uniform float u_grain;
uniform float u_vignette;
uniform float u_intensity; // 0 = bypass, 1 = full grade

vec3 atlantico(vec3 c) {
  // Lift shadows + cool the blacks (cyan tint ~ 5%)
  float shadow = 1.0 - smoothstep(0.0, 0.35, max(c.r, max(c.g, c.b)));
  c += vec3(0.0, 0.008, 0.022) * shadow;

  // Warm the midtones (magenta+orange pull)
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  float mid = smoothstep(0.18, 0.7, lum);
  c = mix(c, c * vec3(1.05, 1.015, 0.955), mid);

  // Roll the highlights — soft tonemap
  c = c / (vec3(1.0) + c * 0.32);

  // -10% global desat
  float gray = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(gray), c, 0.9);

  // +15% on warm channels (re-balance after desat)
  c.r *= 1.06;
  c.g *= 1.025;
  c.b *= 0.985;

  return c;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec3 raw = texture2D(u_video, v_uv).rgb;
  vec3 c = mix(raw, atlantico(raw), u_intensity);

  // Tight 35mm-feel grain — modulated by intensity so a reduced-motion path
  // can dial it to 0 cleanly
  float n = (hash(gl_FragCoord.xy * 0.85 + u_time * 60.0) - 0.5) * u_grain;
  c += vec3(n);

  // Subtle vignette — never crushes the corners, just biases attention
  vec2 q = v_uv - 0.5;
  float vig = 1.0 - dot(q, q) * u_vignette;
  c *= vig;

  // Soft warm halation in the brightest highlights (cheap approximation)
  float hi = smoothstep(0.78, 1.0, dot(c, vec3(0.299, 0.587, 0.114)));
  c += vec3(0.04, 0.022, 0.0) * hi;

  gl_FragColor = vec4(clamp(c, 0.0, 1.0), 1.0);
}
`;

export type GradeShader = {
  start: () => void;
  stop: () => void;
};

export function createGradeShader(
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  opts: { grain?: number; vignette?: number; intensity?: number } = {},
): GradeShader {
  const gl =
    canvas.getContext("webgl", {
      antialias: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: "high-performance",
    }) ?? null;

  if (!gl) {
    // No WebGL — let the underlying video show through (caller controls fallback).
    return { start: () => {}, stop: () => {} };
  }

  const grain = opts.grain ?? 0.045;
  const vignette = opts.vignette ?? 0.35;
  const intensity = opts.intensity ?? 1.0;

  // ---- compile shaders ----
  const vs = compile(gl, gl.VERTEX_SHADER, VERT);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "shader link failed");
  }
  gl.useProgram(program);

  // ---- full-screen quad ----
  const quad = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "a_pos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  // ---- video texture ----
  const tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const uVideo = gl.getUniformLocation(program, "u_video");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uRes = gl.getUniformLocation(program, "u_res");
  const uGrain = gl.getUniformLocation(program, "u_grain");
  const uVig = gl.getUniformLocation(program, "u_vignette");
  const uInt = gl.getUniformLocation(program, "u_intensity");

  gl.uniform1i(uVideo, 0);
  gl.uniform1f(uGrain, grain);
  gl.uniform1f(uVig, vignette);
  gl.uniform1f(uInt, intensity);

  let rafId = 0;
  let start = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 1.75);

  const resize = () => {
    const rect = canvas.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width * dpr));
    const h = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    }
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Pause the render loop when the tab is hidden — saves CPU+GPU.
  let paused = false;
  const onVisibility = () => {
    paused = document.visibilityState === "hidden";
  };
  document.addEventListener("visibilitychange", onVisibility);

  let lastUploadedTime = -1;

  const tick = (now: number) => {
    if (!start) start = now;
    rafId = requestAnimationFrame(tick);
    if (paused) return;

    resize();

    if (video.readyState >= 2 && video.videoWidth > 0) {
      // Only re-upload texture when the video frame has actually advanced.
      // For 25fps content this caps texture uploads at 25/s instead of 60/s.
      if (video.currentTime !== lastUploadedTime) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGB,
          gl.RGB,
          gl.UNSIGNED_BYTE,
          video,
        );
        lastUploadedTime = video.currentTime;
      }
    }

    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  return {
    start() {
      if (!rafId) rafId = requestAnimationFrame(tick);
    },
    stop() {
      cancelAnimationFrame(rafId);
      rafId = 0;
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteTexture(tex);
      gl.deleteBuffer(quad);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    },
  };
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const err = gl.getShaderInfoLog(s);
    gl.deleteShader(s);
    throw new Error(err ?? "shader compile failed");
  }
  return s;
}
