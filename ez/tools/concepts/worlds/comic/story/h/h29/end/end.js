/* H29 · the END of the Overview (helper "end"; mockup overlay over the built ez/v46-live-x2plus.html, loaded after the files in load.json).
   Order (SPEC layer 1): … Every round so far → Smart or lucky → the bet → Follow on X → a slim footer.
   1 Smart or lucky = sol9 A4 (the gold rail tab "Hit rate ▸ P&L" between the two charts, on the etched board), with the H29 colour rule
     (model lines never green, red or the heading gold; two solid lines, two patterned, so they stay apart for red-green colour
     blindness) and the type rule (Bangers heads, Anton numbers, Shantell Sans text, nothing under 12px on phones).
   2 The bet = live B2, its one explaining line in the yellow narrator box ("#1 on the board"), the type rule; the countdown is its one mover.
   3 The ending: Follow for the next round (the next close's time and companies from one source, window.H29_NEXT), the X link, then a
     slim footer (EZ. logo + one line). Get $EZ, Next on the card, the next bell card, the long footer, the old $EZ mark and the
     desktop crawl go.
   Classes h29e-. A failure is kept in window.__h29eErr. Never touches the page's sources. */
(function(){
const D=document,H=D.documentElement;
/* the model colours of the two charts: cream Grok (its mark is white), sky Kimi, pink Claude, violet GPT. Claude and GPT carry a line
   pattern as well (dashes, dots), since pink and violet sit close to the blue for deuteranopes (simulated: Machado 2009, see REPORT). */
const COL={GROK:'#f8f0d9',KIMI:'#58b7ff',CLAUDE:'#f08bd9',GPT:'#a08fff'};
const DASH={GROK:'',KIMI:'',CLAUDE:'7 4.5',GPT:'0.01 5'};
const mOf=c=>Object.keys(COL).find(k=>COL[k]===c);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]);

/* ---------- the one "next" source: the next close (any exchange, as P5.nextClose) and every round graded at it, biggest first ---------- */
window.H29_NEXT=function(){const P5=window.P5;if(!P5||!P5.data)return null;const X=P5.data(),nb=P5.nextClose(X);if(!nb)return {at:null,rs:[]};
  const cap=t=>(window.CAPS&&CAPS[t])||0,rs=[];X.days.forEach(d=>d.rs.forEach(r=>{if(P5.closeAt(r.ticker,r.resolves)===nb.c)rs.push(r)}));
  rs.sort((a,b)=>cap(b.ticker)-cap(a.ticker)||a.n-b.n);
  const f=o=>new Date(nb.c).toLocaleString('en-US',Object.assign({timeZone:'America/New_York'},o));
  const hr=f({hour:'numeric',minute:'2-digit',hour12:true}).replace(':00','').replace(' ','').toLowerCase();
  return {at:nb.c,rs,day:f({weekday:'short'}),date:f({month:'short',day:'numeric'}),time:hr,label:`${f({weekday:'short'})}, ${f({month:'short',day:'numeric'})} · ${hr} New York`}};

/* ---------- 1 Smart or lucky ---------- */
function sol(){const S9=window.S9;if(!S9||!S9.A3||!D.querySelector('#learn .p5'))return false;const A=S9.A3;
  const st=Object.assign({},A.ETCH,{cls:'s9w-et h29e-sol',col:(X,m)=>COL[m],sm:12,smB:14,ay:11,
    lab:{ff:'Anton,sans-serif',w:400,c:'#efe6c6',op:.8,bc:'#efe6c6',ls:'.03em',k:.62},
    line:(d,c)=>{const m=mOf(c),da=DASH[m]?` stroke-dasharray="${DASH[m]}"`:'';
      return `<path d="${d}" fill="none" stroke="#000" stroke-opacity=".55" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"${da} transform="translate(0 1.2)"/>`+
        `<path d="${d}" fill="none" stroke="${c}" stroke-width="${m==='GPT'?3.4:2.6}" stroke-linejoin="round" stroke-linecap="round"${da}/>`},
    end:(x,y,c)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4.6" fill="${c}" stroke="#000" stroke-opacity=".6"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.7" fill="#04130a"/>`,
    /* no gold in the chart (gold = heads and #1): the $0 / 50% line, the round ticks and the start pad in the board's cream */
    base:{c:'#efe6c6',op:.55,w:1.4},
    tick:(x,y)=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.2" fill="#04130a" stroke="#efe6c6" stroke-opacity=".55" stroke-width="1.1"/>`,
    start:(x,y)=>`<circle cx="${x}" cy="${y.toFixed(1)}" r="5" fill="#efe6c6" stroke="#000" stroke-opacity=".5"/><circle cx="${x}" cy="${y.toFixed(1)}" r="1.9" fill="#04130a"/>`,
    div:()=>`<span class="s9-dvt h29e-dvt">Hit rate <b>▸</b> P&amp;L</span>`});
  const W=A.make('a4',st),af=W.after;
  W.after=(box,X)=>{af(box,X);
    /* svg words are labels (Shantell Sans); figures stay in the numbers face (Anton) */
    box.querySelectorAll('.s9-svg text').forEach(t=>{const x=t.textContent;
      if(x==='ROUND BY ROUND'){t.remove();return}/* the caption above says it (say each fact once) */
      if(/^\$100K ON EVERY TRADE/.test(x))t.textContent=x.charAt(0)+x.slice(1).toLowerCase().replace('100k','100K');
      if(/[a-z]{3,}/i.test(t.textContent)&&!/^R\d+$/.test(t.textContent)){t.setAttribute('font-family',"'Shantell Sans',system-ui");t.setAttribute('font-weight','800');t.setAttribute('letter-spacing','.02em')}});
    box.querySelectorAll('.s9a2-r').forEach(r=>{const n=(r.querySelector('.s9a2-nm')||{}).textContent||'';const m=Object.keys(COL).find(k=>S9.NM[k]===n.trim());if(m)r.dataset.m=m})};
  S9.mount(W);D.querySelector('#learn').classList.add('h29e-learn');return true}

