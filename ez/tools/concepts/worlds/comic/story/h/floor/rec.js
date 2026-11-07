// node rec.js <out.mp4> [style n|l] [W]: a stamp and the result, on the real Upcoming tab (frames from the browser's screencast at real timing, 30 fps).
// 1 the window open on the next round (R81 Palantir), tap the green stamp: UP lands on your card;
// 2 "your next visit after the close": three calls already graded in this browser (R78 to R80, a demo history), the AIs' cards stamped one by one, "You beat 2 of 4".
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const OUT=process.argv[2],S=process.argv[3]||'n',W=+(process.argv[4]||390);const sl=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const {ctx,p}=await R.open(b,W,'upcoming');
 await p.evaluate(([s,wide])=>{FX.setNow(Date.parse('2026-10-31T13:00:00-04:00'));const up=document.getElementById('wc-up');up.querySelector('.wc-tab-cv').style.display='none';const h=document.createElement('div');h.id='fxhost';h.style.cssText='background:#04070e;padding-bottom:18px';
   up.insertBefore(h,up.firstChild);FX.call.mount(h,{style:s,wide})},[S,W>=1000]);
 await p.waitForFunction(()=>[...document.querySelectorAll('.fxc img')].every(i=>i.complete));await p.waitForTimeout(900);
 await p.evaluate(()=>{const e=document.querySelector('#fxhost .fxc');scrollTo(0,scrollY+e.getBoundingClientRect().top-4)});await p.waitForTimeout(500);
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'fxrec'));const cdp=await ctx.newCDPSession(p);const frames=[];
 cdp.on('Page.screencastFrame',async f=>{frames.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,everyNthFrame:1});
 await sl(2800);await p.click('#fxhost .fxc-hit.up');await sl(2600);
 await p.evaluate(()=>{const c=document.createElement('div');c.id='fxcut';c.textContent='Your next visit, after the close';c.style.cssText='position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#04070e;color:#fdbc2a;font:700 26px Kalam,cursive;z-index:99';document.body.appendChild(c)});await sl(1300);
 await p.evaluate(H=>{localStorage.setItem('ez-yourcall',JSON.stringify({v:1,calls:H}));FX.mem=null;document.getElementById('fxcut').remove();document.querySelector('#fxhost .fxc')._draw('reveal')},R.HIST);await sl(5200);
 const endE=Date.now()/1000;await cdp.send('Page.stopScreencast');
 const t0=frames[0].t,t1=Math.max(frames[frames.length-1].t,endE-.05);let k=0;for(let t=t0,i=0;t<=t1;t+=1/30,k++){while(i+1<frames.length&&frames[i+1].t<=t)i++;fs.writeFileSync(`${dir}/f${String(k).padStart(5,'0')}.jpg`,Buffer.from(frames[i].d,'base64'))}
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','30','-i',`${dir}/f%05d.jpg`,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','23','-movflags','+faststart',OUT]);
 console.log(OUT,k,'frames');fs.rmSync(dir,{recursive:true});await b.close()})();
