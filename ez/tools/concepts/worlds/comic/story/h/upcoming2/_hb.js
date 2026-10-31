/* Round H2: the page-of-panels skeleton every take fills. A take passes its own pieces:
   {cls, scene, top(T), head(d), calls(x), und(x), undLabel}. Each fight night is one comic page: the day head across the top,
   the main event as the splash panel, the undercard as a strip of small panels; gutters show the take's painted ground. */
H2.build=async function(c){const {U,S,e}=H2;const root=U.mount('h2 '+c.cls);const T=U.tot();
  const main=(x)=>`<a class="hu-it h2-main" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}">
    <span class="h2-cap h2-cap-me">Main event${x.m7?' · Mag 7':''}${x.ai?' · AI':''}</span>
    ${c.callsIn?H2.signHtml(x,c.scene,`<span class="h2-calls h2-calls-in">${c.calls(x)}</span>`):H2.signHtml(x,c.scene)}
    <span class="h2-foot">${H2.nameLine(x)}<span class="h2-due">${e(H2.due(x))}<i> · R${x.n}</i></span></span>
    ${c.callsIn?'':`<span class="h2-calls">${c.calls(x)}</span>`}</a>`;
  const day=d=>{const [m,...rest]=d.items;return `<section class="hu-day h2-pg" aria-label="${e(d.lab.a+' '+d.lab.b)}">
    <header class="h2-dh">${c.head(d)}</header>
    <div class="h2-grid">${main(m)}${rest.length?`<div class="h2-und"><p class="h2-cap h2-cap-u">${c.undLabel||'Undercard'}</p>${rest.map(c.und).join('')}</div>`:''}</div></section>`};
  root.innerHTML=`<header class="h2-top"><div class="h2-op"><img src="hedra/openers/o3-tonight-gpt-image-2.jpg" alt="A boxing ring on a rooftop at dusk, the bell on its post">
      <p class="h2-cap h2-cap-tc"><b>${T.u}</b> still to call · <b>${T.l}</b> locked in</p></div>
    <h2 class="h2-h"><span>Next on</span><span>the card</span></h2>
    <p class="h2-ln">Each AI calls the stock <b>before</b> it reports. The next close grades it.</p>${H2.filterBar()}</header>
   ${U.days().filter(d=>d.k!=='wait').slice(0,c.days||4).map(day).join('')}`;
  if(c.after)c.after(root);await H2.done(root)};
