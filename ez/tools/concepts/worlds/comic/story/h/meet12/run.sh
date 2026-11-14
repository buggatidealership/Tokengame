#!/bin/bash
# bash run.sh <shots dir> "<w:take::dpr> ..."  : sequential shots with one retry each; one JSON line per shot into <dir>/log.jsonl
D=$1;shift;mkdir -p $D
for s in $@;do IFS=: read w t l r <<<"$s";f=$D/m12-$t-$w.png
 for k in 1 2;do o=$(timeout 280 node "$(dirname $0)/shot.js" $w $t $f ${r:-2} 2>&1|tail -1);[[ $o == \{* ]]&&break;done
 echo "$o">>$D/log.jsonl;done
