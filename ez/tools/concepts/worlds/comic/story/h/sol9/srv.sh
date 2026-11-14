#!/bin/bash
# ./srv.sh <cmd...>: serves ez/ on a fresh port for the length of one command (PORT is passed on), then stops it.
P=$((9100+RANDOM%800));cd "$(dirname "$0")/../../../../../../.." && python3 -m http.server $P >/dev/null 2>&1 & S=$!
for i in $(seq 1 30);do curl -s -o /dev/null http://localhost:$P/ && break;sleep .3;done
cd "$(dirname "$0")";PORT=$P "$@";R=$?;kill $S;exit $R
