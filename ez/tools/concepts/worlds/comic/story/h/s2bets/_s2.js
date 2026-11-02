/* s2bets shared: mounts a take's Season 2 beat right under Bet #1's chip (inside #x2pSt .hb5, after .hb5-st), in place of the closing
   line "NVIDIA is the first bet, not the last." (hidden; the beat opens with it). Art boxes: data-crop "[x,y,w,h]|[desk]" in the painting's
   pixels, data-img the painting, [data-q] children mapped onto a quad, [data-at] children placed at a point. Words are page text. */
window.S2=(function(){const D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const pk=v=>{const q=String(v).split('|');return innerWidth>=1000&&q[1]?q[1]:q[0]};
function persp(w,h,q){const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${c},${f},0,1)`}
function place(el){const w=el.clientWidth;if(!w)return;const c=JSON.parse(pk(el.dataset.crop)),iw=+el.dataset.iw||2048,ih=+el.dataset.ih||1152,k=w/c[2];
  el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${el.dataset.img})`;el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  el.style.setProperty('--k',k);
  el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=persp(n.offsetWidth,n.offsetHeight,q)});
  el.querySelectorAll('[data-span]').forEach(n=>{const [x0,x1,y]=JSON.parse(pk(n.dataset.span));n.style.left=((x0-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px';n.style.width=((x1-x0)*k)+'px'});
  el.querySelectorAll('[data-at]').forEach(n=>{const v=pk(n.dataset.at);if(v==='none'){n.style.display='none';return}n.style.display='';const [x,y]=JSON.parse(v);n.style.left=((x-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px'})}
/* the shared words: the kicker that replaces the closing line, the Season 2 tab, the one line */
const kick=`<p class="s2-k">NVIDIA is the first bet. <b>Not the last.</b></p>`;
const tab=`<span class="s2-tab">Season 2 · Next earnings season</span>`;
const line=`<p class="s2-ln">More bets: <em>the Mag 7 reports</em>, and more. Same rule: we bet on the <em>#1 AI's</em> call.</p>`;
function go(take){const sec=D.querySelector('#x2pSt'),st=sec&&sec.querySelector('.hb5-st');if(!st)throw new Error('no bet chip');
  sec.classList.add('s2-on','s2-'+take.id);st.insertAdjacentHTML('afterend',`<div class="s2b s2b-${take.id}" role="group" aria-label="Season 2: more bets after NVIDIA">${take.html({kick,tab,line})}</div>`);
  const arts=[...sec.querySelectorAll('.s2b .s2-art')];const re=()=>arts.forEach(place);re();
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;re()}});D.fonts&&D.fonts.ready.then(re);
  if(take.live)take.live(sec.querySelector('.s2b'),RM);
  H.classList.add('s2-ready')}
return {go,place,RM}})();
