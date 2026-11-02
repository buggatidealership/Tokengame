// node video.js <framesdir> [W] [dpr] : a phone scroll through the director's cut, frames from the browser's own screencast with their real
// timestamps (frames.txt: an ffmpeg concat list). Scroll: eased, about 26 s, a short hold at the top of every beat (gutter under the header).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {load}=require('./_load.js');const fs=require('fs'),path=require('path');
(async()=>{const OUT=process.argv[2],W=+(process.argv[3]||390),DPR=+(process.argv[4]||2),VH=844;fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:DPR});
 const p=await ctx.newPage();await FONTS(p);await load(p,{});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2500);
 const hdr=await p.evaluate(()=>Math.round(document.querySelector('header').getBoundingClientRect().height));
 const stops=await p.evaluate(h=>[...document.querySelectorAll('.h29-gutter')].filter(g=>g.getBoundingClientRect().height&&getComputedStyle(g).display!=='none').map(g=>Math.round(g.getBoundingClientRect().top+scrollY)-h-6),hdr);
 const cdp=await ctx.newCDPSession(p);const frames=[];let n=0;
 cdp.on('Page.screencastFrame',async f=>{const fn=path.join(OUT,`f${String(n++).padStart(5,'0')}.jpg`);fs.writeFileSync(fn,Buffer.from(f.data,'base64'));frames.push({fn,t:f.metadata.timestamp});cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{})});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:82,maxWidth:W*DPR,maxHeight:VH*DPR,everyNthFrame:1});
 /* hold on the first screen, then glide from beat to beat */
 const plan=[...stops.filter(s=>s>50),H-VH];
 await p.evaluate(async plan=>{const ease=t=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;const wait=ms=>new Promise(r=>setTimeout(r,ms));
  await wait(2600);let y0=0;
  for(const y1 of plan){const d=Math.abs(y1-y0),T=Math.min(2600,Math.max(900,d*1.6));const t0=performance.now();
   await new Promise(res=>{const st=()=>{const t=Math.min(1,(performance.now()-t0)/T);scrollTo(0,y0+(y1-y0)*ease(t));if(t<1)requestAnimationFrame(st);else res()};requestAnimationFrame(st)});
   y0=y1;await wait(1500)}
  await wait(1200)},plan);
 await cdp.send('Page.stopScreencast');await p.waitForTimeout(300);
 const L=[];for(let i=0;i<frames.length;i++){const d=i+1<frames.length?frames[i+1].t-frames[i].t:0.04;L.push(`file '${frames[i].fn}'`,`duration ${Math.max(0.001,d).toFixed(4)}`)}L.push(`file '${frames[frames.length-1].fn}'`);
 fs.writeFileSync(path.join(OUT,'frames.txt'),L.join('\n'));console.log('frames',frames.length,'span',(frames[frames.length-1].t-frames[0].t).toFixed(1),'s');await b.close()})();
