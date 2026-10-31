const { chromium } = require('playwright');
const S='html.x2p.x2pbt section.x2o-bet:has(>.x2p-vt)';
const V={
 now:{css:''},
 A1:{css:`${S}{min-height:0!important}`},
 A2:{css:`${S}{justify-content:flex-start!important;min-height:calc(100svh - var(--x2pbt-top,100svh) - 96px)!important}`},
 A3:{css:`${S}{min-height:0!important} html.x2p.x2pbt .x2p-vt{margin-top:36px!important} html.x2p.x2pbt .x2p-bt{margin-top:32px!important} html.x2p.x2pbt section.x2o-bet + section.x2o-rc{padding-top:34px!important}`}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+require('fs').readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const [W,H] of [[412,863],[390,844],[390,664]]){
for(const [k,v] of Object.entries(V)){
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);
if(v.css)await p.addStyleTag({content:`@media(max-width:599.98px){${v.css}}`});await p.waitForTimeout(400);
const m=await p.evaluate(()=>{const g=s=>{const r=document.querySelector(s).getBoundingClientRect();return [Math.round(r.top),Math.round(r.bottom)]};return {vt:g('.x2p-vt'),bt:g('.x2p-bt'),tag:g('#record .sh .no'),h2:g('#recH'),ul:g('#record ul'),car:g('#car')}});
console.log(W+'x'+H,k,JSON.stringify(m));
await p.screenshot({path:`${k}-${W}x${H}.png`});await p.close()}}
await b.close()})();
