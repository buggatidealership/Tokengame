// In-app prediction video (2026-11-11): capture the live terminal's Upcoming tab and its In play card at a fixed New York
// time, phone 390x844. scr/screen.png (3x first screen), scr/card.png (6x In play card), scr/rects.json. node cap.js [ISO]
const {chromium}=require('playwright');const fs=require('fs');const O=__dirname+'/scr/';const T=process.argv[2]||'2026-11-11T19:20:00Z';
(async()=>{const b=await chromium.launch();const errs=[];
 const go=async(dsf)=>{const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:dsf,timezoneId:'America/New_York'});const p=await c.newPage();
  await p.clock.setFixedTime(new Date(T));p.on('pageerror',e=>errs.push(e.message));await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2500);return [c,p]};
 let [c,p]=await go(3);await p.screenshot({path:O+'screen.png'});
 const R=await p.evaluate(()=>{const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return [b.left,b.top+scrollY,b.width,b.height].map(Math.round)};
  const card=document.querySelector('.lv-it.on')||document.querySelector('.lv-it');
  return {sec:r(document.querySelector('section.pn')),card:r(card),txt:card&&card.innerText.replace(/\n+/g,' | ').slice(0,300),
   L:r(card&&card.querySelector('.lv-sd.L')),S:r(card&&card.querySelector('.lv-sd.S')),hd:r(card&&card.querySelector('.lv-hd')),
   sides:[...(card?card.querySelectorAll('.lv-sd'):[])].map(e=>({cls:e.className,r:r(e),t:e.innerText.replace(/\n+/g,' | ')}))}});
 await c.close();[c,p]=await go(6);
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.position='static'});
 await p.screenshot({path:O+'card.png',fullPage:true,clip:{x:R.card[0],y:R.card[1],width:R.card[2],height:R.card[3]}});await c.close();
 fs.writeFileSync(O+'rects.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));console.log('errs',errs.join('|')||'none');await b.close()})();
