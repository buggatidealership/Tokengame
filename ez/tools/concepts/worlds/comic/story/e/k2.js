/* K2 · The coupon: the comic's back-page mail-in coupon. Its ticked lines say what you get; a pair of scissors cuts it out
   when it comes into view; the stamp box is the follow link; the fine print is the coupon's small print. */
(function(){const S=SE,m=S.backMount('se-k2');if(!m)return S.ready();const t=S.totals();
  const cp=S.D.createElement('div');cp.className='se-k2cp';
  cp.innerHTML=`<span class="se-k2sc" aria-hidden="true">✂</span>
    <div class="se-k2in"><p class="se-k2h">Yes! Send me the season.</p>
      <ul class="se-k2l"><li><i aria-hidden="true">✓</i><span>Every call, <b>before</b> the earnings</span></li><li><i aria-hidden="true">✓</i><span>Every grade, at the close</span></li><li><i aria-hidden="true">✓</i><span>Who is on top after each round</span></li></ul>
      <p class="se-k2f"><span>${S.STAR.map(x=>S.face(x)).join('')}</span><span class="se-k2n">${t.l+t.u} rounds still to come</span></p>
      <div class="se-k2stmp"></div></div>`;
  m.motto.after(cp);const st=cp.querySelector('.se-k2stmp');st.append(m.follow);m.follow.innerHTML='Send it<small>via X</small>';cp.querySelector('.se-k2in').append(m.fine);
  S.once(cp,.5);S.ready()})();
