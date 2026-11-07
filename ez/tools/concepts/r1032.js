/* r1032: node r1032.js -> scratchpad/r1032/{now,live}-{pnl,acc,tgt,sec}.png at 390 */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1032/';fs.mkdirSync(S,{recursive:true});
(async()=>{const b=await chromium.launch();for(const v of ['now','live']){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.addStyleTag({content:'header.top,header{position:relative!important;top:auto!important}'});
 if(v==='live'){await p.evaluate(fs.readFileSync(__dirname+'/r1032/live.js','utf8'));await p.waitForTimeout(800)}
 const tabs=v==='live'?['roi','hit','miss','sector']:['pnl','acc','tgt','sec'];const names=['pnl','acc','tgt','sec'];
 for(let i=0;i<4;i++){await p.evaluate(([v,k])=>{const b=v==='live'?document.querySelector('#learn .pt-tb button[data-pt="'+k+'"]'):document.querySelector('.rz-tb button[data-v="'+k+'"]');b&&b.click()},[v,tabs[i]]);await p.waitForTimeout(700);
  const r=await p.evaluate(()=>{const e=document.querySelector('#learn');e.scrollIntoView();const q=e.getBoundingClientRect();let bt=q.bottom;e.querySelectorAll('*').forEach(c=>{const z=c.getBoundingClientRect();if(z.height&&z.bottom>bt&&getComputedStyle(c).display!=='none')bt=z.bottom});return {y:q.top+scrollY,h:bt-q.top}});
  await p.waitForTimeout(300);await p.screenshot({path:S+v+'-'+names[i]+'.png',fullPage:true,clip:{x:0,y:r.y,width:390,height:Math.min(r.h+10,3000)}});
  console.log(v,names[i],Math.round(r.h))}
 console.log(v,errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await c.close()}await b.close()})();
