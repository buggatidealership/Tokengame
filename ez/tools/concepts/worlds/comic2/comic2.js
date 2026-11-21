/* EZ COMIC REMAKE of X2+ (mockup, owner 2026-10-29): the X3+ comic's Overview without Smart or lucky, the live page's
   NVIDIA bet ticket (live countdown) in the book, and a Leaderboard tab that is the live standings and the live proof card
   with a comic makeover (classes c2-*; the rest wc-*, from world-comic.js).
   Based on: THE COMIC BOOK (mockup). Injected at DOMContentLoaded; waits for the page to be built,
   then builds this week's issue from the page's own data (ROUNDS, PENDING, UPCOMING, FILMS, MODELS,
   CO_LOGOS, CAPS, __x2pPnl). Every number comes from the data; speech balloons only say the AI's call.
   The original Overview sections stay in the DOM (off screen) so the round pop-up (the PSA slab) still works. */
(function(){
'use strict';
const D=document,H=D.documentElement;
/* mockup switches (owner's three questions, 2026-10-29): window.__c2Cast / __c2Tix / __c2Rules, or ?cast= &tix= &rules= in the address.
   cast: 'cards' (today's character cards) | 'cols' (one row per AI in the standings' columns)
   tix:  'inked' (the live tickets with an ink outline, as built) | 'flat' (redrawn as flat comic panels)
   rules:'box' (the yellow caption boxes, as built) | 'none' (gone, the cover says it) | 'line' (one caption line each) */
const Q=new URLSearchParams(location.search);
const pick=(w,k,ok,d)=>{const v=window[w]||Q.get(k);return ok.includes(v)?v:d};
const V={cast:pick('__c2Cast','cast',['cards','cols'],'cards'),tix:pick('__c2Tix','tix',['inked','flat'],'inked'),rules:pick('__c2Rules','rules',['box','none','line'],'box')};
window.__c2V=V;H.classList.add('c2-cast-'+V.cast,'c2-tix-'+V.tix,'c2-rules-'+V.rules);
const fl=D.createElement('link');fl.rel='stylesheet';
fl.href='https://fonts.googleapis.com/css2?family=Bangers&family=Shantell+Sans:ital,wght@0,400;0,600;0,800;1,600&display=swap';
D.head.appendChild(fl);

const ORDER=['GPT','KIMI','CLAUDE','GROK'];
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const callTxt=c=>c?(c.up?'Up ':'Down ')+c.v+'%':'No call';
const face=(m,cls)=>{const M=MODELS[m];return `<i class="wc-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`};
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const film=n=>{const f=(window.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const winners=r=>r.win?r.win.split(' & '):[];
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const sameDay=(s,t)=>{if(!s)return false;const [m,d,y]=s.split('/').map(Number);return m===t[0]&&d===t[1]&&(y%100)===t[2]};
const cap=t=>((window.CAPS||{})[t])||0;
// binomial tail: chance a fair coin gets at least k right out of n
function coin(k,n){let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s}

function sfx(a){const x=Math.abs(a),up=a>0;
  if(x<1.5)return up?'blip':'tick';
  if(x<4)return up?'POP!':'THUD!';
  if(x<8)return up?'ZOOM!':'CRASH!';
  return up?'KA-POW!':'KA-BOOM!'}

/* the narration under a round: plain words, every number explained */
function narrate(r){
  const up=r.a>0,cs=r.calls.map(c=>({m:c[0],c:call(c[1]),off:+c[2]})).filter(x=>x.c);
  const right=cs.filter(x=>x.c.up===up),W=winners(r);
  const mv=(up?(Math.abs(r.a)>=5?'jumped ':'rose '):(Math.abs(r.a)>=5?'dropped ':'fell '))+pct(r.a);
  let s=`${esc(r.co)} ${mv}. `;
  if(!right.length)s+=`All ${cs.length} AIs called it the wrong way. Nobody wins this one.`;
  else if(right.length===1)s+=`Only ${NM[right[0].m]} called ${up?'up':'down'}${W.length===1&&W[0]===right[0].m?', so '+NM[right[0].m]+' wins the round':''}.`;
  else{s+=`${right.length} of ${cs.length} called ${up?'up':'down'}. `;
    if(W.length>1)s+=`${W.map(m=>NM[m]).join(' and ')} tie for the win, both ${right.find(x=>x.m===W[0]).off}% off.`;
    else if(W.length)s+=`${NM[W[0]]} wins it, ${cs.find(x=>x.m===W[0]).off}% off.`}
  return s}

function balloons(r,big){
  const up=r.a>0,W=winners(r);
  return '<div class="wc-cast">'+ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);if(!row)return '';
    const c=call(row[1]);const ok=c&&c.up===up,win=W.includes(m);
    const mk=win?'<b class="wc-mk wc-mk-w" title="Winner">★</b>':ok?'<b class="wc-mk wc-mk-y" title="Right way">✓</b>':'<b class="wc-mk wc-mk-n" title="Wrong way">✗</b>';
    return `<div class="wc-say ${win?'wc-win':ok?'wc-ok':'wc-no'}">${face(m)}<p class="wc-bub"><small>${NM[m]}</small>${callTxt(c)}</p>${mk}<span class="wc-sr">${win?'winner':ok?'right way':'wrong way'}</span></div>`}).join('')+'</div>'}

function bigPanel(r,i){
  const f=film(r.n),up=r.a>0;
  return `<article class="wc-pn wc-big wc-tilt${i%2}" data-n="${r.n}">
    <div class="wc-cap wc-cap-tl">Round ${r.n} · ${md(r.resolves)}</div>
    <div class="wc-artw"><div class="wc-art">${f?`<video class="wc-v" muted playsinline loop preload="none" poster="${f.p}"><source src="${f.v}" type="video/mp4"></video><button type="button" class="wc-snd" aria-label="Play with sound">▶ Sound</button>`:`<div class="wc-noart">${coLogo(r.ticker)?`<img src="${coLogo(r.ticker)}" alt="${esc(r.co)}">`:''}<span class="wc-noart-t">No film for this one. The numbers tell it.</span></div>`}</div>
      <span class="wc-sfx ${up?'wc-up':'wc-dn'}" aria-hidden="true"><em>${sfx(r.a)}</em><b>${up?'+':'−'}${pct(r.a)}</b></span></div>
    <h3 class="wc-co">${esc(r.co)}<small>Before the report, the AIs said:</small></h3>
    ${balloons(r,true)}
    <p class="wc-cap wc-cap-br">${narrate(r)}</p>
  </article>`}

function smallPanel(r){
  const f=film(r.n),up=r.a>0,W=winners(r),lg=coLogo(r.ticker);
  return `<a class="wc-pn wc-sm" href="#/round/${r.n}" data-n="${r.n}">
    <span class="wc-art">${f?`<img src="${f.p}" alt="" loading="lazy">`:lg?`<img class="wc-lgimg" src="${lg}" alt="">`:''}
      <span class="wc-sfx wc-mini ${up?'wc-up':'wc-dn'}"><b>${up?'+':'−'}${pct(r.a)}</b></span></span>
    <span class="wc-smcap"><b>${esc(r.co)}</b>Winner: ${W.length?W.map(m=>face(m,'wc-f-s')).join('')+' '+W.map(m=>NM[m]).join(' & '):'<i class="wc-nob wc-nob-s">×</i> Nobody'}</span>
  </a>`}

function backIssue(r){
  const f=film(r.n),up=r.a>0,W=winners(r),lg=coLogo(r.ticker);
  return `<a class="wc-bi" href="#/round/${r.n}" aria-label="Round ${r.n}, ${esc(r.co)}, ${up?'up':'down'} ${pct(r.a)}">
    <span class="wc-bi-art">${f?`<img src="${f.p}" alt="" loading="lazy">`:lg?`<img class="wc-lgimg" src="${lg}" alt="" loading="lazy">`:''}</span>
    <span class="wc-bi-no">#${r.n}</span><span class="wc-bi-mv ${up?'wc-up':'wc-dn'}">${up?'+':'−'}${pct(r.a)}</span>
    <span class="wc-bi-w">${W.length?W.map(m=>face(m,'wc-f-s')).join(''):'<i class="wc-nob">×</i>'}</span></a>`}

/* a small flag, as the live board's (US / China) */
function cflag(cc){const RED='#d0262f',NAVY='#253f8a',YEL='#ffd23a';let v=`<svg class="c2-fl" viewBox="0 0 16 10" preserveAspectRatio="none" role="img" aria-label="${cc==='CN'?'China':'United States'}">`;
  const star=(cx,cy,r)=>{let p=[];for(let i=0;i<10;i++){const a=-Math.PI/2+i*Math.PI/5,q=i%2?r*.4:r;p.push((cx+q*Math.cos(a)).toFixed(2)+','+(cy+q*Math.sin(a)).toFixed(2))}return p.join(' ')};
  if(cc==='US'){v+='<rect width="16" height="10" fill="#fff"/>';for(let i=0;i<7;i+=2)v+=`<rect y="${(i*10/7).toFixed(3)}" width="16" height="${(10/7).toFixed(3)}" fill="${RED}"/>`;v+=`<rect width="6.6" height="${(40/7).toFixed(3)}" fill="${NAVY}"/>`}
  else{v+=`<rect width="16" height="10" fill="${RED}"/><polygon points="${star(3.2,3,2.15)}" fill="${YEL}"/>`;[[6.2,1.1],[7.2,2.2],[7.2,3.7],[6.2,4.8]].forEach(q=>{v+=`<polygon points="${star(q[0],q[1],.72)}" fill="${YEL}"/>`})}
  return v+'</svg>'}
function rankPnl(P,N){return ORDER.slice().sort((a,b)=>{const qa=P[a].W+P[a].L>=N/2,qb=P[b].W+P[b].L>=N/2;return qa!==qb?(qa?-1:1):P[b].pnl-P[a].pnl})}
function build(){
  const P=window.__x2pPnl().A, R=ROUNDS.slice(), n=R.length;
  const rank=rankPnl(P,n), lead=rank[0], last=rank[rank.length-1];
  const lastDate=R[n-1].resolves, night=R.filter(r=>r.resolves===lastDate);
  const head=night.slice().sort((a,b)=>Math.abs(b.a)-Math.abs(a.a))[0];
  const others=night.filter(r=>r!==head).sort((a,b)=>b.n-a.n);
  const hu=head.a>0,hright=head.calls.filter(c=>{const x=call(c[1]);return x&&x.up===hu}).map(c=>c[0]);
  const today=nyToday();
  const nightLbl=(()=>{const [m,d,y]=lastDate.split('/').map(Number),dd=Math.round((Date.UTC(2000+today[2],today[0]-1,today[1])-Date.UTC(2000+(y%100),m-1,d))/864e5);
    return dd<=0?'Today':dd===1?'Last night':['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][new Date(Date.UTC(2000+(y%100),m-1,d)).getUTCDay()]+' night'})();
  let tonight=(window.PENDING||[]).filter(p=>sameDay(p.resolves,today)&&p.calls&&p.calls.length);
  let tLabel='Tonight at the close';
  if(!tonight.length){const ps=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length&&p.resolves);
    if(ps.length){const d0=ps.map(p=>p.resolves).sort((a,b)=>{const f=s=>{const [m,d,y]=s.split('/').map(Number);return y*1e4+m*100+d};return f(a)-f(b)})[0];tonight=ps.filter(p=>p.resolves===d0);const [m,d,y]=d0.split('/').map(Number),dd=Math.round((Date.UTC(2000+y,m-1,d)-Date.UTC(2000+today[2],today[0]-1,today[1]))/864e5);tLabel=dd===1?'Tomorrow at the close':'Graded at the close, '+md(d0)}}
  tonight.sort((a,b)=>cap(b.ticker)-cap(a.ticker));
  const nv=(window.UPCOMING||[]).find(u=>u.ticker==='NVDA');
  const stTxt=((D.querySelector('#x2pSt')||{}).textContent||'').replace(/\s+/g,' ');const cd=/Until the NVIDIA bet:\s*(.+?) left/.exec(stTxt);
  const daysLeft=cd?cd[1].replace(/,.*$/,''):'';

  /* ---------- COVER ---------- */
  const cover=`<section class="wc-cover" aria-label="Cover">
    <div class="wc-cv-top"><span class="wc-iss"><small>Issue</small>#${n}</span><span class="wc-cv-s">Season 1<small>${n} earnings reports graded</small></span></div>
    <p class="wc-h1" role="heading" aria-level="1">4 AI<span class="wc-lc">s</span> trade earnings <span>to run our buybacks.</span></p>
    <p class="wc-tag">Each one calls a stock <b>before</b> its earnings report. The market close says who was right.</p>
    <div class="wc-film-slot"><p class="wc-cap wc-film-cap" aria-hidden="true">How it works · 1:20</p></div>
    <div class="wc-starring"><span class="wc-st-l">Starring</span>${ORDER.map(m=>`<span class="wc-st-m">${face(m)}<b>${NM[m]}</b></span>`).join('')}</div>
  </section>`;

  /* ---------- PREVIOUSLY ON ---------- */
  const prev=`<section class="wc-prev" aria-label="Previously">
    <div class="wc-cap wc-cap-y wc-prev-box"><b class="wc-prev-h">Previously…</b>
      <p>Four AIs called ${n} earnings reports, each before the company reported. The next market close graded every call.</p>
      <p>Each AI trades a pretend $100,000 account on its calls. <b>${NM[lead]}</b> leads, up ${$k(P[lead].pnl)}. <b>${NM[last]}</b> is ${P[last].pnl<0?'down '+$k(P[last].pnl):'up '+$k(P[last].pnl)}.</p>
      <p>${nightLbl==='Today'?'Today':nightLbl}, ${esc(head.co)} ${hu?'jumped':'dropped'} ${pct(head.a)}. ${hright.length===0?'Nobody saw it coming.':hright.length===1?'Only '+NM[hright[0]]+' saw it coming.':hright.length+' of 4 saw it coming.'}</p></div>
  </section>`;

  /* ---------- CHARACTER PAGE ---------- */
  const best=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
  const worst=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v<b.v))b={v:x.v,r}}return b};
  const first=m=>R.find(r=>r.calls.some(c=>c[0]===m)).n;
  const roles=['Makes the buyback call','In the hunt','In the hunt','Last place'];
  const cast=`<section class="wc-chars" aria-label="The cast">
    <h2 class="wc-h2"><span>Meet the cast</span><small>Ranked by their pretend $100,000 accounts</small></h2>
    <div class="wc-ch-grid">${rank.map((m,i)=>{const a=P[m],b=best(m),w=worst(m),tot=a.W+a.L,hr=Math.round(a.W/tot*100),f=first(m);
      return `<article class="wc-ch wc-ch-${i+1}" style="--mc:${MODELS[m].c}">
        <div class="wc-ch-pic">${face(m,'wc-f-xl')}<span class="wc-ch-rk">#${i+1}</span></div>
        <div class="wc-ch-tx"><div class="wc-ch-hd"><h3>${NM[m]}<small>${esc(MODELS[m].ver)}</small></h3><p class="wc-ch-role">${roles[i]}</p></div>
          <p class="wc-ch-big ${a.pnl>=0?'wc-tu':'wc-td'}">${pm(a.pnl)}<small>${a.pnl>=0?'made':'lost'} on $100,000</small></p>
          <p class="wc-ch-l">Right way on <b>${a.W} of ${tot}</b> calls. Best: <b>${pm(b.v)}</b> on ${esc(b.r.co)}.</p>
          <p class="wc-form" aria-label="Last five calls">${a.seq.slice(-5).map(x=>`<i class="${x==='W'?'wc-fw':'wc-fl'}">${x==='W'?'✓':'✗'}</i>`).join('')}<small>last 5 calls</small></p>
        </div></article>`}).join('')}</div>
  </section>`;

  /* the cast in the standings' columns (cast=cols): one row per AI, rank, model with its mark and flag, W-L, hit rate, P&L biggest */
  const N=n,half=m=>P[m].W+P[m].L>=N/2;
  const castCols=`<section class="wc-chars c2-cc" aria-label="The cast">
    <h2 class="wc-h2"><span>Meet the cast</span><small>Ranked by their pretend $100,000 accounts</small></h2>
    <div class="c2-ct" role="table" aria-label="The cast, ranked by P&amp;L">
      <div class="c2-ct-h" role="row"><span role="columnheader" class="c2-ct-rk"><span class="wc-sr">Rank</span>#</span><span role="columnheader" class="c2-ct-ai">Model</span><span role="columnheader">W-L</span><span role="columnheader">Hit rate</span><span role="columnheader" class="c2-ct-plh">P&amp;L</span></div>
      ${rank.map((m,i)=>{const a=P[m],tot=a.W+a.L,hr=Math.round(a.W/tot*100);
        return `<div class="c2-ct-r c2-ct-${i+1}${half(m)?'':' c2-ct-q'}" role="row" style="--mc:${MODELS[m].c}">
        <span role="cell" class="c2-ct-rk">${i+1}</span>
        <span role="cell" class="c2-ct-ai">${face(m,'c2-ct-f')}<span class="c2-ct-nm"><b>${NM[m]}</b><small>${esc(String(MODELS[m].ver||'').replace(/^GPT-/,''))} ${cflag(m==='KIMI'?'CN':'US')}</small>${i===0?'<em class="c2-ct-tag">Makes the buyback call</em>':''}</span></span>
        <span role="cell" class="c2-ct-wl"><b class="c2-w">${a.W}</b>-<b class="c2-l">${a.L}</b></span>
        <span role="cell" class="c2-ct-hr">${hr}%</span>
        <span role="cell" class="c2-ct-pl ${a.pnl>=0?'wc-tu':'wc-td'}">${pm(a.pnl)}</span></div>`}).join('')}
    </div>
    <p class="c2-ct-ft">W = right way on the call. P&amp;L: $100,000 to start, the whole balance on every call. Simulated, before fees.</p>
  </section>`;

  /* ---------- THE SEASON SO FAR ---------- */
  const rest=R.filter(r=>!night.includes(r)).sort((a,b)=>b.n-a.n);
  const season=`<section class="wc-season" aria-label="The season so far">
    <h2 class="wc-h2"><span>${nightLbl}</span><small>${md(lastDate)} · ${night.length} report${night.length===1?'':'s'} graded at the close</small></h2>
    ${bigPanel(head,0)}
    ${others.length?`<div class="wc-also"><p class="wc-gut">Also ${nightLbl==='Today'?'today':nightLbl.toLowerCase()}…</p><div class="wc-row">${others.map(smallPanel).join('')}</div></div>`:''}
    <h2 class="wc-h2 wc-h2-b"><span>Back issues</span><small>Every graded round. Tap one to open its graded card.</small></h2>
    <div class="wc-bis" data-all="0">${rest.map(backIssue).join('')}</div>
    <button type="button" class="wc-more">Show all ${rest.length} back issues</button>
    <p class="wc-key">Corner face = the round's winner (closest call that got the direction). × = nobody got the direction. % = how far the stock moved at the close.</p>
  </section>`;

  /* ---------- SPLASH: SMART OR LUCKY ---------- */
  const splash=`<p class="wc-cap wc-beat">Meanwhile, the big question…</p><section class="wc-splash" aria-label="Smart or lucky?">
    <div class="wc-burst"><h2>Smart or lucky?</h2></div>
    <p class="wc-sp-lead">Flip a coin on every report and you get about half right. So who is beating the coin?</p>
    <div class="wc-coins">${rank.slice().sort((a,b)=>P[b].W/(P[b].W+P[b].L)-P[a].W/(P[a].W+P[a].L)).map(m=>{const a=P[m],t=a.W+a.L,h=a.W/t,c=coin(a.W,t);
      const odds=h<=.5?'Doing worse than a coin.':`A coin does this well about 1 time in ${Math.max(2,Math.round(1/c))}.`;
      return `<div class="wc-cn" style="--mc:${MODELS[m].c};--h:${(h*100).toFixed(1)}%">${face(m)}<b class="wc-cn-n">${NM[m]}</b>
        <span class="wc-cn-bar"><i></i><em title="coin flip">coin</em></span><b class="wc-cn-p">${Math.round(h*100)}%</b><small>${odds}</small></div>`}).join('')}</div>
    <p class="wc-cap wc-cap-y wc-sp-cap">% = calls that got the direction right. ${n} rounds is a small sample. The real question: do they get better as the season goes on?</p>
  </section>`;

  /* ---------- CLIFFHANGER ---------- */
  const tn=tonight.slice(0,4);
  const cliff=`<p class="wc-cap wc-beat">And next on the card…</p><section class="wc-cliff" aria-label="To be continued">
    <h2 class="wc-h2"><span>${tLabel}</span><small>${tonight.length} rounds. Every call locked before the report. The close decides.</small></h2>
    <div class="wc-tn">${tn.map(p=>{const lg=coLogo(p.ticker);return `<article class="wc-tnp"><header>${lg?`<img src="${lg}" alt="">`:''}<b>${esc(p.co)}</b></header>
      <div class="wc-tn-c">${ORDER.map(m=>{const c=p.calls.find(x=>x.m===m);return c?`<span class="wc-tn-s ${c.dir==='UP'?'wc-tu':'wc-td'}">${face(m,'wc-f-s')}${c.dir==='UP'?'Up':'Down'} ${c.mag}%</span>`:''}).join('')}</div></article>`}).join('')}</div>
    ${tonight.length>tn.length?`<p class="wc-gut wc-gut-s"><a class="wc-gut-a" href="#/upcoming">+ ${tonight.length-tn.length} more locked in. See the card →</a></p>`:''}
    <p class="wc-cap wc-beat c2-nt">Next time… the main event</p>
  </section>`;

  /* ---------- GET $EZ (the live page's own words) ---------- */
  const get=`<section class="wc-get" aria-label="Get $EZ">
    <h2 class="wc-h2"><span>Get $EZ</span><small>The token. Not live yet.</small></h2>
    <div class="wc-get-p">
      <div class="wc-step"><b>1</b><p><strong>Check the address.</strong> Not posted yet. It appears here, and only here, at launch. Anyone DMing you a CA before that is a scammer.</p></div>
      <div class="wc-step"><b>2</b><p><strong>Use this page's link.</strong> Opens at launch.</p></div>
      <p class="wc-cap wc-get-cap">Best case, an AI buys back $EZ with its winnings. Worst case, the most entertaining way to lose money. Size accordingly.</p>
    </div>
  </section>`;

  /* ---------- BACK COVER ---------- */
  const back=`<section class="wc-back" aria-label="Back cover">
    <p class="wc-motto">Nobody said it would be <span class="wc-e">E</span><span class="wc-z">Z</span>.</p>
    <a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a>
    <p class="wc-fine">New panels whenever a round is graded. P&amp;L is simulated: $100,000 each, the whole balance on every call, no leverage, before fees. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.</p>
  </section>`;

  const book=D.createElement('div');book.id='wc-book';book.className='wc-book';
  book.innerHTML=cover+prev+(V.cast==='cols'?castCols:cast)+season+cliff;
  const main=D.querySelector('main');main.insertBefore(book,main.firstChild);
  /* the live page's bet section (05: the NVIDIA ticket with its running countdown, joined to the Season 2 ticket) stays where it is
     and shows between the book and its tail, in comic dress (CSS order on main#top); the tail is Get $EZ and the back cover */
  const tail=D.createElement('div');tail.id='wc-tail';tail.className='wc-book c2-tail';tail.innerHTML=get+back;main.appendChild(tail);
  const bs=D.getElementById('x2pSt');if(bs){bs.classList.add('c2-bet');const h=bs.querySelector('h2');if(h)h.textContent='Bet #1: NVIDIA';const eb=bs.querySelector('.sh .eb');if(eb)eb.textContent='The main event'}
  // the real explainer film moves onto the cover (its controls keep working)
  const vt=D.querySelector('.x2p-vt');if(vt)book.querySelector('.wc-film-slot').appendChild(vt);
  H.classList.add('wc-on');
  wire(book)}

