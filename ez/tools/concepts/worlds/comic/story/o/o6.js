/* O6 · Wet ink, honest about time. A round's move is stamped at its close, and for a while the ink is still wet: deeper,
   glossier, soaking a little into the stub. How wet is worked out from the clock, never set by hand: hours since that
   round's own close (ROUNDS' resolve date at its exchange's closing time: New York 4 pm, Seoul and Tokyo 3:30 pm, London
   4:30 pm, the euro exchanges 5:30 pm...). Wet at the close, fully dry 24 hours later, drying fastest at first. The only
   motion: the gloss slides across a wet stamp as you scroll past it, as light does when you tilt a fresh print (scroll
   linked, so it moves only when you do). Dry stamps never move. Screen readers hear "graded 2 hours ago". */
(function(){const D=document,H=D.documentElement,S=SO;
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30],MI:['Europe/Rome',17,30]};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const RR={};ROUNDS.forEach(r=>RR[r.n]=r);const DRY=24;
const wet=h=>h<0||h>=DRY?0:Math.pow(1-h/DRY,1.6);
function paint(){const now=window.__oNow||Date.now();let n=0;
  D.querySelectorAll('.wc-bi').forEach(a=>{const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;const at=closeAt(r.ticker,r.resolves),h=at==null?1e9:(now-at)/36e5,w=wet(h);
    a.classList.toggle('so6-wet',w>.02);if(w>.02){a.style.setProperty('--wet',w.toFixed(3));n++}else a.style.removeProperty('--wet');a.dataset.soAge=h<1e8?h.toFixed(1):'';
    if(!a.dataset.soL)a.dataset.soL=a.getAttribute('aria-label')||'';const hh=Math.max(0,Math.round(h));
    a.setAttribute('aria-label',a.dataset.soL+(w>.02?`. Graded ${hh<1?'under an hour':hh+(hh===1?' hour':' hours')} ago`:''))});
  return n}
window.__soPaint6=paint;window.__soWet=wet;window.__soCloseAt=closeAt;paint();setInterval(paint,5*60*1000);
H.classList.add('so-o6');S.ready('o6')})();
