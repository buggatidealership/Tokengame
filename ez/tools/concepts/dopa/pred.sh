#!/bin/bash
# bash pred.sh <round> <1..5> : a 1080 draft of a prediction take (predict.html?v=) for a round whose data/c<n>.json exists
# (node prep-calls.js <n>). Writes ez/x2p-r<round>-pred<v>-draft.mp4. 30 fps, 3-sample motion blur, the take's own bed and cues.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; V=$2; D=(0 6 9 10 11 14); DUR=${D[$V]}; H=$((DUR*15))
W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/pred/r$N-$V; mkdir -p "$W"
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
( DUR=$DUR MB=3 F1=$H node "$F/render.js" "predict.html?r=$N&v=$V" "$W" all ) & ( DUR=$DUR MB=3 F0=$H node "$F/render.js" "predict.html?r=$N&v=$V" "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" $DUR i1-ambient 0 .3 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$F/../../../x2p-r$N-pred$V-draft.mp4"
rm -r "${W:?}"
