#!/bin/bash
# bash first.sh : each take's first frame (390x664) at 3x, with the sheet's data (trades in) and with ez-data.js as committed (trades coming in)
cd "$(dirname "$0")"
for D in sheet repo; do
 FIRSTONLY=1 DPR=3 DATA=$D node shot.js 390 now3-$D &
 FIRSTONLY=1 DPR=3 DATA=$D node shot.js 390 A3-$D _u3.css takeA.css _u3.js takeA.js &
 wait
 FIRSTONLY=1 DPR=3 DATA=$D node shot.js 390 B3-$D _u3.css takeB.css _u3.js takeB.js &
 FIRSTONLY=1 DPR=3 DATA=$D node shot.js 390 C3-$D _u3.css takeC.css _u3.js takeC.js &
 wait
done
