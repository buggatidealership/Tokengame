/* T6 "The Sporting Pink": who's winning as the back page of a sports paper printed on pink stock (the old Saturday results
   editions). The headline is written from the numbers (who leads, by how much, who is closest); the lead photo is the leader's
   own portrait screened in halftone; the standings are the paper's agate table on one shared axis; a side column carries the
   race history (lead changes, since which round). The window switch is the edition: Season, Overnight (24 hours), Weekly
   (7 days). Painted: the desk under the paper (gpt-image-2). */
(function(){const {S,esc,$f,$abs,col,NM,MS,face,mark,logo,IMG,k$}=window.LQ;
const ED={season:'Season edition',d1:'Overnight edition',d7:'Weekly edition'};
const WHEN={season:'this season',d1:'in the last 24 hours',d7:'in the last 7 days'};
function head(X,k,D){const o=X.o,a=X.row[o[0]],b=X.row[o[1]],z=X.row[o[3]],A=NM[o[0]],B=NM[o[1]],gap=a.amt-b.amt;
  if(X.empty||(a.amt===0&&b.amt===0))return {h:'Quiet at the close',d:`No round graded ${WHEN[k]}. Every AI at $0.`};
  let h;if(a.amt<=0)h=`${A} loses least`;else if(k==='season'&&o[0]===D.gold)h=gap>a.amt*.25?`${A} keeps the ticket`:`${A} clings to the ticket`;else h=gap>a.amt*.4?`${A} runs away with it`:`${A} holds off ${B}`;
  const d=`${A} ${a.amt>=0?'up':'down'} ${$abs(a.amt)} ${WHEN[k]}, ${a.W} right and ${a.L} wrong. ${B} ${$abs(gap)} behind. ${NM[o[3]]} ${z.amt<0?'down '+$abs(z.amt):'up '+$abs(z.amt)}, last of four.`;return {h,d}}
const dateNY=()=>new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
function build(D){return `<div class="t6-desk" style="background-image:url(${IMG}t6-desk.jpg)"><article class="t6-pp lq-z">
  <header class="t6-mh"><span class="t6-ear">${esc(D.graded)}</span><h2 class="t6-name">The Sporting Pink</h2><span class="t6-ear">${D.bell?'Next bell '+esc(D.bell.t):''}</span></header>
  <div class="t6-dl"><span>${dateNY()}</span><div class="t6-sw" role="tablist" aria-label="Time window">${D.WS.map(w=>`<button type="button" role="tab" class="t6-b" data-k="${w.k}" aria-selected="false"><b>${ED[w.k]}</b><small>${esc(w.when)}</small></button>`).join('')}</div></div>
  <p class="t6-kick">Who's winning? · If you'd bet $100K on every call</p><h3 class="t6-hl"></h3><p class="t6-deck"></p>
  <div class="t6-body"><figure class="t6-ph"><div class="t6-img"></div><figcaption></figcaption></figure>
   <div class="t6-ag"><h4>The standings</h4><table><thead><tr><th></th><th>AI</th><th>P&amp;L</th><th>W-L</th><th>Hit</th><th>Last 5</th><th>Best</th><th>Worst</th></tr></thead><tbody></tbody></table>
    <p class="t6-col"><b>The race.</b> The season lead has changed hands ${D.L.ch} times. ${NM[D.L.cur]} has held it since round ${D.L.since.n}. ${D.line}</p></div></div>
  </article></div>`}
function draw(root,k,prev,anim,D){const X=D.X[k],H=head(X,k,D),m0=X.o[0];
  root.querySelector('.t6-hl').textContent=H.h;root.querySelector('.t6-deck').textContent=H.d;
  root.querySelector('.t6-img').innerHTML=face(m0);root.querySelector('.t6-ph figcaption').textContent=`${NM[m0]}${m0===D.gold?', holder of the golden ticket':''}. ${X.w.lab}: ${$f(X.row[m0].amt)}.`;
  root.querySelector('.t6-ag tbody').innerHTML=X.o.map((m,i)=>{const r=X.row[m];return `<tr style="--mc:${col(m)}"><td>${i+1}</td><td class="t6-n">${NM[m]}</td><td class="t6-pl">${$f(r.amt)}</td><td>${r.W}-${r.L}</td><td>${S.hr(r)}</td><td class="t6-5">${r.l5.map(ok=>ok?'W':'<s>L</s>').join('')}</td><td>${r.top?logo(r.top.r,'t6-lg')+' '+k$(r.top.v):'–'}</td><td>${r.low?logo(r.low.r,'t6-lg')+' '+k$(r.low.v):'–'}</td></tr><tr class="t6-bwr"><td></td><td colspan="5">Best ${r.top?logo(r.top.r,'t6-lg')+' '+k$(r.top.v):'–'} · Worst ${r.low?logo(r.low.r,'t6-lg')+' '+k$(r.low.v):'–'}</td></tr>`}).join('');
  if(anim)root.querySelectorAll('.t6-hl,.t6-deck,.t6-ph,.t6-ag tbody').forEach((e,i)=>e.animate([{opacity:0,filter:'blur(2px)'},{opacity:1,filter:'none'}],{duration:520,delay:i*90}))}
window.LQT={id:'t6',build,draw};})();
