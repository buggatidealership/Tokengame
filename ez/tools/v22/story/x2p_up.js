/* ===== H39 UPCOMING, "Departures" (owner, 2026-11-03: "A departure for now. HOT UPCOMING PREDICTIONS should have the large companies. All
   diegetically integrated."; take A of round H37, tools/concepts/worlds/comic/story/h/h37up, ported and fixed). The Upcoming tab is the
   exchange's split-flap departures board in black enamel and brass:
   1 THE NEXT BELL: the painted head (media/up-h39-head-*.jpg) carries the close's day, date and city on its brass nameplate and counts down on
     its four big flaps (number, unit, number, unit; once a minute); the enamel under it says "The close grades every trade. N of M are in."
     with the counts on flaps; then one row per company graded at that close: its mark in its own colours, the name and ticker on flaps, its
     state printed on the enamel, and four trade flaps (the AI's mark, LONG green or SHORT red, the size; the AI's name and a dash while due).
   2 a torn comic-paper gutter (the page's __x2pTears recipe; its drawing is private to x2p_more.js, so a copy draws it here unless
     window.__x2pTear is exported).
   3 HOT UPCOMING PREDICTIONS lettered on the second board's brass header plate: the big names first (Mag 7, then market cap from CAPS; four)
     as large flap rows, then every other round still to come, day by day under brass rails (a brass day plate, the line under it on the enamel).
   One type system, set by the material: brass plates are engraved in Bangers (titles and headers), flaps carry Anton (numbers and flap
   letters), the enamel is printed in Shantell Sans (words). Company logos keep their own colours (tile / plate / bare, measured per file).
   Every row is one keyboard-reachable link to its round (#/round/n). No motion but the minute flaps; nothing in perspective.
   Every word and number comes from ez-data.js (ROUNDS / PENDING / UPCOMING / CAPS / CO_LOGOS / RMETA / MODELS / CONFIG) through model()
   (window.__u3). X2's Upcoming (upTab's fight night and X2's list) stays in the DOM, hidden, so routing and #/round links keep working.
   Re-mounted each time the router draws the tab; the root keeps the class u3-root (x2plus.js lifts the cover on it). A failure is kept in
   window.__u3Err and the fight night shows again. Paintings (Hedra gpt-image-2, round H37, crops): media/up-h39-head-1x.jpg
   media/up-h39-head-2x.jpg media/up-h39-foot.jpg media/up-h39-rail.jpg media/up-h39-side-l.jpg media/up-h39-side-r.jpg media/up-h39-flap.jpg
   media/up-h39-plate.jpg; the follow panel at the foot keeps media/p5-panel.jpg. ===== */
