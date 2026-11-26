// node shot.js <take|now> <route> <width> <out.png> [full]
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
(async()=>{let [take,route,w,out,full]=process.argv.slice(2);const FEED=route==='#/feed',HG=/\+hg$/.test(take);take=take.replace('+hg','');if(FEED)route='#/leaderboard';const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+w<600?844:860},deviceScaleFactor:2});
await p.goto('http://localhost:8811/'+route,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
if(FEED){await p.evaluate(fs.readFileSync(path.join(__dirname,'feed-data.js'),'utf8'));await p.evaluate(fs.readFileSync(path.join(__dirname,'feed.js'),'utf8'));await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'feed.css'),'utf8')})}
if(HG)await p.evaluate(()=>document.body.classList.add('hg'));
if(take!=='now'){await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'common.css'),'utf8')+fs.readFileSync(path.join(__dirname,take+'.css'),'utf8')});
 await p.evaluate(fs.readFileSync(path.join(__dirname,'fix.js'),'utf8'));const js=path.join(__dirname,take+'.js');if(fs.existsSync(js))await p.evaluate(fs.readFileSync(js,'utf8'))}
if(full==='1')await p.evaluate(()=>document.body.classList.add('shot-full'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
await p.screenshot({path:out,fullPage:full==='1'});await b.close()})();
