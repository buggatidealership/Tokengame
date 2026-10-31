/* Green room takes (2026-10-31): shared helpers. Data from __x2pPnl() and MODELS only. */
(function(){
const A=__x2pPnl().A, ORD=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl);
const BASE='tools/concepts/worlds/comic/story/gr/';
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const FOUNDER={GPT:'Sam',KIMI:'Kimi',CLAUDE:'Dario',GROK:'Elon'};
const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const D=m=>{const a=A[m],t=a.W+a.L;return {m,nm:NM[m],ver:MODELS[m].ver,pnl:a.pnl,pm:money(a.pnl),W:a.W,L:a.L,hr:Math.round(a.W/t*100),l5:a.seq.slice(-5),rank:ORD.indexOf(m)+1,up:a.pnl>=0}};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* a loop cropped to a box of the 854x480 source: crop={x,y,w,h} in source px */
const SW=854,SH=480;
function vid(m,crop,cls){const c=crop||{x:0,y:0,w:SW,h:SH},k=m.toLowerCase();
  const st=`width:${(SW/c.w*100).toFixed(3)}%;height:${(SH/c.h*100).toFixed(3)}%;left:${(-c.x/c.w*100).toFixed(3)}%;top:${(-c.y/c.h*100).toFixed(3)}%`;
  return `<div class="gr-v ${cls||''}" style="aspect-ratio:${c.w}/${c.h}" data-crop="${c.x},${c.y},${c.w},${c.h}"><video muted playsinline loop preload="metadata" poster="${BASE}gr-${k}.jpg" style="${st}" aria-hidden="true"><source src="${BASE}gr-${k}.mp4" type="video/mp4"></video></div>`}
function wire(root){const vs=[...root.querySelectorAll('video')];if(RM()){vs.forEach(v=>{v.removeAttribute('autoplay');v.pause()});return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.play().catch(()=>{})}else v.pause()}),{threshold:.25});vs.forEach(v=>io.observe(v))}
function l5(a){return `<span class="gr-l5" aria-label="Last five: ${a.join(' ')}">${a.map(x=>`<i class="${x==='W'?'gr-w':'gr-l'}"></i>`).join('')}</span>`}
function mount(html,cls){const s=document.querySelector('.wc-chars');s.classList.add('gr-on',cls);
  s.innerHTML=html;wire(s);if(!document.querySelector('#gr-fonts')){const l=document.createElement('link');l.id='gr-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Ultra&family=Oswald:wght@600;700&display=swap';document.head.appendChild(l)}return s}
window.GR={A,ORD,D,vid,wire,mount,money,l5,NM,FOUNDER,RM,SW,SH};
})();
