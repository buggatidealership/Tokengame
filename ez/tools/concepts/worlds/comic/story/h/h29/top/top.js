/* H29 · TOP (mockup overlay, laid over the built ez/v46-live-x2plus.html; classes h29t-). From the header to the first gutter before Meet the models.
   1 the headline as live, with "Watch the 1:20 film" on the hero (opens the film big, film4's own player); the separate film section goes.
   2 the H29 gutter (h29/_gutter.css, .h29-gutter) between the headline and How a round works, and after How a round works.
   3 How a round works = live C3, every picture square: the ledger cropped square on its one entry, the board restacked square
     (four bands of the same painting, 605 instead of 731 painting px apart, cross-faded in the PCB between the rows); the caption box the same square.
     On desktop (>= 1000px) the four rows sit as a 2x2 of caption|picture pairs, so the whole beat is one screen.
   4 Words: the ledger says CLOSEST, not WINNER; gold only on headings and #1 (the round number and the round's closest go cream).
   5 Type: headings Bangers, numbers Anton, text Shantell Sans (the header too). The header's pill is the one "next" source:
     the next close (the soonest close of any round still to come, P5.nextClose, the same as the page's next-bell panel) and its companies;
     its dot is still and cream (a red dot means a loss under the colour rule).
   window.__h29next() -> the H29_NEXT object (at, rs, day, time, label) plus short/list labels and src ('H29_NEXT' or 'own'). window.__h29t = true when applied.
   window.__h29tDesk = 'rows' keeps desktop as four rows. A failure is kept in window.__h29tErr. */
