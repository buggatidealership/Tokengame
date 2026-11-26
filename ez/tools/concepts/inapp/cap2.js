// Pieces for the three in-app generations (2026-11-11, fixed clock 14:20 New York, CoreWeave live, grades 4 PM):
// phone 390x844: scr/screen.png (3x), 6x clips of the CoreWeave In play card and its parts; desktop 1440x900: scr/desk.png (2x)
// and 4x clips of both live cards. Rects in CSS px go to scr/rects.json.
const {chromium}=require('playwright');const fs=require('fs');const O=__dirname+'/scr/',T='2026-11-11T19:20:00Z';
(async()=>{const b=await chromium.launch();const R={};
 const go=async(w,h,dsf)=>{const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dsf,timezoneId:'America/New_York'});const p=await c.newPage();await p.clock.setFixedTime(new Date(T));await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2600);return [c,p]};
 const rects=p=>p.evaluate(()=>{const r=e=>{const b=e.getBoundingClientRect();return [b.left,b.top,b.width,b.height].map(Math.round)};
  return [...document.querySelectorAll('.lv-c')].map(c=>({c:r(c),hd:r(c.querySelector('.lv-hd')),L:r(c.querySelector('.lv-sd.L')),S:r(c.querySelector('.lv-sd.S')),mid:r(c.querySelector('.lv-mid')),sc:r(c.querySelector('.lv-mid .sc')),ft:r(c.querySelector('.lv-ft')),t:c.innerText.slice(0,40).replace(/\n+/g,' ')}))});
 let [c,p]=await go(390,844,6);R.phone=await rects(p);const k=R.phone[0];
 for(const n of ['c','hd','L','S','mid','sc','ft']){const r=k[n];await p.screenshot({path:O+'p-'+n+'.png',clip:{x:r[0]-2,y:r[1]-2,width:r[2]+4,height:r[3]+4}})}await c.close();
 [c,p]=await go(1440,900,2);await p.screenshot({path:O+'desk.png'});R.desk=await rects(p);await c.close();
 [c,p]=await go(1440,900,4);for(const [i,x] of R.desk.entries()){const r=x.c;if(r[1]+r[3]<=900)await p.screenshot({path:O+'d-c'+i+'.png',clip:{x:r[0]-2,y:r[1]-2,width:r[2]+4,height:r[3]+4}})}await c.close();
 fs.writeFileSync(O+'rects.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R));await b.close()})();
