/* Take B · The arena front. Ground: the brick wall under a sodium lamp, one per fight-night page.
   Day head: a two-ink fight bill pasted on the wall (day, date), and beside it, filling the old dead space, the night's line-up:
   every company of the night as a printed seal, the count and when the calls are due. Main event: a-arena, the arena's own
   marquee canopy with the mark and the name lit on its blank panel. Calls: each AI holds up a scorecard; until its call is in we
   see the card's back (a "?" stamped in the AI's colour), then the front (green up, red down). Undercard: posters pasted on the brick. */
(async function(){const {U,S,e}=H2;
const head=d=>{const m=d.items[0],r=U.rnd(U.hash(d.k));
  return `<div class="b-dh"><div class="b-bill" style="--r:${((r()*2-1)*1.6).toFixed(1)}deg"><span class="b-fn">Fight night</span><b class="b-day">${e(d.lab.a)}</b><span class="b-date">${e(d.lab.b)}</span></div>
   <div class="b-line"><p class="b-cnt"><b>${d.items.length}</b> bouts · ${e(m.locked?'graded at the close':'calls due '+S.wd(m.day))}</p>
    <ul class="b-seals">${d.items.map((x,i)=>`<li class="b-seal${i?'':' me'}" style="${S.bvars(S.brand(x.ticker))};--r:${((r()*2-1)*6).toFixed(1)}deg">${U.logoEl(x.ticker,'b-sl','own',44)}<span class="h2-sr">${e(U.nm(x.ticker))}</span></li>`).join('')}</ul></div></div>`};
/* a scorecard on a stick, drawn by hand: its outline wobbles per AI, the back is crosshatched card, the front is printed ink */
const card=(seed,front)=>{const r=U.rnd(U.hash(seed)),j=()=>((r()*2-1)*1.2).toFixed(1);
  return `<svg viewBox="0 0 60 74" aria-hidden="true"><rect class="st" x="27.5" y="44" width="5" height="30" rx="1.5"/>
   <path class="pc" d="M${3+ +j()} ${3+ +j()}L${57+ +j()} ${2+ +j()}L${58+ +j()} ${47+ +j()}L${2+ +j()} ${48+ +j()}Z"/>
   ${front?'':`<path class="hx" d="M8 10L20 4M8 20L34 6M8 30L48 8M8 40L54 14M16 44L54 24M30 44L54 34"/>`}</svg>`};
const calls=x=>H2.callsOf(x).map(({m,c},i)=>`<span class="b-cl ${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)};--t:${(i%2?2.5:-2.5)}deg">
   <span class="b-cd">${card(m+x.n,!!c)}<b>${c?(c.dir==='UP'?'▲':'▼'):'?'}</b>${c?`<em>${Math.abs(+c.mag)}%</em>`:''}</span>${U.face(m,'b-fc')}<span class="h2-sr">${e(H2.csr(m,c))}</span></span>`).join('');
const und=x=>{const f=U.frame('b'+x.n,{j:1.6,n:5,inner:false}),ps=H2.callsOf(x);
  return `<a class="hu-it b-po" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="b-pp" style="clip-path:${f.clip}">
   <span class="b-top">R${x.n} · Undercard</span><span class="b-pl">${U.logoEl(x.ticker,'b-plg','own',56)}</span>
   <span class="b-pn"><b class="hu-t h2-fit">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}${x.m7?' · Mag 7':''}</small></span>
   <span class="b-vs">vs</span><span class="b-four">${ps.map(({m,c})=>`<i class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${U.face(m,'b-mf')}<em>${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span></span></a>`};
await H2.build({cls:'tB',scene:'a-arena',head,calls,und})})();
