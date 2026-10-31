/* Round DT · C2 with the detail pass (2026-10-31). Laid over cover take C2 (cv/c2.*) after it has built; every word and number
   is the one C2 already took from the page's data (the h1 keeps its aria-label). What changes:
   - each panel's ground: a lit radial base, an irregular sunburst, colour-on-colour halftone shading that grows away from the subject,
     tapered ink speed lines from the subject (DT.ground, DT.speed), and its own thick ink contour along the cut;
   - white gutters with a keyline either side (the page ground turns white, each panel strokes its own edge);
   - the headline and every sound effect lettered glyph by glyph (DT.word), with nested bursts behind the sound effects;
   - one overlay above the page for what breaks the borders: stars across the gutters, bolts, MINE! across the cut. */
(function(){const X=window.DT,D=document,H=D.documentElement;const root=D.querySelector('.cvx.c2');if(!X||!root)return;
 const NS='http://www.w3.org/2000/svg';
 const svgEl=(w,h,inner,cls,ov)=>`<svg class="dtw-s ${cls||''}" width="${X.f1(w)}" height="${X.f1(h)}" viewBox="0 0 ${X.f1(w)} ${X.f1(h)}" aria-hidden="true" style="overflow:${ov||'visible'}">${inner}</svg>`;
 /* a lettered word as its own inline svg, sized to its ink */
 function wsvg(txt,o,extra){const S=o.size,{tot}=X.layout(txt,o),pad=2*((o.key!=null?o.key:S*.05)+(o.out!=null?o.out:S*.07))+4,dp=(o.depth!=null?o.depth:Math.round(S*.1))+(o.drop!=null?o.drop:S*.07);
  const w=tot+pad*2+dp,h=S*1.18+pad*2+dp;const c=Object.assign({},o,{x:pad+tot/2,y:pad+S*.92});return {w,h,svg:svgEl(w,h,(extra?extra(c.x,c.y-S*.33,w,h):'')+X.word(txt,c))}}
 const GR={mh:['#ffa284','#ff3d31','#c8120c','rgba(255,215,190,.24)','#8a0a05'],p1:['#b4ddff','#4ea6ff','#1c5ed2','rgba(200,235,255,.26)','#123f9c'],
  p2:['#fffbc0','#ffe02a','#ffa400','rgba(255,255,225,.35)','#ff8a00'],p3:['#efc2ff','#a64cff','#5a14c4','rgba(255,225,255,.22)','#3d0a8a'],p4:['#d0ffb0','#46de7e','#0f9a50','rgba(225,255,215,.25)','#06632f']};
 function draw(){const pg=root.querySelector('.c2-pg');if(!pg)return;
  /* 1 · panel grounds and contours */
  const panels=[['mh',root.querySelector('.c2-mh')],...[1,2,3,4].map(i=>['p'+i,root.querySelector('.c2-p'+i)])];
  for(const [k,el] of panels){if(!el)continue;el.querySelectorAll(':scope > .dtw-g').forEach(n=>n.remove());
   const W=el.clientWidth,Hh=el.clientHeight;let poly;
   if(k==='mh')poly=[[0,0],[W,0],[W,Hh],[0,Hh]];
   else{const w=W,q={p1:[[0,0],[.64*w-4,0],[.58*w-4,Hh],[0,Hh]],p2:[[.64*w+4,0],[w,0],[w,Hh],[.58*w+4,Hh]],p3:[[0,0],[.43*w-4,0],[.49*w-4,Hh],[0,Hh]],p4:[[.43*w+4,0],[w,0],[w,Hh],[.49*w+4,Hh]]};poly=q[k]}
   const cs=getComputedStyle(el),fx=parseFloat(cs.getPropertyValue('--fx'))||50,fy=parseFloat(cs.getPropertyValue('--fy'))||55;
   const xs=poly.map(p=>p[0]),x0=Math.min(...xs),x1=Math.max(...xs);
   const cx=k==='mh'?W*.42:x0+(x1-x0)*({p1:.48,p2:.62,p3:.5,p4:.5}[k]),cy=k==='mh'?Hh*.62:Hh*fy/100;
   let s=X.ground(0,0,W,Hh,cx,cy,GR[k],{seed:{mh:2,p1:4,p2:9,p3:6,p4:8}[k],sp:k==='mh'?7.5:6.8,r0:Math.min(W,Hh)*.16,r1:Math.hypot(x1-x0,Hh)*.62,n:28});
   s+=X.speed(cx,cy,k==='mh'?Math.min(W,Hh)*.42:Math.min(x1-x0,Hh)*.34,{n:k==='mh'?44:28,l0:12,l1:k==='mh'?110:70,w0:1,w1:k==='mh'?5:4,seed:{mh:44,p1:21,p2:5,p3:8,p4:3}[k],col:k==='p2'?'#c3140c':'#0d0b10',op:k==='p2'?.75:.7});
   s+=`<polygon points="${poly.map(p=>p.map(X.f1).join(',')).join(' ')}" fill="none" stroke="#0d0b10" stroke-width="5" stroke-linejoin="miter"/>`;
   el.insertAdjacentHTML('afterbegin',`<div class="dtw-g" aria-hidden="true">${svgEl(W,Hh,s,'',"hidden")}</div>`)}
  /* 2 · the headline, glyph by glyph: "4 AIs" small and white, TRADE and EARNINGS in gold with halftone in the letters */
  const h1=root.querySelector('.cvx-h1'),tw=root.querySelector('.c2-t');
  if(h1&&tw){const W=tw.clientWidth,desk=W>500;
   const s2=X.fit('EARNINGS',{size:desk?72:58,seed:5,grow:.1},W-6);let s1=s2*.86;{const bal=root.querySelector('.c2-bal'),room=W-(bal&&!desk?bal.offsetWidth+14:0)-8;for(let i=0;i<12;i++){const w1=X.layout('4 AIs',{size:s1*.6,seed:3,sizes:[1,1,1,1,.74]}).tot+10+X.layout('TRADE',{size:s1,seed:8,grow:.08}).tot+s1*.3;if(w1<=room)break;s1*=.94}}
   const a={size:s1*.6,fill:'white',seed:3,jr:5,jb:.05,sizes:[1,1,1,1,.74],depth:3},t={size:s1,fill:'yellow',seed:8,jr:6,jb:.06,grow:.08,depth:Math.round(s1*.11),dot:'#ff6a0a',dotTo:'br'};
   const wa=X.layout('4 AIs',a).tot,wt=X.layout('TRADE',t).tot,we=X.layout('EARNINGS',{size:s2,seed:5,grow:.1}).tot;
   const bal=root.querySelector('.c2-bal'),bh=bal&&!desk?bal.offsetTop+bal.offsetHeight:0;const y1=s1*1.0+6,y2=Math.max(y1+s2*.98,bh+s2*.8),hh=y2+s2*.32+8;
   let g=X.word('4 AIs',Object.assign({x:8+wa/2,y:y1,rot:-4},a))+X.word('TRADE',Object.assign({x:8+wa+10+wt/2,y:y1,rot:-4},t))+X.word('EARNINGS',{x:6+we/2,y:y2,size:s2,fill:'yellow',seed:5,jr:6,jb:.06,grow:.1,rot:-3,depth:Math.round(s2*.11),dot:'#ff6a0a',dotTo:'br'});
   h1.querySelectorAll(':scope > :not(.dtw-h)').forEach(n=>n.style.display='none');h1.querySelectorAll('.dtw-h').forEach(n=>n.remove());
   h1.insertAdjacentHTML('beforeend',`<span class="dtw-h">${svgEl(W,hh,g)}</span>`)}
  /* 3 · sound effects: DING! on a nested burst, FILED! as a stamp burst, the market's move lettered */
  const sf=(sel,txt,o,burst)=>{const el=root.querySelector(sel);if(!el)return;const r=wsvg(txt,o,burst);el.innerHTML=r.svg;el.classList.add('dtw-sfx')};
  const desk=root.clientWidth>=900,kk=desk?1:Math.min(1,root.clientWidth/360);
  sf('.c2-ding','DING!',{size:desk?32:23*kk,fill:'yellow',seed:4,jr:9,jb:.09,grow:.25,rot:-10,depth:4,dot:'#e0140c',dotTo:'br'},(x,y)=>X.burst(x,y,20,32,11,5,{c:['#ff3a31','#fff'],ks:[.72],drop:3,ow:2.4,sx:1.55,sy:.72}));
  sf('.c2-filed','FILED!',{size:desk?32:25*kk,fill:'white',seed:6,jr:8,jb:.07,grow:.2,rot:6,depth:4,dot:'#4a3fd0',dotTo:'br'},(x,y)=>X.burst(x,y,26,40,12,9,{c:['#ff3a6e','#ffd21f'],ks:[.72],drop:3,ow:2.6,sx:1.5,sy:.78}));
  const mv=root.querySelector('.c2-mv');if(mv&&!mv.dataset.dt){mv.dataset.dt=1;const t=mv.textContent.trim()||mv.querySelector('text')?.textContent||'';const txt=(mv.querySelector('text')||{}).textContent||t;const up=/▲/.test(txt);
   const r=wsvg(txt,{size:desk?28:22,fill:up?'green':'red',seed:2,jr:4,jb:.04,depth:3,key:1.3,out:1.8,rot:-4});mv.innerHTML=r.svg}
  const fb=root.querySelector('.c2-file b');if(fb&&!fb.dataset.dt){fb.dataset.dt=1;const r=wsvg(fb.textContent.trim(),{size:desk?24:18*kk,fill:'white',seed:3,jr:4,jb:.04,depth:3,key:1.2,out:1.7,rot:-3,dot:'#9a8ad0'});fb.innerHTML=r.svg;fb.style.cssText='-webkit-text-stroke:0;transform:none'}
  /* 4 · MINE! moves to the overlay so it crosses the cut into the record panel; the rest of the overlay: stars, bolts, debris */
  const mine=root.querySelector('.c2-mine');if(mine)mine.style.visibility='hidden';
  pg.querySelectorAll(':scope > .dtw-ov').forEach(n=>n.remove());
  const PR=pg.getBoundingClientRect(),rel=el=>{const b=el.getBoundingClientRect();return {x:b.left-PR.left,y:b.top-PR.top,w:b.width,h:b.height}};
  const ra=root.querySelector('.c2-ra'),rb=root.querySelector('.c2-rb'),mh=root.querySelector('.c2-mh');let ov='';
  if(ra&&rb&&mh){const A=rel(ra),B=rel(rb),M=rel(mh),w=A.w;
   ov+=X.star(A.x+.64*w,A.y-4,13,{rot:-10});                          // across the masthead / row gutter, over the p1|p2 cut
   ov+=X.star(A.x+1,A.y+A.h*.5,12,{rot:12})+X.star(A.x+w-1,A.y+A.h*.47,9,{rot:-20}); // across the page margin and the panel contours
   ov+=X.bolt(A.x+.585*w,A.y+A.h*.42,.8,14)+X.bolt(M.x+M.w-26,M.y+M.h-34,.75,-24);
   if(mine){const r=wsvg('MINE!',{size:desk?34:26*kk,fill:'pink',seed:9,jr:9,jb:.09,grow:.28,rot:-9,depth:4,dot:'#8a0a3a',dotTo:'br'});
    const mx=B.x+.06*w,my=B.y+B.h-r.h*.52;ov+=`<g transform="translate(${X.f1(mx)} ${X.f1(my)})">${X.burst(r.w*.5,r.h*.45,r.h*.42,r.h*.66,11,13,{c:['#ffd21f','#fff7b0'],ks:[.7],drop:3,ow:2.6,sx:1.55,sy:.78})}${r.svg.replace(/^<svg[^>]*>/,'').replace(/<\/svg>$/,'')}</g>`}}
  pg.insertAdjacentHTML('beforeend',`<div class="dtw-ov" aria-hidden="true">${svgEl(PR.width,PR.height,ov)}</div>`);
 }
 const go=()=>{try{draw();draw();H.classList.add('c2d-ready')}catch(e){console.error('c2d',e);H.classList.add('c2d-ready')}};
 Promise.all([D.fonts.load('40px "Luckiest Guy"'),D.fonts.load('20px Bangers')]).then(go,go);
 let lw=root.clientWidth;new ResizeObserver(()=>{const w=root.clientWidth;if(Math.abs(w-lw)>2){lw=w;setTimeout(go,60)}}).observe(root);
})();
