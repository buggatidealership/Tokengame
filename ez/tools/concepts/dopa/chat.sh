#!/bin/bash
# bash chat.sh <round> <dur> [o] : a 1080 draft of the group-chat take (chat.html). Without "o" the prediction (needs data/c<n>.json,
# node prep-calls.js <n>); with "o" the outcome reply (also needs data/r<n>.json, node prep.js <n>). Writes ez/x2p-r<n>-chat[-outcome]-draft.mp4.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; DUR=$2; O=$3; H=$(python3 -c "print(int($DUR*15))")
W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/chat/r$N$O; mkdir -p "$W"
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
Q="chat.html?r=$N"; [ -n "$O" ] && Q="$Q&o=1"
( DUR=$DUR MB=3 F1=$H node "$F/render.js" "$Q" "$W" all ) & ( DUR=$DUR MB=3 F0=$H node "$F/render.js" "$Q" "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" $DUR c1-lofi 4 .26 "$W/mix.wav"
OUT="$F/../../../x2p-r$N-chat${O:+-outcome}-draft.mp4"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 14 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$OUT"
rm -r "${W:?}"
