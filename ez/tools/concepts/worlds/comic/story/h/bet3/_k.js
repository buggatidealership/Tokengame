/* bet3 kit: the live bet chapter stays (the vault opener, the headline, the ticking chip); only its parts list and sockets are hidden,
   and a take's panel sequence is put right after the chip. Every in-world word sits in an SVG laid over its painting in the painting's
   own pixel space (viewBox = the crop), so it scales and moves with the picture. Live data only: SIM.poolShare, the leader as the
   live chapter picks it (the page's own name, else the P&L leader from __x2pPnl). */
(function(){
const D=document,IMG='tools/concepts/worlds/comic/story/h/bet3/img/',RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const desk=()=>innerWidth>=1000;
/* the page recolours anything styled #111 (Grok) to cream on dark: print Grok in the ink black */
const ink=c=>/^#111(111)?$/i.test(c||'')?'#15121a':c;
function data(sec){const S=window.SIM||{};let lead=null;const b=sec.querySelector('.wc-bet-l .wc-cap b');
  if(b){const t=b.textContent.trim().toLowerCase();lead=Object.keys(NM).find(k=>NM[k].toLowerCase()===t)||null}
  if(!lead&&window.__x2pPnl){const P=window.__x2pPnl().A;lead=Object.keys(P).sort((a,c)=>P[c].pnl-P[a].pnl)[0]}
  const M=(window.MODELS||{})[lead]||{};
  return {share:S.poolShare!=null?Math.round(S.poolShare*100):null,lead,name:NM[lead]||lead,M}}
/* a painted panel; svg = in-world marks in image pixels; html = voices drawn into the panel (positioned in % of the crop) */
function pic(cls,src,iw,ih,cP,cD,svg,html){return `<div class="hb-shd b3p ${cls}" data-src="${src}" data-iw="${iw}" data-ih="${ih}" data-b3p='${JSON.stringify(cP)}' data-b3d='${JSON.stringify(cD||cP)}'>
 <div class="hb-ink"><div class="hb-art b3a"><svg class="b3s" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${DEFS}${svg||''}</svg></div></div>${html||''}</div>`}
const DEFS=`<defs>
 <filter id="b3eng" x="-5%" y="-20%" width="110%" height="140%"><feOffset in="SourceAlpha" dy="2.2" result="lo"/><feFlood flood-color="#fff3c2" flood-opacity=".7"/><feComposite in2="lo" operator="in" result="lip"/>
  <feOffset in="SourceAlpha" dy="-1.6" result="hi"/><feFlood flood-color="#000" flood-opacity=".75"/><feComposite in2="hi" operator="in" result="wall"/>
  <feMerge><feMergeNode in="lip"/><feMergeNode in="SourceGraphic"/><feMergeNode in="wall"/></feMerge></filter>
 <filter id="b3ss"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.35" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
 <radialGradient id="b3drop"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#ffd24a"/><stop offset=".75" stop-color="#ff9d1c" stop-opacity=".55"/><stop offset="1" stop-color="#ff9d1c" stop-opacity="0"/></radialGradient>
 <linearGradient id="b3gold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".45" stop-color="#f5c542"/><stop offset="1" stop-color="#b47a12"/></linearGradient></defs>`;
function place(p){const a=p.querySelector('.b3a'),s=a.querySelector('.b3s'),dk=desk(),pk=(v)=>{const q=String(v).split('|');return dk&&q[1]?q[1]:q[0]},c=JSON.parse(dk?p.dataset.b3d:p.dataset.b3p),iw=+pk(p.dataset.iw),ih=+pk(p.dataset.ih),w=a.clientWidth,k=w/c[2];
  p.classList.toggle('dk',dk);a.style.height=Math.round(c[3]*k)+'px';a.style.backgroundImage=`url(${IMG+pk(p.dataset.src)})`;a.style.backgroundSize=`${iw*k}px ${ih*k}px`;a.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  s.setAttribute('viewBox',c.join(' '));p.style.setProperty('--k',k);
  p.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(n.dataset.at);n.style.left=((x-c[0])*k+a.offsetLeft+5)+'px';n.style.top=((y-c[1])*k+5)+'px'})}
