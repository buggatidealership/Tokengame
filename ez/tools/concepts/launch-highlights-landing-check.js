const { chromium } = require('playwright');const fs=require('fs');
const URL=process.argv[2]||'http://127.0.0.1:8897/v46-live-x2plus.html';
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const st=p=>p.evaluate(()=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')],tr=document.querySelector('#x2pHl .x2p-hlt');const i=ws.findIndex(w=>w.classList.contains('on'));
  const mid=tr.scrollLeft+tr.clientWidth/2;const vis=ws.findIndex(w=>Math.abs(w.offsetLeft+w.offsetWidth/2-mid)<w.offsetWidth/2);
  return {on:i>=0?ws[i].querySelector('.x2p-htag').textContent:'none',centred:vis>=0?ws[vis].querySelector('.x2p-htag').textContent:'none',flipped:vis>=0&&ws[vis].querySelector('.card').classList.contains('flipped'),scroll:Math.round(tr.scrollLeft),w:tr.clientWidth}});
for(const [W,H,label] of [[412,863,'phone'],[390,844,'iphone'],[1280,900,'desktop']]){
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,isMobile:W<600,hasTouch:W<600});const p=await ctx.newPage();
 await p.goto(URL);await p.waitForTimeout(1200);const a=await st(p);
 await p.waitForTimeout(3500);const b2=await st(p);
 // the visitor scrolls down to the highlights
 await p.evaluate(()=>document.querySelector('#highlights').scrollIntoView({block:'center'}));await p.waitForTimeout(2500);const c=await st(p);
 console.log(label,'1.2s',JSON.stringify(a),'\n      4.7s',JSON.stringify(b2),'\n  in view',JSON.stringify(c));await ctx.close()}
await b.close()})();
