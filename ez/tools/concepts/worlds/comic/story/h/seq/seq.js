/* seq (Round H12): Tonight at the close, the Upcoming top and the Leaderboard top as scrolled panel sequences in the bet's S1 spirit.
   Mockup only, laid over the built X3+ page by run.js. Every number comes from the page (ROUNDS, PENDING, UPCOMING, CAPS, CO_LOGOS,
   MODELS, __x2pPnl, __pr2Windows). Live words sit on surfaces the paintings left blank (measured corners, mapped with matrix3d), or in
   balloons and captions drawn in the panel. One small loop per panel at most; nothing needs a tap. Classes sq-.
   window.__sqNow (ms) moves the clock (a demo moment: rounds graded at or after that date go back to "calls in", their real calls kept). */
(function(){
const IMG=window.__sqImg||'img/';
const NOW=window.__sqNow||Date.now();
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ORDER=['GPT','KIMI','CLAUDE','GROK'],NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['SUN','MON','TUE','WED','THU','FRI','SAT'],WDL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
/* ---------- clocks (the page's own exchange closes) ---------- */
const XC={KS:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30]};
const CITY={KS:'3:30 PM SEOUL',T:'3:30 PM TOKYO',TW:'1:30 PM TAIPEI',HK:'4 PM HONG KONG',L:'4:30 PM LONDON',AS:'5:30 PM AMSTERDAM',DE:'5:30 PM FRANKFURT',SW:'5:30 PM ZURICH',PA:'5:30 PM PARIS'};
const IDF={};function closeAt(t,mdy){if(!mdy)return null;const [tz,h,mi]=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],[m,d,y]=mdy.split('/').map(Number),Y=2000+(y%100);
  const loc=x=>{const p=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));const g=k=>+p.find(q=>q.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  const want=Date.UTC(Y,m-1,d,h,mi);let x=want;for(let i=0;i<3;i++)x+=want-loc(x);return x}
const NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'2-digit',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hourCycle:'h23',weekday:'short'});
const ny=t=>{const p=NYF.formatToParts(new Date(t)),g=k=>(p.find(x=>x.type===k)||{}).value;return {y:+g('year'),m:+g('month'),d:+g('day'),h:+g('hour')%24,mi:+g('minute'),s:+g('second'),wd:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday'))}};
const num=s=>{const [m,d,y]=String(s).split('/').map(Number);return (y%100)*1e4+m*100+d};
const wdOf=s=>{const [m,d,y]=String(s).split('/').map(Number);return new Date(Date.UTC(2000+(y%100),m-1,d)).getUTCDay()};
const md=s=>{const [m,d]=String(s).split('/').map(Number);return MON[m-1].toUpperCase()+' '+d};
const inT=ms=>{const mn=Math.max(1,Math.round(ms/6e4)),h=Math.floor(mn/60);return h>=24?Math.floor(h/24)+'D '+(h%24)+'H':h?h+'H '+(mn%60)+'M':mn+'M'};
const T0=ny(NOW),TODAY=T0.y*1e4+T0.m*100+T0.d;
/* ---------- rounds at NOW ---------- */
const cnorm=c=>Array.isArray(c)?(()=>{const [dir,mag]=String(c[1]||'').split(' ');return {m:c[0],dir,mag:parseFloat(mag)}})():{m:c.m,dir:c.dir,mag:parseFloat(c.mag)};
const graded=[],pend=[],up=[];
(window.ROUNDS||[]).forEach(r=>{const at=closeAt(r.ticker,r.resolves);if(window.__sqNow&&at!=null&&at>NOW){if(num(r.called)<=TODAY)pend.push(Object.assign({},r,{calls:r.calls.map(cnorm)}));else up.push(Object.assign({},r,{calls:[]}))}else graded.push(r)});
(window.PENDING||[]).forEach(r=>pend.push(Object.assign({},r,{calls:(r.calls||[]).map(cnorm)})));
(window.UPCOMING||[]).forEach(r=>up.push(Object.assign({},r,{calls:[]})));
const fut=[...pend,...up].filter(r=>r.called);
const cap=r=>(window.CAPS||{})[r.ticker]||0;
const big=rs=>rs.slice().sort((a,b)=>cap(b)-cap(a)||a.n-b.n);
const days=[...new Set(fut.filter(r=>num(r.called)>=TODAY).map(r=>num(r.called)))].sort((a,b)=>a-b).map(n=>fut.find(r=>num(r.called)===n).called);
const dayRs=d=>big(fut.filter(r=>num(r.called)===num(d)));
/* tonight = rounds with calls in that grade at today's close; else the next day on the card */
const tonight=big(pend.filter(r=>r.resolves&&num(r.resolves)===TODAY&&closeAt(r.ticker,r.resolves)>NOW));
const nextDay=days[0],nextRs=nextDay?dayRs(nextDay):[];
const bells=[...pend,...up].filter(r=>r.resolves).map(r=>({r,t:closeAt(r.ticker,r.resolves)})).filter(x=>x.t>NOW).sort((a,b)=>a.t-b.t);
const bell=bells[0]||null,bellRs=bell?bells.filter(x=>x.t===bell.t).map(x=>x.r):[];
const callsIn=pend.length,toCall=up.length;
/* ---------- leaderboard ---------- */
const PN=window.__x2pPnl?window.__x2pPnl().A:{};const pnl=m=>PN[m]?(PN[m].pnl!=null?PN[m].pnl:PN[m].bal-100000):0;
const RS=(window.ROUNDS||[]).slice().sort((a,b)=>a.n-b.n),N=RS.length;
const per=(m,r)=>PN[m]&&PN[m].per&&PN[m].per[r.n]?PN[m].per[r.n].v:0;
const made=m=>RS.filter(r=>r.calls.some(c=>c[0]===m&&c[1])).length;
const rank=ORDER.slice().sort((a,b)=>((made(b)*2>=N)-(made(a)*2>=N))||(pnl(b)-pnl(a)));
const reign=(()=>{const bal={},cnt={};ORDER.forEach(m=>{bal[m]=0;cnt[m]=0});let from=null,prev=null,before=null,at=null;
  RS.forEach((r,i)=>{ORDER.forEach(m=>{bal[m]+=per(m,r);if(r.calls.some(c=>c[0]===m&&c[1]))cnt[m]++});const n=i+1;
    const o=ORDER.slice().sort((a,b)=>((cnt[b]*2>=n)-(cnt[a]*2>=n))||(bal[b]-bal[a]));if(o[0]!==rank[0]){from=null;prev=o[0]}else if(!from){from=r;before=prev;at=o.slice()}});
  return from?{r:from,before,at}:null})();
const WIN=window.__pr2Windows?window.__pr2Windows():null;
const wins={season:{k:'season',t:'Season',v:m=>pnl(m)},d7:{k:'d7',t:'7 days',v:m=>WIN&&WIN[m]?WIN[m].d7:0},d1:{k:'d1',t:'24h',v:m=>WIN&&WIN[m]?WIN[m].d1:0}};
const usd=v=>(v>=0?'+':'−')+'$'+Math.round(Math.abs(v)).toLocaleString('en-US');
const k$=v=>(v>=0?'+':'−')+'$'+(Math.abs(v)>=1000?(Math.abs(v)/1000).toFixed(Math.abs(v)>=1e5?0:1)+'K':Math.round(Math.abs(v)));
const last5=m=>{const s=RS.filter(r=>r.calls.some(c=>c[0]===m&&c[1])).slice(-5);return s.map(r=>{const c=r.calls.find(c=>c[0]===m);const k=cnorm(c);return (k.dir==='UP')===(r.a>0)})};
/* ---------- marks ---------- */
const mcol=m=>MODELS[m].c==='#111'?'#15121a':MODELS[m].c;
const mark=(m,fill,cls)=>{const M=MODELS[m];return `<svg class="sq-mk ${cls||''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${M.d}" fill="${fill||mcol(m)}" fill-rule="${M.fr||'nonzero'}"/>${M.dot?`<path d="${M.dot}" fill="${fill||M.dotc}"/>`:''}</svg>`};
const coLogo=t=>{const L=(window.CO_LOGOS||{})[t];return L&&L.f?'/media/'+L.f:null};const coDark=t=>!!((window.CO_LOGOS||{})[t]||{}).dark;
const logo=(t,cls)=>{const l=coLogo(t);return l?`<img class="sq-lg${coDark(t)?' sq-lgdk':''} ${cls||''}" src="${l}" alt="">`:''};
const cname=r=>`${esc(r.co)} (${esc(r.ticker)})`;
const callTxt=c=>c?`${c.dir==='UP'?'▲':'▼'} ${c.mag}%`:'';
const callOf=(r,m)=>(r.calls||[]).find(c=>c.m===m);
/* lettering helpers: each character its own slot, a hair off its neighbours (hand-placed letters) */
const jit=(s,amp)=>[...String(s)].map((ch,i)=>ch===' '?'<i class="sq-sp">&nbsp;</i>':`<i style="--r:${(((i*37)%7)-3)*(amp||.6)}deg;--y:${(((i*53)%5)-2)*.02}em">${esc(ch)}</i>`).join('');
const flap=s=>[...String(s)].map(ch=>`<i>${ch===' '?'&nbsp;':esc(ch)}</i>`).join('');
const S={};window.__sqData={TODAY,tonight:tonight.map(r=>r.n),nextDay,nextRs:nextRs.map(r=>r.n),days,bell:bell&&{t:bell.t,rs:bellRs.map(r=>r.n)},callsIn,toCall,rank,pnl:Object.fromEntries(ORDER.map(m=>[m,pnl(m)])),reign:reign&&{n:reign.r.n,before:reign.before}};

/* ---------- drawn shapes: balloons, captions (hand-tuned outlines, seeded wobble) ---------- */
const rnd=s=>()=>((s=Math.imul(s^s>>>15,2246822507)^Math.imul(s^s>>>13,3266489909))>>>0)/4294967296*2-1;
function blob(x,y,w,h,seed,tail){const R=rnd(seed||7),cx=x+w/2,cy=y+h/2,n=28,pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+R()*.02;pts.push([cx+Math.cos(a)*w/2*k*(1+.05*Math.pow(Math.abs(Math.cos(a)),5)),cy+Math.sin(a)*h/2*k])}
  const mid=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2];let d='M'+mid(pts[n-1],pts[0]).map(f).join(' ');
  for(let i=0;i<n;i++){const m=mid(pts[i],pts[(i+1)%n]);d+=`Q${f(pts[i][0])} ${f(pts[i][1])} ${f(m[0])} ${f(m[1])}`}d+='Z';
  let t='';if(tail){const [tx,ty]=tail,a=Math.atan2((ty-cy)/h,(tx-cx)/w),sp=.2,e=b=>[cx+Math.cos(b)*w/2*.92,cy+Math.sin(b)*h/2*.92],b1=e(a-sp),b2=e(a+sp),c=[(b1[0]+b2[0])/2*.5+tx*.5,(b1[1]+b2[1])/2*.5+ty*.5];
    t=`M${f(b1[0])} ${f(b1[1])}Q${f(c[0]+(b2[0]-b1[0])*.15)} ${f(c[1]+(b2[1]-b1[1])*.15)} ${f(tx)} ${f(ty)}Q${f(c[0]-(b2[0]-b1[0])*.05)} ${f(c[1]-(b2[1]-b1[1])*.05)} ${f(b2[0])} ${f(b2[1])}Z`}
  return {d,t}}
const f=v=>Math.round(v*10)/10;
const cxs=(a,w)=>a+w/2;
function cutRect(x,y,w,h,seed){const R=rnd(seed||3),j=()=>R()*Math.min(w,h)*.035;return `M${f(x+j())} ${f(y+j())}L${f(x+w*.5+j())} ${f(y+j()*.6)}L${f(x+w+j())} ${f(y+j())}L${f(x+w+j()*.6)} ${f(y+h*.5+j())}L${f(x+w+j())} ${f(y+h+j())}L${f(x+w*.5+j())} ${f(y+h+j()*.6)}L${f(x+j())} ${f(y+h+j())}L${f(x+j()*.6)} ${f(y+h*.5+j())}Z`}

