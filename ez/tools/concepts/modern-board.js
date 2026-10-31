/* Modern board mockups (owner, 2026-10-27): alternatives to the pressed-paper standings and proof. node modern-board.js [now,A,B,C,D,E]
   -> scratchpad/modern-board/<id>-{std,proof}.png (390x844 phone screens at 3x); the directions live in modern-board/_mk.js */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/modern-board/';fs.mkdirSync(S,{recursive:true});
const MK=fs.readFileSync(__dirname+'/modern-board/_mk.js','utf8');
const GF='https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Saira+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Inter:wght@500;600;700;800&family=Archivo:wght@600;700;800&display=swap';
async function to(p,sel){await p.evaluate(s=>{const e=document.querySelector(s);const hd=document.querySelector('header,.top');const h=hd?hd.getBoundingClientRect().height:0;const t=e.querySelector('h2')||e;scrollTo(0,t.getBoundingClientRect().top+scrollY-h-62)},sel);await p.waitForTimeout(1200)}
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||'now,A,B,C,D,E').split(',');
 for(const id of ids){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  if(id!=='now'){await p.evaluate(u=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;l.onload=r;l.onerror=r;document.head.appendChild(l)}),GF);
   await p.evaluate(d=>{window.__mb=d},id);await p.addScriptTag({content:MK});await p.evaluate(()=>document.fonts.ready);}
  await p.waitForTimeout(1200);
  await to(p,'#standings');await p.screenshot({path:S+id+'-std.png'});
  await to(p,'#learn');await p.screenshot({path:S+id+'-proof.png'});
  console.log(id,(await p.evaluate(()=>[window.__mbOk,document.documentElement.scrollWidth])),errs.join('|')||'ok');await c.close()}
 await b.close()})();
