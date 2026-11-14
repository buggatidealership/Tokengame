// node probe.js [widths] [round] : the plate's vertical budget (flex gaps, overflow) on the turned card back
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const WS=(process.argv[2]||'320,390,1280').split(',').map(Number),N=+(process.argv[3]||80);
(async()=>{const b=await chromium.launch();for(const W of WS){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:1})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:'+(process.env.PORT||8993)+'/v46-live-x2plus.html?'+Date.now()+'#/round/'+N,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1200);
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');if(c.getAttribute('data-k')==='g')(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1500);
console.log(W,JSON.stringify(await p.evaluate(()=>{const cb=document.querySelector('#x2pRm .cb'),P=cb.querySelector('.cb-p');const pr=document.createElement('div');pr.style.cssText='position:absolute;width:100px;height:1px';cb.appendChild(pr);const S=pr.getBoundingClientRect().width/100;pr.remove();
 const cq=cb.getBoundingClientRect().width/100;const R=P.getBoundingClientRect();
 return {cqw:+cq.toFixed(2),aspect:+(R.height/R.width).toFixed(3),pH:+R.height.toFixed(1),scrollOver:+(P.scrollHeight*S-R.height).toFixed(1),
  gaps:[...P.querySelectorAll(':scope>.cb-g')].map(g=>+(g.getBoundingClientRect().height/cq).toFixed(2)),
  parts:[...P.children].filter(e=>!e.classList.contains('cb-sh')).map(e=>(e.className.split(' ')[0])+':'+(e.getBoundingClientRect().height/cq).toFixed(1)).join(' '),
  flipBot:+((R.bottom-P.querySelector('.cb-flip').getBoundingClientRect().bottom)/cq).toFixed(2)}})))}
await b.close()})();
