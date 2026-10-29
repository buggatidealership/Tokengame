/* EZ world: THE COMIC BOOK (mockup). Injected at DOMContentLoaded; waits for the page to be built,
   then builds this week's issue from the page's own data (ROUNDS, PENDING, UPCOMING, FILMS, MODELS,
   CO_LOGOS, CAPS, __x2pPnl). Every number comes from the data; speech balloons only say the AI's call.
   The original Overview sections stay in the DOM (off screen) so the round pop-up (the PSA slab) still works. */
(function(){
'use strict';
const D=document,H=D.documentElement;
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

  /* ---------- LAST ROUND: one round, start to finish (owner, 2026-10-29: "the section where they should understand ... the process
     of one given round, and we use the last round as the example and the case study"). Always the newest graded round with a film. ---------- */
  const lastR=lastRound(R,P);

  /* ---------- BACK ISSUES: every graded round, newest first ---------- */
  const all=R.slice().sort((a,b)=>b.n-a.n);
  const issues=`<section class="wc-season" aria-label="Back issues">
    <h2 class="wc-h2 wc-h2-b"><span>Back issues</span><small>Every graded round. Tap one to open its graded card.</small></h2>
    <div class="wc-bis" data-all="0">${all.map(backIssue).join('')}</div>
    <button type="button" class="wc-more">Show all ${all.length} back issues</button>
    <p class="wc-key">Corner face = the round's winner (closest call that got the direction). × = nobody got the direction. % = how far the stock moved at the close.</p>
  </section>`;

  /* ---------- TONIGHT AT THE CLOSE ---------- */
  const tn=tonight.slice(0,4);
  const cliff=tonight.length?`<p class="wc-cap wc-beat">And next on the card…</p><section class="wc-cliff" aria-label="${esc(tLabel)}">
    <h2 class="wc-h2"><span>${tLabel}</span><small>${tonight.length} round${tonight.length===1?'':'s'}. Every call locked before the report. The close decides.</small></h2>
    <div class="wc-tn">${tn.map(p=>{const lg=coLogo(p.ticker);return `<article class="wc-tnp"><header>${lg?`<img src="${lg}" alt="">`:''}<b>${esc(p.co)}</b></header>
      <div class="wc-lvc">${ORDER.map(m=>{const c=p.calls.find(x=>x.m===m);return c?`<div class="wc-lvs ${c.dir==='UP'?'wc-lvu':'wc-lvd'}">${face(m,'wc-f-s')}<p><small>${NM[m]}</small>${c.dir==='UP'?'Up':'Down'} ${c.mag}%</p></div>`:''}).join('')}</div></article>`}).join('')}</div>
    ${tonight.length>tn.length?`<p class="wc-gut wc-gut-s"><a class="wc-gut-a" href="#/upcoming">+ ${tonight.length-tn.length} more locked in. See the card →</a></p>`:''}
  </section>`:'';

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

  /* ---------- BET #1: NVIDIA, a comic chip whose dies count down to the bet ---------- */
  const bet=betChip(lead);
  /* ---------- BACK COVER ---------- */
  const back=`<section class="wc-back" aria-label="Back cover">
    <p class="wc-motto">Nobody said it would be <span class="wc-e">E</span><span class="wc-z">Z</span>.</p>
    <a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a>
    <p class="wc-fine">New panels whenever a round is graded. P&amp;L is simulated: $100,000 each, the whole balance on every call, no leverage, before fees. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.</p>
  </section>`;

  const book=D.createElement('div');book.id='wc-book';book.className='wc-book';
  book.innerHTML=cover+prev+cast+lastR+issues+cliff+splash+bet+back;
  const main=D.querySelector('main');main.insertBefore(book,main.firstChild);
  // the real explainer film moves onto the cover (its controls keep working)
  const vt=D.querySelector('.x2p-vt');if(vt)book.querySelector('.wc-film-slot').appendChild(vt);
  H.classList.add('wc-on');
  wire(book)}

function wire(book){
  book.querySelector('.wc-more').addEventListener('click',e=>{const g=book.querySelector('.wc-bis');const all=g.dataset.all==='1';g.dataset.all=all?'0':'1';e.target.textContent=all?e.target.textContent.replace('Show fewer','Show all'):'Show fewer back issues'});
  // the big panel's film rolls muted while on screen; a tap plays it with sound
  betTick(book);
  book.querySelectorAll('.wc-lr-2').forEach(pn=>{const v=pn.querySelector('video'),b=pn.querySelector('.wc-snd');if(!v)return;
    b.addEventListener('click',()=>{if(v.muted||v.paused){v.muted=false;v.currentTime=0;v.play();b.textContent='❚❚ Pause'}else{v.pause();b.textContent='▶ Sound'}});
    v.addEventListener('click',()=>{D.location.hash='#/round/'+pn.closest('.wc-lr-pg').dataset.n})});
  const io=new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;if(e.isIntersecting)t.classList.add('wc-in');
    const v=t.querySelector&&t.querySelector('video.wc-v');if(v&&!matchMedia('(prefers-reduced-motion: reduce)').matches){if(e.isIntersecting&&e.intersectionRatio>.35){v.play().catch(()=>{})}else if(!e.isIntersecting)v.pause()}}),{threshold:[0,.4]});
  book.querySelectorAll('.wc-pn,.wc-ch,.wc-splash,.wc-prev,.wc-tnp,.wc-cn').forEach(x=>io.observe(x));
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

  const proof=proofBuild(P,R,rank);
  const el=D.createElement('div');el.id='wc-lb';el.className='wc-book wc-tab';
  el.innerHTML=`<section class="wc-tab-cv" aria-label="Who's winning"><div class="wc-cv-top"><span class="wc-iss"><small>Issue</small>#${N}</span><span class="wc-cv-s">The standings<small>${N} earnings reports graded</small></span></div>
    <h1 class="wc-tab-h">Who's winning?</h1><p class="wc-tag">Four AIs, a pretend <b>$100,000</b> each, the whole balance on every call. The money says who's best.</p></section>`
    +board+proof+race+bws+`<section class="wc-back"><a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a></section>`;
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

