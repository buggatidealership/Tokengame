/* Round H5 · alive (mockup). Lays the small effects of alive.css over the built X3+ page.
   window.__alInit(['e1','e5',...]) switches effects on. Every target is watched by one IntersectionObserver:
   .al-v while it is on screen (continuous effects run only then), .al-go once it has been on screen for
   READ ms (one-shots play once, after the reader has had a moment: lesson 55). With reduced motion the
   CSS freezes everything and no video is started. Data is read from the page itself (its own DOM). */
(function(){
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const READ=500;
const q=(s,r)=>(r||document).querySelector(s),qa=(s,r)=>[...(r||document).querySelectorAll(s)];
let io;const goTimers=new WeakMap();
// a one-shot plays only for a target that starts off screen ("armed": its final state waits for the play);
// one already on screen when the page wakes is left exactly as it is, so nothing ever blinks out and back
function watch(el,opt){if(!el)return;el.__al=opt||{};
 if(el.__al.once){const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){el.__al.once=0}else el.classList.add('al-arm')}
 io.observe(el)}
function onSeen(es){es.forEach(e=>{const el=e.target,o=el.__al||{};
  if(e.isIntersecting){el.classList.add('al-v');o.on&&o.on(el);
    if(o.once&&!window.__alManual&&!el.classList.contains('al-go')&&!goTimers.has(el))goTimers.set(el,setTimeout(()=>{el.classList.add('al-go');o.go&&o.go(el)},o.delay??READ))}
  else{el.classList.remove('al-v');o.off&&o.off(el);if(goTimers.has(el)&&!el.classList.contains('al-go')){clearTimeout(goTimers.get(el));goTimers.delete(el)}}})}

const FX={
 e1(){qa('.pp1-c .pp1-tiles').forEach(t=>{qa('.pp1-t',t).forEach((x,i)=>x.style.setProperty('--i',i));watch(t,{once:1})})},
 e2(){const s=q('.pp1-r1 .pp1-stub');if(!s)return;if(getComputedStyle(s).position==='static')s.style.position='relative';
  const g=document.createElement('i');g.className='al-glint';s.appendChild(g);watch(s)},
 e3(){qa('.pp1-c .fb-patch').forEach(p=>{const a=document.createElement('i');a.className='al-fold';const b=document.createElement('i');b.className='al-fold al-hi';p.append(a,b);watch(p)})},
 e4(){const m=q('.wc-chars');if(!m)return;if(getComputedStyle(m).position==='static')m.style.position='relative';
  const c=document.createElement('div');c.className='al-curl';
  // the corner of the page folds up along the diagonal: the page ground shows where it was, the back of the
  // newsprint (cream, shaded toward the crease) curls over, an ink line draws its edge, a soft shadow under it
  c.innerHTML='<svg viewBox="0 0 62 62" aria-hidden="true"><defs><linearGradient id="alcg" x1=".75" y1=".75" x2=".05" y2=".05"><stop offset="0" stop-color="#fffaf0"/><stop offset=".45" stop-color="#f2e6c4"/><stop offset="1" stop-color="#c8b485"/></linearGradient>'
   +'<pattern id="alcd" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r=".8" fill="rgba(13,11,16,.12)"/></pattern></defs>'
   +'<path d="M62 8 L62 62 L8 62 Z" fill="#f1e8d4"/><path d="M62 8 L62 62 L8 62 Z" fill="url(#alcd)"/><path d="M62 8 L62 62 L8 62" fill="none" stroke="rgba(13,11,16,.35)" stroke-width="1"/>'
   +'<path d="M8 62 C12 45 15 30 16 16 C30 15 45 12 62 8 Z" fill="rgba(13,11,16,.32)" transform="translate(-4 -4)" style="filter:blur(2px)"/>'
   +'<path d="M8 62 C12 45 15 30 16 16 C30 15 45 12 62 8 Z" fill="url(#alcg)" stroke="#0d0b10" stroke-width="2.4" stroke-linejoin="round"/>'
   +'<path d="M15 54 C19 40 21 30 22 22 C32 21 42 19 54 15" fill="none" stroke="rgba(13,11,16,.18)" stroke-width="1"/></svg>';m.appendChild(c);
  // watch the module's last stretch: the corner lifts when the reader reaches the end of the page
  const end=document.createElement('i');end.style.cssText='position:absolute;left:0;right:0;bottom:0;height:140px;pointer-events:none';m.appendChild(end);
  end.__al={once:1,delay:300,go:()=>m.classList.add('al-go'),on:()=>m.classList.add('al-v'),off:()=>m.classList.remove('al-v')};io.observe(end)},
 e5(){const t=q('.wc-bis a.hr-tile');if(!t)return;t.classList.add('al-new');
  // a wet copy of the stamp (blurred once, never animated) fades out while the crisp stamp fades in: opacity only
  const mv=q('.hr-mv',t);if(mv){const w=mv.cloneNode(true);w.classList.add('al-wet');w.setAttribute('aria-hidden','true');mv.after(w)}
  watch(t,{once:1})},
 e6(){if(RM||!window.FILMS)return;const tiles=qa('.wc-bis a.hr-tile');
  const t=tiles.find(a=>{const n=+(a.getAttribute('href')||'').replace(/\D+/g,'');return FILMS[n]});if(!t)return;
  const n=+(t.getAttribute('href')||'').replace(/\D+/g,''),art=q('.hr-cov .hr-art',t)||q('.wc-bi-art',t);if(!art)return;
  if(getComputedStyle(art).position==='static')art.style.position='relative';
  const v=document.createElement('video');v.className='al-cine';v.muted=true;v.playsInline=true;v.loop=false;v.preload='none';v.setAttribute('aria-hidden','true');
  // a small loop cut from the film's opening (216 px, 2.4 s, 28 KB), not the 4 MB, 1080p film: a build makes one per tile
  v.src=window.__alCineSrc||'tools/concepts/worlds/comic/story/h/alive/cine-r78-loop.mp4';v.addEventListener('loadeddata',()=>v.classList.add('al-play'));v.dataset.a='0';v.dataset.b='2.4';art.appendChild(v);
  // the loop file is the opening the tile was painted from (0.4 s to 2.8 s of the film)
  v.addEventListener('timeupdate',()=>{if(v.currentTime>=+v.dataset.b)v.currentTime=+v.dataset.a});
  watch(t,{on:()=>{v.preload='auto';if(v.currentTime<+v.dataset.a)v.currentTime=+v.dataset.a;v.play().catch(()=>{})},off:()=>{v.pause()}})},
 e7(){qa('.wc-beat').forEach(b=>watch(b,{once:1,delay:150}))},
 e8(){const i=q('.hb-open .i');if(!i)return;if(getComputedStyle(i).position==='static')i.style.position='relative';
  [[44,66,''],[51.5,73,' s2']].forEach(([x,y,c])=>{const s=document.createElement('i');s.className='al-star'+c;s.style.left=x+'%';s.style.top=y+'%';i.appendChild(s)});watch(i)},
 e9(){const a=q('.hb4-a .hb-ink')||q('.hb4-a');if(!a)return;if(getComputedStyle(a).position==='static')a.style.position='relative';
  [[70.9,50.3,'g'],[80.6,50.3,'r']].forEach(([x,y,c])=>{const s=document.createElement('i');s.className='al-led '+c;s.style.left=x+'%';s.style.top=y+'%';a.appendChild(s)});watch(a)},
 e10(){const b=q('.wc11c-cn.wc11c-b');if(!b)return;
  // honest gate (lesson 8): the lines say "closing in", so they show only if the challenger made more than the
  // leader over the last 7 days (the page's own window: rounds graded today and the six days before, New York)
  if(!window.__alForceChase){try{const P=__x2pPnl().A,nm=s=>(q(s+' .wc11c-nm')||{}).textContent.trim().toUpperCase();
   const ny=new Date(new Date().toLocaleString('en-US',{timeZone:'America/New_York'}));ny.setHours(0,0,0,0);
   const ago=r=>{const [m,d,y]=(r.resolves||'').split('/').map(Number);if(!m)return -1;return Math.round((ny-new Date(2000+y,m-1,d))/864e5)};
   const p7=k=>ROUNDS.reduce((t,r)=>{const a=ago(r),v=(P[k]&&P[k].per[r.n]||{}).v;return t+(a>=0&&a<=6&&v?v:0)},0);
   const A=nm('.wc11c-a'),B=nm('.wc11c-b');b.dataset.alGap=JSON.stringify([A,p7(A),B,p7(B)]);if(!(p7(B)>p7(A)))return}catch(e){return}}if(getComputedStyle(b).position==='static')b.style.position='relative';
  const c=document.createElement('span');c.className='al-chase';c.innerHTML='<i></i><i></i><i></i><i></i>';b.appendChild(c);watch(b)},
 e11(){if(RM)return;const box=q('.ss3-g');if(!box)return;const sel='.ss3-v,.ss3-big';
  // the scoreboard rewrites its figures on a window switch: compare them by their place, trail each change
  let last=qa(sel,box).map(e=>e.textContent);
  new MutationObserver(()=>{const now=qa(sel,box);if(!now.length)return;now.forEach((e,i)=>{if(last[i]!==undefined&&last[i]!==e.textContent&&!e.querySelector('.al-zip'))zip(e)});last=now.map(e=>e.textContent)}).observe(box,{subtree:true,childList:true,characterData:true});
  function zip(e){if(getComputedStyle(e).position==='static')e.style.position='relative';const z=document.createElement('span');z.className='al-zip';z.innerHTML='<i></i><i></i><i></i>';e.appendChild(z);z.lastChild.addEventListener('animationend',()=>z.remove())}},
 e12(){qa('.ss3-c.ss3-r-pl').forEach((c,i)=>{c.style.setProperty('--i',i);watch(c,{once:1})})},
 e13(){const best=qa('.ss3-best').sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top||a.getBoundingClientRect().left-b.getBoundingClientRect().left);best.forEach((c,i)=>{const el=c.firstElementChild;if(!el)return;
   const cs=getComputedStyle(el,'::before');const r=el.getBoundingClientRect();
   // the ring keeps the page's own inset and tilt, drawn as one hand stroke that overshoots its start
   const ins=[parseFloat(cs.top)||-8,parseFloat(cs.left)||-12];const w=r.width-2*ins[1],h=r.height-2*ins[0];
   const sv=document.createElementNS('http://www.w3.org/2000/svg','svg');sv.setAttribute('class','al-ring');sv.setAttribute('viewBox',`0 0 ${w} ${h}`);
   sv.style.cssText=`left:${ins[1]}px;top:${ins[0]}px;width:${w}px;height:${h}px;transform:rotate(-5deg)`;
   const cx=w/2,cy=h/2,rx=w/2-1.7,ry=h/2-1.7;let d='';for(let k=0;k<=46;k++){const a=-2.2+k/40*Math.PI*2,j=1+.035*Math.sin(k*1.7);d+=(k?'L':'M')+(cx+rx*j*Math.cos(a)).toFixed(1)+' '+(cy+ry*j*Math.sin(a)+(k>40?(k-40)*.5:0)).toFixed(1)}
   sv.innerHTML=`<path class="k" pathLength="1" d="${d}"/><path pathLength="1" d="${d}"/>`;sv.style.setProperty('--i',i);if(getComputedStyle(el).position==='static')el.style.position='relative';el.appendChild(sv)});
  const g=q('.ss3-g');if(g)watch(g,{once:1,delay:400})},
 e14(){const s=qa('.wc-race .wc-rc-st:not(.wc-rc-stk)').pop();if(!s)return;s.classList.add('al-last');watch(s.parentElement||s)}
};
// recordings fire the one-shots at a scripted moment instead of a real-time timer
window.__alGo=function(){document.querySelectorAll('.al-v').forEach(el=>{const o=el.__al||{};if(o.once&&!el.classList.contains('al-go')){el.classList.add('al-go');o.go&&o.go(el)}})};
window.__alInit=function(list){io=io||new IntersectionObserver(onSeen,{threshold:.35});
 list.forEach(k=>{document.documentElement.classList.add('al-'+k);try{FX[k]()}catch(e){console.warn('alive',k,e)}})};
})();
