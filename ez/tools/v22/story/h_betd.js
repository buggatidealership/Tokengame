/* H_BETD (owner, 2026-11-01: "the close-up D... you can animate that one as well, and we can put it on live X3 plus"): round H12 bet3's
   take D on the live bet chapter. After the vault and the ticking chip, the chip's board keeps going down the page as one painted picture:
   the fees run down the traces into the pool, the call is the junction, the fork lights the green lamp (RIGHT) and then blows the red fuse
   (WRONG), one after the other, and the empty sockets #2 #3 #4 point to Season 2; "NVIDIA is the first bet, not the last." closes it.
   Owner's fixes: no AI logo in the call's caption; no caption over the flow (the call sits under the junction, between the branches);
   the 69% and the call are caption boxes drawn into the plate (his K2 pick), RIGHT and WRONG are lit by their own lamp and fuse.
   The panel bleeds to the screen's edges on phones. X3+ only (html.p1-on, never cd-on). The parts list stays in the page for screen
   readers. Every word is page text in an SVG laid over the painting in its own pixel space. Data: SIM.poolShare, the leader as the live
   chapter names it (else the P&L leader). Animations run only on screen; with reduced motion the fork rests with the lamp lit.
   Paintings (full names written out: make_site.py copies only media named in the page): media/bet-board-d-tall.jpg, media/bet-board-d-wide.jpg */
