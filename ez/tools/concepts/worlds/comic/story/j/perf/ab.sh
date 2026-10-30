#!/bin/bash
cd "$(dirname "$0")/.."
for k in ${@:-j0 j1 j1v j2 j3 j4 j5 j6 j7 j8}; do node sj.js ab $k perf/ab-$k.json 2 >> perf/ablog.txt 2>&1; done
echo done >> perf/ablog.txt
