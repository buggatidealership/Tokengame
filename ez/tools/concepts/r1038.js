/* r1038: node r1038.js std|proof now,A,B|now,P  (W=390 default) -> scratchpad/r1038/<what>-<v>-<W>[-tab].png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1038/';fs.mkdirSync(S,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/r1038/'+f,'utf8');
const what=process.argv[2]||'std',VS=(process.argv[3]||'now,A,B').split(',');
(async()=>{const b=await chromium.launch();for(const W of (process.env.W||'390').split(',').map(Number))for(const v of VS){
 const p=await (await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:+(process.env.DPR||3),reducedMotion:'reduce'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
 await p.addStyleTag({content:'header.top,header{position:relative!important;top:auto!important}'});
 if(what==='std'&&v!=='now'){await p.addStyleTag({content:rd('std.css')});await p.evaluate(x=>{window.__sV=x},v);await p.evaluate(rd('std.js'))}
 if(what==='proof'&&v!=='now'){await p.addStyleTag({content:rd('proof.css')});await p.evaluate(x=>{window.__pV=x},v);await p.evaluate(rd('proof.js'))}
 await p.waitForTimeout(900);
 const shot=async(sel,name)=>{const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();const q=e.getBoundingClientRect();let bt=q.bottom;e.querySelectorAll('*').forEach(c=>{const z=c.getBoundingClientRect();if(z.height&&z.bottom>bt&&z.bottom<q.bottom+60&&getComputedStyle(c).display!=='none')bt=z.bottom});return {y:q.top+scrollY-6,h:bt-q.top+30}},sel);
  await p.screenshot({path:S+name,fullPage:true,clip:{x:0,y:r.y,width:W,height:r.h}})};
 if(what==='std'){await shot('#standings',`std-${v}-${W}.png`)}
 else{for(const [i,t] of ['pnl','acc','tgt','sec'].entries()){await p.evaluate(i=>{const bs=document.querySelectorAll('#learn .x2p-pt .pt-tb button');bs[i]&&bs[i].click()},i);await p.waitForTimeout(1300);await shot('#learn',`proof-${v}-${W}-${t}.png`)}}
 console.log(what,v,W,errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}await b.close()})();
