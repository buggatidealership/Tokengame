/* The logo look (owner, 2026-10-27): standings, proof and certificate borrowed from the EZ. logo. node logo-board.js [now,L1,L2,L3]
   -> scratchpad/logo-board/<id>-{std,proof,cert}.png (390x844 at 3x); the takes live in modern-board/_logo.js */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/logo-board/';fs.mkdirSync(S,{recursive:true});
const MK=fs.readFileSync(__dirname+'/modern-board/_logo.js','utf8');const LOGO=fs.readFileSync(__dirname+'/ez-logo-traced.svg','utf8');
const GF='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,700;1,800;1,900&display=swap';
async function to(p,sel){await p.evaluate(s=>{const e=document.querySelector(s);const t=e.querySelector('h2')||e;const hd=document.querySelector('header,.top');const h=hd?hd.getBoundingClientRect().height:0;scrollTo(0,t.getBoundingClientRect().top+scrollY-h-62)},sel);await p.waitForTimeout(1200)}
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||'now,L1,L2,L3').split(',');
 for(const id of ids){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});await to(p,'#record');
  if(id!=='now'){await p.evaluate(u=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;l.onload=r;l.onerror=r;document.head.appendChild(l)}),GF);
   await p.evaluate(([d,l])=>{window.__lg=d;window.__ezlogo=l},[id,LOGO]);await p.addScriptTag({content:MK});await p.evaluate(()=>document.fonts.ready);}
  await p.waitForTimeout(1000);
  await to(p,'#standings');await p.screenshot({path:S+id+'-std.png'});
  await to(p,'#learn');await p.screenshot({path:S+id+'-proof.png'});
  await to(p,'#record');await p.evaluate(async()=>{const c=document.querySelector('#car .card.cur');const f=c.querySelector('.face.front [data-flip]')||c;f.click();await new Promise(r=>setTimeout(r,1400))});
  await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');const hd=document.querySelector('header,.top');scrollTo(0,c.getBoundingClientRect().top+scrollY-(hd?hd.getBoundingClientRect().height:0)-150)});await p.waitForTimeout(800);
  await p.screenshot({path:S+id+'-cert.png'});
  console.log(id,JSON.stringify(await p.evaluate(()=>[window.__lgOk,document.documentElement.scrollWidth])),errs.join('|')||'ok');await c.close()}
 await b.close()})();
