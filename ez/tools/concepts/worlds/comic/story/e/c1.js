/* C1 · The next fight, live: each Starring face says its real call on tomorrow's biggest round as an arrow (no number);
   the tagline goes, a caption names the round and when the close grades it. */
(function(){const S=SE,cv=S.D.querySelector('#wc-book .wc-cover');if(!cv)return S.ready();
  const L=S.toCome().filter(x=>x.locked).sort((a,b)=>S.pd(a.day).t-S.pd(b.day).t||S.cap(b.ticker)-S.cap(a.ticker)),r=L[0];if(!r)return S.ready();
  const when=r.r==='Today'?"today's close":r.r==='Tomorrow'?"tomorrow's close":'the close on '+S.wd(r.day,1);
  cv.querySelectorAll('.wc-st-m').forEach((el,i)=>{const m=S.STAR[i],c=r.calls.find(x=>x.m===m);if(!c)return;const up=c.dir==='UP';
    el.querySelector('.wc-face').insertAdjacentHTML('beforeend',`<span class="se-c1b ${up?'se-c1u':'se-c1d'}" style="--i:${i}" aria-hidden="true">${up?'▲':'▼'}</span>`);
    el.setAttribute('aria-label',S.NM[m]+' says '+(up?'up':'down'))});
  const tag=cv.querySelector('.wc-tag');tag.classList.add('se-hide');
  tag.insertAdjacentHTML('afterend',`<p class="se-c1cap"><span>Their calls on <i class="se-c1co"><img src="${S.logo(r.ticker)}" alt=""${S.L(r.ticker).dark?' class="se-dk"':''}>${S.esc(r.co)}</i>, locked before its earnings. <b>${when[0].toUpperCase()+when.slice(1)}</b> says who was right.</span></p>`);
  S.once(cv.querySelector('.wc-starring'),.5);S.ready()})();