/* ---------- 2 the bet: the spec's words in the narrator box ---------- */
function bet(){const sec=D.querySelector('#x2pSt.hb-on'),c=sec&&sec.querySelector('.hb5-c');if(!c)return false;
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):null;
  c.innerHTML=`<div class="h29e-nar h29e-nar-bet">${share!=null?`<small>${share}% of $EZ creator fees fill the pool</small>`:''}<span>We bet the pool on the NVIDIA trade of #1 on the board.</span></div>`;
  const cl=sec.querySelector('.hb5-cl');if(cl)cl.innerHTML='NVIDIA is the first bet, <b>not the last.</b>';
  sec.classList.add('h29e-bet');
  /* the B2 seam is placed by x2p_more's own ResizeObserver on .hb5-c; nudge it once the new box has its size */
  requestAnimationFrame(()=>D.querySelectorAll('#x2pSt .hb5-art').forEach(a=>a.__hbPlace&&a.__hbPlace()));return true}

/* ---------- 3 Follow for the next round ---------- */
/* the sockets board (media/p5-sockets.jpg, 1000-unit space as x2p_more's C1): the middle four glass tiles light with the next close's
   companies, the empty socket under each carries its name and ticker; the board bleeds off both sides */
const VB=[265,212,472,372],TX=[315,439,563,687],TY=304,SY=497;
function follow(){const P5=window.P5,main=D.querySelector('main');if(!P5||!P5.data||!D.querySelector('#x2pSt')||!window.X2P_LOGO)return false;
  if(D.getElementById('h29eFollow'))return true;
  const N=window.H29_NEXT()||{rs:[]},rs=N.rs.slice(0,4),more=N.rs.length-rs.length;
  const pct=(v,a,b)=>((v-a)/b*100).toFixed(2)+'%';
  const glow=rs.map((r,i)=>`<rect x="${TX[i]-43}" y="${TY-48}" width="86" height="96" rx="6" fill="url(#h29eLit)"/>`).join('');
  const lab=rs.length?rs.map(r=>`${r.co} (${r.ticker})`).join(', '):'';
  const sec=D.createElement('section');sec.id='h29eFollow';sec.className='sec h29e-fo';sec.setAttribute('aria-labelledby','h29eFoH');
  sec.innerHTML=`<h2 class="t4-h2 h29e-h" id="h29eFoH"><span class="t4-hw">Follow for</span> <span class="t4-hw">the next round</span></h2>
   <div class="h29e-mod">
    <div class="h29e-nar h29e-nar-fo"><small>Next close${more>0?` · +${more} more`:''}</small><span>${N.at?esc(N.label):'Date to come'}</span></div>
    <div class="h29e-bd">
     <svg class="h29e-sk" viewBox="${VB.join(' ')}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(lab?'The next close grades '+lab:'The next close: date to come')}">
      <defs><radialGradient id="h29eLit" cx=".5" cy=".42" r=".62"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".34"/><stop offset=".6" stop-color="#e8b83a" stop-opacity=".12"/><stop offset="1" stop-color="#e8b83a" stop-opacity="0"/></radialGradient></defs>
      <image href="media/p5-sockets.jpg" x="0" y="0" width="1000" height="1000" preserveAspectRatio="none"/>
      ${glow}<g class="h29e-lg">${rs.map((r,i)=>P5.litLogo(r.ticker,TX[i],TY,60)).join('')}</g>
     </svg>
     ${rs.map((r,i)=>`<span class="h29e-so" style="left:${pct(TX[i],VB[0],VB[2])};top:${pct(SY,VB[1],VB[3])}" aria-hidden="true"><b>${esc(r.co)}</b><i>${esc(r.ticker)}</i></span>`).join('')}
    </div>
   </div>
   <a class="h29e-x" href="${esc((window.CONFIG&&CONFIG.x)||'https://x.com/earningszn')}" target="_blank" rel="noopener">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5Z"/></svg>
    <span>Follow <b>@earningszn</b></span></a>
   <p class="h29e-xs">Every trade, straight to your X feed.</p>`;
  (D.getElementById('get')||D.querySelector('#x2pSt')).after(sec);
  /* the logos are tinted to the board's cream by P5.prepLogos; redraw them once they are ready */
  P5.prepLogos(rs.map(r=>r.ticker)).then(()=>{const g=sec.querySelector('.h29e-lg');if(g)g.innerHTML=rs.map((r,i)=>P5.litLogo(r.ticker,TX[i],TY,60)).join('')});
  return true}

