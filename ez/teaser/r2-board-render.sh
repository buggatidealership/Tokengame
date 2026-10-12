#!/bin/bash
# EZ film round 2, "THE BIG BOARD" (ez-r2-board.html): render both variants, the sound, the encodes, posters and QA.
# Needs the static server on :8765 serving ez/ (python3 -m http.server 8765 from ez/).
#   teaser/r2-board-render.sh OUTDIR
#   env: ASOF=ISO        the countdown and AS OF stamp start here (default 2026-10-12T16:00:00Z). Re-render on the posting day.
#        BET_OK=1        render although no bet date is set in the sheet (SIM.betDate / CONFIG.betDate); the film then says
#                        PLANNED and uses the site's fallback rule (NVDA row call date plus one weekday, 16:00 New York)
#        JOBS=N          parallel Chromium processes per variant (default 2; frames are split by i % N)
#        VARIANTS="uk nonuk"   which variants to render (default both, in sequence so frame dumps never coexist)
#        SKIP_FRAMES=1   reuse OUTDIR/<v>/frames (render.js SKIP_EXISTING also resumes a broken run)
#        KEEP_FRAMES=1   keep the PNG frame dumps (default: deleted after the variant's encode and QA pass)
#        REMUX=1         sound only: re-synthesise and normalise the sound, then put it into the existing OUTDIR films with
#                        the video stream copied (no frames rendered), re-make nothing else, and re-deliver
#        DELIVER=v1      copy films and posters to ez/media as ez-r2-board-v1-uk.mp4 / -uk-poster.jpg and -nonuk (default v1;
#                        DELIVER= (empty) to skip)
# Every frame is a pure function of t, so any beat can be re-rendered alone:
#   PAGE='ez-r2-board.html?v=uk&asof=ISO' node teaser/render.js range OUT 600,719,1,0
set -e
OUT=${1:?usage: r2-board-render.sh OUTDIR}
ASOF=${ASOF:-2026-10-12T16:00:00Z}; JOBS=${JOBS:-2}; VARIANTS=${VARIANTS:-"uk nonuk"}; DELIVER=${DELIVER-v1}
EZ=$(cd "$(dirname "$0")/.." && pwd)
FF=${FFMPEG:-/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2}
mkdir -p "$OUT"; OUT=$(cd "$OUT" && pwd); cd "$EZ"
curl -sf -o /dev/null http://localhost:8765/ez-data.js || { echo "no static server on :8765 serving ez/"; exit 2; }
T0=$(date +%s)

# --- the bet date gate ---
BET=$(node -e "const vm=require('vm'),fs=require('fs');const c={};vm.createContext(c);vm.runInContext(fs.readFileSync('ez-data.js','utf8')+';this.b=(SIM.betDate||CONFIG.betDate||\"\")',c);console.log(c.b)")
if [ -z "$BET" ]; then echo "bet date: not set in the sheet; the film says PLANNED and uses the fallback rule"
  [ "$BET_OK" = "1" ] || { echo "refusing: set the bet date, or pass BET_OK=1 to accept the fallback"; exit 3; }
else echo "bet date: $BET (from the sheet)"; fi

# --- 1. sound (picture-independent of the variant): synthesise, then two-pass loudnorm to -14 LUFS / -1 dBTP, linear ---
mkdir -p "$OUT/sound"
PAGE="ez-r2-board.html?v=uk&asof=$ASOF" READY_MS=120000 node teaser/render.js audio "$OUT/sound"
"$FF" -hide_banner -nostats -i "$OUT/sound/audio.wav" -af loudnorm=I=-14:TP=-2.5:LRA=11:print_format=json -f null - 2>&1 | sed -n '/^{/,/^}/p' > "$OUT/sound/pass1.json"
J(){ node -e "console.log(JSON.parse(require('fs').readFileSync('$OUT/sound/pass1.json','utf8'))['$1'])"; }
LN="loudnorm=I=-14:TP=-2.5:LRA=11:measured_I=$(J input_i):measured_TP=$(J input_tp):measured_LRA=$(J input_lra):measured_thresh=$(J input_thresh):offset=$(J target_offset):linear=true:print_format=json"
"$FF" -y -hide_banner -nostats -i "$OUT/sound/audio.wav" -af "$LN" -ar 48000 -c:a pcm_s24le "$OUT/sound/audio-14lufs.wav" 2> "$OUT/sound/pass2.log"
grep -q '"normalization_type" : "linear"' "$OUT/sound/pass2.log" || { echo "loudnorm fell back to dynamic mode; see $OUT/sound/pass2.log"; exit 5; }
T1=$(date +%s)
if [ "$REMUX" = "1" ]; then
  for V in $VARIANTS; do MP4="$OUT/ez-r2-board-v1-$V.mp4"; [ -f "$MP4" ] || { echo "REMUX: no $MP4"; exit 8; }
    "$FF" -y -loglevel error -i "$MP4" -i "$OUT/sound/audio-14lufs.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$MP4.tmp.mp4"
    mv "$MP4.tmp.mp4" "$MP4"; [ -n "$DELIVER" ] && cp "$MP4" "$EZ/media/ez-r2-board-$DELIVER-$V.mp4"
    python3 teaser/r2-board-qa.py mp4 "$MP4" "$OUT/qa-$V-mp4.json"; done
  echo "remuxed sound in $(( $(date +%s)-T0 )) s"; exit 0
