"use client";

// Web Audio synthesis layer. No external sound files needed for the prototype.
// Each function returns the AudioContext currentTime when scheduled.

let ctx: AudioContext | null = null;
let roomToneNode: AudioBufferSourceNode | null = null;
let masterGain: GainNode | null = null;

const dbToGain = (db: number) => Math.pow(10, db / 20);

function ensureCtx(): AudioContext {
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    ctx = new Ctor();
    masterGain = ctx.createGain();
    masterGain.gain.value = 1;
    masterGain.connect(ctx.destination);
  }
  return ctx;
}

export async function enableAudio() {
  const c = ensureCtx();
  if (c.state === "suspended") await c.resume();
  return c;
}

export function disableAudio() {
  stopRoomTone();
  if (ctx && ctx.state === "running") void ctx.suspend();
}

// ---- Room tone: filtered pink noise loop, 4s, very quiet ----

function buildPinkNoiseBuffer(c: AudioContext, seconds = 4): AudioBuffer {
  const length = c.sampleRate * seconds;
  const buf = c.createBuffer(1, length, c.sampleRate);
  const data = buf.getChannelData(0);
  // Voss-McCartney pink noise approximation
  let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
  for (let i = 0; i < length; i++) {
    const w = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
    b6 = w * 0.115926;
  }
  return buf;
}

export function startRoomTone(db = -24) {
  const c = ensureCtx();
  if (roomToneNode) return;
  const src = c.createBufferSource();
  src.buffer = buildPinkNoiseBuffer(c, 4);
  src.loop = true;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 1400;
  lp.Q.value = 0.6;
  const gain = c.createGain();
  gain.gain.value = 0;
  src.connect(lp).connect(gain).connect(masterGain!);
  src.start();
  gain.gain.linearRampToValueAtTime(dbToGain(db), c.currentTime + 1.2);
  roomToneNode = src;
}

export function stopRoomTone() {
  if (!roomToneNode || !ctx) return;
  try {
    roomToneNode.stop();
  } catch {
    // already stopped
  }
  roomToneNode = null;
}

// ---- Shutter click: 80ms noise burst, sharp envelope ----

export function playShutter(db = -18) {
  const c = ensureCtx();
  const dur = 0.08;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.15));
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const hp = c.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 2200;
  const gain = c.createGain();
  gain.gain.value = dbToGain(db);
  src.connect(hp).connect(gain).connect(masterGain!);
  src.start();
}

// ---- Slate clap: sharper transient, louder, lower decay ----

export function playSlateClap(db = -12) {
  const c = ensureCtx();
  const dur = 0.22;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const env = Math.exp(-i / (data.length * 0.08));
    data[i] = (Math.random() * 2 - 1) * env;
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 1800;
  bp.Q.value = 1.6;
  const gain = c.createGain();
  gain.gain.value = dbToGain(db);
  src.connect(bp).connect(gain).connect(masterGain!);
  src.start();
}

// ---- Projector tick: very short low-freq click ----

export function playProjectorTick(db = -22) {
  const c = ensureCtx();
  const dur = 0.05;
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.1));
  }
  const src = c.createBufferSource();
  src.buffer = buf;
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 800;
  const gain = c.createGain();
  gain.gain.value = dbToGain(db);
  src.connect(lp).connect(gain).connect(masterGain!);
  src.start();
}
