/* Round H14, area sol6: a second pass on sol5's "Smart or lucky?" (owner, 2026-11-01):
   1 E3 (the coin behind the mask) kept, about a third smaller: either cropped to two thirds of its height (est:'crop') or two thirds
     of the column's width with the title stacked beside it (est:'side').
   2 The lie detector reads as a polygraph: a new plate (q2b) where the hero is the tall blank paper strip; four painted pen arms
     (pen2.png, cut out of magenta) pivot on the machine's brass rail, each nib on its AI's line end, trembling; the strip moves
     (its printed timing ticks run off to the left, the one small loop) while the written lines stay still.
   3 The plain line "Four AIs, N graded calls. A coin flip gets 50%." is a hand-lettered comic narration caption at the plate's
     top-left corner, overlapping the plate's frame (the owner's sketch, lesson 105). Three letterings (cap:'l1'|'l2'|'l3') and
     placements (pos:'straddle'|'tuck'|'hang'). Its numbers are page text: N summed from ROUNDS' calls, "Four" from the cast.
   4 "Same AI. Same voice." as sol4/sol5 had it; "Only the record shows which call was the guess." is now a caption on that panel
     strip's bottom-right corner (the closing caption, where comics put it).
   5 The hook into the bet: sol5's painting, its caption now one line (the hand-over).
   Every number from ROUNDS and __x2pPnl (PN, S3, S4). Classes s6-. Reuses S3World (sol5's _s3b.js) and sol4's beat-3 panels. */
