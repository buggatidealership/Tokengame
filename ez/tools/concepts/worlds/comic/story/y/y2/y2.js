/* y2 The road case (round Y, 2026-10-31): every model's card is the lid of a flight case, lit from above.
   Materials are rendered once into canvases (laminate, brushed aluminium, scuffs, gaffer cloth, gold leaf, paint wear)
   and reused as images, so nothing heavy is filtered live. Numbers come from the page's globals only. */
(async function(){
const D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const sec=D.querySelector('.wc-chars'),grid=sec&&sec.querySelector('.wc-ch-grid');if(!grid)return;
if(!D.getElementById('y2-fonts')){const l=D.createElement('link');l.id='y2-fonts';l.rel='stylesheet';
  l.href='https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@800;900&family=Permanent+Marker&display=block';D.head.appendChild(l)}
const DPR=Math.min(3,Math.max(2,devicePixelRatio||2));
const cv=(w,h)=>{const c=D.createElement('canvas');c.width=w;c.height=h;return [c,c.getContext('2d')]};
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const url=c=>`url(${c.toDataURL('image/png')})`;

/* ---------- materials, drawn once ---------- */
// black ABS laminate: pebbled grain lit from above
function laminate(){const S=240,[c,x]=cv(S,S);const im=x.createImageData(S,S),d=im.data;
  for(let i=0;i<S*S;i++){const n=(rnd()-.5)*14;d[i*4]=20+n;d[i*4+1]=22+n;d[i*4+2]=28+n;d[i*4+3]=255}x.putImageData(im,0,0);
  for(let k=0;k<2600;k++){const px=rnd()*S,py=rnd()*S,r=.8+rnd()*2.2;// a pebble: lit top, shadow under
    let g=x.createRadialGradient(px,py-r*.5,0,px,py,r*1.4);g.addColorStop(0,'rgba(255,255,255,.07)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r*1.4,0,7);x.fill();
    x.fillStyle='rgba(0,0,0,.18)';x.beginPath();x.arc(px,py+r*.7,r*.8,0,7);x.fill()}
  return url(c)}
// scuffs and scratches: transparent overlay
function scuffs(){const S=640,[c,x]=cv(S,S);x.lineCap='round';
  for(let k=0;k<70;k++){const px=rnd()*S,py=rnd()*S,a=rnd()*Math.PI,l=10+rnd()*90;x.strokeStyle=`rgba(230,225,215,${.05+rnd()*.16})`;x.lineWidth=.5+rnd()*1.3;
    x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+Math.cos(a)*l*.5+rnd()*8,py+Math.sin(a)*l*.5+rnd()*8,px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
  for(let k=0;k<16;k++){const px=rnd()*S,py=rnd()*S,r=8+rnd()*26;const g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(210,205,195,.10)');g.addColorStop(1,'rgba(210,205,195,0)');x.fillStyle=g;x.fillRect(px-r,py-r,2*r,2*r)}
  for(let k=0;k<6;k++){const px=rnd()*S,py=rnd()*S;x.fillStyle=`rgba(${rnd()<.5?'200,40,40':'220,200,90'},.18)`;// paint transfer from other cases
    x.beginPath();x.ellipse(px,py,4+rnd()*14,1+rnd()*3,rnd()*3,0,7);x.fill()}
  return url(c)}
// brushed aluminium: horizontal streaks; v=true draws them vertical
function alu(v){const L=480,T=48,[c,x]=v?cv(T,L):cv(L,T);const im=x.createImageData(c.width,c.height),d=im.data;
  const row=[];for(let j=0;j<T;j++)row.push((rnd()-.5)*26);
  for(let i=0;i<L;i++)for(let j=0;j<T;j++){let n=row[j]+(rnd()-.5)*18;if(rnd()<.004)row[j]+=(rnd()-.5)*10;
    const lv=176+n,p=v?(i*T+j):(j*L+i);d[p*4]=lv;d[p*4+1]=lv+3;d[p*4+2]=lv+8;d[p*4+3]=255}
  x.putImageData(im,0,0);return url(c)}
// gaffer tape cloth: weave under a satin coat
function gaffer(){const [c,x]=cv(120,60);x.fillStyle='#2b2c31';x.fillRect(0,0,120,60);
  for(let i=0;i<120;i+=2){x.fillStyle=`rgba(255,255,255,${.025+rnd()*.03})`;x.fillRect(i,0,1,60)}
  for(let j=0;j<60;j+=2){x.fillStyle=`rgba(0,0,0,${.06+rnd()*.06})`;x.fillRect(0,j,120,1)}return url(c)}
// gold leaf: overlapping leaves of slightly different gold, cracks between them
function goldLeaf(){const S=220,[c,x]=cv(S,S);const g=x.createLinearGradient(0,0,S,S);g.addColorStop(0,'#fed98a');g.addColorStop(.5,'#fdbc2a');g.addColorStop(1,'#d99a12');x.fillStyle=g;x.fillRect(0,0,S,S);
  for(let k=0;k<40;k++){const px=rnd()*S-20,py=rnd()*S-20,w=30+rnd()*50,h=30+rnd()*50;const t=rnd();
    x.fillStyle=t<.33?'rgba(255,236,170,.35)':t<.66?'rgba(190,130,20,.25)':'rgba(255,210,90,.3)';x.save();x.translate(px,py);x.rotate((rnd()-.5)*.3);x.fillRect(0,0,w,h);
    x.strokeStyle='rgba(120,70,0,.35)';x.lineWidth=.7;x.beginPath();x.moveTo(0,0);for(let s=0;s<6;s++)x.lineTo(w*s/5,(rnd()-.5)*2);x.stroke();x.restore()}
  return url(c)}
// spray-paint wear: an alpha mask with flecks lost and two scrapes
function wear(){const W=360,Hh=140,[c,x]=cv(W,Hh);x.fillStyle='#000';x.fillRect(0,0,W,Hh);x.globalCompositeOperation='destination-out';
  for(let k=0;k<900;k++){x.fillStyle=`rgba(0,0,0,${.4+rnd()*.6})`;x.beginPath();x.arc(rnd()*W,rnd()*Hh,.4+rnd()*1.4,0,7);x.fill()}
  x.lineCap='round';for(let k=0;k<5;k++){x.strokeStyle='rgba(0,0,0,.8)';x.lineWidth=.8+rnd()*1.5;const px=rnd()*W,py=rnd()*Hh;x.beginPath();x.moveTo(px,py);x.lineTo(px+30+rnd()*70,py+(rnd()-.5)*24);x.stroke()}
  return url(c)}
// a vinyl flag sticker with worn edges (US for the US labs, China for Moonshot)
function flagSticker(cc){const W=150,Hh=100,[c,x]=cv(W,Hh);
  if(cc==='cn'){x.fillStyle='#de2910';x.fillRect(0,0,W,Hh);const st=(cx,cy,r,a)=>{x.save();x.translate(cx,cy);x.rotate(a||0);x.beginPath();for(let k=0;k<10;k++){const q=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.4:r;x.lineTo(rr*Math.cos(q),rr*Math.sin(q))}x.closePath();x.fillStyle='#ffde00';x.fill();x.restore()};
    st(25,25,15);st(50,10,5,.4);st(60,20,5,.8);st(60,35,5,0);st(50,45,5,.4)}
  else{for(let k=0;k<13;k++){x.fillStyle=k%2?'#f4ede0':'#c8202f';x.fillRect(0,k*Hh/13,W,Hh/13+.5)}x.fillStyle='#22336b';x.fillRect(0,0,W*.4,Hh*7/13);
    x.fillStyle='#f4ede0';for(let r=0;r<5;r++)for(let k=0;k<6;k++){const px=6+k*10+(r%2?5:0),py=6+r*10.5;if(px<W*.4-3){x.beginPath();x.arc(px,py,1.8,0,7);x.fill()}}}
  // sun-faded and scuffed: a light wash, then flecks and edge chips lost to the white vinyl under it
  x.fillStyle='rgba(255,245,225,.10)';x.fillRect(0,0,W,Hh);x.globalCompositeOperation='destination-out';
  for(let k=0;k<160;k++){const e=rnd(),px=e<.25?rnd()*6:e<.5?W-rnd()*6:rnd()*W,py=e<.25||e<.5?rnd()*Hh:(rnd()<.5?rnd()*5:Hh-rnd()*5);x.fillStyle='rgba(0,0,0,.9)';x.beginPath();x.arc(px,py,.6+rnd()*2.4,0,7);x.fill()}
  x.lineCap='round';for(let k=0;k<7;k++){x.strokeStyle='rgba(0,0,0,.55)';x.lineWidth=.6+rnd();const px=rnd()*W,py=rnd()*Hh;x.beginPath();x.moveTo(px,py);x.lineTo(px+rnd()*40,py+(rnd()-.5)*10);x.stroke()}
  return url(c)}
// a steel corner cap: an L bracket, three rivets and a ball, lit from above whichever corner it sits on
function cap(sx,sy){const S=64,f=(x,y)=>[sx?S-x:x,sy?S-y:y].map(v=>v.toFixed(1)).join(',');
  const P=[[0,0],[S,0],[S,13],[20,13],[13,20],[13,S],[0,S]],d='M'+P.map(p=>f(...p)).join('L')+'Z';
  const rv=[[38,7],[7,38],[22,22]].map(([x,y])=>{const [a,b]=f(x,y).split(',');return `<circle cx="${a}" cy="${b}" r="3.6" fill="url(#rv)" stroke="#04070e" stroke-width=".9"/><circle cx="${a-1}" cy="${b-1.3}" r="1.1" fill="#fff" opacity=".75"/>`}).join('');
  const [bx,by]=f(9,9).split(',');
  return `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S} ${S}" width="${S}" height="${S}"><defs>
   <linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sy?'#9aa1ab':'#e6e9ee'}"/><stop offset=".55" stop-color="${sy?'#6c727c':'#a9afb8'}"/><stop offset="1" stop-color="${sy?'#3f444c':'#6f757e'}"/></linearGradient>
   <radialGradient id="rv" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".6" stop-color="#9097a1"/><stop offset="1" stop-color="#3c4048"/></radialGradient>
   <radialGradient id="bl" cx=".38" cy=".28" r=".85"><stop offset="0" stop-color="#ffffff"/><stop offset=".25" stop-color="#d9dde3"/><stop offset=".7" stop-color="#7d838d"/><stop offset="1" stop-color="#30343b"/></radialGradient>
   <pattern id="ht" width="3.2" height="3.2" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><circle cx="1.6" cy="1.6" r=".9" fill="#04070e"/></pattern>
   <linearGradient id="hm" x1="0" y1="0" x2="0" y2="1"><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".9"/></linearGradient><mask id="m"><rect width="${S}" height="${S}" fill="url(#hm)"/></mask></defs>
   <path d="${d}" fill="url(#st)" stroke="#04070e" stroke-width="2.4" stroke-linejoin="round"/>
   <path d="${d}" fill="url(#ht)" mask="url(#m)" opacity=".55"/>${rv}
   <circle cx="${+bx+1.5}" cy="${+by+2.5}" r="11" fill="#04070e" opacity=".45"/><circle cx="${bx}" cy="${by}" r="10.5" fill="url(#bl)" stroke="#04070e" stroke-width="2"/>
   <path d="M${bx-5},${by-4} q4,-4 8,-1.5" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".9"/></svg>`)}")`}
seed=11;const TX={lam:laminate(),scuff:scuffs(),aluH:alu(false),aluV:alu(true),gaf:gaffer(),gold:goldLeaf(),wear:wear(),us:flagSticker('us'),cn:flagSticker('cn'),
  c00:cap(0,0),c10:cap(1,0),c01:cap(0,1),c11:cap(1,1)};
const st=sec.style;for(const k in TX)st.setProperty('--y2-'+k,TX[k]);

/* ---------- data, from the page's globals ---------- */
const P=window.__x2pPnl().A,R=window.ROUNDS||[],M=window.MODELS,LOG=window.CO_LOGOS||{};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'},CN={us:'United States',cn:'China'};
const old=[...grid.querySelectorAll('article.wc-ch')],order=old.map(a=>a.dataset.m),roles=old.map(a=>(a.querySelector('.wc-ch-role')||{}).textContent||'');
const money=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const best=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const lum=h=>{h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const v=[0,2,4].map(i=>parseInt(h.substr(i,2),16)/255).map(c=>c<=.03928?c/12.92:Math.pow((c+.055)/1.055,2.4));return .2126*v[0]+.7152*v[1]+.0722*v[2]};
// brand colour read from the company's own logo file (the most common saturated colour), else its listed colour
const bpal=src=>new Promise(res=>{const im=new Image();im.onload=()=>{try{const W=64,Hh=Math.max(8,Math.round(64*im.height/im.width)),[c,x]=cv(W,Hh);x.drawImage(im,0,0,W,Hh);const d=x.getImageData(0,0,W,Hh).data,bins={};
  for(let i=0;i<d.length;i+=4){if(d[i+3]<160)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b),s=mx?(mx-mn)/mx:0;if(s<.35||mx<60)continue;const k=(r>>5)+','+(g>>5)+','+(b>>5);(bins[k]=bins[k]||{n:0,r:0,g:0,b:0});bins[k].n++;bins[k].r+=r;bins[k].g+=g;bins[k].b+=b}
  const L=Object.values(bins).sort((a,b)=>b.n-a.n);res(L[0]?'#'+[L[0].r,L[0].g,L[0].b].map(v=>Math.round(v/L[0].n).toString(16).padStart(2,'0')).join(''):null)}catch(e){res(null)}};im.onerror=()=>res(null);im.src=src});
const tick='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4.5 10.5l3.6 3.6L15.8 6" fill="none" stroke="#f8f0d9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const cross='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5.5 5.5l9 9M14.5 5.5l-9 9" fill="none" stroke="#f8f0d9" stroke-width="3" stroke-linecap="round"/></svg>';

const cards=await Promise.all(order.map(async(m,i)=>{const a=P[m],tot=a.W+a.L,b=best(m),Mm=M[m],fl=FLAG[m]||'us',lg=LOG[b.r.ticker];
  const src=lg?'media/'+lg.f:'',brand=(src&&await bpal(src))||(lg&&lg.c)||'#3a3f4a';
  const key=lum(Mm.c)<.05?'#c9d3e6':Mm.c;// Grok's own colour is ink: its lamp burns a cool white instead
  const capInk=lum(brand)>.35?'#04070e':'#f8f0d9';
  const tape=i===0?'#fdbc2a':lum(Mm.c)<.05?'#8a8f99':Mm.c,tapeInk=lum(tape)>.28?'#04070e':'#f8f0d9';
  const seq=a.seq.slice(-5);const sx=(i*137)%400,sy=(i*211)%400;
  return `<article class="y2-c${i===0?' y2-gold':''}" data-m="${m}" style="--mc:${Mm.c};--key:${key};--brand:${brand};--capink:${capInk};--tape:${tape};--tapeink:${tapeInk};--sx:${sx}px;--sy:${sy}px;--tilt:${[-1.2,.9,-.7,1.1][i%4]}deg">
  <div class="y2-lid" aria-hidden="true"><i class="y2-key"></i><i class="y2-ht"></i><i class="y2-sc"></i></div>
  <i class="y2-ex y2-ex-t" aria-hidden="true"></i><i class="y2-ex y2-ex-b" aria-hidden="true"></i><i class="y2-ex y2-ex-l" aria-hidden="true"></i><i class="y2-ex y2-ex-r" aria-hidden="true"></i>
  <i class="y2-cap y2-c00" aria-hidden="true"></i><i class="y2-cap y2-c10" aria-hidden="true"></i><i class="y2-cap y2-c01" aria-hidden="true"></i><i class="y2-cap y2-c11" aria-hidden="true"></i>
  <i class="y2-latch" aria-hidden="true"><i></i></i>
  <div class="y2-in">
    <div class="y2-plate"><small>${i===0?'Golden ticket':'Season 1'}</small><b>No.${i+1}</b>${i===0?'<i class="y2-glint" aria-hidden="true"></i>':''}</div>
    <h3 class="y2-nm"><span class="y2-sp">${NM[m]}</span><small class="y2-sp">${esc(Mm.ver)}</small></h3>
    <div class="y2-bdg"><i class="y2-flag y2-flag-${fl}" role="img" aria-label="${CN[fl]}"></i><i class="y2-mk" style="--bg:${Mm.bg||'#f8f0d9'};--fg:${Mm.fg||Mm.c}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${Mm.d}"/></svg></i></div>
    <p class="y2-tape"><span>${esc(roles[i])}</span></p>
    <p class="y2-pnl ${a.pnl>=0?'y2-up':'y2-dn'}"><small class="y2-sp">Current P&amp;L</small><b class="y2-sp y2-cnt" data-v="${Math.round(Math.abs(a.pnl))}" data-s="${a.pnl<0?'−':'+'}">${money(a.pnl)}</b></p>
    <div class="y2-dy"><span class="y2-dymo">Right way on</span><span class="y2-dymo">${a.W} of ${tot} calls</span></div>
    <figure class="y2-pol"><i class="y2-tp y2-tp1" aria-hidden="true"></i><i class="y2-tp y2-tp2" aria-hidden="true"></i>
      <span class="y2-ph">${src?`<img src="${src}" alt=""${lg.dark?' class="y2-lgdk"':''}>`:''}</span>
      <figcaption><small>Highest P&amp;L</small><b>${money(b.v)}</b><span>${esc(b.r.co)} (${esc(b.r.ticker)})</span></figcaption></figure>
    <p class="y2-l5" aria-label="Last five calls: ${seq.map(x=>x==='W'?'right':'wrong').join(', ')}">${seq.map(x=>`<i class="${x==='W'?'y2-w':'y2-x'}">${x==='W'?tick:cross}</i>`).join('')}<small>last 5</small></p>
  </div></article>`}));
grid.innerHTML=cards.join('');sec.classList.add('y2-on');

// once on view: the money counts up, #1's gold leaf catches the light once, then everything holds still (not with reduced motion)
const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const c=e.target;io.unobserve(c);c.classList.add('y2-in-v');if(RM||window.__kfShot)return;
  const n=c.querySelector('.y2-cnt'),v=+n.dataset.v,s=n.dataset.s,fin=n.textContent,t0=performance.now();
  (function f(t){const k=Math.min(1,(t-t0)/900),e2=1-Math.pow(1-k,3);n.textContent=k<1?s+'$'+Math.round(v*e2).toLocaleString('en-US'):fin;if(k<1)requestAnimationFrame(f)})(t0)}),{threshold:.35});
