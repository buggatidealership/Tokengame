/* EZ world: THE COMIC BOOK (mockup). Injected at DOMContentLoaded; waits for the page to be built,
   then builds this week's issue from the page's own data (ROUNDS, PENDING, UPCOMING, FILMS, MODELS,
   CO_LOGOS, CAPS, __x2pPnl). Every number comes from the data; speech balloons only say the AI's call.
   The original Overview sections stay in the DOM (off screen) so the round pop-up (the PSA slab) still works. */
/* (speed, 2026-10-30) the record wakes: build.py sets html.wc-pre before the page is parsed and world-comic.css keeps the old
   record out of layout until then, so X2+ no longer lays out and fits its 117 cards under the cover. It wakes after the cover
   lifts, once the page is idle; at once when a round is asked for (x2plus.js's pop-up waits for it, build.py) or a round link is
   pressed. Waking does what loading did for it: the carousel back on its card (v15's own scroll, build.py exports it), the
   name labels and tied winners fitted, and its looping animations named so the off-screen rule holds them still (x2plus.js, SPEED3). */
(function(){var H=document.documentElement;if(!H.classList.contains('wc-pre'))return;var awake=false,started=false,q=[];
  function tag(){var rec=document.getElementById('record');
    if(rec&&rec.classList.contains('x2p-offs')&&rec.getAnimations)try{rec.getAnimations({subtree:true}).forEach(function(a){var f=a.effect,g=f&&f.target;if(g&&g.classList)g.classList.add(f.pseudoElement?'x2p-anp':'x2p-an')})}catch(e){}}
  /* named now and again as the cards near the centred one get their certificates (their loops start a little later) */
  function done(){awake=true;tag();setTimeout(tag,1500);setTimeout(tag,5000);
    q.splice(0).forEach(function(f){try{f()}catch(e){}})}
  function wake(){if(started)return;started=true;H.classList.add('wc-rw');
    try{if(window.__wcCarHome)window.__wcCarHome()}catch(e){}
    try{if(window.__x2pNmFitIn)window.__x2pNmFitIn()}catch(e){}
    try{if(window.__wcTiesFit)window.__wcTiesFit(document.getElementById('record'))}catch(e){}
    requestAnimationFrame(function(){requestAnimationFrame(done)})}
  /* true when the record is awake; else wakes it and calls back once it is */
  window.__wcRecWake=function(cb){if(awake)return true;if(cb)q.push(cb);wake();return false};
  addEventListener('pointerdown',function(e){var t=e.target;if(t&&t.closest&&t.closest('a[href^="#/round/"],.wc-big video,.wc-lr-2 video'))wake()},{capture:true,passive:true});
  (function idle(){if(started)return;if(H.classList.contains('x2p-cur')){setTimeout(idle,500);return}
    setTimeout(function(){if(window.requestIdleCallback)requestIdleCallback(wake,{timeout:5000});else wake()},2000)})()})();
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
const coDk=t=>((window.CO_LOGOS||{})[t]||{}).dark?' class="wc-lg-dk"':'';
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
    <span class="wc-bi-art${!f&&lg&&coDk(r.ticker)?' wc-bi-dk':''}">${f?`<img src="${f.p}" alt="" loading="lazy">`:lg?`<img class="wc-lgimg" src="${lg}" alt="" loading="lazy">`:''}</span>
    <span class="wc-bi-no">#${r.n}<small>${esc(r.ticker)}</small></span><span class="wc-bi-mv ${up?'wc-up':'wc-dn'}">${up?'+':'−'}${pct(r.a)}</span>
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
    <div class="wc-cv-top"><span class="wc-cv-s">Season 1<small>${n} earnings reports graded</small></span></div>
    <p class="wc-h1" role="heading" aria-level="1">4 AI<span class="wc-lc">s</span> trade earnings <span>to run our buybacks.</span></p>
    <p class="wc-tag">Each one calls a stock <b>before</b> its earnings report. The market close says who was right.</p>
    <div class="wc-film-slot"><p class="wc-cap wc-film-cap" aria-hidden="true">How it works · 1:20</p></div>
    <div class="wc-starring"><span class="wc-st-l">Starring</span><span class="wc-st-g">${['GPT','CLAUDE','GROK','KIMI'].map(m=>`<span class="wc-st-m">${face(m)}<b>${NM[m]}</b></span>`).join('')}</span></div>
  </section>`;

  /* ---------- CHARACTER PAGE ---------- */
  const best=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v>b.v))b={v:x.v,r}}return b};
  const worst=m=>{let b=null;for(const r of R){const x=P[m].per[r.n];if(x&&(!b||x.v<b.v))b={v:x.v,r}}return b};
  const first=m=>R.find(r=>r.calls.some(c=>c[0]===m)).n;
  const roles=['We bet on its call','In the hunt','In the hunt','Last place'];
  /* F1 (owner, 2026-10-29): each model's card is a Season 1 ticket with a waving cartoon flag behind it (US for GPT,
     Claude and Grok; China for Kimi), its words on a yellow caption box; #1's face carries the holo. Flags drawn here as SVG. */
  const enc=x=>"url('data:image/svg+xml,"+encodeURIComponent(x)+"')",FP=160,FA=6;
  const fStripes=(cols,n,Hh)=>{const h=Hh/n;let x=`<svg xmlns="http://www.w3.org/2000/svg" width="${FP}" height="${Hh}" viewBox="0 ${-FA} ${FP} ${Hh+2*FA}" preserveAspectRatio="none">`;
    const wy=(px,k)=>k*h+FA*Math.sin(2*Math.PI*px/FP);
    for(let k=-1;k<=n;k++){let d='';for(let px=0;px<=FP;px+=4)d+=(px?'L':'M')+px+' '+wy(px,k).toFixed(2);for(let px=FP;px>=0;px-=4)d+='L'+px+' '+wy(px,k+1).toFixed(2);
      x+=`<path d="${d}Z" fill="${cols[(k+n*2)%cols.length]}" stroke="#15121a" stroke-width="1.4" vector-effect="non-scaling-stroke"/>`}
    return enc(x+'</svg>')};
  const fStar=(cx,cy,r,f)=>{const q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(2)+','+(cy+rr*Math.sin(a)).toFixed(2))}return `<polygon points="${q.join(' ')}" fill="${f}" stroke="#15121a" stroke-width="1.2" stroke-linejoin="round"/>`};
  const fCanton=()=>{let x=`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140"><rect width="200" height="140" fill="#2c4fa8" stroke="#15121a" stroke-width="3"/>`;
    for(let r=0;r<5;r++)for(let c=0;c<6;c++){const px=18+c*33+(r%2?16:0),py=16+r*27;if(px<192)x+=fStar(px,py,8,'#f8f0d9')}return enc(x+'</svg>')};
  const fCn=()=>enc(`<svg xmlns="http://www.w3.org/2000/svg" width="200" height="140" viewBox="0 0 200 140">${fStar(50,50,30,'#fdbc2a')}${fStar(100,18,10,'#fdbc2a')}${fStar(120,40,10,'#fdbc2a')}${fStar(120,70,10,'#fdbc2a')}${fStar(100,92,10,'#fdbc2a')}</svg>`);
  const flagVars=`--fl-us:${fStripes(['#d63a3a','#f8f0d9'],13,260)};--fl-cn:${fStripes(['#d63a3a'],13,260)};--fl-usc:${fCanton()};--fl-cnc:${fCn()}`;
  const FLAG={GPT:'us',CLAUDE:'us',GROK:'us',KIMI:'cn'};
  const cast=`<section class="wc-chars" aria-label="The cast">
    <h2 class="wc-h2"><span>Meet the models</span><small>Not the Instagram kind. Ranked by their pretend $100,000 accounts.</small></h2>
    <div class="wc-ch-grid" style="${flagVars}">${rank.map((m,i)=>{const a=P[m],b=best(m),w=worst(m),tot=a.W+a.L,hr=Math.round(a.W/tot*100),f=first(m),fl=FLAG[m]||'us';
      return `<article class="wc-ch wc-ch-${i+1}" style="--mc:${MODELS[m].c}" data-m="${m}">
        <div class="wc-flg wc-flg-${fl}" aria-hidden="true"><i class="wc-flg-st"></i><i class="wc-flg-ca"></i><i class="wc-flg-fd"></i><i class="wc-flg-dt"></i></div>
        <div class="wc-tks" aria-hidden="true"><b>#${i+1}</b><i>${i===0?'Golden ticket':'Season 1'}</i></div><i class="wc-tkn wc-tkn-t" aria-hidden="true"></i><i class="wc-tkn wc-tkn-b" aria-hidden="true"></i>
        <div class="wc-ch-pic">${face(m,'wc-f-xl')}<span class="wc-ch-rk">#${i+1}</span>${i===0?'<span class="wc-spk wc-spk1" aria-hidden="true">✦</span><span class="wc-spk wc-spk2" aria-hidden="true">✦</span><span class="wc-spk wc-spk3" aria-hidden="true">✧</span>':''}</div>
        <div class="wc-ch-tx"><div class="wc-ch-hd"><h3>${NM[m]}<small>${esc(MODELS[m].ver)}</small></h3><p class="wc-ch-role">${roles[i]}</p></div>
          <p class="wc-ch-big ${a.pnl>=0?'wc-tu':'wc-td'}"><small class="wc-ch-lab">Current P&amp;L</small><span class="wc-cnt" data-v="${Math.round(Math.abs(a.pnl))}" data-s="${a.pnl<0?'−':'+'}">${pm(a.pnl)}</span></p>
          <p class="wc-ch-l">Right way on <b>${a.W} of ${tot}</b> calls.</p>
          <p class="wc-ch-l">Highest P&amp;L: <b class="${b.v>=0?'wc-tu':'wc-td'}">${pm(b.v)}</b> on ${esc(b.r.co)}.</p>
          <p class="wc-form" aria-label="Last five calls">${a.seq.slice(-5).map(x=>`<i class="${x==='W'?'wc-fw':'wc-fl'}">${x==='W'?'✓':'✗'}</i>`).join('')}<small>last 5 calls</small></p>
        </div></article>`}).join('')}</div>
  </section>`;

  /* ---------- LAST ROUND: one round, start to finish (owner, 2026-10-29: "the section where they should understand ... the process
     of one given round, and we use the last round as the example and the case study"). Always the newest graded round with a film. ---------- */
  const lastR=lastRound(R,P);

  /* ---------- BACK ISSUES: every graded round, newest first ---------- */
  const all=R.slice().sort((a,b)=>b.n-a.n);
  const issues=`<section class="wc-season" aria-label="Every round so far">
    <h2 class="wc-h2 wc-h2-b"><span>Every round so far</span><small>Newest first. Tap one to open its graded card.</small></h2>
    <div class="wc-bis" data-all="0">${all.map(backIssue).join('')}</div>
    <button type="button" class="wc-more">Show all ${all.length} rounds</button>
    <p class="wc-key">Corner face = the winner. × = nobody. % = the move at the close.</p>
  </section>`;

  /* ---------- TONIGHT AT THE CLOSE ---------- */
  const tn=tonight.slice(0,6);
  const cliff=tonight.length?`<p class="wc-cap wc-beat">And next on the card…</p><section class="wc-cliff" aria-label="${esc(tLabel)}">
    <h2 class="wc-h2"><span>${tLabel}</span><small>${tonight.length} round${tonight.length===1?'':'s'}. Every call locked before the report. The close decides.</small></h2>
    <div class="wc-tn">${tn.map(p=>{const lg=coLogo(p.ticker),cs=p.calls||[],u=cs.filter(c=>c.dir==='UP').length,d=cs.length-u;return `<article class="wc-tnp"><header>${lg?`<img src="${lg}" alt=""${coDk(p.ticker)}>`:''}<b>${esc(p.co)}<small>${esc(p.ticker)}</small></b></header>
      <p class="wc-tn-vs" aria-label="${u} up, ${d} down"><span class="wc-tn-u" style="flex:${u||.0001}">${u?u+' up':''}</span><span class="wc-tn-d" style="flex:${d||.0001}">${d?d+' down':''}</span></p>
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
  /* owner, 2026-10-29 (a friend's read): no "Previously" (it repeated the cover, the cast and the last round), and the
     last round straight after the cover, so the first scroll shows how a round goes */
  /* owner, 2026-10-30, evening: "one round, start to finish" is off the page (the loop in the cover explains a round); Meet the models comes first after the cover */
  book.innerHTML=cover+cast+issues+cliff+splash+bet+back;
  lrCap();setTimeout(lrCap,400);
  {const mb=book.querySelector('.wc-lr-meet');if(mb)mb.addEventListener('click',()=>{const c=D.querySelector('.wc-chars');if(c)c.scrollIntoView({behavior:RM_()?'auto':'smooth',block:'start'})})}
  const main=D.querySelector('main');main.insertBefore(book,main.firstChild);
  // the real explainer film moves onto the cover (its controls keep working)
  const vt=D.querySelector('.x2p-vt');if(vt)book.querySelector('.wc-film-slot').appendChild(vt);
  H.classList.add('wc-on');
  wire(book)}

