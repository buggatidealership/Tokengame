// node run.js <out dir> <vault|trans> <takes e.g. now,v1,v2> [widths 390,320,1280]  (RM=1 reduced motion)
// Loads the built X3+ page (http://localhost:8977), lays _h7.css/_h7.js + the take over it, scrolls the region into view and shoots it.
// vault: the bet section's opener (wrap top to the date line). trans: one screen from Smart or lucky's last rows to the headline.
// Prints measurements: page width vs viewport, take text sizes, overlaps with the headline, the countdown dies and any face.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],MODE=process.argv[3],TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
async function open(b,W,t){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8977/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('hb-ready'),null,{timeout:90000});
 // walk down the page once so every step-in has played and lazy media are in
 await p.evaluate(async()=>{const s=document.querySelector('#wc-book .wc-splash');const y1=document.querySelector('.wc-bet').getBoundingClientRect().bottom+scrollY;for(let y=s.getBoundingClientRect().top+scrollY-900;y<y1;y+=260){scrollTo({top:y,behavior:'instant'});await new Promise(r=>setTimeout(r,90))}});
 await p.waitForTimeout(900);
 await p.addStyleTag({content:'header.top{visibility:hidden!important}'});
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed'&&!x.classList.contains('h7-ov'))x.style.visibility='hidden'})});
 if(t!=='now'){await p.addStyleTag({content:rd('_h7.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_h7.js')+';'+rd(t+'.js')})}
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
 return {ctx,p,er}}
const MEASURE=()=>{const R=e=>e.getBoundingClientRect(),hit=(a,b)=>a.left<b.right-.5&&a.right>b.left+.5&&a.top<b.bottom-.5&&a.bottom>b.top+.5;
 const rng=n=>{const r=document.createRange();r.selectNodeContents(n);return [...r.getClientRects()]};
 const keep=[...rng(document.querySelector('.wc-bet h2.hb-h')).map(r=>['headline',r]),...[...document.querySelectorAll('.hbc-num')].map(e=>['digits',R(e)]),
   ...[...document.querySelectorAll('.hb-face, .wc-face, [class*=founder] video, [class*=founder] img')].filter(e=>R(e).width).map(e=>['face',R(e)])];
 const mine=[...document.querySelectorAll('.h7-sc *:not(.h7-sr):not(svg):not(defs):not(defs *):not(clipPath *), .h7-ov *, .h7-mv')].filter(e=>R(e).width>1&&!e.closest('.h7-sr')&&!e.closest('defs'));
 const txt=[...document.querySelectorAll('.h7-sc b, .h7-sc span:not(.h7-sr):not(.h7-sr *), .h7-sc p, .h7-sc text, .h7-sc clipPath text')].map(e=>{const svg=e.ownerSVGElement;let fs=parseFloat(getComputedStyle(e).fontSize);if(svg){const k=svg.getBoundingClientRect().width/1600;fs*=k}return [String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,14),(e.textContent||'').trim().slice(0,20),+fs.toFixed(1)]}).filter(x=>x[1]);
 const ov=[];const boxes=m=>{if(m.tagName==='text'&&!m.closest('clipPath')){const M=m.getScreenCTM(),o=[];for(let i=0;i<m.getNumberOfChars();i++){const e=m.getExtentOfChar(i),p=new DOMPoint(e.x,e.y).matrixTransform(M),q=new DOMPoint(e.x+e.width,e.y+e.height).matrixTransform(M),p2=new DOMPoint(e.x+e.width,e.y).matrixTransform(M),q2=new DOMPoint(e.x,e.y+e.height).matrixTransform(M);const xs=[p.x,q.x,p2.x,q2.x],ys=[p.y,q.y,p2.y,q2.y];o.push({left:Math.min(...xs),right:Math.max(...xs),top:Math.min(...ys),bottom:Math.max(...ys)})}return o}
   if(m.closest('svg'))return [];if(m.children.length===0&&m.textContent.trim()){return rng(m)}return m.textContent.trim()?[]:[R(m)]};
 mine.forEach(m=>{boxes(m).forEach(a=>keep.forEach(([k,b])=>{if(hit(a,b))ov.push(k+':'+String(m.className.baseVal!==undefined?m.className.baseVal:m.className).slice(0,12))}))});
 [...document.querySelectorAll('.h7-ov svg')].forEach(s=>{});
 const g=document.querySelector('.hb-open .g'),gr=R(g);const out=[...document.querySelectorAll('.h7-sc>div,.h7-sc>p')].filter(e=>{const a=R(e);return a.left<gr.left-1||a.right>gr.right+1||a.top<gr.top-1||a.bottom>gr.bottom+1}).map(e=>e.className);
 return {sw:document.documentElement.scrollWidth,vw:innerWidth,txt,ov:[...new Set(ov)],outOfPainting:out}};
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const {ctx,p,er}=await open(b,W,t);let clip;
  if(MODE==='vault'){const r=await p.evaluate(()=>{const w=document.querySelector('.hb-wrap'),s=document.querySelector('.hb-sub');const t=w.getBoundingClientRect().top+scrollY;scrollTo({top:t-20,behavior:'instant'});const a=w.getBoundingClientRect(),c=s.getBoundingClientRect();return {y:a.top,h:c.bottom+14-a.top}});
   await p.waitForTimeout(700);clip={x:0,y:r.y,width:W,height:r.h}}
  else{const y=await p.evaluate(()=>{window.__h7Strobe=1;if(window.__h7Still)return window.__h7Still();const w=document.querySelector('.wc-bet .hb-wrap'),g=document.querySelector('.hb-open .g');return Math.round(w.getBoundingClientRect().top+scrollY+g.getBoundingClientRect().height+90-innerHeight)});
   await p.evaluate(y=>scrollTo({top:y,behavior:'instant'}),y);await p.waitForTimeout(1300);clip={x:0,y:0,width:W,height:W<600?844:900}}
  await p.screenshot({path:`${OUT}/${MODE}-${W}-${t}.png`,clip});
  const m=await p.evaluate(MEASURE);console.log(W,t,JSON.stringify(m),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
