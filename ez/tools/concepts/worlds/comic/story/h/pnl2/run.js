// node run.js <out> <takes now,a,b,..> [widths 390,1280,320]   (serve ez/ on PORT, default 8961)
// Shoots the Overview's P&L section per take and width (pn-<t>-<W>.png); at 390 also a 3x close-up (z-<t>.png) of window.PNT.zoom.
// Reports scrollWidth, overflowing elements, the live-rows check and page errors. WIN=d1|d7 opens another window.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const LIB=()=>rd('../pnl/_lib.js')+rd('_g.js')+rd('_s.js'),CSS=t=>rd('../pnl/_c.css')+rd('_s.css')+(fs.existsSync(__dirname+'/'+t+'.css')?rd(t+'.css'):'');const PORT=process.env.PORT||8961;const ZOOM=process.env.ZOOM!=='0';const WIN=process.env.WIN||'';
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS)for(const z of (ZOOM&&W===390&&t!=='now'?[0,1]:[0])){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:z?3:(W>1000?1:2)});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if((m.type()==='error'||m.type()==='warning')&&!/Failed to load resource|willReadFrequently/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash .wc10-ch')&&window.__x2pPnl&&document.querySelector('#wc-pfv-pnl .wc-pf-r'),null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});for(let k=0;k<5;k++){await p.evaluate(()=>scrollBy(0,250));await p.waitForTimeout(250)}
 if(t!=='now'){await p.evaluate(w=>{window.PN_STILL=true;if(w)window.PN_WIN=w},WIN);await p.addStyleTag({content:CSS(t)});await p.addScriptTag({content:LIB()+rd(t+'.js')+';PNmount()'});await p.evaluate(async()=>{await document.fonts.load('20px "Permanent Marker"');await document.fonts.load('20px "Cabin Sketch"');await document.fonts.load('20px "Share Tech Mono"');await document.fonts.ready});
   await p.waitForFunction(()=>[...document.images].filter(i=>i.closest('.pn')).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1500)}
 await p.evaluate(()=>{const sp=document.querySelector('.wc-splash');(sp.previousElementSibling||sp).scrollIntoView();document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});
   document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 await p.waitForTimeout(2200);
 const r=await p.evaluate(()=>{const a=document.querySelector('.wc-splash');a.classList.remove('wc-offs');a.style.setProperty('content-visibility','visible','important');const b=a.previousElementSibling&&a.previousElementSibling.classList.contains('wc-beat')?a.previousElementSibling:a,q0=b.getBoundingClientRect(),q=document.querySelector('.pn')?document.querySelector('.pn').getBoundingClientRect():{bottom:Math.max(...[...a.querySelectorAll('*')].map(e=>e.getBoundingClientRect().bottom))};
   const ov=[...a.querySelectorAll('*')].filter(e=>{const k=e.getBoundingClientRect();return k.width&&(k.right>innerWidth+.5||k.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.pn-bleed')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,28)).slice(0,5);
   return {dbg:[q0.top,q0.bottom,q.top,q.bottom].map(Math.round),y:q0.top+scrollY,h:q.bottom-q0.top,sw:document.documentElement.scrollWidth,ov,zoom:(window.PNT||{}).zoom,check:(window.PN||{}).check}});
 if(!z){await p.screenshot({path:`${OUT}/pn-${t}${WIN?'-'+WIN:''}-${W}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-8),width:W,height:r.h+16}});console.log(t,W,JSON.stringify({dbg:r.dbg,h:Math.round(r.h),sw:r.sw,ov:r.ov,check:r.check}),er.slice(0,3).join('|')||'ok')}
 else{const zs=r.zoom||'.pn';const q=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;e.scrollIntoView({block:'center'});const k=e.getBoundingClientRect();return {x:k.left,y:k.top+scrollY,w:k.width,h:Math.min(k.height,520)}},zs);
   if(q){await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/z-${t}.png`,fullPage:true,clip:{x:Math.max(0,q.x-4),y:Math.max(0,q.y-4),width:Math.min(W,q.w+8),height:q.h+8}})}}
 await ctx.close()}
await b.close()})();
