// node vcard.js <round> <out.mp4> : the round's film playing inside its own slab, the numbers beside it, 1080x1080 for X (owner, 2026-10-28:
// "unless there's a way to integrate an animation into that picture"). Shoots the real slab from the built page with the film hidden (its
// poster shows), finds the film's window, composes the frame, then ffmpeg lays the film into the window.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../live-r1/_fonts.js');const fs=require('fs'),path=require('path'),{execFileSync}=require('child_process');
const N=+process.argv[2],OUT=path.resolve(process.argv[3]),TMP=path.join(path.dirname(OUT),'vc-'+N);fs.mkdirSync(TMP,{recursive:true});
const EZ=path.resolve(__dirname,'..','..','..');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:3});await FONTS(p);
 await p.goto('http://localhost:8897/v46-live-x2plus.html#/round/'+N,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(3500);
 const info=await p.evaluate(n=>{document.querySelectorAll('#x2pRm video').forEach(v=>{v.pause();v.style.visibility='hidden'});document.querySelectorAll('#x2pRm .snd').forEach(e=>e.style.visibility='hidden');document.querySelectorAll('#x2pRm .card .face.front button, #x2pRm .card .face.front .flip').forEach(e=>e.style.visibility='hidden');
  const c=document.querySelector('#x2pRm .card').getBoundingClientRect(),v=document.querySelector('#x2pRm video').getBoundingClientRect();const vs=getComputedStyle(document.querySelector('#x2pRm video'));
  const P=window.__x2pPnl(),u=ROUNDS.find(u=>u.n==n);const pn=u.calls.filter(c=>c[1]).map(c=>[c[0],P.A[c[0]].per[n].v]).sort((a,b)=>b[1]-a[1]);
  const sea={};['GROK','CLAUDE','GPT','KIMI'].forEach(m=>{let s=0;for(const [k,x] of Object.entries(P.A[m].per))if(+k<=n)s+=x.v;sea[m]=s});
  return {c:{x:c.left,y:c.top,w:c.width,h:c.height},v:{x:v.left-c.left,y:v.top-c.top,w:v.width,h:v.height},op:vs.objectPosition,u:{n:u.n,co:u.co,a:u.a,win:u.win,calls:u.calls},pn,sea,film:FILMS[n]&&FILMS[n].f}},N);
 const pad=0;const card=await p.screenshot({clip:{x:info.c.x-pad,y:info.c.y-pad,width:info.c.w+2*pad,height:info.c.h+2*pad}});fs.writeFileSync(path.join(TMP,'card.png'),card);
 // the frame: card left at 1000px tall, numbers right
 const H=1000,s=H/(info.c.h+2*pad),cw=Math.round((info.c.w+2*pad)*s),cx=40,cy=40;
 const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};const money=v=>(v<0?'−$':'+$')+Math.abs(Math.round(v)).toLocaleString('en-US');
 const u=info.u,mv=(u.a<0?'−':'+')+Math.abs(u.a).toFixed(2)+'%',w=String(u.win).split(/\s*&\s*/).filter(Boolean);
 const wc=u.calls.find(c=>c[0]===w[0]);const ord=Object.entries(info.sea).sort((a,b)=>b[1]-a[1]);
 const html=`<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Kanit:ital,wght@1,900&family=Saira+Condensed:wght@600;700&family=Barlow+Condensed:wght@800&display=swap">
<style>*{box-sizing:border-box;margin:0}body{width:1080px;height:1080px;background:#0b0a14;position:relative;overflow:hidden;color:#f3ead6}
body::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 25% 50%,rgba(255,255,255,.035) 0 2deg,transparent 2deg 9deg)}
body::after{content:"";position:absolute;left:0;right:0;bottom:0;height:16px;background:linear-gradient(90deg,#03c870 0 50%,#ff3a31 50%)}
.cd{position:absolute;left:${cx}px;top:${cy}px;height:${H}px;filter:drop-shadow(0 20px 34px rgba(0,0,0,.65))}
.tx{position:absolute;left:${cx+cw+34}px;right:40px;top:70px;bottom:60px;display:flex;flex-direction:column;gap:12px}
.br{display:flex;align-items:center;gap:10px;font:800 21px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase}.br img{width:46px;height:46px}.e{color:#03c870}.z{color:#ff3a31}
.eb{font:700 19px/1.15 "Saira Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f2b632;margin-top:22px}
.co{font:900 italic 46px/1 Kanit,sans-serif;text-transform:uppercase;text-shadow:-.065em .03em 0 #03c870;white-space:nowrap}
.mv{font:400 84px/1 Anton,sans-serif}.u{color:#2fd27f}.d{color:#ff5a4f}
.ln{font:600 26px/1.2 "Saira Condensed",sans-serif}.ln b{color:#f2b632}
.k{font:700 16px/1 "Saira Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8d8798;margin-top:18px}
.tb{display:grid;grid-template-columns:1fr auto;gap:7px 10px;font:400 27px/1 Anton,sans-serif}.tb i{font-style:normal;color:#cfc6b3}
.ft{margin-top:auto;font:700 21px/1 "Saira Condensed",sans-serif;color:#8d8798;letter-spacing:.04em}</style>
<img class="cd" src="card.png"><div class="tx"><div class="br"><img src="${'file://'+path.join(EZ,'tools','site','ez-logo.svg')}"><span><span class="e">E</span>arnings <span class="z">Z</span>eason</span></div>
<div class="eb">Round ${u.n} · Graded at the close</div><div class="co">${u.co}</div><div class="mv ${u.a<0?'d':'u'}">${mv}</div>
<div class="ln"><b>${w.map(m=>NM[m]).join(' and ')}</b> called ${wc?wc[1].replace('UP ','+').replace('DOWN ','−'):''}. <b>${wc?(+wc[2]).toFixed(2).replace(/\.?0+$/,''):''}%</b> off.</div>
<div class="k">This round's P&amp;L</div><div class="tb">${info.pn.map(([m,v])=>`<i>${NM[m]}</i><span class="${v<0?'d':'u'}">${money(v)}</span>`).join('')}</div>
<div class="k">Season P&amp;L</div><div class="tb">${ord.map(([m,v],i)=>`<i>${i+1} ${NM[m]}</i><span class="${v<0?'d':'u'}">${money(v)}</span>`).join('')}</div>
<div class="ft">earningszn.xyz/r/${u.n}</div></div>`;
 fs.writeFileSync(path.join(TMP,'frame.html'),html);
 const f=await b.newPage({viewport:{width:1080,height:1080}});await FONTS(f);await f.goto('file://'+path.join(TMP,'frame.html'));await f.evaluate(()=>document.fonts.ready);await f.waitForTimeout(500);
 await f.evaluate(()=>{const e=document.querySelector('.co'),m=document.querySelector('.tx').clientWidth;let s=46;while(e.scrollWidth>m&&s>24){s-=2;e.style.fontSize=s+'px'}});
 await f.screenshot({path:path.join(TMP,'frame.png')});await b.close();
 // the film's window in the frame, and its crop (object-fit cover at the page's own object-position)
 const X=Math.round(cx+(info.v.x+pad)*s),Y=Math.round(cy+(info.v.y+pad)*s),W=Math.round(info.v.w*s),Hh=Math.round(info.v.h*s);
 const ox=parseFloat(info.op)||50;const src=path.join(EZ,'media',info.film+'.mp4');
 const sz=Math.max(W,Hh);const fx=`[1:v]scale=${sz}:${sz},crop=${W}:${Hh}:(in_w-${W})*${ox/100}:(in_h-${Hh})/2[f];[0:v][f]overlay=${X}:${Y}:shortest=1,format=yuv420p[v]`;
 execFileSync('ffmpeg',['-loglevel','error','-y','-loop','1','-i',path.join(TMP,'frame.png'),'-i',src,'-filter_complex',fx,'-map','[v]','-map','1:a?','-c:v','libx264','-preset','slow','-crf','20','-r','30','-c:a','aac','-b:a','128k','-movflags','+faststart','-shortest',OUT]);
 execFileSync('ffmpeg',['-loglevel','error','-y','-sseof','-0.5','-i',OUT,'-frames:v','1',OUT.replace(/\.mp4$/,'-last.png')]);
 console.log(OUT,JSON.stringify({X,Y,W,Hh,ox}))})().catch(e=>{console.error(e);process.exit(1)});
