/* EZ world: the arcade fighting game. Injected at DOMContentLoaded into ez/v46-live-x2plus.html (mockup only).
   Every figure is read from the page's own data: ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, CAPS, window.__x2pPnl(). */
(function(){
var ROOT=document.documentElement;ROOT.classList.add('wa');
var lk=document.createElement('link');lk.rel='stylesheet';
lk.href='https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800;1,900&family=Barlow:wght@500;600;700&display=swap';
document.head.appendChild(lk);
var RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
var ORDER=['GPT','KIMI','CLAUDE','GROK'];
var COL={GPT:'#10a37f',KIMI:'#1e80ff',CLAUDE:'#d97757',GROK:'#aab2c0'};
var NICE={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function mk(m,fill){var M=MODELS[m];if(!M)return '';return '<svg class="wa-ml" viewBox="0 0 24 24" aria-hidden="true"><path d="'+M.d+'" fill="'+(fill||'#f8f0d9')+'"'+(M.fr?' fill-rule="evenodd"':'')+'/>'+(M.dot?'<path d="'+M.dot+'" fill="'+(fill||M.dotc)+'"/>':'')+'</svg>'}
function co(t,cls){t=String(t||'').toUpperCase();var L=CO_LOGOS[t],f=L&&(L.f||L);var tx=esc(t.split('.')[0]);
  if(!f)return '<span class="wa-co wa-cot '+(cls||'')+'">'+tx+'</span>';
  return '<span class="wa-co '+(L.dark?'wa-cod ':'')+(cls||'')+'"><img src="media/'+esc(f)+'" alt="" loading="lazy"></span>'}
function usd(v,sign){var a=Math.abs(Math.round(v)),s=a.toLocaleString('en-US');return (sign?(v>=0?'+':'−'):(v<0?'−':''))+'$'+s}
function k(v){var a=Math.abs(v),s=a>=1000?(a/1000).toFixed(1).replace(/\.0$/,'')+'K':Math.round(a)+'';return (v>=0?'+':'−')+'$'+s}
function mdy(s){var p=String(s||'').split('/');if(p.length<3)return null;return Date.UTC(2000+(+p[2]%100),p[0]-1,+p[1])}
var nyFmt=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',hour12:false,year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'});
function nyParts(t){var o={};nyFmt.formatToParts(new Date(t)).forEach(function(p){o[p.type]=p.value});return o}
function nyToday(){var o=nyParts(Date.now());return Date.UTC(+o.year,o.month-1,+o.day)}
function nyAt(day,h){var d=new Date(day),g=Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),h),o=nyParts(g),as=Date.UTC(+o.year,o.month-1,+o.day,+o.hour%24,+o.minute);return g+(g-as)}
function dname(day,long){return new Date(day).toLocaleDateString('en-US',{timeZone:'UTC',weekday:long?'long':'short',month:'short',day:'numeric'})}
function dirOf(c){return /^UP/i.test(c)?1:/^DOWN/i.test(c)?-1:0}
function winners(r){var w=String(r.win||'').toUpperCase();return ORDER.filter(function(m){return w.indexOf(m)>=0})}
function result(r){var w=winners(r),right=r.calls.filter(function(c){return dirOf(c[1])===Math.sign(r.a)}).length;
  if(!w.length)return {k:'dko',t:'Double K.O.',s:'Everyone wrong'};
  if(right===r.calls.length&&r.calls.length>=3)return {k:'perf',t:'Perfect',s:'All '+r.calls.length+' got the direction',w:w};
  if(w.length>1)return {k:'draw',t:'Draw',s:w.map(function(m){return NICE[m]}).join(' & ')+' tie',w:w};
  return {k:'ko',t:'K.O.',s:NICE[w[0]]+' closest',w:w}}
function tail(n,kk){var p=0,c=1;for(var i=0;i<=n;i++){if(i>0)c=c*(n-i+1)/i;if(i>=kk)p+=c}return p/Math.pow(2,n)}
function cd(ms){if(ms<=0)return 'now';var m=Math.floor(ms/6e4),h=Math.floor(m/60),d=Math.floor(h/24);return d>=2?d+' days':h>=1?h+'h '+(m%60)+'m':m+'m'}
function sec(id,ord,cls){var s=document.createElement('section');s.id=id;s.className='wa-sec '+(cls||'');s.style.order=ord;return s}
function plate(n,kick,title,sub){return '<header class="wa-plate"><span class="wa-stg">Stage '+n+'</span><p class="wa-kick">'+kick+'</p><h2 class="wa-h2">'+title+'</h2>'+(sub?'<p class="wa-sub">'+sub+'</p>':'')+'</header>'}

