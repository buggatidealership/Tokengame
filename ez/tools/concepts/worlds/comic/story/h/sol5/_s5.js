/* Round H13, area sol5: "Smart or lucky?" as the bet's S1 sequence (H12), Silver Age flat print, bright.
   1 E3's mask and coin under the title (the claim: a sure face, a spinning coin behind it).
   2 The instrument: the lie detector visible and doing the work. Its pens (one painted stylus, cut out, placed by code at each
     line's end) write each AI's hit rate round by round on its black smoked-paper strip; the live chart is set on that strip
     (sol3's S3World: (right + 1) / (calls + 2) after every graded round, the switch to P&L Season / 7 days / 24h, the W-L / P&L
     table under the chart, on the strip). The coin-flip line is lettered on the strip. The graded-calls count sits in the
     machine's counter window; its brass plates are engraved.
   3 "Same AI. Same voice." (sol4's two microphones: the hit-rate leader's right call and wrong call of the closest size).
   4 The hook to the bet: the record's strip runs into the vault; the narration caption drawn into that panel carries
     "Only the record shows which call was the guess." and the hand-over to the bet.
   The old plain lines ("Four AIs, N graded calls. A coin flip gets 50%." / "Only the record...") are now on the world:
   counter + plate + strip lettering, or the onlookers' balloons (take v2), or the caption box (beat 4).
   Every number from ROUNDS and __x2pPnl (PN, S3, S4). Classes s5-. */
