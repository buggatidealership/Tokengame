// node record.js T1,...  -> ../../../x2p-tabanim-<take>.mp4: recordVideo at 390x720, clicks Accuracy, Target hits, Sector, P&L 1.6s apart,
// then ffmpeg trims, crops to the card and scales 2x. Also checks errors and the card's state after every switch, and reduced motion.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const open=require('./_page.js');const fs=require('fs'),{execFileSync}=require('child_process');
const TK=(process.argv[2]||'T1,T2,T3,T4,T5').split(','),VD=__dirname+'/video',EZ=__dirname+'/../../..';fs.mkdirSync(VD,{recursive:true});
const SEQ=['hit','miss','sector','roi'];
(async()=>{const b=await chromium.launch();
 for(const t of TK){const errs=[];const ctx=await b.newContext({viewport:{width:390,height:720},deviceScaleFactor:1,recordVideo:{dir:VD,size:{width:390,height:720}}});
  const t0=Date.now();const p=await open(ctx,t,errs);
  const r=await p.evaluate(()=>{const r=document.querySelector('#learn .x2p-pt .pt-cd').getBoundingClientRect();return {y:r.top,h:r.height}});
  await p.waitForTimeout(600);const tc=Date.now();const bad=[];
  for(const v of SEQ){await p.click(`#learn .pt-tb [data-pt="${v}"]`);await p.waitForTimeout(1600);const s=await open.state(p);
   if(s.tab!==v||s.left||s.hide||s.vis!=='visible'||s.tf!=='none')bad.push(v+':'+JSON.stringify(s))}
  await p.waitForTimeout(400);const te=Date.now();const vp=await p.video().path();await ctx.close();
  const ss=((tc-t0)/1000-0.5).toFixed(2),du=((te-tc)/1000+0.5).toFixed(2),y=Math.max(0,Math.round(r.y-16)),h=Math.min(720-y,Math.round(r.h+40))&~1;
  const out=`${EZ}/x2p-tabanim-${t}.mp4`;
  execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vp,'-t',du,'-vf',`crop=390:${h}:0:${y},scale=780:${h*2}:flags=lanczos,fps=30`,'-c:v','libx264','-crf','18','-preset','slow','-pix_fmt','yuv420p','-movflags','+faststart','-an',out]);
  console.log(t,'errors:',errs.join(' | ')||'none','| state:',bad.join(' ; ')||'ok after all 4 switches','|',out,fs.statSync(out).size)}
 // reduced motion: a plain swap, nothing of the mockup built
 const ctx=await b.newContext({viewport:{width:390,height:720},reducedMotion:'reduce'});const errs=[];const p=await open(ctx,'T1',errs);
 await p.evaluate(()=>{window.__seen=0;new MutationObserver(m=>m.forEach(r=>r.addedNodes.forEach(n=>{if(n.classList&&/ta-/.test(n.className))window.__seen++}))).observe(document.querySelector('#learn .pt-cd'),{childList:true,subtree:true})});
 await p.click('#learn .pt-tb [data-pt="hit"]');await p.waitForTimeout(300);console.log('reduced motion:',JSON.stringify(await open.state(p)),'mock pieces built:',await p.evaluate(()=>window.__seen),errs.join('|')||'no errors');
 await b.close()})();
