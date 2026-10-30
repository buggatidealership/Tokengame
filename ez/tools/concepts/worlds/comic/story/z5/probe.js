const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
const r=await p.evaluate(()=>{const m=document.querySelector('main');
const secs=[...m.children].map(e=>({tag:e.tagName,id:e.id,cls:String(e.className).slice(0,80),vis:!!e.offsetParent,h:e.offsetHeight,txt:(e.innerText||'').slice(0,100).replace(/\n/g,' | ')}));
const P=window.__x2pPnl();const pn={};for(const k in P.A)pn[k]={pnl:P.A[k].pnl,W:P.A[k].W,L:P.A[k].L};
return {secs,nR:ROUNDS.length,last:ROUNDS.slice(-3),nP:PENDING.length,pend:PENDING.slice(0,3),nU:UPCOMING.length,up:UPCOMING.slice(0,3),models:MODELS,films:Object.keys(FILMS).slice(-10),filmEx:FILMS[Object.keys(FILMS).slice(-1)[0]],pn,logo:Object.keys(CO_LOGOS).slice(0,5),logoEx:CO_LOGOS[Object.keys(CO_LOGOS)[0]],
header:document.querySelector('header.top').outerHTML.slice(0,300), mainStyle:getComputedStyle(m).display}});
console.log(JSON.stringify(r,null,1).slice(0,9000));console.log(er);
await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z5now.png',fullPage:true});await b.close()})();
