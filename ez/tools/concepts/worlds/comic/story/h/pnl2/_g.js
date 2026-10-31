/* Round H6, area pnl2: shared helpers on top of ../pnl/_lib.js (PN: live data, windows, geometry).
   The idea every take shares: the chart is not laid over the painting, it is drawn ON a surface inside it.
   - stage(): the painting as an <img> at a known scale, so any point of the painting has a known place on the page;
   - quad(): a box mapped onto a four-cornered surface of the painting with a CSS matrix3d (homography), so the chart takes the
     surface's perspective;
   - over(): a second image laid on the same pixels (the painting's own reflections, screened over the marks; or a foreground
     cut-out, so what stands in front of the surface covers the marks).
   Classes pq-. */
(function(){
const G=window.PG={};
/* homography from the rectangle (0,0)-(w,h) to the quad p[0..3] (tl,tr,br,bl), as a CSS matrix3d (transform-origin 0 0) */
G.m3d=(w,h,p)=>{const [x0,y0]=p[0],[x1,y1]=p[1],[x2,y2]=p[2],[x3,y3]=p[3];
  const dx1=x1-x2,dx2=x3-x2,dy1=y1-y2,dy2=y3-y2,sx=x0-x1+x2-x3,sy=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(sx*dy2-dx2*sy)/den,hh=(dx1*sy-sx*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  /* unit square -> quad; scale by 1/w, 1/h */
  const A=a/w,B=b/h,D=d/w,E=e/h,Gg=g/w,H=hh/h;
  return `matrix3d(${[A,D,0,Gg,B,E,0,H,0,0,1,0,c,f,0,1].map(v=>+v.toFixed(8)).join(',')})`};
/* the painting at width W (px), optionally cropped: returns {s, ox, oy, h} so painting px (x,y) -> stage px (x*s-ox, y*s-oy) */
G.stage=(el,src,iw,ih,o)=>{o=o||{};const W=el.clientWidth,s=(o.w||W)/iw,ox=o.ox!=null?o.ox:((iw*s-W)/2),top=(o.top||0)*ih*s,bot=(o.bot!=null?o.bot:1)*ih*s,h=bot-top;
  el.style.height=h+'px';let im=el.querySelector('img.pq-bg');if(!im){im=new Image();im.className='pq-bg';im.alt='';el.prepend(im)}
  im.src=src;im.style.cssText=`position:absolute;left:${-ox}px;top:${-top}px;width:${iw*s}px;height:${ih*s}px;max-width:none`;
  return {s,ox,oy:top,h,W,P:(x,y)=>[x*s-ox,y*s-top]}};
G.over=(el,src,S,iw,ih,cls)=>{let im=el.querySelector('img.'+cls);if(!im){im=new Image();im.className='pq-ov '+cls;im.alt='';el.appendChild(im)}
  im.src=src;im.style.cssText=`position:absolute;left:${-S.ox}px;top:${-S.oy}px;width:${iw*S.s}px;height:${ih*S.s}px;max-width:none;pointer-events:none`;return im};
/* lay a box (w x h CSS px) onto the quad Q (painting px, tl,tr,br,bl) of stage S */
G.quad=(box,S,Q,w,h)=>{const p=Q.map(q=>S.P(q[0],q[1]));box.style.cssText=`position:absolute;left:0;top:0;width:${w}px;height:${h}px;transform-origin:0 0;transform:${G.m3d(w,h,p)}`;return p};
G.size=Q=>[(Math.hypot(Q[1][0]-Q[0][0],Q[1][1]-Q[0][1])+Math.hypot(Q[2][0]-Q[3][0],Q[2][1]-Q[3][1]))/2,(Math.hypot(Q[3][0]-Q[0][0],Q[3][1]-Q[0][1])+Math.hypot(Q[2][0]-Q[1][0],Q[2][1]-Q[1][1]))/2];
/* a chart path inside a plot box: pts from PN.geom (x 0..1000, y 0..H) -> box px */
G.path=(pts,X,Y)=>pts.map((p,i)=>(i?'L':'M')+X(p[0]).toFixed(1)+' '+Y(p[1]).toFixed(1)).join(' ');
/* octilinear route (PCB): from point to point, first along the straighter axis, then a 45 degree run */
G.octo=(pts,X,Y)=>{let d='';pts.forEach((p,i)=>{const x=X(p[0]),y=Y(p[1]);if(!i){d='M'+x.toFixed(1)+' '+y.toFixed(1);return}
  const q=pts[i-1],x0=X(q[0]),y0=Y(q[1]),dx=x-x0,dy=y-y0,ad=Math.min(Math.abs(dx),Math.abs(dy));
  /* diagonal first (as far as the smaller span), then straight */
  const mx=x0+Math.sign(dx)*ad,my=y0+Math.sign(dy)*ad;d+=` L${mx.toFixed(1)} ${my.toFixed(1)} L${x.toFixed(1)} ${y.toFixed(1)}`});return d};
G.esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
/* an accessible copy of the rows for screen readers */
G.srTable=w=>`<table class="pn-sr"><caption>P&amp;L by AI, ${w.full}</caption><tr><th>AI</th><th>Last 24 hours</th><th>Last 7 days</th><th>Season</th></tr>${w.rank.map(m=>`<tr><th>${PN.NM[m]}</th><td>${PN.$f(PN.W.d1.tot[m])}</td><td>${PN.$f(PN.W.d7.tot[m])}</td><td>${PN.$f(PN.W.season.tot[m])}</td></tr>`).join('')}</table>`;
/* keyboard for SVG buttons */
document.addEventListener('keydown',e=>{const b=e.target.closest&&e.target.closest('.pn svg [data-win]');if(b&&(e.key==='Enter'||e.key===' ')){e.preventDefault();b.dispatchEvent(new MouseEvent('click',{bubbles:true}))}});
G.wide=()=>innerWidth>=900;
})();
