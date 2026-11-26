/* z4 "The issue": the Overview as one physical American comic book you flip through.
   Cover (trade dress, corner box, approval seal, UPC box; the explainer film is the cover art),
   inside front cover (a 1960s mail-order strip ad that walks one real round), the trading-card checklist (standings),
   the long box of bagged back issues (the record), the spinner rack (tonight) with the "Next issue!" box,
   and the back-cover mail-order ad (bet #1: NVIDIA). Every number comes from the page's globals. */
(function(){
'use strict';
const D=document,H=D.documentElement;
if(D.getElementById('z4-issue'))return;
const fl=D.createElement('link');fl.rel='stylesheet';
fl.href='https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Bangers&family=Permanent+Marker&family=Shantell+Sans:ital,wght@0,400;0,600;0,800;1,600&family=Oswald:wght@500;700&display=swap';
D.head.appendChild(fl);

const ORDER=['GPT','KIMI','CLAUDE','GROK'];
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const FLAG={GPT:'us',KIMI:'cn',CLAUDE:'us',GROK:'us'};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const md=s=>{if(!s)return '';const [m,d]=s.split('/').map(Number);return MON[m-1]+' '+d};
const $k=v=>'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const pm=v=>(v>=0?'+':'−')+$k(v);
const pct=v=>Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%';
const sgnPct=v=>(v>=0?'+':'−')+pct(v);
const call=s=>{const m=/^(UP|DOWN)\s+([\d.]+)/i.exec(s||'');return m?{up:/UP/i.test(m[1]),v:+m[2]}:null};
const mdyKey=s=>{if(!s)return 9e9;const [m,d,y]=s.split('/').map(Number);return (y%100)*1e4+m*100+d};
const winners=r=>r.win?r.win.split(' & ').filter(m=>MODELS[m]):[];
const film=n=>{const f=(window.FILMS||{})[n];return f?{v:'media/'+f.f+'.mp4',p:'media/'+f.p+'.jpg'}:null};
const coL=t=>(window.CO_LOGOS||{})[t]||null;
const cap=t=>((window.CAPS||{})[t])||0;
const nyToday=()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return [g('month'),g('day'),g('year')]};
const dayDiff=s=>{const t=nyToday(),[m,d,y]=s.split('/').map(Number);return Math.round((Date.UTC(2000+(y%100),m-1,d)-Date.UTC(2000+t[2],t[0]-1,t[1]))/864e5)};
const dayName=s=>{const [m,d,y]=s.split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,d,12)).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'})};
const sfx=a=>{const x=Math.abs(a),up=a>0;if(x<1.5)return up?'Blip!':'Tick!';if(x<4)return up?'Pop!':'Thud!';if(x<8)return up?'Zoom!':'Crash!';return up?'Ka-pow!':'Ka-boom!'};
const RM=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;

function face(m,cls){const M=MODELS[m];
  return `<i class="z4-fc ${cls||''}" style="--fb:${M.bg};--ff:${M.fg};--mc:${M.c==='#111'?'#15121a':M.c}" aria-hidden="true"><svg viewBox="-3 -3 30 30"><path d="${M.d}" fill="${M.fg}"${M.fr?` fill-rule="${M.fr}"`:''}/>${M.dot?`<path d="${M.dot}" fill="${M.dotc||M.fg}"/>`:''}</svg></i>`}
function flag(cc,cls){
  if(cc==='cn')return `<svg class="z4-flag ${cls||''}" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#de2910"/><polygon fill="#ffde00" points="5,2.2 6.1,5.4 9.5,5.4 6.8,7.4 7.8,10.6 5,8.7 2.2,10.6 3.2,7.4 0.5,5.4 3.9,5.4"/><circle cx="11" cy="2.6" r=".9" fill="#ffde00"/><circle cx="12.6" cy="4.6" r=".9" fill="#ffde00"/><circle cx="12.6" cy="7.4" r=".9" fill="#ffde00"/><circle cx="11" cy="9.4" r=".9" fill="#ffde00"/></svg>`;
  let s='';for(let i=0;i<7;i++)s+=`<rect y="${i*20/6.5}" width="30" height="${20/13}" fill="#b22234"/>`;
  let st='';for(let r=0;r<4;r++)for(let c=0;c<5;c++)st+=`<circle cx="${1.4+c*2.4+(r%2)*1.2}" cy="${1.4+r*2.5}" r=".55" fill="#fff"/>`;
  return `<svg class="z4-flag ${cls||''}" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#fff"/>${s}<rect width="13" height="10.8" fill="#3c3b6e"/>${st}</svg>`}
