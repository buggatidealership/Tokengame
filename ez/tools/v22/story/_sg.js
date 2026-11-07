/* story mockups, helper "g" (2026-10-30): Upcoming as fight night (helper e's U1) on helper e's U2 ticket stub, the calls shown,
   and the company's own familiar mark living behind every card. Shared code: data via helper e's SE (../e/_se.js), the mark tools
   from helper a's _gen.js (copied here so the takes stand alone), the card builders. A take sets SG.art = {main(el,x,M,B), mini(el,x,M,B)}. */
window.SG=(function(){const S=SE,D=document,H=D.documentElement;
const rnd=seed=>{let a=seed>>>0;return ()=>{a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0};
const hex=h=>{const n=parseInt(h.slice(1),16);return [n>>16,n>>8&255,n&255]};
const rgb=(a,al)=>`rgba(${a.map(Math.round).join(',')},${al==null?1:al})`;
const mix=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const lum=(r,g,b)=>(.2126*r+.7152*g+.0722*b)/255;
const INK=[21,18,26],PAPER=[243,234,211],CREAM=[255,250,240],NEWS=[238,224,184];
const load1=src=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=src});
const load=async src=>(await load1(src))||(await load1(src+'?r=1'))||(await load1(src+'?r=2'));
const cv=(w,h)=>{const c=D.createElement('canvas');c.width=Math.max(1,Math.round(w));c.height=Math.max(1,Math.round(h));return c};
/* helper a's mark(): drop an opaque file's edge-connected tile, print a light logo made for dark grounds in ink, trim to the ink */
function mark(img,dark){const w=img.naturalWidth,h=img.naturalHeight,c=cv(w,h),x=c.getContext('2d');x.drawImage(img,0,0);
  const id=x.getImageData(0,0,w,h),d=id.data;
  if([0,w-1,(h-1)*w,(h-1)*w+w-1].every(i=>d[i*4+3]>250)){const k=[d[0],d[1],d[2]],seen=new Uint8Array(w*h),q=[];
    const near=i=>Math.abs(d[i*4]-k[0])+Math.abs(d[i*4+1]-k[1])+Math.abs(d[i*4+2]-k[2])<70;
    for(let X=0;X<w;X++)q.push(X,(h-1)*w+X);for(let Y=0;Y<h;Y++)q.push(Y*w,Y*w+w-1);
    while(q.length){const i=q.pop();if(seen[i])continue;seen[i]=1;if(!near(i))continue;d[i*4+3]=0;const X=i%w,Y=(i/w)|0;if(X>0)q.push(i-1);if(X<w-1)q.push(i+1);if(Y>0)q.push(i-w);if(Y<h-1)q.push(i+w)}}
  if(dark)for(let i=0;i<d.length;i+=4){const mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);if(mn>170&&mx-mn<40){d[i]=INK[0];d[i+1]=INK[1];d[i+2]=INK[2]}}
  x.putImageData(id,0,0);return trim(c)}
function trim(c){const w=c.width,h=c.height,d=c.getContext('2d').getImageData(0,0,w,h).data;let x0=w,y0=h,x1=-1,y1=-1;
  for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++)if(d[(Y*w+X)*4+3]>24){if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
  if(x1<0)return c;const t=cv(x1-x0+1,y1-y0+1);t.getContext('2d').drawImage(c,-x0,-y0);return t}
/* the familiar part: where the brand's own colour is only part of the mark (Amazon's orange smile under a white "a"), that part alone;
   otherwise the whole mark. Returned with why, for the honesty table. */
/* only when the rest of the mark is plain letters in black, white or grey (Amazon's "a"), not a second colour (Chevron's red chevron),
   and the brand part carries real weight (not Lumentum's thin slash) */
