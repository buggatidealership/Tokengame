/* D2 · Fight night: the round as a bout. Bulls in one corner, bears in the other (the AIs' calls sort themselves); the film is the
   fight and the close is the bell; the market's move picks a corner (pass), the closest call in it takes the decision; the payout
   is paid and the season's P&L race reorders. Parts: tale of the tape (corners) · the bout (film + bell) · the decision · the payout + race. */
(function(){const S=SD,d=S.data();if(!d){S.ready();return}
  const {r,up,cs}=d,A=r.a,bulls=cs.filter(x=>x.c.up),bears=cs.filter(x=>!x.c.up).sort((a,b)=>a.c.v-b.c.v);
  const cap=(n,t)=>`<b class="sd-n" aria-hidden="true">${n}</b><p class="sd-c">${t}</p>`;
  const fighter=(x,g)=>`<div class="sd2-ft${g?(x.win?' sd2-win sd2-ok':x.ok?' sd2-ok':' sd2-no'):''}">${g&&x.win?'<em class="sd2-crown" aria-hidden="true">♛</em>':''}${S.face(x.m,'sd2-f')}
      <span class="sd2-nm">${S.NM[x.m]}</span><b class="${x.c.up?'sd-tu':'sd-td'}">${x.c.up?'+':'−'}${x.c.v}%</b>${g?`<i class="sd2-pf ${x.ok?'sd2-pass':'sd2-fail'}">${x.ok?'Pass!':'Fail!'}</i>`:''}</div>`;
  const corners=g=>`<div class="sd2-ring${g?' sd2-g '+(up?'sd2-U':'sd2-D'):''}">
      <div class="sd2-cn sd2-cu"><p class="sd2-ch">▲ Bulls</p>${bulls.map(x=>fighter(x,g)).join('')||'<p class="sd2-empty">Nobody</p>'}</div>
      ${g?`<div class="sd2-arrow ${up?'sd2-au':'sd2-ad'}" aria-hidden="true"><b>${up?'+':'−'}${S.pct(A)}</b></div>`:`<div class="sd2-vs" aria-hidden="true"><b>${bulls.length} vs ${bears.length}</b></div>`}
      <div class="sd2-cn sd2-cd"><p class="sd2-ch">▼ Bears</p>${bears.map(x=>fighter(x,g)).join('')||'<p class="sd2-empty">Nobody</p>'}</div></div>`;
  const bug=t=>`<p class="sd2-bug"><span class="sd2-live">R${r.n}</span>${d.logo?`<img src="${d.logo}" alt="">`:''}<b>${S.esc(r.co)}</b><em>${t}</em></p>`;
  const p1=`<section class="sd-pn sd2-p sd2-p1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
      ${bug('Locked '+d.called)}${corners(0)}
      <p class="sd-sr">${bulls.length} said up, ${bears.length} said down. ${cs.map(x=>S.NM[x.m]+' '+(x.c.up?'up ':'down ')+x.c.v+'%').join('. ')}.</p></section>`;
  const p2=`<section class="sd-pn sd2-p sd2-p2" aria-label="Step 2">${cap(2,S.esc(r.co)+' reports. Then the close')}
      <div class="sd2-tv"><div class="sd-film"></div></div>
      <div class="sd2-score"><span class="sd2-bell" aria-hidden="true">Ding! Ding!</span><span class="sd2-sc"><small>The close · ${d.graded_on}</small><b class="${up?'sd2-su':'sd2-sd'}">${up?'▲ +':'▼ −'}${S.pct(A)}</b></span></div>
      <p class="sd-sr">${S.esc(r.co)} ${up?'rose':'fell'} ${S.pct(A)} at the close.</p></section>`;
  const p3=`<section class="sd-pn sd2-p sd2-p3" aria-label="Step 3">${cap(3,'The market grades every call')}
      ${corners(1)}
      <p class="sd2-rule">Right corner passes. Closest pass takes the round.</p>
      <a class="sd2-open" href="#/round/${r.n}">Open its graded card →</a></section>`;
  /* the season's P&L race, just before and just after this round */
  const P=window.__x2pPnl().A,bf=d.before,af=d.after;
  const race=`<div class="sd2-race" aria-label="Season P&L after round ${r.n}: ${af.map((m,i)=>(i+1)+' '+S.NM[m]).join(', ')}"><p class="sd2-rh">Season P&amp;L, after round ${r.n}</p>
      <ol class="sd2-rl">${af.map((m,i)=>{const was=bf.indexOf(m),mv=was-i;return `<li class="${i?'':'sd2-gold'}" style="--from:${was-i}">
        <b class="sd2-rk">${i?'#'+(i+1):'#1'}</b>${S.face(m,'sd2-rf')}<span class="sd2-rn">${S.NM[m]}</span>
        <b class="sd2-rv ${d.cum(m,r.n)>=0?'sd-tu':'sd-td'}">${S.sg(d.cum(m,r.n))}${S.$k(d.cum(m,r.n))}</b>${mv?`<i class="sd2-mv ${mv>0?'sd2-mvu':'sd2-mvd'}">${mv>0?'▲':'▼'}${Math.abs(mv)}</i>`:'<i class="sd2-mv"></i>'}</li>`}).join('')}</ol></div>`;
  const ws=cs.filter(x=>x.win),pay=(ws.length?ws:cs.slice().sort((a,b)=>b.v-a.v).slice(0,1))[0],rest=cs.filter(x=>x!==pay);
  const p4=`<section class="sd-pn sd2-p sd2-p4 wc9-bill" aria-label="Step 4">${cap(4,'The payout')}
      <div class="sd2-pay"><div class="sd2-purse">${S.face(pay.m,'sd2-pfc')}<div><small>${S.NM[pay.m]} ${pay.v>=0?'made':'lost'}</small>${S.money(pay.v,'sd2-big '+(pay.v>=0?'sd2-bu':'sd2-bd'))}</div></div>
        <ul class="sd2-rest">${rest.map(x=>`<li>${S.face(x.m,'wc-f-s')}<span>${S.NM[x.m]}</span>${S.money(x.v,x.v>=0?'sd-tu':'sd-td')}</li>`).join('')}</ul>
        ${race}</div>
      <p class="sd2-fine">P&amp;L on this call. Pretend $100,000 accounts, the whole balance on every call.</p></section>`;
  const w=S.mount(`<div class="sd2-pg">${p1}${p2}${p3}${p4}</div>`,'sd-d2');if(!w){S.ready();return}
  S.once(w.querySelector('.sd2-p1'),.45);S.once(w.querySelector('.sd2-score'),.9);S.once(w.querySelector('.sd2-p3'),.45);
  S.once(w.querySelector('.sd2-p4'),.4,still=>{if(!still)w.querySelectorAll('.sd2-p4 [data-v]').forEach((n,i)=>S.count(n,200+i*80))});
  S.ready()})();
