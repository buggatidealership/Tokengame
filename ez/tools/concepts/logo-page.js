/* The logo look across the page (owner, 2026-10-27: the logo "felt present on the page through design and colour coding"; a full makeover
   decided after mockups). node logo-page.js [now,light,full] -> scratchpad/logo-page/<id>-<screen>.png (390x844 at 3x).
   light = logo-page/light.css only; full = light + modern-board/_logo.js L1 (standings, proof, certificate). */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/logo-page/';fs.mkdirSync(S,{recursive:true});
const LIGHT=fs.readFileSync(__dirname+'/logo-page/light.css','utf8'),MK=fs.readFileSync(__dirname+'/modern-board/_logo.js','utf8'),LOGO=fs.readFileSync(__dirname+'/ez-logo-traced.svg','utf8');
const GF='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,700;1,800;1,900&display=swap';
async function to(p,sel,dy){await p.evaluate(([s,dy])=>{const e=document.querySelector(s);const t=e.querySelector('h2')||e;const hd=document.querySelector('header,.top');scrollTo(0,t.getBoundingClientRect().top+scrollY-(hd?hd.getBoundingClientRect().height:0)-(dy==null?62:dy))},[sel,dy]);await p.waitForTimeout(1100)}
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||'now,light,full').split(',');
 for(const id of ids){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}html.x2p .x2p-vt .vt-f video{opacity:0!important}html.x2p .x2p-vt .vt-f{background:#000 url(media/ez-landing-v4-poster-b.jpg) center/cover!important}'});
  if(id!=='now'){await p.evaluate(u=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;l.onload=r;l.onerror=r;document.head.appendChild(l)}),GF);await p.addStyleTag({content:LIGHT});await p.evaluate(()=>{['#record','#standings','#x2pSt'].forEach(function(sel){var h=document.querySelector(sel+' .sh h2');if(!h)return;var t=[...h.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).pop();if(!t)return;var w=t.textContent.replace(/\s+$/,'').split(' '),last=w.pop();t.textContent=w.join(' ')+(w.length?' ':'');var sp=document.createElement('span');sp.style.whiteSpace='nowrap';sp.innerHTML=last.replace(/\.$/,'')+'<i class="lgp-dot"></i>';t.after(sp)})});}
  await to(p,'#record');
  if(id==='full'){await p.evaluate(([l])=>{window.__lg='L1';window.__ezlogo=l},[LOGO]);await p.addScriptTag({content:MK});}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);await p.screenshot({path:S+id+'-top.png'});
  await to(p,'#record');await p.screenshot({path:S+id+'-record.png'});
  await p.evaluate(async()=>{const c=document.querySelector('#car .card.cur');(c.querySelector('.face.front [data-flip]')||c).click();await new Promise(r=>setTimeout(r,1400))});
  await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');const hd=document.querySelector('header,.top');scrollTo(0,c.getBoundingClientRect().top+scrollY-(hd?hd.getBoundingClientRect().height:0)-150)});await p.waitForTimeout(700);await p.screenshot({path:S+id+'-cert.png'});
  for(const [sel,n] of [['#standings','std'],['#learn','proof'],['#highlights','mvp'],['#x2pSt','bet'],['#get','get']]){await to(p,sel);await p.screenshot({path:S+id+'-'+n+'.png'})}
  console.log(id,errs.join('|')||'ok');await c.close()}
 await b.close()})();
