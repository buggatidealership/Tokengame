/* H30 · concept C · THE LIVE RACE (record first).
   Everything is computed here from ez-data.js (ROUNDS, UPCOMING, PENDING, MODELS, TICKERS, CO_LOGOS, CAPS, SIM, CONFIG, FILMS).
   Flat P&L: $100,000 x direction x move per trade, summed (the same maths as x2plus.js window.__x2pPnl). Nothing typed.
   ?now=<ISO> freezes the clock (boards). window.__C = the computed model, for the measuring scripts. */
(function(){
'use strict';
const D=document,W=window,ROOT='../../../../../../../../',MED=ROOT+(typeof MEDIA!=='undefined'?MEDIA:'media/');
const Q=new URLSearchParams(location.search);
const NOW=Q.get('now')?Date.parse(Q.get('now')):Date.now();
const RM=W.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
const $=s=>D.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- time ---------- */
function md(s){const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null}
function tzOff(t,tz){const p={};new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit'}).formatToParts(new Date(t)).forEach(x=>p[x.type]=x.value);
  return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute,+p.second)-t}
function zoned(y,m,d,h,mi,tz){let g=Date.UTC(y,m,d,h,mi);g-=tzOff(g,tz);g=Date.UTC(y,m,d,h,mi)-tzOff(g,tz);return g}
/* each exchange's own close, local time */
const EX={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],
  DE:['Europe/Berlin',17,30],AS:['Europe/Amsterdam',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const EXT={BMW:'DE',DHL:'DE',KIOXIA:'T',NINTENDO:'T',SOFTBANK:'T'};
function exch(t){const s=String(t).split('.')[1]||EXT[t];return EX[s]||['America/New_York',16,0]}
function closeAt(r){const d=md(r.resolves);if(!d)return null;const e=exch(r.ticker);return zoned(d[0],d[1],d[2],e[1],e[2],e[0])}
const NY='America/New_York';
const fDay=t=>new Date(t).toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:NY});
const fMD=t=>new Date(t).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:NY});
const nyDate=t=>new Date(t).toLocaleDateString('en-US',{year:'2-digit',month:'2-digit',day:'2-digit',timeZone:NY});
function rel(t){const s=(NOW-t)/1000;if(s<3600)return Math.max(1,Math.round(s/60))+'m ago';if(s<48*3600)return Math.round(s/3600)+'h ago';return Math.floor(s/86400)+' days ago'}
function until(t){let s=Math.max(0,(t-NOW)/1000);const d=Math.floor(s/86400);s-=d*86400;const h=Math.floor(s/3600);s-=h*3600;const m=Math.floor(s/60);
  return d?`${d}d ${h}h`:h?`${h}h ${m}m`:`${m}m`}

/* ---------- numbers ---------- */
const MINUS='−';
function usd(v){const a=Math.round(Math.abs(v));return (v>=0?'+':MINUS)+'$'+a.toLocaleString('en-US')}
function usdK(v){const a=Math.abs(v);return (v>=0?'+':MINUS)+'$'+(a>=1000?Math.round(a/1000)+'K':Math.round(a))}
function pct(a){return (a>=0?'+':MINUS)+Math.abs(a).toFixed(2)+'%'}
const NM=m=>{const n=MODELS[m].name;return n.length<=3?n:n[0]+n.slice(1).toLowerCase()};
function mark(m,cls){const M=MODELS[m];return `<svg class="mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor"${M.fr?` fill-rule="${M.fr}"`:''} d="${M.d}"/>${M.dot?`<path fill="currentColor" d="${M.dot}"/>`:''}</svg>`}
function coLogo(t,cls){const L=(typeof CO_LOGOS!=='undefined'&&CO_LOGOS[t]);if(!L)return `<span class="co ${cls||''} co-t" aria-hidden="true">${esc(String(t).slice(0,4))}</span>`;
  return `<span class="co ${cls||''}${L.dark?' co-d':''}" aria-hidden="true"><img src="${MED}${L.f}" alt="" loading="lazy"></span>`}
const coName=r=>`${esc(r.co)} <span class="tk">(${esc(r.ticker)})</span>`;
const cap=t=>(typeof CAPS!=='undefined'&&CAPS[t])||0;

