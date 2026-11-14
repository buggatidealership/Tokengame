/* T5 "Down the stretch": the standings as a horse race seen from the rail. Every AI runs its own lane; the leader's nose is on
   the finish post and everyone else is drawn back by exactly how far behind it they are in the window (the gap in dollars).
   A striped pole marks break-even ($0): runners left of it are in the red. The window switch is the race card: the season is
   the long race, 7 days and 24 hours are sprints; switching runs the race again. Each lane carries its runner's form line on one
   shared axis (W-L, hit rate, last five, best and worst round). Painted: the track at sunset (seedream-50-pro). */
(function(){const {S,esc,$f,$abs,col,NM,MS,face,mark,logo,IMG,k$}=window.LQ;const R=window.PQ.rnd;
const dust=s=>`<svg class="t5-du" viewBox="0 0 60 30" aria-hidden="true">${[0,1,2,3].map(i=>`<path d="M60 ${8+i*5} C 40 ${6+i*5+R(s+i)*3}, 22 ${9+i*5}, ${2+R(s+i*3)*14} ${10+i*5+R(s*2+i)*4} C 24 ${11+i*5}, 42 ${11+i*5}, 60 ${10+i*5}Z" fill="#0d0b10" opacity="${.85-i*.12}"/>`).join('')}</svg>`;
function build(D){return `
  <div class="t5-tr lq-z" style="background-image:url(${IMG}t5-track-2k.jpg)"><header class="t5-hd"><h2 class="t5-h">Who's winning?</h2>
  <div class="t5-sw" role="tablist" aria-label="Time window">${D.WS.map(w=>`<button type="button" role="tab" class="t5-b" data-k="${w.k}" aria-selected="false"><small>${w.k==='season'?'The long race':'The sprint'}</small><b>${w.short==='24h'?'24 hours':w.short}</b><small>${esc(w.when)}</small></button>`).join('')}</div></header><div class="t5-ln"></div><span class="t5-post" aria-hidden="true"><b>Lead</b></span><span class="t5-zero" aria-hidden="true"><b>$0</b></span></div>
  <p class="t5-note">If you'd bet $100K on every call. Each runner trails the leader by exactly its P&amp;L gap to the leader. ${D.line}</p>`}
function draw(root,k,prev,anim,D){const X=D.X[k],tr=root.querySelector('.t5-tr'),L=X.row[X.o[0]].amt,lo=Math.min(0,...MS.map(m=>X.row[m].amt)),span=Math.max(1,L-lo);
  /* finish post at 90%, the last runner no further back than 6%; $0 pole where $0 falls */
  const f=v=>(v-lo)/span;const x=v=>f(v)*100;tr.style.setProperty('--zf',f(0));tr.querySelector('.t5-zero').hidden=!(lo<0&&L>0);
  tr.querySelector('.t5-ln').innerHTML=X.o.map((m,i)=>{const r=X.row[m],s=MS.indexOf(m)*9,gap=L-r.amt;return `<div class="t5-lane" style="--mc:${col(m)}">
   <div class="t5-run${f(r.amt)>.5?' t5-fl':''}" style="--f:${f(r.amt).toFixed(4)}"><span class="t5-hz lq-bleed">${dust(s)}</span><span class="t5-silk"><span class="t5-fc">${face(m)}</span><b class="t5-no">${i+1}</b></span>
    <span class="t5-tag"><em>${NM[m]}</em><b class="${r.amt>=0?'lq-u':'lq-d'}">${$f(r.amt)}</b>${i?`<small>${$abs(gap)} back</small>`:`<small>${m===D.gold&&k==='season'?'Golden ticket':'In front'}</small>`}</span></div>
   <div class="t5-form" role="row"><span role="cell"><i>W-L</i><b class="lq-u">${r.W}</b>-<b class="lq-d">${r.L}</b></span><span role="cell"><i>Hit</i>${S.hr(r)}</span><span role="cell" class="t5-f5"><i>Form</i>${r.l5.map(ok=>`<u class="${ok?'t5-w':'t5-l'}">${ok?'W':'L'}</u>`).join('')}</span>
    <span role="cell"><i>Best</i>${r.top?logo(r.top.r,'t5-lg')+k$(r.top.v):'–'}</span><span role="cell"><i>Worst</i>${r.low?logo(r.low.r,'t5-lg')+k$(r.low.v):'–'}</span></div></div>`}).join('');
  if(anim)tr.querySelectorAll('.t5-run').forEach((e,i)=>e.animate([{transform:'translateX(-55%)'},{transform:'none'}],{duration:1300+i*140,easing:'cubic-bezier(.3,.1,.2,1)'}))}
window.LQT={id:'t5',build,draw};})();
