// node probe.js <width> <take> <js-expression> : evaluates an expression on the page with the take applied
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
(async()=>{const [W,T,ex]=process.argv.slice(2);const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:+W,height:900}})).newPage();await FONTS(p);
 await p.goto('http://localhost:8931/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(T!=='now'){await p.evaluate(()=>{window.__R3BASE='tools/concepts/worlds/comic/story/h/round3/'});await p.addStyleTag({content:rd('_r3.css')+rd(T+'.css')});await p.addScriptTag({content:rd('_r3.js')+rd(T+'.js')});await p.waitForTimeout(1500)}
 console.log(JSON.stringify(await p.evaluate(ex)));await b.close()})();
