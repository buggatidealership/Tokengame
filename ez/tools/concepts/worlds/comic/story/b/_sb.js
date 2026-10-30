/* shared helpers for story take B (class prefix sb-). Reads the page's own globals only. */
window.SB=(function(){
  const D=document,ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
  const face=(m,cls)=>`<i class="wc-face ${cls||''}" style="--mc:${MODELS[m].c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${MODELS[m].d}"/></svg></i>`;
  /* the leader, as world-comic.js rankPnl(): models that called at least half the graded rounds first, then by P&L */
  const lead=()=>{if(window.__sbLead)return window.__sbLead;const P=window.__x2pPnl().A,N=ROUNDS.length;
    return ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl})[0]};
  const rank=()=>{const P=window.__x2pPnl().A,N=ROUNDS.length;return ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl})};
  /* a ticket's calls, in the page's model order: [{m,up,mag}] */
  const calls=t=>{if(t.dataset.sbCalls)return JSON.parse(t.dataset.sbCalls);
    const tk=((t.querySelector('header small')||{}).textContent||'').trim(),p=[].concat(window.PENDING||[],window.UPCOMING||[]).find(x=>x.ticker===tk)||{calls:[]};
    return ORDER.map(m=>{const c=(p.calls||[]).find(x=>x.m===m);return c?{m,up:c.dir==='UP',mag:c.mag}:null}).filter(Boolean)};
  /* a 4 vs 0 test ticket: a copy of the last ticket filled with the newest graded round where all four AIs agreed (real calls) */
  const fake4=build=>{const r=ROUNDS.slice().reverse().find(r=>{const cs=r.calls.filter(c=>c[1]);return cs.length===4&&cs.every(c=>/^UP/i.test(c[1])===/^UP/i.test(cs[0][1]))});if(!r)return;
    const all=[...D.querySelectorAll('.wc-cliff .wc-tnp')],src=all[all.length-1],t=src.cloneNode(true);
    t.querySelectorAll('[class^="sb-"],[class*=" sb-"]').forEach(x=>{if(!x.closest('header'))x.remove()});
    t.dataset.sbCalls=JSON.stringify(ORDER.map(m=>{const c=r.calls.find(x=>x[0]===m);const k=/^(UP|DOWN)\s+([\d.]+)/i.exec(c[1]);return {m,up:/UP/i.test(k[1]),mag:k[2]}}));
    const hb=t.querySelector('header b');if(hb)hb.innerHTML=r.co+'<small>'+r.ticker+'</small>';const im=t.querySelector('header img');const lg=(window.CO_LOGOS||{})[r.ticker];if(im&&lg)im.src='media/'+lg.f;
    const tb=t.querySelector('.wc9-ts b');if(tb)tb.textContent='R'+r.n;t.classList.add('sb-test');t.dataset.sbTest='Test: R'+r.n+' '+r.ticker+' calls, all 4 '+(/^UP/i.test(r.calls[0][1])?'up':'down');
    t.style.setProperty('--bm','#6b6070');t.querySelectorAll('.wc9-flg').forEach(f=>f.style.visibility='hidden');src.after(t);t.classList.add('wc-in');build(t);return t};
  const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  /* when an element first comes into view, add sb-in (motion starts there) */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('sb-in');io.unobserve(e.target)}}),{threshold:.25});
  return {D,ORDER,NM,face,lead,rank,calls,fake4,RM,seen:x=>io.observe(x)}})();
