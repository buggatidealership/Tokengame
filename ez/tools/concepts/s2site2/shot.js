// node shot.js <take|now> <route> <width> <out.png> [full]
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
(async()=>{const [take,route,w,out,full]=process.argv.slice(2);const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+w<600?844:860},deviceScaleFactor:2});
await p.goto('http://localhost:8811/'+route,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
if(take!=='now'){await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'common.css'),'utf8')+fs.readFileSync(path.join(__dirname,take+'.css'),'utf8')});
 await p.evaluate(fs.readFileSync(path.join(__dirname,'fix.js'),'utf8'));const js=path.join(__dirname,take+'.js');if(fs.existsSync(js))await p.evaluate(fs.readFileSync(js,'utf8'))}
if(full==='1')await p.evaluate(()=>document.body.classList.add('shot-full'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.screenshot({path:out,fullPage:full==='1'});await b.close()})();
