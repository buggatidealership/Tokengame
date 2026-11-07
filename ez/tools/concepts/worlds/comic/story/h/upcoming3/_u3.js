/* H32 Upcoming, shared model for takes A, B, C. Every word and number comes from ez-data.js (ROUNDS / PENDING / UPCOMING / CAPS / CO_LOGOS /
   RMETA / MODELS / CONFIG) and the page's own helpers (__x2pPnl, the record's slab labels). Nothing typed.
   window.U3 = {model(), html helpers, mount(build)}: a take calls U3.mount(fn) and fn(M) returns its HTML; U3 then hides X2's Upcoming list
   (kept in the DOM for routing and readers) and puts the take in its place. */
(function(){
const D=document,esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
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
const short=ms=>{const L=left(ms);if(!L)return 'now';return L.d?L.d+'d '+L.h+'h':L.h?L.h+'h '+L.m+'m':L.m+'m'};
const logoF=t=>{const L=(window.CO_LOGOS||{})[String(t).toUpperCase()];return L?'media/'+(L.f||L):''},dark=t=>!!((window.CO_LOGOS||{})[String(t).toUpperCase()]||{}).dark,
  brand=t=>(((window.CO_LOGOS||{})[String(t).toUpperCase()]||{}).c)||'#3ee07f';
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
      logo:logoF(u.ticker),dark:dark(u.ticker),brand:brand(u.ticker),due:!r||(c&&key(c)>=tk)?(c?key(c):null):null})});
  fut.forEach(u=>{u.nIn=u.trades.length;u.missing=ORDER.filter(m=>!u.trades.some(c=>c.m===m));u.state=u.nIn>=ORDER.length?'in':u.nIn?'coming':'due'});
  const byCap=(a,b)=>(b.bet-a.bet)||(b.cap-a.cap)||(a.n-b.n);
  /* the next bell: the soonest close still to come among the dated rounds; everything graded at that close */
  const dated=fut.filter(u=>u.dated).sort((a,b)=>a.close-b.close||byCap(a,b));
  const waiting=dated.filter(u=>u.close<=now);
  const nx=dated.find(u=>u.close>now);
  const bell=nx?{k:nx.k,p:nx.rp,close:nx.close,ex:nx.ex,rounds:dated.filter(u=>u.k===nx.k).sort(byCap)}:null;
  if(bell){bell.nIn=bell.rounds.reduce((a,u)=>a+u.nIn,0);bell.nAll=bell.rounds.length*ORDER.length;bell.day=dayName(bell.p,today);bell.date=md(bell.p);
    bell.exs=[...new Set(bell.rounds.map(u=>u.ex))];bell.mixed=bell.exs.length>1;bell.last=Math.max(...bell.rounds.map(u=>u.close))}
  /* the rest of the season, day by day (a day = the close that grades it; a round with no grading date yet sits on its trade day) */
  const rest=fut.filter(u=>!bell||u.k!==bell.k||!u.dated).filter(u=>!(u.dated&&u.close<=now));
  const days={};rest.forEach(u=>{(days[u.k]=days[u.k]||[]).push(u)});
  const DAYS=Object.keys(days).sort().map(k=>{const rs=days[k].sort(byCap),p=rs[0].rp||rs[0].cp;return {k,p,day:dayName(p,today),date:md(p),rounds:rs,
    graded:rs.some(u=>u.dated),dueOnly:rs.every(u=>!u.dated),past:k<tk}});
  /* the last bell: the newest graded close, as slabs */
  const G=(window.ROUNDS||[]).filter(r=>typeof r.a==='number'&&!isNaN(r.a));
  const lk=G.reduce((a,r)=>{const k=key(pd(r.resolves));return k>a?k:a},'');
  const last=G.filter(r=>key(pd(r.resolves))===lk).sort((a,b)=>cap(b.ticker)-cap(a.ticker)||a.n-b.n);
  const bet=fut.find(u=>u.bet);
  const total=G.length+fut.length;
  return {ORDER,A,P,today,tk,now,fut,bell,waiting,DAYS,last,lastP:pd(last[0]&&last[0].resolves),G,bet,total,x:(window.CONFIG||{}).x||'https://x.com/earningszn',
    m7left:fut.filter(u=>u.mag7).sort((a,b)=>a.k.localeCompare(b.k))}
}
/* html helpers */
const mlogo=(m,cls)=>window.logo?window.logo(m,cls||''):esc(m);
const coImg=(u,cls)=>String(u.ticker).toUpperCase()==='NVDA'&&window.NVIDIA_D?`<svg class="${cls||'u3-co'} u3-nv" viewBox="0 0 24 24" aria-hidden="true"><path fill="#76B900" d="${window.NVIDIA_D}"/></svg>`:u.logo?`<img class="${cls||'u3-co'}${u.dark?'':' u3-inv'}" src="${u.logo}" alt="" loading="lazy" decoding="async">`:`<b class="${cls||'u3-co'} u3-tkx">${esc(String(u.ticker).split('.')[0])}</b>`;
const coName=u=>{const t=String(u.ticker||''),same=t.replace(/\..*$/,'').toUpperCase()===String(u.co).toUpperCase();return `${esc(u.co)}${same?'':` <small>(${esc(t)})</small>`}`};
const trade=c=>{const dn=c.dir==='DOWN';return {dn,word:dn?'Short':'Long',mag:esc(c.mag)+'%',sr:`${nm(c.m)}: ${dn?'short':'long'} ${esc(c.mag)}%`}};
/* the record's own slab label for a graded round (the stand's recipe, x2p_more.js lab()) */
function lab(r){const z=D.querySelector(`#car .card[data-n="${r.n}"] .zlab`);if(!z)return null;const q=s=>(z.querySelector(s)||{}).textContent||'';
  return {ds:q('.zr .ds'),gr:q('.zr .gr'),no:q('.zr .no'),cert:(q('.zb').match(/\d{6,}/)||[''])[0],ten:q('.zr .gr')==='10'}}
