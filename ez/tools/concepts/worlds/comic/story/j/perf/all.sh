#!/bin/bash
# runs every take's perf, 3 runs each, one at a time (shared machine)
cd "$(dirname "$0")/.."
for k in ${@:-j0 j1 j1v j2 j3 j4 j5 j6 j7 j8}; do node sj.js perf $k perf/$k.json 3 >> perf/log.txt 2>&1; done
echo done >> perf/log.txt
