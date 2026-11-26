/* Round H27 · rank2: Meet the models that reads as a leaderboard. A mockup laid over the live meet10 (x2p_chips.js + x2p_meet10.js) without touching it.
   The chips keep meet10's content (No., Season P&L, W-L, the quote, the founder loop) and the strip; what changes is how rank reads:
   one column at every width (or the champion beside the challengers on desktop, take c), #1 largest, the rank numeral big and outside the chip,
   the gap in P&L visible. Takes (window.__R2T):
     'a' THE LADDER: each rank a size smaller (#1 100%, then 95, 91, 87%), the numeral in the comic's lettering in the gutter beside each chip
         (#1 gold and biggest), and in each step a gold tag with the drop to the one above ("$45,530 behind Grok"), measured from the sheet.
     'b' THE CLIFF: the same column, but the space between two chips grows with the P&L between them (4 px + 0.75 px per $1,000 on a phone,
         1.3 px per $1,000 on desktop), so close rivals sit close and the break between profit and loss opens up; the $100K start is drawn as a
         line across that space ("Break-even"), and each space carries its figure. #1 is a size larger than the rest.
     'c' THE CHAMPION: #1 alone and biggest under a "No. 1" plate, then the challengers 2 to 4 a size down, each headed by its numeral and a bar
         of the distance to No. 1, to one scale (the longest bar = the biggest gap). Desktop: the champion on the left, the challengers in a column
         on the right, the strip in the gap feeding both (meet10's own desktop strip).
   Numbers: window.__x2pPnl() (bal - $100,000 = season P&L), ranks from the chip order meet10 built (season P&L). Nothing typed.
   Text: the quote refitted per chip, so a bigger chip shows its quote bigger (same line breaks scaled; one cap for all, set by the smallest).
   window.__r2 = {layout, measure}. */
