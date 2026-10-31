/* Round H, area "rounds": shared mockup code laid over the built X3+ page.
   HR.rack(cfg): the newsstand opener above "Every round so far", its covers carrying the logos of the biggest companies already graded (live: ROUNDS x CAPS).
   HR.tiles(cfg): every round tile rebuilt as a comic cover (art, logo masthead, corner box, move burst, name strip). All numbers from ROUNDS. */
(function(){
const H=document.documentElement,P=window.POP,IMG='tools/concepts/worlds/comic/story/h/rounds/img/';
const INK='#0d0b10',esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
/* seeded random, so every hand-drawn shape is irregular but stable per round */
const rng=s=>()=>((s=Math.imul(s^s>>>15,1|s)+0x6D2B79F5|0,(s^s>>>13)>>>0)/4294967296);
/* a hand-tuned blob: n jittered points round an ellipse, joined by quadratic curves through midpoints */
function blob(w,h,seed,n=11,j=.07){const r=rng(seed*7919+3),pts=[];for(let i=0;i<n;i++){const a=i/n*2*Math.PI+(r()-.5)*.25,k=1-j+r()*2*j;pts.push([w/2+Math.cos(a)*w/2*k,h/2+Math.sin(a)*h/2*k])}
  const m=(a,b)=>[(a[0]+b[0])/2,(a[1]+b[1])/2];let d='M'+m(pts[n-1],pts[0]).map(v=>v.toFixed(1)).join(' ');
  for(let i=0;i<n;i++){const q=m(pts[i],pts[(i+1)%n]);d+=`Q${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)} ${q[0].toFixed(1)} ${q[1].toFixed(1)}`}return d+'Z'}
/* a jagged burst: spikes of uneven length and spacing */
function burst(w,h,seed,n=14){const r=rng(seed*104729+11);let d='';for(let i=0;i<n*2;i++){const a=(i+(r()-.5)*.5)/(n*2)*2*Math.PI,k=i%2?(.62+r()*.12):(.92+r()*.08);d+=(i?'L':'M')+(w/2+Math.cos(a)*w/2*k).toFixed(1)+' '+(h/2+Math.sin(a)*h/2*k).toFixed(1)}return d+'Z'}
/* homography: the rect (0,0)-(w,h) onto the quad tl,tr,br,bl, as a CSS matrix3d (transform-origin 0 0) */
function homo(w,h,q){const[[x0,y0],[x1,y1],[x2,y2],[x3,y3]]=q;const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den,a=x1-x0+g*x1,b=x3-x0+hh*x3,d=y1-y0+g*y1,e=y3-y0+hh*y3;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${x0},${y0},0,1)`}
const logoSrc=t=>{const L=window.CO_LOGOS&&CO_LOGOS[t];return L?(window.MEDIA||'media/')+L.f:null};
const isDark=t=>!!(window.CO_LOGOS&&CO_LOGOS[t]&&CO_LOGOS[t].dark);
const lum=h=>{const n=parseInt(h.slice(1),16),f=v=>(v/=255)<=.03928?v/12.92:((v+.055)/1.055)**2.4;return .2126*f(n>>16)+.7152*f(n>>8&255)+.0722*f(n&255)};
const coName=t=>(window.TICKERS&&TICKERS[t])||t;
/* the biggest companies already graded, newest round of each, biggest first (CAPS = market cap in $bn) */
function biggest(k){const seen={},out=[];[...ROUNDS].sort((a,b)=>b.n-a.n).forEach(r=>{if(seen[r.ticker]||!logoSrc(r.ticker))return;seen[r.ticker]=1;out.push(r)});
  return out.filter(r=>CAPS[r.ticker]).sort((a,b)=>CAPS[b.ticker]-CAPS[a.ticker]).slice(0,k)}
const winners=r=>r.win?r.win.split(' & ').filter(x=>window.MODELS&&MODELS[x]):[];
const pct=a=>(a>0?'+':'−')+Math.abs(a).toFixed(2)+'%';

/* ---------------- the rack ---------------- */
function rack(c){const sec=document.querySelector('#wc-book .wc-season');if(!sec)return;sec.querySelectorAll('.hr-rack').forEach(n=>n.remove());
  const live=biggest(c.n||9);
  if(c.baked){const want=c.baked.join(),got=live.map(r=>r.ticker).join();if(want!==got){console.warn('rack art out of date: painted',want,'live',got);H.dataset.hrStale=got}}
  const fig=document.createElement('figure');fig.className='hr-rack '+(c.cls||'');
  fig.innerHTML=`<div class="hr-ink"><div class="hr-win"><div class="hr-stg" style="width:${c.W}px;height:${c.H}px"><img class="hr-base" src="${IMG+c.img}" alt=""></div></div></div>`+
    (c.cap?`<figcaption class="hr-cap">${c.cap}</figcaption>`:'')+`<p class="pp-sr">The biggest companies graded so far: ${live.map(r=>esc(r.co)).join(', ')}.</p>`;
  const stg=fig.querySelector('.hr-stg');
  (c.quads||c.circles).forEach((q,i)=>{const r=live[i];if(!r)return;
    const poly=c.quads?q:null,cx=poly?(q[0][0]+q[1][0]+q[2][0]+q[3][0])/4:q[0],cy=poly?(q[0][1]+q[1][1]+q[2][1]+q[3][1])/4:q[1];
    const cv=document.createElement('a');cv.className='hr-cv'+(isDark(r.ticker)?' hr-dk':'');cv.href='#/round/'+r.n;cv.setAttribute('aria-label',`Round ${r.n}, ${r.co}, ${r.a>0?'up':'down'} ${Math.abs(r.a)}%`);
    cv.style.cssText=`--d:${i};--rot:${(i%2?1:-1)*(1+i%3*.4)}deg;transform-origin:${cx}px ${cy}px`;
    const clipQ=poly||[[q[0]-q[2]*1.9,q[1]-q[2]*2.3],[q[0]+q[2]*1.9,q[1]-q[2]*2.3],[q[0]+q[2]*1.9,q[1]+q[2]*2.6],[q[0]-q[2]*1.9,q[1]+q[2]*2.6]];
    let h=`<i class="hr-cl" style="clip-path:polygon(${clipQ.map(p=>p[0]+'px '+p[1]+'px').join(',')});background:url(${IMG+c.img}) 0 0/${c.W}px ${c.H}px"></i>`;
    if(c.mode==='blank'){const w=100,hh=140;
      h+=`<span class="hr-pl" style="width:${w}px;height:${hh}px;transform:${homo(w,hh,q)}">`+
        `<svg class="hr-rd" viewBox="-6 -6 92 92"><path d="${blob(80,80,r.n,12,.06)}" fill="#fffaf0" stroke="${INK}" stroke-width="5"/><path d="${blob(80,80,r.n,12,.06)}" fill="url(#hrDots)" opacity=".22" transform="translate(5 6) scale(.9)"/><path d="${blob(80,80,r.n,12,.06)}" fill="none" stroke="#fff" stroke-width="1.6" transform="translate(-1.5 -2) scale(.97)"/></svg>`+
        `<img class="hr-lgo" src="${logoSrc(r.ticker)}" alt=""><b class="hr-no">#${r.n}</b></span>`}
    else if(c.mode==='badge'){h+=`<span class="hr-bd" style="left:${q[0]-q[2]}px;top:${q[1]-q[2]}px;width:${q[2]*2}px;height:${q[2]*2}px"><img class="hr-lgo" src="${logoSrc(r.ticker)}" alt=""></span><b class="hr-no hr-no2" style="left:${q[0]-q[2]*1.6}px;top:${q[1]-q[2]*2.05}px">#${r.n}</b>`}
    else{const w=100,hh=140;h+=`<span class="hr-pl" style="width:${w}px;height:${hh}px;transform:${homo(w,hh,q)}"><b class="hr-no">#${r.n}</b></span>`}
    cv.innerHTML=h;stg.appendChild(cv)});
  stg.insertAdjacentHTML('afterbegin','<svg width="0" height="0" style="position:absolute"><defs><pattern id="hrDots" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.25" fill="#0d0b10"/></pattern></defs></svg>');
  const ttl=sec.querySelector('.pp-ttl')||sec.firstElementChild;sec.insertBefore(fig,ttl);ttl&&ttl.classList.add('hr-lift');
  const fit=()=>{const win=fig.querySelector('.hr-win'),cr=innerWidth<760?c.cm:c.cd,k=win.clientWidth/cr[2];win.style.height=(cr[3]*k)+'px';stg.style.transform=`scale(${k}) translate(${-cr[0]}px,${-cr[1]}px)`};
  fit();addEventListener('resize',fit);
  const go=()=>fig.classList.add('hr-go');
  if(matchMedia('(prefers-reduced-motion: reduce)').matches)go();else new IntersectionObserver((es,o)=>{if(es.some(e=>e.isIntersecting)){setTimeout(go,250);o.disconnect()}},{threshold:.35}).observe(fig)}

