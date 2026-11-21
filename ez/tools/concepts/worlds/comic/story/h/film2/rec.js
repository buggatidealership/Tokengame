// node rec.js <out.webm> <id> [W]: records the take's beat on screen: idle (the key breathes), a tap on the gold key, the film starting, the LED counting down.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const OUT=process.argv[2],ID=process.argv[3]||'C',W=+(process.argv[4]||390),H=W<600?844:900,rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const dir=path.dirname(OUT)+'/_rec';fs.mkdirSync(dir,{recursive:true});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.addStyleTag({content:rd('_f2.css')});await p.evaluate(i=>window.__F2=i,ID);await p.addScriptTag({content:rd('_f2.js')});await p.waitForFunction(()=>window.__f2);
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
 await p.evaluate(()=>{const e=document.querySelector('.f2-pic');scrollTo(0,e.getBoundingClientRect().top+scrollY-(innerHeight-e.offsetHeight)/2-30)});
 const t0=Date.now();await p.waitForTimeout(3500);await p.click('.f2-btn');await p.waitForTimeout(7000);
 const st=await p.evaluate(()=>{const v=document.querySelector('.f2-pic video');return {t:v.currentTime,paused:v.paused,src:v.currentSrc.split('/').pop(),led:document.querySelector('.f2-t').textContent}});console.log(JSON.stringify(st));
 await p.click('.f2-btn');await p.waitForTimeout(1500);const v=p.video();await ctx.close();fs.renameSync(await v.path(),OUT);await b.close()})();
