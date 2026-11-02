// node run.js <out> <ids now,A,B,C,D> [widths 390,1280] [dpr 2] : serve ez/ on 8954 first (cd ez && python3 -m http.server 8954).
// Lays _r6.css + _r6.js over the built v46-live-x2plus.html, shoots #record (sec-<W>-<id>.png) and the page from the chips' end to the record's end
// (ctx-<W>-<id>.png), and prints the tests (min cap height of live words in CSS px, paintings' source px vs 3x, overflow, errors) as JSON.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now,A').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  if(id!=='now'){await p.addStyleTag({content:rd('_r6.css')});await p.evaluate(t=>{window.__R6=t},id);await p.addScriptTag({content:rd('_r6.js')});await p.waitForFunction(()=>document.querySelector('.r6'),null,{timeout:30000})}
  await p.evaluate(()=>{document.querySelectorAll('#record img,#record image').forEach(i=>{if(i.loading)i.loading='eager'});document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(400);
  await p.waitForFunction(()=>[...document.querySelectorAll('#record img')].filter(i=>i.offsetParent).every(i=>i.complete),null,{timeout:60000}).catch(()=>{});
  await p.evaluate(()=>window.__r6&&__r6.scale());await p.waitForTimeout(1500);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed'||getComputedStyle(x).position==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.getElementById('record'),r=s.getBoundingClientRect(),c=document.querySelector('.ch.c7');const cr=c?c.getBoundingClientRect():r;
    return {y:r.top+scrollY,h:r.height,cy:Math.max(0,cr.bottom+scrollY-260)}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,7000)},fullPage:true});
  await p.screenshot({path:`${OUT}/ctx-${W}-${id}.png`,clip:{x:0,y:box.cy,width:W,height:Math.min(box.y+box.h-box.cy,7000)},fullPage:true});
  const m=await p.evaluate(()=>{const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(document.getElementById('record').getBoundingClientRect().height),caps:[],imgs:[]};
    document.querySelectorAll('.r6-sv').forEach(sv=>{const k=sv.getBoundingClientRect().width/sv.viewBox.baseVal.width;sv.querySelectorAll('text[data-cap]').forEach(t=>out.caps.push([+(t.dataset.cap*k).toFixed(2),t.textContent]))});
    const mins=out.caps.slice().sort((a,b)=>a[0]-b[0]);out.minCap=mins.slice(0,4);out.nText=out.caps.length;out.under9=out.caps.filter(c=>c[0]<9).length;delete out.caps;
    const seen=new Set();document.querySelectorAll('.r6 .r6-pa>img,.r6 .r6-wf>img,.r6 .r6-pd>img').forEach(i=>{const r=i.closest('div').getBoundingClientRect(),k=i.src.split('/').pop()+'@'+Math.round(r.width);if(seen.has(k))return;seen.add(k);out.imgs.push({f:i.src.split('/').pop(),cssW:Math.round(r.width),srcW:i.naturalWidth,need3x:Math.round(r.width*3),t1:i.naturalWidth>=r.width*3})});
    /* frames: the film frame's source px against its CSS box at 3x */
    const fr=[...document.querySelectorAll('.r6 .r6-fr,.r6 .r6-dfr')].slice(0,1).map(i=>{const r=i.getBoundingClientRect();return {cssW:+r.width.toFixed(1),cssH:+r.height.toFixed(1),src:'450x600',ok3x:450>=r.width*3}});out.frame=fr[0];
    return out});
  if(id!=='now'&&W===390){const it=await p.$('.r6 .r6-it:not(.r6-next)');if(it)await it.screenshot({path:`${OUT}/row-${W}-${id}.png`});if(id==='B'){const wf=await p.$('.r6-wf');if(wf)await wf.screenshot({path:`${OUT}/wafer-${W}.png`})}}
  // a tap opens the round as today
  if(id!=='now'&&W===390){const a=await p.$('.r6 a[href^="#/round/"]');if(a){const href=await a.getAttribute('href');await a.click();await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),slab:await p.evaluate(()=>{const e=document.getElementById('x2pRm');return !!(e&&e.offsetParent!==null||e&&getComputedStyle(e).display!=='none')})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
