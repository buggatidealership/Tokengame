#!/bin/bash
# bash board.sh : pulls five frames per cut into bd/ and shoots board.html to ez/x2p-r106-five-cuts.jpg (server :8993 on this folder)
set -e; F=$(cd "$(dirname "$0")" && pwd); cd "$F"; mkdir -p bd
T=( "" "0 3.5 6.6 7.6 10.5" "0 2.5 4.6 6.1 9.0" "0 2.6 3.9 5.3 9.5" "0 2.0 4.1 5.6 9.6" "0 2.0 5.0 5.8 10.5" )
for n in 1 2 3 4 5; do k=0; for t in ${T[$n]}; do ffmpeg -loglevel error -y -ss $t -i ../../../x2p-r106-v$n-draft.mp4 -frames:v 1 -vf scale=528:660 -q:v 3 bd/v$n-$k.jpg; k=$((k+1)); done; done
node -e "const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1790,height:900}});await p.goto('http://localhost:8993/board.html');await p.waitForFunction(()=>window.READY===1);await p.screenshot({path:'$F/../../../x2p-r106-five-cuts.jpg',fullPage:true,type:'jpeg',quality:88});await b.close()})()"
echo board ok
