// shoot today's live Meet the models + dump its data. node now.js <outdir> <W>
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const OUT=process.argv[2],W=+process.argv[3],PORT=process.env.PORT||8941;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:W>1000?900:844},deviceScaleFactor:W>1000?1:2});
 const p=await ctx.newPage();await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}`,{waitUntil:'load'});
 await p.waitForFunction(()=>document.querySelector('.pp1-c.fb-on'),null,{timeout:90000});await p.waitForTimeout(2500);
 const el=p.locator('#wc-book .wc-chars');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
 await p.evaluate(()=>document.querySelectorAll('body *').forEach(n=>{if(getComputedStyle(n).position==='fixed'&&!n.closest('#wc-book'))n.style.visibility='hidden'}));
 await el.screenshot({path:`${OUT}/now-${W}.png`});
 const d=await p.evaluate(()=>{const D=POP.data();const s=document.querySelector('#wc-book .wc-chars').getBoundingClientRect();
   const cards=[...document.querySelectorAll('.pp1-c')].map(c=>{const r=c.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]});
   return {h:Math.round(s.height),cards,models:D.models.map(x=>({m:x.m,name:x.name,ver:x.ver,pnl:Math.round(x.pnl),W:x.W,L:x.L,best:x.best&&{v:Math.round(x.best.v),co:x.best.r.co,t:x.best.r.ticker},l5:x.last5,flag:x.flag}))}});
 console.log(JSON.stringify(d),er.slice(0,2));await b.close()})();
