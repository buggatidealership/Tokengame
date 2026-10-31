const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();
 for(const w of (process.env.WS||"320,360,390,430,600,768,1000,1199,1280,1536,1920").split(",").map(Number))for(const h of ['','#/leaderboard','#/upcoming']){
  const p=await b.newPage({viewport:{width:w,height:860}});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
  await p.goto('http://localhost:8897/v47-live-x3plus.html'+h,{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:60000});await p.waitForTimeout(600);
  const r=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth,iw=innerWidth;const wide=[];const root=document.querySelector(location.hash.includes('leader')?'#wc-lb':location.hash.includes('upcoming')?'#wc-up':'#wc-book');
   root.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>iw+1||r.left<-1)&&getComputedStyle(e).position!=='absolute'&&!e.closest('.wc-sct'))wide.push(e.className.toString().slice(0,30)+' '+Math.round(r.left)+'..'+Math.round(r.right))});
   const ov=[];root.querySelectorAll('h3,b,small,p,dd,dt,span').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'&&getComputedStyle(e).textOverflow!=='ellipsis')ov.push(e.className.toString().slice(0,20)+':'+e.textContent.slice(0,20))});
   return {sw,iw,hdr:Math.round(document.querySelector('header.top').getBoundingClientRect().height),wide:wide.slice(0,4),ov:ov.slice(0,4)}});
  console.log(w,h||'#/',JSON.stringify(r),er.length?'ERR '+er.join(' | '):'');await p.close()}
 await b.close()})();
