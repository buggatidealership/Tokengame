/* Round H, area "upcoming": shared bits for the Upcoming takes (u1..u5). Laid over the built X3+ page (#/upcoming).
   Every round, date, count, colour and logo comes from the page (SE helpers from ../../e/_se.js, which the page already carries,
   TICKERS, CO_LOGOS, CAPS, PENDING/UPCOMING). Words and numbers are page text; painted layers are img/*.jpg from Hedra. */
window.HU=(function(){const S=SE,D=document,IMG='tools/concepts/worlds/comic/story/h/upcoming/img/';
const esc=S.esc,nm=t=>(window.TICKERS||{})[t]||S.tk(t);
/* seeded random, so every panel gets its own hand wobble but the same one on every load */
const rnd=seed=>{let a=seed>>>0;return ()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const hash=s=>{let h=2166136261;for(const c of String(s))h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
/* a hand-cut quadrilateral-ish outline: points along each edge, each nudged in by up to j % (corners too). Returns [[x,y]..] in % */
function wob(seed,j,n){const r=rnd(hash(seed));j=j==null?1.2:j;n=n||3;const P=[],e=v=>v*j;
  const edge=(x0,y0,x1,y1,ix,iy)=>{for(let i=0;i<n;i++){const t=i/n;P.push([x0+(x1-x0)*t+ix*e(r()),y0+(y1-y0)*t+iy*e(r())])}};
  edge(0,0,100,0,0,1);edge(100,0,100,100,-1,0);edge(100,100,0,100,0,-1);edge(0,100,0,0,1,0);return P}
const poly=P=>'polygon('+P.map(p=>p[0].toFixed(2)+'% '+p[1].toFixed(2)+'%').join(',')+')';
const path=P=>'M'+P.map(p=>p[0].toFixed(2)+' '+p[1].toFixed(2)).join('L')+'Z';
/* an ink frame: thick outer line plus a thin inner line, drawn on the same wobbled outline the clip uses */
function frame(seed,o){o=o||{};const P=wob(seed,o.j,o.n),I=P.map(([x,y])=>[50+(x-50)*(o.in||.965),50+(y-50)*(o.in||.955)]);
  return {clip:poly(P),svg:`<svg class="hu-ink" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path class="o" d="${path(P)}" vector-effect="non-scaling-stroke"/>${o.inner===false?'':`<path class="i" d="${path(I)}" vector-effect="non-scaling-stroke"/>`}</svg>`}}
/* logos: a one-colour mark is redrawn crisp at any size (upscaled smoothly, alpha thresholded) and returned as a mask, so it can be
   printed in any ink or stamped in gold; a multi-colour mark keeps its own file and is never drawn past its native pixels. */
const cache={};
function loadImg(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src})}
async function mark(t,px){const k=t+'|'+px;if(cache[k])return cache[k];const src=S.logo(t);if(!src)return cache[k]={none:1};
  const im=await loadImg(src);if(!im)return cache[k]={none:1};const w=im.naturalWidth,h=im.naturalHeight,c=D.createElement('canvas');c.width=w;c.height=h;
  const x=c.getContext('2d');x.drawImage(im,0,0);const d=x.getImageData(0,0,w,h).data;
  /* drop an opaque edge tile (a logo drawn on a square) by flood from the corners */
  const tile=[0,w-1,(h-1)*w,(h-1)*w+w-1].every(i=>d[i*4+3]>250);const bg=[d[0],d[1],d[2]];
  const hues=new Set();let n=0,x0=w,y0=h,x1=0,y1=0;
  for(let i=0;i<w*h;i++){const a=d[i*4+3];if(a<128)continue;if(tile&&Math.abs(d[i*4]-bg[0])+Math.abs(d[i*4+1]-bg[1])+Math.abs(d[i*4+2]-bg[2])<60)continue;
    n++;hues.add((d[i*4]>>5)+'-'+(d[i*4+1]>>5)+'-'+(d[i*4+2]>>5));const X=i%w,Y=(i/w)|0;if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
  let dom=null,near=0;const cnt={};for(let i=0;i<w*h;i++){const q=i*4;if(d[q+3]<200)continue;if(tile&&Math.abs(d[q]-bg[0])+Math.abs(d[q+1]-bg[1])+Math.abs(d[q+2]-bg[2])<60)continue;const k2=(d[q]>>4)+'-'+(d[q+1]>>4)+'-'+(d[q+2]>>4);cnt[k2]=(cnt[k2]||0)+1}
  const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]);const tot=top.reduce((a,b)=>a+b[1],0);if(top.length){const [r0,g0,b0]=top[0][0].split('-').map(v=>v*16+8);
    for(const [k2,v] of top){const [r,g,b]=k2.split('-').map(v=>v*16+8);if(Math.abs(r-r0)+Math.abs(g-g0)+Math.abs(b-b0)<70)near+=v}}
  const mono=tot>20&&near/tot>.88;
  if(mono){const id=x.getImageData(0,0,w,h);for(let i=0;i<w*h;i++){const q=i*4;let a=id.data[q+3];
    if(tile)a=Math.abs(d[q]-bg[0])+Math.abs(d[q+1]-bg[1])+Math.abs(d[q+2]-bg[2])<60?0:Math.min(255,(Math.abs(d[q]-bg[0])+Math.abs(d[q+1]-bg[1])+Math.abs(d[q+2]-bg[2]))*2);
    id.data[q]=id.data[q+1]=id.data[q+2]=255;id.data[q+3]=a}x.putImageData(id,0,0)}const ar=(x1-x0+1)/(y1-y0+1);
  if(!mono)return cache[k]={src,mono:false,nat:Math.max(w,h),ar:w/h,dark:!!S.L(t).dark};
  const sc=Math.max(1,Math.ceil(px*2.5/Math.max(x1-x0+1,y1-y0+1))),cw=(x1-x0+1)*sc,ch=(y1-y0+1)*sc,o=D.createElement('canvas');o.width=cw;o.height=ch;
  const ox=o.getContext('2d');ox.imageSmoothingEnabled=true;ox.imageSmoothingQuality='high';ox.filter='blur('+(sc*.55).toFixed(1)+'px)';ox.drawImage(c,x0,y0,x1-x0+1,y1-y0+1,0,0,cw,ch);ox.filter='none';
  const od=ox.getImageData(0,0,cw,ch);for(let i=0;i<od.data.length;i+=4){const a=od.data[i+3];od.data[i]=od.data[i+1]=od.data[i+2]=255;od.data[i+3]=a<110?0:a>150?255:(a-110)*6.3}
  ox.putImageData(od,0,0);return cache[k]={mask:o.toDataURL(),mono:true,ar,nat:Math.max(x1-x0+1,y1-y0+1)}}
/* a logo element: data-hu-logo is filled in by paint() once the mask is ready (kind = 'ink' | 'gold' | 'own') */
const logoEl=(t,cls,kind,px)=>`<i class="hu-lg ${cls||''}" data-hu-logo="${esc(t)}" data-k="${kind||'own'}" data-px="${px||80}" role="img" aria-label="${esc(nm(t))} logo"></i>`;
async function paint(root){for(const e of root.querySelectorAll('[data-hu-logo]:not([data-done])')){e.dataset.done=1;const m=await mark(e.dataset.huLogo,+e.dataset.px);
  if(m.none){e.classList.add('hu-nolg');e.textContent=S.tk(e.dataset.huLogo).slice(0,4);continue}
  if(m.mono){e.classList.add('hu-mono');e.style.setProperty('--m',`url(${m.mask})`);e.style.aspectRatio=m.ar.toFixed(3);e.style.maxWidth=Math.round(m.nat*.85*Math.min(1,m.ar))+'px';e.style.maxHeight=Math.round(m.nat*.85/Math.max(1,m.ar))+'px'}
  else{e.classList.add('hu-own');if(m.dark)e.classList.add('hu-dk');e.innerHTML=`<img src="${m.src}" alt="">`;e.style.setProperty('--nat',(m.nat/2)+'px')}}}
/* the calls, in the page's model order: {m, dir, mag} or a waiting slot */
const calls=x=>S.ORDER.map(m=>{const c=(x.calls||[]).find(c=>c.m===m);return {m,c}});
const callTxt=c=>c?(c.dir==='UP'?'Up ':'Down ')+(c.mag!=null?Math.abs(+c.mag)+'%':''):'?';
const days=()=>S.byDay(S.toCome()).map(d=>({...d,lab:S.dayLab(d.k)}));
const meta=n=>((window.RMETA||{})[n])||{};
/* swap the whole Upcoming tab for a take's root; the take builds its own top, filter and days */
function mount(cls){const up=D.getElementById('wc-up');[...up.children].forEach(c=>c.classList.add('hu-off'));
  const root=D.createElement('div');root.className='hu '+cls;root.dataset.f='';up.prepend(root);return root}
/* the filter: three buttons; filtering hides rounds and then any day left empty */
const FLT=[['','All'],['m7','Mag 7'],['ai','AI']];
function wireFilter(root){root.querySelectorAll('[data-hf]').forEach(b=>b.addEventListener('click',()=>{root.dataset.f=b.dataset.hf;
  root.querySelectorAll('[data-hf]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
  root.querySelectorAll('.hu-day').forEach(d=>{const v=[...d.querySelectorAll('.hu-it')].filter(i=>!b.dataset.hf||i.dataset[b.dataset.hf]==='1');
    d.hidden=!v.length;d.querySelectorAll('.hu-it').forEach(i=>i.classList.toggle('hu-hid',!(!b.dataset.hf||i.dataset[b.dataset.hf]==='1')))})}))}
const itAttr=x=>`data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" href="#/round/${x.n}"`;
const tot=()=>S.totals();
/* shrink a line's type until it fits its box (never below min px) */
function fit(root,sel,min){root.querySelectorAll(sel).forEach(e=>{let f=parseFloat(getComputedStyle(e).fontSize);e.style.textOverflow='clip';
  while(e.scrollWidth>e.clientWidth+1&&f>min){f-=1;e.style.fontSize=f+'px'}e.style.textOverflow=''})}
return {S,D,IMG,esc,nm,rnd,hash,wob,poly,path,frame,mark,logoEl,paint,calls,callTxt,days,meta,mount,fit,FLT,wireFilter,itAttr,tot,face:S.face,brand:S.brand,onB:S.onB,bvars:S.bvars}})();
