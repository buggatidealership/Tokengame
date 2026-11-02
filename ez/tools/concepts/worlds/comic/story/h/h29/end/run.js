// H29 end · node run.js <outdir> <now|h29> [widths 320,390,1280] [dpr 1]     env PORT (8977): ez/ served (cd ez && python3 -m http.server 8977)
// Lays the files of load.json (sol7/sol8/sol9 A4 kit, h29/_gutter.css, end.css, end.js) over the built v46-live-x2plus.html ("h29"), or not
// ("now"), and shoots the end of the Overview, from the gutter above Smart or lucky to the bottom of the page, as <id>-<W>.png.
// Prints and saves (measure-<id>.json): errors, sideways scroll, elements of this part past the screen edge, text boxes that overflow,
// the smallest font size in this part, and per phone screen of this part (window height minus the sticky header): visible words,
// typefaces used and movers (running animations, playing videos, the ticking countdown). ALL=1 also loads top/top.css+top.js if present.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const OUT=process.argv[2],ID=process.argv[3]||'h29',WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||1),PORT=process.env.PORT||8977;
fs.mkdirSync(OUT,{recursive:true});const L=JSON.parse(fs.readFileSync(path.join(__dirname,'load.json'),'utf8'));
const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS){const VH=W<760?844:900;
  const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:DPR});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  p.on('response',r=>{if(r.status()>=400&&/media|h29|sol/.test(r.url()))er.push(r.status()+' '+r.url().slice(-70))});
  await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>window.P5&&P5.cur&&document.querySelector('#x2pSt.hb-on'),null,{timeout:90000});await p.waitForTimeout(500);
  if(ID!=='now'){let css=L.css.map(rd).join('\n');const g=rd('../_gutter.css');css=(g||rd(L.gutterPlaceholder))+'\n'+css;
   if(process.env.ALL)css=rd('../top/top.css')+'\n'+css;
   await p.addStyleTag({content:css});await p.addScriptTag({content:(process.env.ALL?rd('../top/top.js')+'\n;':'')+L.js.map(rd).join('\n;')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('h29e-ready')||window.__h29eErr,null,{timeout:60000})}
  /* load what is lazy, settle */
  const ph=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<ph;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(90)}
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1800);
  const m=await p.evaluate(({ID})=>{const D=document,cv=D.createElement('canvas').getContext('2d');
    const part=['#learn','#x2pSt','#h29eFollow','#get','footer'].map(s=>D.querySelector(s)).filter(e=>e&&e.getBoundingClientRect().height>2);
    const L0=D.querySelector('#learn'),pv=L0.previousElementSibling,g0=pv&&/gut/.test(pv.className)?pv:L0;const y0=Math.round(g0.getBoundingClientRect().top+scrollY);
    const hdr=D.querySelector('header');const hh=hdr&&getComputedStyle(hdr).position.match(/sticky|fixed/)?Math.round(hdr.getBoundingClientRect().height):0;
    const vis=e=>{for(let a=e;a&&a!==D.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return false;if(a.classList&&(a.classList.contains('p5-sr')||a.classList.contains('hb-sr')))return false}return true};
    const inPart=e=>part.some(s=>s.contains(e));
    /* every visible text run in the part: [text, family, px, rect] */
    const runs=[];const tw=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){const t=n.textContent.trim();if(!t)continue;const e=n.parentElement;if(!e||!inPart(e)||!vis(e)||e.closest('style,script,title,table.p5-sr'))continue;
      const rg=D.createRange();rg.selectNodeContents(n);const R=rg.getBoundingClientRect();if(R.width<2||R.height<2)continue;
      const svg=e.closest('svg');let px=parseFloat(getComputedStyle(e).fontSize);if(svg&&e.getScreenCTM){const mm=e.getScreenCTM();px*=Math.hypot(mm.a,mm.b)}
      const ff=(svg?(e.getAttribute('font-family')||e.closest('text')?.getAttribute('font-family')||getComputedStyle(e).fontFamily):getComputedStyle(e).fontFamily).split(',')[0].replace(/["']/g,'').trim();
      runs.push({t,ff,px:+px.toFixed(1),y:R.top+scrollY,b:R.bottom+scrollY,l:R.left,r:R.right})}
    const scr=innerHeight-hh,yEnd=D.documentElement.scrollHeight;const screens=[];
    const anims=D.getAnimations().filter(a=>a.playState==='running'&&a.effect&&a.effect.target&&inPart(a.effect.target)&&(a.effect.getTiming().iterations===Infinity));
    for(let y=y0,i=1;y<yEnd-40;y+=scr,i++){const ry=r=>r.y<y+scr&&r.b>y;const rr=runs.filter(ry);
      const tok=rr.reduce((s,r)=>s+r.t.split(/\s+/).filter(w=>/[A-Za-z0-9$%]/.test(w)).length,0),words=rr.reduce((s,r)=>s+r.t.split(/\s+/).filter(w=>/[A-Za-z]{2,}/.test(w)).length,0);
      const faces=[...new Set(rr.map(r=>r.ff))];
      const mv=new Set();anims.forEach(a=>{const R=a.effect.target.getBoundingClientRect(),t=R.top+scrollY;if(t<y+scr&&t+R.height>y&&R.width>0)mv.add((a.effect.target.className&&a.effect.target.className.baseVal!=null?a.effect.target.className.baseVal:a.effect.target.className)+'|'+(a.animationName||'anim'))});
      D.querySelectorAll('video').forEach(v=>{const R=v.getBoundingClientRect(),t=R.top+scrollY;if(!v.paused&&t<y+scr&&t+R.height>y)mv.add('video')});
      const cd=D.querySelector('.hbc-art');if(cd){const R=cd.getBoundingClientRect(),t=R.top+scrollY;if(t<y+scr&&t+R.height>y&&!matchMedia('(prefers-reduced-motion: reduce)').matches)mv.add('countdown (ticks each second)')}
      screens.push({screen:i,from:y,words,tokens:tok,faces,movers:[...mv]})}
    const minRun=runs.reduce((a,r)=>r.px<a.px?r:a,{px:99});
    const out=[];part.forEach(s=>s.querySelectorAll('*').forEach(e=>{const R=e.getBoundingClientRect();if(R.width&&vis(e)&&(R.right>innerWidth+.5||R.left<-.5)&&!e.closest('.h29-gutter,.h29e-bd,.p5-bleed svg,.hb-gr'))out.push((e.className&&e.className.baseVal!=null?e.className.baseVal:e.className||e.tagName)+' '+Math.round(R.left)+'..'+Math.round(R.right))}));
    const over=[];part.forEach(s=>s.querySelectorAll('*').forEach(e=>{if(e.closest('svg'))return;const c=getComputedStyle(e);if(vis(e)&&c.overflow!=='visible'&&e.scrollWidth>e.clientWidth+1&&e.clientWidth>0&&[...e.childNodes].some(x=>x.nodeType===3&&x.textContent.trim()))over.push(e.className+': '+e.textContent.trim().slice(0,24))}));
    return {sw:D.documentElement.scrollWidth,vw:innerWidth,startY:y0,header:hh,minFont:{px:minRun.px,t:(minRun.t||'').slice(0,30),ff:minRun.ff},
      past:out.slice(0,12),over:over.slice(0,12),screens,next:window.H29_NEXT?(()=>{const x=H29_NEXT();return x&&{label:x.label,rs:x.rs.map(r=>r.co+' ('+r.ticker+')')}})():null}},{ID});
  /* the shot: fixed and sticky things hidden */
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.setProperty('visibility','hidden','important')})});
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);
  await p.screenshot({path:`${OUT}/${ID}-${W}.png`,clip:{x:0,y:m.startY-8,width:W,height:H-m.startY+8},fullPage:true});
  m.errors=er;res[W]=m;console.log(ID,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(`${OUT}/measure-${ID}.json`,JSON.stringify(res,null,1));await b.close()})();
