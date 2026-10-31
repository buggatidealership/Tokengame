/* U1 · Ringside at dusk: the painted ring at dusk is the tab's top, the filter is tape on the painted ring ropes,
   each day's main event is the championship belt with the company's mark engraved in its gold plate, the undercard are
   fight tickets printed in each company's own colour on painted ticket stock. */
(async function(){const U=HU,S=U.S,e=U.esc,I=U.IMG;const root=U.mount(window.__huScene?'u1 u6':'u1');const T=U.tot();
const balloon=(m,c,k)=>{const up=c&&c.dir==='UP',dn=c&&c.dir!=='UP';const r=U.rnd(U.hash(m+k));const j=()=>(r()*2-1).toFixed(1);
  return `<span class="u1-cl" style="--mc:${S.col(m)}">${U.face(m,'u1-fc')}<span class="u1-bl ${c?(up?'up':'dn'):'q'}"><svg viewBox="0 0 60 40" preserveAspectRatio="none" aria-hidden="true"><path d="M${4+ +j()} ${5+ +j()}Q30 ${1+ +j()} ${56+ +j()} ${5+ +j()}L${57+ +j()} ${29+ +j()}Q30 ${33+ +j()} 22 31L13 39L14 31Q4 31 ${3+ +j()} ${28+ +j()}Z" vector-effect="non-scaling-stroke"/></svg><b class="hu-t">${c?(up?'▲':'▼')+' '+e(Math.abs(+c.mag))+'%':'?'}</b></span><span class="u1-sr">${e(S.NM[m])}: ${c?(up?'up ':'down ')+e(Math.abs(+c.mag))+'%':'not in yet'}</span></span>`};
const SC=window.__huScene||{};
const main=(x,d)=>{if(SC[x.ticker])return scene(x);const f=U.frame('m'+x.n,{j:1.1,n:4});const due=x.locked?'Graded at the close':'Calls due '+S.wd(x.day);
  return `<a class="hu-it u1-main" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}">
   <span class="u1-mp" style="clip-path:${f.clip}"><span class="u1-spot"></span>
    <span class="u1-strap"><b>Main event</b><i>R${x.n}</i>${x.m7?'<i>Mag 7</i>':''}${x.ai?'<i>AI</i>':''}</span>
    <span class="u1-belt"><img src="${I}belt-cut.png" alt=""><span class="u1-plate">${U.logoEl(x.ticker,'u1-eng','gold',140)}</span></span>
    <span class="u1-nm"><b class="hu-t">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}</small></span>
    <span class="u1-calls">${U.calls(x).map(({m,c})=>balloon(m,c,x.n)).join('')}</span>
    <span class="u1-due">${e(due)}</span></span>${f.svg}</a>`};
/* U6: the main event's own painted scene (the company's mark built as a sign over the ring), lettered beneath */
const scene=x=>{const f=U.frame('s'+x.n,{j:1,n:4});const due=x.locked?'Graded at the close':'Calls due '+S.wd(x.day);
  return `<a class="hu-it u1-main u6-main" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="u1-mp u6-mp" style="clip-path:${f.clip}">
    <span class="u6-art"><img src="${I}${SC[x.ticker]}" alt="${e(U.nm(x.ticker))}'s mark as a lit sign over the ring"></span>
    <span class="u1-strap"><b>Main event</b><i>R${x.n}</i>${x.m7?'<i>Mag 7</i>':''}${x.ai?'<i>AI</i>':''}</span>
    <span class="u1-nm"><b class="hu-t">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}</small></span>
    <span class="u1-calls">${U.calls(x).map(({m,c})=>balloon(m,c,x.n)).join('')}</span>
    <span class="u1-due">${e(due)}</span></span>${f.svg}</a>`};
const tick=x=>{const f=U.frame('t'+x.n,{j:.8,n:3,inner:false});const lg=`<span class="u1-tl">${U.logoEl(x.ticker,'u1-tlg','own',60)}</span>`;
  return `<a class="hu-it u1-tk" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="u1-tb" style="clip-path:${f.clip}">
   <span class="u1-stub"><b>R${x.n}</b><i>Admit one</i></span>${lg}
   <span class="u1-tn"><b class="hu-t">${e(U.nm(x.ticker))}</b><small>${e(S.tk(x.ticker))}${x.m7?' · Mag 7':''}</small></span>
   <span class="u1-tc">${U.calls(x).map(({m,c})=>`<i style="--mc:${S.col(m)}">${U.face(m,'u1-tf')}<em class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span></span>${f.svg}</a>`};
const day=(d,i)=>{const [m,...rest]=d.items;const lab=d.lab;
  return `<section class="hu-day u1-day" aria-label="${e(lab.a+' '+lab.b)}"><header class="u1-dh"><span class="u1-fn">Fight night</span>
    <span class="u1-pl"><b>${e(lab.a)}</b><small>${e(lab.b)}</small></span><span class="u1-cnt"><b>${d.items.length}</b> bouts</span></header>
    <div class="u1-card">${main(m,d)}${rest.length?`<div class="u1-und"><p class="u1-uh">Undercard</p>${rest.map(tick).join('')}</div>`:''}</div></section>`};
const top=U.frame('top',{j:.6,n:4});
root.innerHTML=`<header class="u1-top"><div class="u1-sw"><div class="u1-scene" style="clip-path:${top.clip}"><img src="${'hedra/openers/o3-tonight-gpt-image-2.jpg'}" alt="A boxing ring on a rooftop at dusk, the bell on its post">
   <p class="u1-cap"><b>${T.u}</b> still to call · <b>${T.l}</b> locked in</p></div>${top.svg}</div>
  <h2 class="u1-h"><span>Next on</span><span>the card</span></h2>
  <p class="u1-ln">Each AI calls the stock <b>before</b> it reports. The next close grades it.</p></header>
 <nav class="u1-ropes hu-bleed" aria-label="Show"><img src="${I}ropes-strip.jpg" alt="">${U.FLT.map(([k,l],i)=>`<button type="button" class="u1-tape" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}<span class="u1-hint">Tap a round to open its card</span></nav>
 ${U.days().filter(d=>d.k!=='wait').map(day).join('')}`;
U.wireFilter(root);await U.paint(root);await document.fonts.ready;U.fit(root,'.u1-tn b',14);U.fit(root,'.u1-nm b',24);document.documentElement.classList.add('hu-ready')})();
