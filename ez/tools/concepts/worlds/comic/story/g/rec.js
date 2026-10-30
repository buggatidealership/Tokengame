// node rec.js <out.mp4> [take g2]: the real Upcoming tab at 390x700 (2x), the take laid over it, recorded in real time by the browser:
// today's main event held, then a slow scroll to the next fight nights' main events, ending on NVIDIA (Bet #1)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const OUT=process.argv[2],T=process.argv[3]||'g2';const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const TMP=fs.mkdtempSync(require('os').tmpdir()+'/sgrec-');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:780,height:1400}}});const t0=Date.now();
 const p=await ctx.newPage();await FONTS(p);await p.goto('http://localhost:8921/v47-live-x3plus.html#/upcoming',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';document.querySelectorAll('.x2p-cw').forEach(e=>e.style.display='none')});
 await p.addStyleTag({content:rd('../e/_se.css')+rd('_sg.css')+rd(T+'.css')});await p.addScriptTag({content:rd('../e/_se.js')+rd('_sg.js')+rd(T+'.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:90000});await p.waitForFunction(()=>document.fonts.status==='loaded');
 const y=s=>p.evaluate(s=>{const n=document.querySelector(s);return n.getBoundingClientRect().top+scrollY},s);
 const glide=async(to,ms)=>{const from=await p.evaluate(()=>scrollY),n=Math.round(ms/40);for(let i=1;i<=n;i++){const k=i/n,e=k<.5?2*k*k:1-(-2*k+2)**2/2;await p.evaluate(v=>scrollTo(0,v),from+(to-from)*e);await p.waitForTimeout(40)}};
 const first=await y('.sg-d .sg-h');await p.evaluate(v=>scrollTo(0,v-90),first);await p.waitForTimeout(400);const off=(Date.now()-t0)/1000;
 await p.waitForTimeout(7000);
 const ds=await p.$$eval('.sg-d:not(.sg-w) > .sg-m',a=>a.map(n=>n.getBoundingClientRect().top+scrollY));
 await glide(ds[1]-120,2600);await p.waitForTimeout(4500);
 await glide(ds[ds.length-1]-120,3600);await p.waitForTimeout(5000);
 const dur=(Date.now()-t0)/1000-off;await ctx.close();const vf=fs.readdirSync(TMP).find(f=>f.endsWith('.webm'));
 execSync(`ffmpeg -y -loglevel error -ss ${off.toFixed(2)} -i ${TMP}/${vf} -t ${dur.toFixed(2)} -vf "fps=30" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,dur.toFixed(1)+'s');await b.close()})();
