#!/bin/bash
# bash all.sh [widths] : today + A, B, C at each width (DPR 2 phones, 1 desktop), DATA=sheet (default)
cd "$(dirname "$0")"
for W in ${1:-390 320 1280}; do D=2; [ $W -ge 700 ] && D=1
 DPR=$D node shot.js $W now &
 DPR=$D node shot.js $W A _u3.css takeA.css _u3.js takeA.js &
 wait
 DPR=$D node shot.js $W B _u3.css takeB.css _u3.js takeB.js &
 DPR=$D node shot.js $W C _u3.css takeC.css _u3.js takeC.js &
 wait
done