function build(){
  var main=document.querySelector('main.wrap');var P=window.__x2pPnl().A;
  var G=ROUNDS.filter(function(r){return r&&r.calls&&r.a!=null});var nG=G.length;
  var fighters=ORDER.map(function(m){var a=P[m];return {m:m,a:a,n:a.W+a.L,hit:a.W/(a.W+a.L)}}).sort(function(x,y){return y.a.pnl-x.a.pnl});
  var top=fighters[0];
  /* signature move: the fighter's biggest single-call win */
  fighters.forEach(function(f){var best=null;G.forEach(function(r){var e=f.a.per&&f.a.per[r.n];if(e&&(!best||e.v>best.v))best={v:e.v,r:r,dn:e.dn}});f.best=best});

  /* ---------- 1. ATTRACT SCREEN ---------- */
  var at=sec('waAttract',1,'wa-attract');var logo=document.querySelector('.brand .mark');
  at.innerHTML='<div class="wa-marq"><span class="wa-mlogo">'+(logo?logo.innerHTML:'')+'</span><span class="wa-mtx"><b>Earnings Zeason</b><i>Season 1 · '+nG+' rounds fought</i></span><span class="wa-cred" aria-hidden="true">Credit 0</span></div>'+
    '<h1 class="wa-h1"><span>4 AIs call stocks</span><span>before earnings.</span><em>The market close says who wins.</em></h1>';
  main.prepend(at);
  var bet=document.querySelector('section.x2o-bet');
  if(bet){bet.style.order=2;bet.classList.add('wa-film');
    var tag=document.createElement('p');tag.className='wa-attr';tag.innerHTML='<span class="wa-rec" aria-hidden="true"></span>Attract mode · How to play <b>1:20</b>';
    var vt=bet.querySelector('.x2p-vt');if(vt)bet.insertBefore(tag,vt);
    var ml=document.createElement('div');ml.className='wa-moves';
    ml.innerHTML='<p class="wa-mlh">Move list</p><ol>'+
      '<li><b>1</b><span><strong>Call it.</strong> Before a company reports, each AI says up or down, and by how much.</span></li>'+
      '<li><b>2</b><span><strong>The bell.</strong> The next market close grades every call. Closest call wins the round.</span></li>'+
      '<li><b>3</b><span><strong>The bank.</strong> Each fights with a pretend $100,000. The top bank makes the real call: our pool on NVIDIA.</span></li></ol>'+
      '<a class="wa-start" href="javascript:void 0">Press start</a>';
    bet.appendChild(ml);ml.querySelector('.wa-start').addEventListener('click',function(e){e.preventDefault();var s=document.getElementById('waTonight');if(s)scrollTo({top:s.getBoundingClientRect().top+scrollY-70,behavior:RM?'auto':'smooth'})});
  }

  /* ---------- 2. TONIGHT: the VS screen ---------- */
  var today=nyToday();
  var pend=PENDING.filter(function(p){return p.calls&&p.calls.length&&mdy(p.resolves)!=null&&mdy(p.resolves)>=today});
  var day=pend.length?Math.min.apply(null,pend.map(function(p){return mdy(p.resolves)})):null;
  var card=pend.filter(function(p){return mdy(p.resolves)===day}).sort(function(a,b){return (CAPS[b.ticker]||0)-(CAPS[a.ticker]||0)});
  var tn=sec('waTonight',3,'wa-tonight');
  if(card.length){var h=card[0],up=h.calls.filter(function(c){return c.v>0}),dn=h.calls.filter(function(c){return c.v<0});
    var when=day===today?'Tonight':dname(day,true);var foreign=/\./.test(h.ticker);var bell=nyAt(day,16);
    var side=function(list,lab,cls){return '<div class="wa-team '+cls+'"><p class="wa-tl">'+lab+'</p>'+list.map(function(c){return '<div class="wa-tf" style="--fc:'+COL[c.m]+'"><span class="wa-tp">'+mk(c.m)+'</span><span class="wa-tn">'+NICE[c.m]+'</span><span class="wa-tc">'+(c.v>0?'Up ':'Down ')+esc(c.mag)+'%</span></div>'}).join('')+(list.length?'':'<p class="wa-none">Nobody</p>')+'</div>'};
    var say=function(n){return n+(n===1?' says':' say')};var verdict=up.length&&dn.length?say(up.length)+' up, '+say(dn.length)+' down. Closest call wins.':'All '+h.calls.length+' say '+(up.length?'up':'down')+'. Closest call wins.';
    tn.innerHTML=plate(1,'Round '+h.n+' · '+when+' at the close',(day===today?'Tonight: ':'Next up: ')+esc(h.co),'The calls are locked in. The market close decides. '+verdict)+
      '<div class="wa-vs"><span class="wa-burst" aria-hidden="true">Fight!</span>'+side(up,'Team up','wa-up')+
      '<div class="wa-mid">'+co(h.ticker,'wa-cobig')+'<b class="wa-vsx">VS</b><span class="wa-coname">'+esc(h.co)+'</span><span class="wa-clock" data-t="'+bell+'">'+(foreign?'Graded at its own exchange’s close':'Bell in <b>'+cd(bell-Date.now())+'</b>')+'</span></div>'+
      side(dn,'Team down','wa-dn')+'</div>'+
      (card.length>1?'<div class="wa-undercard"><p>Also on the card '+(day===today?'tonight':dname(day))+' · '+(card.length-1)+' more fights</p><div class="wa-ucl">'+card.slice(1).map(function(p){var u=p.calls.filter(function(c){return c.v>0}).length;return '<a class="wa-uc" href="#/round/'+p.n+'" title="'+esc(p.co)+'">'+co(p.ticker)+'<span>'+esc(String(p.ticker).split('.')[0])+'</span><i>'+u+' up · '+(p.calls.length-u)+' down</i></a>'}).join('')+'</div></div>':'');
  } else {tn.innerHTML=plate(1,'Between rounds','No fight tonight','The next calls drop before the next report. Check Upcoming.')}
  main.appendChild(tn);
  setInterval(function(){var c=tn.querySelector('.wa-clock[data-t] b');if(c)c.textContent=cd(+c.parentNode.dataset.t-Date.now())},30000);

  /* ---------- 3. CHARACTER SELECT: the standings ---------- */
  var cs=sec('waSelect',4,'wa-select');
  var tile=function(f,i){return '<button type="button" class="wa-pt'+(i===0?' wa-on':'')+'" data-m="'+f.m+'" style="--fc:'+COL[f.m]+'" aria-pressed="'+(i===0)+'"><span class="wa-rk">'+(i+1)+'</span>'+mk(f.m)+'<span class="wa-pn">'+NICE[f.m]+'</span><span class="wa-pp '+(f.a.pnl>=0?'wa-pos':'wa-neg')+'">'+k(f.a.pnl)+'</span>'+(i===0?'<span class="wa-p1">P1</span>':'')+'</button>'};
  cs.innerHTML=plate(2,'Character select · ranked by bank','Who’s winning','Every AI started with a pretend $100,000 and bets it all on each call. Tap a fighter.')+
    '<div class="wa-cs"><div class="wa-grid">'+fighters.map(tile).join('')+'</div><div class="wa-card" aria-live="polite"></div></div>'+
    '<div class="wa-chal"><p class="wa-chh">Here comes a new challenger!</p><p class="wa-chs">In tryouts for fighter No. 5, one at a time:</p><div class="wa-chl"><span>Qwen</span><span>Mistral</span><span>Gemini</span></div></div>';
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

  /* ---------- the HUD: the sticky header becomes the fight's top bar ---------- */
  var tin=document.querySelector('header.top .top-in');
  if(tin){var p1=fighters[0],p2=fighters[1];var hb=function(f,side){return '<span class="wa-hs wa-'+side+'" style="--fc:'+COL[f.m]+'"><span class="wa-hn"><i>'+mk(f.m)+'</i>'+NICE[f.m]+'</span><span class="wa-hbar"><i style="width:'+Math.max(2,Math.min(100,f.a.bal/2000)).toFixed(1)+'%"></i><s></s></span></span>'};
    var nb=day!=null?nyAt(day,16):null;var hud=document.createElement('a');hud.className='wa-hud';hud.href='javascript:void 0';
    hud.setAttribute('aria-label','Leader '+NICE[p1.m]+', bank '+usd(p1.a.bal)+'. Second '+NICE[p2.m]+', '+usd(p2.a.bal)+'.'+(nb?' Next bell in '+cd(nb-Date.now())+'.':''));
    var tm=function(){if(!nb)return '<b>--</b><em>no bell</em>';var ms=nb-Date.now(),h=Math.floor(ms/36e5);return ms<=0?'<b>0</b><em>bell</em>':h>=1?'<b>'+h+'</b><em>hrs to bell</em>':'<b>'+Math.max(1,Math.floor(ms/6e4))+'</b><em>min to bell</em>'};
    hud.innerHTML=hb(p1,'l')+'<span class="wa-tmr">'+tm()+'</span>'+hb(p2,'r');
    hud.addEventListener('click',function(e){e.preventDefault();var s=document.getElementById('waSelect');if(s)scrollTo({top:s.getBoundingClientRect().top+scrollY-90,behavior:RM?'auto':'smooth'})});
    tin.insertBefore(hud,tin.querySelector('#liveChip')||null);setInterval(function(){hud.querySelector('.wa-tmr').innerHTML=tm()},30000)}

  /* ---------- 4. MATCH HISTORY: the record ---------- */
  var rec=document.getElementById('record');
  if(rec){rec.style.order=5;rec.classList.add('wa-rec-sec');
    var last=G.slice(-6).reverse();
    var hd=document.createElement('div');hd.className='wa-hist';
    hd.innerHTML=plate(3,'Match history · '+nG+' rounds graded','Replays','Every call, locked before the report, graded at the close. Each round has its own film.')+
      '<div class="wa-res" role="list">'+last.map(function(r){var x=result(r);return '<a role="listitem" class="wa-rt wa-'+x.k+'" href="#/round/'+r.n+'" title="Round '+r.n+', '+esc(r.co)+': '+x.s+'">'+co(r.ticker)+'<span class="wa-rtn">R'+r.n+'</span><b>'+x.t+'</b><span class="wa-rtw">'+(x.w?x.w.map(function(m){return '<i style="--fc:'+COL[m]+'">'+mk(m)+'</i>'}).join(''):'<i class="wa-x">✕</i>')+'</span></a>'}).join('')+'</div>'+
      '<p class="wa-key"><b>K.O.</b> closest call wins <b>Draw</b> a tie <b class="wa-kp">Perfect</b> all four got the direction <b class="wa-kd">Double K.O.</b> all wrong</p>'+
      '<p class="wa-hint">Swipe the cards. Tap one to see its calls.</p>';
    var car=rec.querySelector('#car');rec.insertBefore(hd,car||rec.firstChild)}

  /* ---------- 5. TRAINING MODE: smart or lucky ---------- */
  var tr=sec('waTrain',6,'wa-train');var byHit=fighters.slice().sort(function(x,y){return y.hit-x.hit});
  tr.innerHTML=plate(4,'Training mode · versus a coin','Smart or lucky?','A coin flip calls the direction right half the time. Here is each AI against the coin.')+
    '<div class="wa-tr">'+byHit.map(function(f){var p=tail(f.n,f.a.W),pc=Math.round(f.hit*100),odds,lab,cls;
      if(f.hit<.5){odds='Fewer right than a coin flip.';lab='Worse than a coin';cls='wa-v0'}
      else{var N=Math.round(1/p);odds=p<.2?'A coin gets this lucky about 1 time in '+N+'.':'A coin gets this lucky about '+Math.round(p*10)+' times in 10.';lab=p<.05?'Hard to call it luck':p<.2?'Leaning skill':'Could be luck';cls=p<.05?'wa-v3':p<.2?'wa-v2':'wa-v1'}
      return '<div class="wa-tw" style="--fc:'+COL[f.m]+'"><div class="wa-twh"><span class="wa-tpic">'+mk(f.m)+'</span><b>'+NICE[f.m]+'</b><span class="wa-vd '+cls+'">'+lab+'</span></div>'+
        '<div class="wa-cb"><i style="width:'+pc+'%"></i><s></s><em>'+pc+'%</em></div><p class="wa-tx">Right on '+f.a.W+' of '+f.n+' calls. '+odds+'</p></div>'}).join('')+
    '<p class="wa-coin">Dashed line = a coin flip, 50%. Small samples: a few rounds can flip a verdict.</p></div>';
  main.appendChild(tr);

  /* ---------- 6. HIGHLIGHT REEL ---------- */
  var hl=document.getElementById('highlights');
  if(hl){hl.style.order=7;hl.classList.add('wa-hl');var hh=document.createElement('div');hh.className='wa-hlh';
    hh.innerHTML=plate(5,'Highlight reel','Best moments','Bullseyes, the tightest race and the biggest upset. Flip a card for the story.');
    hl.insertBefore(hh,hl.querySelector('#x2pHl')||hl.firstChild)}

  /* ---------- 7. BOSS FIGHT: the NVIDIA bet ---------- */
  var nv=(UPCOMING.concat(PENDING)).filter(function(u){return u.ticker==='NVDA'})[0];var nvd=nv&&mdy(nv.called);
  var bs=sec('waBoss',8,'wa-boss');
  bs.innerHTML=plate(6,'Final stage · bet #1','Boss fight: NVIDIA','Not a pretend bank this time. Real money from the pool.')+
    '<div class="wa-bf"><div class="wa-bvs"><div class="wa-bp" style="--fc:'+COL[top.m]+'"><span class="wa-big">'+mk(top.m)+'</span><b>'+NICE[top.m]+'</b><i>Top bank today</i></div><b class="wa-vsx">VS</b><div class="wa-bp wa-bnv">'+co('NVDA','wa-cobig')+'<b>NVIDIA</b><i>'+(nvd?'Reports '+dname(nvd)+(nvd>today?' · in '+Math.round((nvd-today)/864e5)+' days':''):'Date to come')+'</i></div></div>'+
    '<div class="wa-bhp"><p><span>Boss pool</span><b>Opens at launch</b></p><div class="wa-hp wa-pool"><i></i></div></div>'+
    '<ol class="wa-rules"><li><b>Fill it.</b> 69% of $EZ creator fees go into the pool.</li><li><b>Freeze.</b> 24 hours before NVIDIA reports, the AI with the top bank makes the call.</li><li><b>Bet.</b> The whole pool on that call, '+(window.SIM&&SIM.leverage||5)+'x on Hyperliquid.</li><li class="wa-rw"><b class="wa-pos">Win:</b> profits buy back $EZ. <b class="wa-neg">Lose:</b> the pool can be wiped out.</li></ol>'+
    '<p class="wa-next"><span>Next stage</span>Season 2: more bosses. Mag 7 and more.</p></div>';
  main.appendChild(bs);

  /* ---------- 8. INSERT COIN ---------- */
  var ic=sec('waCoin',9,'wa-coin-sec');var X=(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn';
  ic.innerHTML='<p class="wa-ins">Insert coin</p><p class="wa-insx">$EZ isn’t live yet.</p>'+
    '<div class="wa-slots"><div class="wa-slot"><b>1</b><p><strong>The address</strong> appears here, and only here, at launch. Anyone DMing you one before that is a scammer.</p></div>'+
    '<div class="wa-slot"><b>2</b><p><strong>Every call</strong> lands on X before the report. <a href="'+esc(X)+'" target="_blank" rel="noopener">Follow @earningszn</a></p></div></div>'+
    '<p class="wa-risk">Best case, an AI buys back $EZ with its winnings. Worst case, the pool is gone. $EZ is a memecoin. Nothing here is financial advice.</p>'+
    '<p class="wa-cont">Continue? <span>Nobody said it would be EZ.</span></p>';
  main.appendChild(ic);

  ['standings','learn','x2pSt','get'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.add('wa-gone')});
  var hero=document.querySelector('section.hero');if(hero)hero.classList.add('wa-gone');

  /* announcer moments: FIGHT! and the challenger line pop once when they come into view */
  if('IntersectionObserver' in window&&!RM){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('wa-in');io.unobserve(e.target)}})},{threshold:.35});
    document.querySelectorAll('.wa-vs,.wa-chal,.wa-hpw,.wa-tr').forEach(function(e){io.observe(e)})}
  else document.querySelectorAll('.wa-vs,.wa-chal,.wa-hpw,.wa-tr').forEach(function(e){e.classList.add('wa-in')});
  ROOT.classList.add('wa-ok');
}
var tries=0;(function wait(){if(window.ROUNDS&&window.__x2pPnl&&window.MODELS&&document.querySelector('main.wrap')&&document.querySelector('.x2p-vt')&&document.querySelector('.brand .mark')){try{build()}catch(e){console.error('arcade',e);window.__waErr=e}}else if(tries++<400)setTimeout(wait,50)})();
})();