/* ===================== R2 (owner, 2026-10-29): the last round as a case study, the NVIDIA chip, the proof, cartoon certificates ===================== */
const RM_=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const offOf=(r,m)=>{const c=r.calls.find(x=>x[0]===m);return c?+c[2]:null};
const fmtOff=v=>(Math.round(v*100)/100)+'%';
const moveWord=r=>{const x=Math.abs(r.a),up=r.a>0;return up?(x>=5?'jumped':'rose'):(x>=5?'dropped':'fell')};

function lastRound(R,P){
  const key=r=>mdyKey(r.resolves)*1000+r.n;
  const r=R.filter(x=>film(x.n)).sort((a,b)=>key(b)-key(a))[0];if(!r)return '';
  const f=film(r.n),up=r.a>0,W=winners(r),lg=coLogo(r.ticker),rel=relDay(r.resolves),day=(rel==='Yesterday'?'Yesterday · ':rel==='Tonight'?'Today · ':'')+dayName(r.resolves);
  const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);if(!row)return null;const c=call(row[1]);return c?{m,c,ok:c.up===up,off:+row[2],win:W.includes(m),v:(P[m].per[r.n]||{}).v||0}:null}).filter(Boolean);
  const right=cs.filter(x=>x.ok);
  const p1=`<li class="wc-pn wc-lr-p wc-lr-1"><b class="wc-lr-n" aria-hidden="true">1</b>
      <p class="wc-cap wc-lr-c">Before the report, the AIs said</p>
      <header class="wc-lr-co">${lg?`<span class="wc-lr-lg"><img src="${lg}" alt=""></span>`:''}<h3>${esc(r.co)}<small>Round ${r.n} · ${esc(r.ticker)}</small></h3></header>
      <div class="wc-lr-bub">${cs.map(x=>`<div class="wc-lr-s">${face(x.m)}<p class="wc-bub"><small>${NM[x.m]}</small>${callTxt(x.c)}</p></div>`).join('')}</div>
      <span class="wc-lr-lock" aria-label="Locked ${md(r.called)}">Locked ${md(r.called)}</span></li>`;
  const p2=`<li class="wc-pn wc-lr-p wc-lr-2"><b class="wc-lr-n" aria-hidden="true">2</b>
      <p class="wc-cap wc-lr-c">The report. Then the close</p>
      <div class="wc-lr-artw"><div class="wc-art wc-lr-art"><video class="wc-v" muted playsinline loop preload="none" poster="${f.p}"><source src="${f.v}" type="video/mp4"></video><button type="button" class="wc-snd" aria-label="Play with sound">▶ Sound</button></div></div>
      <div class="wc-lr-pow"><span class="wc-sfx ${up?'wc-up':'wc-dn'}" aria-hidden="true"><em>${sfx(r.a)}</em><b>${up?'+':'−'}${pct(r.a)}</b></span>
        <p>${esc(r.co)} ${moveWord(r)} <b>${pct(r.a)}</b> at the close.</p></div></li>`;
  const p3=`<li class="wc-pn wc-lr-p wc-lr-3"><b class="wc-lr-n" aria-hidden="true">3</b>
      <p class="wc-cap wc-lr-c">Graded at the close</p>
      <div class="wc-lr-g">${cs.slice().sort((a,b)=>(b.ok-a.ok)||(a.off-b.off)).map(x=>`<div class="wc-lr-gr ${x.win?'wc-win':x.ok?'wc-ok':'wc-no'}">${face(x.m)}<b class="wc-lr-gn">${NM[x.m]}</b>
        <span class="wc-lr-gv">${x.ok?'<i aria-hidden="true">✓</i> Right way':'<i aria-hidden="true">✗</i> Wrong way'}</span><small>${x.ok?fmtOff(x.off)+' off':'said '+(x.c.up?'up':'down')}</small>${x.win?'<em class="wc-lr-cr">Winner</em>':''}</div>`).join('')}</div>
      <p class="wc-lr-rule">${W.length?'Closest call that got the direction wins.':right.length?'Got the direction, but nobody wins this one.':'Nobody got the direction. Nobody wins.'}</p></li>`;
  const ws=cs.filter(x=>x.win),shown=ws.length?ws:cs.slice().sort((a,b)=>b.v-a.v).slice(0,1);
  const p4=`<li class="wc-pn wc-lr-p wc-lr-4"><b class="wc-lr-n" aria-hidden="true">4</b>
      <p class="wc-cap wc-lr-c">${ws.length?'The winner gets paid':'Nobody won. The money'}</p>
      <div class="wc-lr-m">${shown.map(x=>`<div class="wc-lr-mw">${face(x.m,'wc-f-l')}<b class="${x.v>=0?'wc-tu':'wc-td'}">${pm(x.v)}</b><small>${NM[x.m]} ${x.v>=0?'made':'lost'} on this call</small></div>`).join('')}</div>
      <ul class="wc-lr-all" aria-label="Every AI's P&L on this call">${cs.map(x=>`<li>${face(x.m,'wc-f-s')}<span>${NM[x.m]}</span><b class="${x.v>=0?'wc-tu':'wc-td'}">${kShort(x.v)}</b></li>`).join('')}</ul>
      <p class="wc-lr-fine">Pretend $100,000 accounts, the whole balance on every call.</p>
      <a class="wc-lr-open" href="#/round/${r.n}">Open its graded card →</a></li>`;
  return `<section class="wc-lr" aria-label="Last round">
    <h2 class="wc-h2"><span>Last round</span><small>${esc(day)} · ${esc(r.co)}. How a round works, start to finish.</small></h2>
    <ol class="wc-lr-pg" data-n="${r.n}">${p1}${p2}${p3}${p4}</ol></section>`}