(function(){
const D=document,H=D.documentElement;H.classList.add('u3-live');
const MCOL=window.X2P_MCOL=window.X2P_MCOL||{GROK:'#e4e0d6',CLAUDE:'#ef8a55',GPT:'#b18cff',KIMI:'#58b7ff'};
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const pd=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?{y:2000+(+m[3]%100),mo:+m[1],d:+m[2]}:null};
const key=p=>p?p.y+'-'+String(p.mo).padStart(2,'0')+'-'+String(p.d).padStart(2,'0'):'9999';
const dow=p=>new Date(Date.UTC(p.y,p.mo-1,p.d)).getUTCDay();
/* the close of a round's exchange (the page's own rule, x2plus.js xcloseAt): 4pm New York, Seoul/Tokyo 15:30, Taipei 13:30, Hong Kong 16:00,
   London 16:30, the euro exchanges 17:30, local time */
function nyClose(p){const nov=new Date(Date.UTC(p.y,10,1)),fs=1+(7-nov.getUTCDay())%7,mar=new Date(Date.UTC(p.y,2,1)),ss=1+(7-mar.getUTCDay())%7+7;
  const dst=(p.mo>3&&p.mo<11)||(p.mo===3&&p.d>=ss)||(p.mo===11&&p.d<fs);return Date.UTC(p.y,p.mo-1,p.d,dst?20:21)}
function closeAt(s,tk){const p=pd(s);if(!p)return null;const x=(String(tk||'').match(/\.([A-Z]+)$/)||[])[1],y=p.y,mo=p.mo,d=p.d;
  if(x==='KS'||x==='KQ'||x==='T')return Date.UTC(y,mo-1,d,6,30);if(x==='TW')return Date.UTC(y,mo-1,d,5,30);if(x==='HK')return Date.UTC(y,mo-1,d,8);
  if(['L','AS','DE','SW','PA','MI','MC'].includes(x)){const ls=mm=>{const t=new Date(Date.UTC(y,mm,0));return t.getUTCDate()-t.getUTCDay()},
    su=(mo>3&&mo<10)||(mo===3&&d>=ls(3))||(mo===10&&d<ls(10)),h=(x==='L'?16:17)-1-(su?1:0);return Date.UTC(y,mo-1,d,h+(x==='L'?1:0),30)}
  return nyClose(p)}
const exch=tk=>{const x=(String(tk||'').match(/\.([A-Z]+)$/)||[])[1];return {KS:'Seoul',KQ:'Seoul',T:'Tokyo',TW:'Taipei',HK:'Hong Kong',L:'London',AS:'Amsterdam',DE:'Frankfurt',SW:'Zurich',PA:'Paris',MI:'Milan',MC:'Madrid'}[x]||'New York'};
let NYF=null;try{NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric'})}catch(e){}
function nyToday(){const t=Date.now();if(!NYF){const g=new Date(t-5*36e5);return {y:g.getUTCFullYear(),mo:g.getUTCMonth()+1,d:g.getUTCDate()}}
  const o={};NYF.formatToParts(new Date(t)).forEach(q=>o[q.type]=+q.value);return {y:o.year,mo:o.month,d:o.day}}
const dayName=(p,today)=>{const k=key(p),tk=key(today);if(k===tk)return 'Today';const t1=new Date(Date.UTC(today.y,today.mo-1,today.d+1));
  if(k===key({y:t1.getUTCFullYear(),mo:t1.getUTCMonth()+1,d:t1.getUTCDate()}))return 'Tomorrow';return WD[dow(p)]};
const md=p=>p?MO[p.mo-1]+' '+p.d:'';
const left=ms=>{if(ms<=0)return null;const m=Math.ceil(ms/6e4);return {d:Math.floor(m/1440),h:Math.floor(m%1440/60),m:m%60,s:Math.floor(ms/1000)%60}};
const logoF=t=>{const L=(window.CO_LOGOS||{})[String(t).toUpperCase()];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[String(t).toUpperCase()]||{}).dark;
const cap=t=>(window.CAPS||{})[t]||0,m7=n=>!!((window.RMETA||{})[n]||{}).mag7;
const nm=m=>{const n=(window.MODELS[m]&&window.MODELS[m].name)||m;return n.length<=3?n:n.charAt(0)+n.slice(1).toLowerCase()};
function model(){
  const P=window.__x2pPnl?window.__x2pPnl():null,A=P?P.A:{};
  const KEYS=(window.MODEL_KEYS&&window.MODEL_KEYS.length?window.MODEL_KEYS:Object.keys(window.MODELS)).slice();
  const ORDER=KEYS.slice().sort((a,b)=>((A[b]||{}).pnl||0)-((A[a]||{}).pnl||0));
  const today=nyToday(),tk=key(today),now=Date.now();
  const fut=[].concat((window.PENDING||[]).map(u=>Object.assign({},u)),(window.UPCOMING||[]).map(u=>Object.assign({calls:[]},u))).map(u=>{
    const r=pd(u.resolves),c=pd(u.called);return Object.assign(u,{rp:r,cp:c,k:key(r||c),dated:!!r,close:r?closeAt(u.resolves,u.ticker):null,
      ex:exch(u.ticker),trades:(u.calls||[]).slice().sort((a,b)=>ORDER.indexOf(a.m)-ORDER.indexOf(b.m)),mag7:m7(u.n),bet:u.ticker==='NVDA',cap:cap(u.ticker),
      logo:logoF(u.ticker),dark:dark(u.ticker)})});
  fut.forEach(u=>{u.nIn=u.trades.length;u.missing=ORDER.filter(m=>!u.trades.some(c=>c.m===m));u.state=u.nIn>=ORDER.length?'in':u.nIn?'coming':'due'});
  const byCap=(a,b)=>(b.bet-a.bet)||(b.cap-a.cap)||(a.n-b.n);
  /* the next bell: the soonest close still to come among the dated rounds; everything graded at that close */
  const dated=fut.filter(u=>u.dated).sort((a,b)=>a.close-b.close||byCap(a,b));
  const nx=dated.find(u=>u.close>now);
  const bell=nx?{k:nx.k,p:nx.rp,close:nx.close,ex:nx.ex,rounds:dated.filter(u=>u.k===nx.k).sort(byCap)}:null;
  if(bell){bell.nIn=bell.rounds.reduce((a,u)=>a+u.nIn,0);bell.nAll=bell.rounds.length*ORDER.length;bell.day=dayName(bell.p,today);bell.date=md(bell.p);
    bell.exs=[...new Set(bell.rounds.map(u=>u.ex))];bell.mixed=bell.exs.length>1}
  /* the rest of the season, day by day (a day = the close that grades it; a round with no grading date yet sits on its trade day) */
  const rest=fut.filter(u=>!bell||u.k!==bell.k||!u.dated).filter(u=>!(u.dated&&u.close<=now));
  const days={};rest.forEach(u=>{(days[u.k]=days[u.k]||[]).push(u)});
  const DAYS=Object.keys(days).sort().map(k=>{const rs=days[k].sort(byCap),p=rs[0].rp||rs[0].cp;return {k,p,day:dayName(p,today),date:md(p),rounds:rs,
    dueOnly:rs.every(u=>!u.dated),past:k<tk}});
  /* the last bell: the newest graded close, as slabs */
  const G=(window.ROUNDS||[]).filter(r=>typeof r.a==='number'&&!isNaN(r.a));
  const lk=G.reduce((a,r)=>{const k=key(pd(r.resolves));return k>a?k:a},'');
  const last=G.filter(r=>key(pd(r.resolves))===lk).sort((a,b)=>cap(b.ticker)-cap(a.ticker)||a.n-b.n);
  const bet=fut.find(u=>u.bet);
  return {ORDER,A,P,today,tk,now,fut,bell,DAYS,last,lastP:pd(last[0]&&last[0].resolves),G,bet,x:(window.CONFIG||{}).x||'https://x.com/earningszn'}
}
/* ---------- company logos in their own colours ---------- */
/* mode per logo file: 'tile' (drawn on its own opaque square: shown as that tile, corners rounded), 'bare' (reads on the dark die as drawn,
   or made for a dark ground), 'plate' (its ink would vanish on the die: a small cream plate behind it). Measured once per file on a canvas. */
const LM={},LT={};
const lin=c=>{c/=255;return c<=.04045?c/12.92:Math.pow((c+.055)/1.055,2.4)};
function prepLogos(us){return Promise.all([...new Set(us.filter(u=>u.logo&&!(u.logo in LM)).map(u=>u.logo))].map(src=>new Promise(res=>{
  const dk=us.some(u=>u.logo===src&&u.dark),im=new Image();
  im.onload=()=>{try{const w0=im.naturalWidth,h0=im.naturalHeight,k=Math.min(1,128/Math.max(w0,h0)),w=Math.max(4,Math.round(w0*k)),h=Math.max(4,Math.round(h0*k));
    const c=D.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0,w,h);const a=x.getImageData(0,0,w,h).data;
    const px=(i,j)=>{const q=(j*w+i)*4;return [a[q],a[q+1],a[q+2],a[q+3]]},cs=[px(1,1),px(w-2,1),px(1,h-2),px(w-2,h-2)];
    const tile=cs.every(q=>q[3]>250&&Math.abs(q[0]-cs[0][0])+Math.abs(q[1]-cs[0][1])+Math.abs(q[2]-cs[0][2])<24);
    if(tile){LM[src]='tile';return res()}
    let n=0,lo=0;if(!dk)for(let q=0;q<a.length;q+=4){if(a[q+3]<128)continue;n++;const L=.2126*lin(a[q])+.7152*lin(a[q+1])+.0722*lin(a[q+2]);if(L<.115)lo++}
    LM[src]=!dk&&n&&lo/n>.3?'plate':'bare';
    /* a transparent file with wide empty margins (Datadog's mark fills 15% of its square) is trimmed to its ink, so every mark reads at the
       same size; done at full size (up to 512px), 4% air kept */
    const f=Math.min(1,512/Math.max(w0,h0)),W2=Math.round(w0*f),H2=Math.round(h0*f),c2=D.createElement('canvas');c2.width=W2;c2.height=H2;const x2=c2.getContext('2d');x2.drawImage(im,0,0,W2,H2);
    const b2=x2.getImageData(0,0,W2,H2).data;let X0=W2,Y0=H2,X1=-1,Y1=-1;for(let j=0;j<H2;j++)for(let i=0;i<W2;i++)if(b2[(j*W2+i)*4+3]>16){if(i<X0)X0=i;if(i>X1)X1=i;if(j<Y0)Y0=j;if(j>Y1)Y1=j}
    if(X1>X0&&Y1>Y0&&((X1-X0+1)*(Y1-Y0+1))<W2*H2*.8){const pw=Math.round(Math.max(X1-X0,Y1-Y0)*.04),cw=X1-X0+1+2*pw,ch=Y1-Y0+1+2*pw,c3=D.createElement('canvas');c3.width=cw;c3.height=ch;
      c3.getContext('2d').drawImage(c2,X0,Y0,X1-X0+1,Y1-Y0+1,pw,pw,X1-X0+1,Y1-Y0+1);LT[src]=c3.toDataURL()}
    }catch(e){LM[src]=LM[src]||'bare'}res()};
  im.onerror=()=>{LM[src]='bare';res()};im.src=src}))).then(()=>{us.forEach(u=>{if(u.logo){u.lm=LM[u.logo]||'bare';if(LT[u.logo])u.logo=LT[u.logo]}})})}
/* html: a company mark as an <img> (NVIDIA as its own green mark) */
const coImg=(u,cls)=>String(u.ticker).toUpperCase()==='NVDA'&&window.NVIDIA_D?`<svg class="${cls||'u3-co'} u3-nv" viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="${window.NVIDIA_D}"/></svg>`:
  u.logo?`<img class="${cls||'u3-co'} u3-lg-${u.lm||'bare'}" src="${u.logo}" alt="" loading="lazy" decoding="async">`:`<b class="${cls||'u3-co'} u3-tkx">${esc(String(u.ticker).split('.')[0])}</b>`;
const coName=u=>{const t=String(u.ticker||''),same=t.replace(/\..*$/,'').toUpperCase()===String(u.co).toUpperCase();return `${esc(u.co)}${same?'':` <small>(${esc(t)})</small>`}`};

/* ---------- a painted stage in the painting's own pixels (the follow panel at the tab's foot): the painting, live text lit on its glass
   (bloom), silkscreen print. No perspective: a flat SVG. ---------- */
let uidN=0;const UID=()=>'u3'+(uidN++).toString(36)+Math.random().toString(36).slice(2,5);
function stage(o){const id=UID(),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0,img=`<image href="${o.img}" x="0" y="0" width="${o.W}" height="${o.H}"/>`;
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]}" height="${g[3]}" rx="${g[4]||0}"/>`).join('');
  return `<svg class="u3-svg ${o.cls||''}" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid meet" ${o.label?`role="img" aria-label="${esc(o.label)}"`:'aria-hidden="true"'} style="aspect-ratio:${w}/${h}">
  <defs><filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||6}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||6)*3.2}" result="b2"/>
   <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".5"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <clipPath id="${id}c">${gl}</clipPath>${o.defs||''}</defs>
  ${img}<g class="u3-under">${o.under||''}</g><g class="u3-lit" filter="url(#${id}g)">${o.lit||''}</g>
  ${gl&&!o.baked?`<image class="u3-glare" href="${o.img}" x="0" y="0" width="${o.W}" height="${o.H}" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare||.45}"/>`:''}
  <g>${o.flat||''}</g>${o.silk?`<g class="u3-silk">${o.silk}</g>`:''}</svg>`}
const T=(x,y,s,str,o)=>{o=o||{};return `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${(+s).toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||'#f8f0d9'}"${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,sans-serif'}"${o.w?` font-weight="${o.w}"`:''}${o.op!=null?` opacity="${o.op}"`:''}${o.tl?` textLength="${o.tl}" lengthAdjust="spacingAndGlyphs"`:''}>${o.raw||esc(str)}</text>`};
const MK=(m,x,y,s,fill)=>{const M=(window.MODELS||{})[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''} transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill||'#f8f0d9'}"/>`};
/* a company mark in its own colours in the big die: the tile as drawn (rounded), a plate behind a dark mark, a bare mark as drawn. Not lit:
   it is printed on the glass, so the bloom stays on the trades. Returns {defs, flat}. */
