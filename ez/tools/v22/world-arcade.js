/* EZ Live X4+, the arcade fighting game (owner, 2026-10-29: "create the arcade one on a new page called Easy Live X4 Plus").
   build.py injects this into X2+'s build at DOMContentLoaded (after x2plus.js has registered its own handlers), with
   window.__x2pLB=1 (the Leaderboard tab is kept) and window.__x2pNeedWorld=1 (the cover waits for html.x2p-world).
   Every figure is read from the page's own data: ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, CAPS, RMETA, window.__x2pPnl().
   Overview: the attract screen, the next fight (VS), character select, replays (the record's own cards), training mode (versus a
   coin), the highlight reel, the boss fight (NVIDIA), insert coin. Leaderboard: high scores, lead changes, fighter stats, sectors.
   Upcoming: X2+'s own fight-night tab in the arcade's look (CSS) under a stage plate.
   From the overnight mockup (tools/concepts/worlds/arcade/). */
(function(){
var ROOT=document.documentElement;ROOT.classList.add('wa');
var lk=document.createElement('link');lk.rel='stylesheet';
lk.href='https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800;1,900&family=Barlow:wght@500;600;700&display=swap';
document.head.appendChild(lk);
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ORDER=['GPT','KIMI','CLAUDE','GROK'];
var COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#aab2c0'};
var NICE={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
var PLACE=['1st','2nd','3rd','4th'];
var SH={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mk(m,fill){var M=MODELS[m];if(!M)return '';return '<svg class="wa-ml" viewBox="0 0 24 24" aria-hidden="true"><path d="'+M.d+'" fill="'+(fill||'#f8f0d9')+'"'+(M.fr?' fill-rule="evenodd"':'')+'/>'+(M.dot?'<path d="'+M.dot+'" fill="'+(fill||M.dotc)+'"/>':'')+'</svg>'}
function co(t,cls){t=String(t||'').toUpperCase();var L=CO_LOGOS[t],f=L&&(L.f||L);var tx=esc(t.split('.')[0]);
  if(!f)return '<span class="wa-co wa-cot '+(cls||'')+'">'+tx+'</span>';
  return '<span class="wa-co '+(L.dark?'wa-cod ':'')+(cls||'')+'"><img src="media/'+esc(f)+'" alt="" loading="lazy"></span>'}
function usd(v,sign){var a=Math.abs(Math.round(v)),s=a.toLocaleString('en-US');return (sign?(v>=0?'+':'−'):(v<0?'−':''))+'$'+s}
function k(v){var a=Math.abs(v),s=a>=1000?(a/1000).toFixed(1).replace(/\.0$/,'')+'K':Math.round(a)+'';return (v>=0?'+':'−')+'$'+s}
function mdy(s){var p=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);if(!p)return null;return Date.UTC(2000+(+p[3]%100),p[1]-1,+p[2])}
var nyFmt=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour12:false,year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'});
function nyParts(t){var o={};nyFmt.formatToParts(new Date(t)).forEach(function(p){o[p.type]=p.value});return o}
function nyToday(){var o=nyParts(Date.now());return Date.UTC(+o.year,o.month-1,+o.day)}
function dname(day,long){return new Date(day).toLocaleDateString('en-US',{timeZone:'UTC',weekday:long?'long':'short',month:'short',day:'numeric'})}
/* a round is graded at its own exchange's close (x2plus.js xcloseAt, the same rule): Seoul and Tokyo 15:30, Taipei 13:30, Hong Kong
   16:00, London 16:30 and the euro exchanges 17:30 local (European summer time to the last Sunday of October), else 4pm New York */
function closeAt(s,tk){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var y=2000+(+m[3]%100),mo=+m[1],d=+m[2],x=(String(tk||"").match(/\.([A-Z]+)$/)||[])[1];
  if(x==="KS"||x==="KQ"||x==="T")return Date.UTC(y,mo-1,d,6,30);if(x==="TW")return Date.UTC(y,mo-1,d,5,30);if(x==="HK")return Date.UTC(y,mo-1,d,8);
  if(x==="L"||x==="AS"||x==="DE"||x==="SW"||x==="PA"||x==="MI"||x==="MC"){var ls=function(mm){var t=new Date(Date.UTC(y,mm,0));return t.getUTCDate()-t.getUTCDay()},
    su=(mo>3&&mo<10)||(mo===3&&d>=ls(3))||(mo===10&&d<ls(10)),h=(x==="L"?16:17)-1-(su?1:0);return Date.UTC(y,mo-1,d,h+(x==="L"?1:0),30)}
  var nov=new Date(Date.UTC(y,10,1)),fs=1+(7-nov.getUTCDay())%7,mar=new Date(Date.UTC(y,2,1)),ss=1+(7-mar.getUTCDay())%7+7;
  var dst=(mo>3&&mo<11)||(mo===3&&d>=ss)||(mo===11&&d<fs);return Date.UTC(y,mo-1,d,dst?20:21)}
function winners(r){var w=String(r.win||'').toUpperCase();return ORDER.filter(function(m){return w.indexOf(m)>=0})}
function dirUp(c){return !/^DOWN/i.test(c[1])}
function result(r){var w=winners(r),right=r.calls.filter(function(c){return dirUp(c)===(r.a>0)}).length;
  if(!w.length)return {k:'dko',t:'Double K.O.',s:'Everyone wrong'};
  if(right===r.calls.length&&r.calls.length>=3)return {k:'perf',t:'Perfect',s:'All '+r.calls.length+' got the direction',w:w};
  if(w.length>1)return {k:'draw',t:'Draw',s:w.map(function(m){return NICE[m]}).join(' & ')+' tie',w:w};
  return {k:'ko',t:'K.O.',s:NICE[w[0]]+' closest',w:w}}
function tail(n,kk){var p=0,c=1;for(var i=0;i<=n;i++){if(i>0)c=c*(n-i+1)/i;if(i>=kk)p+=c}return p/Math.pow(2,n)}
function cd(ms){if(ms<=0)return 'now';var m=Math.floor(ms/6e4),h=Math.floor(m/60),d=Math.floor(h/24);return d>=2?d+' days':h>=1?h+'h '+(m%60)+'m':Math.max(1,m)+'m'}
function sec(id,ord,cls){var s=document.createElement('section');s.id=id;s.className='wa-sec '+(cls||'');s.style.order=ord;return s}
function plate(n,kick,title,sub,hn){return '<header class="wa-plate"><span class="wa-stg">'+(typeof n==='number'?'Stage '+n:n)+'</span><p class="wa-kick">'+kick+'</p><'+(hn||'h2')+' class="wa-h2">'+title+'</'+(hn||'h2')+'>'+(sub?'<p class="wa-sub">'+sub+'</p>':'')+'</header>'}
/* loops (blinking lights, the record light) run only while they are on screen */
var loopIO='IntersectionObserver' in window?new IntersectionObserver(function(es){es.forEach(function(e){e.target.classList.toggle('wa-vis',e.isIntersecting)})},{rootMargin:'40px'}):null;
function loops(r){[].forEach.call((r||document).querySelectorAll('.wa-lp'),function(e){if(e.__lp)return;e.__lp=1;if(loopIO)loopIO.observe(e);else e.classList.add('wa-vis')})}

/* ---------- the season, worked out once ---------- */
var G,P,fighters,top,BELLS;
function season(){
  G=ROUNDS.filter(function(r){return r&&r.calls&&typeof r.a==='number'&&!isNaN(r.a)});P=window.__x2pPnl().A;
  fighters=ORDER.filter(function(m){return P[m]}).map(function(m){var a=P[m];return {m:m,a:a,n:a.W+a.L,hit:(a.W+a.L)?a.W/(a.W+a.L):0}});
  /* the site's ranking: by P&L; an AI that called fewer than half the graded rounds goes after the rest */
  var half=G.length/2;fighters.sort(function(x,y){return ((x.n<half)-(y.n<half))||(y.a.pnl-x.a.pnl)});
  top=fighters[0];
  fighters.forEach(function(f){var best=null,worst=null,b=0,w1=0,ot=0,won=0,run=0,lng=0,miss=0;
    G.forEach(function(r){var c=r.calls.filter(function(x){return x[0]===f.m})[0];if(!c){return}var ok=dirUp(c)===(r.a>0),off=parseFloat(c[2])||0;miss+=off;
      if(ok){if(off<=.1)b++;if(off<=1)w1++;run++;if(run>lng)lng=run}else{ot++;run=0}
      if(winners(r).indexOf(f.m)>-1)won++;
      var e=f.a.per&&f.a.per[r.n];if(e){if(!best||e.v>best.v)best={v:e.v,r:r,dn:e.dn};if(!worst||e.v<worst.v)worst={v:e.v,r:r,dn:e.dn}}});
    f.best=best;f.worst=worst;f.bull=b;f.w1=w1;f.ot=ot;f.won=won;f.lng=lng;f.avg=f.n?miss/f.n:0});
  /* bells: every round with its calls in, at its own exchange's close */
  BELLS=PENDING.filter(function(p){return p.calls&&p.calls.length}).map(function(p){return {p:p,t:closeAt(p.resolves,p.ticker)}});
}
function nextBell(){var now=Date.now(),f=BELLS.filter(function(b){return b.t!=null&&b.t>now}).sort(function(a,b){return a.t-b.t});return f[0]||null}
function waiting(){var now=Date.now();return BELLS.filter(function(b){return b.t!=null&&b.t<=now})}
function nextCalls(){var u=UPCOMING.filter(function(x){return mdy(x.called)!=null}).sort(function(a,b){return mdy(a.called)-mdy(b.called)});return u.length?mdy(u[0].called):null}

/* ================= OVERVIEW ================= */
function overview(){
  var main=document.getElementById('top')||document.querySelector('main.wrap');var nG=G.length;

  /* 1. the attract screen */
  var at=sec('waAttract',1,'wa-attract');var logo=document.querySelector('.brand .mark');
  at.innerHTML='<div class="wa-marq"><span class="wa-mlogo">'+(logo?logo.innerHTML:'')+'</span><span class="wa-mtx"><b>Earnings Zeason</b><i>Season 1 · '+nG+' rounds fought</i></span><span class="wa-cred" aria-hidden="true">Credit 0</span></div>'+
    '<h1 class="wa-h1"><span>4 AIs call stocks</span><span>before earnings.</span><em>The market close says who wins.</em></h1>';
  main.prepend(at);
  var bet=main.querySelector('section.x2o-bet');
  if(bet){bet.style.order=2;bet.classList.add('wa-film');
    var tag=document.createElement('p');tag.className='wa-attr';tag.innerHTML='<span class="wa-rec wa-lp" aria-hidden="true"></span>Attract mode · How to play <b>1:20</b>';
    var vt=bet.querySelector('.x2p-vt');if(vt)bet.insertBefore(tag,vt);
    var ml=document.createElement('div');ml.className='wa-moves';
    ml.innerHTML='<p class="wa-mlh">Move list</p><ol>'+
      '<li><b>1</b><span><strong>Call it.</strong> Before a company reports, each AI says up or down, and by how much.</span></li>'+
      '<li><b>2</b><span><strong>The bell.</strong> The next market close grades every call. Closest call wins the round.</span></li>'+
      '<li><b>3</b><span><strong>The bank.</strong> Each fights with a pretend $100,000. The top bank makes the real call: our pool on NVIDIA.</span></li></ol>'+
      '<button type="button" class="wa-start wa-lp">Press start</button>';
    bet.appendChild(ml);ml.querySelector('.wa-start').addEventListener('click',function(){var s=document.getElementById('waTonight');if(s)scrollTo({top:s.getBoundingClientRect().top+scrollY-90,behavior:RM?'auto':'smooth'})});
  }

  /* 2. the next fight: the VS screen. The card is the rounds graded at the next bell's day (New York date); if every bell has rung
     and the results are not in yet, those rounds, waiting */
  var today=nyToday(),nb=nextBell(),wt=waiting();
  var dayOf=function(b){return mdy(b.p.resolves)};var day=nb?dayOf(nb):(wt.length?Math.max.apply(null,wt.map(dayOf)):null);
  var card=BELLS.filter(function(b){return dayOf(b)===day}).map(function(b){return b.p}).sort(function(a,b){return (CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)});
  var tn=sec('waTonight',3,'wa-tonight');
  if(card.length){var h=card[0],up=h.calls.filter(function(c){return c.v>0}),dn=h.calls.filter(function(c){return c.v<0});
    var when=day===today?'Tonight':dname(day,true);var bell=closeAt(h.resolves,h.ticker);
    var side=function(list,lab,cls){return '<div class="wa-team '+cls+'"><p class="wa-tl">'+lab+'</p>'+list.map(function(c){return '<div class="wa-tf" style="--fc:'+COL[c.m]+'"><span class="wa-tp">'+mk(c.m)+'</span><span class="wa-tn">'+NICE[c.m]+'</span><span class="wa-tc">'+(c.v>0?'Up ':'Down ')+esc(c.mag)+'%</span></div>'}).join('')+(list.length?'':'<p class="wa-none">Nobody</p>')+'</div>'};
    var say=function(n){return n+(n===1?' says':' say')};var verdict=up.length&&dn.length?say(up.length)+' up, '+say(dn.length)+' down. Closest call wins.':'All '+h.calls.length+' say '+(up.length?'up':'down')+'. Closest call wins.';
    var gone=bell!=null&&bell<=Date.now();
    tn.innerHTML=plate(1,'Round '+h.n+' · '+when+' at the close',(gone?'Waiting on: ':day===today?'Tonight: ':'Next up: ')+esc(h.co),'The calls are locked in. The market close decides. '+verdict)+
      '<div class="wa-vs"><span class="wa-burst" aria-hidden="true">Fight!</span>'+side(up,'Team up','wa-up')+
      '<div class="wa-mid">'+co(h.ticker,'wa-cobig')+'<b class="wa-vsx">VS</b><span class="wa-coname">'+esc(h.co)+'</span><span class="wa-clock" data-t="'+(bell||'')+'">'+(bell==null?'Date to come':gone?'Bell rang<b>Results soon</b>':'Bell in<b>'+cd(bell-Date.now())+'</b>')+'</span></div>'+
      side(dn,'Team down','wa-dn')+'</div>'+
      (card.length>1?'<div class="wa-undercard"><p>Also on the card '+(day===today?'tonight':dname(day))+' · '+(card.length-1)+' more fight'+(card.length>2?'s':'')+'</p><div class="wa-ucl">'+card.slice(1).map(function(p){var u=p.calls.filter(function(c){return c.v>0}).length;return '<a class="wa-uc" href="#/round/'+p.n+'" title="'+esc(p.co)+'">'+co(p.ticker)+'<span>'+esc(String(p.ticker).split('.')[0])+'</span><i>'+u+' up · '+(p.calls.length-u)+' down</i></a>'}).join('')+'</div></div>':'');
  } else {var nc=nextCalls();tn.innerHTML=plate(1,'Between rounds','No fight tonight',nc?'The next calls drop '+dname(nc,true)+', before the reports. The card is on Upcoming.':'The next calls drop before the next report. Check Upcoming.')}
  main.appendChild(tn);
  setInterval(function(){var c=tn.querySelector('.wa-clock[data-t]');if(!c||!c.dataset.t)return;var ms=+c.dataset.t-Date.now();c.innerHTML=ms>0?'Bell in<b>'+cd(ms)+'</b>':'Bell rang<b>Results soon</b>'},30000);

  /* 3. character select: the standings */
  var cs=sec('waSelect',4,'wa-select');
  var tile=function(f,i){return '<button type="button" class="wa-pt'+(i===0?' wa-on':'')+'" data-m="'+f.m+'" style="--fc:'+COL[f.m]+'" aria-pressed="'+(i===0)+'"><span class="wa-rk">'+(i+1)+'</span>'+mk(f.m)+'<span class="wa-pn">'+NICE[f.m]+'</span><span class="wa-pp '+(f.a.pnl>=0?'wa-pos':'wa-neg')+'">'+k(f.a.pnl)+'</span>'+(i===0?'<span class="wa-p1">P1</span>':'')+'</button>'};
  cs.innerHTML=plate(2,'Character select · ranked by bank','Who’s winning','Every AI started with a pretend $100,000 and bets it all on each call. Tap a fighter.')+
    '<div class="wa-cs"><div class="wa-grid">'+fighters.map(tile).join('')+'</div><div class="wa-card" aria-live="polite"></div></div>'+
    '<div class="wa-chal"><p class="wa-chh">Here comes a new challenger!</p><p class="wa-chs">In tryouts for fighter No. 5, one at a time:</p><div class="wa-chl"><span>Qwen</span><span>Mistral</span><span>Gemini</span></div></div>'+
    '<a class="wa-more" href="#/leaderboard">High scores, lead changes and every stat <span aria-hidden="true">▶</span></a>';
  main.appendChild(cs);
  var show=function(m){var f=fighters.filter(function(x){return x.m===m})[0],i=fighters.indexOf(f),a=f.a;
    var hp=Math.max(2,Math.min(100,a.bal/2000));
    var seq=(a.seq||[]).slice(-5);var b=f.best;
    var lead=i===0?'<p class="wa-lead">On top of the bank. <b>Makes the call on bet #1.</b></p>':'<p class="wa-lead">'+usd(top.a.pnl-a.pnl)+' behind '+NICE[top.m]+'.</p>';
    cs.querySelector('.wa-card').innerHTML='<div class="wa-fh" style="--fc:'+COL[m]+'"><span class="wa-big">'+mk(m)+'</span><span class="wa-who"><span class="wa-no">No. '+(i+1)+'</span><b>'+NICE[m]+'</b><i>'+esc(MODELS[m].ver)+'</i></span></div>'+lead+
      '<div class="wa-hpw"><p class="wa-hl"><span>Bank</span><b>'+usd(a.bal)+'</b><em class="'+(a.pnl>=0?'wa-pos':'wa-neg')+'">'+usd(a.pnl,1)+' since the start</em></p>'+
      '<div class="wa-hp'+(a.pnl<0?' wa-low':'')+'"><i style="width:'+hp.toFixed(1)+'%"></i><s title="Start: $100,000"></s></div><p class="wa-hk">White tick = the $100,000 start. Full bar = $200,000.</p></div>'+
      '<div class="wa-fs"><div><p class="wa-fsl">Record</p><p class="wa-fsv"><b class="wa-pos">'+a.W+'</b> right <b class="wa-neg">'+a.L+'</b> wrong</p><p class="wa-fsk">on direction, '+(a.W+a.L)+' calls</p></div>'+
      '<div><p class="wa-fsl">Last 5 calls</p><p class="wa-dr">'+seq.map(function(s){return '<i class="'+(s==='W'?'wa-dw':'wa-dl')+'" title="'+(s==='W'?'right way':'wrong way')+'"></i>'}).join('')+'</p><p class="wa-fsk">green = right way</p></div></div>'+
      (b?'<p class="wa-sig"><span>Best hit</span>Called '+esc(b.r.co)+' '+(b.dn?'down':'up')+' in round '+b.r.n+': <b class="wa-pos">'+k(b.v)+'</b></p>':'');
    cs.querySelectorAll('.wa-pt').forEach(function(t){var on=t.dataset.m===m;t.classList.toggle('wa-on',on);t.setAttribute('aria-pressed',on)});
    var bar=cs.querySelector('.wa-hp i');if(bar&&!RM){bar.style.transition='none';var w=bar.style.width;bar.style.width='0';requestAnimationFrame(function(){requestAnimationFrame(function(){bar.style.transition='';bar.style.width=w})})}};
  show(top.m);cs.querySelectorAll('.wa-pt').forEach(function(t){t.addEventListener('click',function(){show(t.dataset.m)})});

  /* 4. match history: the record */
  var rec=document.getElementById('record');
  if(rec){rec.style.order=5;rec.classList.add('wa-rec-sec');
    var last=G.slice(-6).reverse();
    var hd=document.createElement('div');hd.className='wa-hist';
    hd.innerHTML=plate(3,'Match history · '+nG+' rounds graded','Replays','Every call, locked before the report, graded at the close. Each round has its own film.')+
      '<div class="wa-res" role="list">'+last.map(function(r){var x=result(r);return '<a role="listitem" class="wa-rt wa-'+x.k+'" href="#/round/'+r.n+'" title="Round '+r.n+', '+esc(r.co)+': '+x.s+'">'+co(r.ticker)+'<span class="wa-rtn">R'+r.n+'</span><b>'+x.t+'</b><span class="wa-rtw">'+(x.w?x.w.map(function(m){return '<i style="--fc:'+COL[m]+'">'+mk(m)+'</i>'}).join(''):'<i class="wa-x">✕</i>')+'</span></a>'}).join('')+'</div>'+
      '<p class="wa-key"><b>K.O.</b> closest call wins <b>Draw</b> a tie <b class="wa-kp">Perfect</b> all of them got the direction <b class="wa-kd">Double K.O.</b> all wrong</p>'+
      '<p class="wa-hint">Swipe the cards. Tap one to open it.</p>';
    var car=rec.querySelector('#car');rec.insertBefore(hd,car||rec.firstChild)}

  /* 5. training mode: smart or lucky */
  var tr=sec('waTrain',6,'wa-train');var byHit=fighters.slice().sort(function(x,y){return y.hit-x.hit});
  tr.innerHTML=plate(4,'Training mode · versus a coin','Smart or lucky?','A coin flip calls the direction right half the time. Here is each AI against the coin.')+
    '<div class="wa-tr">'+byHit.map(function(f){var p=tail(f.n,f.a.W),pc=Math.round(f.hit*100),odds,lab,cls;
      if(f.hit<.5){odds='Fewer right than a coin flip.';lab='Worse than a coin';cls='wa-v0'}
      else{var N=Math.round(1/p);odds=p<.2?'A coin gets this lucky about 1 time in '+N+'.':'A coin gets this lucky about '+Math.round(p*10)+' times in 10.';lab=p<.05?'Hard to call it luck':p<.2?'Leaning skill':'Could be luck';cls=p<.05?'wa-v3':p<.2?'wa-v2':'wa-v1'}
      return '<div class="wa-tw" style="--fc:'+COL[f.m]+'"><div class="wa-twh"><span class="wa-tpic">'+mk(f.m)+'</span><b>'+NICE[f.m]+'</b><span class="wa-vd '+cls+'">'+lab+'</span></div>'+
        '<div class="wa-cb"><i style="width:'+pc+'%"></i><s></s><em>'+pc+'%</em></div><p class="wa-tx">Right on '+f.a.W+' of '+f.n+' calls. '+odds+'</p></div>'}).join('')+
    '<p class="wa-coin">Dashed line = a coin flip, 50%. Small samples: a few rounds can flip a verdict.</p></div>';
  main.appendChild(tr);

  /* 6. the highlight reel */
  var hl=document.getElementById('highlights');
  if(hl){hl.style.order=7;hl.classList.add('wa-hl');var hh=document.createElement('div');hh.className='wa-hlh';
    hh.innerHTML=plate(5,'Highlight reel','Best moments','Bullseyes, the tightest race and the biggest move. Flip a card for the story.');
    hl.insertBefore(hh,hl.querySelector('#x2pHl')||hl.firstChild)}

  /* 7. the boss fight: the NVIDIA bet */
  var nv=(UPCOMING.concat(PENDING)).filter(function(u){return u.ticker==='NVDA'})[0];var nvd=nv&&mdy(nv.called);
  var bs=sec('waBoss',8,'wa-boss');
  bs.innerHTML=plate(6,'Final stage · bet #1','Boss fight: NVIDIA','Not a pretend bank this time. Real money from the pool.')+
    '<div class="wa-bf"><div class="wa-bvs"><div class="wa-bp" style="--fc:'+COL[top.m]+'"><span class="wa-big">'+mk(top.m)+'</span><b>'+NICE[top.m]+'</b><i>Top bank today</i></div><b class="wa-vsx">VS</b><div class="wa-bp wa-bnv">'+co('NVDA','wa-cobig')+'<b>NVIDIA</b><i>'+(nvd?'Reports '+dname(nvd)+(nvd>today?' · in '+Math.round((nvd-today)/864e5)+' days':''):'Date to come')+'</i></div></div>'+
    '<div class="wa-bhp"><p><span>Boss pool</span><b>Opens at launch</b></p><div class="wa-hp wa-pool"><i></i></div></div>'+
    '<ol class="wa-rules"><li><b>Fill it.</b> 69% of $EZ creator fees go into the pool.</li><li><b>Freeze.</b> 24 hours before NVIDIA reports, the AI with the top bank makes the call.</li><li><b>Bet.</b> The whole pool on that call, '+(window.SIM&&SIM.leverage||5)+'x on Hyperliquid.</li><li class="wa-rw"><b class="wa-pos">Win:</b> profits buy back $EZ. <b class="wa-neg">Lose:</b> the pool can be wiped out.</li></ol>'+
    '<p class="wa-next"><span>Next stage</span>Season 2: more bosses. Mag 7 and more.</p></div>';
  main.appendChild(bs);

  /* 8. insert coin: how to get $EZ (the address only once CONFIG.ca is set) */
  var ic=sec('waCoin',9,'wa-coin-sec');var C=window.CONFIG||{},X=C.x||'https://x.com/earningszn';
  ic.innerHTML='<p class="wa-ins wa-lp">Insert coin</p>'+(C.ca?'<p class="wa-insx">$EZ is live.</p>':'<p class="wa-insx">$EZ isn’t live yet.</p>')+
    '<div class="wa-slots"><div class="wa-slot"><b>1</b><p>'+(C.ca?'<strong>The address.</strong> Check every character: <code class="wa-ca">'+esc(C.ca)+'</code>'+(C.buyUrl?' <a href="'+esc(C.buyUrl)+'" target="_blank" rel="noopener">Buy $EZ</a>':''):'<strong>The address</strong> appears here, and only here, at launch. Anyone DMing you one before that is a scammer.')+'</p></div>'+
    '<div class="wa-slot"><b>2</b><p><strong>Every call</strong> lands on X before the report. <a href="'+esc(X)+'" target="_blank" rel="noopener">Follow @earningszn</a></p></div></div>'+
    '<p class="wa-risk">Best case, an AI buys back $EZ with its winnings. Worst case, the pool is gone. $EZ is a memecoin. Nothing here is financial advice.</p>'+
    '<p class="wa-cont">Continue? <span>Nobody said it would be EZ.</span></p>';
  main.appendChild(ic);

  ['standings','learn','x2pSt','get'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('wa-gone')});
  var hero=main.querySelector('section.hero');if(hero)hero.classList.add('wa-gone');

  /* announcer moments: FIGHT! and the challenger line pop once when they come into view */
  if('IntersectionObserver' in window&&!RM){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('wa-in');io.unobserve(e.target)}})},{threshold:.35});
    document.querySelectorAll('.wa-vs,.wa-chal,.wa-hpw,.wa-tr').forEach(function(e){io.observe(e)})}
  else document.querySelectorAll('.wa-vs,.wa-chal,.wa-hpw,.wa-tr').forEach(function(e){e.classList.add('wa-in')});
  loops(main);
}

