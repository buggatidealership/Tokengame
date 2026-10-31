// node rec.js <take> <out.mp4> [width 390]: records a switch on the take: hit rate, then P&L Season, 7 days, 24h, back to hit rate
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),os=require('os'),path=require('path');
const T=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390);
(async()=>{const b=await chromium.launch();const {ctx,p}=await R.open(b,W,W<600?844:800);await R.inject(p,T);await p.evaluate(()=>{window.PN_STILL=false});
 await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{const c=getComputedStyle(e);if(c.position==='fixed'||c.position==='sticky')e.style.setProperty('visibility','hidden','important')});document.querySelector('.s3-root').scrollIntoView({block:'start'});scrollBy(0,-8)});
 await p.waitForTimeout(600);const dir=fs.mkdtempSync(path.join(os.tmpdir(),'s3rec'));
 const cdp=await ctx.newCDPSession(p);const frames=[];cdp.on('Page.screencastFrame',async f=>{frames.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,everyNthFrame:1});
 /* a click like a visitor's: on the control itself */
 const click=async w=>{const h=await p.$(`.s3-root [data-win="${w}"]:not(.s3-knob)`)||await p.$(`.s3-root [data-win="${w}"]`);await h.click();await p.waitForTimeout(3000)};
 await p.waitForTimeout(800);await p.evaluate(()=>S3set('hit',true));await p.waitForTimeout(3600);
 for(const w of ['season','d7','d1'])await click(w);
 await p.evaluate(()=>{const k=document.querySelector('.s3-knob');(k||document.querySelector('.s3-root [data-win="hit"]')).click()});await p.waitForTimeout(3200);
 await cdp.send('Page.stopScreencast');
 const t0=frames[0].t,t1=frames[frames.length-1].t;let k=0;for(let t=t0,i=0;t<=t1;t+=1/30,k++){while(i+1<frames.length&&frames[i+1].t<=t)i++;fs.writeFileSync(`${dir}/f${String(k).padStart(5,'0')}.jpg`,Buffer.from(frames[i].d,'base64'))}
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-framerate','30','-i',`${dir}/f%05d.jpg`,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-movflags','+faststart',OUT]);
 console.log(OUT,k,'frames');fs.rmSync(dir,{recursive:true});await b.close()})();
