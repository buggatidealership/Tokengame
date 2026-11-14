/* H_BET: Bet #1: NVIDIA, round H2's pick (owner, 2026-10-31; from tools/concepts/worlds/comic/story/h/bet2: _b.js, chip.js, s4.js).
   The vault opener, the headline, the painted GPU chip with the live countdown set into its four dies (page text mapped onto each
   die's glass with a CSS matrix3d; each digit a reel that rolls when it changes), the parts list S4 (C1 the pool, U1 the call,
   K1 the switch: three painted parts with their reference designators and the stake lines), and the empty sockets of the bets to come.
   X3+ only: waits for html.p1-on (set by pop_p1.js, never with cd-on). The page's own .wc-bet stays in the DOM, hidden.
   The bet time is world-comic.js's betAt, copied verbatim. The digits tick once a second on the wall clock's second, only while the
   chip is on screen and the tab is visible. Nothing moves with reduced motion. A failure is kept in window.__x2pHbetErr. */
(function(){
const H=document.documentElement,D=document,RM=matchMedia('(prefers-reduced-motion: reduce)');
/* full file names written out: make_site.py copies only media named in the page */
const IMG={vault:'media/bet-vault-h2.jpg',chip:'media/bet-chip-h2.jpg',parts:'media/bet-parts-h2.jpg',grP:'media/bet-ground-h2-phone.jpg',grD:'media/bet-ground-h2-desk.jpg'};
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const p2=v=>String(v).padStart(2,'0');

/* the bet: the close the weekday after NVIDIA's call date in the sheet (or SIM/CONFIG.betDate); world-comic.js betAt, verbatim */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function left(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}

/* the leader is the page's own: the name the page's bet section prints ("Today that's <b>Grok</b>"); else the P&L leader */
function data(sec){const S=window.SIM||{},at=betAt();let lead=null;
  const b=sec.querySelector('.wc-bet-l .wc-cap b');if(b){const t=b.textContent.trim().toLowerCase();lead=Object.keys(NM).find(k=>NM[k].toLowerCase()===t)||null}
  if(!lead&&window.__x2pPnl){const P=window.__x2pPnl().A;lead=Object.keys(P).sort((a,c)=>P[c].pnl-P[a].pnl)[0]}
  return {at,lead,share:S.poolShare!=null?Math.round(S.poolShare*100):69,
    day:at?new Date(at).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:'America/New_York'}):''}}
function face(m,cls){const M=(window.MODELS||{})[m];if(!M)return '';return `<i class="hb-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`}

/* homography: the unit rect (w x h) onto quad q=[tl,tr,br,bl] -> CSS matrix3d */
function persp(w,h,q){const [x0,y0]=q[0],[x1,y1]=q[1],[x2,y2]=q[2],[x3,y3]=q[3];
  const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3,den=dx1*dy2-dx2*dy1;
  const g=(dx3*dy2-dx2*dy3)/den,hh=(dx1*dy3-dx3*dy1)/den;
  const a=x1-x0+g*x1,b=x3-x0+hh*x3,c=x0,d=y1-y0+g*y1,e=y3-y0+hh*y3,f=y0;
  return `matrix3d(${a/w},${d/w},0,${g/w},${b/h},${e/h},0,${hh/h},0,0,1,0,${c},${f},0,1)`}
/* an art box showing a crop of an image; crop and points are in the source image's pixels (iw x ih), whatever the file's size */
function art(el,src,iw,ih,crop){let w0=-1;const place=()=>{const w=el.clientWidth;if(!w||w===w0)return;w0=w;const c=crop(),k=w/c[2];
    el.style.height=Math.round(c[3]*k)+'px';el.style.backgroundImage=`url(${src})`;el.style.backgroundSize=`${iw*k}px ${ih*k}px`;el.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
    el.querySelectorAll('[data-q]').forEach(n=>{const q=JSON.parse(n.dataset.q).map(([x,y])=>[(x-c[0])*k,(y-c[1])*k]);n.style.transform=persp(n.offsetWidth,n.offsetHeight,q)});
    el.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(n.dataset.at);n.style.left=((x-c[0])*k)+'px';n.style.top=((y-c[1])*k)+'px'})};
  place();el.__hbPlace=()=>{w0=-1;place()};return place}

/* the chip: the four dies' glass, measured on the 2048x1152 painting */
const Q=[[[650,494],[781,471],[858,610],[719,631]],[[842,465],[981,440],[1064,579],[918,602]],[[1043,431],[1172,410],[1262,547],[1121,568]],[[1229,403],[1358,383],[1453,514],[1316,535]]];
const lq=q=>{const [tl,tr,br,bl]=q,m=(p,o,t)=>[p[0]+(p[0]-o[0])*t,p[1]+(p[1]-o[1])*t];return [m(bl,tl,.13),m(br,tr,.13),m(br,tr,.36),m(bl,tl,.36)]};
const K=['d','h','m','x'],LAB=['days','hrs','min','sec'];
function chip(){const die=i=>`<div class="hbc-die" data-q='${JSON.stringify(Q[i])}'><span class="hbc-glow"></span><b class="hbc-num" data-r="${K[i]}" aria-hidden="true"></b><i class="hbc-glass"></i></div><div class="hbc-lab" data-q='${JSON.stringify(lq(Q[i]))}' aria-hidden="true">${LAB[i]}</div>`;
  return `<div class="hb-shd hbc-fr"><div class="hb-ink"><div class="hb-art hbc-art" role="timer" aria-live="off"><span class="hb-sr" data-sr></span>${[0,1,2,3].map(die).join('')}</div></div></div>`}
