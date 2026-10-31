// Round 34 mockups: the Bullseye stack's cue and deal. Injects tools/concepts/launch-r34-stack/_common.* and <id>.* into the real X2+
// page (local server on 8897) and either records it or checks it.
// usage: node launch-r34-stack.js rec <o1..o4|all> [outdir]   -> ez/x2p-launch-r34-stack-<n>.mp4, key frames <outdir>/<id>-k<i>.jpg, <id>.json
//        node launch-r34-stack.js check <o1..o4|all>          -> sizes, timings, order, films, layout shift at 320, 390 and 1280px
// The recording is the browser's own screencast (device pixels at 2x), each frame kept for as long as the browser showed it.
const fs=require('fs'),path=require('path'),cp=require('child_process');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const DIR=path.join(__dirname,'launch-r34-stack'),EZ=path.resolve(__dirname,'../..');
const mode=process.argv[2]||'rec',which=process.argv[3]||'all',OUT=process.argv[4]||S+'r34/out/';
const ids=which==='all'?['o1','o2','o3','o4']:which.split(',');
const URL='http://127.0.0.1:8897/v46-live-x2plus.html';
const rd=f=>fs.readFileSync(path.join(DIR,f),'utf8');
const FF=cp.execSync('python3 -c "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"').toString().trim();
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function open(b,id,W,opts){const mob=W<700;const ctx=await b.newContext(Object.assign(mob?{viewport:{width:W,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true}:{viewport:{width:W,height:900},deviceScaleFactor:1},opts||{}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,200)));
  await p.goto(URL,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r34';s.textContent=css;document.head.appendChild(s);js.forEach(j=>(new Function(j))())},{css:rd('_common.css')+'\n'+rd(id+'.css'),js:[rd('_common.js'),rd(id+'.js')]});
  await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto'});return {ctx,p,errs}}
// where the highlights sit in the middle of the screen
const target=p=>p.evaluate(()=>{const t=document.querySelector('#x2pHl .x2p-hlt'),r=t.getBoundingClientRect();return Math.round(r.top+scrollY+r.height/2-innerHeight*.56)});
const centre=(p,sel)=>p.evaluate(sel=>{let e;if(sel==='card:next')e=R34.order()[1];else if(sel==='card:first')e=R34.dom[0];else e=sel;const r=(typeof e==='string'?document.querySelector(e):e).getBoundingClientRect();
  const x0=Math.max(r.left,4),x1=Math.min(r.right,innerWidth-4);return {x:(x0+x1)/2,y:r.top+r.height/2}},sel);
async function tapSeq(p,mob,list){for(const it of list){const c=typeof it==='string'?await centre(p,it):await p.evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}},it);
  if(mob)await p.touchscreen.tap(c.x,c.y);else await p.mouse.click(c.x,c.y);if(list.length>1)await sleep(900)}}