/* the money on a cast card rolls up once, the first time the card comes into view (not with reduced motion) */
function rollCnt(c){const n=c.querySelector&&c.querySelector('.wc-cnt');if(!n||window.__kfShot||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const v=+n.dataset.v,s=n.dataset.s,fin=n.textContent,t0=performance.now(),d=900;
  (function f(t){const k=Math.min(1,(t-t0)/d),e2=1-Math.pow(1-k,3);n.textContent=k<1?s+'$'+Math.round(v*e2).toLocaleString('en-US'):fin;if(k<1)requestAnimationFrame(f)})(t0)}
function wire(book){
  book.querySelector('.wc-more').addEventListener('click',e=>{const g=book.querySelector('.wc-bis');const all=g.dataset.all==='1';g.dataset.all=all?'0':'1';e.target.textContent=all?e.target.textContent.replace('Show fewer','Show all'):'Show fewer back issues'});
  // the big panel's film rolls muted while on screen; a tap plays it with sound
  betTick(book);
  book.querySelectorAll('.wc-lr-2').forEach(pn=>{const v=pn.querySelector('video'),b=pn.querySelector('.wc-snd');if(!v)return;
    b.addEventListener('click',()=>{if(v.muted||v.paused){v.muted=false;v.currentTime=0;v.play();b.textContent='❚❚ Pause'}else{v.pause();b.textContent='▶ Sound'}});
    v.addEventListener('click',()=>{D.location.hash='#/round/'+pn.closest('.wc-lr-pg').dataset.n})});
  const io=new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;if(e.isIntersecting&&!t.classList.contains('wc-in')){t.classList.add('wc-in');rollCnt(t)}
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

  const roleOf=i=>i===0?'We bet on its call':'';
  /* owner, 2026-10-30, night: the scoreboard says P&L in words, adds the last 7 days, drops the % and the role chip,
     and carries each AI's top and worst round (the Best and worst calls section is gone, lesson 25) */
  const tdy=nyToday(),dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((Date.UTC(2000+tdy[2],tdy[0]-1,tdy[1])-Date.UTC(2000+(y%100),m-1,d))/864e5)};
  const p7=m=>R.reduce((t,r)=>{const x=P[m].per[r.n],a=dAgo(r);return x&&a>=0&&a<=6?t+x.v:t},0);
  const kk=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
  const tw=m=>{let b=null,w=null;R.forEach(r=>{const x=P[m].per[r.n];if(!x)return;if(!b||x.v>b.v)b={v:x.v,r};if(!w||x.v<w.v)w={v:x.v,r}});return {b,w}};
  const twl=(x,k)=>{const lg=coLogo(x.r.ticker);return `<div class="wc-sb-tw ${k}"><dt>${k==='wc-sb-twb'?'Top round':'Worst round'}</dt><dd><b class="${x.v>=0?'wc-tu':'wc-td'}">${kk(x.v)}</b>${lg?`<img src="${lg}" alt="" title="${esc(x.r.co)}"${coDk(x.r.ticker)}>`:''}<span class="wc-sr">${esc(x.r.co)}</span></dd></div>`};
  const board=`<section class="wc-sbd" aria-label="The scoreboard">
    <h2 class="wc-h2"><span>The scoreboard</span><small>Ranked by P&amp;L on a pretend $100,000 each. We bet on the leader&rsquo;s call.</small></h2>
    <div class="wc-sb">${rank.map((m,i)=>{const a=P[m],t=a.W+a.L,hr=t?Math.round(a.W/t*100):0,st=streak(a.seq);
      return `<article class="wc-sb-r${i===0?' wc-sb-1':''}" style="--mc:${MODELS[m].c}">
        <span class="wc-sb-rk">#${i+1}</span>${face(m,'wc-f-m')}
        <div class="wc-sb-nm"><h3>${NM[m]}</h3><small>${esc(MODELS[m].ver)}</small></div>
        <p class="wc-sb-pl ${a.pnl>=0?'wc-tu':'wc-td'}"><small class="wc-sb-plk">Season P&amp;L</small>${pm(a.pnl)}<small class="wc-sb-pc">${a.pnl>=0?'+':'−'}${(Math.abs(a.pnl)/1000).toFixed(1)}%</small></p>
        <dl class="wc-sb-st"><div class="wc-sb-7"><dt>Last 7 days</dt><dd class="${p7(m)>=0?'wc-tu':'wc-td'}">${kk(p7(m))}</dd></div><div><dt>W-L</dt><dd><b class="wc-tu">${a.W}</b>-<b class="wc-td">${a.L}</b></dd></div><div><dt>Hit rate</dt><dd>${hr}%</dd></div>
          <div class="wc-sb-f"><dt>Last 5</dt><dd class="wc-form">${a.seq.slice(-5).map(x=>`<i class="${x==='W'?'wc-fw':'wc-fl'}">${x==='W'?'✓':'✗'}</i>`).join('')}</dd></div>${(x=>twl(x.b,'wc-sb-twb')+twl(x.w,'wc-sb-tww'))(tw(m))}</dl>
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
  el.innerHTML=`<section class="wc-tab-cv" aria-label="Who's winning"><div class="wc-cv-top"><span class="wc-cv-s">The standings<small>${N} earnings reports graded</small></span></div>
    <h1 class="wc-tab-h">Who's winning?</h1><p class="wc-tag">Four AIs, a pretend <b>$100,000</b> each, the whole balance on every call. The money says who's best.</p></section>`
    +board+proof+race+`<section class="wc-back"><a class="wc-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a></section>`;
  return el}

