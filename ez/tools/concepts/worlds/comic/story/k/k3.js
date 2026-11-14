/* K3 · The tear-off pad: the four steps are a pad of four Season 1 tickets bound at the left. Each step, the top ticket
   tears off along its perforation and drops away, and the next one is underneath. Step 3 is printed on gold foil: the
   golden ticket is a ticket. After step 4 a fresh pad drops in: every round. The pad's thickness shows how many are left. */
(function(){const K=KC,S=K.S,m=K.mount('kc-k3');if(!m)return S.ready();const {stage}=m;
  const tk=i=>K.frame(i,'kc-tkt').replace('<p class="kc-cap">',`<p class="kc-band" aria-hidden="true"><b>Season 1</b><span>No. ${i+1} of 4</span></p><p class="kc-cap">`);
  stage.innerHTML=`<div class="kc-pad"><div class="kc-bind" aria-hidden="true"><i></i><b>Every round</b><i></i></div><div class="kc-stack">${[0,1,2,3].map(tk).join('')}</div></div>${K.dots('kc-dk3')}`;
  const pad=stage.querySelector('.kc-pad'),F=[...stage.querySelectorAll('.kc-tkt')];
  const lay=c=>F.forEach((f,j)=>{const d=j-c;f.classList.toggle('kc-gone',d<0);f.style.setProperty('--d',Math.max(0,d));f.classList.toggle('kc-top',d===0);f.setAttribute('aria-hidden',d===0?'false':'true')});
  const clear=f=>f.classList.remove('kc-tear','kc-back','kc-new');
  K.deck({root:pad,dotsEl:stage.querySelector('.kc-dots'),go:(i,from,dir,inst)=>{F.forEach(clear);
    if(inst||i===from){lay(i);return}
    if(dir>0){const old=F[from];lay(i);old.classList.remove('kc-gone');old.style.setProperty('--d',0);old.classList.add('kc-tear');
      if(i<from)F.forEach((f,j)=>{if(f!==old){f.classList.add('kc-new')}});
      setTimeout(()=>{old.classList.remove('kc-tear');lay(+pad.closest('.kc-stage').querySelector('.kc-dot.kc-on').dataset.i)},900)}
    else{lay(i);F[i].classList.add('kc-back')}}});
  S.ready()})();
