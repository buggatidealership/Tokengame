// node render.js page.html out.png WxH : render a standalone idea board (fonts routed like the site's)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const path=require('path');
const [f,out,wh]=process.argv.slice(2);const [w,h]=(wh||'1200x630').split('x').map(Number);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:+(process.env.DPR||1)});await FONTS(p);
 await p.goto('http://localhost:8897/tools/concepts/ideas/'+f,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 await p.screenshot({path:out,fullPage:true});console.log(out);await b.close()})();
