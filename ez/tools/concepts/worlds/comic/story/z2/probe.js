const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(2000);
 const o=await p.evaluate(()=>{const A=__x2pPnl().A;
  const main=document.querySelector('main');
  const kids=[...main.children].map(e=>e.tagName+'#'+e.id+'.'+String(e.className).slice(0,60)+' h='+e.offsetHeight);
  const book=document.querySelector('#wc-book');const bk=book?[...book.children].map(e=>e.tagName+'#'+e.id+'.'+String(e.className).slice(0,60)+' h='+e.offsetHeight):null;
  return {kids,bookParent:book&&book.parentElement.tagName+'#'+book.parentElement.id,bk,
   R0:ROUNDS[0],RL:ROUNDS[ROUNDS.length-1],nR:ROUNDS.length,P:(window.PENDING||[]).slice(0,3),nP:(window.PENDING||[]).length,U:(window.UPCOMING||[]).slice(0,3),nU:(window.UPCOMING||[]).length,
   MODELS,pnl:Object.fromEntries(Object.keys(A).map(m=>[m,{pnl:A[m].pnl,W:A[m].W,L:A[m].L,seq:A[m].seq&&A[m].seq.slice(-5)}])),
   films:Object.keys(FILMS).slice(-8),filmEx:FILMS[Object.keys(FILMS).slice(-1)[0]],logos:Object.keys(CO_LOGOS).length,logoEx:Object.entries(CO_LOGOS).slice(0,2),
   SIM:window.SIM,hdr:document.querySelector('header.top').offsetHeight,glob:Object.keys(window).filter(k=>/^[A-Z_]{3,}$/.test(k)).join(',')}});
 console.log(JSON.stringify(o,null,1).slice(0,9000));
 await p.screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z2/today.png',fullPage:true});
 await b.close()})();
