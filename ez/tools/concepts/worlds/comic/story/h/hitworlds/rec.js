// node rec.js <take> <out.mp4> [width 390]: records a switch on the take: Hit rate -> P&L (Season) -> 7 days -> 24h -> Hit rate.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const T=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390);
(async()=>{const b=await chromium.launch();const {ctx,p}=await R.open(b,W,W<600?844:800);await R.inject(p,T);await p.evaluate(()=>{window.PN_STILL=false});
 await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'||c.position==='sticky')e.style.setProperty('visibility','hidden','important')});document.querySelector('.hw-root').scrollIntoView({block:'start'})});
 await p.waitForTimeout(600);const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hwrec'));
 /* frames from the browser's screencast at their real timing */
 const cdp=await ctx.newCDPSession(p);const frames=[];cdp.on('Page.screencastFrame',async f=>{frames.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,everyNthFrame:1});
 const click=async w=>{await p.evaluate(w=>document.querySelector(`.hw-c[data-win="${w}"]`).click(),w);await p.waitForTimeout(3200)};
 await p.waitForTimeout(1500);await p.evaluate(()=>HWset('hit',true));await p.waitForTimeout(3000);
 for(const w of ['season','d7','d1','hit'])await click(w);
 await cdp.send('Page.stopScreencast');
 /* resample to 30 fps */
 const t0=frames[0].t,t1=frames[frames.length-1].t;let k=0;for(let t=t0,i=0;t<=t1;t+=1/30,k++){while(i+1<frames.length&&frames[i+1].t<=t)i++;fs.writeFileSync(`${dir}/f${String(k).padStart(5,'0')}.jpg`,Buffer.from(frames[i].d,'base64'))}
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','30','-i',`${dir}/f%05d.jpg`,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-movflags','+faststart',OUT]);
 console.log(OUT,k,'frames');fs.rmSync(dir,{recursive:true});await b.close()})();