/* ---------- the record ---------- */
const RS=ROUNDS.slice().filter(r=>typeof r.a==='number'&&!isNaN(r.a)).sort((a,b)=>a.n-b.n);
const N=RS.length;
const MK=Object.keys(MODELS);
const A={};MK.forEach(m=>A[m]={m,pnl:0,W:0,L:0,n:0,cum:[0],seq:[],wk:0,per:{}});
const WK0=NOW-7*864e5;
RS.forEach((r,i)=>{r.t=closeAt(r);r.dirs={};
  r.calls.forEach(x=>{const m=x[0];if(!A[m])return;const dn=/^DOWN/.test(x[1]),s=(dn?-1:1)*r.a/100,v=100000*s,mg=parseFloat(String(x[1]).replace(/^(UP|DOWN)\s*/,''));
    const t=A[m];t.pnl+=v;t.n++;s>0?t.W++:t.L++;t.seq.push({n:r.n,w:s>0});t.per[r.n]={v,dn,mg,w:s>0,off:+x[2]};
    if(r.t&&r.t>WK0&&r.t<=NOW)t.wk+=v;r.dirs[m]={dn,mg,w:s>0,v}});
  MK.forEach(m=>A[m].cum.push(A[m].pnl))});
const RANK=MK.slice().sort((a,b)=>A[b].pnl-A[a].pnl);
const LEAD=RANK[0];
const TRADES=MK.reduce((s,m)=>s+A[m].n,0);
const LAST=RS[N-1];
/* what comes next: the earliest close still ahead, and every round graded at it */
const AHEAD=[].concat(typeof PENDING!=='undefined'?PENDING:[],typeof UPCOMING!=='undefined'?UPCOMING:[]).map(r=>Object.assign({},r,{t:closeAt(r)})).filter(r=>r.t&&r.t>NOW).sort((a,b)=>a.t-b.t);
const NEXTD=AHEAD.length?AHEAD[0].resolves:null;
const NEXTR=AHEAD.filter(r=>r.resolves===NEXTD).sort((a,b)=>cap(b.ticker)-cap(a.ticker));
const NEXTT=NEXTR.length?Math.max.apply(null,NEXTR.map(r=>r.t)):null;
const TODAY=nyDate(NOW);
const DUE=[].concat(typeof PENDING!=='undefined'?PENDING:[],typeof UPCOMING!=='undefined'?UPCOMING:[]).filter(r=>{const d=md(r.called);return d&&nyDate(Date.UTC(d[0],d[1],d[2],17))===TODAY});
const FIRST=RS.length?md(RS[0].called):null,FIRSTT=FIRST?Date.UTC(FIRST[0],FIRST[1],FIRST[2],17):null;
/* the bet: SIM/CONFIG.betDate, else the NVIDIA round's call day, the report the next weekday, at the close (routes.js EZ5_BET) */
function betAt(){const b=md((SIM&&SIM.betDate)||CONFIG.betDate);if(b)return zoned(b[0],b[1],b[2],16,0,NY);
  const nv=[].concat(UPCOMING||[],PENDING||[]).filter(u=>u.ticker==='NVDA')[0],c=nv&&md(nv.called);if(!c)return null;
  let d=new Date(Date.UTC(c[0],c[1],c[2]));do{d=new Date(d.getTime()+864e5)}while(d.getUTCDay()===0||d.getUTCDay()===6);
  return zoned(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),16,0,NY)}
const BET=betAt();
const XURL=(CONFIG&&CONFIG.x)||'https://x.com/earningszn',XH='@'+XURL.replace(/\/+$/,'').split('/').pop();
/* the walkthrough's round, by a stated rule: the newest graded round with a film where exactly one AI got the direction
   and the move was calm (under 5%); else the newest with exactly one right; else the newest. */
function oneRight(r){return MK.filter(m=>r.dirs[m]&&r.dirs[m].w).length===1&&Object.keys(r.dirs).length>=3}
const EX1=RS.slice().reverse().find(r=>oneRight(r)&&FILMS[r.n]&&Math.abs(r.a)<5)||RS.slice().reverse().find(oneRight)||LAST;
W.__C={A,RANK,LEAD,N,TRADES,LAST,NEXTR,NEXTT,DUE,BET,EX1:EX1&&EX1.n,NOW};

