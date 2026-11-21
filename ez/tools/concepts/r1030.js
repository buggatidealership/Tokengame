/* r1030 mockups (owner, 2026-10-27, night): node r1030.js std [F1,F2..F5] | proof [P1..P5] -> scratchpad/r1030/ */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1030/';fs.mkdirSync(S,{recursive:true});const D=__dirname+'/r1030/',rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function open(b,url){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
 await p.goto(url,{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
 const has=async()=>{try{return !!(await p.$('#standings'))}catch(e){await p.waitForTimeout(3000);try{return !!(await p.$('#standings'))}catch(e2){return false}}};for(let i=0;i<4&&!(await has());i++){await p.reload({waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForTimeout(5000)}
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
 await p.evaluate(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&display=swap';document.head.appendChild(l)});
 await p.waitForTimeout(1200);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);return p}
async function shot(p,sel,path,from){const el=await p.$(sel);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
 const r=await p.evaluate(([s,f])=>{const e=document.querySelector(s),t0=(f&&document.querySelector(f)||e).getBoundingClientRect().top;let b=e.getBoundingClientRect().bottom;e.querySelectorAll('*').forEach(c=>{const q=c.getBoundingClientRect();if(q.height&&q.bottom>b&&getComputedStyle(c).display!=='none')b=q.bottom});return {y:t0+scrollY,h:b-t0}},[sel,from]);
 await p.addStyleTag({content:'header.top,header{position:relative!important;top:auto!important}'});await p.waitForTimeout(200);
 await p.screenshot({path,fullPage:true,clip:{x:0,y:r.y-6,width:390,height:Math.min(r.h+18,3000)}})}
(async()=>{const b=await chromium.launch();const mode=process.argv[2],only=process.argv[3];
 if(mode==='std'){for(const v of (only||'F1,F2,F3,F4,F5').split(',')){
   if(v==='F1'){const p=await open(b,'https://earningszn.xyz/');await p.evaluate(()=>{window.__aj=4});await p.evaluate(rd(__dirname+'/r1029/a.js'));await p.evaluate(rd(D+'f1.js'));
     await p.waitForTimeout(400);await shot(p,'#standings ol.lbl',S+v+'.png','#standings .lb-h, #standings ol.lbl');console.log(v,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close();continue}
   const p=await open(b,'http://127.0.0.1:8897/v46-live-x2plus.html');await p.addStyleTag({content:rd(D+'f.css')});await p.evaluate(x=>{window.__fV=x},v);await p.evaluate(rd(D+'f.js'));await p.waitForTimeout(500);
   await shot(p,'#standings',S+v+'.png','.f30');console.log(v,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}}
 if(mode==='proof'){for(const v of (only||'P1,P2,P3,P4,P5').split(',')){const p=await open(b,'http://127.0.0.1:8897/v46-live-x2plus.html');
   if(v!=='now'){await p.addStyleTag({content:rd(D+'p.css')+rd(D+v.toLowerCase()+'.css')});await p.evaluate(x=>{window.__pV=x},v);await p.evaluate(rd(D+'p.js'))}await p.waitForTimeout(500);
   for(const k of ['pnl','acc','tgt','sec']){await p.evaluate(k=>{const b=document.querySelector('.rz-tb button[data-v="'+k+'"]');b&&b.click()},k);await p.waitForTimeout(250);await shot(p,'#learn',S+v+'-'+k+'.png','.rz-pf')}
   console.log(v,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}}
 await b.close()})();
