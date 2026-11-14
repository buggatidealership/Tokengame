const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();
for(const W of [390,1280])for(const n of [78,80,57]){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:860},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto(`http://localhost:8941/v47-live-x3plus.html?${Date.now()}#/round/${n}`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:120000});await p.waitForTimeout(3500);
await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));
await p.screenshot({path:`${OUT}/now-${n}-${W}-front.png`});
const info=await p.evaluate(()=>{const rm=document.getElementById('x2pRm');return {html:rm.outerHTML.length,cls:[...rm.querySelectorAll('button')].map(x=>x.className+':'+x.textContent.trim().slice(0,20)).slice(0,12)}});
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(2500);
await p.screenshot({path:`${OUT}/now-${n}-${W}-back.png`});console.log(W,n,JSON.stringify(info),er.slice(0,2));await ctx.close()}
await b.close()})();
