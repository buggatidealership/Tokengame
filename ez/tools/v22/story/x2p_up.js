/* ===== H33 UPCOMING (owner, 2026-11-02: take A "The next bell" of round H32 upcoming3, "just put that on the live site for now... not the final
   version"; ported from tools/concepts/worlds/comic/story/h/upcoming3/_u3.js + takeA.js). The Upcoming tab: a painted countdown board (its
   plate names the day and the city of the close, its four dies count down), one painted trade module per company graded at that close (the
   company's mark in the big die, each AI's trade lit in its own die: Long green, Short red, the size; a dark die with a dash while a trade is
   still coming in), the last bell's graded slabs (the record's own), the season card day by day (one chip per company, Mag 7 on gold and
   larger, four lights per chip for the four trades), Bet #1: NVIDIA at its foot, and the Overview's follow panel.
   One change from the mockup (owner): every company logo shows in its company's own colours (the mockup lit them white). A logo drawn on
   its own tile (Apple's white square, DHL's yellow one) is shown as that tile; a logo made for a dark ground (CO_LOGOS dark) as drawn; a
   transparent logo whose ink would vanish on the dark die (under 3:1 against it on more than 30% of its pixels: Palantir, Novo Nordisk,
   Take-Two...) sits on a small cream plate. The AI marks take the chart colours of Smart or lucky (window.X2P_MCOL).
   Every word and number comes from ez-data.js (ROUNDS / PENDING / UPCOMING / CAPS / CO_LOGOS / RMETA / MODELS / CONFIG) and the page's own
   helpers (__x2pPnl, the record's slab labels). Nothing typed. X2's Upcoming (upTab's fight night and X2's list) stays in the DOM, hidden, so
   routing and #/round links keep working. Re-mounted each time the router draws the tab. A failure is kept in window.__u3Err and the fight
   night shows again. Paintings: media/up-h33-bell.jpg media/up-h33-trade.jpg media/up-h33-node.jpg media/up-h33-nodeg.jpg
   (Hedra, gpt-image-2, round H32), media/bet-chip-h2.jpg, media/p5-panel.jpg, media/gr4-g1-board-p.jpg. ===== */
