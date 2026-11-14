// node testdrop.js : the drop-in pasted into a copy of x2p_top.js, run on the built page; shoots the frames.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const b=await chromium.launch();for(const W of [390,1280]){const ctx=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.route('**/media/top-h24-board.jpg',r=>r.fulfill({path:__dirname+'/out/top-h24-board.jpg',contentType:'image/jpeg'}));
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:fs.readFileSync(__dirname+'/dropin-frame4.css','utf8')});await p.addScriptTag({content:fs.readFileSync(process.argv[2],'utf8')});
 await p.waitForTimeout(2500);await p.evaluate(()=>window.__t5.place());await p.waitForTimeout(500);const e=await p.evaluate(()=>window.__x2pTopErr&&String(window.__x2pTopErr));
 const el=await p.$('.t4-b2');await el.screenshot({path:__dirname+`/out/drop-${W}.png`});console.log(W,er,e,await p.evaluate(()=>document.documentElement.scrollWidth));await ctx.close()}await b.close()})();
