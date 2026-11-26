/* H29 · the living-picture rule for the middle (Meet the models' four founder portraits and Every round so far's front-page photo):
   of the pictures at least half on screen, only the one nearest the screen's centre plays (muted); the others hold their frame like paintings.
   Nothing plays with reduced motion (posters only). The page's own observers may call play(): each video's play() is guarded, so only the chosen one runs. */
/* the gutter (h29/_gutter.css, the top helper's) at the middle's joints: above Meet the models (only if no overlay put one there), above and below
   Every round so far. Inside the sections (first or last child), since main is a two-column grid on desktop and both sections are centred full width. */
(function(){const D=document,mk=()=>{const g=D.createElement('div');g.className='h29-gutter h29m-g';g.setAttribute('aria-hidden','true');return g};
 const near=(y,lo,hi)=>[...D.querySelectorAll('.h29-gutter')].some(g=>{const r=g.getBoundingClientRect();return r.height&&r.top+scrollY<y+hi&&r.bottom+scrollY>y-lo});
 const c8=D.querySelector('section.c8'),rec=D.getElementById('record');
 if(c8&&!near(c8.getBoundingClientRect().top+scrollY,90,20))c8.prepend(mk());
 if(rec&&!rec.querySelector(':scope>.h29m-g:first-child'))rec.prepend(mk());if(rec&&!rec.querySelector(':scope>.h29m-g:last-child'))rec.append(mk())})();
(function(){const W=window,D=document,RM=matchMedia('(prefers-reduced-motion: reduce)'),P=HTMLMediaElement.prototype.play;let cur=null;
const cands=()=>[...D.querySelectorAll('section.c8 .c7-die video,.h29m-fp video')];
function guard(v){if(v.__h29g)return;v.__h29g=1;v.play=function(){if(this!==cur||RM.matches)return Promise.resolve();return P.call(this)}}
function pick(){const vs=cands();vs.forEach(guard);const H=innerHeight,c=H/2;let best=null,bd=1e9;
 for(const v of vs){const r=v.getBoundingClientRect();if(!r.height)continue;const vis=Math.max(0,Math.min(r.bottom,H)-Math.max(r.top,0))/r.height;if(vis<.5)continue;
  const d=Math.abs((r.top+r.bottom)/2-c);if(d<bd){bd=d;best=v}}
 cur=RM.matches||W.__h29Still?null:best;
 vs.forEach(v=>{if(v===cur){v.muted=true;if(v.paused){const p=P.call(v);p&&p.catch(()=>{})}}else if(!v.paused)v.pause()})}
let q=0;const sch=()=>{if(!q)q=requestAnimationFrame(()=>{q=0;pick()})};
addEventListener('scroll',sch,{passive:true});addEventListener('resize',sch);RM.addEventListener&&RM.addEventListener('change',sch);setInterval(pick,700);pick();
W.__h29live={pick,cur:()=>cur};})();
