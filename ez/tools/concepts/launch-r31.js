// Round 31 mockups (owner, 2026-10-23): the NVIDIA bet ticket leaves the first screen for a bet section at the bottom of the
// Overview, the film gets more room (or a tap to enlarge), and the bet section says more bets are coming (Season 2).
// Shoots the real X2+ page (local server on 8897) with one variant injected: tools/concepts/launch-r31/<id>.css and <id>.js
// (a function body run after load). The js may set window.__r31 = {shot:'<css selector of the part to shoot close up>',
// after:'<js run before an extra "after" shot, e.g. the enlarged film>', landscape:true (also shoot an 844x390 phone after "after")}.
// usage: node launch-r31.js <id> [outdir] -> <id>-390.png (first screen 390x844), <id>-390-shot.png, <id>-1280.png, <id>-1280-shot.png,
//   <id>-390-after.png / <id>-1280-after.png / <id>-land-after.png when asked, and <id>.json (positions, timer ticking, errors, h-scroll)
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2],OUT=process.argv[3]||S+'bet/out/',DIR=path.join(__dirname,'launch-r31');
const css=fs.existsSync(path.join(DIR,id+'.css'))?fs.readFileSync(path.join(DIR,id+'.css'),'utf8'):'';
const js=fs.existsSync(path.join(DIR,id+'.js'))?fs.readFileSync(path.join(DIR,id+'.js'),'utf8'):'';
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
const sizes=[['390',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}],['1280',{viewport:{width:1280,height:900},deviceScaleFactor:1,reducedMotion:'reduce'}]];
for(const [W,opt] of sizes){
 const ctx=await b.newContext(opt);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(()=>{const t=document.querySelector('#standings .x2p-ast .tk');const bi=t?getComputedStyle(t).backgroundImage:'';const m=bi.match(/url\("data:image\/svg\+xml[^"]*"\)/);
   if(m)document.documentElement.style.setProperty('--r31-paper',m[0])});
 await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r31';s.textContent=css;document.head.appendChild(s);if(js)(new Function(js))()},{css,js});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(250);
 const cfg=await p.evaluate(()=>window.__r31||{});
 const m=await p.evaluate(()=>{const q=s=>document.querySelector(s),r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top+scrollY),Math.round(b.width),Math.round(b.height)]};
   const v=q('.x2p-vt video'),bt=q('.x2p-bt'),st=q('#standings');
   return {film:r(v),betTicket:r(bt),betTicketSection:bt?(bt.closest('section')||{}).id||(bt.closest('section')||{}).className:null,standingsTop:st?r(st)[1]:null,
     order:[...document.querySelectorAll('section.sec,section.x2o-bet,section.hero')].filter(s=>s.offsetHeight).map(s=>(s.id||s.className.split(' ')[0])+'@'+Math.round(s.getBoundingClientRect().top+scrollY)),
     timer:bt?bt.innerHTML.length+':'+bt.innerHTML.replace(/\s+/g,'').slice(-0):null,hscroll:document.documentElement.scrollWidth>innerWidth}});
 await p.waitForTimeout(1300);m.timerTicks=await p.evaluate(t=>{const bt=document.querySelector('.x2p-bt');return bt?(bt.innerHTML.length+':'+bt.innerHTML.replace(/\s+/g,''))!==t:null},m.timer);delete m.timer;
 await p.screenshot({path:OUT+id+'-'+W+'.png'});
 if(cfg.shot){const e=await p.$(cfg.shot);if(e){await e.scrollIntoViewIfNeeded();await p.waitForTimeout(500);const bb=await e.boundingBox();const pad=W==='390'?12:24;
   await p.screenshot({path:OUT+id+'-'+W+'-shot.png',clip:{x:Math.max(0,bb.x-pad),y:Math.max(0,bb.y-pad),width:Math.min(+W-Math.max(0,bb.x-pad),bb.width+2*pad),height:bb.height+2*pad},fullPage:false}).catch(async()=>{await e.screenshot({path:OUT+id+'-'+W+'-shot.png'})});
   m.shot=[Math.round(bb.width),Math.round(bb.height)]}else m.shot='selector not found'}
 if(cfg.after){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(200);await p.evaluate(a=>(new Function(a))(),cfg.after);await p.waitForTimeout(700);await p.screenshot({path:OUT+id+'-'+W+'-after.png'})}
 m.errors=errs;res[W]=m;await ctx.close()}
// landscape phone, for an enlarged film
{const ctx=await b.newContext({viewport:{width:844,height:390},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await ctx.newPage();
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(({css,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);if(js)(new Function(js))()},{css,js});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
 const cfg=await p.evaluate(()=>window.__r31||{});if(cfg.landscape&&cfg.after){await p.evaluate(a=>(new Function(a))(),cfg.after);await p.waitForTimeout(700);await p.screenshot({path:OUT+id+'-land-after.png'})}await ctx.close()}
fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));console.log(id,JSON.stringify(res));await b.close()})();
