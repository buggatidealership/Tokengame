// node rec.js <out.mp4> <section sol|lb> <take>: records the take's entrance at 390 x 844 (Playwright video, real timing), then ffmpeg to mp4
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const [OUT,SEC,T]=process.argv.slice(2);const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const vd=fs.mkdtempSync(path.join(path.dirname(OUT),'vid-'));
 const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,recordVideo:{dir:vd,size:{width:390,height:844}}});const p=await ctx.newPage();await FONTS(p);
 const t0=Date.now();
 await p.goto('http://localhost:8897/v47-live-x3plus.html'+(SEC==='lb'?'#/leaderboard':''),{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:'header.top{visibility:hidden!important}'});await p.evaluate(s=>{const n=document.querySelector(s);scrollTo({top:n.getBoundingClientRect().top+scrollY-10,behavior:'instant'})},SEC==='lb'?'#wc-lb .wc-sbd':'.wc-splash');await p.waitForTimeout(600);
 const ts=(Date.now()-t0)/1000;
 await p.addScriptTag({content:rd('_c.js')});await p.addStyleTag({content:rd('_c.css')});await p.addStyleTag({content:rd(T+'.css')});await p.addScriptTag({content:rd(T+'.js')});

 await p.evaluate(s=>{const n=document.querySelector(s);scrollTo({top:n.getBoundingClientRect().top+scrollY-(s.includes('race')?10:-60),behavior:'instant'})},SEC==='lb'?'.sc-race':'.sc-take');
 await p.waitForTimeout(4200);console.log(await p.evaluate(()=>{const e=document.querySelector('.sc5,.sc-ch');return e&&e.className}));await ctx.close();await b.close();
 const f=fs.readdirSync(vd).find(x=>x.endsWith('.webm'));
 cp.execSync(`ffmpeg -y -loglevel error -ss ${Math.max(0,ts-0.3).toFixed(2)} -i ${vd}/${f} -t 4.6 -c:v libx264 -pix_fmt yuv420p -crf 22 -movflags +faststart ${OUT}`);fs.rmSync(vd,{recursive:true});console.log(OUT,'start',ts)})();
