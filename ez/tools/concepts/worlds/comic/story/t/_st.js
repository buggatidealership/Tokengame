/* story mockups, helper "t" (2026-10-30): the Upcoming tab rethought desktop first. Shared code.
   Laid over the built X3+ page; data from helper e's SE and helper g's SG (both on the page), every number from the sheet.
   Logos: the page's own raster files, never drawn past their native size at DPR 2 (lg() caps the drawn box at natural/2). */
window.TT=(function(){const S=SE,G=window.SG,D=document,H=D.documentElement;
const NM=S.NM,ORDER=S.ORDER,esc=S.esc;
const info={};
const load=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
/* each logo: natural size, whether it is an opaque tile (all four corners solid; Apple, Intel, ARM), its corner colour, the brand colour */
async function prep(L){await Promise.all([...new Set(L.map(x=>x.ticker))].map(async t=>{const src=S.logo(t),o={src,w:0,h:0,tile:0,bg:'#fffaf0',dark:!!S.L(t).dark};
  if(src){const im=await load(src);if(im){o.w=im.naturalWidth;o.h=im.naturalHeight;try{const c=D.createElement('canvas');c.width=o.w;c.height=o.h;const x=c.getContext('2d');x.drawImage(im,0,0);
    const px=(X,Y)=>x.getImageData(X,Y,1,1).data,cs=[px(0,0),px(o.w-1,0),px(0,o.h-1),px(o.w-1,o.h-1)];
    if(cs.every(p=>p[3]>250)){o.tile=1;const p=cs[0];o.bg=`rgb(${p[0]},${p[1]},${p[2]})`}}catch(e){}}}
  let hx=null;try{const M=G&&await G.get(t);hx=M&&M.hx}catch(e){}o.hx=hx||S.brand(t);info[t]=o}))}
/* the logo in its plate: box = the plate's css size; the image is fitted inside and never above natural/2 css px */
function lg(t,box,cls){const o=info[t]||{};if(!o.src||!o.w)return `<span class="tt-lg tt-nolg ${cls||''}" style="--b:${box}px">${esc(S.tk(t)).slice(0,4)}</span>`;
  const room=o.tile?box:box*.8,k=Math.min(room/o.w,room/o.h,.5),w=Math.round(o.w*k*10)/10,h=Math.round(o.h*k*10)/10;
  return `<span class="tt-lg${o.tile?' tt-tile':''}${o.dark&&!o.tile?' tt-dk':''} ${cls||''}" style="--b:${box}px;--lb:${o.tile?o.bg:o.dark?'#15121a':'#fffaf0'}"><img src="${o.src}" alt="" style="width:${w}px;height:${h}px"></span>`}
const hx=t=>(info[t]||{}).hx||S.brand(t);
const lum=h=>{const n=parseInt(h.slice(1),16),f=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4};return .2126*f(n>>16)+.7152*f(n>>8&255)+.0722*f(n&255)};
const onB=h=>1.05/(lum(h)+.05)<3?'#15121a':'#fff';
const bv=t=>{const c=hx(t),o=onB(c);return `--bc:${c};--bt:${o};--bo:${o==='#fff'?'#15121a':'#fff'}`};
const sg=c=>(c.dir==='UP'?'+':'−')+c.mag+'%';
/* one AI's prediction: face, its name spelled, the figure in green or red */
const call=(c,cls)=>`<span class="tt-c ${c.dir==='UP'?'tt-up':'tt-dn'} ${cls||''}">${S.face(c.m)}<span class="tt-cn">${NM[c.m]}</span><b>${sg(c)}</b><span class="wc-sr"> says ${c.dir==='UP'?'up':'down'} ${c.mag}%</span></span>`;
const wait=(m,cls)=>`<span class="tt-c tt-q ${cls||''}">${S.face(m)}<span class="tt-cn">${NM[m]}</span><b>?</b></span>`;
const side=(x,up)=>x.calls.filter(c=>(c.dir==='UP')===up).sort((a,b)=>b.mag-a.mag||ORDER.indexOf(a.m)-ORDER.indexOf(b.m));
const due=x=>x.r==='Today'?'today':x.r==='Tomorrow'?'tomorrow':x.r==='past'?'soon':S.wd(x.day,1);
const dueS=x=>x.r==='Today'?'today':x.r==='Tomorrow'?'tomorrow':x.r==='past'?'soon':S.wd(x.day);
const bell=x=>S.closeTxt(x)||'';
const tag=x=>x.nv?'Bet #1':x.m7?'Mag 7':'';
const data=()=>{const L=S.toCome();return {L,days:S.byDay(L)}};
const counts=L=>({lk:L.filter(x=>x.locked).length,to:L.filter(x=>!x.locked).length});
/* swap the tab: hide its dark cover, helper g's fight night and the page's own lists; mount a take's root at the top */
function mount(cls){const up=D.getElementById('wc-up');if(!up)return null;
  up.querySelectorAll(':scope > .wc-tab-cv, :scope > .sg-up, :scope > .wc-flt, :scope > .wc-spot, :scope > .wc-h2-b, :scope > .wc-cal').forEach(e=>e.classList.add('tt-hide'));
  const r=D.createElement('div');r.className='tt-root '+cls;up.prepend(r);return r}
const flt=()=>`<div class="tt-flt" role="group" aria-label="Show"><button type="button" aria-pressed="true" data-f="">All</button><button type="button" aria-pressed="false" data-f="m7">Mag 7</button><button type="button" aria-pressed="false" data-f="ai">AI</button></div>`;
function wire(root,after){root.querySelectorAll('.tt-flt button').forEach(b=>b.addEventListener('click',()=>{root.querySelectorAll('.tt-flt button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));root.dataset.f=b.dataset.f;after&&after()}))}
const vis=e=>!(e.offsetParent===null);
const hdr=()=>{const h=D.querySelector('header.top');return h?Math.round(h.getBoundingClientRect().height):0};
const rm=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const ready=()=>H.classList.add('tt-ready');
return {S,info,prep,lg,hx,bv,onB,sg,call,wait,side,due,dueS,bell,tag,data,counts,mount,flt,wire,vis,hdr,rm,ready,NM,ORDER,esc}})();
