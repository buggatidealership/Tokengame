/* T1 The coin goes in: Smart or lucky's coin (the one on the coin-flip line) is tossed off the chart as you scroll on, falls
   down the margin beside the panel, through the gutter, and drops into the vault's coin pile, shrinking into the painting's
   depth; a small glint where it lands. The question (skill or a coin flip?) hands its coin to the stakes. Scroll drives it,
   so it moves at the reader's pace and runs back when they scroll up. Transforms and opacity only. Reduced motion: the coin
   stays on the chart. */
H7.ready(()=>{if(H7.RM)return;const D=document,src=D.querySelector('#wc-book .wc-splash .wc10-coin');if(!src)return;
 const ov=H7.over('t1-ov');ov.innerHTML='<i class="t1-c h7-mv"><b></b></i><i class="t1-gl h7-mv"></i>';const c=ov.querySelector('.t1-c'),gl=ov.querySelector('.t1-gl');
 let P=null;const plan=()=>{const g=H7.geo(),s=H7.doc(src),x0=s.l+s.w/2,y0=s.t+s.h/2,cs=D.querySelector('#wc-book .wc-splash .wc-coins');
   const mx=g.S.l>40?g.S.l/2:(Math.max(g.C.r,cs?H7.doc(cs).r:0)+g.vw)/2,ys=g.seam-6;
   const seg=[u=>[H7.lerp(x0,mx,u),y0-74*Math.sin(Math.PI*u)+8*u],u=>[mx,H7.lerp(y0+8,ys,u)],u=>[H7.lerp(mx,g.pile.x,1-(1-u)*(1-u)),H7.lerp(ys,g.pile.y,u*u)]];
   const pts=[];let L=0,prev=null;seg.forEach((f,si)=>{for(let i=0;i<=60;i++){const u=i/60,p=f(u);if(prev)L+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);pts.push({x:p[0],y:p[1],L,si,u});prev=p}});
   P={pts,T:L,s0:y0-g.vh*.5,s1:g.pile.y-g.vh*.58,end:pts[pts.length-1]}};
 const at=t=>{const d=t*P.T;let i=P.pts.findIndex(p=>p.L>=d);if(i<0)i=P.pts.length-1;return P.pts[i]};
 const draw=Y=>{if(!P)plan();const t=H7.clamp((Y-P.s0)/(P.s1-P.s0),0,1);
   if(t<=0){c.style.opacity=0;src.style.opacity='';gl.style.opacity=0;return}src.style.opacity=0;
   const p=at(t),sc=p.si===2?H7.lerp(1,.4,p.u):1;
   c.style.opacity=t>=.995?0:1;c.style.transform=`translate(${p.x-9}px,${p.y-9}px) scale(${sc}) rotateY(${t*7*360}deg)`;
   const g2=t>.9?Math.sin((t-.9)/.1*Math.PI):0;gl.style.opacity=g2;gl.style.transform=`translate(${P.end.x-14}px,${P.end.y-14}px) scale(${.4+g2*.8}) rotate(${t*90}deg)`};
 H7.scroll(draw);addEventListener('resize',()=>{P=null});
 window.__h7Range=()=>{plan();return [P.s0-40,P.s1+80]};window.__h7Still=()=>{plan();return Math.round(P.s0+(P.s1-P.s0)*.8)}});
