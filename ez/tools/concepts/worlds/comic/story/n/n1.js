/* N1 · Corners: the fighters walk in. Each corner is printed in its fighter's own colour (a flat with its darker
   Ben-Day screen), split on the ring's diagonal. Switching windows sends the two fighters back to their corners and
   walks the window's pair in from theirs, the corner colours wiping in behind them: a new pair enters the ring. */
(function(){const N=SN;
const cn=(x,s)=>{const m=x.F[s],v=s==='a'?x.va:x.vb,w=s==='a'?x.wa:x.wb;
  return `<div class="n1-cn n1-${s}">${N.role(x,s)}${N.face(m,'wc-f-xl n1-f',N.held(m))}<span class="n1-nm">${N.NM[m]}</span><span class="n1-pl">${N.money(m,v)}</span>${N.wlh(w)}</div>`};
window.SNT={
 render:x=>`<i class="n1-g n1-ga" style="--c:${N.col(x.F.a)};--d:${N.dots(x.F.a)}"></i><i class="n1-gw"><i class="n1-g n1-gb" style="--c:${N.col(x.F.b)};--d:${N.dots(x.F.b)}"></i></i>
  <div class="n1-ring">${cn(x,'a')}<div class="n1-mid"><span class="n1-vs">VS</span><span class="n1-gap"><small>Gap</small>${N.gapEl(x)}</span></div>${cn(x,'b')}</div>
  <div class="n1-under"><small>Undercard</small>${x.under.map(m=>`<span>${N.face(m,'n1-uf')}<em>${N.NM[m]}</em>${N.money(m,x.amts[m])}</span>`).join('')}</div>
  <p class="n1-line">${x.line}</p>`,
 empty:x=>`<i class="n1-g n1-gq"></i><div class="n1-q"><svg class="n1-qb" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a1.6 1.6 0 0 1 1.6 1.6v.7c3 .8 4.9 3.4 4.9 6.6v3.7l1.8 2.4H3.7l1.8-2.4v-3.7c0-3.2 1.9-5.8 4.9-6.6v-.7A1.6 1.6 0 0 1 12 2.5zM9.6 19.6h4.8a2.4 2.4 0 0 1-4.8 0z"/></svg>
  <b class="n1-qh">No bell in 24 hours</b><div class="n1-qf">${N.R&&['GPT','KIMI','CLAUDE','GROK'].map(m=>`<span>${N.face(m,'n1-uf')}<em>$0</em></span>`).join('')}</div></div>
  <p class="n1-line">${N.quiet()}</p>`,
 show:(bout,html,x,prev,anim,after)=>{
  /* the old corners stay printed underneath while the new colours wipe in over them */
  const put=()=>{const ug=anim?[...bout.querySelectorAll(':scope>.n1-ga,:scope>.n1-gw,:scope>.n1-gq')].map(e=>e.outerHTML).join(''):'';bout.innerHTML=html;after();if(!anim)return;
   if(ug){bout.insertAdjacentHTML('afterbegin',`<div class="n1-ug">${ug}</div>`);setTimeout(()=>{const u=bout.querySelector('.n1-ug');if(u)u.remove()},520)}
   const g=bout.querySelectorAll(':scope>.n1-ga,:scope>.n1-gw>.n1-gb,:scope>.n1-gq');g.forEach((e,i)=>e.animate([{clipPath:i?'polygon(100% 0,100% 0,100% 100%,100% 100%)':'polygon(0 0,0 0,0 100%,0 100%)'},{clipPath:getComputedStyle(e).clipPath}],{duration:360,easing:'cubic-bezier(.3,.8,.3,1)'}));
   bout.querySelectorAll('.n1-cn').forEach((c,i)=>{const s=i?1:-1;c.animate([{transform:`translateX(${s*120}%)`},{transform:`translateX(${s*60}%) translateY(-7px)`,offset:.3},{transform:`translateX(${s*30}%)`,offset:.5},{transform:`translateX(${s*10}%) translateY(-5px)`,offset:.75},{transform:'none'}],{duration:620,delay:120,easing:'linear',fill:'backwards'})});
   const m=bout.querySelector('.n1-mid');if(m)m.animate([{transform:'translate(-50%,-50%) scale(1.9) rotate(-10deg)',opacity:0},{transform:'translate(-50%,-50%)',opacity:1}],{duration:300,delay:600,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})};
  const old=bout.querySelectorAll('.n1-cn,.n1-q');if(!anim||!old.length){put();return}
  old.forEach((c,i)=>c.animate([{transform:'none',opacity:1},{transform:`translateX(${(c.classList.contains('n1-b')?1:-1)*130}%) rotate(${c.classList.contains('n1-b')?8:-8}deg)`,opacity:.2}],{duration:240,easing:'cubic-bezier(.6,0,.9,.5)',fill:'forwards'}));
  const m=bout.querySelector('.n1-mid');if(m)m.animate([{opacity:1},{opacity:0}],{duration:160,fill:'forwards'});
  setTimeout(put,230)}};
SN.mount('n1')})();
