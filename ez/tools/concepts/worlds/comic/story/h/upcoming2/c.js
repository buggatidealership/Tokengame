/* Take C · The billboard over the city. Ground: the night sky over the skyline, one per fight-night page.
   Day head: the ring card held up between rounds (the day and date on a tilted card) and, in the old dead space, one drawn bell per
   bout of the night and when the calls are due. Main event: a-tower, the floodlit billboard on the water-tower roof, mark and name lit.
   Calls: each AI has its own little marquee board under its mark; the call is set in bulbs, dark bulbs and a "?" while it waits.
   Undercard: the lit windows of the building across the street, each bout a shop sign in its company's colour. */
(async function(){const {U,S,e}=H2;
const bell=(seed)=>{const r=U.rnd(U.hash(seed)),j=()=>((r()*2-1)*.8).toFixed(1);
  return `<svg viewBox="0 0 40 40" aria-hidden="true"><path class="bo" d="M${8+ +j()} 31C${9} 18 ${12} 9 20 8C${28} 9 ${31} 18 ${32+ +j()} 31Z"/><path class="bh" d="M13 26C14 18 16 13 20 12"/><rect class="bo" x="5" y="30" width="30" height="5" rx="2"/><circle class="bo" cx="20" cy="37" r="2.6"/><path class="bo" d="M18 8L18 4L22 4L22 8"/></svg>`};
const head=d=>{const m=d.items[0],r=U.rnd(U.hash(d.k));
  return `<div class="c-dh"><div class="c-rc" style="--r:${((r()*2-1)*2.5-1.5).toFixed(1)}deg"><span class="c-rk">Fight night</span><b>${e(d.lab.a)}</b><small>${e(d.lab.b)}</small></div>
   <div class="c-bells"><span class="c-br">${d.items.map((x,i)=>`<i style="--r:${((r()*2-1)*10).toFixed(0)}deg">${bell(x.n)}</i>`).join('')}</span>
    <p><b>${d.items.length}</b> bouts<br>${e(m.locked?'Graded at the close':'Calls due '+S.wd(m.day))}</p></div></div>`};
const calls=x=>H2.callsOf(x).map(({m,c})=>`<span class="c-cl ${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)}">${U.face(m,'c-fc')}
   <span class="c-bd"><b data-t="${e(H2.ctext(c))}">${e(H2.ctext(c))}</b></span><span class="h2-sr">${e(H2.csr(m,c))}</span></span>`).join('');
const und=x=>{const ps=H2.callsOf(x);return `<a class="hu-it c-win" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))};--fg:${S.onB(S.brand(x.ticker))}">
   <span class="c-aw"><b class="hu-t h2-fit">${e(U.nm(x.ticker))}</b><small>(${e(S.tk(x.ticker))})</small></span>
   <span class="c-gl"><span class="c-lg">${U.logoEl(x.ticker,'c-l','own',52)}</span>
    <span class="c-four">${ps.map(({m,c})=>`<i class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${U.face(m,'c-mf')}<em>${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span><span class="c-rn">R${x.n}${x.m7?' · Mag 7':''}</span></span></a>`};
await H2.build({cls:'tC',scene:'a-tower',head,calls,und,undLabel:'Undercard · across the street'})})();