(function(){
const NM=PN.NM,RS=PN.RS,S3=window.S3,esc=S3.esc,IMG=window.S5IMG,IMG4=window.S4IMG;
const S5=window.S5={};
let calls=0;RS.forEach(r=>calls+=(r.calls||[]).length);S5.calls=calls;
/* the coin flip lettered on the strip, along its own dashed line */
const mat=Object.assign({},polyM,{base:(x0,x1,y,fs)=>`<path d="M${x0.toFixed(1)} ${y.toFixed(1)}H${x1.toFixed(1)}" stroke="#ff5a4e" stroke-width="1.4" stroke-dasharray="6 4" fill="none" shape-rendering="crispEdges"/>`});
/* geometry of the painted blanks, painting px (measure.py, surf.json; checked on ovl/) */
const G={
 ia:{phone:{src:'ia-strip-p2.jpg',iw:768,ih:1024,crop:[0,150,768,1024],surf:[20,188,608,472],gut:.2,grid2:1,counter:[700,262,768,306],ctl:'header',fk:.05,ins:.02},
     wide:{src:'ia-strip-w2.jpg',iw:1280,ih:720,crop:[0,0,1280,720],maxW:1000,surf:[364,112,944,356],gut:.13,fk:.036,counter:[1194,202,1276,236],ctl:'header',fk:.03,ins:.015}},
 ib:{phone:{src:'ib-tape-p3.jpg',iw:768,ih:1024,crop:[0,0,768,1024],surf:[44,368,724,668],grid2:1,bal:[[64,36,332,140],[436,32,700,140]],ctl:'header',fk:.05,ins:.02},
     wide:{src:'ib-tape-w3.jpg',iw:1280,ih:720,crop:[0,0,1280,720],maxW:1000,fk:.036,surf:[260,248,1016,472],bal:[[188,28,584,112],[708,32,1120,112]],ctl:'header',fk:.03,ins:.015}},
 ic:{phone:{src:'ic-window-p2.jpg',iw:768,ih:1024,crop:[0,0,768,1024],surf:[52,324,700,724],gut:.2,grid2:1,counter:[280,788,480,840],plates:[[60,922,200,990],[566,922,708,990]],ctl:'header',fk:.05,ins:.02},
     wide:{src:'ic-window-w2.jpg',iw:1280,ih:720,crop:[0,0,1280,720],maxW:1000,surf:[332,260,940,536],gut:.13,fk:.036,counter:[548,576,728,616],ctl:'header',fk:.03,ins:.015}}};
G.ich={phone:{src:'ic-window-hd-p.jpg',iw:1536,ih:2048,crop:[0,0,1536,2048],surf:[104,652,1400,1448],gut:.2,grid2:1,counter:[564,1572,960,1680],plates:[[120,1850,420,1985],[1130,1850,1430,1985]],ctl:'header',fk:.05,ins:.02},
 wide:{src:'ic-window-hd-w.jpg',iw:2048,ih:1152,crop:[0,0,2048,1152],maxW:1000,surf:[532,416,1504,860],gut:.13,fk:.036,counter:[876,924,1164,988],ctl:'header',ins:.015}};
S5.G=G;/* filled by geo.js from surf.json */
const PEN={src:'pen.png',w:984,h:225,tx:79,ty:224};
/* overlays in stage px: same mapping as S3World (crop scaled to the stage's width) */
const map=(root,C)=>{const st=root.querySelector('.s3-st'),SW=st.clientWidth,s=SW/(C.crop[2]-C.crop[0]);return {st,s,P:(x,y)=>[(x-C.crop[0])*s,(y-C.crop[1])*s]}};
const ov=(M,q,cls,html)=>{const [a,b]=M.P(q[0],q[1]),[c,d]=M.P(q[2],q[3]);return `<div class="${cls}" style="left:${a.toFixed(1)}px;top:${b.toFixed(1)}px;width:${(c-a).toFixed(1)}px;height:${(d-b).toFixed(1)}px">${html}</div>`};
S5.dress=(root,T,C)=>{const M=map(root,C);let lay=root.querySelector('.s5-lay');if(!lay){lay=document.createElement('div');lay.className='s5-lay';M.st.appendChild(lay)}
  let h='';
  /* the pens: one painted stylus per AI, its tip on that AI's line end, its pivot on the rail at the strip's right edge */
  if(C.gut){const sf=root.querySelector('.s3-sf'),sx=parseFloat(sf.style.left),sy=parseFloat(sf.style.top),sw=parseFloat(sf.style.width),px=sx+sw-2,
      ds=[...root.querySelectorAll('.s3-dot')].map(d=>({x:sx+ +d.getAttribute('cx'),y:sy+ +d.getAttribute('cy')})),gap=Math.max(9,sw*.034);
    /* pivots on the rail, in the lines' order, pushed apart so the arms never cross */
    const pv=ds.map((d,i)=>({i,y:d.y})).sort((a,b)=>a.y-b.y);for(let k=1;k<pv.length;k++)if(pv[k].y-pv[k-1].y<gap)pv[k].y=pv[k-1].y+gap;
    const PX=871,PY=-124,L0=Math.hypot(PX,PY),a0=Math.atan2(PY,PX);
    pv.forEach(p=>{const d=ds[p.i],D=Math.hypot(px-d.x,p.y-d.y),k=D/L0,a=Math.atan2(p.y-d.y,px-d.x)-a0;
      h+=`<img class="s5-pen" alt="" src="${IMG+PEN.src}" style="left:${(d.x-PEN.tx*k).toFixed(1)}px;top:${(d.y-PEN.ty*k).toFixed(1)}px;width:${(PEN.w*k).toFixed(1)}px;transform-origin:${(PEN.tx*k).toFixed(1)}px ${(PEN.ty*k).toFixed(1)}px;--r:${(a*180/Math.PI).toFixed(2)}deg;--d:${(p.i*.37).toFixed(2)}s">`})}
  /* the counter window: the graded calls */
  if(C.counter)h+=ov(M,C.counter,'s5-ctr',`<span>${String(calls).split('').map(c=>`<i>${c}</i>`).join('')}</span>`);
  /* engraved brass plates */
  if(C.plates)C.plates.forEach((q,i)=>h+=ov(M,q,'s5-plate',`<span>${esc(T.plates[i])}</span>`));
  /* the onlookers' balloons (v2): the two old plain lines, said by the crowd */
  if(C.bal&&T.react)C.bal.forEach((q,i)=>h+=ov(M,q,'s5-bal s5-bal'+i,`<b>${esc(T.react[i])}</b>`));
  lay.innerHTML=h;fit(lay)};
/* type steps down until each block sits inside its painted blank (measured) */
const fit=el=>el.querySelectorAll('.s5-bal,.s5-plate,.s5-capx,.s5-mb').forEach(b=>{b.style.fontSize='';if(!b.clientHeight)return;let f=parseFloat(getComputedStyle(b).fontSize);for(let k=0;k<30&&(b.scrollWidth>b.clientWidth+1||b.scrollHeight>b.clientHeight+1);k++){f*=.94;b.style.fontSize=f+'px'}});
S5.fit=fit;
/* beat 1: E3 (or E3 with its own balloon, v4) */
const EST={e3:{p:IMG4+'e3-mask-hd-3x4.jpg',w:IMG4+'e3-mask-hd-16x9.jpg'},e3b:{p:IMG+'e3-bal-3x4.jpg',w:IMG+'e3-bal-16x9.jpg',
  bp:[460,48,704,188],bw:[628,96,1180,332]}};
/* beat 4: the strip runs into the vault; the caption box drawn in */
const HOOKH={p:{src:'hook3-hd-p.jpg',iw:1536,ih:2048,cap:[64,60,1468,272]},w:{src:'hook3-hd-w.jpg',iw:2048,ih:1152,cap:[148,56,1920,224]}};
const HOOK={p:{src:'hook3-3x4.jpg',iw:768,ih:1024,cap:[32,32,732,140]},w:{src:'hook3-16x9.jpg',iw:1280,ih:720,cap:[92,36,1200,140]}};
const pctBox=(q,iw,ih)=>`left:${(q[0]/iw*100).toFixed(2)}%;top:${(q[1]/ih*100).toFixed(2)}%;width:${((q[2]-q[0])/iw*100).toFixed(2)}%;height:${((q[3]-q[1])/ih*100).toFixed(2)}%`;
/* beat 3: sol4's two microphones (same geometry, same paintings) */
const MIC={a:{src:'w1-a.jpg',bal:[190,42,830,282],cap:[75,885,955,975]},b:{src:'w1-b.jpg',bal:[290,58,890,300],cap:[100,880,975,970]}};
const say=c=>`${c.r.co} ${c.d==='UP'?'rises':'falls'} ${c.v}%.`,did=c=>`${c.r.a>0?'Rose':'Fell'} ${Math.abs(c.r.a).toFixed(2).replace(/0$/,'')}%.`;
const panel=(k,c,ok)=>{const P=MIC[k];return `<figure class="s4-mic s4-mic-${k}"><img src="${IMG4+P.src}" alt="" decoding="async">
  <div class="s4-bal" style="${pctBox(P.bal,1024,1024)}"><small>${esc(NM[S4.P.m])}, round ${c.r.n}:</small><b>“${esc(say(c))}”</b></div>
  <div class="s4-capb" style="${pctBox(P.cap,1024,1024)}"><span>${esc(did(c))}</span><b class="${ok?'s4-ok':'s4-no'}">${ok?'Right':'Wrong'}</b></div></figure>`};
S5.html=T=>{const E=EST[T.est],wide=innerWidth>=900,HK=T.hd?HOOKH:HOOK,H=wide?HK.w:HK.p,p=S4.P=S4.pair();
 const eb=E.bp?`<div class="s5-mb" style="${pctBox(wide?E.bw:E.bp,wide?1280:768,wide?720:1024)}"><b>${esc(T.mask)}</b></div>`:'';
 return `<div class="s5-b1"><figure class="s5-est"><img src="${wide?E.w:E.p}" alt="" decoding="async">${eb}</figure>
  <h2 class="s3-h s5-h"><span class="s3-w">Smart or</span> <span class="s3-w s3-w2">lucky?</span></h2></div>
 <div class="s5-b2"></div>
 <div class="s5-b3">${p?`<p class="s4-cap s4-cap3">Same AI. Same voice.</p><div class="s4-strip">${panel('a',p.right,true)}${panel('b',p.wrong,false)}</div>`:''}</div>
 <figure class="s5-b4"><img src="${IMG+H.src}" alt="" decoding="async"><div class="s5-capx" style="${pctBox(H.cap,H.iw,H.ih)}"><span>${esc(T.cap1)}</span><b>${esc(T.cap2)}</b></div></figure>`};
S5.mount=function(T){const sp=document.querySelector('.wc-splash');if(!sp)return;document.documentElement.classList.add('pn-on','s3-on','s4-on','s5-on');
  sp.setAttribute('aria-label','Smart or lucky?');sp.querySelectorAll(':scope>.hs-wrap').forEach(e=>e.style.setProperty('display','none','important'));
  sp.insertAdjacentHTML('beforeend',`<div class="s5 s4 s3 s5-${T.id}">${S5.html(T)}</div>`);sp.querySelector(':scope>.s5').style.setProperty('display','block','important');
  const g=G[T.inst],W=S3World({id:T.inst,kind:'top',img:IMG,mat,phone:g.phone,wide:g.wide});
  const b2=sp.querySelector('.s5-b2');b2.insertAdjacentHTML('beforeend',`<div class="pn s3-root">${W.html()}</div>`);const root=b2.querySelector('.s3-root');root.style.setProperty('display','block','important');
  const set=(wid,anim)=>{root.dataset.win=wid;W.draw(root,wid,anim);S5.dress(root,T,innerWidth>=900?g.wide:g.phone)};
  root.addEventListener('click',e=>{const b=e.target.closest('[data-win]');if(b){root.dataset.used='1';set(b.dataset.win,true)}});
  set(window.S3_WIN||'hit',false);fit(sp);sp.querySelectorAll('.s5 img').forEach(i=>i.complete?0:i.addEventListener('load',()=>fit(sp)));document.fonts.ready.then(()=>fit(sp));let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;set(root.dataset.win,false);fit(sp)}});
  window.S3set=set};
})();
