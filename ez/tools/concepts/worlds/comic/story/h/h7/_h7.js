/* H7 mockup helpers (2026-10-31): the vault label and the Smart or lucky -> bet transition, laid over the built X3+ page.
   H7.scene(): a layer inside the vault painting (.hb-open .g) sized and placed exactly as the painting is drawn there
   (background-size:cover at the box's own background-position), so children placed in the painting's 1600x900 pixels sit on
   the painted objects at every width. Inside it 1cqw = 16 painting px, so type sized in cqw scales with the painting.
   H7.doc(el): an element's box in document coordinates. H7.over(cls): an absolutely placed layer in document coordinates.
   H7.scroll(fn): fn(scrollY) on every scroll frame and on resize (rAF). H7.RM: reduced motion. H7.rain(): hand-placed rain streaks. */
window.H7=(function(){
const D=document,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const IW=1600,IH=900;
function scene(){const g=D.querySelector('.wc-bet.hb-on .hb-open .g');if(!g)return null;
  let L=g.querySelector(':scope>.h7-sc');
  if(!L){g.style.position='relative';L=D.createElement('div');L.className='h7-sc';g.appendChild(L);
    /* the opener was aria-hidden as pure picture; a label in it must be read */
    const o=g.closest('.hb-open');if(o)o.removeAttribute('aria-hidden');
    const fit=()=>{const w=g.clientWidth,h=g.clientHeight;if(!w||!h)return;const k=Math.max(w/IW,h/IH),W=IW*k,Hh=IH*k;
      const bp=getComputedStyle(g).backgroundPosition.split(' ').map(parseFloat);
      Object.assign(L.style,{width:W+'px',height:Hh+'px',left:((w-W)*bp[0]/100)+'px',top:((h-Hh)*(bp[1]!=null?bp[1]:50)/100)+'px'});
      L.__k=k;L.dispatchEvent(new Event('h7fit'))};
    fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(g);L.__fit=fit}
  return L}
/* place a child at painting pixel (x,y) */
function at(el,x,y){el.style.left=(x/IW*100)+'%';el.style.top=(y/IH*100)+'%';return el}
/* the painting's own pixels as the fill of a text element: map painting point (sx,sy) at scale z (1 = as painted) to the element's 0,0 */
function tex(el,L,sx,sy,z){const k=(L.__k||1)*(z||1);el.style.backgroundImage='var(--hb-vault)';el.style.backgroundSize=(IW*k)+'px '+(IH*k)+'px';
  el.style.backgroundPosition=(-sx*k)+'px '+(-sy*k)+'px'}
function doc(el){const r=el.getBoundingClientRect();return {l:r.left+scrollX,t:r.top+scrollY,r:r.right+scrollX,b:r.bottom+scrollY,w:r.width,h:r.height}}
function over(cls){let o=D.querySelector('body>.'+cls);if(!o){o=D.createElement('div');o.className='h7-ov '+cls;o.setAttribute('aria-hidden','true');D.body.appendChild(o)}return o}
function scroll(fn){let raf=0;const go=()=>{raf=0;fn(scrollY)};const ask=()=>{if(!raf)raf=requestAnimationFrame(go)};
  addEventListener('scroll',ask,{passive:true});addEventListener('resize',ask);if(window.ResizeObserver)new ResizeObserver(ask).observe(D.body);go();return go}
/* seeded random: the same streaks every load */
function rng(s){return()=>{s=(s*16807)%2147483647;return (s-1)/2147483646}}
/* rain: an SVG tile of streaks drawn like the painting's (thin, cream, a 4 degree slant, ragged lengths), twice for a seamless loop */
function rain(w,h,n,seed,op){const r=rng(seed||7);let s='';for(let i=0;i<n;i++){const x=r()*w,y=r()*h,l=8+r()*r()*46,a=(op||.5)*(.35+r()*.65),sw=.5+r()*.9;
    const d=`M${x.toFixed(1)} ${y.toFixed(1)}l${(-l*.07).toFixed(1)} ${l.toFixed(1)}`;s+=`<path d="${d}" stroke-opacity="${a.toFixed(2)}" stroke-width="${sw.toFixed(2)}"/>`;
    if(y+l>h)s+=`<path d="M${x.toFixed(1)} ${(y-h).toFixed(1)}l${(-l*.07).toFixed(1)} ${l.toFixed(1)}" stroke-opacity="${a.toFixed(2)}" stroke-width="${sw.toFixed(2)}"/>`}
  return `<svg class="h7-rn" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="none" aria-hidden="true"><g fill="none" stroke="#efe7cf" stroke-linecap="round">${s}</g></svg>`}
function ready(cb){(function w(n){if(D.documentElement.classList.contains('hb-ready')&&D.querySelector('.wc-bet.hb-on .hb-open .g')&&D.querySelector('#wc-book .wc-splash'))cb();else if(n<400)setTimeout(()=>w(n+1),100)})(0)}
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),lerp=(a,b,t)=>a+(b-a)*t;
return {RM,IW,IH,scene,at,tex,doc,over,scroll,rain,rng,ready,clamp,lerp,
  share:()=>{const S=window.SIM||{};return S.poolShare!=null?Math.round(S.poolShare*100):69}};
})();
/* the transition's geometry, in document px: Smart or lucky's panel and its last caption, the bet's wrap and painting,
   the seam between the two grounds, and a point on the painted coin pile */
H7.geo=function(){const D=document,sp=D.querySelector('#wc-book .wc-splash'),cap=sp.querySelector('.wc-sp-cap')||sp.lastElementChild,
  w=D.querySelector('.wc-bet.hb-on .hb-wrap'),g=D.querySelector('.wc-bet.hb-on .hb-open .g'),L=H7.scene();
 const S=H7.doc(sp),C=H7.doc(cap),W=H7.doc(w),Gp=H7.doc(g),Lr=H7.doc(L),k=L.__k;
 const img=(x,y)=>({x:Lr.l+x*k,y:Lr.t+y*k});
 return {S,C,W,G:Gp,seam:Math.round((S.b+W.t)/2),vw:D.documentElement.clientWidth,vh:innerHeight,pile:img(712,566),mouth:img(700,420),img,k}};
