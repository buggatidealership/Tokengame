// Release video: real screens of the live terminal (site/ on :8997), phone 390x844 at 3x, New York time, fixed clock.
// node shots.js [ISO time]  -> scr/up.png, scr/lb.png, scr/chrome.png and scr/rects.json
const {chromium}=require('playwright');const fs=require('fs');const O=__dirname+'/scr/';const T=process.argv[2]||'2026-11-09T18:52:00Z';
(async()=>{const b=await chromium.launch();const errs=[];const R={};
 const ctx=async()=>{const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,timezoneId:'America/New_York'});const p=await c.newPage();await p.clock.setFixedTime(new Date(T));p.on('pageerror',e=>errs.push(e.message));return [c,p]};
 const rects=p=>p.evaluate(()=>{const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top+scrollY),Math.round(b.width),Math.round(b.height)]};
  const q=(s)=>[...document.querySelectorAll(s)];
  return {secs:q('section.pn').map(e=>({r:r(e),t:e.innerText.slice(0,30).replace(/\n/g,' ')})),
   ur:q('.ur').slice(0,8).map(e=>({r:r(e),t:e.innerText.slice(0,60).replace(/\n/g,' ')})),
   lvit:q('.lv-it').map(e=>({r:r(e),on:e.classList.contains('on'),t:e.innerText.slice(0,40).replace(/\n/g,' ')})),
   lvc:q('.lv-c').map(e=>({r:r(e)})),lvst:q('.lv-st').map(e=>({r:r(e)})),
   tables:q('table').map(e=>({r:r(e),rows:[...e.querySelectorAll('tbody tr')].map(x=>({r:r(x),t:x.innerText.slice(0,50).replace(/\s+/g,' ')}))})),
   h:document.documentElement.scrollHeight}});
 let [c,p]=await ctx();await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2200);
 await p.screenshot({path:O+'chrome-up.png'});
 const n=await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-lvx]')].find(e=>/DraftKings/.test(e.textContent));if(b){b.click();return b.getAttribute('data-lvx')}return null});
 await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none';const l=document.querySelector('.lv-ls');if(l)l.style.maxHeight='none'});
 R.up=await rects(p);R.up.opened=n;await p.screenshot({path:O+'up.png',fullPage:true});await c.close();
 [c,p]=await ctx();await p.goto('http://localhost:8997/#leaders');await p.waitForTimeout(2200);await p.screenshot({path:O+'chrome-lb.png'});
 await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none'});R.lb=await rects(p);await p.screenshot({path:O+'lb.png',fullPage:true});await c.close();
 fs.writeFileSync(O+'rects.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R).slice(0,3000));console.log('errs',errs.join('|')||'none');await b.close()})();
