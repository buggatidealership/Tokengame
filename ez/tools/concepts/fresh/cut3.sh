#!/bin/bash
# Cut the three low-res pack animations (2026-11-11): the sealed pack with its printed label (1.9 s), the Kling shot graded
# into the palette, then the four printed cards (3.6 s), with a sound mix in each material's own sounds. 720x900, 24 fps.
# Usage: bash cut3.sh f t p   (writes ez/x2p-pack-<k>-draft.mp4)
set -e
F=$(cd "$(dirname "$0")" && pwd); W=/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/cut3
for k in "$@"; do
  mkdir -p "$W/$k/f" "$W/$k/g"
  # the 9:16 shot: the painting sits at y 160 (341 px of padding at 720/1536 scale); the 4:5 window starts 30 px into it
  ffmpeg -loglevel error -y -i "$F/img/pv3$k.mp4" -vf "crop=720:900:0:190" "$W/$k/f/%04d.png"
  for f in "$W/$k"/f/*.png; do python3 "$F/grade.py" "$f" "$W/$k/g/$(basename "$f")" .22 >/dev/null; done
  ffmpeg -loglevel error -y -i "$F/img/n$k.png" -vf scale=720:900:flags=lanczos "$W/$k/a.png"
  ffmpeg -loglevel error -y -i "$F/img/m$k.png" -vf scale=720:900:flags=lanczos "$W/$k/c.png"
  python3 "$F/mix3.py" "$k" "$W/$k/mix.wav"
  ffmpeg -loglevel error -y -loop 1 -t 1.9 -framerate 24 -i "$W/$k/a.png" -framerate 24 -i "$W/$k/g/%04d.png" -loop 1 -t 3.6 -framerate 24 -i "$W/$k/c.png" -i "$W/$k/mix.wav" \
    -filter_complex "[0]format=yuv420p,setsar=1,zoompan=z='1+0.00025*on':d=1:s=720x900:fps=24[a];[1]format=yuv420p,setsar=1[v];[2]format=yuv420p,setsar=1,zoompan=z='1+0.00035*on':d=1:s=720x900:fps=24[c];[a][v]xfade=transition=fade:duration=0.4:offset=1.5[av];[av][c]xfade=transition=fade:duration=0.5:offset=6.14,format=yuv420p[out]" \
    -map "[out]" -map 3:a -r 24 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 160k -t 9.64 -movflags +faststart "$F/../../../x2p-pack-$k-draft.mp4"
  rm -rf "${W:?}/${k:?}"   # frames are large and regenerable; the session has a small disk allowance
  echo "done $k"
done
