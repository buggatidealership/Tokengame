// node rec.js <out.mp4> [take g2]: the real Upcoming tab at 390x700 (2x), the take laid over it, recorded in real time from the browser's own screencast (frames at their real timing):
// today's main event held, then a slow scroll to the next fight nights' main events, ending on NVIDIA (Bet #1)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const OUT=process.argv[2],T=process.argv[3]||'g2';const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const TMP=fs.mkdtempSync(require('os').tmpdir()+'/sgrec-');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:2});
 const p=await ctx.newPage();await FONTS(p);await p.goto('http://localhost:8921/v47-live-x3plus.html#/upcoming',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';document.querySelectorAll('.x2p-cw').forEach(e=>e.style.display='none')});
 await p.addStyleTag({content:rd('../e/_se.css')+rd('_sg.css')+rd(T+'.css')});await p.addScriptTag({content:rd('../e/_se.js')+rd('_sg.js')+rd(T+'.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:90000});await p.waitForFunction(()=>document.fonts.status==='loaded');
 const y=s=>p.evaluate(s=>{const n=document.querySelector(s);return n.getBoundingClientRect().top+scrollY},s);
 /* scrolls run inside the page on requestAnimationFrame, so they keep their timing however slow the round trips are */
 const glide=(to,ms)=>p.evaluate(([to,ms])=>new Promise(r=>{const f=scrollY,t0=performance.now();const s=t=>{const k=Math.min(1,(t-t0)/ms),e=k<.5?2*k*k:1-(-2*k+2)**2/2;scrollTo(0,f+(to-f)*e);k<1?requestAnimationFrame(s):r()};requestAnimationFrame(s)}),[to,ms]);
 const first=await y('.sg-d .sg-h');await p.evaluate(v=>scrollTo(0,v-90),first);await p.waitForTimeout(600);
 const cdp=await ctx.newCDPSession(p),fr=[];let n=0;
 cdp.on('Page.screencastFrame',async e=>{const f=`${TMP}/f${String(n++).padStart(5,'0')}.jpg`;fs.writeFileSync(f,Buffer.from(e.data,'base64'));fr.push([f,e.metadata.timestamp]);try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(x){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,maxWidth:780,maxHeight:1400,everyNthFrame:1});
 await p.waitForTimeout(7000);
 const ds=await p.$$eval('.sg-d:not(.sg-w) > .sg-m',a=>a.map(n=>n.getBoundingClientRect().top+scrollY));
 await glide(ds[1]-120,2200);await p.waitForTimeout(4500);
 await glide(ds[ds.length-1]-120,3200);await p.waitForTimeout(5000);
 await cdp.send('Page.stopScreencast');await p.waitForTimeout(300);await ctx.close();
 /* each frame held until the next one came, as the browser painted them */
 const L=fr.map(([f,t],i)=>`file '${f}'\nduration ${Math.max(.001,((fr[i+1]||[0,t+.04])[1]-t)).toFixed(4)}`).join('\n')+`\nfile '${fr[fr.length-1][0]}'`;fs.writeFileSync(TMP+'/l.txt',L);
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/l.txt -vf "fps=30,scale=780:-2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fr.length+' frames',(fr[fr.length-1][1]-fr[0][1]).toFixed(1)+'s');await b.close()})();
