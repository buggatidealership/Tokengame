// node shot-a.js <out.png> [zoom out.png]: take A (detail pass) at 390x560, DPR 2, from the live page's numbers (port 8929).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const q=await b.newPage();await q.goto('http://localhost:8929/v47-live-x3plus.html',{waitUntil:'load'});await q.waitForFunction(()=>window.__x2pPnl&&window.ROUNDS,null,{timeout:60000});
 const D=await require('./data.js')(q);await q.close();
 const p=await b.newPage({viewport:{width:390,height:560},deviceScaleFactor:+(process.env.DPR||2)});await fonts(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('file://'+__dirname+'/a.html');await p.evaluate(()=>document.fonts.ready);await p.evaluate(D=>draw(D),D);await p.waitForTimeout(500);
 await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:390,height:560}});
 const n=await p.evaluate(()=>document.querySelectorAll('svg *').length);console.log(JSON.stringify({els:n,err:er,top:D.top,win:D.win,big:D.big,last:D.last,lastm:D.lastm,pnl:D.pnl}));await b.close()})();