(function(){
const D=document,H=D.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const desk=()=>innerWidth>=1000;
function data(sec){const S=window.SIM||{};let lead=null;const b=sec.querySelector('.wc-bet-l .wc-cap b');
  if(b){const t=b.textContent.trim().toLowerCase();lead=Object.keys(NM).find(k=>NM[k].toLowerCase()===t)||null}
  if(!lead&&window.__x2pPnl){const P=window.__x2pPnl().A;lead=Object.keys(P).sort((a,c)=>P[c].pnl-P[a].pnl)[0]}
  return {share:S.poolShare!=null?Math.round(S.poolShare*100):69,name:NM[lead]||lead||''}}
const DEFS=`<defs>
 <filter id="bdss"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.1 1.35" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
 <filter id="bdlg" x="-10%" y="-10%" width="120%" height="120%"><feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 .94  0 0 0 0 .9  0 0 0 0 .79  0 0 0 .9 0" result="c"/><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.45" result="m"/><feComposite in="c" in2="m" operator="in"/></filter>
 <filter id="bdlc" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="9" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1.6" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>
 <filter id="bdbl" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="5"/></filter>
 <radialGradient id="bddrop"><stop offset="0" stop-color="#fffbe0"/><stop offset=".35" stop-color="#ffd24a"/><stop offset=".75" stop-color="#ff9d1c" stop-opacity=".55"/><stop offset="1" stop-color="#ff9d1c" stop-opacity="0"/></radialGradient>
 <radialGradient id="bdpool"><stop offset="0" stop-color="#fff6c8" stop-opacity=".95"/><stop offset=".45" stop-color="#ffcf4a" stop-opacity=".55"/><stop offset="1" stop-color="#ff9d1c" stop-opacity="0"/></radialGradient>
 <radialGradient id="bdok"><stop offset="0" stop-color="#eafff0"/><stop offset=".3" stop-color="#3dff8c" stop-opacity=".85"/><stop offset="1" stop-color="#03c870" stop-opacity="0"/></radialGradient>
 <radialGradient id="bdno"><stop offset="0" stop-color="#fff0e0"/><stop offset=".3" stop-color="#ff5a2e" stop-opacity=".9"/><stop offset="1" stop-color="#ff3a31" stop-opacity="0"/></radialGradient></defs>`;
const ss=(t,a)=>`<text class="bd-k" filter="url(#bdss)" ${a}>${t}</text>`;
/* gold drops running down traces into the pool: one small loop */
function flow(paths,{dur=2.4,w=20}={}){return paths.map((d,i)=>{const b=-(i*.41).toFixed(2);
  return `<path d="${d}" pathLength="100" class="bd-pl" stroke-width="${w}" stroke-dasharray="26 140" filter="url(#bdbl)"><animate attributeName="stroke-dashoffset" values="22;-118" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/></path>`}).join('')}
/* the pool fills: its gold brightens and settles in time with the drops */
const pool=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#bdpool)" class="bd-pd" opacity=".25"><animate attributeName="opacity" values=".18;.6;.18" dur="2.4s" repeatCount="indefinite"/></ellipse>`;
/* the fork, one after the other (6 s): a drop runs to the lamp, the lamp lights and RIGHT glows; then a drop runs to the fuse, it blows and WRONG flickers */
const T=6;
function fork(pOk,pNo,lamp,fuse,okT,noT){
  const run=(id,d,a,b)=>`<path id="${id}" d="${d}" pathLength="100" class="bd-pl" stroke-width="24" stroke-dasharray="30 140" stroke-dashoffset="30" filter="url(#bdbl)"><animate attributeName="stroke-dashoffset" values="30;30;-100;-100" keyTimes="0;${a};${b};1" dur="${T}s" repeatCount="indefinite"/></path>`;
  const glow=(c,g,vals,kt)=>`<circle cx="${c[0]}" cy="${c[1]}" r="${c[2]}" fill="url(#${g})" class="bd-dr" opacity="0"><animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${T}s" repeatCount="indefinite"/></circle>`;
  const lit=(vals,kt)=>`<animate attributeName="opacity" values="${vals}" keyTimes="${kt}" dur="${T}s" repeatCount="indefinite"/>`;
  const okV='.35;.35;1;1;.35;.35',okK='0;.2;.25;.45;.5;1',noV='.35;.35;1;.55;1;.7;1;.35;.35',noK='0;.7;.73;.77;.81;.86;.9;.95;1';
  return run('bdfo',pOk,0,.2)+run('bdfn',pNo,.5,.7)+glow(lamp,'bdok','0;0;1;1;0;0',okK)+glow(fuse,'bdno','0;0;1;.4;1;.5;.9;0;0',noK)
    +`<g class="bd-ok" opacity=".35">${lit(okV,okK)}${okT}</g><g class="bd-no" opacity=".35">${lit(noV,noK)}${noT}</g>`}
/* a narration caption drawn into the plate (K2): hand-cut black box, gold double rule, cream lettering */
const cap=(at,html,cls)=>`<div class="bd-at ${cls}" data-at="${at}"><div class="bd-c"><span>${html}</span></div></div>`;
function html(Dt){
  const ph=`<g class="phonly">
   ${flow(['M282 0 L282 150 L320 220 L330 318','M318 0 L318 170 L340 230 L346 320','M352 0 L352 320','M392 0 L392 170 L372 236 L366 320','M430 0 L430 160 L398 230 L384 318'])}
   ${pool(355,440,120,105)}
   ${fork('M355 718 L192 718 Q178 720 177 736 L172 800','M355 718 L500 718 Q514 720 515 736 L518 780',[165,835,78],[520,850,74],
     `<text class="glo ok" x="140" y="935" font-size="40" font-family="Anton" letter-spacing="3">RIGHT</text>${ss('$EZ BUYBACK','x="140" y="962" font-size="22"')}`,
     `<text class="glo no" x="600" y="895" text-anchor="middle" font-size="40" font-family="Anton" letter-spacing="3">WRONG</text>${['THE POOL','CAN BE','WIPED OUT'].map((t,i)=>ss(t,`x="600" y="${920+i*24}" text-anchor="middle" font-size="21"`)).join('')}`)}
   
   <g filter="url(#bdlc)"><image href="media/logos/GOOGL.png" x="155" y="1018" width="58" height="58" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:0s"/></g><g filter="url(#bdlc)"><image href="media/logos/TSLA.png" x="325" y="1018" width="58" height="58" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:1.6s"/></g><g filter="url(#bdlc)"><image href="media/logos/MSFT.png" x="496.4" y="1020" width="54" height="54" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:3.2s"/></g>${ss('SEASON 2 →','x="355" y="1140" text-anchor="middle" font-size="34"')}</g>`;
  const dk=`<g class="dkonly">
   ${flow(['M0 230 L240 230 L340 320 L408 340','M0 300 L250 300 L330 340 L408 350','M0 420 L240 420 L330 380 L408 365','M0 480 L250 480 L340 400 L410 375'],{dur:2.8})}
   ${pool(515,345,105,105)}
   ${fork('M775 350 L782 300 L782 245 L812 220 L838 212','M775 350 L780 400 L780 480 L812 508 L838 512',[880,210,80],[915,515,78],
     `<text class="glo ok" x="904" y="340" text-anchor="middle" font-size="40" font-family="Anton" letter-spacing="3">RIGHT</text>${ss('$EZ BUYBACK','x="904" y="366" text-anchor="middle" font-size="21"')}`,
     `<text class="glo no" x="724" y="580" text-anchor="end" font-size="40" font-family="Anton" letter-spacing="3">WRONG</text>${ss('THE POOL CAN','x="724" y="606" text-anchor="end" font-size="21"')}${ss('BE WIPED OUT','x="724" y="629" text-anchor="end" font-size="21"')}`)}
   
   <g filter="url(#bdlc)"><image href="media/logos/GOOGL.png" x="1076.3" y="169.4" width="58" height="58" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:0s"/></g><g filter="url(#bdlc)"><image href="media/logos/TSLA.png" x="1076.3" y="332.6" width="58" height="58" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:1.6s"/></g><g filter="url(#bdlc)"><image href="media/logos/MSFT.png" x="1078.3" y="497" width="54" height="54" preserveAspectRatio="xMidYMid meet" class="bd-lg" style="animation-delay:3.2s"/></g>${ss('SEASON 2 →','font-size="30" text-anchor="middle" transform="translate(1222 372) rotate(90)"')}</g>`;
  const pct=`<b>${Dt.share}%</b> of $EZ creator fees fill the pool.`, call=`The pool gets bet on the top AI's call. Today that's <b>${Dt.name}</b>.`;
  return `<div class="bd-shd bd-p" data-iw="720|1280" data-ih="1280|720" data-src="media/bet-board-d-tall.jpg|media/bet-board-d-wide.jpg" data-bdp="[40,150,640,1070]" data-bdd="[0,40,1280,630]">
   <div class="bd-ink"><div class="bd-a"><svg class="bd-s" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">${DEFS}${ph}${dk}</svg></div></div>
   <div class="bd-caps" aria-hidden="true">
    ${cap('[500,236]|[402,62]',pct,'bd-c1')}
    ${cap('[50,571]|[616,62]',call,'bd-c2')}
    ${cap('[355,1186]|[1000,612]','NVIDIA is the first bet, <b>not the last.</b>','bd-c3')}</div></div>`}
function place(p){const a=p.querySelector('.bd-a'),s=a.querySelector('.bd-s'),dk=desk(),pk=v=>{const q=String(v).split('|');return dk?q[1]:q[0]},
  c=JSON.parse(dk?p.dataset.bdd:p.dataset.bdp),iw=+pk(p.dataset.iw),ih=+pk(p.dataset.ih),w=a.clientWidth,k=w/c[2];if(!w)return;
  p.classList.toggle('dk',dk);a.style.height=Math.round(c[3]*k)+'px';a.style.backgroundImage=`url(${pk(p.dataset.src)})`;a.style.backgroundSize=`${iw*k}px ${ih*k}px`;a.style.backgroundPosition=`${-c[0]*k}px ${-c[1]*k}px`;
  s.setAttribute('viewBox',c.join(' '));p.style.setProperty('--k',k);
  p.querySelectorAll('[data-at]').forEach(n=>{const [x,y]=JSON.parse(pk(n.dataset.at));n.style.left=((x-c[0])*k+a.offsetLeft)+'px';n.style.top=((y-c[1])*k+a.offsetTop)+'px'})}
function go(n){if(!H.classList.contains('p1-on')||H.classList.contains('cd-on')){if(n<200)setTimeout(()=>go(n+1),150);return}
  const sec=D.querySelector('#wc-book .wc-bet.hb-on'),w=sec&&sec.querySelector('.hb-wrap'),chip=w&&w.querySelector('.hbc-fr');
  if(!chip){if(n<200)setTimeout(()=>go(n+1),150);return}
  if(w.querySelector('.bd-p'))return;
  w.classList.add('bd-on');const box=D.createElement('div');box.className='bd';box.innerHTML=html(data(sec));chip.after(box);
  const p=box.querySelector('.bd-p'),re=()=>place(p);re();let w0=innerWidth;addEventListener('resize',()=>{if(innerWidth!==w0){w0=innerWidth;re()}});
  D.fonts&&D.fonts.ready.then(re);addEventListener('load',re);
  const s=p.querySelector('svg.bd-s');
  if(RM){s.pauseAnimations();s.setCurrentTime(1.8)}
  else if('IntersectionObserver' in window){s.pauseAnimations();new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting?s.unpauseAnimations():s.pauseAnimations()),{rootMargin:'100px'}).observe(p)}
  H.classList.add('bd-ready')}
try{go(0)}catch(e){window.__x2pBdErr=e;console.error(e)}
})();