/* ---------- 01 · the first frame ---------- */
D.querySelectorAll('[data-x]').forEach(a=>a.href=XURL);
$('#f1sub').innerHTML=`Every trade is posted on <a href="${XURL}" target="_blank" rel="noopener">X</a> before the report.`;
const GAP=RANK.length>1?A[RANK[0]].pnl-A[RANK[1]].pnl:0;
D.querySelector('#race .lbl').innerHTML=`<b class="au">${NM(LEAD)}</b> leads by ${usd(GAP).slice(1)}<i>Season P&amp;L · $100K a trade</i>`;
$('#raceFresh').innerHTML=LAST?`<b class="dot" aria-hidden="true"></b>After R${LAST.n} · ${fDay(LAST.t)} close`:'';
$('#raceFoot').innerHTML=NEXTR.length?`<span class="nx">Next close <b>${fDay(NEXTT)}</b></span><span class="nl">${NEXTR.slice(0,4).map(r=>coLogo(r.ticker,'sm')).join('')}${NEXTR.length>4?`<i class="more">+${NEXTR.length-4}</i>`:''}</span><span class="in">in ${until(NEXTT)}</span>`:`<span class="nx">Season 1 · ${N} rounds graded</span>`;

function race(){const box=$('#racePlot');if(!box)return;const Wd=box.clientWidth,H=box.clientHeight;if(!Wd||!H)return;
  const desk=Wd>520;
  /* end labels measured with the real fonts, so the lines get every pixel the labels leave */
  const cv=D.createElement('canvas').getContext('2d');
  const fs=desk?16:13,fsn=desk?17:14;
  const lab=RANK.map(m=>{cv.font=`600 ${fs}px Barlow`;const a=cv.measureText(NM(m)).width;cv.font=`700 ${fsn}px "Barlow Condensed"`;const b=cv.measureText(usd(A[m].pnl)).width;return {m,w:(desk?20:16)+a+6+b}});
  const LW=Math.ceil(Math.max.apply(null,lab.map(l=>l.w)))+(desk?18:10);
  const GL=desk?44:34,PW=Wd-LW-GL,top=desk?16:10,bot=desk?26:20,PH=H-top-bot;
  let lo=0,hi=0;MK.forEach(m=>A[m].cum.forEach(v=>{lo=Math.min(lo,v);hi=Math.max(hi,v)}));
  const pad=(hi-lo)*.06;lo-=pad;hi+=pad;const step=(hi-lo)>(desk?400000:160000)?100000:50000;
  const X=i=>GL+i/N*PW,Y=v=>top+(hi-v)/(hi-lo)*PH;
  let g='';
  for(let v=Math.ceil(lo/step)*step;v<=hi;v+=step){const y=Y(v).toFixed(1);g+=`<line class="${v===0?'z':'gl'}" x1="${GL}" x2="${GL+PW}" y1="${y}" y2="${y}"/>`;
    g+=`<text class="gt" x="${GL-6}" text-anchor="end" y="${(+y+3.5).toFixed(1)}">${v===0?'$0':(v>0?'+':MINUS)+'$'+Math.abs(v/1000)+'K'}</text>`}
  const sty=['lead','r2','r3','r4'];
  let ln='';const ends=[];
  RANK.forEach((m,k)=>{const c=A[m].cum;let d='';c.forEach((v,i)=>{d+=(i?'L':'M')+X(i).toFixed(1)+' '+Y(v).toFixed(1)});
    ln=`<path class="ln ${sty[k]}" d="${d}"/>`+ln;
    ends.push({m,k,y:Y(c[c.length-1])})});
  /* de-collide the end labels: at least 17px apart (22 on desktop), kept inside the plot */
  const gap=desk?24:17,ord=ends.slice().sort((a,b)=>a.y-b.y);ord.forEach(e=>e.ly=e.y);
  for(let it=0;it<30;it++){for(let i=1;i<ord.length;i++){const o=ord[i-1],e=ord[i];if(e.ly-o.ly<gap){const p=(gap-(e.ly-o.ly))/2;o.ly-=p;e.ly+=p}}
    ord.forEach(e=>{e.ly=Math.max(top+6,Math.min(top+PH-2,e.ly))})}
  let dots='',lead='';
  ends.forEach(e=>{dots+=`<circle class="ed ${sty[e.k]}" cx="${(GL+PW).toFixed(1)}" cy="${e.y.toFixed(1)}" r="${desk?4:3}"/>`;
    if(Math.abs(e.ly-e.y)>2)lead+=`<path class="ll" d="M${GL+PW+4} ${e.y.toFixed(1)}L${GL+PW+(desk?12:7)} ${e.ly.toFixed(1)}"/>`});
  const xl=`<text class="xt" x="${GL}" y="${H-4}">${FIRSTT?fMD(FIRSTT):''}</text><text class="xt" text-anchor="end" x="${GL+PW}" y="${H-4}">R${N} · ${LAST?fMD(LAST.t):''}</text>`;
  const an=!RM&&race.go&&!race.done;if(an)race.done=1;
  box.innerHTML=`<svg class="rc${an?' draw':''}" width="${Wd}" height="${H}" viewBox="0 0 ${Wd} ${H}" role="img" aria-label="Season P&L race after round ${N}: ${RANK.map(m=>NM(m)+' '+usd(A[m].pnl)).join(', ')}">${g}<g class="lns">${ln}${dots}</g>${lead}${xl}</svg>`+
    ends.map(e=>`<div class="el ${sty[e.k]}" style="left:${GL+PW+(desk?14:9)}px;top:${e.ly.toFixed(1)}px">${mark(e.m)}<span class="en">${NM(e.m)}</span><span class="ev ${A[e.m].pnl>=0?'g':'r'}">${usd(A[e.m].pnl)}</span></div>`).join('')}