/* ---------- a panel: the painting + its live layers ---------- */
/* o.q: [TLx,TLy,TRx,TRy,BRx,BRy,BLx,BLy] in % of the panel; o.r: [x,y,w,h] in %. o.fs: font size as a share of the surface's height. */
function panel(p){const a=p.a,VH=1000/a;let svg='',html='';
  (p.o||[]).forEach((o,i)=>{
    if(o.bal||o.cap){const b=o.bal||o.cap,[x,y,w,h]=b.r.map((v,j)=>j%2?v*VH/100:v*10),tl=b.tail&&[b.tail[0]*10,b.tail[1]*VH/100];
      const fill=b.fill||(o.bal?'#fff':'#5ec8ff');
      if(o.bal){const B=blob(x,y,w,h,i*11+5,tl);svg+=`<g transform="translate(5 6)" fill="#0d0b10"><path d="${B.d}"/>${B.t?`<path d="${B.t}"/>`:''}</g><path d="${B.d}" fill="none" stroke="#0d0b10" stroke-width="8"/>${B.t?`<path d="${B.t}" fill="${fill}" stroke="#0d0b10" stroke-width="8" stroke-linejoin="round"/>`:''}<path d="${B.d}" fill="${fill}"/><path d="${B.d}" fill="none" stroke="#0d0b10" stroke-width="1.4" opacity=".35" transform="translate(${f(cxs(x,w))} ${f(cxs(y,h))}) scale(.95) translate(${f(-cxs(x,w))} ${f(-cxs(y,h))})"/>`}
      else{const d=cutRect(x,y,w,h,i*7+3);svg+=`<path d="${d}" transform="translate(7 8)" fill="#0d0b10"/><path d="${d}" fill="${fill}" stroke="#0d0b10" stroke-width="6" stroke-linejoin="round"/><path d="${cutRect(x+9,y+9,w-18,h-18,i*7+4)}" fill="none" stroke="#0d0b10" stroke-width="1.6" opacity=".55"/>`}
      html+=`<div class="sq-tx ${o.bal?'sq-btx':'sq-ctx'} ${b.cls||''}" style="left:${b.r[0]}%;top:${b.r[1]}%;width:${b.r[2]}%;height:${b.r[3]}%;--fs:${b.fs||4.2}cqw">${b.html}</div>`;return}
    if(o.clock){const c=o.clock;html+=`<svg class="sq-clk" data-live="${c.live===false?0:1}" style="left:${c.cx-c.rx}%;top:${c.cy-c.ry}%;width:${c.rx*2}%;height:${c.ry*2}%" viewBox="-50 -50 100 100" preserveAspectRatio="none" aria-hidden="true">
      ${Array.from({length:12},(_,k)=>`<line x1="0" y1="-43" x2="0" y2="${k%3?-38:-34}" stroke="#0d0b10" stroke-width="${k%3?2:4}" transform="rotate(${k*30})"/>`).join('')}
      ${c.label?`<text y="${c.ly||20}" text-anchor="middle" class="sq-clkl">${esc(c.label)}</text>`:''}
      <g class="sq-hh"><path d="M-3.4 6 L0 -24 L3.4 6Z" fill="#0d0b10"/></g><g class="sq-hm"><path d="M-2.4 7 L0 -37 L2.4 7Z" fill="#0d0b10"/></g><g class="sq-hs"><line x1="0" y1="9" x2="0" y2="-39" stroke="#d31e18" stroke-width="1.6"/></g><circle r="3.6" fill="#0d0b10"/><circle r="1.4" fill="#fdbc2a"/></svg>`;return}
    if(o.sweep){const q=o.sweep;html+=`<div class="sq-sweep" style="clip-path:polygon(${q[0]}% ${q[1]}%,${q[2]}% ${q[3]}%,${q[4]}% ${q[5]}%,${q[6]}% ${q[7]}%)" aria-hidden="true"></div>`;return}
    const q=o.q||(o.r&&[o.r[0],o.r[1],o.r[0]+o.r[2],o.r[1],o.r[0]+o.r[2],o.r[1]+o.r[3],o.r[0],o.r[1]+o.r[3]]);
    const tag=o.href?'a':'div';html+=`<${tag} class="sq-o ${o.cls||''}" data-q="${q.join(',')}" style="--fs:${o.fs||.62}"${o.href?` href="${o.href}"`:''}${o.al?` aria-label="${esc(o.al)}"`:''}>${o.html}</${tag}>`});
  return `<figure class="sq-pn ${p.cls||''}" style="--a:${a};aspect-ratio:${a}"><img src="${IMG}${p.img}.jpg" alt="" class="sq-art"><svg class="sq-ink" viewBox="0 0 1000 ${f(VH)}" aria-hidden="true">${svg}</svg>${html}${p.alt?`<figcaption class="sq-sr">${esc(p.alt)}</figcaption>`:''}</figure>`}
/* the homography: the unit square onto the quad (Heckbert), as a CSS matrix3d for a w x h element */
function H(x0,y0,x1,y1,x2,y2,x3,y3){const dx1=x1-x2,dx2=x3-x2,dx3=x0-x1+x2-x3,dy1=y1-y2,dy2=y3-y2,dy3=y0-y1+y2-y3;let a,b,c,d,e,f2,g,h;
  if(Math.abs(dx3)<1e-9&&Math.abs(dy3)<1e-9){a=x1-x0;b=x3-x0;c=x0;d=y1-y0;e=y3-y0;f2=y0;g=0;h=0}
  else{const det=dx1*dy2-dx2*dy1;g=(dx3*dy2-dx2*dy3)/det;h=(dx1*dy3-dx3*dy1)/det;a=x1-x0+g*x1;b=x3-x0+h*x3;c=x0;d=y1-y0+g*y1;e=y3-y0+h*y3;f2=y0}
  return {a,b,c,d,e,f:f2,g,h}}
function place(root){root.querySelectorAll('.sq-pn').forEach(pn=>{const W=pn.clientWidth,Hh=pn.clientHeight;if(!W)return;
  pn.querySelectorAll('[data-q]').forEach(el=>{const q=el.dataset.q.split(',').map(Number),P=[0,1,2,3].map(i=>[q[i*2]*W/100,q[i*2+1]*Hh/100]);
    const w=Math.hypot(P[1][0]-P[0][0],P[1][1]-P[0][1]),h=Math.hypot(P[3][0]-P[0][0],P[3][1]-P[0][1]);const M=H(P[0][0],P[0][1],P[1][0],P[1][1],P[2][0],P[2][1],P[3][0],P[3][1]);
    el.style.width=w+'px';el.style.height=h+'px';el.style.setProperty('--qh',h+'px');el.style.setProperty('--qw',w+'px');
    el.style.transform=`matrix3d(${M.a/w},${M.d/w},0,${M.g/w},${M.b/h},${M.e/h},0,${M.h/h},0,0,1,0,${M.c},${M.f},0,1)`});fit(pn)})}
