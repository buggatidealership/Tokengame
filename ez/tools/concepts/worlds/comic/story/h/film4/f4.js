/* ---------- beat 3 (H26 film4): "The whole game", a 2.39:1 film strip under How a round works ----------
   The strip bleeds edge to edge of the window at every width: a gold rail above, the glass, a rail with the board's lip and pins below
   (tiles cut from one 4K painting, repeated across; no side bezels, the strip runs off both edges). In the glass: the poster whole
   (16:9, the glass's full height) over a blurred copy of itself, and the film's title lit on the glass beside it (F4L 'title', the default),
   or the bet's lettering a size down above the strip ('chapter'), or a cinema letterboard on the top rail ('marquee').
   Glass height = min(width / 2.39, 560px): 163px at 390, 536 at 1280, 560 at 1920 (capped; 2.39:1 would be 803).
   A tap (or Enter/Space) opens the film with sound: phones hand it to their own full-screen player (iOS webkitEnterFullscreen, else
   requestFullscreen + a landscape lock), inside a page view that stays as the fallback; desktop opens a theatre (16:9, as big as the window
   allows, the same rails). Close, Escape or a click outside closes it and gives focus back. Nothing moves on the page; nothing animates at all.
   Gaps (round H26 rule, box to box): D = k·u + 0.45·ΔE, u = clamp(26px, 8vw, 32px); k 1 How a round works → its film,
   3.5 the top → How a round works, 5 the film → Meet the models (an edge connector drawn in it). ΔE = 0 on today's one green ground.
   Media: media/film4-rail-top.jpg media/film4-rail-bot.jpg media/film4-poster-blur.jpg media/film4-connector.jpg
   media/ez-landing-v4-poster-ez.jpg media/ez-landing-v4.mp4 media/ez-landing-v4.webm */
const F4M=window.__F4M||'media/',F4L=window.__F4L||'title',F4CAP=560;
let F4T='1:20',F4S=80;/* the running time: replaced from the film's own metadata as soon as the strip is near */
const f4fmt=s=>Math.floor(s/60)+':'+String(Math.round(s%60)).padStart(2,'0');
const f4aria=()=>`Play The whole game, a film of ${Math.floor(F4S/60)} minute${F4S>=120?'s':''}${F4S%60?' '+(F4S%60)+' seconds':''}, with sound`;
function film4(){
  const ttl=F4L==='title'?`<div class="f4-ttl" aria-hidden="true"><span class="f4-l">The</span><span class="f4-l">Whole</span><span class="f4-l">Game</span><span class="f4-run"><i class="f4-key"></i><b class="f4-t">${F4T}</b></span></div>`:'';
  const over=F4L==='title'?'':`<span class="f4-disc" aria-hidden="true"><i></i></span>`;
  const above=F4L==='chapter'?`<h2 class="f4-chap"><span class="t4-hw">The whole game</span><span class="f4-chr f4-t">${F4T}</span></h2>`
    :F4L==='marquee'?`<div class="f4-mq"><span class="f4-mqi"><span class="f4-mqw">The whole game</span><span class="f4-mqt f4-t">${F4T}</span></span></div>`:'';
  return `${above}<div class="f4-strip" role="button" tabindex="0" aria-label="${f4aria()}"><i class="f4-rt"></i><div class="f4-gl"><img class="f4-bl" src="${F4M}film4-poster-blur.jpg" alt="" draggable="false"><div class="f4-grp">${ttl}<div class="f4-pic"><img class="f4-po" src="media/ez-landing-v4-poster-ez.jpg" alt="" draggable="false">${over}</div></div><i class="f4-sc"></i></div><i class="f4-rb"></i></div><i class="f4-tr" aria-hidden="true"></i>`}
