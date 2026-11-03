// node gate.js <out dir> <variants now,belt,deck,drawers> [widths 320,390,1280] [dpr]
// Serves nothing itself: expects the private sandbox on PORT (default 8961), with before.html (today's live section) and v46-live-x2plus.html (the build).
// Shoots #x2pVit per variant and width, and runs the gate (content, geometry by getBoundingClientRect, sizes, scroll trap, page scroll over the line).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],VS=(process.argv[3]||'now,belt,deck').split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||1),PORT=process.env.PORT||8961;
fs.mkdirSync(OUT,{recursive:true});
const CAP='Each round gets a grade from 1 to 10. A 1 means all four AIs got the direction wrong. A 10 means all four got the direction right, and close to the real move.';
const drag=async(c,x0,y0,x1,y1)=>{await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:y0}]});for(let i=1;i<=12;i++)await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x0+(x1-x0)*i/12,y:y0+(y1-y0)*i/12}]});await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})};
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const V of VS){const ph=W<600;
  const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:ph?DPR:1,hasTouch:ph,isMobile:ph,reducedMotion:process.env.RM?'reduce':'no-preference'});
  const p=await ctx.newPage();await FONTS(p);
  if(V==='deck')await p.addInitScript(()=>{window.__x2pSwipe='deck'});
  if(V==='drawers')await p.addInitScript(()=>{window.__x2pDrawers=1});
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  const miss=[];p.on('response',r=>{if(r.status()>=400&&/media\//.test(r.url()))miss.push(r.status()+' '+r.url().split('/').pop())});
  const t0=Date.now();
  await p.goto(`http://127.0.0.1:${PORT}/${V==='now'?'before.html':'v46-live-x2plus.html'}`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:150000});const lift=Date.now()-t0;
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
  await p.evaluate(()=>{document.querySelector('#x2pVit').scrollIntoView();});await p.waitForTimeout(700);
  // hide fixed chrome for the shot
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if((s==='fixed'||s==='sticky')&&!x.closest('#x2pVit'))x.style.setProperty('display','none','important')})});
  await p.waitForFunction(()=>[...document.querySelectorAll('#x2pVit img[src]')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(500);
  const box=await p.evaluate(()=>{const r=document.querySelector('#x2pVit').getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  await p.screenshot({path:`${OUT}/sec-${W}-${V}.png`,clip:{x:0,y:Math.max(0,box.y-12),width:W,height:box.h+24},fullPage:true});
  // vitrine and (if built) the cabinet, for the before/after pixel compare
  for(const s of ['.vt-case','.vt-cab']){const e=await p.$('#x2pVit '+s);if(e)await e.screenshot({path:`${OUT}/px-${W}-${V}-${s.slice(4)}.png`})}
  const m=await p.evaluate(async(CAP)=>{const R=document.querySelector('#x2pVit'),sec=document.querySelector('#record'),o={};const V=window.__x2pVit;
   const cv=document.createElement('canvas').getContext('2d');
   const inkOf=e=>{const tn=[...e.childNodes].filter(c=>c.nodeType===3&&c.nodeValue.trim());const rs=[];let txt='';e.querySelectorAll('*').length;
     const tw=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;txt+=n.nodeValue;const g=document.createRange();g.selectNodeContents(n);rs.push(...[...g.getClientRects()].filter(r=>r.width>0))}
     if(!rs.length)return null;const cs=getComputedStyle(e);cv.font=`${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;let t=txt.trim();if(cs.textTransform==='uppercase')t=t.toUpperCase();
     const mm=cv.measureText(t),fa=mm.fontBoundingBoxAscent,fd=mm.fontBoundingBoxDescent,r0=rs[0],k=r0.height/(fa+fd),base=r0.top+fa*k;
     return {l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right)),t:base-mm.actualBoundingBoxAscent,b:base+mm.actualBoundingBoxDescent}};
   const cen=(e)=>{const I=inkOf(e.querySelector('b')||e),r=e.getBoundingClientRect();return I?{dx:+((I.l+I.r)/2-(r.left+r.right)/2).toFixed(2),dy:+((I.t+I.b)/2-(r.top+r.bottom)/2).toFixed(2)}:null};
   o.cap=R.querySelector('.m7-cap').textContent.replace(/\s+/g,' ').trim();o.capOK=o.cap===CAP;const cr=R.querySelector('.m7-cap').getBoundingClientRect();o.capBox=[Math.round(cr.left),Math.round(cr.right),Math.round(cr.height)];
   o.capInside=cr.left>=0&&cr.right<=innerWidth;
   const G=ROUNDS.filter(r=>r.a!=null&&r.out);o.graded=G.length;
   const day=r=>{const m=String(r.resolves||r.called||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2]):0};
   const want=G.slice().sort((a,b)=>(day(b)-day(a))||(b.n-a.n)).map(r=>r.n);
   o.sw=V.SW;o.cab=!!R.querySelector('.vt-cab');o.belt=!!R.querySelector('.vt-belt');o.deck=!!R.querySelector('.vt-stk');
   o.sideways=document.scrollingElement.scrollWidth-innerWidth;
   const vis=e=>{for(let x=e;x&&x!==document.body;x=x.parentElement){const cs=getComputedStyle(x);if(cs.display==='none'||cs.visibility==='hidden')return false}return e.getClientRects().length>0};
   if(o.belt){const B=R.querySelector('.vt-belt');const ns=[...B.querySelectorAll('.vt-it')].map(i=>+i.dataset.n);o.order=JSON.stringify(ns)===JSON.stringify(want);o.count=ns.length;o.unique=new Set(ns).size===ns.length;
     o.loadedAtStart=B.querySelectorAll('img[src]').length;
     // walk the belt so every slab is seen (loaded and fitted)
     for(let x=0;x<=B.scrollWidth;x+=B.clientWidth*.7){B.scrollLeft=x;await new Promise(r=>setTimeout(r,120))}B.scrollLeft=0;await new Promise(r=>setTimeout(r,200));
     o.loadedAfterWalk=B.querySelectorAll('img[src]').length;
     const its=[...B.querySelectorAll('.vt-it>a.vt-sl')].map(a=>a.getBoundingClientRect());
     const sp=k=>+(Math.max(...its.map(r=>r[k]))-Math.min(...its.map(r=>r[k]))).toFixed(2);o.slabTopSpread=sp('top');o.slabBottomSpread=sp('bottom');o.slabWidthSpread=sp('width');o.slabW=+its[0].width.toFixed(2);
     const days=[...B.querySelectorAll('.vt-day')];o.days=days.length;const dc=days.map(cen);o.dayMaxDx=Math.max(...dc.map(c=>Math.abs(c.dx)));o.dayMaxDy=Math.max(...dc.map(c=>Math.abs(c.dy)));o.dayFirst=days[0].textContent;
     o.bplt=cen(R.querySelector('.vt-bplt'));o.bpltText=R.querySelector('.vt-bplt').textContent;
     const bp=R.querySelector('.vt-bplt').getBoundingClientRect(),bb=B.getBoundingClientRect();
     o.bpltOnBelt={top:+(bp.top-(bb.bottom-parseFloat(getComputedStyle(R.querySelector('.vt-trk')).getPropertyValue('--bh')))).toFixed(1),bottomGap:+(bb.bottom-bp.bottom).toFixed(1)};
     o.trap={sh:B.scrollHeight,ch:B.clientHeight,oy:getComputedStyle(B).overflowY};
     const s=sec.getBoundingClientRect();o.lineInside=bb.left>=s.left-.5&&bb.right<=s.right+.5;
     // the slab labels: no part over another, none under 8px, ink inside the label
     o.lbBad=[];B.querySelectorAll('.vt-lb').forEach(L=>{const lr=L.getBoundingClientRect();const ps=[...L.querySelectorAll('.vt-nm,.vt-tk,.vt-ds,.vt-gr')].filter(vis).map(e=>({e,u:inkOf(e)})).filter(x=>x.u);
       ps.forEach(x=>{if(parseFloat(getComputedStyle(x.e).fontSize)<8)o.lbBad.push('small '+x.e.textContent);if(x.u.l<lr.left-.5||x.u.r>lr.right+.5)o.lbBad.push('out '+x.e.textContent)});
       const nm=ps.find(x=>x.e.classList.contains('vt-nm')),gr=ps.find(x=>x.e.classList.contains('vt-gr'));if(nm&&gr&&nm.u.r>gr.u.l-1.9&&nm.u.b>gr.u.t)o.lbBad.push('collide '+nm.e.textContent)});
     o.lbBad=o.lbBad.slice(0,8);
     const nav=[...R.querySelectorAll('.vt-nv')].map(e=>({t:e.textContent,c:cen(e),h:Math.round(e.getBoundingClientRect().height),off:e.classList.contains('vt-off')}));o.nav=nav;
     o.focusable=[...B.querySelectorAll('a')].filter(a=>a.tabIndex>=0).length;}
   if(o.deck){const S=R.querySelector('.vt-stk'),s=sec.getBoundingClientRect();const it=()=>[...S.querySelectorAll('.vt-it')].filter(e=>!e.classList.contains('vt-fly'));
     const rects=()=>it().map(e=>({p:e.dataset.p,r:e.querySelector('a.vt-sl').getBoundingClientRect()}));const rs=rects();const f=rs.find(x=>x.p==='0').r;
     o.frontDx=+((f.left+f.right)/2-(s.left+s.right)/2).toFixed(2);o.peekDx=rs.filter(x=>x.p!=='0').map(x=>+((x.r.left+x.r.right)/2-(f.left+f.right)/2).toFixed(2));
     o.peekBelow=rs.filter(x=>x.p!=='0').map(x=>+(x.r.bottom-f.bottom).toFixed(2));o.frontW=+f.width.toFixed(1);o.frontH=+f.height.toFixed(1);
     o.touch={front:getComputedStyle(it().find(e=>e.dataset.p==='0')).touchAction,stack:getComputedStyle(S).touchAction,line:getComputedStyle(S.parentNode).touchAction};
     o.trap={sh:S.scrollHeight,ch:S.clientHeight,ov:getComputedStyle(S).overflow};
     o.cnt=R.querySelector('.vt-cnt').textContent;o.cntC=cen(R.querySelector('.vt-cnt'));o.nav=[...R.querySelectorAll('.vt-nv')].map(e=>({t:e.textContent,c:cen(e),h:Math.round(e.getBoundingClientRect().height),off:e.classList.contains('vt-off')}));
     // walk the deck to the end with the deal (instant in the gate) and record every front card
     const seen=[+it().find(e=>e.dataset.p==='0').dataset.n];const N=want.length;
     for(let k=1;k<N;k++){V.LN.deal(1);await new Promise(r=>setTimeout(r,document.documentElement.classList.contains('rm')?0:5));seen.push(+[...S.querySelectorAll('.vt-it')].filter(e=>!e.classList.contains('vt-fly')).find(e=>e.dataset.p==='0').dataset.n)}
     o.order=JSON.stringify(seen)===JSON.stringify(want);o.count=seen.length;o.unique=new Set(seen).size===seen.length;o.cntEnd=R.querySelector('.vt-cnt').textContent;o.olderOffAtEnd=R.querySelector('.vt-ol').classList.contains('vt-off');
     for(let k=1;k<N;k++)V.LN.deal(-1);await new Promise(r=>setTimeout(r,500));o.backToStart=R.querySelector('.vt-cnt').textContent;o.domSlabs=S.querySelectorAll('.vt-it').length;}
   // every visible text in the section: size >= 8
   const tw=document.createTreeWalker(R,NodeFilter.SHOW_TEXT);let n,mn=99,small=[];while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const e=n.parentElement;if(!vis(e)||e.closest('.vt-tag'))continue;const f=parseFloat(getComputedStyle(e).fontSize);if(f<mn)mn=f;if(f<8)small.push(n.nodeValue.trim())}
   o.minFont=mn;o.small=small.slice(0,5);
   return o},CAP);
  // the page scrolls with the wheel over the line (desktop) and with a vertical touch swipe over it (phones)
  const tgt=await p.evaluate(V=>{document.documentElement.style.scrollBehavior='auto';const e=document.querySelector(V==='deck'?'.vt-stk':V==='now'?'.vt-case':'.vt-belt');e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect();
    const S=document.querySelector('.vt-stk');let off=null;if(S){const f=S.querySelector('.vt-it[data-p="0"]').getBoundingClientRect();off={x:Math.max(8,f.left-30),y:f.top+f.height/2}}
    return {x:r.left+r.width/2,y:r.top+r.height/2,off}},V);await p.waitForTimeout(1200);
  const y0=await p.evaluate(()=>scrollY);
  if(!ph){await p.mouse.move(tgt.x,tgt.y);await p.mouse.wheel(0,300);await p.waitForTimeout(500);m.wheelScroll=(await p.evaluate(()=>scrollY))-y0}
  else{const c=await ctx.newCDPSession(p);const at=V==='deck'?tgt.off:tgt;await drag(c,at.x,at.y,at.x,at.y-200);await p.waitForTimeout(900);m.touchScroll=(await p.evaluate(()=>scrollY))-y0;m.touchAt=at}
  if(V==='deck'){// on the card: a sideways swipe deals, an upward swipe opens the round
    const c=ph?await ctx.newCDPSession(p):null;
    const fr=async()=>p.evaluate(()=>{const S=document.querySelector('.vt-stk');S.scrollIntoView({block:'center'});const f=S.querySelector('.vt-it[data-p="0"]').getBoundingClientRect();return {x:f.left+f.width/2,y:f.top+f.height*.6,n:document.querySelector('.vt-cnt').textContent}});
    const sw=async(dx,dy)=>{const f=await fr();await p.waitForTimeout(300);const g=await fr();if(ph)await drag(c,g.x,g.y,g.x+dx,g.y+dy);else{await p.mouse.move(g.x,g.y);await p.mouse.down();for(let i=1;i<=10;i++)await p.mouse.move(g.x+dx*i/10,g.y+dy*i/10);await p.mouse.up()}await p.waitForTimeout(700);return g.n};
    const a0=await sw(-160,0);const a1=(await fr()).n;const b1=await sw(160,0);const b2=(await fr()).n;const h0=await p.evaluate(()=>location.hash);await sw(0,-160);await p.waitForTimeout(600);
    m.swipe={before:a0,afterLeft:a1,afterRight:b2,hashBefore:h0,hashAfterUp:await p.evaluate(()=>location.hash),roundOpen:await p.evaluate(()=>{const e=document.getElementById('x2pRm');return !!e&&getComputedStyle(e).display!=='none'})}}
  m.lift=lift;m.errors=er;m.missing=miss;res[`${W}-${V}`]=m;console.log(W,V,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(`${OUT}/gate.json`,JSON.stringify(res,null,1));await b.close()})();