/* ================= THE HUD: the sticky header becomes the fight's top bar ================= */
function hud(){
  var tin=document.querySelector('header.top .top-in');if(!tin||tin.querySelector('.wa-hud'))return;var p1=fighters[0],p2=fighters[1];
  var hb=function(f,side){return '<span class="wa-hs wa-'+side+'" style="--fc:'+COL[f.m]+'"><span class="wa-hn"><i>'+mk(f.m)+'</i>'+NICE[f.m]+'</span><span class="wa-hbar"><i style="width:'+Math.max(2,Math.min(100,f.a.bal/2000)).toFixed(1)+'%"></i><s></s></span></span>'};
  var h=document.createElement('a');h.className='wa-hud';h.href='#/leaderboard';
  /* the clock: the next bell of any round with its calls in (each at its own exchange's close); after the last bell, results due;
     with no calls in, the next calls day */
  var st=function(){var b=nextBell(),w=waiting(),nc=nextCalls();
    if(b){var ms=b.t-Date.now(),hh=Math.floor(ms/36e5);return {v:hh>=1?hh+'':Math.max(1,Math.floor(ms/6e4))+'',l:hh>=1?(hh===1?'hr':'hrs')+' to bell':'min to bell',a:'Next bell, '+b.p.co+', in '+cd(ms)}}
    if(w.length)return {v:'!',l:'results due',a:'The bell has rung. Results soon.'};
    if(nc)return {v:dname(nc).split(',')[0].slice(0,3),l:'next calls',a:'Next calls '+dname(nc,true)};
    return {v:'--',l:'no bell',a:'No bell scheduled'}};
  var paint=function(){var s=st();h.querySelector('.wa-tmr').innerHTML='<b>'+esc(s.v)+'</b><em>'+esc(s.l)+'</em>';
    h.setAttribute('aria-label','Leader '+NICE[p1.m]+', bank '+usd(p1.a.bal)+'. Second '+NICE[p2.m]+', '+usd(p2.a.bal)+'. '+s.a+'. Open the leaderboard.')};
  h.innerHTML=hb(p1,'l')+'<span class="wa-tmr"></span>'+hb(p2,'r');paint();
  tin.insertBefore(h,tin.querySelector('#liveChip')||null);setInterval(paint,30000)}

