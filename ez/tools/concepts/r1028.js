/* r1028 mockups (owner, 2026-10-27 night). node r1028.js cert [today,CA,CB] | proof [today,PI] | std [L2,TT] | head
   -> scratchpad/r1028/*.png (390 wide phone, 3x). Runs on the real X2+ page (http://127.0.0.1:8897); nothing on the site changes. */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1028/';fs.mkdirSync(S,{recursive:true});
const D=__dirname+'/r1028/',rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
const GF='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,700;1,800;1,900&family=Saira+Condensed:wght@600;700;800&family=JetBrains+Mono:wght@500;600&display=swap';
async function open(b,w,h){const c=await b.newContext({viewport:{width:w,height:h||844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
 await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
 await p.evaluate(u=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;l.onload=r;l.onerror=r;document.head.appendChild(l)}),GF);await p.evaluate(()=>document.fonts.ready);return p}
async function to(p,sel,off){await p.evaluate(([s,o])=>{const e=document.querySelector(s);const hd=document.querySelector('header,.top');const h=hd?hd.getBoundingClientRect().height:0;const t=e.querySelector('h2')||e;scrollTo(0,t.getBoundingClientRect().top+scrollY-h-(o==null?62:o))},[sel,off]);await p.waitForTimeout(1000)}
const mode=process.argv[2],only=process.argv[3];
(async()=>{const b=await chromium.launch();
 if(mode==='cert'){for(const id of (only||'today,CA,CB').split(','))for(const w of (process.env.WS||'390').split(',').map(Number)){const p=await open(b,w,900);
   if(id!=='today'){await p.addStyleTag({content:rd(D+'cert.css')+(id==='CB'?rd(D+'cert-b.css'):'')})}
   for(const r of ['R45','R43','R4']){
    await p.evaluate(r=>{const c=[...document.querySelectorAll('#record button,#record a')].find(e=>e.textContent.trim()===r);if(c)c.click();document.querySelector('#record').scrollIntoView()},r);await p.waitForTimeout(1600);
    await p.evaluate(()=>document.querySelector('#car .card.cur').click());await p.waitForTimeout(1600);
    if(id!=='today'){await p.evaluate(rd(D+'cert.js'));await p.waitForTimeout(300)}
    const o=await p.evaluate(()=>{const c=document.querySelector('#car .card.cur .xc');if(!c)return 'no xc';const R=c.getBoundingClientRect(),bad=[];c.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>R.right+.5||r.left<R.left-.5))bad.push(e.className.baseVal!=null?e.className.baseVal:e.className)});return bad.slice(0,6)});
    const c=await p.$('#car .card.cur');await c.screenshot({path:S+'cert-'+id+(w===390?'':'-'+w)+'-'+r+'.png'});console.log(id,r,JSON.stringify(o),p.errs.join('|')||'ok');
    await p.evaluate(()=>document.querySelector('#car .card.cur').click());await p.waitForTimeout(900)}
   await p.context().close()}}
 if(mode==='proof'){for(const id of (only||'today,PI').split(',')){const p=await open(b,390,844);
   if(id!=='today'){await p.addStyleTag({content:rd(D+'proof.css')});await p.evaluate(rd(D+'proof.js'))}
   if(id==='PW'||id==='PT'){await p.evaluate(w=>{window.__wlWord=w},id==='PW'?'Biggest':'Top');await p.evaluate(rd(D+'proofwl.js'))}
   for(const k of (/^P[WT]$/.test(id)?['roi']:['roi','hit','miss','sector'])){await p.evaluate(k=>{const t=document.querySelector('#learn [data-pt="'+k+'"]');if(t)t.click()},k);await p.waitForTimeout(900);
    await to(p,'#learn .x2p-pt',70);const el=await p.$('#learn .x2p-pt');await el.screenshot({path:S+'proof-'+id+'-'+k+'.png'});}
   console.log(id,p.errs.join('|')||'ok',await p.evaluate(()=>document.documentElement.scrollWidth));await p.context().close()}}
 if(mode==='l2p'){for(const w of (process.env.WS||'390').split(',').map(Number)){const p=await open(b,w,844);await p.evaluate(rd(D+'proof-l2.js'));await p.waitForTimeout(400);
   console.log(w,JSON.stringify(await p.evaluate(()=>window.__r2vOk)),p.errs.join('|')||'ok','sw',await p.evaluate(()=>document.documentElement.scrollWidth));
   for(const k of ['pnl','acc','tgt','sec']){const el=await p.$('#r2pv-'+k);await el.scrollIntoViewIfNeeded();await el.screenshot({path:S+'l2p-'+k+(w===390?'':'-'+w)+'.png'})}await p.context().close()}}
 if(mode==='std'){for(const id of (only||'L2,TT').split(',')){const p=await open(b,390,844);
   await p.addScriptTag({content:'window.__r28="'+id+'";'+rd(D+'board.js')});await p.waitForTimeout(600);
   await to(p,'#standings');await p.screenshot({path:S+'std-'+id+'.png'});
   if(id==='L2'){await to(p,'#learn');await p.screenshot({path:S+'proof-'+id+'.png'})}
   console.log(id,JSON.stringify(await p.evaluate(()=>[window.__r28Ok,document.documentElement.scrollWidth,window.__rtPl,window.__rtGap,(document.querySelector('.rt-cols span:last-child')||{}).style?.paddingRight])),p.errs.join('|')||'ok');await p.context().close()}}
 await b.close()})();
