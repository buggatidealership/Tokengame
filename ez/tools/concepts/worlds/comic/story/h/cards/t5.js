/* T5 The belt: each card a championship belt on its own strap of Hedra red leather, in the empty arena (Hedra). The founder fills the
   centre plate, and the plate's metal is the rank: gold (#1, the one we bet on), silver, steel, rusted iron. Side plates: the rank
   engraved with the role, and the P&L. Under the strap, a stitched tab: right way, best call with its company, last five as enamel studs. */
(function(){const {d,P,INK,ROLE,money,mark,flag,port,sr,mount}=HC;const {sec,g}=mount('hc-t5');const MET=['gold','silver','steel','iron'];
d.models.forEach((x,i)=>{const b=x.best;const c=document.createElement('article');c.className='hc-card t5-c t5-'+MET[i];c.dataset.m=x.m;
  c.innerHTML=sr(x,i)+`<div class="t5-wrap" aria-hidden="true">
    <div class="t5-rib"><span class="t5-nm">${P.esc(x.name.toUpperCase())}</span><span class="t5-ver">${flag(x.flag,20,13)}${P.esc(x.ver)}</span></div>
    <div class="t5-strap">
     <div class="t5-side t5-l"><small>No.</small><b>${i+1}</b><em>${P.esc(ROLE[i])}</em></div>
     <div class="t5-plate"><div class="t5-ring">${port(x.m)}</div></div>
     <div class="t5-side t5-r"><small>P&amp;L</small><b class="${x.pnl>=0?'up':'dn'}">${money(x.pnl)}</b></div>
    </div>
    <div class="t5-tab">
     <span><small>Right way</small><b>${x.W}/${x.tot}</b></span>
     <span class="t5-bc"><small>Best call</small><b class="${b.v>=0?'up':'dn'}">${money(b.v)}</b><i>${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</i></span>
     <span><small>Last 5</small><span class="t5-studs">${x.last5.map(s=>`<i class="t5-stud t5-${s}">${mark(s,13,{w:'#fff',l:'#fff'})}</i>`).join('')}</span></span>
    </div>
   </div>`;g.appendChild(c)})})();