/* ================= LEADERBOARD: high scores ================= */
function board(){
  if(document.getElementById('waLB'))return;var view=document.getElementById('view');
  var lb=document.createElement('main');lb.id='waLB';lb.className='wrap wa-lb';lb.setAttribute('aria-labelledby','waLBh');
  var nG=G.length,last=G[G.length-1];
  /* positions after every graded round, by bank (each AI starts at $100,000; the race-day mockup's rule) */
  var bal={},pos={},hist=[];ORDER.forEach(function(m){bal[m]=100000;pos[m]=[]});
  var prev=ORDER.slice(),ev=[],leadCh=0,since=G.length?G[0].n:0;
  G.forEach(function(r,i){ORDER.forEach(function(m){var e=P[m]&&P[m].per[r.n];if(e)bal[m]+=e.v});
    var o=ORDER.slice().sort(function(a,b){return (bal[b]-bal[a])||(prev.indexOf(a)-prev.indexOf(b))});
    o.forEach(function(m,j){pos[m].push(j)});
    if(i){o.forEach(function(m,j){var was=prev.indexOf(m);if(j<was){prev.slice(j,was).forEach(function(x){if(o.indexOf(x)>j)ev.push({r:r,m:m,x:x,to:j})})}});
      if(o[0]!==prev[0]){leadCh++;since=r.n}}
    hist.push(o);prev=o});
  var curLead=prev[0];
  /* the high score table */
  var row=function(f,i){var a=f.a,seq=(a.seq||[]).slice(-5);return '<li class="wa-hsr'+(i===0?' wa-hs1':'')+'" style="--fc:'+COL[f.m]+'">'+
    '<span class="wa-hsp">'+PLACE[i]+'</span><span class="wa-hsf"><i>'+mk(f.m)+'</i><span><b>'+NICE[f.m]+'</b><em>'+esc(MODELS[f.m].ver)+'</em></span></span>'+
    '<span class="wa-hsb"><b>'+usd(a.bal)+'</b><em class="'+(a.pnl>=0?'wa-pos':'wa-neg')+'">'+usd(a.pnl,1)+'</em></span>'+
    '<span class="wa-hsw"><b><span class="wa-pos">'+a.W+'</span>-<span class="wa-neg">'+a.L+'</span></b><em>'+Math.round(f.hit*100)+'% hit</em></span>'+
    '<span class="wa-hsl" aria-label="Last five: '+seq.map(function(s){return s==='W'?'right':'wrong'}).join(', ')+'">'+seq.map(function(s){return '<i class="'+(s==='W'?'wa-dw':'wa-dl')+'"></i>'}).join('')+'</span></li>'};
  /* the bump chart: one line per AI, 1st on top */
  var W=600,Hc=200,px=function(i){return G.length>1?i/(G.length-1)*W:0},py=function(j){return 18+j*(Hc-36)/3};
  var lines=ORDER.map(function(m){return '<path d="'+pos[m].map(function(j,i){return (i?'L':'M')+px(i).toFixed(1)+' '+py(j).toFixed(1)}).join(' ')+'" stroke="'+COL[m]+'" class="wa-bl'+(m===curLead?' wa-bl1':'')+'" vector-effect="non-scaling-stroke"/>'}).join('');
  var marks=[];hist.forEach(function(o,i){if(i&&o[0]!==hist[i-1][0])marks.push('<i class="wa-lc" style="left:'+(px(i)/W*100).toFixed(2)+'%" title="Round '+G[i].n+': '+NICE[o[0]]+' takes the lead"></i>')});
  var ends=ORDER.map(function(m){var j=pos[m][pos[m].length-1];return '<span class="wa-be" style="top:'+(py(j)/Hc*100).toFixed(2)+'%;--fc:'+COL[m]+'">'+NICE[m]+'</span>'}).join('');
  var leadList=[];hist.forEach(function(o,i){if(i&&o[0]!==hist[i-1][0])leadList.push({r:G[i],m:o[0],x:hist[i-1][0]})});
  var evl=function(e){return '<li style="--fc:'+COL[e.m]+'"><span class="wa-evr">R'+e.r.n+'</span><span class="wa-evc">'+co(e.r.ticker)+'</span><span class="wa-evt"><b>'+NICE[e.m]+'</b> passes <b>'+NICE[e.x]+'</b>'+(e.to===0?' for the lead':' for '+PLACE[e.to])+'<i>'+esc(e.r.co)+'</i></span></li>'};
  var recent=ev.slice(-8).reverse();
  /* fighter stats */
  var stat=function(l,v,c){return '<div class="wa-st"><span class="wa-stl">'+l+'</span><b'+(c?' class="'+c+'"':'')+'>'+v+'</b></div>'};
  var card=function(f,i){var a=f.a,b=f.best,w=f.worst,stk=a.streak||'';
    return '<article class="wa-fc" style="--fc:'+COL[f.m]+'"><header class="wa-fch"><span class="wa-fcp">'+PLACE[i]+'</span><span class="wa-big">'+mk(f.m)+'</span><span class="wa-who"><b>'+NICE[f.m]+'</b><i>'+esc(MODELS[f.m].ver)+'</i></span></header>'+
      '<div class="wa-sts">'+stat('Bank',usd(a.bal))+stat('P&amp;L',usd(a.pnl,1),a.pnl>=0?'wa-pos':'wa-neg')+stat('Record','<span class="wa-pos">'+a.W+'</span>-<span class="wa-neg">'+a.L+'</span>')+stat('Hit rate',Math.round(f.hit*100)+'%')+
      stat('Rounds won',f.won+'<small> of '+f.n+'</small>')+stat('Streak',stk?(stk.charAt(0)==='W'?'<span class="wa-pos">'+stk.slice(1)+' right</span>':'<span class="wa-neg">'+stk.slice(1)+' wrong</span>'):'--')+
      stat('Longest run',f.lng+' right')+stat('Avg miss',f.avg.toFixed(2)+'%')+'</div>'+
      '<div class="wa-tgt"><p class="wa-fsl">Target hits</p><div><span><b class="wa-gd">'+f.bull+'</b>Bullseye'+(f.bull===1?'':'s')+'</span><span><b class="wa-pos">'+f.w1+'</b>Within 1%</span><span><b class="wa-neg">'+f.ot+'</b>Off target</span></div></div>'+
      '<div class="wa-bw">'+(b?'<p><span>Best call</span>'+co(b.r.ticker)+'<em>'+esc(b.r.co)+' '+(b.dn?'down':'up')+' · R'+b.r.n+'</em><b class="wa-pos">'+k(b.v)+'</b></p>':'')+(w?'<p><span>Worst call</span>'+co(w.r.ticker)+'<em>'+esc(w.r.co)+' '+(w.dn?'down':'up')+' · R'+w.r.n+'</em><b class="wa-neg">'+k(w.v)+'</b></p>':'')+'</div></article>'};
  /* by sector: right calls out of calls made; the best in each row is lit (ties share it) */
  var secs={};G.forEach(function(r){var s=((window.RMETA||{})[r.n]||{}).sector;if(!s)return;s=SH[s]||s;var o=secs[s]||(secs[s]={n:0,c:{}});o.n++;
    r.calls.forEach(function(c){var t=o.c[c[0]]||(o.c[c[0]]={k:0,n:0});t.n++;if(dirUp(c)===(r.a>0))t.k++})});
  var sk=Object.keys(secs).sort(function(a,b){return secs[b].n-secs[a].n});
  var grid='<div class="wa-sg" role="table" aria-label="Right calls out of calls made, by sector"><div class="wa-sgr wa-sgh" role="row"><span role="columnheader">Sector</span>'+fighters.map(function(f){return '<span role="columnheader" style="--fc:'+COL[f.m]+'"><i>'+mk(f.m)+'</i><b>'+NICE[f.m]+'</b></span>'}).join('')+'</div>'+
    sk.map(function(s){var o=secs[s],best=0;fighters.forEach(function(f){var t=o.c[f.m];if(t&&t.n)best=Math.max(best,t.k/t.n)});var all=fighters.every(function(f){var t=o.c[f.m];return t&&t.n&&t.k/t.n===best});
      return '<div class="wa-sgr" role="row"><span role="rowheader">'+esc(s)+'<small>'+o.n+'</small></span>'+fighters.map(function(f){var t=o.c[f.m];if(!t||!t.n)return '<span role="cell" class="wa-sc0">–</span>';var v=t.k/t.n;
        return '<span role="cell" class="'+(v>=2/3?'wa-sch':v<=1/3?'wa-scl':'wa-scm')+(!all&&v===best&&best>0?' wa-scb':'')+'">'+t.k+'/'+t.n+'</span>'}).join('')+'</div>'}).join('')+'</div>';
  lb.innerHTML='<section class="wa-sec wa-lbs" id="waHS">'+plate('Ranking','Season 1 · after round '+(last?last.n:0),'High scores','Ranked by bank: a pretend $100,000 each, the whole balance on every call, right way or wrong. The top bank makes the call on bet #1.','h1').replace('class="wa-h2"','class="wa-h2" id="waLBh"')+
      '<div class="wa-hst"><div class="wa-hsh" aria-hidden="true"><span>Rank</span><span>Fighter</span><span>Bank</span><span>W-L</span><span>Last 5</span></div><ol class="wa-hsl0">'+fighters.map(row).join('')+'</ol></div></section>'+
    '<section class="wa-sec wa-lbs" id="waLead">'+plate('Replay','Who was in front after every round','Lead changes','The lead has changed hands '+leadCh+' time'+(leadCh===1?'':'s')+'. '+NICE[curLead]+' has led since round '+since+'.')+
      '<figure class="wa-bump"><div class="wa-bpl"><span>1st</span><span>2nd</span><span>3rd</span><span>4th</span></div><div class="wa-bpc"><svg viewBox="0 0 '+W+' '+Hc+'" preserveAspectRatio="none" aria-hidden="true">'+[0,1,2,3].map(function(j){return '<line x1="0" x2="'+W+'" y1="'+py(j)+'" y2="'+py(j)+'" class="wa-bg"/>'}).join('')+lines+'</svg>'+marks.join('')+ends+'</div>'+
      '<figcaption><span>R'+(G.length?G[0].n:'')+'</span><span>Position by bank after each round. Gold ticks: the lead changed.</span><span>R'+(last?last.n:'')+'</span></figcaption></figure>'+
      '<div class="wa-evs"><div><p class="wa-fsl">Every lead change</p><ol class="wa-evl">'+leadList.slice().reverse().map(function(e){return evl({r:e.r,m:e.m,x:e.x,to:0})}).join('')+'</ol></div>'+
      '<div><p class="wa-fsl">Latest overtakes</p><ol class="wa-evl">'+recent.map(evl).join('')+'</ol></div></div></section>'+
    '<section class="wa-sec wa-lbs" id="waStats">'+plate('Stats','Fighter select · every number','Fighter stats','Rounds won = closest call that got the direction. A bullseye lands within 0.1% of the move, the right way. Off target: the wrong way.')+
      '<div class="wa-fcs">'+fighters.map(card).join('')+'</div></section>'+
    '<section class="wa-sec wa-lbs" id="waSect">'+plate('Arenas','By sector','Home turf','Right calls out of calls made, by sector. The best in each row is lit. Small samples: it fills in.')+grid+
      '<p class="wa-sgk"><span class="wa-sch">2 in 3 or better</span><span class="wa-scm">In between</span><span class="wa-scl">1 in 3 or worse</span></p></section>';
  view.parentNode.insertBefore(lb,view.nextSibling);
  [].forEach.call(lb.querySelectorAll('a.wa-uc,.wa-evl li'),function(){});
}

