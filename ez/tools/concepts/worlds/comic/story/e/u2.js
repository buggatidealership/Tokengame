/* U2 · The box office: every round is an Admit One ticket in its company's colours, racked on a real calendar, week by week.
   A punched ticket stamped LOCKED has its calls in (the four arrows printed on it); an unpunched one is still waiting. */
(function(){const S=SE,root=S.upMount('se-u2');if(!root)return S.ready();
  const tix=x=>{const bc=x.nv?'#fdbc2a':S.brand(x.ticker);return `<a class="se-u2t${x.locked?' se-u2l':''}${x.nv?' se-u2nv':''}" href="#/round/${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="--bc:${bc};--bt:${S.onB(bc)}">
    <span class="se-u2s" aria-hidden="true"><b>R${x.n}</b><i>${x.nv?'Bet #1':x.m7?'Mag 7':'Admit one'}</i></span>
    <span class="se-u2b"><span class="se-u2hd"><span class="se-u2lg">${S.coImg(x.ticker)}</span><b>${S.esc(x.co)}</b></span>
      ${x.locked?`<span class="se-u2cs">${S.ORDER.map(m=>{const c=x.calls.find(q=>q.m===m);if(!c)return '';const up=c.dir==='UP';return `<i class="${up?'se-u2u':'se-u2d'}">${S.face(m,'wc-f-s')}${up?'▲':'▼'}${c.mag}%</i>`}).join('')}</span><em class="se-u2st" aria-hidden="true">Locked</em>`
        :`<span class="se-u2due">Calls due ${x.r==='Tomorrow'?'tomorrow':x.r==='past'?'soon':S.wd(x.day)}</span>`}</span>
    <span class="wc-sr">${x.locked?'Calls in, locked':'Calls not in yet'}</span></a>`};
  const DAY=864e5,mon=t=>{const d=new Date(t).getUTCDay();return t-((d+6)%7)*DAY};
  const days=S.byDay(S.toCome()),wk={},wait=days.find(d=>d.k==='wait');
  days.filter(d=>d.k!=='wait').forEach(d=>{const t=S.pd(d.k).t,m=mon(t);(wk[m]=wk[m]||{})[(new Date(t).getUTCDay()+6)%7]=d});
  const today=Date.parse(new Date().toISOString().slice(0,10));
  root.innerHTML=Object.keys(wk).sort((a,b)=>a-b).map(m=>{m=+m;const cols=[0,1,2,3,4].map(i=>{const t=m+i*DAY,d=wk[m][i],k=S.MDK(t),rl=d?S.rel(d.k):null;
      if(!d)return `<div class="se-u2day se-u2emp${t<S.today()?' se-u2past':''}"><h3 class="se-u2dh"><b>${new Date(t).toLocaleDateString('en-US',{weekday:'short',timeZone:'UTC'})}</b><span>${new Date(t).getUTCDate()}</span></h3><p>${t<S.today()?'':'No reports on the card'}</p></div>`;
      return `<div class="se-u2day${rl==='Tomorrow'||rl==='Today'?' se-u2next':''}"><h3 class="se-u2dh"><b>${S.wd(d.k)}</b><span>${S.pd(d.k).d}</span>${rl==='Tomorrow'||rl==='Today'?`<em>${rl}</em>`:''}<small>${d.items.length}</small></h3><div class="se-u2rk">${d.items.map(tix).join('')}</div></div>`}).join('');
    return `<section class="se-u2wk" aria-label="Week of ${S.esc(S.md(S.MDK(m)))}"><h2 class="se-u2wh" role="heading">Week of ${S.esc(S.md(S.MDK(m)))}</h2><div class="se-u2g">${cols}</div></section>`}).join('')
    +(wait?`<section class="se-u2wk se-u2wt" aria-label="Waiting on calls"><h2 class="se-u2wh">Waiting on calls<small>Their dates passed. The calls are not in yet.</small></h2><div class="se-u2rk">${wait.items.map(tix).join('')}</div></section>`:'');
  root.querySelectorAll('.se-u2l').forEach(e=>S.once(e,.6));S.ready()})();