/* every surface fits its own words: step the type down until nothing runs past the painted edge */
function fit(pn){pn.querySelectorAll('.sq-o,.sq-tx').forEach(el=>{el.style.fontSize='';for(let k=0;k<4;k++){const sw=el.scrollWidth,cw=el.clientWidth,sh=el.scrollHeight,ch=el.clientHeight;if(sw<=cw+.5&&sh<=ch+.5)break;const r=Math.min(cw/sw,ch/sh)*.97;el.style.fontSize=(parseFloat(getComputedStyle(el).fontSize)*r)+'px'}})}
/* live clock hands: New York time (the bell's clock) */
function tick(root){const t=ny(Date.now()+(window.__sqNow?window.__sqNow-window.__sqT0:0));root.querySelectorAll('.sq-clk').forEach(c=>{
  c.querySelector('.sq-hh').style.transform=`rotate(${(t.h%12+t.mi/60)*30}deg)`;c.querySelector('.sq-hm').style.transform=`rotate(${(t.mi+t.s/60)*6}deg)`;c.querySelector('.sq-hs').style.transform=`rotate(${t.s*6}deg)`})}
window.__sqT0=Date.now();

/* ---------- words shared by the takes ---------- */
const head=(t)=>`<h2 class="sq-hd"><span class="sq-hw">${esc(t)}</span></h2>`;
const isT=tonight.length>0,T1=isT?tonight:nextRs,main=T1[0];
const dayLbl=d=>d?WDL[wdOf(d)]:'';
const bellLbl=bell?(()=>{const p=ny(bell.t);const t=bell.r.ticker;const loc=XC[(String(t).split('.')[1]||'')];return `${WD[p.wd]} ${MON[p.m-1].toUpperCase()} ${p.d} · ${loc?CITY[String(t).split('.')[1]]:'4 PM NEW YORK'}`})():'DATE TO COME';
const bellIn=bell?inT(bell.t-NOW):'';
const nextAfter=days.filter(d=>num(d)>(isT?TODAY:num(nextDay))).slice(0,3);
const dueTxt=main?(main.calls&&main.calls.length?'':`due ${WD[wdOf(main.called)].toLowerCase().replace(/^./,c=>c.toUpperCase())}`):'';
const chHead=isT?'Tonight at the close':'Next on the card';
const week=days.slice(0,5).map(d=>({d,rs:dayRs(d)}));
const L0=rank[0],L1=rank[1];
const deciding=reign&&reign.r;

/* each AI's envelope, gate, desk: its call if in, else when it is due */
const callOr=(r,m)=>{const c=callOf(r,m);return c?`<b class="sq-${c.dir==='UP'?'u':'d'}">${callTxt(c)}</b>`:`<b class="sq-due">${r?('due '+WD[wdOf(r.called)].toLowerCase()):''}</b>`};

/* =================================================================================================================== */
/* takes: each a heading + panels + tiers for phone (p) and desktop (d) */
const TK={};
const T=r=>r?`ROUND ${r.n} · ${esc(String(r.co).toUpperCase())} (${esc(r.ticker)})`:'';
/* ---- shared panels ---- */
const P_bell=(capTxt)=>({img:'f3-bell',a:1,alt:`The bell: ${bellLbl}`,o:[
  {clock:{cx:79.6,cy:47.4,rx:15.2,ry:22.2}},
  {q:[9.5,71.5,55.5,71.5,55.5,83,9.5,83],cls:'sq-brass',fs:.21,html:`<span>THE BELL</span><b>${esc(bellLbl)}</b><em>${bell?'IN '+esc(bellIn):''}${bellRs.length?` · ${bellRs.length} ROUND${bellRs.length>1?'S':''}`:''}</em>`},
  {cap:{r:[3,3,56,16],html:capTxt||'The close decides. Every prediction graded, no edits.',fs:3.9}}]});
const P_env=(r,capTxt)=>({img:'f2-envelopes',a:4/3,alt:`The four predictions for ${r?r.co:''}`,o:[
  ...ORDER.map((m,i)=>{const x=[3.3,27.6,51.8,76.1][i],w=20.6;return [
    {q:[x+1.5,30.5,x+w-1.5,30.5,x+w-1.5,37,x+1.5,37],cls:'sq-pen',fs:.74,html:esc(NM[m])},
    {r:[[13.4,38,62.3,86.6][i]-3.3,41.2,6.6,9],cls:'sq-wax',fs:1,html:mark(m,'#7a0c09')},
    {q:[x+1,58.5,x+w-1,58.5,x+w-1,65.8,x+1,65.8],cls:'sq-pen sq-penc',fs:.62,html:callOr(r,m)}]}).flat(),
  {q:[8,74.5,92,74.5,92,82,8,82],cls:'sq-brass sq-brass1',fs:.6,html:`<b>${T(r)}</b>`},
  {cap:{r:[2,4,46,15],html:'Before the report, the four seal their predictions.',fs:2.9}}]});
TK.tW1={k:'tonight',id:'tW1',name:'Fight night',desc:'the arena marquee, the four sealed envelopes, the bell, the posters for the nights after',
 head:chHead,panels:[
  {img:'f1-marquee',a:.75,alt:`${chHead}: ${T1.map(r=>r.co).join(', ')}`,o:[
   {q:[11,44.6,91,44.6,91,50.2,11,50.2],cls:'sq-marq sq-marqr',fs:.78,html:jit(`${isT?'TONIGHT':WD[wdOf(nextDay)]} · ${md(isT?main.resolves:nextDay).toUpperCase()}`)},
   ...T1.slice(0,2).map((r,i)=>({q:[11,51+i*5.1,91,51+i*5.1,91,55.6+i*5.1,11,55.6+i*5.1],cls:'sq-marq',fs:.78,html:jit((String(r.co).toUpperCase()+' ('+r.ticker+')')+(i===1&&T1.length>2?` +${T1.length-2}`:''))})),
   {q:[46.6,15,54.6,15,54.6,40,46.6,40],cls:'sq-blade',fs:.11,html:'<img src="/tools/v22/x2p-logo.svg" alt="">'},
   {q:[11,74,20.6,74,20.6,84,11,84],cls:'sq-card',fs:.2,html:`<span>CALLS</span><b>${main&&main.calls.length?main.calls.length+'/4 IN':'DUE '+(main?WD[wdOf(main.called)]:'')}</b>`},
   {q:[75.6,74.3,87.6,74.3,87.6,83.4,75.6,83.4],cls:'sq-card',fs:.2,html:`<span>BELL</span><b>${bell?esc(inT(bell.t-NOW)):'—'}</b>`},
   {sweep:[10.5,42.3,91.5,42.3,91.5,62,10.5,62]}]},
  P_env(main),
  P_bell(),
  {img:'f4-posters',a:4/3,alt:'The nights after',o:[
   ...nextAfter.slice(0,3).map((d,i)=>{const B=[[5,10.5,31.5,10.5,31.5,25,5,25],[33,15,56,15,56,29,33,29],[57,19.5,78.5,19.5,78.5,33.5,57,33.5]][i],Bo=[[5,27,31.5,27,31.5,76,5,76],[33,31,56,31,56,77,33,77],[57,35.5,74,35.5,74,76,57,76]][i],rs=dayRs(d);
     return [{q:B,cls:'sq-band',fs:.62,html:jit(`${WD[wdOf(d)]} ${md(d).toUpperCase()}`,.4)},
       {q:Bo,cls:'sq-post',fs:.1,html:`${logo(rs[0].ticker)}<b>${esc(String(rs[0].co).toUpperCase())}</b><small>(${esc(rs[0].ticker)})</small><em>${rs.length>1?'+'+(rs.length-1)+' MORE':'MAIN EVENT'}</em>`}]}).flat(),
   {q:[75,37,96,37,98,44.5,96,52,75,52],cls:'sq-arrow',fs:.27,href:'#/upcoming',al:'See everything coming up',html:'<b>EVERYTHING</b><b>COMING UP</b>'}]}],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};