/* the follow panel (the Overview's own close, media/p5-panel.jpg): the glass says when the next trades drop, the green key is Follow on X */
function follow(M){const nx=M.DAYS.concat(M.bell?[{rounds:M.bell.rounds,p:M.bell.p,day:M.bell.day,date:M.bell.date}]:[]).map(d=>({d,rs:d.rounds.filter(u=>u.state!=='in')})).filter(x=>x.rs.length).sort((a,b)=>key(a.d.p).localeCompare(key(b.d.p)))[0];
  const first=nx?nx.rs.slice().sort((a,b)=>b.cap-a.cap).slice(0,2):[];const S=1.6,g=[136*S,172*S,724*S,288*S];
  let lit=T(800,172*S+92,48,'NEXT TRADES DROP ON X',{a:'middle',c:'#ffb21a',ls:3})+T(800,172*S+218,110,nx?(nx.d.day+' · '+nx.d.date).toUpperCase():'SOON',{a:'middle'})+
    T(800,172*S+300,44,first.map(u=>u.co.toUpperCase()).join(' · ')+(nx&&nx.rs.length>2?' + '+(nx.rs.length-2)+' MORE':''),{a:'middle',c:'#9fd8b4'});
  lit+=T(336*S,660*S-6,46,'FOLLOW',{a:'middle',c:'#eafff1'})+T(336*S,660*S+50,54,'ON X',{a:'middle',c:'#eafff1'})+T(658*S,660*S-6,44,'EVERY',{a:'middle'})+T(658*S,660*S+50,50,'ROUND',{a:'middle'});
  const silk=T(336*S,660*S+186,40,'BEFORE THE REPORT',{a:'middle',c:'#fff6dc'})+T(658*S,660*S+186,40,'SO FAR',{a:'middle',c:'#fff6dc'});
  const crop=[118*S,150*S,882*S,812*S];
  const hit=(x,y,w,h,href,lb,ext)=>`<a class="u3-hit" href="${href}"${ext?' target="_blank" rel="noopener"':''} aria-label="${esc(lb)}" style="left:${((x-crop[0])/(crop[2]-crop[0])*100).toFixed(2)}%;top:${((y-crop[1])/(crop[3]-crop[1])*100).toFixed(2)}%;width:${(w/(crop[2]-crop[0])*100).toFixed(2)}%;height:${(h/(crop[3]-crop[1])*100).toFixed(2)}%"></a>`;
  return `<div class="u3-fol">${stage({img:'media/p5-panel.jpg',W:1600,H:1600,crop,glass:[[g[0],g[1],g[2],g[3],16]],lit,silk,bloom:4,label:'Next trades drop on X'+(nx?': '+nx.d.day+' '+nx.d.date+', '+first.map(u=>u.co).join(', '):'')})}${hit(336*S-150,660*S-150,300,300,M.x,'Follow EZ on X',1)}${hit(658*S-150,660*S-150,300,300,'#/','Every round so far')}</div>`}


