"use client";

// Web Audio synthesis layer. No external sound files needed for the prototype.
// Each function returns the AudioContext currentTime when scheduled.

let ctx: AudioContext | null = null;
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
  if (ctx && ctx.state === "running") void ctx.suspend();
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
