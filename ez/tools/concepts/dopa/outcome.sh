#!/bin/bash
# bash outcome.sh <round> : the outcome video for a graded round, from the sheet only. prep (numbers + price path) -> render (30 fps,
# 3-sample motion blur) -> sound (m2-phonk, its drop on the bell, plus the cues) -> master -> X file (1080x1350, 10 Mbps two-pass,
# H.264 High, AAC) -> QA against the data. Writes ez/post/r<round>-<ticker>-outcome.mp4 and the two post texts beside it.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/dopa/out$N
mkdir -p "$W" "$F/../../../post"
node "$F/prep.js" "$N"
T=$(node -e "console.log(require('$F/data/r$N.json').ticker.replace(/[^A-Z0-9]/g,''))")
curl -s -o /dev/null localhost:8993 || (cd "$F" && setsid nohup python3 -m http.server 8993 >/dev/null 2>&1 &)
( DUR=15.5 MB=3 F1=233 node "$F/render.js" "outcome.html?r=$N" "$W" all ) & ( DUR=15.5 MB=3 F0=233 node "$F/render.js" "outcome.html?r=$N" "$W" all ) & wait
python3 "$F/mix.py" "$W/cues.json" 15.5 m2-phonk 0 .32 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 12 -profile:v high -c:a aac -b:a 192k -t 15.5 -movflags +faststart "$W/master.mp4"
O="$F/../../../post/r$N-$T-outcome.mp4"
ffmpeg -loglevel error -y -i "$W/master.mp4" -c:v libx264 -preset slow -b:v 10M -pass 1 -passlogfile "$W/p" -profile:v high -pix_fmt yuv420p -g 30 -keyint_min 30 -sc_threshold 0 -an -f mp4 /dev/null
ffmpeg -loglevel error -y -i "$W/master.mp4" -c:v libx264 -preset slow -b:v 10M -maxrate 12M -bufsize 20M -pass 2 -passlogfile "$W/p" -profile:v high -pix_fmt yuv420p -g 30 -keyint_min 30 -sc_threshold 0 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$O"
rm -r "${W:?}"
node "$F/posts.js" "$N"
node "$F/qa.js" "$N" "$O"
