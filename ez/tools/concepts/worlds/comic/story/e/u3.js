/* U3 · The road to Bet #1: the rounds still to come as stops on a road that ends at NVIDIA, the first bet. The gaps between
   stops are the real days between them; a company's coin is its own colours, bigger for a bigger company; a balloon over each
   coin shows the four calls once they are in, a "?" before. */
(function(){const S=SE,root=S.upMount('se-u3');if(!root)return S.ready();
  const all=S.toCome(),days=S.byDay(all),wait=days.find(d=>d.k==='wait'),road=days.filter(d=>d.k!=='wait');
  const sz=x=>{const c=S.cap(x.ticker);return c>=1000?'se-u3xl':c>=200?'se-u3l':''};
  const coin=x=>{const bc=x.nv?'#fdbc2a':S.brand(x.ticker);const cs=S.ORDER.map(m=>x.calls.find(c=>c.m===m)).filter(Boolean);
    return `<a class="se-u3c ${sz(x)}${x.locked?' se-u3lk':''}${x.nv?' se-u3nv':''}" href="#/round/${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${S.bvars(bc)}">
      <span class="se-u3bb" aria-hidden="true">${x.locked?cs.map(c=>`<i class="${c.dir==='UP'?'se-u3u':'se-u3d'}">${c.dir==='UP'?'▲':'▼'}</i>`).join(''):'<i class="se-u3qm">?</i>'}</span>
      <span class="se-u3d0">${S.coImg(x.ticker)}</span><b>${S.esc(x.nv?'NVIDIA':S.tk(x.ticker))}</b>
      <span class="wc-sr">${S.esc(x.co)}. ${x.locked?cs.filter(c=>c.dir==='UP').length+' say up, '+cs.filter(c=>c.dir!=='UP').length+' say down':'Calls not in yet'}</span></a>`};
  const t0=S.today(),DAY=864e5;let prev=t0;
  const stops=road.map((d,i)=>{const t=S.pd(d.k).t,gap=Math.max(0,Math.round((t-prev)/DAY)-1);prev=t;const l=S.dayLab(d.k),nv=d.items.some(x=>x.nv);
    return `<li class="se-u3s${nv?' se-u3fin':''}" style="--gap:${gap};--x:${((t-t0)/DAY).toFixed(2)}"><span class="se-u3pin" aria-hidden="true"></span>
      <div class="se-u3dl" role="heading" aria-level="3"><b>${S.esc(S.rel(d.k)==='Tomorrow'?'Tomorrow':S.wd(d.k))}</b><span>${S.esc(S.md(d.k))}</span></div>
      ${nv?'<div class="se-u3b1" aria-hidden="true"><b>Bet #1</b><small>The pool goes on the top AI\'s NVIDIA call</small></div>':''}
      <div class="se-u3cs">${d.items.map(coin).join('')}</div></li>`}).join('');
  const span=(S.pd(road[road.length-1].k).t-t0)/DAY;
  root.innerHTML=`<div class="se-u3hd"><span class="se-u3you">You are here<small>${S.esc(new Date(t0).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'}))}</small></span><span class="se-u3to"><b>${Math.round(span)} days</b> to the NVIDIA call</span></div>
    <ol class="se-u3rd" style="--span:${span.toFixed(2)}">${stops}</ol>
    <p class="se-u3fine">Right call: profits buy back $EZ. Wrong call: the pool can be wiped out.</p>
    ${wait?`<div class="se-u3wt"><div class="se-u3dl" role="heading" aria-level="3"><b>Still waiting</b><span>Dates passed, calls not in</span></div><div class="se-u3cs">${wait.items.map(coin).join('')}</div></div>`:''}`;
  root.querySelectorAll('.se-u3s').forEach(e=>S.once(e,.3));S.ready()})();
