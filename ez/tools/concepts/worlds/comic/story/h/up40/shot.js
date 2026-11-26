// node shot.js W tag : the built X2+ page (ez/ served on :8994) at #/upcoming, full page + the H40 gate measures -> OUT/<tag>-<W>.png/.json
// env: DPR (default 2), NOW (ISO or ms, pins the page clock), V ('in' sets window.__x2pUpV), CLOSE (selector of a row to shoot at 3x)
const {chromium}=require('/opt/node-tools/node_modules/playwright');const fs=require('fs');const FONTS=require('../../../../../live-r1/_fonts.js');
const OUT=process.env.OUT||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/up40/';
(async()=>{const [W,tag]=process.argv.slice(2);const w=+W,ph=w<700?844:800;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:ph},deviceScaleFactor:+(process.env.DPR||2),isMobile:w<700,hasTouch:w<700,reducedMotion:'reduce'});
 const p=await ctx.newPage();await FONTS(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,200))});
 const now=process.env.NOW?(isNaN(+process.env.NOW)?Date.parse(process.env.NOW):+process.env.NOW):null;
 if(now)await p.addInitScript(t=>{const D=Date,off=t-D.now();class F extends D{constructor(...a){if(!a.length)super(D.now()+off);else super(...a)}static now(){return D.now()+off}};window.Date=F},now);
 if(process.env.V)await p.addInitScript(v=>{window.__x2pUpV=v},process.env.V);
 await p.goto('http://127.0.0.1:8994/v46-live-x2plus.html#/upcoming',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000}).catch(()=>errs.push('cover did not lift'));
 await p.waitForFunction(()=>document.querySelector('.u3-root'),null,{timeout:30000}).catch(()=>errs.push('no u3-root'));
 await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(async()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager');const S=document.documentElement.scrollHeight;for(let y=0;y<S;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 await p.waitForFunction(()=>[...document.querySelectorAll('#view img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const c=document.querySelector('.x2p-cw');if(c)c.style.visibility='hidden'});
 await p.screenshot({path:`${OUT}${tag}-${W}.png`,fullPage:true});
 const m=await p.evaluate(()=>{const R=document.querySelector('.u3-root'),de=document.documentElement,r2=x=>Math.round(x*100)/100;
  const out={sw:de.scrollWidth,vw:innerWidth,sh:de.scrollHeight,u3err:String(window.__u3Err||'')};
  const face=e=>{const r=e.getBoundingClientRect(),s=getComputedStyle(e);return {l:r.left+parseFloat(s.borderLeftWidth),t:r.top+parseFloat(s.borderTopWidth),r:r.right-parseFloat(s.borderRightWidth),b:r.bottom-parseFloat(s.borderBottomWidth)}};
  /* a. trade cells */
  const rows=[...R.querySelectorAll('.ud-trs')];out.rows=[];let worst={num:0,numy:0,word:0,wordy:0,cellw:0,gap:0,margin:0,labx:0,laby:0,wordrow:0,numrow:0};
  rows.forEach(t=>{const tr=[...t.querySelectorAll('.ud-tr')],a=t.closest('a'),rr=t.getBoundingClientRect(),ar=a.getBoundingClientRect(),ws=tr.map(c=>c.getBoundingClientRect().width);
   const cells=tr.map(c=>{const cr=c.getBoundingClientRect(),tv=c.querySelector('.ud-tv'),tw=c.querySelector('.ud-tw'),nb=tv.firstElementChild,wb=tw.firstElementChild,lb=c.querySelector('.ud-tl'),lr=lb.getBoundingClientRect(),lin=[...lb.children].reduce((q,e)=>{const x=e.getBoundingClientRect();return {l:Math.min(q.l,x.left),r:Math.max(q.r,x.right)}},{l:1e9,r:-1e9});
     const F=face(tv),G=face(tw),N=nb.getBoundingClientRect(),Wd=wb.getBoundingClientRect(),cx=(cr.left+cr.right)/2;
     return {txt:nb.textContent,word:wb.textContent,fs:parseFloat(getComputedStyle(nb).fontSize),
       num_dx:r2((N.left+N.right)/2-(F.l+F.r)/2),num_dy:r2((N.top+N.bottom)/2-(F.t+F.b)/2),
       word_dx:wb.textContent?r2((Wd.left+Wd.right)/2-(G.l+G.r)/2):null,word_dy:wb.textContent?r2((Wd.top+Wd.bottom)/2-(G.t+G.b)/2):null,
       lab_dx:r2((lin.l+lin.r)/2-cx),lab_top:r2(lr.top-cr.top),word_top:r2(tw.getBoundingClientRect().top-cr.top),num_top:r2(tv.getBoundingClientRect().top-cr.top),
       wordFace_cx:r2((G.l+G.r)/2-cx),numFace_cx:r2((F.l+F.r)/2-cx),wordBase:r2(Wd.bottom-cr.top),numBase:r2(N.bottom-cr.top),faceW:r2(F.r-F.l),faceH:r2(F.b-F.t),inkW:r2(N.right-N.left)}});
   const gaps=tr.slice(1).map((c,i)=>r2(c.getBoundingClientRect().left-tr[i].getBoundingClientRect().right));
   const row={n:(a.getAttribute('href')||'').split('/').pop(),cellW:ws.map(r2),gaps,ml:r2(rr.left-ar.left),mr:r2(ar.right-rr.right),cells};out.rows.push(row);
   const sp=x=>Math.max(...x)-Math.min(...x);worst.cellw=Math.max(worst.cellw,sp(ws));worst.gap=Math.max(worst.gap,gaps.length?sp(gaps):0);worst.margin=Math.max(worst.margin,Math.abs(row.ml-row.mr));
   cells.forEach(c=>{worst.num=Math.max(worst.num,Math.abs(c.num_dx));worst.numy=Math.max(worst.numy,Math.abs(c.num_dy));if(c.word_dx!=null){worst.word=Math.max(worst.word,Math.abs(c.word_dx));worst.wordy=Math.max(worst.wordy,Math.abs(c.word_dy))}
     worst.labx=Math.max(worst.labx,Math.abs(c.lab_dx))});
   worst.laby=Math.max(worst.laby,sp(cells.map(c=>c.lab_top)));worst.wordrow=Math.max(worst.wordrow,sp(cells.map(c=>c.word_top)),sp(cells.filter(c=>c.word).map(c=>c.wordBase)).valueOf()||0);worst.numrow=Math.max(worst.numrow,sp(cells.map(c=>c.num_top)),sp(cells.filter(c=>c.txt).map(c=>c.numBase)))});
  /* across rows: every part's offset inside its cell the same (same geometry) */
  const all=out.rows.flatMap(r=>r.cells),sp=x=>x.length?r2(Math.max(...x)-Math.min(...x)):0;
  out.across={lab_top:sp(all.map(c=>c.lab_top)),word_top:sp(all.map(c=>c.word_top)),num_top:sp(all.map(c=>c.num_top)),wordBase:sp(all.filter(c=>c.word).map(c=>c.wordBase)),numBase:sp(all.filter(c=>c.txt).map(c=>c.numBase)),
    wordFace_cx:sp(all.map(c=>c.wordFace_cx)),numFace_cx:sp(all.map(c=>c.numFace_cx)),faceW_inRow:Math.max(0,...out.rows.map(r=>sp(r.cells.map(c=>c.faceW)))),numSize:sp(all.map(c=>c.fs))};
  /* rows side by side: their trade grids on one line (top of the four cells), and the four cells' left/right margin to the board's enamel */
  let pair=0;R.querySelectorAll('.ud-rows').forEach(ol=>{const t=[...ol.querySelectorAll(':scope>li .ud-trs')].map(x=>x.getBoundingClientRect());for(let i=0;i<t.length;i++)for(let j=i+1;j<t.length;j++)if(Math.abs(t[i].left-t[j].left)>20&&Math.abs(t[i].top-t[j].top)<60)pair=Math.max(pair,Math.abs(t[i].top-t[j].top))});worst.pairTop=pair;
  let bm=0;R.querySelectorAll('.ud-body').forEach(bd=>{const s=getComputedStyle(bd),bl=bd.getBoundingClientRect().left+parseFloat(s.paddingLeft),br=bd.getBoundingClientRect().right-parseFloat(s.paddingRight);
    bd.querySelectorAll('.ud-rows .ud-trs').forEach(t=>{const r=t.getBoundingClientRect(),li=t.closest('li').getBoundingClientRect();bm=Math.max(bm,Math.abs((r.left-li.left)-(li.right-r.right)))})});worst.cellsInRowMargin=bm;
  Object.keys(worst).forEach(k=>worst[k]=r2(worst[k]));out.worst=worst;
  /* b. panels */
  const ids=sel=>[...R.querySelectorAll(sel)].map(a=>+a.getAttribute('href').split('/').pop());
  out.panels={bell:ids('.ud-b1 .ud-rows a.ud-a'),soon:ids('.ud-soon a.ud-a'),hot:ids('.ud-bigs a.ud-a'),rest:ids('.ud-days a.ud-a')};
  const every=[].concat(...Object.values(out.panels));out.dupes=every.filter((x,i)=>every.indexOf(x)!==i);
  out.soonDay=[...R.querySelectorAll('.ud-soon .ud-sdh')].map(e=>e.textContent).join(' + ');out.bellPlate=(R.querySelector('.ud-np')||{}).textContent||'';
  out.soonLines=[...R.querySelectorAll('.ud-soon .ud-row')].map(r=>r.querySelector('.ud-nmr').textContent.replace(/\s+/g,'')+' | '+r.querySelector('.ud-st').textContent);
  /* c. surfaces: every visible text leaf, its font, and the surface it sits on */
  const kind=e=>e.closest('.ud-tv')?'trade number: brass-framed split flap (Anton)':e.closest('.ud-tw')?'LONG/SHORT: word flap (Anton)':e.closest('.ud-tl')?'AI label: printed on the enamel (Anton)':
    e.closest('.ud-w')?'letter flap (Anton)':e.closest('.ud-die')?'clock die flap (Anton)':e.closest('.ud-np')?'bell nameplate, brass engraved (Bangers)':e.closest('.ud-hp')?'header plate, brass engraved (Bangers)':
    e.closest('.ud-pl')?'small brass plate (Bangers)':e.closest(':is(.ud-st,.ud-when,.ud-dl,.ud-cap)')?'enamel, printed (Shantell Sans)':e.closest('.ud-h')?'section title (Bangers)':e.closest('.u3-fol')?'follow panel (svg in painting)':e.closest('.u3-sr')?'screen reader only':'OTHER';
  const S={},small=[];R.querySelectorAll('*').forEach(e=>{if(e.closest('svg'))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const r=e.getBoundingClientRect();if(!r.width||e.closest('.u3-sr'))return;
    const k=kind(e),f=getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,''),fs=parseFloat(getComputedStyle(e).fontSize);S[k]=S[k]||{n:0,fonts:new Set()};S[k].n++;S[k].fonts.add(f);if(fs<8)small.push(e.textContent.slice(0,20)+' '+fs)});
  out.surfaces=Object.fromEntries(Object.entries(S).map(([k,v])=>[k,v.n+' · '+[...v.fonts].join('/')]));out.small=small.slice(0,10);
  out.minFs=Math.min(...[...R.querySelectorAll('.ud-tr *')].filter(e=>e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(e=>parseFloat(getComputedStyle(e).fontSize)));
  return out});
 m.errs=errs;fs.writeFileSync(`${OUT}${tag}-${W}.json`,JSON.stringify(m,null,1));
 if(process.env.CLOSE){const el=await p.$(process.env.CLOSE);if(el){await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${OUT}${tag}-${W}-close.png`})}}
 console.log(tag,W,JSON.stringify({sw:m.sw,vw:m.vw,worst:m.worst,across:m.across,panels:m.panels,dupes:m.dupes,soonDay:m.soonDay,errs:m.errs,u3err:m.u3err,small:m.small,minFs:m.minFs}));await b.close()})();
