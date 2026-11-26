// node rec.js <take> <out.mp4> : records the take on the built page, 390x844 then 1280x800, scrolling from the cover to the NVIDIA bet
// at a reader's pace (steady scroll, a short hold as each section arrives). Canvas 1600x1000, H.264 yuv420p faststart.
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),{execSync}=require('child_process');
const T=process.argv[2],OUT=process.argv[3];const TMP=fs.mkdtempSync(require('os').tmpdir()+'/flrec-');
const LAB={now:'Today (live X3+)',a:'A · Turn the page',b:'B · Guided view',c:'C · The pile',d:'D · Iris'};
(async()=>{const b=await chromium.launch();const parts=[];
for(const [i,W] of [390,1280].entries()){const H=W<600?844:800;const {ctx,p,er}=await R.open(b,W,H,W<600?2:1);await R.inject(p,T);await R.quiet(p);
 const C=await R.cuts(p);const end=await p.evaluate(()=>{const e=document.querySelector('#wc-book > .wc-bet');const st=getComputedStyle(e).position==='sticky';if(st)e.style.position='static';const y=e.getBoundingClientRect().top+scrollY;if(st)e.style.position='';return y});
 const target=Math.round(end+H*.15);const v=W<600?360:520;
 // waypoints: hold 1.1 s as each section's top reaches about a third of the screen
 const holds=C.map(c=>Math.round(c-H*.3)).concat([target]);
 await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';scrollTo(0,0)});await p.waitForTimeout(900);
 const dir=`${TMP}/v${i}`;fs.mkdirSync(dir);const cdp=await ctx.newCDPSession(p);const fr=[];
 cdp.on('Page.screencastFrame',async e=>{fs.writeFileSync(`${dir}/f${String(fr.length).padStart(5,'0')}.jpg`,Buffer.from(e.data,'base64'));fr.push(e.metadata.timestamp);try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:85,everyNthFrame:1});await p.waitForTimeout(1200);
 const dur=await p.evaluate(async([holds,v])=>{const t0=performance.now();let y=0;for(const h of holds){await new Promise(res=>{const s=performance.now(),y0=y,d=Math.abs(h-y0)/v*1000;const f=n=>{const k=Math.min(1,(n-s)/d);const e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo(0,y0+(h-y0)*(.15*e+.85*k));if(k<1)requestAnimationFrame(f);else{y=h;res()}};requestAnimationFrame(f)});await new Promise(r=>setTimeout(r,1100))}return performance.now()-t0},[holds,v]);
 await p.waitForTimeout(600);await cdp.send('Page.stopScreencast');await p.waitForTimeout(200);
 const t0=fr[0],tEnd=fr[fr.length-1]+.5;let txt='';fr.forEach((t,n)=>{const nx=n+1<fr.length?fr[n+1]:tEnd;txt+=`file '${dir}/f${String(n).padStart(5,'0')}.jpg'\nduration ${Math.max(.001,nx-t).toFixed(4)}\n`});
 txt+=`file '${dir}/f${String(fr.length-1).padStart(5,'0')}.jpg'\n`;fs.writeFileSync(`${TMP}/c${i}.txt`,txt);
 const lab=(LAB[T]+(W<600?' · 390 px':' · 1280 px')).replace(/:/g,'\\:');
 const vf=W<600?`fps=30,scale=-2:920,pad=1600:1000:(ow-iw)/2:72:0x14121a`:`fps=30,scale=1600:-2,crop=1600:928:0:0,pad=1600:1000:0:72:0x14121a`;
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/c${i}.txt -vf "${vf},drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${lab}':fontcolor=0xfdbc2a:fontsize=32:x=24:y=20" -c:v libx264 -preset medium -pix_fmt yuv420p -crf 26 -r 30 ${TMP}/p${i}.mp4`);
 parts.push(`${TMP}/p${i}.mp4`);console.log(T,W,'frames',fr.length,'scroll s',(dur/1000).toFixed(1),er.join('|')||'ok');await ctx.close()}
fs.writeFileSync(TMP+'/list.txt',parts.map(f=>`file '${f}'`).join('\n'));
execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/list.txt -c copy -movflags +faststart ${OUT}`);fs.rmSync(TMP,{recursive:true});
console.log(OUT,(fs.statSync(OUT).size/1e6).toFixed(1)+' MB');await b.close()})();
