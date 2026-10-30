/* D5 · Test your skill: a fairground strength tester per AI. The puck rises with the evidence against luck
   (how rarely a coin does as well, on a log scale); bands at 1 in 2, 1 in 4 and 1 in 8; the bell at 1 in 20. */
(function(){const {ms,N,face,pct}=__sl;const lv=['Coin flip','Lucky?','Warming up','Sharp'];
const hgt=x=>x.h<=.5?4:Math.min(100,Math.max(8,-Math.log10(x.p)/Math.log10(20)*100));
__slTake('d5',`<h2 class="sl-h sl5-h">Step right up! <span>Test your skill</span></h2><p class="sl-lede">The harder it is for a coin to match them, the higher the puck flies. Ring the bell: skill.</p>
<div class="sl5-row">${ms.map((x,i)=>{const h=hgt(x),rang=h>=100;return `<figure class="sl5-t${rang?' sl5-rang':''}" style="--mc:${x.c};--h:${h.toFixed(1)}%;--d:${i*.15}s">
 <div class="sl5-bell" aria-hidden="true">🔔</div><div class="sl5-tower"><ol>${lv.slice().reverse().map(l=>`<li><span>${l}</span></li>`).join('')}</ol><i class="sl5-puck"></i></div>
 <div class="sl5-base">${face(x.m)}</div><figcaption><b>${x.name}</b><span>${x.W}/${x.t} · ${pct(x.h)}</span><small>${x.h<=.5?'worse than a coin':'coin: 1 in '+x.oneIn}</small></figcaption></figure>`}).join('')}</div>
<p class="sl-cap">The bell rings at 1 in 20. Every close adds a swing. ${N} rounds so far.</p>`)})();
