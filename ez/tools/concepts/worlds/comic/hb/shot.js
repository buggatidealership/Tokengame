// node shot.js <outdir> now,A,B,C   -> header shots of X3+ at 390 and 1280 (Overview and Leaderboard)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const out=process.argv[2],takes=(process.argv[3]||'now,A,B,C').split(',');
(async()=>{const b=await chromium.launch();
for(const t of takes)for(const [w,h] of [[390,300],[1280,190]])for(const tab of ['','leaderboard']){
 const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:2});
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/'+tab);
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:40000});
 if(t!='now'){const css=fs.readFileSync(path.join(__dirname,'_base.css'),'utf8')+fs.readFileSync(path.join(__dirname,t+'.css'),'utf8');await p.addStyleTag({content:css});}
 await p.waitForTimeout(1800);
 if(t=='now'&&w==390&&!tab)console.log(await p.evaluate(()=>[...document.querySelectorAll('header.top .nav a')].map(a=>a.outerHTML.slice(0,140)).join('\n')));
 await p.screenshot({path:`${out}/hb-${t}-${w}-${tab||'ov'}.png`,clip:{x:0,y:0,width:w,height:h}});await p.close();}
await b.close()})();
