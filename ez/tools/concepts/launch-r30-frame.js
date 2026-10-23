// Round 30 mockups: frames for the explainer film (owner, 2026-10-23: the film's frame "still looks a bit cheap compared to the rest of the site").
// Shoots the real X2+ page (local server on 8897) with one concept injected: tools/concepts/launch-r30-frame/<id>.css and, if present, <id>.js
// (a function body run in the page after load; it may add aria-hidden decoration around .x2p-vt and must keep the film's controls working).
// usage: node launch-r30-frame.js <id|now> [outdir]   ->  <id>-390.png (first screen), <id>-390-close.png, <id>-1280-close.png, <id>-1280.png, <id>.json
// <id>.json: the film's box, the frame's outer box, how much of the picture is covered by anything but the film's own controls, the play disc's centre.
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2]||'now',OUT=process.argv[3]||S+'frame/out/',DIR=path.join(__dirname,'launch-r30-frame');
const css=id==='now'?'':fs.readFileSync(path.join(DIR,id+'.css'),'utf8');
const js=fs.existsSync(path.join(DIR,id+'.js'))?fs.readFileSync(path.join(DIR,id+'.js'),'utf8'):'';
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
for(const W of [390,1280]){
 const ctx=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
 // the site's own card stock, the "As it stands" ticket's texture, as --r30-paper (a url(...) for background-image)
 await p.evaluate(()=>{const t=document.querySelector('#standings .x2p-ast .tk');const bi=t?getComputedStyle(t).backgroundImage:'';const m=bi.match(/url\("data:image\/svg\+xml[^"]*"\)/);
   if(m)document.documentElement.style.setProperty('--r30-paper',m[0])});
 await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r30';s.textContent=css;document.head.appendChild(s);if(js)(new Function(js))()},{css,js});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(200);
 const m=await p.evaluate(()=>{const vt=document.querySelector('.x2p-vt'),f=vt.querySelector('.vt-f'),v=vt.querySelector('video'),fr=v.getBoundingClientRect();
   // the frame's outer box: every visible piece of .x2p-vt and anything marked [data-r30-frame]
   let L=1e9,T=1e9,R=-1e9,B=-1e9;const parts=[vt,...vt.querySelectorAll('*'),...document.querySelectorAll('[data-r30-frame]')];
   for(const e of parts){const r=e.getBoundingClientRect(),cs=getComputedStyle(e);if(!r.width||!r.height||cs.visibility==='hidden'||cs.display==='none'||e.closest('.sr'))continue;L=Math.min(L,r.left);T=Math.min(T,r.top);R=Math.max(R,r.right);B=Math.max(B,r.bottom)}
   // picture coverage: a 48x27 grid over the film; a point is covered when the topmost element is not the video and not one of its controls
   const ok=e=>e===v||e===f||!!(e.closest&&e.closest('.vt-play,.vt-snd,.vt-tap'));let cov=0,n=0;const by={};
   for(let i=0;i<48;i++)for(let j=0;j<27;j++){const x=fr.left+(i+.5)*fr.width/48,y=fr.top+(j+.5)*fr.height/27;if(x<0||y<0||x>=innerWidth||y>=innerHeight)continue;n++;const e=document.elementFromPoint(x,y);if(e&&!ok(e)){cov++;const k=(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)||e.tagName;by[k]=(by[k]||0)+1}}
   const pl=vt.querySelector('.vt-play').getBoundingClientRect(),bt=document.querySelector('.x2p-bt,#gpu');const btr=bt?bt.getBoundingClientRect():null;
   return {film:[+fr.left.toFixed(1),+fr.top.toFixed(1),+fr.width.toFixed(1),+fr.height.toFixed(1)],frame:[+L.toFixed(1),+T.toFixed(1),+(R-L).toFixed(1),+(B-T).toFixed(1)],
     edgeGap:[+L.toFixed(1),+(innerWidth-R).toFixed(1)],hitTestCoveredBy:by,playCentrePct:+(((pl.top+pl.height/2)-fr.top)/fr.height*100).toFixed(1),
     betTicketTop:btr?+btr.top.toFixed(1):null,hscroll:document.documentElement.scrollWidth>innerWidth}});
 await p.screenshot({path:OUT+id+'-'+W+'.png'});
 const c=m.frame,pad=W<700?14:24;
 await p.screenshot({path:OUT+id+'-'+W+'-close.png',clip:{x:Math.max(0,c[0]-pad),y:Math.max(0,c[1]-pad),width:Math.min(W-Math.max(0,c[0]-pad),c[2]+2*pad),height:c[3]+2*pad}});
 // the honest coverage count: masks and pointer-events:none overlays escape a hit test, so paint the film's box magenta, hide its controls,
 // shoot the film's box and count what is no longer magenta (bands, scallops, a tag or curtain over the picture)
 await p.evaluate(()=>{const s=document.createElement('style');s.id='r30m';s.textContent='.x2p-vt video,.x2p-vt .vt-hold{visibility:hidden!important}.x2p-vt .vt-f{background:#ff00ff!important;filter:none!important}.x2p-vt .vt-play,.x2p-vt .vt-snd,.x2p-vt .vt-tap{visibility:hidden!important}';document.head.appendChild(s)});
 await p.waitForTimeout(150);
 const fb=m.film;const shot=await p.screenshot({clip:{x:fb[0],y:fb[1],width:fb[2],height:fb[3]}});
 m.coveredPx=await p.evaluate(async b64=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);
   const d=x.getImageData(0,0,c.width,c.height).data;let off=0,n=c.width*c.height,l=0,r=0,t=0,bo=0;const W=c.width,H=c.height;
   for(let i=0;i<n;i++){const R=d[i*4],G=d[i*4+1],B=d[i*4+2];if(!(R>200&&G<70&&B>200)){off++;const px=i%W,py=(i/W)|0;if(px<W*.1)l++;else if(px>W*.9)r++;if(py<H*.1)t++;else if(py>H*.9)bo++}}
   return {pct:+(off/n*100).toFixed(2),leftTenth:+(l/n*100).toFixed(2),rightTenth:+(r/n*100).toFixed(2),topTenth:+(t/n*100).toFixed(2),bottomTenth:+(bo/n*100).toFixed(2)}},shot.toString('base64'));
 await p.evaluate(()=>document.getElementById('r30m').remove());
 m.errors=errs;res[W]=m;
 await ctx.close()}
fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));console.log(id,JSON.stringify(res));
await b.close()})();