/* fix the arrow (5 points given above for the board's sake): the quad is its rectangle */
TK.tW1.panels[3].o[TK.tW1.panels[3].o.length-1].q=[74.5,37,97,37,97,52.5,74.5,52.5];

/* ---- W2 the station ---- */
const P_gates=(r,capTxt)=>({img:'s2-gates',a:4/3,alt:`Four ticket barriers: the predictions for ${r?r.co:''}`,o:[
  {q:[18,2.6,81,2.6,81,18.4,18,18.4],cls:'sq-sign',fs:.32,html:`<b>${r?esc(String(r.co).toUpperCase()):''}</b><small>${r?'('+esc(r.ticker)+') · ROUND '+r.n:''}</small>`},
  {q:[1.8,2.6,12.4,2.6,12.4,18.4,1.8,18.4],cls:'sq-sign',fs:.3,html:`<b>${r?WD[wdOf(r.called)]:''}</b>`},
  {q:[87.7,2.6,97.8,2.6,97.8,18.4,87.7,18.4],cls:'sq-sign',fs:.3,html:`<b>R${r?r.n:''}</b>`},
  ...ORDER.map((m,i)=>{const cx=[15.4,37.9,61.6,85.4][i],fx=[[5,17],[29.3,41],[55.6,68],[77,92]][i];return [
   {r:[cx-3.4,22.6,6.8,9],cls:'sq-med',fs:.86,html:mark(m,'#4a3205')},
   {q:[fx[0],53,fx[1],53,fx[1],60,fx[0],60],cls:'sq-eng',fs:.56,html:esc(NM[m].toUpperCase())},
   {q:[fx[0],62,fx[1],62,fx[1],72,fx[0],72],cls:'sq-eng sq-engc',fs:.36,html:callOr(r,m)}]}).flat(),
  {cap:{r:[2,86,62,12],html:capTxt||'Each AI buys its ticket before the report.',fs:3}}]});
const P_doors=()=>({img:'s3-doors',a:1,alt:`The doors close at the bell: ${bellLbl}`,o:[
  {clock:{cx:50.2,cy:14.8,rx:10.6,ry:11.6}},
  {q:[2,70.5,29,70.5,29,79.5,2,79.5],cls:'sq-paint',fs:.42,html:`<b>${bell?WD[ny(bell.t).wd]+' '+MON[ny(bell.t).m-1].toUpperCase()+' '+ny(bell.t).d:''}</b>`},
  {q:[71,70.5,98,70.5,98,79.5,71,79.5],cls:'sq-paint',fs:.42,html:`<b>${bell?'IN '+esc(bellIn):''}</b>`},
  {bal:{r:[2,24,40,27],tail:[36,52],html:'Doors shut at the close. The market grades every ticket.',fs:3.2}}]});
TK.tW2={k:'tonight',id:'tW2',name:'The station',desc:'the departures board, the four ticket barriers, the doors shutting at the bell, the platforms for the days after',
 head:chHead,panels:[
  {img:'s1-hall',a:.75,alt:'The departures board',o:[
   {clock:{cx:50.7,cy:33.6,rx:9.4,ry:7}},
   ...[...T1,...fut.filter(r=>!T1.includes(r)&&num(r.called)>=TODAY).sort((a,b)=>num(a.called)-num(b.called)||cap(b)-cap(a))].slice(0,6).map((r,i)=>{const y=42.4+i*4.28,hot=i<T1.length;
     return {q:[19.6,y,81.6,y,81.6,y+3.6,19.6,y+3.6],cls:'sq-flap'+(hot?' sq-hot':''),fs:.8,html:`<span class="sq-c1">${flap(WD[wdOf(r.called)])}</span><span class="sq-c2">${flap(String(r.co).toUpperCase().slice(0,11))}</span><span class="sq-c3">${flap(r.ticker.split('.')[0].slice(0,5))}</span>`}})]},
  P_gates(main),
  P_doors(),
  {img:'s4-platforms',a:4/3,alt:'The days after',o:[
   ...nextAfter.slice(0,3).map((d,i)=>{const Q=[[13.6,7.2,44.4,7.2,44.4,24.4,13.6,24.4],[54.6,20.4,69.4,20.4,69.4,29.6,54.6,29.6],[76.2,29.8,85.2,29.8,85.2,34.8,76.2,34.8]][i],rs=dayRs(d);
     return {q:Q,cls:'sq-psign',fs:i?.5:.3,html:i?`<b>${WD[wdOf(d)]} · ${rs.length}</b>`:`<b>${WD[wdOf(d)]} ${md(d).toUpperCase()}</b><span>${logo(rs[0].ticker)}${esc(String(rs[0].co).toUpperCase())} +${rs.length-1}</span>`}}),
   {q:[40.5,57.6,80,59.5,80.6,79.5,40.5,83.8],cls:'sq-arrow sq-arrow2',fs:.3,href:'#/upcoming',al:'See everything coming up',html:'<b>EVERYTHING</b><b>COMING UP</b>'}]}],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};

