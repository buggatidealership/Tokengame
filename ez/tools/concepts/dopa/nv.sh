#!/bin/bash
# bash nv.sh <round> <race|chip|slam> [query] [suffix] : a 1080 draft of the finale prediction video (nv.html) for a round whose
# data/c<n>.json exists (node prep-calls.js <n>; SAMPLE=... for mock-ups). Writes ez/x2p-r<round>-nv-<take><suffix>-draft.mp4.
# 30 fps, 3-sample motion blur, four renderers side by side, the page's own bed (i4-house, hits on its beats) and cues.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; V=$2; X=$3; SFX=$4; DUR=13.7; [ "$V" = chip ] && DUR=9.2; PG="nv.html?r=$N&v=$V"; [ "$V" = slam ] && { DUR=10.65; PG="slam.html?r=$N"; }; NF=$(python3 -c "import math; print(math.floor($DUR*30+.5))")
W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/nvr/r$N-$V$SFX; mkdir -p "$W"
# the chip take's living-light frames (Hedra, hchip.py): every second frame of hedra/chip-a.mp4 at 1440 wide (the size it is shown at)
if [ "$V" = chip ] && [ -f "$F/hedra/chip-a.mp4" ] && [ ! -f "$F/hedra/chip-a/meta.json" ]; then mkdir -p "$F/hedra/chip-a"
  ffmpeg -loglevel error -y -i "$F/hedra/chip-a.mp4" -vf "select='not(mod(n\,2))',scale=1440:810:flags=lanczos" -vsync 0 -q:v 3 -start_number 0 "$F/hedra/chip-a/%03d.jpg"
  echo "{\"n\":$(ls "$F/hedra/chip-a" | grep -c jpg),\"fps\":12}" > "$F/hedra/chip-a/meta.json"; fi
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
P=4; Q=$(( (NF + P - 1) / P )); for i in $(seq 0 $((P-1))); do ( DUR=$DUR MB=3 F0=$((i*Q)) F1=$(((i+1)*Q)) node "$F/render.js" "$PG$X" "$W" all ) & done; wait
[ "$(ls "$W" | grep -c jpg)" = "$((NF*3))" ] || { echo "frames missing: $(ls "$W" | grep -c jpg) of $((NF*3))"; exit 1; }
python3 "$F/mix.py" "$W/cues.json" $DUR i4-house 0 .3 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$F/../../../x2p-r$N-nv-$V$SFX-draft.mp4"
rm -r "${W:?}"; echo "DONE $V"