/* ---------- H39 Departures: the board ---------- */
const UPC='#3ee07f',DNC='#ff5148',SD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const H39={head1:'media/up-h39-head-1x.jpg',head2:'media/up-h39-head-2x.jpg'};
/* a word on flaps: every letter on its own painted flap (media/up-h39-flap.jpg, CSS), words wrap whole */
const flaps=(s,cls)=>`<span class="ud-f${cls?' '+cls:''}" aria-hidden="true">${String(s).toUpperCase().split(/\s+/).filter(Boolean).map(w=>`<span class="ud-w">${[...w].map(c=>`<i>${esc(c)}</i>`).join('')}</span>`).join('')}</span>`;
/* the ticker beside the name, unless it is the name (AMD, NINTENDO) */
const tkOf=u=>{const t=String(u.ticker||'');return t.replace(/\..*$/,'').toUpperCase()===String(u.co).toUpperCase().replace(/[^A-Z0-9]/g,'')||t.toUpperCase()===String(u.co).toUpperCase()?'':t};
const mkSvg=(m,col)=>{const M=(window.MODELS||{})[m];if(!M||!M.d)return '';return `<svg class="ud-mk" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''} fill="${col}"/></svg>`};
const plate=(s,cls)=>`<span class="ud-pl${cls?' '+cls:''}">${esc(s)}</span>`;
const isOpen=u=>!!(u.cp&&u.rp&&key(u.cp)===key(u.rp));
const dayWord=(p,M)=>{const d=dayName(p,M.today);return d==='Today'||d==='Tomorrow'?d.toLowerCase():SD[dow(p)]+' '+md(p)};
/* a round's state in a few words, printed on the enamel */
function state(u,M){const n=M.ORDER.length;if(u.state==='in')return `All ${n} trades in`;if(u.state==='coming')return `${u.nIn} of ${n} trades in`;
  if(u.cp&&key(u.cp)<M.tk)return 'Trades coming in';
  if(isOpen(u))return u.dated?'Trades due before the open':'Trades due '+dayWord(u.cp,M);
  return 'Trades due '+dayWord(u.cp,M)}