function wire(book){
  book.querySelector('.wc-more').addEventListener('click',e=>{const g=book.querySelector('.wc-bis');const all=g.dataset.all==='1';g.dataset.all=all?'0':'1';e.target.textContent=all?e.target.textContent.replace('Show fewer','Show all'):'Show fewer back issues'});
  // the big panel's film rolls muted while on screen; a tap plays it with sound
  book.querySelectorAll('.wc-big').forEach(pn=>{const v=pn.querySelector('video'),b=pn.querySelector('.wc-snd');if(!v)return;
    b.addEventListener('click',()=>{if(v.muted||v.paused){v.muted=false;v.currentTime=0;v.play();b.textContent='❚❚ Pause'}else{v.pause();b.textContent='▶ Sound'}});
    v.addEventListener('click',()=>{D.location.hash='#/round/'+pn.dataset.n})});
  const io=new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;if(e.isIntersecting)t.classList.add('wc-in');
    const v=t.querySelector&&t.querySelector('video.wc-v');if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches){if(e.isIntersecting&&e.intersectionRatio>.35){v.play().catch(()=>{})}else if(!e.isIntersecting)v.pause()}}),{threshold:[0,.4]});
  book.querySelectorAll('.wc-pn,.wc-ch,.wc-splash,.wc-next,.wc-prev,.wc-tnp,.wc-cn').forEach(x=>io.observe(x));
  let ly=scrollY;addEventListener('scroll',()=>{const y=scrollY;H.classList.toggle('wc-hhide',y>ly&&y>200);ly=y},{passive:true});
}


