#!/bin/sh
# shoot every take: phones with the 4 vs 0 test ticket, desktop, plus checks at 320 and 360, reduced motion, and another leader
S=$1; cd "$(dirname "$0")/.."
node b/run.js $S/ph cliff now 390; FAKE4=1 node b/run.js $S/ph cliff c1,c2,c3 390
node b/run.js $S/dk cliff now,c1,c2,c3 1280
node b/run.js $S/ph bet now,n1,n2,n3 390; node b/run.js $S/dk bet now,n1,n2,n3 1280
FAKE4=1 node b/run.js $S/chk cliff c1,c2,c3 320,360,430
node b/run.js $S/chk bet n1,n2,n3 320,360,430
RM=1 FAKE4=1 node b/run.js $S/rm cliff c1,c2,c3 390; RM=1 node b/run.js $S/rm bet n1,n2,n3 390
LEAD=CLAUDE node b/run.js $S/lead bet n1,n2,n3 390
