// node rec.js <take D|A> <order> <out.webm> : records the take at 390x844 (D: taps play and waits; A: scrolls through the four steps)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
(async()=>{const [T,O,out]=process.argv.slice(2);const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');const dir=path.join(__dirname,'out','vid');
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,recordVideo:{dir,size:{width:390,height:844}}});
 const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8995/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(o=>{window.__F2O=o},O);await p.addStyleTag({content:rd('_f2.css')+rd(T+'.css')+'\n'});await p.addScriptTag({content:rd('_f2.js')+rd(T+'.js')});
 await p.waitForFunction(()=>window.__f2done,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);await p.evaluate(()=>window.__f2place());
 const t0=Date.now();
 if(T==='D'){await p.evaluate(()=>{const o=document.querySelector('.t4-frs').getBoundingClientRect();scrollTo(0,o.top+scrollY-(innerHeight-o.height)/2-30)});await p.waitForTimeout(1500);await p.click('.f2d-play');await p.waitForTimeout(14500)}
 else{const st=await p.evaluate(()=>window.__f2stops());await p.evaluate(y=>scrollTo(0,y-500),st[0]);await p.waitForTimeout(1000);
  for(let y=st[0]-500;y<st[3]+300;y+=6){await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(16)}await p.waitForTimeout(800)}
 const v=p.video();await ctx.close();await v.saveAs(out);await b.close();console.log(out,(Date.now()-t0)/1000)})();
