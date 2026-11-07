/* q2: Jack Kirby's Silver Age Marvel. One round as a cosmic machine: four AIs load their calls, the market fires it, the machine grades, then files the round in the vault. */
(function(){
const S=__qShared,{r,calls,win,lead,NM,money,pct,EX,face,prev,wn}=S,D=document,H=D.documentElement;
const FR=window.__qFr||{};
const winL=calls.filter(c=>win.includes(c.m));
const arrow=up=>`<svg class="q2-ar" viewBox="0 0 20 20" aria-hidden="true"><path d="${up?'M10 2 L19 12 H13 V18 H7 V12 H1 Z':'M10 18 L19 8 H13 V2 H7 V8 H1 Z'}"/></svg>`;
const pod=c=>`<li class="q2-pod q2-${c.up?'up':'dn'} ${c.ok?'q2-ok':'q2-no'}${win.includes(c.m)?' q2-win':''}${c.m===lead?' q2-lead':''}">
  ${c.m===lead?`<i class="q2-crown"><svg viewBox="0 0 30 18" aria-hidden="true"><path d="M2 16 L4 4 L10 10 L15 2 L20 10 L26 4 L28 16 Z"/></svg>Season leader</i>`:''}
  <span class="q2-port">${face(c.m,'q2-face')}</span>
  <span class="q2-mid"><q class="q2-bal"><b>${NM[c.m]}</b> ${c.txt}!</q><span class="q2-led ${c.v<0?'q2-neg':'q2-pos'}">${money(c.v)}</span>${win.includes(c.m)?`<span class="q2-off">${c.off.toFixed(2)}% off</span>`:''}</span>
  <span class="q2-cart">${arrow(c.up)}</span>
  <b class="q2-stamp" aria-label="${c.ok?'Pass':'Fail'}">${c.ok?'Pass!':'Fail!'}</b>
 </li>`;
const P=calls.map(pod);
const vault=prev.slice(0,6).map((x,i)=>`<li style="--k:${i}"><b>${x.n}</b><span>${x.co}</span><em>${wn(x)}</em></li>`).join('');
const book=D.createElement('div');book.id='q2-book';book.setAttribute('role','region');book.dataset.beat='1';book.setAttribute('aria-label',`Round ${r.n}, ${r.co} (${r.ticker}), start to finish`);
book.innerHTML=`
<div class="q2-eng" data-qp="engine">
 <div class="q2-top"><p class="q2-ttl"><span>Round</span><b>${r.n}</b></p><p class="q2-co"><span>${r.co}</span> <small>(${r.ticker})</small></p></div>
 <ol class="q2-pods q2-pl">${P[0]}${P[1]}</ol>
 <div class="q2-core">
  <div class="q2-scr"><div class="q2-film">
   <img class="qfilm q2-f1" src="${FR.L||''}" alt="${r.co} round film: the four calls on the plates">
   <img class="qfilm q2-f2" src="${FR.C||''}" alt="${r.co} round film: the market lands ${pct(r.a)}">
   <img class="qfilm q2-f3" src="${FR.G||''}" alt="${r.co} round film: ${NM[win[0]]} crowned">
   <i class="q2-iris" aria-hidden="true"></i><p class="q2-irt"><b>Round ${r.n} joins the record.</b><span>Every round stays here.</span></p></div></div>
 </div>
 <ol class="q2-pods q2-pr">${P[2]}${P[3]}</ol>
 <div class="q2-vault" aria-label="The record"><p class="q2-cartbig"><b>${r.n}</b><span>${r.co} (${r.ticker})</span><em>${winL.map(c=>NM[c.m]).join(' & ')} won · ${pct(r.a)}</em></p><ol>${vault}</ol></div>
 <div class="q2-foot"><div class="q2-blast" aria-live="polite">
   <p class="q2-b1"><em>Klank!</em><span>Calls locked before the report.</span></p>
   <p class="q2-b2"><em>Bwonng!</em><span>The ${EX[0]} close.</span><b class="q2-mv ${r.a<0?'q2-neg':'q2-pos'}">${pct(r.a)}</b></p>
   <p class="q2-b3"><em>Ka-boom!</em><span>${winL.map(c=>NM[c.m]).join(' and ')} wins. ${winL[0]?winL[0].off.toFixed(2)+'% off.':''}</span></p>
   <p class="q2-b4"><em>Fwoosh!</em><span>Filed in the vault.</span></p>
  </div><button class="q2-next" type="button"><span class="q2-n1">Fire the close</span><span class="q2-n2">Grade it</span><span class="q2-n3">File it</span><span class="q2-n4">Every round so far</span><b aria-hidden="true">›</b></button></div>
</div>`;
const main=D.querySelector('main');main.prepend(book);H.classList.add('q2-on');
const hd=D.querySelector('header.top'),scr=book.querySelector('.q2-scr');
const fit=()=>{book.style.setProperty('--qhh',(hd?hd.getBoundingClientRect().height:0)+'px');requestAnimationFrame(()=>{scr.style.setProperty('--fs','0px');scr.style.setProperty('--fs',Math.floor(Math.min(scr.clientWidth-20,scr.clientHeight-8))+'px')})};
fit();addEventListener('resize',fit);
const go=b=>{book.dataset.beat=String(b);fit();book.classList.remove('q2-anim');void book.offsetWidth;book.classList.add('q2-anim')};
book.querySelector('.q2-next').addEventListener('click',()=>go(+book.dataset.beat%4+1));
window.__qBeat=go;H.classList.add('q2-ready');
})();
