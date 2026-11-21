# bash runall.sh <outdir> <W> <ids> [film]
cd /home/user/Tokengame/ez && node tools/concepts/worlds/comic/story/h/theme7/run.js $1 $3 $2 $4 > $1/run-$2-$4.log 2>&1; for id in ${3//,/ }; do f=$1/full-$2-$id${4:+-$4}; /usr/bin/python3 tools/concepts/worlds/comic/story/h/theme7/stitch.py $f; done; tail -c 2000 $1/run-$2-$4.log
