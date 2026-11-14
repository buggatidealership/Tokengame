// measure the live X6+ first screen: header height, title card and its lettering block, at many widths
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();
 for(const [w,h] of [[320,640],[360,780],[390,844],[430,932],[600,900],[844,390],[999,800],[1000,800],[1280,800],[1440,900],[1920,1080]]){
  const c=await b.newContext({viewport:{width:w,height:h},isMobile:w<600,hasTouch:w<600});const p=await c.newPage();
  await p.goto('http://127.0.0.1:8997/v50-live-x6plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const q=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.left*10)/10,Math.round(r.top*10)/10,Math.round(r.width*10)/10,Math.round(r.height*10)/10]};
   const lc=[...document.querySelectorAll('#h48ov .h8-tc h1 .h8-lc')].map(e=>{const r=e.getBoundingClientRect();return Math.round(r.top)});
   return {hdr:q('header.top'),tc:q('#h48ov .h8-tc'),inb:q('#h48ov .h8-tc .h8-in'),pres:q('#h48ov .h8-pres'),h1:q('#h48ov .h8-tc h1'),fs:getComputedStyle(document.querySelector('#h48ov .h8-tc h1')).fontSize,ep:q('#h48ov .h8-ep'),pm:q('#h48ov .h8-tc .h49-pm'),film:q('#h48ov .h8-tc .h8-film'),lines:[...new Set(lc)].length,sw:document.documentElement.scrollWidth}});
  console.log(w+'x'+h,JSON.stringify(r));await c.close()}
 await b.close()})();
