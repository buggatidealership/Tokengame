/* H_ROUNDS (owner, 2026-10-31, round H "rounds": the rack R2 above "Every round so far", and every round tile as a T2 Golden Age
   newsprint cover; from tools/concepts/worlds/comic/story/h/rounds/{_r.js,r2.js,t2.js}). Needs pop_p1 (html.p1-on, X3+ only).
   The rack: the newsstand painted by the model with the nine biggest graded companies' logos on its covers (baked art); each cover
   links to the newest graded round of the company painted on it, and carries that round's number as page text. When the live
   "biggest nine" (ROUNDS x CAPS) no longer matches the painting, the covers still link to the right companies, the caption says
   "Big names" instead of "The biggest names", and html gets data-hr-stale (the painting needs a re-render).
   The tiles: each graded round a comic cover: art in the middle, the company logo as the masthead on a red banner, the round
   number and the winner's coin in a yellow price circle, the move on a green or red ribbon, the company and who won at the foot.
   Everything but the art is page text from ROUNDS. Built only for tiles on show (the rest when "Show all" opens them); survives
   pop_p1's rebuilds (width changes, the book redrawn). */
(function(){const H=document.documentElement,M='media/',INK='#0d0b10';

/* ---- per-round art: first match wins ----
   THUMBS:  film-based thumbnails (another session adds them: round number -> file name in media/, written out in full)
   PAINTED: the T2 Golden Age paintings (Hedra gpt-image-2, 1K low, 2026-10-31), paper bands cropped off
   then the round's film poster (FILMS[n].p), then the page's own tile art (the painted mark M3 draws, or the logo) */
const THUMBS={};
const PAINTED={69:'cover-mrk-t2.jpg',70:'cover-lly-t2.jpg',71:'cover-sbux-t2.jpg',72:'cover-rddt-t2.jpg',73:'cover-sndk-t2.jpg',74:'cover-amzn-t2.jpg',
  75:'cover-coin-t2.jpg',76:'cover-mstr-t2.jpg',77:'cover-cvx-t2.jpg',78:'cover-intc-t2.jpg',79:'cover-azn-l-t2.jpg',80:'cover-xom-t2.jpg'};
const art=r=>THUMBS[r.n]?M+THUMBS[r.n]:PAINTED[r.n]?M+PAINTED[r.n]:(window.FILMS&&FILMS[r.n])?M+FILMS[r.n].p+'.jpg':null;

/* ---- the rack: R2 (gpt-image-2, 2K medium, the opener edited with the nine logo files as references); 2048x1152 coordinates,
   the file is 1400 wide. quads = each cover's corners (tl, tr, br, bl) in the painting, in the order of BAKED */
const RACK={img:M+'rack-r2.jpg',W:2048,H:1152,
  baked:['MSFT','GOOGL','AMZN','TSMC','SPCX','META','TSLA','LLY','005930.KS'],
  quads:[[[700,145],[881,154],[877,415],[694,412]],[[934,111],[1135,111],[1135,394],[934,399]],[[1167,125],[1377,143],[1372,404],[1162,399]],
    [[668,458],[881,463],[881,707],[668,712]],[[927,437],[1135,437],[1135,717],[927,717]],[[1178,438],[1395,453],[1391,717],[1178,717]],
    [[673,760],[889,765],[885,1024],[676,1024]],[[927,765],[1135,765],[1135,1032],[927,1032]],[[1159,760],[1377,760],[1377,1029],[1159,1029]]],
  cm:[600,10,860,1090],cd:[150,20,1748,1120]};

const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const rng=s=>()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>13)>>>0)/4294967296);
/* a hand-tuned blob: n jittered points round an ellipse, joined by quadratic curves through midpoints (stable per round) */
function blob(w,h,seed,n,j){const r=rng(seed*7919+3),pts=[];for(let i=0;i<n;i++){const a=i/n*2*Math.PI+(r()-.5)*.25,k=1-j+r()*2*j;pts.push([w/2+Math.cos(a)*w/2*k,h/2+Math.sin(a)*h/2*k])}
  const m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];let d='M'+m(pts[n-1],pts[0]).map(v=>v.toFixed(1)).join(' ');
  for(let i=0;i<n;i++){const q=m(pts[i],pts[(i+1)%n]);d+=`Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`}return d+'Z'}
