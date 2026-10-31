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
   THUMBS:  Golden Age thumbnails of each round's outcome (the film's reveal frame, winner gold and crowned; -t3, round H4), no-film rounds painted from the company's world (-t2)
             (Hedra gpt-image-2, 2026-10-31; tools/concepts/worlds/comic/story/h/thumbs); names written out in full for make_site.py
   PAINTED: the T2 Golden Age paintings (Hedra gpt-image-2, 1K low, 2026-10-31), paper bands cropped off
   then the round's film poster (FILMS[n].p), then the page's own tile art (the painted mark M3 draws, or the logo) */
const THUMBS={1:'tile-r1-t3.jpg',2:'tile-r2-t3.jpg',3:'tile-r3-t3.jpg',4:'tile-r4-t3.jpg',5:'tile-r5-t3.jpg',6:'tile-r6-t3.jpg',7:'tile-r7-t3.jpg',8:'tile-r8-t3.jpg',9:'tile-r9-t3.jpg',10:'tile-r10-t3.jpg',11:'tile-r11-t3.jpg',12:'tile-r12-t3.jpg',13:'tile-r13-t3.jpg',14:'tile-r14-t3.jpg',15:'tile-r15-t3.jpg',16:'tile-r16-t3.jpg',17:'tile-r17-t3.jpg',18:'tile-r18-t3.jpg',19:'tile-r19-t3.jpg',20:'tile-r20-t3.jpg',21:'tile-r21-t3.jpg',22:'tile-r22-t3.jpg',23:'tile-r23-t3.jpg',24:'tile-r24-t3.jpg',25:'tile-r25-t3.jpg',26:'tile-r26-t3.jpg',27:'tile-r27-t3.jpg',28:'tile-r28-t3.jpg',29:'tile-r29-t3.jpg',30:'tile-r30-t3.jpg',31:'tile-r31-t3.jpg',32:'tile-r32-t3.jpg',33:'tile-r33-t3.jpg',34:'tile-r34-t3.jpg',35:'tile-r35-t3.jpg',36:'tile-r36-t3.jpg',37:'tile-r37-t3.jpg',38:'tile-r38-t3.jpg',39:'tile-r39-t3.jpg',40:'tile-r40-t3.jpg',41:'tile-r41-t3.jpg',42:'tile-r42-t3.jpg',43:'tile-r43-t3.jpg',44:'tile-r44-t3.jpg',45:'tile-r45-t3.jpg',46:'tile-r46-t3.jpg',47:'tile-r47-t3.jpg',48:'tile-r48-t3.jpg',49:'tile-r49-t3.jpg',50:'tile-r50-t3.jpg',51:'tile-r51-t3.jpg',52:'tile-r52-t3.jpg',53:'tile-r53-t3.jpg',54:'tile-r54-t3.jpg',55:'tile-r55-t3.jpg',56:'tile-r56-t3.jpg',57:'tile-r57-t3.jpg',58:'tile-r58-t3.jpg',59:'tile-r59-t3.jpg',60:'tile-r60-t3.jpg',61:'tile-r61-t3.jpg',62:'tile-r62-t3.jpg',63:'tile-r63-t3.jpg',64:'tile-r64-t3.jpg',65:'tile-r65-t3.jpg',66:'tile-r66-t3.jpg',67:'tile-r67-t2.jpg',68:'tile-r68-t3.jpg',69:'tile-r69-t3.jpg',70:'tile-r70-t3.jpg',71:'tile-r71-t2.jpg',72:'tile-r72-t3.jpg',73:'tile-r73-t3.jpg',74:'tile-r74-t3.jpg',75:'tile-r75-t2.jpg',76:'tile-r76-t3.jpg',77:'tile-r77-t2.jpg',78:'tile-r78-t3.jpg',79:'tile-r79-t2.jpg',80:'tile-r80-t2.jpg'};
const PAINTED={}; /* the twelve T2 covers (cover-<t>-t2.jpg) were replaced by THUMBS on 2026-10-31 */
const art=r=>THUMBS[r.n]?M+THUMBS[r.n]:PAINTED[r.n]?M+PAINTED[r.n]:(window.FILMS&&FILMS[r.n])?M+FILMS[r.n].p+'.jpg':null;

/* ---- the rack: R6b (gpt-image-2, 2K high, the opener edited with the nine logo files as references, every logo whole); 2048x1152
   coordinates, the file is 1400 wide. quads = each cover's corners (tl, tr, br, bl) in the painting, in the order of BAKED (measured) */
const RACK={img:M+'rack-r6c.jpg',W:2048,H:1152,
  baked:['MSFT','GOOGL','AMZN','TSMC','SPCX','META','TSLA','LLY','005930.KS'],
  quads:[[[707,138],[905,122],[905,405],[710,410]],[[940,108],[1160,112],[1157,390],[943,393]],[[1193,118],[1405,145],[1400,415],[1190,405]],
    [[662,453],[890,440],[890,715],[668,720]],[[925,443],[1155,442],[1155,718],[925,718]],[[1193,440],[1440,455],[1435,725],[1190,720]],
    [[657,755],[880,760],[878,1020],[663,1022]],[[915,760],[1145,757],[1145,1025],[915,1025]],[[1190,755],[1435,750],[1430,1025],[1190,1028]]],
  cm:[585,20,890,1100],cd:[150,20,1748,1120]};

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
/* a logo drawn on its own tile (Samsung's black, Shell's yellow, Volkswagen's white): the roundel takes the tile's colour and the
   logo an oval cut, so the tile's square corners never show on the roundel. A tile = the four corners opaque and one colour */
const KEY={};
function tileKey(im,host){const go=()=>{const k=im.src;let v=KEY[k];
  if(v===undefined){v=null;try{const N=32,c=document.createElement('canvas');c.width=c.height=N;const x=c.getContext('2d');x.drawImage(im,0,0,N,N);
    const px=[[2,2],[N-3,2],[2,N-3],[N-3,N-3]].map(([a,b])=>x.getImageData(a,b,1,1).data);
    if(px.every(d=>d[3]>220)&&px.every(d=>Math.max(Math.abs(d[0]-px[0][0]),Math.abs(d[1]-px[0][1]),Math.abs(d[2]-px[0][2]))<40)){
      const m=i=>Math.round(px.reduce((s,d)=>s+d[i],0)/4);v=`rgb(${m(0)},${m(1)},${m(2)})`}}catch(e){v=null}KEY[k]=v}
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
