// node screens.js <outdir> <W> [dpr] [variant: main|launch|rule]   env RM=1 reduced motion
// The director's cut screen by screen, as the visitor sees it (sticky header kept): one png per screen (window height minus the header per step)
// and screens.json with, per screen: words (header apart), typefaces, movers (running endless animations, playing videos, the ticking countdown),
// the focal point (the biggest-weighted candidate on screen, its box), and page checks (sideways scroll, overflow, smallest font, small taps, errors).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {load}=require('./_load.js');const fs=require('fs');
(async()=>{const [OUT,Wd,dpr,variant]=process.argv.slice(2);const W=+Wd,VH=W<760?844:800,V=variant||'main';fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:+(dpr||1),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&/h29|media|meet12|sol|tools/.test(r.url()))er.push(r.status()+' '+r.url().slice(-70))});
 const after=V==='launch'?()=>{window.__h29dLaunch=true}:V==='rule'?()=>{window.__h29dBet='rule'}:null;
 await load(p,{er,after});
 const ph=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<ph;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(70)}
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
 await p.evaluate(()=>window.__h29d&&__h29d.fit());await p.waitForTimeout(300);
 const chk=await p.evaluate(()=>{const D=document,vw=D.documentElement.clientWidth;
  const vis=e=>{for(let a=e;a&&a!==D.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05)return false;if(/inset\(50%/.test(c.clipPath)||(c.clip&&/rect\(0/.test(c.clip)))return false}return true};
  const past=[...D.querySelectorAll('main *,footer *,header *')].filter(e=>{if(e.closest('svg')&&e.tagName.toLowerCase()!=='svg')return false;const r=e.getBoundingClientRect();return r.width&&vis(e)&&(r.right>vw+.5||r.left<-.5)&&!e.closest('.h29-gutter,.h29e-bd,.p5-bleed,.hb-gr,.t4-pic,.r3-bd,.hb5-art')&&getComputedStyle(e).position!=='fixed'}).map(e=>String(e.className&&e.className.baseVal!=null?e.className.baseVal:e.className).slice(0,30)+' '+Math.round(e.getBoundingClientRect().left)+'..'+Math.round(e.getBoundingClientRect().right)).slice(0,10);
  const over=[...D.querySelectorAll('main *,footer *')].filter(e=>{if(e.closest('svg'))return false;const c=getComputedStyle(e);return vis(e)&&c.overflow!=='visible'&&e.scrollWidth>e.clientWidth+1&&e.clientWidth>0&&[...e.childNodes].some(x=>x.nodeType===3&&x.textContent.trim())}).map(e=>String(e.className).slice(0,30)+': '+e.textContent.trim().slice(0,24)).slice(0,10);
  const small=[];const tw=D.createTreeWalker(D.querySelector('main'),NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){const t=n.nodeValue.trim();if(!t)continue;const e=n.parentElement;if(!e||!vis(e)||e.closest('style,script,.sr,.p5-sr,.hb-sr,.ch-sr'))continue;const rg=D.createRange();rg.selectNodeContents(n);const R=rg.getBoundingClientRect();if(R.width<2)continue;let px=parseFloat(getComputedStyle(e).fontSize);if(e.closest('svg')&&e.getScreenCTM){const m=e.getScreenCTM();px*=Math.hypot(m.a,m.b)}if(px<11.95)small.push(t.slice(0,22)+'@'+px.toFixed(1))}
  const taps=[...D.querySelectorAll('main a,main button,footer a,header a,header button,.h29d-bar a,.h29d-bar button,[role=tab]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&vis(e)&&(r.width<44||r.height<44)}).map(e=>(e.textContent.trim()||e.getAttribute('aria-label')||e.className).toString().slice(0,22)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height));
  const all=D.querySelector('main').innerText+' '+(D.querySelector('footer')||{innerText:''}).innerText;const hype=(all.match(/\b(moon|mooning|100x|1000x|guaranteed|lambo|wagmi|ape in|to the moon|gem)\b/ig)||[]);const emoji=(all.match(/\p{Extended_Pictographic}/gu)||[]);
  return {hype,emoji,sw:D.documentElement.scrollWidth,vw,past,over,small:[...new Set(small)].slice(0,14),taps,errs:['__h29tErr','__h29mErr','__m12Err','__h29eErr','__h29dErr'].filter(k=>window[k]).map(k=>k+':'+String(window[k]).slice(0,100))}});
 const hdr=await p.evaluate(()=>Math.round(document.querySelector('header').getBoundingClientRect().height));const step=VH-hdr;const H=await p.evaluate(()=>document.documentElement.scrollHeight);
 /* screens follow the beats: a new screen at every gutter (the gutter just under the header), long sections in window-sized steps */
 const gt=await p.evaluate(()=>[...document.querySelectorAll('.h29-gutter')].filter(g=>g.getBoundingClientRect().height&&getComputedStyle(g).display!=='none').map(g=>Math.round(g.getBoundingClientRect().top+scrollY)));
 const beats=[...new Set([0,...gt.map(t=>t-hdr-6).filter(t=>t>120)])].sort((x,y)=>x-y),stops=[];
 beats.forEach((b0,k)=>{const b1=k+1<beats.length?beats[k+1]:H;stops.push(b0);for(let s0=b0+step;s0<b1-120;s0+=step)stops.push(s0)});
 console.log('gutters',JSON.stringify(gt),'stops',JSON.stringify(stops));
 const shots=[];let i=0;
 let lastY=-1e9;for(const y of stops){const yy=Math.min(y,H-VH);if(yy<lastY+150)continue;lastY=yy;i++;await p.evaluate(y=>scrollTo(0,y),yy);
  if(V==='launch')await p.evaluate(()=>{const b=window.__h29dBar;if(b){const e=document.getElementById('h29eFollow').getBoundingClientRect();b.classList.toggle('on',scrollY>innerHeight*.8&&!(e.top<innerHeight&&e.bottom>0))}});
  await p.waitForTimeout(1400);
  const m=await p.evaluate(({hdr})=>{const D=document,VW=innerWidth,VH=innerHeight;const fam=f=>f.split(',')[0].replace(/["']/g,'').trim();
   const vis=e=>{for(let a=e;a&&a!==D.body;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05)return false;if(/inset\(50%/.test(c.clipPath)||(c.clip&&/rect\(0/.test(c.clip)))return false;if(a.classList&&/(^| )(sr|p5-sr|hb-sr|ch-sr)( |$)/.test(a.className))return false}return true};
   let words=0,hw=0;const fams={};const tw=D.createTreeWalker(D.body,NodeFilter.SHOW_TEXT);let n;
   while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(!pe||/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(pe.tagName)||pe.closest('table.p5-sr'))continue;
    const rg=D.createRange();rg.selectNodeContents(n);const r=rg.getBoundingClientRect();if(r.width<2||r.height<2||r.bottom<hdr||r.top>VH||r.right<0||r.left>VW)continue;if(!vis(pe))continue;
    const wc=t.split(' ').filter(w=>/[A-Za-z]{2,}/.test(w)).length;if(pe.closest('header')){hw+=wc;continue}words+=wc;
    const ff=pe.closest('svg')?(pe.getAttribute('font-family')||getComputedStyle(pe).fontFamily):getComputedStyle(pe).fontFamily;const f=fam(ff);fams[f]=(fams[f]||0)+t.split(' ').length}
   const mv=new Set();D.getAnimations().forEach(a=>{const e=a.effect&&a.effect.target;if(!e||a.playState!=='running'||a.effect.getTiming().iterations!==Infinity)return;const r=e.getBoundingClientRect();if(r.width>0&&r.bottom>hdr&&r.top<VH&&vis(e))mv.add(String(e.getAttribute('class')||e.tagName).split(' ')[0]+':'+(a.animationName||'waapi'))});
   D.querySelectorAll('video').forEach(v=>{const r=v.getBoundingClientRect();if(!v.paused&&r.bottom>hdr&&r.top<VH)mv.add('film:'+(v.currentSrc||'').split('/').pop().replace(/-(hd|anim2?)\..*$/,''))});
   const cd=D.querySelector('.hbc-art');if(cd){const r=cd.getBoundingClientRect();if(r.bottom>hdr&&r.top<VH&&!matchMedia('(prefers-reduced-motion: reduce)').matches)mv.add('countdown (ticks)')}
   /* focal point: the candidate with the largest visible area x weight */
   const C=[['h1.t4-h1','headline',1.4],['section.t4 .t4-hero','the chip',1],['.t4-frs>.t4-fr','a round frame',1],['section.c8 .c8-one','a model chip',1],['li.ch-tb','No. 5 chip',.6],['.h29m-fp','the front page',1.3],['.h29m-bi','a back issue',.25],['#learn svg','a chart',1],['.hbc-art','the countdown',1.6],['.h29e-x','Follow on X',3],['.h29e-bd','the next close',.8],['footer .h29e-ft','footer',.5],['main h2','a heading',1.2]];
   let best=null;C.forEach(([s,l,k])=>D.querySelectorAll(s).forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();const a=Math.max(0,Math.min(r.bottom,VH)-Math.max(r.top,hdr))*Math.max(0,Math.min(r.right,VW)-Math.max(r.left,0));
    let w=a*k;const pv=e.querySelector&&e.querySelector('video');if(pv&&!pv.paused)w*=1.6;if(!best||w>best.w)best={w,l,x:r.left,y:r.top,wd:r.width,h:r.height}}));
   return {words,hdrWords:hw,faces:fams,movers:[...mv],focal:best&&{l:best.l,x:Math.round(best.x),y:Math.round(best.y),w:Math.round(best.wd),h:Math.round(best.h)},
    secs:[...D.querySelectorAll('main h1,main h2')].filter(h=>{const r=h.getBoundingClientRect();return r.bottom>hdr&&r.top<VH&&vis(h)}).map(h=>h.textContent.replace(/\s+/g,' ').trim())}},{hdr});
  const f=`${OUT}/s${String(i).padStart(2,'0')}.png`;await p.screenshot({path:f});m.png=f;m.y=yy;shots.push(m);console.log(i,yy,JSON.stringify(m))}
 fs.writeFileSync(`${OUT}/screens.json`,JSON.stringify({W,VH,hdr,variant:V,chk,er,shots},null,1));console.log(JSON.stringify(chk),JSON.stringify(er));await b.close()})();