/* ================= THE UPCOMING TAB (#/upcoming): the next fight nights, in the same comic ================= */
/* each exchange's close, local time (Seoul and Tokyo 15:30, Taipei 13:30, Hong Kong 16:00, London 16:30, the euro exchanges 17:30) */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
/* (speed, 2026-10-30) one date formatter per time zone: a new one on every call cost about a second under the cover */
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
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
    return `<a class="wc-pn wc-lv" href="#/round/${p.n}" data-n="${p.n}"><header>${lg?`<img src="${lg}" alt=""${coDk(p.ticker)}>`:''}<h3>${esc(p.co)}<small>${esc(p.ticker)} · Round ${p.n}</small></h3><span class="wc-bell" data-t="${esc(p.ticker)}" data-d="${p.resolves||''}">${bellTxt(p.ticker,p.resolves)}</span></header>
      <div class="wc-lvc">${cs.map(c=>`<div class="wc-lvs ${c.dir==='UP'?'wc-lvu':'wc-lvd'}">${face(c.m,'wc-f-s')}<p><small>${NM[c.m]}</small>${c.dir==='UP'?'Up':'Down'} ${c.mag}%</p></div>`).join('')}</div>
      <p class="wc-lv-f">${u} say${u===1?'s':''} up, ${cs.length-u} say${cs.length-u===1?'s':''} down. Locked before the report.</p></a>`};
  const spot=dk.map(k=>{const r=k?relDay(k):null,lab=!k?'Date to come':r==='Tonight'?'Tonight at the close':r==='Tomorrow'?'Tomorrow at the close':'At the close, '+md(k);
    const g=days[k].sort((a,b)=>cap(b.ticker)-cap(a.ticker));
    return `<section class="wc-spot" aria-label="${esc(lab)}"><h2 class="wc-h2"><span>${esc(lab)}</span><small>${g.length} round${g.length===1?'':'s'}. Every call locked before the report. The close decides.</small></h2><div class="wc-lvg">${g.map(tick).join('')}</div></section>`}).join('');
  const ud={};UP.forEach(u=>{const k=nk(u.called);(ud[k]=ud[k]||[]).push(u)});
  /* days still to come first; a day already gone whose calls are not in yet goes last, said as it is */
  const uk=Object.keys(ud).sort((a,b)=>{const pa=a&&mdyKey(a)<tk,pb=b&&mdyKey(b)<tk;return pa!==pb?(pa?1:-1):mdyKey(a)-mdyKey(b)});
  const tile=u=>{const lg=coLogo(u.ticker),me=RM[u.n]||{},m7=!!me.mag7,ai=(me.themes||[]).indexOf('AI')>-1,nv=u.ticker==='NVDA';
    return `<a class="wc-ut${m7?' wc-ut-m7':''}${nv?' wc-ut-nv':''}" href="#/round/${u.n}" data-m7="${m7?1:0}" data-ai="${ai?1:0}"><span class="wc-ut-lg">${lg?`<img src="${lg}" alt="" loading="lazy"${coDk(u.ticker)}>`:''}</span>
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
  /* owner, 2026-10-29: the example is a round where exactly one AI got the direction (and so wins); else the newest with a film */
  const one=x=>{const up=x.a>0;return x.calls.filter(c=>{const k=call(c[1]);return k&&k.up===up}).length===1&&winners(x).length===1};
  const fs=R.filter(x=>film(x.n)).sort((a,b)=>key(b)-key(a)),r=fs.find(one)||fs[0];if(!r)return '';
  const f=film(r.n),up=r.a>0,W=winners(r),lg=coLogo(r.ticker),rel=relDay(r.resolves),day=(rel==='Yesterday'?'Yesterday · ':rel==='Tonight'?'Today · ':'')+dayName(r.resolves);
  const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);if(!row)return null;const c=call(row[1]);return c?{m,c,ok:c.up===up,off:+row[2],win:W.includes(m),v:(P[m].per[r.n]||{}).v||0}:null}).filter(Boolean);
  const right=cs.filter(x=>x.ok);
  const p1=`<li class="wc-pn wc-lr-p wc-lr-1"><b class="wc-lr-n" aria-hidden="true">1</b>
      <p class="wc-cap wc-lr-c">Before the earnings, the AIs submit their predictions</p>
      <header class="wc-lr-co">${lg?`<span class="wc-lr-lg"><img src="${lg}" alt=""${coDk(r.ticker)}></span>`:''}<h3>${esc(r.co)}<small>Round ${r.n} · ${esc(r.ticker)}</small></h3><span class="wc-lr-lock">Locked ${md(r.called)}</span></header>
      <div class="wc-lr-bub">${cs.map(x=>`<div class="wc-lr-s">${face(x.m)}<p class="wc-bub"><small>${NM[x.m]}</small><span class="${x.c.up?'wc-tu':'wc-td'}">${callTxt(x.c)}</span></p></div>`).join('')}</div></li>`;
  const p2=`<li class="wc-pn wc-lr-p wc-lr-2"><b class="wc-lr-n" aria-hidden="true">2</b>
      <p class="wc-cap wc-lr-c">${esc(r.co)} reports. Then the close</p>
      <div class="wc-lr-artw"><div class="wc-art wc-lr-art"><video class="wc-v" muted playsinline loop preload="none" poster="${f.p}"><source src="${f.v}" type="video/mp4"></video><button type="button" class="wc-snd" aria-label="Play with sound">▶ Sound</button></div><span class="wc-sfx wc-lr-sfx ${up?'wc-up':'wc-dn'}" aria-hidden="true"><em>${sfx(r.a)}</em><b>${up?'+':'−'}${pct(r.a)}</b></span></div>
      <p class="wc-sr">${esc(r.co)} ${moveWord(r)} ${pct(r.a)} at the close.</p></li>`;
  const p3=`<li class="wc-pn wc-lr-p wc-lr-3"><b class="wc-lr-n" aria-hidden="true">3</b>
      <p class="wc-cap wc-lr-c">The market grades every call</p>
      <div class="wc-lr-cw">${certMid(r)}</div>
      <p class="wc-lr-rule">${lrWhy(r,cs,W,up)}</p></li>`;
  const ws=cs.filter(x=>x.win),shown=ws.length?ws:cs.slice().sort((a,b)=>b.v-a.v).slice(0,1);
  const p4=`<li class="wc-pn wc-lr-p wc-lr-4"><b class="wc-lr-n" aria-hidden="true">4</b>
      <p class="wc-cap wc-lr-c">${ws.length?'The winner gets paid':'Nobody won. The money'}</p>
      <div class="wc-lr-m">${shown.map(x=>`<div class="wc-lr-mw">${face(x.m,'wc-f-l')}<b class="${x.v>=0?'wc-tu':'wc-td'}">${pm(x.v)}</b><small>${NM[x.m]} ${x.v>=0?'made':'lost'} on this call</small></div>`).join('')}</div>
      <ul class="wc-lr-all" aria-label="Every AI's P&L on this call">${cs.map(x=>`<li>${face(x.m,'wc-f-s')}<span>${NM[x.m]}</span><b class="${x.v>=0?'wc-tu':'wc-td'}">${kShort(x.v)}</b></li>`).join('')}</ul>
      <p class="wc-lr-fine">Pretend $100,000 accounts, the whole balance on every call. Then on to the next round.</p>
      <a class="wc-lr-open" href="#/round/${r.n}">Open its graded card →</a></li>`;
  const nR=R.length,nC=R.reduce((t,x)=>t+x.calls.length,0);
  const p5=`<li class="wc-pn wc-lr-p wc-lr-5"><b class="wc-lr-n" aria-hidden="true">5</b>
      <p class="wc-cap wc-lr-c">Every round goes on the record</p>
      <div class="wc-lr-log"><p class="wc-lr-lt">Every call, every grade, every dollar is logged. Round after round, the record shows which AI is actually good, and which one just got lucky.</p>
      <p class="wc-lr-tally" aria-label="${nR} rounds and ${nC} calls logged so far"><span><b>${nR}</b>rounds</span><span><b>${nC}</b>calls</span><span><b>4</b>models</span></p>
      <button type="button" class="wc-lr-open wc-lr-meet">Meet the models ↓</button></div></li>`;
  return `<section class="wc-lr" aria-label="One round, start to finish">
    <h2 class="wc-h2"><span>One round, start to finish</span><small>Round ${r.n}: ${esc(r.co)} reports earnings. Calls locked ${md(r.called)}, graded at the close on ${esc(day.replace(/^(Today|Yesterday) · /,''))}.</small></h2>
    <ol class="wc-lr-pg" data-n="${r.n}">${p1}${p2}${p3}${p4}${p5}</ol></section>`}
/* panel 3's line: who passed, who failed, what the market said, who won */
function lrWhy(r,cs,W,up){const and=a=>a.length<2?a[0]||'':a.slice(0,-1).join(', ')+' and '+a[a.length-1];
  const ok=cs.filter(x=>x.ok).map(x=>NM[x.m]),no=cs.filter(x=>!x.ok).map(x=>NM[x.m]),dir=up?'up':'down';
  let t='';
  if(ok.length)t+=`${and(ok)} called ${dir}: <b>pass</b>. `;
  if(no.length)t+=`${no.length>1&&ok.length?'The other '+['','','two','three'][no.length]:and(no)}: <b>fail</b>. `;
  if(W.length===1)t+=ok.length>1?`${NM[W[0]]} came closest, so <b>${NM[W[0]]} wins the round.</b>`:`<b>${NM[W[0]]} wins the round.</b>`;
  else if(W.length>1)t+=`<b>${and(W.map(m=>NM[m]))} tie for the round.</b>`;
  else t+='<b>Nobody wins this one.</b>';
  return t}
/* desktop: the captions sit above the square panels; the strip leaves room for the tallest one */
function lrCap(){const pg=D.querySelector('.wc-lr-pg');if(!pg)return;
  if(!matchMedia('(min-width:1000px)').matches){pg.style.removeProperty('--lrcap');return}
  let h=0;pg.querySelectorAll('.wc-lr-c').forEach(c=>{h=Math.max(h,c.offsetHeight)});pg.style.setProperty('--lrcap',Math.max(30,h-7+10)+'px')}
let lrW=0;addEventListener('resize',()=>{if(innerWidth!==lrW){lrW=innerWidth;lrCap()}});
if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>lrCap());

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
  const closeNY=s=>closeAt('',s),now=Date.now(),inWin=(r,ms)=>{if(ms>864e5){const td=nyToday(),[mm,dd,yy]=(r.resolves||'').split('/').map(Number);if(!mm)return false;const a=Math.round((Date.UTC(2000+td[2],td[0]-1,td[1])-Date.UTC(2000+(yy%100),mm-1,dd))/864e5);const c=closeAt(r.ticker,r.resolves);return a>=0&&a<=6&&c!=null&&c<=now}/* 7 days = the calendar days the stubs name (today and the 6 before), as the scoreboard and Who's winning count */const t=closeAt(r.ticker,r.resolves);/* each exchange's own close, as Who's winning counts it (2026-10-30) */return t!=null&&t<=now&&t>now-ms};
  const win=(m,ms)=>R.reduce((s,r)=>s+(inWin(r,ms)&&P[m].per[r.n]?P[m].per[r.n].v:0),0);
  /* each AI's balance and smoothed hit rate after every graded round */
  const bal={},acc={};ORDER.forEach(m=>{let b=1e5,k=0,n=0;bal[m]=[b];acc[m]=[.5];R.forEach(r=>{const x=P[m].per[r.n];if(x){b+=x.v;n++;if(x.v>0)k++}bal[m].push(b);acc[m].push((k+1)/(n+2))})});
  const W=1000,Hh=100,X=i=>(i/N*W).toFixed(1);
  const chart=(ser,lo,hi,base,baseLbl,ends,ord)=>{const Y=v=>(Hh-(v-lo)/(hi-lo)*Hh).toFixed(2);
    const ls=ord.slice().reverse().map(m=>{const d=ser[m].map((v,i)=>(i?'L':'M')+X(i)+' '+Y(v)).join(' ');return `<path class="wc-pf-o" d="${d}"/><path class="wc-pf-l${m===ord[0]?' wc-pf-lead':''}" style="--mc:${MODELS[m].c}" d="${d}"/>`}).join('');
    /* end labels, pushed apart so they never touch */
    let es=ord.map(m=>({m,y:(Hh-(ser[m][N]-lo)/(hi-lo)*Hh)})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<17)es[i].y=es[i-1].y+17;
    const ov=es[es.length-1].y-96;if(ov>0)es.forEach(e=>e.y-=ov);
    return `<div class="wc-pf-ch"><div class="wc-pf-cv" data-b="${Y(base)}" data-y="${JSON.stringify(ord.map(m=>ser[m].map(v=>+Y(v))))}"><svg viewBox="0 0 ${W} ${Hh}" preserveAspectRatio="none" aria-hidden="true"><line class="wc-pf-base" x1="0" x2="${W}" y1="${Y(base)}" y2="${Y(base)}"/>${ls}</svg>
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
  pf.querySelectorAll('.wc-pf-cv[data-y]').forEach(cv=>{const ro=new ResizeObserver(()=>blPlace(cv));ro.observe(cv)});
  let first=true;new IntersectionObserver(es=>{if(first&&es[0].isIntersecting){first=false;enter(views[cur])}},{threshold:.2}).observe(pf)}

/* the start line's key (owner, 2026-10-29: it sat on the lines): a dashed swatch and its words, in the emptiest spot
   of the chart (clear of every line and the dashed line itself), measured in pixels once the chart has a size */
function blPlace(cv){const bl=cv.querySelector('.wc-pf-bl'),cw=cv.clientWidth,ch=cv.clientHeight;if(!bl||!cw||!ch)return;
  const ys=JSON.parse(cv.dataset.y).concat([[+cv.dataset.b,+cv.dataset.b]]),lw=bl.offsetWidth,lh=bl.offsetHeight;
  const at=(a,x)=>{const t=x/cw*(a.length-1),i=Math.min(a.length-2,Math.floor(t)),f=t-i;return (a[i]+(a[i+1]-a[i])*f)/100*ch};
  let best=null;for(let top=4;top<=ch-lh-4;top+=3)for(let x0=4;x0<=cw-lw-4;x0+=4){let d=1e9;
    for(let x=x0-3;x<=x0+lw+3;x+=2)for(const a of ys){const y=at(a,Math.max(0,Math.min(cw,x)));d=Math.min(d,y<top?top-y:y>top+lh?y-top-lh:-Math.min(y-top,top+lh-y))}
    const sc=Math.min(d,14)-x0*.001-top*.002;if(!best||sc>best.sc)best={sc,x0,top}}
  if(best){bl.style.left=best.x0+'px';bl.style.top=best.top+'px';bl.style.transform='none'}}

/* ---------- CERTIFICATES, as cartoons: the graded card's back (and a pending card's face) in the round pop-up ---------- */
function certRows(g){const up=g.a>0,W=winners(g);
  let rs=g.calls.map(x=>{const c=call(x[1]);return c?{m:x[0],c,ok:c.up===up,off:+x[2],win:W.includes(x[0])}:null}).filter(Boolean);
  rs=rs.filter(x=>x.ok).sort((a,b)=>a.off-b.off).concat(rs.filter(x=>!x.ok).sort((a,b)=>a.off-b.off));
  return `<div class="wc-ce-rows">${rs.map((x,i)=>`<div class="wc-ce-r ${x.win?'wc-win':x.ok?'wc-ok':'wc-no'}"><i class="wc-ce-rk">${i+1}</i>${face(x.m)}<span class="wc-ce-nm">${NM[x.m]}${x.win?'<em>Winner</em>':''}</span>
      <span class="wc-ce-cl ${x.c.up?'wc-up':'wc-dn'}">${x.c.up?'+':'−'}${x.c.v}%</span><b class="wc-ce-pf ${x.ok?'wc-ce-p':'wc-ce-f'}">${x.ok?'Pass!':'Fail!'}</b></div>`).join('')}</div>
    <div class="wc-ce-mk ${up?'wc-up':'wc-dn'}"><em>${sfx(g.a)}</em><small>Market</small><b>${up?'+':'−'}${Math.abs(g.a).toFixed(2)}%</b></div>`}
