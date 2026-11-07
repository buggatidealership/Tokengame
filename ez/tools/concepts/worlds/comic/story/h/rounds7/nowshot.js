const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const p=await (await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?2:1,reducedMotion:'reduce'})).newPage();await FONTS(p);
await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});
await p.evaluate(()=>{document.querySelectorAll('#record .r6 img').forEach(i=>i.loading='eager');document.querySelector('#record .r6').scrollIntoView()});await p.waitForTimeout(4000);
const e=await p.$('#record .r6');await e.screenshot({path:`out/sec-${W}-now.png`});}await b.close()})();
