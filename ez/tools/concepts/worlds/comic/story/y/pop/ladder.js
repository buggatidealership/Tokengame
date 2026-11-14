const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1400,height:420},deviceScaleFactor:2});await fonts(p);
await p.goto('file://'+__dirname+'/ladder.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:1360,height:400}});await b.close()})();
