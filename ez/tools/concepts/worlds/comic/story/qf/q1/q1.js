/* q1: Will Eisner's The Spirit. One round as one rainy London street: the title, the calls and the result are lettered into the buildings themselves. */
(function(){
const S=__qShared,{r,calls,win,lead,NM,money,pct,EX,face,prev,wn}=S,D=document,H=D.documentElement;
const FR=window.__qFr||{};
const W=m=>calls.find(c=>c.m===m);
const winL=calls.filter(c=>win.includes(c.m));
const tower=`<svg class="q1-tower" viewBox="0 0 60 150" aria-hidden="true">
 <path d="M30 2 L36 22 H24 Z" fill="#0b1426"/><rect x="21" y="22" width="18" height="10" fill="#0b1426"/>
 <rect x="16" y="32" width="28" height="118" fill="#101b31"/><rect x="13" y="40" width="34" height="34" fill="#0b1426"/>
 <circle cx="30" cy="57" r="13" fill="#f6c45c" stroke="#3a2a10" stroke-width="2"/>
 <g stroke="#2a1d0a" stroke-width="1.2">${[...Array(12)].map((_,i)=>{const a=i*30*Math.PI/180;return `<line x1="${30+Math.sin(a)*10.5}" y1="${57-Math.cos(a)*10.5}" x2="${30+Math.sin(a)*12}" y2="${57-Math.cos(a)*12}"/>`}).join('')}</g>
 <g class="q1-hh"><line x1="30" y1="57" x2="30" y2="50" stroke="#14111a" stroke-width="2.4" stroke-linecap="round"/></g>
 <g class="q1-mh"><line x1="30" y1="57" x2="30" y2="46" stroke="#14111a" stroke-width="1.6" stroke-linecap="round"/></g>
 <circle cx="30" cy="57" r="1.6" fill="#14111a"/>
 ${[84,100,116,132].map(y=>`<rect x="22" y="${y}" width="5" height="9" fill="#2a3a5c"/><rect x="33" y="${y}" width="5" height="9" fill="#2a3a5c"/>`).join('')}
</svg>`;
const roofs=`<svg class="q1-roofs" viewBox="0 0 400 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 40V22h30v-8h8v8h40V10h6v12h52v-6h44v6h30V4h10v18h60v-9h20v9h40v-6h30v24z" fill="#0d172b"/></svg>`;
const win1=c=>`<li class="q1-w q1-${c.up?'up':'dn'}${c.ok?' q1-ok':' q1-no'}${win.includes(c.m)?' q1-win':''}${c.m===lead?' q1-lead':''}" data-m="${c.m}">
   ${c.m===lead?`<i class="q1-crown"><svg viewBox="0 0 30 18" aria-hidden="true"><path d="M2 16 L4 4 L10 10 L15 2 L20 10 L26 4 L28 16 Z"/></svg><small>Season leader</small></i>`:''}<q class="q1-bal"><b>${NM[c.m]}:</b> ${c.txt}</q>
   <div class="q1-glass"><i class="q1-cur" aria-hidden="true"></i>${face(c.m,'q1-who')}<span class="q1-gilt">${win.includes(c.m)?'<span class="q1-gs">Won</span><span class="q1-gl">Winner</span>':'Pass'}</span><span class="q1-blind"><b>Fail</b></span>
    </div>
   <p class="q1-sill ${c.v<0?'q1-neg':'q1-pos'}">${money(c.v)}</p>
  </li>`;
const ws=calls.map(win1);
const shutters=prev.slice(0,5).map((x,i)=>`<li style="--k:${i+1}"><b>${x.n}</b><span>${x.co}</span><em>${wn(x)}</em></li>`).join('');
const book=D.createElement('div');book.setAttribute('role','region');book.id='q1-book';book.dataset.beat='1';book.setAttribute('aria-label',`Round ${r.n}, ${r.co} (${r.ticker}), start to finish`);
book.innerHTML=`
<div class="q1-scene" data-qp="street">
 <div class="q1-sky">${roofs}${tower}<p class="q1-bong" aria-hidden="true"><span>B</span><span>O</span><span>N</span><span>G</span><span>!</span></p>
  <p class="q1-title" aria-label="Round ${r.n}"><span>Round</span><b>${r.n}</b></p></div>
 <ol class="q1-floor q1-fl">${ws[0]}${ws[1]}</ol>
 <div class="q1-mid">
  <p class="q1-zip" aria-live="polite"><span class="q1-z1">Calls locked before ${r.co} (${r.ticker}) reports.</span><span class="q1-z2">${r.co} (${r.ticker}) closes <b class="q1-pos">${pct(r.a)}</b></span><span class="q1-z3">${winL.map(c=>NM[c.m]).join(' and ')} wins. ${winL[0]?winL[0].off.toFixed(2)+'% off.':''}</span></p>
  <p class="q1-fascia"><span>${r.co}</span> <small>(${r.ticker})</small></p>
  <div class="q1-shop"><div class="q1-film">
   <img class="qfilm q1-f1" src="${FR.L||''}" alt="${r.co} round film: the four calls on the plates">
   <img class="qfilm q1-f2" src="${FR.C||''}" alt="${r.co} round film: the market lands ${pct(r.a)}">
   <img class="qfilm q1-f3" src="${FR.G||''}" alt="${r.co} round film: ${NM[win[0]]} crowned"></div>
   <div class="q1-shut"><p><b>Round ${r.n}</b><span>${r.co} (${r.ticker})</span><em>${winL.map(c=>NM[c.m]).join(' & ')} won · ${pct(r.a)}</em></p></div>
  </div>
  <ol class="q1-alley" aria-label="Earlier rounds">${shutters}</ol>
 </div>
 <ol class="q1-floor q1-fr">${ws[2]}${ws[3]}</ol>
 <div class="q1-street">
  <div class="q1-sign"><i></i><p class="q1-cap"><span class="q1-c1">Before the report, four AIs make their calls.</span><span class="q1-c2">The ${EX[0]} close, ${EX[1]} pm.</span><span class="q1-c3">Each call passes or fails.</span><span class="q1-c4">Round ${r.n} joins the record. Every round stays here.</span></p></div>
  <button class="q1-next" type="button"><span class="q1-n1">The close</span><span class="q1-n2">Graded</span><span class="q1-n3">Into the record</span><span class="q1-n4">Every round so far</span> <b aria-hidden="true">›</b></button>
 </div>
</div>`;
const main=D.querySelector('main');main.prepend(book);const hd=D.querySelector('header.top');const shop=book.querySelector('.q1-shop');const fit=()=>{book.style.setProperty('--qhh',(hd?hd.getBoundingClientRect().height:0)+'px');requestAnimationFrame(()=>{shop.style.setProperty('--fs','0px');shop.style.setProperty('--fs',Math.floor(Math.min(shop.clientWidth-14,shop.clientHeight))+'px')})};fit();addEventListener('resize',fit);H.classList.add('q1-on');
const go=b=>{book.dataset.beat=String(b);fit();book.classList.remove('q1-anim');void book.offsetWidth;book.classList.add('q1-anim')};
book.querySelector('.q1-next').addEventListener('click',()=>go(+book.dataset.beat%4+1));
window.__qBeat=go;H.classList.add('q1-ready');
})();
