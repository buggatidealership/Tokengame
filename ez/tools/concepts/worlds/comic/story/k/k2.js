/* K2 · The lenticular card: one printed card under ridged plastic. It rocks a little at rest; to change step it tilts,
   and the next picture shows through the lens stripes as the angle changes, then it settles flat. Drag sideways to tilt
   it by hand: the angle is the step, as on a real lenticular. */
(function(){const K=KC,S=K.S,m=K.mount('kc-k2');if(!m)return S.ready();const {stage}=m;
  stage.innerHTML=`<div class="kc-tilt"><div class="kc-lens">${[0,1,2,3].map(i=>K.frame(i,i?'':'kc-on')).join('')}<i class="kc-ridge" aria-hidden="true"></i><i class="kc-shine" aria-hidden="true"></i></div></div>${K.dots('kc-dk2')}`;
  const tl=stage.querySelector('.kc-tilt'),L=stage.querySelector('.kc-lens'),F=[...L.querySelectorAll('.kc-f')];
  K.deck({root:tl,dotsEl:stage.querySelector('.kc-dots'),go:(i,from,dir,inst)=>{
    F.forEach((f,j)=>{f.classList.remove('kc-in','kc-out');f.setAttribute('aria-hidden',j===i?'false':'true')});
    if(inst||i===from){F.forEach((f,j)=>f.classList.toggle('kc-on',j===i));return}
    F[from].classList.add('kc-out');F[from].classList.remove('kc-on');F[i].classList.add('kc-on','kc-in');
    L.style.setProperty('--dir',dir<0?-1:1);L.classList.remove('kc-turn');void L.offsetWidth;L.classList.add('kc-turn');
    setTimeout(()=>F[from].classList.remove('kc-out'),900)}});
  /* by hand: the card follows the finger's angle while it is held */
  let x0=null;tl.addEventListener('pointerdown',e=>{x0=e.clientX;L.classList.add('kc-hold')});
  addEventListener('pointermove',e=>{if(x0==null)return;const a=Math.max(-22,Math.min(22,(e.clientX-x0)/tl.offsetWidth*60));L.style.setProperty('--hand',a+'deg')});
  addEventListener('pointerup',()=>{x0=null;L.classList.remove('kc-hold');L.style.setProperty('--hand','0deg')});
  S.ready()})();
