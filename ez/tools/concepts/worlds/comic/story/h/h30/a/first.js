// node first.js <out.png> : the first frame at 390x664, 3x
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:390,height:664},deviceScaleFactor:3,isMobile:true,hasTouch:true});const p=await c.newPage();
await p.goto('http://localhost:8981/tools/concepts/worlds/comic/story/h/h30/a/index.html?board=1',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);await p.screenshot({path:process.argv[2]});await b.close()})();
