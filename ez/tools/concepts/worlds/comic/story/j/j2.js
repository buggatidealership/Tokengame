/* J2 · Page turn: Overview, Leaderboard and Upcoming are pages of one comic book. A tap on a tab turns the page
   (a same-document View Transition: the old page swings away on its spine, the new one is underneath; going back
   lays the earlier page down on top). No library, no extra bytes; browsers without view transitions just switch. */
(function(){const D=document,H=D.documentElement;H.classList.add('sj-j2');
const order=['#/','#/leaderboard','#/upcoming'];
const idx=h=>{h=h||'#/';if(h==='#'||h==='#/'||h==='')return 0;const i=order.findIndex((o,k)=>k&&h.startsWith(o));return i<0?0:i};
function go(a,e){const to=a.getAttribute('href'),from=location.hash;if(idx(to)===idx(from))return false;
  if(!D.startViewTransition||sjRM())return false;
  if(e)e.preventDefault();H.dataset.sjTurn=idx(to)>idx(from)?'fwd':'back';
  const vt=D.startViewTransition(()=>new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;setTimeout(res,30)};
    addEventListener('hashchange',fin,{once:true});setTimeout(fin,600);location.hash=to}));
  window.__sjVT=vt;vt.finished.finally(()=>{delete H.dataset.sjTurn});return true}
D.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('header .nav a[href^="#/"]');if(!a||e.metaKey||e.ctrlKey||e.shiftKey)return;go(a,e)},true);
/* for the recorder: turn to a tab and hold the turn's animations so frames can be stepped */
window.__sjTurn=async href=>{const a=D.querySelector(`header .nav a[href="${href}"]`);a.click();
  for(let i=0;i<200;i++){const A=D.getAnimations().filter(x=>x.effect&&x.effect.pseudoElement&&/view-transition/.test(x.effect.pseudoElement));if(A.length){A.forEach(x=>x.pause());window.__sjA=A;return A.length}await new Promise(r=>setTimeout(r,10))}return 0};
window.__sjStep=ms=>{(window.__sjA||[]).forEach(x=>{x.currentTime=ms})};
window.__sjEnd=()=>{(window.__sjA||[]).forEach(x=>{try{x.finish()}catch(e){}});window.__sjA=null};
H.classList.add('sj-ready-j2')})();