/* the film: one big play target, plays in place with sound */
(function(){const v=$('#filmV'),b=$('#filmPlay'),f=$('#film');if(!v||!b)return;
  b.addEventListener('click',()=>{f.classList.add('on');v.controls=true;v.muted=false;const p=v.play();p&&p.catch(()=>{v.muted=true;v.play().catch(()=>{})});b.hidden=true});
  v.addEventListener('ended',()=>{f.classList.remove('on');v.controls=false;b.hidden=false;v.load()})})();

/* ---------- 02 · how a round works (one real round, four steps) ---------- */
(function(){const r=EX1;if(!r)return;const ms=MK.filter(m=>r.dirs[m]);
  $('#exDate').innerHTML=`Round ${r.n} · ${fDay(r.t)} close`;
  const chips=(f,nm)=>`<div class="chips${nm?'':' nn'}">${ms.map(m=>`<div class="chip">${mark(m)}${nm?`<span class="cn">${NM(m)}</span>`:''}${f(r.dirs[m],m)}</div>`).join('')}</div>`;
  const right=ms.filter(m=>r.dirs[m].w);
  const S=[
    {v:`Each AI goes <b>long</b> or <b>short</b> before earnings.`,x:chips(d=>`<span class="cv">${d.dn?'▼ Short':'▲ Long'}</span>`,1)},
    {v:`${esc(r.co)} reports. The next close moves the stock.`,x:`<div class="mv">${coLogo(r.ticker)}<span class="mvn">${coName(r)}</span><b class="${r.a>=0?'g':'r'}">${r.a>=0?'▲':'▼'} ${pct(r.a)}</b></div>`},
    {v:`Right way is a <b class="g">W</b>, wrong way an <b class="r">L</b>.`,x:chips(d=>`<span class="cw ${d.w?'g':'r'}">${d.w?'W':'L'}</span>`)},
    {v:`$100K a trade: the move is the P&amp;L.`,x:chips(d=>`<span class="cp ${d.v>=0?'g':'r'}">${usd(d.v)}</span>`)}
  ];
  $('#steps').innerHTML=S.map((s,i)=>`<li><span class="sn" aria-hidden="true">${i+1}</span><p class="sv">${s.v}</p>${s.x}</li>`).join('')+
    `<li class="to"><p>Every trade adds up on the board <span aria-hidden="true">↓</span></p></li>`})();

/* ---------- 03 · the board ---------- */
(function(){if(!LAST)return;
  $('#boardDate').innerHTML=`After R${N} · ${fDay(LAST.t)} close`;
  const form=m=>{const s=A[m].seq.slice(-10);return `<span class="form" aria-label="Last ${s.length}: ${s.map(x=>x.w?'W':'L').join(' ')}">${s.map(x=>`<i class="sl ${x.w?'w':'l'}"></i>`).join('')}</span>`};
  $('#board').innerHTML=`<div class="bh"><span>Ranked by P&amp;L · $100K a trade</span><span>Last 10</span></div>`+
    RANK.map((m,k)=>{const t=A[m];return `<div class="row${k?'':' r1'}">
      <span class="rk">${k+1}</span>${mark(m)}<span class="nmv"><b>${NM(m)}</b>${k?'':'<em class="tag">Calls Bet #1</em>'}<i>${esc(MODELS[m].ver)}</i></span><span class="pl ${t.pnl>=0?'g':'r'}">${usd(t.pnl)}</span>
      <span class="l2"><span class="wl"><b class="g">${t.W}W</b><b class="r">${t.L}L</b></span><span class="wk">7 days <b class="${t.wk>=0?'g':'r'}">${t.wk?usd(t.wk):'$0'}</b></span>${form(m)}</span></div>`}).join('');
  $('#boardHand').innerHTML=`All ${TRADES} trades are below, each one graded <span aria-hidden="true">↓</span>`})();

