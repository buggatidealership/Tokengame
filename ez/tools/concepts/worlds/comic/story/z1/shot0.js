const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(1500);
 await p.screenshot({path:process.argv[2]+'/now-top.png',clip:{x:0,y:0,width:390,height:2400},fullPage:true});
 console.log(await p.evaluate(()=>{const h=document.querySelector('header.top');return h.offsetHeight+' '+document.querySelector('.x2p-vt').outerHTML.slice(0,1500)}));await b.close()})();