/* homography: the rect (0,0)-(w,h) onto the quad tl,tr,br,bl, as a CSS matrix3d (transform-origin 0 0) */
function homo(w,h,q){const[[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=q;const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den,a=x1-x0+g*x1,b=x3-x0+hh*x3,d=y1-y0+g*y1,e=y3-y0+hh*y3;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${x0},${y0},0,1)`}
const logoSrc=t=>{const L=window.CO_LOGOS&&CO_LOGOS[t];return L?M+L.f:null};
const isDark=t=>!!(window.CO_LOGOS&&CO_LOGOS[t]&&CO_LOGOS[t].dark);
const winners=r=>r.win?r.win.split(' & ').filter(x=>window.MODELS&&MODELS[x]):[];
const nm=m=>(window.POP&&POP.NM&&POP.NM[m])||(MODELS[m]&&MODELS[m].name)||m;
const pct=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%';
const newest=t=>ROUNDS.reduce((b,r)=>r.ticker===t&&(!b||r.n>b.n)?r:b,null);
/* the biggest companies already graded, newest round of each, biggest first (CAPS = market cap in $bn) */
function biggest(k){const seen={},out=[];[...ROUNDS].sort((a,b)=>b.n-a.n).forEach(r=>{if(seen[r.ticker]||!logoSrc(r.ticker))return;seen[r.ticker]=1;out.push(r)});
  return out.filter(r=>window.CAPS&&CAPS[r.ticker]).sort((a,b)=>CAPS[b.ticker]-CAPS[a.ticker]).slice(0,k)}

/* ---------------- the rack ---------------- */
let rackFit=null;
function rack(sec){if(sec.querySelector('.hr-rack'))return;const c=RACK;
  const live=biggest(c.baked.length).map(r=>r.ticker),stale=live.join()!==c.baked.join();
  if(stale){if(H.dataset.hrStale!==live.join())console.warn('rack art out of date: painted',c.baked.join(),'live',live.join());H.dataset.hrStale=live.join()}
  const rs=c.baked.map(newest);
  const fig=document.createElement('figure');fig.className='hr-rack';
  fig.innerHTML=`<div class="hr-ink"><div class="hr-win"><div class="hr-stg" style="width:${c.W}px;height:${c.H}px"><img class="hr-base" src="${c.img}" alt="" decoding="async"></div></div></div>`+
    `<figcaption class="hr-cap" aria-hidden="true">${stale?'Big names':'The biggest names'} graded so far.</figcaption>`+
    `<p class="pp-sr">${stale?'Big names':'The biggest names'} graded so far: ${rs.filter(Boolean).map(r=>esc(r.co)).join(', ')}.</p>`;
  const stg=fig.querySelector('.hr-stg');
  c.quads.forEach((q,i)=>{const r=rs[i];if(!r)return;const cx=(q[0][0]+q[1][0]+q[2][0]+q[3][0])/4,cy=(q[0][1]+q[1][1]+q[2][1]+q[3][1])/4;
    const cv=document.createElement('a');cv.className='hr-cv';cv.href='#/round/'+r.n;cv.setAttribute('aria-label',`Round ${r.n}, ${r.co}, ${r.a>0?'up':'down'} ${Math.abs(r.a).toFixed(2)}%`);
    cv.style.cssText=`--d:${i};--rot:${(i%2?1:-1)*(1+i%3*.4)}deg;transform-origin:${cx}px ${cy}px`;
    cv.innerHTML=`<i class="hr-cl" style="clip-path:polygon(${q.map(p=>p[0]+'px '+p[1]+'px').join(',')});background:url(${c.img}) 0 0/${c.W}px ${c.H}px"></i>`+
      `<span class="hr-pl" style="width:100px;height:140px;transform:${homo(100,140,q)}"><b class="hr-no">#${r.n}</b></span>`;
    stg.appendChild(cv)});
  sec.insertBefore(fig,sec.querySelector('.pp1-ttl')||sec.querySelector('.wc-bis'));
  const fit=()=>{const win=fig.querySelector('.hr-win');if(!win.clientWidth)return;const cr=innerWidth<760?c.cm:c.cd,k=win.clientWidth/cr[2];win.style.height=(cr[3]*k)+'px';stg.style.transform=`scale(${k}) translate(${-cr[0]}px,${-cr[1]}px)`};
  fit();rackFit=fit;
  const go=()=>fig.classList.add('hr-go');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches||!window.IntersectionObserver)go();
  else new IntersectionObserver((es,o)=>{if(es.some(e=>e.isIntersecting)){setTimeout(go,250);o.disconnect()}},{threshold:.35}).observe(fig)}

