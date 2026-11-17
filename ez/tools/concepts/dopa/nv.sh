#!/bin/bash
# bash nv.sh <round> <race|chip> [query] : a 1080 draft of the finale prediction video (nv.html) for a round whose data/c<n>.json exists
# (node prep-calls.js <n>; SAMPLE=... for mock-ups). Writes ez/x2p-r<round>-nv-<take>-draft.mp4. 30 fps, 3-sample motion blur, the page's
# own bed (i4-house, hits on its beats) and cues.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; V=$2; X=$3; DUR=14.2; [ "$V" = chip ] && DUR=10.65; H=$(python3 -c "print(int($DUR*15))")
W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/nvr/r$N-$V$4; mkdir -p "$W"
# the chip take's living-light frames (Hedra, hchip.py) are unpacked from hedra/chip-a.mp4 when missing
if [ "$V" = chip ] && [ -f "$F/hedra/chip-a.mp4" ] && [ ! -f "$F/hedra/chip-a/meta.json" ]; then mkdir -p "$F/hedra/chip-a"; ffmpeg -loglevel error -y -i "$F/hedra/chip-a.mp4" -vf "scale=2048:1152:flags=lanczos" -q:v 3 -start_number 0 "$F/hedra/chip-a/%03d.jpg"; echo "{\"n\":$(ls "$F/hedra/chip-a" | grep -c jpg),\"fps\":24}" > "$F/hedra/chip-a/meta.json"; fi
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
( DUR=$DUR MB=3 F1=$H node "$F/render.js" "nv.html?r=$N&v=$V$X" "$W" all ) & ( DUR=$DUR MB=3 F0=$H node "$F/render.js" "nv.html?r=$N&v=$V$X" "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" $DUR i4-house 0 .3 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$F/../../../x2p-r$N-nv-$V$4-draft.mp4"
rm -r "${W:?}"
