const { chromium } = require('playwright');
// tight film and ticket (28px / 24px); the screen ends under "Every call straight to your X feed."; the spare height goes:
// B1 above the headline, B2 between the ticket and the record, B3 half above the headline and half before the record
const V={B1:[1,0],B2:[0,1],B3:[.5,.5]};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+require('fs').readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const [W,H] of [[412,863],[390,844]]){
for(const [k,[top,bot]] of Object.entries(V)){
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);
await p.addStyleTag({content:`@media(max-width:599.98px){html.x2p.x2pbt section.x2o-bet:has(>.x2p-vt){min-height:0!important}}`});await p.waitForTimeout(300);
await p.evaluate(([H,top,bot])=>{const car=document.querySelector('#car');const d=Math.max(0,Math.round(H-car.getBoundingClientRect().top));
  const hero=document.querySelector('section.hero'),rec=document.querySelector('#record');
  const a=Math.round(d*top),c=d-a;
  hero.style.setProperty('padding-top',(parseFloat(getComputedStyle(hero).paddingTop)+a)+'px','important');
  rec.style.setProperty('padding-top',(parseFloat(getComputedStyle(rec).paddingTop)+c)+'px','important');},[H,top,bot]);
await p.waitForTimeout(300);
const m=await p.evaluate(()=>{const g=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]};return {h1:g('section.hero h1'),vt:g('.x2p-vt'),bt:g('.x2p-bt'),ul:g('#record ul'),card:g('#car .card')}});
console.log(W+'x'+H,k,JSON.stringify(m));
await p.screenshot({path:`${k}-${W}x${H}.png`});await p.close()}}
await b.close()})();
