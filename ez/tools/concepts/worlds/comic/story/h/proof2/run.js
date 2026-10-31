// node run.js <out> <takes now,a,b,..> [widths 390,1280,320]   (serve ez/ on PORT, default 8952)
// Shoots the Overview's "Smart or lucky?" section per take and width (sol-<t>-<W>.png), at 390 also a 3x close-up (z-<t>.png)
// of the element named by the take's window.P2T.zoom. Reports scrollWidth, overflowing elements and page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8952;const ZOOM=process.env.ZOOM!=='0';
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS)for(const z of (ZOOM&&W===390?[0,1]:[0])){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:z?3:(W>1000?1:2)});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('.wc-splash')&&window.__x2pPnl,null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});for(let k=0;k<5;k++){await p.evaluate(()=>scrollBy(0,250));await p.waitForTimeout(300)}
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'});if(t!=='now'){await p.addStyleTag({content:rd('_c.css')+rd(t+'.css')});await p.addScriptTag({content:rd('../proof/_p.js')+rd('_d.js')+rd(t+'.js')+';P2mount()'});
   await p.waitForFunction(()=>[...document.images].filter(i=>i.closest('.p2')).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1200)}
 await p.evaluate(()=>{document.querySelector('.wc-splash').scrollIntoView();document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});
   document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 await p.waitForTimeout(2600);
 const r=await p.evaluate(()=>{const a=document.querySelector('.wc-splash'),q=(document.querySelector('.p2')||a).getBoundingClientRect();
   const ov=[...a.querySelectorAll('*')].filter(e=>{const k=e.getBoundingClientRect();return k.width&&(k.right>innerWidth+.5||k.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.pq-hide,.p2-bleed')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,28)).slice(0,5);
   return {y:q.top+scrollY,h:q.height,sw:document.documentElement.scrollWidth,ov,zoom:(window.P2T||{}).zoom}});
 if(!z){await p.screenshot({path:`${OUT}/sol-${t}-${W}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-8),width:W,height:r.h+16}});console.log(t,W,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov}),er.slice(0,3).join('|')||'ok')}
 else{const zs=r.zoom||'.wc-splash figure';const q=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;e.scrollIntoView({block:'center'});const k=e.getBoundingClientRect();return {x:k.left,y:k.top+scrollY,w:k.width,h:Math.min(k.height,700)}},zs);
   if(q){await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/z-${t}.png`,fullPage:true,clip:{x:Math.max(0,q.x-6),y:Math.max(0,q.y-6),width:Math.min(W,q.w+12),height:q.h+12}})}}
 await ctx.close()}
await b.close()})();
