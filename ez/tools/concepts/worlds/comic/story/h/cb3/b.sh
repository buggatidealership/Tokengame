#!/bin/sh
# build X2+ privately in the cb3 sandbox (sources linked from ez/, x2p_vit from HEAD; only the built pages are its own)
cd /tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/cb3/site && python3 tools/v22/build.py tools/v22 2>&1 | grep x2plus
