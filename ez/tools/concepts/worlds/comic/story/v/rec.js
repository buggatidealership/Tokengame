// node rec.js <out.mp4> <take> [W=390]: records the take being stepped through at a reading pace (CDP screencast, real timing),
// with a small ring where each tap lands. Taps: Next, Next, a tap on the picture, Next, Next, then Back and Next again.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const OUT=process.argv[2],T=process.argv[3],W=+(process.argv[4]||390),H=W<600?844:900;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const TMP=fs.mkdtempSync('/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/vv/rec-');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8914/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.querySelector('#wc-book .wc-lr .wc11d-pg'),null,{timeout:30000});
 await p.addStyleTag({content:rd('_v.css')+rd(T+'.css')+'.x2p-cw{display:none!important}#vvtap{position:fixed;z-index:99999;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:4px solid #fdbc2a;box-shadow:0 0 0 3px #15121a;pointer-events:none;opacity:0}'});
 await p.addScriptTag({content:rd('_v.js')+rd(T+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('vv-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const h=document.querySelector('header.top'),s=document.querySelector('#wc-book .wc-lr');window.__y=s.getBoundingClientRect().top+scrollY-(h?h.getBoundingClientRect().height:0)-6;scrollTo(0,window.__y-innerHeight*.75);
   const t=document.createElement('i');t.id='vvtap';document.body.appendChild(t);
   window.__tap=(x,y)=>{t.style.left=x+'px';t.style.top=y+'px';t.animate([{opacity:1,transform:'scale(.6)'},{opacity:0,transform:'scale(1.4)'}],{duration:520,easing:'ease-out'})}});
 await p.evaluate(()=>{const v=document.querySelector('.vv-root video');if(v)v.load()});await p.waitForTimeout(4000);
 const tap=async sel=>{const r=await p.evaluate(s=>{const e=document.querySelector(s);const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+Math.min(q.height/2,q.height-20)}},sel);await p.evaluate(r=>window.__tap(r.x,r.y),r);await p.mouse.click(r.x,r.y)};
 const cdp=await ctx.newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async e=>{const n=fr.length;fs.writeFileSync(`${TMP}/f${String(n).padStart(5,'0')}.jpg`,Buffer.from(e.data,'base64'));fr.push(e.metadata.timestamp);try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:86,everyNthFrame:1});
 await p.waitForTimeout(500);await p.evaluate(()=>{const y0=scrollY,d=window.__y-y0,t0=performance.now();const f=t=>{const k=Math.min(1,(t-t0)/700);scrollTo(0,y0+d*(1-Math.pow(1-k,3)));if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
 const pic={v1:'.vv1-tk.vv1-top .vv1-pic',v2:'.vv2-panel',v3:'.vv3-open .vv3-pic'}[T];
 const steps=[[3600,'.vv-nx'],[5600,'.vv-nx'],[4800,pic],[3800,'.vv-nx'],[3600,'.vv-bk'],[2200,'.vv-nx'],[3200,null]];
 for(const [ms,sel] of steps){await p.waitForTimeout(ms);if(sel)await tap(sel)}
 await cdp.send('Page.stopScreencast');await ctx.close();await b.close();
 const t0=fr[0],end=fr[fr.length-1]+.4;let txt='';fr.forEach((t,n)=>{const nx=n+1<fr.length?fr[n+1]:end;txt+=`file '${TMP}/f${String(n).padStart(5,'0')}.jpg'\nduration ${Math.max(.001,nx-t).toFixed(4)}\n`});
 txt+=`file '${TMP}/f${String(fr.length-1).padStart(5,'0')}.jpg'\n`;fs.writeFileSync(`${TMP}/c.txt`,txt);
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/c.txt -vf "fps=30,scale=${W<600?780:1280}:-2" -c:v libx264 -pix_fmt yuv420p -crf 22 -movflags +faststart ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fr.length,'frames',er.join('|')||'no errors')})();