(function(){
const D=document,H=D.documentElement;H.classList.add('u3-live');
const P_BELL='media/up-h33-bell.jpg',P_TRADE='media/up-h33-trade.jpg',P_NODE='media/up-h33-node.jpg',P_NODEG='media/up-h33-nodeg.jpg';
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
const trade=c=>{const dn=c.dir==='DOWN';return {dn,word:dn?'Short':'Long',mag:esc(c.mag)+'%',sr:`${nm(c.m)}: ${dn?'short':'long'} ${esc(c.mag)}%`}};
/* the record's own slab label for a graded round (the stand's recipe, x2p_more.js lab()) */
function lab(r){const z=D.querySelector(`#car .card[data-n="${r.n}"] .zlab`);if(!z)return null;const q=s=>(z.querySelector(s)||{}).textContent||'';
  return {ds:q('.zr .ds'),gr:q('.zr .gr'),no:q('.zr .no'),cert:(q('.zb').match(/\d{6,}/)||[''])[0],ten:q('.zr .gr')==='10'}}
const tile=r=>`media/tile-r${r.n}-${(window.FILMS||{})[r.n]?'f1':'t2'}.jpg`;
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*/).filter(m=>window.MODELS[m]);
/* a graded round as the record's slab (x2p_more.js label() / slab(), verbatim markup so the live CSS draws it) */
function slab(r,cls){const L=lab(r)||{ds:'',gr:'',no:'#'+r.n,cert:''},f=(window.FILMS||{})[r.n],W=wins(r);
  const aria=`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. ${L.ds?'Grade '+L.ds+' '+L.gr+'. ':''}${W.length?'Winner '+W.map(nm).join(' and '):'Nobody won'}. Open the slab.`;
  return `<a class="m7-sl ${cls||''}" href="#/round/${r.n}" aria-label="${esc(aria)}" data-n="${r.n}"><span class="m7-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="m7-pl" aria-hidden="true"></i>':''}</span><span class="m7-fr" aria-hidden="true"></span><span class="m7-lab${L.ten?' m7-ten':''}"><span class="m7-l"><span class="m7-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span><span class="m7-nm"><b>${esc(r.co)}</b> <small>(${esc(r.ticker)})</small></span><span class="m7-zb"><i></i><span class="m7-ct">${esc(L.cert)}</span><span class="m7-ho"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></span><span class="m7-r"><span class="m7-no">${esc(L.no)}</span><span class="m7-ds">${esc(L.ds)}</span><span class="m7-gr">${esc(L.gr)}</span></span></span></a>`}
function fitNames(root){root.querySelectorAll('.m7-nm').forEach(e=>{e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(e.scrollWidth>e.clientWidth+.5&&f>5&&g++<40){f-=.5;e.style.fontSize=f+'px'}})}
/* steps a line down until it fits its box */
function fit(e){e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;const lo=+(e.dataset.fitw||8);while(e.scrollWidth>e.clientWidth+.5&&f>lo&&g++<60){f-=.5;e.style.fontSize=f+'px'}}

/* ---------- a painted stage in the painting's own pixels: the painting, live text lit on its glass (bloom), the painting's glare screened back
   over the glass, silkscreen print (P5's recipe with real pixel units, so 16:9 paintings keep their shape). No perspective: a flat SVG.
   GPU (measured at a 2.75 ratio under a 40 MB cap): the runtime glare (the painting screened back over its glass, mix-blend-mode) made a
   composited layer per stage and the bell and the trade modules dropped 11.5% of the first screen's tiles; the bell and trade paintings
   carry that glare baked into their glass (up-h33-bell.jpg, up-h33-trade.jpg: the same screen at .45), so their stages draw none (baked). ---------- */
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
function MARK(u,x,y,w,h){const s=Math.min(w,h);
  if(String(u.ticker).toUpperCase()==='NVDA'&&window.NVIDIA_D){const k=s*.9/24;return {defs:'',flat:`<path d="${window.NVIDIA_D}" fill="#76B900" transform="translate(${(x-s*.45).toFixed(1)} ${(y-s*.45).toFixed(1)}) scale(${k.toFixed(4)})"/>`}}
  if(!u.logo)return {defs:'',flat:T(x,y+h*.18,h*.5,String(u.ticker).split('.')[0],{a:'middle'})};
  const m=u.lm||'bare',id=UID();
  if(m==='tile'){const t=s*.86,r=t*.2;return {defs:`<clipPath id="${id}t"><rect x="${(x-t/2).toFixed(1)}" y="${(y-t/2).toFixed(1)}" width="${t.toFixed(1)}" height="${t.toFixed(1)}" rx="${r.toFixed(1)}"/></clipPath>`,
    flat:`<image href="${u.logo}" x="${(x-t/2).toFixed(1)}" y="${(y-t/2).toFixed(1)}" width="${t.toFixed(1)}" height="${t.toFixed(1)}" preserveAspectRatio="xMidYMid slice" clip-path="url(#${id}t)"/><rect x="${(x-t/2).toFixed(1)}" y="${(y-t/2).toFixed(1)}" width="${t.toFixed(1)}" height="${t.toFixed(1)}" rx="${r.toFixed(1)}" fill="none" stroke="#0d0b10" stroke-width="${(t*.025).toFixed(1)}"/>`}}
  if(m==='plate'){const t=s*.86,r=t*.2,i=t*.72;return {defs:'',flat:`<rect x="${(x-t/2).toFixed(1)}" y="${(y-t/2).toFixed(1)}" width="${t.toFixed(1)}" height="${t.toFixed(1)}" rx="${r.toFixed(1)}" fill="#f8f0d9" stroke="#0d0b10" stroke-width="${(t*.025).toFixed(1)}"/><image href="${u.logo}" x="${(x-i/2).toFixed(1)}" y="${(y-i/2).toFixed(1)}" width="${i.toFixed(1)}" height="${i.toFixed(1)}" preserveAspectRatio="xMidYMid meet"/>`}}
  return {defs:'',flat:`<image href="${u.logo}" x="${(x-w/2).toFixed(1)}" y="${(y-h/2).toFixed(1)}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet"/>`}};
/* the bet date: the close the weekday after NVIDIA's trade date (the bet section's rule) */
function betDay(u){const p=pd(u&&(u.resolves||u.called));if(!p)return null;let t=new Date(Date.UTC(p.y,p.mo-1,p.d));if(!u.resolves){do{t=new Date(t.getTime()+864e5)}while([0,6].includes(t.getUTCDay()))}
  return {y:t.getUTCFullYear(),mo:t.getUTCMonth()+1,d:t.getUTCDate()}}
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

/* ---------- take A: the next bell ---------- */
const UPC='#3ee07f',DNC='#ff5148';
function bell(M){const b=M.bell;if(!b)return `<p class="u3-cap">No close on the card right now. The next trades drop before each report.</p>`;
  const dies=[[460,440,748,980],[892,440,1180,980],[1328,444,1620,980],[1772,440,2064,980]],U4=['d','h','m','s'],LB=['DAYS','HRS','MIN','SEC'];
  const plate=b.day+' · '+b.date+' · '+(b.mixed?'at each close':'4pm '+b.ex);
  let lit=T(1274,262,74,plate.toUpperCase(),{a:'middle',ls:3,tl:plate.length>30?900:null});
  dies.forEach((d,i)=>{lit+=`<text data-u3u="${U4[i]}" x="${(d[0]+d[2])/2}" y="${d[1]+(d[3]-d[1])*.74}" font-size="262" text-anchor="middle" font-family="Anton,sans-serif" fill="url(#u3dg)">00</text>`});
  const silk=dies.map((d,i)=>T((d[0]+d[2])/2,1072,40,LB[i],{a:'middle',c:'#1a1206',ls:5})).join('');
  const defs=`<linearGradient id="u3dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf3"/><stop offset=".55" stop-color="#f8f0d9"/><stop offset="1" stop-color="#c9bd9f"/></linearGradient>`;
  return `<div class="ua-bell" data-u3cd="${b.close}">${stage({img:P_BELL,W:2560,H:1440,crop:[150,20,2410,1360],glass:dies.map(d=>[d[0],d[1],d[2]-d[0],d[3]-d[1],14]).concat([[788,176,972,124,10]]),defs,lit,silk,bloom:9,baked:1,
    label:`The next bell: ${b.day}, ${b.date}, ${b.mixed?'at each exchange’s close':'4pm '+b.ex}`})}</div>`}
function module(u,M){const dies=[[1048,496,1324,912],[1400,496,1692,912],[1772,496,2040,912],[2108,496,2368,912]];
  const mk=MARK(u,516,698,360,300);let lit='',flat=mk.flat,silk='';
  M.ORDER.forEach((m,i)=>{const d=dies[i],cx=(d[0]+d[2])/2,c=u.trades.find(x=>x.m===m);
    silk+=T(cx,985,44,nm(m).toUpperCase(),{a:'middle',c:'#f3e7c4',ls:3});
    if(c){const t=trade(c);lit+=MK(m,cx,d[1]+70,74,MCOL[m])+T(cx,d[1]+218,92,t.word.toUpperCase(),{a:'middle',c:t.dn?DNC:UPC})+T(cx,d[1]+350,104,(t.dn?'−':'+')+c.mag+'%',{a:'middle',c:'#f8f0d9'})}
    else{flat+=MK(m,cx,d[1]+70,74,'rgba(248,240,217,.22)')+T(cx,d[1]+300,150,'–',{a:'middle',c:'rgba(248,240,217,.32)'})}});
  const trades=u.trades.map(c=>trade(c).sr).join(', '),miss=u.missing.map(nm);
  const st=u.state==='in'?`<b>All ${u.nIn} trades in</b>`:u.state==='coming'?`<b>${u.nIn} of ${M.ORDER.length} in</b> · ${esc(miss.join(', '))} coming in`:`<b>Trades coming in</b> · due ${esc(md(u.cp))}`;
  return `<li class="ua-row${u.mag7?' ua-m7':''}"><a class="ua-a" href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+'. '+(trades||'No trades in yet')+(miss.length&&u.nIn?'. Still coming in: '+miss.join(', '):''))}">
   <span class="ua-lab"><span class="ua-nm" data-fitw="11"><b>${esc(u.co)}</b> <small>(${esc(u.ticker)})</small>${u.mag7?'<em>Mag 7</em>':''}</span><span class="ua-st">${st}</span></span>
   ${stage({img:P_TRADE,W:2560,H:1440,crop:[0,372,2560,1036],glass:dies.map(d=>[d[0],d[1],d[2]-d[0],d[3]-d[1],12]).concat([[264,460,504,476,18]]),defs:mk.defs,lit,flat,silk,bloom:7,baked:1,label:''})}</a></li>`}
function led(u,M){return `<svg class="ua-led" viewBox="0 0 64 14" aria-hidden="true">${M.ORDER.map((m,i)=>{const c=u.trades.find(x=>x.m===m),col=c?(c.dir==='DOWN'?DNC:UPC):null;const x=8+i*16;
  return col?`<circle cx="${x}" cy="7" r="5.6" fill="${col}" opacity=".35"/><circle cx="${x}" cy="7" r="3.9" fill="${col}"/><circle cx="${x-1.2}" cy="5.6" r="1.3" fill="#fff" opacity=".8"/>`:`<circle cx="${x}" cy="7" r="4.2" fill="#12160f" stroke="#7a6a3a" stroke-width="1.2"/>`}).join('')}</svg>`}
function chip(u,M){const big=u.mag7,sz=big?1.32:u.cap>=300?1:.84;
  return `<li class="ua-ch${big?' ua-chg':''}" style="--s:${sz}"><a href="#/round/${u.n}" aria-label="${esc(u.co+' ('+u.ticker+'), round '+u.n+(u.mag7?', Mag 7':'')+'. '+(u.nIn?u.nIn+' of '+M.ORDER.length+' trades in':'Trades due '+md(u.cp)))}">
    <span class="ua-cp"><img class="ua-cpi" src="${big?P_NODEG:P_NODE}" alt="" loading="lazy" decoding="async">${coImg(u,'ua-cl')}</span>${led(u,M)}
    <span class="ua-cn" data-fitw="8">${esc(u.co)}</span><small>${esc(u.ticker)}</small></a></li>`}
const SD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function season(M){const days=M.DAYS.filter(d=>!d.rounds.every(u=>u.bet));const bet=M.bet,bd=betDay(bet);
  return `<section class="ua-sea" aria-labelledby="uaSeaH"><h2 class="t4-h2" id="uaSeaH"><span class="t4-hw">The season card</span></h2>
   <p class="u3-cap">Four lights per chip, one per AI. They light up as the trades come in.</p>
   <ol class="ua-days">${days.map(d=>{const rs=d.rounds.filter(u=>!u.bet);
     return `<li class="ua-day${d.past?' ua-past':''}"><div class="ua-dl"><b>${esc(d.day==='Today'?d.day:SD[dow(d.p)])}</b><span>${esc(d.date)}</span><small>${d.dueOnly?'trades due':'graded at the close'}</small></div><ul class="ua-chips">${rs.map(u=>chip(u,M)).join('')}</ul></li>`}).join('')}
   ${bet?`<li class="ua-day ua-betd"><a class="ua-bet" href="#/round/${bet.n}" aria-label="${esc('Bet #1: NVIDIA (NVDA), round '+bet.n+'. Trades '+md(bet.cp)+(bd?', the bet at the close '+md(bd):''))}"><img src="media/bet-chip-h2.jpg" alt="" loading="lazy" decoding="async"><span class="ua-btx"><span class="t4-h2 ua-bh"><span class="t4-hw">Bet #1: NVIDIA</span></span><span class="ua-bs">${coImg(bet,'ua-bl')}Trades ${esc(md(bet.cp))}${bd?' · the bet at the close '+esc(md(bd)):''}</span></span></a></li>`:''}</ol></section>`}
function last(M){if(!M.last.length)return '';const n=M.last.length;
  return `<section class="ua-last" aria-labelledby="uaLastH"><h3 class="u3-h3" id="uaLastH">The last bell <small>${esc(dayName(M.lastP,M.today))} ${esc(md(M.lastP))} · ${n} graded</small></h3>
   <ul class="u3-slabs">${M.last.slice(0,8).map(r=>`<li>${slab(r,'ua-sl')}</li>`).join('')}</ul>${n>8?`<a class="ua-more" href="#/">All ${n} on the record</a>`:''}</section>`}
function build(M){const b=M.bell;return `<section class="ua" aria-labelledby="uaH"><h2 class="t4-h2 ua-h" id="uaH"><span class="t4-hw">The next bell</span></h2>${bell(M)}
  ${b?`<p class="u3-cap ua-cap">The close grades every trade. <span class="u3-n">${b.nIn}</span> of <span class="u3-n">${b.nAll}</span> are in.</p><ol class="ua-rows">${b.rounds.map(u=>module(u,M)).join('')}</ol>`:''}</section>${season(M)}${follow(M)}`}/* H34 (owner, 2026-11-02, night): no "The last bell" here: graded rounds belong to the record, Upcoming is what's coming (last() kept, unused) */

/* ---------- mount: every time the router draws the Upcoming tab (upTab's .x2p-up), the take goes in its place ---------- */
let busy=false,tries=0,timer=0;
function tryMount(){timer=0;const v=D.querySelector('#view .x2p-up');
  if(!v||v.querySelector('.u3-root')||busy)return;
  if(!(window.ROUNDS&&window.MODELS&&window.__x2pPnl))return again();
  /* the last bell's slabs read the record's labels; give the record a moment, then go without them */
  /* (H34: the last bell is gone, so the tab no longer waits up to 3 s for the record's slab labels) */
  busy=true;
  try{const M=model();prepLogos(M.fut).then(()=>{busy=false;try{
    if(!v.isConnected||v.querySelector('.u3-root'))return;
    const root=D.createElement('div');root.className='u3-root u3-A';root.innerHTML=build(M);
    [...v.children].forEach(c=>{if(c.tagName!=='H1'){c.style.display='none';c.setAttribute('aria-hidden','true')}});
    v.appendChild(root);H.classList.add('u3-on');
    root.querySelectorAll('[data-u3cd]').forEach(el=>{const t=+el.dataset.u3cd;let iv=0;const tick=()=>{if(!el.isConnected){clearInterval(iv);return}const L=left(t-Date.now());
      el.querySelectorAll('[data-u3u]').forEach(x=>{const u=x.dataset.u3u,s=L?String(u==='d'?L.d:u==='h'?L.h:u==='m'?L.m:L.s).padStart(2,'0'):'00';if(x.textContent!==s)x.textContent=s})};tick();iv=setInterval(tick,1000)});
    root.querySelectorAll('[data-fitw]').forEach(fit);fitNames(root);
    if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>{if(root.isConnected){root.querySelectorAll('[data-fitw]').forEach(fit);fitNames(root)}});
    window.__u3=M}catch(e){fail(e)}},fail)}catch(e){busy=false;fail(e)}}
function fail(e){busy=false;window.__u3Err=e;H.classList.remove('u3-live');try{console.error('u3',e)}catch(x){}}
function again(){if(!timer)timer=setTimeout(tryMount,80)}
/* the router redraws #view on every tab change: watch it (child list only) and try again */
function watch(){const v=D.getElementById('view');if(!v)return setTimeout(watch,200);new MutationObserver(()=>{const u=D.querySelector('#view .x2p-up');if(!window.__u3Err&&u&&!u.querySelector('.u3-root'))again()}).observe(v,{childList:true,subtree:false});again()}
addEventListener('hashchange',()=>{tries=0;again()});
let lw=innerWidth;addEventListener('resize',()=>{if(innerWidth===lw)return;lw=innerWidth;const r=D.querySelector('.u3-root');if(r){r.querySelectorAll('[data-fitw]').forEach(fit);fitNames(r)}});
watch();
})();
