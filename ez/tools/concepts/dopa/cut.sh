#!/bin/bash
# bash cut.sh <n> <dur> <bed> <bed_at> <bed_gain> : renders v<n>.html (motion blur 3 samples), mixes its sound, writes ez/x2p-r106-v<n>-draft.mp4, deletes the frames.
set -e
F=$(cd "$(dirname "$0")" && pwd); W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/dopa/f$1
mkdir -p "$W"
( DUR=$2 MB=3 F1=180 node "$F/render.js" v$1.html "$W" all ) & ( DUR=$2 MB=3 F0=180 node "$F/render.js" v$1.html "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" "$2" "$3" "$4" "$5" "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 20 -profile:v high -c:a aac -b:a 160k -t "$2" -movflags +faststart "$F/../../../x2p-r106-v$1-draft.mp4"
rm -r "${W:?}"
echo "done v$1"