/* ================= UPCOMING: X2+'s fight-night tab under a stage plate ================= */
function upcoming(){var v=document.getElementById('view');if(!v)return;var up=v.querySelector('.x2p-up');if(!up||up.querySelector('.wa-uph'))return;
  var d=document.createElement('div');d.className='wa-uph';var nb=nextBell(),nc=nextCalls();
  d.innerHTML=plate('Fight card','Upcoming · '+(PENDING.length+UPCOMING.length)+' rounds to come','The card','Every round still to come. The calls lock before the report; the close grades them. Tap a ticket to open its card.');
  up.insertBefore(d,up.firstChild);loops(up)}

/* ================= start ================= */
function done(){ROOT.classList.add('wa-ok');ROOT.classList.add('x2p-world');try{performance.mark('wa-done')}catch(e){}}
function go(){try{performance.mark('wa-go')}catch(e){}
  season();overview();try{performance.mark('wa-ov')}catch(e){}hud();
  var sync=function(){var s=ROOT.getAttribute('data-sec');if(s==='leaderboard'){board();var lb=document.getElementById('waLB');if(lb&&!sync.__f){sync.__f=1}}if(s==='upcoming')upcoming()};
  sync();new MutationObserver(sync).observe(ROOT,{attributes:true,attributeFilter:['data-sec']});
  var v=document.getElementById('view');if(v)new MutationObserver(function(){if(ROOT.getAttribute('data-sec')==='upcoming')upcoming()}).observe(v,{childList:true});
  done()}
var tries=0;(function wait(){if(window.ROUNDS&&window.__x2pPnl&&window.MODELS&&document.getElementById('top')&&document.querySelector('.x2p-vt')&&document.querySelector('.brand .mark')&&document.documentElement.classList.contains('x2p-launch')){
    try{go()}catch(e){console.error('arcade',e);window.__waErr=e;done()}}else if(tries++<400)setTimeout(wait,25);else done()})();
})();
