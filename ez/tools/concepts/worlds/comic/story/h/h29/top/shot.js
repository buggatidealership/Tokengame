// node shot.js <width> <now|h29> <out.png> [dpr]   env PORT (8947), PART=top|full, HDR=1 keep the sticky header in the shot
// The built X2+ page (v46) with the H29 top overlay (h29/_gutter.css + top/top.css + top/top.js) laid over it, or today's ("now").
// Prints checks: page errors, sideways scroll, elements past the right edge, smallest font in the top, words/faces/movers per phone screen of the top.
const {chromium}=require('playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8947;
(async()=>{const [Wd,T,out,dpr]=process.argv.slice(2);const w=+Wd,VH=w<760?844:900;const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const ctx=await b.newContext({viewport:{width:w,height:VH},deviceScaleFactor:+(dpr||1)});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&/h29|media/.test(r.url()))er.push(r.status()+' '+r.url().slice(-60))});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__t4,null,{timeout:120000});await p.waitForTimeout(800);
 if(T!=='now'){await p.addStyleTag({content:rd('../_gutter.css')+rd('top.css')});await p.addScriptTag({content:rd('top.js')});
  await p.waitForFunction(()=>window.__h29t,null,{timeout:20000}).catch(()=>er.push('no __h29t'));}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(async()=>{for(let y=0;y<4000;y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await p.waitForTimeout(1500);
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.t4 img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))));
 const bottom=await p.evaluate(()=>{const ch=document.querySelector('section.ch .ch-h')||document.querySelector('section.ch');return Math.round((ch?ch.getBoundingClientRect().top:document.querySelector('section.t4').getBoundingClientRect().bottom)+scrollY+130)});
 // per phone screen of the top: words, faces, movers (audit method, simplified: visible text in the viewport, header counted apart)
 const scr=[];const hdrH=await p.evaluate(()=>Math.round(document.querySelector('header').getBoundingClientRect().height));const step=VH-hdrH;
 for(let y=0;y<bottom-hdrH;y+=step){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(500);
  scr.push(await p.evaluate(({y,hdrH})=>{const VW=innerWidth,VH=innerHeight;const fam=f=>f.split(',')[0].replace(/["']/g,'').trim();
   const vis=el=>{for(let e=el;e&&e!==document.body;e=e.parentElement){const c=getComputedStyle(e);if(c.display==='none'||c.visibility==='hidden'||+c.opacity<.05)return false;if(c.clip&&/rect\(0/.test(c.clip))return false;if(/inset\(50%/.test(c.clipPath))return false}return true};
   const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n,words=0,hw=0;const fams={};let minf=99;const mf=[];
   while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(!pe||/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(pe.tagName))continue;
    const rg=document.createRange();rg.selectNodeContents(n);const r=rg.getBoundingClientRect();if(!r.width||r.bottom<0||r.top>VH||r.right<0||r.left>VW)continue;if(!vis(pe))continue;
    const inH=!!pe.closest('header');const wc=t.split(' ').filter(w=>/[A-Za-z0-9$%]/.test(w)).length;if(inH){hw+=wc;}else{words+=wc}
    const cs=getComputedStyle(pe);const f=fam(cs.fontFamily);fams[f]=(fams[f]||0)+wc;const fz=pe instanceof SVGElement?null:parseFloat(cs.fontSize);if(fz&&!inH&&!pe.closest('svg')&&fz<12)mf.push(t.slice(0,20)+'@'+fz)}
   const anim=document.getAnimations().filter(a=>{const e=a.effect&&a.effect.target;if(!e||a.playState!=='running')return false;const r=e.getBoundingClientRect();return r.bottom>0&&r.top<VH&&r.width>0&&vis(e)&&(a.effect.getTiming().iterations===Infinity||a.currentTime<5000)}).map(a=>{const e=a.effect.target;return (e.getAttribute('class')||e.tagName).split(' ')[0]+':'+(a.animationName||'waapi')});
   const vids=[...document.querySelectorAll('video')].filter(v=>!v.paused&&v.getBoundingClientRect().bottom>0&&v.getBoundingClientRect().top<VH).map(v=>'video:'+(v.currentSrc||'').split('/').pop());
   return {y,words,hdrWords:hw,faces:fams,movers:[...new Set(anim)].concat(vids),small:mf.slice(0,6)}},{y,hdrH}))}
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,sec=document.querySelector('section.t4');
  const over=[...document.querySelectorAll('section.t4 *, .h29-gutter, header *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>vw+1&&getComputedStyle(e).position!=='fixed'&&!e.closest('svg')&&!e.closest('.t4-pic')&&!e.closest('.r3-bd')&&!e.closest('.h29-gutter')}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().right));
  const clip=[...document.querySelectorAll('section.t4 :is(.r3c3-in,.t4-h2,.t4-h1,.h29t-film,.h29t-cap)')].filter(e=>e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1&&getComputedStyle(e).overflow!=='visible').map(e=>(e.getAttribute('class')||e.tagName).slice(0,30));
  const fr=[...document.querySelectorAll('.t4-frs>.t4-fr')].map(f=>{const a=f.querySelector('.t4-art').getBoundingClientRect(),c=f.querySelector('.r3c3-cap').getBoundingClientRect();return [Math.round(a.width),Math.round(a.height),Math.round(c.width),Math.round(c.height)]});
  return {scrollW:document.documentElement.scrollWidth,vw,over,clip,frames:fr,c3fs:sec&&sec.dataset.c3fs,err:window.__x2pTopErr?String(window.__x2pTopErr):null,h29err:window.__h29tErr?String(window.__h29tErr):null}});
 if(!process.env.HDR)await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed')x.style.visibility='hidden'})});
 const H=Math.min(bottom,9000);await p.setViewportSize({width:w,height:H});await p.waitForTimeout(1200);await p.evaluate(()=>{scrollTo(0,0);window.__t4&&window.__t4.place()});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const h=document.querySelector('header');if(h){h.style.position='relative'}});
 await p.screenshot({path:out,timeout:120000,clip:{x:0,y:0,width:w,height:H}});
 console.log(JSON.stringify({out,w,T,...chk,h:H,er}));fs.writeFileSync(out.replace(/\.png$/,'.json'),JSON.stringify({chk,scr,er},null,1));
 console.log(JSON.stringify(scr));await b.close()})();
