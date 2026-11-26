const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+require('fs').readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const [W,H] of [[412,863],[390,844],[430,932],[390,664]]){
for(const k of ['now','X']){
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);
if(k==='X'){
 // the screen ends right under "Every call straight to your X feed.": the peek is the record's top down to its cards
 await p.evaluate(()=>{const r=document.querySelector('#record'),car=document.querySelector('#car');
   const peek=Math.round(car.getBoundingClientRect().top-r.getBoundingClientRect().top);
   document.querySelector('section.x2o-bet').style.setProperty('--x2pbt-peek',peek+'px')});
 await p.addStyleTag({content:`@media(max-width:599.98px){html.x2p.x2pbt section.x2o-bet:has(>.x2p-vt){min-height:calc(100svh - var(--x2pbt-top,100svh) - var(--x2pbt-peek,52px))!important}}`});}
await p.waitForTimeout(400);
const m=await p.evaluate(()=>{const g=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]};return {vt:g('.x2p-vt'),bt:g('.x2p-bt'),h2:g('#recH'),ul:g('#record ul'),card:g('#car .card')}});
console.log(W+'x'+H,k,JSON.stringify(m));
await p.screenshot({path:`X-${k}-${W}x${H}.png`});await p.close()}}
await b.close()})();
