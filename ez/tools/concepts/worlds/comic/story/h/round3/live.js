// node live.js <width> <out.png|-> [dpr]   env: PORT (default 8938), RM=1 reduced motion
// Checks the BUILT v46-live-x2plus.html (C3 ported into x2p_top.js; no overlay): page errors, any 404, sideways scroll, elements past the right edge,
// caption boxes holding their words, caption box = picture size, lit text inside its surface, running animations in the top, the whole top's height.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const PORT=process.env.PORT||8938;
(async()=>{const [Wd,out,dpr]=process.argv.slice(2);const w=+Wd;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2),reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&r.url().includes('127.0.0.1'))er.push(r.status()+' '+r.url().slice(-70))});
 await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<Math.min(H,9000);y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.t4 img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))));await p.waitForTimeout(1200);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,sec=document.querySelector('section.t4');
  const over=[...sec.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>vw+1&&getComputedStyle(e).position!=='fixed'&&!e.closest('svg')&&!e.closest('.t4-pic')&&!e.closest('.r3-bd')&&!e.closest('.t4-bleed')&&!e.closest('.f4')&&!e.closest('.t5-bg')}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().right));
  const caps=[...sec.querySelectorAll('.r3c3-cap')];
  const capIn=caps.map(c=>{const n=c.firstElementChild,pt=parseFloat(getComputedStyle(c).paddingTop);return n.scrollHeight<=c.clientHeight-2*pt+1&&n.scrollWidth<=n.clientWidth+1});
  const capEq=caps.map(c=>{const a=c.parentElement.querySelector('.t4-art');const z=getComputedStyle(a),y=getComputedStyle(c);return [+(parseFloat(y.width)-parseFloat(z.width)).toFixed(2),+(parseFloat(y.height)-parseFloat(z.height)).toFixed(2)]});
  const tx=[...sec.querySelectorAll('.t4-fr .t4-sf svg text, .r3-rk svg text')].filter(t=>{const s=t.ownerSVGElement.getBoundingClientRect(),r=t.getBoundingClientRect();return r.width&&(r.left<s.left-2||r.right>s.right+2)}).map(t=>t.textContent).slice(0,6);
  const anim=document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('section.t4 .t4-b2')&&a.playState==='running').length;
  const words=[...sec.querySelectorAll('.t4-fr')].map(f=>[...f.querySelectorAll('.t4-sf svg text')].map(t=>t.textContent).join(' '));
  const ch=document.querySelector('section.ch'),top=ch?Math.round(ch.getBoundingClientRect().top+scrollY):null;
  return {scrollW:document.documentElement.scrollWidth,vw,over,capIn,capEq,fs:sec.dataset.c3fs,tx,anim,words,topToMeet:top,f4:sec.dataset.f4,err:window.__x2pTopErr?String(window.__x2pTopErr):null}});
 if(out&&out!=='-'){await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
  const y1=(chk.topToMeet||3000)+140;await p.setViewportSize({width:w,height:y1+20});await p.waitForTimeout(1500);
  await p.screenshot({path:out,timeout:120000,clip:{x:0,y:0,width:w,height:y1}})}
 console.log(JSON.stringify({w,rm:!!process.env.RM,...chk,er}));await b.close()})();