/* reel digits: each character its own slot; a changed slot rolls the old digit down and out and the new one in from above (counting down) */
function setReel(el,str){const slots=[...el.children];
  while(slots.length<str.length){const s=D.createElement('span');s.className='hbc-sl';s.innerHTML='<i></i>';el.prepend(s);slots.unshift(s)}
  while(slots.length>str.length){slots.shift().remove()}
  [...str].forEach((ch,i)=>{const s=slots[i],cur=s.lastElementChild;if(cur.textContent===ch)return;
    s.querySelectorAll('i').forEach(x=>{if(x!==cur)x.remove()});
    if(!cur.textContent||RM.matches||!cur.animate){cur.textContent=ch;return}
    const n=D.createElement('i');n.textContent=ch;s.appendChild(n);
    const o={duration:420,easing:'cubic-bezier(.3,.9,.3,1.15)',fill:'forwards'};
    cur.animate([{transform:'translateY(0)',opacity:1},{transform:'translateY(78%)',opacity:0}],{...o,easing:'cubic-bezier(.5,0,.8,.4)',duration:300}).onfinish=()=>cur.remove();
    const a=n.animate([{transform:'translateY(-80%)',opacity:0},{transform:'translateY(0)',opacity:1}],o);a.onfinish=()=>{try{a.commitStyles();a.cancel()}catch(e){}};
    const die=el.closest('.hbc-die');if(die)try{die.animate([{'--fl':1},{'--fl':0}],{duration:520,easing:'ease-out'})}catch(e){}})}
/* one ticker per chip: on the wall clock's second, only while the chip is (nearly) on screen and the tab is visible */
function tick(root){const art=root.querySelector('.hbc-art'),sr=root.querySelector('[data-sr]');let on=false,t=0,lastSr=-1;
  const set=()=>{const L=left();if(!L)return;const v={d:p2(L.d),h:p2(L.h),m:p2(L.m),x:p2(L.x)};
    root.querySelectorAll('.hbc-num[data-r]').forEach(e=>setReel(e,v[e.dataset.r]));
    const q=Math.floor(L.s/30);if(sr&&q!==lastSr){lastSr=q;sr.textContent=`${L.d} days, ${L.h} hours, ${L.m} minutes until the NVIDIA bet`}};
  const loop=()=>{clearTimeout(t);if(!on||D.hidden||!root.isConnected)return;set();t=setTimeout(loop,1000-(Date.now()%1000)+5)};
  set();
  if('IntersectionObserver' in window)new IntersectionObserver(es=>{on=es[es.length-1].isIntersecting;loop()},{rootMargin:'120px 0px'}).observe(art);else{on=true;loop()}
  D.addEventListener('visibilitychange',loop)}

/* the sockets: the bets still to come, drawn as empty chip footprints on the board */
function sock(n,lab){const pads=(x0,y0,dx,dy,k)=>Array.from({length:k},(_,i)=>`<rect x="${x0+dx*i}" y="${y0+dy*i}" width="${dx?4:9}" height="${dx?9:4}" rx="1"/>`).join('');
  return `<svg class="hbc-sk hbc-sk${n}" viewBox="0 0 110 96" aria-hidden="true"><path class="o" d="M9 13 L101 9 L104 85 L7 88Z"/><path class="i" d="M20 22 L90 19.5 L92 76 L19 78Z"/>
  <g class="p">${pads(24,3.5,9,0,8)}${pads(23,87,9,0,8)}${pads(-1,24,0,9,7)}${pads(103,22,0,9,7)}</g><path class="c" d="M20 22 l9 -.4 l-9 9z"/><text x="55" y="56">${lab}</text></svg>`}

