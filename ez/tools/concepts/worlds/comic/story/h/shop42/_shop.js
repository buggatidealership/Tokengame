/* H42 shop (mockup): "Every round so far" staged in a real place where graded slabs are bought (window.__SHOP = A, B or C).
   Mounts over the built v46-live-x2plus.html: hides the live vitrine (#x2pVit) and builds #shop inside #record.
   A  The card shop: the Mag 7 locked in the lit wall cabinet behind the counter (the shop's top shelf, keyhole and all);
      every other round in the glass counter showcase you browse (the swipe row).
   B  The card show: the dealer's upright riser case at the back of the table holds the Mag 7 under its clamp lamps;
      every other round in the table showcase at the front, the dealer's tent card on the table.
   C  The auction preview room: the Mag 7 in the gilded wall vitrine behind the rope; every other round in the long table vitrine.
   Every slab, its label, the lift and its tag are the live component (classes vt-*, styled by the live x2p_vit.css); data from
   window.__x2pVit (SL: the seven Mag 7 slots in the page's own order, HERO: the newest graded Mag 7, REST: every other graded round,
   newest first) and the page's own slab labels (#car .card .zlab). The swipe row (.sp-belt) is a stand-in: another builder is making the
   real swipe element; this mockup only stages the place around it.
   The paintings (Hedra gpt-image-2, img/<take>-phone|desk.jpg) are cut into parts by parts.py and drawn as 9-slices whose horizontal scale is
   fixed (100cqw / crop width), so plates and corners keep their painted proportions; only the middle stretches vertically.
   Every word sits on a painted surface: "Mag 7" and the swipe row's label on the place's painted plates/signs, "Bet #1" / "To come" on the
   place's own tag object (a shelf-edge card holder, a tent card, a museum plaque). */