/* ---------- the slim footer ---------- */
function foot(){const f=D.querySelector('body>footer, footer');if(!f||!window.X2P_LOGO)return false;if(f.querySelector('.h29e-ft'))return true;
  [...f.children].forEach(c=>c.style.display='none');f.classList.add('h29e-foot');
  f.insertAdjacentHTML('beforeend',`<div class="h29e-ft"><span class="h29e-lo" role="img" aria-label="EZ">${X2P_LOGO}</span><p>An experiment. $EZ isn’t live yet. Not financial advice.</p></div>`);return true}

/* ---------- the joints: one gutter device before each of this part's sections and the footer; the old strips go. The page's own
   order routines (x2plus.js BETSEC fix(), routes.js apply()) move #x2pSt to just before #get, so Follow sits after the hidden #get ---------- */
function place(){const g=D.getElementById('get'),fo=D.getElementById('h29eFollow'),st=D.getElementById('x2pSt');
  if(fo&&g&&g.nextElementSibling!==fo)g.after(fo);else if(fo&&!g&&st&&st.nextElementSibling!==fo)st.after(fo);
  D.querySelectorAll('.h29e-g').forEach(e=>e.remove());
  ['learn','x2pSt','get'].forEach(id=>{const s=D.getElementById(id);if(!s)return;let p=s.previousElementSibling;while(p&&p.classList.contains('g4-gut')){const q=p.previousElementSibling;p.remove();p=q}});
  if(g)g.classList.add('h29e-gone');
  [D.getElementById('learn'),st,fo,D.querySelector('footer')].forEach(s=>{if(!s)return;const p=s.previousElementSibling;if(p&&p.classList.contains('h29-gutter'))return;
    const d=D.createElement('div');d.className='h29-gutter h29e-g';d.setAttribute('aria-hidden','true');s.before(d)});
  desk()}
/* desktop (main.wrap a grid whose sections sit on fixed rows): a gutter takes its section's row and is lifted into the row gap above it */
function desk(){const m=D.querySelector('main.wrap');if(!m)return;const grid=getComputedStyle(m).display.includes('grid'),rg=parseFloat(getComputedStyle(m).rowGap)||0;
  D.querySelectorAll('main .h29e-g').forEach(g=>{const s=g.nextElementSibling,row=s&&getComputedStyle(s).gridRowStart;
    if(grid&&row&&row!=='auto'){g.style.gridRow=row;g.style.gridColumn='1 / -1';g.style.alignSelf='start';g.style.marginTop=g.style.marginBottom='0';g.style.transform=`translateY(calc(-50% - ${rg/2}px))`}
    else{g.style.gridRow=g.style.gridColumn=g.style.alignSelf=g.style.marginTop=g.style.marginBottom=g.style.transform=''}})}
addEventListener('resize',()=>{clearTimeout(desk.t);desk.t=setTimeout(desk,200)});

H.classList.add('h29e-on');
const done={};
(function wait(n){try{
  if(!done.sol)done.sol=sol();if(!done.bet)done.bet=bet();if(!done.fo)done.fo=follow();if(!done.ft)done.ft=foot();
  if(done.fo)place();
  if(done.sol&&done.bet&&done.fo&&done.ft){H.classList.add('h29e-ready');
    /* the page re-orders its sections and re-adds its g4 strips on some events: keep this part's order and joints */
    const m=D.querySelector('main');if(m){const mo=new MutationObserver(()=>{const fo=D.getElementById('h29eFollow'),g=D.getElementById('get'),ok=(e,want)=>e&&e.previousElementSibling&&e.previousElementSibling.classList.contains(want);
      if((g&&g.nextElementSibling!==fo)||!ok(D.getElementById('learn'),'h29-gutter')||!ok(D.getElementById('x2pSt'),'h29-gutter')||!ok(fo,'h29-gutter')){mo.disconnect();place();mo.observe(m,{childList:true})}});mo.observe(m,{childList:true})}return}
  if(n<240)setTimeout(()=>wait(n+1),250)}catch(e){window.__h29eErr=e;console.error('h29e',e)}})(0);
})();