const f4u=()=>Math.min(32,Math.max(26,D.documentElement.clientWidth*.08));
const f4r=e=>{const r=e.getBoundingClientRect();return {t:r.top+scrollY,b:r.bottom+scrollY,l:r.left,r:r.right,w:r.width,h:r.height}};
/* lay out the strip (bleed, heights, the title) and set the three gaps; idempotent, run from place() */
function f4fit(){const b3=sec.querySelector('.f4'),st=b3&&b3.querySelector('.f4-strip');if(!st)return;const vw=D.documentElement.clientWidth;
  /* bleed: the strip reaches both edges of the window, whatever the column's padding (desktop's column is 1180px, centred) */
  b3.style.marginLeft=b3.style.marginRight='0px';const br=b3.getBoundingClientRect();b3.style.marginLeft=(-br.left)+'px';b3.style.marginRight=(-(vw-br.right))+'px';
  const W=vw,hg=Math.min(W/2.39,F4CAP),k=Math.min(.16,Math.max(.1,W/3650)),pw=hg*16/9,bw=F4L==='title'?Math.min(W-pw,pw*.42):0;
  st.style.setProperty('--rt',(54*k).toFixed(2)+'px');st.style.setProperty('--rb',(205*k).toFixed(2)+'px');st.style.setProperty('--hg',hg.toFixed(2)+'px');
  st.style.setProperty('--pw',pw.toFixed(2)+'px');st.style.setProperty('--bw',bw.toFixed(2)+'px');
  const tt=st.querySelector('.f4-ttl');if(tt){/* the title: the widest line fills the band, the four rows fit the glass */
    tt.style.fontSize='100px';const pad=Math.max(8,bw*.1),ls=[...tt.querySelectorAll('.f4-l')],wmax=Math.max(...ls.map(l=>l.getBoundingClientRect().width));
    /* capped below "How a round works" (the beat's head stays the loudest words), the band then hugs the title */
    const h2=sec.querySelector('.t4-b2 .t4-h2'),cap=h2?parseFloat(getComputedStyle(h2).fontSize)*.86:64;let f=Math.min((bw-2*pad)/wmax*100,hg*.86/3.75);
    if(f>cap){f=cap;st.style.setProperty('--bw',(wmax*f/100+2*pad).toFixed(2)+'px')}tt.style.fontSize=f.toFixed(2)+'px';tt.style.paddingLeft=tt.style.paddingRight=pad.toFixed(1)+'px'}
  const mq=b3.querySelector('.f4-mqi');if(mq){mq.style.left=Math.max(12,(vw-Math.min(vw,1180))/2+12)+'px'}
  /* gaps */const u=f4u(),fl=sec.querySelector('.t4-frs'),g1=sec.querySelector('.t5-bg'),b1=sec.querySelector('.t4-b1 .t4-bleed'),h2=sec.querySelector('.t4-b2 .t4-h2');
  const first=b3.querySelector('.f4-chap .t4-hw,.f4-mqi')||st,cx=sec.querySelector('.f4-cx'),ch=D.querySelector('section.ch .ch-h');
  for(let i=0;i<2;i++){
    if(g1&&b1&&h2){const cur=f4r(h2).t-f4r(b1).b;g1.style.marginBottom=(parseFloat(getComputedStyle(g1).marginBottom)+3.5*u-cur)+'px'}
    if(fl){const cur=f4r(first).t-f4r(fl).b;b3.style.marginTop=(parseFloat(getComputedStyle(b3).marginTop)+u-cur)+'px'}
    if(cx){const cl=Math.max(14,u*.6),want=5*u;cx.style.height=(want-2*cl)+'px';cx.style.marginTop=cl+'px';cx.style.marginLeft=b3.style.marginLeft;cx.style.marginRight=b3.style.marginRight;
      if(ch){const cur=f4r(ch).t-f4r(st).b;cx.style.marginBottom=(parseFloat(getComputedStyle(cx).marginBottom)+want-cur)+'px'}}}
  /* the joint: a gold trace from the frames' centre gutter down into the strip's top rail */
  const tr=b3.querySelector('.f4-tr');if(tr&&fl){const y0=f4r(fl).b-6,y1=f4r(first).t+2,bt=f4r(b3).t;tr.style.top=(y0-bt)+'px';tr.style.height=Math.max(0,y1-y0)+'px';tr.style.left=(f4r(fl).l+f4r(fl).w/2-f4r(b3).l-1)+'px'}
  sec.dataset.f4=JSON.stringify({u:+u.toFixed(1),beat:g1&&b1&&h2?+(f4r(h2).t-f4r(b1).b).toFixed(1):null,film:fl?+(f4r(first).t-f4r(fl).b).toFixed(1):null,chapter:ch?+(f4r(ch).t-f4r(st).b).toFixed(1):null,strip:[+f4r(st).w.toFixed(1),+f4r(st).h.toFixed(1)],glass:+hg.toFixed(1)})}
