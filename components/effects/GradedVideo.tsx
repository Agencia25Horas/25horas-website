"use client";

import { forwardRef, useEffect, useRef, type Ref } from "react";
import { createGradeShader } from "@/lib/grade-shader";

type Props = {
  src: string;
  poster?: string;
  videoRef?: Ref<HTMLVideoElement>;
  className?: string;
  grain?: number;
  vignette?: number;
  intensity?: number;
  /** Toggle the shader off — shows the raw <video> element instead. */
  graded?: boolean;
};

// A <video> rendered through the Atlântico WebGL grade. The <video> element
// itself is invisible — the canvas displays the graded result. Caller can
// still access the video via `videoRef` for currentTime / play / pause.
export const GradedVideo = forwardRef<HTMLDivElement, Props>(function GradedVideo(
  { src, poster, videoRef, className, grain, vignette, intensity, graded = true },
  wrapperRef,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!graded) return; // bypass the shader entirely
    const canvas = canvasRef.current;
    const video =
      videoRef && typeof videoRef !== "function"
        ? videoRef.current
        : localVideoRef.current;
    if (!canvas || !video) return;

    let shader: ReturnType<typeof createGradeShader> | null = null;
    let cancelled = false;

    const boot = () => {
      if (cancelled) return;
      try {
        shader = createGradeShader(canvas, video, { grain, vignette, intensity });
        shader.start();
      } catch (e) {
        console.warn("[GradedVideo] WebGL grade failed, falling back to raw video", e);
        video.style.opacity = "1";
      }
    };

    if (video.readyState >= 2) {
      boot();
    } else {
      const onReady = () => {
        boot();
        video.removeEventListener("loadeddata", onReady);
      };
      video.addEventListener("loadeddata", onReady);
      return () => {
        cancelled = true;
        video.removeEventListener("loadeddata", onReady);
        shader?.stop();
      };
    }

    return () => {
      cancelled = true;
      shader?.stop();
    };
  }, [src, videoRef, grain, vignette, intensity, graded]);

  // Kick off playback. Muted autoplay is allowed across all browsers.
  useEffect(() => {
    const video =
      videoRef && typeof videoRef !== "function"
        ? videoRef.current
        : localVideoRef.current;
    if (!video) return;
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        // ignored
      }
    };
    void tryPlay();
  }, [src, videoRef]);

  return (
    <div ref={wrapperRef} className={`absolute inset-0 ${className ?? ""}`}>
      <video
        ref={(videoRef as React.Ref<HTMLVideoElement>) ?? localVideoRef}
        src={src}
        poster={poster}
        className={`absolute inset-0 w-full h-full object-cover ${
          graded ? "opacity-0 pointer-events-none" : ""
        }`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        crossOrigin="anonymous"
      />
      {graded && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          aria-hidden
        />
      )}
    </div>
  );
});