/* the graded card's middle (what they predicted, what the market said, who won), for the round walkthrough's panel 3 */
function certMid(g){return `<div class="wc-cert wc-ce-mini" data-n="${g.n}">${certRows(g)}</div>`}
function certHtml(g,flip){
  return `<div class="wc-cert" data-n="${g.n}"><div class="wc-ce-hd"><b class="wc-ce-t">Graded!</b><span class="wc-ce-no">No. ${String(g.n).padStart(4,'0')}</span></div>
    ${certRows(g)}
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
/* owner, 2026-10-29: the graded stamp is X2+'s holo stamp (moved in from the hidden certificate once it is drawn), not the comic burst; X3+ only */
function holo(xc,cert){if(D.documentElement.classList.contains('cd-on')||!cert||cert.classList.contains('wc-ce-pd'))return;const slot=cert.querySelector('.wc-ce-st');if(!slot||slot.classList.contains('wc-ce-holo'))return;
  const st=xc.querySelector('.xc-st:not(.xc-stp)');if(!st||!st.firstChild)return;slot.classList.add('wc-ce-holo');slot.innerHTML='';slot.appendChild(st)}
function certWatch(){const rg=n=>ROUNDS.find(r=>r.n===n),rp=n=>(window.PENDING||[]).find(p=>p.n===n);
  const fix=()=>{const rm=D.getElementById('x2pRm');if(!rm)return;rm.querySelectorAll('.card').forEach(c=>{const n=+c.getAttribute('data-n');
    c.querySelectorAll('.fin').forEach(fin=>{const xc=fin.querySelector(':scope > .xc');const have=fin.querySelector(':scope > .wc-cert');if(!xc){if(have)have.remove();return}
      if(have&&have.dataset.n===String(n)){holo(xc,have);return}if(have)have.remove();
      const fb=xc.querySelector('[data-flip]')||fin.querySelector('[data-flip]'),flip=fb?fb.textContent.trim():'';
      const g=rg(n),u=g?null:rp(n),h=g&&fin.closest('.face.back')?certHtml(g,flip):u?pendHtml(u,flip):'';if(!h)return;
      fin.classList.add('wc-cfin');fin.insertAdjacentHTML('beforeend',h);holo(xc,fin.querySelector(':scope > .wc-cert'));const b=fin.querySelector(':scope > .wc-cert .wc-ce-flip');if(b&&fb)b.addEventListener('click',e=>{e.stopPropagation();fb.click()})})})};
  const q=()=>{if(!fix._q){fix._q=1;requestAnimationFrame(()=>{fix._q=0;fix()})}};let seen=null;const sub=new MutationObserver(q);
  const look=()=>{const rm=D.getElementById('x2pRm');if(rm&&rm!==seen){seen=rm;sub.disconnect();sub.observe(rm,{childList:true,subtree:true});q()}else if(!rm&&seen){seen=null;sub.disconnect()}};
  new MutationObserver(look).observe(D.body,{childList:true});look()}

function tabs(){const v=D.getElementById('view');const lb=lbBuild(),up=upBuild();(v||D.querySelector('main')).after(lb,up);
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('wc-in');io.unobserve(e.target)}}),{threshold:.15});
  [lb,up].forEach(x=>x.querySelectorAll('.wc-pn:not(.wc-pf),.wc-sb-r').forEach(y=>io.observe(y)));proofWire(lb)}
/* R9 (owner, 2026-10-30: "all the changes except on the M5... you don't need the flags on the M5"; ez/x2p-x3p-more.png):
   F1's language carried to the rest of X3+. M1 the Leaderboard's scoreboard as Season 1 tickets with each model's flag,
   M2 tomorrow's rounds as Admit One tickets whose stub is printed as the flag of the company's headquarters (owner: "whether
   headquarters are located"; HQ below, by hand, checked 2026-10-30), M3 every round as a torn stub (holo edge when every AI
   got the direction), M4 Smart or lucky with each model's flag and a flipping coin, M5 the leader's face in holo everywhere.
   Also the walkthrough's "The winner gets paid" panel printed as a comic dollar bill. X3+ only (X5+ has cd-on). */
function r9(){if(H.classList.contains('cd-on'))return;H.classList.add('wc-f9');
  const enc=x=>"url('data:image/svg+xml,"+encodeURIComponent(x)+"')",K='stroke="#15121a" stroke-width="3"';
  const sv=b=>enc(`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="100" viewBox="0 0 150 100">${b}<rect width="150" height="100" fill="none" ${K}/></svg>`);
  const st=(cx,cy,r,f)=>{const q=[];for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.42:r;q.push((cx+rr*Math.cos(a)).toFixed(1)+','+(cy+rr*Math.sin(a)).toFixed(1))}return `<polygon points="${q.join(' ')}" fill="${f}"/>`};
  const R='#d63a3a',W='#f8f0d9',B='#2c4fa8',G='#fdbc2a',Kk='#15121a',Gn='#1f8a4c',Y='#f2c230';
  const tri=(a,b,c,v)=>v?`<rect width="50" height="100" fill="${a}"/><rect x="50" width="50" height="100" fill="${b}"/><rect x="100" width="50" height="100" fill="${c}"/>`:`<rect width="150" height="34" fill="${a}"/><rect y="33" width="150" height="34" fill="${b}"/><rect y="66" width="150" height="34" fill="${c}"/>`;
  const leaf=`<path d="M75 22l5 12 8-4-2 14 10-8 2 7 9-2-4 11 5 3-17 11 2 7-16-2v13h-4V73l-16 2 2-7-17-11 5-3-4-11 9 2 2-7 10 8-2-14 8 4z" fill="${R}"/>`;
  const us=()=>{let x='';for(let i=0;i<13;i++)x+=`<rect y="${i*100/13}" width="150" height="${100/13}" fill="${i%2?W:R}"/>`;x+=`<rect width="64" height="54" fill="${B}"/>`;for(let r=0;r<4;r++)for(let c=0;c<5;c++)x+=st(8+c*12+(r%2?6:0),8+r*12,3.6,W);return sv(x)};
  const F={US:us(),
    CN:sv(`<rect width="150" height="100" fill="${R}"/>${st(28,28,15,G)}${st(55,10,5,G)}${st(64,22,5,G)}${st(64,38,5,G)}${st(55,50,5,G)}`),
    DE:sv(tri(Kk,R,G)),NL:sv(tri(R,W,B)),IE:sv(tri(Gn,W,'#f28a2e',1)),
    UK:sv(`<rect width="150" height="100" fill="${B}"/><path d="M0 0L150 100M150 0L0 100" stroke="${W}" stroke-width="20"/><path d="M0 0L150 100M150 0L0 100" stroke="${R}" stroke-width="7"/><path d="M75 0V100M0 50H150" stroke="${W}" stroke-width="32"/><path d="M75 0V100M0 50H150" stroke="${R}" stroke-width="18"/>`),
    CH:sv(`<rect width="150" height="100" fill="${R}"/><path d="M75 22V78M47 50H103" stroke="${W}" stroke-width="16"/>`),
    KR:sv(`<rect width="150" height="100" fill="${W}"/><path d="M50 50a25 25 0 0 1 50 0z" fill="${R}"/><path d="M50 50a25 25 0 0 0 50 0z" fill="${B}"/>`),
    TW:sv(`<rect width="150" height="100" fill="${R}"/><rect width="75" height="50" fill="${B}"/><circle cx="37.5" cy="25" r="11" fill="${W}"/>`),
    JP:sv(`<rect width="150" height="100" fill="${W}"/><circle cx="75" cy="50" r="26" fill="${R}"/>`),
    SE:sv(`<rect width="150" height="100" fill="#2a6db5"/><path d="M58 0V100M0 50H150" stroke="${Y}" stroke-width="18"/>`),
    DK:sv(`<rect width="150" height="100" fill="${R}"/><path d="M55 0V100M0 50H150" stroke="${W}" stroke-width="16"/>`),
    CA:sv(`<rect width="150" height="100" fill="${W}"/><rect width="38" height="100" fill="${R}"/><rect x="112" width="38" height="100" fill="${R}"/>${leaf}`)};
  /* where each company is headquartered (not where its stock trades: TSMC's TSM would read US). Unlisted = US.
     Spotify: operating HQ Stockholm (legal seat Luxembourg, Form 20-F); Accenture: Dublin; Carnival: Miami; Nebius: Amsterdam. */
  const HQ={'2317.TW':'TW',TSMC:'TW','005930.KS':'KR','000660.KS':'KR','ASML.AS':'NL',NBIS:'NL',ACN:'IE',SPOT:'SE','NOVN.SW':'CH',
    'HSBA.L':'UK','SHEL.L':'UK','AZN.L':'UK',ARM:'UK','VOW3.DE':'DE',BMW:'DE',DHL:'DE','SIE.DE':'DE',BB:'CA',SHOP:'CA',NVO:'DK',
    '6758.T':'JP',NINTENDO:'JP',SOFTBANK:'JP'};
  const hq=t=>HQ[t]||'US',mfl=m=>m==='KIMI'?'CN':'US',P=window.__x2pPnl().A,lead=Object.keys(P).sort((a,b)=>P[b].pnl-P[a].pnl)[0];
  const flg=(code,cls)=>`<i class="wc9-flg ${cls||''}" style="--fl:${F[code]||F.US}" aria-hidden="true"></i>`;
  /* M1: the scoreboard */
  D.querySelectorAll('.wc-sb-r').forEach((r,i)=>{if(r.querySelector('.wc9-cap'))return;const m=(r.querySelector('h3')||{}).textContent.trim().toUpperCase();
    const cap=D.createElement('div');cap.className='wc9-cap';['.wc-sb-nm','.wc-sb-pl','.wc-sb-st'].forEach(q=>{const e=r.querySelector(q);if(e)cap.append(e)});r.append(cap);
    r.insertAdjacentHTML('afterbegin',`${flg(mfl(m))}<div class="wc9-stub${i?'':' wc9-gold'}" aria-hidden="true"><b>#${i+1}</b><i>${i?'Season 1':'Golden ticket'}</i></div><i class="wc9-n wc9-nt" aria-hidden="true"></i><i class="wc9-n wc9-nb" aria-hidden="true"></i>`)});
  /* M2: tomorrow's tickets */
  const PU=(window.PENDING||[]).concat(window.UPCOMING||[]);
  D.querySelectorAll('.wc-tnp').forEach(t=>{if(t.querySelector('.wc9-ts'))return;const tk=((t.querySelector('header small')||{}).textContent||'').trim(),p=PU.find(x=>x.ticker===tk)||{},c=hq(tk);
    t.insertAdjacentHTML('afterbegin',`<div class="wc9-ts" aria-hidden="true">${flg(c)}<b>R${p.n||''}</b></div><i class="wc9-n wc9-nt" aria-hidden="true"></i><i class="wc9-n wc9-nb" aria-hidden="true"></i>`)});
  /* M3: every round as a torn stub */
  const RR={};ROUNDS.forEach(r=>RR[r.n]=r);
  D.querySelectorAll('.wc-bi').forEach(a=>{if(a.querySelector('.wc9-bs'))return;const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;
    const up=r.a>0,cs=r.calls.filter(c=>c[1]),perfect=cs.length>1&&cs.every(c=>/^UP/i.test(c[1])===up);
    a.insertAdjacentHTML('beforeend',`<span class="wc9-bs" aria-hidden="true"><b>#${r.n}</b><small>${esc(r.ticker.replace(/\..*$/,''))}</small><em class="${up?'wc9-u':'wc9-d'}">${up?'+':'−'}${Math.abs(r.a).toFixed(2)}%</em></span><i class="wc9-n wc9-nl" aria-hidden="true"></i><i class="wc9-n wc9-nr" aria-hidden="true"></i>`);
    if(perfect)a.classList.add('wc9-perf')});
  /* M4: smart or lucky */
  D.querySelectorAll('.wc-cn').forEach(r=>{if(r.querySelector('.wc9-flg'))return;const m=(r.querySelector('.wc-cn-n')||{}).textContent.trim().toUpperCase();
    r.insertAdjacentHTML('afterbegin',flg(mfl(m),'wc9-cnf'));const b=r.querySelector('.wc-cn-bar');if(b)b.insertAdjacentHTML('beforeend','<span class="wc9-coin" aria-hidden="true"></span>')});
  /* M5: the leader's face in holo wherever it appears (no flags under Starring, owner) */
  const lc=String((MODELS[lead]||{}).c||'').toLowerCase();
  D.querySelectorAll('.wc-face').forEach(f=>{if((f.getAttribute('style')||'').replace(/\s/g,'').toLowerCase().includes('--mc:'+lc+';')||(f.getAttribute('style')||'').replace(/\s/g,'').toLowerCase().endsWith('--mc:'+lc))f.classList.add('wc9-holo')});
  /* the dollar bill under "The winner gets paid" */
  D.querySelectorAll('.wc-lr-4').forEach(p=>p.classList.add('wc9-bill'));
}
/* R10 (owner, 2026-10-30, on ez/x2p-x3p-brand.png: "everything from B1 except the layout of the predictions", which takes B3's;
   "remove US because we already have the flag"; and Smart or lucky "a chart... so they can visualize the progression"). X3+ only. */
