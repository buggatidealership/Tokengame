// node pos.js <shots> <W>: section tops (css px) on the plain page for the close-up crops
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();const W=+process.argv[3];const o={};
for(const tab of ['ov','up']){const p=await b.newPage({viewport:{width:W,height:900}});await FONTS(p);
 await p.goto('http://localhost:8931/v47-live-x3plus.html'+(tab==='up'?'#/upcoming':''),{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(tab==='up'?8000:3500);
 Object.assign(o,await p.evaluate(tab=>{const t=s=>Math.round(document.querySelector(s).getBoundingClientRect().top+scrollY);return tab==='up'?{up:t('#wc-up .wc-tab-cv')-20}:{ch:t('.wc-chars'),se:t('.wc-season')}},tab));await p.close()}
const r={};for(const k of ['now','g1','g2','g3','g4','g5','g6']){r[k]=Object.assign({},o);if(k==='g1'){r[k].ch+=40;r[k].se+=80}} // G1 widens the gutters: measured offsets below
fs.writeFileSync(process.argv[2]+'/pos-'+W+'.json',JSON.stringify(r));console.log(r.now);await b.close()})();
