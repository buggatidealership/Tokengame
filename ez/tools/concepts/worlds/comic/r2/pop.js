// node pop.js <out dir> <WxH> <round n> [tag] : the round pop-up card, front and back (after a flip), on the built X3+
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),N=process.argv[4]||'57',TAG=process.argv[5]||'',PAGE=process.env.PAGE||'v47-live-x3plus.html';
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:2});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text().slice(0,200))});
 await p.goto('http://localhost:8897/'+PAGE+(process.env.Q||'')+'#/round/'+N,{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(2500);
 const c=await p.$('#x2pRm .card');if(!c){console.log('no card');await b.close();return}
 await c.screenshot({path:`${OUT}/pop${TAG}-${N}-${VW}-front.png`});
 const fb=await p.$('#x2pRm .face.front .flipb, #x2pRm .face.front [data-flip]');
 if(fb){await fb.click().catch(()=>{});await p.waitForTimeout(1600);await c.screenshot({path:`${OUT}/pop${TAG}-${N}-${VW}-back.png`})}
 const ov=await p.evaluate(()=>{const o=[];const cert=document.querySelector('#x2pRm .wc-cert');if(!cert)return 'no cert';const R=cert.getBoundingClientRect();cert.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5))o.push(e.className+' '+Math.round(r.right-R.right)+','+Math.round(r.bottom-R.bottom))});return o.slice(0,10)});
 console.log(N,VW,'overflow:',JSON.stringify(ov),'errors:',er.join(' | ')||'none');await b.close()})();
