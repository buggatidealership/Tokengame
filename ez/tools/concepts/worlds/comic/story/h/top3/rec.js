// node rec.js <out.mp4> [W=390] : records take L/A at phone size, twice: (1) "tap": self-reveal off, the frames sit off (dies breathing,
// plunger bobbing, cursor blinking, glint on the gold), then each frame is tapped in turn; (2) "auto": self-reveal on, a scroll stops on
// the frames and each lights itself after 3 s on screen. Serve ez/ on 8953.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800,TMP=fs.mkdtempSync(path.join(path.dirname(path.resolve(OUT)),'.rec-'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const mode of ['tap','auto']){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W,height:H}}});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8953/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd('_t3.css')+'body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}'});
  await p.evaluate(a=>{window.__T3L='L';window.__T3F='A';window.__T3auto=a},mode==='auto');await p.addScriptTag({content:rd('_t3.js')});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>{__t3.place();[...document.images].forEach(i=>i.loading='eager')});
  await p.waitForFunction(()=>[...document.querySelectorAll('.t3 img')].every(i=>i.complete));await p.waitForTimeout(500);
  const t0=Date.now();await p.evaluate(()=>scrollTo({top:0}));await p.waitForTimeout(1500);
  const go=async sel=>{await p.evaluate(s=>{const f=document.querySelector(s);scrollTo({top:f.getBoundingClientRect().top+scrollY-60,behavior:'smooth'})},sel);await p.waitForTimeout(1600)};
  if(mode==='tap'){await go('.t3-h2');await p.waitForTimeout(2600);
   for(const [i,sel] of ['.t3-call','.t3-bell','.t3-ledger','.t3-one'].entries()){if(i===2)await go('.t3-ledger');const f=await p.$(sel);const bb=await f.boundingBox();
    await p.mouse.move(bb.x+bb.width/2,bb.y+bb.height*.35,{steps:6});await p.mouse.down();await p.mouse.up();await p.waitForTimeout(2900)}}
  else{await go('.t3-h2');await p.waitForTimeout(4600);await go('.t3-ledger');await p.waitForTimeout(4600)}
  const dur=(Date.now()-t0)/1000;const v=p.video();await ctx.close();parts.push({f:await v.path(),dur,t:mode==='tap'?'tap to reveal (self-reveal off)':'self-reveal after 3 s on screen'})}
 await b.close();const list=[];
 parts.forEach((q,i)=>{const len=+cp.execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','csv=p=0',q.f]).toString();const o=`${TMP}/p${i}.mp4`;
  cp.execFileSync('ffmpeg',['-y','-v','error','-ss',String(Math.max(0,len-q.dur)),'-i',q.f,'-vf',`drawtext=text='${q.t}':x=10:y=h-30:fontsize=16:fontcolor=white:box=1:boxcolor=black@0.7,scale=trunc(iw/2)*2:trunc(ih/2)*2`,'-r','30','-c:v','libx264','-pix_fmt','yuv420p','-crf','24',o]);list.push(`file '${o}'`)});
 fs.writeFileSync(`${TMP}/l.txt`,list.join('\n'));cp.execFileSync('ffmpeg',['-y','-v','error','-f','concat','-safe','0','-i',`${TMP}/l.txt`,'-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fs.statSync(OUT).size)})();
