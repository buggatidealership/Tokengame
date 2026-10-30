/* z3 · "EARNINGS ZEASON, the Saturday-morning race show": the X3+ Overview redrawn as a 90s cartoon race show.
   Every AI is a cartoon racer whose face shows its real state; every round is an episode; up or down is a fork in the road.
   Reads only the page's globals (ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, FILMS, __x2pPnl). Laid over the built page. */
(()=>{const D=document,W=window;
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const LAB={GPT:'us',KIMI:'cn',CLAUDE:'us',GROK:'us'};
const BODY={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#2b2733'};
const INK='#15121a',CREAM='#fff6dc';
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const kS=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1).replace(/\.0$/,'')+'K':Math.round(Math.abs(v)));
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const coLogo=t=>{const c=(W.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const coCol=t=>((W.CO_LOGOS||{})[t]||{}).c||'#e9ddbf';
const coDark=t=>!!((W.CO_LOGOS||{})[t]||{}).dark;
const film=n=>{const f=(W.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const winners=r=>r.win&&!/NO WIN/i.test(r.win)?r.win.split(' & '):[];
const mdyKey=s=>{if(!s)return 9e9;const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const tKey=()=>{const t=nyToday();return t[2]*1e4+t[0]*100+t[1]};
const dayName=s=>{const [m,d,y]=s.split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,d)).toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric',timeZone:'UTC'})};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
/* each exchange's close, as the page counts it */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
function bellTxt(t,mdy){const at=closeAt(t,mdy);if(at==null)return 'Date to come';const ms=at-Date.now();if(ms<=0)return 'Bell rung · results soon';const mn=Math.round(ms/6e4),h=Math.floor(mn/60);
  return 'Bell in '+(h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m')}
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=W.SIM||{},C=W.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(W.UPCOMING||[],W.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}

/* ---------- the cast: one cartoon racer per AI, its face set by its own record ---------- */
const P=W.__x2pPnl().A;
const R=(W.ROUNDS||[]).slice();
const rank=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl);
const lead=rank[0];
function streak(m){const s=P[m].seq||[];if(!s.length)return {k:'',n:0};const k=s[s.length-1];let n=0;for(let i=s.length-1;i>=0&&s[i]===k;i--)n++;return {k,n}}
/* mood: what the face shows. #1 and right last time: smug. 3+ wrong in a row: panic. 3+ right in a row: fired up. Right last time: happy. Else worried. */
function mood(m){const s=streak(m);if(m===lead&&s.k==='W')return 'smug';if(s.k==='L'&&s.n>=3)return 'panic';if(s.k==='W'&&s.n>=3)return 'fired';return s.k==='W'?'happy':'worried'}
const MOODWORD={smug:'Smug',panic:'Sweating',fired:'On fire',happy:'Grinning',worried:'Worried'};
/* what each racer says on the track: the reason behind its face, in its own words */
function why(m){const s=streak(m),n=s.n;
  if(m===lead)return s.k==='W'?'Golden ticket\u2019s mine.':'Still got the golden ticket.';
  if(n>=3)return n+(s.k==='W'?' right in a row!':' wrong in a row\u2026');
  return s.k==='W'?'Right last time!':'Wrong last time\u2026'}

function flagSVG(c,x,y,w,h){ /* a small waving pennant: US or China, drawn flat */
  if(c==='cn')return `<g transform="translate(${x} ${y})"><path class="z3-pn" d="M0 0 Q${w*.5} ${-h*.18} ${w} 0 L${w} ${h} Q${w*.5} ${h*.82} 0 ${h}Z" fill="#de2910" stroke="${INK}" stroke-width="1.6"/><path d="M${w*.2} ${h*.2} l1.6 4.6 -4.2 -2.8h5.2l-4.2 2.8z" fill="#ffde00"/></g>`;
  let st='';for(let i=0;i<4;i++)st+=`<path d="M0 ${i*h/3.5+h/7} Q${w*.5} ${i*h/3.5+h/7-h*.18} ${w} ${i*h/3.5+h/7}" stroke="#b22234" stroke-width="${h/9}" fill="none"/>`;
  return `<g transform="translate(${x} ${y})"><path class="z3-pn" d="M0 0 Q${w*.5} ${-h*.18} ${w} 0 L${w} ${h} Q${w*.5} ${h*.82} 0 ${h}Z" fill="#fff" stroke="${INK}" stroke-width="1.6"/>${st}<path d="M0 0 Q${w*.22} ${-h*.08} ${w*.45} ${-h*.08} L${w*.45} ${h*.5} L0 ${h*.52}Z" fill="#3c3b6e"/></g>`}

/* the racer, side view, nose to the right. o: {pen: show the lab's pennant, tix: carries the golden ticket, mood} */
function car(m,o){o=o||{};const M=W.MODELS[m],b=BODY[m],md0=o.mood||mood(m),id='z3c'+Math.random().toString(36).slice(2,7);
  const lid=md0==='smug'?`<path d="M79.5 30 a8.5 10.5 0 0 1 17 0 Z" fill="${b}" stroke="${INK}" stroke-width="2.4"/><path d="M96 33 a8.5 10.5 0 0 1 17 0 Z" fill="${b}" stroke="${INK}" stroke-width="2.4"/>`:'';
  const pr=md0==='panic'?1.8:md0==='worried'?2.8:3.8,pdy=md0==='smug'?3.4:md0==='worried'?-1.5:0.8;
  const brow={smug:`<path d="M79 16 q8 -6 16 -1" /><path d="M97.5 20 q7 -2 14 2"/>`,
    fired:`<path d="M79 14 l16 6"/><path d="M97.5 21 l15 -5"/>`,
    happy:`<path d="M80 16 q8 -5 15 0"/><path d="M97.5 19 q7 -5 15 0"/>`,
    worried:`<path d="M80 20 l15 -6"/><path d="M97.5 14 l15 6"/>`,
    panic:`<path d="M80 21 l15 -9"/><path d="M97.5 12 l15 9"/>`}[md0];
  const mouth={smug:`<path d="M100 51 q10 6 21 -4" fill="none" stroke="${INK}" stroke-width="3.2" stroke-linecap="round"/><path d="M119 44 l3 4" stroke="${INK}" stroke-width="2.4" stroke-linecap="round"/>`,
    happy:`<path d="M100 47 q11 16 23 -1 z" fill="${INK}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M105 53 q6 4 12 0 l-1.5 4 q-4.5 2 -9 0z" fill="#e8546b"/>`,
    fired:`<path d="M99 47 l24 -3 q-3 14 -13 14 q-9 0 -11 -11z" fill="#fff" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/><path d="M100 51.5 l21 -2.4" stroke="${INK}" stroke-width="1.6"/>`,
    worried:`<path d="M101 54 q3 -4 6 0 t6 0 t6 0" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>`,
    panic:`<rect x="100" y="46" width="22" height="11" rx="3" fill="#fff" stroke="${INK}" stroke-width="2.6"/><path d="M105.5 46v11M111 46v11M116.5 46v11M100 51.5h22" stroke="${INK}" stroke-width="1.4"/>`}[md0];
  const sweat=(md0==='worried'||md0==='panic')?`<path class="z3-sw" d="M122 12 q-5 8 0 10 q5 -2 0 -10z" fill="#7fd3ff" stroke="${INK}" stroke-width="1.6"/>`+(md0==='panic'?`<path class="z3-sw z3-sw2" d="M76 12 q-4.4 7 0 9 q4.4 -2 0 -9z" fill="#7fd3ff" stroke="${INK}" stroke-width="1.4"/>`:''):'';
  const fire=md0==='fired'?`<g class="z3-fire"><path d="M10 54 q-14 -6 -22 2 q8 -1 9 3 q-9 1 -12 7 q10 -4 25 -4z" fill="#ff7a1a" stroke="${INK}" stroke-width="1.6"/><path d="M8 56 q-8 -2 -12 1 q5 1 4 3 q6 -2 8 -1z" fill="#ffd23f"/></g>`:'';
  const pen=o.pen?`<path d="M26 36 L22 4" stroke="${INK}" stroke-width="2"/>${flagSVG(LAB[m],22,3,20,13)}`:'';
  const tix=o.tix?`<g class="z3-gtk" transform="translate(52 6) rotate(-8)"><rect x="0" y="0" width="30" height="17" rx="2" fill="url(#${id}g)" stroke="${INK}" stroke-width="1.8"/><circle cx="0" cy="8.5" r="3" fill="${b}" stroke="${INK}" stroke-width="1.2"/><circle cx="30" cy="8.5" r="3" fill="${b}" stroke="${INK}" stroke-width="1.2"/><path d="M7 5h16M7 9h16M7 13h10" stroke="#7a5200" stroke-width="1.4"/><path class="z3-gl" d="M4 17 L14 0 L19 0 L9 17z" fill="#fff" opacity=".7"/></g><path d="M66 22 v-2" stroke="${INK}" stroke-width="2"/>`:'';
  const logo=`<circle cx="56" cy="48" r="11.5" fill="${CREAM}" stroke="${INK}" stroke-width="2.4"/><svg x="47.5" y="39.5" width="17" height="17" viewBox="0 0 24 24"><path d="${M.d}" fill="${m==='GROK'?INK:M.c}" ${M.fr?'fill-rule="evenodd"':''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}</svg>`;
  return `<svg class="z3-car z3-m-${md0}" viewBox="-14 0 144 78" role="img" aria-label="${NM[m]}, ${MOODWORD[md0].toLowerCase()}"><defs><linearGradient id="${id}g" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#fff0a8"/><stop offset=".45" stop-color="#fdbc2a"/><stop offset="1" stop-color="#c98a0b"/></linearGradient></defs>
    <ellipse cx="66" cy="73" rx="52" ry="4" fill="${INK}" opacity=".22"/>${fire}${pen}
    <g class="z3-bd">${tix}
      <path d="M10 60 C5 59 5 47 11 45 L36 42 C40 28 52 19 68 19 L82 19 C93 19 100 28 104 40 L116 42 C124 44 127 51 125 58 C124 61 121 63 117 63 L14 63 C11 63 10 62 10 60Z" fill="${b}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M44 41 C47 30 56 24 66 24 L76 24" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round"/>
      <path d="M14 47 h14" stroke="${INK}" stroke-width="2" stroke-linecap="round" opacity=".5"/>
      ${logo}
      <ellipse cx="88" cy="30" rx="8.5" ry="10.5" fill="#fffbea" stroke="${INK}" stroke-width="2.6"/><ellipse cx="104.5" cy="33" rx="8.5" ry="10.5" fill="#fffbea" stroke="${INK}" stroke-width="2.6"/>
      <g class="z3-pu"><circle cx="91" cy="${31+pdy}" r="${pr}" fill="${INK}"/><circle cx="107.5" cy="${34+pdy}" r="${pr}" fill="${INK}"/></g>${lid}
      <g fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round">${brow}</g>${mouth}${sweat}
      <path d="M10 58 h-7" stroke="${INK}" stroke-width="4.5" stroke-linecap="round"/>
    </g>
    <g class="z3-wh"><circle cx="32" cy="63" r="11" fill="${INK}"/><circle cx="32" cy="63" r="4.5" fill="${CREAM}"/><path d="M32 54v4" stroke="${CREAM}" stroke-width="2"/></g>
    <g class="z3-wh"><circle cx="104" cy="63" r="11" fill="${INK}"/><circle cx="104" cy="63" r="4.5" fill="${CREAM}"/><path d="M104 54v4" stroke="${CREAM}" stroke-width="2"/></g>
  </svg>`}
/* a small round face for lists: the model's mark on its colour, grinning or sweating */
function chip(m,res){const M=W.MODELS[m];
  const f=res==='W'?`<path d="M7 15.5 q5 5 10 0" fill="none" stroke="${INK}" stroke-width="2" stroke-linecap="round"/><circle cx="8.6" cy="10" r="1.5" fill="${INK}"/><circle cx="15.4" cy="10" r="1.5" fill="${INK}"/>`
    :res==='L'?`<path d="M7.5 17 q2 -2 4.5 0 t4.5 0" fill="none" stroke="${INK}" stroke-width="1.8" stroke-linecap="round"/><circle cx="8.6" cy="10.5" r="1.3" fill="${INK}"/><circle cx="15.4" cy="10.5" r="1.3" fill="${INK}"/><path d="M19.5 3.5 q-2.4 3.4 0 4.6 q2.4 -1.2 0 -4.6z" fill="#7fd3ff" stroke="${INK}" stroke-width="1"/>`:'';
  return `<i class="z3-ch z3-ch-${res||'n'}" aria-hidden="true">${res?`<svg viewBox="0 0 24 24">${f}</svg>`:`<svg viewBox="0 0 24 24"><path d="${M.d}" fill="${m==='GROK'?INK:M.c}" ${M.fr?'fill-rule="evenodd"':''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}</svg>`}</i>`}
function mark(m,cls){const M=W.MODELS[m];return `<i class="z3-mk ${cls||''}" style="--mc:${BODY[m]}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}" fill="${m==='GROK'?INK:M.c}" ${M.fr?'fill-rule="evenodd"':''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}</svg></i>`}
/* the kart token for tiny spots: a little car in the model's colour, its mark on the door */
function kart(m){const M=W.MODELS[m];return `<svg class="z3-kt" viewBox="0 0 44 30" aria-hidden="true"><path d="M4 22 C2 16 6 13 10 13 L14 12 C17 6 28 5 33 10 L38 13 C42 14 43 18 42 22Z" fill="${BODY[m]}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/><circle cx="12" cy="23" r="5" fill="${INK}"/><circle cx="34" cy="23" r="5" fill="${INK}"/><circle cx="23" cy="16" r="6.4" fill="${CREAM}" stroke="${INK}" stroke-width="1.6"/><svg x="18.2" y="11.2" width="9.6" height="9.6" viewBox="0 0 24 24"><path d="${M.d}" fill="${m==='GROK'?INK:M.c}" ${M.fr?'fill-rule="evenodd"':''}/></svg></svg>`}

/* episode titles, cartoon style, told by the move itself */
function epTitle(r){const x=Math.abs(r.a),up=r.a>0,c=r.co;
  if(x<1.5)return up?c+' barely budges':c+' barely blinks';
  if(x<4)return up?c+' pops':c+' slips';
  if(x<8)return up?c+' zooms':c+' crashes';
  return up?c+' blasts off':c+' falls off a cliff'}
function sfx(a){const x=Math.abs(a),up=a>0;if(x<1.5)return up?'blip':'tick';if(x<4)return up?'POP!':'THUD!';if(x<8)return up?'ZOOM!':'CRASH!';return up?'KA-POW!':'KA-BOOM!'}

/* ---------- 1. Opening titles ---------- */
const N=R.length;
const head=(()=>{const h=D.querySelector('.wc-cover h1');return h?h.textContent.replace(/\s+/g,' ').trim():'4 AIs trade earnings to run our buybacks.'})();
function bouncy(t,cls){return t.split(' ').map((w,i)=>`<span class="z3-bw ${cls||''}" style="--r:${[-3,2.5,-1.5,3,-2,1.5][i%6]}deg;--y:${[0,-3,2,-2,1,-1][i%6]}px">${esc(w)}</span>`).join(' ')}
const cover=`<section class="z3-open" aria-label="Opening titles">
  <div class="z3-sky" aria-hidden="true"><i class="z3-mesa z3-mesa1"></i><i class="z3-mesa z3-mesa2"></i><i class="z3-cl z3-cl1"></i><i class="z3-cl z3-cl2"></i></div>
  <p class="z3-on"><span class="z3-onl">Season 1</span><span>${N} races run</span></p>
  <h1 class="z3-ttl"><span class="z3-l1">${bouncy('4 AIs trade earnings')}</span><span class="z3-l2">${bouncy('to run our buybacks.','z3-gold')}</span></h1>
  <p class="z3-tag">They race to call stock moves before earnings. The market close says who was right.</p>
  <div class="z3-grid" aria-label="Starring GPT, Claude, Grok and Kimi">${['GPT','CLAUDE','GROK','KIMI'].map((m,i)=>`<figure class="z3-st" style="--i:${i}">${car(m,{mood:'happy'})}<figcaption>${NM[m]}</figcaption></figure>`).join('')}<span class="z3-strl">Starring</span></div>
  <div class="z3-tv"><div class="z3-ant" aria-hidden="true"><i></i><i></i></div>
    <div class="z3-cab"><p class="z3-tvt">How it works <b>1:20</b></p><div class="z3-scr" id="z3scr"></div>
      <div class="z3-kn" aria-hidden="true"><i></i><i></i><span>CH<br>EZ</span></div></div></div>
</section>`;

/* ---------- 2. One race, start to finish (a storyboard sheet) ---------- */
function exampleRound(){const one=x=>{const up=x.a>0;return x.calls.filter(c=>{const k=call(c[1]);return k&&k.up===up}).length===1&&winners(x).length===1};
  const fs=R.filter(x=>film(x.n)).sort((a,b)=>(mdyKey(b.resolves)*1e3+b.n)-(mdyKey(a.resolves)*1e3+a.n));return fs.find(one)||fs[0]}
const ex=exampleRound();
function storyboard(r){if(!r)return '';const up=r.a>0,Wn=winners(r),f=film(r.n),lg=coLogo(r.ticker);
  const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);const c=row&&call(row[1]);return c?{m,c,ok:c.up===up,off:+row[2],win:Wn.includes(m),v:((P[m].per||{})[r.n]||{}).v||0}:null}).filter(Boolean);
  const right=cs.filter(x=>x.ok),wrong=cs.filter(x=>!x.ok);
  /* panel 1: the starting grid, each racer shouting its call */
  const p1=`<li class="z3-sb z3-sb1"><div class="z3-sbp z3-grid1">
      <div class="z3-sbh">${lg?`<img src="${lg}" alt=""${coDark(r.ticker)?' class="z3-dk"':''}>`:''}<b>${esc(r.co)}</b><span class="z3-lock">Locked ${md(r.called)}</span></div>
      <div class="z3-g4">${cs.map((x,i)=>`<div class="z3-gs" style="--i:${i}"><p class="z3-bb ${x.c.up?'z3-up':'z3-dn'}"><small>${NM[x.m]}</small>${x.c.up?'▲ Up':'▼ Down'} ${x.c.v}%</p>${car(x.m,{mood:'happy'})}</div>`).join('')}</div>
      <i class="z3-chk" aria-hidden="true"></i></div>
    <p class="z3-note"><b>Sc. 1</b> On your marks. Before earnings, each AI calls the move.</p></li>`;
  const p2=`<li class="z3-sb z3-sb2"><div class="z3-sbp z3-sbtv"><div class="z3-mini"><video class="z3-v" muted playsinline preload="none" poster="${f?f.p:''}">${f?`<source src="${f.v}" type="video/mp4">`:''}</video>
      <button type="button" class="z3-play" aria-label="Play the ${esc(r.co)} film"><i></i></button></div>
      <span class="z3-sfx ${up?'z3-up':'z3-dn'}" aria-hidden="true"><em>${sfx(r.a)}</em><b>${up?'▲ +':'▼ −'}${pct(r.a)}</b></span></div>
    <p class="z3-note"><b>Sc. 2</b> ${esc(r.co)} reports. At the close the stock is ${up?'up':'down'} ${pct(r.a)}.</p></li>`;
  /* panel 3: the fork in the road. The close opens one branch; the other ends in a wall. */
  const slotsR=right.map((x,i)=>x),slotsW=wrong;
  const roadUp=up?'z3-open-r':'z3-shut-r',roadDn=up?'z3-shut-r':'z3-open-r';
  const best=right.slice().sort((a,b)=>a.off-b.off)[0];
  const place=(arr,isUp)=>{const ord=arr.slice().sort((p,q)=>(q.ok?q.off:0)-(p.ok?p.off:0));return ord.map((x,i)=>{const n=ord.length,a=x.ok?.3:.14,b=x.ok?.9:.84,t=n===1?(x.ok?.72:.84):a+i*((b-a)/(n-1));return {x,t,isUp,front:i===n-1}})};
  const cars=[...place(cs.filter(x=>x.c.up),true),...place(cs.filter(x=>!x.c.up),false)];
  const p3=`<li class="z3-sb z3-sb3"><div class="z3-sbp z3-fork" tabindex="0" role="button" aria-label="Replay the grading">
      <svg class="z3-fk" viewBox="0 0 340 230" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
        <rect width="340" height="230" fill="#9ed8a0"/><path d="M0 0H340V64Q250 50 170 78T0 74Z" fill="#8fd3f4"/>
        <path class="z3-rd ${roadUp}" d="M-10 125 L100 125 L345 30" />
        <path class="z3-rd ${roadDn}" d="M-10 125 L100 125 L345 215" />
        <path d="M-10 125 L96 125" stroke="#fff6dc" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
        <g class="z3-wall" transform="translate(318 ${up?205:40}) rotate(${up?20:-21})"><rect x="-6" y="-26" width="12" height="52" fill="#ff6158" stroke="${INK}" stroke-width="2.4"/><path d="M-6 -16 l12 -8M-6 0 l12 -8M-6 16 l12 -8" stroke="#fff" stroke-width="3"/></g>
        <g transform="translate(52 12)"><path d="M0 18 V96" stroke="${INK}" stroke-width="3.4"/>
          <g class="z3-clo"><rect x="-44" y="0" width="88" height="34" rx="4" fill="${INK}" stroke="${INK}" stroke-width="2"/><text x="0" y="13" class="z3-clt">THE CLOSE</text><text x="0" y="29" class="z3-clv ${up?'z3-up':'z3-dn'}">${up?'▲ +':'▼ −'}${pct(r.a)}</text></g>
          <g class="z3-ar ${up?'z3-lit':''}"><path d="M-30 40 h48 l9 9 -9 9 h-48z" stroke="${INK}" stroke-width="2.2"/><text x="-6" y="53" class="z3-sgt">▲ UP</text></g>
          <g class="z3-ar ${up?'':'z3-lit'}"><path d="M-30 62 h48 l9 9 -9 9 h-48z" stroke="${INK}" stroke-width="2.2"/><text x="-6" y="75" class="z3-sgt">▼ DOWN</text></g></g>
      </svg>
      ${cars.map(({x,t,isUp,front},i)=>{const x0=-14,y0=125,xe=100+t*228,ye=125+(isUp?-(xe-100)*95/245:(xe-100)*90/245);
        const ok=x.ok,ang=isUp?-21.2:20.2;
        return `<div class="z3-fc ${ok?'z3-ok':'z3-no'} ${best&&best.m===x.m?'z3-best':''}" style="--x0:${(x0/340*100).toFixed(2)}%;--y0:${(y0/230*100).toFixed(2)}%;--x1:${(xe/340*100).toFixed(2)}%;--y1:${(ye/230*100).toFixed(2)}%;--a:${ang}deg;--d:${i*260}ms">
          <div class="z3-fcc">${car(x.m,{mood:ok?(best&&best.m===x.m?'smug':'happy'):'panic'})}</div>
          <b class="z3-pf">${ok?'PASS':'FAIL'}</b>${!ok&&front?'<em class="z3-krk" aria-hidden="true">KRUNCH!</em>':''}${best&&best.m===x.m?`<span class="z3-crown" aria-hidden="true">♛</span>`:''}
          <span class="z3-fcn">${NM[x.m]}${best&&best.m===x.m?` <i>${x.off}% off</i>`:''}</span></div>`}).join('')}
    </div>
    <p class="z3-note"><b>Sc. 3</b> The close grades every call. ${right.length===1?`Only ${NM[right[0].m]} took the right road.`:`${right.map(x=>NM[x.m]).join(', ').replace(/, ([^,]*)$/,' and $1')} took the right road.`} Closest pass wins: ${Wn.map(m=>NM[m]).join(' and ')||'nobody'}.</p></li>`;
  const ws=cs.filter(x=>x.win);
  const p4=`<li class="z3-sb z3-sb4"><div class="z3-sbp z3-pay">
      <div class="z3-payw">${ws.map(x=>`<div class="z3-bag">${car(x.m,{mood:'smug'})}<p class="z3-bb z3-bbig"><small>${NM[x.m]} made</small>${pm(x.v)}</p></div>`).join('')}</div>
      <ul class="z3-payo">${cs.filter(x=>!x.win).map(x=>`<li>${chip(x.m,x.ok?'W':'L')}<span>${NM[x.m]}</span><b class="${x.v>=0?'z3-up':'z3-dn'}">${kS(x.v)}</b></li>`).join('')}</ul></div>
    <p class="z3-note"><b>Sc. 4</b> The payout. P&amp;L on this one call, on a pretend $100,000 account each.</p></li>`;
  return `<section class="z3-ep" aria-label="One race, start to finish">
    <header class="z3-card"><span class="z3-epn">Episode ${r.n}</span><h2 class="z3-h">${esc(epTitle(r))}</h2><p>One race, start to finish.</p></header>
    <ol class="z3-sbs">${p1}${p2}${p3}${p4}</ol></section>`}

/* ---------- 3. The race so far: position on the road = season P&L ---------- */
function race(){const vals=rank.map(m=>P[m].pnl),lo=Math.min(0,...vals),hi=Math.max(0,...vals);
  const rows=rank.map((m,i)=>{const p=P[m],s=(p.seq||[]).slice(-5),hr=Math.round(100*p.W/Math.max(1,p.W+p.L));
    return `<li class="z3-lt ${i===0?'z3-lt1':''}" style="--mc:${BODY[m]}"><b class="z3-pos">${i+1}</b>${mark(m)}<span class="z3-ln"><b>${NM[m]}</b><small>${esc(W.MODELS[m].ver)}</small></span>
      <b class="z3-pl ${p.pnl>=0?'z3-up':'z3-dn'}" data-v="${Math.round(p.pnl)}">${pm(p.pnl)}</b><span class="z3-wl"><b>${p.W}-${p.L}</b></span><span class="z3-l5" aria-label="Last 5 calls: ${s.map(x=>x==='W'?'right':'wrong').join(', ')}">${s.map(x=>chip(m,x)).join('')}</span></li>`}).join('');
  const lanes=rank.map((m,i)=>`<div class="z3-lane" style="--mc:${BODY[m]};--v:${P[m].pnl}" data-m="${m}"><b class="z3-lno">${i+1}</b><div class="z3-rc">${car(m,{pen:true,tix:i===0})}<span class="z3-dust" aria-hidden="true"></span><p class="z3-say${i===0?' z3-say1':''}">${why(m)}</p></div></div>`).join('');
  const ticks=[];const step=25000;for(let v=Math.ceil(lo/step)*step;v<=hi;v+=step)ticks.push(v);
  return `<section class="z3-race" aria-label="The race so far" data-lo="${lo}" data-hi="${hi}">
    <header class="z3-card z3-card-b"><span class="z3-epn">Season standings</span><h2 class="z3-h">The race so far</h2><p>Each AI drives a pretend $100,000. How far it got is its season P&amp;L.</p></header>
    <div class="z3-trk"><div class="z3-axis" aria-hidden="true">${ticks.map(v=>`<i style="--v:${v}" class="${v===0?'z3-start':''}"><span>${v===0?'Start':kS(v).replace('.0','')}</span></i>`).join('')}</div>${lanes}</div>
    <div class="z3-l3"><p class="z3-l3h" aria-hidden="true"><span></span><span>Season P&amp;L</span><span>W-L</span><span>Last 5</span></p><ol>${rows}</ol>
    <p class="z3-l3f">The golden ticket goes to #1 on P&amp;L. W-L counts calls that got the direction right.</p></div>
  </section>`}

/* ---------- 4. Every episode so far ---------- */
function guide(){const rs=R.slice().sort((a,b)=>(mdyKey(b.resolves)*1e3+b.n)-(mdyKey(a.resolves)*1e3+a.n));
  const t=r=>{const f=film(r.n),Wn=winners(r),up=r.a>0,lg=coLogo(r.ticker),bg=coCol(r.ticker);
    return `<li><a class="z3-tc" href="#/round/${r.n}" style="--bc:${bg}"><span class="z3-tci">${f?`<img src="${f.p}" alt="" loading="lazy">`:`<span class="z3-tcl"><i class="z3-wm" aria-hidden="true">${esc(String(r.ticker).split('.')[0].replace(/^\d+$/,r.co.split(' ')[0]))}</i><img src="${lg}" alt=""${coDark(r.ticker)?' class="z3-dk"':''} loading="lazy"></span>`}</span>
      <span class="z3-tct">${esc(epTitle(r))}</span>
      <span class="z3-tcb"><span class="z3-tcn">Ep. ${r.n}</span><b class="${up?'z3-up':'z3-dn'}">${up?'▲':'▼'} ${pct(r.a)}</b><span class="z3-tcw">${Wn.length?Wn.map(m=>mark(m,'z3-mk-s')).join('')+'<small>won</small>':'<small class="z3-nb">No winner</small>'}</span></span></a></li>`};
  return `<section class="z3-guide" aria-label="Every episode so far">
    <header class="z3-card z3-card-c"><span class="z3-epn">Episode guide</span><h2 class="z3-h">Every race so far</h2><p>Newest first. The face is who won: the closest right call. Tap for its graded card.</p></header>
    <ul class="z3-tcs">${rs.map((r,i)=>t(r).replace('<li>',`<li class="${i>=8?'z3-more':''}">`)).join('')}</ul>
    <button type="button" class="z3-btn z3-all">Show all ${N} episodes</button></section>`}

/* ---------- 5. Tonight at the close, and next week on ---------- */
function tonight(){const PEN=(W.PENDING||[]).filter(p=>p.calls&&p.calls.length),tk=tTkey();
  const today=PEN.filter(p=>mdyKey(p.resolves)===tk),rest=PEN.filter(p=>mdyKey(p.resolves)!==tk);
  const show=(today.length?today:rest).slice(0,6),more=PEN.length-show.length;
  const tile=p=>{const bg=coCol(p.ticker),lg=coLogo(p.ticker),ups=p.calls.filter(c=>c.dir==='UP'),dns=p.calls.filter(c=>c.dir!=='UP');
    const row=(arr,isUp)=>arr.map((c,i)=>{const n=arr.length,t=n===1?.6:.34+i*(.6/(n-1||1));return `<span class="z3-tk ${isUp?'z3-up':'z3-dn'}" style="--t:${t.toFixed(3)}">${kart(c.m)}<b>${isUp?'+':'−'}${c.mag}%</b><span class="z3-sr">${NM[c.m]} says ${isUp?'up':'down'} ${c.mag}%.</span></span>`}).join('');
    return `<li class="z3-gr" style="--bc:${bg}"><a href="#/round/${p.n}" class="z3-gra"><span class="z3-grh">${lg?`<span class="z3-grl"><img src="${lg}" alt=""${coDark(p.ticker)?' class="z3-dk"':''}></span>`:''}<b>${esc(p.co)}</b><small>${esc(p.ticker)}</small></span>
      <span class="z3-grf"><svg viewBox="0 0 100 70" preserveAspectRatio="none" aria-hidden="true"><path d="M-2 35 L22 35 L102 4" class="z3-gru"/><path d="M-2 35 L22 35 L102 66" class="z3-grd"/></svg><span class="z3-grs z3-gsu">▲</span><span class="z3-grs z3-gsd">▼</span>${row(ups,true)}${row(dns,false)}</span>
      <span class="z3-grb">${bellTxt(p.ticker,p.resolves)}</span></a></li>`};
  /* next week on: the next three calls days, biggest companies first, at most twelve logos */
  const nx=(W.UPCOMING||[]).filter(u=>u.called),cap=t=>((W.CAPS||{})[t])||0,days=[...new Set(nx.map(u=>mdyKey(u.called)))].sort((a,b)=>a-b).slice(0,3);
  let left=12;const blocks=days.map(d=>{const us=nx.filter(u=>mdyKey(u.called)===d).sort((a,b)=>cap(b.ticker)-cap(a.ticker)),sh=us.slice(0,Math.max(0,left));left-=sh.length;if(!sh.length)return '';
    return `<p class="z3-nwd">${dayName(us[0].called)}</p><ul>${sh.map(u=>`<li><span class="z3-nwl">${coLogo(u.ticker)?`<img src="${coLogo(u.ticker)}" alt=""${coDark(u.ticker)?' class="z3-dk"':''}>`:''}</span><small>${esc(u.co)}</small></li>`).join('')}${us.length>sh.length?`<li class="z3-nwm">+${us.length-sh.length}</li>`:''}</ul>`}).join('');
  return `<section class="z3-tn" aria-label="Tonight at the close">
    <header class="z3-card z3-card-d"><span class="z3-epn">${today.length?'Live tonight':'Coming up'}</span><h2 class="z3-h">${today.length?'Tonight at the close':'Next at the close'}</h2><p>Calls locked before earnings. Up the top road, down the bottom one.</p></header>
    <ul class="z3-grs0">${show.map(tile).join('')}</ul>${more>0?`<a class="z3-btn z3-btn-s" href="#/upcoming">+${more} more locked in</a>`:''}
    ${blocks?`<div class="z3-nw"><p class="z3-nwh"><span>Coming up on Earnings Zeason</span></p>${blocks}</div>`:''}
  </section>`}
function tTkey(){const t=nyToday();return t[2]*1e4+t[0]*100+t[1]}

/* ---------- 6. The big race: bet #1, NVIDIA ---------- */
function bigRace(){const S=W.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):69,at=betAt();
  const dd=at?new Date(at).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  return `<section class="z3-big" aria-label="Bet number 1, NVIDIA">
    <header class="z3-card z3-card-e"><span class="z3-epn">Season special</span><h2 class="z3-h">The big race: bet #1, NVIDIA</h2><p>The first of many. The bet goes on at the close${dd?', '+dd:''}.</p></header>
    <div class="z3-bgp">
      <div class="z3-lights" role="timer" aria-live="off"><span class="z3-lt0"><b data-k="d">--</b><small>days</small></span><span><b data-k="h">--</b><small>hrs</small></span><span><b data-k="m">--</b><small>min</small></span><span><b data-k="s">--</b><small>sec</small></span></div>
      <svg class="z3-bgk" viewBox="0 0 360 230" aria-hidden="true" preserveAspectRatio="xMidYMid meet">
        <rect width="360" height="230" fill="#8fd3f4"/><path d="M0 120 Q90 100 180 116 T360 108 V230 H0Z" fill="#9ed8a0"/>
        <path d="M250 96 L360 96 L360 230 L292 230 Q300 160 250 96Z" fill="#c9a57a" stroke="${INK}" stroke-width="2.4"/>
        <path class="z3-rd z3-open-r" d="M-10 170 L130 170 L345 92"/><path class="z3-rd z3-shut-r" d="M-10 170 L130 170 L280 222"/>
        <path d="M-10 170 L130 170" stroke="#fff6dc" stroke-width="2" stroke-dasharray="8 8" fill="none"/>
        <g transform="translate(318 50)"><path d="M0 46 V0" stroke="${INK}" stroke-width="3"/><circle cx="0" cy="-16" r="21" fill="#fdbc2a" stroke="${INK}" stroke-width="2.6"/><circle cx="0" cy="-16" r="15" fill="none" stroke="#c98a0b" stroke-width="2"/><text x="0" y="-11" class="z3-sgt z3-coin">$EZ</text><path class="z3-gl2" d="M-12 -30 l8 -4 M10 -32 l5 -6 M16 -20 l7 -1" stroke="${INK}" stroke-width="2" stroke-linecap="round"/></g>
      </svg>
      <div class="z3-bill"><span class="z3-billl">${coLogo('NVDA')?`<img src="${coLogo('NVDA')}" alt="">`:''}</span><b>Bet #1<br>NVIDIA</b><i></i><i></i></div>
      <div class="z3-bgc">${car(lead,{tix:true})}<span class="z3-trl" aria-hidden="true"><svg viewBox="0 0 70 50"><path d="M4 34 h52 v8 h-52z" fill="#8a6b4a" stroke="${INK}" stroke-width="2.2"/><circle cx="16" cy="44" r="5" fill="${INK}"/><circle cx="46" cy="44" r="5" fill="${INK}"/><path d="M14 34 q-6 -26 22 -28 q28 2 22 28z" fill="#e9c46a" stroke="${INK}" stroke-width="2.4"/><path d="M28 6 q8 -6 16 0" fill="none" stroke="${INK}" stroke-width="2.4"/><text x="36" y="26" class="z3-sgt z3-sgc">POOL</text><path d="M-4 38 h8" stroke="${INK}" stroke-width="2.4"/></svg></span></div>
      <span class="z3-bgs z3-bgr"><b>Right:</b> $EZ buyback</span><span class="z3-bgs z3-bgw"><b>Wrong:</b> the pool can be wiped out</span>
    </div>
    <ol class="z3-rules"><li><i class="z3-ri z3-ri1" aria-hidden="true"></i><span><b>${share}%</b> of $EZ creator fees fill the pool.</span></li><li><i class="z3-ri z3-ri2" aria-hidden="true"></i><span>The pool gets bet on the golden ticket holder's call. Today that's <b>${NM[lead]}</b>.</span></li><li><i class="z3-ri z3-ri3" aria-hidden="true"></i><span>NVIDIA is the first bet, not the last. Season 2 brings more.</span></li></ol>
  </section>`}

/* ---------- 7. That's the race so far, folks! ---------- */
function outro(){const b=D.querySelector('.wc-back .wc-fine'),fine=b?b.innerHTML:'P&amp;L is simulated.',x=((W.CONFIG||{}).x)||'https://x.com/earningszn';
  const nx=(W.UPCOMING||[]).slice().sort((a,b)=>mdyKey(a.called)-mdyKey(b.called))[0];
  return `<section class="z3-end" aria-label="The end"><div class="z3-iris"><p class="z3-tf">That's the race so far, folks!</p>${nx?`<p class="z3-tn2">Next calls lock ${dayName(nx.called)}.</p>`:''}</div>
    <a class="z3-btn z3-x" href="${esc(x)}" target="_blank" rel="noopener">Follow the race on X</a><p class="z3-fine">${fine}</p></section>`}

/* ---------- mount ---------- */
const fl=D.createElement('link');fl.rel='stylesheet';fl.href='https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap';D.head.appendChild(fl);
const root=D.createElement('div');root.id='z3';root.className='z3';
root.innerHTML=cover+storyboard(ex)+race()+guide()+tonight()+bigRace()+outro();
const book=D.querySelector('#wc-book');book.parentNode.insertBefore(root,book);
D.documentElement.classList.add('z3-on');
/* the explainer film keeps playing from the same element: moved into the TV */
const vt=D.querySelector('.x2p-vt');if(vt)root.querySelector('#z3scr').appendChild(vt);

/* show all episodes */
root.querySelector('.z3-all').addEventListener('click',e=>{root.querySelector('.z3-tcs').classList.toggle('z3-tcs-all');e.target.textContent=root.querySelector('.z3-tcs-all')?'Show the newest 8':`Show all ${N} episodes`});
/* episode film in scene 2: tap to play with sound */
const mv=root.querySelector('.z3-v'),pb=root.querySelector('.z3-play');
if(mv&&pb){pb.addEventListener('click',()=>{if(mv.paused){mv.muted=false;mv.play().catch(()=>{});pb.classList.add('z3-hide')}});mv.addEventListener('pause',()=>pb.classList.remove('z3-hide'));mv.addEventListener('ended',()=>pb.classList.remove('z3-hide'))}

/* race track: place each car by its P&L, the start line at $0 (the $100,000 start) */
function lay(){const s=root.querySelector('.z3-race'),lo=+s.dataset.lo,hi=+s.dataset.hi,tr=s.querySelector('.z3-trk'),w=tr.clientWidth,cw=s.querySelector('.z3-rc').offsetWidth,pad=Math.round(w*.04);
  const X=v=>pad+cw/2+(v-lo)/((hi-lo)||1)*(w-2*pad-cw);
  s.querySelectorAll('.z3-axis i').forEach(i=>i.style.left=X(+i.style.getPropertyValue('--v'))+'px');
  const x0=X(0);s.querySelectorAll('.z3-lane').forEach(l=>{const v=+l.style.getPropertyValue('--v'),rc=l.querySelector('.z3-rc'),tx=X(v)-cw/2,sy=rc.querySelector('.z3-say');rc.style.setProperty('--tx',tx+'px');rc.style.setProperty('--sx',(x0-cw/2)+'px');rc.classList.toggle('z3-sayl',w-(tx+cw)<sy.offsetWidth+8)})}
lay();let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth!==lw){lw=innerWidth;lay()}});
if(D.fonts)D.fonts.ready.then(lay);

