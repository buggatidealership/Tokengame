// Round H3 ground2: shared helpers, injected into the built X3+ page after the take's CSS.
// window.__G2={take:'a'..'e', base:'<url prefix of this folder>'}
(function(){
const G=window.__G2||{};const B=G.base||'';const O=B.replace(/tools\/concepts.*$/,'')+'hedra/openers/';
const desk=()=>innerWidth>=1000;
// seeded random, so every hand-drawn edge is the same on every load
let sd=7;const rnd=()=>{sd=(sd*16807)%2147483647;return sd/2147483647};
G.seed=s=>{sd=s};G.rnd=rnd;
// a hand-cut rectangle: polygon points (in %) wobbling along each edge
G.rough=(n,a,s)=>{G.seed(s||11);const P=[];const e=(x0,y0,x1,y1,ax,ay)=>{for(let i=0;i<n;i++){const t=i/n;P.push(((x0+(x1-x0)*t)+(rnd()-.5)*ax).toFixed(2)+'% '+((y0+(y1-y0)*t)+(rnd()-.5)*ay).toFixed(2)+'%')}};
 e(0,0,100,0,0,a);e(100,0,100,100,a,0);e(100,100,0,100,0,a);e(0,100,0,0,a,0);return 'polygon('+P.join(',')+')'};
// a tapered ink stroke (a brush line) from (x0,y0) to (x1,y1), width w at its belly
G.stroke=(x0,y0,x1,y1,w,col)=>{const dx=x1-x0,dy=y1-y0,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L,m=.35+rnd()*.3;
 const mx=x0+dx*m+nx*(rnd()-.5)*w*.6,my=y0+dy*m+ny*(rnd()-.5)*w*.6;
 return `<path d="M${x0},${y0} Q${(mx+nx*w).toFixed(1)},${(my+ny*w).toFixed(1)} ${x1},${y1} Q${(mx-nx*w*.6).toFixed(1)},${(my-ny*w*.6).toFixed(1)} ${x0},${y0}Z" fill="${col}"/>`};
// the Overview in order: [{el,id}] and the two beat captions
G.secs=()=>{const m=[['.wc-cover','cover'],['.wc-chars','models'],['.wc-season','rounds'],['.wc-splash','lucky'],['.wc-bet','bet'],['.wc-back','back']];
 return m.map(([s,id])=>({el:document.querySelector('#wc-book > '+s),id})).filter(x=>x.el)};
G.beats=()=>[...document.querySelectorAll('#wc-book > p.wc-beat')];
// the section openers already picked (ez/hedra/openers), kept as they are: an inked panel at the section top
const OP={models:['o1-models-seedream-50-pro.jpg','50% 60%','Backstage. Four doors. One golden ticket.','.pp-ttl'],
 rounds:['o2-rounds-gpt-image-2.jpg','62% 45%','Every issue, back to round 1.','.pp-ttl'],
 bet:['o4-bet-seedream-50-pro.jpg','58% 50%','The pool. Bet #1 opens the vault.','h2.wc-h2']};
G.OP=OP;G.O=O;
G.opener=(id,cls,img,pos,cap,lift)=>{const s=document.querySelector({models:'.wc-chars',rounds:'.wc-season',bet:'.wc-bet',lucky:'.wc-splash'}[id]);if(!s||s.querySelector('.ho-pan'))return;
 const o=OP[id]||[];img=img||O+o[0];pos=pos||o[1];cap=cap===undefined?o[2]:cap;lift=lift===undefined?o[3]:lift;
 const f=document.createElement('figure');f.className='ho-pan '+(cls||'');f.dataset.sec=id;
 f.innerHTML='<div class="ho-ink"><div class="ho-img" style="background-image:url('+img+');background-position:'+pos+'"></div></div>'+(cap?'<figcaption class="ho-cap">'+cap+'</figcaption>':'');
 const first=[...s.children].find(x=>x.offsetHeight>2&&!x.classList.contains('pp-sr')&&!x.classList.contains('wc-sr'));s.insertBefore(f,first);
 if(lift){const l=s.querySelector(lift);if(l)l.classList.add('ho-lift')}return f};
G.svg=(w,h,inner,cls)=>`<svg class="${cls||''}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${inner}</svg>`;
G.desk=desk;window.__G2=G;
})();
