const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8928/v47-live-x3plus.html',{waitUntil:'load'});
await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.addScriptTag({content:fs.readFileSync('../cv/_cv.js','utf8')});
console.log(await p.evaluate(()=>JSON.stringify({last:CV.last,calls:CV.calls,wins:CV.wins,lead:CV.lead,L:CV.L.pnl,pm:POP.pm(CV.L.pnl),n:CV.R.length,day:CV.shortDay,cols:Object.fromEntries(Object.keys(MODELS).map(m=>[m,MODELS[m].c])),fr:Object.fromEntries(Object.keys(MODELS).map(m=>[m,MODELS[m].fr])),lg:SE.logo(CV.last.ticker),dk:SE.L(CV.last.ticker), POPk:Object.keys(POP),cvk:Object.keys(CV)})));await b.close()})();
