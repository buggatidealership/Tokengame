// Round 45 MVP backs (owner, 2026-10-28): the recap redone in the ticket and certificate family. Each option is laid over the real
// back panel of the three MVP cards (Bullseye stack's top card, Tightest race, Biggest move) where the record's certificate sits;
// every word and number is read from the page's own recap (x2plus.js hlSlabs) by r1045-mvp/_base.js.
// usage: node r1045-mvp.js <ids,comma|now> <outdir/> [widths]   ("now" shoots today's recap; X2+ served on :8897)
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const IDS=process.argv[2].split(','),OUT=process.argv[3],WS=(process.argv[4]||'390').split(',').map(Number),D=path.join(__dirname,'r1045-mvp');
const rd=f=>fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'';fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const report=[];
for(const W of WS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await c.newPage();await require('./live-r1/_fonts.js')(p);const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
 await p.evaluate(async()=>{document.querySelector('#x2pHl').scrollIntoView({block:'center'});await document.fonts.ready;
   for(const f of ['16px Anton','italic 900 16px Archivo','700 16px "Barlow Condensed"','italic 600 16px "Barlow Condensed"'])await document.fonts.load(f)});await p.waitForTimeout(900);
 await p.evaluate(js=>(new Function(js))(),rd('_base.js'));await p.addStyleTag({content:rd('_base.css')});
 for(const id of IDS){
  if(id!=='now'){await p.addStyleTag({content:rd(id.toUpperCase()+'.css')});await p.evaluate(js=>(new Function(js))(),rd(id.toUpperCase()+'.js'))}
  /* two passes: each card's own fit, then all three shot at the smallest (one type size across the row, as a carousel needs) */
  let K=null;for(const pass of id==='now'?[1]:[0,1])for(let i=0;i<3;i++){
   const m=await p.evaluate(async({id,i,K})=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')];window.__x2pHlGo(i,true);await new Promise(r=>setTimeout(r,900));
     const w=ws[i],card=w.querySelector(':scope>.card.x2p-s0')||w.querySelector('.card');document.querySelectorAll('.b45').forEach(e=>e.remove());
     document.querySelectorAll('#x2pHl .x2p-hb').forEach(h=>h.style.visibility='');
     const D=B45.data(w,card);if(id==='now')return {kind:D.kind};const el=B45.mount(card,id,B45.R[id](D,id+i));await document.fonts.ready;await new Promise(r=>setTimeout(r,250));
     let f=B45.fit(el);if(K!=null){el.style.setProperty('--k',K);f={k:K,over:B45.over(el)}}return {kind:D.kind,k:f.k,over:f.over,h:Math.round(el.clientHeight),sh:el.scrollHeight}},{id,i,K:pass?K:null});
   if(pass===0){K=K==null?m.k:Math.min(K,m.k);if(i===2)console.log(id,W,'row k',K);continue}
   const el=await p.evaluateHandle(i=>document.querySelectorAll('#x2pHl .x2p-hi')[i],i);
   await el.screenshot({path:OUT+id+'-'+m.kind+'-'+W+'.png'});console.log(id,m.kind,W,JSON.stringify(m));report.push([id,m.kind,W,m])}}
 console.log(W,'errors',errs.length?errs:0);await c.close()}
fs.writeFileSync(OUT+'report.json',JSON.stringify(report));await b.close()})();
