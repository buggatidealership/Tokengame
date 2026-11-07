// node shot.js <width> <take> <open|-> <out.png> <from> <to> [dpr]  : the built X2+ page with _f3.js, a stitched capture between two marks
// marks: 'frames2' (How a round works' last row), 'top' (section.t4), 'meet+N' (N px below Meet the models' head), 'view' (the viewport as is, for open states)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const path=require('path');
const PORT=process.env.PORT||8991;
(async()=>{const [W,take,open,out,from,to,dpr]=process.argv.slice(2);const w=+W,land=open==='land';
 const b=await chromium.launch();const ctx=await b.newContext({viewport:land?{width:844,height:390}:{width:w,height:w<760?844:900},deviceScaleFactor:+(dpr||2)});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
 if(take!=='now'){await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'_f3.js'),'utf8')});
  await p.evaluate(([t,o])=>window.__f3(t,{open:o==='-'?null:o}),[take,open]);await p.waitForTimeout(1200);await p.evaluate(()=>window.__f3gaps&&window.__f3gaps())}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(1500);
 const m=await p.evaluate(()=>{if(window.__f3m)return {m:window.__f3m,err:window.__f3Err};const R=s=>{const r=document.querySelector(s).getBoundingClientRect();return [r.top+scrollY,r.bottom+scrollY]};
  const a=R('.t4-b1 .t4-bleed')[1],b=R('.t4-b2 .t4-h2')[0],c=R('.t4-frs')[1],d=R('.t4-b3 .t4-h2')[0],e=R('.t4-b3 .t4-bleed')[1],f=R('section.ch .ch-h')[0];
  return {m:{now:true,beat:{got:+(b-a).toFixed(1)},sub:{got:+(d-c).toFixed(1)},chap:{got:+(f-e).toFixed(1)},section:+(e-d).toFixed(1),y:{beat:[a,b],sub:[c,d],chap:[e,f],top:R('section.t4')[0]}}}});
 if(open!=='-'&&take!=='now'){await p.screenshot({path:out});console.log(JSON.stringify({out,...m,er}));await b.close();return}
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 const y=await p.evaluate(([from,to])=>{const R=s=>{const e=document.querySelector(s);const r=e.getBoundingClientRect();return [r.top+scrollY,r.bottom+scrollY]};
  const mk=s=>{if(s==='top')return R('section.t4')[0];if(s==='frames2'){const f=[...document.querySelectorAll('.t4-fr')];return f[f.length-1].getBoundingClientRect().top+scrollY-60}
   if(s.startsWith('meet')){return R('section.ch .ch-h')[0]+(+s.split('+')[1]||0)}if(s==='b2')return R('.t4-b2')[0]-30;return 0};return [Math.round(mk(from)),Math.round(mk(to))]},[from,to]);
 const vh=await p.evaluate(()=>innerHeight),parts=[];
 for(let yy=y[0];yy<y[1];yy+=vh){await p.evaluate(v=>scrollTo(0,v),yy);await p.waitForTimeout(300);const sy=await p.evaluate(()=>scrollY);const f=`${out}.p${parts.length}.png`;await p.screenshot({path:f});parts.push({f,sy,want:yy})}
 fs.writeFileSync(out+'.json',JSON.stringify({W:w,vh,y,parts,dpr:+(dpr||2)}));
 console.log(JSON.stringify({out,...m,y,er}));await b.close()})();
