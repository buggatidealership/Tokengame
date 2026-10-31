// node run.js <out> <takes now,t1,..> [widths 390,1280,320]   (serve ez/ on PORT, default 8952)
// Per take and width: lb-<t>-<W>.png (the tab from "Who's winning?" to the end of the scoreboard, Season window),
// at phone width also d1-/d7- (the same after a switch, to prove the windows), and z-<t>.png (a 3x close-up of .lq-z).
// Logs scrollWidth, elements past the viewport and page errors.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const PORT=process.env.PORT||8952;
const PQ=fs.readFileSync(__dirname+'/../proof/_p.js','utf8');
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS)for(const z of (W===390&&process.env.ZOOM!=='0'?[0,1]:[0])){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:z?3:(W>1000?1:2)});const p=await ctx.newPage();await FONTS(p);const er=[];
 p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
 p.on('response',r=>{if(r.status()>=400&&/lb2|media/.test(r.url()))er.push(r.status()+' '+r.url().replace(/.*8952\//,''))});
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/leaderboard`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.querySelector('#wc-lb .wc11n-bout .wc11c-a')&&window.SS,null,{timeout:120000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
 if(t!=='now'){await p.addStyleTag({content:rd('_m.css')+rd(t+'.css')});await p.addScriptTag({content:PQ+rd('_m.js')+rd(t+'.js')+';LQ.mount()'});
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500)}
 await p.evaluate(()=>{document.querySelectorAll('#wc-lb section').forEach(s=>{s.classList.remove('wc-offs');s.style.contentVisibility='visible'})});
 const hide=()=>p.evaluate(()=>{document.querySelectorAll('video').forEach(v=>{try{v.pause();v.currentTime=1.2}catch(e){}});
   document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed')e.style.setProperty('visibility','hidden','important');if(c.position==='sticky')e.style.setProperty('position','static','important')})});
 const top=t==='now'?'#wc-lb .wc11n-cv':'#wc-lb section.lq',bot=t==='now'?'#wc-lb .wc-sbd':'#wc-lb section.lq';
 const shot=async(name,hmax)=>{await hide();const r=await p.evaluate(([a,c])=>{const A=document.querySelector(a),C=document.querySelector(c);const q=A.getBoundingClientRect(),q2=C.getBoundingClientRect();
   const ov=[...document.querySelectorAll('#wc-lb *')].filter(e=>{const k=e.getBoundingClientRect();return k.width&&(k.right>innerWidth+.5||k.left<-.5)&&getComputedStyle(e).visibility!=='hidden'&&!e.closest('.lq-hide,.lq-bleed')}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,5);
   return {y:q.top+scrollY,h:q2.bottom-q.top,sw:document.documentElement.scrollWidth,ov}},[top,bot]);
  await p.screenshot({path:`${OUT}/${name}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-10),width:W,height:Math.min(hmax||1e5,r.h+20)}});console.log(name,JSON.stringify({h:Math.round(r.h),sw:r.sw,ov:r.ov}))};
 const go=k=>p.evaluate(k=>window.LQgo?LQgo(k,false):__wc11Show(k,false),k);
 if(!z){await shot(`lb-${t}-${W}`);
  if(W<600){for(const k of ['d1','d7']){await go(k);await p.waitForTimeout(900);await shot(`${k}-${t}-${W}`)}await go('season');await p.waitForTimeout(600)}}
 else{const r=await p.evaluate(()=>{const e=document.querySelector('.lq-z')||document.querySelector('#wc-lb .wc11n-bout');e.scrollIntoView({block:'center'});const q=e.getBoundingClientRect();return {x:q.left,y:q.top+scrollY,w:q.width,h:q.height}});
  await p.waitForTimeout(500);await hide();await p.screenshot({path:`${OUT}/z-${t}.png`,fullPage:true,clip:{x:Math.max(0,r.x-4),y:r.y-4,width:Math.min(W,r.w+8),height:Math.min(700,r.h+8)}})}
 console.log(W,t,z?'zoom':'',er.slice(0,4).join(' | ')||'ok');await ctx.close()}
await b.close()})();
