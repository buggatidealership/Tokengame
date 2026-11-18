#!/bin/bash
# bash outcome.sh <round> : the outcome video for a graded round, from the sheet only. prep (numbers + price path) -> render (30 fps,
# 3-sample motion blur) -> sound (m2-phonk, its drop on the bell, plus the cues) -> master -> X file (1080x1350, 10 Mbps two-pass,
# H.264 High, AAC) -> QA against the data. Writes ez/post/r<round>-<ticker>-outcome.mp4 and the two post texts beside it.
# Round 112 (the last of Season 1) renders the finale cut by itself once it is graded: same command, 20.8 s.
set -e
F=$(cd "$(dirname "$0")" && pwd); N=$1; W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/dopa/out$N
mkdir -p "$W" "$F/../../../post"
node "$F/prep.js" "$N"
T=$(node -e "console.log(require('$F/data/r$N.json').ticker.replace(/[^A-Z0-9]/g,''))")
curl -s -o /dev/null localhost:8993 || { setsid nohup python3 -m http.server 8993 --directory "$F" </dev/null >/dev/null 2>&1 & disown; python3 -c "import time;time.sleep(1.5)"; }
# the length comes from the data: 15.5 s, or 20.8 s for the Season 1 finale cut (finale:true in the data; FINALE=1 forces it on any
# round for a test, which must also name its own output: FINALE=1 OUT=/path/test.mp4 bash outcome.sh 111; a forced test writes no post).
FIN=$(node -e "console.log(require('$F/data/r$N.json').finale?1:0)"); Q="outcome.html?r=$N"; DUR=15.5
if [ "$FINALE" = 1 ] && [ "$FIN" = 0 ]; then [ -n "$OUT" ] || { echo "FINALE=1 on a round that is not the finale needs OUT=<file>"; exit 1; }; Q="$Q&finale=1"; FIN=1; TEST=1; fi
[ "$FIN" = 1 ] && DUR=20.8
NF=$(python3 -c "import math;print(math.floor($DUR*30+.5))"); HF=$(( (NF + 1) / 2 ))
( DUR=$DUR MB=3 F1=$HF node "$F/render.js" "$Q" "$W" all ) & ( DUR=$DUR MB=3 F0=$HF node "$F/render.js" "$Q" "$W" all ) & wait
[ "$(ls "$W" | grep -c 'jpg$')" = "$((NF*3))" ] || { echo "frames missing: $(ls "$W" | grep -c 'jpg$') of $((NF*3))"; exit 1; }
python3 "$F/mix.py" "$W/cues.json" $DUR m2-phonk 0 .32 "$W/mix.wav"
ffmpeg -loglevel error -y -framerate 90 -i "$W/%05d.jpg" -i "$W/mix.wav" -vf "tmix=frames=3,select='not(mod(n\,3))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 12 -profile:v high -c:a aac -b:a 192k -t $DUR -movflags +faststart "$W/master.mp4"
O="${OUT:-$F/../../../post/r$N-$T-outcome.mp4}"
ffmpeg -loglevel error -y -i "$W/master.mp4" -c:v libx264 -preset slow -b:v 10M -pass 1 -passlogfile "$W/p" -profile:v high -pix_fmt yuv420p -g 30 -keyint_min 30 -sc_threshold 0 -an -f mp4 /dev/null
ffmpeg -loglevel error -y -i "$W/master.mp4" -c:v libx264 -preset slow -b:v 10M -maxrate 12M -bufsize 20M -pass 2 -passlogfile "$W/p" -profile:v high -pix_fmt yuv420p -g 30 -keyint_min 30 -sc_threshold 0 -c:a aac -b:a 192k -ar 48000 -ac 2 -movflags +faststart "$O"
rm -r "${W:?}"
if [ "$TEST" = 1 ]; then FINALE=1 node "$F/posts.js" "$N"; FINALE=1 node "$F/qa.js" "$N" "$O"; else node "$F/posts.js" "$N"; node "$F/qa.js" "$N" "$O"; fi