/* ---------- 04 · every round so far: the season tape + the round you pick ---------- */
let SEL=N-1;
function hero(i){const r=RS[i];if(!r)return;const F=FILMS[r.n],ms=MK.filter(m=>r.dirs[m]);
  const pic=F?`<button type="button" class="hp" data-f="${F.f}" aria-label="Play the round ${r.n} film"><img src="${MED}${F.p}.jpg" alt="" loading="lazy"><i aria-hidden="true"></i></button>`:`<span class="hp nf">${coLogo(r.ticker,'big')}</span>`;
  $('#hero').innerHTML=`${pic}<div class="hb">
     <p class="hd">${i===N-1?'<b class="nw">Newest</b> · ':''}R${r.n} · ${fDay(r.t)} close</p>
     <p class="hc">${coLogo(r.ticker,'sm')}<span>${coName(r)}</span></p>
     <p class="hm ${r.a>=0?'g':'r'}">${r.a>=0?'▲':'▼'} ${pct(r.a)}</p></div>
   <div class="ht">${ms.map(m=>{const d=r.dirs[m];return `<span class="tr"><span class="tt">${mark(m)}<b class="${d.w?'g':'r'}">${d.w?'W':'L'}</b></span><span class="tc">${d.dn?'Short':'Long'} ${d.mg}%</span></span>`}).join('')}</div>
   <p class="rx"><a href="${XURL}" target="_blank" rel="noopener">Trades posted on X before the report ↗</a><span>Graded by the close</span></p>`;
  const b=$('#hero .hp[data-f]');b&&b.addEventListener('click',()=>{const v=D.createElement('video');v.className='hvid';v.controls=true;v.playsInline=true;v.poster=MED+F.p+'.jpg';
    v.innerHTML=`<source src="${MED}${F.f}.mp4" type="video/mp4">`;$('#hero').classList.add('playing');b.replaceWith(v);v.play().catch(()=>{})});
  $('#hero').classList.remove('playing');
  const tp=$('#tape');tp.setAttribute('aria-valuemax',RS[N-1].n);tp.setAttribute('aria-valuenow',r.n);tp.setAttribute('aria-valuetext',`Round ${r.n}, ${r.co}`)}
function tape(){const box=$('#tape');if(!box)return;const Wd=box.clientWidth;if(!Wd)return;const desk=Wd>700;
  const cols=40,blocks=Math.ceil(N/cols),lab=desk?30:22,cw=(Wd-lab-(desk?6:4))/cols,rh=desk?25:14,ax=desk?16:13,bh=MK.length*rh+ax,gapB=desk?14:10;
  const H=blocks*bh+(blocks-1)*gapB;const lean=Math.min(rh*.62,cw*1.15),sw=Math.max(2.2,cw*.36);
  let s='';const rows=RANK;
  for(let b=0;b<blocks;b++){const y0=b*(bh+gapB);
        for(let c=0;c<cols;c++){const i=b*cols+c;if(i>=N)break;const r=RS[i],x=lab+c*cw;
      rows.forEach((m,k)=>{const y=y0+k*rh+2,h=rh-4,d=r.dirs[m];const cx=x+cw/2;
        if(!d){s+=`<circle class="nt" cx="${cx.toFixed(2)}" cy="${(y+h/2).toFixed(2)}" r="1"/>`;return}
        const x1=cx-lean/2-sw/2,x2=cx+lean/2-sw/2;s+=`<path class="sl ${d.w?'w':'l'}" d="M${(x1).toFixed(2)} ${y+h}L${(x1+sw).toFixed(2)} ${y+h}L${(x2+sw).toFixed(2)} ${y}L${(x2).toFixed(2)} ${y}Z"/>`});
      if(r.n===1||r.n%10===0||i===N-1){const e=(c===cols-1||i===N-1);s+=`<text class="ax" x="${(e?x+cw+3:x+cw/2).toFixed(1)}" y="${y0+MK.length*rh+ax-2}" text-anchor="${e?'end':c===0?'start':'middle'}">R${r.n}</text>`}}
    s+=`<rect class="selr" data-b="${b}" x="0" y="${y0-1}" width="0" height="${MK.length*rh+2}" rx="1.5"/>`}
  let mk='';for(let b=0;b<blocks;b++)rows.forEach((m,k)=>{mk+=`<span class="tm" style="top:${b*(bh+gapB)+k*rh}px;height:${rh}px;width:${lab-6}px">${mark(m)}</span>`});
  box.style.height=H+'px';
  box.innerHTML=`<svg width="${Wd}" height="${H}" viewBox="0 0 ${Wd} ${H}" aria-hidden="true">${s}</svg>${mk}`;
  box._g={cols,cw,lab,bh,gapB,blocks};selMark()}
