// cover6 engine: a painted plate per scene (cover / inside), live page text set into the blank surfaces painted for it,
// positions in % of the painting (so text stays on its surface whatever the crop), scroll-driven opening per take.
(function(){
const fmt$=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
function data(){
  const R=ROUNDS,N=R.length,last=R[N-1],P={};
  for(const r of R)for(const [m,c] of r.calls){if(!c)continue;P[m]=(P[m]||0)+100000*(/UP/.test(c)?1:-1)*r.a/100}
  const lead=Object.keys(P).sort((a,b)=>P[b]-P[a])[0];
  const calls=last.calls.filter(c=>c[1]).map(([m,c,off])=>{const up=/UP/.test(c);const v=c.replace(/UP |DOWN /,'');return {m,nm:NM[m],up,v,ok:up===(last.a>0),off:+off}});
  const nx=(typeof UPCOMING!=='undefined'&&UPCOMING[0])||null;
  const nxAll=nx?UPCOMING.filter(u=>u.resolves===nx.resolves):[];
  const md=s=>{const [m,d]=s.split('/');return ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][m-1]+' '+(+d)};
  return {N,last,lead,leadNm:NM[lead],leadPnl:fmt$(P[lead]),P,calls,win:last.win,winNm:NM[last.win]||last.win,
    close:last.out,closeUp:last.a>0,co:last.co,tk:last.ticker,locked:md(last.called),graded:md(last.resolves),
    next:nx?{date:md(nx.resolves),cos:nxAll.map(u=>u.ticker),names:nxAll.map(u=>u.co)}:null};
}
const C6={D:null,take:null,items:[]};
function el(t,c,h){const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
// build one scene from {img:{p,l}, ar:{p,l}, f:{p:[fx,fy],l:[fx,fy]}, items:{p:[...],l:[...]}}
function build(scene,spec,mode){
  scene.innerHTML='';const pl=el('div','plate');pl.dataset.ar=spec.ar[mode];
  const im=el('img','pi');im.src=spec.img[mode];im.alt='';pl.appendChild(im);
  for(const it of (spec.items[mode]||[])){
    const hh=typeof it.h==='function'?it.h(C6.D):it.h;const e=el('div','it '+(it.c||''),it.svg||it.cut||!hh?hh:`<div class="in">${hh}</div>`);if(it.svg)e.dataset.svg=it.svg;
    Object.assign(e.style,{left:it.x+'%',top:it.y+'%',width:it.w+'%',height:it.h2+'%'});
    let tf='';if(it.p)tf+=it.p+' ';if(it.r)tf+=`rotate(${it.r}deg) `;if(it.sk)tf+=`skewY(${it.sk}deg) `;if(tf)e.style.transform=tf;
    if(it.cut){Object.assign(e.style,{backgroundImage:`url(${spec.img[mode]})`,backgroundSize:`${10000/it.w}% ${10000/it.h2}%`,
      backgroundPosition:`${it.x/(100-it.w)*100}% ${it.y/(100-it.h2)*100}%`,clipPath:it.clip||'none',transformOrigin:it.o||'50% 0'})}
    if(it.id)e.id=it.id;if(it.fs)e.dataset.fs=it.fs;if(it.label)e.dataset.on=it.label;
    pl.appendChild(e);C6.items.push({scene:scene.id,mode,text:e.textContent.trim(),on:it.on||'',c:it.c||''});
  }
  scene.appendChild(pl);return pl;
}
function fit(scene,spec,mode){
  const pl=scene.querySelector('.plate');if(!pl)return;const [aw,ah]=spec.ar[mode].split(':').map(Number);
  const W=scene.clientWidth,H=scene.clientHeight,k=(W/aw*ah<=H*1.02||mode==='p'?W/aw:Math.max(W/aw,H/ah))*(spec.zoom&&spec.zoom[mode]||1);scene.style.setProperty('--bgimg',`url(${spec.img[mode]})`);
  const pw=aw*k,ph=ah*k,[fx,fy]=(spec.f&&spec.f[mode])||[.5,.5];
  let x=W/2-pw*fx,y=H/2-ph*fy;x=Math.min(0,Math.max(W-pw,x));y=Math.min(0,Math.max(H-ph,y));
  Object.assign(pl.style,{width:pw+'px',height:ph+'px',left:x+'px',top:y+'px'});
  // fit text: start at data-fs (fraction of plate width) and shrink until the words fit their surface
  for(const e of pl.querySelectorAll('.it')){if(e.matches('.film,.cut,.tape,.curl'))continue;
    let fs=(+e.dataset.fs||.05)*pw;e.style.fontSize=fs+'px';let n=0;
    while((e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)&&fs>6&&n<60){fs*=.95;e.style.fontSize=fs+'px';n++}}
}
function mount(t){
  C6.D=data();const T=TAKES[t];C6.take=T;document.documentElement.classList.add('t-'+t);
  const cv=document.getElementById('cover'),ins=document.getElementById('inside'),st=document.getElementById('stage');
  st.style.height=(100+(T.run||160))+'vh';
  let mode='';const doFit=()=>{const m=innerWidth<700?'p':'l';if(m!==mode){mode=m;C6.items=[];build(cv,T.cover,m);build(ins,T.inside,m);T.after&&T.after(cv,ins,m,C6.D)}
    fit(cv,T.cover,mode);fit(ins,T.inside,mode);T.layout&&T.layout(cv,ins,mode);onS()};
  const onS=()=>{const r=st.getBoundingClientRect(),run=st.offsetHeight-innerHeight;const p=Math.min(1,Math.max(0,-r.top/run));
    document.documentElement.style.setProperty('--p',p.toFixed(4));document.documentElement.classList.toggle('c6-open',p>.02);T.open(p,cv,ins,mode)};
  addEventListener('resize',doFit);addEventListener('scroll',onS,{passive:true});
  document.fonts.ready.then(doFit);doFit();
  // a tap on the marked object opens the book (same as scrolling)
  cv.addEventListener('click',e=>{if(e.target.closest('.hot'))scrollTo({top:st.offsetTop+(st.offsetHeight-innerHeight)*.98,behavior:'smooth'})});
  window.__c6={take:t,D:C6.D,items:()=>C6.items};
  requestAnimationFrame(()=>document.documentElement.classList.add('c6-ready'));
}
C6.mount=mount;window.C6=C6;
})();
