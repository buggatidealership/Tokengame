/* z1 · THE SUNDAY FUNNIES (wow round, 2026-10-30). The Overview of X3+ as this week's Sunday comics section of
   "Earnings Zeason": a nameplate, the lead strip (headline + the explainer film), one round drawn as a full Sunday
   strip, the cast as a running serial with gags taken from their real records, the story so far week by week,
   "continued tonight at the close", and the coming attraction (bet #1, NVIDIA) in the Prince Valiant manner.
   Every number comes from the page's globals: ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, CAPS, FILMS, SIM, __x2pPnl(). */
(function(){'use strict';
const D=document,H=D.documentElement;
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
{const l=D.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Old+Standard+TT:ital,wght@0,400;0,700;1,400&display=swap';D.head.appendChild(l)}

const ORDER=['GPT','KIMI','CLAUDE','GROK'];
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MC=m=>m==='GROK'?'#15121a':MODELS[m].c;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const pd=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
const md=s=>{const p=pd(s);return p?MON[p[1]]+' '+p[2]:''};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const win=r=>r.win?r.win.split(' & '):[];
const coLogo=t=>{const c=(window.CO_LOGOS||{})[t];return c?'media/'+c.f:''};
const coC=t=>((window.CO_LOGOS||{})[t]||{}).c||'#2c78c4';
const coDk=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const film=n=>{const f=(window.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const cap=t=>((window.CAPS||{})[t])||0;
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'numeric'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('year'),g('month')-1,g('day')]};
const dnum=a=>Date.UTC(a[0],a[1],a[2])/864e5;
/* season weeks run Monday to Friday from the week of the first call (Sep 8, 2026) */
const W0=(()=>{const f=ROUNDS.map(r=>pd(r.called)).filter(Boolean).sort((a,b)=>dnum(a)-dnum(b))[0];const d=new Date(Date.UTC(f[0],f[1],f[2]));return dnum(f)-((d.getUTCDay()+6)%7)})();
const weekOf=a=>Math.floor((dnum(a)-W0)/7)+1;
const wkRange=w=>{const a=new Date((W0+(w-1)*7)*864e5),b=new Date((W0+(w-1)*7+4)*864e5);
  return MON[a.getUTCMonth()]+' '+a.getUTCDate()+' to '+(a.getUTCMonth()===b.getUTCMonth()?'':MON[b.getUTCMonth()]+' ')+b.getUTCDate()};

const face=(m,cls)=>{const M=MODELS[m];return `<i class="z1-fc ${cls||''}" style="--c:${MC(m)}" aria-hidden="true"><svg viewBox="0 0 24 24"><path fill="currentColor" fill-rule="${M.fr||'nonzero'}" d="${M.d}"/>${M.dot?`<path fill="currentColor" d="${M.dot}"/>`:''}</svg></i>`};
const lg=(t,cls)=>{const s=coLogo(t);return s?`<img class="z1-lg ${cls||''}${coDk(t)?' z1-lg-dk':''}" src="${s}" alt="" loading="lazy">`:''};
const mis=(h,c)=>`<span class="z1-mis ${c||''}"><span class="z1-mf" aria-hidden="true">${h}</span><span class="z1-mk">${h}</span></span>`;
const plate=(t,by,c)=>`<div class="z1-plate z1-pl-${c}"><p class="z1-h2" role="heading" aria-level="2">${mis(t,'')}</p><p class="z1-by">${by}</p></div>`;
const arrow=up=>up?'▲':'▼';
const dirW=up=>up?'Up':'Down';

function build(){
  const A=window.__x2pPnl().A,R=ROUNDS.slice(),G=R.length;
  const rank=ORDER.slice().sort((a,b)=>{const qa=A[a].W+A[a].L>=G/2,qb=A[b].W+A[b].L>=G/2;return qa!==qb?(qa?-1:1):A[b].pnl-A[a].pnl});
  const lead=rank[0],today=nyToday(),wkNow=weekOf(today);

  /* ---------- per-AI habits, the cast's running gags (all counted from ROUNDS) ---------- */
  const habit={};for(const m of ORDER){let up=0,dn=0,mags={},t=0,first=null;
    for(const r of R){const row=r.calls.find(c=>c[0]===m),c=row&&call(row[1]);if(!c)continue;t++;if(first==null)first=r.n;c.up?up++:dn++;mags[c.v]=(mags[c.v]||0)+1}
    const mode=Object.entries(mags).sort((a,b)=>b[1]-a[1])[0];const s=A[m].seq;let run=1;for(let i=s.length-2;i>=0&&s[i]===s[s.length-1];i--)run++;
    habit[m]={up,dn,t,first,mode:+mode[0],modeN:mode[1],run,runW:s[s.length-1]==='W'}}
  const gag=m=>{const h=habit[m];
    if(m===lead){const w5=A[m].seq.slice(-5).filter(x=>x==='W').length;return {say:'Mine.',cap:'Holds the golden ticket'+(w5<=2?`, though right on just ${w5} of its last 5.`:'.')}}
    if(h.modeN/h.t>=.25)return {say:h.mode+'%. Again.',cap:`Said ${h.mode}% on ${h.modeN} of its ${h.t} calls.`};
    if(h.dn/h.t>=.65)return {say:'Down.',cap:`${h.dn} of its ${h.t} calls said down.${h.first>1?` Joined in round ${h.first}.`:''}`};
    if(h.up/h.t>=.65)return {say:'Up!',cap:`${h.up} of its ${h.t} calls said up.`};
    return {say:'Hmm.',cap:`${h.up} up, ${h.dn} down.`}};
  const streak=m=>{const h=habit[m];if(h.run<3)return '';return h.runW?`${h.run} right in a row`:`${h.run} wrong in a row`};

  /* ---------- NAMEPLATE ---------- */
  const np=`<section class="z1-np" aria-label="Earnings Zeason, the Sunday comics">
    <div class="z1-np-row"><span>Season 1 · Week ${wkNow}</span><span>${G} rounds graded</span><span class="z1-np-pr">Free</span></div>
    <p class="z1-np-t">${mis(`The Funnies`,'')}</p>
    <div class="z1-np-row z1-np-row2"><span>Earnings Zeason</span><span>${MON[today[1]]} ${today[2]}, ${today[0]}</span><span>Four AIs. Every earnings report.</span></div>
  </section>`;

  /* ---------- LEAD STRIP: headline title panel + the explainer film ---------- */
  const leadS=`<section class="z1-lead" aria-label="What EZ does">
    <div class="z1-ttl">
      <div class="z1-peek" aria-hidden="true">${['GPT','CLAUDE','GROK','KIMI'].map((m,i)=>`<span class="z1-pk z1-pk${i}">${face(m)}</span>`).join('')}</div>
      <p class="z1-h1" role="heading" aria-level="1">${mis(`4 AI<span class="z1-lc">s</span> trade earnings`,'')} ${mis(`to run our buybacks.`,'z1-h1b')}</p>
      <p class="z1-nar">Each one predicts a stock's move <b>before</b> its earnings. The market close grades it.</p>
      <p class="z1-star" aria-label="Starring GPT, Claude, Grok and Kimi">Starring <b>GPT</b> · <b>Claude</b> · <b>Grok</b> · <b>Kimi</b></p>
    </div>
    <div class="z1-film"><p class="z1-cap z1-fcap" aria-hidden="true">How it works · <span class="z1-rt">1:20</span></p><div class="z1-fslot"></div></div>
  </section>`;

  /* ---------- FEATURE STRIP: one real round, drawn as a Sunday page ---------- */
  const cands=R.filter(r=>film(r.n)&&r.win&&!/&/.test(r.win)&&r.calls.length===4).filter(r=>{const up=r.a>0,ok=r.calls.filter(x=>(call(x[1])||{}).up===up).length;return (ok===1||ok===3)&&Math.abs(r.a)>=2&&Math.abs(r.a)<=7});
  const fr=cands.sort((a,b)=>b.n-a.n)[0]||R[G-1],fup=fr.a>0,fW=win(fr),ff=film(fr.n);
  const fc=ORDER.map(m=>{const row=fr.calls.find(c=>c[0]===m);return row?{m,c:call(row[1]),off:+row[2]}:null}).filter(Boolean);
  const right=fc.filter(x=>x.c.up===fup),wrong=fc.filter(x=>x.c.up!==fup);
  const per=m=>(A[m].per[fr.n]||{}).v;
  const why=right.length===1?`Only ${NM[right[0].m]} said ${dirW(fup).toLowerCase()}.`:wrong.length===1?`Only ${NM[wrong[0].m]} said ${dirW(!fup).toLowerCase()}. Wrong way.`:`${right.length} of ${fc.length} got the direction.`;
  const wm=fW[0],wo=fc.find(x=>x.m===wm);
  const feat=`<section class="z1-feat" aria-label="One round, start to finish">
    <div class="z1-fp z1-fp0"><p class="z1-logo">${mis(`One round`,'')}<small>start to finish</small></p>
      <p class="z1-ep">${lg(fr.ticker,'z1-lg-s')}<b>${esc(fr.co)}</b><span>Round ${fr.n} · ${md(fr.resolves)}</span></p></div>
    <div class="z1-fp z1-fp1" style="--bc:${coC(fr.ticker)}"><p class="z1-cap">Before earnings, they predict.</p>
      <div class="z1-says">${fc.map((x,i)=>`<div class="z1-say z1-say${i}">${face(x.m)}<p class="z1-bl ${x.c.up?'z1-upk':'z1-dnk'}"><small>${NM[x.m]}</small>${arrow(x.c.up)} ${dirW(x.c.up)} ${x.c.v}%</p></div>`).join('')}</div></div>
    <div class="z1-fp z1-fp2"><p class="z1-cap">${esc(fr.co)} reports.</p>
      <div class="z1-fv"><video class="z1-rv" playsinline preload="none" poster="${ff.p}"><source src="${ff.v}" type="video/mp4"></video>
        <button type="button" class="z1-play" aria-label="Play the ${esc(fr.co)} film"><i></i></button></div></div>
    <div class="z1-fp z1-fp3 ${fup?'z1-upg':'z1-dng'}"><p class="z1-cap">Then the closing bell.</p>
      <div class="z1-bell" aria-hidden="true"><svg viewBox="0 0 100 100"><g class="z1-bellg"><path d="M50 10c-3 0-5 2-5 5v3c-15 4-23 17-23 33v14l-8 10h72l-8-10V51c0-16-8-29-23-33v-3c0-3-2-5-5-5z" fill="#f6cf3c" stroke="#1b1716" stroke-width="4" stroke-linejoin="round"/><circle cx="50" cy="82" r="7" fill="#1b1716"/><path d="M33 40c3-8 8-12 14-13" fill="none" stroke="#fffbea" stroke-width="4" stroke-linecap="round"/></g></svg>
        <b class="z1-sfx z1-clang">CLANG!</b></div>
      <p class="z1-mv"><span class="${fup?'z1-upk':'z1-dnk'}">${arrow(fup)} ${pct(fr.a)}</span><small>${esc(fr.co)} ${fup?'rose':'fell'} ${pct(fr.a)}.</small></p></div>
    <div class="z1-fp z1-fp4"><p class="z1-cap">The close grades every prediction.</p>
      <div class="z1-gr">${fc.map((x,i)=>{const ok=x.c.up===fup,w=fW.includes(x.m);return `<div class="z1-g ${ok?'z1-gp':'z1-gf'}${w?' z1-gw':''}" style="--i:${i}">${w?'<span class="z1-crown" aria-hidden="true">♛</span>':''}${face(x.m)}<b class="z1-nm">${NM[x.m]}</b>
        <span class="z1-stamp">${ok?'✓ Pass':'✗ Fail'}</span>${ok?'':'<i class="z1-smack" aria-hidden="true">SMACK!</i>'}<span class="z1-sr">${ok?'right way':'wrong way'}${w?', closest, wins the round':''}</span></div>`}).join('')}</div>
      <p class="z1-why">${why} ${wo?`${NM[wm]} was closest, ${wo.off}% off. ${NM[wm]} wins.`:''}</p></div>
    <div class="z1-fp z1-fp5"><p class="z1-cap">The payout.</p>
      <p class="z1-po"><b class="${per(wm)>=0?'z1-upk':'z1-dnk'}">${pm(per(wm))}</b><span>${NM[wm]}'s P&amp;L on this one</span></p>
      <p class="z1-pos">${fc.filter(x=>x.m!==wm).map(x=>`<span>${face(x.m,'z1-fc-s')}${NM[x.m]} <b class="${per(x.m)>=0?'z1-upk':'z1-dnk'}">${pm(per(x.m))}</b></span>`).join('')}</p>
      <p class="z1-next">…and on to the next round.</p></div>
    <p class="z1-sig">Graded by the market close · © Earnings Zeason</p>
  </section>`;

  /* ---------- CAST: the race for the golden ticket ---------- */
  const castS=`<section class="z1-cast" aria-label="The race for the golden ticket">
    ${plate('The race for the golden ticket','Each AI trades a pretend $100,000. Top P&amp;L holds the golden ticket. We bet our pool on its call.','b')}
    <ol class="z1-rows">${rank.map((m,i)=>{const a=A[m],g=gag(m),st=streak(m);
      return `<li class="z1-row${i===0?' z1-gold':''}" style="--c:${MC(m)}">
        <span class="z1-stub"><b>#${i+1}</b><small>${i===0?'Golden ticket':'Season 1'}</small></span>
        <span class="z1-who">${face(m,'z1-fc-l')}<span class="z1-nmw"><b>${NM[m]}</b><small>${esc(MODELS[m].ver)}</small></span></span>
        <span class="z1-pnl"><small>Season P&amp;L</small><b class="${a.pnl>=0?'z1-upk':'z1-dnk'}">${pm(a.pnl)}</b></span>
        <span class="z1-gag"><span class="z1-bl z1-bl2">${g.say}</span><small>${g.cap}</small></span>
        <span class="z1-rec"><b>${a.W}-${a.L}</b><small>W-L</small></span>
        <span class="z1-l5" aria-label="Last five calls">${a.seq.slice(-5).map(x=>`<i class="${x==='W'?'z1-w':'z1-l'}">${x==='W'?'✓':'✗'}</i>`).join('')}<small>${st||'last 5'}</small></span>
      </li>`}).join('')}</ol>
  </section>`;

  /* ---------- THE STORY SO FAR: every graded round, a Sunday page per week ---------- */
  const tile=r=>{const f=film(r.n),up=r.a>0,W=win(r);
    return `<a class="z1-ep2${f?'':' z1-nof'}" href="#/round/${r.n}" style="--bc:${coC(r.ticker)}" aria-label="Round ${r.n}, ${esc(r.co)}, ${up?'up':'down'} ${pct(r.a)}, ${W.length?W.map(m=>NM[m]).join(' and ')+' won':'nobody won'}">
      <span class="z1-art">${f?`<img src="${f.p}" alt="" loading="lazy">`:lg(r.ticker,'z1-lg-m')+`<b class="z1-artn">${esc(r.co)}</b>`}</span>
      <span class="z1-epn">#${r.n} ${esc(r.ticker)}</span>
      <span class="z1-epm ${up?'z1-upk':'z1-dnk'}">${arrow(up)}${pct(r.a)}</span>
      <span class="z1-epw">${W.length===1?face(W[0],'z1-fc-s')+`<i>${NM[W[0]]}</i>`:W.length?W.map(m=>face(m,'z1-fc-s')).join('')+'<i>Tie</i>':'<i class="z1-nob">✗ Nobody</i>'}</span></a>`};
  const wks={};for(const r of R){const w=weekOf(pd(r.resolves)||pd(r.called));(wks[w]=wks[w]||[]).push(r)}
  const wkKeys=Object.keys(wks).map(Number).sort((a,b)=>b-a);
  const wkTop=w=>{const s={};for(const r of wks[w])for(const m of ORDER){const x=A[m].per[r.n];if(x)s[m]=(s[m]||0)+x.v}const b=Object.entries(s).sort((a,b)=>b[1]-a[1])[0];return b?{m:b[0],v:b[1]}:null};
  const arc=`<section class="z1-arc" aria-label="The story so far">
    ${plate('The story so far','Every graded round, week by week. Tap one for its graded card.','r')}
    <div class="z1-wks">${wkKeys.map((w,i)=>{const rs=wks[w].slice().sort((a,b)=>b.n-a.n),t=wkTop(w);
      const head=`<span class="z1-wkn">Week ${w}</span><span class="z1-wkd">${wkRange(w)} · ${rs.length} round${rs.length===1?'':'s'}</span>${t?`<span class="z1-wkb">${face(t.m,'z1-fc-s')}<b>${NM[t.m]}'s week</b> <em class="${t.v>=0?'z1-upk':'z1-dnk'}">${pm(t.v)}</em></span>`:''}`;
      return `<details class="z1-wk"${i===0?' open':''}><summary>${head}<span class="z1-thumbs" aria-hidden="true">${rs.slice(0,8).map(r=>{const f=film(r.n);return f?`<img src="${f.p}" alt="" loading="lazy">`:`<i style="--bc:${coC(r.ticker)}"></i>`}).join('')}</span></summary>
        <div class="z1-eps" data-all="0">${rs.map((r,j)=>tile(r).replace('class="z1-ep2',`class="z1-ep2${j>=12?' z1-xtra':''}`)).join('')}</div>${rs.length>12?`<button type="button" class="z1-more">+ ${rs.length-12} more this week</button>`:''}</details>`}).join('')}
    </div><p class="z1-key">▲▼ the move at the close. The name under it: the closest prediction, the round's winner.</p>
  </section>`;

  /* ---------- CONTINUED TONIGHT AT THE CLOSE ---------- */
  const fdate=s=>{const p=pd(s);return p?p[0]*1e4+p[1]*100+p[2]:9e9};
  let tn=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length&&p.resolves);const d0=tn.map(p=>p.resolves).sort((a,b)=>fdate(a)-fdate(b))[0];
  tn=tn.filter(p=>p.resolves===d0).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
  const dd=d0?dnum(pd(d0))-dnum(today):0,tLbl=!d0?'':dd<=0?'tonight at the close':dd===1?'tomorrow at the close':'at the close, '+WD[new Date(dnum(pd(d0))*864e5).getUTCDay()]+' '+md(d0);
  const side0=(p,up)=>p.calls.filter(c=>(c.dir==='UP')===up).map(c=>`<span class="z1-c">${face(c.m,'z1-fc-s')}<b>${c.mag}%</b><span class="z1-sr">${NM[c.m]} ${dirW(up)} ${c.mag}%</span></span>`).join('');
  const nxt=(window.UPCOMING||[]).filter(u=>pd(u.called));const nd=nxt.map(u=>u.called).sort((a,b)=>fdate(a)-fdate(b))[0];
  const nxtR=nxt.filter(u=>u.called===nd).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
  const cont=tn.length?`<section class="z1-cont" aria-label="Continued ${tLbl}">
    ${plate(`Continued ${tLbl}…`,`${tn.length} round${tn.length===1?'':'s'}. Every prediction locked before the report. Up on the left, down on the right.`,'y')}
    <div class="z1-tns">${tn.slice(0,6).map(p=>{const u=p.calls.filter(c=>c.dir==='UP').length,d=p.calls.length-u;return `<article class="z1-tn" style="--bc:${coC(p.ticker)}">
      <header>${lg(p.ticker,'z1-lg-s')}<b>${esc(p.co)}</b><small>${esc(p.ticker)}</small></header>
      <div class="z1-vs" style="--u:${u}">${p.calls.slice().sort((x,y)=>(y.dir==='UP')-(x.dir==='UP')).map(c=>{const up=c.dir==='UP';return `<span class="z1-c ${up?'z1-cu':'z1-cd'}"><b class="${up?'z1-upk':'z1-dnk'}">${arrow(up)}${c.mag}%</b>${face(c.m,'z1-fc-m')}<small>${NM[c.m]}</small><span class="z1-sr">says ${dirW(up)} ${c.mag}%</span></span>`}).join('')}${u&&d?'<i class="z1-vsx" aria-hidden="true">vs</i>':''}</div></article>`}).join('')}</div>
    ${tn.length>6?`<p class="z1-tmore"><a href="#/upcoming">+ ${tn.length-6} more locked in. See the whole card →</a></p>`:''}
    ${nxtR.length?`<p class="z1-nw"><b>Next week:</b>${nxtR.slice(0,5).map(u=>`<span>${lg(u.ticker,'z1-lg-xs')}${esc(u.co)}</span>`).join('')}<em>${WD[new Date(dnum(pd(nd))*864e5).getUTCDay()]} ${md(nd)}</em></p>`:''}
  </section>`:'';

  /* ---------- COMING ATTRACTION: bet #1, NVIDIA (captions only, the Prince Valiant way) ---------- */
  const at=betAt(),share=window.SIM&&SIM.poolShare!=null?Math.round(SIM.poolShare*100):null;
  const day=at?new Date(at).toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',timeZone:'America/New_York'}):'';
  const die=(k,l)=>`<span class="z1-die"><b data-k="${k}">00</b><small>${l}</small></span>`;
  const bet=`<section class="z1-bet" aria-label="Coming soon: bet number 1, NVIDIA">
    <p class="z1-soon">Coming soon to these pages</p>
    <div class="z1-bp">
      <p class="z1-bt">${mis(`Bet #1: NVIDIA`,'')}</p>
      <div class="z1-chip" aria-hidden="true"><span class="z1-pins"></span><span class="z1-die0"><span class="z1-chipk">NVIDIA</span></span></div>
      <div class="z1-hold">${face(lead,'z1-fc-l')}<span class="z1-tkt">Golden ticket</span></div>
      <p class="z1-vc z1-vc1">${day?`At the close on ${esc(day)}, the pool goes on one call.`:'The pool goes on one call.'}</p>
      <p class="z1-vc z1-vc2">${share!=null?share+'% of $EZ creator fees fill the pool. ':''}We bet it on the golden ticket holder's call. Today that is ${NM[lead]}.</p>
      <div class="z1-dies" role="timer" aria-label="Time until the NVIDIA bet">${at?die('d','days')+die('h','hrs')+die('m','min')+die('s','sec'):''}</div>
    </div>
    <div class="z1-outs">
      <div class="z1-out z1-ok"><p class="z1-cap">Right call</p><div class="z1-o-pic" aria-hidden="true"><span class="z1-coin">$EZ</span><span class="z1-coin">$EZ</span><span class="z1-coin">$EZ</span></div><p><b>▲</b> Profits buy back $EZ.</p></div>
      <div class="z1-out z1-bad"><p class="z1-cap">Wrong call</p><div class="z1-o-pic" aria-hidden="true"><span class="z1-jar"><i></i></span><b class="z1-sfx z1-glug">GLUG</b></div><p><b>▼</b> The pool can be wiped out.</p></div>
    </div>
    <p class="z1-first">NVIDIA is the first bet, not the last. Season 2 brings more.</p>
  </section>`;

  const foot=`<section class="z1-foot" aria-label="Back page">
    <p class="z1-motto">Nobody said it would be <span class="z1-e">E</span><span class="z1-z">Z</span>.</p>
    <a class="z1-follow" href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Read it every week on X</a>
    <p class="z1-fine">P&amp;L is simulated: $100,000 each, the whole balance on every call, no leverage, before fees. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.</p>
  </section>`;

  const root=D.createElement('div');root.id='z1';root.className='z1';
  const fo=(n,t)=>`<p class="z1-folio" aria-hidden="true"><span>The Funnies</span><span>${t}</span><span>Page ${n}</span></p>`;
  root.innerHTML=np+leadS+fo(2,'How a round goes')+feat+fo(3,'The cast')+castS+fo(4,'The serial')+arc+(cont?fo(5,'Tonight')+cont:'')+fo(cont?6:5,'Coming soon')+bet+foot;
  const main=D.querySelector('main');main.insertBefore(root,main.firstChild);
  const vt=D.querySelector('.x2p-vt');if(vt){root.querySelector('.z1-fslot').appendChild(vt);const m=/(\d:\d\d)/.exec(vt.textContent);if(m)root.querySelector('.z1-rt').textContent=m[1]}
  H.classList.add('z1-on');
  wire(root)}

function betAt(){const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=pd(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&pd(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}

function wire(root){
  /* logos never drawn past their native pixels at DPR 2 */
  const capImg=i=>{if(i.naturalWidth)i.style.maxWidth=Math.min(i.naturalWidth/2,parseFloat(getComputedStyle(i).maxWidth)||1e4)+'px'};
  root.querySelectorAll('img.z1-lg').forEach(i=>{if(i.complete)capImg(i);else i.addEventListener('load',()=>capImg(i))});
  /* countdown to the bet */
  const at=betAt(),dies=root.querySelectorAll('.z1-die b');
  const tick=()=>{if(!at||!dies.length)return;const s=Math.max(0,Math.floor((at-Date.now())/1e3)),v={d:Math.floor(s/86400),h:Math.floor(s%86400/3600),m:Math.floor(s%3600/60),s:s%60};
    dies.forEach(b=>{b.textContent=String(v[b.dataset.k]).padStart(2,'0')})};
  tick();setInterval(tick,1000);
  /* the round film: starts where the calls are up and the market is about to answer (FILM-SPEC: calls by 0:07) */
  const fv=root.querySelector('.z1-fv');if(fv){const v=fv.querySelector('video'),b=fv.querySelector('.z1-play');
    const go=()=>{if(v.paused){if(!v.dataset.s){v.dataset.s=1;v.currentTime=6}v.muted=false;v.play().catch(()=>{});fv.classList.add('z1-playing')}else{v.pause();fv.classList.remove('z1-playing')}};
    b.addEventListener('click',go);v.addEventListener('click',go);v.addEventListener('ended',()=>{fv.classList.remove('z1-playing');v.dataset.s=''})}
  /* the grading acts itself out once the panel is read: bell, then each stamp lands (lesson 43, 55) */
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&e.intersectionRatio>.6){e.target.classList.add('z1-go');io.unobserve(e.target)}}),{threshold:[0,.6,1]});
  root.querySelectorAll('.z1-fp3,.z1-fp4,.z1-fp5,.z1-row').forEach(x=>io.observe(x));
  root.querySelectorAll('.z1-more').forEach(b=>b.addEventListener('click',()=>{const g=b.previousElementSibling,all=g.dataset.all==='1';g.dataset.all=all?'0':'1';b.textContent=all?b.dataset.t:'Show fewer';if(!b.dataset.t)b.dataset.t=b.textContent}));
  root.querySelectorAll('.z1-more').forEach(b=>b.dataset.t=b.textContent);
  if(RM())root.classList.add('z1-rm')}

(function wait(){if(window.__x2pPnl&&window.ROUNDS&&H.classList.contains('x2p-world')&&D.querySelector('#wc-book')&&D.querySelector('.x2p-vt')){try{build()}catch(e){window.__z1Err=String(e&&e.stack||e)}H.classList.add('z1-ready');return}setTimeout(wait,150)})();
})();
