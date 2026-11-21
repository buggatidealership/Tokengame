#!/bin/bash
# EZ SITE3D film, production render (30 s, 60 fps, 1080 x 1080, two variants). Needs the static server on :8765 serving ez/.
#   teaser/site3d-render.sh OUTDIR ASOF [RES]
#     ASOF  REQUIRED: the stated render date, ISO (e.g. 2026-10-14T13:00:00Z), normally the posting day. The LED dies show the
#           true remaining time to the bet at that moment ("AS OF" on the first stamp), so render on the day it posts.
#     RES   1080 (default) or 960 (the upscale fallback, about 0.8x the plate cost)
#   env: BET_OK=1        render although no bet date is set (SIM.betDate / CONFIG.betDate): the LEDs then count to the
#                        fallback (the NVDA row's call date plus one weekday, 16:00 New York), as hype-render.sh does
#        MARKS=1         keep the AI labs' marks on the cards and the chip's "NVIDIA BLACKWELL" engraving (only after counsel)
#        PAR=N           plate renderers in parallel (default 1; each is one Chromium on SwiftShader)
#        SKIP_CAPTURE=1  reuse OUTDIR/tex (the film still refuses textures whose standings differ from ez-data.js)
#        BUDGET_MIN=75   the plate projection that triggers the 960 fallback (critique must-fix 13)
#        DELIVER=v1      also copy the films and posters to ez/media as ez-site3d-30s-v1-nonuk.mp4 / -uk.mp4 (+ -poster.jpg)
# Steps (each resumable: frames are named by a key of everything they are drawn from, and existing files are skipped):
#   0. gates: the bet date, SIM.stopLoss null, SIM.leverage / leadHours / poolShare set (the page refuses too)
#   1. capture: the website's own elements from the live main page (teaser/site3d-capture.js)
#   2. plates: every UNIQUE plate once (frames that look the same share one; the end hold is one plate). After the first 120,
#      the time per plate is measured; if the projection for the rest exceeds BUDGET_MIN at 1080, the rest render at 960.
#   3. sound: synthesized from the page's own frame table (ez-site3d-audio.js), then a two-pass loudnorm to -14 LUFS / -1 dBTP
#   4. type: each unique type state once per variant (about 15), transparent PNGs, composited by ffmpeg (no 3,600 DOM shots)
#   5. composite and encode: plate (scaled to 1080) + type state + seeded temporal grain; H.264 High, crf 18, 60 fps,
#      BT.709 tagged, AAC 192k, faststart. ez-site3d-30s-nonuk.mp4 (no FCA band: never where UK viewers can see it, so not
#      on X) and ez-site3d-30s-uk.mp4 (the FCA band on every frame), posters from frame 100.
#   6. QA: loudness, true peak, phone speakers, no long dips, A against B (sound within 0.5 dB, bright pixels 0.8..1.25),
#      flashes (WCAG 2.3.1, general and red), mean luma per shot, the uk band on every frame, the legal line's contrast,
#      nothing important below y 800 in uk, every on-screen string with its source (strings.json).
set -e
OUT=${1:?usage: site3d-render.sh OUTDIR ASOF [RES]}; ASOF=${2:?the stated render date (ISO) is required, e.g. 2026-10-14T13:00:00Z}; RES=${3:-1080}
EZ=$(cd "$(dirname "$0")/.." && pwd)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
PAR=${PAR:-1}; BUDGET_MIN=${BUDGET_MIN:-75}
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd); cd "$EZ"
node -e "if(!isFinite(Date.parse('$ASOF')))process.exit(1)" || { echo "ASOF is not a date: $ASOF"; exit 2; }
Q="asof=$ASOF"
export VENDOR="$EZ/teaser/vendor" TEX="$OUT/tex"

# --- 0. gates ---
J=$(node -e "const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('ez-data.js','utf8')+';this.o={b:SIM.betDate||CONFIG.betDate||\"\",s:SIM.stopLoss,l:SIM.leverage,h:SIM.leadHours,p:SIM.poolShare}',c);console.log(JSON.stringify(c.o))")
echo "data: $J"
node -e "const o=$J;if(o.s!=null){console.log('SIM.stopLoss is set: this film shows no stop loss; re-plan scenario B');process.exit(1)}if([o.l,o.h,o.p].some(v=>v==null)){console.log('SIM.leverage, leadHours or poolShare is null');process.exit(1)}" || exit 3
if [ "$(node -e "console.log(($J).b)")" = "" ]; then
  echo "bet date: not set in the sheet; the LEDs would count to the fallback (NVDA call date + 1 weekday)"
  [ "$BET_OK" = "1" ] || { echo "refusing: set SIM.betDate (and the NVDA REPORT TIME), or pass BET_OK=1"; exit 3; }
fi

# --- 1. capture ---
if [ "$SKIP_CAPTURE" != "1" ]; then node teaser/site3d-capture.js "$OUT/tex"; fi

# --- 2. plates ---
PAGE="ez-site3d.html?pass=plate&$Q" READY_MS=180000 node teaser/render.js names "$OUT/plates"
NU=$(sort -u "$OUT/plates/names.txt" | grep -c . || true); echo "plates: $NU unique of 1800 frames"
plates(){ # plates FIRST LAST RES : every unique plate in FIRST..LAST, PAR processes, resumable
  local a=$1 b=$2 r=$3 pids=()
  for ((k=0;k<PAR;k++)); do
    PAGE="ez-site3d.html?pass=plate&res=$r&$Q" READY_MS=180000 SKIP_EXISTING=1 node teaser/render.js range "$OUT/plates" "$a,$b,$PAR,$k" > "$OUT/plates/log-$a-$k.txt" 2>&1 &
    pids+=($!); done
  for p in "${pids[@]}"; do wait "$p" || { echo "plate renderer failed; see $OUT/plates/log-$a-*.txt"; exit 4; }; done }
