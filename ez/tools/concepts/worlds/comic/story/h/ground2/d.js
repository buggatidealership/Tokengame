(function(){const G=window.__G2;['models','rounds','bet'].forEach(id=>G.opener(id));const S=G.secs();const beats=G.beats();
S.forEach((s,i)=>{if(i===0)return;const W=1000,H=100;G.seed(500+i*17);const hp=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--H'))||36,yl=(hp+14)/(hp+28)*H,yr=14/(hp+28)*H,yy=x=>yl+(yr-yl)*x/W;
 // the cut edge: a sheared paper core along the diagonal, the logo's two slashes across it, tapered speed strokes off it
 let d=`M-10,${yy(-10)}`;for(let x=0;x<=W+10;x+=25){d+=` L${x},${(yy(x)+(G.rnd()-.5)*1.4).toFixed(1)}`}
 const x0=W*(i%2?.08:.74);let sl='';[['#03c870',0],['#ff3a31',34]].forEach(([c,o])=>{sl+=`<path d="M${x0+o+10},${-6} L${x0+o+34},${-6} L${x0+o-6},${H+6} L${x0+o-30},${H+6}Z" fill="${c}" stroke="#0d0b10" stroke-width="2.6" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>`});
 let sp='';for(let k=0;k<5;k++){const xs=W*(.3+G.rnd()*.4),y=yy(xs)+5+k*5;sp+=G.stroke(xs,y,xs+120+G.rnd()*120,y-12-G.rnd()*8,2.2,'#0d0b10')}
 const seam=document.createElement('div');seam.className='gD-seam';seam.setAttribute('aria-hidden','true');
 seam.innerHTML=G.svg(W,H,`<g opacity=".9">${sp}</g><path d="${d}" fill="none" stroke="#0d0b10" stroke-width="7" vector-effect="non-scaling-stroke" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="#fbf3df" stroke-width="2.4" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>${sl}`);
 s.el.before(seam);const b=beats.find(x=>x.nextElementSibling===seam||x.nextElementSibling===s.el);if(b){seam.appendChild(b);b.removeAttribute('aria-hidden')}});
})();
