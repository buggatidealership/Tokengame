// node rec.js <idea> <out.mp4> [W]: records one idea acting on the real page (frames from the browser's screencast at their real timing, 30 fps).
// sound: also renders the same synthesised track offline and muxes it in.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const ID=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390);const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const {ctx,p}=await R.open(b,W);
 const mount=async(o)=>{await p.evaluate(([id,o])=>{const h=document.getElementById('wwhost');h.innerHTML='';window.WW_NOW=o.t?Date.parse(o.t):null;try{localStorage.removeItem('ez-wow-call')}catch(e){}
   if(id==='vault')WW.vault.mount(h,{at:0,still:1});else if(id==='window')WW.window.mount(h,{demo:o.demo||null});else if(id==='depth')WW.depth.mount(h);else if(id==='sound')WW.sound.mount(h,{wide:innerWidth>1000});else if(id==='exch')WW.exch.mount(h,{wide:innerWidth>1000})},[ID,o]);
   await R.waitImgs(p);await p.waitForTimeout(800)};
 const T0='2026-11-03T15:59:51-05:00';
 if(ID==='pose')await p.evaluate(()=>{WW.pose.apply(77)});else await mount({t:(ID==='exch'||ID==='sound')?T0:null});
 await p.evaluate(id=>{const e=id==='pose'?document.querySelector('section.wc-chars'):document.querySelector('#wwhost .ww');const r=e.getBoundingClientRect();scrollTo(0,scrollY+r.top-(id==='depth'?innerHeight:8))},ID);
 await p.waitForTimeout(ID==='pose'?5000:800);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'wwrec'));const cdp=await ctx.newCDPSession(p);const frames=[];
 cdp.on('Page.screencastFrame',async f=>{frames.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,everyNthFrame:1});const st=Date.now();let plan=null,dur=0;if(ID==='exch'||ID==='sound')await p.evaluate(t=>WW.setNow(Date.parse(t)),T0);
 if(ID==='vault'){await sl(600);await p.evaluate(()=>WW.vault.play(6500));await sl(7600)}
 if(ID==='exch'){await sl(14500);await p.evaluate(()=>WW.setNow(Date.parse('2026-11-03T16:29:58-05:00')));await sl(6000)}
 if(ID==='window'){await sl(2600);await p.evaluate(()=>document.querySelector('.ww-hit[data-d="up"]').click());await sl(2600);
   await p.evaluate(()=>{const r=ROUNDS.slice(-1)[0];const h=document.getElementById('wwhost');h.innerHTML='';WW.window.mount(h,{demo:{n:r.n,co:r.co,ticker:r.ticker,dir:'up'}})});await R.waitImgs(p);await sl(3500)}
 if(ID==='depth'){for(let i=0;i<=80;i++){await p.evaluate(()=>scrollBy(0,14));await sl(45)}for(let i=0;i<=60;i++){await p.evaluate(t=>WW.depth.set(.62,Math.sin(t/60*Math.PI*2)),i);await sl(45)}await sl(400)}
 if(ID==='pose'){for(const n of [78,79,80]){await sl(2600);await p.evaluate(n=>WW.pose.apply(n),n)}await sl(2800)}
 if(ID==='sound'){await sl(1000);const t1=(Date.now()-st)/1000;const clickE=await p.evaluate(()=>{const b=document.querySelector('.ww-snd .ww-hit[aria-pressed]');b.click();return Date.now()/1000});await sl(12500);
   plan=[['click',clickE],['crowd',clickE+.05,4]];dur=(Date.now()-st)/1000+.5}
 const endE=Date.now()/1000;await cdp.send('Page.stopScreencast');
 const t0=frames[0].t,t1=Math.max(frames[frames.length-1].t,endE-.05);let k=0;for(let t=t0,i=0;t<=t1;t+=1/30,k++){while(i+1<frames.length&&frames[i+1].t<=t)i++;fs.writeFileSync(`${dir}/f${String(k).padStart(5,'0')}.jpg`,Buffer.from(frames[i].d,'base64'))}
 const args=['-y','-loglevel','error','-framerate','30','-i',`${dir}/f%05d.jpg`];
 if(plan){/* the bell: 4:00:00 is 9 s after the start time (15:59:51) on the scene's clock */const ringE=await p.evaluate(()=>window.__wwRingAt/1000);plan.forEach(x=>x[1]-=t0);const bt=ringE-t0;plan.push(['crowd',bt,5]);for(let i=0;i<6;i++)plan.push(['bell',bt+i*.42,.4]);plan.push(['paper',bt+.5]);
   const wav=await p.evaluate(([pl,d])=>WW.renderTrack(pl,d),[plan,Math.max(dur,(t1-t0)+.5)]);fs.writeFileSync(dir+'/a.wav',Buffer.from(wav,'base64'));args.push('-i',dir+'/a.wav','-c:a','aac','-b:a','128k','-shortest')}
 cp.execFileSync('ffmpeg',[...args,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-movflags','+faststart',OUT]);
 console.log(OUT,k,'frames');fs.rmSync(dir,{recursive:true});await b.close()})();
