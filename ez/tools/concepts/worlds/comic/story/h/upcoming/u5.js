/* U5 · The fight programme: the tab is the night's souvenir programme, printed by risograph (yellow, red, teal inks). The ring at dusk
   is printed on the cover in red and teal; each fight night is a programme page with the main event's tale of the tape: the company in
   one corner with its size as its weight (market cap, CAPS), the four AIs in the other with their calls; the undercard as billing lines. */
(async function(){const U=HU,S=U.S,e=U.esc,I=U.IMG;const root=U.mount('u5');const T=U.tot();
const wt=t=>{const c=S.cap(t);return c?(c>=1000?'$'+(c/1000).toFixed(2).replace(/0$/,'')+'T':'$'+Math.round(c)+'B'):''};
const ai=(m,c)=>`<li style="--mc:${S.col(m)}">${U.face(m,'u5-f')}<b>${e(S.NM[m])}</b><em class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${c?(c.dir==='UP'?'Up ':'Down ')+Math.abs(+c.mag)+'%':'?'}</em></li>`;
const page=(d,i)=>{const [m,...rest]=d.items;const w=wt(m.ticker);
  return `<section class="hu-day u5-day" aria-label="${e(d.lab.a+' '+d.lab.b)}" style="--pt:${i%2?.5:-.5}deg">
   <header class="u5-dh"><span class="u5-pg">${e(d.lab.a)}</span><small>${e(d.lab.b)} · ${d.items.length} bouts</small></header>
   <a class="hu-it u5-tot" ${U.itAttr(m)}><p class="u5-me">Main event · Round ${m.n}</p>
    <div class="u5-cnr"><div class="u5-co" style="${S.bvars(S.brand(m.ticker))}">${U.logoEl(m.ticker,'u5-lg','ink',120)}<b class="u5-nm hu-t">${e(U.nm(m.ticker))}</b>
      <dl>${w?`<dt>Weight</dt><dd>${w}</dd>`:''}<dt>Ticker</dt><dd>${e(S.tk(m.ticker))}</dd>${m.m7?'<dt>Class</dt><dd>Mag 7</dd>':''}</dl></div>
     <span class="u5-vs">vs</span><ul class="u5-ais">${U.calls(m).map(({m:mm,c})=>ai(mm,c)).join('')}</ul></div>
    <p class="u5-due">${m.locked?'Graded at the close':'Calls due '+e(S.wd(m.day,1))+'. Graded at the next close.'}</p></a>
   ${rest.length?`<p class="u5-uh">Undercard</p><ol class="u5-und">${rest.map(x=>`<li><a class="hu-it u5-ul" ${U.itAttr(x)}>${U.logoEl(x.ticker,'u5-ulg','ink',44)}<b class="hu-t">${e(U.nm(x.ticker))}</b><span class="u5-w">${wt(x.ticker)||e(S.tk(x.ticker))}</span><span class="u5-q">${U.calls(x).map(({m:mm,c})=>`<i style="--mc:${S.col(mm)}" class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${c?(c.dir==='UP'?'▲':'▼'):'?'}</i>`).join('')}</span></a></li>`).join('')}</ol>`:''}</section>`};
root.innerHTML=`<header class="u5-cover"><p class="u5-kick">Official programme · Season 1</p><div class="u5-pic"><img src="hedra/openers/o3-tonight-gpt-image-2.jpg" alt="A boxing ring on a rooftop at dusk, the bell on its post"></div>
  <h2 class="u5-h">Next on<br>the card</h2><p class="u5-cnt"><strong>${T.u}</strong> bouts to call <i>·</i> <strong>${T.l}</strong> locked in</p>
  <p class="u5-ln">Each AI calls the stock before it reports. The next close grades it.</p></header>
 <nav class="u5-flt" aria-label="Show"><span>Show</span>${U.FLT.map(([k,l])=>`<button type="button" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}</nav>
 <div class="u5-pages">${U.days().filter(d=>d.k!=='wait').map(page).join('')}</div>`;
U.wireFilter(root);await U.paint(root);await document.fonts.ready;U.fit(root,'.u5-nm',18);U.fit(root,'.u5-ul b',10);document.documentElement.classList.add('hu-ready')})();
