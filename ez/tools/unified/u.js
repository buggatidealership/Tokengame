/* EZ unified page (from H30 B, the chip world corrected). The world's rules are in tools/unified/RULES.md.
    Every figure computed from ez-data.js (ROUNDS, UPCOMING, PENDING, MODELS, SIM, CONFIG, CAPS, CO_LOGOS).
   Flat P&L: $100,000 x direction x move per trade, summed (x2plus.js __x2pPnl). No number is typed here. */
(function(){
const $=(s,r)=>(r||document).querySelector(s),$$=(s,r)=>[...(r||document).querySelectorAll(s)];
const M='media/',RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const md=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
const dlab=s=>{const d=md(s);return d?MON[d[1]]+' '+d[2]:''};
const dday=s=>{const d=md(s);if(!d)return '';const t=new Date(Date.UTC(d[0],d[1],d[2]));return WD[t.getUTCDay()]+' '+MON[d[1]]+' '+d[2]};
const usd=v=>(v>=0?'+$':'−$')+Math.round(Math.abs(v)).toLocaleString('en-US');
const pct=v=>(v>=0?'+':'−')+Math.abs(v).toFixed(2)+'%';
const arrow=v=>v>=0?'▲':'▼';
const cls=v=>v>=0?'up':'dn';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T=(...a)=>{try{window.__ezTrack&&__ezTrack(...a)}catch(e){}};
const coName=t=>(window.TICKERS&&TICKERS[t])||t;

/* ---- the model marks, printed in one ink (cream): the brand's own path, no tile */
function mark(m,c){const D=MODELS[m];return `<span class="mk ${c||''}" title="${NM[m]}"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor"${D.fr?' fill-rule="'+D.fr+'"':''} d="${D.d}"/>${D.dot?'<path fill="currentColor" d="'+D.dot+'"/>':''}</svg></span>`}
/* the lab's country, etched in the same one ink (no red, no gold: colour means profit, loss and #1 only) */
const ORIGIN={GPT:'US',CLAUDE:'US',GROK:'US',KIMI:'CN'};
function flag(m){const us='<svg class="fl" viewBox="0 0 15 10" aria-label="United States"><rect width="15" height="10" fill="none"/>'+[0,2,4,6,8].map(y=>`<rect y="${y}" width="15" height="1" fill="currentColor" opacity=".85"/>`).join('')+'<rect width="6.5" height="5" fill="currentColor"/><g fill="#04070e">'+[[1.2,1],[3.2,1],[5.2,1],[2.2,2.5],[4.2,2.5],[1.2,4],[3.2,4],[5.2,4]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r=".45"/>`).join('')+'</g></svg>';
  const cn='<svg class="fl" viewBox="0 0 15 10" aria-label="China"><rect x=".4" y=".4" width="14.2" height="9.2" fill="none" stroke="currentColor" stroke-width=".8"/><path fill="currentColor" d="M3 1.3l.6 1.8h1.9l-1.5 1.1.6 1.8L3 4.9 1.4 6l.6-1.8L.5 3.1h1.9z"/>'+[[6.2,1.4],[7.2,2.6],[7.2,4],[6.2,5.1]].map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r=".55" fill="currentColor"/>`).join('')+'</svg>';
  return ORIGIN[m]==='CN'?cn:us}

/* ---- the season, computed */
const R=[...ROUNDS].sort((a,b)=>a.n-b.n);
const A={};
R.forEach((r,i)=>r.calls.forEach(c=>{const m=c[0],dn=/^DOWN/.test(c[1]),s=(dn?-1:1)*r.a/100,v=100000*s;
  const t=A[m]||(A[m]={m,p:0,W:0,L:0,n:0,ser:[],last:null});t.p+=v;t.n++;if(s>0)t.W++;else t.L++;
  t.ser.push([i,(t.W+1)/(t.n+2)]);t.last={r,v,ok:s>0}}));
const order=Object.keys(A).sort((a,b)=>A[b].p-A[a].p),lead=order[0];
const latest=R[R.length-1];
const todo=[...(window.PENDING||[]),...(window.UPCOMING||[])].sort((a,b)=>a.n-b.n);
const trades=Object.values(A).reduce((s,t)=>s+t.n,0);
/* the next close: the earliest resolution date on the card that is not past (New York date) */
const nyToday=(()=>{const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(new Date());const g=k=>+p.find(x=>x.type===k).value;return Date.UTC(g('year'),g('month')-1,g('day'))})();
const dkey=s=>{const d=md(s);return d?Date.UTC(d[0],d[1],d[2]):null};
const nextDay=todo.map(u=>dkey(u.resolves)).filter(k=>k!=null&&k>=nyToday).sort((a,b)=>a-b)[0];
const nextCos=todo.filter(u=>dkey(u.resolves)===nextDay).sort((a,b)=>((CAPS||{})[b.ticker]||0)-((CAPS||{})[a.ticker]||0));
const nextLab=nextDay?(()=>{const t=new Date(nextDay);return WD[t.getUTCDay()]+' '+MON[t.getUTCMonth()]+' '+t.getUTCDate()})():'';
/* the bet: the close the weekday after NVIDIA's call date (x2p_more.js betAt, verbatim) */
function betAt(){const md2=md,nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=todo.find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
const BET=betAt();
/* the example round for How a round works, by a stated rule: the newest graded round where exactly one AI got the direction, with a calm move (5% or less) */
const ex=[...R].reverse().find(r=>Math.abs(r.a)<=5&&r.calls.length===4&&r.calls.filter(c=>(/^DOWN/.test(c[1])?-1:1)*r.a>0).length===1)||latest;
const callOf=(r,m)=>r.calls.find(c=>c[0]===m);
const dirOf=c=>/^DOWN/.test(c[1])?-1:1,magOf=c=>parseFloat(c[1].replace(/^(UP|DOWN)\s*/,''));

/* ---- logos printed in one ink: a company's file becomes a mask (its tile, when it has one, is cut out) */
const maskCache={};
function logoMask(t){if(maskCache[t])return maskCache[t];const L=(window.CO_LOGOS||{})[t],f=L&&(L.f||L);
  return maskCache[t]=new Promise(res=>{if(!f)return res(null);const im=new Image();im.onload=()=>{try{
    const W=96,H=96,c=document.createElement('canvas');c.width=W;c.height=H;const x=c.getContext('2d');const s=Math.min(W/im.width,H/im.height);
    const w=im.width*s,h=im.height*s;x.drawImage(im,(W-w)/2,(H-h)/2,w,h);const d=x.getImageData(0,0,W,H),p=d.data;
    const px=(i,j)=>{const k=(j*W+i)*4;return [p[k],p[k+1],p[k+2],p[k+3]]};
    const cs=[px(Math.round((W-w)/2)+1,Math.round((H-h)/2)+1),px(Math.round((W+w)/2)-2,Math.round((H-h)/2)+1),px(Math.round((W-w)/2)+1,Math.round((H+h)/2)-2),px(Math.round((W+w)/2)-2,Math.round((H+h)/2)-2)];
    let tile=cs.every(q=>q[3]>240)&&cs.every(q=>Math.abs(q[0]-cs[0][0])+Math.abs(q[1]-cs[0][1])+Math.abs(q[2]-cs[0][2])<30);
    let bg=cs[0];
    if(!tile){const hist={};let op=0;for(let i=0;i<p.length;i+=4){if(p[i+3]<200)continue;op++;const k=(p[i]>>4)+','+(p[i+1]>>4)+','+(p[i+2]>>4);hist[k]=(hist[k]||0)+1}
      const top=Object.entries(hist).sort((a,b)=>b[1]-a[1])[0];if(top&&op>.55*w*h&&top[1]>.4*op){tile=true;bg=top[0].split(',').map(v=>(+v<<4)+8)}}
    for(let i=0;i<p.length;i+=4){let a=p[i+3]/255;if(tile){const dd=Math.abs(p[i]-bg[0])+Math.abs(p[i+1]-bg[1])+Math.abs(p[i+2]-bg[2]);a*=Math.min(1,Math.max(0,(dd-24)/90))}
      p[i]=p[i+1]=p[i+2]=255;p[i+3]=Math.round(a*255)}
    let cov=0;for(let i=3;i<p.length;i+=4)cov+=p[i]>60?1:0;if(cov<W*H*.02)return res(null);x.putImageData(d,0,0);res('url('+c.toDataURL()+')')}catch(e){res(null)}};im.onerror=()=>res(null);im.src=M+f})}
function paintMasks(root){$$('[data-t]',root).forEach(el=>logoMask(el.dataset.t).then(u=>{if(u)el.style.setProperty('--m',u);else{el.classList.add('tx');el.textContent=el.dataset.t.replace(/\..*$/,'')}}))}

/* geometry of the paintings (fractions of each web image, measured with measure.py and checked on the board) */
const G={
  hero:{win:[.100,.205,.880,.749],lab:[.10,.775,.88,.868]},
  gold:{die:[.058,.179,.475,.821],txt:[.525,.17,.955,.83]},
  row:{die:[.033,.199,.203,.796],txt:[.235,.17,.965,.83]},
  loop:[[.102,.106,.417,.418],[.578,.106,.893,.418],[.578,.577,.893,.889],[.102,.577,.417,.889]],
  bet:{dies:[[.0953,.352,.2672,.553],[.3094,.352,.475,.553],[.5188,.352,.6875,.553],[.7297,.352,.900,.553]],plate:[.12,.62,.88,.80]},
  wafer:{cx:.5,cy:.498,r:.492,flat:.94}
};
const box=(b,extra)=>`style="left:${(b[0]*100).toFixed(2)}%;top:${(b[1]*100).toFixed(2)}%;width:${((b[2]-b[0])*100).toFixed(2)}%;height:${((b[3]-b[1])*100).toFixed(2)}%;${extra||''}"`;
const FOUND={GROK:'founder-grok-anim2',GPT:'founder-gpt-anim2',CLAUDE:'founder-claude-anim',KIMI:'founder-kimi-anim'};

/* =========== 1 · the top: what it is, that it is live, the film =========== */
(function(){const s=$('#top');
  s.innerHTML=`<p class="kick"><i aria-hidden="true"></i>Season 1 · live · ${R.length} rounds graded</p>
  <h1 class="h1" id="h-top"><span>Four AI<span class="lc">s</span> trade earnings.</span><span>The close keeps score.</span></h1>
  <div class="film pt"><img class="pi" src="${M}u-hero.jpg" alt="" width="1400" height="1005">
    <div class="ov win" ${box(G.hero.win)}><img src="${M}ez-landing-v4-poster-ez.jpg" alt="">
      <button class="play" type="button" aria-label="Play the film: the whole game, 1 minute 20"><i></i></button></div>
    <div class="ov lab num" ${box(G.hero.lab)}>The whole game <em>· 1:20</em></div></div>
  <ul class="cast" aria-label="The four AIs">${['GPT','CLAUDE','GROK','KIMI'].map(m=>`<li>${mark(m)}<span>${NM[m]}</span></li>`).join('')}</ul>
  <p class="fresh">Last graded: <b>${esc(latest.co)}</b>, ${dlab(latest.resolves)} close.${nextLab?`<br>Next close: <b>${nextLab}</b>.`:''}</p>`;
  const win=$('.win',s),btn=$('.play',s);
  btn.addEventListener('click',()=>{const v=document.createElement('video');v.setAttribute('playsinline','');v.controls=true;v.preload='auto';v.poster=M+'ez-landing-v4-poster-ez.jpg';
    v.innerHTML=`<source src="${M}ez-landing-v4.mp4" type="video/mp4"><source src="${M}ez-landing-v4.webm" type="video/webm">`;win.innerHTML='';win.appendChild(v);v.play().catch(()=>{});T('film',{a:'play'},'film-play');
    const mk={};v.addEventListener('timeupdate',()=>{if(!v.duration)return;const q=v.currentTime/v.duration;[25,50,75].forEach(p=>{if(q>=p/100&&!mk[p]){mk[p]=1;T('film',{a:String(p)},'film-'+p)}})});v.addEventListener('ended',()=>T('film',{a:'end'},'film-end'))});
})();

/* =========== 2 · how a round works: one real round, four dies on one board, in a loop =========== */
(function(){const s=$('#round'),r=ex,ms=['GPT','CLAUDE','GROK','KIMI'].filter(m=>callOf(r,m));
  const ok=m=>dirOf(callOf(r,m))*r.a>0;
  const d1=ms.map(m=>{const c=callOf(r,m),d=dirOf(c);return `<div class="rw">${mark(m)}<span class="v ${d>0?'up':'dn'}" aria-label="${d>0?'long':'short'} ${magOf(c)}%">${d>0?'▲':'▼'} ${magOf(c)}%</span></div>`}).join('');
  const d2=`<div class="co">${esc(r.co)}</div><div class="big ${cls(r.a)}">${arrow(r.a)} ${pct(r.a)}</div><div class="dt">${dlab(r.resolves)} close</div>`;
  const d3=ms.map(m=>{const w=ok(m),c=callOf(r,m);return `<div class="rw">${mark(m)}<span class="wl ${w?'up':'dn'}">${w?'W':'L'}</span><span class="v mut" style="font-weight:400">${Math.abs(dirOf(c)*magOf(c)-r.a).toFixed(2)}<span class="off"> off</span></span></div>`}).join('');
  const d4=ms.map(m=>{const v=100000*dirOf(callOf(r,m))*r.a/100;return `<div class="rw">${mark(m)}<span class="v ${cls(v)}">${usd(v)}</span></div>`}).join('');
  const tabs=['Trade','Close','Grade','Board'];
  s.innerHTML=`<h2 class="h2" id="h-round">How a round works</h2>
  <p class="sub">Round ${r.n}: <b>${esc(r.co)}</b>, ${dlab(r.called)}.</p>
  <div class="pt loop"><img class="pi" src="${M}u-loop.jpg" alt="" width="1400" height="1397">
    ${[d1,d2,d3,d4].map((h,i)=>`<div class="ov die" ${box(G.loop[i])}>${h}</div><span class="ov tab" style="left:${(G.loop[i][0]*100).toFixed(2)}%;top:${(G.loop[i][1]*100).toFixed(2)}%"><b>${i+1}</b>${tabs[i]}</span>`).join('')}
  </div>
  <ol class="steps"><li><b>1 · Trade.</b> Before the report, each AI goes <b class="up">long</b> or <b class="dn">short</b>.</li><li><b>2 · Close.</b> The market close ends every trade.</li><li><b>3 · Grade.</b> Right direction is a <b class="up">W</b>, wrong is an <b class="dn">L</b>.</li><li><b>4 · Board.</b> $100K a trade: the P&amp;L adds up on the board.</li></ol>
  <p class="narr">Before the report, each AI goes <b class="up">long</b> or <b class="dn">short</b>. The market close grades every trade, <b>W</b> or <b>L</b>, and the P&amp;L adds up on the board.</p>`;
})();

/* =========== 3 · who's winning: #1 on the gold chip (its founder the one moving picture), the field on silver =========== */
(function(){const s=$('#win');
  const t1=A[lead],rest=order.slice(1);
  s.innerHTML=`<h2 class="h2" id="h-win">Who's winning</h2>
  <p class="sub">Season P&amp;L if you had put <b>$100K on every trade</b>.</p>
  <div class="pt w1"><img class="pi" src="${M}u-gold.jpg" alt="" width="1400" height="868">
    <div class="ov die" ${box(G.gold.die)}><img src="${M}${FOUND[lead]}.jpg" alt=""></div>
    <div class="ov txt" ${box(G.gold.txt)}><span class="rk">#1</span><span class="nm">${NM[lead]}</span>
      <span class="ver">${esc(MODELS[lead].ver)} ${flag(lead)}</span>
      <span class="pl ${cls(t1.p)}">${usd(t1.p)}</span><span class="mt"><b class="up">${t1.W} W</b> · <b class="dn">${t1.L} L</b></span></div></div>
  <p class="ticket">#1 holds the golden ticket: its prediction calls <b>Bet #1</b>.</p>
  <div class="wrs">${rest.map((m,i)=>{const t=A[m];return `<div class="pt wr"><img class="pi" src="${M}u-row.jpg" alt="" width="1400" height="429">
    <div class="ov die" ${box(G.row.die)}><img src="${M}${FOUND[m]}.jpg" alt=""></div>
    <div class="ov txt" ${box(G.row.txt)}><span class="rk">#${i+2}</span><span class="nm">${NM[m]}<span class="ver">${esc(MODELS[m].ver)} ${flag(m)}</span></span>
      <span class="pl ${cls(t.p)}">${usd(t.p)}<small><span class="up">${t.W} W</span> · <span class="dn">${t.L} L</span></small></span></div></div>`}).join('')}</div>`;
})();

/* =========== 4 · every round so far: the season is a wafer; every graded round is a die; the newest is lifted out =========== */
(function(){const s=$('#rounds');
  const all=[...R.map(r=>({n:r.n,t:r.ticker,co:r.co,g:r})),...todo.map(u=>({n:u.n,t:u.ticker,co:u.co,g:null}))].sort((a,b)=>a.n-b.n);
  s.innerHTML=`<h2 class="h2" id="h-rounds">Every round so far</h2>
  <p class="sub"><b>${R.length} graded</b>, ${trades} trades. Each one posted on X before the report.</p>
  <div class="lift" id="lift"></div>
  <div class="wf"><div class="pt wafer"><img class="pi" src="${M}u-wafer.jpg" alt="" width="1390" height="1400"><div class="dies" role="list" aria-label="Season 1, every round"></div></div>
  <p class="wkey"><span><u></u>Graded</span><span><u class="t"></u>To come (${todo.length})</span>${todo.some(u=>u.ticker==='NVDA')?'<span><u class="n"></u>Bet #1</span>':''}</p></div>`;
  /* sites: a square grid clipped to the disc (and above the flat), raster order, pitch shrunk until every round has a site */
  const W=G.wafer,pts=[];let pitch=.2;
  const fit=p=>{const o=[];const n=Math.floor(2*W.r/p);for(let j=0;j<n;j++)for(let i=0;i<n;i++){const x=W.cx-W.r+(i+.5)*p+(2*W.r-n*p)/2,y=W.cy-W.r+(j+.5)*p+(2*W.r-n*p)/2;
    const cs=[[x-p/2,y-p/2],[x+p/2,y-p/2],[x-p/2,y+p/2],[x+p/2,y+p/2]];if(cs.every(c=>Math.hypot(c[0]-W.cx,(c[1]-W.cy))<=W.r*.93&&c[1]<=W.cy+W.r*W.flat*.93))o.push([x,y])}return o};
  while((pts.length=0,pts.push(...fit(pitch)),pts.length<all.length)&&pitch>.02)pitch*=.97;
  /* centre the used sites vertically: drop unused sites evenly from the end rows (they stay bare wafer) */
  const dz=$('.dies',s);
  dz.innerHTML=all.map((x,i)=>{const p=pts[i],g=pitch*.9;const st=`left:${((p[0]-g/2)*100).toFixed(3)}%;top:${((p[1]-g/2)*100).toFixed(3)}%;width:${(g*100).toFixed(3)}%;height:${(g*100).toFixed(3)}%`;
    return x.g?`<button class="dz" role="listitem" data-n="${x.n}" style="${st}" aria-label="Round ${x.n}, ${esc(x.co)}, ${x.g.out}"><i data-t="${x.t}"></i></button>`
      :`<span class="dz tbd${x.t==='NVDA'?' nv':''}" role="listitem" style="${st}" aria-label="Round ${x.n}, ${esc(x.co)}, to come"><i data-t="${x.t}"></i></span>`}).join('');
  paintMasks(dz);
  const lift=$('#lift',s);
  function show(r,auto){const f=r.film,ms=['GPT','CLAUDE','GROK','KIMI'].filter(m=>callOf(r,m));
    const win=r.win?r.win.split(' & ').map(m=>NM[m]).join(' & '):'Nobody';
    const best=r.win?Math.min(...r.calls.filter(c=>r.win.split(' & ').includes(c[0])).map(c=>+c[2])):null;
    lift.innerHTML=`<div class="shot">${f?`<img src="${M}${r.poster}.jpg" alt=""><button class="play sm" type="button" aria-label="Play round ${r.n}'s film"><i></i></button>`:`<span class="cl" data-t="${r.ticker}"></span>`}</div>
    <div class="meta"><span class="rn">Round ${r.n} · ${dlab(r.resolves)} close</span><span class="co">${esc(r.co)} (${esc(r.ticker)})</span>
      <span class="mv ${cls(r.a)}">${arrow(r.a)} ${pct(r.a)}</span>
      <span class="cls">Closest: <b>${win}</b>${best!=null?`, ${best.toFixed(2)}% off`:''}</span>
      <span class="tr">${ms.map(m=>{const w=dirOf(callOf(r,m))*r.a>0;return `<span>${mark(m)}<b class="${w?'up':'dn'}">${w?'W':'L'}</b></span>`}).join('')}</span></div>`;
    paintMasks(lift);$$('.dz.on',dz).forEach(e=>e.classList.remove('on'));const d=$(`.dz[data-n="${r.n}"]`,dz);d&&d.classList.add('on');
    const pb=$('.play',lift);if(pb)pb.addEventListener('click',()=>{const v=document.createElement('video');v.setAttribute('playsinline','');v.controls=true;v.preload='auto';v.poster=M+r.poster+'.jpg';
      v.innerHTML=`<source src="${M}${f}.webm" type="video/webm"><source src="${M}${f}.mp4" type="video/mp4">`;const sh=$('.shot',lift);sh.innerHTML='';sh.appendChild(v);v.play().catch(()=>{});T('film',{a:'round',n:r.n},'rf-'+r.n)});}
  /* a shared round link (#/round/<n>, and /r/<n> pages that send people on to it) lifts that round and brings the wafer into view */
  const hr=()=>{const m=location.hash.match(/^#\/round\/(\d+)/),r=m&&R.find(x=>x.n===+m[1]);if(r){show(r);const go=()=>s.scrollIntoView({block:'start'});requestAnimationFrame(go);addEventListener('load',go,{once:true});return true}};
  if(!hr())show(latest);addEventListener('hashchange',hr);
  dz.addEventListener('click',e=>{const b=e.target.closest('.dz[data-n]');if(!b)return;show(R.find(r=>r.n===+b.dataset.n));T('record',{a:'die'},'rec-die')});
  const rc=document.createElement('a');rc.className='rcpt';rc.href=(window.RECEIPTS&&RECEIPTS[latest.n])||CONFIG.x;rc.rel='noopener';
  rc.innerHTML='Check the posts on @earningszn <span aria-hidden="true">↗</span>';s.appendChild(rc);
  /* desktop: the receipt link sits under the lifted die, not after the wafer */
  s.insertBefore(rc,$('.wf',s));
})();

/* =========== 5 · smart or lucky: the hit rate round by round, against the coin's zone =========== */
(function(){const s=$('#luck');
  const n=R.length,X0=8,X1=250,Y0=10,Y1=196,lo=.3,hi=.8,x=i=>X0+(X1-X0)*i/(n-1),y=v=>Y1-(Y1-Y0)*(Math.min(hi,Math.max(lo,v))-lo)/(hi-lo);
  /* the coin's zone: 95% of fair coins land inside after k trades (50% ± 1.96·√(.25/k)) */
  const band=[];for(let i=0;i<n;i++){const k=i+1,h=1.96*Math.sqrt(.25/k);band.push([x(i),y(.5+h),y(.5-h)])}
  const bandD='M'+band.map(b=>b[0].toFixed(1)+','+b[1].toFixed(1)).join('L')+'L'+band.slice().reverse().map(b=>b[0].toFixed(1)+','+b[2].toFixed(1)).join('L')+'Z';
  const DASH={GPT:'',CLAUDE:'5 3',GROK:'',KIMI:'1.5 2.5'};
  const ms=['GPT','CLAUDE','GROK','KIMI'].sort((a,b)=>(a===lead)-(b===lead));
  const raw=m=>A[m].W/A[m].n,zoneHi=m=>.5+1.96*Math.sqrt(.25/A[m].n);
  const out=ms.filter(m=>raw(m)>zoneHi(m));
  /* line ends: labels pushed apart where they would touch */
  const ends=ms.map(m=>{const t=A[m],l=t.ser[t.ser.length-1];return {m,x:x(l[0]),y:y(l[1]),ly:y(l[1])}}).sort((a,b)=>a.y-b.y);
  for(let k=1;k<ends.length;k++)if(ends[k].ly-ends[k-1].ly<13)ends[k].ly=ends[k-1].ly+13;
  const svg=`<svg viewBox="0 0 340 214" role="img" aria-label="Hit rate after every round for each AI, against the zone where a coin flip lands">
    ${[.3,.4,.5,.6,.7,.8].map(v=>`<line x1="${X0}" x2="${X1}" y1="${y(v)}" y2="${y(v)}" stroke="#f8f0d9" stroke-opacity="${v===.5?.35:.08}" ${v===.5?'stroke-dasharray="3 3"':''}/><text x="${X0}" y="${y(v)-3}" font-size="8.5" fill="#7d7768">${Math.round(v*100)}%</text>`).join('')}
    <path d="${bandD}" fill="#f8f0d9" fill-opacity=".09"/>
    <text x="${x(Math.round(n*.62))}" y="${y(.5)+4}" font-size="10" fill="#b5ad9c" text-anchor="middle">coin-flip zone</text>
    ${ms.map(m=>{const t=A[m],d='M'+t.ser.slice(4).map(p=>x(p[0]).toFixed(1)+','+y(p[1]).toFixed(1)).join('L');const g=m===lead;
      return `<path d="${d}" fill="none" stroke="${g?'#fdbc2a':'#f8f0d9'}" stroke-opacity="${g?1:.72}" stroke-width="${g?2.2:1.4}" stroke-dasharray="${DASH[m]}" stroke-linejoin="round"/>`}).join('')}
    ${ends.map(e=>`<circle cx="${e.x}" cy="${e.y}" r="2.4" fill="${e.m===lead?'#fdbc2a':'#f8f0d9'}"/><text x="${X1+8}" y="${e.ly+3.5}" font-size="10.5" font-weight="600" fill="${e.m===lead?'#fdbc2a':'#f8f0d9'}">${NM[e.m]} ${(raw(e.m)*100).toFixed(1)}%</text>`).join('')}
    <text x="${X0}" y="210" font-size="8.5" fill="#7d7768">Round 1</text><text x="${X1}" y="210" font-size="8.5" fill="#7d7768" text-anchor="end">Round ${R[n-1].n}</text>
  </svg>`;
  const verdict=out.length===0?`None of the four is out of the coin-flip zone yet.`
    :out.length===1?`Only <b>${NM[out[0]]}</b> is out of the coin-flip zone${(raw(out[0])-zoneHi(out[0]))<.02?', by a hair':''}. ${A[out[0]].n} trades is still early.`
    :`${out.map(m=>'<b>'+NM[m]+'</b>').join(' and ')} are out of the coin-flip zone.`;
  s.innerHTML=`<h2 class="h2" id="h-luck">Smart or lucky?</h2>
  <p class="sub">How often each AI got the direction right. Inside the band, a coin could have done it.</p>
  <div class="scope">${svg}</div>
  <div class="side"><div class="sl" role="table" aria-label="Hit rate">
    <span class="hdr" role="columnheader">AI</span><span class="hdr" role="columnheader" style="text-align:right">W-L</span><span class="hdr" role="columnheader" style="text-align:right">Hit rate</span>
    ${order.map(m=>`<span class="n" role="cell">${mark(m)}${NM[m]}</span><span class="f" role="cell" style="font-weight:400">${A[m].W}-${A[m].L}</span><span class="f${m===lead?' au':''}" role="cell">${(raw(m)*100).toFixed(1)}%</span>`).join('')}
  </div>
  <p class="narr">${verdict}</p></div>`;
})();

/* =========== 6 · the bet: the gold chip counts down in its four dies =========== */
(function(){const s=$('#bet');const share=SIM.poolShare!=null?Math.round(SIM.poolShare*100):null;
  const at=BET?new Date(BET).toLocaleDateString('en-US',{month:'short',day:'numeric',timeZone:'America/New_York'}):'';
  const live=CONFIG.launched&&CONFIG.pool;
  s.innerHTML=`<div class="bh"><h2 class="h2" id="h-bet">Bet #1: NVIDIA</h2><span class="at">At the close · ${at}</span></div>
  <div class="pt"><img class="pi" src="${M}u-bet.jpg" alt="" width="1400" height="1236">
    ${['days','hrs','min','sec'].map((l,i)=>`<div class="ov cd" ${box(G.bet.dies[i])}><span class="num" data-k="${i}">00</span><small>${l}</small></div>`).join('')}
    <div class="ov plate" ${box(G.bet.plate)}><span>The pool: <b>${live?esc(CONFIG.pool):'not live yet'}</b></span></div></div>
  <p class="narr">${share}% of $EZ creator fees fill the pool. We bet the whole pool on NVIDIA, based on the #1 AI's prediction.</p>
  <div class="outs"><p><b class="up">▲ Right:</b>profits buy back $EZ.</p><p><b class="dn">▼ Wrong:</b>the pool can be wiped out.</p></div>
  <p class="first">NVIDIA is the first bet, not the last.</p>`;
  const els=$$('.cd .num',s),dg=v=>String(v).padStart(2,'0').split('').map(c=>`<span class="dg">${c}</span>`).join('');
  const fit=()=>{const w=$('.cd',s).getBoundingClientRect().width;s.style.setProperty('--cdz',(w*.5).toFixed(1)+'px')};fit();addEventListener('resize',fit);
  function tick(){if(!BET)return;const t=Math.max(0,Math.floor((BET-Date.now())/1e3)),v=[Math.floor(t/86400),Math.floor(t%86400/3600),Math.floor(t%3600/60),t%60];
    els.forEach((e,i)=>{const h=dg(v[i]);if(e.innerHTML!==h)e.innerHTML=h})}
  tick();if(!RM)setInterval(tick,1000);else setInterval(tick,60000);
})();

/* =========== 7 · follow: a dated reason (the next close), the CA slot, the one button =========== */
(function(){const s=$('#follow');const cos=nextCos.slice(0,6);
  s.innerHTML=`<h2 class="h2" id="h-follow">Follow for the next round</h2>
  <div class="pt nx"><img class="pi" src="${M}u-row.jpg" alt="" width="1400" height="429">
    <div class="ov die" ${box(G.row.die)}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/></svg></div>
    <div class="ov txt" ${box(G.row.txt)}><span class="when">Next close<b>${nextLab||'Date to come'}</b></span><span class="cos">${cos.map(u=>`<i data-t="${u.ticker}" title="${esc(u.co)}"></i>`).join('')}</span></div></div>
  <p class="names">${cos.map(u=>esc(u.co)).join(', ')}. The trades go up on X before each report.</p>
  <a class="btn" href="${CONFIG.x}" rel="noopener"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.8-6.3L6.4 22H3.3l7.3-8.3L1 2h6.3l4.4 5.8L18.9 2Zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20Z"/></svg>Follow @earningszn on X</a>
  <div class="ca">${CONFIG.launched&&CONFIG.ca?`<b>$EZ contract address</b><br><code>${esc(CONFIG.ca)}</code><button class="cp" type="button">Copy</button><br>Any other address is fake.`:`<b>$EZ: not live yet.</b> The contract address goes up here and on @earningszn at launch. Any other address is fake. No presale, no airdrop.`}</div>`;
  paintMasks(s);
  const cp=$('.cp',s);if(cp)cp.addEventListener('click',()=>{navigator.clipboard&&navigator.clipboard.writeText(CONFIG.ca).then(()=>{cp.textContent='Copied'},()=>{})});
  $$('a[href*="x.com"]').forEach(a=>a.addEventListener('click',()=>T('x',{w:a.id||a.className||'link'})));
  $('#foot').textContent='An experiment. Simulated P&L, before fees. Not financial advice.';
})();
(function(){const h=location.hash,go=/^#\/(upcoming|rounds)/.test(h)?'#follow':/^#\/(buyback|bet)/.test(h)?'#bet':/^#\/(leaderboard|models?|results)/.test(h)?'#win':null;
  if(go){const f=()=>{const e=$(go);e&&e.scrollIntoView({block:'start'})};requestAnimationFrame(f);addEventListener('load',f,{once:true})}})();
window.__b={A,order,lead,ex:ex.n,latest:latest.n,nextLab,BET,trades};
})();
