// node dbg.js <take> <W> "<js expression>" : evaluates an expression on the page with the take laid over
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const [T,W,EX]=process.argv.slice(2);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:+W,height:844},reducedMotion:'reduce'})).newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto(`http://127.0.0.1:${process.env.PORT||9611}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.addStyleTag({content:fs.readFileSync(__dirname+'/_r10.css','utf8')});await p.evaluate(t=>{window.__R10=t},T);await p.addScriptTag({content:fs.readFileSync(__dirname+'/_r10.js','utf8')});await p.waitForTimeout(1500);
console.log(JSON.stringify(await p.evaluate(EX),null,1),er);await b.close()})();
