// node rec.js <out.mp4> [W=390] : records the founder loops playing inside the dies, takes A, B and C in turn (each scrolled
// through at reading speed), Playwright video joined into one mp4 (H.264, yuv420p, faststart). Serve ez/ on 8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800,TMP=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'.rec-'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const t of ['A','B','C']){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_c.css')+'body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}'});
  await p.evaluate(([k,q])=>{window.__CH=k;window.__CHQ=q},[t,JSON.parse(rd('quads.json'))]);await p.addScriptTag({content:rd('_c.js')});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>{__ch.place();document.querySelector('section.ch').scrollIntoView()});
  await p.waitForFunction(()=>[...document.querySelectorAll('section.ch video')].some(v=>v.readyState>=3&&!v.paused),null,{timeout:30000});await p.waitForTimeout(400);
  const t0=Date.now();
  const H0=await p.evaluate(()=>{const s=document.querySelector('section.ch'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  const steps=Math.max(1,Math.ceil((H0.h-H*.6)/(H*.55)));
  for(let i=0;i<=steps;i++){await p.evaluate(y=>scrollTo({top:y,behavior:'smooth'}),H0.y+Math.min(i*H*.55,H0.h-H*.6));await p.waitForTimeout(i===0?2600:3200)}
  const dur=(Date.now()-t0)/1000;const v=p.video();await ctx.close();parts.push({f:await v.path(),dur,t})}
 await b.close();
 const list=[];parts.forEach((q,i)=>{const len=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',q.f]).toString();const o=`${TMP}/p${i}.mp4`;
  cp.execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,len-q.dur)),'-i',q.f,'-vf',`drawtext=text='take ${q.t}':x=10:y=h-30:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6,scale=trunc(iw/2)*2:trunc(ih/2)*2`,'-r','30','-c:v','libx264','-pix_fmt','yuv420p','-crf','24',o]);list.push(`file '${o}'`)});
 fs.writeFileSync(`${TMP}/l.txt`,list.join('\n'));cp.execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',`${TMP}/l.txt`,'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
