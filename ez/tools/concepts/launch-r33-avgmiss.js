// Round 33 mockups (owner, 2026-10-24): the proof ticket's Avg miss view, "the targets do not follow the design principle of it being
// integrated. It still feels like it's slapped on to the piece of paper." Each option prints every mark into the ticket's own card.
// Shoots the real X2+ page (local server on 8897): opens the proof ticket's Avg miss tab, then (unless the id is "now") injects
// tools/concepts/launch-r33-avgmiss/<id>.css and runs _data.js + <id>.js (function bodies) to rebuild that view's body in place.
// usage: node launch-r33-avgmiss.js <id|now> [outdir] [widths]  ->  <id>-<w>.png (the whole proof ticket), <id>.json (measurements)
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2]||'now',OUT=process.argv[3]||S+'am/',WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DIR=path.join(__dirname,'launch-r33-avgmiss');
const rd=f=>fs.existsSync(path.join(DIR,f))?fs.readFileSync(path.join(DIR,f),'utf8'):'';
const css=id==='now'?'':rd('_base.css')+'\n'+rd(id+'.css'),js=id==='now'?'':rd('_data.js')+'\n'+rd(id+'.js');
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
for(const W of WS){
 const ctx=await b.newContext(W<700?{viewport:{width:W,height:W<360?640:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
 await p.$eval('#learn .x2p-pt',e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(700);
 // the other views' height first (the ticket's one height), then the Avg miss tab
 const before=await p.evaluate(()=>{const t=document.querySelector('#learn .x2p-pt'),i=t.querySelector('.pt-in');return {ticket:+t.getBoundingClientRect().height.toFixed(2),inner:+i.getBoundingClientRect().height.toFixed(2),tin:getComputedStyle(t).getPropertyValue('--tin').trim()}});
 await p.click('#learn .x2p-pt [data-pt="miss"]');await p.waitForTimeout(700);
 if(id!=='now'){await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r33am';s.textContent=css;document.head.appendChild(s);(new Function(js))()},{css,js});
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600)}
 const m=await p.evaluate(()=>{const t=document.querySelector('#learn .x2p-pt'),i=t.querySelector('.pt-in'),bd=t.querySelector('.pt-body'),ir=i.getBoundingClientRect();
   const clip=[];bd.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return;if(getComputedStyle(e).visibility==='hidden'||e.closest('.sr'))return;
     if(r.left<ir.left-.5||r.right>ir.right+.5||r.top<ir.top-.5||r.bottom>ir.bottom+.5)clip.push((e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className||e.tagName)+' '+[r.left,r.top,r.right,r.bottom].map(v=>v.toFixed(1)).join(',')+' vs '+[ir.left,ir.top,ir.right,ir.bottom].map(v=>v.toFixed(1)).join(','))});
   // text that overflows its own box (cut off)
   const cut=[];bd.querySelectorAll('*').forEach(e=>{if(!(e instanceof HTMLElement)||e.closest('.sr'))return;const cs=getComputedStyle(e);if(cs.overflow==='visible')return;if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)cut.push((e.className||e.tagName)+' '+e.scrollWidth+'/'+e.clientWidth+' '+e.scrollHeight+'/'+e.clientHeight)});
   return {ticket:+t.getBoundingClientRect().height.toFixed(2),inner:+ir.height.toFixed(2),bodyH:+bd.getBoundingClientRect().height.toFixed(2),bodyScroll:bd.scrollHeight,bodyClient:bd.clientHeight,clip:clip.slice(0,8),clipN:clip.length,cut:cut.slice(0,6),hscroll:document.documentElement.scrollWidth>innerWidth+1,text:bd.innerText.replace(/\s+/g,' ').slice(0,900)}});
 m.before=before;m.sameHeight=Math.abs(m.ticket-before.ticket)<.5;
 const el=await p.$('#learn .x2p-pt');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:OUT+id+'-'+W+'.png'});
 m.errors=errs;res[W]=m;console.log(id,W,'ticket',m.ticket,'(other views',before.ticket+')','same',m.sameHeight,'clip',m.clipN,'cut',m.cut.length,'hscroll',m.hscroll,'errs',errs.length);await ctx.close()}
fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));await b.close()})();
