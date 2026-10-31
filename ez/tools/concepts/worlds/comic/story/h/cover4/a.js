/* A · The issue: the first screen is one comic cover. Masthead (corner box: Season 1, No.; the title), painted cover art (the four
   founders on the exchange floor, the leader in front holding the golden ticket, the bell above), each founder's real call in a
   balloon by his head with its stamp, a starburst flash "Bet #1: NVIDIA" on the cover's corner, and the four steps as the cover's
   bottom strip ("In this issue"). */
(function(){const C=C4,e=C.esc;
 const F={CLAUDE:[.2,.3,.34,.36],GROK:[.43,.355,.53,.27],GPT:[.64,.31,.69,.39],KIMI:[.86,.29,.84,.36]};
 const ball=m=>{const c=C.call(m);if(!c)return '';const p=F[m];return `<span class="a-b a-b-${m.toLowerCase()}" style="--x:${p[0]};--y:${p[1]};--dx:${p[2]};--dy:${p[3]}">${C.balloon(c,'b',m.length*7)}${C.stamp(c,m==='GROK'?-9:6)}</span>`};
 const html=`<div class="a-cv">
  <div class="a-stage">
   <div class="a-art"><picture><source media="(min-width:900px)" srcset="${C.IMG}a-cover-w.jpg">${C.img(C.IMG+'a-cover.jpg','','The four models on the exchange floor at night; '+C.ldName+' holds the golden ticket')}</picture></div>
   <div class="a-top">${C.issue('a-iss')}${C.head('a-h1')}</div>
   <div class="a-calls">${['CLAUDE','GROK','GPT','KIMI'].map(ball).join('')}</div>
   <p class="a-co"><b>Round ${C.ex.n}</b> ${C.coName}${C.ex.pending?' · calls locked':` · the close: <i class="${C.ex.a>=0?'up':'dn'}">${C.mv(C.ex.a)}</i>`}</p>
   <div class="a-flash"><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="s" d="M50 2 L58 20 L78 8 L74 30 L97 30 L82 46 L99 60 L77 66 L84 88 L63 80 L54 99 L44 80 L22 92 L26 70 L3 66 L18 50 L2 34 L25 31 L19 9 L40 20Z" transform="translate(3 4)"/><path class="f" d="M50 2 L58 20 L78 8 L74 30 L97 30 L82 46 L99 60 L77 66 L84 88 L63 80 L54 99 L44 80 L22 92 L26 70 L3 66 L18 50 L2 34 L25 31 L19 9 L40 20Z"/></svg><p><span>Bet #1:</span><b>NVIDIA</b><small>first of many</small></p></div>
  </div>
 </div>`;
 const strip=`<div class="a-strip"><p class="a-sh">In this issue</p>${[0,1,2,3].map(i=>C.step(i)).join('')}</div>`;
 C.build('a',html,strip);C.ready()})();
