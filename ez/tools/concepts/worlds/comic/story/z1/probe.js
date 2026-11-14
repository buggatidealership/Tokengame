const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});
 await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 console.log(await p.evaluate(()=>{
  const main=document.querySelector('main');
  const kids=[...main.children].map(c=>c.tagName+'#'+c.id+'.'+String(c.className).slice(0,60)+' h='+c.offsetHeight);
  const book=document.querySelector('#wc-book');const bk=book?[...book.children].map(c=>c.tagName+'#'+c.id+'.'+String(c.className).slice(0,50)+' h='+c.offsetHeight):[];
  const A=__x2pPnl().A;const acc=Object.fromEntries(Object.keys(A).map(m=>[m,{pnl:Math.round(A[m].pnl),W:A[m].W,L:A[m].L,seq:A[m].seq}]));
  return JSON.stringify({kids,bk,G:ROUNDS.length,last:ROUNDS.slice(-3),P:(window.PENDING||[]).slice(0,4),Pn:(window.PENDING||[]).length,U:(window.UPCOMING||[]).slice(0,4),Un:(window.UPCOMING||[]).length,acc,M:Object.fromEntries(Object.keys(MODELS).map(m=>[m,MODELS[m]])),films:Object.keys(FILMS).length,f1:FILMS[Object.keys(FILMS)[0]],co:Object.keys(CO_LOGOS).length,co1:CO_LOGOS.SHEL||CO_LOGOS[Object.keys(CO_LOGOS)[0]],SIM:window.SIM,vt:!!document.querySelector('.x2p-vt'),vid:[...document.querySelectorAll('video')].slice(0,3).map(v=>v.className+' '+v.parentElement.className+' '+(v.currentSrc||v.querySelector('source')?.src))},null,1)}));await b.close()})();
