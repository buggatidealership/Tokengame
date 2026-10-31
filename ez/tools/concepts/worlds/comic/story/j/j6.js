/* J6 · Scroll plays the season. In "Smart or lucky?", the hit-rate chart is a film you scrub with your thumb: as the
   chart scrolls up the screen, a "now" line sweeps from round 1 to today, the four lines are drawn only up to it, each
   AI's face rides the tip of its own line, the gold coin rolls along the 50% line beside them, and the round number
   ticks over on the cursor. Scroll back and the season rewinds. Built on scroll-driven animations (ViewTimeline;
   Chrome 115+, Safari 26+): the browser runs them, no scroll listener. Elsewhere, and with reduced motion, the chart
   is drawn whole as today. */
(function(){const D=document,H=D.documentElement;
const fig=D.querySelector('.wc10-ch'),cv=fig&&fig.querySelector('.wc10-cv');
if(!fig||!cv||typeof ViewTimeline==='undefined'||sjRM()){H.classList.add('sj-ready-j6');return}
H.classList.add('sj-j6');
const ORDER=['GPT','KIMI','CLAUDE','GROK'],P=window.__x2pPnl().A,R=ROUNDS.slice(),N=R.length,acc={};
ORDER.forEach(m=>{let k=0,n=0;acc[m]=[.5];R.forEach(r=>{const x=P[m].per[r.n];if(x){n++;if(x.v>0)k++}acc[m].push((k+1)/(n+2))})});
const lo=.3,hi=.8,Y=v=>(hi-Math.max(lo,Math.min(hi,v)))/(hi-lo);
cv.insertAdjacentHTML('beforeend',`<span class="sj-cur" aria-hidden="true"><b class="sj-rn"></b></span>${ORDER.map(m=>`<span class="sj-rid" data-m="${m}" aria-hidden="true">${sjFace(m,'wc-f-s')}</span>`).join('')}`);
const svg=cv.querySelector('svg'),cur=cv.querySelector('.sj-cur'),rn=cv.querySelector('.sj-rn'),coin=cv.querySelector('.wc10-coin'),ends=fig.querySelector('.wc10-ends');
const tl=new ViewTimeline({subject:fig,axis:'block'}),opt={timeline:tl,rangeStart:'cover 18%',rangeEnd:'cover 52%',fill:'both',easing:'linear'};
let anims=[];
function build(){anims.forEach(a=>a.cancel());anims=[];const w=cv.clientWidth,h=cv.clientHeight;
  anims.push(svg.animate([{clipPath:'inset(-20px 100% -20px -20px)'},{clipPath:'inset(-20px -20px -20px -20px)'}],opt));
  anims.push(cur.animate([{transform:'translateX(0px)'},{transform:`translateX(${w}px)`}],opt));
  anims.push(rn.animate([{'--sjr':1},{'--sjr':R[N-1].n}],opt));
  if(coin){coin.style.left='0';anims.push(coin.animate([{transform:'translateX(0px) rotate(0deg)'},{transform:`translateX(${w}px) rotate(${Math.round(w/(Math.PI*18)*360)}deg)`}],opt))}
  cv.querySelectorAll('.sj-rid').forEach(el=>{const m=el.dataset.m;const kf=acc[m].map((v,i)=>({transform:`translate(${(i/N*w).toFixed(1)}px,${(Y(v)*h).toFixed(1)}px)`,offset:i/N}));
    kf.push({transform:kf[kf.length-1].transform,opacity:1,offset:1});
    anims.push(el.animate(acc[m].map((v,i)=>({transform:`translate(${(i/N*w).toFixed(1)}px,${(Y(v)*h).toFixed(1)}px)`,offset:i/N})),opt));
    anims.push(el.animate([{opacity:1,offset:0},{opacity:1,offset:.96},{opacity:0,offset:1}],opt))});
  if(ends)anims.push(ends.animate([{opacity:0,offset:0},{opacity:0,offset:.95},{opacity:1,offset:1}],opt))}
window.__sjToggle=on=>{if(on){H.classList.add('sj-j6');build()}else{anims.forEach(a=>a.cancel());anims=[];H.classList.remove('sj-j6');if(coin)coin.style.left=''}};
build();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;build()}});
if(D.fonts)D.fonts.ready.then(build);
H.classList.add('sj-ready-j6')})();
