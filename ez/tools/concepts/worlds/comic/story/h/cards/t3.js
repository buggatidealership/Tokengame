/* T3 Locker: each card a dented steel locker door (Hedra steel plate) in the locker room (Hedra). Rank = a spray-stencilled number
   on the steel (#1's in gold paint); the founder a print taped inside the locker's mesh window; name and stats on embossed Dymo tape
   (raised white letters, notched ends, green tape for a gain, red for a loss); role = a paper tag hung from the handle. */
(function(){const {d,P,INK,ROLE,money,mark,flag,port,sr,mount,rnd}=HC;
const {sec,g}=mount('hc-t3');
const dy=(t,cls,o={})=>`<span class="t3-dy ${cls||''}" style="--r:${o.r||0}deg">${t}</span>`;
d.models.forEach((x,i)=>{const b=x.best;const c=document.createElement('article');c.className='hc-card t3-c t3-r'+i;c.dataset.m=x.m;
  c.innerHTML=sr(x,i)+`<div class="t3-door" aria-hidden="true">
    <i class="t3-vent"></i>
    <div class="t3-win"><div class="t3-photo" style="--pr:${[-3,2.5,-2,3][i]}deg">${port(x.m)}<i class="t3-tp t3-tp1"></i><i class="t3-tp t3-tp2"></i></div></div>
    <div class="t3-labels">
     ${dy(P.esc(x.name.toUpperCase()),'t3-nm',{r:-1.5})}
     <span class="t3-ver">${dy(P.esc(x.ver.toUpperCase()),'t3-sm',{r:1})}${flag(x.flag,22,14)}</span>
     <span class="t3-k">P&amp;L</span>${dy(money(x.pnl),'t3-pl '+(x.pnl>=0?'t3-up':'t3-dn'),{r:.8})}
     <span class="t3-k">Right way</span>${dy(x.W+' OF '+x.tot,'t3-sm',{r:-1})}
     <span class="t3-k">Best call</span>${dy(money(b.v),'t3-sm '+(b.v>=0?'t3-up':'t3-dn'),{r:.6})}${dy(P.esc(b.r.co.toUpperCase())+' ('+P.esc(b.r.ticker)+')','t3-sm t3-co',{r:-.8})}
     <span class="t3-k">Last 5</span><span class="t3-l5">${x.last5.map(s=>mark(s,18,{w:'#5dff9e',l:'#ff6a5e'})).join('')}</span>
    </div>
    <div class="t3-foot"><div class="t3-rank"><small>No.</small><b>${i+1}</b></div><div class="t3-tag t3-g${i}"><i></i><span>${P.esc(ROLE[i])}</span></div></div>
   </div>`;g.appendChild(c)})})();