/* the bet: the close the weekday after NVIDIA's call date in the sheet (or SIM/CONFIG.betDate), as routes.js counts it */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function betLeft(){const at=betAt();if(!at)return null;const s=Math.max(0,Math.floor((at-Date.now())/1e3));return {s,d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),x:s%60}}
function betChip(lead){
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):69,at=betAt(),L=betLeft();
  const day=at?new Date(at).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  const die=(k,v,l)=>`<span class="wc-die" data-k="${k}"><b>${String(v).padStart(2,'0')}</b><small>${l}</small></span>`;
  return `<p class="wc-cap wc-beat">Next time…</p><section class="wc-bet" aria-label="Bet number 1, NVIDIA">
    <h2 class="wc-h2"><span>Bet #1: NVIDIA</span><small>The first of many.${day?' The bet goes on at the close, '+esc(day)+'.':''}</small></h2>
    <div class="wc-pn wc-chipw"><div class="wc-chip" role="timer" aria-label="Time until the NVIDIA bet">
      <span class="wc-chip-pins" aria-hidden="true"></span>
      <div class="wc-chip-pkg"><span class="wc-chip-k">NVIDIA</span>
        <div class="wc-dies">${L?die('d',L.d,'days')+die('h',L.h,'hrs')+die('m',L.m,'min')+die('x',L.x,'sec'):'<span class="wc-die wc-die-tbc"><b>Soon</b></span>'}</div>
        <span class="wc-chip-k wc-chip-k2">Until the bet</span></div></div>
      <span class="wc-sfx wc-tick" aria-hidden="true"><em>Tick… tock…</em></span></div>
    <div class="wc-bet-l">
      <p class="wc-cap">${share}% of $EZ creator fees fill the pool.</p>
      <p class="wc-cap">The pool gets bet on the top AI's call. Today that's <b>${NM[lead]}</b>.</p>
      <p class="wc-cap wc-bet-rw"><b class="wc-tu-k">Right:</b> $EZ buyback. <b class="wc-td-k">Wrong:</b> pool can be wiped out.</p></div>
    <p class="wc-next-s">NVIDIA is the first bet, not the last. Season 2 brings more.</p>
    <p class="wc-tbc">To be continued…</p>
  </section>`}