function sig(m,B){const w=m.width,h=m.height,d=m.getContext('2d').getImageData(0,0,w,h).data;let n=0,op=0,neu=0,x0=w,y0=h,x1=-1,y1=-1;
  for(let Y=0;Y<h;Y++)for(let X=0;X<w;X++){const i=(Y*w+X)*4;if(d[i+3]<100)continue;op++;
    if(Math.abs(d[i]-B[0])+Math.abs(d[i+1]-B[1])+Math.abs(d[i+2]-B[2])<110){n++;if(X<x0)x0=X;if(X>x1)x1=X;if(Y<y0)y0=Y;if(Y>y1)y1=Y}
    else{const mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);if(mx<50||(mx-mn)/mx<.25)neu++}}
  if(!op||n<op*.15||neu<(op-n)*.8)return {m,how:'whole'};const a=(x1-x0+1)*(y1-y0+1)/(w*h);if(a>.62)return {m,how:'whole'};
  /* keep only the brand-coloured ink of that part (the smile without the "a" above it) */
  const p=Math.round(Math.max(x1-x0,y1-y0)*.06),c=cv(x1-x0+1+2*p,y1-y0+1+2*p),cx=c.getContext('2d');cx.drawImage(m,-x0+p,-y0+p);
  const id=cx.getImageData(0,0,c.width,c.height),q=id.data;for(let i=0;i<q.length;i+=4)if(Math.abs(q[i]-B[0])+Math.abs(q[i+1]-B[1])+Math.abs(q[i+2]-B[2])>=150)q[i+3]=0;cx.putImageData(id,0,0);
  return {m:trim(c),how:'part'}}
function placed(m,W,H,k,cx,cy){const s=Math.min(W*k/m.width,H*k/m.height),w=m.width*s,h=m.height*s,c=cv(W,H);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx*W-w/2,cy*H-h/2,w,h);return c}
/* cover: fill the box (crop the rest), for blow-ups */
function covered(m,W,H,k,cx,cy){const s=Math.max(W*k/m.width,H*k/m.height),w=m.width*s,h=m.height*s,c=cv(W,H);
  const x=c.getContext('2d');x.imageSmoothingQuality='high';x.drawImage(m,cx*W-w/2,cy*H-h/2,w,h);return c}
function sil(c,col,al){const o=cv(c.width,c.height),x=o.getContext('2d');x.drawImage(c,0,0);x.globalCompositeOperation='source-in';x.fillStyle=rgb(col,al);x.fillRect(0,0,o.width,o.height);return o}
function dil(c,r,col){const s=sil(c,col),o=cv(c.width,c.height),x=o.getContext('2d');const n=Math.max(16,Math.round(r*3));
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2;x.drawImage(s,Math.cos(a)*r,Math.sin(a)*r)}for(let rr=r*.5;rr>0;rr-=r*.5)for(let i=0;i<8;i++){const a=i/8*Math.PI*2;x.drawImage(s,Math.cos(a)*rr,Math.sin(a)*rr)}x.drawImage(s,0,0);return o}
function ring(c,r,col){const o=dil(c,r,col),x=o.getContext('2d');x.globalCompositeOperation='destination-out';x.drawImage(c,0,0);return o}
function grain(x,W,H,R,n,al){for(let i=0;i<n;i++){x.fillStyle=rgb(INK,al*R());x.fillRect(R()*W,R()*H,1+R()*1.4,1+R()*1.4)}}
function dots(x,W,H,P,col,rad){for(let Y=0,j=0;Y<H+P;Y+=P*.866,j++)for(let X=(j%2)*P/2;X<W+P;X+=P){const r=rad(X/W,Y/H)*P;if(r<=.2)continue;x.beginPath();x.arc(X,Y,r,0,7);x.fillStyle=col;x.fill()}}
function px(c,f){const x=c.getContext('2d'),id=x.getImageData(0,0,c.width,c.height),d=id.data,w=c.width;for(let i=0;i<d.length;i+=4){if(d[i+3]<8)continue;const p=i/4;f(d,i,p%w,(p/w)|0)}x.putImageData(id,0,0);return c}
/* the brand colour from the logo file (helper a's pal, as world-comic.js r10 reads it) */
const pal=(src,sat)=>new Promise(res=>{const im=new Image();im.onload=()=>{try{const w=64,h=Math.max(8,Math.round(64*im.height/im.width)),c=cv(w,h);
  const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data,bins={};
  for(let i=0;i<d.length;i+=4){if(d[i+3]<160)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<60||(mx-mn)/mx<(sat||.35))continue;
    const k=(r>>5)+','+(g>>5)+','+(b>>5),o=bins[k]||(bins[k]={n:0,r:0,g:0,b:0});o.n++;o.r+=r;o.g+=g;o.b+=b}
  const t=Object.values(bins).sort((a,b)=>b.n-a.n)[0];res(t?'#'+[t.r,t.g,t.b].map(v=>Math.round(v/t.n).toString(16).padStart(2,'0')).join(''):null)}catch(e){res(null)}};im.onerror=()=>res(null);im.src=src});
