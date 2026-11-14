#!/bin/sh
# build X2+ privately in the cb4 sandbox (tools/v22 from HEAD at 15:07 3 Nov, x2p_cb.* linked to the repo; only the built pages are its own)
cd /tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/cb4/site && python3 tools/v22/build.py tools/v22 2>&1 | grep x2plus