(function(){
const NM=PN.NM,MS=PN.MS,RS=PN.RS,S3=window.S3,esc=S3.esc,IMG=window.S6IMG,IMG4=window.S4IMG,IMG5=window.S5IMG;
const S6=window.S6={};
let calls=0;RS.forEach(r=>calls+=(r.calls||[]).length);S6.calls=calls;
const WORD=['Zero','One','Two','Three','Four','Five','Six','Seven','Eight'][MS.length]||String(MS.length);
const mat=Object.assign({},polyM,{base:(x0,x1,y,fs)=>`<path d="M${x0.toFixed(1)} ${y.toFixed(1)}H${x1.toFixed(1)}" stroke="#ff5a4e" stroke-width="1.4" stroke-dasharray="6 4" fill="none" shape-rendering="crispEdges"/>`});
/* the plates, painting px. surf = the empty black strip (measure.py, surf.json, checked on ovl/); rail = the brass pen rail's x;
   ticks = the strip's inner top and bottom bands where the timing ticks run. */
const G={
 q2b:{phone:{src:'q2-front-b-3x4.jpg',iw:768,ih:1024,crop:[20,150,715,950],surf:[40,424,656,712],rail:684,gut:.28,grid2:1,grid4:1,lean:1,ctl:'header',fk:.044,ins:.02},
      wide:{src:'q2b-16x9.jpg',iw:1280,ih:720,crop:[250,60,1010,600],maxW:1000,surf:[320,324,916,536],rail:930,gut:.17,lean:1,fk:.034,ctl:'header',ins:.015}},
 q2bh:{phone:{src:'q2b-hd-3x4.jpg',iw:1536,ih:2048,crop:[40,300,1430,1900],surf:[76,856,1324,1424],rail:1360,gut:.28,grid2:1,grid4:1,lean:1,ctl:'header',fk:.044,ins:.02},
      wide:{src:'q2b-16x9.jpg',iw:1280,ih:720,crop:[250,60,1010,600],maxW:1000,surf:[320,324,916,536],rail:930,gut:.17,lean:1,fk:.034,ctl:'header',ins:.015}},
 q1a:{phone:{src:'q1-top-a-3x4.jpg',iw:768,ih:1024,crop:[0,96,768,1024],surf:[0,240,580,584],rail:604,gut:.25,grid2:1,ctl:'header',fk:.05,ins:.02},
      wide:{src:'q1-top-a-3x4.jpg',iw:768,ih:1024,crop:[0,96,768,1024],maxW:760,surf:[0,240,580,584],rail:604,gut:.2,ctl:'header',fk:.036,ins:.015}}};
S6.G=G;
/* pen2.png: nib at (2,58), pivot hub at (1158,52), sprite 1182 x 96 */
const PEN={src:'pen2.png',w:1182,h:96,tx:2,ty:58,px:1158,py:52};
const map=(root,C)=>{const st=root.querySelector('.s3-st'),SW=st.clientWidth,s=SW/(C.crop[2]-C.crop[0]);return {st,s,P:(x,y)=>[(x-C.crop[0])*s,(y-C.crop[1])*s]}};
/* a hand-drawn box: a wobbly outline (seeded, so it is the same on every draw), thick outer ink, thin inner line */
const rnd=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
const wob=(w,h,j,seed,ins)=>{const r=rnd(seed),i=ins||0,pts=[];const side=(x0,y0,x1,y1,n)=>{for(let k=0;k<n;k++){const t=k/n;pts.push([x0+(x1-x0)*t+(r()-.5)*j*(k?1:.4),y0+(y1-y0)*t+(r()-.5)*j*(k?1:.4)])}};
  const n=Math.max(3,Math.round(w/70));side(i,i,w-i,i,n);side(w-i,i,w-i,h-i,2);side(w-i,h-i,i,h-i,n);side(i,h-i,i,i,2);
  return 'M'+pts.map(p=>p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' L')+'Z'};
S6.box=(el,o)=>{const w=el.offsetWidth,h=el.offsetHeight;if(!w)return;let sv=el.querySelector(':scope>svg.s6-bx');if(!sv){sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','s6-bx');sv.setAttribute('aria-hidden','true');el.prepend(sv)}
  const sh=o.sh||5;sv.setAttribute('viewBox',`${-sh} ${-sh} ${w+2*sh} ${h+2*sh}`);sv.style.cssText=`left:${-sh}px;top:${-sh}px;width:${w+2*sh}px;height:${h+2*sh}px`;
  const a=wob(w,h,o.j||3,o.seed||7),b=wob(w,h,(o.j||3)*.6,(o.seed||7)+3,o.in||5);
  sv.innerHTML=`<path d="${a}" transform="translate(${sh*.8} ${sh})" fill="#0d0b10"/><path d="${a}" fill="${o.fill}" stroke="#0d0b10" stroke-width="${o.lw||3.2}" stroke-linejoin="round"/>`+
   (o.fill2?`<path d="${a}" fill="${o.fill2}" clip-path="none" style="clip-path:inset(55% 0 0 0)"/><path d="${a}" fill="none" stroke="#0d0b10" stroke-width="${o.lw||3.2}" stroke-linejoin="round"/>`:'')+
   `<path d="${b}" fill="none" stroke="#0d0b10" stroke-width="${o.lw2||1}" stroke-linejoin="round" opacity=".85"/>`};
/* the caption's words: numbers are page text */
const capHTML=(T)=>{const n=`<b class="s6-n">${calls}</b>`;
  if(T.cap==='l1')return `<span>${WORD.toUpperCase()} AIs, ${n} GRADED CALLS.</span> <span>A COIN FLIP GETS <b class="s6-n s6-r">50%</b>.</span>`;
  if(T.cap==='l3')return `<span class="s6-k">${WORD} AIs.</span> <span class="s6-big">${n} graded calls.</span> <span class="s6-k2">A coin flip gets <b class="s6-r">50%</b>.</span>`;
  return `<span>${WORD} AIs, ${n} graded calls.</span> <span>A coin flip gets <b class="s6-r">50%</b>.</span>`};
const BOX={l1:{fill:'#ffd21f',j:2.6,seed:11,lw:3.4},l2:{fill:'#fff3c4',j:3.4,seed:5,lw:3},l3:{fill:'#ff3a31',j:2.2,seed:19,lw:3.6,in:6}};
const fit=el=>el.querySelectorAll('.s6-cap>p,.s6-cap2>p,.s5-capx').forEach(b=>{b.style.fontSize='';const box=b.parentElement.classList.contains('s5-capx')?b:b.parentElement;if(!box.clientHeight)return;let f=parseFloat(getComputedStyle(b).fontSize);
  for(let k=0;k<30&&(b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1);k++){f*=.95;b.style.fontSize=f+'px'}});
S6.fit=fit;
S6.dress=(root,T,C)=>{const M=map(root,C);let lay=root.querySelector('.s6-lay');if(!lay){lay=document.createElement('div');lay.className='s6-lay';M.st.appendChild(lay)}
  let h='';const sf=root.querySelector('.s3-sf'),sx=parseFloat(sf.style.left),sy=parseFloat(sf.style.top),sw=parseFloat(sf.style.width),sh=parseFloat(sf.style.height);
  /* the moving strip: printed timing ticks along its top and bottom edges run off to the left (the chart stays still) */
  h+=`<div class="s6-tk" style="left:${sx}px;top:${sy-2}px;width:${sw}px"></div><div class="s6-tk s6-tkb" style="left:${sx}px;top:${(sy+sh-5).toFixed(1)}px;width:${sw}px"></div>`;
  /* the pens: one painted arm per AI, its nib on that AI's line end, its pivot on the brass rail, pushed apart so arms never cross */
  if(C.gut){const rx=C.rail!=null?M.P(C.rail,0)[0]:sx+sw+4,ds=[...root.querySelectorAll('.s3-dot')].map(d=>({x:sx+ +d.getAttribute('cx'),y:sy+ +d.getAttribute('cy')})),gap=Math.max(11,sh*.07);
    const pv=ds.map((d,i)=>({i,y:d.y})).sort((a,b)=>a.y-b.y);for(let k=1;k<pv.length;k++)if(pv[k].y-pv[k-1].y<gap)pv[k].y=pv[k-1].y+gap;
    const mid=pv.reduce((a,p)=>a+p.y,0)/pv.length,want=sy+sh*.46;pv.forEach(p=>p.y+=(want-mid)*.35);
    const VX=PEN.px-PEN.tx,VY=PEN.py-PEN.ty,L0=Math.hypot(VX,VY),a0=Math.atan2(VY,VX);
    pv.forEach(p=>{const d=ds[p.i],D=Math.hypot(rx-d.x,p.y-d.y),k=D/L0,a=Math.atan2(p.y-d.y,rx-d.x)-a0;
      h+=`<img class="s6-pen" alt="" src="${IMG+PEN.src}" style="left:${(d.x-PEN.tx*k).toFixed(1)}px;top:${(d.y-PEN.ty*k).toFixed(1)}px;width:${(PEN.w*k).toFixed(1)}px;transform-origin:${(PEN.tx*k).toFixed(1)}px ${(PEN.ty*k).toFixed(1)}px;--r:${(a*180/Math.PI).toFixed(2)}deg;--d:${(p.i*.31).toFixed(2)}s">`+
        `<i class="s6-ink" style="left:${(d.x-2).toFixed(1)}px;top:${(d.y-2).toFixed(1)}px;--d:${(p.i*.31).toFixed(2)}s"></i>`})}
  lay.innerHTML=h;
  /* the caption on the plate's top-left corner, outside the stage (the stage clips), overlapping its frame */
  const b2=root.closest('.s5-b2'),cap=b2.querySelector('.s6-cap');if(cap){const st=M.st,o=st.offsetLeft,wide=innerWidth>=900;
    const P={straddle:{x:-8,y:-.55,w:.66},tuck:{x:-6,y:-.12,w:.62},hang:{x:-9,y:-.8,w:.6}}[T.pos||'straddle'];
    cap.style.width=Math.round(st.clientWidth*(wide?P.w*.62:P.w))+'px';cap.style.left=(o+P.x)+'px';cap.style.visibility='hidden';cap.style.top='0';
    requestAnimationFrame(()=>{fit(b2);cap.style.top=Math.round(P.y*cap.offsetHeight)+'px';S6.box(cap,BOX[T.cap]);cap.style.visibility='';b2.style.marginTop=Math.max(18,Math.round(-P.y*cap.offsetHeight+16))+'px'})}};
const EST={p:IMG4+'e3-mask-hd-3x4.jpg',w:IMG4+'e3-mask-hd-16x9.jpg'};
const HOOK={p:{src:'hook3-hd-p.jpg',iw:1536,ih:2048,cap:[64,60,1468,272]},w:{src:'hook3-hd-w.jpg',iw:2048,ih:1152,cap:[148,56,1920,224]}};
const pctBox=(q,iw,ih)=>`left:${(q[0]/iw*100).toFixed(2)}%;top:${(q[1]/ih*100).toFixed(2)}%;width:${((q[2]-q[0])/iw*100).toFixed(2)}%;height:${((q[3]-q[1])/ih*100).toFixed(2)}%`;
const MIC={a:{src:'w1-a.jpg',bal:[190,42,830,282],cap:[75,885,955,975]},b:{src:'w1-b.jpg',bal:[290,58,890,300],cap:[100,880,975,970]}};
const say=c=>`${c.r.co} ${c.d==='UP'?'rises':'falls'} ${c.v}%.`,did=c=>`${c.r.a>0?'Rose':'Fell'} ${Math.abs(c.r.a).toFixed(2).replace(/0$/,'')}%.`;
const panel=(k,c,ok)=>{const P=MIC[k];return `<figure class="s4-mic s4-mic-${k}"><img src="${IMG4+P.src}" alt="" decoding="async">
  <div class="s4-bal" style="${pctBox(P.bal,1024,1024)}"><small>${esc(NM[S4.P.m])}, round ${c.r.n}:</small><b>“${esc(say(c))}”</b></div>
  <div class="s4-capb" style="${pctBox(P.cap,1024,1024)}"><span>${esc(did(c))}</span><b class="${ok?'s4-ok':'s4-no'}">${ok?'Right':'Wrong'}</b></div></figure>`};
const title=`<h2 class="s3-h s5-h s6-h"><span class="s3-w">Smart or</span> <span class="s3-w s3-w2">lucky?</span></h2>`;
S6.html=T=>{const wide=innerWidth>=900,H=wide?HOOK.w:HOOK.p,p=S4.P=S4.pair();
 const b1=T.est==='side'?`<div class="s6-b1 s6-side"><figure class="s5-est s6-est"><img src="${EST.p}" alt="" decoding="async"></figure>${title}</div>`
   :`<div class="s6-b1 s6-crop"><figure class="s5-est s6-est"><img src="${wide?EST.w:EST.p}" alt="" decoding="async"></figure>${title}</div>`;
 return `${b1}
 <div class="s5-b2 s6-b2"><div class="s6-cap s6-${T.cap}" role="note"><p>${capHTML(T)}</p></div></div>
 <div class="s5-b3 s6-b3">${p?`<p class="s4-cap s4-cap3">Same AI. Same voice.</p><div class="s6-sw"><div class="s4-strip">${panel('a',p.right,true)}${panel('b',p.wrong,false)}</div>
  <div class="s6-cap2 s6-${T.cap}"><p>${T.cap==='l1'?'ONLY THE RECORD SHOWS WHICH CALL WAS THE GUESS.':'Only the record shows which call was the guess.'}</p></div></div>`:''}</div>
 <figure class="s5-b4"><img src="${IMG5+H.src}" alt="" decoding="async"><div class="s5-capx s6-capx" style="${pctBox(H.cap,H.iw,H.ih)}"><b>So the pool goes on the call of the AI on top.</b></div></figure>`};
S6.mount=function(T){const sp=document.querySelector('.wc-splash');if(!sp)return;document.documentElement.classList.add('pn-on','s3-on','s4-on','s5-on','s6-on');
  sp.setAttribute('aria-label','Smart or lucky?');sp.querySelectorAll(':scope>.hs-wrap').forEach(e=>e.style.setProperty('display','none','important'));
  sp.insertAdjacentHTML('beforeend',`<div class="s5 s4 s3 s6 s6-${T.id}">${S6.html(T)}</div>`);sp.querySelector(':scope>.s5').style.setProperty('display','block','important');
  const g=G[T.inst],W=S3World({id:T.inst,kind:'top',img:IMG,mat,phone:g.phone,wide:g.wide||g.phone});
  const b2=sp.querySelector('.s5-b2');b2.insertAdjacentHTML('beforeend',`<div class="pn s3-root">${W.html()}</div>`);const root=b2.querySelector('.s3-root');root.style.setProperty('display','block','important');
  const set=(wid,anim)=>{root.dataset.win=wid;W.draw(root,wid,anim);S6.dress(root,T,innerWidth>=900&&g.wide?g.wide:g.phone)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b){root.dataset.used='1';set(b.dataset.win,true)}});
  const caps=()=>{sp.querySelectorAll('.s6-cap2').forEach(c=>S6.box(c,Object.assign({},BOX[T.cap],{seed:BOX[T.cap].seed+20})))};
  set(window.S3_WIN||'hit',false);fit(sp);caps();sp.querySelectorAll('.s6 img').forEach(i=>i.complete?0:i.addEventListener('load',()=>{fit(sp);caps()}));document.fonts.ready.then(()=>{set(root.dataset.win,false);fit(sp);caps()});
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;set(root.dataset.win,false);fit(sp);caps()}});
  window.S3set=set;S6.refit=()=>{set(root.dataset.win,false);fit(sp);caps()}};
})();
