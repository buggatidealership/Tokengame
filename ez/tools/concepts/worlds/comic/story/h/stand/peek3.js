const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1})).newPage();await FONTS(p);
await p.goto('http://127.0.0.1:8985/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
await p.evaluate(()=>{scrollTo(0,1400)});await p.waitForTimeout(1500);await p.evaluate(()=>scrollTo(0,0));
await p.addStyleTag({content:'header{position:static!important}'});
await p.screenshot({path:process.argv[2]+'/top.png',clip:{x:0,y:1300,width:390,height:1300},fullPage:true});await b.close()})();