(function(){var n0=0;(function go(){if(!(window.__x2pVit&&window.ROUNDS&&window.__SHOP_PARTS&&document.querySelector('#car .card .zlab'))){if(++n0<600)setTimeout(go,50);return}
try{run()}catch(e){window.__shopErr=e;console.error(e)}})();
function run(){
const D=document,T=(window.__SHOP||'A').toUpperCase(),V=window.__x2pVit,PT=window.__SHOP_PARTS,P='tools/concepts/worlds/comic/story/h/shop42/img/';
const sec=D.getElementById('record');if(!sec||D.getElementById('shop'))return;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MDL=window.MODELS||{},nm=m=>m==='GPT'?'GPT':m.charAt(0)+m.slice(1).toLowerCase();
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*|\s*,\s*|\s+AND\s+/).filter(m=>MDL[m]);
const winT=r=>{const W=wins(r);return W.length?W.map(nm).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'};
const FL=window.FILMS||{};
const tile=r=>'media/tile-r'+r.n+'-'+(FL[r.n]?'f1':'t2')+'.jpg';
const logoF=t=>{const L=(window.CO_LOGOS||{})[t];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const LB={};const lab=n=>{if(LB[n])return LB[n];const z=D.querySelector(`#car .card[data-n="${n}"] .zlab`);if(!z)return {};const q=s=>((z.querySelector(s)||{}).textContent||'').trim();
  const o={ds:q('.zr .ds'),gr:q('.zr .gr')};if(o.gr)LB[n]=o;return o};
/* ---- the live slab component (as x2p_vit.js) ---- */
function slab(r){const L=lab(r.n),f=FL[r.n];
  return `<a class="vt-sl${L.gr==='10'?' vt-10':''}" href="#/round/${r.n}" data-n="${r.n}" aria-label="${esc(`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.gr||''}${L.ds?', '+L.ds:''}. ${winT(r)}. Open the slab.`)}">`+
   `<span class="vt-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="vt-pl" aria-hidden="true"></i>':''}</span><span class="vt-fr" aria-hidden="true"></span>`+
   `<span class="vt-lb" aria-hidden="true"><span class="vt-l"><span class="vt-nm">${esc(r.co)}</span><span class="vt-tk">${esc(r.ticker)}</span></span><span class="vt-r"><span class="vt-ds">${esc(L.ds||'')}</span><span class="vt-gr">${esc(L.gr||'')}</span></span></span></a>`}
function emptySlab(u,bet){const lg=logoF(u.ticker),co=u.co===u.ticker&&u.ticker==='AAPL'?'Apple':u.co;
  return `<span class="vt-sl vt-mt" role="img" aria-label="${esc(`Empty slot: ${co} (${u.ticker}), ${bet?'Bet #1':'to come'}`)}"><span class="vt-wn">${lg?`<img class="vt-ml${dark(u.ticker)?'':' vt-inv'}" src="${lg}" alt="" loading="lazy" decoding="async">`:''}</span><span class="vt-fr" aria-hidden="true"></span>`+
   `<span class="vt-lb" aria-hidden="true"><span class="vt-l"><span class="vt-nm">${esc(co)}</span><span class="vt-tk">${esc(u.ticker)}</span></span><span class="vt-r"><span class="vt-ds">${bet?'Bet #1':'Soon'}</span><span class="vt-gr">?</span></span></span></span>`}
function tag(r){const L=lab(r.n),W=wins(r);
  return `<span class="vt-tag" aria-hidden="true"><b>${esc(r.co)} <small>(${esc(r.ticker)})</small></b>${L.gr?`<span class="vt-tg">Grade ${esc(L.gr)}${L.ds?' · '+esc(L.ds):''}</span>`:''}<span class="vt-tw${W.length?'':' vt-no'}">${esc(winT(r))}</span></span>`}
const item=(r,c)=>`<div class="vt-it${c?' '+c:''}" data-n="${r.n}">${slab(r)}${tag(r)}</div>`;
/* the place's tag object, with its text on the painted face */
const TAGS={A:{img:'a-tag.webp',w:880,h:455,f:[.09,.258,.912,.84],ink:'eng'},B:{img:'b-tag.webp',w:922,h:476,f:[.13,.12,.925,.88],ink:'print'},C:{img:'c-tag.webp',w:923,h:269,f:[.075,.1,.925,.9],ink:'eng'}};
const TG=TAGS[T];
const ptag=(t,c)=>`<span class="sp-tg sp-${TG.ink} ${c||''}" style="--tw:${TG.w};--th:${TG.h};--f0:${TG.f[0]};--f1:${TG.f[1]};--f2:${TG.f[2]};--f3:${TG.f[3]};background-image:url(${P}${TG.img})"><span class="sp-face"><b>${esc(t)}</b></span></span>`;
const slot=s=>s.r?item(s.r,s.r===V.HERO?'sp-hero':''):`<div class="vt-it sp-empty">${emptySlab(s.u,s.t==='NVDA')}${ptag(s.t==='NVDA'?'Bet #1':'To come','sp-slot')}</div>`;
/* ---- a painted part as a 9-slice: the horizontal scale is fixed (100cqw / crop width), so painted plates keep their shape ---- */
const desk=matchMedia('(min-width:1000px)').matches,F=desk?'desk':'phone',K=T.toLowerCase()+'-'+F,PP=PT[K];
const obj=(part,cls,inner,extra)=>{const p=PP[part],s=p.s,up=p.hang&&p.hang.at==='above'?`<i class="sp-up" style="--uh:${-p.hang.y}"></i>`:'';
  return `<div class="sp-o ${cls}" style="--cw:${p.w};--ch:${p.h};--t:${s[0]};--r:${s[1]};--b:${s[2]};--l:${s[3]}">${up}<div class="sp-bi" style="border-image-source:url(${P}p-${K}-${part}.webp)">${inner}</div>${extra||''}</div>`};
const plate=(part,txt,cls)=>{const q=PP[part].plate;if(!q)return '';const top=q[1]<PP[part].h/2;
  return `<span class="sp-pl ${cls||''}" style="--x0:${q[0]};--x1:${q[2]};--y0:${q[1]};--y1:${q[3]};${top?'top:calc(100cqw * var(--y0) / var(--cw))':'bottom:calc(100cqw * (var(--ch) - var(--y1)) / var(--cw))'}"><b>${esc(txt)}</b></span>`};
const key=part=>{const q=PP[part].key;return q?`<img class="sp-key" src="${P}p-${K}-key.webp" alt="" style="--x0:${q[0]};--x1:${q[2]};--y0:${q[1]};--y1:${q[3]}">`:''};
/* ---- the Mag 7 in the place's best spot ---- */
const SL=V.SL,others=SL.filter(s=>!(s.r&&s.r===V.HERO)),hero=SL.find(s=>s.r&&s.r===V.HERO);
const shelf=PP.shelf?`<img class="sp-sh" src="${P}p-${K}-shelf.webp" alt="">`:'';
let mag;
if(desk){const L=others.slice(0,3),R=others.slice(3);mag=`<div class="sp-row sp-r1">${L.map(slot).join('')}${hero?slot(hero):''}${R.map(slot).join('')}</div>`}
else mag=`<div class="sp-row sp-rh">${hero?slot(hero):''}</div>${shelf}<div class="sp-row sp-r3">${others.slice(0,3).map(slot).join('')}</div>${shelf}<div class="sp-row sp-r3">${others.slice(3).map(slot).join('')}</div>`;
const HG=PP.case.hang,hang=HG?`<span class="sp-hang sp-${T==='B'?'print':'eng'} sp-h-${HG.at}" style="--hw:${HG.w};--hh:${HG.h};--hy:${HG.y};--f0:${HG.face[0]};--f1:${HG.face[1]};--f2:${HG.face[2]};--f3:${HG.face[3]};background-image:url(${P}p-${K}-hang.webp)"><span class="sp-face sp-p-mag"><b>Mag 7</b></span></span>`:'';
const caseLabel=PP.case.plate?plate('case','Mag 7','sp-p-mag'):hang;
const caseH=obj('case','sp-case',`<div class="sp-in" role="group" aria-label="The Mag 7">${mag}</div>`,caseLabel+key('case'));
/* ---- every other round: the swipe row (stand-in) in the place's browsing case ---- */
const REST=V.REST;
const belt=`<div class="sp-belt" role="group" aria-label="Every other round, newest first"><div class="sp-bt">${REST.map(r=>item(r)).join('')}</div></div>`;
/* phones: the painted plate on the browsing case is too small for the words at 8px or more, so the place's own label object (the same
   painted card holder / tent card / plaque as the Mag 7 tags) stands on it, centred on the painted plate */
const cq=PP.cnt.plate,cntLabel=desk?plate('cnt','Every other round','sp-p-row'):
  ptag('Every other round','sp-cl sp-p-row').replace('style="',`style="--cx:${(cq[0]+cq[2])/2};--cy:${(cq[1]+cq[3])/2};--pw:${cq[2]-cq[0]};`);
const cntH=obj('cnt','sp-cnt',belt,cntLabel);
const head=`<header class="m7-hd"><h2 class="t4-h2 m7-h2"><span class="t4-hw">Every round so far</span></h2><p class="m7-cap"><span class="m7-c1">Each round gets a grade from 1 to 10.</span> <span class="m7-c1">A 10 means all four AI<span class="x2p-lc">s</span> got it right, and close.</span></p></header>`;
const root=D.createElement('div');root.className='vt shop shop-'+T+' sp-'+F;root.id='shop';
root.innerHTML=head+`<div class="sp-scene" style="--bg:url(${P}p-${K}-bg.webp)">${caseH}${PP.mid?`<div class="sp-mid"></div>`:''}${cntH}${PP.skirt?`<div class="sp-skirt" style="background-image:url(${P}p-${K}-skirt.webp);aspect-ratio:${PP.skirt.w}/${PP.skirt.h}"></div>`:''}</div>`;
const vit=D.getElementById('x2pVit');if(vit)vit.style.display='none';
sec.appendChild(root);
/* ---- fitting: plate words by their ink (Anton, the live labels' face), slab names as the live fit ---- */
const MIN=8;
function fitText(box,b,maxF){b.style.fontSize='';b.style.maxWidth='';const W=box.clientWidth*.88,H=box.clientHeight;let f=Math.max(MIN,Math.min(maxF,H*.74));b.style.whiteSpace='nowrap';b.style.fontSize=f+'px';
  while(b.scrollWidth>W&&f>MIN){f-=.25;b.style.fontSize=f+'px'}
  if(b.scrollWidth>W){/* two lines */b.style.whiteSpace='normal';b.style.maxWidth=W+'px';f=Math.max(MIN,Math.min(maxF,H*.42));b.style.fontSize=f+'px';while((b.scrollHeight>H+.5||b.scrollWidth>W)&&f>MIN){f-=.25;b.style.fontSize=f+'px'}}}
function fit(){root.querySelectorAll('.sp-pl,.sp-face').forEach(p=>{const b=p.querySelector('b');if(b)fitText(p,b,p.closest('.sp-hang')?26:p.classList.contains('sp-face')?15:22)});
  /* the live slab-label fit, via the live module's own fitter on our labels */
  try{fitLabels()}catch(e){}}
const ink=el=>{const rs=[],tw=D.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const g=D.createRange();g.selectNodeContents(n);rs.push(...[...g.getClientRects()].filter(r=>r.width>0))}
  return rs.length?{l:Math.min(...rs.map(r=>r.left)),r:Math.max(...rs.map(r=>r.right)),t:Math.min(...rs.map(r=>r.top)),b:Math.max(...rs.map(r=>r.bottom))}:null};
function fitOne(lb){const nmE=lb.querySelector('.vt-nm'),tk=lb.querySelector('.vt-tk'),rc=lb.querySelector('.vt-r');if(!nmE||!lb.offsetWidth)return;
  nmE.style.fontSize='';lb.classList.remove('vt-w2','vt-nt','vt-clip');
  const R=ink(rc),LR=lb.getBoundingClientRect(),lim=e=>Math.min(R?R.l-2:LR.right,LR.right-1,e.getBoundingClientRect().right+.5),over=e=>{const I=ink(e);return I?I.r-lim(e):0};
  const vfit=()=>{const I=ink(lb.querySelector('.vt-l'));return !I||(I.b<=LR.bottom+.5&&I.t>=LR.top-.5)};
  const f0=parseFloat(getComputedStyle(nmE).fontSize);let f=f0,g=0;
  while((over(nmE)>0||!vfit())&&f>MIN&&g++<60){f=Math.max(MIN,f-.25);nmE.style.fontSize=f+'px'}
  if(over(nmE)>0||!vfit()){lb.classList.add('vt-w2');f=f0;nmE.style.fontSize=f+'px';g=0;while((over(nmE)>0||!vfit())&&f>MIN&&g++<60){f=Math.max(MIN,f-.25);nmE.style.fontSize=f+'px'}
    if(over(nmE)>0||!vfit())lb.classList.add('vt-clip')}
  else if(tk&&tk.offsetWidth&&over(tk)>0)lb.classList.add('vt-nt')}
function fitLabels(){root.querySelectorAll('.vt-lb').forEach(fitOne)}
fit();D.fonts&&D.fonts.ready.then(()=>{fit();setTimeout(fit,500)});
/* the lift (live behaviour: touch lifts and tags first, a second tap opens) */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.vt-it.vt-lift').forEach(l=>l.classList.remove('vt-lift'));
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.vt-it>a.vt-sl');if(!a)return;const it=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!it.classList.contains('vt-lift')){e.preventDefault();e.stopPropagation();unlift();it.classList.add('vt-lift')}ptype=''},true);
window.__shop={fit,T,F};
}
})();
