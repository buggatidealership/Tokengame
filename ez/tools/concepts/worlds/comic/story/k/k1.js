/* K1 · The strip, read one panel at a time: the four steps are four panels of one comic strip; the strip slides along
   under a fixed window, panel by panel, the ink gutter passing like an eye moving along the page; after panel 4 it runs
   on into panel 1 again (a copy), so the strip never rewinds: every round is the next round. */
(function(){const K=KC,S=K.S,m=K.mount('kc-k1');if(!m)return S.ready();const {stage}=m;
  stage.innerHTML=`<div class="kc-vp"><div class="kc-track">${[0,1,2,3].map(i=>K.frame(i)).join('')}${K.frame(0,'kc-cl1')}</div></div>${K.dots('kc-dk1')}`;
  const vp=stage.querySelector('.kc-vp'),tr=stage.querySelector('.kc-track'),F=[...tr.children];
  F.forEach((f,i)=>{if(i!==0&&i!==4)f.setAttribute('aria-hidden','true')});F[4].setAttribute('aria-hidden','true');
  const at=(k,inst)=>{tr.style.transition=inst?'none':'';tr.style.transform=`translateX(${-F[k].offsetLeft}px)`;F.forEach((f,j)=>f.setAttribute('aria-hidden',j===k?'false':'true'))};
  K.deck({root:vp,dotsEl:stage.querySelector('.kc-dots'),go:(i,from,dir,inst)=>{
    if(!inst&&from===3&&i===0&&dir>0){at(4);tr.addEventListener('transitionend',()=>at(0,true),{once:true})}
    else if(!inst&&from===0&&i===3&&dir<0){at(4,true);void tr.offsetWidth;at(3)}
    else at(i,inst)}});
  addEventListener('resize',()=>at(+stage.querySelector('.kc-dot.kc-on').dataset.i,true));
  S.ready()})();
