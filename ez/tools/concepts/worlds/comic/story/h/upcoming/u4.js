/* U4 · The ring from above: every bout is a ring seen from the rafters. The main event is the big ring, the company's mark printed on
   the canvas in the spotlight, the four AIs in the four corners with their calls in balloons; the undercard is a grid of smaller rings.
   The day heads are banners in the painted walkout tunnel; the top is the ring at dusk. */
(async function(){const U=HU,S=U.S,e=U.esc,I=U.IMG;const root=U.mount('u4');const T=U.tot();
const POS=[['c-tl',25,24],['c-tr',75,24],['c-bl',25,77],['c-br',75,77]];
const corner=(m,c,i,big)=>{const [k,x,y]=POS[i];return `<span class="u4-co u4-${k}" style="left:${x}%;top:${y}%;--mc:${S.col(m)}">${U.face(m,'u4-f')}${big?`<b class="u4-bl ${c?(c.dir==='UP'?'up':'dn'):'q'}">${c?(c.dir==='UP'?'▲':'▼')+Math.abs(+c.mag)+'%':'?'}</b>`:`<b class="u4-dot ${c?(c.dir==='UP'?'up':'dn'):'q'}">${c?(c.dir==='UP'?'▲':'▼'):'?'}</b>`}<span class="u4-sr">${e(S.NM[m])}: ${c?(c.dir==='UP'?'up':'down'):'not in yet'}</span></span>`};
const ring=(x,big)=>`<a class="hu-it u4-ring ${big?'u4-big':''}" ${U.itAttr(x)} style="${S.bvars(S.brand(x.ticker))}"><span class="u4-cv">
   <span class="u4-spot">${U.logoEl(x.ticker,'u4-lg','ink',big?160:60)}<b class="u4-nm hu-t">${e(U.nm(x.ticker))}</b>${big?`<small>${e(S.tk(x.ticker))}</small>`:''}</span>
   ${U.calls(x).map(({m,c},i)=>corner(m,c,i,big)).join('')}</span>
   <span class="u4-tag"><b>${big?'Main event':'R'+x.n}</b>${big?`<i>R${x.n}</i>${x.m7?'<i>Mag 7</i>':''}${x.ai?'<i>AI</i>':''}`:''}</span>
   ${big?`<span class="u4-due">${x.locked?'Graded at the close':'Calls due '+e(S.wd(x.day,1))}</span>`:''}</a>`;
const day=d=>{const [m,...rest]=d.items;return `<section class="hu-day u4-day" aria-label="${e(d.lab.a+' '+d.lab.b)}">
  <header class="u4-dh"><img src="${I}tunnel-walkout.jpg" alt=""><span class="u4-ban"><i>Fight night</i><b>${e(d.lab.a)}</b><small>${e(d.lab.b)} · ${d.items.length} bouts</small></span></header>
  ${ring(m,1)}${rest.length?`<div class="u4-und"><p class="u4-uh">Undercard</p><div class="u4-grid">${rest.map(x=>ring(x,0)).join('')}</div></div>`:''}</section>`};
const fr=U.frame('u4top',{j:.5,n:4});
root.innerHTML=`<header class="u4-top"><div class="u4-sw"><div class="u4-sc" style="clip-path:${fr.clip}"><img src="hedra/openers/o3-tonight-gpt-image-2.jpg" alt="A boxing ring on a rooftop at dusk, the bell on its post"></div>${fr.svg}
  <h2 class="u4-h">Next on the card</h2></div>
  <p class="u4-ln"><b>${T.u}</b> bouts still to call, <b>${T.l}</b> locked in. Each AI calls the stock before it reports; the next close grades it.</p></header>
 <nav class="u4-flt" aria-label="Show">${U.FLT.map(([k,l],i)=>`<button type="button" class="u4-pad u4-p${i}" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}</nav>
 ${U.days().filter(d=>d.k!=='wait').map(day).join('')}`;
U.wireFilter(root);await U.paint(root);await document.fonts.ready;U.fit(root,'.u4-nm',9);document.documentElement.classList.add('hu-ready')})();
