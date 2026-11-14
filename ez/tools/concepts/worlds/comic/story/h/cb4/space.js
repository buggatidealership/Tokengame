// node space.js [widths] [round] [PAGE env]: the plate's column: each flex gap's height, and how far the stack overflows the plate
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const WS=(process.argv[2]||'320,390,1280').split(',').map(Number),n=+process.argv[3]||80,PORT=process.env.PORT||8994,PAGE=process.env.PAGE||'v46-live-x2plus.html';const b=await chromium.launch();
for(const W of WS){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900}})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:'+PORT+'/'+PAGE+'?'+Date.now()+'#/round/'+n,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .cb'),null,{timeout:200000});await p.waitForTimeout(1500);
console.log(W,JSON.stringify(await p.evaluate(()=>{const cb=document.querySelector('#x2pRm .cb'),P=cb.querySelector('.cb-p'),cq=cb.getBoundingClientRect().width/100;
 const ks=[...P.children].filter(e=>!e.classList.contains('cb-sh')).map(e=>{const r=e.getBoundingClientRect();return (e.className.split(' ')[0]||e.tagName)+':'+(r.height/cq).toFixed(1)});
 const last=[...P.children].pop().getBoundingClientRect(),PB=P.getBoundingClientRect();
 return {cq:+cq.toFixed(2),aspect:+(PB.height/PB.width).toFixed(3),ks:ks.join(' '),lastBottomVsPlate:+((last.bottom-PB.bottom)/cq).toFixed(2),zoom:getComputedStyle(cb).getPropertyValue('--cbz')}})))}
await b.close()})();
