// node rec.js <out.mp4> [W=390] : records the micro-interactions of takes A and B (scroll to the four frames: the bell's first-view cue,
// then a tap on each frame in turn), Playwright video, joined and converted to mp4 (H.264, yuv420p, faststart). Serve ez/ on 8951.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800,TMP=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'.rec-'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const t of ['A','B']){
  // load and build off camera, then record a fresh page in the same context state
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_t.css')+'body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'});await p.evaluate(k=>window.__T1=k,t);await p.addScriptTag({content:rd('_t.js')});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>{__t1.place();[...document.images].forEach(i=>i.loading='eager')});
  await p.waitForFunction(()=>[...document.querySelectorAll('.t1 img')].every(i=>i.complete));await p.waitForTimeout(500);
  const t0=Date.now();
  await p.evaluate(()=>scrollTo({top:0}));await p.waitForTimeout(1500);
  // scroll down to the four frames: the bell's one-time cue plays as they come on screen
  await p.evaluate(()=>{const f=document.querySelector('.t1-panel');scrollTo({top:f.getBoundingClientRect().top+scrollY-70,behavior:'smooth'})});await p.waitForTimeout(3000);
  const fr=await p.$$('.t1-fr');for(const f of fr){const bb=await f.boundingBox();await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height*.4,{steps:6});await p.mouse.down();await p.mouse.up();await p.waitForTimeout(1900);await p.mouse.move(2,2)}
  const dur=(Date.now()-t0)/1000;const v=p.video();await ctx.close();const f=await v.path();parts.push({f,skip:0,dur,t})}
 await b.close();
 // trim the off-camera loading from each part: keep its last <dur> seconds
 const list=[];parts.forEach((q,i)=>{const len=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',q.f]).toString();const o=`${TMP}/p${i}.mp4`;
  cp.execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,len-q.dur)),'-i',q.f,'-vf',`drawtext=text='take ${q.t}':x=10:y=h-30:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6,scale=trunc(iw/2)*2:trunc(ih/2)*2`,'-r','30','-c:v','libx264','-pix_fmt','yuv420p','-crf','24',o]);list.push(`file '${o}'`)});
 fs.writeFileSync(`${TMP}/l.txt`,list.join('\n'));cp.execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',`${TMP}/l.txt`,'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