function logoImg(t,cls){const c=coL(t);if(!c)return '';return `<img class="z4-lg ${cls||''}${c.dark?' z4-lg-dk':''}" src="media/${c.f}" alt="" decoding="async">`}
/* a logo is never drawn larger than its native pixels at DPR 2 */
function capLogos(root){root.querySelectorAll('img.z4-lg').forEach(im=>{const f=()=>{if(im.naturalHeight){im.style.maxHeight=Math.min(parseFloat(getComputedStyle(im).maxHeight)||999,im.naturalHeight/2)+'px';im.style.maxWidth=Math.min(parseFloat(getComputedStyle(im).maxWidth)||999,im.naturalWidth/2)+'px'}};im.complete?f():im.addEventListener('load',f,{once:true})})}
const EZLOGO=()=>{const s=D.querySelector('header.top .brand .mark svg');return s?s.outerHTML:''};

/* the bet: the close the weekday after NVIDIA's call date (world-comic.js betAt, copied) */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}

function build(){
  const R=ROUNDS.slice(),P=window.__x2pPnl().A;
  const rank=ORDER.slice().sort((a,b)=>P[b].pnl-P[a].pnl),lead=rank[0];
  const nR=R.length,key=r=>mdyKey(r.resolves)*1000+r.n,byNew=R.slice().sort((a,b)=>key(b)-key(a));
  const per=(m,n)=>(P[m].per[n]||{}).v;

  /* ---------- COVER ---------- */
  const cover=`<section class="z4-pg z4-cover" aria-label="Cover">
    <div class="z4-td">
      <div class="z4-cbox" aria-hidden="true"><span class="z4-cb-pub">EZ<small>comics</small></span><span class="z4-cb-heads">${ORDER.map(m=>face(m)).join('')}</span><span class="z4-cb-no">No.<b>${nR}</b></span><span class="z4-cb-pr">Free</span></div>
      <div class="z4-mast"><span class="z4-mast-s">Season 1 · ${nR} earnings reports graded</span><span class="z4-mast-a">Earnings</span><span class="z4-mast-b"><i class="z4-e">Z</i>eason</span></div>
      <div class="z4-seal" title="Every call is graded by the market close"><small>Approved</small><b>by the</b><small>close</small></div>
    </div>
    <p class="z4-blurb" role="heading" aria-level="1"><span>4 AI<span class="z4-lc">s</span> trade earnings</span> <span class="z4-b2">to run our buybacks.</span></p>
    <div class="z4-art"><div class="z4-art-in"></div><p class="z4-art-cap">How it works · 1:20</p></div>
    <div class="z4-cv-ft">
      <p class="z4-burst"><span>${face(lead)}<span><b>${NM[lead]}</b> holds the golden ticket!</span></span></p>
      <div class="z4-upc" aria-hidden="true"><svg viewBox="0 0 60 30">${upcBars(nR)}</svg><small>0 ${String(nR).padStart(3,'0')} 1</small><em>S1</em></div>
    </div>
  </section>`;

  /* ---------- INSIDE FRONT COVER: the mail-order strip ad (one real round) ---------- */
  const one=x=>{const up=x.a>0;return x.calls.filter(c=>{const k=call(c[1]);return k&&k.up===up}).length===1&&winners(x).length===1};
  const ex=byNew.filter(x=>film(x.n)).find(one)||byNew.find(one)||byNew[0];
  const exUp=ex.a>0,cs=ORDER.map(m=>{const row=ex.calls.find(c=>c[0]===m);if(!row)return null;const c=call(row[1]);return c?{m,c,ok:c.up===exUp,v:per(m,ex.n)||0}:null}).filter(Boolean);
  const hero=cs.find(x=>winners(ex).includes(x.m))||cs.slice().sort((a,b)=>b.v-a.v)[0],crowd=cs.filter(x=>x!==hero);
  const dirW=u=>u?'up':'down',crowdDir=crowd.length&&crowd.every(x=>x.c.up===crowd[0].c.up)?dirW(crowd[0].c.up):null;
  const bal=c=>`<span class="z4-bal ${c.c.up?'z4-up':'z4-dn'}"><b>${c.c.up?'▲ Up':'▼ Down'} ${c.c.v}%</b></span>`;
  const exF=film(ex.n);
  const ad=`<section class="z4-pg z4-ad" aria-label="How a round works, as a strip ad">
    <p class="z4-adv">Advertisement</p>
    <h2 class="z4-ad-h"><span>The call that made</span> <b>${NM[hero.m]}</b> <span>a champ</span></h2>
    <ol class="z4-strip" data-n="${ex.n}">
      <li class="z4-p z4-p1${hero.c.up?'':' z4-dnhero'}"><p class="z4-cap">Round ${ex.n}, ${esc(ex.co)}. ${crowdDir?`Everybody says ${crowdDir}. `:''}${NM[hero.m]} says ${dirW(hero.c.up)}.</p>
        <div class="z4-p1-g"><div class="z4-hero">${face(hero.m,'z4-f-l')}${bal(hero)}</div><div class="z4-crowd">${crowd.map(x=>`<div>${face(x.m,'z4-f-s')}${bal(x)}</div>`).join('')}</div></div>
        <span class="z4-em" aria-hidden="true">${hero.c.up?'🐂':'🐻'}</span></li>
      <li class="z4-p z4-p2"><p class="z4-cap">${esc(ex.co)} reports. Then the closing bell.</p>
        <div class="z4-bell"><span class="z4-bell-i" aria-hidden="true">🔔</span><b class="z4-ring" aria-hidden="true">Brrring!</b>
        <span class="z4-mv ${exUp?'z4-up':'z4-dn'}">${logoImg(ex.ticker)}<em>${esc(ex.ticker)}</em><b>${exUp?'▲':'▼'} ${sgnPct(ex.a)}</b></span></div></li>
      <li class="z4-p z4-p3"><p class="z4-cap">The close grades every call.</p>
        <div class="z4-grade">${cs.map(x=>`<div class="z4-g">${face(x.m)}<i class="z4-stamp ${x.ok?'z4-pass':'z4-fail'}">${x.ok?'Pass':'Fail'}</i><small>${NM[x.m]}</small></div>`).join('')}</div></li>
      <li class="z4-p z4-p4"><p class="z4-cap">${NM[hero.m]} gets paid. The rest pay up.</p>
        <div class="z4-pay">${face(hero.m,'z4-f-l')}<b class="z4-cnt ${hero.v>=0?'z4-up':'z4-dn'}" data-v="${hero.v}">${pm(hero.v)}</b></div>
        <ul class="z4-pay-r">${crowd.map(x=>`<li>${face(x.m,'z4-f-s')}<b class="${x.v>=0?'z4-up':'z4-dn'}">${pm(x.v)}</b></li>`).join('')}</ul>
        <span class="z4-medal" aria-hidden="true">🏅</span></li>
    </ol>
    <div class="z4-coupon"><p class="z4-cp-h"><span aria-hidden="true">✂</span> Clip and keep: how EZ works</p>
      <ol><li><span>They predict the move before earnings.</span></li><li><span>The market close grades every prediction.</span></li><li><span>The model with the highest P&amp;L holds the golden ticket.</span></li><li><span>We bet the pool on the golden ticket holder. <b>The pool can be wiped out.</b></span></li></ol></div>
    <p class="z4-ind">Earnings Zeason No. ${nR}, Season 1. P&amp;L is pretend: $100,000 per AI, the whole balance on every call, no leverage. ${exF?`<a href="#/round/${ex.n}">Open round ${ex.n}'s graded card</a>`:''}</p>
  </section>`;

  /* ---------- THE TRADING-CARD CHECKLIST (standings) ---------- */
  const tw=m=>{let b=null,w=null;R.forEach(r=>{const x=P[m].per[r.n];if(!x)return;if(!b||x.v>b.v)b={v:x.v,r};if(!w||x.v<w.v)w={v:x.v,r}});return {b,w}};
  const cards=rank.map((m,i)=>{const A=P[m],hr=Math.round(100*A.W/Math.max(1,A.W+A.L)),T=tw(m),l5=(A.seq||[]).slice(-5);
    return `<li class="z4-card${i===0?' z4-gold':''}" style="--mc:${MODELS[m].c==='#111'?'#15121a':MODELS[m].c}">
      <button type="button" class="z4-cd" aria-label="${NM[m]}, number ${i+1}, season P&amp;L ${pm(A.pnl)}. Tap to turn the card.">
      <span class="z4-cd-f">
        <span class="z4-cd-rk"><small>#</small>${i+1}</span>${flag(FLAG[m],'z4-cd-fl')}
        <span class="z4-cd-art">${face(m,'z4-f-xl')}${i===0?'<span class="z4-cd-gt">★ Golden ticket ★</span>':''}</span>
        <span class="z4-cd-nm"><b>${NM[m]}</b><small>${esc(MODELS[m].ver)}</small></span>
        <span class="z4-cd-pl"><small>Season P&amp;L</small><b class="${A.pnl>=0?'z4-up':'z4-dn'}">${pm(A.pnl)}</b></span>
        <span class="z4-cd-st"><span><small>W-L</small><b>${A.W}-${A.L}</b></span><span><small>Hit rate</small><b>${hr}%</b></span></span>
      </span>
      <span class="z4-cd-b" aria-hidden="true">
        <span class="z4-cd-bh">${NM[m]} · card ${i+1} of 4</span>
        <span class="z4-cd-l5"><small>Last 5</small>${l5.map(s=>`<i class="${s==='W'?'z4-w':'z4-l'}">${s==='W'?'✓':'✗'}</i>`).join('')}</span>
        ${T.b?`<span class="z4-cd-bw"><small>Top round</small>${logoImg(T.b.r.ticker)}<em>${esc(T.b.r.co)}</em><b class="z4-up">${pm(T.b.v)}</b></span>`:''}
        ${T.w?`<span class="z4-cd-bw"><small>Worst round</small>${logoImg(T.w.r.ticker)}<em>${esc(T.w.r.co)}</em><b class="z4-dn">${pm(T.w.v)}</b></span>`:''}
        <span class="z4-cd-bf">Pretend $100,000 account</span>
      </span></button></li>`}).join('');
  const L=P[lead],lhr=Math.round(100*L.W/Math.max(1,L.W+L.L));
  const checklist=`<section class="z4-pg z4-cards" aria-label="The standings, as trading cards">
    <h2 class="z4-wrap-h"><span class="z4-wh-k">Season 1 series</span><span class="z4-wh-t">Collect all 4!</span><span class="z4-wh-s">Ranked by pretend $100,000 accounts. Tap a card to turn it.</span></h2>
    <ol class="z4-sleeve">${cards}</ol>
    <div class="z4-letters"><p class="z4-lt-h">Letters to EZ</p>
      <p class="z4-lt-q">“Is ${NM[lead]} smart or just lucky?” <small>A reader on X</small></p>
      <p class="z4-lt-a">Too early to tell, true believer. A coin gets about half right. ${NM[lead]} is right on ${L.W} of ${L.W+L.L}. Ask us again when the season ends. <small>The editors</small></p></div>
  </section>`;

  /* ---------- THE LONG BOX (the record) ---------- */
  const firstD=byNew.length?byNew[byNew.length-1].resolves:'',lastD=byNew.length?byNew[0].resolves:'';
  const longbox=`<section class="z4-pg z4-box" aria-label="Every graded round, as back issues in a long box">
    <h2 class="z4-box-h"><span>Back issues</span><small>Every graded round, bagged and boarded. Newest in front.</small></h2>
    <div class="z4-lb" tabindex="0" aria-roledescription="long box" aria-label="Back issues. Use the arrow keys to flip.">
      <div class="z4-lb-in"><div class="z4-lb-stack"></div><div class="z4-lb-front"></div></div>
      <div class="z4-lb-wall" aria-hidden="true"><span class="z4-lb-print">Long box</span><span class="z4-lb-lbl">EZ · Season 1<br>#${Math.min(...R.map(r=>r.n))} to #${Math.max(...R.map(r=>r.n))} · ${md(firstD)} to ${md(lastD)}</span></div>
    </div>
    <div class="z4-lb-nav"><button type="button" class="z4-lb-b" data-d="-1" aria-label="Newer issue">◀ Newer</button><span class="z4-lb-mid"><span class="z4-lb-ct" aria-live="polite"></span><a class="z4-lb-o" href="#/round/">Open its graded card</a></span><button type="button" class="z4-lb-b" data-d="1" aria-label="Older issue">Older ▶</button></div>
  </section>`;

  /* ---------- THE SPINNER RACK (tonight) + NEXT ISSUE ---------- */
  const pend=(window.PENDING||[]).filter(p=>p.calls&&p.calls.length).slice().sort((a,b)=>mdyKey(a.resolves)-mdyKey(b.resolves)||cap(b.ticker)-cap(a.ticker));
  const when=s=>{if(!s)return 'Date to come';const d=dayDiff(s);return d===0?'Tonight at the close':d===1?'Tomorrow at the close':dayName(s)+' at the close'};
  const rackItem=p=>{const c=coL(p.ticker),bg=(c&&c.c)||'#2b2733';
    return `<li class="z4-mini" style="--bc:${bg}"><a href="#/round/${p.n}" aria-label="${esc(p.co)}, round ${p.n}. ${p.calls.map(x=>NM[x.m]+' '+x.dir.toLowerCase()+' '+x.mag+'%').join(', ')}">
      <span class="z4-mi-td"><span>#${p.n}</span><em>${esc(when(p.resolves).replace(' at the close',''))}</em></span>
      <span class="z4-mi-lg">${logoImg(p.ticker)}</span>
      <span class="z4-mi-t">${esc(p.co)}</span>
      <span class="z4-mi-calls">${p.calls.map(x=>{const up=x.dir==='UP';return `<span class="z4-mi-c">${face(x.m,'z4-f-s')}<span class="z4-bal z4-bal-s ${up?'z4-up':'z4-dn'}"><b>${up?'▲':'▼'}${esc(x.mag)}%</b></span></span>`}).join('')}</span>
    </a></li>`};
  const today=pend.filter(p=>p.resolves&&dayDiff(p.resolves)<=0);
  const up=(window.UPCOMING||[]).filter(u=>u.called&&dayDiff(u.called)>=0).sort((a,b)=>mdyKey(a.called)-mdyKey(b.called)||cap(b.ticker)-cap(a.ticker));
  const nd=up.length?up[0].called:null,nxt=up.filter(u=>u.called===nd),nx6=nxt.slice(0,6);
  const rack=`<section class="z4-pg z4-rack" aria-label="On sale tonight: the rounds still to be graded">
    <div class="z4-sign"><b>New!</b><span>On sale ${today.length===pend.length&&pend.length?'tonight at the close':'this week'}</span><small>${pend.length} issue${pend.length===1?'':'s'}. Every call locked before the report.</small></div>
    <div class="z4-rk-w"><ul class="z4-rk-row">${pend.map(rackItem).join('')}</ul></div>
    ${nd?`<div class="z4-next"><p class="z4-nx-h"><b>Next issue!</b><span>Calls drop ${esc(dayName(nd))}</span></p>
      <ul class="z4-nx-l">${nx6.map(u=>`<li>${logoImg(u.ticker)}<span>${esc(u.co)}!</span></li>`).join('')}</ul>
      ${nxt.length>nx6.length?`<p class="z4-nx-m">And ${nxt.length-nx6.length} more. ${up.length} rounds still to come this season.</p>`:`<p class="z4-nx-m">${up.length} rounds still to come this season.</p>`}</div>`:''}
  </section>`;

  /* ---------- BACK COVER: the mail-order ad for bet #1 ---------- */
  const S=window.SIM||{},share=S.poolShare!=null?Math.round(S.poolShare*100):null,lev=S.leverage,at=betAt();
  const bday=at?new Date(at).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  const back=`<section class="z4-pg z4-back" aria-label="Back cover: bet number 1, NVIDIA">
    <p class="z4-bk-k">Amazing! True! The first of many!</p>
    <h2 class="z4-bk-h"><span>Bet #1:</span> <b>NVIDIA</b></h2>
    <p class="z4-bk-s">We bet the whole pool on one call.</p>
    <div class="z4-bk-g">
      <div class="z4-bk-ph"><img src="media/ez-gpu2-1200.jpg" alt="An NVIDIA chip" loading="lazy" decoding="async">${lev?`<span class="z4-bk-x"><b>${lev}x</b><small>on Hyperliquid</small></span>`:''}</div>
      <ul class="z4-bk-l">
        ${share?`<li>${share}% of $EZ creator fees fill the pool.</li>`:''}
        <li>The golden ticket holder makes the call. <span class="z4-bk-gt">${face(lead,'z4-f-s')}As it stands: <b>${NM[lead]}</b></span></li>
        <li class="z4-bk-r"><b>▲ Right call:</b> profits buy back $EZ.</li>
        <li class="z4-bk-w"><b>▼ Wrong call:</b> the pool can be wiped out.</li>
      </ul></div>
    <div class="z4-order" role="timer" aria-label="Time until the NVIDIA bet"><p class="z4-or-h"><span aria-hidden="true">✂</span> Order form: bet #1</p>
      <dl><div><dt>Stock</dt><dd>NVIDIA (NVDA)</dd></div><div><dt>Called by</dt><dd>The golden ticket holder</dd></div><div><dt>Goes on</dt><dd>${bday?esc(bday)+', at the close':'Date to come'}</dd></div></dl>
      <p class="z4-or-t">Allow <span class="z4-cd-t"></span> for delivery.</p></div>
    <p class="z4-bk-f">Season 1 has one bet. Season 2 brings more. P&amp;L on this site is pretend. Not advice. Nobody said it would be EZ. <a href="${esc((window.CONFIG||{}).x||'https://x.com/earningszn')}" target="_blank" rel="noopener">Follow the story on X</a></p>
  </section>`;

  const root=D.createElement('div');root.id='z4-issue';
  root.innerHTML=`<div class="z4-spread z4-s1">${cover}${ad}</div><div class="z4-spread z4-s2">${checklist}${longbox}</div><div class="z4-spread z4-s3">${rack}${back}</div>`;
  const book=D.getElementById('wc-book');book.parentNode.insertBefore(root,book);
  /* the explainer film keeps its own player: move the live element into the cover art */
  const vt=D.querySelector('.x2p-vt');if(vt)root.querySelector('.z4-art-in').appendChild(vt);
  H.classList.add('z4-on');
  capLogos(root);
  folios(root);wireCards(root);wireBox(root,byNew,P);wireAd(root);wireCount(root,at);wireTurn(root);
  root.querySelectorAll('.z4-mast-b .z4-e').forEach(()=>{});
  H.classList.add('z4-ready');
}

function upcBars(n){let s='',x=2,seed=n*7919+13;const rnd=()=>{seed=(seed*16807)%2147483647;return seed/2147483647};
  while(x<58){const w=rnd()<.5?.8:1.6;if(rnd()<.62)s+=`<rect x="${x.toFixed(1)}" y="2" width="${w}" height="${x<5||x>55||(x>28&&x<31)?24:21}" fill="#15121a"/>`;x+=w+.6}return s}

function folios(root){const pgs=[...root.querySelectorAll('.z4-pg')];pgs.forEach((p,i)=>{if(i===0)return;
  const f=D.createElement('span');f.className='z4-folio';f.setAttribute('aria-hidden','true');f.textContent=i===pgs.length-1?'Back cover':i===1?'Inside front cover':String(i);p.appendChild(f)});
  pgs.forEach((p,i)=>{if(i===pgs.length-1)return;const b=D.createElement('button');b.type='button';b.className='z4-ear';b.setAttribute('aria-label','Turn the page');
    b.addEventListener('click',()=>{const n=pgs[i+1],top=n.getBoundingClientRect().top+scrollY-70;scrollTo({top,behavior:RM()?'auto':'smooth'})});p.appendChild(b)})}

function wireCards(root){root.querySelectorAll('.z4-cd').forEach(b=>b.addEventListener('click',()=>b.classList.toggle('z4-turned')))}

/* the long box: the front issue falls forward, the next one stands up */
function wireBox(root,list,P){const box=root.querySelector('.z4-lb'),st=box.querySelector('.z4-lb-stack'),fr=box.querySelector('.z4-lb-front'),ct=root.querySelector('.z4-lb-ct');let i=0,busy=false;
  const cover=(r,k)=>{const f=film(r.n),up=r.a>0,W=winners(r),c=coL(r.ticker),bg=(c&&c.c)||'#2b2733';
    return `<article class="z4-bi" style="--bc:${bg}">
      <div class="z4-bi-td"><span class="z4-bi-cb">${W.length?W.map(m=>face(m,'z4-f-s')).join(''):'<i class="z4-bi-nb">?</i>'}<b>#${r.n}</b></span><span class="z4-bi-m">Earnings Zeason</span><span class="z4-bi-d">${md(r.resolves)}</span></div>
      <h3 class="z4-bi-t">${esc(r.co)}</h3>
      <div class="z4-bi-art">${f?`<img src="${f.p}" alt="" loading="lazy" decoding="async"><button type="button" class="z4-bi-pl" aria-label="Play round ${r.n}'s film">▶</button>`:`<div class="z4-bi-nf"><span class="z4-bi-nl">${logoImg(r.ticker,'z4-lg-big')}</span><span class="z4-bi-nc">${r.calls.map(c=>{const k=call(c[1]);if(!k)return '';const ok=k.up===up;return `<span class="z4-bi-c">${face(c[0],'z4-f-s')}<span class="z4-bal z4-bal-s ${k.up?'z4-up':'z4-dn'}"><b>${k.up?'▲':'▼'}${k.v}%</b></span><i class="${ok?'z4-ok':'z4-no'}" aria-hidden="true">${ok?'✓':'✗'}</i></span>`}).join('')}</span><b class="z4-bi-sfx ${up?'z4-up':'z4-dn'}">${sfx(r.a)}</b></div>`}</div>
      <span class="z4-tag ${up?'z4-up':'z4-dn'}"><small>${esc(r.ticker)} at the close</small><b>${up?'▲':'▼'} ${sgnPct(r.a)}</b></span>
      <span class="z4-bi-win">${W.length?`<small>${W.length>1?'Tied winners':'Winner'}</small><b>${W.map(m=>NM[m]).join(' & ')}</b>`:'<small>Winner</small><b>Nobody</b>'}</span>
      <i class="z4-bag" aria-hidden="true"></i></article>`};
  const top=(r,k,prev)=>{const c=coL(r.ticker),bg=(c&&c.c)||'#2b2733',up=r.a>0,div=!prev||prev.resolves!==r.resolves;
    return `${div&&k>0?`<span class="z4-dv" style="--k:${k}" aria-hidden="true">${md(r.resolves)}</span>`:''}<button type="button" class="z4-tp" style="--k:${k};--bc:${bg}" data-i="${i+k}" aria-label="Round ${r.n}, ${esc(r.co)}"><b>#${r.n}</b><span>${esc(r.ticker)}</span><em class="${up?'z4-up':'z4-dn'}">${up?'▲':'▼'}${pct(r.a)}</em></button>`};
  const draw=(dir)=>{const r=list[i];fr.innerHTML=cover(r,0);capLogos(fr);
    let h='';for(let k=1;k<=5&&i+k<list.length;k++)h+=top(list[i+k],k,list[i+k-1]);st.innerHTML=h;
    st.querySelectorAll('.z4-tp').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.i-i)));
    ct.textContent=`${i+1} of ${list.length}`;root.querySelector('.z4-lb-o').href='#/round/'+r.n;
    const pl=fr.querySelector('.z4-bi-pl');if(pl)pl.addEventListener('click',e=>{e.stopPropagation();const f=film(r.n),a=fr.querySelector('.z4-bi-art');a.innerHTML=`<video src="${f.v}" poster="${f.p}" muted playsinline loop autoplay></video>`});
    root.querySelectorAll('.z4-lb-b').forEach(b=>b.disabled=(+b.dataset.d<0?i===0:i===list.length-1));
    if(dir&&!RM()){const a=fr.querySelector('.z4-bi');a.classList.add(dir>0?'z4-in-o':'z4-in-n')}};
  const go=d=>{if(busy)return;const j=Math.max(0,Math.min(list.length-1,i+d));if(j===i)return;
    const a=fr.querySelector('.z4-bi');if(RM()||!a){i=j;draw(0);return}
    busy=true;a.classList.add(d>0?'z4-out-o':'z4-out-n');setTimeout(()=>{i=j;draw(d);busy=false},d>0?330:260)};
  root.querySelectorAll('.z4-lb-b').forEach(b=>b.addEventListener('click',()=>go(+b.dataset.d)));
  box.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){go(1);e.preventDefault()}else if(e.key==='ArrowLeft'){go(-1);e.preventDefault()}});
  let x0=null;box.addEventListener('pointerdown',e=>{x0=e.clientX});box.addEventListener('pointerup',e=>{if(x0==null)return;const dx=e.clientX-x0;x0=null;if(Math.abs(dx)>40)go(dx<0?1:-1)});
  draw(0);window.__z4Box=go}