const tile=r=>`media/tile-r${r.n}-${(window.FILMS||{})[r.n]?'f1':'t2'}.jpg`;
const wins=r=>String(r.win||'').toUpperCase().split(/\s*&\s*/).filter(m=>window.MODELS[m]);
function mount(build,cls){let n=0;(function go(){const v=D.querySelector('#view .x2p-up');
    if(!(v&&window.ROUNDS&&window.__x2pPnl&&D.querySelector('#car .card .zlab'))){if(++n<400)setTimeout(go,60);return}
    try{const M=model();prepLogos(M.fut.concat(M.bet?[M.bet]:[])).then(()=>{const root=D.createElement('div');root.className='u3-root '+(cls||'');root.innerHTML=build(M);
      [...v.children].forEach(c=>{if(c.tagName!=='H1'){c.style.display='none';c.setAttribute('aria-hidden','true')}});
      v.appendChild(root);D.documentElement.classList.add('u3-on');
      root.querySelectorAll('[data-u3cd]').forEach(el=>{const t=+el.dataset.u3cd;const tick=()=>{if(!el.isConnected)return;const L=left(t-Date.now());
        el.querySelectorAll('[data-u3u]').forEach(x=>{const u=x.dataset.u3u;x.textContent=L?String(u==='d'?L.d:u==='h'?L.h:u==='m'?L.m:L.s).padStart(2,'0'):'00'})};tick();setInterval(tick,1000)});
      root.querySelectorAll('[data-fitw]').forEach(fit);fitNames(root);
      if(D.fonts&&D.fonts.ready)D.fonts.ready.then(()=>root.querySelectorAll('[data-fitw]').forEach(fit));
      window.__u3=M;if(window.__u3After)window.__u3After(root,M)})}catch(e){console.error('u3',e);window.__u3Err=e}})()}
/* steps a line down until it fits its box */
function fit(e){e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;const lo=+(e.dataset.fitw||8);while(e.scrollWidth>e.clientWidth+.5&&f>lo&&g++<60){f-=.5;e.style.fontSize=f+'px'}}
/*STAGE*/
/* logos drawn on a tile (all four corners opaque and one colour, e.g. Apple's file) get the tile keyed out on a canvas, so they light on the
   glass as a mark; the result replaces u.logo (the strip's recipe, x2plus.js LIVESTRIP) */