function r10(){if(H.classList.contains('cd-on'))return;H.classList.add('wc-f10');
  /* each of tomorrow's tickets in its company's colours, read from the company's own logo file: the most common saturated colour */
  const lum=h=>{const n=parseInt(h.slice(1),16);return (.2126*(n>>16)+.7152*(n>>8&255)+.0722*(n&255))/255};
  const pal=src=>new Promise(res=>{const im=new Image();im.onload=()=>{try{const w=64,h=Math.max(8,Math.round(64*im.height/im.width)),c=D.createElement('canvas');c.width=w;c.height=h;
    const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data,bins={};
    for(let i=0;i<d.length;i+=4){if(d[i+3]<160)continue;const r=d[i],g=d[i+1],b=d[i+2],mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx<60||(mx-mn)/mx<.35)continue;
      const k=(r>>5)+','+(g>>5)+','+(b>>5),o=bins[k]||(bins[k]={n:0,r:0,g:0,b:0});o.n++;o.r+=r;o.g+=g;o.b+=b}
    const t=Object.values(bins).sort((a,b)=>b.n-a.n)[0];res(t?'#'+[t.r,t.g,t.b].map(v=>Math.round(v/t.n).toString(16).padStart(2,'0')).join(''):null)}catch(e){res(null)}};im.onerror=()=>res(null);im.src=src});
  D.querySelectorAll('.wc-tnp').forEach(async t=>{if(t.classList.contains('wc10-b'))return;const tk=((t.querySelector('header small')||{}).textContent||'').trim(),lg=coLogo(tk);
    const m=(lg&&await pal(lg))||'#2b2733';t.style.setProperty('--bm',m);const L=v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4},n=parseInt(m.slice(1),16),Y=.2126*L(n>>16)+.7152*L(n>>8&255)+.0722*L(n&255);t.style.setProperty('--bt',1.05/(Y+.05)<3?'#15121a':'#fff');t.classList.toggle('wc10-lt',1.05/(Y+.05)<3);t.classList.add('wc10-b')});
  /* Smart or lucky as a chart: every AI's hit rate after each graded round (the Leaderboard's own formula, (right + 1) / (calls + 2),
     so every line starts at 50/50), the coin flip at 50%, a face and the hit rate where each line ends */
  const sp=D.querySelector('.wc-splash');if(!sp||sp.querySelector('.wc10-ch'))return;
  const P=window.__x2pPnl().A,R=ROUNDS.slice(),N=R.length,acc={};
  ORDER.forEach(m=>{let k=0,n=0;acc[m]=[.5];R.forEach(r=>{const x=P[m].per[r.n];if(x){n++;if(x.v>0)k++}acc[m].push((k+1)/(n+2))})});
  const lo=.3,hi=.8,Y=v=>((hi-Math.max(lo,Math.min(hi,v)))/(hi-lo)*100),X=i=>i/N*1000;
  const by=ORDER.slice().sort((a,b)=>P[b].W/(P[b].W+P[b].L)-P[a].W/(P[a].W+P[a].L)),hr=m=>Math.round(P[m].W/(P[m].W+P[m].L)*100);
  const ls=by.slice().reverse().map(m=>'<path class="wc10-l'+(m===by[0]?' wc10-lead':'')+'" pathLength="1" style="--mc:'+(MODELS[m].c==='#111'?'#15121a':MODELS[m].c)+'" d="'+acc[m].map((v,i)=>(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(2)).join(' ')+'"/>').join('');
  let es=by.map(m=>({m,y:Y(acc[m][N])})).sort((a,b)=>a.y-b.y);for(let i=1;i<es.length;i++)if(es[i].y-es[i-1].y<15)es[i].y=es[i-1].y+15;const ov=es[es.length-1].y-97;if(ov>0)es.forEach(e=>e.y-=ov);
  const ticks=[];for(let i=10;i<N;i+=10)ticks.push(i);
  const gl=[.4,.6,.7];
  const html='<figure class="wc10-ch" aria-label="Hit rate after every round: '+by.map(m=>NM[m]+' '+hr(m)+'%').join(', ')+'. A coin flip gets about 50%.">'
    +'<figcaption class="wc10-hd"><span class="wc10-cap">Hit rate, round by round</span><span class="wc10-key"><i aria-hidden="true"></i>Coin flip 50%</span></figcaption>'
    +'<div class="wc10-pl"><div class="wc10-cv"><svg viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">'
    +gl.map(v=>'<line class="wc10-g" x1="0" x2="1000" y1="'+Y(v)+'" y2="'+Y(v)+'"/>').join('')
    +'<line class="wc10-coinl" x1="0" x2="1000" y1="'+Y(.5)+'" y2="'+Y(.5)+'"/>'+ls+'</svg>'
    +'<span class="wc10-coin" style="top:'+Y(.5)+'%" aria-hidden="true"></span>'
    +gl.map(v=>'<span class="wc10-yl" style="top:'+Y(v)+'%">'+Math.round(v*100)+'%</span>').join('')+'</div>'
    +'<div class="wc10-ends" aria-hidden="true">'+es.map(e=>'<span class="wc10-e" style="top:'+e.y.toFixed(1)+'%;--mc:'+MODELS[e.m].c+'">'+face(e.m,'wc-f-s')+'<b>'+hr(e.m)+'%</b></span>').join('')+'</div></div>'
    +'<p class="wc10-x" aria-hidden="true"><span style="left:0">R1</span>'+ticks.map(i=>'<span style="left:'+(i/N*100).toFixed(2)+'%">R'+R[i-1].n+'</span>').join('')+'<span style="left:100%">R'+R[N-1].n+'</span></p></figure>';
  const co=sp.querySelector('.wc-coins');if(co)co.insertAdjacentHTML('beforebegin',html);sp.classList.add('wc10-on');
  const fig=sp.querySelector('.wc10-ch');new IntersectionObserver((es2,o)=>{if(es2[0].isIntersecting){fig.classList.add('wc10-in');o.disconnect()}},{threshold:.3}).observe(fig)}
const done=()=>H.classList.add('x2p-world');
/* (speed, 2026-10-30) a section of the issue off screen holds its loops still (the waving flags, the holo faces, the sparkles: about
   forty run at once, a third of a slow phone's time at rest went to painting the ones nobody sees). As x2plus.js does for the old
   Overview (SPEED3): watched with 200px of warning, what animates in a section is named as it leaves (wc-an, or wc-anp for a
   ::before/::after), and world-comic.css pauses those while the section is away. A loop started while it is away runs until the next time. */
function holdOff(){if(!window.IntersectionObserver)return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;
    if(!e.isIntersecting&&t.getAnimations)try{t.getAnimations({subtree:true}).forEach(a=>{const f=a.effect,g=f&&f.target;if(g&&g.classList)g.classList.add(f.pseudoElement?'wc-anp':'wc-an')})}catch(x){}
    t.classList.toggle('wc-offs',!e.isIntersecting)}),{rootMargin:'200px 0px'});
  D.querySelectorAll('#wc-book > section,#wc-lb > section,#wc-up > section').forEach(x=>io.observe(x))}
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
    try{r9()}catch(e){window.__x2pWorldErr=e;console.error('comic r9',e)}
    try{r10()}catch(e){window.__x2pWorldErr=e;console.error('comic r10',e)}
    try{r11()}catch(e){window.__x2pWorldErr=e;console.error('comic r11',e)}
    try{holdOff()}catch(e){}
    done()}
  else if(tries++<200)setTimeout(wait,50);else done()})();
/* ===================== R11 (owner, 2026-10-30) ===================== X3+ only (X5+ has cd-on and keeps its own).
   1 "Every round so far": the winner leaves the tile's corner and is stamped on the stub beside the move ("won"; a tie both
     marks; nobody a red "×  Nobody"), where results are printed (lesson 50).
   2 "Who's winning" (Leaderboard top): helper n's N1, the corners walk-in. Windows Season (default), Last 24 hours, Last 7 days
     on the fight bill's ticket stubs (a tablist); each corner printed in its fighter's own colour; the figure says P&L with W-L
     under it, no gap box; the undercard; the line (how the holder took the ticket, or the window's biggest swing); the next bell.
     The scoreboard below re-orders to the window.
   3 "One round, start to finish": helper d's D2 fight night on round 56 (Robinhood), panel 2 the poster with a play button
     (no autoplay), panel 3 helper o's O5 dial (the needle lands, that half lights, the gold arc, the crown) with a comic slap
     on the wrong side, on the two corners' own colours; panel 5 helper a's punched Season 1 ticket.
   All motion is transform and opacity (CSS or WAAPI), one-shot, still with reduced motion; holdOff() holds the loops off screen.
   Every number comes from ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS and __x2pPnl(). Classes wc11-. */
/* X5+ runs the dark layer right after this file in the same script, so its cd-on can arrive after wait() has called r11(): the
   decision waits one microtask (still before the next paint, and before the cover's own observers see x2p-world) */
