// node rec.js <out.mp4> <take> [seconds]: records the take's arrival at 390 x 844 (Playwright video at real timing), then ffmpeg to mp4
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const {lay}=require('./run.js');const [OUT,T,SEC]=process.argv.slice(2);const dur=+(SEC||6);
(async()=>{const b=await chromium.launch();const vd=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'vid-'));
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,recordVideo:{dir:vd,size:{width:390,height:844}}});const p=await ctx.newPage();await FONTS(p);
 const t0=Date.now();
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:'header.top{visibility:hidden!important}'});await p.evaluate(()=>scrollTo({top:document.body.scrollHeight,behavior:'instant'}));
 await lay(p,T);await p.waitForFunction(t=>document.documentElement.classList.contains('sf-ready-'+t),T);await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
 const ts=(Date.now()-t0)/1000;
 await p.evaluate(()=>{const n=document.querySelector('.sf-top');scrollTo({top:n.getBoundingClientRect().top+scrollY-8,behavior:'instant'})});
 await p.waitForTimeout(dur*1000+300);await ctx.close();await b.close();
 const f=fs.readdirSync(vd).find(x=>x.endsWith('.webm'));
 cp.execSync(`ffmpeg -y -loglevel error -ss ${Math.max(0,ts-0.1).toFixed(2)} -i ${vd}/${f} -t ${dur} -c:v libx264 -pix_fmt yuv420p -crf 22 -movflags +faststart ${OUT}`);fs.rmSync(vd,{recursive:true});console.log(OUT,'start',ts)})();