/* four trade flaps: the AI's mark in its colour, LONG green or SHORT red, the size; the AI's name and a dash while it is due */
function trades(u,M){return `<span class="ud-trs" aria-hidden="true">${M.ORDER.map(m=>{const c=u.trades.find(x=>x.m===m);
  if(!c)return `<span class="ud-tr ud-no">${mkSvg(m,'rgba(243,234,210,.3)')}<span class="ud-tw">${esc(nm(m))}</span><b class="ud-tv">–</b></span>`;
  const dn=c.dir==='DOWN';return `<span class="ud-tr ${dn?'ud-dn':'ud-up'}">${mkSvg(m,MCOL[m]||'#f8f0d9')}<span class="ud-tw">${dn?'Short':'Long'}</span><b class="ud-tv">${dn?'−':'+'}${esc(c.mag)}%</b></span>`}).join('')}</span>`}
const sr=(u,M,extra)=>{const t=u.trades.map(c=>`${nm(c.m)} ${c.dir==='DOWN'?'short':'long'} ${c.mag}%`).join(', ');
  return `${u.co} (${u.ticker}), round ${u.n}${u.mag7?', Mag 7':''}${u.bet?', Bet #1':''}. ${extra?extra+'. ':''}${state(u,M)}${t?': '+t:''}${u.missing.length&&u.nIn?'. Still due: '+u.missing.map(nm).join(', '):''}.`};
