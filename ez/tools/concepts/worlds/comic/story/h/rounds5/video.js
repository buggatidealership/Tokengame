// rounds5 video: scroll into Hot off the press, the newest print rolls on and drips, the sheets sway, tap one: it lets go of its
// clip, comes to you and opens the round's slab (the live page's own); close it and the sheet hangs back on the wire.
// node video.js <out.mp4> [variant A-plain] [W x H]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const {inject}=require('./shot.js');const {execSync}=require('child_process');const fs=require('fs'),path=require('path');
const [OUT,V='A-plain',SZ='390x844']=process.argv.slice(2);const[W,H]=SZ.split('x').map(Number);
(async()=>{const dir=fs.mkdtempSync('/tmp/claude-0/r5v-');const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir,size:{width:W,height:H}}});const p=await ctx.newPage();await fonts(p);
 const t0=Date.now();await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(4000);
 await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY-innerHeight*1.1)});await p.waitForTimeout(1200);
 await inject(p,V);await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');scrollTo(0,s.getBoundingClientRect().top+scrollY-innerHeight*1.1)});await p.waitForTimeout(800);
 const start=(Date.now()-t0)/1000;
 const target=await p.evaluate(()=>{const s=document.querySelector('.r5');return s.getBoundingClientRect().top+scrollY-(innerWidth>=1000?60:50)});
 await p.evaluate(async y=>{const y0=scrollY,d=y-y0;for(let i=1;i<=60;i++){scrollTo(0,y0+d*(1-Math.pow(1-i/60,3)));await new Promise(r=>setTimeout(r,25))}},target);
 await p.waitForTimeout(7500);
 await p.evaluate(()=>window.__R5take(0));await p.waitForTimeout(4200);
 await p.keyboard.press('Escape');await p.waitForTimeout(400);
 if(await p.evaluate(()=>/round/.test(location.hash)))await p.evaluate(()=>{history.back()});
 await p.waitForTimeout(2600);
 await p.evaluate(()=>window.__R5take(1));await p.waitForTimeout(3000);
 const vid=p.video();await ctx.close();await b.close();const src=await vid.path();
 execSync(`ffmpeg -y -loglevel error -ss ${start.toFixed(2)} -i ${src} -c:v libx264 -pix_fmt yuv420p -crf 24 -r 30 -movflags +faststart ${OUT}`);console.log(OUT,'from',start.toFixed(1),'s');fs.rmSync(dir,{recursive:true})})();
