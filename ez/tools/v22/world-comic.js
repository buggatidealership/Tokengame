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
    <div class="wc-artw"><div class="wc-art">${f?`<video class="wc-v" muted playsinline loop preload="none" poster="${f.p}"><source src="${f.v}" type="video/mp4"></video><button type="button" class="wc-snd" aria-label="Play with sound">▶ Sound</button>`:'<div class="wc-noart"></div>'}</div>
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

function build(){
  const P=window.__x2pPnl().A, R=ROUNDS.slice(), n=R.length;
  const rank=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl), lead=rank[0], last=rank[rank.length-1];
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
    ${tonight.length>tn.length?`<p class="wc-gut wc-gut-s">+ ${tonight.length-tn.length} more locked in</p>`:''}
    <div class="wc-next">
      <p class="wc-next-k">Next time…</p>
      <h3>Bet #1: NVIDIA</h3>
      <p class="wc-next-d">NVIDIA reports ${nv?md(nv.called):'in November'}.${daysLeft?' The bet is '+esc(daysLeft)+' away.':''}</p>
      <ul><li>69% of $EZ creator fees fill a pool.</li><li>The AI on top of the P&amp;L makes the call. Today that's <b>${NM[lead]}</b>.</li><li><b class="wc-tu-k">Right:</b> profits buy back $EZ. <b class="wc-td-k">Wrong:</b> the pool can be wiped out.</li></ul>
      <p class="wc-next-s">NVIDIA is the first bet, not the last. Season 2 brings more.</p>
      <p class="wc-tbc">To be continued…</p>
    </div>
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
  book.innerHTML=cover+prev+cast+season+splash+cliff+get+back;
  const main=D.querySelector('main');main.insertBefore(book,main.firstChild);
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
  const sync=()=>{book.hidden=/^#\/(upcoming)/.test(location.hash)};addEventListener('hashchange',sync);sync()}

let tries=0;(function wait(){
  if(window.__x2pPnl&&window.ROUNDS&&D.querySelector('.x2p-vt')&&D.querySelector('#x2pSt')&&D.querySelector('#standings'))try{build()}catch(e){console.error('comic',e)}
  else if(tries++<200)setTimeout(wait,50)})();
})();
