/* r1029 mockups (owner, 2026-10-27, night): node r1029.js live | x2p [B1,B2,C1,C2]
   live: the live site's ticket board, tickets attached (A1 the bet's join, A2 perforation only) -> scratchpad/r1029/A*.png
   x2p: the X2+ tower and proof on a bright ground (B) or bright with a ticket touch (C) -> scratchpad/r1029/<id>-*.png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1029/';fs.mkdirSync(S,{recursive:true});const D=__dirname+'/r1029/',rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function open(b,url){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,ignoreHTTPSErrors:true,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
 await p.goto(url,{waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 for(let i=0;i<3&&!(await p.$('#standings'));i++){await p.reload({waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForTimeout(4000)}return p}
async function shot(p,sel,path){const el=await p.$(sel);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
 /* the section from its head to the bottom of its last child, in page coordinates (an element shot of #learn cut the proof short) */
 const r=await p.evaluate(s=>{const e=document.querySelector(s);let b=e.getBoundingClientRect().bottom;e.querySelectorAll('*').forEach(c=>{const q=c.getBoundingClientRect();if(q.height&&q.bottom>b)b=q.bottom});const t=e.getBoundingClientRect().top;return {y:t+scrollY,h:b-t}},sel);
 await p.screenshot({path,fullPage:true,clip:{x:0,y:r.y,width:390,height:Math.min(r.h,3000)}})}
(async()=>{const b=await chromium.launch();const mode=process.argv[2],only=process.argv[3];
 if(mode==='live'){for(const v of ['now','A1','A2']){if(only&&!only.split(',').includes(v))continue;const p=await open(b,'https://earningszn.xyz/');
   if(v!=='now'){await p.evaluate(x=>{window.__aj=x},v==='A1'?1:2);await p.evaluate(rd(D+'a.js'))}await p.waitForTimeout(300);
   await shot(p,'#standings',S+v+'-standings.png');console.log(v,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}}
 if(mode==='x2p'){for(const v of (only||'now,B1,B2,C1,C2').split(',')){const p=await open(b,'http://127.0.0.1:8897/v46-live-x2plus.html');
   if(v!=='now'){await p.addStyleTag({content:rd(D+'light.css')+rd(D+v.toLowerCase()+'.css')});const js=rd(D+v.toLowerCase()+'.js')||(v==='C2'?rd(D+'c1.js'):'');if(v==='C2')await p.addStyleTag({content:rd(D+'c1.css').replace(/html\.x2p \.rz-tw[^}]*\}/g,'')});if(js)await p.evaluate(js)}
   await p.waitForTimeout(400);await shot(p,'#standings',S+v+'-standings.png');await shot(p,'#learn',S+v+'-learn.png');
   for(const k of ['tgt','sec']){await p.evaluate(k=>document.querySelector('.rz-tb button[data-v="'+k+'"]').click(),k);await p.waitForTimeout(200);await shot(p,'.rz-pf',S+v+'-'+k+'.png')}
   console.log(v,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}}
 await b.close()})();