(function(){const D=document,H=D.documentElement;let n=0;
function ready(){return window.__t4&&D.querySelector('section.t4 .t4-frs .q4-board .r3-bd')&&D.querySelector('section.t4 .q4-ledger .t4-pic')}
(function go(){if(!ready()){if(++n<300)return setTimeout(go,60);window.__h29tErr='top not found';return}try{main()}catch(e){window.__h29tErr=e;console.error(e)}})();

function main(){
H.classList.add('h29t');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- the one "next" source: the end helper's window.H29_NEXT (h29/end/end.js) when it is on the page;
   alone, the same rule copied here (P5.nextClose: the soonest close of any round still to come, every round graded at it, biggest first) ---------- */
const CAPS=window.CAPS||{};
function ownNext(){const P5=window.P5;if(!P5||!P5.data||!P5.nextClose)return null;const X=P5.data(),nb=P5.nextClose(X);if(!nb)return {at:null,rs:[]};
  const rs=[];X.days.forEach(d=>d.rs.forEach(r=>{if(P5.closeAt(r.ticker,r.resolves)===nb.c)rs.push(r)}));
  rs.sort((a,b)=>((CAPS[b.ticker]||0)-(CAPS[a.ticker]||0))||(a.n-b.n));
  const f=o=>new Date(nb.c).toLocaleString('en-US',Object.assign({timeZone:'America/New_York'},o));
  const hr=f({hour:'numeric',minute:'2-digit',hour12:true}).replace(':00','').replace(' ','').toLowerCase();
  return {at:nb.c,rs,day:f({weekday:'short'}),date:f({month:'short',day:'numeric'}),time:hr,label:`${f({weekday:'short'})}, ${f({month:'short',day:'numeric'})} · ${hr} New York`}}
window.__h29next=()=>{const x=(window.H29_NEXT&&window.H29_NEXT())||ownNext();if(!x||!x.at||!x.rs.length)return null;const nm=x.rs.map(r=>r.co);
  return Object.assign({},x,{src:window.H29_NEXT?'H29_NEXT':'own',short:nm[0]+(nm.length>1?' +'+(nm.length-1):''),list:nm.length>2?`${nm[0]}, ${nm[1]} +${nm.length-2}`:nm.join(', ')})};

/* ---------- header: the pill (phones "Next close / Apple +3"; desktop "Next close Tue 4pm · Apple, Palantir +2"), still, links to Upcoming ---------- */
const upHref=(()=>{const a=[...D.querySelectorAll('header nav a')].find(a=>/upcoming/i.test(a.textContent));return a?a.getAttribute('href'):'#/upcoming'})();
const bell=`<svg class="h29t-bell" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.6c.6 0 1 .4 1 1v.5c2 .5 3.3 2.2 3.3 4.4v2.6l1.3 1.7v.8H2.4v-.8l1.3-1.7V7.5C3.7 5.3 5 3.6 7 3.1v-.5c0-.6.4-1 1-1zM6.4 13.4h3.2a1.6 1.6 0 0 1-3.2 0z"/></svg>`;
function pill(){const live=D.querySelector('#liveChip');if(!live)return;let a=D.querySelector('.h29t-next');
  if(!a){a=D.createElement('a');a.className='live h29t-next';live.after(a)}
  const x=window.__h29next();if(!x){a.style.display='none';return}a.style.display='';
  a.href=upHref;a.dataset.src=x.src;
  a.setAttribute('aria-label',`Next close: ${x.label}. ${x.rs.map(r=>r.co+' ('+r.ticker+')').join(', ')}. See what is coming up`);
  a.title=`${x.rs.map(r=>r.co+' ('+r.ticker+')').join(', ')} · ${x.label}`;
  a.innerHTML=`${bell}<span class="h29t-st"><span class="h29t-nl">Next close</span><b class="h29t-when">${esc(x.day+' '+x.time)}</b><b class="h29t-co1">${esc(x.short)}</b></span><span class="h29t-co">${esc(x.list)}</span>`}
pill();setInterval(pill,60000);/* H29_NEXT may arrive after this overlay: read it again once it does */
let pn=0;(function wn(){if(window.H29_NEXT){pill();return}if(++pn<40)setTimeout(wn,250)})();

/* ---------- the top section ---------- */
const sec=D.querySelector('section.t4');
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
let F4T='1:20';
function film(){const b1=sec.querySelector('.t4-b1');if(!b1||b1.querySelector('.h29t-film'))return;
  const btn=D.createElement('button');btn.type='button';btn.className='h29t-film';
  btn.setAttribute('aria-label',`Watch the ${F4T} film, The whole game, with sound`);
  btn.innerHTML=`<span class="h29t-th" aria-hidden="true"><img src="media/ez-landing-v4-poster-ez.jpg" alt="" draggable="false" decoding="async"><i></i></span><span class="h29t-fw">Watch the <b class="h29t-ft">${F4T}</b> film</span>`;
  btn.addEventListener('click',()=>{window.__f4open&&window.__f4open()});
  b1.appendChild(btn)}
/* the running time from the file (metadata only), once the button is near */
function probe(){const v=D.createElement('video');v.preload='metadata';v.muted=true;v.src='media/ez-landing-v4.mp4';
  v.onloadedmetadata=()=>{const s=Math.round(v.duration||0);if(s>0){F4T=Math.floor(s/60)+':'+String(s%60).padStart(2,'0');D.querySelectorAll('.h29t-ft').forEach(t=>t.textContent=F4T);
    D.querySelectorAll('.h29t-film').forEach(b=>b.setAttribute('aria-label',`Watch the ${F4T} film, The whole game, with sound`))}v.removeAttribute('src');v.load()}}
let probed=false;

function gutters(){const b1=sec.querySelector('.t4-b1'),b2=sec.querySelector('.t4-b2');
  if(b1&&!b1.nextElementSibling.classList.contains('h29-gutter'))b1.after(mkG('h29t-g1'));
  if(b2&&!(b2.nextElementSibling&&b2.nextElementSibling.classList.contains('h29-gutter')))b2.after(mkG('h29t-g2'))}
const mkG=c=>{const g=D.createElement('div');g.className='h29-gutter '+c;g.setAttribute('aria-hidden','true');return g};

/* ledger: the painting cropped square around its one entry (slot q[2] spans x 136 to 1232, y 564 to 952 in the 1400 crop) */
const LSQ=[158,330,1060,1060];
function ledger(){const p=sec.querySelector('.q4-ledger .t4-pic');if(!p||p.dataset.h29)return;p.dataset.h29=1;
  const [cx,cy,cw,ch]=LSQ,iw=1400;p.dataset.iw=cw;p.dataset.cx=cx;p.dataset.cy=cy;p.style.aspectRatio='1/1';
  p.querySelectorAll('.t4-mv>img').forEach(im=>{im.style.width=(iw/cw*100).toFixed(3)+'%';im.style.left=(-cx/cw*100).toFixed(3)+'%';im.style.top=(-cy/ch*100).toFixed(3)+'%'});
  /* words: CLOSEST, not WINNER; the round number and the round's closest in the glass's cream, not gold (gold is headings and #1) */
  p.querySelectorAll('svg text').forEach(t=>{const s=t.textContent;
    if(s==='WINNER'){const f=parseFloat(t.getAttribute('font-size'));t.textContent='CLOSEST';t.setAttribute('x',(parseFloat(t.getAttribute('x'))-f*.47).toFixed(1))}
    if(/url\(#q4gd\)/.test(t.getAttribute('fill')||''))t.setAttribute('fill','url(#q4em)')});
  const li=p.closest('li');if(li)li.setAttribute('aria-label',li.getAttribute('aria-label').replace(/winner/i,'closest'))}

/* board: square. Four bands of the same painting (2520 x 3300), each a chip row with its PCB, restacked 605 painting px apart (was 731)
   and cross-faded over 120px of PCB between the rows; chips and rank windows move with their band. */
const B={W:2520,H:3300,T:[9.981,32.121,54.261,76.402].map(v=>v*33),h:12.25*33,wo:(11.205-9.981)*33,wh:10.379*33};
function board(){const bd=sec.querySelector('.q4-board .r3-bd');if(!bd||bd.dataset.h29)return;bd.dataset.h29=1;
  const S=B.W,m=150,P=(S-2*m-B.h)/3,f=60,a=(P-B.h)/2+f,bh=B.h+2*a,pc=v=>(v/S*100).toFixed(4)+'%';
  bd.style.aspectRatio='1/1';const im=bd.querySelector('.r3-bdi'),src=im&&im.getAttribute('src');
  let bands='';B.T.forEach((t,i)=>{const N=m+i*P;
    bands+=`<i class="h29t-band${i?'':' h29t-b0'}" style="top:${pc(N-a)};height:${pc(bh)};--fe:${(2*f/bh*100).toFixed(2)}%"><img src="${src}" alt="" draggable="false" style="top:${(-(t-a)/bh*100).toFixed(3)}%"></i>`});
  im.insertAdjacentHTML('afterend',bands);im.style.display='none';
  const ch=[...bd.querySelectorAll('.r3-chip')],rk=[...bd.querySelectorAll('.r3-rk')];
  ch.forEach((c,i)=>{const N=m+i*P;c.style.top=pc(N);c.style.height=pc(B.h)});
  rk.forEach((r,i)=>{const N=m+i*P;r.style.top=pc(N+B.wo);r.style.height=pc(B.wh)})}

/* the headings: the page fits both to one size inline (Anton-era); H29 sets them in Bangers at the spec's scale, fitted here instead */
function heads(){const h1=sec.querySelector('.t4-h1'),h2=sec.querySelector('.t4-b2 .t4-h2');[h1,h2].forEach(h=>h&&h.style.removeProperty('font-size'));
  if(!h1)return;/* the headline: the spec's 40px at 390 (clamp), stepped down only if a line would wrap */
  h1.style.removeProperty('--h29t-fs');const cs=getComputedStyle(h1),av=h1.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight),f0=parseFloat(cs.fontSize);
  const need=Math.max(...[...h1.querySelectorAll('.t4-hw')].map(e=>e.scrollWidth+parseFloat(getComputedStyle(e).marginLeft)));
  if(need>av){h1.style.setProperty('--h29t-fs',Math.floor(f0*av/need*.99*10)/10+'px')}}

let obs=null;
function apply(){gutters();film();ledger();board();heads();
  if(window.__h29tDesk==='rows')H.classList.add('h29t-rows');
  if(!probed&&'IntersectionObserver' in window){const b=sec.querySelector('.h29t-film');if(b){probed=true;const io=new IntersectionObserver(es=>{if(es.some(e=>e.isIntersecting)){io.disconnect();probe()}},{rootMargin:'400px 0px'});io.observe(b)}}
  window.__t4.place()}
apply();
/* x2p_top rebuilds the section when the width crosses 1000px, and refits the headings on fonts and resizes: re-apply */
let t=0;new MutationObserver(()=>{clearTimeout(t);t=setTimeout(()=>{if(!sec.querySelector('.h29t-film')||!sec.querySelector('.r3-bd[data-h29]'))apply();else heads()},30)}).observe(sec,{childList:true,subtree:false});
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;requestAnimationFrame(heads)});
D.fonts&&D.fonts.ready.then(()=>{heads();window.__t4.place()});
/* fitHead (inside place) writes the old one-size font back inline: take it off again whenever it does */
[sec.querySelector('.t4-h1'),sec.querySelector('.t4-b2 .t4-h2')].forEach(h=>h&&new MutationObserver(()=>{if(h.style.fontSize)h.style.removeProperty('font-size')}).observe(h,{attributes:true,attributeFilter:['style']}));
window.__h29t=true}
})();