function r11(){queueMicrotask(()=>{try{r11b()}catch(e){window.__x2pWorldErr=e;console.error('comic r11',e)}})}
function r11b(){if(H.classList.contains('cd-on'))return;H.classList.add('wc-f11');
  const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const col=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
  const mk=(m,cls)=>`<svg class="${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${MODELS[m].d}" style="fill:${col(m)}"/></svg>`;
  const P=window.__x2pPnl().A,RS=ROUNDS.slice().sort((a,b)=>a.n-b.n);
  const plead=Object.keys(P).sort((a,b)=>P[b].pnl-P[a].pnl)[0];
  const lgImg=(t,cls)=>{const l=coLogo(t),dk=((window.CO_LOGOS||{})[t]||{}).dark;return l?`<img class="wc11-lg${dk?' wc11-lgdk':''} ${cls||''}" src="${l}" alt="">`:''};
  const $f=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
  const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(1)+'K':Math.round(Math.abs(v)));
  const per=(m,r)=>P[m]&&P[m].per[r.n]?P[m].per[r.n].v:0;
  const once=(el,th,f)=>{if(!el)return;const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();f()}},{threshold:th||.5});io.observe(el)};
  /* money accruing on screen: a one-shot count from a figure to another (instant with reduced motion) */
  const count=(el,from,to,dur)=>{const fmt=v=>el.dataset.k?k$(v):$f(v);if(RM()||!dur||Math.round(from)===Math.round(to)){el.textContent=fmt(to);return}
    const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);el.textContent=fmt(from+(to-from)*e);if(k<1)requestAnimationFrame(f)})(t0)};
  try{r11Tiles()}catch(e){window.__x2pWorldErr=e;console.error('comic r11 tiles',e)}
  try{r11Lb()}catch(e){window.__x2pWorldErr=e;console.error('comic r11 lb',e)}
  try{r11Walk()}catch(e){window.__x2pWorldErr=e;console.error('comic r11 walk',e)}

  /* ---------- 1 · the winner's stamp on every round's stub ---------- */
  function r11Tiles(){const RR={};ROUNDS.forEach(r=>RR[r.n]=r);
    const stamp=r=>{const W=winners(r),tilt=[-7,5,-4,8,-6,3][r.n%6];
      if(!W.length)return `<span class="wc11-won wc11-nob" style="--ink:#c8261d;--r:${tilt}deg" aria-hidden="true"><i>×</i><b>Nobody</b></span>`;
      return `<span class="wc11-won${W.length>1?' wc11-tie':''}" style="--ink:${W.length>1?'#15121a':col(W[0])};--r:${tilt}deg" aria-hidden="true"><span class="wc11-wm">${W.map(m=>mk(m)).join('')}</span><b>won</b></span>`};
    const put=()=>D.querySelectorAll('.wc-season .wc-bi').forEach(a=>{const bs=a.querySelector('.wc9-bs');if(!bs||bs.querySelector('.wc11-won'))return;
      const r=RR[+(a.getAttribute('href')||'').replace(/\D/g,'')];if(!r)return;bs.insertAdjacentHTML('beforeend',stamp(r));const W=winners(r);
      a.setAttribute('aria-label',a.getAttribute('aria-label')+'. '+(W.length?W.map(m=>NM[m]).join(' and ')+(W.length>1?' tie for the win':' won'):'Nobody won'))});
    put();const k=D.querySelector('.wc-season .wc-key');if(k)k.textContent='The stamp on each stub says who won the round. % = the move at the close.'}

  /* ---------- 2 · who's winning: the fight bill ---------- */
  function r11Lb(){const lb=D.getElementById('wc-lb'),cv=lb&&lb.querySelector('.wc-tab-cv');if(!cv||cv.querySelector('.wc11n-bill'))return;
    const NOW=Date.now(),N=RS.length,rank=rankPnl(P,N),T=nyToday(),today=Date.UTC(2000+T[2],T[0]-1,T[1]);
    const dAgo=r=>{if(!r.resolves)return 1e9;const [m,d,y]=r.resolves.split('/').map(Number);return Math.round((today-Date.UTC(2000+(y%100),m-1,d))/864e5)};
    const CL=new Map(),clo=r=>{if(!CL.has(r))CL.set(r,closeAt(r.ticker,r.resolves));return CL.get(r)};
    const seq={};ORDER.forEach(m=>{seq[m]=[];RS.forEach(r=>{const c=r.calls.find(x=>x[0]===m&&x[1]),k=c&&call(c[1]);if(k)seq[m].push({r,ok:k.up===(r.a>0)})})});
    const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'long',month:'numeric',day:'numeric',hour:'numeric',minute:'2-digit',hourCycle:'h23'}),nyP=t=>{const p=NYF.formatToParts(new Date(t));const g=k=>(p.find(x=>x.type===k)||{}).value;return {wd:g('weekday'),m:+g('month'),d:+g('day'),h:+g('hour'),mi:+g('minute')}};
    const mdy=s=>{const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
    const WS=[{k:'season',t:'Season',f:()=>true,when:'Since '+md(RS[0].called||RS[0].resolves)},
      {k:'d1',t:'Last 24 hours',f:r=>{const a=dAgo(r);if(a>2||a<-1)return false;const c=clo(r);return c!=null&&c>NOW-864e5}},
      {k:'d7',t:'Last 7 days',f:r=>{const a=dAgo(r);return a>=0&&a<=6}}];
    WS.forEach(w=>{w.rs=RS.filter(w.f);w.amt=m=>w.rs.reduce((t,r)=>t+per(m,r),0);
      w.wl=m=>{if(w.k==='season')return {W:P[m].W,L:P[m].L};const s=seq[m].filter(x=>w.f(x.r)),k=s.filter(x=>x.ok).length;return {W:k,L:s.length-k}}});
    {const rs=WS[1].rs;WS[1].when=rs.length?md(rs.reduce((a,r)=>mdy(r.resolves)>mdy(a.resolves)?r:a).resolves)+' close':'No close'}
    {const a=new Date(today-6*864e5);WS[2].when=a.getUTCMonth()===T[0]-1?`${MON[a.getUTCMonth()]} ${a.getUTCDate()} to ${T[1]}`:`${MON[a.getUTCMonth()]} ${a.getUTCDate()} to ${MON[T[0]-1]} ${T[1]}`}
    /* since which round the golden ticket holder has led without a break (the board's own rule at every step) */
    const reign=(()=>{const bal={},cnt={};ORDER.forEach(m=>{bal[m]=0;cnt[m]=0});let from=null;
      RS.forEach((r,i)=>{ORDER.forEach(m=>{bal[m]+=per(m,r);if(r.calls.some(c=>c[0]===m&&c[1]))cnt[m]++});const n=i+1;
        const ld=ORDER.slice().sort((a,b)=>((cnt[b]*2>=n)-(cnt[a]*2>=n))||(bal[b]-bal[a]))[0];if(ld!==rank[0])from=null;else if(!from)from=r});return from})();
    const last5=m=>seq[m].slice(-5).filter(x=>x.ok).length;
    const logo=r=>`${lgImg(r.ticker,'wc11n-lg')}<b>${esc(r.co)}</b>`;
    /* the round that gave #1 its biggest edge over #2 in the window; "Decided" only when that round alone flips the order */
    const swing=(w,a,b)=>{let best=null;w.rs.forEach(r=>{const va=per(a,r),vb=per(b,r),d=va-vb;if(!best||d>best.d)best={r,va,vb,d}});return best};
    const fight=w=>{if(w.k==='season')return {a:rank[0],b:rank[1],la:'Golden ticket',lb:'Challenger',o:rank};
      const o=ORDER.slice().sort((a,b)=>w.amt(b)-w.amt(a));return {a:o[0],b:o[1],la:'#1',lb:'#2',o}};
    const line=(w,F)=>{if(w.k==='season'){if(!reign)return '';const l5=last5(F.a);
        return `${NM[F.a]} took the ticket on ${logo(reign)}, round ${reign.n}.${l5<=1?` Only ${l5} of its last 5 calls ${l5===1?'was':'were'} right.`:''}`}
      const s=swing(w,F.a,F.b);if(!s)return '';const flips=(w.amt(F.a)-s.va)<(w.amt(F.b)-s.vb);
      return `${flips?'Decided on':'Biggest swing on'} ${logo(s.r)}, ${NM[F.a]} ${k$(s.va)}, ${NM[F.b]} ${k$(s.vb)}.`};
    /* the next bell: the soonest exchange close among the rounds still to grade */
    const nextBell=(()=>{const cand=[...(window.PENDING||[]),...(window.UPCOMING||[])].filter(r=>r.resolves&&dAgo(r)<=1),days=[...new Set(cand.map(r=>-dAgo(r)))].sort((a,b)=>a-b);
      for(const d of days){const t=cand.filter(r=>-dAgo(r)===d).map(r=>({r,t:closeAt(r.ticker,r.resolves)})).filter(x=>x.t&&x.t>NOW);if(t.length){const m=Math.min(...t.map(x=>x.t));return {t:m,rs:t.filter(x=>x.t===m).map(x=>x.r)}}}return null})();
    const inT=ms=>{const mn=Math.max(1,Math.round(ms/6e4)),h=Math.floor(mn/60);return h>=24?Math.floor(h/24)+'d '+(h%24)+'h':h?h+'h '+(mn%60)+'m':mn+'m'};
    const bellWhen=nb=>{const p=nyP(nb.t),tp=nyP(NOW),hh=(p.h%12||12)+(p.mi?':'+String(p.mi).padStart(2,'0'):'')+(p.h<12?' am':' pm');return (p.d===tp.d&&p.m===tp.m?'Today':p.wd)+' '+hh+' ET'};
    const lastBell=RS.filter(r=>r.resolves&&dAgo(r)<=Math.min(...RS.map(dAgo))+1).reduce((a,r)=>(clo(r)||0)>(clo(a)||0)?r:a),lbp=nyP(clo(lastBell)||NOW);
    const quiet=w=>`Last bell: ${lbp.wd} ${MON[lbp.m-1]} ${lbp.d}.${nextBell?` Next: ${bellWhen(nextBell)}, ${nextBell.rs.slice(0,2).map(logo).join(' and ')}${nextBell.rs.length>2?' +'+(nextBell.rs.length-2):''}.`:''}`;
    const all=WS.map(w=>{const F=fight(w),amts={};ORDER.forEach(m=>amts[m]=w.amt(m));
      return {w,F,amts,va:amts[F.a],vb:amts[F.b],wa:w.wl(F.a),wb:w.wl(F.b),line:w.rs.length?line(w,F):'',under:F.o.filter(m=>m!==F.a&&m!==F.b),empty:!w.rs.length}});
    const dots=m=>m==='GROK'?'#4a4452':`color-mix(in srgb,${col(m)} 62%,#000)`;
    const money=(m,v)=>`<b class="${v>=0?'wc-tu':'wc-td'}" data-to="${v}" data-m="${m}">${$f(v)}</b>`;
    const fc=(m,cls)=>face(m,cls+(m===plead?' wc9-holo':''));
    const role=(x,s)=>x.w.k==='season'&&s==='a'?'<span class="wc11n-gt"><span>Golden</span><span>ticket</span></span>':`<span class="wc11n-rl">${s==='a'?x.F.la:x.F.lb}</span>`;
    const wlh=x=>`<span class="wc11n-wl"><b class="wc11c-w">${x.W}</b>-<b class="wc11c-l">${x.L}</b><small>W-L</small></span>`;
    const cn=(x,s)=>{const m=x.F[s],v=s==='a'?x.va:x.vb,w=s==='a'?x.wa:x.wb;
      return `<div class="wc11c-cn wc11c-${s}">${role(x,s)}${fc(m,'wc-f-xl wc11c-f')}<span class="wc11c-nm">${NM[m]}</span><span class="wc11c-pl"><small>${x.w.k==='season'?'Season P&amp;L':x.w.k==='d1'?'24h P&amp;L':'7-day P&amp;L'}</small>${money(m,v)}</span>${wlh(w)}</div>`};
    const bellSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5a1.6 1.6 0 0 1 1.6 1.6v.7c3 .8 4.9 3.4 4.9 6.6v3.7l1.8 2.4H3.7l1.8-2.4v-3.7c0-3.2 1.9-5.8 4.9-6.6v-.7A1.6 1.6 0 0 1 12 2.5zM9.6 19.6h4.8a2.4 2.4 0 0 1-4.8 0z"/></svg>';
    const render=x=>x.empty?`<div class="wc11c-gs"><i class="wc11c-g wc11c-gq"></i></div><div class="wc11c-q">${bellSvg.replace('<svg','<svg class="wc11c-qb"')}
        <b class="wc11c-qh">No bell in ${x.w.k==='d1'?'24 hours':'7 days'}</b><div class="wc11c-qf">${ORDER.map(m=>`<span>${face(m,'wc11c-uf')}<em>$0</em></span>`).join('')}</div></div>
        <p class="wc11c-line">${quiet(x.w)}</p>`
      :`<div class="wc11c-gs"><i class="wc11c-g wc11c-ga" style="--c:${col(x.F.a)};--d:${dots(x.F.a)}"></i><i class="wc11c-gw"><i class="wc11c-g wc11c-gb" style="--c:${col(x.F.b)};--d:${dots(x.F.b)}"></i></i></div>
        <div class="wc11c-ring">${cn(x,'a')}<div class="wc11c-mid" aria-hidden="true"><span class="wc11c-vs">VS</span></div>${cn(x,'b')}</div>
        ${x.under.length?`<div class="wc11c-under"><small>Undercard</small>${x.under.map(m=>`<span>${fc(m,'wc11c-uf')}<em>${NM[m]}</em>${money(m,x.amts[m])}</span>`).join('')}</div>`:''}
        ${x.line?`<p class="wc11c-line">${x.line}</p>`:''}`;
    cv.classList.add('wc11n-cv');
    cv.innerHTML=`<div class="wc11n-bill">
      <div class="wc11n-hd"><div class="wc11n-top"><span class="wc11n-std">The standings<small>${N} earnings reports graded</small></span>${nextBell?`<span class="wc11n-bell" title="The next close that grades a round">${bellSvg}<span><small>Next bell</small><b data-bell>${inT(nextBell.t-NOW)}</b><small>${nextBell.rs.length} round${nextBell.rs.length>1?'s':''}</small></span></span>`:''}</div>
        <h1 class="wc-tab-h">Who's winning?</h1>
        <div class="wc11n-stubs" role="tablist" aria-label="Time window">${all.map((x,i)=>`<button type="button" role="tab" id="wc11n-t${i}" aria-controls="wc11n-bout" class="wc11n-stub" data-k="${x.w.k}" aria-selected="${i===0}" tabindex="${i?-1:0}"><b>${x.w.t}</b><small>${x.w.when}</small></button>`).join('')}</div></div>
      <div class="wc11n-bout" id="wc11n-bout" role="tabpanel" aria-labelledby="wc11n-t0" aria-live="polite"></div></div>`;
    const bout=cv.querySelector('.wc11n-bout'),btns=[...cv.querySelectorAll('.wc11n-stub')];let cur=null;
    /* the scoreboard below follows the window: re-ordered (sliding into place), the window's money on a sticker */
    const board=(x,anim)=>{const list=lb.querySelector('.wc-sb');if(!list)return;const tk=[...list.querySelectorAll('.wc-sb-r')],byM={};
      tk.forEach(t=>{byM[((t.querySelector('h3')||{}).textContent||'').trim().toUpperCase()]=t});const fl=anim&&!RM(),r0=fl?new Map(tk.map(t=>[t,t.getBoundingClientRect()])):null;
      x.F.o.forEach((m,i)=>{const t=byM[m];if(!t)return;t.style.order=i;let sk=t.querySelector('.wc11n-sk');if(!sk){t.insertAdjacentHTML('beforeend','<span class="wc11n-sk" aria-hidden="true"></span>');sk=t.querySelector('.wc11n-sk')}
        sk.innerHTML=x.w.k==='season'?'':`<small>${x.w.t}</small><b class="${x.amts[m]>=0?'wc-tu':'wc-td'}">${k$(x.amts[m])}</b><i>#${i+1}</i>`;sk.classList.toggle('wc11n-on',x.w.k!=='season')});
      if(fl)tk.forEach(t=>{const a=r0.get(t),dy=a.top-t.getBoundingClientRect().top;if(Math.abs(dy)>1)t.animate([{transform:`translateY(${dy}px)`},{transform:'none'}],{duration:620,easing:'cubic-bezier(.3,1.2,.4,1)'})})};
    const enter=(prev)=>{/* the new corners' colours wipe in over the old ones, and the pair walks in from its corners */
      const g=bout.querySelectorAll('.wc11c-ga,.wc11c-gw,.wc11c-gq');g.forEach((e,i)=>e.animate([{transform:`translateX(${i&&e.classList.contains('wc11c-gw')?100:-100}%)`},{transform:'none'}],{duration:380,easing:'cubic-bezier(.3,.8,.3,1)'}));
      bout.querySelectorAll('.wc11c-cn').forEach((c,i)=>{const s=i?1:-1;c.animate([{transform:`translateX(${s*120}%)`},{transform:`translateX(${s*60}%) translateY(-7px)`,offset:.3},{transform:`translateX(${s*30}%)`,offset:.5},{transform:`translateX(${s*10}%) translateY(-5px)`,offset:.75},{transform:'none'}],{duration:620,delay:120,easing:'linear',fill:'backwards'})});
      const m=bout.querySelector('.wc11c-mid');if(m)m.animate([{transform:'translate(-50%,-50%) scale(1.9) rotate(-10deg)',opacity:0},{transform:'translate(-50%,-50%)',opacity:1}],{duration:300,delay:600,easing:'cubic-bezier(.3,1.6,.5,1)',fill:'backwards'})};
    const show=(i,anim)=>{const x=all[i],prev=cur!=null?all[cur]:null;if(prev===x)return;anim=anim&&!RM();
      btns.forEach((b,j)=>{b.setAttribute('aria-selected',j===i);b.tabIndex=j===i?0:-1});bout.setAttribute('aria-labelledby','wc11n-t'+i);
      const put=()=>{const old=anim?[...bout.querySelectorAll(':scope>.wc11c-gs')].map(e=>e.innerHTML).join(''):'';bout.innerHTML=render(x);
        if(old){bout.insertAdjacentHTML('afterbegin',`<div class="wc11c-ug">${old}</div>`);setTimeout(()=>{const u=bout.querySelector('.wc11c-ug');if(u)u.remove()},520)}
        bout.querySelectorAll('[data-to]').forEach(el=>{const to=+el.dataset.to;count(el,prev?prev.amts[el.dataset.m]:to,to,anim?760:0)});if(anim)enter(prev)};
      bout.classList.toggle('wc11n-empty',x.empty);bout.dataset.k=x.w.k;board(x,anim);cur=i;
      const old=bout.querySelectorAll('.wc11c-cn,.wc11c-q');if(!anim||!old.length){put();return}
      old.forEach(c=>{const r=c.classList.contains('wc11c-b');c.animate([{transform:'none',opacity:1},{transform:`translateX(${r?130:-130}%) rotate(${r?8:-8}deg)`,opacity:.2}],{duration:240,easing:'cubic-bezier(.6,0,.9,.5)',fill:'forwards'})});
      const m=bout.querySelector('.wc11c-mid');if(m)m.animate([{opacity:1},{opacity:0}],{duration:160,fill:'forwards'});setTimeout(put,230)};
    btns.forEach((b,i)=>{b.addEventListener('click',()=>show(i,true));
      b.addEventListener('keydown',e=>{const n=btns.length,j={ArrowRight:(i+1)%n,ArrowLeft:(i+n-1)%n,Home:0,End:n-1}[e.key];if(j==null)return;e.preventDefault();btns[j].focus();show(j,true)})});
    show(0,false);window.__wc11Show=(k,anim)=>show(WS.findIndex(w=>w.k===k),anim);
    const be=cv.querySelector('[data-bell]');if(be)setInterval(()=>{if(lb.offsetParent)be.textContent=inT(nextBell.t-Date.now())},30000)}

  /* ---------- 3 · one round, start to finish: fight night ---------- */
  function r11Walk(){const sec=D.querySelector('#wc-book .wc-lr');if(!sec||sec.querySelector('.wc11d-pg'))return;
    /* the owner's example: round 56 (Robinhood). Without its film: the newest graded round with a film where exactly one AI stood
       on the wrong side, or one alone on the right */
    let r=ROUNDS.find(x=>x.n===56);if(!r||!film(r.n)){console.warn('comic r11: round 56 has no film; using another example');
      r=ROUNDS.filter(x=>film(x.n)).sort((a,b)=>b.n-a.n).find(x=>{const up=x.a>0,cs=x.calls.map(c=>call(c[1])).filter(Boolean),ok=cs.filter(c=>c.up===up).length;return ok===1||cs.length-ok===1})}
    if(!r)return;const n=r.n,up=r.a>0,A=r.a,W=winners(r),f=film(n);
    const cs=ORDER.map(m=>{const row=r.calls.find(c=>c[0]===m);const c=row&&call(row[1]);return c?{m,c,ok:c.up===up,off:+row[2],win:W.includes(m),v:per(m,r)}:null}).filter(Boolean);
    const cum=(m,upto)=>RS.reduce((t,x)=>x.n<=upto?t+per(m,x):t,0),rk=upto=>ORDER.slice().sort((a,b)=>cum(b,upto)-cum(a,upto)),before=rk(n-1),after=rk(n);
    const ord=cs.filter(x=>x.ok).concat(cs.filter(x=>!x.ok));
    const bulls=cs.filter(x=>x.c.up),bears=cs.filter(x=>!x.c.up).sort((a,b)=>a.c.v-b.c.v);
    const cap=(k,t)=>`<b class="wc11s-n" aria-hidden="true">${k}</b><p class="wc11s-c">${t}</p>`;
    const sv=x=>`${x.c.up?'+':'−'}${x.c.v}%`;
    const fighter=(x,g)=>`<div class="wc11d-ft${g?(x.win?' wc11d-win wc11d-ok':x.ok?' wc11d-ok':' wc11d-no'):''}">${g&&x.win?'<em class="wc11d-crown" aria-hidden="true">♛</em><i class="wc11d-halo" aria-hidden="true"></i>':''}${face(x.m,'wc11d-f')}
        <span class="wc11d-nm">${NM[x.m]}</span><b class="${x.c.up?'wc11s-tu':'wc11s-td'}">${sv(x)}</b>${g?`<i class="wc11d-pf ${x.ok?'wc11d-pass':'wc11d-fail'}" style="--i:${ord.indexOf(x)}">${x.ok?'Pass!':'Fail!'}</i>`:''}</div>`;
    const corner=(g,side,list)=>`<div class="wc11d-cn wc11d-c${side}${g&&((side==='u')===up)?' wc11d-wc':g?' wc11d-lc':''}"><p class="wc11d-ch">${side==='u'?'▲ Bulls':'▼ Bears'}</p>${list.map(x=>fighter(x,g)).join('')||'<p class="wc11d-empty">Nobody</p>'}</div>`;
    const corners=g=>`<div class="wc11d-ring${g?' wc11d-g':''}">${corner(g,'u',bulls)}${g?'':`<div class="wc11d-vs" aria-hidden="true"><b>${bulls.length} vs ${bears.length}</b></div>`}${corner(g,'d',bears)}</div>`;
    const p1=`<section class="wc11s-pn wc11d-p wc11d-p1" aria-label="Step 1">${cap(1,'Before the earnings, the AIs submit their predictions')}
        <p class="wc11d-bug"><span class="wc11d-live">R${n}</span>${lgImg(r.ticker)}<b>${esc(r.co)}</b><em>Locked ${md(r.called)}</em></p>${corners(0)}
        <p class="wc-sr">${bulls.length} said up, ${bears.length} said down. ${cs.map(x=>NM[x.m]+' '+(x.c.up?'up ':'down ')+x.c.v+'%').join('. ')}.</p></section>`;
    const p2=`<section class="wc11s-pn wc11d-p wc11d-p2" aria-label="Step 2">${cap(2,esc(r.co)+' reports. Then the close')}
        <div class="wc11d-tv"><img class="wc11d-po" src="${f.p}" alt="" loading="lazy" decoding="async"><button type="button" class="wc11d-play" aria-label="Play the round ${n} film with sound"><i aria-hidden="true"></i></button><span class="wc-sfx wc-lr-sfx wc11d-sfx ${up?'wc-up':'wc-dn'}" aria-hidden="true"><em>${sfx(A)}</em><b>${up?'+':'−'}${pct(A)}</b></span></div></section>`;
    /* panel 3: the needle lands (helper o's O5). 10% each way; a call beyond sits at the end stop */
    const cx=160,cy=140,R=104,MX=10,clp=v=>Math.max(-MX,Math.min(MX,v)),ang=v=>90+clp(v)*(90/MX),pt=(v,rr)=>{const a=ang(v)*Math.PI/180;return [cx+rr*Math.cos(a),cy-rr*Math.sin(a)]};
    const arc=(v0,v1,rr)=>{const [x0,y0]=pt(v0,rr),[x1,y1]=pt(v1,rr);return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${rr} ${rr} 0 0 ${v0>v1?1:0} ${x1.toFixed(1)} ${y1.toFixed(1)}`};
    let ticks='';for(let v=-MX;v<=MX;v+=2.5){const [a,b]=pt(v,R-11),[g,h]=pt(v,R-(v%5===0?19:15));ticks+=`<path class="wc11o-tk${v===0?' wc11o-tk0':''}" d="M${g.toFixed(1)} ${h.toFixed(1)}L${a.toFixed(1)} ${b.toFixed(1)}"/>`}
    const dl=cs.map(x=>({...x,sv:x.c.up?x.c.v:-x.c.v})).sort((a,b)=>b.sv-a.sv);let pa=null;dl.forEach(x=>{x.a=ang(x.sv);if(pa!=null&&pa-x.a<13)x.a=pa-13;pa=x.a});
    const best=dl.filter(x=>x.ok).sort((a,b)=>a.off-b.off)[0],gap=best?Math.abs(best.sv-A):0;
    const dface=(x,i)=>{const rr=R+34,a=x.a*Math.PI/180,X=cx+rr*Math.cos(a),Y=cy-rr*Math.sin(a);return `<span class="wc11o-mk${x.ok?' wc11o-ok':' wc11o-no'}" style="left:${(X/320*100).toFixed(2)}%;top:${(Y/190*100).toFixed(2)}%">${face(x.m,'wc11o-f')}${x===best?'<em class="wc11o-cr" aria-hidden="true">♛</em>':''}</span>`};
    /* the gold arc from the close to the closest pass, at least a few degrees so a near-perfect call still shows it */
    const gA=best?(()=>{let a0=A,a1=best.sv;if(Math.abs(a1-a0)<.5){const m=(a0+a1)/2;a0=m-.25;a1=m+.25}return arc(Math.max(a0,a1),Math.min(a0,a1),R+15)})():'';
    const oa=(ang(A)<=90?18:-18)*Math.PI/180+ang(A)*Math.PI/180,lx=cx+(R-34)*Math.cos(oa),ly=cy-(R-34)*Math.sin(oa);
    const bandW=arc(up?MX:0,up?0:-MX,R),bandL=arc(up?0:MX,up?-MX:0,R);
    const lose=up?'d':'u',loseList=up?bears:bulls,slap=loseList.length?(['WHAM!','SMACK!','THWACK!'][n%3]):'';
    const p3=`<section class="wc11s-pn wc11d-p wc11d-p3 wc11o${up?' wc11o-U':' wc11o-D'}" aria-label="Step 3">${cap(3,'The market grades every call')}
        <i class="wc11o-hl" aria-hidden="true"></i><i class="wc11o-hr" aria-hidden="true"></i><i class="wc11o-dim wc11o-dim-${lose}" aria-hidden="true"></i>
        <div class="wc11o-g" role="button" tabindex="0" aria-label="${esc(r.co)} ${moveWord(r)} ${pct(A)} at the close. ${dl.map(x=>NM[x.m]+(x.ok?' right':' wrong')).join(', ')}.${best?' '+NM[best.m]+' was closest, '+(Math.round(gap*100)/100)+'% off.':''} Tap to play the grading again.">
          <svg viewBox="0 0 320 190" aria-hidden="true">
            <path class="wc11o-pl" d="M${cx-R+11} ${cy}A${R-11} ${R-11} 0 0 1 ${cx+R-11} ${cy}Z"/>
            <path class="wc11o-bo" d="${arc(MX,-MX,R)}"/><path class="wc11o-bd wc11o-up" d="${arc(MX,0,R)}"/><path class="wc11o-bd wc11o-dn" d="${arc(0,-MX,R)}"/>${ticks}
            <text class="wc11o-lb wc11o-lu" x="${pt(7.5,R-56)[0].toFixed(1)}" y="${pt(7.5,R-56)[1].toFixed(1)}">▲ Up</text><text class="wc11o-lb wc11o-ld" x="${pt(-7.5,R-56)[0].toFixed(1)}" y="${pt(-7.5,R-56)[1].toFixed(1)}">Down ▼</text>
            <text class="wc11o-sc" x="${cx-R}" y="${cy+25}">+10%</text><text class="wc11o-sc" x="${cx+R}" y="${cy+25}">−10%</text>
            ${dl.map(x=>{const [a,b]=pt(x.sv,R+11),[c,e]=pt(x.sv,R+20);return `<path class="wc11o-ct" d="M${a.toFixed(1)} ${b.toFixed(1)}L${c.toFixed(1)} ${e.toFixed(1)}"/>`}).join('')}</svg>
          <div class="wc11o-ly wc11o-lose" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="wc11o-bd wc11o-gr" d="${bandL}"/></svg></div>
          <div class="wc11o-ly wc11o-lit" aria-hidden="true"><svg viewBox="0 0 320 190"><path class="wc11o-bd wc11o-bri ${up?'wc11o-bu':'wc11o-bdn'}" d="${bandW}"/><path class="wc11o-hi" d="${arc(up?MX:0,up?0:-MX,R-6)}"/></svg></div>
          ${best?`<div class="wc11o-ly wc11o-ga" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="${gA}"/></svg></div>`:''}
          <div class="wc11o-ly wc11o-nd" style="--nd:${(-(ang(A)-90)).toFixed(2)}deg" aria-hidden="true"><svg viewBox="0 0 320 190"><path d="M${cx-5} ${cy}L${cx} ${cy-R+16}L${cx+5} ${cy}Z"/><circle cx="${cx}" cy="${cy}" r="11"/><circle class="wc11o-hub" cx="${cx}" cy="${cy}" r="4"/></svg></div>
          ${dl.map(dface).join('')}
          ${best?`<b class="wc11o-off" style="left:${(lx/320*100).toFixed(2)}%;top:${(ly/190*100).toFixed(2)}%" aria-hidden="true">${Math.round(gap*100)/100}% off</b>`:''}
          <span class="wc11o-rd ${up?'wc11o-rU':'wc11o-rD'}" aria-hidden="true"><small>The close</small> ${up?'▲ +':'▼ −'}${pct(A)}</span></div>
        <div class="wc11o-cw">${corners(1)}${slap?`<span class="wc11o-slap wc11o-slap-${lose}" aria-hidden="true"><svg class="wc11o-sl" viewBox="0 0 120 80">${[...Array(12)].map((_,i)=>{const a=i/12*Math.PI*2,c=Math.cos(a),s=Math.sin(a);return `<path d="M${(60+c*40).toFixed(1)} ${(40+s*27).toFixed(1)}L${(60+c*58).toFixed(1)} ${(40+s*39).toFixed(1)}"/>`}).join('')}</svg><span class="wc11o-bs"><b>${[...slap].map((ch,i,a)=>`<i style="--k:${i/(a.length-1)}">${ch}</i>`).join('')}</b></span></span>`:''}</div>
        <p class="wc11d-rule"><span>Right corner passes. Closest pass takes the round.</span></p>
        <a class="wc11d-open" href="#/round/${n}">Open its graded card →</a></section>`;
    const pay=(cs.filter(x=>x.win)[0])||cs.slice().sort((a,b)=>b.v-a.v)[0],rest=cs.filter(x=>x!==pay);
    const race=`<div class="wc11d-race" aria-label="Season P&L after round ${n}: ${after.map((m,i)=>(i+1)+' '+NM[m]).join(', ')}"><p class="wc11d-rh">Season P&amp;L, after round ${n}</p>
        <ol class="wc11d-rl">${after.map((m,i)=>{const mv=before.indexOf(m)-i,v=cum(m,n);return `<li class="${i?'':'wc11d-gold'}" style="--from:${mv}">
          <b class="wc11d-rk">#${i+1}</b>${face(m,'wc11d-rf')}<span class="wc11d-rn">${NM[m]}</span><b class="wc11d-rv ${v>=0?'wc11s-tu':'wc11s-td'}">${k$(v)}</b>${mv?`<i class="wc11d-mv ${mv>0?'wc11d-mvu':'wc11d-mvd'}">${mv>0?'▲':'▼'}${Math.abs(mv)}</i>`:'<i class="wc11d-mv"></i>'}</li>`}).join('')}</ol></div>`;
    const p4=`<section class="wc11s-pn wc11d-p wc11d-p4" aria-label="Step 4">${cap(4,'The payout')}
        <div class="wc11d-pay"><div class="wc11d-purse">${face(pay.m,'wc11d-pfc')}<div><small>${NM[pay.m]} ${pay.v>=0?'made':'lost'}</small><b class="wc11d-big ${pay.v>=0?'wc11d-bu':'wc11d-bd'}" data-v="${pay.v}">${$f(pay.v)}</b></div></div>
          <ul class="wc11d-rest">${rest.map(x=>`<li>${face(x.m,'wc-f-s')}<span>${NM[x.m]}</span><b class="${x.v>=0?'wc11s-tu':'wc11s-td'}" data-v="${x.v}">${$f(x.v)}</b></li>`).join('')}</ul>${race}</div>
        <p class="wc11d-fine">P&amp;L on this call. Pretend $100,000 accounts, the whole balance on every call.</p></section>`;
    /* panel 5: the Season 1 ticket has a hole for every round; graded ones are punched, ringed by the move; this round gets punched */
    const hs=[].concat(ROUNDS.map(x=>({n:x.n,k:'g',a:x.a})),(window.PENDING||[]).map(x=>({n:x.n,k:'p',t:x.ticker})),(window.UPCOMING||[]).map(x=>({n:x.n,k:'u',t:x.ticker}))).sort((a,b)=>a.n-b.n);
    const TT=hs.length,G=ROUNDS.length,lst=hs[TT-1],isBet=lst&&lst.t==='NVDA';
    const holes=hs.map(x=>`<i class="wc11p-ho ${x.k==='g'?'wc11p-hg '+(x.a>0?'wc11p-hu':'wc11p-hd'):x.k==='p'?'wc11p-hp':'wc11p-h0'}${x.n===n?' wc11p-me':''}${x===lst&&isBet?' wc11p-bet':''}">${x.n===n?'<span class="wc11p-chad"></span><span class="wc11p-punch"></span><b class="wc11p-pow"><span>Chunk!</span></b>':''}</i>`).join('');
    const p5=`<section class="wc11s-pn wc11d-p wc11d-p5" aria-label="Step 5">${cap(5,'Every round goes on the record')}
        <div class="wc11p"><div class="wc11p-tk" aria-hidden="true"><p class="wc11p-h"><b>Season 1</b><span>${G} of ${TT} punched</span></p>
          <div class="wc11p-hs" style="--c:${Math.ceil(TT/6)};--c3:${Math.ceil(TT/3)}">${holes}</div><p class="wc11p-f">${isBet?'<span>Bet #1: NVIDIA ★</span>':''}</p><i class="wc11p-tn wc11p-tnl"></i><i class="wc11p-tn wc11p-tnr"></i></div>
          <button type="button" class="wc11d-open wc11d-meet">Meet the models ↓</button></div>
        <p class="wc-sr">The Season 1 ticket has a hole for each of its ${TT} rounds. ${G} are punched so far, round ${n} among them.${isBet?' The last one is bet number 1, NVIDIA.':''}</p></section>`;
    const h2=sec.querySelector('.wc-h2');const sm=h2&&h2.querySelector('small');if(sm)sm.remove();
    [...sec.children].forEach(c=>{if(c!==h2)c.remove()});
    sec.classList.add('wc11d-on');sec.insertAdjacentHTML('beforeend',`<div class="wc11d-pg">${p1}${p2}${p3}${p4}${p5}</div>`);
    const pg=sec.querySelector('.wc11d-pg'),rm=RM();
    const go=(el,th,cb)=>{if(!el)return;if(rm){el.classList.add('wc11-done');cb&&cb(true);return}el.classList.add('wc11-wait');once(el,th,()=>{el.classList.remove('wc11-wait');el.classList.add('wc11-go');cb&&cb(false)})};
    go(pg.querySelector('.wc11d-p1'),.45);
    go(pg.querySelector('.wc11d-p4'),.4,still=>{if(!still)pg.querySelectorAll('.wc11d-p4 [data-v]').forEach((b,i)=>{b.dataset.k=b.classList.contains('wc11d-big')?'':'1';const v=+b.dataset.v;setTimeout(()=>count(b,0,v,900),200+i*80)})});
    go(pg.querySelector('.wc11p-tk'),.7);
    /* panel 3 plays once on screen; a tap (or Enter) on the dial plays the grading again */
    const p3e=pg.querySelector('.wc11d-p3'),dial=p3e.querySelector('.wc11o-g');go(p3e,.55);
    const replay=()=>{if(RM())return;p3e.classList.remove('wc11-wait','wc11-go');void p3e.offsetWidth;p3e.classList.add('wc11-go')};
    dial.addEventListener('click',replay);dial.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();replay()}});
    /* panel 2: the poster until asked; a tap plays the film with sound; a tap on the film pauses it */
    const tv=pg.querySelector('.wc11d-tv'),pb=tv.querySelector('.wc11d-play');let v=null;
    pb.addEventListener('click',()=>{if(!v){v=D.createElement('video');v.className='wc11d-v';v.playsInline=true;v.preload='auto';v.poster=f.p;v.src=f.v;tv.appendChild(v);
        v.addEventListener('click',()=>{if(v.paused)v.play().catch(()=>{});else v.pause()});
        v.addEventListener('playing',()=>tv.classList.add('wc11d-on'));v.addEventListener('pause',()=>tv.classList.remove('wc11d-on'));v.addEventListener('ended',()=>{tv.classList.remove('wc11d-on');v.currentTime=0})}
      v.muted=false;v.play().catch(()=>{})});
    const meet=pg.querySelector('.wc11d-meet');if(meet)meet.addEventListener('click',()=>{const c=D.querySelector('.wc-chars');if(c)c.scrollIntoView({behavior:RM()?'auto':'smooth',block:'start'})})}
}
})();