fi

# --- 2. picture, one variant at a time; 3. encode, poster, QA, delete the dump ---
for V in $VARIANTS; do
  TV0=$(date +%s)
  if [ "$SKIP_FRAMES" != "1" ]; then
    mkdir -p "$OUT/$V/frames"; PIDS=""
    for ((o=0;o<JOBS;o++)); do
      SKIP_EXISTING=1 PAGE="ez-r2-board.html?v=$V&asof=$ASOF" READY_MS=120000 node teaser/render.js range "$OUT/$V" 0,1439,$JOBS,$o > "$OUT/$V/render-$o.log" 2>&1 &
      PIDS="$PIDS $!"
    done
    for p in $PIDS; do wait $p || { echo "render process $p failed; see $OUT/$V/render-*.log"; exit 6; }; done
  fi
  NT=$(ls "$OUT/$V/frames" | grep -c '^[0-9]\{4\}\.png$' || true); [ "$NT" = "1440" ] || { echo "expected 1440 $V frames, found $NT"; exit 7; }
  TV1=$(date +%s)
  MP4="$OUT/ez-r2-board-v1-$V.mp4"
  "$FF" -y -loglevel error -framerate 60 -i "$OUT/$V/frames/%04d.png" -i "$OUT/sound/audio-14lufs.wav" -map 0:v -map 1:a \
    -vf "scale=out_color_matrix=bt709:out_range=tv,format=yuv420p" -colorspace bt709 -color_primaries bt709 -color_trc bt709 -color_range tv \
    -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 18 -preset slow -r 60 \
    -c:a aac -b:a 192k -ar 48000 -movflags +faststart -shortest "$MP4"
  "$FF" -y -loglevel error -i "$OUT/$V/frames/0000.png" -q:v 2 "$OUT/ez-r2-board-v1-$V-poster.jpg"
  python3 teaser/r2-board-qa.py frames "$OUT/$V/frames" "$V" "$OUT/qa-$V.json" "$OUT/contact-$V.png"
  python3 teaser/r2-board-qa.py mp4 "$MP4" "$OUT/qa-$V-mp4.json"
  TV2=$(date +%s)
  echo "$V: frames $((TV1-TV0)) s, encode and QA $((TV2-TV1)) s" | tee -a "$OUT/timing.txt"
  if [ -n "$DELIVER" ]; then cp "$MP4" "$EZ/media/ez-r2-board-$DELIVER-$V.mp4"; cp "$OUT/ez-r2-board-v1-$V-poster.jpg" "$EZ/media/ez-r2-board-$DELIVER-$V-poster.jpg"; fi
  [ "$KEEP_FRAMES" = "1" ] || rm -rf "$OUT/$V/frames"
done
"$FF" -hide_banner -nostats -i "$OUT/ez-r2-board-v1-uk.mp4" -af ebur128=peak=true -f null - 2>&1 | grep -A20 "Summary" | grep -E "I:|Peak:" || true
echo "sound $((T1-T0)) s; total $(( $(date +%s)-T0 )) s" | tee -a "$OUT/timing.txt"
echo "done: $OUT/ez-r2-board-v1-uk.mp4 (FCA band on every frame: the file for X) and $OUT/ez-r2-board-v1-nonuk.mp4 (no band: never for UK reach)"