function html(Dt){
  const lead=Dt.lead?`<span class="hb4-who">${face(Dt.lead,'hb4-f')}<b class="hb4-ld">${NM[Dt.lead]}</b></span>`:'';
  const parts=`<div class="hb4">
   <div class="hb-shd hb-p hb4-a"><div class="hb-ink"><div class="hb-art hb-part" aria-hidden="true"><span class="hb4-rd" data-at="[300,95]">C1</span><span class="hb4-rd" data-at="[800,250]">U1</span><span class="hb4-rd" data-at="[1330,380]">K1</span></div></div></div>
   <svg class="hb4-ln" viewBox="0 0 300 30" preserveAspectRatio="none" aria-hidden="true"><path d="M50 0 V12 L50 30"/><path d="M146 0 V10 L150 16 V30"/><path d="M234 0 V10 L250 20 V30"/></svg>
   <ol class="hb4-bom">
    <li><b class="hb4-d" aria-hidden="true">C1</b><span class="hb4-n">The pool</span><span><b class="hb4-g">${Dt.share}%</b> of $EZ creator fees fill it</span></li>
    <li><b class="hb4-d" aria-hidden="true">U1</b><span class="hb4-n">The call</span><span>The pool gets bet on the call of the AI on top of the leaderboard.</span></li>
    <li><b class="hb4-d" aria-hidden="true">K1</b><span class="hb4-n">The switch</span><span><i class="hb4-ok"><span aria-hidden="true">● </span>Right:</i> $EZ buyback</span><span><i class="hb4-no"><span aria-hidden="true">● </span>Wrong:</i> the pool can be wiped out</span></li></ol></div>`;
  return `<div class="hb-wrap" style="--hb-vault:url(${IMG.vault});--hb-grp:url(${IMG.grP});--hb-grd:url(${IMG.grD})"><div class="hb-gr" aria-hidden="true"><i></i></div>
  <div class="hb-open" aria-hidden="true"><div class="i"><div class="g"></div></div></div>
  <h2 class="hb-h"><span class="hb-w">Bet #1:</span> <span class="hb-w hb-w2">NVIDIA</span></h2>
  ${Dt.day?`<p class="hb-sub">It goes on at the close, ${Dt.day}.</p>`:''}
  ${chip()}
  <div class="hb-st">${parts}</div>
  <div class="hbc-close"><div class="hbc-socks">${sock(1,'#2')}${sock(2,'#3')}${sock(3,'#4')}</div>
   <p class="hbc-cl"><span>NVIDIA is the first bet, not the last.</span> <b>Season 2 brings more.</b></p></div></div>`}

const chipCrop=()=>innerWidth<1000?[600,330,890,410]:[260,250,1520,680];
const partsCrop=()=>innerWidth<1000?[200,70,1680,860]:[150,40,1780,900];
function dress(){const sec=D.querySelector('#wc-book .wc-bet');if(!sec||sec.classList.contains('hb-on'))return;
  sec.insertAdjacentHTML('beforeend',html(data(sec)));sec.classList.add('hb-on');
  [art(sec.querySelector('.hbc-art'),IMG.chip,2048,1152,chipCrop),art(sec.querySelector('.hb-part'),IMG.parts,1920,1080,partsCrop)];
  tick(sec);H.classList.add('hb-ready')}
function start(){try{dress()}catch(e){window.__x2pHbetErr=e;console.error('h_bet',e);return}
  const main=D.querySelector('main');if(main)new MutationObserver(()=>{try{dress()}catch(e){window.__x2pHbetErr=e}}).observe(main,{childList:true});
  let w0=innerWidth,rt=0;addEventListener('resize',()=>{if(innerWidth===w0)return;w0=innerWidth;clearTimeout(rt);rt=setTimeout(()=>{D.querySelectorAll('.hb-wrap .hb-art').forEach(a=>a.__hbPlace&&a.__hbPlace())},150)});
  if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>D.querySelectorAll('.hb-wrap .hb-art').forEach(a=>a.__hbPlace&&a.__hbPlace()))}
(function wait(n){if(H.classList.contains('p1-on')&&!H.classList.contains('cd-on')&&D.querySelector('#wc-book .wc-bet')&&window.MODELS)start();else if(n<480)setTimeout(()=>wait(n+1),250)})(0);
})();
/* H_BET ALIVE (owner, 2026-10-31): the coin glint in the vault and K1's lamps (positions measured on the paintings, round H5's
   effects 8 and 9); each runs only while its picture is on screen. */
;(function(){var D=document,t=0,io=null;
 function add(host,list,cls){if(!host||host.querySelector('.'+cls))return null;if(getComputedStyle(host).position==='static')host.style.position='relative';
  list.forEach(function(a){var s=D.createElement('i');s.className=cls+a[2];s.setAttribute('aria-hidden','true');s.style.left=a[0]+'%';s.style.top=a[1]+'%';host.appendChild(s)});return host}
 function go(){var v=D.querySelector('.wc-bet.hb-on .hb-open .i'),k=D.querySelector('.wc-bet.hb-on .hb4-a .hb-ink')||D.querySelector('.wc-bet.hb-on .hb4-a');
  if(!v||!k){if(++t<120)setTimeout(go,500);return}
  var a=add(v,[[44,66,''],[51.5,73,' s2']],'hb-star'),b=add(k,[[70.9,50.3,' g'],[80.6,50.3,' r']],'hb-led');
  if(!window.IntersectionObserver)return;io=io||new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('hb-lv',e.isIntersecting)})},{threshold:.2});
  [a,b].forEach(function(h){h&&io.observe(h)})}
 go()})();
