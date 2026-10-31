// node run.js <out> <takes poly,arcade,..|now> [widths 390,1280] [win hit|season|d7|d1]   (serve ez/ on PORT, default 8971)
// Shoots the "Smart or lucky?" section per take and width (hw-<t>-<win>-<W>.png). Reports scrollWidth, overflow, the data checks, errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),WIN=process.argv[5]||'hit';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8971;
const FL='https://fonts.googleapis.com/css2?family=Special+Elite&family=Press+Start+2P&family=VT323&family=Tilt+Neon&family=Monoton&family=Bungee&family=Bungee+Shade&family=Rye&family=Allerta+Stencil&family=Stardos+Stencil:wght@400;700&family=Bangers&display=block';
const LIB=()=>`window.HWIMG='/tools/concepts/worlds/comic/story/h/hitworlds/img/';`+rd('../pnl/_lib.js')+rd('../pnl2/_g.js')+rd('_hw.js');
module.exports.inject=async(p,t)=>{await p.evaluate(()=>{window.PN_STILL=true});await p.addStyleTag({url:FL});await p.addStyleTag({content:rd('../pnl/_c.css')+rd('_hw.css')+(fs.existsSync(__dirname+'/'+t+'.css')?rd(t+'.css'):'')});
  await p.addScriptTag({content:LIB()+rd(t+'.js')+';HWmount(window.HWT)'});await p.evaluate(()=>document.fonts.ready);
  await p.waitForFunction(()=>[...document.images].filter(i=>i.closest('.hw')).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(800)};
module.exports.open=async(b,W,H)=>{const ctx=await b.newContext({viewport:{width:W,height:H||(W<600?844:800)},deviceScaleFactor:W>1000?1:2});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if((m.type()==='error'||m.type()==='warning')&&!/Failed to load resource|willReadFrequently/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash .wc-cn')&&window.__x2pPnl&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});await p.waitForTimeout(600);
 return {ctx,p,er}};
if(require.main===module)(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS){const {ctx,p,er}=await module.exports.open(b,W);
 if(t!=='now'){await module.exports.inject(p,t);if(WIN!=='hit'){await p.evaluate(w=>HWset(w,false),WIN);await p.waitForTimeout(500)}}
 await p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 await p.waitForTimeout(900);
 const r=await p.evaluate(()=>{const a=document.querySelector('.wc-splash');a.style.setProperty('content-visibility','visible','important');const k0=a.getBoundingClientRect(),hr=document.querySelector('.hw-root'),k={top:k0.top,height:hr?hr.getBoundingClientRect().bottom-k0.top:k0.height};
   const ov=[...a.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>innerWidth+.5||q.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.hw-sf,.hw-st')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,5);
   return {y:k.top+scrollY,h:k.height,sw:document.documentElement.scrollWidth,ov,check:(window.HW||{}).check,pn:(window.PN||{}).check}});
 await p.screenshot({path:`${OUT}/hw-${t}-${WIN}-${W}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y),width:W,height:Math.min(r.h+80,3000)}});
 console.log(t,W,WIN,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov,check:r.check,pn:r.pn}),er.slice(0,3).join('|')||'ok');await ctx.close()}
await b.close()})();