/* ---------------- the tiles ---------------- */
let RR=null;const byN=()=>{if(!RR){RR={};ROUNDS.forEach(r=>RR[r.n]=r)}return RR};
function tile(a){if(a.querySelector('.hr-cov')||!a.classList.contains('pp1-bi'))return false;const r=byN()[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return false;
  const up=r.a>0,W=winners(r),col=(window.CO_LOGOS&&CO_LOGOS[r.ticker]&&CO_LOGOS[r.ticker].c)||'#c0261d',src=art(r),lg=logoSrc(r.ticker);
  a.classList.add('hr-tile');a.classList.toggle('hr-own',!src);a.classList.toggle('hr-dk',isDark(r.ticker));a.style.setProperty('--br',col);
  const cs=W.length>1?17.6:22,wn=W.length?W.map(m=>POP.coin(m,cs,{dp:2})).join(''):'<i class="hr-nob">×</i>',bl=blob(100,60,r.n,13,.05);
  a.insertAdjacentHTML('beforeend',`<span class="hr-cov ${up?'hr-up':'hr-dn'}" aria-hidden="true">`+
    `<span class="hr-art"${src?` style="background-image:url(${src})"`:''}></span>`+
    `<span class="hr-mast"><svg class="hr-mrd" viewBox="-5 -5 110 70" preserveAspectRatio="none"><path d="${bl}" class="hr-mrf"/><path d="${bl}" class="hr-mrh"/></svg>${lg?`<img src="${lg}" alt="" decoding="async">`:''}</span>`+
    `<span class="hr-cb"><b class="hr-cbn">#${r.n}</b><span class="hr-cbw">${wn}</span></span>`+
    `<span class="hr-mv"><b>${pct(r.a)}</b></span>`+
    `<span class="hr-nm"><b>${esc(r.co)}</b><em>${W.length?W.map(nm).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'}</em></span></span>`);
  const im=a.querySelector('.hr-mast img');if(im)tileKey(im,a);return true}
/* a logo drawn on its own dark tile (SpaceX, Samsung...): the roundel takes the tile's colour and the logo an oval cut */
const KEY={};
function tileKey(im,host){const go=()=>{const k=im.src;let v=KEY[k];
  if(v===undefined){try{const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');x.drawImage(im,0,0,8,8);const d=x.getImageData(0,0,1,1).data;v=d[3]>200&&Math.max(d[0],d[1],d[2])<70?`rgb(${d[0]},${d[1]},${d[2]})`:null}catch(e){v=null}KEY[k]=v}
  if(v){host.classList.add('hr-tl');host.style.setProperty('--tg',v)}};im.complete&&im.naturalWidth?go():im.addEventListener('load',go,{once:true})}

/* ---------------- keep it built ---------------- */
let near=false,seen=null,io=null;
/* the section is watched while it lives: coming near builds the rack, and coming back into view (after the round pop-up, another
   tab or a rebuild made while it was hidden) re-checks everything */
function watch(sec){if(sec===seen)return;seen=sec;if(!window.IntersectionObserver){near=true;return}
  if(!io)io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){near=true;ensure()}},{rootMargin:'1500px 0px'});io.disconnect();io.observe(sec)}
