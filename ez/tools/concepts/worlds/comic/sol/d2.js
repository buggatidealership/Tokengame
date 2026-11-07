/* D2 · The People v. Luck: a courtroom page. Each AI in the dock, three exhibits, a verdict stamp. */
(function(){const {ms,N,face,pct}=__sl;
const ver=x=>x.h<=.5?['Luck','sl2-red']:x.p<.05?['Skill','sl2-grn']:x.p<.2?['Leaning skill','sl2-gld']:['Not proven','sl2-gry'];
const arrow=x=>{const d=Math.round(x.h2*100)-Math.round(x.h1*100);return d>0?`<i class="sl2-up">▲ ${d}</i>`:d<0?`<i class="sl2-dn">▼ ${-d}</i>`:'<i>= 0</i>'};
__slTake('d2',`<div class="sl2-bench"><span class="sl2-gav" aria-hidden="true"></span><p>Case no. ${N}</p><h2 class="sl-h">The People <small>v.</small> Luck</h2><p class="sl2-q">Are they smart, or just lucky?</p></div>
<div class="sl2-dock">${ms.map((x,i)=>{const [v,c]=ver(x);return `<article class="sl2-d sl-pop" style="--mc:${x.c};transition-delay:${i*.08}s">
 <header>${face(x.m)}<b>${x.name}</b><span class="sl2-st ${c}">${v}</span></header>
 <ol><li><small>A · The record</small><em>${x.W} of ${x.t}</em><span>right on direction (${pct(x.h)})</span></li>
 <li><small>B · Then → now</small><em>${pct(x.h1)} → ${pct(x.h2)}</em><span>first half, second half ${arrow(x)}</span></li>
 <li><small>C · The coin</small><em>${x.h<=.5?'Worse':'1 in '+x.oneIn}</em><span>${x.h<=.5?'than a coin flip':'a coin does this well'}</span></li></ol></article>`}).join('')}</div>
<p class="sl-cap sl2-cap">Court adjourned until the next close. ${N} rounds is early: verdicts can flip.</p>`)})();