/* one entry per ticker: the trimmed mark, its familiar part, the brand colour */
const CACHE={};
const get=t=>CACHE[t]||(CACHE[t]=(async()=>{const L=S.L(t),src=S.logo(t);if(!src)return null;const im=await load(src);if(!im)return null;
  const hx=(await pal(src))||(await pal(src,.15))||(L.c&&!/^#12131a$/i.test(L.c)?L.c:'#2b2733');const B=hex(hx),m=mark(im,L.dark),g=sig(m,B);
  return {m,part:g.m,how:g.how,B,hx,dark:lum(...B)<.25}})());
/* the card ---------------------------------------------------------------------------------------------- */
const sgn=c=>(c.dir==='UP'?'+':'−')+c.mag+'%';
const call=(c,cls)=>`<i class="sg-cl ${c.dir==='UP'?'sg-cu':'sg-cd'} ${cls||''}">${S.face(c.m)}<b>${sgn(c)}</b><span class="wc-sr">${S.NM[c.m]} says ${c.dir==='UP'?'up':'down'} ${c.mag}%</span></i>`;
const corner=(x,up)=>{const cs=x.calls.filter(c=>(c.dir==='UP')===up).sort((a,b)=>b.mag-a.mag);
  return `<div class="sg-co ${up?'sg-bu':'sg-be'}" style="--n:${cs.length}"><small>${up?'Bulls':'Bears'}</small><span>${cs.length?cs.map(c=>call(c)).join(''):'<em class="sg-none">Nobody</em>'}</span></div>`};
const qs=`<div class="sg-co sg-q" style="--n:4"><small>The calls</small><span>${S.ORDER.map(m=>`<i class="sg-cl">${S.face(m)}<b>?</b></i>`).join('')}</span></div>`;
const stub=x=>`<span class="sg-stub" aria-hidden="true"><b>R${x.n}</b>${x.locked?'<em class="sg-lk">Locked</em>':`<i>${x.nv?'Bet #1':x.m7?'Mag 7':'Admit one'}</i>`}</span>`;
const due=x=>x.r==='Today'?'today':x.r==='Tomorrow'?'tomorrow':x.r==='past'?'soon':S.wd(x.day);
const bell=x=>S.closeTxt(x)||'';
function main(x){return `<a class="sg-m${x.locked?' sg-l':' sg-o'}${x.nv?' sg-nv':''}" href="#/round/${x.n}" data-t="${S.esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${S.bvars(S.brand(x.ticker))}">
  <span class="sg-tk">${stub(x)}<span class="sg-bd"><span class="sg-art" aria-hidden="true"></span>
  <span class="sg-tag">${x.nv?'Bet #1 · Main event':'Main event'}</span>
  <span class="sg-hd"><b class="sg-nm">${S.esc(x.co)}</b><small>${S.esc(S.tk(x.ticker))}${x.locked&&bell(x)?' · '+S.esc(bell(x)):''}</small></span>
  <span class="sg-ring">${x.locked?corner(x,true)+'<b class="sg-vs">VS</b>'+corner(x,false):qs}</span>
  ${x.locked?'':`<span class="sg-ft">Calls due ${due(x)}.</span>`}</span></span></a>`}
function under(x){const up=x.calls.filter(c=>c.dir==='UP'),dn=x.calls.filter(c=>c.dir!=='UP');
  return `<a class="sg-u${x.locked?' sg-l':' sg-o'}${x.nv?' sg-nv':''}" href="#/round/${x.n}" data-t="${S.esc(x.ticker)}" data-n="${x.n}" data-m7="${x.m7?1:0}" data-ai="${x.ai?1:0}" style="${S.bvars(S.brand(x.ticker))}">
  <span class="sg-tk">${stub(x)}<span class="sg-ub"><span class="sg-mini" aria-hidden="true"></span><span class="sg-un"><b>${S.esc(x.co)}</b>${x.nv?'<em class="sg-b1">Bet #1</em>':x.m7?'<em>Mag 7</em>':''}</span>
  ${x.locked?`<span class="sg-uc"><span class="sg-tb sg-bu">${up.map(c=>call(c,'sg-s')).join('')||'<i class="sg-nb">0</i>'}</span><i class="sg-v">vs</i><span class="sg-tb sg-be">${dn.map(c=>call(c,'sg-s')).join('')||'<i class="sg-nb">0</i>'}</span></span>`
    :`<span class="sg-uc sg-uq">${S.ORDER.map(m=>`<i class="sg-cl sg-s">${S.face(m)}<b>?</b></i>`).join('')}<small>Calls due ${due(x)}</small></span>`}</span></span></a>`}
function build(root,L){root.innerHTML=S.byDay(L).map(({k,items})=>{const l=S.dayLab(k),lk=items.filter(x=>x.locked).length,m=items[0];
  const rest=k==='wait'?items:items.slice(1);
  return `<section class="sg-d${k==='wait'?' sg-w':''}" aria-label="${S.esc(l.a+' '+l.b)}"><header class="sg-h"><span class="sg-fn">${k==='wait'?'On hold':'Fight night'}</span><div class="sg-hh" role="heading" aria-level="2">${S.esc(l.a)}<small>${S.esc(l.b)}</small></div>
    <p>${lk?`<b>${lk} locked</b>`:''}${lk&&items.length>lk?' · ':''}${items.length>lk?(items.length-lk)+' to call':''}</p></header>
    ${k==='wait'?'':main(m)}${rest.length?`<div class="sg-ug">${k==='wait'?'':'<p class="sg-uh">Undercard</p>'}${rest.map(under).join('')}</div>`:''}</section>`}).join('')}
/* the test gallery (?sgall): every round still to come as a main event, plus a made-up 4 vs 0 split (Coinbase with every call down, labelled) */
function gallery(root){const L=S.toCome().map(x=>({...x}));const c=L.find(x=>x.ticker==='COIN');if(c){const f={...c,n:c.n,calls:c.calls.map(q=>({...q,dir:'DOWN'})),fake:1};L.unshift(f)}
  root.innerHTML=`<div class="sg-gal">${L.map(x=>`<div class="sg-gi">${x.fake?'<p class="sg-fk">Made up for the check: all four down</p>':''}${main(x)}</div>`).join('')}</div>`}
/* the one mark wider than 2.2:1 that does not spell the name (Rocket Lab's R and streak); the only hand-kept list */
const NOWORD={RKLB:1};
async function paint(root){const A=SG.art;if(!A)return;const jobs=[];
  /* a wordmark (wider than 2.2:1) already spells the name in the brand's own type: it takes the name's place (the name stays for screen readers) */
  root.querySelectorAll('.sg-m').forEach(el=>jobs.push((async()=>{const M=await get(el.dataset.t);if(M){el.classList.toggle('sg-wm',M.m.width/M.m.height>=2.2&&!NOWORD[el.dataset.t]);await A.main(el.querySelector('.sg-art'),el,M)}else el.classList.add('sg-noart')})()));
  root.querySelectorAll('.sg-u').forEach(el=>jobs.push((async()=>{const M=await get(el.dataset.t);if(M)await A.mini(el.querySelector('.sg-mini'),el,M);else el.querySelector('.sg-mini').innerHTML=`<b class="se-nolg">${S.esc(S.tk(el.dataset.t)).slice(0,4)}</b>`})()));
  await Promise.all(jobs)}
async function go(cls){const root=S.upMount('sg-up '+cls);if(!root){H.classList.add('sg-ready');return}
  const L=S.toCome();if(/sgall/.test(location.search)||window.__sgAll)gallery(root);else build(root,L);
  await paint(root);let w=innerWidth;addEventListener('resize',()=>{if(innerWidth===w)return;w=innerWidth;clearTimeout(go.t);go.t=setTimeout(()=>{root.querySelectorAll('.sg-art,.sg-mini').forEach(e=>e.innerHTML='');paint(root)},300)});
  root.querySelectorAll('.sg-m').forEach(e=>S.once(e,.3));H.classList.add('sg-ready')}
/* ms to the bell, read from the page's own bell line ("Bell in 17h 55m") */
/* the free band for the art: under the header, above the corners (body coordinates) */
const band=card=>{const b=card.querySelector('.sg-bd').getBoundingClientRect(),h=card.querySelector('.sg-hd').getBoundingClientRect(),r=card.querySelector('.sg-ring').getBoundingClientRect();return {t:h.bottom-b.top,b:r.top-b.top,h0:h.top-b.top}};
const bellMs=el=>{const t=(el.querySelector('.sg-hd small')||{}).textContent||'';const h=/(\d+)h/.exec(t),m=/(\d+)m/.exec(t);return h||m?((h?+h[1]:0)*60+(m?+m[1]:0))*6e4:null};
return {S,rnd,hash,hex,rgb,mix,lum,INK,PAPER,CREAM,NEWS,cv,band,placed,covered,sil,dil,ring,grain,dots,px,get,go,bellMs,art:null,CACHE}})();
