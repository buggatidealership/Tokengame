const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const p=await (await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'})).newPage();await FONTS(p);
await p.goto('http://localhost:8963/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForFunction(()=>window.P5&&P5.cur,null,{timeout:60000});
await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(2500);
const d=await p.evaluate(()=>{const X=P5.data();const r=document.querySelector('#learn').getBoundingClientRect();const st=document.querySelector('#learn .p5-st').getBoundingClientRect();
 return {N:X.N,rows:X.arank.map(m=>({m,W:X.A[m].W,L:X.A[m].L,t:X.A[m].t,hr:X.A[m].hr,out:X.A[m].out})),win:Object.fromEntries(Object.entries(X.W).map(([k,w])=>[k,{n:w.n,tot:w.tot}])),learn:[r.x,r.width,r.height],stage:[st.x,st.width,st.height],prev:document.querySelector('#learn').previousElementSibling?.id,next:document.querySelector('#learn').nextElementSibling?.id}});
console.log(W,JSON.stringify(d));
const bx=await p.evaluate(()=>{const r=document.querySelector('#learn').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}});
await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
await p.screenshot({path:`shots/now-${W}.png`,clip:{x:0,y:bx.y-40,width:W,height:bx.h+80},fullPage:true});}
await b.close()})();
