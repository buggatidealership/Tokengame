#!/bin/bash
# wrapxs.sh: wrapx.sh with MB (motion-blur samples per frame, default 3) taken from the environment, for quick samples (MB=2). Same lock as wrapx.sh.
# bash wrapx.sh <page.html[?query]> <seconds> <out name> [bed] [bed at] [bed gain] : a 1080 draft of a long video page, rendered in
# 10-second chunks so the frames never fill the disk (each chunk: four renderers, 3-sample motion blur, encoded, frames deleted),
# then joined and mixed (the page's window.MUSIC overrides bed and bed at). Writes ez/<out name>.mp4.
# CRF=20 for a lighter draft (default 14).
# One render at a time on this machine: a second call waits for the first (flock). Run `node prep-wrap.js` first when the sheet changed.
set -e
F=$(cd "$(dirname "$0")" && pwd); PAGE=$1; DUR=$2; OUT=$3; BED=${4:-s1-wrap}; BAT=${5:-0}; BG=${6:-.28}
[ -n "$OUT" ] || { echo "usage: bash wrapx.sh <page.html> <seconds> <out name> [bed] [bed at] [gain]"; exit 1; }
S=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad; mkdir -p "$S/nvr"
exec 9>"$S/nvr/render.lock"; flock 9
W="$S/nvr/x-$OUT"; rm -rf "${W:?}"; mkdir -p "$W"
curl -s -o /dev/null localhost:8993 || { setsid nohup python3 -m http.server 8993 --directory "$F" </dev/null >/dev/null 2>&1 9>&- & disown; for i in 1 2 3 4 5 6; do curl -s -o /dev/null localhost:8993 && break; python3 -c "import time;time.sleep(.5)"; done; }
NF=$(python3 -c "import math;print(math.floor($DUR*30+.5))"); C=${CHUNK:-300}; P=4; : > "$W/list.txt"
for ((c0=0; c0<NF; c0+=C)); do c1=$((c0+C)); [ $c1 -gt $NF ] && c1=$NF; n=$((c1-c0)); Q=$(( (n + P - 1) / P ))
  for i in $(seq 0 $((P-1))); do a=$((c0+i*Q)); b=$((a+Q)); [ $b -gt $c1 ] && b=$c1; [ $a -lt $c1 ] && ( DUR=$DUR MB=${MB:-3} F0=$a F1=$b node "$F/render.js" "$PAGE" "$W" all | grep -v "errs none" || true ) & done; wait
  got=$(ls "$W" | grep -c 'jpg$' || true); [ "$got" = "$((n*${MB:-3}))" ] || { echo "chunk $c0: $got of $((n*${MB:-3})) frames"; exit 1; }
  ffmpeg -loglevel error -y -framerate $((30*${MB:-3})) -start_number $((c0*${MB:-3})) -i "$W/%05d.jpg" -vf "tmix=frames=${MB:-3},select='eq(mod(n\,${MB:-3})\,$((${MB:-3}-1)))',setpts=N/30/TB,scale=1080:1350,format=yuv420p" -r 30 \
    -c:v libx264 -preset slow -crf ${CRF:-14} -profile:v high -frames:v $n "$W/c$c0.mp4"
  rm -f "$W"/*.jpg; echo "file 'c$c0.mp4'" >> "$W/list.txt"; echo "chunk $c0-$c1 of $NF done"
done
python3 "$F/mix.py" "$W/cues.json" "$DUR" "$BED" "$BAT" "$BG" "$W/mix.wav"
ffmpeg -loglevel error -y -f concat -safe 0 -i "$W/list.txt" -i "$W/mix.wav" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -t "$DUR" -movflags +faststart "$F/../../../$OUT.mp4"
rm -r "${W:?}"; echo "DONE $OUT"
