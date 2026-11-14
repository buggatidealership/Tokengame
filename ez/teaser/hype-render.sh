#!/bin/bash
# EZ hype film, production render of the 15 s cut (Option A). Needs the static server on :8765 serving ez/.
#   teaser/hype-render.sh OUTDIR [RES]        RES 1080 (default) or 960 (the upscale fallback, about 0.8x the plate cost)
#   env: BET_OK=1        render plates although no bet date is set in the sheet (SIM.betDate / CONFIG.betDate); the LEDs and
#                        "NVIDIA BET" then use the site's fallback rule (NVDA row call date plus one weekday)
#        SKIP_PLATES=1   reuse OUTDIR/plates/frames (each name carries a key of everything the plate is drawn from: data,
#                        camera, ns, RACE_STEP, shader; a stale plate fails to load and the type pass stops)
#        SKIP_TYPE=1     reuse OUTDIR/std/frames and OUTDIR/uk/frames (900 each), e.g. after type passes run alongside the plates
#        DELIVER=v1      also copy the films and posters to ez/media as ez-hype-15s-v1-nonuk.mp4 / -nonuk-poster.jpg and
#                        ez-hype-15s-v1-uk.mp4 / -uk-poster.jpg
# 1. plates: every master frame the cut uses, at each shot's own subframe count (ez-hype.html shot table), named
#    m0000-<plate key>.png. At least 900 must exist before the type passes start (the type pass then refuses any missing one).
# 2. sound: synthesized once (ez-hype-audio.js, two identical cycles, the second kept, so the loop seam is continuous), then a
#    two-pass loudnorm to -14 LUFS / -1 dBTP (linear gain; the page's own limiter has already caught the transients, so the
#    second pass does not fall back to dynamic mode, and a linear gain keeps the seam continuous).
# 3. type: std and uk passes over the same plates, named 0000.png. Encode H.264 High, yuv420p, crf 18, 60 fps, AAC 192k,
#    faststart, converted and tagged BT.709 limited range (untagged BT.601 shifted the up/down greens and reds in players).
#    Outputs: ez-hype-15s-nonuk.mp4 (the std variant: no FCA band, so never post it where UK viewers can see it; X cannot
#    exclude them) and ez-hype-15s-uk.mp4, each with a -poster.jpg (out frame 100).
# Measured here (SwiftShader, no GPU): about 49 min of plates at 1080 (2,942 s before the QA 2026-10-11 changes; the A11 fall at
# ns8 and the split hold at ns4 add a few minutes), about 16 min for both type passes.
set -e
OUT=${1:?usage: hype-render.sh OUTDIR [RES]}; RES=${2:-1080}
EZ=$(cd "$(dirname "$0")/.." && pwd)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd); cd "$EZ"

# --- the bet date gate (compliance must-fix 8): the date is baked into the plates ---
BET=$(node -e "const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('ez-data.js','utf8')+';this.b=(SIM.betDate||CONFIG.betDate||\"\")',c);console.log(c.b)")
if [ -z "$BET" ]; then
  echo "bet date: not set in the sheet (SIM.betDate / CONFIG.betDate); the film would use the fallback rule"
  if [ "$BET_OK" != "1" ] && [ "$SKIP_PLATES" != "1" ]; then echo "refusing the plate pass: set the bet date, or pass BET_OK=1 to accept the fallback"; exit 3; fi
else echo "bet date: $BET (from the sheet)"; fi

# --- 1. plates ---
if [ "$SKIP_PLATES" != "1" ]; then
  PAGE="ez-hype.html?pass=plate&cut=15&res=$RES" READY_MS=180000 node teaser/render.js full "$OUT/plates"
fi
NP=$(ls "$OUT/plates/frames" | grep -c '^m[0-9]\{4\}-[0-9a-f]\{8\}\.png$' || true)
[ "$NP" -ge 900 ] || { echo "expected at least 900 plates in $OUT/plates/frames, found $NP"; exit 4; }

# --- 2. sound: synthesize, measure, normalize (two passes) ---
PAGE="ez-hype.html?pass=type&cut=15&variant=std" node teaser/render.js audio "$OUT/sound"
"$FF" -hide_banner -nostats -i "$OUT/sound/audio.wav" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' > "$OUT/sound/pass1.json"
J(){ node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/sound/pass1.json','utf8'))['$1'])"; }
LN="loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(J input_i):measured_TP=$(J input_tp):measured_LRA=$(J input_lra):measured_thresh=$(J input_thresh):offset=$(J target_offset):linear=true:print_format=json"
"$FF" -y -hide_banner -nostats -i "$OUT/sound/audio.wav" -af "$LN" -ar 48000 -c:a pcm_s24le "$OUT/sound/audio-14lufs.wav" 2> "$OUT/sound/pass2.log"
grep -q '"normalization_type" : "linear"' "$OUT/sound/pass2.log" || { echo "loudnorm fell back to dynamic mode; see $OUT/sound/pass2.log"; exit 5; }

# --- 3. type passes and encodes ---
for V in std uk; do
  NM=$([ "$V" = "std" ] && echo nonuk || echo uk)
  if [ "$SKIP_TYPE" != "1" ]; then
    PAGE="ez-hype.html?pass=type&cut=15&variant=$V" PLATES="$OUT/plates/frames" READY_MS=60000 node teaser/render.js range "$OUT/$V" 0,899
  fi
  NT=$(ls "$OUT/$V/frames" | grep -c '^[0-9]\{4\}\.png$' || true); [ "$NT" = "900" ] || { echo "expected 900 $V frames, found $NT"; exit 6; }
  "$FF" -y -loglevel error -framerate 60 -i "$OUT/$V/frames/%04d.png" -i "$OUT/sound/audio-14lufs.wav" -map 0:v -map 1:a \
    -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:v libx264 -profile:v high -crf 18 -preset slow -r 60 \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/ez-hype-15s-$NM.mp4"
  "$FF" -y -loglevel error -i "$OUT/$V/frames/0100.png" -q:v 2 "$OUT/ez-hype-15s-$NM-poster.jpg"
  if [ -n "$DELIVER" ]; then
    cp "$OUT/ez-hype-15s-$NM.mp4" "$EZ/media/ez-hype-15s-$DELIVER-$NM.mp4"; cp "$OUT/ez-hype-15s-$NM-poster.jpg" "$EZ/media/ez-hype-15s-$DELIVER-$NM-poster.jpg"
  fi
done
"$FF" -hide_banner -nostats -i "$OUT/ez-hype-15s-uk.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -A20 "Summary" | grep -E "I:|Peak:"
echo "done: $OUT/ez-hype-15s-nonuk.mp4 (no FCA band: not for UK reach, so not for X) and $OUT/ez-hype-15s-uk.mp4"
