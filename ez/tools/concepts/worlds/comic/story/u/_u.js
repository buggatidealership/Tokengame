/* helper u (2026-10-30): Upcoming, T1's poster wall kept (one grid, a date block per night, the main event a double cell, the same packing),
   every card redrawn as a comic panel by the take in window.UU: UU.cls, UU.lock(x,c) for a card with its calls in, UU.wait(x,c) for one without.
   Data from helper t's TT (which reads helper e's SE): every number, colour and logo from the page. Loaded after _st.js and the take's file. */
(async function(){const T=TT,S=T.S,esc=T.esc,U=window.UU;const root=T.mount('uu '+U.cls);if(!root){T.ready();return}
const {L,days}=T.data();await T.prep(L);const C=T.counts(L);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
/* shared bits every take uses */
const H=window.UH={
  /* the company: its logo on its printed plate, its name lettered as the panel's title, the round as the issue number */
  head:(x,c)=>`<span class="uu-hd">${T.lg(x.ticker,c.main?c.big:c.box)}<span class="uu-tt"><b class="uu-nm">${esc(x.co)}</b>${c.main?`<small class="uu-tk">${esc(S.tk(x.ticker))}</small>`:''}</span><span class="uu-no">R${x.n}${!c.main&&T.tag(x)?`<em>${T.tag(x)}</em>`:''}</span></span>`,
  cap:(x,c)=>c.main?`<span class="uu-cap" aria-hidden="true">★ Main event${T.tag(x)?' · '+T.tag(x):''} ★</span>`:'',
  sg:c=>(c.dir==='UP'?'+':'−')+c.mag+'%',
  ar:c=>c.dir==='UP'?'▲':'▼',
  sr:(x)=>`<span class="wc-sr">${esc(x.co)}, round ${x.n}. ${x.calls.map(c=>T.NM[c.m]+' says '+(c.dir==='UP'?'up ':'down ')+c.mag+'%').join('. ')}.</span>`,
  srw:(x)=>`<span class="wc-sr">${esc(x.co)}, round ${x.n}. Calls due ${T.due(x)}.</span>`,
  bull:'<i class="uu-em" aria-hidden="true">🐂</i>',bear:'<i class="uu-em" aria-hidden="true">🐻</i>',
  notch:'<i class="uu-nl" aria-hidden="true"></i><i class="uu-nr" aria-hidden="true"></i>',
  no:(x)=>`<b class="uu-n">#${x.n}</b><small class="uu-t">${esc(S.tk(x.ticker))}</small>`,
  /* a round whose calls are not in: the four characters on the stub, each thinking it over */
  think:(x)=>`<span class="uu-th">${T.ORDER.map(m=>`<span class="uu-tc">${S.face(m)}<i class="uu-tq" aria-hidden="true">?</i></span>`).join('')}</span>`,
  dueCap:(x)=>`<span class="uu-due">Calls due ${esc(T.dueS(x))}</span>`
};
const attrs=(x,cls,day)=>`class="uu-p ${U.cls}-c ${cls}${x.locked?' uu-l':' uu-o'}${x.nv?' uu-nv':''}" href="#/round/${x.n}" data-t="${esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" data-day="${day}" data-split="${x.up}v${x.dn}" style="${T.bv(x.ticker)}"`;
function card(x,day,main){const desk=innerWidth>=1000,c={main,desk,big:main?(innerWidth>=1200?104:desk?92:60):0,box:desk?40:main?52:32};
  c.art=(cls,extra,inner)=>`<span class="uu-art ${cls||''}" data-t="${esc(x.ticker)}" ${extra||''}>${inner||''}</span>`;
  return `<a ${attrs(x,main?'uu-m':'uu-u',day)}${main?' data-main="1"':''}>${H.cap(x,c)}${x.locked?U.lock(x,c):U.wait(x,c)}</a>`}
function date(k,items,day){const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,n=items.length;
  if(k==='wait')return `<div class="uu-dt uu-dw" data-day="${day}" role="heading" aria-level="2"><span class="uu-dk">On hold</span><b class="uu-dn">?</b><span class="uu-dm">Dates passed</span><span class="uu-ds">${n} round${n>1?'s':''} · calls not in yet</span></div>`;
  const p=S.pd(k),b=lk?T.bell(items[0]):'';
  return `<div class="uu-dt${l.a==='Today'?' uu-now':''}" data-day="${day}" role="heading" aria-level="2" aria-label="${esc(l.a+', '+l.b)}"><span class="uu-dk">${esc(l.a==='Today'||l.a==='Tomorrow'?l.a:S.wd(k,1))}</span><b class="uu-dn">${p.d}</b><span class="uu-dm">${MON[p.m-1]} · ${S.wd(k)}</span>
    <span class="uu-ds">${n} round${n>1?'s':''}${lk?' · '+(lk===n?'all':lk)+' locked':''}</span><span class="uu-dl">${lk?(b?esc(b):'Graded at the close'):'Calls due '+T.dueS(items[0])+'. Graded at the next close.'}</span></div>`}
function draw(){
  let h=`<header class="uu-mast"><div><div class="uu-ttl" role="heading" aria-level="1">Next on the card</div><p class="uu-sub">Every AI picks a side <b>before</b> the company reports. The next close settles it.</p></div>
    <div class="uu-mt2"><p class="uu-cnt"><span><b>${C.lk}</b> locked</span><span><b>${C.to}</b> still to call</span></p>${T.flt()}</div></header><div class="uu-wall">`;
  days.forEach(({k,items},di)=>{h+=date(k,items,di);items.forEach((x,i)=>{h+=card(x,di,i===0&&k!=='wait')})});
  root.innerHTML=h+'</div>';T.wire(root,()=>{pack();paint()});pack();U.after&&U.after(root);paint()}
/* every picture: the company's own mark painted the way "Every round so far" paints it (SA.uuG = helper m's M3, newsprint and pen),
   on a canvas the size of its box at the screen's pixel ratio; a take can move the mark (data-k, data-cx, data-cy) or split the dot screen (data-sp) */
let pq=Promise.resolve();
function paint(){pq=pq.then(async()=>{await new Promise(r=>requestAnimationFrame(r));const P=SA.uuG,dpr=devicePixelRatio||1,LG=window.CO_LOGOS||{};
  for(const el of root.querySelectorAll('.uu-art[data-t]')){if(!T.vis(el))continue;const bb=el.getBoundingClientRect();if(bb.width<4)continue;
    const W=Math.round(bb.width*dpr),Hh=Math.round(bb.height*dpr),old=el.querySelector('img.uu-cv');if(old&&el.dataset.pw===W+'x'+Hh)continue;el.dataset.pw=W+'x'+Hh;
    const t=el.dataset.t,src=S.logo(t);if(!src)continue;const im=await P.load(src);if(!im)continue;const lg=LG[t]||{};
    const B=P.hex((await SA.pal(src))||(await SA.pal(src,.15))||(lg.c&&lg.c!=='#12131a'?lg.c:'#2b2733'));
    const c=P.cv(W,Hh);c.className='uu-cv';c.setAttribute('aria-hidden','true');
    const mk=P.mark(im,lg.dark);let k=+el.dataset.k||.7;const sc=Math.min(W*k/mk.width,Hh*k/mk.height);
    /* never draw the mark past its own pixels (lesson 60): shrink the mark rather than blow the file up */
    if(sc>1)k/=sc;el.dataset.ratio=Math.min(W*k/mk.width,Hh*k/mk.height).toFixed(2);
    window.__uuK=k;window.__uuCx=+el.dataset.cx||0;window.__uuCy=+el.dataset.cy||0;
    const sp=el.dataset.sp;window.__uuB=sp?((u,v)=>{const [a,b]=sp.split(',').map(Number);/* the seam leans: a at the top, b at the foot */return u<a+(b-a)*v?[19,163,90]:[224,53,45]}):null;
    try{P.G[el.dataset.g||'m3'](c.getContext('2d'),W,Hh,mk,B,P.rnd(P.hash(t+'m3')))}finally{window.__uuK=window.__uuCx=window.__uuCy=0;window.__uuB=null}
    /* kept as an image, not a live canvas: forty canvases at twice the pixels get evicted by the browser and paint blank */
    const blob=await new Promise(r=>c.toBlob(r));const im2=new Image();im2.className='uu-cv';im2.alt='';im2.setAttribute('aria-hidden','true');im2.width=W;im2.height=Hh;im2.src=URL.createObjectURL(blob);await im2.decode().catch(()=>{});
    if(old){URL.revokeObjectURL(old.src);old.remove()}el.prepend(im2)}
  H2.classList.add('uu-painted')}).catch(e=>console.error(e))}
const H2=document.documentElement;
/* T1's packing; a card with its calls in is as wide as the take asks (UU.span: cells on phone / desktop) */
function pack(){const w=root.querySelector('.uu-wall');if(!w)return;const cols=getComputedStyle(w).gridTemplateColumns.split(' ').length;
  const occ=[];const free=(r,c,wd,ht)=>{if(c+wd>cols)return false;for(let i=0;i<ht;i++)for(let j=0;j<wd;j++)if((occ[r+i]||[])[c+j])return false;return true};
  const put=(r,c,wd,ht)=>{for(let i=0;i<ht;i++){occ[r+i]=occ[r+i]||[];for(let j=0;j<wd;j++)occ[r+i][c+j]=1}};
  let cr=0,cc=0;const place=(wd,ht)=>{let r=cr,c=cc;for(;;){if(free(r,c,wd,ht)){put(r,c,wd,ht);cr=r;cc=c+wd;return [r,c]}c++;if(c>=cols){c=0;r++}}};
  const peek=(wd,ht)=>{let r=cr,c=cc;for(;;){if(free(r,c,wd,ht))return [r,c];c++;if(c>=cols){c=0;r++}}};
  const kids=[...w.children].filter(T.vis);
  kids.forEach((e,i)=>{e.style.gridColumn='';e.style.gridRow='';let wd=1,ht=1;
    if(e.classList.contains('uu-dt')){if(cols<=2)wd=cols;else{const nx=kids[i+1],nm=nx&&nx.classList.contains('uu-m');
        if(nm){const [r,c]=peek(1,1);const left=cols-(c+1);if(left===1)wd=2}}}
    else if(e.classList.contains('uu-m')){wd=Math.min(2,cols);ht=cols>2&&e.classList.contains('uu-l')?2:1}
    else if(e.classList.contains('uu-l')){wd=Math.min(cols,cols<=2?(U.spanP||1):(U.spanD||1))}
    e.style.gridColumn='span '+wd;if(ht>1)e.style.gridRow='span '+ht;place(wd,ht)})}
draw();let W0=innerWidth;addEventListener('resize',()=>{if(innerWidth===W0||window.__uuFreeze)return;W0=innerWidth;clearTimeout(draw.t);draw.t=setTimeout(draw,200)});
T.ready()})();