const tags=u=>(u.mag7?plate('Mag 7','ud-pt'):'')+(u.bet?plate('Bet #1','ud-pt'):'');
/* a company row at the next bell */
function row(u,M){const tk=tkOf(u);
  return `<li class="ud-row ud-s-${u.state}"><a class="ud-a" href="#/round/${u.n}" aria-label="${esc(sr(u,M))}">
   <span class="ud-lg">${coImg(u,'ud-logo')}</span><span class="ud-id"><span class="ud-nmr">${flaps(u.co,'ud-nm')}${tags(u)}</span>
   <span class="ud-sub">${tk?flaps(tk,'ud-tk'):''}<span class="ud-st" aria-hidden="true">${esc(state(u,M))}</span></span></span>${trades(u,M)}</a></li>`}
/* a big name: larger flaps, when it is graded, its four trades */
function bigRow(u,M){const tk=tkOf(u),when=u.dated?'Graded at the close '+dayWord(u.rp,M):u.state==='due'?state(u,M)+' · close date to come':'Close date to come';
  return `<li class="ud-big ud-s-${u.state}"><a class="ud-a" href="#/round/${u.n}" aria-label="${esc(sr(u,M,u.dated?when:'Close date to come'))}">
   <span class="ud-lg">${coImg(u,'ud-logo')}</span><span class="ud-id"><span class="ud-nmr">${flaps(u.co,'ud-nm')}</span>
   <span class="ud-sub">${tk?flaps(tk,'ud-tk'):''}${tags(u)}</span><span class="ud-when" aria-hidden="true">${esc(when)}</span></span>${trades(u,M)}</a></li>`}
/* every other round: one compact line */
function li(u,M){const tk=tkOf(u);
  return `<li class="ud-li"><a class="ud-a" href="#/round/${u.n}" aria-label="${esc(sr(u,M))}"><span class="ud-lg">${coImg(u,'ud-logo')}</span>
   <span class="ud-id"><span class="ud-nmr">${flaps(u.co,'ud-nm')}${tags(u)}</span><span class="ud-sub">${tk?flaps(tk,'ud-tk'):''}<span class="ud-st" aria-hidden="true">${esc(state(u,M))}</span></span></span></a></li>`}
/* the countdown on the head's four big flaps: number, unit, number, unit (days and hours, else hours and minutes); ticks once a minute */
function cdVals(ms){if(!(ms>0))return ['00','HRS','00','MIN'];const m=Math.ceil(ms/6e4),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;
  return d>=1?[String(d).padStart(2,'0'),d===1?'DAY':'DAYS',String(h).padStart(2,'0'),'HRS']:[String(h).padStart(2,'0'),'HRS',String(mi).padStart(2,'0'),'MIN']}