const KEYED={};function prepLogos(us){return Promise.all(us.filter(u=>u.logo&&!(u.logo in KEYED)).map(u=>new Promise(res=>{const src=u.logo,im=new Image();
  im.onload=()=>{try{const w=im.naturalWidth,h=im.naturalHeight,c=D.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(im,0,0);
    const d=x.getImageData(0,0,w,h),a=d.data,px=(i,j)=>{const k=(j*w+i)*4;return [a[k],a[k+1],a[k+2],a[k+3]]},cs=[px(1,1),px(w-2,1),px(1,h-2),px(w-2,h-2)];
    const same=cs.every(q=>q[3]>250&&Math.abs(q[0]-cs[0][0])+Math.abs(q[1]-cs[0][1])+Math.abs(q[2]-cs[0][2])<24);
    if(!same){KEYED[src]=src;return res()}const [r0,g0,b0]=cs[0];
    for(let k=0;k<a.length;k+=4){const dd=Math.abs(a[k]-r0)+Math.abs(a[k+1]-g0)+Math.abs(a[k+2]-b0);if(dd<60)a[k+3]=Math.round(a[k+3]*Math.max(0,(dd-24)/36))}
    x.putImageData(d,0,0);KEYED[src]=c.toDataURL()}catch(e){KEYED[src]=src}res()};im.onerror=()=>{KEYED[src]=src;res()};im.src=src}))).then(()=>{us.forEach(u=>{if(u.logo&&KEYED[u.logo])u.logo=KEYED[u.logo]})})}

/* a graded round as the record's slab (x2p_more.js label() / slab(), verbatim markup so the live CSS draws it) */
function slab(r,cls){const L=lab(r)||{ds:'',gr:'',no:'#'+r.n,cert:''},f=(window.FILMS||{})[r.n],W=wins(r);
  const aria=`Round ${r.n}, ${r.co} (${r.ticker}): moved ${r.out}. Grade ${L.ds} ${L.gr}. ${W.length?'Winner '+W.map(nm).join(' and '):'Nobody won'}. Open the slab.`;
  return `<a class="m7-sl ${cls||''}" href="#/round/${r.n}" aria-label="${esc(aria)}" data-n="${r.n}"><span class="m7-wn"><img src="${tile(r)}" alt="" loading="lazy" decoding="async">${f?'<i class="m7-pl" aria-hidden="true"></i>':''}</span><span class="m7-fr" aria-hidden="true"></span><span class="m7-lab${L.ten?' m7-ten':''}"><span class="m7-l"><span class="m7-y">2026 <b class="s">$</b><b class="e">E</b><b class="z">Z</b> Season 1</span><span class="m7-nm"><b>${esc(r.co)}</b> <small>(${esc(r.ticker)})</small></span><span class="m7-zb"><i></i><span class="m7-ct">${esc(L.cert)}</span><span class="m7-ho"><i class="s">$</i><i class="e">E</i><i class="z">Z</i></span></span></span><span class="m7-r"><span class="m7-no">${esc(L.no)}</span><span class="m7-ds">${esc(L.ds)}</span><span class="m7-gr">${esc(L.gr)}</span></span></span></a>`}
function fitNames(root){root.querySelectorAll('.m7-nm').forEach(e=>{e.style.fontSize='';let f=parseFloat(getComputedStyle(e).fontSize),g=0;while(e.scrollWidth>e.clientWidth+.5&&f>5&&g++<40){f-=.5;e.style.fontSize=f+'px'}})}

/* a painted stage in the painting's own pixels: the painting, live text lit on its glass (bloom), the painting's glare screened back over the
   glass, silkscreen print; P5's recipe (x2p_more.js) with real pixel units so 16:9 and 4:3 paintings keep their shape */