/* the count-up: the money on the lower third rolls in as the cars drive */
function roll(){root.querySelectorAll('.z3-pl').forEach(b=>{const v=+b.dataset.v;if(RM()){b.textContent=pm(v);return}const t0=performance.now(),d=1400;
  const f=t=>{const k=Math.min(1,(t-t0)/d),e=1-Math.pow(1-k,3);b.textContent=pm(v*e);if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}

/* beats start once a panel is fully in view and has been read for a moment (animate on comprehension) */
/* a beat plays once its panel sits whole in the middle of the screen for a moment */
function beat(el,cls,delay,fn){let tm=null;const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(e.isIntersecting&&e.intersectionRatio>=.98){if(!el.classList.contains(cls)&&!tm)tm=setTimeout(()=>{el.classList.add(cls);fn&&fn();io.disconnect()},RM()?0:delay)}else if(tm){clearTimeout(tm);tm=null}}),{threshold:[0,.5,.98,1],rootMargin:'-12% 0px -12% 0px'});io.observe(el)}
const fk=root.querySelector('.z3-fork');
if(fk){beat(fk,'z3-go',700);const replay=()=>{fk.classList.remove('z3-go');void fk.offsetWidth;fk.classList.add('z3-go')};fk.addEventListener('click',replay);fk.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();replay()}})}
const rc=root.querySelector('.z3-race .z3-trk');beat(rc,'z3-go',400,roll);
const op=root.querySelector('.z3-open');requestAnimationFrame(()=>op.classList.add('z3-go'));

/* the countdown on the start lights */
function tick(){const at=betAt();if(!at)return;const s=Math.max(0,Math.floor((at-Date.now())/1e3)),v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
  root.querySelectorAll('.z3-lights b').forEach(b=>b.textContent=String(v[b.dataset.k]).padStart(2,'0'))}
tick();setInterval(tick,1000);
W.__z3={lay,replay:()=>{if(fk){fk.classList.remove('z3-go');void fk.offsetWidth;fk.classList.add('z3-go')}}};
D.documentElement.classList.add('z3-ready');
})();
