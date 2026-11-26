// Grok on the "As it stands" ticket in different single colours (owner, 2026-10-22: "the GROK looks a bit off")
const { chromium } = require('playwright');const fs=require('fs');
const O=[
 ['1 Now: bright gold, dark edge','color:#f2b632;-webkit-text-fill-color:#f2b632;text-shadow:0 1px 0 rgba(70,40,5,.7),0 0 1px rgba(70,40,5,.55)'],
 ['2 Old gold, printed','color:#b8860b;-webkit-text-fill-color:#b8860b;text-shadow:0 1px 0 rgba(255,250,235,.8),0 -.6px 0 rgba(60,35,5,.4)'],
 ['3 Deep ochre, pressed in','color:#9a6a0c;-webkit-text-fill-color:#9a6a0c;text-shadow:0 1px 0 rgba(255,250,235,.85),0 -.7px 0 rgba(40,25,5,.5)'],
 ['4 Brand green','color:#1f7a45;-webkit-text-fill-color:#1f7a45;text-shadow:0 1px 0 rgba(255,250,235,.85),0 -.7px 0 rgba(10,40,20,.45)'],
 ['5 Brand red','color:#c8372a;-webkit-text-fill-color:#c8372a;text-shadow:0 1px 0 rgba(255,250,235,.85),0 -.7px 0 rgba(60,10,5,.45)'],
 ['6 Gold on an ink tab','color:#f2b632;-webkit-text-fill-color:#f2b632;background:#22352a;padding:2px 5px 1px;border-radius:2px;text-shadow:none;box-shadow:inset 0 0 0 1px rgba(242,182,50,.35)'],
 ['7 Ink, same as the words','color:#22352a;-webkit-text-fill-color:#22352a;text-shadow:0 1px 0 rgba(255,250,235,.85),0 -.7px 0 rgba(40,30,15,.45)'],
 ['8 Gold, ink outline','color:#f2b632;-webkit-text-fill-color:#f2b632;-webkit-text-stroke:.9px #22352a;paint-order:stroke fill;text-shadow:0 1px 0 rgba(255,250,235,.6)']];
(async()=>{const b=await chromium.launch({args:['--ignore-certificate-errors-spki-list='+fs.readFileSync(process.env.SPKI_FILE||'spki.txt','utf8').trim()]});
const p=await b.newPage({viewport:{width:412,height:863},deviceScaleFactor:3});
await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForTimeout(2800);await p.evaluate(()=>document.fonts.ready);
for(let i=0;i<O.length;i++){
 await p.evaluate(([css])=>{let s=document.getElementById('gk');if(!s){s=document.createElement('style');s.id='gk';document.head.appendChild(s)}s.textContent='html.x2p #standings .x2p-ast em{'+css.replace(/;/g,'!important;')+'!important}'},[O[i][1]]);
 await p.waitForTimeout(250);
 const el=await p.$('#standings .x2p-ast');await el.screenshot({path:'gk'+i+'.png'})}
await b.close()})();
