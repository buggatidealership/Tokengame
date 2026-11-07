/* Take C, "Before / after": the back-page comic ad, told straight. Two panels, the same four AIs: the first half of each AI's
   calls and the last half, a bar each on the same 30 to 75% scale, the coin's 50% through both. Both panels get the same
   treatment (an ad would make "after" brighter; that would claim progress the data does not show). The small print says what a
   coin does on that many flips and the season-long odds. Numbers: P2.M (ROUNDS in order, __x2pPnl). */
window.P2T={id:'c',zoom:'.p2-c .c-pp',html(P){const MS=P.byH,lo=.3,hi=.75,X=v=>((v-lo)/(hi-lo)*100).toFixed(1);
  const bar=(m,h,k,half)=>{const x=P.M[m];return `<li style="--mc:${x.col}">${P.face(m,'c-fc')}<span class="c-br"><i style="width:${X(h)}%">${PQ.frame(k*7+m.length,{w:2.4,inner:false})}</i></span><b>${P.fmt(h)}</b>${half?`<span class="c-ch ${x.B.h>x.A.h?'c-u':'c-d'}" aria-label="${x.B.h>x.A.h?'up':'down'}">${x.B.h>x.A.h?'▲':'▼'}</span>`:''}</li>`};
  const pn=(k,lab,sub,half)=>`<section class="c-pn c-${k}" aria-label="${lab}"><div class="c-lb">${P.letter(lab,k==='b'?2:9,{j:.7})}</div><small>${sub}</small>
    <ol style="--c50:${X(.5)}%">${MS.map(m=>bar(m,half?P.M[m].B.h:P.M[m].A.h,k==='b'?1:2,half)).join('')}</ol><p class="c-ck"><i></i> coin 50%</p></section>`;
  const b40=1.96*.5/Math.sqrt(40),S=P.M;
  return `<div class="c-pg"><div role="heading" aria-level="2" class="p2-hd c-hd" aria-label="Smart or lucky? Getting smarter?">${P.letter('Getting',4)}<br>${P.letter('smarter?',6)}</div>
   <p class="c-k">Smart or lucky? The same four AIs, early in the season and lately.</p>
   <div class="c-pp">${pn('b','Before','first half of its calls',false)}<span class="c-arw" aria-hidden="true"><svg viewBox="0 0 60 40"><path d="M3 15 L36 13 L35 4 L57 20 L35 36 L36 27 L3 26Z" fill="#e8392b" stroke="#0d0b10" stroke-width="3" stroke-linejoin="round"/></svg></span>${pn('a','After','last half of its calls',true)}</div>
   <div class="c-sp"><svg class="c-sc" viewBox="0 0 30 20" aria-hidden="true"><circle cx="5" cy="5" r="3.6" fill="none" stroke="#0d0b10" stroke-width="2"/><circle cx="5" cy="15" r="3.6" fill="none" stroke="#0d0b10" stroke-width="2"/><path d="M8 7 L28 16 M8 13 L28 4" stroke="#0d0b10" stroke-width="2.2"/></svg>
    <b>The small print.</b> On 40 flips a coin usually lands between ${P.fmt(.5-b40)} and ${P.fmt(.5+b40)}, so a swing this size can still be luck.
    Over the whole season: a coin does as well as ${MS.filter(m=>S[m].odds).map(m=>`${S[m].nm} 1 time in ${S[m].odds}`).join(', ')}.${MS.filter(m=>!S[m].odds).map(m=>` ${S[m].nm} is doing worse than a coin.`).join('')}</div></div>`}};
