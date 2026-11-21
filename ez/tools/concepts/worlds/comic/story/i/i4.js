/* I4 · Title fight: the cover answers "Who's winning?" as a face-off between the golden ticket holder and the challenger,
   with the gap between them; every ticket says how far it moved in 7 days and how far it is behind #1; then the title
   history, every reign of the golden ticket this season as a ribbon you can read left to right. */
(function(){const S=SI,D=document,B=S.lbBase();if(!B)return;const {lb,cv,sbd,byM}=B;
const [h,c]=S.rank,pl=m=>S.P[m].pnl,gap=pl(h)-pl(c),rg=S.reigns[S.reigns.length-1],chg=S.reigns.length-1,l5=S.last5(h);
const lg=S.coLogo(rg.r0.ticker);
cv.classList.add('si4-cv');
cv.innerHTML=`<div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
<h1 class="wc-tab-h">Who's winning?</h1>
<div class="si4-vs"><div class="si4-a">${S.face(h,'wc-f-xl si4-hf',true)}${S.gt('si4-gt')}<span class="si4-nm">${S.NM[h]}</span><em class="${pl(h)>=0?'wc-tu':'wc-td'}">${S.$f(pl(h))}</em></div>
 <div class="si4-mid"><span class="si4-v">VS</span><span class="si4-gap"><small>Gap</small>${S.$f(gap).replace('+','')}</span></div>
 <div class="si4-b">${S.face(c,'wc-f-xl')}<span class="si4-ch">Challenger</span><span class="si4-nm">${S.NM[c]}</span><em class="${pl(c)>=0?'wc-tu':'wc-td'}">${S.$f(pl(c))}</em></div></div>
<p class="si4-since">${S.NM[h]} took the ticket on round ${rg.n0}${lg?` <img src="${lg}" alt=""${S.coDk(rg.r0.ticker)}>`:''} ${S.esc(rg.r0.co)}. ${l5<=1?`But only ${l5} of its last 5 calls ${l5===1?'was':'were'} right.`:l5>=4?`${l5} of its last 5 calls were right.`:''}</p>`;
/* each ticket: movement in the last 7 days, and the distance to #1 */
S.rank.forEach((m,i)=>{const t=byM[m.toUpperCase()]||byM[S.NM[m].toUpperCase()];if(!t)return;const stub=t.querySelector('.wc9-stub');if(stub)stub.insertAdjacentHTML('beforeend',S.mv(m).html);
  const nm=t.querySelector('.wc-sb-nm');if(nm&&i)nm.insertAdjacentHTML('beforeend',`<span class="si4-bh">${S.k$(pl(h)-pl(m)).replace('+','')} behind</span>`)});
/* the title history: one segment per graded round, coloured by whoever held the ticket after it */
const seg=S.reigns.map((g,j)=>`<span class="si4-rg${j===S.reigns.length-1?' si4-now':''}" style="flex:${g.len};--mc:${S.col(g.m)}" title="${S.NM[g.m]}: round ${g.n0}${g.len>1?' to '+g.n1:''}">${g.len>=4?S.face(g.m,'wc-f-s'):''}</span>`).join('');
const long=S.reigns.slice().sort((a,b)=>b.len-a.len)[0];
const tally=S.ORDER.map(m=>({m,n:S.reigns.filter(g=>g.m===m).reduce((t,g)=>t+g.len,0)})).sort((a,b)=>b.n-a.n);
const hist=`<section class="si4-hs" aria-label="Title history"><h2 class="wc-h2 si-h"><span>Title history</span><small>Who held the golden ticket after every round. It has changed hands ${chg} times.</small></h2>
 <div class="si-pn si4-hp si-hal"><div class="si4-rb">${seg}</div><p class="si4-ax"><span>Round 1</span><span class="si4-nowl">Now</span></p>
 <div class="si4-tl">${tally.map(x=>`<span class="si4-ti" style="--mc:${S.col(x.m)}">${S.face(x.m,'wc-f-s',x.m===h)}<b>${S.NM[x.m]}</b><small>${x.n?x.n+' round'+(x.n===1?'':'s')+' on top':'never on top'}</small></span>`).join('')}</div>
 <p class="si4-lg">Longest hold: <b>${S.NM[long.m]}</b>, rounds ${long.n0} to ${long.n1}.</p></div></section>`;
sbd.insertAdjacentHTML('afterend',hist);
S.ready('i4')})();