function ensure(){const any=document.querySelector('#wc-book .wc-season');if(any)watch(any);
  const sec=document.querySelector('#wc-book .wc-season.pp1-ms');if(!sec||!sec.offsetParent)return;
  sec.classList.add('hr-ts','hr-t2');
  if(near)rack(sec);
  const ttl=sec.querySelector('.pp1-ttl');if(ttl&&sec.querySelector('.hr-rack'))ttl.classList.add('hr-lift');
  const built=[];sec.querySelectorAll('.wc-bis .wc-bi.pp1-bi:not(.hr-tile)').forEach(a=>{if(a.offsetParent&&tile(a))built.push(a)});fit(built)}
/* the foot's two lines on a narrow phone (an 81px tile at 320): step a line that would cut off down, all tiles at once, one layout
   read per step; floors 8px for the company, 6.5px for who won */
function fit(ts){let todo=[];ts.forEach(a=>a.querySelectorAll('.hr-nm b,.hr-nm em').forEach(t=>{t.style.fontSize='';todo.push(t)}));
  for(let i=0;i<8&&todo.length;i++){const over=todo.filter(t=>t.scrollWidth>t.clientWidth+.5);if(!over.length)break;
    const sz=over.map(t=>parseFloat(getComputedStyle(t).fontSize));
    todo=over.filter((t,k)=>{const fl=t.tagName==='B'?8:6.5;if(sz[k]<=fl)return false;t.style.fontSize=Math.max(fl,sz[k]-.5)+'px';return true})}}
function start(){H.classList.add('hr-on');
  ensure();
  const book=document.getElementById('wc-book');let t=0;const later=()=>{if(!t)t=setTimeout(()=>{t=0;ensure()},140)};/* a throttle, not a debounce: M3 repaints 80 tiles one by one */
  /* pop_p1 rebuilds the title and stubs on a width change or a redrawn book; "Show all" flips data-all; ignore our own writes */
  const mine=n=>{const e=n&&(n.nodeType===1?n:n.parentElement);return !!(e&&e.closest&&e.closest('.hr-cov,.hr-rack,.wc-bi-art'))};/* .wc-bi-art: M3's canvases */
  if(book)new MutationObserver(rs=>{if(rs.every(r=>mine(r.target)||(r.type==='childList'&&r.addedNodes.length&&!r.removedNodes.length&&[...r.addedNodes].every(mine))))return;later()})
    .observe(book,{childList:true,subtree:true,attributes:true,attributeFilter:['data-all']});
  new MutationObserver(later).observe(H,{attributes:true,attributeFilter:['data-sec']});
  addEventListener('hashchange',()=>setTimeout(ensure,350));
  let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;rackFit&&rackFit();clearTimeout(start.f);start.f=setTimeout(()=>fit([...document.querySelectorAll('#wc-book .wc-season .wc-bi.hr-tile')].filter(a=>a.offsetParent)),300);later()})}
/* wait for pop_p1's stubs on the round tiles (it waits for the comic itself) */
(function wait(n){if(H.classList.contains('p1-on')&&H.classList.contains('p1-ready')&&window.POP&&document.querySelector('#wc-book .wc-season .pp1-ttl')&&document.querySelector('#wc-book .wc-season .wc-bi.pp1-bi'))start();
  else if(n<600)setTimeout(()=>wait(n+1),250)})(0);
})();
