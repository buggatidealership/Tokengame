/* Take D · The programme, under the curtain. Ground: the red velvet curtain in a spotlight, one per fight-night page.
   Day head: the night's page of the souvenir programme: the day set big, and in the old dead space the running order, numbered,
   each bout with its company's mark, name and ticker. Main event: a-roof-seed (the 3D-modelled rooftop sign), mark and name lit.
   Calls: a four-panel strip, one close-up per AI in its own colour; it thinks ("?", a cloud) until its call is in, then shouts it.
   Undercard: Admit One tickets torn from the roll, printed in each company's colour on the painted ticket stock. */
(async function(){const {U,S,e}=H2;
const head=d=>{const m=d.items[0];return `<div class="d-dh"><div class="d-day"><span class="d-k">Fight night</span><b>${e(d.lab.a)}</b><small>${e(d.lab.b)} · ${e(m.locked?'graded at the close':'calls due '+S.wd(m.day))}</small></div>
   <ol class="d-ro">${d.items.map((x,i)=>`<li class="${i?'':'me'}"><i>${i?i+1:'★'}</i>${U.logoEl(x.ticker,'d-rl','own',26)}<b class="h2-fit">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}</small></li>`).join('')}</ol></div>`};
/* a strip panel per AI: speed strokes drawn as tapered wedges from behind the face (each panel its own seed), the balloon above */
const strokes=seed=>{const r=U.rnd(U.hash(seed));let p='';for(let i=0;i<11;i++){const a=(i/11)*Math.PI*2+r()*.3,a2=a+.05+r()*.05,R=70;p+=`M50 64L${(50+R*Math.cos(a)).toFixed(1)} ${(64+R*Math.sin(a)).toFixed(1)}L${(50+R*Math.cos(a2)).toFixed(1)} ${(64+R*Math.sin(a2)).toFixed(1)}Z`}
  return `<svg class="d-sk" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="${p}"/></svg>`};
const blob=(seed,think)=>{const r=U.rnd(U.hash(seed)),j=()=>((r()*2-1)*1.5).toFixed(1);
  return think?`<svg viewBox="-4 -4 68 52" aria-hidden="true"><path class="o" d="M10 ${14+ +j()}Q6 2 20 5Q28 -3 38 4Q52 0 54 12Q64 18 55 28Q56 38 42 36Q34 44 24 37Q8 40 9 28Q0 22 10 ${14+ +j()}Z"/><circle class="o" cx="22" cy="43" r="3"/></svg>`
   :`<svg viewBox="-4 -4 68 52" aria-hidden="true"><path class="o" d="M${4+ +j()} 6L${56+ +j()} ${3+ +j()}L${58+ +j()} 32L34 ${33+ +j()}L26 46L25 ${33+ +j()}L${3+ +j()} 34Z"/></svg>`};
const calls=x=>H2.callsOf(x).map(({m,c},i)=>`<span class="d-cl ${c?(c.dir==='UP'?'up':'dn'):'q'}" style="--mc:${S.col(m)};clip-path:${U.poly(U.wob(m+x.n,1.3,2))}">
   ${strokes(m+x.n)}<span class="d-bl">${blob(m+x.n,!c)}<b>${H2.ctext(c)}</b></span>${U.face(m,'d-fc')}<span class="d-nm">${e(S.NM[m])}</span><span class="h2-sr">${e(H2.csr(m,c))}</span></span>`).join('');
const und=x=>{const ps=H2.callsOf(x);return `<a class="hu-it d-tk" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))};--fg:${S.onB(S.brand(x.ticker))}">
   <span class="d-stub"><b>R${x.n}</b><i>Admit one</i></span>
   <span class="d-bd"><span class="d-lg">${U.logoEl(x.ticker,'d-l','own',48)}</span><span class="d-tx"><b class="hu-t h2-fit">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}${x.m7?' · Mag 7':''} · vs the four</small>
    <span class="d-four">${ps.map(({m,c})=>`<i class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${U.face(m,'d-mf')}<em>${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span></span></span></a>`};
await H2.build({cls:'tD',scene:'a-roof-seed',head,calls,und})})();
