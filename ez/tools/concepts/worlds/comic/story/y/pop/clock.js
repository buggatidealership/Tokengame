const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:880,height:640},deviceScaleFactor:2});await fonts(p);await p.emulateMedia({reducedMotion:'reduce'});
await p.goto('file://'+__dirname+'/clock.html');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.screenshot({path:process.argv[2],clip:{x:0,y:0,width:870,height:640}});
if(process.argv[3]){await p.emulateMedia({reducedMotion:'no-preference'});await p.screenshot({path:process.argv[3]+'-tmp.png'})}
await b.close()})();
