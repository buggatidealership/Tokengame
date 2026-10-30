/* C2 · The golden ticket: Starring is one Season 1 ticket, a stub per AI in the owner's order; the stub of the AI on top of the
   P&L board is gold foil (the same golden ticket as Meet the models) and carries "We bet on its call". The tagline's two facts
   move onto the ticket as its printed terms. */
(function(){const S=SE,cv=S.D.querySelector('#wc-book .wc-cover');if(!cv)return S.ready();
  const ld=S.lead(),st=cv.querySelector('.wc-starring');st.classList.add('se-c2');
  cv.querySelectorAll('.wc-st-m').forEach((el,i)=>{const m=S.STAR[i];el.classList.add('se-c2s');el.style.setProperty('--i',i);
    if(m===ld){el.classList.add('se-c2g');const f=el.querySelector('.wc-face');if(f)f.classList.remove('wc9-holo');el.insertAdjacentHTML('afterbegin','<small class="se-c2gt" aria-hidden="true">Golden ticket</small>');
      el.insertAdjacentHTML('beforeend','<em class="se-c2we">We bet on its call</em>')}});
  st.querySelector('.wc-st-g').insertAdjacentHTML('beforeend','<i class="se-c2n se-c2nl" aria-hidden="true"></i><i class="se-c2n se-c2nr" aria-hidden="true"></i>');
  st.insertAdjacentHTML('beforeend','<p class="se-c2tm">Calls locked before earnings. Graded at the close.</p>');
  cv.querySelector('.wc-tag').classList.add('se-hide');S.once(st,.5);S.ready()})();