/* ================= THE LEADERBOARD TAB (#/leaderboard): the fuller standings, in the same comic ================= */
const SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
const sgn=v=>(v>=0?'+':'−');
const pc1=v=>sgn(v)+Math.abs(v).toFixed(1)+'%';
const kShort=v=>sgn(v)+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
function callOf(r,m){const c=r.calls.find(x=>x[0]===m&&x[1]);if(!c)return null;const x=call(c[1]);return x?{ok:x.up===(r.a>0),off:+c[2],c:x}:null}
function streak(seq){if(!seq.length)return '';const L=seq[seq.length-1];let k=0;for(let i=seq.length-1;i>=0&&seq[i]===L;i--)k++;return L+k}

function lbBuild(){
  const PL=window.__x2pPnl(),P=PL.A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length,rank=rankPnl(P,N);
  const S={};ORDER.forEach(m=>{const cs=R.map(r=>callOf(r,m)).filter(Boolean);S[m]={bu:cs.filter(x=>x.ok&&x.off<=.1).length,w1:cs.filter(x=>x.ok&&x.off<=1).length,ot:cs.filter(x=>!x.ok).length}});
  /* the race: each AI's balance after every graded round, its place, the lead changes and the overtakes */
  const bal={},pos={};ORDER.forEach(m=>{bal[m]=[1e5];pos[m]=[]});
  let prev=ORDER.slice();const steps=[prev.slice()];
  R.forEach((r,i)=>{ORDER.forEach(m=>{const x=P[m].per[r.n];bal[m].push(bal[m][i]+(x?x.v:0))});
    const o=ORDER.slice().sort((a,b)=>(bal[b][i+1]-bal[a][i+1])||(prev.indexOf(a)-prev.indexOf(b)));steps.push(o);prev=o});
  steps.forEach((o,i)=>o.forEach((m,j)=>pos[m][i]=j+1));
  const leads=[];for(let i=1;i<steps.length;i++){if(i===1||steps[i][0]!==steps[i-1][0])leads.push({i,n:R[i-1].n,m:steps[i][0]})}
  const changes=leads.length-1,since=leads[leads.length-1];
  const ev=[];for(let i=2;i<steps.length;i++){steps[i].forEach(m=>{const was=steps[i-1].indexOf(m),now=steps[i].indexOf(m);if(now<was){const past=steps[i-1].slice(now,was).filter(o=>steps[i].indexOf(o)>now);if(past.length)ev.push({n:R[i-1].n,co:R[i-1].co,m,past,to:now+1})}})}
  const W=600,Hh=4,X=i=>i/N*W,Y=p=>(p-.5);
  const lines=rank.slice().reverse().map(m=>{const d=pos[m].map((p,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(p).toFixed(2)).join(' ');
    return `<path class="wc-rc-o" d="${d}"/><path class="wc-rc-l${m===rank[0]?' wc-rc-lead':''}" style="--mc:${MODELS[m].c}" d="${d}"/>`}).join('');
  const stars=leads.slice(1).map(l=>`<i class="wc-rc-st" style="left:${(l.i/N*100).toFixed(2)}%" title="R${l.n}: ${NM[l.m]} takes the lead"></i>`).join('');
  const ends=ORDER.map(m=>`<span class="wc-rc-end" style="top:${((pos[m][N]-.5)/4*100).toFixed(2)}%">${face(m,'wc-f-s')}<b>${NM[m]}</b></span>`).join('');
  const race=`<section class="wc-race" aria-label="The race so far">
    <h2 class="wc-h2"><span>The race so far</span><small>Who was in front after every graded round. The lead has changed hands ${changes} time${changes===1?'':'s'}. ${NM[since.m]} has led since round ${since.n}.</small></h2>
    <div class="wc-pn wc-rc"><div class="wc-rc-plot"><span class="wc-rc-ax wc-rc-y" aria-hidden="true"><i>1st</i><i>2nd</i><i>3rd</i><i>4th</i></span>
      <div class="wc-rc-cv"><svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" aria-hidden="true">${[1,2,3].map(k=>`<line class="wc-rc-g" x1="0" x2="${W}" y1="${k}" y2="${k}"/>`).join('')}${lines}</svg>${stars}<div class="wc-rc-ends">${ends}</div></div></div>
      <p class="wc-rc-x" aria-hidden="true"><span>Start</span><span>R${R[N-1].n}</span></p>
      <p class="wc-rc-k"><i class="wc-rc-st wc-rc-stk"></i> a new leader</p>
      <h3 class="wc-rc-h">Latest overtakes</h3>
      <ol class="wc-ot">${ev.slice(-6).reverse().map(e=>`<li><span class="wc-ot-r">R${e.n}</span>${face(e.m,'wc-f-s')}<span><b>${NM[e.m]}</b> passes ${e.past.map(o=>NM[o]).join(' and ')}<small>on ${esc(e.co)} · now #${e.to}</small></span></li>`).join('')}</ol>
    </div></section>`;

  const roleOf=i=>i===0?'Makes the buyback call':'';
  const board=`<section class="wc-sbd" aria-label="The scoreboard">
    <h2 class="wc-h2"><span>The scoreboard</span><small>Ranked by P&amp;L on a pretend $100,000 each. Top P&amp;L makes the buyback call.</small></h2>
    <div class="wc-sb">${rank.map((m,i)=>{const a=P[m],t=a.W+a.L,hr=t?Math.round(a.W/t*100):0,st=streak(a.seq);
      return `<article class="wc-sb-r${i===0?' wc-sb-1':''}" style="--mc:${MODELS[m].c}">
        <span class="wc-sb-rk">#${i+1}</span>${face(m,'wc-f-m')}
        <div class="wc-sb-nm"><h3>${NM[m]}</h3><small>${esc(MODELS[m].ver)}</small>${roleOf(i)?'<em>'+roleOf(i)+'</em>':''}</div>
        <p class="wc-sb-pl ${a.pnl>=0?'wc-tu':'wc-td'}">${pm(a.pnl)}<small>${pc1(a.pnl/1000)}</small></p>
        <dl class="wc-sb-st"><div><dt>W-L</dt><dd><b class="wc-tu">${a.W}</b>-<b class="wc-td">${a.L}</b></dd></div><div><dt>Hit rate</dt><dd>${hr}%</dd></div><div><dt>Streak</dt><dd class="${st[0]==='W'?'wc-tu':'wc-td'}">${st}</dd></div>
          <div class="wc-sb-f"><dt>Last 5</dt><dd class="wc-form">${a.seq.slice(-5).map(x=>`<i class="${x==='W'?'wc-fw':'wc-fl'}">${x==='W'?'✓':'✗'}</i>`).join('')}</dd></div></dl>
      </article>`}).join('')}</div>
    <p class="wc-cap wc-cap-y wc-sb-cap">P&amp;L is simulated: $100,000 to start, the whole balance on every call, buy on up, short on down, no leverage, before fees. W = right direction. An AI that called under half the rounds ranks after the rest.</p>
  </section>`;

  const bw=m=>{let b=null,w=null;R.forEach(r=>{const x=P[m].per[r.n];if(!x)return;if(!b||x.v>b.v)b={v:x.v,r,dn:x.dn};if(!w||x.v<w.v)w={v:x.v,r,dn:x.dn}});return {b,w}};
  const bwl=(x,k)=>`<p class="wc-bw-l ${k}"><span class="wc-bw-k">${k==='wc-bw-b'?'Best':'Worst'}</span><b class="${x.v>=0?'wc-tu':'wc-td'}">${pm(x.v)}</b><small>said ${esc(x.r.co)} would go ${x.dn?'down':'up'}. It ${x.r.a>0?'rose':'fell'} ${pct(x.r.a)}. Round ${x.r.n}.</small></p>`;
  const bws=`<section class="wc-bws" aria-label="Best and worst calls">
    <h2 class="wc-h2"><span>Best and worst calls</span><small>Each AI's biggest win and biggest loss on a single call.</small></h2>
    <div class="wc-bwg">${rank.map(m=>{const x=bw(m);return `<article class="wc-pn wc-bw" style="--mc:${MODELS[m].c}"><header>${face(m)}<h3>${NM[m]}</h3></header>${bwl(x.b,'wc-bw-b')}${bwl(x.w,'wc-bw-w')}</article>`}).join('')}</div>
  </section>`;

  const byT=ORDER.slice().sort((a,b)=>(S[b].bu-S[a].bu)||(S[b].w1-S[a].w1)||(S[a].ot-S[b].ot));
  const tg=`<section class="wc-tgs" aria-label="Target practice">
    <h2 class="wc-h2"><span>Target practice</span><small>How close did they get to the real move?</small></h2>
    <div class="wc-pn wc-tg"><div class="wc-tg-h" aria-hidden="true"><span></span><span>Bullseyes</span><span>Within 1%</span><span>Off target</span></div>
      ${byT.map((m,i)=>`<div class="wc-tg-r${i===0?' wc-tg-1':''}"><span class="wc-tg-nm">${face(m,'wc-f-s')}<b>${NM[m]}</b></span><b class="wc-tg-b" aria-label="${S[m].bu} bullseyes">${S[m].bu}</b><b class="wc-tg-w" aria-label="${S[m].w1} within 1%">${S[m].w1}</b><b class="wc-tg-o" aria-label="${S[m].ot} off target">${S[m].ot}</b></div>`).join('')}
      <p class="wc-tg-k">Bullseye: the right way and within 0.1% of the move. Within 1%: the right way and within 1% (bullseyes count too). Off target: the wrong way.</p></div>
  </section>`;

  const sec=r=>((window.RMETA||{})[r.n]||{}).sector||'',cnt={};R.forEach(r=>{const x=sec(r);if(x)cnt[x]=(cnt[x]||0)+1});
  const secs=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
  const cell=(m,x)=>{let n=0,k=0;R.forEach(r=>{if(sec(r)!==x)return;const c=callOf(r,m);if(c){n++;if(c.ok)k++}});return {n,k}};
  const sct=`<section class="wc-secs" aria-label="By sector">
    <h2 class="wc-h2"><span>By sector</span><small>Which industries do they call best? Right calls out of calls made. Small samples, so it fills in.</small></h2>
    <div class="wc-pn wc-sct"><table><thead><tr><th scope="col">Sector</th>${rank.map(m=>`<th scope="col">${face(m,'wc-f-s')}<span>${NM[m]}</span></th>`).join('')}</tr></thead><tbody>
    ${secs.map(x=>{const cs=rank.map(m=>cell(m,x)),v=cs.map(c=>c.n?c.k/c.n:-1),mx=Math.max(...v),all=v.every(y=>y===mx);
      return `<tr><th scope="row">${esc(SH[x]||x)}<small>${cnt[x]}</small></th>${cs.map((c,i)=>!c.n?'<td class="wc-sc-0">–</td>':`<td class="${3*c.k>=2*c.n?'wc-sc-hi':3*c.k<=c.n?'wc-sc-lo':'wc-sc-md'}${!all&&v[i]===mx?' wc-sc-top':''}">${c.k}/${c.n}</td>`).join('')}</tr>`}).join('')}
    </tbody></table><p class="wc-tg-k">Green: 2 in 3 right or better. Red: 1 in 3 or worse. Outlined: the best in its row.</p></div>
  </section>`;

  const el=D.createElement('div');el.id='wc-lb';el.className='wc-book wc-tab';
  el.innerHTML=`<section class="wc-tab-cv" aria-label="Who's winning"><div class="wc-cv-top"><span class="wc-iss"><small>Issue</small>#${N}</span><span class="wc-cv-s">The standings<small>${N} earnings reports graded</small></span></div>
    <h1 class="wc-tab-h">Who's winning?</h1><p class="wc-tag">Four AIs, a pretend <b>$100,000</b> each, the whole balance on every call. The money says who's best.</p></section>`
    +board+race+bws+tg+sct+`<section class="wc-back"><a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a></section>`;
  return el}

/* ================= THE UPCOMING TAB (#/upcoming): the next fight nights, in the same comic ================= */
/* each exchange's close, local time (Seoul and Tokyo 15:30, Taipei 13:30, Hong Kong 16:00, London 16:30, the euro exchanges 17:30) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
function bellTxt(t,mdy){const at=closeAt(t,mdy);if(at==null)return 'Date to come';const ms=at-Date.now();if(ms<=0)return 'The bell has rung · results soon';const mn=Math.round(ms/6e4),h=Math.floor(mn/60);
  return 'Bell in '+(h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m')}
const nk=s=>{if(!s)return '';const [m,d,y]=s.split('/').map(Number);return m+'/'+d+'/'+(y%100)};
const mdyKey=s=>{if(!s)return 9e9;const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const dayName=s=>{const [m,d,y]=s.split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,d)).toLocaleDateString('en-US',{weekday:'long',month:'short',day:'numeric',timeZone:'UTC'})};
function relDay(s){const t=nyToday(),[m,d,y]=s.split('/').map(Number),dd=Math.round((Date.UTC(2000+(y%100),m-1,d)-Date.UTC(2000+t[2],t[0]-1,t[1]))/864e5);return dd===0?'Tonight':dd===1?'Tomorrow':dd===-1?'Yesterday':null}

function upBuild(){
  const RM=window.RMETA||{},PEN=(window.PENDING||[]).slice(),UP=(window.UPCOMING||[]).slice();
  const live=PEN.filter(p=>p.calls&&p.calls.length);
  const t=nyToday(),tk=t[2]*1e4+t[0]*100+t[1];
  const days={};live.forEach(p=>{const k=nk(p.resolves);(days[k]=days[k]||[]).push(p)});
  const dk=Object.keys(days).sort((a,b)=>mdyKey(a)-mdyKey(b));
  const tick=p=>{const lg=coLogo(p.ticker),cs=ORDER.map(m=>p.calls.find(c=>c.m===m)).filter(Boolean),u=cs.filter(c=>c.dir==='UP').length;
    return `<a class="wc-pn wc-lv" href="#/round/${p.n}" data-n="${p.n}"><header>${lg?`<img src="${lg}" alt="">`:''}<h3>${esc(p.co)}<small>${esc(p.ticker)} · Round ${p.n}</small></h3><span class="wc-bell" data-t="${esc(p.ticker)}" data-d="${p.resolves||''}">${bellTxt(p.ticker,p.resolves)}</span></header>
      <div class="wc-lvc">${cs.map(c=>`<div class="wc-lvs ${c.dir==='UP'?'wc-lvu':'wc-lvd'}">${face(c.m,'wc-f-s')}<p><small>${NM[c.m]}</small>${c.dir==='UP'?'Up':'Down'} ${c.mag}%</p></div>`).join('')}</div>
      <p class="wc-lv-f">${u} say${u===1?'s':''} up, ${cs.length-u} say${cs.length-u===1?'s':''} down. Locked before the report.</p></a>`};
  const spot=dk.map(k=>{const r=k?relDay(k):null,lab=!k?'Date to come':r==='Tonight'?'Tonight at the close':r==='Tomorrow'?'Tomorrow at the close':'At the close, '+md(k);
    const g=days[k].sort((a,b)=>cap(b.ticker)-cap(a.ticker));
    return `<section class="wc-spot" aria-label="${esc(lab)}"><h2 class="wc-h2"><span>${esc(lab)}</span><small>${g.length} round${g.length===1?'':'s'}. Every call locked before the report. The close decides.</small></h2><div class="wc-lvg">${g.map(tick).join('')}</div></section>`}).join('');
  const ud={};UP.forEach(u=>{const k=nk(u.called);(ud[k]=ud[k]||[]).push(u)});
  /* days still to come first; a day already gone whose calls are not in yet goes last, said as it is */
  const uk=Object.keys(ud).sort((a,b)=>{const pa=a&&mdyKey(a)<tk,pb=b&&mdyKey(b)<tk;return pa!==pb?(pa?1:-1):mdyKey(a)-mdyKey(b)});
  const tile=u=>{const lg=coLogo(u.ticker),me=RM[u.n]||{},m7=!!me.mag7,ai=(me.themes||[]).indexOf('AI')>-1,nv=u.ticker==='NVDA';
    return `<a class="wc-ut${m7?' wc-ut-m7':''}${nv?' wc-ut-nv':''}" href="#/round/${u.n}" data-m7="${m7?1:0}" data-ai="${ai?1:0}"><span class="wc-ut-lg">${lg?`<img src="${lg}" alt="" loading="lazy">`:''}</span>
      <b>${esc(u.co)}</b><small>${esc(u.ticker)} · R${u.n}</small>${nv?'<em>Bet #1</em>':m7?'<em>Mag 7</em>':''}</a>`};
  const cal=uk.map(k=>{const g=ud[k].sort((a,b)=>cap(b.ticker)-cap(a.ticker)),past=k&&mdyKey(k)<tk,r=k?relDay(k):null;
    return `<section class="wc-ud" aria-label="${k?esc(dayName(k)):'Date to come'}"><h3 class="wc-ud-h"><span>${k?(r&&r!=='Yesterday'?r+' · ':'')+esc(dayName(k)):'Date to come'}</span><small>${past?'Calls not in yet':g.length+' on the card'}</small></h3><div class="wc-utg">${g.map(tile).join('')}</div></section>`}).join('');
  const el=D.createElement('div');el.id='wc-up';el.className='wc-book wc-tab';
  el.innerHTML=`<section class="wc-tab-cv" aria-label="Coming up"><div class="wc-cv-top"><span class="wc-iss"><small>To come</small>${live.length+UP.length}</span><span class="wc-cv-s">Coming up<small>${live.length} with calls in · ${UP.length} still to call</small></span></div>
    <h1 class="wc-tab-h">Next on the card</h1><p class="wc-tag">Every AI calls each stock <b>before</b> it reports. The next market close grades it. Tap a round to open its card.</p></section>`
    +spot+`<h2 class="wc-h2 wc-h2-b"><span>Coming up</span><small>Calls drop before each report. Every round still to come, day by day.</small></h2>
    <div class="wc-flt" role="group" aria-label="Show"><button type="button" aria-pressed="true" data-f="">All</button><button type="button" aria-pressed="false" data-f="m7">Mag 7</button><button type="button" aria-pressed="false" data-f="ai">AI</button></div>
    <div class="wc-cal">${cal}</div>
    <section class="wc-back"><a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Get every call on X</a></section>`;
  el.querySelectorAll('.wc-flt button').forEach(b=>b.addEventListener('click',()=>{el.querySelectorAll('.wc-flt button').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));el.querySelector('.wc-cal').dataset.f=b.dataset.f}));
  setInterval(()=>{if(H.getAttribute('data-sec')!=='upcoming')return;el.querySelectorAll('.wc-bell').forEach(b=>{b.textContent=bellTxt(b.dataset.t,b.dataset.d)})},60000);
  return el}

function lbCover(){const N=ROUNDS.length,el=D.createElement('div');el.id='c2-lbcv';el.className='wc-book c2-lbcv';
  el.innerHTML=`<section class="wc-tab-cv" aria-label="Who's winning"><div class="wc-cv-top"><span class="wc-iss"><small>Issue</small>#${N}</span><span class="wc-cv-s">The standings<small>${N} earnings reports graded</small></span></div>
    <h1 class="wc-tab-h">Who's winning?</h1>${V.rules==='none'?`<p class="wc-tag">Four AIs trade every earnings report with a pretend <b>$100,000</b> each, the whole balance on every call, graded at the close. <b>Top P&amp;L makes the buyback call.</b></p><p class="wc-tag c2-tag2">${N} rounds graded so far. Don't trust them: check the trend below.</p>`:`<p class="wc-tag">Four AIs, a pretend <b>$100,000</b> each, the whole balance on every call. The money says who's best.</p>`}</section>`;
  return el}
function tabs(){const v=D.getElementById('view');const up=upBuild();(v||D.querySelector('main')).after(up);
  const main=D.querySelector('main#top');main.insertBefore(lbCover(),main.firstChild);
  ['standings','learn'].forEach(id=>{const s=D.getElementById(id);if(s)s.classList.add('c2-lb')});
  /* rules=line: one short caption each (the strap's own last rule; the stats' first, shortened) */
  if(V.rules==='line'){const one=(sel,t)=>{const ul=D.querySelector(sel+' .x2p-strap ul');if(ul)ul.innerHTML='<li>'+t+'</li>'};one('#standings','Top P&amp;L makes the buyback call.');one('#learn',"Don't trust them. Check the trend.")}
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wc-in');io.unobserve(e.target)}}),{threshold:.15});
  [up].forEach(x=>x.querySelectorAll('.wc-pn,.wc-sb-r').forEach(y=>io.observe(y)));
  /* a halftone screen printed into every ticket's paper (inside the die-cut layer, so the dots stop at the cut) */
  const dots=()=>D.querySelectorAll('#standings .bt-pp,#learn .bt-pp,#x2pSt .bt-pp,#x2pSt .x2p-bt').forEach(p=>{if(!p.querySelector(':scope > .c2-dots')){const d=D.createElement('i');d.className='c2-dots';d.setAttribute('aria-hidden','true');p.appendChild(d)}});
  /* tix=flat: a flat comic panel laid over each ticket's paper, inside the die cut (bands in flat green and red with an ink rule,
     plain stock between); the band heights are read from the band lettering strips the page draws (.bt-hd / .bt-ft) */
  const flat=()=>{if(V.tix!=='flat')return;D.querySelectorAll('#standings .bt-pp,#learn .bt-pp,#x2pSt .bt-pp').forEach(pp=>{
    let f=pp.querySelector(':scope > .c2-flat');if(!f){f=D.createElement('i');f.className='c2-flat';f.setAttribute('aria-hidden','true');pp.insertBefore(f,pp.firstChild)}
    const bp=pp.parentElement,hd=bp.querySelector(':scope > .bt-hd'),ft=bp.querySelector(':scope > .bt-ft');
    const ht=hd?Math.round(hd.getBoundingClientRect().height*10)/10:0,hb=ft?Math.round(ft.getBoundingClientRect().height*10)/10:0;
    if(f.dataset.k!==ht+'/'+hb){f.dataset.k=ht+'/'+hb;f.style.setProperty('--ht',ht+'px');f.style.setProperty('--hb',hb+'px');f.style.setProperty('--lt',ht?'3px':'0px');f.style.setProperty('--lb',hb?'3px':'0px')}})};
  /* the proof card's paper is its own SVG silhouette (folder tabs + strip): flatten its fills in place, add the dot screen inside its mask */
  const flatProof=()=>{if(V.tix!=='flat')return;D.querySelectorAll('#learn .pr2-sil svg').forEach(sv=>{if(sv.dataset.c2f)return;sv.dataset.c2f=1;
    const NS='http://www.w3.org/2000/svg',defs=sv.querySelector('defs');
    if(defs&&!sv.querySelector('#c2BD')){const pt=D.createElementNS(NS,'pattern');pt.id='c2BD';pt.setAttribute('patternUnits','userSpaceOnUse');pt.setAttribute('width','8');pt.setAttribute('height','8');
      pt.innerHTML='<circle cx="4" cy="4" r="1.5" fill="rgba(232,51,43,.16)"/>';defs.appendChild(pt)}
    sv.querySelectorAll(':scope > g[filter]').forEach(g=>g.style.display='none');
    sv.querySelectorAll('[fill]').forEach(e=>{const f=e.getAttribute('fill');
      if(f==='#f8f0d9')e.setAttribute('fill','#fff8e6');
      else if(/^url\(#pr2\w+g\)$/.test(f)){e.setAttribute('fill','url(#c2BD)')}
      else if(/^url\(#pr2\w+gr\)$/.test(f))e.setAttribute('fill','#12a85a');
      else if(/^url\(#pr2\w+r\)$/.test(f))e.setAttribute('fill','#e8332b');
      else if(f==='rgba(0,0,0,.22)'&&e.tagName==='rect'){const h=+e.getAttribute('height');if(h<2){e.setAttribute('fill','#15121a');e.setAttribute('height','2.5');const y=+e.getAttribute('y');if(y>100)e.setAttribute('y',String(y-1.3))}}})})};
  const all=()=>{dots();flat();flatProof()};
  all();let q=0;new MutationObserver(()=>{if(q)return;q=requestAnimationFrame(()=>{q=0;all()})}).observe(D.querySelector('main#top'),{childList:true,subtree:true});
  addEventListener('resize',()=>requestAnimationFrame(flat));if(D.fonts)D.fonts.ready.then(flat)}
const done=()=>H.classList.add('x2p-world');
/* a round opened from a panel, a back issue or a ticket: when its card closes, the page goes back to where it was
   (the router scrolls the page while the card is open, and the address passes through '' on the way) */
let back=null,open=false;addEventListener('pointerdown',e=>{const a=e.target.closest&&e.target.closest('#wc-book a[href^="#/round/"],#wc-lb a[href^="#/round/"],#wc-up a[href^="#/round/"],#wc-book .wc-big video');if(a){back=scrollY;open=false}},true);
new MutationObserver(()=>{if(back==null)return;const rm=D.getElementById('x2pRm');if(rm){open=true;return}if(!open)return;
  const y=back;back=null;open=false;const go=()=>scrollTo({top:y,behavior:'instant'});requestAnimationFrame(()=>{go();setTimeout(go,150);setTimeout(go,500)})}).observe(D.body,{childList:true});
let tries=0;(function wait(){
  if(window.__x2pPnl&&window.ROUNDS&&D.querySelector('.x2p-vt')&&D.querySelector('#x2pSt')&&D.querySelector('#standings')){
    try{build();H.classList.add('c2-on')}catch(e){window.__x2pWorldErr=e;console.error('comic',e)}
    try{tabs()}catch(e){window.__x2pWorldErr=e;console.error('comic tabs',e)}
    done()}
  else if(tries++<200)setTimeout(wait,50);else done()})();
})();