const cdSr=v=>`${+v[0]} ${v[1]==='MIN'?'minutes':v[1]==='HRS'?'hours':v[1].toLowerCase()} ${+v[2]} ${v[3]==='MIN'?'minutes':'hours'} to the close`;
const DIES=[[6.64,46.5,20.06,50.6],[28.53,46.5,20.3,50.6],[50.99,46.5,20.06,50.6],[73.45,46.5,19.77,50.6]];
function head(M){const b=M.bell,pl=b?`${b.day} · ${b.date} · ${b.mixed?'each exchange’s close':'4pm '+b.ex}`:'No close on the card',v=b?cdVals(b.close-Date.now()):['–','–','–','–'];
  return `<div class="ud-head"><img class="ud-hi" src="${H39.head1}" srcset="media/up-h39-head-1x.jpg 906w, media/up-h39-head-2x.jpg 1812w" sizes="(min-width:1000px) 800px, 100vw" alt="" decoding="async">
   <div class="ud-np"><span>${esc(pl)}</span></div>
   <div class="ud-cd"${b?` data-udcd="${b.close}"`:''}>${DIES.map((q,i)=>`<div class="ud-die ${i%2?'ud-unit':'ud-num'}" style="left:${q[0]}%;top:${q[1]}%;width:${q[2]}%;height:${q[3]}%"><b data-i="${i}">${esc(v[i])}</b></div>`).join('')}</div>
   ${b?`<span class="u3-sr" role="timer" data-udsr>${esc(cdSr(v))}</span>`:''}</div>`}
const n2=x=>flaps(String(x),'ud-cn');
function board1(M){const b=M.bell;
  const cap=b?`<p class="ud-cap"><span>The close grades every trade.</span> <span class="ud-capn">${n2(b.nIn)}<span>of</span>${n2(b.nAll)}<span>are in.</span></span><span class="u3-sr">${b.nIn} of ${b.nAll} trades are in.</span></p>`:
    `<p class="ud-cap"><span>No close on the card right now. The next trades drop before each report.</span></p>`;
  return `<div class="ud-bd ud-b1">${head(M)}<div class="ud-body">${cap}${b?`<ol class="ud-rows">${b.rounds.map(u=>row(u,M)).join('')}</ol>`:''}</div><div class="ud-foot"></div></div>`}
function board2(M){const b=M.bell,rest=[];M.DAYS.forEach(d=>d.rounds.forEach(u=>rest.push(u)));
  /* the big names: Mag 7 first (NVIDIA is also Bet #1), then market cap; four */
  const big=rest.filter(u=>u.mag7||u.cap>0).sort((x,y)=>(y.mag7-x.mag7)||(y.cap-x.cap)||(x.n-y.n)).slice(0,4),bs=new Set(big.map(u=>u.n));
  const days=M.DAYS.map(d=>Object.assign({},d,{rounds:d.rounds.filter(u=>!bs.has(u.n))})).filter(d=>d.rounds.length);
  const dayHtml=d=>`<li class="ud-day${d.past?' ud-past':''}"><h3 class="ud-dh">${plate((d.day==='Today'||d.day==='Tomorrow'?d.day:SD[dow(d.p)])+' · '+md(d.p),'ud-dp')}<span class="ud-dl">${d.dueOnly?'Trades due · close date to come':'Graded at the close'}</span></h3>
    <ul class="ud-lis">${d.rounds.map(u=>li(u,M)).join('')}</ul></li>`;
  if(!big.length&&!days.length)return '';
  return `<section class="ud-s2" aria-labelledby="udH2"><div class="ud-bd ud-b2"><div class="ud-top"></div><div class="ud-body">
   <h2 class="ud-hp" id="udH2"><span>Hot upcoming predictions</span></h2>
   ${big.length?`<ol class="ud-bigs">${big.map(u=>bigRow(u,M)).join('')}</ol>`:''}
   ${days.length?`<ol class="ud-days">${days.map(dayHtml).join('')}</ol>`:''}</div><div class="ud-foot"></div></div></section>`}
function build(M){return `<section class="ud-s1" aria-labelledby="udH"><h2 class="t4-h2 ud-h" id="udH"><span class="t4-hw">The next bell</span></h2>${board1(M)}</section>
  <div class="ud-tear" aria-hidden="true"></div>${board2(M)}${follow(M)}`}

/* ---------- the torn gutter: the page's own recipe (x2p_more.js tear(): a cream strip ripped along both edges, ink outline, a red sliver
   under it, a halftone shadow); x2p_more.js keeps its drawing private, so this copy draws it unless window.__x2pTear is exported ---------- */
