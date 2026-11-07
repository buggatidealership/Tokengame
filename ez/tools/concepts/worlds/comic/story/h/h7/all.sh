# bash all.sh <shots dir>: every still (vault and transition, 390/1280/320), the five transition videos and the four boards
set -e
cd "$(dirname "$0")"
S=${1:?shots dir}
node run.js $S vault now,v1,v2,v3,v4,v5 390,1280,320
node run.js $S trans now,t1,t2,t3,t4,t5 390,1280,320
for t in t1 t2 t3 t4 t5; do node rec.js ../../../../../../../x2p-x3p-h7-trans-$t.mp4 $t 390; done
/usr/bin/python3 board.py $S vault 390 ../../../../../../../x2p-x3p-h7-vault.png
/usr/bin/python3 board.py $S vault 1280 ../../../../../../../x2p-x3p-h7-vault-desktop.png
/usr/bin/python3 board.py $S trans 390 ../../../../../../../x2p-x3p-h7-trans.png
/usr/bin/python3 board.py $S trans 1280 ../../../../../../../x2p-x3p-h7-trans-desktop.png