function selMark(){const box=$('#tape'),g=box&&box._g;if(!g)return;const b=Math.floor(SEL/g.cols),c=SEL%g.cols;
  box.querySelectorAll('.selr').forEach(e=>{if(+e.dataset.b===b){e.setAttribute('x',(g.lab+c*g.cw-1).toFixed(2));e.setAttribute('width',(g.cw+2).toFixed(2))}else e.setAttribute('width',0)})}
function pick(i){i=Math.max(0,Math.min(N-1,i));if(i===SEL)return;SEL=i;selMark();hero(i)}
(function(){const box=$('#tape');if(!box||!LAST)return;
  $('#tapeDate').innerHTML=`${N} rounds · ${TRADES} trades · newest ${fDay(LAST.t)}`;
  const at=e=>{const g=box._g,r=box.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;const b=Math.max(0,Math.min(g.blocks-1,Math.floor(y/(g.bh+g.gapB))));
    const c=Math.max(0,Math.min(g.cols-1,Math.floor((x-g.lab)/g.cw)));return b*g.cols+c};
  let drag=false;box.addEventListener('pointerdown',e=>{drag=true;try{box.setPointerCapture(e.pointerId)}catch(_){}pick(at(e))});
  box.addEventListener('pointermove',e=>{if(drag)pick(at(e))});['pointerup','pointercancel'].forEach(t=>box.addEventListener(t,()=>drag=false));
  box.addEventListener('keydown',e=>{const k={ArrowLeft:-1,ArrowRight:1,ArrowDown:-1,ArrowUp:1}[e.key];if(k){e.preventDefault();pick(SEL+k)}else if(e.key==='Home'){e.preventDefault();pick(0)}else if(e.key==='End'){e.preventDefault();pick(N-1)}});
  hero(SEL)})();

/* ---------- 05 · smart or lucky: hit rate against a coin's range at each AI's own sample ---------- */
function luck(){const box=$('#luck');if(!box||!LAST)return;$('#luckDate').innerHTML=`Hit rate after R${N} · ${fDay(LAST.t)}`;
  const rows=MK.slice().sort((a,b)=>A[b].W/(A[b].n||1)-A[a].W/(A[a].n||1));
  const lo=30,hi=75,P=v=>(v-lo)/(hi-lo)*100;
  const out=rows.filter(m=>{const t=A[m],h=t.W/t.n*100,band=196*Math.sqrt(.25/t.n);return h>50+band});
  box.innerHTML=`<div class="lh"><span>Right way, out of every trade</span></div>`+rows.map((m,k)=>{const t=A[m],h=t.W/t.n*100,band=196*Math.sqrt(.25/t.n);
    return `<div class="lr${m===LEAD?' lead':''}">${mark(m)}<span class="lnm">${NM(m)}</span>
      <span class="trk"><i class="band" style="left:${P(50-band)}%;width:${P(50+band)-P(50-band)}%">${k===0?'<em>A coin lands here</em>':''}</i><i class="half" style="left:${P(50)}%"></i><i class="dot" style="left:${P(h)}%"></i></span>
      <span class="lv"><b>${h.toFixed(0)}%</b><i>${t.W} of ${t.n}</i></span></div>`}).join('')+
    `<div class="lr lax"><i></i><i></i><span class="trk"><span style="left:${P(30)}%">30%</span><span style="left:${P(50)}%">50%</span><span style="left:${P(70)}%">70%</span></span><i></i></div>`+
    `<p class="lv2">${out.length===0?'No AI is clear of the coin yet.':out.length===1?`Only ${NM(out[0])} is clear of the coin.`:`${out.map(NM).join(' and ')} are clear of the coin.`} The band narrows every round.</p>`}

