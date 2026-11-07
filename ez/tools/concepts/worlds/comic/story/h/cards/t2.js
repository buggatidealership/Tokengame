/* T2 Fight poster: each card a boxing bill on aged card stock (Hedra), pasted on a back-alley brick wall (Hedra). Rank = the billing
   (Main event / Co-main / Feature bout / Opening bout) printed in a red wood-type band; the founder printed onto the stock (multiply);
   the name in wood type with a red misregistration; the role as a rubber stamp; the stats as the bill's fine print, pressed in ink. */
(function(){const {d,P,INK,ROLE,money,mark,flag,port,sr,mount,tear}=HC;const I='tools/concepts/worlds/comic/story/h/cards/img/';
const {sec,g}=mount('hc-t2');const BILL=['Main event','Co-main event','Feature bout','Opening bout'];
d.models.forEach((x,i)=>{const b=x.best;const c=document.createElement('article');c.className='hc-card t2-c t2-r'+i;c.dataset.m=x.m;
  c.style.setProperty('--tear',tear(14,1.6,31+i*17));c.style.setProperty('--rot',[-1.4,1.1,-.7,1.6][i]+'deg');
  c.innerHTML=sr(x,i)+`<div class="t2-paper" aria-hidden="true">
    <div class="t2-bill"><span>${BILL[i]}</span><b>No.${i+1}</b></div>
    <div class="t2-body">
     <div class="t2-lc"><div class="t2-pic">${port(x.m)}<i></i></div><div class="t2-stamp t2-s${i}">${P.esc(ROLE[i])}</div></div>
     <div class="t2-txt">
      <div class="t2-nm">${P.esc(x.name.toUpperCase())}</div>
      <div class="t2-ver">${P.esc(x.ver)} ${flag(x.flag,20,13)}</div>
      <div class="t2-pl"><small>P&amp;L</small><b class="${x.pnl>=0?'up':'dn'}">${money(x.pnl)}</b></div>
      <div class="t2-fine"><span>Right way <b>${x.W} of ${x.tot}</b></span><span>Best <b class="${b.v>=0?'up':'dn'}">${money(b.v)}</b> on ${P.esc(b.r.co)} (${P.esc(b.r.ticker)})</span></div>
      <div class="t2-l5"><small>Last 5</small>${x.last5.map(s=>mark(s,19,{w:'#178a4c',l:'#c8231b'})).join('')}</div>
     </div>
    </div>
   </div>`;g.appendChild(c)})})();
