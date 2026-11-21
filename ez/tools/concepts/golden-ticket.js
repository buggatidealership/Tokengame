/* Logo cream, no grain, and the golden ticket (owner, 2026-10-26: "probably cleaner without the grain. Like a modern day ticket. But the video can
   still remain the other ticket... he's like the market... This is the new AI ticket game"; "the number 1 ticket is the golden ticket"; "the gold from 5";
   "higher resolution... how it would look on my phone"). The real page at 390x844, 3x: every paper flat logo cream (#f8f0d9, no relief) except the
   film's bill, which keeps today's grain; the gold foils in the logo's gold family (take 5's gold only, not its colours or ink); #1 as a golden ticket
   (golden-ticket/gold.css: egt-a..egt-d). node golden-ticket.js [take,...] [screens] -> scratchpad/golden-ticket/<take>-<screen>.png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/golden-ticket/';fs.mkdirSync(S,{recursive:true});
const SRC=fs.readFileSync(__dirname+'/../../v46-live-x2plus.html','utf8');const GCSS=fs.readFileSync(__dirname+'/golden-ticket/gold.css','utf8');
const OLD="lighting-color='%23f1e6cc' surfaceScale='1.6'%3E%3CfeDistantLight azimuth='225' elevation='62'";
const NEW="lighting-color='%23f8f0d9' surfaceScale='0'%3E%3CfeDistantLight azimuth='225' elevation='90'";
const i0=SRC.indexOf(OLD),OLDURL=SRC.slice(SRC.lastIndexOf('url("',i0),SRC.indexOf('")',i0)+2);
const gold=[[/#f6dc93|#fbe8a8|#f6d77c/gi,'#fed98a'],[/#e4b54a|#e7bd5b|#efc24a/gi,'#fdbc2a'],[/#c99227|#bf8a22|#d39c1c|#c98a12/gi,'#d99a12']];
const BILL='html.x2p.x2d.x2pbt.x2pbill .x2p-vt .vb-bl .pa{background:'+OLDURL+' 0 0/240px 240px,#efe4c8!important}html.x2p.x2d.x2pbt.x2pbill .x2p-vt{--ko:'+OLDURL+' 0 0/240px 240px,#efe4c8!important}';
const T={now:{},cream:{flat:1},A:{flat:1,gt:'egt-a'},B:{flat:1,gt:'egt-b'},C:{flat:1,gt:'egt-c'},D:{flat:1,gt:'egt-d'}};
const SCR={
 top:async p=>{await p.evaluate(()=>scrollTo(0,0));await p.evaluate(()=>new Promise(r=>{const v=document.querySelector('.x2p-vt video');if(!v||!v.poster)return r();const i=new Image();i.onload=i.onerror=()=>setTimeout(r,300);i.src=v.poster}))},
 record:async p=>{await to(p,'#record')},
 cert:async p=>{await to(p,'#record');await p.evaluate(async()=>{const c=document.querySelector('#car .card.cur');const f=c.querySelector('.face.front [data-flip]')||c;f.click();await new Promise(r=>setTimeout(r,1300))})},
 std:async p=>{await to(p,'#standings')},
 proof:async p=>{await to(p,'#learn')},
 mvp:async p=>{await to(p,'#x2pHl')},
 bet:async p=>{await to(p,'#x2pSt')}};
async function to(p,sel){await p.evaluate(s=>{const e=document.querySelector(s);const hd=document.querySelector('header,.top');const h=hd?hd.getBoundingClientRect().height:0;scrollTo(0,e.getBoundingClientRect().top+scrollY-h-6)},sel);await p.waitForTimeout(1200)}
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||'now,A').split(','),scr=(process.argv[3]||Object.keys(SCR).join(',')).split(',');
 for(const id of ids){const t=T[id];let h=SRC;if(t.flat){if(h.split(OLD).length!==39)throw new Error('paper count '+(h.split(OLD).length-1));h=h.split(OLD).join(NEW);gold.forEach(([a,c])=>{h=h.replace(a,c)})}
  const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.route('**/v46-live-x2plus.html',r=>r.fulfill({status:200,contentType:'text/html',body:h}));
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'networkidle',timeout:90000}).catch(()=>{});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}html.x2p .x2p-vt .vt-f video{opacity:0!important}html.x2p .x2p-vt .vt-f{background:#000 url(media/ez-landing-v4-poster-b.jpg) center/cover!important}'+(t.flat?BILL+'html.x2p .card .xc{background-color:#fff!important}':'')+GCSS});
  if(t.gt)await p.evaluate(g=>document.documentElement.classList.add(g),t.gt);
  await p.waitForTimeout(1500);
  for(const s of scr){await SCR[s](p);await p.screenshot({path:S+id+'-'+s+'.png'});if(s==='cert')await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');(c.querySelector('.face.back [data-flip]')||c).click()})}
  if(t.gt||id==='cream'||id==='now'){await to(p,'#standings');await (await p.$('#standings ol.lbl')).screenshot({path:S+id+'-tix.png'})}
  console.log(id,errs.join('|')||'ok');await c.close()}
 await b.close()})();