/* the strip ad plays on comprehension: once the strip is fully in view for a moment; tap replays */
function wireAd(root){const s=root.querySelector('.z4-strip'),c=s.querySelector('.z4-cnt'),v=+c.dataset.v;
  const run=()=>{if(RM()){s.classList.add('z4-done');return}s.classList.remove('z4-play','z4-done');void s.offsetWidth;s.classList.add('z4-play');
    c.textContent=(v>=0?'+':'−')+'$0';const t0=performance.now()+2300,dur=900;
    const tick=t=>{const k=Math.max(0,Math.min(1,(t-t0)/dur));c.textContent=(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)*(1-Math.pow(1-k,3))).toLocaleString('en-US');if(k<1)requestAnimationFrame(tick);else s.classList.add('z4-done')};requestAnimationFrame(tick)};
  let seen=false,tm=null;const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.intersectionRatio>=.85&&!seen){tm=setTimeout(()=>{seen=true;run()},700)}else if(e.intersectionRatio<.85&&tm){clearTimeout(tm);tm=null}}),{threshold:[0,.85,1]});
  io.observe(s);s.addEventListener('click',e=>{if(!e.target.closest('a'))run()});window.__z4Ad=run;
  if(RM())s.classList.add('z4-done')}

function wireCount(root,at){const el=root.querySelector('.z4-cd-t');if(!el)return;
  const f=()=>{if(!at){el.textContent='a few weeks';return}const s=Math.max(0,Math.floor((at-Date.now())/1e3)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;
    el.innerHTML=`<b>${d}</b> days <b>${h}</b> hrs <b>${m}</b> min <b>${String(x).padStart(2,'0')}</b> sec`};f();setInterval(f,1000)}

/* the page turn: each page turns in from the spine as it comes up (CSS scroll timeline); this only marks support */
function wireTurn(){if(CSS.supports&&CSS.supports('animation-timeline: view()'))H.classList.add('z4-sdt')}

(function wait(){if(H.classList.contains('x2p-world')&&!H.classList.contains('x2p-cur')&&window.__x2pPnl&&D.getElementById('wc-book')&&D.querySelector('.x2p-vt .vt-f'))
  {try{build()}catch(e){console.error('z4',e);window.__z4Err=e}}else setTimeout(wait,120)})();
})();
