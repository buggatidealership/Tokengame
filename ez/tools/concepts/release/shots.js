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
   lvc:q('.lv-c').map(e=>({r:r(e)})),lvst:q('.lv-st').map(e=>({r:r(e)})),lvsd:q('.lv-sd').map(e=>({r:r(e),h:r(e.querySelector('h4')),sl:r(e.querySelector('.lv-sl'))})),
   xr:q('.lv-it.on .lv-xr').map(e=>({r:r(e),h:e.classList.contains('lv-xh'),pl:r(e.lastElementChild),w:e.classList.contains('w')})),
   logos:q('.lv-sd .lv-p').map(e=>({r:r(e.firstElementChild),side:e.closest('.lv-sd').classList.contains('L')?'L':'S'})),
   bst:q('td.bst').map(e=>({r:r(e)})),
   ut:q('.ur .ut b').slice(0,3).map(e=>({r:r(e)})),
   hr62:(()=>{const t=document.querySelectorAll('table')[1];if(!t)return null;const td=t.querySelector('tbody tr').lastElementChild;const g=document.createRange();g.selectNodeContents(td);const b=g.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top+scrollY),Math.round(b.width),Math.round(b.height)]})(),
   tables:q('table').map(e=>({r:r(e),rows:[...e.querySelectorAll('tbody tr')].map(x=>({r:r(x),t:x.innerText.slice(0,50).replace(/\s+/g,' ')}))})),
   h:document.documentElement.scrollHeight}});
 let [c,p]=await ctx();await p.goto('http://localhost:8997/#next');await p.waitForTimeout(2200);
 await p.screenshot({path:O+'chrome-up.png'});
 await p.evaluate(()=>{const o=document.querySelector('.lv-it.on [data-lvx]');if(o)o.click()});await p.waitForTimeout(400);
 const n=await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-lvx]')].find(e=>/DraftKings/.test(e.textContent));if(b){b.click();return b.getAttribute('data-lvx')}return null});
 await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none';const l=document.querySelector('.lv-ls');if(l)l.style.maxHeight='none'});
 R.up=await rects(p);R.up.opened=n;await p.screenshot({path:O+'up.png',fullPage:true});await c.close();
 [c,p]=await ctx();await p.goto('http://localhost:8997/#leaders');await p.waitForTimeout(2200);await p.screenshot({path:O+'chrome-lb.png'});
 await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none'});R.lb=await rects(p);await p.screenshot({path:O+'lb.png',fullPage:true});await c.close();
 // the lifted pieces, shot again at 6x so they stay sharp when enlarged in a 2160px frame
 const hi=async(hash,list,prep)=>{const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:6,timezoneId:'America/New_York'});const p=await c.newPage();await p.clock.setFixedTime(new Date(T));
  await p.goto('http://localhost:8997/#'+hash);await p.waitForTimeout(2200);if(prep)await prep(p);await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none';const h=document.querySelector('header.top');if(h)h.style.position='static';const l=document.querySelector('.lv-ls');if(l)l.style.maxHeight='none'});await p.waitForTimeout(300);
  for(const [n,r] of list)await p.screenshot({path:O+'hi-'+n+'.png',fullPage:true,clip:{x:r[0],y:r[1],width:r[2],height:r[3]}});await c.close()};
 await hi('next',[['live',R.up.secs[0].r],['dk',R.up.lvit.find(x=>x.on).r],...R.up.ur.slice(0,3).map((x,i)=>['ur'+i,x.r])],async p=>{await p.evaluate(()=>{const o=document.querySelector('.lv-it.on [data-lvx]');if(o)o.click()});await p.waitForTimeout(400);await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-lvx]')].find(e=>/DraftKings/.test(e.textContent));b&&b.click()});await p.waitForTimeout(600)});
 await hi('leaders',[['hit',R.lb.tables[1].r],['sec',R.lb.tables[2].r]]);
 fs.writeFileSync(O+'rects.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R).slice(0,3000));console.log('errs',errs.join('|')||'none');await b.close()})();
