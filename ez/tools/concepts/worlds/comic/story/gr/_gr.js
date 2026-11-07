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
/* the film's founder plates (baked into the source) are covered by the page's own plate, set in HTML in the film's poster style */
const PB={CLAUDE:{x:27,y:18,w:212,h:62,st:'frame'},GPT:{x:241,y:8,w:350,h:83,st:'stars'},GROK:{x:32,y:6,w:320,h:96,st:'brush'},KIMI:{x:12,y:21,w:268,h:82,st:'rule'}};
function plate(m,c){const b=PB[m];if(b.x+b.w<=c.x||b.x>=c.x+c.w||b.y+b.h<=c.y||b.y>=c.y+c.h)return '';
  return `<span class="gr-pl gr-pl-${b.st}" style="left:${((b.x-c.x)/c.w*100).toFixed(3)}%;top:${((b.y-c.y)/c.h*100).toFixed(3)}%;width:${(b.w/c.w*100).toFixed(3)}%;height:${(b.h/c.h*100).toFixed(3)}%;--ph:${(b.h/c.h*100).toFixed(3)}cqh">${b.st==='stars'?'<i></i>':''}<b>${NM[m].toUpperCase()}</b>${b.st==='stars'?'<i></i>':''}</span>`}
function vid(m,crop,cls){const c=crop||{x:0,y:0,w:SW,h:SH},k=m.toLowerCase();
  const st=`width:${(SW/c.w*100).toFixed(3)}%;height:${(SH/c.h*100).toFixed(3)}%;left:${(-c.x/c.w*100).toFixed(3)}%;top:${(-c.y/c.h*100).toFixed(3)}%`;
  return `<div class="gr-v ${cls||''}" data-m="${m}" style="aspect-ratio:${c.w}/${c.h}" data-crop="${c.x},${c.y},${c.w},${c.h}"><video muted playsinline loop preload="metadata" poster="${BASE}gr-${k}.jpg" style="${st}" aria-hidden="true"><source src="${BASE}gr-${k}.mp4" type="video/mp4"></video>${plate(m,c)}</div>`}
function wire(root){const vs=[...root.querySelectorAll('video')];if(RM()){vs.forEach(v=>{v.removeAttribute('autoplay');v.pause()});return}
  const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting){v.play().catch(()=>{})}else v.pause()}),{threshold:.25});vs.forEach(v=>io.observe(v))}
function l5(a){return `<span class="gr-l5" aria-label="Last five: ${a.join(' ')}">${a.map(x=>`<i class="${x==='W'?'gr-w':'gr-l'}"></i>`).join('')}</span>`}
function mount(html,cls){const s=document.querySelector('.wc-chars');s.classList.add('gr-on',cls);
  s.innerHTML=html;wire(s);if(!document.querySelector('#gr-fonts')){const l=document.createElement('link');l.id='gr-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Ultra&family=Permanent+Marker&family=Oswald:wght@600;700&display=swap';document.head.appendChild(l)}return s}
/* checks: faces (hand-measured boxes in the 854x480 source) against every lettered or drawn element; empty area of every text container */
const FACE={CLAUDE:[245,0,420,175],GPT:[456,92,590,205],GROK:[365,0,485,125],KIMI:[318,0,480,175]};
function GRcheck(){const out={faceHits:[],faceShown:{},empty:{}};const ov=[...document.querySelectorAll('.wc-chars :is(.gr-pl,.g2-cap,.g2-sfx,.g1-bar,.g3d-tape,.g3d-leaf,.g3d-lint,.g3d-spill)')];
 document.querySelectorAll('.wc-chars .gr-v').forEach(v=>{const r=v.getBoundingClientRect(),[cx,cy,cw,ch]=v.dataset.crop.split(',').map(Number),f=FACE[v.dataset.m];
  const fx0=r.left+(f[0]-cx)/cw*r.width,fx1=r.left+(f[2]-cx)/cw*r.width,fy0=r.top+(f[1]-cy)/ch*r.height,fy1=r.top+(f[3]-cy)/ch*r.height;
  const vx0=Math.max(fx0,r.left),vx1=Math.min(fx1,r.right),vy0=Math.max(fy0,r.top),vy1=Math.min(fy1,r.bottom);
  out.faceShown[v.dataset.m]=+(Math.max(0,vx1-vx0)*Math.max(0,vy1-vy0)/((fx1-fx0)*(fy1-fy0))).toFixed(3);
  ov.forEach(o=>{if(v.contains(o)&&o.classList.contains('gr-pl')){} const q=o.getBoundingClientRect();const a=Math.max(0,Math.min(q.right,vx1)-Math.max(q.left,vx0))*Math.max(0,Math.min(q.bottom,vy1)-Math.max(q.top,vy0));
   if(a>0.5)out.faceHits.push(v.dataset.m+' x '+o.className+' '+a.toFixed(0)+'px2')})});
 /* empty area: share of each container not covered by its text or media, rasterised at 1px */
 document.querySelectorAll('.wc-chars :is(.g1-bar,.g2-cap,.g3d-plate,.g3d-tape)').forEach((c,i)=>{const R=c.getBoundingClientRect(),W=Math.ceil(R.width),H=Math.ceil(R.height),g=new Uint8Array(W*H);
  const w=document.createTreeWalker(c,NodeFilter.SHOW_TEXT);let n;const rects=[];while(n=w.nextNode()){if(!n.textContent.trim())continue;const rg=document.createRange();rg.selectNodeContents(n);rects.push(...rg.getClientRects())}
  c.querySelectorAll('svg,img,video,.gr-l5 i').forEach(e=>rects.push(e.getBoundingClientRect()));
  rects.forEach(q=>{for(let y=Math.max(0,Math.floor(q.top-R.top));y<Math.min(H,Math.ceil(q.bottom-R.top));y++)for(let x=Math.max(0,Math.floor(q.left-R.left));x<Math.min(W,Math.ceil(q.right-R.left));x++)g[y*W+x]=1});
  let s=0;for(const b of g)s+=b;const k=c.className.split(' ')[0];out.empty[k]=out.empty[k]||[];out.empty[k].push(+(1-s/(W*H)).toFixed(2))});
 return out}
window.GRcheck=GRcheck;
window.GR={A,ORD,D,vid,wire,mount,money,l5,NM,FOUNDER,RM,SW,SH};
})();
