/* U2 · The fight bill: every fight night is one letterpress poster pasted on the painted wall: the main event in wood type with the
   company's mark printed in black ink, "4 AIs take on" above it, the undercard as the poster's lower billing; the ring at dusk sits
   at the top as the bill's own picture. Two inks (red, black) on the painted poster stock; the filter is three paste-up stubs. */
(async function(){const U=HU,S=U.S,e=U.esc,I=U.IMG;const root=U.mount('u2');const T=U.tot();
const pip=(m,c)=>`<i class="u2-pp ${c?(c.dir==='UP'?'up':'dn'):'q'}" title="${e(S.NM[m])}">${U.face(m,'u2-pf')}<b>${c?(c.dir==='UP'?'▲':'▼')+Math.abs(+c.mag)+'%':'?'}</b></i>`;
const tilt=k=>((U.hash(k)%7)-3)*.35;
const bill=(d)=>{const [m,...rest]=d.items;const lab=d.lab;
  return `<section class="hu-day u2-day" aria-label="${e(lab.a+' '+lab.b)}" style="--tl:${tilt(d.k)}deg"><div class="u2-ps">
   <p class="u2-fn">★ Fight night ★</p><p class="u2-dy">${e(lab.a)} <span>${e(lab.b)}</span></p>
   <a class="hu-it u2-me" ${U.itAttr(m)}><span class="u2-rl">Main event · Round ${m.n}${m.m7?' · Mag 7':''}</span>
     <span class="u2-vs">4 AIs take on</span>
     ${U.logoEl(m.ticker,'u2-lg','ink',150)}
     <b class="u2-nm hu-t">${e(U.nm(m.ticker))}</b><small class="u2-tk">${e(S.tk(m.ticker))}</small>
     <span class="u2-pps">${U.calls(m).map(({m:mm,c})=>pip(mm,c)).join('')}</span>
     <span class="u2-due">${m.locked?'Graded at the close':'Calls due '+e(S.wd(m.day,1))}</span></a>
   ${rest.length?`<p class="u2-also">Also on the card</p><div class="u2-und">${rest.map(x=>`<a class="hu-it u2-ul" ${U.itAttr(x)}>${U.logoEl(x.ticker,'u2-ulg','ink',44)}<b class="hu-t">${e(U.nm(x.ticker))}</b><small>R${x.n}</small><span class="u2-mini">${U.calls(x).map(({m:mm,c})=>`<i class="${c?(c.dir==='UP'?'up':'dn'):'q'}">${U.face(mm,'u2-mf')}<em>${c?(c.dir==='UP'?'▲':'▼'):'?'}</em></i>`).join('')}</span></a>`).join('')}</div>`:''}
   <p class="u2-ft">${d.items.length} bouts · calls before the report · graded at the close</p></div></section>`};
root.innerHTML=`<header class="u2-top"><div class="u2-ps u2-hp"><div class="u2-pic"><img src="hedra/openers/o3-tonight-gpt-image-2.jpg" alt="A boxing ring on a rooftop at dusk, the bell on its post"></div>
   <h2 class="u2-h">Next on the card</h2><p class="u2-cnt"><b>${T.u}</b> rounds still to call · <b>${T.l}</b> locked in</p>
   <p class="u2-ln">Each AI calls the stock <em>before</em> it reports. The next close grades it.</p></div></header>
 <nav class="u2-flt" aria-label="Show">${U.FLT.map(([k,l])=>`<button type="button" data-hf="${k}" aria-pressed="${!k}">${l}</button>`).join('')}<span class="u2-hint">Tap a bout to open its card</span></nav>
 <div class="u2-wall">${U.days().filter(d=>d.k!=='wait').map(bill).join('')}</div>`;
U.wireFilter(root);await U.paint(root);await document.fonts.ready;U.fit(root,'.u2-ul b',10);U.fit(root,'.u2-nm',26);U.fit(root,'.u2-dy',20);document.documentElement.classList.add('hu-ready')})();
