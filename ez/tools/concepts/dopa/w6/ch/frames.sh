#!/bin/bash
# Cut the two Kling light loops (gen.sh live) into the page's frames: 80 frames at 24 fps, 720 x 960 JPEG, and meta.json with the rect the
# clip covers on the ground (Kling kept the paintings' 3:4 and their exact geometry: 0 px shift against the stills, measured).
cd /home/user/Tokengame/ez/tools/concepts/dopa || exit 1
H=../launchvid/hedra/raw
for k in a b; do src=$H/ch-$([ $k = a ] && echo a-hall || echo b-city)-live.mp4; d=w6/ch/$k-live; mkdir -p $d
  ffmpeg -loglevel error -y -i "$src" -frames:v 80 -vf scale=720:960:flags=lanczos -q:v 4 -start_number 1 "$d/g%03d.jpg"
  echo '{"rect":{"x":0,"y":0,"w":1080,"h":1440},"alpha":0.82}' > "$d/meta.json"; done
