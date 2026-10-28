/* r1045: five frames for the explainer film in the EZ. logo's style (owner, 2026-10-28: the frame "in the style of the logo", the
   thumbnail is the ticket, the Season 1 ticket under it; "Earnings Zeason presents", not "$EZ presents"; keep "How it works").
   Lays r1045-frame/_base.css + <id>.css and _base.js + <id>.js over the real X2+ page (local server on 8897). § in the CSS is the frame's
   selector. usage: node r1045-frame.js [now,A,B,C,D,E] [320,390,1280]  -> scratchpad/r1045/<id>-<w>.png (+ -frame crops) and a
   measurement line per shot (sideways scroll, anything outside the viewport or clipped, the picture's coverage by the magenta test,
   the play disc's centre as % of the film's height, the gap to the strip). */
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const D=path.join(__dirname,'r1045-frame')+'/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1045/';fs.mkdirSync(S,{recursive:true});
const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';const SEL='html.x2p.x2d.x2pbt.x2pbill[data-theme] body .x2p-vt.f45';
const IDS=(process.argv[2]||'now,A,B,C,D,E').split(','),WS=(process.argv[3]||'320,390,1280').split(',').map(Number);
(async()=>{const b=await chromium.launch();const out={};
 for(const id of IDS)for(const W of WS){
  const ctx=await b.newContext({viewport:{width:W,height:W>700?900:844},deviceScaleFactor:W>700?2:3,isMobile:W<700,hasTouch:W<700});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.waitForTimeout(2500);
  if(id!=='now'){const css=(rd(D+'_base.css')+rd(D+id+'.css')).split('§').join(SEL),js=rd(D+'_base.js')+'\n'+rd(D+id+'.js');
   await p.evaluate(([css,js])=>{const st=document.createElement('style');st.id='f45css';st.textContent=css;document.head.appendChild(st);(0,eval)(js)},[css,js])}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
  const m=await p.evaluate(()=>{const vt=document.querySelector('.x2p-vt'),f=vt.querySelector('.vt-f'),fr=f.getBoundingClientRect(),W=innerWidth,o={sw:document.documentElement.scrollWidth,bad:[]};
    let L=1e9,T=1e9,R=-1e9,B=-1e9;for(const e of [vt,...vt.querySelectorAll('*')]){const r=e.getBoundingClientRect(),cs=getComputedStyle(e);if(!r.width||!r.height||cs.display==='none'||cs.visibility==='hidden'||e.closest('h2.vt-tag'))continue;
      if(r.right>W+.5||r.left<-.5)o.bad.push('out '+(e.className.baseVal??e.className));
      if(e.closest('.f45-hd,.f45-ft')&&e.scrollWidth>e.clientWidth+1&&e.clientWidth>0&&!(e instanceof SVGElement))o.bad.push('clip '+e.className);
      L=Math.min(L,r.left);T=Math.min(T,r.top);R=Math.max(R,r.right);B=Math.max(B,r.bottom)}
    /* text that runs past its box (the head and foot words) */
    vt.querySelectorAll('.f45-ti,.f45-kk,.f45-tm,.f45-tx').forEach(e=>{const r=e.getBoundingClientRect(),q=e.parentElement.getBoundingClientRect();if(r.right>q.right+.5)o.bad.push('runs past its box '+e.className)});
    const pl=vt.querySelector('.vt-play').getBoundingClientRect(),sn=vt.querySelector('.vt-snd').getBoundingClientRect(),ls=document.querySelector('.x2p-ls').getBoundingClientRect();
    Object.assign(o,{film:[fr.left,fr.top,fr.width,fr.height].map(x=>+x.toFixed(1)),frame:[L,T,R-L,B-T].map(x=>+x.toFixed(1)),gutters:[+L.toFixed(1),+(W-R).toFixed(1)],
      play:+(((pl.top+pl.height/2)-fr.top)/fr.height*100).toFixed(1),sndIn:sn.right<=fr.right+.5&&sn.top>=fr.top-.5,stripTop:+ls.top.toFixed(1),gapToStrip:+(ls.top-B).toFixed(1),stripBottom:+ls.bottom.toFixed(1)});
    /* the play button still answers a tap at its centre */
    const pc=document.elementFromPoint(pl.left+pl.width/2,pl.top+pl.height/2);o.playHit=!!(pc&&pc.closest('.vt-play'));return o});
  await p.screenshot({path:S+id+'-'+W+'.png'});
  const c=m.frame,pad=W<700?12:24;const ls=m.stripBottom;
  await p.screenshot({path:S+id+'-'+W+'-frame.png',clip:{x:0,y:Math.max(0,c[1]-pad),width:W,height:Math.min((W>700?900:844)-Math.max(0,c[1]-pad),c[3]+2*pad)}});
  /* the honest coverage count: paint the film's box magenta, hide its own controls, count what is no longer magenta */
  await p.evaluate(()=>{const s=document.createElement('style');s.id='f45m';s.textContent='.x2p-vt video{visibility:hidden!important}.x2p-vt .vt-f{background:#ff00ff!important;filter:none!important}.x2p-vt .vt-play,.x2p-vt .vt-snd,.x2p-vt .vt-tap,.x2p-vt .vt-bar{visibility:hidden!important}';document.head.appendChild(s)});
  await p.waitForTimeout(150);const fb=m.film,x0=Math.ceil(fb[0]),y0=Math.ceil(fb[1]);const shot=await p.screenshot({clip:{x:x0,y:y0,width:Math.floor(fb[0]+fb[2])-x0,height:Math.floor(fb[1]+fb[3])-y0},scale:'css'}); /* whole pixels inside the film, so a fractional edge does not count */
  m.covered=await p.evaluate(async b64=>{const img=new Image();img.src='data:image/png;base64,'+b64;await img.decode();const c=document.createElement('canvas');c.width=img.width;c.height=img.height;const x=c.getContext('2d');x.drawImage(img,0,0);
    const d=x.getImageData(0,0,c.width,c.height).data;let off=0,n=c.width*c.height;for(let i=0;i<n;i++){const R=d[i*4],G=d[i*4+1],B=d[i*4+2];if(!(R>200&&G<70&&B>200))off++}return +(off/n*100).toFixed(2)},shot.toString('base64'));
  m.errors=errs;out[id+'-'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(S+'measure.json',JSON.stringify(out,null,1));await b.close()})();