function rnd(seed){let x=seed*9301+49297;return()=>(x=(x*9301+49297)%233280)/233280}
function tear(el,k){if(window.__x2pTear)return window.__x2pTear(el,k);let svg=el.querySelector(':scope>svg');if(!svg){svg=D.createElementNS('http://www.w3.org/2000/svg','svg');el.appendChild(svg)}
  svg.setAttribute('aria-hidden','true');svg.setAttribute('preserveAspectRatio','none');
  const w=el.clientWidth,h=el.clientHeight;if(!w||!h)return;const kk=w+'x'+h+':'+k;if(el.dataset.tear===kk)return;el.dataset.tear=kk;
  svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
  const r=rnd((w|0)+k*977),edge=(y0,amp,step,down)=>{let pts=[];for(let x=0;x<=w+step;x+=step*(.6+r()*.8))pts.push([Math.min(x,w),y0+(r()-.5)*amp*2+(down&&r()<.18?amp*1.4:0)]);return pts};
  const t=edge(h*.26,h*.07,7),b=edge(h*.7,h*.08,6,1).reverse(),P=t.concat(b),d='M'+P.map(p=>p.map(v=>v.toFixed(1)).join(',')).join(' L')+'Z';
  let dots='';for(let x=4;x<w;x+=6)for(let j=0;j<4;j++){const y=h*.78+j*4.2,rr=1.6-j*.38;if(rr>.2)dots+=`<circle cx="${(x+(j%2)*3).toFixed(1)}" cy="${y.toFixed(1)}" r="${rr.toFixed(2)}"/>`}
  svg.innerHTML=`<g fill="#f8f0d9" opacity=".22">${dots}</g><path d="${d}" fill="#c42a20" transform="translate(2,3.4)"/><path d="${d}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="2.2" stroke-linejoin="round"/><path d="${'M'+t.map(p=>p[0].toFixed(1)+','+(p[1]+2.6).toFixed(1)).join(' L')}" fill="none" stroke="#c9bc98" stroke-width="1.4" opacity=".8"/><path d="${'M'+b.slice().reverse().map(p=>p[0].toFixed(1)+','+(p[1]-2.6).toFixed(1)).join(' L')}" fill="none" stroke="#d9cdb0" stroke-width="1.1" opacity=".7"/>`}
const tearAll=root=>root.querySelectorAll('.ud-tear').forEach((e,i)=>tear(e,40+i));

/* the countdown: the four big flaps change once a minute, on the minute of the close */
function clock(root){const el=root.querySelector('[data-udcd]');if(!el)return;const t=+el.dataset.udcd,srn=root.querySelector('[data-udsr]');
  const set=()=>{if(!el.isConnected)return false;const v=cdVals(t-Date.now());el.querySelectorAll('b[data-i]').forEach(x=>{const s=v[+x.dataset.i];if(x.textContent!==s)x.textContent=s});
    if(srn){const s=cdSr(v);if(srn.textContent!==s)srn.textContent=s}return true};
  const next=()=>{if(!set())return;const ms=t-Date.now(),wait=ms>0?(ms%6e4)+50:6e4;setTimeout(next,Math.min(wait,6e4+50))};next()}

/* ---------- mount: every time the router draws the Upcoming tab (upTab's .x2p-up), the board goes in its place ---------- */
let busy=false,timer=0;
function tryMount(){timer=0;const v=D.querySelector('#view .x2p-up');
  if(!v||v.querySelector('.u3-root')||busy)return;
  if(!(window.ROUNDS&&window.MODELS&&window.__x2pPnl))return again();
  busy=true;
  try{const M=model();prepLogos(M.fut).then(()=>{busy=false;try{
    if(!v.isConnected||v.querySelector('.u3-root'))return;
    const root=D.createElement('div');root.className='u3-root u3-D';root.innerHTML=build(M);
    [...v.children].forEach(c=>{if(c.tagName!=='H1'){c.style.display='none';c.setAttribute('aria-hidden','true')}});
    v.appendChild(root);H.classList.add('u3-on');
    clock(root);tearAll(root);
    if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>{if(root.isConnected)tearAll(root)});
    window.__u3=M}catch(e){fail(e)}},fail)}catch(e){busy=false;fail(e)}}
function fail(e){busy=false;window.__u3Err=e;H.classList.remove('u3-live');try{console.error('u3',e)}catch(x){}}
function again(){if(!timer)timer=setTimeout(tryMount,80)}
/* the router redraws #view on every tab change: watch it (child list only) and try again */
function watch(){const v=D.getElementById('view');if(!v)return setTimeout(watch,200);new MutationObserver(()=>{const u=D.querySelector('#view .x2p-up');if(!window.__u3Err&&u&&!u.querySelector('.u3-root'))again()}).observe(v,{childList:true,subtree:false});again()}
addEventListener('hashchange',()=>again());
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;const r=D.querySelector('.u3-root.u3-D');if(r)tearAll(r)});
watch();
})();
