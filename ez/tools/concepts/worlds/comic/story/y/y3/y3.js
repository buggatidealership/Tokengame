/* Y3 The door (2026-10-31). Meet the models as four dressing-room doors in a dark corridor, ranked by season P&L.
   Every pixel is drawn here: CSS gradients and borders for the surfaces and bevels, small inline SVGs for the brass star,
   the lever and the flag sticker, and four material textures (paint grime, masonite fibre, paper, concrete) made once
   from SVG feTurbulence into a canvas and reused as data URIs (no live filters on the page).
   Facts -> carriers: rank -> the number engraved in the brass star; name and version -> the engraved nameplate;
   lab's country -> a flag sticker on the door; the model -> the door's paint, its mark lit behind the wired glass, and
   its light spilling out under the door and round the latch edge; #1 -> gold-leaf star and a golden ticket under the
   clip (gold arrives once, then still); role, P&L, right-way count, best round, last five -> the call sheet on the
   clipboard. One quiet life per door: now and then a shadow crosses the light under the door (someone is in there). */
(function(){
const D=document,H=D.documentElement,RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const A=__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n);
const ORD=Object.keys(A).filter(m=>MODELS[m]).sort((a,b)=>A[b].pnl-A[a].pnl);
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const ROLE=['We bet on its call','In the hunt','In the hunt','Last place'];
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
/* the door's paint (the model's colour, darkened as old enamel) and its room light (the model's colour as light; Grok's black cannot glow, so its room is cold white) */
const PAINT={GPT:'#0b5a47',KIMI:'#173f86',CLAUDE:'#8a3f27',GROK:'#1a181f'};
const LIGHT={GPT:'#3cf0b4',KIMI:'#62a8ff',CLAUDE:'#ff9a6c',GROK:'#e4e9ff'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const money=v=>(v<0?'−':'+')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const best=m=>{let b=null;for(const r of R){const x=A[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};

/* ---- material textures, rendered once ---- */
const svgTex=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs>${body}</defs><rect width="${w}" height="${h}" filter="url(#f)"/></svg>`;
const TEX={
  grime:[256,256,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .05" numOctaves="4" seed="7" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .02  0 0 0 0 .02  0 0 0 0 .03  -1.6 0 0 0 1.05"/></filter>`],
  chips:[256,256,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".09" numOctaves="3" seed="3" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .86  0 0 0 0 .80  0 0 0 0 .68  9 0 0 0 -5.6"/></filter>`],
  fibre:[256,256,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .55" numOctaves="3" seed="11" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .12  0 0 0 0 .07  0 0 0 0 .03  1.4 0 0 0 -.45"/></filter>`],
  paper:[200,200,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="2" seed="5" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .25  0 0 0 0 .16  0 0 0 0 .05  1 0 0 0 -.38"/></filter>`],
  brush:[256,64,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".004 .9" numOctaves="2" seed="9" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  1.2 0 0 0 -.35"/></filter>`],
  floor:[256,256,`<filter id="f" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".02 .08" numOctaves="4" seed="21" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 .55  0 0 0 0 .52  0 0 0 0 .48  .9 0 0 0 -.25"/></filter>`]};
function bake(){return Promise.all(Object.entries(TEX).map(([k,[w,h,b]])=>new Promise(res=>{const im=new Image();
  im.onload=()=>{try{const c=D.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(im,0,0);H.style.setProperty('--y3-'+k,`url(${c.toDataURL('image/png')})`)}catch(e){}res()};
  im.onerror=()=>res();im.src='data:image/svg+xml,'+encodeURIComponent(svgTex(w,h,b))})))}

/* ---- drawn parts ---- */
const STAR='50,3 62,36 97,37 69,58 80,92 50,72 20,92 31,58 3,37 38,36';
const starSvg=(i,gold)=>{const g=gold?['#7a4a06','#fdbc2a','#fff3c0','#d99a12','#fff0a8']:['#4a3210','#a87a2e','#f2d58a','#7c5a1e','#c9a24e'];
  return `<svg class="y3-star" viewBox="0 0 100 96" aria-hidden="true"><defs>
   <linearGradient id="y3s${i}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${g[2]}"/><stop offset=".35" stop-color="${g[1]}"/><stop offset=".62" stop-color="${g[3]}"/><stop offset="1" stop-color="${g[0]}"/></linearGradient>
   <linearGradient id="y3t${i}" x1="1" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${g[4]}"/><stop offset=".5" stop-color="${g[1]}"/><stop offset="1" stop-color="${g[3]}"/></linearGradient>
   <pattern id="y3h${i}" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(30)"><circle cx="2" cy="2" r="1" fill="#04070e"/></pattern></defs>
   <polygon points="${STAR}" fill="url(#y3s${i})" stroke="#04070e" stroke-width="3.2" stroke-linejoin="round"/>
   <polygon points="${STAR}" transform="translate(50 49) scale(.7) translate(-50 -49)" fill="url(#y3t${i})" stroke="#04070e" stroke-opacity=".55" stroke-width="2" stroke-linejoin="round"/>
   <polygon points="69,58 80,92 50,72 20,92 31,58 50,72" fill="url(#y3h${i})" opacity=".35"/>
   <path d="M38 36 L50 3 L54 14" fill="none" stroke="#fffbe6" stroke-width="2.4" stroke-linecap="round" opacity=".9"/>
  </svg>`};
const lever=`<svg class="y3-lever" viewBox="0 0 80 40" aria-hidden="true"><defs><linearGradient id="y3lv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f1ea"/><stop offset=".35" stop-color="#b9b4aa"/><stop offset=".55" stop-color="#6d6860"/><stop offset="1" stop-color="#2e2b27"/></linearGradient>
  <radialGradient id="y3ro" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fbf8f1"/><stop offset=".45" stop-color="#a39e94"/><stop offset="1" stop-color="#2c2925"/></radialGradient></defs>
  <circle cx="62" cy="20" r="15" fill="url(#y3ro)" stroke="#04070e" stroke-width="2.4"/>
  <path d="M64 14 L10 13 Q3 13 3 19 Q3 25 10 25 L64 26 Z" fill="url(#y3lv)" stroke="#04070e" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M12 15.5 L58 16" stroke="#fffdf6" stroke-width="1.6" stroke-linecap="round" opacity=".85"/>
  <circle cx="62" cy="20" r="4" fill="#26231f" stroke="#04070e" stroke-width="1.2"/></svg>`;
function flagSvg(k){const W=60,Hh=40;let s=`<svg class="y3-flg" viewBox="0 0 ${W} ${Hh}" aria-hidden="true">`;
  if(k==='us'){for(let i=0;i<7;i++)s+=`<rect y="${i*Hh/6.5}" width="${W}" height="${Hh/13}" fill="#c8312f"/>`;s=s.replace(`viewBox`,`style="background:#efe6cf" viewBox`);
    s+=`<rect width="26" height="${Hh*7/13}" fill="#284a9c"/>`;for(let r=0;r<4;r++)for(let c=0;c<5;c++)s+=`<circle cx="${3.2+c*5+(r%2?2.4:0)}" cy="${3+r*5.2}" r="1.05" fill="#efe6cf"/>`}
  else{s=s.replace(`viewBox`,`style="background:#c8312f" viewBox`);const st=(x,y,r)=>{let q=[];for(let k2=0;k2<10;k2++){const a=-Math.PI/2+k2*Math.PI/5,rr=k2%2?r*.42:r;q.push((x+rr*Math.cos(a)).toFixed(1)+','+(y+rr*Math.sin(a)).toFixed(1))}return `<polygon points="${q}" fill="#f6c431"/>`};
    s+=st(11,11,7)+st(23,4.5,2.4)+st(27,9.5,2.4)+st(27,16,2.4)+st(23,20.5,2.4)}
  return s+`</svg>`}
const markSvg=m=>`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}"/></svg>`;
/* the last five as marker strokes in printed boxes (drawn, not glyphs) */
const tick=w=>`<i class="y3-bx ${w?'y3-w':'y3-l'}"><svg viewBox="0 0 20 20" aria-hidden="true">${w?'<path d="M3.5 11 L8 15.5 L17 4"/>':'<path d="M4.5 4.5 L15.5 15.5 M15.5 4.5 L4.5 15.5"/>'}</svg></i>`;

function door(m,i){const a=A[m],t=a.W+a.L,b=best(m),lg=(window.CO_LOGOS||{})[b.r.ticker],gold=i===0;
  return `<article class="y3-d y3-r${i+1}${gold?' y3-gold':''}" data-m="${m}" style="--y3-paint:${PAINT[m]};--y3-light:${LIGHT[m]};--y3-mc:${MODELS[m].c};--y3-dl:${(i*3.7+2).toFixed(1)}s"
     aria-label="Number ${i+1}, ${esc(NM[m])}, ${esc(MODELS[m].ver)}">
   <div class="y3-set" aria-hidden="true"><i class="y3-wall"></i><i class="y3-sconce"><b></b></i><i class="y3-floor"></i><i class="y3-spill"><i class="y3-walk"></i></i></div>
   <div class="y3-case"><div class="y3-leaf">
     <i class="y3-paint" aria-hidden="true"></i>
     <i class="y3-pnl" aria-hidden="true"></i>
     <i class="y3-rim" aria-hidden="true"></i>
     <div class="y3-lite" aria-hidden="true"><i class="y3-glow"></i><i class="y3-mk">${markSvg(m)}</i><i class="y3-wire"></i><i class="y3-refl"></i></div>
     <div class="y3-plate">${starSvg(i,gold)}<b class="y3-rk" aria-hidden="true">${i+1}</b>${gold?'<i class="y3-sheen" aria-hidden="true"></i>':''}
       <h3 class="y3-np"><span class="y3-nm">${esc(NM[m])}</span><small>${esc(MODELS[m].ver)}</small><i class="y3-scr y3-scr1"></i><i class="y3-scr y3-scr2"></i></h3></div>
     <i class="y3-stk" aria-hidden="true">${flagSvg(FLAG[m]||'us')}</i>
     <i class="y3-lvw" aria-hidden="true">${lever}</i>
     <div class="y3-clip">
       <i class="y3-nail" aria-hidden="true"></i>${gold?'<i class="y3-gt" aria-hidden="true"><span>Golden ticket</span><i class="y3-sheen"></i></i>':''}
       <i class="y3-clamp" aria-hidden="true"><i></i><i></i></i>
       <div class="y3-sheet">
         <p class="y3-role">${ROLE[i]}</p>
         <p class="y3-pl"><small>Current P&amp;L</small><b class="${a.pnl>=0?'y3-up':'y3-dn'}" data-v="${Math.round(Math.abs(a.pnl))}" data-s="${a.pnl<0?'−':'+'}">${money(a.pnl)}</b></p>
         <p class="y3-ln">Right way on <b>${a.W} of ${t}</b> calls.</p>
         <p class="y3-ln y3-bst">Highest P&amp;L: <b class="${b.v>=0?'y3-up':'y3-dn'}">${money(b.v)}</b> on ${lg?`<img class="${lg.dark?'y3-dk':''}" src="media/${lg.f}" alt="">`:''}<span>${esc(b.r.co)} (${esc(b.r.ticker)})</span></p>
         <p class="y3-l5" aria-label="Last five calls: ${a.seq.slice(-5).map(x=>x==='W'?'right':'wrong').join(', ')}">${a.seq.slice(-5).map(x=>tick(x==='W')).join('')}<small>last 5 calls</small></p>
       </div></div>
   </div></div>
  </article>`}

function rollCnt(el){const n=el.querySelector('.y3-pl b');if(!n||RM()||window.__kfShot)return;const v=+n.dataset.v,s=n.dataset.s,fin=n.textContent,t0=performance.now(),d=1000;
  (function f(t){const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);n.textContent=k<1?s+'$'+Math.round(v*e).toLocaleString('en-US'):fin;if(k<1)requestAnimationFrame(f)})(t0)}

async function go(){const sec=D.querySelector('.wc-chars');if(!sec)return setTimeout(go,200);
  if(!D.getElementById('y3-fonts')){const l=D.createElement('link');l.id='y3-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Special+Elite&family=Permanent+Marker&display=swap';D.head.appendChild(l)}
  await bake();
  const hall=D.createElement('div');hall.className='y3-hall';hall.innerHTML=ORD.map(door).join('');
  const g=sec.querySelector('.wc-ch-grid');g.style.display='none';g.after(hall);sec.classList.add('y3-sec');
  const io=new IntersectionObserver(es=>es.forEach(e=>{const d=e.target;d.classList.toggle('y3-on',e.isIntersecting);
    if(e.isIntersecting&&!d.classList.contains('y3-in')){d.classList.add('y3-in');rollCnt(d)}}),{threshold:.3});
  hall.querySelectorAll('.y3-d').forEach(d=>io.observe(d));
  if(D.fonts)await D.fonts.ready;
  H.classList.add('y3-ready')}
window.Y3check=function(){const out={cards:[]};
  D.querySelectorAll('.y3-d').forEach(d=>{const r=d.getBoundingClientRect(),sh=d.querySelector('.y3-sheet').getBoundingClientRect();
    out.cards.push({m:d.dataset.m,w:Math.round(r.width),h:Math.round(r.height),sheetOverflow:d.querySelector('.y3-sheet').scrollHeight-d.querySelector('.y3-sheet').clientHeight})});
  return out};
go()})();
