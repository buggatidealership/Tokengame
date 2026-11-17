#!/bin/bash
# bash wrap.sh [suffix] : a 1080 draft of the season's conclusion video (wrap.html) from the sheet (node prep-wrap.js runs first).
# Writes ez/x2p-s1-wrap<suffix>-draft.mp4. 30 fps, 3-sample motion blur, four renderers, the page's bed (s1-wrap, cut to its beats).
set -e
F=$(cd "$(dirname "$0")" && pwd); SFX=$1; DUR=35; NF=$((DUR*30))
W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/nvr/wrap$SFX; mkdir -p "$W"
node "$F/prep-wrap.js"
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
P=4; Q=$(( (NF + P - 1) / P )); for i in $(seq 0 $((P-1))); do ( DUR=$DUR MB=3 F0=$((i*Q)) F1=$(((i+1)*Q)) node "$F/render.js" "wrap.html" "$W" all ) & done; wait
[ "$(ls "$W" | grep -c jpg)" = "$((NF*3))" ] || { echo "frames missing: $(ls "$W" | grep -c jpg) of $((NF*3))"; exit 1; }
python3 "$F/mix.py" "$W/cues.json" $DUR s1-wrap 3.02 .28 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$F/../../../x2p-s1-wrap$SFX-draft.mp4"
rm -r "${W:?}"; echo "DONE wrap"
