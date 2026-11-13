#!/bin/bash
# bash pnl.sh <round> <1|2> : a 1080 draft of the P&L-chart take (outcome-pnl.html?m=) for a graded round whose data/r<n>.json exists
# (prep.js). m=1 one chart, a line per side; m=2 one lane per AI. Writes ez/x2p-r<round>-pnl<m>-draft.mp4.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; M=$2; W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/dopa/pnl$N-$M
mkdir -p "$W"
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
( DUR=15.5 MB=3 F1=233 node "$F/render.js" "outcome-pnl.html?r=$N&m=$M" "$W" all ) & ( DUR=15.5 MB=3 F0=233 node "$F/render.js" "outcome-pnl.html?r=$N&m=$M" "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" 15.5 m2-phonk 0 .32 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t 15.5 -movflags +faststart "$F/../../../x2p-r$N-pnl$M-draft.mp4"
rm -r "${W:?}"
