#!/bin/bash
# shoots every take, both views, both widths, then the live section (now) for the board
cd /home/user/Tokengame/ez && (python3 -m http.server 8973 >/dev/null 2>&1 &); sleep 1; cd - >/dev/null
S=$1
for w in hit season; do node run.js $S a1,a2,a3,p1,p2,p3,d1,d3 390,1280 $w; done
node run.js $S now 390,1280 hit
