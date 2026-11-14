/* H44 S3 (mockup): "the shop window, from the street": the same card shop seen from outside at midday (img/s3-phone2.jpg, s3-desk.jpg).
   The Mag 7 stand in the shop's display window under the striped awning, "Mag 7" on the blank gilded sign board above it; the line (the live
   H41 belt, swipe untouched) runs in the glass street cart on the pavement. Every slab is the live element MOVED from #x2pVit (same labels,
   same lift tag); the header is the live one. Each painting is drawn in two parts, the shopfront and the cart, as 9-slices whose horizontal
   scale is fixed by the scene's width: only a plain band (the window's felt, the cart's back glass) stretches vertically to fit the slabs. */
(function(){var n0=0;(function go(){if(!(window.__x2pVit&&document.querySelector('#x2pVit .vt-line'))){if(++n0<600)setTimeout(go,50);return}
try{run()}catch(e){window.__shopErr=e;console.error(e)}})();
function run(){
const D=document,P='tools/concepts/worlds/comic/story/h/bright44/img/',vit=D.getElementById('x2pVit'),sec=D.getElementById('record');if(D.getElementById('shop'))return;
const desk=matchMedia('(min-width:1000px)').matches,F=desk?'desk':'phone';
/* measured on the paintings (picture px of each crop): w = crop width; front: the stretch band (t, b from the crop's top and bottom), the window's
   felt (x0..x1), the sill the slabs stand on (y from the band's bottom edge, negative = above), the sign board's face; cart: band and belt span */
const G={phone:{front:{w:1200,h:1800,t:900,b:160,x0:104,x1:1100,top:-62,sign:[130,300,1070,436]},cart:{w:1200,h:500,t:80,b:340,x0:0,x1:1200,sink:96}},
         desk:{front:{w:2560,h:990,t:600,b:350,x0:500,x1:1780,top:-66,bot:-298,sign:[670,166,1890,274]},cart:{w:2560,h:450,t:70,b:340,x0:430,x1:1810,sink:70}}}[F];
const part=(k,inner,extra)=>{const g=G[k];return `<div class="s3-o s3-${k}" style="--cw:${g.w};--ch:${g.h};--t:${g.t};--b:${g.b};--x0:${g.x0};--x1:${g.x1};--top:${g.top||0};--bot:${g.bot||0}">`+
  `<div class="s3-bi" style="border-image-source:url(${P}p-s3-${F}-${k}.webp)"><div class="s3-in">${inner}</div></div>${extra||''}</div>`};
const s=G.front.sign,sign=`<span class="s3-sign" style="--sx0:${s[0]};--sy0:${s[1]};--sx1:${s[2]};--sy1:${s[3]}"><b>Mag 7</b></span>`;
const root=D.createElement('div');root.className='vt shop s3 s3-'+F;root.id='shop';
root.innerHTML=`<div class="s3-hslot"></div><div class="s3-scene">${part('front','<div class="s3-mag" role="group" aria-label="The Mag 7"></div>',sign)}${part('cart','<div class="s3-lslot"></div>')}</div><div class="s3-nslot"></div>`;
vit.style.display='none';sec.appendChild(root);
const hd=vit.querySelector('.m7-hd');if(hd)root.querySelector('.s3-hslot').replaceWith(hd);
/* the Mag 7: the live slabs, hero first (phones: the hero row, then two rows of three; desktop: the hero beside two rows of three) */
const bins=[...vit.querySelectorAll('.vt-case .vt-bay .vt-bin')],hero=vit.querySelector('.vt-case .vt-hero .vt-bin'),others=bins.filter(b=>b!==hero);
const cell=(b,c)=>{const d=D.createElement('div');d.className='s3-c '+(c||'');while(b.firstChild)d.appendChild(b.firstChild);return d};
const mag=root.querySelector('.s3-mag');
if(desk){/* desktop: the hero on the left, the other six in two rows of three beside it (the live case's own desktop arrangement) */
 const g=D.createElement('div');g.className='s3-dg';if(hero)g.appendChild(cell(hero,'s3-hero'));const r=D.createElement('div');r.className='s3-r s3-r6';others.forEach(b=>r.appendChild(cell(b)));g.appendChild(r);mag.appendChild(g)}
else{const h=D.createElement('div');h.className='s3-r s3-rh';if(hero)h.appendChild(cell(hero,'s3-hero'));mag.appendChild(h);
 for(let i=0;i<2;i++){const r=D.createElement('div');r.className='s3-r s3-r3';others.slice(i*3,i*3+3).forEach(b=>r.appendChild(cell(b)));mag.appendChild(r)}}
/* the line: the live belt into the cart, its Newer / Older plates under the scene on the pavement's edge */
const ln=vit.querySelector('.vt-line');root.querySelector('.s3-lslot').replaceWith(ln);const nav=ln.querySelector('.vt-nav');if(nav)root.querySelector('.s3-nslot').replaceWith(nav);
/* the sign's word by its ink (Anton, the live plates' face), never under 8px */
function fit(){const sp=root.querySelector('.s3-sign'),b=sp.querySelector('b');b.style.fontSize='';const W=sp.clientWidth*.8,H=sp.clientHeight;let f=Math.min(H*.7,64);b.style.fontSize=f+'px';while(b.scrollWidth>W&&f>8){f-=.5;b.style.fontSize=f+'px'}
  try{window.__x2pVit.fit()}catch(e){}try{window.__x2pVit.LN.resize()}catch(e){}}
fit();D.fonts&&D.fonts.ready.then(fit);
/* the lift (the live behaviour: the first touch lifts and tags, the second opens), now that the slabs left #x2pVit's own listeners */
let ptype='';root.addEventListener('pointerdown',e=>{ptype=e.pointerType||''},true);
const unlift=()=>root.querySelectorAll('.vt-it.vt-lift').forEach(l=>l.classList.remove('vt-lift'));
root.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('.vt-it>a.vt-sl');if(!a)return;const it=a.parentNode;
  if((ptype==='touch'||ptype==='pen')&&!it.classList.contains('vt-lift')){e.preventDefault();e.stopPropagation();unlift();it.classList.add('vt-lift')}ptype=''},true);
window.__shop={fit,F};
}})();
