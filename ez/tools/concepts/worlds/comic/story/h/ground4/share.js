// node share.js [widths]: how much of the Overview (top to the end of the bet) is the page's own ground: the ground painted pure magenta, the page shot, magenta pixels counted.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const {execSync}=require('child_process');
const WS=(process.argv[2]||'390,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch();const R={};
 for(const W of WS){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},reducedMotion:'reduce'})).newPage();await FONTS(p);
  await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}scrollTo(0,0)});
  await p.addStyleTag({content:'html{background:#ff00ff!important}html.x2p.x2d[data-theme="dark"] body::before{background:none!important}'});await p.waitForTimeout(1200);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
  const e=await p.evaluate(()=>Math.round(document.getElementById('x2pSt').getBoundingClientRect().bottom+scrollY));const f=`/tmp/claude-0/share-${W}.png`;
  await p.screenshot({path:f,clip:{x:0,y:0,width:W,height:e},fullPage:true});
  const out=execSync(`/usr/bin/python3 -c "
from PIL import Image;import numpy as np
a=np.asarray(Image.open('${f}').convert('RGB')).astype(int);m=(a[...,0]>200)&(a[...,1]<60)&(a[...,2]>200)
rows=m.mean(1);print(round(m.mean(),3),round((rows>.5).mean(),3))"`).toString().trim().split(' ');
  R[W]={groundShare:+out[0],rowsMostlyGround:+out[1]};console.log(W,R[W])}
 fs.writeFileSync(__dirname+'/share.json',JSON.stringify(R,null,1));await b.close()})();
