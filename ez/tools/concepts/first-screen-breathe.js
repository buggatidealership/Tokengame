const { chromium } = require('playwright');
const V={
 now:{vt:null},
 A:{vt:16,bt:30,gap:24,label:'A · Inset'},
 B:{vt:22,bt:42,gap:26,label:'B · More air'},
 C:{vt:16,bt:52,gap:24,label:'C · Small ticket'}};
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+require('fs').readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
for(const [W,H] of [[412,863],[390,664]]){
for(const [k,v] of Object.entries(V)){
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2500);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
if(v.vt!=null){await p.addStyleTag({content:`
@media(max-width:759px){
html.x2p .x2p-vt{margin-left:${v.vt-16}px!important;margin-right:${v.vt-16}px!important;margin-top:${v.gap+4}px!important}
html.x2p.x2pbt .x2p-bt{margin:${v.gap}px ${v.bt-16}px 0!important}
}`});
 await p.waitForTimeout(300);
 // the spare space goes evenly into the three gaps (headline-film, film-ticket, ticket-record), so the record's
 // "01" tag is the only thing that peeks under the ticket
 await p.evaluate((H)=>{const r=document.querySelector('#record'),h2=r.querySelector('h2');
   const d=Math.round(H+6-h2.getBoundingClientRect().top);if(d<=0)return;const e=Math.floor(d/3);
   const vt=document.querySelector('.x2p-vt'),bt=document.querySelector('.x2p-bt');
   vt.style.setProperty('margin-top',(parseFloat(getComputedStyle(vt).marginTop)+e)+'px','important');
   bt.style.setProperty('margin-top',(parseFloat(getComputedStyle(bt).marginTop)+e)+'px','important');
   r.style.marginTop=(d-2*e)+'px';},H);
 await p.waitForTimeout(200);}
const m=await p.evaluate(()=>{const g=s=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();return [Math.round(r.left),Math.round(r.width),Math.round(r.top),Math.round(r.height)]};return {vt:g('.x2p-vt'),bt:g('.x2p-bt'),rec:g('#record h2'),dig:document.querySelector('.x2p-bt #gpu')?Math.round(getComputedStyle(document.querySelector('.x2p-bt #gpu b, .x2p-bt #gpu span')||document.body).fontSize.replace('px','')):0}});
console.log(W,H,k,JSON.stringify(m));
await p.screenshot({path:`${k}-${W}.png`});await p.close()}}
await b.close()})();
