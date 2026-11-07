/* r1031 mockups (owner, 2026-10-27, night): node r1031.js [now,L,S,T1,T2,T3] -> scratchpad/r1031/ */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1031/';fs.mkdirSync(S,{recursive:true});const D=__dirname+'/r1031/',rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function shot(p,sel,path,from){const r=await p.evaluate(([s,f])=>{const e=document.querySelector(s);e.scrollIntoView();const t0=(f&&document.querySelector(f)||e).getBoundingClientRect().top;let b=e.getBoundingClientRect().bottom;e.querySelectorAll('*').forEach(c=>{const q=c.getBoundingClientRect();if(q.height&&q.bottom>b&&getComputedStyle(c).display!=='none')b=q.bottom});return {y:t0+scrollY,h:b-t0}},[sel,from]);
 await p.waitForTimeout(300);await p.screenshot({path,fullPage:true,clip:{x:0,y:r.y-6,width:390,height:Math.min(r.h+16,3000)}})}
(async()=>{const b=await chromium.launch();for(const v of (process.argv[2]||'now,L,S,T1,T2,T3').split(',')){
 const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.addStyleTag({content:'header.top,header{position:relative!important;top:auto!important}'+(/^[LS]$/.test(v)?rd(D+v+'.css'):'')});
 if(/^T/.test(v)){await p.evaluate(x=>{window.__tV=x},v);await p.evaluate(rd(D+'t.js'))}
 await p.waitForTimeout(400);
 if(!/^T/.test(v))await shot(p,'#standings',S+v+'-std.png','.f30');
 for(const k of (/^T/.test(v)?['tgt']:['pnl','acc','tgt','sec'])){await p.evaluate(k=>document.querySelector('.rz-tb button[data-v="'+k+'"]').click(),k);if(/^T/.test(v)){await p.evaluate(x=>{window.__tV=x},v);await p.evaluate(rd(D+'t.js'))}await p.waitForTimeout(300);await shot(p,'#learn',S+v+'-'+k+'.png','.rz-pf')}
 console.log(v,p.errs.join('|')||'ok');await c.close()}await b.close()})();
