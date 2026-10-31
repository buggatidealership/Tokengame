/* q7: one round as a 1990s Saturday-morning cartoon episode.
   Dark-deco title card (painted on black), the round film's art as the painted background, the four AIs as flat cels in front,
   act breaks as beats, the round ends as a tape going onto the shelf (the record). Reads only the page's globals. */
(function(){
const D=document,H=D.documentElement,Q=window.__qfData(+(window.__qfRound||66));
const W=['zero','one','two','three','four'];
const ESC=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const arrow=d=>`<svg class="q7-ar" viewBox="0 0 20 20" aria-hidden="true"><path d="${d==='UP'?'M10 1 19 12H13V19H7V12H1Z':'M10 19 1 8H7V1H13V8H19Z'}"/></svg>`;
const lock=`<svg class="q7-lk" viewBox="0 0 20 22" aria-hidden="true"><path class="q7-lk-s" d="M5 10V6a5 5 0 0 1 10 0v4" fill="none" stroke-width="2.6"/><rect x="2" y="10" width="16" height="11" rx="2"/><circle cx="10" cy="15.5" r="1.8" class="q7-lk-h"/></svg>`;
const crown=`<svg class="q7-cr" viewBox="0 0 40 26" aria-hidden="true"><path d="M3 23 1 6l10 8 9-13 9 13 10-8-2 17Z"/><circle cx="1" cy="6" r="2.4"/><circle cx="20" cy="1.8" r="2.4"/><circle cx="39" cy="6" r="2.4"/></svg>`;
const bell=`<svg class="q7-bell" viewBox="0 0 40 44" aria-hidden="true"><path d="M20 3c-8 0-12 7-12 15v8l-5 7h34l-5-7v-8c0-8-4-15-12-15z"/><circle cx="20" cy="38" r="4"/><rect x="18" y="0" width="4" height="5" rx="1"/></svg>`;
const tri=`<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1 11 6 2 11Z"/></svg>`;
const ups=Q.calls.filter(c=>c.dir==='UP'),dns=Q.calls.filter(c=>c.dir==='DOWN');
const title=Q.nUp&&Q.nDn?`${W[Q.nUp]} up, ${W[Q.nDn]} down`:`All ${W[Q.calls.length]} said ${Q.nUp?'up':'down'}`;
const cel=c=>`<div class="q7-cel" data-m="${c.m}" data-ok="${c.ok?1:0}" data-win="${c.win?1:0}" style="--mc:${c.col}" data-panel>
   <div class="q7-cel-f">${c.win?crown:''}${Q.face(c,'q7-face')}</div>
   <div class="q7-cel-t"><b class="q7-nm">${c.nm}</b><span class="q7-call">${arrow(c.dir)}${c.dir==='UP'?'Up':'Down'} ${ESC(c.mag)}</span>
     <span class="q7-slot"><span class="q7-lock">${lock}Locked ${Q.called}</span>
       <span class="q7-res"><i class="q7-stp">${c.win?'Winner':c.ok?'Pass':'Fail'}</i><em class="${c.v>=0?'q7-pos':'q7-neg'}">${Q.usd(c.v)}</em></span></span></div></div>`;
const shelf=Q.prev.map((p,i)=>`<li class="q7-sp" style="--sc:${Q.colOf(p.ticker)};--i:${i}"><span class="q7-sp-n">${p.n}</span><span class="q7-sp-t">${ESC(p.co)}</span>${Q.logoOf(p.ticker)?`<img src="${Q.logoOf(p.ticker)}" alt="">`:''}</li>`).join('');
const S=D.createElement('section');S.id='q7';S.className='q7';S.dataset.b='1';
S.setAttribute('aria-label',`One round, start to finish: round ${Q.N}, ${Q.name}`);
S.innerHTML=`
 <div class="q7-tc" data-panel>
   <div class="q7-tc-t"><small>Earnings Zeason <i>·</i> Episode ${Q.N}</small><h2 class="q7-h">${ESC(title)}</h2><p>${ESC(Q.name)}</p></div>
   ${Q.logo?`<img class="q7-tc-lg" src="${Q.logo}" alt="${ESC(Q.co)}">`:''}
   <ol class="q7-acts">${['Locked','The close','Graded','The record'].map((t,i)=>`<li data-a="${i+1}"><b>${['I','II','III','IV'][i]}</b>${t}</li>`).join('')}</ol>
 </div>
 <div class="q7-st">
   <figure class="q7-art" data-panel><img class="q7-a1" src="/q78/station.jpg" alt="Shell's station, the round's painted scene"><img class="q7-a2" src="/q78/lower14.jpg" alt="The market window: ${Q.move}"><img class="q7-a3" src="/q78/octa14.jpg" alt=""><img class="q7-a5" src="/q78/lower17.jpg" alt=""><img class="q7-a4" src="/q78/octa17.jpg" alt=""></figure>
   <div class="q7-ev" data-panel>
     <p class="q7-e1">${lock}<span><b>Before earnings</b> four predictions lock in.</span></p>
     <p class="q7-e2">${bell}<b class="q7-bong">Bong!</b><span>London close.<br><em class="${Q.up?'q7-pos':'q7-neg'}">${Q.co} ${Q.up?'up':'down'} ${Q.move.replace(/^[+−]/,'')}</em></span></p>
     <p class="q7-e3">${crown}<span><b>${Q.up?'Up':'Down'} was right.</b> ${Q.winner?`${Q.winner.nm} wins, ${Q.winner.off}% off.`:'Nobody wins.'}</span></p>
     <p class="q7-e4"><span><b>Round ${Q.N} joins the record.</b> Every round stays here.</span></p>
   </div>
   <div class="q7-cels">
     <div class="q7-team q7-tu"><b>${arrow('UP')}Said up</b>${ups.map(cel).join('')}</div>
     <div class="q7-team q7-td"><b>${arrow('DOWN')}Said down</b>${dns.map(cel).join('')}</div>
   </div>
   <div class="q7-vhs" data-panel>
     <div class="q7-box"><img src="/q78/station.jpg" alt=""><div class="q7-box-t"><small>Episode ${Q.N}</small><b>${ESC(Q.name)}</b><span>${Q.winner?Q.winner.nm+' wins':'Nobody wins'} <i>·</i> <em class="${Q.up?'q7-pos':'q7-neg'}">${Q.move}</em></span></div></div>
     <ol class="q7-shelf"><li class="q7-sp q7-new" style="--sc:${Q.colOf(Q.tk)}"><span class="q7-sp-n">${Q.N}</span><span class="q7-sp-t">${ESC(Q.co)}</span>${Q.logo?`<img src="${Q.logo}" alt="">`:''}</li>${shelf}</ol>
   </div>
 </div>
 <div class="q7-ft" data-panel><button type="button" class="q7-nx"><span class="q7-nx-l">Next act</span>${tri}</button></div>`;
const main=D.querySelector('main#top');main.before(S);H.classList.add('q7-on');
const fit=()=>{const h=D.querySelector('header.top');const top=h?h.getBoundingClientRect().bottom:0;S.style.setProperty('--q7h',Math.max(560,innerHeight-Math.max(0,top))+'px')};
fit();addEventListener('resize',fit);
const btn=S.querySelector('.q7-nx');
const NX=['Next: Act II, The close','Next: Act III, Graded','Next: Act IV, The record','Every round so far'];
window.__q7Go=b=>{S.dataset.b=String(b);btn.querySelector('.q7-nx-l').textContent=NX[b-1]};
const mq=matchMedia('(min-width:900px)'),ev=S.querySelector('.q7-ev'),ft=S.querySelector('.q7-ft');
const place=()=>{if(mq.matches)ev.append(ft);else S.append(ft)};place();mq.addEventListener('change',place);__q7Go(1);
btn.addEventListener('click',()=>{const b=+S.dataset.b;if(b<4)__q7Go(b+1);else{__q7Go(1)}});
H.classList.add('q7-ready');
})();
