// node rules.js <out.png> : renders rules.html (served from ez/ on PORT 9833) to the rules board.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1600,height:900},deviceScaleFactor:1});await FONTS(p);
 await p.goto('http://127.0.0.1:'+(process.env.PORT||9833)+'/tools/concepts/worlds/comic/story/h/h29/director/rules.html',{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
 await p.screenshot({path:process.argv[2],fullPage:true});await b.close()})();
