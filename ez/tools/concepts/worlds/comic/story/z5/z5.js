/* z5, the wow round (2026-10-30): the Overview as an American crime and suspense comic in full colour.
   EC's Crime SuspenStories / Shock SuspenStories, Eisner's Spirit splash pages (the title built into the scene),
   Dick Tracy's Crimestoppers' Textbook, the host who talks to the reader (Lev Gleason's Mr. Crime), the wanted poster,
   the line-up, the case file, the "next issue" box. Every round is a case: four statements (the calls), the evidence
   (the film), the verdict at the close. Real data only, from the page's globals. Laid over the built X3+ page. */
(function(){'use strict';
const D=document,H=D.documentElement;
if(!D.getElementById('z5-fonts')){const l=D.createElement('link');l.id='z5-fonts';l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Special+Elite&display=swap';D.head.appendChild(l)}
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches||window.__z5Still;
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const kS=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const MC=m=>m==='GROK'?'#15121a':MODELS[m].c;
const face=(m,cls)=>{const M=MODELS[m];return `<i class="z5-face ${cls||''}" data-m="${m}" style="--mc:${MC(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/>${M.dot?`<path d="${M.dot}" fill="${M.dotc}"/>`:''}</svg></i>`};
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const coDk=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const film=n=>{const f=(window.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const winners=r=>r.win?r.win.split(' & ').filter(w=>MODELS[w]):[];
const host=k=>`media/commissioner/web/${k}.webp`;
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const mdyKey=s=>{if(!s)return 9e9;const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const cap=t=>((window.CAPS||{})[t])||0;
function coin(k,n){let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s}
/* each exchange's close (as world-comic.js counts it) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
/* the bet: the close the weekday after NVIDIA's call date (world-comic.js betAt) */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
const left=at=>{if(at==null)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}};
const inTxt=at=>{const L=left(at);if(!L)return 'Date to come';if(!L.s)return 'Bell rang · verdict soon';return 'Verdict in '+(L.d?L.d+'d '+L.h+'h':L.h?L.h+'h '+L.m+'m':L.m+'m')};
function rankPnl(P,N){return ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl})}
const nyHM=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',hour:'numeric',minute:'numeric',second:'numeric'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return {h:g('hour')%24,m:g('minute'),s:g('second')}};
const dirW=up=>up?'Up':'Down';
const arr=up=>up?'▲':'▼';

function build(){
  const P=window.__x2pPnl().A,R=ROUNDS.slice(),N=R.length,rank=rankPnl(P,N),lead=rank[0];
  const nC=R.reduce((t,x)=>t+x.calls.length,0);

  /* ================= 1. THE SPLASH: the title built into the city (Eisner) ================= */
  const word='EARNINGS',hts=[1.5,1.8,1.42,2,1.55,1.75,1.42,1.88];
  const sky=[...word].map((c,i)=>`<span class="z5-bld" style="--k:${hts[i]};--i:${i}"><b>${c}</b></span>`).join('');
  const splash=`<section class="z5-splash" aria-label="Cover">
    <div class="z5-mast"><span class="z5-mast-l">Earnings Zeason <i>presents</i></span><span class="z5-mast-r"><b>Season 1</b><small>${N} cases graded</small></span></div>
    <div class="z5-scene">
      <div class="z5-sky" aria-hidden="true"></div>
      <div class="z5-clock" aria-hidden="true"><div class="z5-ck"><i class="z5-c4"></i><i class="z5-hh"></i><i class="z5-mh"></i><b>4</b></div><span>The close</span></div>
      <p class="z5-nar z5-nar-cv"><img class="z5-hostf" src="${host('19-head-smirk')}" alt="" width="60" height="60">Every earnings report is a case, reader. Four AIs give a statement before it. At the close, the market gives the verdict.</p>
      <h1 class="z5-ttl"><span class="z5-t1">4 AI<span class="z5-lc">s</span> trade</span><span class="z5-sky-w" aria-label="earnings"><span aria-hidden="true">${sky}</span></span><span class="z5-t3">to run our buybacks<span class="z5-sr">.</span></span></h1>
      <div class="z5-street" aria-hidden="true"></div>
      <div class="z5-marq" role="region" aria-label="How it works, a 1 minute 20 film"><p class="z5-mq-t" aria-hidden="true"><span>Now showing</span><b>How it works</b><span>1:20</span></p><div class="z5-film"></div></div>
      <p class="z5-star"><span>Starring</span>${['GPT','CLAUDE','GROK','KIMI'].map(m=>`<b>${face(m,'z5-f-s')}${NM[m]}</b>`).join('')}</p>
    </div>
  </section>`;

  /* ================= 2. THE CASE: one real round, start to finish ================= */
  const exN=+(window.__z5Ex||56); /* the owner's pick for the walkthrough (R11 D2, 30 Oct), as the live page */
  const one=x=>{const up=x.a>0;return x.calls.filter(c=>{const k=call(c[1]);return k&&k.up===up}).length===1&&winners(x).length===1};
  const ex=R.find(r=>r.n===exN&&film(r.n))||R.filter(x=>film(x.n)).sort((a,b)=>mdyKey(b.resolves)-mdyKey(a.resolves)||b.n-a.n).find(one)||R[N-1];
  const EXT=+(window.__z5ExT||11.5);/* the moment the film asks the question: all four calls up, the close not yet in (R56: the fourth call lands at 0:11, the market at 0:13) */
  const exUp=ex.a>0,exW=winners(ex),exF=film(ex.n);
  const ecs=ORDER.map(m=>{const row=ex.calls.find(c=>c[0]===m);if(!row)return null;const c=call(row[1]);return c?{m,c,ok:c.up===exUp,off:+row[2],win:exW.includes(m),v:(P[m].per[ex.n]||{}).v||0}:null}).filter(Boolean);
  const verb=Math.abs(ex.a)>=5?(exUp?'jump':'crash'):(exUp?'rise':'drop');
  const caseT=`The case of the ${esc(ex.co)} ${verb}`;
  const pass=ecs.filter(x=>x.ok),fail=ecs.filter(x=>!x.ok);
  const and=a=>a.length<2?a[0]||'':a.slice(0,-1).join(', ')+' and '+a[a.length-1];
  const lg=coLogo(ex.ticker);
  const p1=`<li class="z5-pn z5-cs-1"><b class="z5-no" aria-hidden="true">1</b>
      <p class="z5-cap">Before the report, each AI gives a statement.</p>
      <div class="z5-intr">
        <span class="z5-lamp" aria-hidden="true"></span>
        <span class="z5-tag"><b>Sealed</b>${md(ex.called)}</span>
        ${ecs.map((x,i)=>`<div class="z5-sus z5-sus-${i%2?'r':'l'}">${face(x.m,'z5-f-m')}<p class="z5-bub ${x.c.up?'z5-bu':'z5-bd'}"><small>${NM[x.m]}</small><span>${x.c.up?'🐂':'🐻'} ${dirW(x.c.up)} ${x.c.v}%</span></p></div>`).join('')}
      </div></li>`;
  const p2=`<li class="z5-pn z5-cs-2"><b class="z5-no" aria-hidden="true">2</b>
      <p class="z5-cap">${esc(ex.co)} reports. The evidence:</p>
      <div class="z5-exh"><div class="z5-reel" data-v="${exF?exF.v:''}" data-t="${EXT}">${exF?`<video muted playsinline preload="none" src="${exF.v}#t=${EXT}" poster="${window.__z5ExPoster||exF.p}" aria-hidden="true"></video><button type="button" class="z5-play" aria-label="Play the ${esc(ex.co)} film"><i></i></button>`:''}</div>
        <span class="z5-ev"><b>Exhibit A</b>Round ${ex.n} · ${esc(ex.ticker)}</span></div></li>`;
  const p3=`<li class="z5-pn z5-cs-3" data-up="${exUp?1:0}"><b class="z5-no" aria-hidden="true">3</b>
      <p class="z5-cap">At the close, the market reads the verdict.</p>
      <div class="z5-vd">
        <div class="z5-bong" aria-hidden="true"><em>BONG!</em></div>
        <p class="z5-mv ${exUp?'z5-u':'z5-d'}"><span>${lg?`<img src="${lg}" alt=""${coDk(ex.ticker)?' class="z5-dk"':''}>`:''}${esc(ex.co)}</span><b>${arr(exUp)} ${pct(ex.a)}</b></p>
        <ul class="z5-sts">${ecs.map(x=>`<li class="${x.ok?'z5-ok':'z5-no2'}${x.win?' z5-win':''}">${face(x.m,'z5-f-s')}<span class="z5-st-n">${NM[x.m]}</span><span class="z5-st-c ${x.c.up?'z5-tu':'z5-td'}">${arr(x.c.up)} ${x.c.v}%</span>
          <b class="z5-stamp" aria-label="${x.ok?'pass':'fail'}">${x.ok?'✓ Pass':'✗ Fail'}</b>${x.win?`<span class="z5-crown" aria-label="winner, closest call, ${x.off}% off">👑<small>${x.off}% off</small></span>`:''}</li>`).join('')}</ul>
        <p class="z5-why">${pass.length?`${and(pass.map(x=>NM[x.m]))} called ${exUp?'up':'down'}: pass.`:'Nobody called the direction.'} ${exW.length===1?`<b>${NM[exW[0]]} came closest and wins the case.</b>`:exW.length>1?`<b>${and(exW.map(m=>NM[m]))} tie.</b>`:'<b>Unsolved.</b>'}</p>
      </div></li>`;
  const ws=ecs.filter(x=>x.win),best=(ws.length?ws:ecs.slice().sort((a,b)=>b.v-a.v).slice(0,1))[0];
  const p4=`<li class="z5-pn z5-cs-4"><b class="z5-no" aria-hidden="true">4</b>
      <p class="z5-cap">Then the money. Each AI trades a pretend $100,000.</p>
      <div class="z5-bill"><span class="z5-bl-c" aria-hidden="true">$</span>${face(best.m,'z5-f-m')}<p><b class="${best.v>=0?'z5-tu':'z5-td'}">${pm(best.v)}</b><small>${NM[best.m]} ${best.v>=0?'made':'lost'} on this call</small></p><span class="z5-bl-c" aria-hidden="true">$</span></div>
      <p class="z5-pays">${ecs.filter(x=>x!==best).map(x=>`<span>${face(x.m,'z5-f-xs')}<b class="${x.v>=0?'z5-tu':'z5-td'}">${kS(x.v)}</b><span class="z5-sr">${NM[x.m]}</span></span>`).join('')}</p></li>`;
  const p5=`<li class="z5-pn z5-cs-5"><b class="z5-no" aria-hidden="true">5</b>
      <div class="z5-cab"><span class="z5-fold"><b>Case closed</b><small>Round ${ex.n} · ${esc(ex.ticker)}</small></span>
      <p>Filed with the rest: <b>${N}</b> cases, <b>${nC}</b> statements, all on the record.</p>
      <a class="z5-open" href="#/round/${ex.n}">Open its graded card →</a></div></li>`;
  const caseSec=`<section class="z5-case" aria-label="One round, start to finish">
    <h2 class="z5-h2"><span>${caseT}</span></h2>
    <p class="z5-nar z5-nar-h"><img class="z5-hostf" src="${host('03-stamping')}" alt="" width="60" height="60">Round ${ex.n}, reader. How every round goes, start to finish.</p>
    <ol class="z5-pg">${p1}${p2}${p3}${p4}${p5}</ol></section>`;

  /* ================= 3. THE LINE-UP: the wanted poster for the leader, the height wall for all four ================= */
  const A=m=>P[m],hr=m=>A(m).W/(A(m).W+A(m).L);
  const bestJ=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
  const L=A(lead),lt=L.W+L.L,lh=hr(lead),lc=coin(L.W,lt),bj=bestJ(lead);
  const coinTxt=lh<=.5?'A coin flip would have done as well.':`A coin flip gets a record this good about 1 time in ${Math.max(2,Math.round(1/lc))}.`;
  const wanted=`<article class="z5-want">
      <i class="z5-pin z5-pin1" aria-hidden="true"></i><i class="z5-pin z5-pin2" aria-hidden="true"></i>
      <p class="z5-w-h">Wanted</p><p class="z5-w-s">for suspicion of luck</p>
      <div class="z5-w-mug">${face(lead,'z5-f-xl z5-holo')}<span class="z5-w-no">No. 1</span></div>
      <p class="z5-w-n">${NM[lead]}<small>${esc(MODELS[lead].ver)}</small></p>
      <p class="z5-w-gt"><span>Golden ticket holder</span></p>
      <p class="z5-w-p ${L.pnl>=0?'z5-tu':'z5-td'}"><small>Season P&amp;L</small><span class="z5-cnt" data-v="${Math.round(Math.abs(L.pnl))}" data-s="${L.pnl<0?'−':'+'}">${pm(L.pnl)}</span></p>
      <p class="z5-w-l">Right way on <b>${L.W} of ${lt}</b> calls. Biggest job: <b class="${bj.v>=0?'z5-tu':'z5-td'}">${pm(bj.v)}</b> on ${esc(bj.r.co)}.</p>
      <p class="z5-w-e"><b>The evidence:</b> ${coinTxt}</p>
      <p class="z5-w-r">We bet the pool on its next call.</p>
    </article>`;
  const lo=38,hi=68,yy=v=>((Math.min(hi,Math.max(lo,v*100))-lo)/(hi-lo)*100);
  const wall=`<div class="z5-wall" role="list" aria-label="All four, ranked by P&amp;L. Height on the wall is the hit rate.">
      <p class="z5-sten" aria-hidden="true">Height = hit rate<small>how often each one calls the direction right</small></p><div class="z5-marks" aria-hidden="true">${[40,50,60].map(v=>`<i style="--y:${yy(v/100)}" class="${v===50?'z5-m50':''}"><b>${v}%${v===50?'<small>coin flip</small>':''}</b></i>`).join('')}</div>
      ${rank.map((m,i)=>{const a=A(m),h=hr(m);return `<div class="z5-sl${i===0?' z5-sl1':''}" role="listitem" style="grid-column:${i+2};--h:${yy(h).toFixed(1)};--mc:${MC(m)}">
        <div class="z5-body" aria-hidden="true">${face(m,'z5-f-m'+(i===0?' z5-holo':''))}<i class="z5-tor"></i></div>
        <span class="z5-hr" aria-hidden="true">${Math.round(h*100)}%</span>
        <div class="z5-plac"><small class="z5-pno">No. ${i+1}<i class="z5-fl z5-fl-${FLAG[m]}" aria-hidden="true"></i></small><b>${NM[m]}</b><span class="${a.pnl>=0?'z5-tu':'z5-td'}">${kS(a.pnl)}</span><small>${a.W}-${a.L}</small>
          <span class="z5-sr">P&amp;L ${pm(a.pnl)}, ${a.W} right and ${a.L} wrong, hit rate ${Math.round(h*100)}%</span></div></div>`}).join('')}
    </div>`;
  const lineup=`<section class="z5-lu" aria-label="The line-up">
    <h2 class="z5-h2"><span>The line-up</span></h2>
    <p class="z5-nar z5-nar-h">Ranked by P&amp;L on a pretend $100,000 each. Top P&amp;L holds the golden ticket.</p>
    <div class="z5-lu-g">${wanted}${wall}</div></section>`;

  /* ================= 4. CASES STILL OPEN ================= */
  const today=nyToday(),tdk=(today[2])*1e4+today[0]*100+today[1];
  const open=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length);
  let d0=open.filter(p=>p.resolves).map(p=>mdyKey(p.resolves)).sort((a,b)=>a-b)[0];
  const tn=open.filter(p=>mdyKey(p.resolves)===d0).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
  const lbl=d0===tdk?'Verdict tonight at the close':d0===tdk+1?'Verdict tomorrow at the close':'Verdict at the close'+(tn[0]?', '+md(tn[0].resolves):'');
  const shown=tn.slice(0,6);
  const rung=tn.length&&tn.every(p=>{const a=closeAt(p.ticker,p.resolves);return a&&a<=Date.now()});
  const files=shown.map(p=>{const l=coLogo(p.ticker),cs=ORDER.map(m=>p.calls.find(x=>x.m===m)).filter(Boolean).sort((a,b)=>(b.dir==='UP')-(a.dir==='UP'));
    const u=cs.filter(c=>c.dir==='UP').length;
    return `<a class="z5-of" href="#/round/${p.n}" style="--cc:${(CO_LOGOS[p.ticker]||{}).c||'#7a5a2e'}">
      <span class="z5-of-tab">Case ${p.n}</span><span class="z5-of-st" aria-hidden="true">Open</span>
      <span class="z5-of-ph">${l?`<img src="${l}" alt=""${coDk(p.ticker)?' class="z5-dk"':''} loading="lazy">`:''}<i class="z5-clip" aria-hidden="true"></i></span>
      <b class="z5-of-co">${esc(p.co)}<small>${esc(p.ticker)}</small></b>
      <span class="z5-of-ss" aria-label="${u} say up, ${cs.length-u} say down">${cs.map(c=>`<span class="${c.dir==='UP'?'z5-bu':'z5-bd'}">${face(c.m,'z5-f-xs')}${c.dir==='UP'?'🐂':'🐻'} ${arr(c.dir==='UP')}${c.mag}%<span class="z5-sr">${NM[c.m]} says ${c.dir.toLowerCase()}</span></span>`).join('')}</span>
      <span class="z5-of-t" data-at="${closeAt(p.ticker,p.resolves)||''}">${inTxt(closeAt(p.ticker,p.resolves))}</span></a>`}).join('');
  const openSec=tn.length?`<section class="z5-open-s" aria-label="${esc(lbl)}">
    <h2 class="z5-h2"><span>Cases still open</span></h2>
    <p class="z5-nar z5-nar-h"><img class="z5-hostf" src="${host('08-watch')}" alt="" width="60" height="60">${tn.length} case${tn.length===1?'':'s'}. ${rung?'The bell has rung. The verdicts are on their way.':esc(lbl)+'. Every statement is sealed. Who cracks?'}</p>
    <div class="z5-ofs">${files}</div>
    ${tn.length>shown.length?`<a class="z5-more-a" href="#/upcoming">+ ${tn.length-shown.length} more open cases →</a>`:''}</section>`:'';

  /* ================= 5. THE CASE FILES: every round so far ================= */
  const all=R.slice().sort((a,b)=>mdyKey(b.resolves)-mdyKey(a.resolves)||b.n-a.n);
  const tile=r=>{const f=film(r.n),up=r.a>0,W=winners(r),l=coLogo(r.ticker);
    return `<a class="z5-cf${f?'':' z5-cf-nf'}" href="#/round/${r.n}" style="--cc:${(CO_LOGOS[r.ticker]||{}).c||'#7a5a2e'}" aria-label="Round ${r.n}, ${esc(r.co)}, ${up?'up':'down'} ${pct(r.a)}, ${W.length?W.map(m=>NM[m]).join(' and ')+' won':'nobody won'}">
      <span class="z5-cf-ph">${f?`<img src="${f.p}" alt="" loading="lazy">`:l?`<img class="z5-cf-lg${coDk(r.ticker)?' z5-dk':''}" src="${l}" alt="" loading="lazy">`:''}</span>
      <span class="z5-cf-tab">#${r.n} <small>${esc(r.ticker)}</small></span>
      <span class="z5-cf-ev ${up?'z5-u':'z5-d'}">${arr(up)} ${pct(r.a)}</span>
      <span class="z5-cf-sp ${W.length?'z5-cl':'z5-un'}" aria-hidden="true">${W.length?W.map(m=>face(m,'z5-f-xs')).join('')+'<b>Closed</b>':'<b>Unsolved</b>'}</span></a>`};
  const cab=`<section class="z5-files" aria-label="Every round so far">
    <h2 class="z5-h2"><span>The case files</span></h2>
    <p class="z5-nar z5-nar-h">Every round so far, newest first. Tap a file for its graded card.</p>
    <div class="z5-cfs" data-all="0">${all.map(tile).join('')}</div>
    <button type="button" class="z5-more">Open the whole cabinet · ${all.length} cases</button>
    <aside class="z5-tb" aria-label="How to read a case file"><i class="z5-hole" aria-hidden="true"></i><i class="z5-hole" aria-hidden="true"></i>
      <p class="z5-tb-h">Case-reader's textbook</p>
      <p><span class="z5-cf-sp z5-cl z5-k">${face(lead,'z5-f-xs')}<b>Closed</b></span> That AI called the direction and came closest.</p>
      <p><span class="z5-cf-sp z5-un z5-k"><b>Unsolved</b></span> Nobody called the direction. Nobody wins.</p></aside>
  </section>`;

  /* ================= 6. NEXT ISSUE: THE NVIDIA JOB ================= */
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):69,at=betAt(),BL=left(at),nvl=coLogo('NVDA');
  const day=at?new Date(at).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  const die=(k,v,l)=>`<span class="z5-die" data-k="${k}"><b>${String(v).padStart(2,'0')}</b><small>${l}</small></span>`;
  const job=`<section class="z5-job" aria-label="Bet number 1, NVIDIA">
    <p class="z5-nx" aria-hidden="true">Next issue!</p>
    <h2 class="z5-h2 z5-h2-j"><span>Bet #1: The NVIDIA job</span></h2>
    <div class="z5-job-g">
      <div class="z5-vault" role="timer" aria-label="Time until the NVIDIA bet">
        <div class="z5-door"><i class="z5-dial" aria-hidden="true"></i><span class="z5-v-lg">${nvl?`<img src="${nvl}" alt="NVIDIA">`:'NVIDIA'}</span>
          <div class="z5-dies">${BL?die('d',BL.d,'days')+die('h',BL.h,'hrs')+die('m',BL.m,'min')+die('x',BL.x,'sec'):'<span class="z5-die"><b>Soon</b></span>'}</div>
          <span class="z5-v-k">Time lock${day?' · opens at the close, '+esc(day):''}</span></div>
      </div>
      <div class="z5-plan"><p class="z5-pl-h">The plan</p>
        <ol><li>${share}% of $EZ creator fees fill the pool.</li>
        <li>The golden ticket holder makes the call. Today: <b>${face(lead,'z5-f-xs')} ${NM[lead]}</b>.</li>
        <li><b class="z5-tu">Right call:</b> profits buy back $EZ.</li>
        <li><b class="z5-td">Wrong call:</b> the pool can be wiped out.</li></ol>
        <img class="z5-plan-h" src="${host('09-briefcase')}" alt="" width="150" height="150" loading="lazy"></div>
    </div>
    <p class="z5-tbc"><span>The first job, not the last. Season 2 brings more.</span><b>To be continued…</b></p>
  </section>`;

  const book=D.createElement('div');book.id='z5-book';book.className='z5-book';
  book.innerHTML=splash+caseSec+lineup+openSec+cab+job;
  const main=D.querySelector('main'),wb=D.getElementById('wc-book');
  main.insertBefore(book,wb||main.firstChild);
  const fs=D.querySelector('.wc-film-slot');if(fs)book.querySelector('.z5-film').appendChild(fs);
  const back=D.querySelector('#wc-book .wc-back');if(back)book.appendChild(back);
  H.classList.add('z5-on');
  wire(book,ex);
  return book}

function rollCnt(n){if(!n||RM())return;const v=+n.dataset.v,s=n.dataset.s,fin=n.textContent,t0=performance.now(),d=1100;
  (function f(t){const k=Math.min(1,(t-t0)/d),e2=1-Math.pow(1-k,3);n.textContent=k<1?s+'$'+Math.round(v*e2).toLocaleString('en-US'):fin;if(k<1)requestAnimationFrame(f)})(t0)}

function wire(book,ex){
  /* the clock tower keeps New York time: the close is 4 */
  const clk=book.querySelector('.z5-clock');
  const setClk=()=>{const t=nyHM(),h=(t.h%12)+t.m/60,m=t.m+t.s/60;clk.style.setProperty('--hh',(h*30)+'deg');clk.style.setProperty('--mh',(m*6)+'deg')};
  setClk();setInterval(setClk,RM()?60000:1000);
  /* the cabinet opens */
  book.querySelector('.z5-more').addEventListener('click',e=>{const g=book.querySelector('.z5-cfs'),o=g.dataset.all==='1';g.dataset.all=o?'0':'1';e.currentTarget.textContent=o?e.currentTarget.textContent.replace('Close the cabinet','Open the whole cabinet'):'Close the cabinet · '+g.children.length+' cases'});
  /* exhibit A plays on a tap, with sound, never on its own */
  book.querySelectorAll('.z5-reel video').forEach(v=>{const t=+v.parentNode.dataset.t,seek=()=>{try{if(Math.abs(v.currentTime-t)>.2)v.currentTime=t}catch(e){}};if(v.readyState>=1)seek();else v.addEventListener('loadedmetadata',seek,{once:true})});
  book.querySelectorAll('.z5-reel').forEach(r=>{const b=r.querySelector('.z5-play');if(!b)return;b.addEventListener('click',()=>{
    const v=r.querySelector('video');b.remove();v.removeAttribute('aria-hidden');v.controls=true;v.muted=false;try{v.currentTime=+r.dataset.t}catch(e){}v.play().catch(()=>{})})});
  /* the verdict: plays once the panel is fully read (lesson 55), replays on tap */
  const vd=book.querySelector('.z5-cs-3');
  const run=()=>{if(RM()){vd.classList.add('z5-done');return}vd.classList.remove('z5-go','z5-done');void vd.offsetWidth;vd.classList.add('z5-go')};
  vd.addEventListener('click',run);vd.setAttribute('tabindex','0');vd.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();run()}});
  if(RM())vd.classList.add('z5-done');
  else{let t;const io=new IntersectionObserver(es=>{const e=es[0];if(e.intersectionRatio>.85&&!vd.classList.contains('z5-go')){t=setTimeout(run,700)}else if(e.intersectionRatio<.5)clearTimeout(t)},{threshold:[0,.5,.85,1]});io.observe(vd)}
  window.__z5Verdict=run;
  /* the wanted poster's money rolls up once */
  const cnt=book.querySelector('.z5-want .z5-cnt');new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){rollCnt(cnt);o.disconnect()}},{threshold:.6}).observe(cnt);
  /* the line-up: they step up to their height on the wall once seen */
  const wl=book.querySelector('.z5-wall');if(RM())wl.classList.add('z5-in');else new IntersectionObserver((es,o)=>{if(es[0].intersectionRatio>.5){wl.classList.add('z5-in');o.disconnect()}},{threshold:[.5]}).observe(wl);
  /* verdict countdowns on the open cases, and the vault's time lock */
  const tick=()=>{book.querySelectorAll('.z5-of-t[data-at]').forEach(s=>{const at=+s.dataset.at;if(at){const t=inTxt(at);if(s.textContent!==t)s.textContent=t}});
    const L=left(betAt());if(L)['d','h','m','x'].forEach(k=>{const b=book.querySelector(`.z5-die[data-k="${k}"] b`);if(b){const v=String(L[k]).padStart(2,'0');if(b.textContent!==v)b.textContent=v}})};
  setInterval(tick,1000);
  /* logos never drawn past their native pixels at DPR 2 */
  const cap2=i=>{if(!i.naturalWidth)return;const k=Math.max(i.naturalWidth,i.naturalHeight)/2;i.style.maxWidth=k+'px';i.style.maxHeight=k+'px';
    /* a logo drawn for a dark ground (light ink, no flag in CO_LOGOS) goes on the ink chip too */
    if(!i.classList.contains('z5-dk'))try{const c=D.createElement('canvas'),w=c.width=48,h=c.height=48,x=c.getContext('2d');x.drawImage(i,0,0,w,h);const d=x.getImageData(0,0,w,h).data;let n=0,l=0;
      for(let j=0;j<d.length;j+=4)if(d[j+3]>160){n++;l+=(.2126*d[j]+.7152*d[j+1]+.0722*d[j+2])/255}if(n>40&&l/n>.86)i.classList.add('z5-dk')}catch(e){}};
  book.querySelectorAll('img[src*="logos/"]').forEach(i=>{if(i.complete)cap2(i);else i.addEventListener('load',()=>cap2(i))})}

function go(){if(D.getElementById('z5-book'))return;
  if(!(window.__x2pPnl&&window.ROUNDS&&D.getElementById('wc-book')&&D.querySelector('.wc-film-slot'))){setTimeout(go,200);return}
  try{build();H.classList.add('z5-ready')}catch(e){window.__z5Err=e;console.error('z5',e)}}
go()})();