T0=$(date +%s); plates 0 119 "$RES"; T1=$(date +%s)
DONE=$(sed -n '1,120p' "$OUT/plates/names.txt" | sort -u | grep -c . || true)
LEFT=$(sed -n '121,1800p' "$OUT/plates/names.txt" | sort -u | grep -c . || true)
PROJ=$(( (T1-T0) * LEFT / (DONE>0?DONE:1) / 60 ))
echo "first 120 frames: $DONE plates in $((T1-T0)) s; projection for the other $LEFT plates: $PROJ min at $RES"
if [ "$RES" = "1080" ] && [ "$PROJ" -gt "$BUDGET_MIN" ]; then echo "over $BUDGET_MIN min: the rest render at 960 (scaled to 1080 in the composite)"; RES=960; fi
plates 120 1799 "$RES"
while read -r n; do [ -f "$OUT/plates/frames/$n.png" ] || { echo "missing plate $n"; exit 4; }; done < <(sort -u "$OUT/plates/names.txt")
echo "plates: done in $(( ($(date +%s)-T0)/60 )) min"

# --- 3. sound ---
PAGE="ez-site3d.html?pass=type&$Q" READY_MS=60000 node teaser/render.js audio "$OUT/sound"
"$FF" -hide_banner -nostats -i "$OUT/sound/audio.wav" -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' > "$OUT/sound/pass1.json"
JV(){ node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/sound/pass1.json','utf8'))['$1'])"; }
LN="loudnorm=I=-14:TP=-1:LRA=11:measured_I=$(JV input_i):measured_TP=$(JV input_tp):measured_LRA=$(JV input_lra):measured_thresh=$(JV input_thresh):offset=$(JV target_offset):linear=true:print_format=json"
"$FF" -y -hide_banner -nostats -i "$OUT/sound/audio.wav" -af "$LN" -ar 48000 -c:a pcm_s24le "$OUT/sound/audio-14lufs.wav" 2> "$OUT/sound/pass2.log"
grep -q '"normalization_type" : "linear"' "$OUT/sound/pass2.log" || { echo "loudnorm fell back to dynamic mode; see $OUT/sound/pass2.log"; exit 5; }

# --- 4. type states, 5. composite and encode ---
mkdir -p "$OUT/seq/plates"; i=0; while read -r n; do ln -sf "$OUT/plates/frames/$n.png" "$OUT/seq/plates/$(printf %04d $i).png"; i=$((i+1)); done < "$OUT/plates/names.txt"
[ "$i" = "1800" ] || { echo "names.txt has $i frames, expected 1800"; exit 6; }
for V in std uk; do
  NM=$([ "$V" = "std" ] && echo nonuk || echo uk)
  PAGE="ez-site3d.html?pass=type&variant=$V&$Q${MICA:+&mica=1}" READY_MS=60000 node teaser/render.js names "$OUT/type-$V"
  PAGE="ez-site3d.html?pass=type&variant=$V&$Q${MICA:+&mica=1}" READY_MS=60000 ALPHA=1 SKIP_EXISTING=1 node teaser/render.js range "$OUT/type-$V" 0,1799
  mkdir -p "$OUT/seq/$V"; i=0; while read -r n; do ln -sf "$OUT/type-$V/frames/$n.png" "$OUT/seq/$V/$(printf %04d $i).png"; i=$((i+1)); done < "$OUT/type-$V/names.txt"
  "$FF" -y -loglevel error -framerate 60 -i "$OUT/seq/plates/%04d.png" -framerate 60 -i "$OUT/seq/$V/%04d.png" -i "$OUT/sound/audio-14lufs.wav" \
    -filter_complex "[0:v]scale=1080:1080:flags=lanczos,format=gbrp[p];[1:v]format=rgba[t];[p][t]overlay=0:0:format=gbrp,noise=alls=6:allf=t:all_seed=20261012,scale=out_color_matrix=bt709:out_range=tv,format=yuv420p[v]" \
    -map "[v]" -map 2:a -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:v libx264 -profile:v high -crf 18 -preset slow -r 60 -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$OUT/ez-site3d-30s-$NM.mp4"
  "$FF" -y -loglevel error -i "$OUT/ez-site3d-30s-$NM.mp4" -vf "select=eq(n\,100)" -frames:v 1 -q:v 2 "$OUT/ez-site3d-30s-$NM-poster.jpg"
  if [ -n "$DELIVER" ]; then cp "$OUT/ez-site3d-30s-$NM.mp4" "$EZ/media/ez-site3d-30s-$DELIVER-$NM.mp4"; cp "$OUT/ez-site3d-30s-$NM-poster.jpg" "$EZ/media/ez-site3d-30s-$DELIVER-$NM-poster.jpg"; fi
done

# --- 6. QA ---
PAGE="ez-site3d.html?pass=plate&lo=1&$Q" READY_MS=180000 node teaser/site3d-qa.js "$OUT" || QAFAIL=1
python3 -I teaser/site3d-qa.py "$OUT" "$FF" || QAFAIL=1
"$FF" -hide_banner -nostats -i "$OUT/ez-site3d-30s-uk.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -A20 "Summary" | grep -E "I:|Peak:"
[ -z "$QAFAIL" ] || { echo "QA failed: see $OUT/qa.txt and $OUT/qa-page.json"; exit 7; }
echo "done: $OUT/ez-site3d-30s-nonuk.mp4 (no FCA band: not for UK reach, so not for X) and $OUT/ez-site3d-30s-uk.mp4"
