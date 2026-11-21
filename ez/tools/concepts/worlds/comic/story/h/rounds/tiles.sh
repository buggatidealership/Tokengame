#!/bin/bash
# tiles.sh <set> <model> <json settings> <style text>
set=$1;model=$2;cfg=$3;sty=$4
for n in 80 79 78 77 76 75 74 73 72 71 70 69; do
 th=$(python3 -c "import json;print(json.load(open('themes.json'))['$n'])")
 pr="$sty Scene: $th. Vertical comic book cover art, the main subject in the middle, the top fifth and the bottom fifth calm (for a title and a strip laid on later). No text, no letters, no numbers, no words, no logos, no signs, no masthead, no frame."
 inp=$(python3 -c 'import json,sys;print(json.dumps(dict(prompt=sys.argv[1],**json.loads(sys.argv[2]))))' "$pr" "$cfg")
 python3 hd.py gen $set-$n $model "$inp" >> log-$set.txt 2>&1 &
 sleep 1; [ $(jobs -r | wc -l) -ge 6 ] && wait -n
done; wait