grid.querySelectorAll('.y2-c').forEach(c=>io.observe(c));

// measurement hook for the runner: empty area inside each card, things over a logo, emoji
window.__y2chk=()=>{const o={cards:[]};for(const c of grid.querySelectorAll('.y2-c')){const r=c.querySelector('.y2-in').getBoundingClientRect();
  const kids=[...c.querySelectorAll('.y2-in > *')].map(k=>k.getBoundingClientRect());// sample a grid of points: empty = no content box covers it
  let e=0,t=0;for(let y=r.top+2;y<r.bottom;y+=4)for(let x=r.left+2;x<r.right;x+=4){t++;if(!kids.some(k=>x>=k.left&&x<=k.right&&y>=k.top&&y<=k.bottom))e++}
  const lg=c.querySelector('.y2-ph img'),lr=lg&&lg.getBoundingClientRect();
  const over=lr?[...c.querySelectorAll('.y2-in *')].filter(k=>k!==lg&&!k.contains(lg)&&!lg.contains(k)&&!k.closest('.y2-ph')&&!k.matches('.y2-pol,figure')).filter(k=>{const q=k.getBoundingClientRect();return q.width&&q.left<lr.right-1&&q.right>lr.left+1&&q.top<lr.bottom-1&&q.bottom>lr.top+1}).map(k=>k.className||k.tagName):[];
  o.cards.push({m:c.dataset.m,w:Math.round(r.width),h:Math.round(c.getBoundingClientRect().height),empty:Math.round(e/t*100)+'%',overLogo:over.join(' ')||'none'})}
  o.emoji=/\p{Extended_Pictographic}/u.test(grid.textContent);return o};
await D.fonts.load('900 20px "Big Shoulders Stencil Display"').catch(()=>{});await D.fonts.load('20px "Permanent Marker"').catch(()=>{});
// fit the stencilled name and the P&L to their space (a stencil runs to the edge of the lid, never past it)
const fit=()=>grid.querySelectorAll('.y2-nm,.y2-pnl b').forEach(el=>{el.style.setProperty('--k',1);const w=el.clientWidth,s=el.scrollWidth;if(s>w+.5)el.style.setProperty('--k',(w/s*.98).toFixed(3))});
fit();new ResizeObserver(()=>requestAnimationFrame(fit)).observe(grid);
H.classList.add('y2-ready')})();
