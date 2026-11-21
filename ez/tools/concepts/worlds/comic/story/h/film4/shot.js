// node shot.js <width> <lettering title|chapter|marquee|now> <open -|phone|theatre> <out.png> [from to dpr] [rm]
// The built X2+ page with the film4 drop-in (film4/x2p_top.js + .css) laid over it; media/film4-* served from film4/out (as they would be from media/).
// Prints the measured gaps and checks: page errors, sideways overflow, elements past the window's right edge.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8991;
(async()=>{const [W,L,open,out,from,to,dpr,rm]=process.argv.slice(2);const w=+W;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:(w>=1900?1000:900)},deviceScaleFactor:+(dpr||2),reducedMotion:rm?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 await p.route(/\/media\/film4-[^/]+$/,r=>{const f=path.join(__dirname,'out',r.request().url().split('/').pop());r.fulfill({path:f,contentType:'image/jpeg'})});
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
 if(L!=='now'){await p.evaluate(l=>{window.__F4L=l},L);await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'x2p_top.css'),'utf8')});
  await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'x2p_top.js'),'utf8')});await p.waitForTimeout(2500)}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(1200);
 await p.evaluate(()=>window.__t4&&window.__t4.place());await p.waitForTimeout(600);
 const chk=await p.evaluate(()=>{const vw=document.documentElement.clientWidth;const over=[...document.querySelectorAll('.t4 .f4,.t4 .f4 *,.t4 .f4-cx,.f4-lb,.f4-lb *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>vw+1&&getComputedStyle(e).position!=='fixed'}).slice(0,5).map(e=>(e.tagName+'.'+(e.getAttribute('class')||'')).slice(0,50)+'@'+Math.round(e.getBoundingClientRect().right));
  const s=document.querySelector('section.t4');return {f4:s&&s.dataset.f4?JSON.parse(s.dataset.f4):null,scrollW:document.documentElement.scrollWidth,vw,over,err:window.__x2pTopErr?String(window.__x2pTopErr):null}});
 if(open!=='-'){await p.evaluate(()=>document.querySelector('.f4').scrollIntoView({block:'center'}));await p.waitForTimeout(400);
  await p.evaluate(()=>window.__f4open(true));await p.evaluate(()=>{const v=document.querySelector('.f4-v');v.style.background='#000 url(tools/concepts/worlds/comic/story/h/film3/out/f3-play-0249.jpg) center/contain no-repeat'});await p.waitForTimeout(800);
  await p.screenshot({path:out});console.log(JSON.stringify({out,...chk,er}));await b.close();return}
 if(out==='-'){console.log(JSON.stringify({w,L,...chk,er}));await b.close();return}
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 const y=await p.evaluate(([from,to])=>{const R=s=>{const r=document.querySelector(s).getBoundingClientRect();return [r.top+scrollY,r.bottom+scrollY]};
  const mk=s=>{if(s==='top')return R('section.t4')[0];if(s==='frames2'){const f=[...document.querySelectorAll('.t4-fr')];return f[f.length-1].getBoundingClientRect().top+scrollY-60}
   if(s.startsWith('meet'))return R('section.ch .ch-h')[0]+(+s.split('+')[1]||0);return 0};return [Math.round(mk(from)),Math.round(mk(to))]},[from,to]);
 const vh=await p.evaluate(()=>innerHeight),parts=[];
 for(let yy=y[0];yy<y[1];yy+=vh){await p.evaluate(v=>scrollTo(0,v),yy);await p.waitForTimeout(300);const sy=await p.evaluate(()=>scrollY);const f=`${out}.p${parts.length}.png`;await p.screenshot({path:f});parts.push({f,sy,want:yy})}
 fs.writeFileSync(out+'.json',JSON.stringify({W:w,vh,y,parts,dpr:+(dpr||2)}));
 console.log(JSON.stringify({out,...chk,y,er}));await b.close()})();
