/* EZ, from first principles (mockup, 2026-10-29). The comic book's look and voice, race day's structure:
   cover -> one round told as a strip (how it works, last night) -> who's winning and who overtook whom ->
   tonight's card -> the last five nights -> smart or lucky -> next on the card. A Leaderboard tab compares the four side by side.
   Built over the real X2+ page with comic.css underneath (classes wc-*) and combined.css (classes wk-*).
   Every number from the page's data (ROUNDS, PENDING, UPCOMING, FILMS, MODELS, CO_LOGOS, CAPS, __x2pPnl). */
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
const DOW=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const pd=s=>{const [m,d,y]=s.split('/').map(Number);return {m,d,y:2000+(y%100)}};
const kd=s=>{const o=pd(s);return o.y*1e4+o.m*100+o.d};
const md=s=>{if(!s)return '';const o=pd(s);return MON[o.m-1]+' '+o.d};
const wdmd=s=>{const o=pd(s);return DOW[new Date(Date.UTC(o.y,o.m-1,o.d,12)).getUTCDay()]+' '+MON[o.m-1]+' '+o.d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const $K=v=>'$'+(Math.abs(v)/1000).toFixed(1)+'K';
const pm=v=>(v>=0?'+':'−')+$k(v);
const pmK=v=>(v>=0?'+':'−')+$K(v);
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const callTxt=c=>c?(c.up?'Up ':'Down ')+c.v+'%':'No call';
const face=(m,cls)=>{const M=MODELS[m];return `<i class="wc-face ${cls||''}" style="--mc:${M.c}" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="${M.d}"/></svg></i>`};
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const film=n=>{const f=(window.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const winners=r=>r.win?r.win.split(' & '):[];
const cap=t=>((window.CAPS||{})[t])||0;
const ord=['1st','2nd','3rd','4th'];
function ny(d){const o={};new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(d).forEach(p=>o[p.type]=p.value);return {y:+o.year,m:+o.month,d:+o.day,h:(+o.hour)%24,mi:+o.minute}}
function nyClose(o){for(let h=19;h<=22;h++){const t=new Date(Date.UTC(o.y,o.m-1,o.d,h,0));if(ny(t).h===16)return t}return null}
const left=ms=>{const mi=Math.max(0,Math.round(ms/6e4)),d=Math.floor(mi/1440),h=Math.floor(mi%1440/60),m=mi%60;return d?d+'d '+h+'h':h+'h '+m+'m'};
function coin(k,n){let lp=[0];for(let i=1;i<=n;i++)lp[i]=lp[i-1]+Math.log(i);let s=0;for(let i=k;i<=n;i++)s+=Math.exp(lp[n]-lp[i]-lp[n-i]-n*Math.LN2);return s}
function sfx(a){const x=Math.abs(a),up=a>0;if(x<1.5)return up?'blip':'tick';if(x<4)return up?'POP!':'THUD!';if(x<8)return up?'ZOOM!':'CRASH!';return up?'KA-POW!':'KA-BOOM!'}

function build(){
  const P=window.__x2pPnl().A,R=ROUNDS.slice().sort((a,b)=>a.n-b.n),N=R.length,last=R[N-1];
  const now=new Date(),nt=ny(now),todayK=nt.y*1e4+nt.m*100+nt.d;
  const rank=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl),lead=rank[0];

  /* positions after every round, by P&L (the race so far) */
  const cum={},posAt=[];ORDER.forEach(m=>cum[m]=0);
  R.forEach(r=>{ORDER.forEach(m=>{const q=P[m].per[r.n];cum[m]+=q?q.v:0});const o=ORDER.slice().sort((a,b)=>cum[b]-cum[a]);posAt.push({n:r.n,date:r.resolves,o:o.slice(),c:Object.assign({},cum)})});
  /* every overtake: after round i, X is above Y where before it was below */
  const ovt=[];for(let i=1;i<posAt.length;i++){const a=posAt[i-1].o,b=posAt[i].o;
    b.forEach((m,k)=>{const was=a.indexOf(m);if(was>k){const passed=a.slice(k,was).filter(x=>b.indexOf(x)>k);if(passed.length)ovt.push({n:posAt[i].n,r:R[i],m,passed,to:k})}})}
  const leadCh=posAt.filter((p,i)=>i&&p.o[0]!==posAt[i-1].o[0]).length;
  /* a week ago: the order after the last round graded at least 7 days before the newest */
  const lk=kd(last.resolves),wkK=(()=>{const o=pd(last.resolves),t=new Date(Date.UTC(o.y,o.m-1,o.d-7));return t.getUTCFullYear()*1e4+(t.getUTCMonth()+1)*100+t.getUTCDate()})();
  let wk=null;for(const p of posAt)if(kd(p.date)<=wkK)wk=p;
  const moved=m=>wk?wk.o.indexOf(m)-rank.indexOf(m):0;

  /* the round that explains the game: the newest night that has a film, its biggest move with a film */
  const filmed=R.filter(r=>film(r.n));const fk=Math.max(...filmed.map(r=>kd(r.resolves)));
  const ex=filmed.filter(r=>kd(r.resolves)===fk).sort((a,b)=>Math.abs(b.a)-Math.abs(a.a))[0];
  const exUp=ex.a>0,exW=winners(ex),exRight=ex.calls.filter(c=>{const x=call(c[1]);return x&&x.up===exUp}).map(c=>c[0]);
  const exF=film(ex.n);

  /* tonight's card */
  const pend=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length&&p.resolves);
  const dk=pend.map(p=>kd(p.resolves)).filter(k=>k>=todayK).sort((a,b)=>a-b)[0];
  const card=pend.filter(p=>kd(p.resolves)===dk).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
  const cardDate=card.length?card[0].resolves:null,isToday=dk===todayK,cl=cardDate?nyClose(pd(cardDate)):null;
  const live=isToday&&cl&&cl>now;

  /* ---------- 1 COVER ---------- */
  const cover=`<section class="wc-cover wk-cover" aria-label="Cover">
    <p class="wk-kick"><i class="wk-dot${live?'':' wk-off'}"></i>Season 1 · ${live?'Live tonight':'Off air'}<span>${N} rounds graded</span></p>
    <p class="wc-h1" role="heading" aria-level="1">4 AI<span class="wc-lc">s</span> trade earnings <span>to run our buybacks.</span></p>
    <p class="wc-tag">Each one calls a stock <b>before</b> its earnings report. The market close says who was right.</p>
    <div class="wc-film-slot"><p class="wc-cap wc-film-cap" aria-hidden="true">How it works · 1:20</p></div>
    <div class="wc-starring"><span class="wc-st-l">Starring</span>${ORDER.map(m=>`<span class="wc-st-m">${face(m)}<b>${NM[m]}</b></span>`).join('')}</div>
  </section>`;

  /* ---------- 2 ONE ROUND, AS A STRIP ---------- */
  const exCalls=ex.calls.map(c=>({m:c[0],c:call(c[1]),off:+c[2]}));
  const wv=exW.length?P[exW[0]].per[ex.n]:null;
  const strip=`<section class="wk-strip" aria-label="How a round works">
    <h2 class="wc-h2"><span>Last night, in 3 panels</span><small>This is the whole game. ${esc(ex.co)}, round ${ex.n}, ${md(ex.resolves)}.</small></h2>
    <ol class="wk-panels">
      <li class="wc-pn wk-p1"><p class="wc-cap wk-pk">1 · Before the report</p>
        <div class="wk-calls">${exCalls.map(x=>`<div class="wk-say">${face(x.m)}<p class="wc-bub"><small>${NM[x.m]}</small>${callTxt(x.c)}</p></div>`).join('')}</div>
        <p class="wk-pt">Each AI calls it: up or down, and by how much. Locked before the company reports.</p></li>
      <li class="wc-pn wk-p2"><p class="wc-cap wk-pk">2 · The close</p>
        <div class="wc-artw"><div class="wc-art wk-art">${exF?`<video class="wc-v" muted playsinline loop preload="none" poster="${exF.p}"><source src="${exF.v}" type="video/mp4"></video><button type="button" class="wc-snd" aria-label="Play with sound">▶ Sound</button>`:''}</div>
          <span class="wc-sfx ${exUp?'wc-up':'wc-dn'}" aria-hidden="true"><em>${sfx(ex.a)}</em><b>${exUp?'+':'−'}${pct(ex.a)}</b></span></div>
        <p class="wk-pt">${esc(ex.co)} ${exUp?'jumped':'dropped'} ${pct(ex.a)} by the next market close. ${exRight.length===1?'Only '+NM[exRight[0]]+' saw it coming.':exRight.length?exRight.length+' of 4 saw it coming.':'Nobody saw it coming.'}</p></li>
      <li class="wc-pn wk-p3"><p class="wc-cap wk-pk">3 · The winner</p>
        <div class="wk-win">${exW.length?exW.map(m=>face(m,'wc-f-xl')).join(''):'<i class="wc-nob">×</i>'}<div><b>${exW.length?exW.map(m=>NM[m]).join(' & '):'Nobody'}</b>
          ${wv?`<span class="wc-tu">${pm(wv.v)}</span><small>on its $100K account</small>`:''}</div></div>
        <p class="wk-pt">The closest call that got the direction right wins the round. The money moves on every call.</p></li>
    </ol>
  </section>`;

  /* ---------- 3 WHO'S WINNING (and who overtook whom) ---------- */
  const rowsS=rank.map((m,i)=>{const a=P[m],mv=moved(m),gap=i?pmK(a.pnl-P[lead].pnl).replace('−','')+' behind':'In front';
    return `<li class="wk-sr${i?'':' wk-sr1'}" style="--mc:${MODELS[m].c}"><span class="wk-pos">${i+1}</span>${face(m)}
      <span class="wk-nm"><b>${NM[m]}</b><small>${gap}</small></span>
      <span class="wk-mv ${mv>0?'wk-mu':mv<0?'wk-md':'wk-m0'}" title="Places since a week ago">${mv>0?'▲'+mv:mv<0?'▼'+(-mv):'–'}</span>
      <span class="wk-wl"><b>${a.W}-${a.L}</b><small>right-wrong</small></span>
      <span class="wk-pl ${a.pnl>=0?'wc-tu':'wc-td'}">${pmK(a.pnl)}</span></li>`}).join('');
  /* the last 12 rounds as a position chart, overtakes marked */
  const K=Math.min(12,posAt.length),sl=posAt.slice(-K),W0=330,Hc=150,px=i=>14+i*(W0-90)/(K-1),py=k=>16+k*36;
  const lines=ORDER.map(m=>`<path d="${sl.map((p,i)=>(i?'L':'M')+px(i).toFixed(1)+' '+py(p.o.indexOf(m))).join(' ')}" stroke="${MODELS[m].c}" class="wk-ln${m===lead?' wk-ln1':''}"/>`).join('');
  const dots=[];sl.forEach((p,i)=>{if(!i)return;ovt.filter(o=>o.n===p.n).forEach(o=>dots.push(`<g class="wk-bang" transform="translate(${px(i).toFixed(1)} ${py(o.to)})"><path d="M0 -9 L2.6 -3 9 -3.4 4 1.2 6 8 0 4.2 -6 8 -4 1.2 -9 -3.4 -2.6 -3Z"/></g>`))});
  const ends=sl[K-1].o.map((m,k)=>`<text x="${px(K-1)+12}" y="${py(k)+4.5}" class="wk-end">${NM[m]}</text>`).join('');
  const recent=ovt.slice(-3).reverse();
  const ovTxt=o=>`<li><b class="wk-rn">R${o.n}</b> ${face(o.m,'wc-f-s')}<span><b>${NM[o.m]}</b> passes ${o.passed.map(x=>NM[x]).join(' and ')}${o.to===0?' <em>for the lead</em>':' for '+ord[o.to]} <small>on ${esc(o.r.co)}</small></span></li>`;
  const stand=`<section class="wk-stand" aria-label="Who's winning">
    <h2 class="wc-h2"><span>Who's winning</span><small>Each AI trades a pretend $100,000 on its calls. Most money leads, and makes the real buyback call.</small></h2>
    <ol class="wk-board wc-pn">${rowsS}</ol>
    <p class="wk-key"><span>▲▼ places since a week ago</span><span>Right-wrong: calls that got the direction</span></p>
    <div class="wk-race wc-pn"><p class="wc-cap wk-pk">The race so far · last ${K} rounds</p>
      <svg viewBox="0 0 ${W0} ${Hc}" role="img" aria-label="Positions after each of the last ${K} rounds">${[0,1,2,3].map(k=>`<text x="0" y="${py(k)+4}" class="wk-gt">${k+1}</text>`).join('')}${lines}${dots.join('')}${ends}
        <text x="${px(0)}" y="${Hc-2}" class="wk-ax">R${sl[0].n}</text><text x="${px(K-1)}" y="${Hc-2}" class="wk-ax" text-anchor="end">R${sl[K-1].n}</text></svg>
      <ul class="wk-ovt">${recent.map(ovTxt).join('')}</ul>
      <p class="wk-pt">The lead has changed hands ${leadCh} times this season. ★ = an overtake.</p></div>
  </section>`;

  /* ---------- 4 TONIGHT'S CARD ---------- */
  const say=(p)=>{const up=p.calls.filter(c=>c.dir==='UP'),dn=p.calls.filter(c=>c.dir==='DOWN');const k=p.calls.length;
    return k<4?k+' of 4 calls in':!up.length?'All four say down':!dn.length?'All four say up':up.length===1?NM[up[0].m]+' alone says up':dn.length===1?NM[dn[0].m]+' alone says down':'2 say up, 2 say down'};
  const tn=`<section class="wk-tonight" aria-label="Tonight's card">
    <h2 class="wc-h2"><span>${isToday?"Tonight's card":wdmd(cardDate)+"'s card"}</span><small>${card.length} rounds. The calls are locked. The close decides.</small></h2>
    ${cl?`<p class="wk-off"><b>${live?'<i class="wk-dot"></i>':''}Graded at the US close</b><span>${cl>now?'in '+left(cl-now):'Results soon'}</span></p>`:''}
    <div class="wk-cards">${card.map(p=>{const lg=coLogo(p.ticker);return `<a class="wc-pn wk-tc" href="#/round/${p.n}"><header>${lg?`<img src="${lg}" alt="">`:''}<b>${esc(p.co)}</b><small>R${p.n}</small></header>
      <p class="wk-tsay">${say(p)}</p>
      <div class="wc-tn-c">${ORDER.map(m=>{const c=p.calls.find(x=>x.m===m);return c?`<span class="wc-tn-s ${c.dir==='UP'?'wc-tu':'wc-td'}">${face(m,'wc-f-s')}${c.dir==='UP'?'Up':'Down'} ${c.mag}%</span>`:`<span class="wc-tn-s wk-tbc">${face(m,'wc-f-s')}Call to come</span>`}).join('')}</div></a>`}).join('')}</div>
    <p class="wk-swipe" aria-hidden="true">Swipe for all ${card.length} →</p>
  </section>`;

  /* ---------- 5 THE LAST FIVE NIGHTS ---------- */
  const dates=[...new Set(R.map(r=>r.resolves))].sort((a,b)=>kd(b)-kd(a));
  const night=d=>{const rs=R.filter(r=>r.resolves===d).sort((a,b)=>cap(b.ticker)-cap(a.ticker)||b.n-a.n);
    const best=ORDER.map(m=>({m,v:rs.reduce((s,r)=>s+((P[m].per[r.n]||{}).v||0),0)})).sort((a,b)=>b.v-a.v)[0];
    return `<article class="wk-night"><header><b>${wdmd(d)}</b><span>${rs.length} round${rs.length>1?'s':''} · best night: ${face(best.m,'wc-f-s')} ${NM[best.m]} <em class="${best.v>=0?'wc-tu':'wc-td'}">${pmK(best.v)}</em></span></header>
      <ol>${rs.map(r=>{const f=film(r.n),lg=coLogo(r.ticker),up=r.a>0,Wn=winners(r);
        return `<li><a href="#/round/${r.n}" class="wk-res"><span class="wk-th">${f?`<img src="${f.p}" alt="" loading="lazy">`:lg?`<img class="wk-lg" src="${lg}" alt="" loading="lazy">`:''}${f?'<i class="wk-play" aria-label="has a film">▶</i>':''}</span>
          <span class="wk-co"><b>${esc(r.co)}</b><small>Round ${r.n}</small></span><span class="wk-mvp ${up?'wc-up':'wc-dn'}"><b>${up?'+':'−'}${pct(r.a)}</b></span>
          <span class="wk-w">${Wn.length?Wn.map(m=>face(m,'wc-f-s')).join('')+'<small>Winner</small><b>'+Wn.map(m=>NM[m]).join(' & ')+'</b>':'<i class="wc-nob">×</i><small>Winner</small><b>Nobody</b>'}</span></a></li>`}).join('')}</ol></article>`};
  const res=`<section class="wk-results" aria-label="The last five nights">
    <h2 class="wc-h2"><span>The last 5 nights</span><small>Every result, newest first. Tap a round to open its graded card and its film.</small></h2>
    ${dates.slice(0,5).map(night).join('')}
    <a class="wc-more wk-all" href="#/leaderboard">All ${N} results →</a>
  </section>`;

  /* ---------- 6 SMART OR LUCKY ---------- */
  const splash=`<p class="wc-cap wc-beat">Meanwhile, the big question…</p><section class="wc-splash" aria-label="Smart or lucky?">
    <div class="wc-burst"><h2>Smart or lucky?</h2></div>
    <p class="wc-sp-lead">Flip a coin on every report and you get about half right. Who is beating the coin?</p>
    <div class="wc-coins">${rank.slice().sort((a,b)=>P[b].W/(P[b].W+P[b].L)-P[a].W/(P[a].W+P[a].L)).map(m=>{const a=P[m],t=a.W+a.L,h=a.W/t,c=coin(a.W,t);
      const odds=h<=.5?'Doing worse than a coin.':`A coin does this well about 1 time in ${Math.max(2,Math.round(1/c))}.`;
      return `<div class="wc-cn wc-in" style="--mc:${MODELS[m].c};--h:${(h*100).toFixed(1)}%">${face(m)}<b class="wc-cn-n">${NM[m]}</b><span class="wc-cn-bar"><i></i><em>coin</em></span><b class="wc-cn-p">${Math.round(h*100)}%</b><small>${odds}</small></div>`}).join('')}</div>
    <p class="wc-cap wc-cap-y wc-sp-cap">${N} rounds is a small sample. The real question: do they get better as the season goes on?</p>
  </section>`;

  /* ---------- 7 NEXT ON THE CARD ---------- */
  const nv=(window.UPCOMING||[]).find(u=>u.ticker==='NVDA');
  const next=`<section class="wk-next" aria-label="Next">
    <div class="wc-next"><p class="wc-next-k">The season finale</p><h3>Bet #1: NVIDIA</h3>
      <p class="wc-next-d">NVIDIA reports ${nv?md(nv.called):'in November'}. This one is played with a real pool.</p>
      <ul><li>69% of $EZ creator fees fill the pool.</li><li>Most money on ${nv?md(nv.called):'the day'} makes the call. Today that's <b>${NM[lead]}</b>.</li><li><b class="wc-tu-k">Right:</b> profits buy back $EZ. <b class="wc-td-k">Wrong:</b> the pool can be wiped out.</li></ul>
      <p class="wc-tbc">To be continued…</p></div>
    <div class="wc-back"><p class="wc-motto">Nobody said it would be <span class="wc-e">E</span><span class="wc-z">Z</span>.</p>
      <a class="wc-follow" href="https://x.com/earningszn" target="_blank" rel="noopener">Every call, on X, before the report</a>
      <p class="wc-fine">New results every weekday at the close. P&amp;L is simulated: $100,000 each, the whole balance on every call, no leverage, before fees. $EZ isn't live yet. Not advice.</p></div>
  </section>`;

  /* ---------- LEADERBOARD TAB: the four side by side ---------- */
  const st=m=>{const a=P[m],cs=[],wins=R.filter(r=>winners(r).includes(m)).length;let bull=0,w1=0;
    R.forEach(r=>{const c=r.calls.find(x=>x[0]===m);if(!c)return;const x=call(c[1]);if(!x)return;const right=x.up===(r.a>0);cs.push({off:+c[2],right});if(right&&+c[2]<=.1)bull++;if(right&&+c[2]<=1)w1++});
    let b=null,w=null;Object.keys(a.per).forEach(n=>{const v=a.per[n].v;if(!b||v>b.v)b={v,n:+n};if(!w||v<w.v)w={v,n:+n}});
    const co=n=>(R.find(r=>r.n===n)||{}).co;const t=a.W+a.L,s=/^([WL])(\d+)/.exec(a.streak||'');
    return {pnl:a.pnl,wl:a.W+'-'+a.L,hr:a.W/t,miss:cs.reduce((s,x)=>s+x.off,0)/cs.length,wins,bull,w1,best:b,bestCo:co(b.n),worst:w,worstCo:co(w.n),calls:t,coin:coin(a.W,t),streak:s?(s[1]==='W'?s[2]+' right':s[2]+' wrong'):'–',sk:s?(s[1]==='W'?+s[2]:-s[2]):0}};
  const S={};ORDER.forEach(m=>S[m]=st(m));
  const ROWS=[
    ['P&L','on a pretend $100K',m=>pmK(S[m].pnl),m=>S[m].pnl,'hi'],
    ['Record','right-wrong on direction',m=>S[m].wl,m=>S[m].hr,'hi'],
    ['Hit rate','calls that got the direction',m=>Math.round(S[m].hr*100)+'%',m=>S[m].hr,'hi'],
    ['Rounds won','closest right call',m=>S[m].wins,m=>S[m].wins,'hi'],
    ['Avg miss','how far off, on average',m=>S[m].miss.toFixed(2)+'%',m=>-S[m].miss,'hi'],
    ['Bullseyes','right, within 0.1%',m=>S[m].bull,m=>S[m].bull,'hi'],
    ['Within 1%','right and within 1%',m=>S[m].w1,m=>S[m].w1,'hi'],
    ['Best call','the most it made in one round',m=>`${pmK(S[m].best.v)}<small>${esc(S[m].bestCo)}</small>`,m=>S[m].best.v,'hi'],
    ['Worst call','the most it lost in one round',m=>`${pmK(S[m].worst.v)}<small>${esc(S[m].worstCo)}</small>`,m=>S[m].worst.v,'hi'],
    ['Streak','its current run',m=>S[m].streak,m=>S[m].sk,'hi'],
    ['vs a coin','chance a coin does this well',m=>S[m].hr<=.5?'worse':'1 in '+Math.max(2,Math.round(1/S[m].coin)),m=>-S[m].coin,'hi']];
  const SG={'P&L':m=>S[m].pnl,'Best call':m=>S[m].best.v,'Worst call':m=>S[m].worst.v};
  const lbRows=ROWS.map(([t,s,f,v])=>{const best=Math.max(...rank.map(v));return `<tr><th scope="row"><b>${t}</b><small>${s}</small></th>${rank.map(m=>{const x=v(m),sg=SG[t];return `<td class="${x===best?'wk-best':''}${sg?(sg(m)>=0?' wc-tu':' wc-td'):''}">${f(m)}</td>`}).join('')}</tr>`}).join('');
  const allOvt=ovt.slice().reverse();
  const W1=340,H1=170,K1=posAt.length,qx=i=>14+i*(W1-70)/(K1-1),qy=k=>14+k*40;
  const lb=`<section class="wk-lb" id="wk-lb" aria-label="Leaderboard">
    <h2 class="wc-h2"><span>The leaderboard</span><small>The four, side by side. Gold = best in the row. Ranked by money, left to right.</small></h2>
    <div class="wk-tw wc-pn"><table class="wk-t"><thead><tr><th></th>${rank.map((m,i)=>`<th scope="col" style="--mc:${MODELS[m].c}"><span class="wk-pos">${i+1}</span>${face(m)}<b>${NM[m]}</b></th>`).join('')}</tr></thead><tbody>${lbRows}</tbody></table></div>
    <div class="wk-race wc-pn wk-race-all"><p class="wc-cap wk-pk">Every overtake · all ${K1} rounds</p>
      <svg viewBox="0 0 ${W1} ${H1}" role="img" aria-label="Positions after every round">${ORDER.map(m=>`<path d="${posAt.map((p,i)=>(i?'L':'M')+qx(i).toFixed(1)+' '+qy(p.o.indexOf(m))).join(' ')}" stroke="${MODELS[m].c}" class="wk-ln${m===lead?' wk-ln1':''}"/>`).join('')}
      ${posAt[K1-1].o.map((m,k)=>`<text x="${qx(K1-1)+8}" y="${qy(k)+4}" class="wk-end">${NM[m]}</text>`).join('')}<text x="${qx(0)}" y="${H1-2}" class="wk-ax">R${posAt[0].n}</text><text x="${qx(K1-1)}" y="${H1-2}" class="wk-ax" text-anchor="end">R${posAt[K1-1].n}</text></svg>
      <p class="wk-pt">${ovt.length} overtakes, ${leadCh} of them for the lead. Newest first:</p>
      <ul class="wk-ovt wk-ovt-all">${allOvt.slice(0,10).map(ovTxt).join('')}</ul></div>
  </section>`;

  const book=D.createElement('div');book.id='wc-book';book.className='wc-book wk-book';
  book.innerHTML='<div class="wk-ov">'+cover+strip+stand+tn+res+splash+next+'</div>'+lb;
  const main=D.querySelector('main');main.insertBefore(book,main.firstChild);
  const vt=D.querySelector('.x2p-vt');if(vt)book.querySelector('.wc-film-slot').appendChild(vt);
  H.classList.add('wc-on','wk-on');
  /* a Leaderboard tab in the nav, between Overview and Upcoming */
  const nav=D.querySelector('.nav');if(nav&&!nav.querySelector('.wk-lbt')){const a=D.createElement('a');a.className='wk-lbt';a.href='#/leaderboard';a.textContent='Leaderboard';const up=[...nav.querySelectorAll('a')].find(x=>/upcoming/i.test(x.textContent));nav.insertBefore(a,up||null)}
  const sync=()=>{const lbOn=window.__wkLB||/^#\/leaderboard/.test(location.hash);H.classList.toggle('wk-lbon',!!lbOn);book.hidden=/^#\/upcoming/.test(location.hash);
    nav&&nav.querySelectorAll('a').forEach(a=>{if(a.classList.contains('wk-lbt'))a.classList.toggle('wk-act',!!lbOn);else if(lbOn)a.classList.add('wk-un');else a.classList.remove('wk-un')})};
  addEventListener('hashchange',sync);sync();
  const io=new IntersectionObserver(es=>es.forEach(e=>{const t=e.target;if(e.isIntersecting)t.classList.add('wc-in');const v=t.querySelector&&t.querySelector('video.wc-v');if(v){if(e.isIntersecting&&e.intersectionRatio>.35)v.play().catch(()=>{});else if(!e.isIntersecting)v.pause()}}),{threshold:[0,.4]});
  book.querySelectorAll('.wc-pn,.wc-splash,.wc-next').forEach(x=>io.observe(x));
  setInterval(()=>{const s=book.querySelector('.wk-off span');if(s&&cl)s.textContent=cl>Date.now()?'in '+left(cl-Date.now()):'Results soon'},30000);
}
let tries=0;(function wait(){
  if(window.__x2pPnl&&window.ROUNDS&&D.querySelector('.x2p-vt')&&D.querySelector('#x2pSt')&&D.querySelector('#standings'))try{build()}catch(e){console.error('combined',e)}
  else if(tries++<200)setTimeout(wait,50)})();
})();
