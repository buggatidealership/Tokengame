// node check.js : 320/390/1280 overflow, errors, reduced motion and the IntersectionObserver fallback (no scroll timelines), every take
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();
for(const [W,rm,io] of [[320,0,0],[390,1,0],[390,0,1],[1280,0,0]])for(const t of ['base','p','i','k']){const {ctx,p,er}=await R.open(b,W,W<600?844:800,1,{rm,noSDA:io});
await R.inject(p,t);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);let mx=0;for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60);mx=Math.max(mx,await p.evaluate(()=>document.documentElement.scrollWidth))}
 await p.waitForTimeout(600);const hid=await p.evaluate(()=>[...document.querySelectorAll('.fl-b:not(.fl-in)')].filter(e=>e.getBoundingClientRect().bottom<0).length);
 console.log(W,rm?'reduced':'',io?'io-fallback':'',t,'maxScrollWidth',mx,'beats left hidden above',hid,er.join('|')||'ok');await ctx.close()}
await b.close()})();