const UID=()=>'u3'+Math.random().toString(36).slice(2,8);
function stage(o){const id=UID(),[x0,y0,x1,y1]=o.crop,w=x1-x0,h=y1-y0,img=`<image href="${o.img}" x="0" y="0" width="${o.W}" height="${o.H}"/>`;
  const gl=(o.glass||[]).map(g=>`<rect x="${g[0]}" y="${g[1]}" width="${g[2]}" height="${g[3]}" rx="${g[4]||0}"/>`).join('');
  return `<svg class="u3-svg ${o.cls||''}" viewBox="${x0} ${y0} ${w} ${h}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="${esc(o.label||'')}" style="aspect-ratio:${w}/${h}">
  <defs><filter id="${id}g" x="-20%" y="-40%" width="140%" height="180%"><feGaussianBlur in="SourceGraphic" stdDeviation="${o.bloom||6}" result="b"/><feGaussianBlur in="SourceGraphic" stdDeviation="${(o.bloom||6)*3.2}" result="b2"/>
   <feComponentTransfer in="b2" result="b3"><feFuncA type="linear" slope=".5"/></feComponentTransfer><feMerge><feMergeNode in="b3"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <clipPath id="${id}c">${gl}</clipPath></defs>
  ${img}<g class="u3-under">${o.under||''}</g><g class="u3-lit" filter="url(#${id}g)">${o.lit||''}</g><g>${o.flat||''}</g>
  ${gl?`<image class="u3-glare" href="${o.img}" x="0" y="0" width="${o.W}" height="${o.H}" clip-path="url(#${id}c)" style="mix-blend-mode:screen;opacity:${o.glare||.45}"/>`:''}
  ${o.silk?`<g class="u3-silk">${o.silk}</g>`:''}${o.top||''}</svg>`}
const T=(x,y,s,str,o)=>{o=o||{};return `<text x="${(+x).toFixed(1)}" y="${(+y).toFixed(1)}" font-size="${(+s).toFixed(1)}"${o.a?` text-anchor="${o.a}"`:''} fill="${o.c||'#f8f0d9'}"${o.ls?` letter-spacing="${o.ls}"`:''} font-family="${o.ff||'Anton,sans-serif'}"${o.w?` font-weight="${o.w}"`:''}${o.op!=null?` opacity="${o.op}"`:''}${o.tl?` textLength="${o.tl}" lengthAdjust="spacingAndGlyphs"`:''}>${o.raw||esc(str)}</text>`};
const MK=(m,x,y,s,fill)=>{const M=(window.MODELS||{})[m];if(!M||!M.d)return '';const k=s/24;return `<path d="${M.d}"${M.fr?` fill-rule="${M.fr}"`:''} transform="translate(${(x-s/2).toFixed(1)} ${(y-s/2).toFixed(1)}) scale(${k.toFixed(4)})" fill="${fill||'#f8f0d9'}"/>`};
const INK={GPT:'#5ff0b4',KIMI:'#7fb6ff',CLAUDE:'#ff9d6b',GROK:'#f4efe4'};
/* a company mark lit on glass: white silhouette (dark-ground files as they are), fitted in a box */
const LIT=(u,x,y,w,h)=>u.logo?`<image href="${u.logo}" x="${(x-w/2).toFixed(1)}" y="${(y-h/2).toFixed(1)}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid meet" style="filter:${u.dark?'grayscale(1) brightness(1.5)':'brightness(0) invert(.95) sepia(.18)'}"/>`:T(x,y+h*.18,h*.5,String(u.ticker).split('.')[0],{a:'middle'});
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
  const hit=(x,y,w,h,href,lab,ext)=>`<a class="u3-hit" href="${href}"${ext?' target="_blank" rel="noopener"':''} aria-label="${esc(lab)}" style="left:${((x-crop[0])/(crop[2]-crop[0])*100).toFixed(2)}%;top:${((y-crop[1])/(crop[3]-crop[1])*100).toFixed(2)}%;width:${(w/(crop[2]-crop[0])*100).toFixed(2)}%;height:${(h/(crop[3]-crop[1])*100).toFixed(2)}%"></a>`;
  return `<div class="u3-fol">${stage({img:'media/p5-panel.jpg',W:1600,H:1600,crop,glass:[[g[0],g[1],g[2],g[3],16]],lit,silk,bloom:4,label:'Next trades drop on X'+(nx?': '+nx.d.day+' '+nx.d.date+', '+first.map(u=>u.co).join(', '):'')})}${hit(336*S-150,660*S-150,300,300,M.x,'Follow EZ on X',1)}${hit(658*S-150,660*S-150,300,300,'#/','Every round so far')}</div>`}

window.U3={slab,fitNames,stage,T,MK,INK,LIT,betDay,follow,key,pd,model,mount,esc,mlogo,coImg,coName,trade,lab,tile,wins,nm,md,short,left,fit,dayName}
})();
