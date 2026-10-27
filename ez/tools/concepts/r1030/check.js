/* r1030 check on the built X2+: standings (F2) and the proof (P2) at 320, 390, 1280 */
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1030/';
(async()=>{const b=await chromium.launch();for(const W of (process.argv[2]||'390').split(',').map(Number)){const c=await b.newContext({viewport:{width:W,height:844},deviceScaleFactor:W>800?1:3,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
 await p.goto('http://127.0.0.1:8897/'+(process.env.PAGE||'v46-live-x2plus.html'),{waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.addStyleTag({content:'header.top,header{position:relative!important;top:auto!important}'});
 const info=await p.evaluate(()=>({tq:!!document.querySelector('.tq30'),err:String(window.__x2pTqErr||'')+String(window.__x2pRzErr||''),sw:document.documentElement.scrollWidth,joins:document.querySelectorAll('.tq-list .qj').length,
  over:[...document.querySelectorAll('.tq30 .qn b, .tq30 .tq-pl b, .tq30 .tq-v')].filter(e=>e.scrollWidth>e.clientWidth+1).length}));
 console.log(W,JSON.stringify(info),p.errs.join('|')||'ok');
 for(const [sel,n] of [['#standings','std'],['#learn','proof']]){const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();const q=e.getBoundingClientRect();let bt=q.bottom;e.querySelectorAll('*').forEach(c=>{const z=c.getBoundingClientRect();if(z.height&&z.bottom>bt&&getComputedStyle(c).display!=='none')bt=z.bottom});return {y:q.top+scrollY,h:bt-q.top}},sel);
  await p.waitForTimeout(400);await p.screenshot({path:S+(process.env.PAGE?'x3-':'')+'chk-'+n+'-'+W+'.png',fullPage:true,clip:{x:0,y:r.y,width:W,height:Math.min(r.h+10,4000)}})}
 if(process.argv[3]){for(const k of ['acc','tgt','sec']){await p.evaluate(k=>document.querySelector('.rz-tb button[data-v="'+k+'"]').click(),k);await p.waitForTimeout(250);const r=await p.evaluate(()=>{const e=document.querySelector('.rz-pw');const q=e.getBoundingClientRect();return {y:q.top+scrollY,h:q.height}});await p.screenshot({path:S+(process.env.PAGE?'x3-':'')+'chk-'+k+'-'+W+'.png',fullPage:true,clip:{x:0,y:r.y-4,width:W,height:r.h+14}})}
  await p.evaluate(()=>document.querySelector('#standings .x2p-flipbtn').click());await p.waitForTimeout(300);console.log('how',await p.evaluate(()=>({box:document.querySelector('.tq30').hidden,how:!document.querySelector('.rz-how').hidden})))}
 await c.close()}await b.close()})();
