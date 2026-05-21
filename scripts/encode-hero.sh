#!/usr/bin/env bash
# Encode a source video into the hero pipeline used by 25 Horas.
#
# - Scales to 1280x534 (cover-fit, any source aspect) at 25fps
# - Bakes the Atlântico grade (colorbalance + curves + eq + vignette + grain)
# - Fades to black over the last 0.4s of the clip (cinematic resolve)
# - h264 CRF 22, -g 5 keyframes (every 5 frames) for smooth scrub seeks
# - Strips audio (the site has its own audio layer)
# - Regenerates poster + three BTS stills (bts-1, bts-2, bts-3)
#
# Usage:
#   ./scripts/encode-hero.sh path/to/source.mp4
#   ./scripts/encode-hero.sh ~/Downloads/some-clip.mov
#
# Run from repo root. Source can be any container ffmpeg understands.

set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "usage: $0 <input-video>" >&2
  exit 2
fi

SRC="$1"
OUT_DIR="public/media"
HERO="$OUT_DIR/hero.mp4"
POSTER="$OUT_DIR/hero-poster.jpg"
FADE_DURATION=0.4

if [[ ! -f "$SRC" ]]; then
  echo "error: $SRC not found" >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "error: ffmpeg not installed (try: brew install ffmpeg)" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

echo "[encode-hero] inspecting source..."
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,r_frame_rate,duration,codec_name \
  -of default=nw=1 "$SRC"

SRC_DUR=$(ffprobe -v error -select_streams v:0 \
  -show_entries stream=duration -of default=nw=1:nokey=1 "$SRC")
FADE_START=$(awk -v d="$SRC_DUR" -v f="$FADE_DURATION" \
  'BEGIN { printf "%.3f", d - f }')

echo "[encode-hero] fade-out: ${FADE_DURATION}s starting at ${FADE_START}s"
echo "[encode-hero] encoding $HERO..."

ffmpeg -y -loglevel error -i "$SRC" \
  -vf "fps=25,scale=1280:534:force_original_aspect_ratio=increase:flags=lanczos,crop=1280:534,colorbalance=rs=-0.04:bs=0.04:rm=0.06:bm=-0.04,curves=all='0/0.02 0.5/0.5 1/0.93',eq=saturation=0.88:contrast=1.04:gamma_r=1.02:gamma_b=0.97,vignette=PI/5,noise=alls=5:allf=t+u,fade=t=out:st=${FADE_START}:d=${FADE_DURATION}:color=black" \
  -c:v libx264 -preset slow -crf 22 \
  -g 5 -keyint_min 5 \
  -pix_fmt yuv420p -movflags +faststart \
  -an \
  "$HERO"

DUR=$(ffprobe -v error -select_streams v:0 -show_entries stream=duration -of default=nw=1:nokey=1 "$HERO")
POSTER_TS=$(awk -v d="$DUR" 'BEGIN { printf "%.2f", d * 0.3 }')

echo "[encode-hero] poster frame at ${POSTER_TS}s..."
ffmpeg -y -loglevel error -ss "$POSTER_TS" -i "$HERO" \
  -frames:v 1 -q:v 3 "$POSTER"

echo "[encode-hero] BTS stills..."
rm -f "$OUT_DIR"/bts-*.jpg
i=1
for pct in 20 50 80; do
  TS=$(awk -v d="$DUR" -v p="$pct" 'BEGIN { printf "%.2f", d * (p / 100) }')
  ffmpeg -y -loglevel error -ss "$TS" -i "$HERO" -frames:v 1 -q:v 4 "$OUT_DIR/bts-${i}.jpg"
  i=$((i + 1))
done

SCRUB_RECOMMEND=$(awk -v d="$DUR" 'BEGIN { printf "%.1f", d - 0.3 }')

echo
echo "[encode-hero] done."
ls -lh "$HERO" "$POSTER" "$OUT_DIR"/bts-*.jpg
echo
echo "Note: hero clip is ${DUR}s. Recommended SCRUB_SECONDS in"
echo "      components/reels/HeroSequence.tsx: ~${SCRUB_RECOMMEND}"
