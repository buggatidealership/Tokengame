// node rec.js <out.mp4> [W=390] : records the founder loops playing in the EPROMs, takes S and N2 in turn: 8 s on the one beat, then the fifth chip
// through at reading speed), Playwright video joined into one mp4 (H.264, yuv420p, faststart). Serve ez/ on 8951 first.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800,TMP=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'.rec-'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const t of ['S','N2']){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_c.css')+'body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}'});
  await p.evaluate(([k,q,m])=>{window.__CH=k;window.__PR='silk';window.__TW='ininf';window.__CHQ=q;window.__CHM=m},[t,JSON.parse(rd('quads.json')),JSON.parse(rd('marks.json'))]);await p.addScriptTag({content:rd('_c.js')});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>{__ch.place();scrollTo({top:document.querySelector('.ch-four').getBoundingClientRect().top+scrollY-40,behavior:'smooth'})});
  await p.evaluate(()=>document.querySelectorAll('section.ch video').forEach(v=>{v.muted=true;v.play().catch(()=>{})}));await p.waitForTimeout(1500);
  await p.waitForFunction(()=>[...document.querySelectorAll('section.ch video')].some(v=>v.readyState>=3&&!v.paused),null,{timeout:90000});await p.waitForTimeout(400);
  await p.evaluate(()=>{scrollTo({top:document.querySelector('.ch-four').getBoundingClientRect().top+scrollY-40,behavior:'smooth'})});await p.waitForTimeout(2500);await p.evaluate(()=>{scrollTo({top:document.querySelector('.ch-four').getBoundingClientRect().top+scrollY-40,behavior:'smooth'})});
  const t0=Date.now();await p.waitForTimeout(8000);
  await p.evaluate(()=>document.querySelector('.ch-tb').scrollIntoView({behavior:'smooth',block:'center'}));await p.waitForTimeout(3500);
  const dur=(Date.now()-t0)/1000;const v=p.video();await ctx.close();parts.push({f:await v.path(),dur,t})}
 await b.close();
 const list=[];parts.forEach((q,i)=>{const len=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',q.f]).toString();const o=`${TMP}/p${i}.mp4`;
  cp.execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,len-q.dur)),'-i',q.f,'-vf',`drawtext=text='take ${q.t}':x=10:y=h-30:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6,scale=trunc(iw/2)*2:trunc(ih/2)*2`,'-r','30','-c:v','libx264','-pix_fmt','yuv420p','-crf','24',o]);list.push(`file '${o}'`)});
 fs.writeFileSync(`${TMP}/l.txt`,list.join('\n'));cp.execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',`${TMP}/l.txt`,'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