(function(){const W=window,D=document;let tries=0;
(function go(){const sec=D.querySelector('section.c8.m10'),four=sec&&sec.querySelector('.c8-four');
 if(!four||!W.__m10||!D.documentElement.classList.contains('m10-ready')){if(++tries<400)setTimeout(go,50);return}
 try{run(sec,four)}catch(e){W.__r2Err=e;console.error(e)}})();
function run(sec,four){
const T=(W.__R2T||'a').toLowerCase(),P=W.__x2pPnl(),A=P.A,MD=W.MODELS||{};
const ones=[...four.querySelectorAll('.c8-one')],ms=ones.map(o=>o.dataset.m);ones.forEach((o,i)=>o.dataset.r=i+1);
const pl=m=>A[m].bal-1e5,NM=m=>(MD[m]&&MD[m].name)||m.charAt(0)+m.slice(1).toLowerCase();
const $=v=>(v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US'),$a=v=>'$'+Math.abs(Math.round(v)).toLocaleString('en-US');
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
sec.classList.add('r2','r2-'+T);
const L=D.createElement('div');L.className='r2-l';L.setAttribute('aria-hidden','true');four.append(L);
/* the numerals: the comic's own lettering (the head's Bangers, extruded); #1 gold, the rest cream, each extruded in its chip's colour */
const CCOL={GROK:'#5b5148',CLAUDE:'#cd5e26',GPT:'#207e49',KIMI:'#3c5691'};
const nums=ones.map((o,i)=>{const e=D.createElement('b');e.className='r2-n'+(i?'':' r2-n1');e.style.setProperty('--cc',CCOL[ms[i]]||'#444');e.innerHTML=`<span>${i+1}</span>`;L.append(e);return e});
/* the gaps, from the sheet: to the one above (a, b) or to No. 1 (c) */
const gUp=ms.map((m,i)=>i?pl(ms[i-1])-pl(m):0),gTop=ms.map(m=>pl(ms[0])-pl(m)),gMax=Math.max(...gTop);
let tags=[],rail=null,bars=[],plate=null;
if(T==='a')tags=ones.map((o,i)=>{if(!i)return null;const e=D.createElement('div');e.className='r2-tag';e.innerHTML=`<i></i><b>${$a(gUp[i])}</b> <span>behind ${esc(NM(ms[i-1]))}</span>`;L.append(e);return e});
if(T==='b'){tags=ones.map((o,i)=>{if(!i)return null;const e=D.createElement('div');e.className='r2-dim';e.innerHTML=`<i class="r2-dl"></i><b>${$a(gUp[i])}</b>`;L.append(e);return e});
 const k=ms.findIndex(m=>pl(m)<0);if(k>0){rail=D.createElement('div');rail.className='r2-rail';rail.innerHTML='<i></i><span><b>$0</b> · Break-even</span><i></i>';rail.dataset.k=k;L.append(rail)}}
if(T==='c'){plate=D.createElement('div');plate.className='r2-plate';plate.innerHTML=gUp[1]>0?`<b>Leads by</b> <span>${$a(gUp[1])}</span>`:`<b>Tied for No. 1</b>`;L.append(plate);
 bars=ones.map((o,i)=>{if(!i)return null;const e=D.createElement('div');e.className='r2-bar';e.innerHTML=`<div class="r2-bt"><i style="--f:${(gTop[i]/gMax).toFixed(4)}"></i></div><span><b>${$a(gTop[i])}</b> behind No. 1</span>`;L.append(e);return e})}
/* ---------- sizes ---------- */
const desk=()=>innerWidth>=1000;
const KW={a:[1,.95,.91,.87],b:[1,.92,.92,.92],c:[1,.86,.86,.86]}[T]||[1,1,1,1],KN={a:[1,.97,.94,.91],b:[1,.95,.95,.95],c:[1,.92,.92,.92]}[T]||[1,1,1,1];/* under 360px the steps are smaller, so the quote stays readable */
function size(){const dk=desk(),cw=four.clientWidth,cs=getComputedStyle(four),padL=parseFloat(cs.paddingLeft),padR=parseFloat(cs.paddingRight),inner=cw-padL-padR;
 ones.forEach(o=>{o.style.width='';o.style.marginTop=''});
 if(T==='c'&&dk){/* champion left, challengers right: the grid in CSS; sizes from the column widths */return}
 const top=Math.min(inner,dk?(T==='a'?820:760):9e9),K=innerWidth<360?KN:KW;
 ones.forEach((o,i)=>{o.style.width=(top*K[i]).toFixed(1)+'px'});
 if(T==='b'){const s=dk?1.3e-3:.75e-3,g0=dk?18:10;ones.forEach((o,i)=>{if(i)o.style.marginTop=(g0+s*gUp[i]).toFixed(1)+'px'})}}
/* ---------- the quote, per chip: one cap for all (set by the smallest chip), scaled up on the bigger ones (meet10's wrap, copied) ---------- */
const LW=[408,418,1251,603],LT=[434,436,1225,585],LH=1.1;const cv=D.createElement('canvas').getContext('2d');
const tw=(s,fs)=>{cv.font=`${fs}px Anton`;return cv.measureText(s).width+s.length*fs*.02};
let CAP=.735;const capR=()=>{cv.font='100px Anton';const m=cv.measureText('H');if(m.actualBoundingBoxAscent>40)CAP=m.actualBoundingBoxAscent/100};
function bal(ws,fs){let b=null;for(let i=1;i<ws.length;i++){const a=ws.slice(0,i).join(' '),c=ws.slice(i).join(' '),mx=Math.max(tw(a,fs),tw(c,fs));if(!b||mx<b.mx)b={mx,L:[a,c]}}return b?b.L:[ws.join(' ')]}
function wrap(txt,w,fs,bs){const parts=bs?txt.match(/[^.!?]+[.!?]+/g)||[txt]:[txt],out=[];for(const p of parts){const ws=p.trim().split(/\s+/),g=[];let cur='';for(const word of ws){const t=cur?cur+' '+word:word;if(tw(t,fs)<=w||!cur)cur=t;else{g.push(cur);cur=word}}cur&&g.push(cur);
  if(g.length===2){const b2=bal(ws,fs);out.push(...(b2.every(x=>tw(x,fs)<=w)?b2:g))}else out.push(...g)}return out}
const quote={};ones.forEach(o=>{const s=o.querySelector('.m10-ln svg');quote[o.dataset.m]=W.__m10.fit[o.dataset.m]?W.__m10.fit[o.dataset.m].lines.join(' '):(s?s.textContent:'')});
const qlog={};
function quotes(){capR();const R=ones.map(o=>o.querySelector('.m10-ln').getBoundingClientRect());if(!R.every(r=>r.width))return;const ref=Math.min(...R.map(r=>r.width));
 const k0=ref/(LW[2]-LW[0]),w0=(LT[2]-LT[0])*k0,h0=(LT[3]-LT[1])*k0;let best=null;
 for(let cap=16;cap>=5&&!best;cap-=.25){const fs=cap/CAP,maxL=Math.max(1,Math.floor(h0/(fs*LH)+.02)),pl=[];
  for(const o of ones){let ok=null;for(const bs of [true,false]){const Ls=wrap(quote[o.dataset.m],w0,fs,bs);if(Ls.length<=maxL&&Ls.every(s=>tw(s,fs)<=w0+.5)){ok=Ls;break}}if(!ok){pl.length=0;break}pl.push(ok)}
  if(pl.length===ones.length)best={cap,fs,pl}}
 if(!best)return;
 ones.forEach((o,j)=>{const r=R[j],sc=r.width/ref,k=r.width/(LW[2]-LW[0]),fs=best.fs*sc,Ls=best.pl[j],n=Ls.length,x0=(LT[0]-LW[0])*k,y0=(LT[1]-LW[1])*k,w=(LT[2]-LT[0])*k,h=(LT[3]-LT[1])*k,top=y0+(h-n*fs*LH)/2;
  const sv=o.querySelector('.m10-ln svg');sv.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`);
  sv.innerHTML=Ls.map((s,i)=>`<text x="${(x0+w/2).toFixed(2)}" y="${(top+fs*LH*i+fs*LH/2+fs*CAP/2).toFixed(2)}" font-size="${fs.toFixed(2)}" text-anchor="middle">${esc(s)}</text>`).join('');
  qlog[o.dataset.m]={cap:+(best.cap*sc).toFixed(2),lines:Ls}})}
/* ---------- the strip, for the one-column takes: down the left, a trace into each chip (meet10's own strip, re-placed) ---------- */
function strip(){const g=W.__m10.geo(),sw=g.sw,sp=four.querySelector('.m10-sp'),fr=four.getBoundingClientRect();
 const R=ones.map(o=>{const r=o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
 const lane=parseFloat(getComputedStyle(four).getPropertyValue('--r2-sx'))||3,cx=lane+sw/2,top=Math.min(...R.map(r=>r.y))-14,bot=Math.max(...R.map(r=>r.y+r.h))+10;
 sp.style.left=(cx-sw/2)+'px';sp.style.top=top+'px';sp.style.height=(bot-top)+'px';sp.style.width=sw+'px';
 const tps=[...four.querySelectorAll('.m10-tp')];tps.forEach((t,j)=>{const r=R[j],y=r.y+r.h*.5,h=Math.max(9,r.h*.2),x0=cx+sw/2-2,x1=r.x+2;
  t.style.cssText=`left:${x0}px;top:${y-h/2}px;width:${Math.max(0,x1-x0)}px;height:${h}px`;t.classList.remove('m10-rev')});
 ones.forEach(o=>{const h=o.querySelector('.m10-hit');h&&h.classList.remove('m10-rt')});return {R,cx,sw}}
/* ---------- the overlay: numerals, tags, the rail, the bars ---------- */
cv.font='100px Bangers';const DW={};for(const d of '1234')DW[d]=cv.measureText(d).width/100||.46;
function place(){const fr=four.getBoundingClientRect(),dk=desk();
 const R=ones.map(o=>{const r=o.querySelector('.c7-pic').getBoundingClientRect();return {x:r.left-fr.left,y:r.top-fr.top,w:r.width,h:r.height}});
 const sp=four.querySelector('.m10-sp').getBoundingClientRect(),sR=sp.right-fr.left;
 if(T==='a'||T==='b'){/* the numeral in the gutter between the strip and the chip, above the trace */
  nums.forEach((e,i)=>{const r=R[i],gx=sR+2,gw=r.x-gx-2,maxH=r.h*.5-Math.max(9,r.h*.2)/2-2,d=String(i+1),fs=Math.min(maxH/.74,gw/DW[d]/1.12)*(i?.86:1);
   Object.assign(e.style,{left:(gx+gw/2).toFixed(1)+'px',top:(r.y-2).toFixed(1)+'px',fontSize:fs.toFixed(1)+'px'})})}
 if(T==='a')tags.forEach((e,i)=>{if(!e)return;const a=R[i-1],b=R[i];
  if(dk){e.classList.add('r2-tag-side');e.style.cssText=`left:${(b.x+b.w+14).toFixed(1)}px;top:${(b.y+b.h*.5).toFixed(1)}px;max-width:${Math.max(60,fr.width-(b.x+b.w)-20).toFixed(0)}px`}
  else{e.classList.remove('r2-tag-side');e.style.cssText=`right:${(fr.width-(b.x+b.w)).toFixed(1)}px;top:${((a.y+a.h+b.y)/2).toFixed(1)}px`}});
 if(T==='b'){tags.forEach((e,i)=>{if(!e)return;const a=R[i-1],b=R[i],y0=a.y+a.h,y1=b.y;e.style.cssText=`left:${(b.x+b.w*.72).toFixed(1)}px;top:${y0.toFixed(1)}px;height:${(y1-y0).toFixed(1)}px`;e.classList.toggle('r2-dim-tight',y1-y0<34)});
  if(rail){const k=+rail.dataset.k,a=R[k-1],b=R[k],x0=sR+2,x1=Math.max(...R.map(r=>r.x+r.w));rail.style.cssText=`left:${x0.toFixed(1)}px;width:${(x1-x0).toFixed(1)}px;top:${((a.y+a.h+b.y)/2).toFixed(1)}px`}}
 if(T==='c'){const r0=R[0];nums.forEach((e,i)=>{const r=R[i],big=!i,fs=big?(dk?130:76):(dk?60:42);Object.assign(e.style,{fontSize:fs+'px',left:(r.x+fs*DW[String(i+1)]*.62).toFixed(1)+'px',top:(r.y-fs*.86).toFixed(1)+'px'})});
  plate.style.cssText=`left:${(r0.x+(dk?130:76)*DW['1']*1.3+10).toFixed(1)}px;top:${(r0.y-(dk?50:38)).toFixed(1)}px`;
  bars.forEach((e,i)=>{if(!e)return;const r=R[i],fs=dk?60:42,x=r.x+fs*DW[String(i+1)]*1.3+8;e.style.cssText=`left:${x.toFixed(1)}px;width:${(r.x+r.w-x).toFixed(1)}px;top:${(r.y-(dk?34:27)).toFixed(1)}px`})}}
let busy=false;
function layout(){if(busy)return;busy=true;try{size();W.__m10.layout();quotes();if(T!=='c'||!desk())strip();place();W.__m10.render(W.__M10T!=null?+W.__M10T:-1)}finally{busy=false}}
let lw=0;new ResizeObserver(()=>{const w=four.clientWidth;if(w!==lw){lw=w;requestAnimationFrame(layout)}}).observe(four);
D.fonts&&D.fonts.ready.then(()=>requestAnimationFrame(layout));layout();
/* screen readers: the rank list already reads "No. 1 Grok 4.7..."; add the gaps */
const sr=D.createElement('p');sr.className='ch-sr';sr.textContent='Gaps in season P&L: '+ms.slice(1).map((m,i)=>`${NM(m)} is ${$a(gUp[i+1])} behind ${NM(ms[i])}`).join('; ')+'.';sec.append(sr);
W.__r2={layout,quotes:qlog,measure:()=>{const fr=four.getBoundingClientRect();const box=e=>{const r=e.getBoundingClientRect();return [r.left-fr.left,r.top-fr.top,r.width,r.height].map(v=>+v.toFixed(1))};
 const ov=(a,b)=>!(a[0]+a[2]<=b[0]||b[0]+b[2]<=a[0]||a[1]+a[3]<=b[1]||b[1]+b[3]<=a[1]);
 const chips=ones.map(o=>box(o.querySelector('.c7-pic'))),N=nums.map(box),tg=[...L.querySelectorAll('.r2-tag,.r2-dim b,.r2-bar,.r2-plate,.r2-rail span')].map(box);
 const hits=[];[...N,...tg].forEach((b,i)=>chips.forEach((c,j)=>{if(ov(b,c))hits.push(i+'x'+j)}));
 return {chips,nums:N,tags:tg,overlapChip:hits,quoteCap:Object.fromEntries(Object.entries(qlog).map(([m,q])=>[m,q.cap])),h:Math.round(four.getBoundingClientRect().height)}}};
D.documentElement.classList.add('r2-ready');
}})();
