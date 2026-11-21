/* I5 · Pick the window: like a prediction market's leaderboard, the cover switches between the last close, this week and
   the season. The answer card names who won that window (and who lost most); the tickets re-order to that window, each
   with a sticker of its money in it. The golden ticket always goes by the season, so it never moves with the window. */
(function(){const S=SI,D=document,B=S.lbBase();if(!B)return;const {lb,cv,sbd,byM}=B;
const W=[{k:'close',t:'Last close',f:S.inLast,lb:'At the '+S.md(S.lastD)+' close'},{k:'week',t:'This week',f:S.in7,lb:'In the last 7 days'},{k:'season',t:'Season',f:()=>true,lb:'This season'}];
const amt=(m,w)=>w.k==='season'?S.P[m].pnl:S.sum(m,w.f);
const lastR=S.R.filter(S.inLast);
cv.classList.add('si5-cv');
cv.innerHTML=`<div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${S.N} earnings reports graded</small></span></div>
<h1 class="wc-tab-h">Who's winning?</h1>
<div class="si5-tg" role="tablist" aria-label="Window">${W.map((w,i)=>`<button type="button" role="tab" data-k="${w.k}" aria-selected="${i===2}">${w.t}</button>`).join('')}<i class="si5-ind" aria-hidden="true"></i></div>
<div class="si5-ans" aria-live="polite"></div>`;
const ans=cv.querySelector('.si5-ans'),btns=[...cv.querySelectorAll('.si5-tg button')],ind=cv.querySelector('.si5-ind'),list=sbd.querySelector('.wc-sb');
const k=v=>S.k$(v);
const card=w=>{const o=S.ORDER.slice().sort((a,b)=>amt(b,w)-amt(a,w)),top=w.k==='season'?S.rank[0]:o[0],bot=o[o.length-1];
  const logos=w.k==='close'?`<span class="si5-lg">${lastR.map(r=>{const l=S.coLogo(r.ticker);return l?`<img src="${l}" alt="${S.esc(r.co)}" title="${S.esc(r.co)}"${S.coDk(r.ticker)}>`:''}).join('')}</span>`:'';
  return `<p class="si5-wl">${w.lb}${w.k==='close'?` · ${lastR.length} round${lastR.length===1?'':'s'} graded`:''}</p>${logos}
   <div class="si5-win">${S.face(top,'wc-f-xl',top===S.rank[0])}<div><span class="si5-nm">${S.NM[top]}</span><em class="${amt(top,w)>=0?'si5-u':'si5-d'}">${w.k==='season'?S.$f(amt(top,w)):k(amt(top,w))}</em></div>${w.k==='season'?S.gt('si5-gt'):'<span class="si5-st">Best</span>'}</div>
   ${w.k==='season'?`<p class="si5-sub">Holds the golden ticket. ${S.NM[S.rank[1]]} is ${S.$f(S.P[S.rank[0]].pnl-S.P[S.rank[1]].pnl).replace('+','')} behind.</p>`:`<p class="si5-sub"><span class="si5-lose">${S.face(bot,'wc-f-s',bot===S.rank[0])}<b>${S.NM[bot]}</b> <em class="${amt(bot,w)>=0?'si5-u':'si5-d'}">${k(amt(bot,w))}</em></span> The golden ticket still goes by the season.</p>`}`};
/* stickers on the tickets */
S.ORDER.forEach(m=>{const t=byM[m]||byM[S.NM[m].toUpperCase()];if(t)t.insertAdjacentHTML('beforeend','<span class="si5-sk" aria-hidden="true"></span>')});
const show=(w,anim)=>{btns.forEach(b=>b.setAttribute('aria-selected',b.dataset.k===w.k));const b=btns.find(x=>x.dataset.k===w.k);ind.style.transform=`translateX(${b.offsetLeft}px)`;ind.style.width=b.offsetWidth+'px';
  ans.innerHTML=card(w);
  const ts=S.ORDER.map(m=>byM[m]||byM[S.NM[m].toUpperCase()]).filter(Boolean),r0=new Map(ts.map(t=>[t,t.getBoundingClientRect()]));
  const o=w.k==='season'?S.rank:S.ORDER.slice().sort((a,b)=>amt(b,w)-amt(a,w));
  o.forEach((m,i)=>{const t=byM[m]||byM[S.NM[m].toUpperCase()];if(!t)return;t.style.order=i;const sk=t.querySelector('.si5-sk');
    sk.innerHTML=w.k==='season'?'':`<small>${w.t}</small><b class="${amt(m,w)>=0?'si5-u':'si5-d'}">${k(amt(m,w))}</b><i>#${i+1}</i>`;sk.classList.toggle('si5-on',w.k!=='season')});
  lb.classList.toggle('si5-alt',w.k!=='season');
  if(anim&&!S.RM())ts.forEach(t=>{const a=r0.get(t),z=t.getBoundingClientRect(),dx=a.left-z.left,dy=a.top-z.top;if(dx||dy)t.animate([{transform:`translate(${dx}px,${dy}px)`},{transform:'none'}],{duration:620,easing:'cubic-bezier(.3,1.2,.4,1)'})});
  if(anim&&!S.RM())ans.animate([{opacity:0,transform:'rotate(-2deg) scale(.94)'},{opacity:1,transform:'none'}],{duration:320,easing:'cubic-bezier(.3,1.6,.5,1)'})};
btns.forEach((b,i)=>b.onclick=()=>show(W[i],true));
const ro=()=>{const b=btns.find(x=>x.getAttribute('aria-selected')==='true');ind.style.transform=`translateX(${b.offsetLeft}px)`;ind.style.width=b.offsetWidth+'px'};addEventListener('resize',ro);D.fonts.ready.then(ro);
show(W[2],false);
window.__siShot=async v=>{if(v==='b'){show(W[0],false)}else if(v==='c'){show(W[1],false)}};window.__si5={show,W};
S.ready('i5')})();