/* ---- W3 the floor ---- */
const P_posts=(r,capTxt)=>({img:'e2-posts',a:4/3,alt:`Four desks: the predictions for ${r?r.co:''}`,o:[
  ...['GROK','GPT','CLAUDE','KIMI'].map((m,i)=>{const cx=[15.4,37.6,61.9,84.3][i],sx=[[8.6,18.8],[32.1,42.4],[57.3,67.4],[80.6,90.9]][i];return [
   {r:[cx-3.2,20.6,6.4,8.6],cls:'sq-disc',fs:.9,html:mark(m,'#fff')},
   {q:[sx[0],44.6,sx[1],44.6,sx[1],52.6,sx[0],52.6],cls:'sq-chalk',fs:.42,html:esc(NM[m].toUpperCase())},
   {q:[sx[0],53.6,sx[1],53.6,sx[1],63.4,sx[0],63.4],cls:'sq-chalk sq-chalkc',fs:.5,html:callOr(r,m).replace('class="sq-','class="sq-ch-')}]}).flat(),
  {cap:{r:[2,82.5,60,15],html:capTxt||(r?`${esc(r.co)} (${esc(r.ticker)}): one prediction per desk, before the report.`:''),fs:2.9}}]});
TK.tW3={k:'tonight',id:'tW3',name:'The floor',desc:'the exchange floor’s slate, four trading desks, the bell, the ticker tape running into the days after',
 head:chHead,panels:[
  {img:'e1-floor',a:.75,alt:'The slate on the floor',o:[
   {clock:{cx:50,cy:27,rx:6.4,ry:4.8}},
   {q:[25,35.4,75.6,35.4,75.6,59.4,25,59.4],cls:'sq-slate',fs:.075,html:`<b class="sq-sl1">${isT?'TONIGHT':WD[wdOf(nextDay)]+' '+md(nextDay).toUpperCase()}</b>
     <span class="sq-slg">${T1.slice(0,3).map(r=>`<i>${logo(r.ticker)}<small>${esc(String(r.co).toUpperCase())} (${esc(r.ticker)})</small></i>`).join('')}</span>
     <b class="sq-sl3">${isT?`${T1.length} GRADED AT THE CLOSE`:`${T1.length} REPORT${T1.length>1?'S':''} · PREDICTIONS DUE`}</b>`}]},
  P_posts(main),
  P_bell('DING! The close grades every prediction.'),
  {img:'e3-tape',a:4/3,alt:'The ticker tape: the days after',o:[
   {q:[40,7.2,64.8,7.2,64.8,41.6,40,41.6],cls:'sq-note',fs:.085,html:nextAfter.slice(0,3).map(d=>{const rs=dayRs(d);return `<p><b>${WD[wdOf(d)]}</b>${logo(rs[0].ticker)}<span>${esc(String(rs[0].co).toUpperCase())}${rs.length>1?' +'+(rs.length-1):''}</span></p>`}).join('')},
   {q:[66,81,97,71,98.5,80,67.5,90.5],cls:'sq-tape',fs:.5,href:'#/upcoming',al:'See everything coming up',html:'<b>EVERYTHING COMING UP →</b>'}]}],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};

/* =================================== Upcoming top: the week, same three worlds =================================== */
const wk=week.slice(0,3);
TK.uW1={k:'upcoming',id:'uW1',name:'Fight night',desc:'the marquee bills the week, posters for each night, the envelopes for the next main event, the bell',
 head:'Next on the card',panels:[
  {img:'f1-marquee',a:.75,alt:'This week on the card',o:[
   {q:[11,44.6,91,44.6,91,50.2,11,50.2],cls:'sq-marq sq-marqr',fs:.74,html:jit(`${fut.length} ROUNDS TO COME`)},
   {q:[11,51,91,51,91,55.6,11,55.6],cls:'sq-marq',fs:.78,html:jit(`MAIN EVENT: ${main?String(main.co).toUpperCase()+' ('+main.ticker+')':''}`)},
   {q:[11,56.1,91,56.1,91,60.7,11,60.7],cls:'sq-marq',fs:.78,html:jit(`${WD[wdOf(nextDay)]} ${md(nextDay).toUpperCase()} · ${nextRs.length} ON THE CARD`)},
   {q:[46.6,15,54.6,15,54.6,40,46.6,40],cls:'sq-blade',fs:.11,html:'<img src="/tools/v22/x2p-logo.svg" alt="">'},
   {q:[11,74,20.6,74,20.6,84,11,84],cls:'sq-card',fs:.2,html:`<span>CALLS IN</span><b>${callsIn}/${callsIn+toCall}</b>`},
   {q:[75.6,74.3,87.6,74.3,87.6,83.4,75.6,83.4],cls:'sq-card',fs:.2,html:`<span>BELL</span><b>${bell?esc(inT(bell.t-NOW)):'—'}</b>`},
   {sweep:[10.5,42.3,91.5,42.3,91.5,62,10.5,62]}]},
  {img:'f4-posters',a:4/3,alt:'The nights on the card',o:[
   ...wk.map((w,i)=>{const B=[[5,10.5,31.5,10.5,31.5,25,5,25],[33,15,56,15,56,29,33,29],[57,19.5,78.5,19.5,78.5,33.5,57,33.5]][i],Bo=[[5,27,31.5,27,31.5,76,5,76],[33,31,56,31,56,77,33,77],[57,35.5,74,35.5,74,76,57,76]][i];
     return [{q:B,cls:'sq-band',fs:.62,html:jit(`${WD[wdOf(w.d)]} ${md(w.d).toUpperCase()}`,.4)},
       {q:Bo,cls:'sq-post',fs:.1,html:`${logo(w.rs[0].ticker)}<b>${esc(String(w.rs[0].co).toUpperCase())}</b><small>(${esc(w.rs[0].ticker)})</small><em>${w.rs.length>1?'+'+(w.rs.length-1)+' MORE':'MAIN EVENT'}</em>`}]}).flat(),
   {q:[74.5,37,97,37,97,52.5,74.5,52.5],cls:'sq-arrow',fs:.27,html:'<b>EVERY ROUND</b><b>BELOW</b>'}]},
  P_env(main,`${esc(main?main.co:'')} first: the four seal their predictions before the report.`),
  P_bell('The close settles it. Then the next fight.')],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};