/* ---------- 06 · the bet ---------- */
function bet(){const box=$('#bet');if(!box)return;const P=Math.round(((SIM&&SIM.poolShare)!=null?SIM.poolShare:.69)*100);
  $('#nvPath').setAttribute('d',typeof NVIDIA_D!=='undefined'?NVIDIA_D:'');
  $('#betDate').innerHTML=BET?`${fDay(BET)} close`:'Date to come';
  const lh=(SIM&&SIM.leadHours)||24;
  box.innerHTML=`<div class="cd" id="cd" role="timer" aria-label="Time to Bet #1"></div>
   <p class="who"><span>#1 on the board calls it, ${lh}h out.</span><span class="now">Now: ${mark(LEAD)}<b>${NM(LEAD)}</b></span></p>
   <p class="cp1">${P}% of $EZ creator fees fill the pool. We bet the whole pool on NVIDIA, based on the #1 AI’s prediction.</p>
   <div class="oc"><p class="o g"><b>▲ Right</b>Profits buy back $EZ.</p><p class="o r"><b>▼ Wrong</b>The pool can be wiped out.</p></div>
   <p class="first">NVIDIA is the first bet, not the last. <span class="pool">Pool: ${CONFIG&&CONFIG.pool?esc(CONFIG.pool):'not live yet'}</span></p>`;
  tick()}
function tick(){const e=$('#cd');if(!e||!BET)return;const now=Q.get('now')?NOW:Date.now();const s=Math.max(0,Math.floor((BET-now)/1000));
  const d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),sc=s%60,p=v=>String(v).padStart(2,'0');
  e.innerHTML=[[d,'days'],[p(h),'hrs'],[p(m),'min'],[p(sc),'sec']].map(x=>`<span class="u"><b>${x[0]}</b><i>${x[1]}</i></span>`).join('')}

/* ---------- 07 · next round, follow, the contract address ---------- */
function next(){const box=$('#next');if(!box)return;
  $('#nextDate').innerHTML=NEXTT?`Graded in ${until(NEXTT)}`:'';
  const due=DUE.length?`<p class="due">Trades due today: ${DUE.slice().sort((a,b)=>cap(b.ticker)-cap(a.ticker)).map(r=>esc(r.co)).join(', ')}</p>`:'';
  box.innerHTML=`<p class="nd">${NEXTT?fDay(NEXTT)+' close':'Season 1'}</p>
   <ul class="nco">${NEXTR.slice(0,4).map(r=>`<li>${coLogo(r.ticker)}<span>${coName(r)}</span></li>`).join('')}</ul>${NEXTR.length>4?`<p class="nmore">and ${NEXTR.length-4} more</p>`:''}
   ${due}
   <a class="follow" href="${XURL}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.2H4.3l13.3 17.5Z"/></svg>Follow ${esc(XH)}</a>`;
  const ca=CONFIG&&CONFIG.ca;
  $('#ca').innerHTML=ca?`<p class="cl">Contract address</p><p class="cav"><code>${esc(ca)}</code><button type="button" class="cp" id="caCopy">Copy</button></p><p class="cw2">Any other address is fake. No presale, no airdrop, no DMs.</p>`:
    `<p class="cl">Contract address</p><p class="cav nl">Not live yet.</p><p class="cw2">At launch: here and on ${esc(XH)}, in full. Any other address is fake. No presale, no airdrop, no DMs.</p>`;
  const c=$('#caCopy');c&&c.addEventListener('click',()=>{navigator.clipboard&&navigator.clipboard.writeText(ca);c.textContent='Copied'})}

/* ---------- go ---------- */
function all(){race();tape();luck()}
bet();next();luck();
let lw=0;function fit(){if(innerWidth===lw)return;lw=innerWidth;all()}
fit();(D.fonts&&D.fonts.ready||Promise.resolve()).then(()=>{lw=0;race.go=1;fit();D.documentElement.classList.add('c-ready')});
addEventListener('resize',fit);
if(!Q.get('now'))setInterval(tick,1000);
})();
