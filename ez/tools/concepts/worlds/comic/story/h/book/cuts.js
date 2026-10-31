// Round H6 · book: the two cuts, made cheap enough for a slow phone.
//  B.pile(ids): the next page slides up over the one you read (flow C). Cheap: the page underneath is hidden once covered
//   (so at most two pages are ever stuck and painted), one darkening layer for the whole book (a viewport-sized fixed layer whose
//   opacity runs on the incoming page's view timeline, moved between the two pages by z-index), no blurred shadows, no tilt on tall pages.
//  B.iris(ids): the picture closes to a painted iris on the cut and opens on the next page (flow D). Cheap: the painted plate
//   (iris-ring.webp, a transparent hole) is scaled by transform and four flat bars follow its edges; no full-screen gradient repaint.
(function(){const F=window.__FL,B=window.__BK;const D=document,bk=D.getElementById('wc-book');const BASE=B.base;
const secs=()=>F.secs();const idx=id=>secs().findIndex(s=>s.id===id);
// the beat caption standing before a section (taken off the page; the cut carries it)
B.takeBeat=el=>{const p=el.previousElementSibling;if(p&&p.classList.contains('wc-beat')){p.classList.add('bk-beat-off');return p.textContent.trim()}return null};
B.z=()=>secs().forEach(({el},i)=>{el.style.zIndex=String(10+i*10);if(getComputedStyle(el).position==='static')el.style.position='relative'});
/* ---------------- the pile ---------------- */
B.pile=ids=>{B.z();const dim=D.createElement('i');dim.className='bkp-dim';dim.setAttribute('aria-hidden','true');bk.appendChild(dim);
 const cuts=[];bk.style.setProperty('timeline-scope',ids.map((_,k)=>'--bkp'+k).join(','));
 ids.forEach((id,k)=>{const S=secs(),j=idx(id);if(j<1)return;const inc=S[j].el,old=S[j-1].el;
  old.classList.add('bkp-old');inc.classList.add('bkp-in');inc.style.viewTimelineName='--bkp'+k;
  const tx=B.takeBeat(inc);if(tx){const c=D.createElement('span');c.className='bkp-cap';c.textContent=tx;c.setAttribute('aria-hidden','true');inc.appendChild(c)}
  // a rope cut standing before the incoming page rides on its top edge
  const r=inc.previousElementSibling&&inc.previousElementSibling.classList.contains('gA-rope')?inc.previousElementSibling:(inc.previousElementSibling&&inc.previousElementSibling.previousElementSibling&&inc.previousElementSibling.previousElementSibling.classList.contains('gA-rope')?inc.previousElementSibling.previousElementSibling:null);
  if(r){r.classList.add('bkp-rope');inc.prepend(r)}
  cuts.push({k,inc,old})});
 const st=()=>cuts.forEach(({old})=>old.style.setProperty('--st',Math.min(0,innerHeight-old.offsetHeight)+'px'));st();addEventListener('resize',st);new ResizeObserver(()=>requestAnimationFrame(st)).observe(bk);
 // which cut is live: the incoming page whose top is on screen. Hide what is covered.
 let live=-2,raf=0;const tick=()=>{raf=0;let a=-1;for(const c of cuts){const t=c.inc.getBoundingClientRect().top;const cov=t<=0.5;
   if(c.old.classList.contains('bkp-hid')!==cov){if(cov)c.old.style.containIntrinsicBlockSize=c.old.offsetHeight+'px';c.old.classList.toggle('bkp-hid',cov)}if(t>0&&t<innerHeight)a=c.k}
  if(a!==live){live=a;if(a<0){dim.style.visibility='hidden'}else{const c=cuts[a];dim.style.visibility='';dim.style.zIndex=String(+c.inc.style.zIndex-5);dim.style.animationTimeline='--bkp'+a;
   if(!F.SDA){dim.style.opacity=''}}}
  if(!F.SDA&&a>=0){const t=cuts[a].inc.getBoundingClientRect().top;dim.style.opacity=String(Math.max(0,Math.min(.62,(1-t/innerHeight)*.62)))}};
 addEventListener('scroll',()=>{if(!raf)raf=requestAnimationFrame(tick)},{passive:true});tick();B.cutsP=cuts};
/* ---------------- the iris ---------------- */

B.iris=(ids,caps)=>{const P=B.irisP=innerWidth>=1000?720:600;const set=()=>{const R=Math.hypot(innerWidth,innerHeight)/2;
  // open: the rope ring sits just outside the screen's corners; the plate's hole is 29.7% of its width in radius, the rope reaches 37%
  D.documentElement.style.setProperty('--bki-so',((R+8)/(.30*P)).toFixed(3));D.documentElement.style.setProperty('--bki-p',P+'px')};set();addEventListener('resize',set);
 D.documentElement.style.setProperty('timeline-scope',ids.map((_,k)=>'--bki'+k).join(','));
 ids.forEach((id,k)=>{const S=secs(),j=idx(id);if(j<1)return;const el=S[j].el;const tx=B.takeBeat(el)||(caps&&caps[id]);
  const s=D.createElement('i');s.className='bki-s';s.setAttribute('aria-hidden','true');s.style.viewTimelineName='--bki'+k;
  const ref=el.previousElementSibling&&el.previousElementSibling.classList.contains('bk-beat-off')?el.previousElementSibling:el;bk.insertBefore(s,ref);
  const o=D.createElement('div');o.className='bki-ov';o.setAttribute('aria-hidden','true');o.style.setProperty('--tl','--bki'+k);
  o.innerHTML=`<i class="bki-b t"></i><i class="bki-b b"></i><i class="bki-b l"></i><i class="bki-b r"></i><i class="bki-pl" style="background-image:url(${BASE}img/web/${B.irisImg||'iris-ring'}.webp)"></i>${tx?`<span class="bki-cap">${tx}</span>`:''}`;
  D.body.appendChild(o);
  if(!F.SDA&&!F.RM)new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){o.classList.remove('bk-x');void o.offsetWidth;o.classList.add('bk-x')}}),{rootMargin:'-48% 0px -48% 0px'}).observe(s)})};
})();