TK.uW2={k:'upcoming',id:'uW2',name:'The station',desc:'the departures board lists every day this week, platforms per day, the barriers for the next main event, the doors at the bell',
 head:'Next on the card',panels:[
  {img:'s1-hall',a:.75,alt:'The departures board: the week',o:[
   {clock:{cx:50.7,cy:33.6,rx:9.4,ry:7}},
   ...week.slice(0,6).map((w,i)=>{const y=42.4+i*4.28;return {q:[19.6,y,81.6,y,81.6,y+3.6,19.6,y+3.6],cls:'sq-flap'+(i===0?' sq-hot':''),fs:.8,html:`<span class="sq-c1">${flap(WD[wdOf(w.d)])}</span><span class="sq-c2">${flap(String(w.rs[0].co).toUpperCase().slice(0,11))}</span><span class="sq-c3">${flap('+'+(w.rs.length-1))}</span>`}}),
   ...(week.length<6?[{q:[19.6,42.4+week.length*4.28,81.6,42.4+week.length*4.28,81.6,46+week.length*4.28,19.6,46+week.length*4.28],cls:'sq-flap',fs:.8,html:`<span class="sq-c1">${flap('ALL')}</span><span class="sq-c2">${flap(String(fut.length)+' ROUNDS')}</span><span class="sq-c3">${flap('')}</span>`}]:[])]},
  {img:'s4-platforms',a:4/3,alt:'Platforms: the days',o:[
   ...week.slice(0,3).map((w,i)=>{const Q=[[13.6,7.2,44.4,7.2,44.4,24.4,13.6,24.4],[54.6,20.4,69.4,20.4,69.4,29.6,54.6,29.6],[76.2,29.8,85.2,29.8,85.2,34.8,76.2,34.8]][i];
     return {q:Q,cls:'sq-psign',fs:i?.5:.3,html:i?`<b>${WD[wdOf(w.d)]} · ${w.rs.length}</b>`:`<b>${WD[wdOf(w.d)]} ${md(w.d).toUpperCase()}</b><span>${logo(w.rs[0].ticker)}${esc(String(w.rs[0].co).toUpperCase())} +${w.rs.length-1}</span>`}}),
   {q:[40.5,57.6,80,59.5,80.6,79.5,40.5,83.8],cls:'sq-arrow sq-arrow2',fs:.3,html:'<b>EVERY ROUND</b><b>BELOW</b>'}]},
  P_gates(main,`${esc(main?main.co:'')} first: each AI buys its ticket before the report.`),
  P_doors()],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};
TK.uW3={k:'upcoming',id:'uW3',name:'The floor',desc:'the slate chalks the week, four desks with the next predictions, the tape carries the days, the bell',
 head:'Next on the card',panels:[
  {img:'e1-floor',a:.75,alt:'The slate: the week',o:[
   {clock:{cx:50,cy:27,rx:6.4,ry:4.8}},
   {q:[25,35.4,75.6,35.4,75.6,59.4,25,59.4],cls:'sq-slate sq-slatew',fs:.066,html:`<b class="sq-sl1">THE WEEK</b>${week.slice(0,5).map(w=>`<p><b>${WD[wdOf(w.d)]}</b>${logo(w.rs[0].ticker)}<span>${esc(String(w.rs[0].co).toUpperCase())}</span><em>${w.rs.length}</em></p>`).join('')}`}]},
  P_posts(main),
  {img:'e3-tape',a:4/3,alt:'The tape',o:[
   {q:[40,7.2,64.8,7.2,64.8,41.6,40,41.6],cls:'sq-note',fs:.08,html:`<p><b>IN</b><span>${callsIn} OF ${callsIn+toCall} PREDICTIONS</span></p><p><b>NEXT</b><span>${main?esc(String(main.co).toUpperCase()):''}</span></p><p><b>BELL</b><span>${bell?esc(inT(bell.t-NOW)):''}</span></p>`},
   {q:[66,81,97,71,98.5,80,67.5,90.5],cls:'sq-tape',fs:.5,html:'<b>EVERY ROUND BELOW ↓</b>'}]},
  P_bell('DING! The close grades every prediction.')],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};

/* =================================== Leaderboard top =================================== */
const stubs=(q,cls)=>({q,cls:'sq-stubs '+(cls||''),fs:.5,html:['season','d7','d1'].map((k,i)=>`<button type="button" data-w="${k}"${i?'':' aria-pressed="true"'}>${wins[k].t}</button>`).join('')});
const dec=deciding?`${NM[L0]} took the ticket on ${esc(deciding.co)} (${esc(deciding.ticker)}), round ${deciding.n}.`:'';
const plateTxt=(m,w)=>`<b>${esc(NM[m].toUpperCase())}</b><span data-v="${m}">${usd(wins[w||'season'].v(m))}</span><em>${PN[m]?PN[m].W+'-'+PN[m].L:''}</em>`;
TK.lA={k:'leaderboard',id:'lA',name:'Title fight',desc:'the golden ticket hangs over the ring, the two corners’ placards, the round that decided it, the announcer',
 head:'Who’s winning?',panels:[
  {img:'a1-arena',a:.75,alt:`${NM[L0]} holds the golden ticket`,o:[
   {q:[27.5,48.6,77.5,48.6,77.5,64.6,27.5,64.6],cls:'sq-gt',fs:.2,html:`<span>GOLDEN TICKET</span><b>${esc(NM[L0].toUpperCase())}</b><em data-v="${L0}">${usd(pnl(L0))}</em>`},
   {q:[25,21.4,54.2,24.2,54.2,34.2,25,33.4],cls:'sq-jt',fs:.36,html:`<span>#1</span><b>${esc(NM[L0].toUpperCase())}</b>`},
   {q:[57.6,24.4,78,21,78,33.2,57.6,34.4],cls:'sq-jt',fs:.36,html:`<span>#2</span><b>${esc(NM[L1].toUpperCase())}</b>`},
   {sweep:[22.6,45.6,81,45.6,81,67,22.6,67]}]},
  {img:'a2-corners',a:4/3,alt:`${NM[L0]} against ${NM[L1]}`,o:[
   {q:[4.6,7.6,29.6,10.4,29.4,34.6,4.4,34.2],cls:'sq-plac',fs:.13,html:`${mark(L0)}${plateTxt(L0)}<small>GOLDEN TICKET</small>`},
   {q:[70.2,10.8,95.6,8.6,95.8,37.4,70.4,37.6],cls:'sq-plac',fs:.13,html:`${mark(L1)}${plateTxt(L1)}<small>CHALLENGER</small>`},
   stubs([30,78,70,78,70,87,30,87]),
   {q:[3,92.4,97,92.4,97,99,3,99],cls:'sq-apron',fs:.62,html:`UNDERCARD ${rank.slice(2).map(m=>`<b>${esc(NM[m].toUpperCase())}</b> <span data-v="${m}">${usd(pnl(m))}</span>`).join(' · ')}`}]},
  {img:'a3-punch',a:1,alt:dec,o:[
   {r:[38,30,44,40],cls:'sq-tgt',fs:.5,html:deciding?logo(deciding.ticker):''},
   {r:[2,1,52,17],cls:'sq-sfx',fs:.72,html:jit('KRAK!',2)},
   {cap:{r:[2,79,64,18],html:dec,fs:3.6}}]},
  {img:'a4-mic',a:1,alt:'The announcer',o:[
   {bal:{r:[3,8,52,30],tail:[66,50],html:`The ticket holder’s call is the one we bet the pool on.`,fs:4.2}},
   {q:[33,92.6,95,92.6,95,97.8,33,97.8],cls:'sq-apron',fs:.62,html:`NEXT BELL ${bell?esc(bellLbl.split(' · ')[0]):''} · ${bell?'IN '+esc(bellIn):''}`},
   {cap:{r:[3,58,40,16],html:'The tale of the tape ↓',fs:3.8,fill:'#03c870'}}]}],
 p:[[0],[1],[2],[3]],d:[[0,1],[2,3]]};
