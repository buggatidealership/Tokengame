/* U1 · Fight night: every day is a fight card. The biggest company headlines it in its own colours; when the calls are in,
   the four AIs stand in two corners, bulls (said up) against bears (said down); before that the corners are empty. */
(function(){const S=SE,root=S.upMount('se-u1');if(!root)return S.ready();
  const corner=(x,up)=>{const cs=x.calls.filter(c=>(c.dir==='UP')===!!up);return `<div class="se-u1c ${up?'se-u1bu':'se-u1be'}"><small>${up?'Bulls':'Bears'}</small><span>${cs.length?cs.map(c=>`<i class="se-u1f">${S.face(c.m)}<em>${S.NM[c.m]}</em></i>`).join(''):'<i class="se-u1none">Nobody</i>'}</span></div>`};
  const empty=`<div class="se-u1c se-u1q"><small>Bulls</small><span><i class="se-u1f"><b>?</b></i></span></div><div class="se-u1c se-u1q"><small>Bears</small><span><i class="se-u1f"><b>?</b></i></span></div>`;
  const main=x=>{const bc=S.brand(x.ticker);return `<a class="se-u1m${x.locked?'':' se-u1open'}${x.nv?' se-u1nv':''}" href="#/round/${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="--bc:${bc};--bt:${S.onB(bc)}">
    <span class="se-u1me">${x.nv?'Bet #1 · Main event':'Main event'}</span>
    <header><span class="se-u1lg">${S.coImg(x.ticker)}</span><b>${S.esc(x.co)}</b><small>${S.esc(S.tk(x.ticker))} · R${x.n}</small></header>
    <div class="se-u1ring">${x.locked?corner(x,1)+'<b class="se-u1vs">VS</b>'+corner(x,0):empty.replace('</div><div','</div><b class="se-u1vs">VS</b><div')}</div>
    <p class="se-u1ft">${x.locked?'Calls locked. '+S.esc(S.closeTxt(x)||'The close decides.'):'Calls due '+(S.rel(x.day)==='Tomorrow'?'tomorrow':S.wd(x.day))+'. The corners fill up then.'}</p></a>`};
  const under=x=>{const bc=S.brand(x.ticker);return `<a class="se-u1u${x.locked?'':' se-u1open'}${x.nv?' se-u1nv':''}" href="#/round/${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="--bc:${bc};--bt:${S.onB(bc)}">
    <span class="se-u1ul">${S.coImg(x.ticker)}</span><b>${S.esc(x.co)}${x.nv?' <em class="se-u1b1">Bet #1</em>':x.m7?' <em>Mag 7</em>':''}</b>
    ${x.locked?`<span class="se-u1t"><span class="se-u1tg">${x.calls.filter(c=>c.dir==='UP').map(c=>S.face(c.m,'wc-f-s')).join('')}</span><i>vs</i><span class="se-u1tr">${x.calls.filter(c=>c.dir!=='UP').map(c=>S.face(c.m,'wc-f-s')).join('')}</span></span>`:'<span class="se-u1due">Calls due</span>'}</a>`};
  root.innerHTML=S.byDay(S.toCome()).map(({k,items})=>{const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,m=items[0];
    return `<section class="se-u1d" aria-label="${S.esc(l.a+' '+l.b)}"><header class="se-u1h"><span class="se-u1fn">${k==='wait'?'On hold':'Fight night'}</span><div class="se-u1hh" role="heading" aria-level="2">${S.esc(l.a)}<small>${S.esc(l.b)}</small></div>
      <p>${lk?`<b>${lk} locked</b>`:''}${lk&&items.length>lk?' · ':''}${items.length>lk?(items.length-lk)+' to call':''}</p></header>
      ${k==='wait'?'':main(m)}${(k==='wait'?items:items.slice(1)).length?`<p class="se-u1uh">${k==='wait'?'':'Undercard'}</p><div class="se-u1ug">${(k==='wait'?items:items.slice(1)).map(under).join('')}</div>`:''}</section>`}).join('');
  root.querySelectorAll('.se-u1m').forEach(e=>S.once(e,.35));S.ready()})();
