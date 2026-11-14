/* T2 · The bout sheet: the fight programme's printed results sheet before the results. One column per AI, its face and name
   printed once in a header that stays with you as you scroll; one row per round, the company's colour on the row's stub.
   Read across: what all four say about one company. Read down: what one AI says all night. The main event is the first, taller row.
   Nights whose calls are not in yet are the programme's back page: compact slips, the night's headliner first and wider. */
(async function(){const T=TT,S=T.S,esc=T.esc;const root=T.mount('t2');if(!root){T.ready();return}
const {L,days}=T.data();await T.prep(L);const C=T.counts(L);
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const at=(x,cls)=>`class="${cls}${x.nv?' t2-nv':''}" href="#/round/${x.n}" data-t="${esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${T.bv(x.ticker)}"`;
const cell=(x,m)=>{const c=x.calls.find(q=>q.m===m);if(!c)return `<span class="t2-x t2-xq"><b>?</b></span>`;const up=c.dir==='UP';
  return `<span class="t2-x ${up?'t2-xu':'t2-xd'}"><i aria-hidden="true">${up?'▲':'▼'}</i><b>${T.sg(c)}</b><span class="wc-sr">${T.NM[m]} says ${up?'up':'down'} ${c.mag}%</span></span>`};
function row(x,main,box){const b=T.bell(x);
  return `<a ${at(x,'t2-r'+(main?' t2-main':''))}${main?' data-main="1"':''}><span class="t2-st">${T.lg(x.ticker,box)}</span>
    <span class="t2-co">${main?`<em class="t2-me">★ Main event</em>`:''}<b class="t2-nm">${esc(x.co)}</b><small>R${x.n} · ${esc(S.tk(x.ticker))}${T.tag(x)?` · <u>${T.tag(x)}</u>`:''}</small></span>
    ${T.ORDER.map(m=>cell(x,m)).join('')}</a>`}
function slip(x,main,box){
  return `<a ${at(x,'t2-s'+(main?' t2-smain':''))}${main?' data-main="1"':''}><span class="t2-st">${T.lg(x.ticker,box)}</span><span class="t2-co">${main?`<em class="t2-me">★ Main event</em>`:''}<b class="t2-nm">${esc(x.co)}</b><small>R${x.n} · ${esc(S.tk(x.ticker))}${T.tag(x)?` · <u>${T.tag(x)}</u>`:''}</small></span></a>`}
function bar(k,items){const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,n=items.length;
  if(k==='wait')return `<div class="t2-day t2-dw" role="heading" aria-level="2"><b>On hold</b><span>${n} round${n>1?'s':''} · the dates passed, the calls are not in yet</span></div>`;
  const p=S.pd(k),b=lk?T.bell(items[0]):'',now=l.a==='Today';
  return `<div class="t2-day${now?' t2-now':''}${lk?' t2-dl':''}" role="heading" aria-level="2"><b>${esc(now||l.a==='Tomorrow'?l.a:S.wd(k,1))}</b><span class="t2-dd">${now||l.a==='Tomorrow'?S.wd(k)+' ':''}${MON[p.m-1]} ${p.d}</span>
    <span class="t2-dn">${n} round${n>1?'s':''}${lk?' · '+(lk===n?'all locked':lk+' locked'):''}</span><span class="t2-db">${lk?(b?esc(b):'Graded at the close'):'Calls due '+T.dueS(items[0])+' · graded at the next close'}</span></div>`}
const head=()=>`<div class="t2-hd" aria-hidden="true"><span class="t2-hc">Round<small><i>Green</i>: bulls, up · <i>red</i>: bears, down</small></span>${T.ORDER.map(m=>`<span class="t2-hm">${S.face(m)}<b>${T.NM[m]}</b><small>${esc((MODELS[m]||{}).ver||'')}</small></span>`).join('')}</div>`;
function draw(){const desk=innerWidth>=1000;
  const lockD=days.filter(d=>d.items.some(x=>x.locked)),openD=days.filter(d=>!d.items.some(x=>x.locked));
  let h=`<header class="t2-mast"><div><div class="t2-ttl" role="heading" aria-level="1">Next on the card</div><p class="t2-sub">Every AI predicts each stock <b>before</b> it reports. The next close grades it.</p></div>
    <div class="t2-m2"><p class="t2-cnt"><span><b>${C.lk}</b> locked</span><span><b>${C.to}</b> still to call</span></p>${T.flt()}</div></header>`;
  if(lockD.length){h+=`<section class="t2-sheet" aria-label="Locked rounds">${head()}`;
    lockD.forEach(({k,items})=>{h+=bar(k,items)+`<div class="t2-rows">`+items.map((x,i)=>row(x,i===0&&k!=='wait',i===0?(desk?110:40):(desk?40:30))).join('')+'</div>'});h+='</section>'}
  if(openD.length){h+=`<section class="t2-back" aria-label="Calls not in yet"><div class="t2-bh" role="heading" aria-level="2">Still to call<small>The four AIs have not called these yet. Each night's headliner first.</small></div>`;
    openD.forEach(({k,items})=>{h+=`<div class="t2-night">`+bar(k,items)+`<div class="t2-slips">`+items.map((x,i)=>slip(x,i===0&&k!=='wait',i===0?(desk?64:44):(desk?36:30))).join('')+'</div></div>'});h+='</section>'}
  root.innerHTML=h;T.wire(root,fix);fix()}
/* the header sticks under the site's own header; a night whose rounds are all filtered out hides with them */
function fix(){root.style.setProperty('--hdr',T.hdr()+'px');root.querySelectorAll('.t2-night,.t2-rows').forEach(n=>{const any=[...n.querySelectorAll('.t2-r,.t2-s')].some(T.vis);n.classList.toggle('t2-empty',!any);const p=n.previousElementSibling;if(p&&p.classList.contains('t2-day'))p.classList.toggle('t2-empty',!any)})}
draw();let W0=innerWidth;addEventListener('resize',()=>{if(innerWidth===W0)return;W0=innerWidth;clearTimeout(draw.t);draw.t=setTimeout(draw,200)});
T.ready()})();