function betTick(root){const el=root.querySelector('.wc-chip');if(!el)return;let on=false;
  const set=()=>{const L=betLeft();if(!L)return;['d','h','m','x'].forEach(k=>{const b=el.querySelector(`.wc-die[data-k="${k}"] b`);if(b){const v=String(L[k]).padStart(2,'0');if(b.textContent!==v)b.textContent=v}})};
  new IntersectionObserver(es=>{on=es[0].isIntersecting;if(on)set()}).observe(el);setInterval(()=>{if(on)set()},1000)}

/* ---------- THE PROOF (Leaderboard): the live site's four views, drawn as a comic page, with motion between them ---------- */
function proofBuild(P,R,rank){
  const N=R.length,SHq={...SH};
  const closeNY=s=>closeAt('',s),now=Date.now(),inWin=(r,ms)=>{const t=closeNY(r.resolves);return t!=null&&t<=now&&t>now-ms};
  const win=(m,ms)=>R.reduce((s,r)=>s+(inWin(r,ms)&&P[m].per[r.n]?P[m].per[r.n].v:0),0);
  /* each AI's balance and smoothed hit rate after every graded round */
  const bal={},acc={};ORDER.forEach(m=>{let b=1e5,k=0,n=0;bal[m]=[b];acc[m]=[.5];R.forEach(r=>{const x=P[m].per[r.n];if(x){b+=x.v;n++;if(x.v>0)k++}bal[m].push(b);acc[m].push((k+1)/(n+2))})});
  const W=1000,Hh=100,X=i=>(i/N*W).toFixed(1);
  const chart=(ser,lo,hi,base,baseLbl,ends,ord)=>{const Y=v=>(Hh-(v-lo)/(hi-lo)*Hh).toFixed(2);
    const ls=ord.slice().reverse().map(m=>{const d=ser[m].map((v,i)=>(i?'L':'M')+X(i)+' '+Y(v)).join(' ');return `<path class="wc-pf-o" d="${d}"/><path class="wc-pf-l${m===ord[0]?' wc-pf-lead':''}" style="--mc:${MODELS[m].c}" d="${d}"/>`}).join('');
    /* end labels, pushed apart so they never touch */
    let es=ord.map(m=>({m,y:(Hh-(ser[m][N]-lo)/(hi-lo)*Hh)})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<17)es[i].y=es[i-1].y+17;
    const ov=es[es.length-1].y-96;if(ov>0)es.forEach(e=>e.y-=ov);
    return `<div class="wc-pf-ch"><div class="wc-pf-cv"><svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" aria-hidden="true"><line class="wc-pf-base" x1="0" x2="${W}" y1="${Y(base)}" y2="${Y(base)}"/>${ls}</svg>
      <span class="wc-pf-bl" style="top:${Y(base)}%">${baseLbl}</span></div>
      <div class="wc-pf-ends">${es.map(e=>`<span class="wc-pf-end" style="top:${e.y.toFixed(1)}%;--mc:${MODELS[e.m].c}"><b>${NM[e.m]}</b>${ends(e.m)}</span>`).join('')}</div>
      <p class="wc-pf-x" aria-hidden="true"><span>Start</span><span>R${R[N-1].n}</span></p></div>`};
  /* P&L */
  const all=[].concat(...ORDER.map(m=>bal[m])),lo=Math.min(...all),hi=Math.max(...all),pd=(hi-lo)*.06;
  const vPnl=chart(bal,lo-pd,hi+pd,1e5,'$100K start',m=>`<small class="${P[m].pnl>=0?'wc-tu':'wc-td'}">${pc1(P[m].pnl/1000)}</small>`,rank)+
    `<div class="wc-pf-rows" role="table" aria-label="P&amp;L"><div class="wc-pf-hd" role="row"><span role="columnheader">AI</span><span role="columnheader">Last 24h</span><span role="columnheader">Last 7d</span><span role="columnheader">P&amp;L</span></div>
    ${rank.map((m,i)=>{const d1=win(m,864e5),d7=win(m,7*864e5);return `<div class="wc-pf-r${i===0?' wc-pf-1':''}" role="row"><span class="wc-pf-nm" role="cell"><i class="wc-pf-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></span>
      <span role="cell" class="${d1>0?'wc-tu':d1<0?'wc-td':''}">${d1?kShort(d1):'·'}</span><span role="cell" class="${d7>0?'wc-tu':d7<0?'wc-td':''}">${d7?kShort(d7):'·'}</span><b role="cell" class="wc-pf-big ${P[m].pnl>=0?'wc-tu':'wc-td'}">${pm(P[m].pnl)}</b></div>`}).join('')}</div>
    <p class="wc-pf-note">$100,000 to start. The whole balance on every call. Buy on up, short on down. No leverage. Before fees.</p>`;
  /* Accuracy */
  const byA=ORDER.slice().sort((a,b)=>P[b].W/(P[b].W+P[b].L)-P[a].W/(P[a].W+P[a].L));
  const vAcc=chart(acc,.3,.8,.5,'Coin flip, 50%',m=>`<small>${Math.round(P[m].W/(P[m].W+P[m].L)*100)}%</small>`,byA)+
    `<div class="wc-pf-rows" role="table" aria-label="Accuracy"><div class="wc-pf-hd" role="row"><span role="columnheader">AI</span><span role="columnheader">Trades</span><span role="columnheader" class="wc-tu">W</span><span role="columnheader" class="wc-td">L</span><span role="columnheader">Hit rate</span></div>
    ${byA.map((m,i)=>{const a=P[m],t=a.W+a.L;return `<div class="wc-pf-r wc-pf-r5${i===0?' wc-pf-1':''}" role="row"><span class="wc-pf-nm" role="cell"><i class="wc-pf-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></span><span role="cell">${t}</span><span role="cell" class="wc-tu">${a.W}</span><span role="cell" class="wc-td">${a.L}</span><b role="cell" class="wc-pf-big">${Math.round(a.W/t*100)}%</b></div>`}).join('')}</div>
    <p class="wc-pf-note">Right on direction, up or down. Every line starts at 50/50 and moves with each call.</p>`;
  /* Target hits: one target per AI, a hole per call that got the direction, at its distance from the real move */
  const S={};ORDER.forEach(m=>{const cs=R.map(r=>callOf(r,m)).filter(Boolean);S[m]={cs,bu:cs.filter(x=>x.ok&&x.off<=.1).length,w1:cs.filter(x=>x.ok&&x.off<=1).length,ot:cs.filter(x=>!x.ok).length}});
  const byT=ORDER.slice().sort((a,b)=>(S[b].bu-S[a].bu)||(S[b].w1-S[a].w1)||(S[a].ot-S[b].ot));
  const target=m=>{let k=0;const holes=S[m].cs.filter(x=>x.ok).map(x=>{const rr=Math.min(x.off,12.4)/12*46,a=(k++)*2.39996;return `<circle class="wc-th" cx="${(rr*Math.cos(a)).toFixed(2)}" cy="${(rr*Math.sin(a)).toFixed(2)}" r="2.1" style="--i:${k}"/>`}).join('');
    return `<svg class="wc-tgt" viewBox="-52 -52 104 104" aria-hidden="true">${[46,34.5,23,11.5].map((r,i)=>`<circle class="wc-tr wc-tr${i%2}" r="${r}"/>`).join('')}<circle class="wc-tb" r="3.2"/>
      ${[3,6,9,12].map((p,i)=>`<text class="wc-tt" x="0" y="${-(11.5*(i+1))+4.6}">${p}%</text>`).join('')}${holes}</svg>`};
  const vTgt=`<div class="wc-tgg">${byT.map((m,i)=>`<div class="wc-tgc${i===0?' wc-pf-1':''}"><p class="wc-tgn"><i class="wc-pf-rk">${i+1}</i>${face(m,'wc-f-s')}<b>${NM[m]}</b></p>${target(m)}
      <dl class="wc-tgk"><div class="wc-k-b"><dt>Bullseyes</dt><dd>${S[m].bu}</dd></div><div class="wc-k-w"><dt>Within 1%</dt><dd>${S[m].w1}</dd></div><div class="wc-k-o"><dt>Off target</dt><dd>${S[m].ot}</dd></div></dl></div>`).join('')}</div>
    <p class="wc-pf-note">The bullseye is what the stock did. One hole per call that got the direction. Bullseye: within 0.1%. Off target: the wrong way.</p>`;
  /* Sector */
  const sec=r=>((window.RMETA||{})[r.n]||{}).sector||'',cnt={};R.forEach(r=>{const x=sec(r);if(x)cnt[x]=(cnt[x]||0)+1});
  const secs=Object.keys(cnt).sort((a,b)=>cnt[b]-cnt[a]);
  const cell=(m,x)=>{let n=0,k=0;R.forEach(r=>{if(sec(r)!==x)return;const c=callOf(r,m);if(c){n++;if(c.ok)k++}});return {n,k}};
  const vSec=`<div class="wc-sct2"><table><thead><tr><th scope="col"><span class="wc-sr">Sector</span></th>${rank.map(m=>`<th scope="col">${face(m,'wc-f-s')}<span>${NM[m]}</span></th>`).join('')}</tr></thead><tbody>
    ${secs.map(x=>{const cs=rank.map(m=>cell(m,x)),v=cs.map(c=>c.n?c.k/c.n:-1),mx=Math.max(...v),allq=v.every(y=>y===mx);
      return `<tr><th scope="row">${esc(SHq[x]||x)}<small>${cnt[x]}</small></th>${cs.map((c,i)=>!c.n?'<td class="wc-sc-0">·</td>':`<td><span class="${3*c.k>=2*c.n?'wc-sc-hi':3*c.k<=c.n?'wc-sc-lo':'wc-sc-md'}${!allq&&v[i]===mx?' wc-sc-top':''}">${c.k}/${c.n}</span></td>`).join('')}</tr>`}).join('')}
    </tbody></table></div><p class="wc-pf-note">Right calls out of calls made. Green: 2 in 3 or better. Red: 1 in 3 or worse. Starred: the best in its row. Small samples.</p>`;
  const V=[['pnl','P&amp;L','Would following them have made you money?',vPnl],['acc','Accuracy','How often were they right about the direction?',vAcc],
    ['tgt','Target hits','How close did they get to the real move?',vTgt],['sec','Sector','Which industries do they call best?',vSec]];
  return `<section class="wc-pfs" aria-label="Smarter or just lucky?">
    <h2 class="wc-h2"><span>Smarter or just lucky?</span><small>Four ways to check. Same numbers as the live board.</small></h2>
    <div class="wc-pn wc-pf"><div class="wc-pf-tabs" role="tablist" aria-label="Views"><i class="wc-pf-ind" aria-hidden="true"></i>${V.map((v,i)=>`<button type="button" role="tab" id="wc-pft-${v[0]}" aria-controls="wc-pfv-${v[0]}" aria-selected="${i===0}" tabindex="${i===0?0:-1}">${v[1]}</button>`).join('')}</div>
      <div class="wc-pf-st">${V.map((v,i)=>`<div class="wc-pf-v" id="wc-pfv-${v[0]}" role="tabpanel" aria-labelledby="wc-pft-${v[0]}" data-v="${v[0]}"${i?' hidden':''}><p class="wc-cap wc-pf-q">${v[2]}</p>${v[3]}</div>`).join('')}</div></div>
  </section>`}
function proofWire(root){const pf=root.querySelector('.wc-pf');if(!pf)return;pf.classList.add('wc-in');const tabs=[...pf.querySelectorAll('[role=tab]')],views=[...pf.querySelectorAll('.wc-pf-v')],st=pf.querySelector('.wc-pf-st'),ind=pf.querySelector('.wc-pf-ind');let cur=0,busy=null;
  const place=()=>{const b=tabs[cur];ind.style.transform=`translateX(${b.offsetLeft}px)`;ind.style.width=b.offsetWidth+'px'};
  const enter=v=>{if(RM_())return;const sv=v.querySelector('.wc-pf-cv svg');
    if(sv)sv.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}],{duration:720,easing:'cubic-bezier(.3,.6,.2,1)',fill:'backwards'});
    v.querySelectorAll('.wc-pf-end').forEach((e,i)=>e.animate([{opacity:0,transform:'translateX(-8px) scale(.6)'},{opacity:1,transform:'none'}],{duration:320,delay:560+i*70,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'}));
    v.querySelectorAll('.wc-pf-r,.wc-tgc,tbody tr').forEach((e,i)=>e.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'none'}],{duration:300,delay:120+i*55,easing:'cubic-bezier(.2,.8,.2,1)',fill:'backwards'}));
    v.querySelectorAll('.wc-th').forEach((e,i)=>e.animate([{opacity:0,transform:'scale(0)'},{opacity:1,transform:'scale(1)'}],{duration:220,delay:260+i*12,easing:'cubic-bezier(.3,1.8,.5,1)',fill:'backwards'}));
    v.querySelectorAll('.wc-pf-q').forEach(e=>e.animate([{opacity:0,transform:'rotate(-4deg) scale(.85)'},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'}))};
  const show=(i,focus)=>{if(i===cur)return;const o=views[cur],n=views[i],dir=i>cur?1:-1;
    tabs.forEach((t,k)=>{t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});cur=i;place();if(focus)tabs[i].focus();
    if(busy){busy.forEach(a=>a.cancel());busy=null;views.forEach((v,k)=>v.hidden=k!==i);enter(n);return}
    if(RM_()){o.hidden=true;n.hidden=false;return}
    const h0=st.offsetHeight;const out=o.animate([{opacity:1,transform:'none'},{opacity:0,transform:`translateX(${-dir*24}px) rotate(${-dir*.8}deg)`}],{duration:150,easing:'ease-in',fill:'forwards'});busy=[out];
    out.onfinish=()=>{out.cancel();o.hidden=true;n.hidden=false;const h1=st.offsetHeight;
      const a1=st.animate([{height:h0+'px'},{height:h1+'px'}],{duration:280,easing:'cubic-bezier(.2,.8,.2,1)'}),a2=n.animate([{opacity:0,transform:`translateX(${dir*28}px) scale(.985)`},{opacity:1,transform:'none'}],{duration:300,easing:'cubic-bezier(.2,.8,.2,1.1)'});
      busy=[a1,a2];a2.onfinish=()=>{busy=null};enter(n)}};
  tabs.forEach((t,i)=>{t.addEventListener('click',()=>show(i));t.addEventListener('keydown',e=>{const k={ArrowRight:1,ArrowLeft:-1}[e.key];if(k){e.preventDefault();show((cur+k+tabs.length)%tabs.length,true)}else if(e.key==='Home'){e.preventDefault();show(0,true)}else if(e.key==='End'){e.preventDefault();show(tabs.length-1,true)}})});
  const rp=()=>place();addEventListener('resize',rp);D.fonts&&D.fonts.ready.then(rp);new ResizeObserver(rp).observe(pf.querySelector('.wc-pf-tabs'));rp();
  let first=true;new IntersectionObserver(es=>{if(first&&es[0].isIntersecting){first=false;enter(views[cur])}},{threshold:.2}).observe(pf)}

/* ---------- CERTIFICATES, as cartoons: the graded card's back (and a pending card's face) in the round pop-up ---------- */
function certHtml(g,flip){const up=g.a>0,W=winners(g);
  let rs=g.calls.map(x=>{const c=call(x[1]);return c?{m:x[0],c,ok:c.up===up,off:+x[2],win:W.includes(x[0])}:null}).filter(Boolean);
  rs=rs.filter(x=>x.ok).sort((a,b)=>a.off-b.off).concat(rs.filter(x=>!x.ok).sort((a,b)=>a.off-b.off));
  return `<div class="wc-cert" data-n="${g.n}"><div class="wc-ce-hd"><b class="wc-ce-t">Graded!</b><span class="wc-ce-no">No. ${String(g.n).padStart(4,'0')}</span></div>
    <div class="wc-ce-rows">${rs.map((x,i)=>`<div class="wc-ce-r ${x.win?'wc-win':x.ok?'wc-ok':'wc-no'}"><i class="wc-ce-rk">${i+1}</i>${face(x.m)}<span class="wc-ce-nm">${NM[x.m]}${x.win?'<em>Winner</em>':''}</span>
      <span class="wc-ce-cl ${x.c.up?'wc-up':'wc-dn'}">${x.c.up?'+':'−'}${x.c.v}%</span><b class="wc-ce-pf ${x.ok?'wc-ce-p':'wc-ce-f'}">${x.ok?'Pass!':'Fail!'}</b></div>`).join('')}</div>
    <div class="wc-ce-mk ${up?'wc-up':'wc-dn'}"><em>${sfx(g.a)}</em><small>Market</small><b>${up?'+':'−'}${Math.abs(g.a).toFixed(2)}%</b></div>
    <div class="wc-ce-ft"><p><small>Calls filed</small><b>${md(g.called)}</b></p><p><small>Graded on</small><b>${md(g.resolves)}</b></p>
      <span class="wc-ce-st" aria-hidden="true"><span class="wc-ce-lg">${window.X2P_LOGO||''}</span><i>Graded</i></span></div>
    ${flip?`<button type="button" class="wc-ce-flip">${esc(flip)}</button>`:''}</div>`}
function pendHtml(u,flip){const cs=ORDER.map(m=>(u.calls||[]).find(c=>c.m===m)).filter(Boolean);
  return `<div class="wc-cert wc-ce-pd" data-n="${u.n}"><div class="wc-ce-hd"><b class="wc-ce-t">Locked in!</b><span class="wc-ce-no">No. ${String(u.n).padStart(4,'0')}</span></div>
    <div class="wc-ce-rows">${cs.map(c=>`<div class="wc-ce-r">${face(c.m)}<span class="wc-ce-nm">${NM[c.m]}</span><span class="wc-ce-cl ${c.dir==='UP'?'wc-up':'wc-dn'}">${c.dir==='UP'?'+':'−'}${c.mag}%</span><b class="wc-ce-pf wc-ce-q">?</b></div>`).join('')}</div>
    <div class="wc-ce-mk wc-ce-mq"><em>?!</em><small>Market</small><b>${u.resolves?bellTxt(u.ticker,u.resolves).replace('Bell in','Closes in'):'Date to come'}</b></div>
    <div class="wc-ce-ft"><p><small>Calls filed</small><b>${md(u.called)||'·'}</b></p><p><small>Final grade</small><b>${u.resolves?md(u.resolves):'Soon'}</b></p>
      <span class="wc-ce-st wc-ce-lk" aria-hidden="true"><i>Locked</i></span></div>
    ${flip?`<button type="button" class="wc-ce-flip">${esc(flip)}</button>`:''}</div>`}
function certWatch(){const rg=n=>ROUNDS.find(r=>r.n===n),rp=n=>(window.PENDING||[]).find(p=>p.n===n);
  const fix=()=>{const rm=D.getElementById('x2pRm');if(!rm)return;rm.querySelectorAll('.card').forEach(c=>{const n=+c.getAttribute('data-n');
    c.querySelectorAll('.fin').forEach(fin=>{const xc=fin.querySelector(':scope > .xc');const have=fin.querySelector(':scope > .wc-cert');if(!xc){if(have)have.remove();return}
      if(have&&have.dataset.n===String(n))return;if(have)have.remove();
      const fb=xc.querySelector('[data-flip]')||fin.querySelector('[data-flip]'),flip=fb?fb.textContent.trim():'';
      const g=rg(n),u=g?null:rp(n),h=g&&fin.closest('.face.back')?certHtml(g,flip):u?pendHtml(u,flip):'';if(!h)return;
      fin.classList.add('wc-cfin');fin.insertAdjacentHTML('beforeend',h);const b=fin.querySelector(':scope > .wc-cert .wc-ce-flip');if(b&&fb)b.addEventListener('click',e=>{e.stopPropagation();fb.click()})})})};
  const q=()=>{if(!fix._q){fix._q=1;requestAnimationFrame(()=>{fix._q=0;fix()})}};let seen=null;const sub=new MutationObserver(q);
  const look=()=>{const rm=D.getElementById('x2pRm');if(rm&&rm!==seen){seen=rm;sub.disconnect();sub.observe(rm,{childList:true,subtree:true});q()}else if(!rm&&seen){seen=null;sub.disconnect()}};
  new MutationObserver(look).observe(D.body,{childList:true});look()}

function tabs(){const v=D.getElementById('view');const lb=lbBuild(),up=upBuild();(v||D.querySelector('main')).after(lb,up);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wc-in');io.unobserve(e.target)}}),{threshold:.15});
  [lb,up].forEach(x=>x.querySelectorAll('.wc-pn:not(.wc-pf),.wc-sb-r').forEach(y=>io.observe(y)));proofWire(lb)}
const done=()=>H.classList.add('x2p-world');
/* a twist on the graded slab's front, as a switch only (owner to decide): ?slab=1 or window.__c3Slab */
try{if(window.__c3Slab||/[?&]slab=1/.test(location.search))H.classList.add('wc-slab')}catch(e){}
/* a round opened from a panel, a back issue or a ticket: when its card closes, the page goes back to where it was
   (the router scrolls the page while the card is open, and the address passes through '' on the way) */
let back=null,open=false;addEventListener('pointerdown',e=>{const a=e.target.closest&&e.target.closest('#wc-book a[href^="#/round/"],#wc-lb a[href^="#/round/"],#wc-up a[href^="#/round/"],#wc-book .wc-big video');if(a){back=scrollY;open=false}},true);
new MutationObserver(()=>{if(back==null)return;const rm=D.getElementById('x2pRm');if(rm){open=true;return}if(!open)return;
  const y=back;back=null;open=false;const go=()=>scrollTo({top:y,behavior:'instant'});requestAnimationFrame(()=>{go();setTimeout(go,150);setTimeout(go,500)})}).observe(D.body,{childList:true});
let tries=0;(function wait(){
  if(window.__x2pPnl&&window.ROUNDS&&D.querySelector('.x2p-vt')&&D.querySelector('#x2pSt')&&D.querySelector('#standings')){
    try{build()}catch(e){window.__x2pWorldErr=e;console.error('comic',e)}
    try{tabs()}catch(e){window.__x2pWorldErr=e;console.error('comic tabs',e)}
    try{certWatch()}catch(e){window.__x2pWorldErr=e;console.error('comic certs',e)}
    done()}
  else if(tries++<200)setTimeout(wait,50);else done()})();
})();
