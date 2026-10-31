/* T6 Costume: each card is cut from its founder's own costume (Hedra: Claude's tweed coat, GPT's armour plating, Grok's leather jacket,
   Kimi's flight-suit canvas) and every fact is sewn on as an embroidered patch: the rank in a round patch (gold thread for #1), the
   founder on a woven portrait patch, the name on a name tape, the flag patch, the role on a rocker, P&L and the rest on stat patches,
   the last five as five small round patches. */
(function(){const {d,P,INK,ROLE,money,mark,flag,port,sr,mount}=HC;const {sec,g}=mount('hc-t6');
const TH={CLAUDE:'#f3d9b0',GPT:'#0d0b10',GROK:'#e9e2f2',KIMI:'#f4ead2'};
d.models.forEach((x,i)=>{const b=x.best;const c=document.createElement('article');c.className='hc-card t6-c t6-'+x.m.toLowerCase()+(i===0?' t6-lead':'');c.dataset.m=x.m;
  c.innerHTML=sr(x,i)+`<div class="t6-cloth" aria-hidden="true">
    <div class="t6-lc">
     <div class="t6-pp"><div class="t6-ppi">${port(x.m)}</div></div>
     <div class="t6-rocker"><span>${P.esc(ROLE[i])}</span></div>
    </div>
    <div class="t6-rc">
     <div class="t6-hd"><div class="t6-rank"><small>No.</small><b>${i+1}</b></div><div class="t6-tape"><b>${P.esc(x.name.toUpperCase())}</b><span>${flag(x.flag,18,12)}${P.esc(x.ver)}</span></div></div>
     <div class="t6-pt t6-pl ${x.pnl>=0?'t6-up':'t6-dn'}"><small>Current P&amp;L</small><b>${money(x.pnl)}</b></div>
     <div class="t6-two"><div class="t6-pt"><small>Right way</small><b>${x.W}/${x.tot}</b></div><div class="t6-pt"><small>Best call</small><b class="${b.v>=0?'t6-bu':'t6-bd'}">${money(b.v)}</b><i>${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</i></div></div>
     <div class="t6-l5">${x.last5.map(s=>`<i class="t6-dot t6-${s}">${mark(s,14,{w:'#fff',l:'#fff'})}</i>`).join('')}<small>Last 5</small></div>
    </div>
   </div>`;g.appendChild(c)})})();
