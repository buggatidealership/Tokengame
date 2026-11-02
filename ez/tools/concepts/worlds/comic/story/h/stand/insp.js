const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
const o=await p.evaluate(()=>{const R=window.ROUNDS;const pick=n=>R.find(r=>r.n===n);
 const keys=Object.keys(R[0]);
 const sec=[...document.querySelectorAll('main section')].map(s=>s.id+'.'+s.className.slice(0,40)+' h'+Math.round(s.getBoundingClientRect().height));
 const card=document.querySelector('#car .card');
 return {keys,r40:pick(40),r60:pick(60),r61:pick(61),nR:R.length,films:typeof FILMS,stills:typeof STILLS,sec,
  card:card?card.outerHTML.slice(0,3500):null,ncards:document.querySelectorAll('#car .card').length,
  fns:Object.keys(window).filter(k=>/x2p|grade|slab|Grade/i.test(k)).slice(0,60)}});
console.log(JSON.stringify(o,null,1));console.log(er);await b.close()})();