/* gold drops running down traces into the pool: one small loop, paused off screen, still with reduced motion */
function flow(paths,{n=3,dur=2.4,r=9}={}){return paths.map((d,i)=>`<path id="b3f${i}" d="${d}" fill="none"/>`+Array.from({length:n},(_,j)=>
  `<ellipse rx="${r*.7}" ry="${r}" fill="url(#b3drop)" class="b3dr"><animateMotion dur="${dur}s" begin="${-(dur*j/n+i*.37).toFixed(2)}s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines=".5 0 .9 .6"><mpath href="#b3f${i}"/></animateMotion><animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.15;.85;1" dur="${dur}s" begin="${-(dur*j/n+i*.37).toFixed(2)}s" repeatCount="indefinite"/></ellipse>`).join('')).join('')}
/* engraved line of capitals on a path or at a point */
const eng=(t,a)=>`<text class="b3e" filter="url(#b3eng)" ${a}>${t}</text>`;
/* silkscreen: cream ink printed on the board, worn */
const ss=(t,a)=>`<text class="b3k" filter="url(#b3ss)" ${a}>${t}</text>`;
/* the AI's mark as it is printed on the dark board: cream disc, gold rim, the mark in its colour (an svg group in image px) */
function mark(M,x,y,r){return M&&M.d?`<g transform="translate(${x-r} ${y-r})"><circle cx="${r}" cy="${r}" r="${r}" fill="#efe2bd" stroke="#0d0b10" stroke-width="${r*.12}"/><circle cx="${r}" cy="${r}" r="${r*1.08}" fill="none" stroke="#d9a93a" stroke-width="${r*.08}"/>
  <svg x="${r*.38}" y="${r*.38}" width="${r*1.24}" height="${r*1.24}" viewBox="0 0 24 24"><path d="${M.d}" fill-rule="${M.fr||'nonzero'}" style="fill:${ink(M.c)}"/></svg></g>`:''}
/* a narration caption drawn into a panel: hand-cut black box, gold double rule, lettered in cream; breaks the panel's edge */
const cap=(html,cls,at)=>`<div class="b3c ${cls||''}" data-w="v" ${at?`style="${at}"`:''}><span>${html}</span></div>`;


function go(id,build){const tryIt=n=>{const sec=D.querySelector('#wc-book .wc-bet.hb-on'),w=sec&&sec.querySelector('.hb-wrap'),chip=w&&w.querySelector('.hbc-fr');
   if(!chip){if(n<200)return setTimeout(()=>tryIt(n+1),150);return}
   w.classList.add('b3-on','b3-'+id);const box=D.createElement('div');box.className='b3 b3-'+id;chip.after(box);
   const Dt=data(sec);build(box,Dt);
   const ps=[...w.querySelectorAll('.b3p')];const re=()=>ps.forEach(place);re();addEventListener('resize',re);D.fonts&&D.fonts.ready.then(re);
   if(RM)w.querySelectorAll('svg.b3s').forEach(s=>{s.pauseAnimations();s.setCurrentTime(.8)});
   else if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>es.forEach(e=>{const s=e.target.querySelector('svg.b3s');e.isIntersecting?s.unpauseAnimations():s.pauseAnimations()}));ps.forEach(p=>io.observe(p))}
   D.documentElement.classList.add('b3-ready')};tryIt(0)}
window.B3={go,pic,flow,eng,ss,mark,cap,desk,NM};
})();
/* multi-line svg text (image px): lines = array of strings (may hold tspans) */
B3.lines=(x,y,lh,ls,a)=>`<text x="${x}" y="${y}" ${a||''}>${ls.map((l,i)=>`<tspan x="${x}" dy="${i?lh:0}">${l}</tspan>`).join('')}</text>`;
/* the leader inline in a caption or balloon: its mark on a cream disc, the name in Bangers */
B3.who=(Dt)=>`<i class="f" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${Dt.M.d||''}" fill-rule="${Dt.M.fr||'nonzero'}" style="fill:${/^#111/.test(Dt.M.c)?'#15121a':Dt.M.c}"/></svg></i><b>${Dt.name}</b>`;
