#!/bin/bash
# bash all.sh "takes" "widths" : shoots today's live tab and each take (phones at DPR ${DPRP:-2}, desktop at 1)
cd "$(dirname "$0")"
for W in ${2:-390 320 1280}; do D=${DPRP:-2}; [ $W -ge 700 ] && D=1
 for T in ${1:-now A B C D E F}; do
  if [ $T = now ]; then DPR=$D node shot.js $W now & else DPR=$D node shot.js $W $T _h37.css _hb.css t$T.css _h37.js t$T.js & fi
  while [ $(jobs -r | wc -l) -ge 3 ]; do sleep 1; done
 done; wait
done
