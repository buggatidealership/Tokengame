// node run.js <out> <takes now,t1,..> [widths 390,1280,320]
// Shoots, per take and width: sol-<t>-<W>.png (Overview "Smart or lucky?"), lb-<t>-<W>.png (Leaderboard: bill, tape, proof on P&L),
// tgt-<t>-<W>.png (the proof on Target hits), dock-<t>-<W>.png (the thumb dock over the tape), and at 390 3x close-ups (z-*).
// Reports scrollWidth, overflowing elements and page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const PORT=process.env.PORT||8941;
const ZOOM=process.env.ZOOM!=='0';
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS)for(const z of (ZOOM&&W<600?[0,1]:[0])){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:z?3:(W>1000?1:2)});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/leaderboard`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('#wc-lb .wc11n-bout .wc11c-a')&&window.SS,null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'+rd('_p.css')+rd('_lb.css')});
 if(t!=='now'){await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd('_p.js')+rd('_lb.js')+rd(t+'.js')+';PQ.mount()'});await p.waitForTimeout(900)}
 const hide=async()=>p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause();v.currentTime=1.2}catch(e){}});document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'&&!e.closest('.pq-dock'))e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 const shot=async(name,sel,tsel)=>{const r=await p.evaluate(([s,ts])=>{const a=document.querySelector(s);if(!a)return null;const e=ts?document.querySelector(ts):a;const q=a.getBoundingClientRect(),q2=e.getBoundingClientRect();
   const ov=[...a.parentElement.querySelectorAll('*')].filter(e=>{const k=e.getBoundingClientRect();return k.width&&(k.right>innerWidth+.5||k.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.pq-hide,.pqx-art,.wc-hide')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,28)).slice(0,5);
   return {x:0,y:q.top+scrollY,w:innerWidth,h:q2.bottom-q.top,sw:document.documentElement.scrollWidth,ov}},[sel,tsel]);if(!r){console.log(name,'missing',sel);return}
   await p.screenshot({path:`${OUT}/${name}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-8),width:W,height:r.h+16}});console.log(name,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov}))};
 const zs=async(name,sel,pad)=>{const r=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;e.scrollIntoView({block:'center'});const q=e.getBoundingClientRect();return {x:q.left,y:q.top+scrollY,w:q.width,h:q.height}},sel);if(!r)return;await p.waitForTimeout(400);await hide();
   pad=pad||8;await p.screenshot({path:`${OUT}/${name}.png`,fullPage:true,clip:{x:Math.max(0,r.x-pad),y:Math.max(0,r.y-pad),width:Math.min(W-Math.max(0,r.x-pad),r.w+2*pad),height:r.h+2*pad}})};
 const pre=z?'z-':'';
 await hide();
 if(!z){await shot(`lb-${t}-${W}`,'#wc-lb','#wc-lb .wc-pfs');
  await p.evaluate(()=>window.PQgo&&PQgo('tgt'));if(t==='now')await p.evaluate(()=>{const b=[...document.querySelectorAll('#wc-lb .wc-pf [role=tab]')][2];b&&b.click()});await p.waitForTimeout(1200);
  await shot(`tgt-${t}-${W}`,'#wc-lb .wc-pfs');await p.evaluate(()=>window.PQgo&&PQgo('pnl'));
  /* the dock: shown over the tape, as when the board's own switch has scrolled away */
  await p.evaluate(()=>{const d=document.querySelector('.pq-dock')||document.querySelector('.sb-dock');if(d){d.style.setProperty('display','flex','important');d.style.setProperty('visibility','visible','important');d.style.opacity=1;d.style.transform='none';d.inert=false;d.classList.add('sb-in','pq-dk-on')}
   const s=document.querySelector('.pq-tape,.ss-host');if(s){const r=s.getBoundingClientRect();scrollTo(0,r.top+scrollY+180)}});await p.waitForTimeout(700);
  await p.screenshot({path:`${OUT}/dock-${t}-${W}.png`,clip:{x:0,y:(W<600?844:1000)-150,width:W,height:150}});
  await p.evaluate(()=>{const d=document.querySelector('.pq-dock')||document.querySelector('.sb-dock');if(d){d.removeAttribute('style');d.classList.remove('pq-dk-on','sb-in');d.style.setProperty('display','none','important')}});
 }else{await zs(`z-bill-${t}-${W}`,t==='now'?'#wc-lb .wc11n-bout':'.pqx-bout',6);await zs(`z-tape-${t}-${W}`,t==='now'?'#wc-lb .ss-host .ss3-g':'.pqx-tg',6);
  await p.evaluate(()=>window.PQgo&&PQgo('tgt'));if(t==='now')await p.evaluate(()=>{const b=[...document.querySelectorAll('#wc-lb .wc-pf [role=tab]')][2];b&&b.click()});await p.waitForTimeout(1200);
  await zs(`z-tgt-${t}-${W}`,t==='now'?'#wc-lb .wc-tgg':'.pqx-tc',6)}
 /* the Overview: Smart or lucky */
 await p.evaluate(()=>{location.hash='#/'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=document.querySelector('.wc-splash');s.classList.remove('wc-offs');s.scrollIntoView()});for(let k=0;k<6;k++){await p.evaluate(()=>scrollBy(0,250));await p.waitForTimeout(350)}await p.evaluate(()=>document.querySelector('.wc-splash').scrollIntoView());await p.waitForTimeout(1600);await hide();
 if(!z)await shot(`sol-${t}-${W}`,'.wc-splash');else await zs(`z-sol-${t}-${W}`,t==='now'?'.wc-splash figure':'.pq-sol .pqx-ch',6);
 console.log(W,t,z?'zoom':'',er.slice(0,3).join('|')||'ok');await ctx.close()}
await b.close()})();