/* open: one <video>, made on the first tap, moved into the page view or the theatre */
let f4v=null,f4lb=null,f4back=null;
function f4video(){if(f4v)return f4v;f4v=D.createElement('video');f4v.className='f4-v';f4v.playsInline=true;f4v.preload='auto';f4v.controls=true;f4v.poster='media/ez-landing-v4-poster-ez.jpg';
  f4v.innerHTML='<source src="media/ez-landing-v4.mp4" type="video/mp4"><source src="media/ez-landing-v4.webm" type="video/webm">';
  return f4v}
function f4close(){if(!f4lb)return;if(f4v){f4v.pause()}const d=D.fullscreenElement;if(d&&D.exitFullscreen)D.exitFullscreen().catch(()=>{});f4lb.remove();f4lb=null;D.removeEventListener('keydown',f4key,true);if(f4back)f4back.focus({preventScroll:true})}
function f4key(e){if(!f4lb)return;if(e.key==='Escape'){e.preventDefault();f4close()}else if(e.key==='Tab'){const f=[...f4lb.querySelectorAll('button,video')];const i=f.indexOf(D.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}}}
function f4open(still){const vw=D.documentElement.clientWidth,vh=innerHeight,ph=vw<760;f4back=D.activeElement;
  f4lb=D.createElement('div');f4lb.className='f4-lb'+(ph?' f4-ph':'');f4lb.setAttribute('role','dialog');f4lb.setAttribute('aria-modal','true');f4lb.setAttribute('aria-label','The whole game');
  const w=ph?vw:Math.min(vw-96,(vh-150)*16/9),k=Math.min(.16,Math.max(.1,w/3650));
  f4lb.innerHTML=`<div class="f4-lbh" aria-hidden="true"><i class="f4-key"></i>The whole game<b class="f4-t">${F4T}</b></div><div class="f4-lbs" style="width:${w.toFixed(1)}px;--rt:${(54*k).toFixed(2)}px;--rb:${(205*k).toFixed(2)}px"><i class="f4-rt"></i><div class="f4-lbg" style="height:${(w*9/16).toFixed(1)}px"></div><i class="f4-rb"></i></div>${ph?'<div class="f4-hint">Turn your phone for full screen</div>':''}<button class="f4-x" type="button" aria-label="Close the film">✕</button>`;
  D.body.appendChild(f4lb);const v=f4video();f4lb.querySelector('.f4-lbg').appendChild(v);
  f4lb.querySelector('.f4-x').addEventListener('click',f4close);f4lb.addEventListener('click',e=>{if(e.target===f4lb)f4close()});D.addEventListener('keydown',f4key,true);
  if(still)return;v.muted=false;const p=v.play();p&&p.catch(()=>{});
  /* phones: the phone's own player, full screen (inside the tap's gesture); the page view stays behind it as the fallback */
  if(ph){try{if(v.webkitEnterFullscreen&&!v.requestFullscreen)v.webkitEnterFullscreen();else if(v.requestFullscreen)v.requestFullscreen().then(()=>screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{})).catch(()=>{});else if(v.webkitEnterFullscreen)v.webkitEnterFullscreen()}catch(e){}}
  else f4lb.querySelector('.f4-x').focus({preventScroll:true})}
function f4wire(){const b3=sec.querySelector('.f4'),st=b3&&b3.querySelector('.f4-strip');if(!st)return;
  st.addEventListener('click',()=>f4open());st.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();f4open()}});
  /* the running time from the file, read once the strip is near (metadata only) */
  const probe=()=>{const v=D.createElement('video');v.preload='metadata';v.muted=true;v.src='media/ez-landing-v4.mp4';v.onloadedmetadata=()=>{const s=Math.round(v.duration||0);if(s>0){F4S=s;F4T=f4fmt(s);D.querySelectorAll('.f4-t').forEach(t=>t.textContent=F4T);st.setAttribute('aria-label',f4aria());f4fit()}v.removeAttribute('src');v.load()}};
  if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();probe()}},{rootMargin:'600px 0px'});io.observe(st)}else probe();
  /* Meet the models is built by another script: refit the chapter gap once its head exists */
  let n=0;(function wait(){if(D.querySelector('section.ch .ch-h')){f4fit();return}if(++n<60)setTimeout(wait,250)})();
  window.__f4open=f4open}
