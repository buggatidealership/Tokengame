/* D1 · Vs. Lady Luck: every AI fights a coin. Luck's score = half the AI's calls (what a coin gets on average). */
(function(){const {ms,N,face,pct}=__sl;
const luck=`<svg class="sl1-coin" viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#fdbc2a" stroke="#15121a" stroke-width="3.5"/><circle cx="30" cy="30" r="19" fill="none" stroke="#c98a12" stroke-width="2" stroke-dasharray="3 3"/><path d="M21 27q3-4 6 0M33 27q3-4 6 0" stroke="#15121a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M22 36q8 7 16 0" stroke="#15121a" stroke-width="2.5" fill="none" stroke-linecap="round"/><path d="M16 14l4 4M44 14l-4 4" stroke="#15121a" stroke-width="2.5" stroke-linecap="round"/></svg>`;
const res=x=>x.h<=.5?['Lady Luck wins','sl1-lose']:x.p<.05?['K.O.!','sl1-ko']:x.p<.2?[x.name+' wins','sl1-win']:['Too close to call','sl1-even'];
__slTake('d1',`<p class="sl1-kick">Fight night · ${N} rounds</p><h2 class="sl-h sl1-h">The AIs <span>vs</span> Lady Luck</h2>
<p class="sl-lede">Lady Luck flips a coin on every call. On average she gets half right. Who beats her?</p>
<div class="sl1-cards">${ms.map((x,i)=>{const [r,c]=res(x),e=x.t/2;return `<article class="sl1-c sl-pop" style="--mc:${x.c};transition-delay:${i*.08}s">
 <div class="sl1-side">${face(x.m)}<b>${x.name}</b><em>${x.W}</em><small>right of ${x.t}</small></div>
 <div class="sl1-vs">VS</div>
 <div class="sl1-side sl1-luck">${luck}<b>Luck</b><em>${Number.isInteger(e)?e:e.toFixed(1)}</em><small>a coin's average</small></div>
 <p class="sl1-r ${c}"><b>${r}</b><span>${x.h<=.5?'Worse than a coin.':`A coin does this well 1 time in ${x.oneIn}.`}</span></p></article>`}).join('')}</div>
<p class="sl-cap">Next bout: every report. ${N} rounds is a short season, so a lucky streak can still fool us.</p>`)})();
