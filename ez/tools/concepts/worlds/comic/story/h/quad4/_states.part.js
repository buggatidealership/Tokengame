/* ---------- states (H23): every fact shows from the start. Small life in the world while the frames are on screen: the dies re-scan one after
   another, the readout re-scans, the ledger's cursor blinks, a glint crosses the gold. A tap replays the frame's moment. Still with reduced motion. ---------- */
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
function wire(){const fs=[...sec.querySelectorAll('.t4-fr')],fl=sec.querySelector('.t4-frs');
  if(!RM){fs.forEach(f=>{f.addEventListener('click',()=>{f.classList.remove('q4-go');void f.offsetWidth;f.classList.add('q4-go');setTimeout(()=>f.classList.remove('q4-go'),2400)});
    f.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f.click()}})});
  if('IntersectionObserver' in window&&fl)new IntersectionObserver(es=>{fl.classList.toggle('q4-vis',es[es.length-1].isIntersecting)},{rootMargin:'80px 0px'}).observe(fl);else fl&&fl.classList.add('q4-vis')}