TK.lB={k:'leaderboard',id:'lB',name:'The race',desc:'the tote board posts the standings, four cars at the line (gold = the leader), the photo finish of the round that decided it',
 head:'Who’s winning?',panels:[
  {img:'r1-track',a:.75,alt:'The tote board',o:[
   ...rank.map((m,i)=>{const y=[40.6,47.8,55.2,62.6][i];return {q:[20.4,y,81,y,81,y+5.6,20.4,y+5.6],cls:'sq-tote'+(i?'':' sq-tote1'),fs:.66,html:`<i>${i+1}</i>${mark(m)}<b>${esc(NM[m].toUpperCase())}</b><span data-v="${m}">${usd(pnl(m))}</span>`}}),
   stubs([18,72,82,72,82,77,18,77],'sq-stubs2')]},
  {img:'r2-finish',a:16/9,alt:'Four cars at the line',o:[
   ...[['GPT',12.2,53.6],['GROK',39.2,60.6],['CLAUDE',64.2,53.6],['KIMI',88.4,53.6]].map(([m,x,y])=>({r:[x-3.4,y-5,6.8,10],cls:'sq-rnd',fs:.8,html:mark(m)})),
   {bal:{r:[2,3,40,26],tail:[22,40],html:`${esc(NM[L0])} leads by ${k$(pnl(L0)-pnl(L1)).replace('+','')}. Its call is the one we bet the pool on.`,fs:2.4}}]},
  {img:'r3-photo',a:1,alt:dec,o:[
   {q:[39.6,11.6,58.8,11.6,58.8,88,39.6,88],cls:'sq-film',fs:.05,html:deciding?`<span>PHOTO FINISH</span>${logo(deciding.ticker)}<b>${esc(String(deciding.co).toUpperCase())} (${esc(deciding.ticker)})</b><em>ROUND ${deciding.n}</em><strong>${esc(NM[L0].toUpperCase())} TAKES THE LEAD</strong>`:''},
   {cap:{r:[2,80,40,17],html:`Next race: ${bell?esc(bellLbl.split(' · ')[0]):''}`,fs:3.8,fill:'#03c870'}}]}],
 p:[[0],[1],[2]],d:[[0,1],[2]]};
TK.lB.d=[[0,2],[1]];
TK.lC={k:'leaderboard',id:'lC',name:'The ticket hall',desc:'the golden ticket in its case, the honours board of brass plates, the plates swapped when the ticket changed hands',
 head:'Who’s winning?',panels:[
  {img:'h1-hall',a:.75,alt:'The golden ticket in its case',o:[
   ...rank.map((m,i)=>{const y=[34.4,42.4,48.8,55.2][i],h=i?5.1:6.6;return {q:[36.4,y,64.4,y,64.4,y+h,36.4,y+h],cls:'sq-eng sq-engp',fs:i?.5:.42,html:`${esc(NM[m].toUpperCase())}`}}),
   {sweep:[32,63,68,63,68,79,32,79]}]},
  {img:'h2-plates',a:4/3,alt:'The honours board',o:[
   ...rank.map((m,i)=>{const y=[9.6,37.8,55.4,73.4][i],h=i?13:21,x0=i?17:22;return [
     {r:[i?13.6:16.2,y+h*.18,i?7.4:12.4,h*.64],cls:'sq-med2',fs:.86,html:mark(m,'#4a3205')},
     {q:[x0+5,y+1,83,y+1,83,y+h-1,x0+5,y+h-1],cls:'sq-plate'+(i?'':' sq-plate1'),fs:i?.42:.3,html:`${i?'':'<small>GOLDEN TICKET</small>'}${plateTxt(m)}`}]}).flat(),
   stubs([26,90.6,74,90.6,74,97.4,26,97.4],'sq-stubs3')]},
  {img:'h3-swap',a:1,alt:dec,o:[
   ...(reign&&reign.before?[{q:[24.8,7.6,79.6,4,79.6,22.6,24.8,25],cls:'sq-eng sq-engs',fs:.4,html:esc(NM[reign.before].toUpperCase())},
     {q:[23.2,46.6,82.8,42.4,82.8,61,23.2,64],cls:'sq-eng sq-engs',fs:.4,html:esc(NM[L0].toUpperCase())}]:[]),
   {cap:{r:[2,72,58,22],html:deciding?`Round ${deciding.n}, ${esc(deciding.co)} (${esc(deciding.ticker)}): ${esc(NM[L0])} takes the top plate. Its call is the one we bet the pool on.`:'',fs:3.3}}]}],
 p:[[0],[1],[2]],d:[[0,1],[2]]};
TK.lC.d=[[0,2],[1]];

/* ---------- build ---------- */
function build(id){const t=TK[id];const el=document.createElement('section');el.className='sq-ch sq-'+t.k;el.dataset.take=id;el.setAttribute('aria-label',t.head);
  el.innerHTML=head(t.head)+`<div class="sq-pg sq-ph">${t.p.map(row=>`<div class="sq-tier">${row.map(i=>panel(t.panels[i])).join('')}</div>`).join('')}</div>`+`<div class="sq-pg sq-dk">${t.d.map(row=>`<div class="sq-tier">${row.map(i=>panel(t.panels[i])).join('')}</div>`).join('')}</div>`;
  el.querySelectorAll('.sq-stubs button').forEach(b=>b.addEventListener('click',()=>{const w=b.dataset.w;el.querySelectorAll('.sq-stubs button').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.w===w)));
    el.querySelectorAll('[data-v]').forEach(s=>{s.textContent=usd(wins[w].v(s.dataset.v))})}));
  return el}
S.TK=TK;S.build=build;S.place=place;S.tick=tick;S.data=window.__sqData;
window.SQ=S;
let tm=null;S.start=root=>{place(root);tick(root);if(!RM){clearInterval(tm);tm=setInterval(()=>tick(root),1000)}addEventListener('resize',()=>place(root))};
})();
