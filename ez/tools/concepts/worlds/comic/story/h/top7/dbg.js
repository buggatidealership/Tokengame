const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [W,T,expr]=process.argv.slice(2);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:+W,height:664}})).newPage();await FONTS(p);
await p.goto('http://localhost:8984/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.evaluate(t=>{window.__T7=t},T);await p.addStyleTag({content:fs.readFileSync(__dirname+'/_t7.css','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/_t7.js','utf8')});await p.waitForTimeout(2000);
console.log(JSON.stringify(await p.evaluate(expr),null,0));await b.close()})();