/* ---------------- the tiles ---------------- */
function tiles(c){const sec=document.querySelector('#wc-book .wc-season');if(!sec)return;sec.classList.add('hr-ts',c.cls||'hr-tx');
  const RR={};ROUNDS.forEach(r=>RR[r.n]=r);const have=new Set(c.have||[]);
  const art=r=>{if(c.art==='film'&&window.FILMS&&FILMS[r.n])return (window.MEDIA||'media/')+FILMS[r.n].p+'.jpg';
    if(have.has(r.n))return IMG+(c.set||'t1')+'-'+r.n+'-c.jpg';if(window.FILMS&&FILMS[r.n])return (window.MEDIA||'media/')+FILMS[r.n].p+'.jpg';return null};
  sec.querySelectorAll('.wc-bi').forEach(a=>{const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r||a.querySelector('.hr-cov'))return;
    a.classList.add('hr-tile');const up=r.a>0,W=winners(r),col=(window.CO_LOGOS&&CO_LOGOS[r.ticker]&&CO_LOGOS[r.ticker].c)||'#c0261d',src=art(r);
    a.style.setProperty('--br',col);a.style.setProperty('--br2',lum(col)<.03?'#e9dcc0':col);if(isDark(r.ticker))a.classList.add('hr-dk');a.style.boxShadow='';
    const cs=c.coin||22,wn=W.length?W.map(m=>P.coin(m,W.length>1?cs*.8:cs,{dp:2})).join(''):'<i class="hr-nob">×</i>';
    a.insertAdjacentHTML('beforeend',`<span class="hr-cov ${up?'hr-up':'hr-dn'}" aria-hidden="true">
      <span class="hr-art" style="${src?`background-image:url(${src})`:''}"></span>
      <span class="hr-mast"><svg class="hr-mrd" viewBox="-5 -5 110 70" preserveAspectRatio="none"><path d="${blob(100,60,r.n,13,.05)}" class="hr-mrf"/><path d="${blob(100,60,r.n,13,.05)}" class="hr-mrh"/></svg><img src="${logoSrc(r.ticker)||''}" alt=""></span>
      <span class="hr-cb"><b class="hr-cbn">#${r.n}</b><span class="hr-cbw">${wn}</span></span>
      <span class="hr-mv"><svg viewBox="0 0 120 70" preserveAspectRatio="none"><path d="${burst(120,70,r.n,13)}" class="hr-mvf"/></svg><b>${pct(r.a)}</b></span>
      <span class="hr-nm"><b>${esc(r.co)}</b><small>${esc(r.ticker)}</small><em>${W.length?W.map(m=>MODELS[m].name||m).join(' & ')+(W.length>1?' tie':' won'):'Nobody won'}</em></span>
    </span>`)});
  if(!document.getElementById('hrFoilD'))document.body.insertAdjacentHTML('beforeend','<svg id="hrFoilD" width="0" height="0" style="position:absolute"><defs><linearGradient id="hrFoil" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff8d8"/><stop offset=".35" stop-color="#e9c35a"/><stop offset=".55" stop-color="#fff3c2"/><stop offset=".8" stop-color="#b8862b"/><stop offset="1" stop-color="#f1d888"/></linearGradient></defs></svg>');
  if(c.after)c.after(sec)}
function tileKey(){const cache={};document.querySelectorAll('.hr-cv img.hr-lgo,.hr-tile .hr-mast img').forEach(im=>{const host=im.closest('.hr-cv,.hr-tile');const go=()=>{const k=im.src;let v=cache[k];
  if(v===undefined){try{const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');x.drawImage(im,0,0,8,8);const d=x.getImageData(0,0,1,1).data;v=d[3]>200&&Math.max(d[0],d[1],d[2])<70?`rgb(${d[0]},${d[1]},${d[2]})`:null}catch(e){v=null}cache[k]=v}
  if(v){host.classList.add('hr-tl');host.style.setProperty('--tg',v)}};im.complete&&im.naturalWidth?go():im.addEventListener('load',go,{once:true})})}
function done(){tileKey();setTimeout(()=>H.classList.add('hr-ready'),300)}
window.HR={rack,tiles,done,blob,burst,homo,biggest,IMG};
})();
