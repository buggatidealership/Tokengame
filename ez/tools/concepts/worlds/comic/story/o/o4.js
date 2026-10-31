/* O4 · The bell decides the corner. Panel 3 starts ungraded: both corners lit, every stamp an empty dashed slot, the market
   still a question mark. The ring bell is struck twice; the market's move drops in and its pointer lands in one corner,
   which floods with that corner's colour while the other corner goes grey (the cause, the move, makes the effect, the
   verdict); then PASS or FAIL slams onto each fighter, the right corner first; last, the crown drops on the closest pass.
   Plays once when the panel comes on screen; a tap on the bell plays it again. Reduced motion: the graded panel. */
(function(){const S=SO,P=S.p3();if(!P){S.ready('o4');return}const {pn,ring,fs,order,says,rule,win,lose}=P,cl=S.cl,out=S.out;
  pn.classList.add('so4');
  ring.insertAdjacentHTML('afterbegin',`<button type="button" class="so4-bell" aria-label="Ring the bell: grade this round again"><svg viewBox="0 0 40 44" aria-hidden="true"><path class="so4-dome" d="M20 5c-1.6 0-2.6 1-2.6 2.4v1.1C11 10 8 15 8 21v8l-4 5v2h32v-2l-4-5v-8c0-6-3-11-9.4-12.5V7.4C22.6 6 21.6 5 20 5z"/><circle class="so4-nub" cx="20" cy="39" r="3.6"/><path class="so4-shine" d="M13 15c1.4-2.4 3.4-3.6 5.6-4"/></svg></button><span class="so4-ding" aria-hidden="true">Ding! Ding!</span>`);
  win.insertAdjacentHTML('afterbegin','<i class="so4-wash" aria-hidden="true"></i>');
  says.insertAdjacentHTML('beforeend','<span class="so4-q" aria-hidden="true">Market ?</span>');
  fs.forEach(f=>{if(f.pf)f.pf.insertAdjacentHTML('afterend',`<i class="${f.pf.className.replace(/sd2-(pass|fail)/,'')} so4-slot" aria-hidden="true">?</i>`);f.slot=f.el.querySelector('.so4-slot')});
  const bell=pn.querySelector('.so4-bell svg'),ding=pn.querySelector('.so4-ding'),mb=says.querySelector('b'),q=says.querySelector('.so4-q'),wash=win.querySelector('.so4-wash');
  const nw=fs.find(f=>!f.win),plain=nw?getComputedStyle(nw.el.querySelector('.sd2-f')).boxShadow:'none';
  const T={mk:.75,v:1.0,st:1.55,sd:.26};const tW=T.st+T.sd*order.length+.1,DUR=tW+.9;
  function draw(t){const sw=t<0?0:Math.exp(-t*2.4)*(Math.sin(t*30)+(t>.32?Math.sin((t-.32)*30)*.8:0));bell.style.transform=`rotate(${(sw*16).toFixed(2)}deg)`;
    const dq=t<0?0:cl(t/.1)*(1-cl((t-.5)/.22));ding.style.opacity=dq;ding.style.transform=`rotate(-8deg) scale(${(.7+.3*out(cl(t/.15))).toFixed(3)})`;
    const m=cl((t-T.mk)/.18);mb.style.opacity=t<T.mk?0:1;mb.style.transform=`translateY(${((1-out(m))*-26).toFixed(1)}px) scale(${(m<1?1.5-.5*out(m):1).toFixed(3)})`;q.style.opacity=t<T.mk?1:0;
    const v=cl((t-T.v)/.35),g=cl((t-T.v-.05)/.4);wash.style.transform=`scaleY(${out(v).toFixed(3)})`;wash.style.opacity=t<T.v?0:1;
    lose.style.filter=`grayscale(${(.9*g).toFixed(2)})`;lose.style.opacity=(1-.4*g).toFixed(2);
    win.style.boxShadow=g>0?`0 0 0 ${(3*g).toFixed(1)}px var(--wc-gold),4px 4px 0 3px var(--wc-ink)`:'none';
    order.forEach((f,i)=>{const a=T.st+i*T.sd,k=cl((t-a)/.14);if(f.pf){f.pf.style.opacity=t<a?0:1;f.pf.style.transform=`rotate(-10deg) scale(${(k<1?2.4-1.4*out(k):1).toFixed(3)})`}
      if(f.slot)f.slot.style.opacity=t<a?1:0;f.el.style.transform=k>0&&k<1?`translateY(${(Math.sin(k*Math.PI)*2).toFixed(2)}px)`:''});
    fs.forEach(f=>{if(!f.cr)return;const k=cl((t-tW)/.25);f.cr.style.opacity=k;f.cr.style.transform=`translateX(-50%) translateY(${((1-out(k))*-18).toFixed(1)}px) rotate(-8deg)`});
    fs.forEach(f=>{if(!f.win)return;const fc=f.el.querySelector('.sd2-f'),k=cl((t-tW)/.25);if(fc)fc.style.boxShadow=k>0?'':plain});
    if(rule)rule.style.opacity=cl((t-tW-.3)/.4)}
  pn.classList.add(P.up?'so4-U':'so4-D');S.timeline(pn,draw,DUR,pn.querySelector('.so4-bell'));S.H.classList.add('so-o4');S.ready('o4')})();
