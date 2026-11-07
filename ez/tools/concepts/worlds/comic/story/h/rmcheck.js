const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const t of ['h1','h2','h3'])for(const rm of ['reduce','no-preference']){const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:rm});const p=await ctx.newPage();
await p.goto('http://localhost:8922/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:rd('_sh.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('sh-on','sh-t-'+t),t);await p.addScriptTag({content:rd('../e/_se.js')+rd('_sh.js')+rd(t+'.js')});await p.waitForTimeout(4500);
const r=await p.evaluate(()=>{const cv=document.querySelector('#wc-book .wc-cover');const a=document.getAnimations().filter(x=>x.playState==='running'&&x.effect&&x.effect.target&&cv.contains(x.effect.target));
 const smil=[...cv.querySelectorAll('animate,animateMotion,animateTransform')].length;return {running:a.length,names:[...new Set(a.map(x=>x.animationName||'?'))].slice(0,8).join(','),smil}});
console.log(t,rm,JSON.stringify(r));await ctx.close()}await b.close()})();
