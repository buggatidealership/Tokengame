// node shot.js <width> <take now|B|C> <out.png> [dpr]   env: W=bare|win (panel 2), BD=r|f (panel 4), PORT (default 8931), PART=top|b2|fr:<key>
// The built X2+ page with a round3 take laid over it (_r3.css + <take>.css, _r3.js + <take>.js). Today's order is kept.
// PART=top (default) shoots the page from its top to 140px into Meet the models; b2 = "How a round works" alone; fr:<key> one frame.
// Prints checks: page errors, sideways scroll, elements past the right edge, text overflowing its box, overlaps between a caption and the next panel.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8931;
(async()=>{const [Wd,T,out,dpr]=process.argv.slice(2);const w=+Wd;const rd=f=>{const p=path.join(__dirname,f);return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''};
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2)});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 p.on('response',r=>{if(r.status()>=400&&/round3|media/.test(r.url()))er.push(r.status()+' '+r.url().slice(-60))});
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 if(T!=='now'){await p.evaluate(([w,bd])=>{window.__R3W=w;window.__R3BD=bd;window.__R3BASE='tools/concepts/worlds/comic/story/h/round3/'},[process.env.W||'bare',process.env.BD||'r']);
  if(process.env.STAIR)await p.evaluate(()=>document.documentElement.classList.add('r3-stair'));
  await p.addStyleTag({content:rd('_r3.css')+rd(T+'.css')+'\n'});await p.addScriptTag({content:rd('_r3.js')+rd(T+'.js')});
  await p.waitForFunction(()=>window.__r3done,null,{timeout:20000}).catch(()=>er.push('no __r3done'));}
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1000);
 await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<Math.min(H,9000);y+=300){scrollTo(0,y);await new Promise(r=>setTimeout(r,50))}scrollTo(0,0)});
 await p.evaluate(()=>{window.__r3place&&window.__r3place()});await p.waitForTimeout(1500);
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('section.t4 img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r}))));
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth,sec=document.querySelector('section.t4');
  const over=[...sec.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>vw+1&&getComputedStyle(e).position!=='fixed'&&!e.closest('svg')&&!e.closest('.t4-pic')&&!e.closest('.r3-bd')&&!e.closest('.t4-bleed')&&!e.closest('.f4')&&!e.closest('.t5-bg')}).slice(0,6).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,40)+'@'+Math.round(e.getBoundingClientRect().right));
  const clip=[...sec.querySelectorAll('.r3b-cap,.r3-say,.r3-fact,.t4-h2')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>(e.getAttribute('class')||e.tagName).slice(0,30));
  /* every lit text inside a surface stays inside its surface's svg box */
  const tx=[...sec.querySelectorAll('.t4-fr .t4-sf svg text, .r3-rk svg text')].filter(t=>{const s=t.ownerSVGElement.getBoundingClientRect(),r=t.getBoundingClientRect();return r.width&&(r.left<s.left-2||r.right>s.right+2)}).map(t=>t.textContent).slice(0,6);
  const fr=[...sec.querySelectorAll('.t4-frs>.t4-fr')].map(f=>{const r=f.getBoundingClientRect(),a=f.querySelector('.t4-art').getBoundingClientRect();return [Math.round(r.left),Math.round(r.top+scrollY),Math.round(r.width),Math.round(a.height)]});
  /* a caption box may not cover the panel above it */
  const cps=[...sec.querySelectorAll('.r3b-cap')],arts=[...sec.querySelectorAll('.t4-frs>.t4-fr .t4-art')];let ov=[];
  cps.forEach((c,i)=>{const cr=c.getBoundingClientRect();arts.forEach((a,j)=>{if(j===i)return;const ar=a.getBoundingClientRect();const x=Math.min(cr.right,ar.right)-Math.max(cr.left,ar.left),y=Math.min(cr.bottom,ar.bottom)-Math.max(cr.top,ar.top);if(x>1&&y>1)ov.push(`cap${i+1}/art${j+1}:${Math.round(x)}x${Math.round(y)}`)})});
  const sz=[...sec.querySelectorAll('.r3b-cap,.r3-say,.r3-fact')].map(e=>parseFloat(getComputedStyle(e).fontSize)).filter(Boolean);
  return {scrollW:document.documentElement.scrollWidth,vw,over,clip,tx,ov,fr,minFont:sz.length?Math.min(...sz):null,err:window.__x2pTopErr?String(window.__x2pTopErr):null,r3err:window.__r3err||null}});
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 const PART=process.env.PART||'top';
 const box=await p.evaluate(P=>{const q=s=>document.querySelector(s).getBoundingClientRect();let a,b;
  if(P==='top'){a=0;const ch=document.querySelector('section.ch');b=ch?q('section.ch').top+scrollY+140:q('section.t4').bottom+scrollY+10}
  else if(P==='b2'){a=q('.t4-b2').top+scrollY-10;b=q('.t4-b2').bottom+scrollY+16}
  else{const f=document.querySelector('.q4-'+P.slice(3)).getBoundingClientRect();a=f.top+scrollY-6;b=f.bottom+scrollY+6}
  return [Math.max(0,Math.round(a)),Math.round(b)]},PART);
 /* grow the viewport to the whole shot first (a fullPage capture resizes the page mid-shot, and x2p_top may rebuild the section on resize) */
 await p.setViewportSize({width:w,height:box[1]+20});await p.waitForTimeout(1200);await p.evaluate(()=>{scrollTo(0,0);window.__r3place&&window.__r3place()});await p.waitForTimeout(1200);
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 const box2=await p.evaluate(P=>{const q=s=>document.querySelector(s).getBoundingClientRect();let a,b;
  if(P==='top'){a=0;const ch=document.querySelector('section.ch');b=ch?q('section.ch').top+scrollY+140:q('section.t4').bottom+scrollY+10}
  else if(P==='b2'){a=q('.t4-b2').top+scrollY-10;b=q('.t4-b2').bottom+scrollY+16}
  else{const f=document.querySelector('.q4-'+P.slice(3)).getBoundingClientRect();a=f.top+scrollY-6;b=f.bottom+scrollY+6}
  return [Math.max(0,Math.round(a)),Math.round(b)]},PART);
 chk.applied=await p.evaluate(()=>!!document.querySelector('.t4-frs.r3'));chk.rebuilt=await p.evaluate(()=>window.__r3re||0);
 await p.screenshot({path:out,timeout:120000,clip:{x:0,y:box2[0],width:w,height:Math.min(box2[1],box[1]+20)-box2[0]}});
 console.log(JSON.stringify({out,w,T,W:process.env.W||'bare',BD:process.env.BD||'r',...chk,h:box[1]-box[0],er}));await b.close()})();
