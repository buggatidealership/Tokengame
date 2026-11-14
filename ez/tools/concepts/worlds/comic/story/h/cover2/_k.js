/* Round H3 · cover2: every element of the first screen handmade. Shared builder for takes K1 to K5, laid over the built X3+ page after round H's CV (cover/_c.js).
   Painted objects are Hedra cut-outs (blank faces); the true AI marks (MODELS[m].d) and company logo files are placed into them here, in code.
   Words and numbers are page text. Every number comes from the page's data (CV: ROUNDS, PENDING, __x2pPnl, the New York clock). */
window.K=(function(){
  const C=window.CV,S=C.S,esc=C.esc,D=document;
  const IMG='tools/concepts/worlds/comic/story/h/cover2/img/',CUT=IMG+'cut/',OLD='tools/concepts/worlds/comic/story/h/cover/img/';
  /* the blank face of each painted object, measured with field.py (centre x, y, width, height in % of the cut-out) */
  const F={'k1-sign':[50.6,65,52,44],'k1-coin':[50,50,66,66],'k1-gear':[50,50,48,48],'k1-plate':[50,50,84,64],'k1-ledger':[50,46,82,70],
    'k2-seal':[50,50,58,58],'k2-bill':[49.7,49.7,70,74],'k2-stub':[53,49.5,78,70],'k3-pin':[50,49.5,70,70],'k3-patch':[50,50,72,72],'k3-clock':[49.6,60.2,75.5,56],
    'k3-ticket':[40.8,49.5,58,70],'k3-tape':[50,49,88,62],'k3-cards':[63,47.5,50,80],'k4-target':[50,49.4,60,60],'k4-board':[50,50.2,72,68],'k4-plank':[49,49,88,80],
    'k4-record':[49.7,56,72,54],'k5-rosette':[49.3,50,46,46],'k5-sign':[49.7,49.1,70,70],'k5-clock':[49.8,59.6,63.5,50],'k5-banner':[49.7,36,64,66],'k5-ticket':[45,50,70,64],'k5-stack':[51,49,54,80],
    'clock2':[50,50,58,58],'ticket':[58,50,60,46]};
  const src=n=>n==='clock2'||n==='ticket'||n==='bell2'||n==='clapper'?OLD+'cut/'+n+'.webp':CUT+n+'.webp';
  /* a painted object with something set into its face */
  const obj=(n,inner,cls,tag)=>{const f=F[n]||[50,50,70,70],t=tag||'span';return `<${t} class="ko ko-${n} ${cls||''}" style="--fx:${f[0]}%;--fy:${f[1]}%;--fw:${f[2]}%;--fh:${f[3]}%"><img class="ko-i" src="${src(n)}" alt="" draggable="false"><span class="ko-f">${inner||''}</span></${t}>`};
  /* the true AI mark (MODELS path), drawn in a finish: stamp (struck brass), enamel (cloisonne), wax (pressed), paint (hand painted), paper (cut paper) */
  let uid=0;
  const mark=(m,kind)=>{const d=window.MODELS[m].d,c=S.col(m),id='km'+(++uid);const ink=m==='GROK'?'#1b181c':c;
    const P=(cls,tr)=>`<path class="${cls}" d="${d}"${tr?` transform="${tr}"`:''}/>`;
    const body={
      stamp:`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6b4508"/><stop offset=".55" stop-color="#9a6a12"/><stop offset="1" stop-color="#d9a332"/></linearGradient></defs>${P('kmk-lo','translate(.45 .55)')}${P('kmk-hi','translate(-.35 -.4)')}<path d="${d}" fill="url(#${id})"/>`,
      enamel:`${P('kmk-cl')}<path d="${d}" fill="${ink}"/>${P('kmk-gl','translate(-.25 -.3)')}`,
      wax:`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#e2ad3a"/><stop offset="1" stop-color="#9a6a12"/></linearGradient></defs>${P('kmk-lo','translate(.45 .55)')}${P('kmk-hi','translate(-.35 -.4)')}<path d="${d}" fill="url(#${id})"/>`,
      paint:`<filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" seed="${uid}"/><feDisplacementMap in="SourceGraphic" scale=".7"/></filter><g filter="url(#${id})"><path d="${d}" fill="${ink}"/>${P('kmk-pt')}</g>`,
      paper:`${P('kmk-ps','translate(.7 .9)')}<path d="${d}" fill="${ink}"/>${P('kmk-pe')}`,
    }[kind||'enamel'];
    return `<svg class="kmk kmk-${kind}" viewBox="-1 -1 26 26" role="img" aria-label="${esc(S.NM[m])}">${body}</svg>`};
  /* the company's own logo file, set into a face (multiply on light grounds, a dark plate for logos made for dark grounds) */
  const logo=t=>{const lg=S.logo(t);return lg?`<img class="klg${S.L(t).dark?' klg-dk':''}" src="${lg}" alt="${esc(S.tk(t))}">`:`<b class="klg-tx">${esc(S.tk(t))}</b>`};
  /* live clock hands at New York's time, for a face whose centre is the svg's centre; red pip at 4 PM */
  const hands=(cls)=>{const id='kh'+(++uid);C.every(()=>{const e=D.getElementById(id);if(!e)return;const n=C.ny();e.style.setProperty('--ha',(((n.h%12)+n.m/60)*30)+'deg');e.style.setProperty('--ma',((n.m+n.s/60)*6)+'deg');e.style.setProperty('--sa',(n.s*6)+'deg')});
    return `<svg class="kzh ${cls||''}" id="${id}" viewBox="0 0 100 100" role="img" aria-label="New York time now; the red mark is the 4 PM close"><g class="kh-4" transform="rotate(120 50 50)"><path d="M50 5v9"/></g>
      <g class="kh-h"><path class="kh-o" d="M50 58V26"/><path class="kh-in" d="M50 56V28"/></g><g class="kh-m"><path class="kh-o" d="M50 60V10"/><path class="kh-in" d="M50 58V12"/></g><g class="kh-s"><path d="M50 64V8"/><circle cx="50" cy="12" r="2.6"/></g><circle class="kh-c" cx="50" cy="50" r="4.2"/><circle cx="50" cy="50" r="1.6" fill="#fdbc2a"/></svg>`};
  /* a hand-tuned speech balloon holding one call: up (green), down (red), or ? while the calls are not in */
  const R=s=>()=>{s=(s*16807)%2147483647;return s/2147483647};
  const balloon=(c,i,side)=>{const r=R(11+i*13),j=()=>(r()-.5)*3;const fill=c.q?'#fff3d6':c.up?'#2bd27a':'#ff4a3d',sh=c.q?'#e2cfa3':c.up?'#14904f':'#b8231b';
    const tail=side==='r'?'M44 30 L58 40 L40 34':'M16 30 L2 40 L20 34';
    const b=`M${8+j()} ${6+j()} Q30 ${-2+j()} ${52+j()} ${7+j()} Q${60+j()} 20 ${51+j()} ${32+j()} Q30 ${38+j()} ${9+j()} ${32+j()} Q${0+j()} 20 ${8+j()} ${6+j()}Z`;
    const glyph=c.q?`<text x="30" y="27" text-anchor="middle" class="kb-q">?</text>`:`<path class="kb-a" d="${c.up?'M30 9 L40 26 L20 26Z':'M30 29 L20 12 L40 12Z'}"/>`;
    return `<svg class="kbl kbl-${side}" viewBox="-3 -5 66 50" role="img" aria-label="${esc(S.NM[c.m])}: ${c.q?'call not in yet':c.up?'up':'down'}"><path d="${b} ${tail}" transform="translate(2.5 3)" fill="#15121a"/><path d="${tail}" fill="${fill}" stroke="#15121a" stroke-width="2.6" stroke-linejoin="round"/><path d="${b}" fill="${fill}"/><path d="M6 20 Q30 34 54 18 L54 40 L6 40Z" fill="${sh}" clip-path="path('${b}')" opacity=".55"/><path d="${b}" fill="none" stroke="#15121a" stroke-width="2.6" stroke-linejoin="round"/><path d="M13 10 Q20 6 27 7" stroke="#fff" stroke-width="2" stroke-linecap="round" fill="none" opacity=".7"/>${glyph}</svg>`};
  /* hand-tuned arrow: a curved band with a two-tone fill, a light edge, thick outer ink and a thin inner line. --a1/--a2 colour it */
  const arrow=(i,cls)=>{const r=R(5+i*7),j=()=>(r()-.5)*2.4;const id='ka'+(++uid);
    const top=`M4 ${16+j()} Q26 ${8+j()} 44 ${12+j()}`,bot=`Q26 ${22+j()} 4 ${27+j()}`;const d=`${top} L43 ${5+j()} L62 ${18+j()} L43 ${32+j()} L44 ${24+j()} ${bot}Z`;
    return `<svg class="kar kar${i} ${cls||''}" viewBox="-2 -2 70 40" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" class="ka-s1"/><stop offset="1" class="ka-s2"/></linearGradient></defs>
      <path d="${d}" transform="translate(2.2 2.8)" fill="#15121a"/><path d="${d}" fill="url(#${id})"/><path class="ka-hl" d="M8 ${18} Q26 ${12} 42 ${15}"/><path d="${d}" fill="none" stroke="#15121a" stroke-width="2.6" stroke-linejoin="round"/></svg>`};
  /* a live lamp: a hand-drawn glass bulb, red and breathing on air, gold off air */
  const lamp=()=>`<svg class="klp ${C.onAir()?'on':'off'}" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="11" fill="#15121a"/><circle class="klp-g" cx="15" cy="15" r="8.4"/><path d="M9.5 12.5 Q12 8.5 16 8.5" stroke="#fff" stroke-width="2.2" stroke-linecap="round" fill="none" opacity=".75"/></svg>`;
  /* ---- the four steps ---- */
  const STEP=['They call the move <b>before</b> earnings','The market close grades every call','Top P&amp;L gets the golden ticket','Every call stays on the public record'];
  const fightNow=()=>{const f=C.fight();return f};
  /* build a take: cfg.id, cfg.bg {p,d} (img or video), cfg.parts = functions returning html for each element */
  const build=(id,P)=>{const m=C.mount('k'+id);if(!m)return null;const {cv,h1,film}=m;cv.classList.add('kx','kx-'+id);D.documentElement.classList.add('kx-on','kx-'+id+'-on');
    const L=C.left(),ldr=C.lead;
    const live=`<span class="kis-l">${lamp()}<b>${C.onAir()?'Live now':'Season 1 · live'}</b><small>${!L?'Next calls soon':L.locked?`${L.n} round${L.n>1?'s':''} locked · graded ${esc(C.closeDay())} at the close`:`${L.n} report${L.n>1?'s':''} ${esc(C.closeDay())} · calls go in before`}</small></span>`;
    const no=`<span class="kis-n"><small>No.</small><b>${C.tot.g}</b><small>rounds graded</small></span>`;
    const bell=`<span class="kis-b"><small>Bell in</small>${C.cdown()}<small>${esc(C.closeDay())} · 4 PM New York</small></span>`;
    const star=`<div class="kst"><span class="kst-h">${P.starH?P.starH():'<b>Starring</b>'}</span><ul class="kst-l">${S.STAR.map(mm=>`<li class="kst-m${mm===ldr?' is-ld':''}">${P.token(mm,'kst-t')}<b class="kst-n">${esc(S.NM[mm])}</b></li>`).join('')}</ul></div>`;
    const f=fightNow();
    const pic1=f?`<span class="kp1">${P.company(f.t,f.co)}${f.calls.map((c,i)=>`<span class="kp1-c kp1-c${i}">${P.token(c.m,'kp1-t')}${balloon(c,i,i%2?'l':'r')}</span>`).join('')}</span>`:'';
    const pics=[pic1,P.grade(),P.ticket(ldr),P.record(C.tot.g)];
    const loop=`<ol class="klp-l" aria-label="How every round goes">${pics.map((pc,i)=>`<li class="ks ks${i}">${P.num(i+1)}${P.cap(STEP[i],i)}<span class="ks-p">${pc}</span></li>`).join('')}</ol>${[0,1,2,3].map(i=>P.arrow?P.arrow(i):arrow(i,'kar-'+id)).join('')}`;
    const bg=P.bg||{};
    const bgh=(bg.p?`<${bg.v?'video':'img'} class="kbg kbg-p" src="${bg.p}" ${bg.v?`poster="${bg.pp}" muted autoplay loop playsinline`:'alt=""'} aria-hidden="true">${bg.v?'</video>':''}`:'')+(bg.d?`<${bg.v?'video':'img'} class="kbg kbg-d" src="${bg.d}" ${bg.v?`poster="${bg.dp}" muted autoplay loop playsinline`:'alt=""'} aria-hidden="true">${bg.v?'</video>':''}`:'');
    cv.innerHTML=`<div class="kart">${bgh}<div class="kis">${P.issue(live,no,bell)}</div><div class="khd"></div>${star}${P.hero?`<div class="khero">${P.hero(ldr)}</div>`:''}<div class="kloop">${loop}${P.centre?`<div class="kctr">${P.centre()}</div>`:''}</div>
      <div class="kfm"></div><div class="kbt">${P.button()}</div></div>`;
    h1.innerHTML=`<span class="cv-k kh-k">${C.letter('4 AI')}<span class="wc-lc">s</span></span><span class="cv-bigw kh-bw">${C.letter('Trade','cv-big kh-w')} ${C.letter('earnings','cv-big kh-w')}</span><span class="kh-qw">${P.q?P.q('Who calls it best?'):`<span class="kh-q">Who calls it best?</span>`}</span>`;
    cv.querySelector('.khd').append(h1);cv.querySelector('.kfm').append(film);
    /* the button: the page's own handoff, scrolling to Meet the models */
    const b=cv.querySelector('.kbt .kbtn');if(b)b.addEventListener('click',e=>{e.preventDefault();const t=D.querySelector('#wc-book .wc-cast,#wc-book [class*="cast"]');if(t)t.scrollIntoView({behavior:'smooth'})});
    /* the picked film frame: F3, through the page (round H chrome) */
    try{D.documentElement.classList.add('chx','ch-f3');window.__kF3&&window.__kF3()}catch(e){window.__kErr=String(e)}
    window.__kCheck={take:id,lead:ldr,graded:C.tot.g,fight:f&&f.t,calls:f&&f.calls.map(c=>c.m+(c.q?'?':c.up?'+':'-')).join(' '),left:C.leftTxt(),next:L&&L.day};
    return cv};
  const done=()=>C.ready();
  return {IMG,CUT,F,obj,mark,logo,hands,balloon,arrow,lamp,build,done,R,esc,C,S}})();
