// Round H5 · flow: shared layer, injected after the take's CSS. window.__FL={take, base}
// Sections in reading order, beat-by-beat arrival (one change per beat, lesson 62), scroll-timeline detection with an IntersectionObserver fallback.
(function(){
const F=window.__FL=window.__FL||{};const H=document.documentElement;
F.SDA=CSS.supports('animation-timeline','view()')&&!window.__flNoSDA;H.classList.add(F.SDA?'fl-sda':'fl-io');
F.RM=matchMedia('(prefers-reduced-motion: reduce)').matches;if(F.RM)H.classList.add('fl-rm');
F.desk=()=>innerWidth>=1000;
let sd=7;F.seed=s=>{sd=s};F.rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
F.secs=()=>[['.wc-cover','cover'],['.wc-chars','models'],['.wc-season','rounds'],['.wc-splash','lucky'],['.wc-bet','bet'],['.wc-back','back']]
 .map(([s,id])=>({el:document.querySelector('#wc-book > '+s),id})).filter(x=>x.el);
F.sec=id=>(F.secs().find(x=>x.id===id)||{}).el;
// the beats of each section, in reading order. Elements that already arrive on their own (the coin rows .wc-cn, the cover) are left alone.
F.BEATS={models:'.pp-ttl,.pp1-c',rounds:'.pp-ttl,.wc-bi,.wc-more',lucky:'.wc-burst,.wc-sp-lead,.wc10-ch,.wc-sp-cap',bet:'.hb-open,.hb-h,.hb-sub,.hb-shd,.hb-st,.hbc-close',back:'.wc-motto,.wc-follow,.wc-fine'};
// beats: hidden (class fl-b) until they reach reading position, then fl-in; a row arriving together staggers 110 ms apiece.
F.beats=(opt)=>{opt=opt||{};if(F.RM)return;const all=[];
 for(const {el,id} of F.secs()){const q=F.BEATS[id];if(!q)continue;el.querySelectorAll(q).forEach((b,i)=>{if(b.offsetParent===null&&getComputedStyle(b).position!=='fixed')return;b.classList.add('fl-b');b.dataset.flS=id;all.push(b)})}
 let q=[],t=0;const flush=()=>{q.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top||a.getBoundingClientRect().left-b.getBoundingClientRect().left)
   .forEach((b,i)=>{b.style.transitionDelay=(i*(opt.step||110))+'ms';b.classList.add('fl-in');setTimeout(()=>b.style.transitionDelay='',1200+i*120)});q=[];t=0};
 const io=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting){q.push(e.target);io.unobserve(e.target)}});if(q.length&&!t)t=requestAnimationFrame(flush)},{rootMargin:'0px 0px '+(opt.margin||'-14%')+' 0px'});
 all.forEach(b=>{const r=b.getBoundingClientRect();if(r.top<innerHeight*.86)b.classList.add('fl-in');else io.observe(b)});F.allBeats=all;F.io=io};
// show everything at once (for still boards)
F.showAll=()=>{(F.allBeats||[]).forEach(b=>b.classList.add('fl-in'));H.classList.add('fl-still')};
// a hand-inked rectangle as an svg path, wobbling a little along each edge (thick outer line)
F.inkRect=(w,h,seed,wob)=>{F.seed(seed||3);wob=wob||2.2;const r=F.rnd,P=[];const n=Math.max(4,Math.round((w+h)/120));
 const e=(x0,y0,x1,y1,k)=>{for(let i=0;i<k;i++){const t=i/k;P.push([x0+(x1-x0)*t+(r()-.5)*wob,y0+(y1-y0)*t+(r()-.5)*wob])}};
 const kx=Math.max(3,Math.round(w/110)),ky=Math.max(3,Math.round(h/110));e(0,0,w,0,kx);e(w,0,w,h,ky);e(w,h,0,h,kx);e(0,h,0,0,ky);
 return 'M'+P.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join('L')+'Z'};
F.svg=(w,h,inner,cls)=>`<svg class="${cls||''}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">${inner}</svg>`;
// data, read live: rounds graded, the season's issue number
F.graded=()=>{try{return (typeof ROUNDS!=='undefined'?ROUNDS:[]).filter(r=>typeof r.a==='number'&&!isNaN(r.a)).length}catch(e){return 0}};
F.ready=()=>H.classList.add('fl-ready');
})();
