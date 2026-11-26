#!/bin/bash
# run.sh <jobs.jsonl-ish file from gen.py> [parallel]   runs each job through hd.py (skips names already in img/)
cd "$(dirname "$0")"
run1(){ n=$(python3 -c 'import json,sys;print(json.loads(sys.argv[1])["name"])' "$1"); [ -f img/$n.jpg ] && return
  python3 -c 'import json,sys,subprocess;j=json.loads(sys.argv[1]);subprocess.run(["python3","hd.py",j["name"],j["model"],json.dumps(j["input"])]+j["refs"])' "$1"; }
export -f run1
cat "$1" | tr '\n' '\0' | BIG=1 xargs -0 -P ${2:-6} -I{} bash -c 'run1 "$@"' _ {}
