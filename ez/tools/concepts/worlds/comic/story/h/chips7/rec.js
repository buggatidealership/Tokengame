// chips7: node rec.js <out.mp4> [W=390] : the founder loops in the dies and the displays re-scanning (8 s on the four chips, then the fifth chip),
// Playwright video joined into one mp4 (H.264, yuv420p, faststart). Serve ez/ on 8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800,TMP=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'.rec-'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.evaluate(()=>document.querySelectorAll('section.c6').forEach(s=>s.remove()));await p.addStyleTag({content:rd('_c7.css')+'body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}'});
 await p.addScriptTag({content:rd('_c7.js')});await p.waitForFunction(()=>document.fonts.status==='loaded');
 const go=()=>p.evaluate(()=>scrollTo({top:document.querySelector('.c7-four').getBoundingClientRect().top+scrollY-30,behavior:'instant'}));await go();
 await p.evaluate(()=>document.querySelectorAll('section.c7 video').forEach(v=>{v.muted=true;v.play().catch(()=>{})}));
 await p.waitForFunction(()=>[...document.querySelectorAll('section.c7 video')].filter(v=>v.readyState>=3&&!v.paused).length>=4,null,{timeout:90000});await go();await p.waitForTimeout(500);
 const t0=Date.now();await p.waitForTimeout(8000);
 await p.evaluate(()=>document.querySelector('.ch-tb').scrollIntoView({behavior:'smooth',block:'center'}));await p.waitForTimeout(3500);
 const dur=(Date.now()-t0)/1000,v=p.video();await ctx.close();const f=await v.path();await b.close();
 const len=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',f]).toString();
 cp.execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,len-dur)),'-i',f,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-r','30','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
