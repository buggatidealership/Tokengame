/* Round H10 · floor: the Upcoming tab's top as the exchange floor on New York's clock, every upcoming round to swipe, and Your call.
   Two drawn styles: 'n' = the vault's brush and ink noir, 'l' = the EZ. logo's flat badge. Every word and number is page text set on a
   surface the painting carries blank for it (the clock face, the slate, the black betting cards). Data: ROUNDS, PENDING, UPCOMING,
   MODELS from the page. Time: New York via Intl. Your call lives in this browser only (localStorage, try/catch). Mockup code. */
(function(){
const IMG=window.FXIMG||'/tools/concepts/worlds/comic/story/h/floor/img/';
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const ORD=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const el=h=>{const d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const F={};window.FX=F;
/* clock: real time, or a demo time running at real speed */
const T0=performance.now();F.setNow=x=>{window.FX_NOW=x==null?null:x;F._t0=performance.now()};F._t0=T0;
F.now=()=>window.FX_NOW!=null?window.FX_NOW+(performance.now()-F._t0):Date.now();
const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hourCycle:'h23',weekday:'short',year:'numeric',month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'});
const ny=t=>{const o={};NYF.formatToParts(new Date(t)).forEach(p=>o[p.type]=p.value);return {wd:o.weekday,y:+o.year,mo:+o.month,d:+o.day,h:+o.hour,mi:+o.minute,s:+o.second,mdy:`${+o.month}/${+o.day}/${String(o.year).slice(2)}`}};
F.ny=ny;
const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?`${+m[1]}/${+m[2]}/${String(+m[3]%100).padStart(2,'0')}`:''};
const key=s=>{const m=md(s).split('/');return m.length===3?(+m[2])*10000+(+m[0])*100+(+m[1]):Infinity};
const MON=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const wdOf=s=>{const m=md(s).split('/');return DAY[new Date(Date.UTC(2000+ +m[2],m[0]-1,+m[1])).getUTCDay()]};
const dLabel=s=>{const m=md(s).split('/');return `${wdOf(s)} ${MON[+m[0]]} ${+m[1]}`};
const all=()=>[].concat(window.ROUNDS||[],window.PENDING||[],window.UPCOMING||[]);
const isWE=n=>n.wd==='Sat'||n.wd==='Sun';
/* market state on New York's clock (holidays not known: flagged in REPORT) */
F.phase=t=>{const n=ny(t),m=n.h*60+n.mi;if(isWE(n))return 'wkend';if(m>=9*60+30&&m<16*60)return 'am';if(m>=16*60&&m<16*60+30)return 'close';if(m>=16*60+30&&m<20*60)return 'after';return 'night'};
const names=(rs,k=2)=>rs.slice(0,k).map(r=>r.co).join(', ')+(rs.length>k?` +${rs.length-k}`:'');
const nameT=(rs,k=2)=>rs.slice(0,k).map(r=>`${r.co} (${r.ticker})`).join(', ')+(rs.length>k?` +${rs.length-k}`:'');
const hasCalls=r=>(r.calls||[]).length>0;
const winNm=w=>{if(!w||/NO/.test(w))return 'Nobody';return w.split(/,\s*|\s*&\s*/).map(x=>NM[x.trim()]||x).join(' & ')};
/* what the room's boards say at time t */
F.model=t=>{const n=ny(t),today=n.mdy,tk=key(today),ph=F.phase(t),A=all();
  const due=A.filter(r=>md(r.called)===today),dueIn=due.filter(hasCalls);
  const gradedToday=A.filter(r=>md(r.resolves)===today);
  const after=ph==='after'||ph==='night'&&n.h>=16;
  const fut=A.filter(r=>!(window.ROUNDS||[]).includes(r)&&r.resolves&&(key(r.resolves)>tk||(key(r.resolves)===tk&&!after&&ph!=='close')));
  const nk=Math.min(...fut.map(r=>key(r.resolves)));const nextG=fut.filter(r=>key(r.resolves)===nk);
  const callsFut=A.filter(r=>!hasCalls(r)&&r.called&&key(r.called)>=tk&&!(key(r.called)===tk&&after));
  const ck=Math.min(...callsFut.map(r=>key(r.called)));const nextC=callsFut.filter(r=>key(r.called)===ck);
  const bell=new Date(t);let toBell='';{const left=(16*60-(n.h*60+n.mi))*60-n.s;if(ph==='am'&&gradedToday.length){const h=Math.floor(left/3600),m=Math.floor(left%3600/60);toBell=`${h}h ${String(m).padStart(2,'0')}m`}}
  const res=gradedToday.filter(r=>r.out);const dW=nextC.length?(ck===tk?'today':wdOf(nextC[0].called)):'';const gW=nextG.length?(nk===tk?'today':wdOf(nextG[0].resolves)):'';
  /* each line: [label, value, class, logos] ; logos print in chalk/ink on the slate */
  let title,lines=[];
  if(ph==='am'){title=n.h<9||(n.h===9&&n.mi<30)?'Before the open':'Market open';
    if(due.length){lines.push(['Due today',`${dueIn.length} of ${due.length} in`,dueIn.length===due.length?'fxU':'fxD']);lines.push(['','','',due])}
    else lines.push(['No predictions due today','','']);
    lines.push(gradedToday.length?['Bell in',toBell,'']:['Next bell',`${gW} 4 pm`,'']);}
  else if(ph==='close'){title='The bell';
    if(gradedToday.length){lines.push(['Grading now',`${gradedToday.length} rounds`,'']);lines.push(['','','',gradedToday])}else lines.push(['No rounds graded today','','']);
    lines.push(['Results','in a moment','']);}
  else if(ph==='after'){title='After the bell';
    if(res.length){lines.push(['Graded today',`${res.length} rounds`,'']);lines.push(['','','',res.slice().sort((x,y)=>Math.abs(y.a)-Math.abs(x.a)),1])}else lines.push(['No rounds graded today','','']);
    lines.push(['Predictions due',dW,'']);}
  else {title=ph==='wkend'?'Weekend':'Overnight';
    lines.push(['Predictions due',`${dW} · ${nextC.length}`,'']);lines.push(['','','',nextC]);
    lines.push(['Next bell',`${gW} 4 pm`,'']);}
  return {n,ph,title,lines,due,dueIn,gradedToday,nextG,nextC}};

/* where the painting left its surfaces blank (fractions of the plate), measured on the morning plates */
const G={n:{p:{ar:'2/3.556',clock:[.39,.138,.64,.279],slate:[.31,.325,.74,.49],bell:[.17,.30,.26,.39]},w:{ar:'16/9',clock:[.437,.095,.589,.33],slate:[.318,.43,.727,.67],bell:[.258,.27,.331,.41]}},
         l:{p:{ar:'2/3.556',clock:[.374,.163,.624,.30],slate:[.30,.345,.735,.505],bell:[.114,.377,.254,.467]},w:{ar:'16/9',clock:[.448,.093,.567,.32],slate:[.352,.35,.664,.61],bell:[.244,.24,.331,.40]}}};
const box=b=>`left:${b[0]*100}%;top:${b[1]*100}%;width:${(b[2]-b[0])*100}%;height:${(b[3]-b[1])*100}%`;
function clockSVG(s){const ink=s==='n'?'#15110c':'#04070e',acc=s==='n'?'#b8860b':'#c8901a';let t='';
  for(let i=0;i<60;i++){const a=i*6*Math.PI/180,big=i%5===0,r1=big?(s==='l'?74:78):86,r2=92;if(!big&&s==='l')continue;
    t+=`<line x1="${(Math.sin(a)*r1).toFixed(1)}" y1="${(-Math.cos(a)*r1).toFixed(1)}" x2="${(Math.sin(a)*r2).toFixed(1)}" y2="${(-Math.cos(a)*r2).toFixed(1)}" stroke="${ink}" stroke-width="${big?(s==='l'?7:3.6):1.3}" stroke-linecap="${s==='l'?'butt':'round'}"/>`}
  const hand=s==='l'?{h:'M-6 10 L-3 -46 L5 -52 L6 10 Z',m:'M-4 12 L-2 -74 L4 -80 L4 12 Z'}:{h:'M-4.5 10 Q-3 -20 0 -50 Q3 -20 4.5 10 Z',m:'M-3 12 Q-1.6 -30 0 -78 Q1.6 -30 3 12 Z'};
  return `<svg viewBox="-100 -100 200 200" aria-hidden="true">${t}<text y="36" text-anchor="middle" font-family="${s==='l'?'Kanit':'Special Elite'}" font-weight="${s==='l'?900:400}" font-style="${s==='l'?'italic':'normal'}" font-size="${s==='l'?11:10}" letter-spacing="2" fill="${ink}">NEW YORK</text>
   <g class="hh"><path d="${hand.h}" fill="${ink}"/></g><g class="mh"><path d="${hand.m}" fill="${ink}"/></g><g class="sh"><path d="M-1 18 L0 -86 L1 18 Z" fill="${acc}"/><circle r="4.5" fill="${acc}"/></g><circle r="2.4" fill="${ink}"/></svg>`}

/* ---------- the floor ---------- */
F.floor={mount(host,o={}){const s=o.style||'n',wide=!!o.wide,g=G[s][wide?'w':'p'],sfx=wide?'-w':'';
  const sec=el(`<section class="fx fx-${s}${wide?' fx-wide':''}" aria-label="The floor"><h2 class="fx-sr">The floor, New York time</h2>
    <div class="fx-sc" style="aspect-ratio:${wide?g.ar:'1/1.6'}"><div class="fx-stg">
      ${['am','close','after','night','wkend'].map(k=>`<img class="fx-pl fx-pl-${k}" src="${IMG}fl-${s}-${k}${sfx}.jpg" alt="" style="opacity:0">`).join('')}
      <div class="fx-clk" style="${box(g.clock)}">${clockSVG(s)}</div>
      <div class="fx-slate" style="${box(g.slate)}"><b class="fx-st"></b><div class="fx-ln"></div></div>
      <svg class="fx-ring" style="${box([g.bell[0]-.05,g.bell[1]-.02,g.bell[2]+.05,g.bell[3]+.02])}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><path d="M8 30 Q2 50 8 70 M16 22 Q7 50 16 78 M92 30 Q98 50 92 70 M84 22 Q93 50 84 78"/></svg>
      <button class="fx-hit" style="${box(g.bell)}" aria-label="Ring the bell"></button>
      </div><p class="fx-sr" aria-live="polite"></p></div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.fx-sc'),stg=sec.querySelector('.fx-stg'),st=sec.querySelector('.fx-st'),ln=sec.querySelector('.fx-ln'),sr=sec.querySelector('p.fx-sr'),rg=sec.querySelector('.fx-ring');
  /* on a phone the stage is the plate at 125%, framed on the slate, so the board reads at arm's length */
  const fit=()=>{const W=sc.clientWidth;if(wide){stg.style.cssText='position:absolute;inset:0';sc.style.setProperty('--W',W);return}
    const sw=W*1.25,sh=sw*16/9;stg.style.cssText=`position:absolute;width:${sw}px;height:${sh}px;left:${(.5-.525*1.25)*W}px;top:${-.133*W}px`;sc.style.setProperty('--W',sw)};fit();addEventListener('resize',fit);
  const hh=sec.querySelector('.hh'),mh=sec.querySelector('.mh'),sh=sec.querySelector('.sh');let ph='',sig='',used=false;
  const ring=()=>{used=true;rg.classList.remove('cue');void rg.offsetWidth;rg.classList.add('on');setTimeout(()=>rg.classList.remove('on'),RM?0:1600)};
  sec.querySelector('.fx-hit').onclick=ring;
  const cue=setInterval(()=>{if(used||RM||document.hidden)return;rg.classList.remove('cue');void rg.offsetWidth;rg.classList.add('cue')},6000);
  const tick=()=>{const t=F.now(),M=F.model(t),n=M.n;
    hh.setAttribute('transform',`rotate(${((n.h%12)+n.mi/60)*30})`);mh.setAttribute('transform',`rotate(${(n.mi+n.s/60)*6})`);sh.setAttribute('transform',`rotate(${n.s*6})`);
    if(M.ph!==ph){ph=M.ph;sc.querySelectorAll('.fx-pl').forEach(i=>i.style.opacity=i.classList.contains('fx-pl-'+ph)?1:0);sec.dataset.ph=ph}
    const s2=JSON.stringify([M.title,M.lines]);if(s2!==sig){sig=s2;st.textContent=M.title;
      ln.innerHTML=M.lines.map(l=>l[3]?`<p class="fxLg">${l[3].slice(0,3).map(r=>`<span class="fxL"><i class="fxM" style="--lg:url(${IMG}lg/${r.ticker}.png)" title="${esc(r.co)}"></i>${l[4]?`<em class="${r.a>0?'fxU':'fxD'}">${esc(r.out)}</em>`:''}</span>`).join('')}${l[3].length>3?`<span class="fxMore">+${l[3].length-3}</span>`:''}</p>`:`<p><span class="fxK">${esc(l[0])}</span>${l[1]?` <span class="fxV ${l[2]}">${esc(l[1])}</span>`:''}</p>`).join('');
      sr.textContent=`New York ${String(n.h).padStart(2,'0')}:${String(n.mi).padStart(2,'0')}. ${M.title}. `+M.lines.map(l=>l[3]?l[3].map(r=>r.co+(l[4]?' '+r.out:'')).join(', '):l.slice(0,2).join(' ')).join('. ')}
    F.floor.last=M};
  tick();sec._iv=setInterval(tick,1000);return sec}};

/* the model marks printed in one ink (the site's own MODELS paths) */
const mark=(m,c)=>{const M=(window.MODELS||{})[m];if(!M)return '';return `<svg class="fx-mk" viewBox="0 0 24 24" aria-hidden="true"><path fill="${c}"${M.fr?` fill-rule="${M.fr}"`:''} d="${M.d}"/>${M.dot?`<path fill="${c}" d="${M.dot}"/>`:''}</svg>`};
const coLogo=r=>`media/logos/${r.ticker}.png`;
const callTxt=c=>{const up=/UP/.test(c[1]);return {up,t:(up?'▲':'▼')+c[1].replace(/UP |DOWN /,'')}};

/* ---------- every upcoming round to swipe: one black betting card each ---------- */
F.rounds={mount(host,o={}){const s=o.style||'n';const R=[].concat(window.PENDING||[],window.UPCOMING||[]).filter(r=>r.called).sort((a,b)=>key(a.resolves)-key(b.resolves)||a.n-b.n);
  const ink=s==='n'?'#efe6cf':'#f8f0d9';
  const cards=R.map(r=>{const c={};(r.calls||[]).forEach(x=>c[x[0]]=x);
    const ai=ORD.map(k=>{const x=c[k];const v=x?callTxt(x):null;return `<li>${mark(k,ink)}<i class="${v?(v.up?'fxU':'fxD'):'fxQ'}">${v?esc(v.t):'?'}</i></li>`}).join('');
    return `<a class="fx-rc" href="#/round/${r.n}" aria-label="Round ${r.n}, ${esc(r.co)}"><span class="fx-rn">R${r.n}</span><i class="fx-lg fxM" style="--lg:url(${IMG}lg/${r.ticker}.png)"></i>
      <b class="fx-co">${esc(r.co)}</b><span class="fx-tk">${esc(r.ticker)}</span><ul class="fx-ai">${ai}</ul>
      <span class="fx-due">${hasCalls(r)?'Calls in':'Calls due '+wdOf(r.called)}</span><span class="fx-gr">Graded ${dLabel(r.resolves)}</span></a>`}).join('');
  const sec=el(`<section class="fxr fx-${s}" aria-label="Every round to come"><div class="fxr-h"><b>On the card</b><small>${R.length} rounds to come · swipe</small></div><div class="fxr-s">${cards}</div></section>`);
  host.appendChild(sec);return sec}};

/* ---------- Your call: the betting window (this browser only) ---------- */
const KEY='ez-yourcall';
const load=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'null');return v&&Array.isArray(v.calls)?v:{v:1,calls:[]}}catch(e){return {v:1,calls:[]}}};
const save=v=>{try{localStorage.setItem(KEY,JSON.stringify(v));return true}catch(e){return false}};
F.mem=null;/* fallback when storage is blocked */
const store=()=>F.mem||(F.mem=load());
const graded=n=>(window.ROUNDS||[]).find(r=>r.n===n);
F.score=c=>{const r=graded(c.n);if(!r||!r.out)return null;const right=(c.dir==='up')===(r.a>0);const cs=(r.calls||[]);
  const wrong=cs.filter(x=>/UP/.test(x[1])!==(r.a>0)).length;return {r,right,beat:right?wrong:0,of:cs.length}};
F.offer=t=>{const tk=key(ny(t).mdy);return [].concat(window.PENDING||[],window.UPCOMING||[]).filter(r=>!hasCalls(r)&&r.called&&key(r.called)>=tk).sort((a,b)=>key(a.called)-key(b.called)||a.n-b.n)[0]||null};
/* homography: map an element of w x h onto 4 points (tl,tr,br,bl) in its parent's px */
function H(w,h,p){const s=[[0,0],[w,0],[w,h],[0,h]];const A=[],b=[];
  for(let i=0;i<4;i++){const [x,y]=s[i],[u,v]=p[i];A.push([x,y,1,0,0,0,-u*x,-u*y]);b.push(u);A.push([0,0,0,x,y,1,-v*x,-v*y]);b.push(v)}
  for(let i=0;i<8;i++){let m=i;for(let j=i+1;j<8;j++)if(Math.abs(A[j][i])>Math.abs(A[m][i]))m=j;[A[i],A[m]]=[A[m],A[i]];[b[i],b[m]]=[b[m],b[i]];
    for(let j=i+1;j<8;j++){const f=A[j][i]/A[i][i];for(let k=i;k<8;k++)A[j][k]-=f*A[i][k];b[j]-=f*b[i]}}
  const x=Array(8);for(let i=7;i>=0;i--){let s2=b[i];for(let k=i+1;k<8;k++)s2-=A[i][k]*x[k];x[i]=s2/A[i][i]}
  const [a,b2,c,d,e,f,g,h2]=x;return `matrix3d(${a},${d},0,${g},${b2},${e},0,${h2},0,0,1,0,${c},${f},0,1)`}
F.H=H;
/* the window's blank surfaces: the four AIs' cards behind the grille, the visitor's card on the counter (a quad, tl tr br bl), the two stamps */
const WG={n:{p:{img:'win2-n',ar:'3/4',ai:[[.062,.315,.25,.55],[.297,.315,.483,.55],[.513,.315,.70,.55],[.743,.315,.933,.55]],slip:[[.25,.79],[.728,.79],[.783,.94],[.19,.94]],up:[.763,.73,.853,.875],dn:[.875,.74,.963,.88]},
              w:{img:'win2-n-w',ar:'16/9',ai:[[.2,.267,.313,.582],[.346,.267,.459,.582],[.4975,.267,.6125,.582],[.656,.267,.773,.582]],slip:[[.30,.778],[.669,.778],[.70,.944],[.266,.944]],up:[.71,.707,.754,.889],dn:[.778,.707,.825,.889]},
              c:{img:'ctr-n',ar:'16/9',z:[1.35,.52,.72,'16/10'],slip:[[.275,.648],[.74,.648],[.733,.85],[.233,.85]],up:[.74,.59,.785,.82],dn:[.81,.6,.855,.81]}},
          l:{p:{img:'win2-l',ar:'3/4',z:[1.3,.47,.6,'3/4'],ai:[[.237,.378,.353,.535],[.372,.378,.488,.535],[.505,.378,.625,.535],[.642,.378,.758,.535]],slip:[[.25,.729],[.642,.729],[.667,.8125],[.203,.8125]],up:[.658,.656,.733,.785],dn:[.75,.656,.83,.785]},
              w:{img:'win2-l-w',ar:'16/9',ai:[[.259,.256,.3625,.53],[.384,.256,.4875,.53],[.5125,.256,.615,.53],[.6375,.256,.744,.53]],slip:[[.30,.796],[.606,.796],[.615,.916],[.275,.916]],up:[.6375,.689,.694,.9],dn:[.715,.689,.79,.9]},
              c:{img:'ctr-l',ar:'16/9',z:[1.3,.5,.72,'16/10'],slip:[[.183,.595],[.655,.595],[.697,.85],[.16,.85]],up:[.713,.52,.788,.78],dn:[.80,.52,.888,.78]}}};
F.call={mount(host,o={}){const s=o.style||'n',v=o.counter?'c':o.wide?'w':'p',g=WG[s][v];
  const sec=el(`<section class="fxc fx-${s} fxc-${v}" aria-label="Your call">${o.counter?'':'<div class="fxc-h"><b>Your call</b><small>Beat the four AIs. Saved in this browser only.</small></div>'}
    <div class="fxc-sc" style="aspect-ratio:${g.ar}"><div class="fxc-stg"><img src="${IMG}${g.img}.jpg" alt="">
    ${g.ai?g.ai.map((b,i)=>`<div class="fxc-ai" style="${box(b)}" data-m="${ORD[i]}"></div>`).join(''):''}
    <div class="fxc-slip"></div>
    <button class="fxc-hit up" style="${box(g.up)}" aria-label="Stamp it up"></button><button class="fxc-hit dn" style="${box(g.dn)}" aria-label="Stamp it down"></button></div>
    <p class="fx-sr" aria-live="polite"></p></div></section>`);
  host.appendChild(sec);const sc=sec.querySelector('.fxc-sc'),stg=sec.querySelector('.fxc-stg'),slip=sec.querySelector('.fxc-slip'),sr=sec.querySelector('p.fx-sr');
  /* on a phone the stage is the plate enlarged around its counter (z = [scale, centre x, centre y, frame]) */
  const zoom=g.z&&innerWidth<700;if(zoom)sc.style.aspectRatio=g.z[3];
  const place=()=>{const W0=sc.clientWidth,H0=sc.clientHeight;let W=W0,Hh=H0;
    if(zoom){const [k,cx,cy]=g.z,[a,b]=g.ar.split('/').map(Number);W=W0*k;Hh=W*b/a;const top=Math.max(Math.min(cy*Hh-H0/2,Hh-H0),0);stg.style.cssText=`position:absolute;width:${W}px;height:${Hh}px;left:${(.5-cx*k)*W0}px;top:${-top}px`}
    else stg.style.cssText='position:absolute;inset:0';
    sc.style.setProperty('--W',W);const sw=220,shh=sw*.4;slip.style.width=sw+'px';slip.style.height=shh+'px';
    slip.style.transform=H(sw,shh,g.slip.map(([x,y])=>[x*W,y*Hh]))};
  const ink=s==='n'?'#efe6cf':'#f8f0d9';
  const draw=(fresh)=>{const t=F.now(),st=store(),last=st.calls[st.calls.length-1],sc0=last&&F.score(last);
    const off=F.offer(t);const pend=last&&!sc0&&!graded(last.n)?last:null;
    /* which round the window is about: a pending call of yours, else your last result if it graded since, else the next to call */
    let mode,R;if(pend){mode='called';R=[].concat(window.PENDING||[],window.UPCOMING||[]).find(r=>r.n===pend.n)||{n:pend.n,co:pend.co,ticker:pend.ticker,resolves:pend.resolves}}
    else if(sc0&&!last.seen){mode='result';R=sc0.r}else{mode=off?'open':'none';R=off}
    sec.dataset.mode=mode;
    const tally=st.calls.map(F.score).filter(Boolean);const tr=tally.filter(x=>x.right).length,tb=tally.reduce((a,x)=>a+x.beat,0),to=tally.reduce((a,x)=>a+x.of,0);
    const tl=tally.length?`This browser: ${tr} of ${tally.length} right · beat ${tb} of ${to} AI calls`:'';
    sec.querySelectorAll('.fxc-ai').forEach(d=>{const m=d.dataset.m,c=R&&(R.calls||[]).find(x=>x[0]===m);let body;
      if(!c)body=`<i class="fxQ">Sealed</i><small>${R&&R.called?'due '+wdOf(R.called):''}</small>`;
      else{const k=callTxt(c),ok=mode==='result'?(k.up===(R.a>0)):null;body=`<i class="${k.up?'fxU':'fxD'}">${esc(k.t)}</i>${ok==null?'':`<em class="fxc-st ${ok?'fxU':'fxD'}">${ok?'Right':'Wrong'}</em>`}`}
      d.innerHTML=`${mark(m,ink)}<b>${NM[m]}</b>${body}`});
    let h;if(mode==='open')h=`<span class="fxA">${esc(R.co)} <small>(${esc(R.ticker)})</small></span><span class="fxB">Up or down by ${wdOf(R.resolves)}'s close?</span><span class="fxC fxCue">Green stamp up · red stamp down</span>`;
    else if(mode==='called'){const up=pend.dir==='up';h=`<span class="fxA">${esc(R.co)} <small>(${esc(R.ticker)})</small></span><span class="fxB">Graded ${R.resolves?wdOf(R.resolves):''} at the close</span><span class="fxC">Come back after the bell</span><em class="fxc-imp ${up?'fxU':'fxD'}">${up?'Up':'Down'}</em>`}
    else if(mode==='result'){const x=sc0,up=last.dir==='up';h=`<span class="fxA">${esc(R.co)} <b class="${R.a>0?'fxU':'fxD'}">${esc(R.out)}</b></span><span class="fxB">${x.right?`You beat ${x.beat} of ${x.of}`:'Wrong way'}</span><span class="fxC fxT">${tr} of ${tally.length} right so far</span>${off?`<span class="fxC fxCue">Next: ${esc(off.co)}</span>`:''}<em class="fxc-imp ${up?'fxU':'fxD'}">${up?'Up':'Down'}</em>`}
    if(o.counter&&mode==='open')h=`<span class="fxA">Your call: ${esc(R.co)}</span><span class="fxB">Up or down by ${wdOf(R.resolves)}'s close?</span><span class="fxC fxCue">Green stamp up · red stamp down</span>`;
    if(mode==='none')h=`<span class="fxA">No round open</span><span class="fxB">${tl}</span>`;
    slip.innerHTML=h;place();
    if(fresh==='reveal'&&!RM){/* after the close: each AI's card is stamped Right or Wrong, one by one, then your result lands */
      sec.querySelectorAll('.fxc-st').forEach((e,i)=>e.animate([{transform:'rotate(-8deg) scale(2.4)',opacity:0},{transform:'rotate(-8deg) scale(.92)',opacity:1,offset:.7},{transform:'rotate(-8deg) scale(1)',opacity:1}],{duration:340,delay:400+i*420,fill:'backwards',easing:'cubic-bezier(.2,0,.2,1)'}));
      [...slip.children].forEach((e,i)=>e.animate([{opacity:0},{opacity:1}],{duration:300,delay:2200+i*160,fill:'backwards'}))}
    if(fresh===true){const im=slip.querySelector('.fxc-imp');if(im&&!RM)im.animate([{transform:'rotate(-9deg) scale(2.2)',opacity:0},{transform:'rotate(-9deg) scale(.9)',opacity:.95,offset:.7},{transform:'rotate(-9deg) scale(1)',opacity:.92}],{duration:380,easing:'cubic-bezier(.2,0,.2,1)'})}
    sr.textContent=slip.textContent;
    sec.querySelectorAll('.fxc-hit').forEach(b=>b.disabled=!(mode==='open'||mode==='result'&&off));
    F.call.check={mode,round:R&&R.n,tally:tl}};
  sec.querySelectorAll('.fxc-hit').forEach(b=>b.onclick=()=>{const t=F.now(),R=F.offer(t);if(!R)return;const st=store();
    st.calls=st.calls.filter(c=>c.n!==R.n);st.calls.push({n:R.n,co:R.co,ticker:R.ticker,resolves:R.resolves,dir:b.classList.contains('up')?'up':'down',at:t});save(st);draw(true);
    document.querySelectorAll('.fxc').forEach(x=>x!==sec&&x._draw&&x._draw())});
  sec._draw=draw;draw();addEventListener('resize',place);requestAnimationFrame(place);return sec}};
})();
