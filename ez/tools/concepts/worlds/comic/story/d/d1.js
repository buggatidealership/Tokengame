/* D1 · The round's ticket: the round is one Admit One ticket of four coupons that travels through the steps. Coupon 1 is printed
   with the four predictions and stamped LOCKED before the earnings; coupon 2 is the film's window up to the close; coupon 3 is the
   same four lines stamped PASS or FAIL by the market; coupon 4 is the payout, printed as a bill. Then (panel 5) its hole is punched
   in the Season 1 ticket. Parts: ticket stock + bands · C1 rows + lock stamp · C2 film window · C3 graded rows · C4 bill. */
(function(){const S=SD,d=S.data();if(!d){S.ready();return}
  const {r,up,cs}=d,A=r.a,cap=(n,t)=>`<p class="sd1-cap"><b class="sd1-n" aria-hidden="true">${n}</b><span>${t}</span></p>`;
  const row=(x,g)=>`<div class="sd1-r${g?(x.win?' sd1-win':x.ok?' sd1-ok':' sd1-no'):''}">${S.face(x.m,'sd1-f')}<span class="sd1-nm">${S.NM[x.m]}${g&&x.win?'<em>♛ Winner</em>':''}</span>
      <b class="sd1-cl ${x.c.up?'sd-tu':'sd-td'}">${x.c.up?'+':'−'}${x.c.v}%</b>${g?`<i class="sd1-st ${x.ok?'sd1-pass':'sd1-fail'}">${x.ok?'Pass!':'Fail!'}</i>`:''}</div>`;
  const perf='<div class="sd1-perf" aria-hidden="true"><i></i><i></i></div>';
  const ws=cs.filter(x=>x.win),pay=(ws.length?ws:cs.slice().sort((a,b)=>b.v-a.v).slice(0,1))[0],rest=cs.filter(x=>x!==pay);
  const c4t=d.right.length===1?`${S.NM[d.right[0].m]} gets paid. The other ${['','one','two','three'][rest.length]} pay.`:d.right.length?'The right way gets paid':'Nobody called it. Everyone pays';
  const c1=`<section class="sd1-cp sd1-c1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
      <header class="sd1-co">${d.logo?`<span class="sd1-lg"><img src="${d.logo}" alt=""></span>`:''}<h3>${S.esc(r.co)}<small>${S.esc(r.ticker)} earnings</small></h3><b class="sd1-lock" aria-label="Locked ${d.called}"><small>Locked</small>${d.called}</b></header>
      <div class="sd1-rows">${cs.map(x=>row(x,0)).join('')}</div></section>`;
  const c2=`<section class="sd1-cp sd1-c2" aria-label="Step 2">${cap(2,`${S.esc(r.co)} reports. Then the close`)}
      <div class="sd1-win2"><div class="sd-film"></div><span class="wc-sfx sd1-sfx ${up?'wc-up':'wc-dn'}" aria-hidden="true"><em>${S.sfx(A)}</em><b>${up?'+':'−'}${S.pct(A)}</b></span></div>
      <p class="sd1-at">The close · ${d.graded_on}</p><p class="sd-sr">${S.esc(r.co)} ${up?'rose':'fell'} ${S.pct(A)} at the close.</p></section>`;
  const c3=`<section class="sd1-cp sd1-c3" aria-label="Step 3">${cap(3,'The market grades every call')}
      <p class="sd1-mk ${up?'sd1-mku':'sd1-mkd'}"><small>Market</small><b>${up?'▲ +':'▼ −'}${S.pct(A)}</b></p>
      <div class="sd1-rows">${cs.map(x=>row(x,1)).join('')}</div>
      <p class="sd1-rule">Right way passes. Closest pass wins.</p>
      <a class="sd1-open" href="#/round/${r.n}">Open its graded card →</a></section>`;
  const c4=`<section class="sd1-cp sd1-c4" aria-label="Step 4">${cap(4,c4t)}
      <div class="sd1-bill"><span class="sd1-oval">${S.face(pay.m,'sd1-pf')}</span>
        <div class="sd1-pay"><small>${S.NM[pay.m]} ${pay.v>=0?'made':'lost'}</small>${S.money(pay.v,'sd1-big '+(pay.v>=0?'sd1-bu':'sd1-bd'))}</div>
        <ul class="sd1-ded">${rest.map(x=>`<li>${S.face(x.m,'wc-f-s')}<span>${S.NM[x.m]}</span>${S.money(x.v,x.v>=0?'sd-tu':'sd-td')}</li>`).join('')}</ul>
        <p class="sd1-fine">P&amp;L on this call. Pretend $100,000 accounts, the whole balance on every call.</p></div></section>`;
  const html=`<div class="sd1-tk"><p class="sd1-hd" aria-hidden="true"><b>Admit one</b><span>Round ${r.n} · ${S.esc(d.tk)}</span></p>
      <div class="sd1-cps">${c1}${perf}${c2}${perf}${c3}${perf}${c4}</div><p class="sd1-ft" aria-hidden="true"><span>No. ${String(r.n).padStart(4,'0')}</span></p></div>`;
  const w=S.mount(html,'sd-d1');if(!w){S.ready();return}
  S.once(w.querySelector('.sd1-c1'),.5);S.once(w.querySelector('.sd1-c2'),.6);S.once(w.querySelector('.sd1-c3'),.5);
  S.once(w.querySelector('.sd1-c4'),.5,still=>{if(!still)w.querySelectorAll('.sd1-c4 [data-v]').forEach((n,i)=>S.count(n,700+i*80))});
  S.ready()})();
