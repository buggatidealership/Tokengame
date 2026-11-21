/* I1 · Your turn: the reader guesses up or down on a real round, then lets pure guessing play all 70 rounds,
   again and again; every run lands as a pin on the same ruler as the four AIs. No coin, no statistics words. */
(function(){const S=SI,D=document,sp=D.querySelector('.wc-splash');if(!sp)return;
const lo=3.8,hi=6.8,X=v=>((Math.max(lo,Math.min(hi,v))-lo)/(hi-lo)*100).toFixed(2);
const per10=m=>S.hr(m)*10,t10=v=>(Math.round(v*10)/10).toFixed(1).replace(/\.0$/,'');
const ais=S.ORDER.slice().sort((a,b)=>S.hr(a)-S.hr(b));
const pins=ais.map((m,i)=>{const x=+X(per10(m));return `<span class="si1-ai si1-lf" style="left:${x}%;--row:${i};--mc:${S.col(m)}">${S.face(m,'',m===S.rank[0])}<b>${S.NM[m]}<small>${S.W(m)} right of ${S.C(m)}</small></b></span>`}).join('');
const ticks=[4,5,6].map(v=>`<i class="si1-tk${v===5?' si1-half':''}" style="left:${X(v)}%"><span>${v===5?'Half right':v+' in 10'}</span></i>`).join('');
const el=D.createElement('section');el.className='si-sol si-i1';el.setAttribute('aria-label','Smart or lucky?');
el.innerHTML=`<h2 class="wc-h2"><span>Smart or lucky?</span><small>Guess them yourself. See how close pure luck gets.</small></h2>
<div class="si1-wrap"><div class="si-pn si1-game si-hal" style="--h:#03c870"><p class="si-tag">Your turn</p><p class="si1-tally" aria-live="polite"><b class="wc-tu">0</b> right · <b class="wc-td">0</b> wrong</p>
  <div class="si1-card"></div></div>
 <div class="si-pn si1-rule si-hal"><p class="si1-q">Right calls out of every 10</p>
  <div class="si1-track"><div class="si1-ais">${pins}</div><div class="si1-bar">${ticks}</div><div class="si1-you" aria-live="polite"><span class="si1-ghost" style="left:${X(5)}%"><b>You?</b></span></div></div>
  <div class="si1-strip" aria-hidden="true"></div>
  <p class="si1-say"></p>
  <button type="button" class="si1-luck">Let luck guess all ${S.N} rounds</button></div>
<p class="wc-cap si-tbc"><b>To be continued…</b>Too early to call it. We will know more after about ${S.FULL} calls each. ${S.NM[S.rank[0]]} has made ${S.C(S.rank[0])}.</p></div>`;
sp.before(el);sp.classList.add('si-off');
/* the guessing card: a real graded round, picked at random */
const card=el.querySelector('.si1-card'),tal=el.querySelector('.si1-tally');let right=0,wrong=0,cur=null;
const deal=()=>{const r=S.R[Math.floor(S.rnd()*S.N)];cur=r;const lg=S.coLogo(r.ticker);
  card.innerHTML=`<div class="si1-co">${lg?`<img src="${lg}" alt=""${S.coDk(r.ticker)}>`:''}<p><b>${S.esc(r.co)}</b><small>Round ${r.n} · reported ${S.md(r.called)}</small></p></div>
   <p class="si1-ask">After earnings, up or down?</p><div class="si1-btn"><button type="button" data-u="1" class="si1-up">▲ Up</button><button type="button" data-u="0" class="si1-dn">▼ Down</button></div>`;
  card.querySelectorAll('button').forEach(b=>b.onclick=()=>guess(b.dataset.u==='1'))};
const guess=u=>{const r=cur,up=r.a>0,ok=u===up;ok?right++:wrong++;tal.innerHTML=`<b class="wc-tu">${right}</b> right · <b class="wc-td">${wrong}</b> wrong`;
  const calls=S.ORDER.map(m=>{const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return '';const cu=/^UP/i.test(c[1]);return `<span class="si1-c ${cu===up?'si1-ok':'si1-no'}">${S.face(m,'wc-f-s')}<b>${cu===up?'✓':'✗'}</b></span>`}).join('');
  card.innerHTML=`<div class="si1-co">${S.coLogo(r.ticker)?`<img src="${S.coLogo(r.ticker)}" alt=""${S.coDk(r.ticker)}>`:''}<p><b>${S.esc(r.co)}</b><small>Round ${r.n} · reported ${S.md(r.called)}</small></p></div>
   <div class="si1-res"><span class="si1-mv ${up?'si1-mu':'si1-md'}">${up?'▲ Up':'▼ Down'} ${Math.abs(r.a).toFixed(2)}%</span><b class="si1-you1 ${ok?'si1-ok':'si1-no'}">${ok?'You got it!':'Missed!'}</b></div>
   <p class="si1-vs">The AIs on this one</p><div class="si1-cs">${calls}</div><button type="button" class="si1-next">Next round →</button>`;
  card.querySelector('.si1-next').onclick=deal};
deal();
/* luck runs: pure guessing on every round, each run a pin under the ruler */
const you=el.querySelector('.si1-you'),strip=el.querySelector('.si1-strip'),say=el.querySelector('.si1-say'),btn=el.querySelector('.si1-luck'),runs=[];
const sayIt=()=>{const beat=ais.filter(m=>runs.some(v=>v>per10(m)));
  say.innerHTML=!runs.length?'':beat.length?`Pure luck beat <b>${beat.map(m=>S.NM[m]).join(', ').replace(/, ([^,]*)$/,' and $1')}</b> ${runs.length===1?'on this run':'at least once in '+runs.length+' runs'}.`:`${runs.length===1?'This run':'Your '+runs.length+' runs'} stayed behind every AI. Try again.`};
const drop=(k,anim)=>{const v=k/S.N*10;runs.push(v);you.querySelectorAll('.si1-p').forEach(p=>p.classList.remove('si1-new'));const g=you.querySelector('.si1-ghost');if(g)g.remove();
  const same=runs.filter(x=>Math.abs(x-v)<.18).length-1;
  you.style.setProperty('--yh',Math.max(...[...you.querySelectorAll('.si1-p')].map(p=>+p.style.getPropertyValue('--s')||0),same)*12+30+'px');const xv=+X(v);you.insertAdjacentHTML('beforeend',`<span class="si1-p si1-new${anim?' si1-drop':''}${xv<18?' si1-pl':xv>82?' si1-pr':''}" style="left:${X(v)}%;--s:${same}"><i></i><b>You · ${k} of ${S.N}</b></span>`);
  btn.textContent='Again';sayIt()};
const play=(anim)=>new Promise(res=>{const g=S.R.map(r=>(S.rnd()<.5)===(r.a>0));const k=g.filter(Boolean).length;
  if(!anim||S.RM()){strip.innerHTML=g.map(x=>`<i class="${x?'si1-sw':'si1-sl'}"></i>`).join('');drop(k,false);return res()}
  strip.innerHTML='';let i=0;btn.disabled=true;const t=setInterval(()=>{for(let j=0;j<3&&i<g.length;j++,i++)strip.insertAdjacentHTML('beforeend',`<i class="${g[i]?'si1-sw':'si1-sl'}"></i>`);
    if(i>=g.length){clearInterval(t);drop(k,true);btn.disabled=false;res()}},28)});
btn.onclick=()=>play(true);
window.__si1={play,guess:u=>guess(u),deal};
S.ready('i1')})();
window.__siShot=async v=>{if(v!=='b')return;SI.setSeed(11);__si1.deal();__si1.guess(true);for(let i=0;i<6;i++)await __si1.play(false)};
