/* T1 The coin goes in: Smart or lucky's coin (the one on the coin-flip line) is tossed off the chart as you scroll on, falls
   down the margin beside the panel, through the gutter, and drops into the vault's coin pile, shrinking into the painting's
   depth; a small glint where it lands. The question (skill or a coin flip?) hands its coin to the stakes. Scroll drives it,
   so it moves at the reader's pace and runs back when they scroll up. Transforms and opacity only. Reduced motion: the coin
   stays on the chart. */
H7.ready(()=>{if(H7.RM)return;const D=document,src=D.querySelector('#wc-book .wc-splash .wc10-coin');if(!src)return;
 const ov=H7.over('t1-ov');ov.innerHTML='<i class="t1-c h7-mv"><b></b></i><i class="t1-gl h7-mv"></i>';const c=ov.querySelector('.t1-c'),gl=ov.querySelector('.t1-gl');
 let P=null;const plan=()=>{const g=H7.geo(),s=H7.doc(src),x0=s.l+s.w/2,y0=s.t+s.h/2,cs=D.querySelector('#wc-book .wc-splash .wc-coins');
   const cr=Math.max(g.C.r,...[...D.querySelectorAll('#wc-book .wc-splash *')].map(e=>e.getBoundingClientRect()).filter(q=>q.width&&q.width<g.vw*.97).map(q=>q.right)),mx=g.S.l>40?g.S.l/2:Math.min((Math.min(cr,g.vw-14)+g.vw)/2,g.vw-11),ys=g.seam-6;
   const Ls=[...D.querySelectorAll('#wc-book .wc-splash .wc10-e')].map(H7.doc),e=Ls.length?{l:Math.min(...Ls.map(q=>q.l)),b:Math.max(...Ls.map(q=>q.b))}:null,drop=u=>[H7.lerp(mx,g.pile.x,1-(1-u)*(1-u)),H7.lerp(ys,g.pile.y,u*u)];
   /* desktop: it rolls left along the coin-flip line, off the chart's edge, and falls down the margin beside the panel. Phone: the margin is on the right, behind the line
      labels, so the coin rolls along the coin-flip line, drops off it under the labels, rolls out to the margin (a coin finding its way down) */
   const seg=g.S.l>40||!e?[u=>[H7.lerp(x0,mx,u),y0],u=>[mx,H7.lerp(y0,ys,u*u)],drop]
     :[u=>[H7.lerp(x0,e.l-13,u),y0],u=>[e.l-13,H7.lerp(y0,e.b+13,u*u)],u=>[H7.lerp(e.l-13,mx,u),e.b+13],u=>[mx,H7.lerp(e.b+13,ys,u)],drop];
   const pts=[];let L=0,prev=null;seg.forEach((f,si)=>{for(let i=0;i<=60;i++){const u=i/60,p=f(u);if(prev)L+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);pts.push({x:p[0],y:p[1],L,si,u});prev=p}});
   P={dir:g.S.l>40||!e?-1:1,ns:seg.length,ms:H7.clamp((g.vw-cr)/20,.62,1),pts,T:L,s0:y0-g.vh*.5,s1:g.pile.y-g.vh*.58,end:pts[pts.length-1]}};
 const at=t=>{const d=t*P.T;let i=P.pts.findIndex(p=>p.L>=d);if(i<0)i=P.pts.length-1;return P.pts[i]};
 const draw=Y=>{if(!P)plan();const t=H7.clamp((Y-P.s0)/(P.s1-P.s0),0,1);
   if(t<=0){c.style.opacity=0;src.style.opacity='';gl.style.opacity=0;return}src.style.opacity=0;
   const p=at(t),last=P.ns-1,sc=p.si===last?H7.lerp(P.ms,.4,p.u):p.si===last-1?P.ms:p.si===last-2?H7.lerp(1,P.ms,p.u):1;
   c.style.opacity=t>=.995?0:1;c.style.transform=`translate(${p.x-9}px,${p.y-9}px) scale(${sc}) ${p.si<P.ns-2?`rotate(${(p.L/9*57.3*(P.dir||1)).toFixed(1)}deg)`:`rotateY(${t*7*360}deg)`}`;
   const g2=t>.9?Math.sin((t-.9)/.1*Math.PI):0;gl.style.opacity=g2;gl.style.transform=`translate(${P.end.x-11}px,${P.end.y-11}px) scale(${.35+g2*.5}) rotate(${t*90}deg)`};
 H7.scroll(draw);addEventListener('resize',()=>{P=null});
 window.__h7Range=()=>{plan();return [P.s0-40,P.s1+80]};window.__h7Still=()=>{plan();if(window.__h7Strobe){const tr=document.createElement('div');tr.className='t1-tr';[.06,.14,.22,.33,.45,.57,.69,.8,.9].forEach((t,i)=>{const p=at(t),last=P.ns-1,sc=p.si===last?H7.lerp(P.ms,.4,p.u):p.si===last-1?P.ms:1;tr.insertAdjacentHTML('beforeend',`<i class="t1-c" style="opacity:${(.25+i*.07).toFixed(2)};transform:translate(${p.x-9}px,${p.y-9}px) scale(${sc})"><b></b></i>`)});ov.appendChild(tr);return Math.round(P.pts[0].y-28)}return Math.round(P.s0+(P.s1-P.s0)*.8)}});