const handles=async(p,fn)=>{const h=await p.evaluateHandle(fn);const props=await h.getProperties();const out=[];for(const v of props.values()){const e=v.asElement();out.push(e?e:await v.jsonValue())}return out};
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--autoplay-policy=no-user-gesture-required','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
fs.mkdirSync(OUT,{recursive:true});
if(mode==='rec')for(const id of ids){const {ctx,p,errs}=await open(b,id,390);const tgt=await target(p);await p.evaluate(y=>scrollTo(0,y),tgt-460);await sleep(500);
  const cdp=await ctx.newCDPSession(p);const frames=[];const marks={};const mark=k=>{marks[k]=Date.now()/1000};
  cdp.on('Page.screencastFrame',f=>{frames.push({ts:f.metadata.timestamp,d:f.data});cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{})});
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,everyNthFrame:1,maxWidth:780,maxHeight:1688});mark('start');await sleep(300);
  // the section scrolling in (a hand's scroll, eased), landing on Tightest race as the page does
  await p.evaluate(y=>new Promise(res=>{const y0=scrollY,t0=performance.now(),d=900;(function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);scrollTo(0,y0+(y-y0)*e);k<1?requestAnimationFrame(f):res()})(t0)}),tgt);
  mark('arrive');await sleep(1300);
  // to the stack: a tap on its visible part (the carousel brings it to the middle)
  const vis=await p.evaluate(()=>{const r=R34.bw.getBoundingClientRect();const x0=Math.max(r.left,6),x1=Math.min(r.right,innerWidth-6);return {x:(x0+x1)/2,y:r.top+r.height*.6}});
  mark('tap');await p.touchscreen.tap(vis.x,vis.y);await sleep(id==='o3'?4300:2900);
  const next=await handles(p,()=>R34.next());mark('deal1');await tapSeq(p,true,next);await sleep(1500);
  const next2=await handles(p,()=>R34.next());mark('deal2');await tapSeq(p,true,next2);await sleep(1500);
  const back=await handles(p,()=>R34.toFirst());mark('deal3');await tapSeq(p,true,back);await sleep(1500);
  const tc=await p.evaluate(()=>{const r=R34.top().getBoundingClientRect();return {x:r.left+r.width*.45,y:r.top+r.height*.55}});mark('flip');await p.touchscreen.tap(tc.x,tc.y);await sleep(1800);mark('end');
  await cdp.send('Page.stopScreencast');
  const box=await p.evaluate(()=>{const r=document.getElementById('x2pHl').getBoundingClientRect();return {top:r.top,bottom:r.bottom}});
  const st=await p.evaluate(()=>({log:R34.log,cue:R34.cue,num:R34.num()}));
  // frames -> concat list (each frame shown until the next one) -> mp4
  const fd=S+'r34/sc-'+id+'/';fs.rmSync(fd,{recursive:true,force:true});fs.mkdirSync(fd,{recursive:true});
  frames.forEach((f,i)=>fs.writeFileSync(fd+'f'+String(i).padStart(5,'0')+'.jpg',Buffer.from(f.d,'base64')));
  fs.writeFileSync(fd+'list.txt',frames.map((f,i)=>`file 'f${String(i).padStart(5,'0')}.jpg'\nduration ${Math.max(.001,((frames[i+1]?frames[i+1].ts:f.ts+.04)-f.ts)).toFixed(4)}`).join('\n')+`\nfile 'f${String(frames.length-1).padStart(5,'0')}.jpg'\n`);
  const n=id.slice(1),mp4=path.join(EZ,`x2p-launch-r34-stack-${n}.mp4`);
  cp.execFileSync(FF,['-y','-loglevel','error','-f','concat','-safe','0','-i',fd+'list.txt','-vf','fps=30,scale=540:-2:flags=lanczos,format=yuv420p','-c:v','libx264','-preset','slow','-crf','27','-movflags','+faststart',mp4]);
  // key frames for the board: the cue, the middle of the first deal, after it; each the frame on screen at that moment
  const at=t=>{let k=0;frames.forEach((f,i)=>{if(f.ts<=t)k=i});return k};
  const K={o1:[['tap',1.35],['deal1',.30],['deal1',1.1]],o2:[['tap',1.7],['deal1',.32],['deal1',1.3]],o3:[['tap',1.9],['deal1',.26],['deal1',1.05]],o4:[['tap',.95],['deal1',.75],['deal2',1.6]]}[id];
  const keys=K.map(([m,dt],i)=>{const k=at(marks[m]+dt);fs.copyFileSync(fd+'f'+String(k).padStart(5,'0')+'.jpg',OUT+id+'-k'+i+'.jpg');return {m,dt,frame:k}});
  const span=frames[frames.length-1].ts-frames[0].ts;
  const info={id,frames:frames.length,span:+span.toFixed(2),fps:+(frames.length/span).toFixed(1),bytes:fs.statSync(mp4).size,box,marks:Object.fromEntries(Object.entries(marks).map(([k,v])=>[k,+(v-marks.start).toFixed(2)])),keys,state:st,errs};
  fs.writeFileSync(OUT+id+'.json',JSON.stringify(info,null,1));console.log(JSON.stringify(info));await ctx.close()}
if(mode==='check')for(const id of ids)for(const W of [320,390,1280]){const {ctx,p,errs}=await open(b,id,W);const mob=W<700;const tgt=await target(p);await p.evaluate(y=>scrollTo(0,y),tgt);await sleep(700);
  await p.evaluate(()=>window.__x2pHlGo&&window.__x2pHlGo(0));await sleep(id==='o3'?4200:2600);
  const pre=await p.evaluate(()=>{const r=R34.bw.getBoundingClientRect(),s=document.getElementById('highlights').getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height,sh:s.height}});
  const seq=[];for(const k of ['next','next','toFirst']){const list=await handles(p,k==='next'?()=>R34.next():()=>R34.toFirst());await tapSeq(p,mob,list);await sleep(1100);seq.push(await p.evaluate(()=>R34.num()))}
  const post=await p.evaluate(()=>{const r=R34.bw.getBoundingClientRect(),s=document.getElementById('highlights').getBoundingClientRect(),rc=document.querySelector('#car .card').getBoundingClientRect(),tc=R34.top().getBoundingClientRect();
    const vids=R34.dom.map(c=>{const v=c.querySelector('video');return v?(c===R34.top()?(v.paused?'top-paused':'top-playing'):(v.paused?'paused':'PLAYING')):'none'});
    return {x:r.left,y:r.top,w:r.width,h:r.height,sh:s.height,card:[+tc.width.toFixed(3),+tc.height.toFixed(3)],rec:[+rc.width.toFixed(3),+rc.height.toFixed(3)],vids,log:R34.log,cue:R34.cue,hs:document.documentElement.scrollWidth>innerWidth+1}});
  const shift=Math.max(Math.abs(post.x-pre.x),Math.abs(post.y-pre.y),Math.abs(post.w-pre.w),Math.abs(post.h-pre.h),Math.abs(post.sh-pre.sh));
  console.log(id,W,'nums',seq.join(' '),'cue',post.cue,'deal ms (cards/with shine)',post.log.map(l=>l.cards+'/'+l.ms).join(','),'card',post.card.join('x'),'rec',post.rec.join('x'),'films',post.vids.join(' '),'shift',shift.toFixed(2),'hscroll',post.hs,'errors',errs.length?errs:'none');await ctx.close()}
await b.close()})();
