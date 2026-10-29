/* EZ world: the exhibition. Runs on the real X2+ page at DOMContentLoaded (see run.js); waits for the page to build,
   then turns the Overview into a show you walk through: entrance wall, four rooms, a gift shop. Every fact from the page's data. */
(function(){
var D=document,H=D.documentElement;
function go(){
  if(H.classList.contains('x2p-cur')||!window.__x2pPnl||!D.querySelector('#car .card.cur')){return setTimeout(go,200)}
  try{build()}catch(e){console.error(e)}
}
(function(){var l=D.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&family=IBM+Plex+Mono:wght@400;500&display=swap';D.head.appendChild(l)})();
setTimeout(go,300);

var NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'},
    LAB={GPT:'OpenAI · United States',KIMI:'Moonshot AI · China',CLAUDE:'Anthropic · United States',GROK:'xAI · United States'},
    MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
function md(s){if(!s)return null;var p=s.split('/');return {m:+p[0],d:+p[1],y:2000+(+p[2]%100)}}
function day(s){var t=md(s);return t?MON[t.m-1]+' '+t.d:''}
function usd(v){var a=Math.round(Math.abs(v)).toLocaleString('en-US');return (v<0?'−$':'$')+a}
function sgn(v){var a=Math.round(Math.abs(v)).toLocaleString('en-US');return (v<0?'−$':'+$')+a}
function pc(v){return (Math.round(Math.abs(v)*100)/100).toString()+'%'}
function and(a){return a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1]}
function el(t,c,h){var e=D.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e}
function logo(m,sz){var M=MODELS[m];if(!M)return '';return '<svg class="we-lg" viewBox="0 0 24 24" width="'+(sz||24)+'" height="'+(sz||24)+'" aria-hidden="true"><path fill="'+(m==='GROK'?'#141217':M.c)+'" fill-rule="'+(M.fr||'nonzero')+'" d="'+M.d+'"/></svg>'}
function coLogo(t){var c=window.CO_LOGOS&&CO_LOGOS[t];return c?'<img class="we-co" src="media/'+c.f+'" alt="" loading="lazy">':'<span class="we-co we-co0">'+(t||'').slice(0,4)+'</span>'}
/* New York: today's date and the 4pm close of a given day */
function nyParts(dt){var f=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',hour12:false}).formatToParts(dt),o={};f.forEach(function(p){o[p.type]=+p.value});return o}
function nyClose(y,m,d){var g=Date.UTC(y,m-1,d,20),h=nyParts(new Date(g)).hour%24;return new Date(g+(16-h)*3600e3)}
function binomTail(n,k){var p=0,c=1;for(var i=0;i<=n;i++){if(i>0)c=c*(n-i+1)/i;if(i>=k)p+=c}return p/Math.pow(2,n)}

function build(){
  var P=__x2pPnl(),A=P.A,G=ROUNDS.filter(function(r){return typeof r.a==='number'&&!isNaN(r.a)}),N=G.length,
      MK=Object.keys(A).sort(function(a,b){return A[b].pnl-A[a].pnl}),lead=MK[0],
      first=day(G[0].called),PS=SIM.poolShare!=null?Math.round(SIM.poolShare*100):69,
      nv=UPCOMING.filter(function(u){return u.ticker==='NVDA'})[0];
  var main=D.querySelector('main#top');
  var lg=(D.querySelector('.brand .mark svg')||{}).outerHTML||'';
  var W=el('div','we-show');W.id='weShow';

  /* ---------- entrance wall ---------- */
  var en=el('section','we-room we-en');en.id='we-r0';en.dataset.room='Entrance';
  en.innerHTML='<div class="we-in">'+
    '<p class="we-kick">Earnings Zeason · Season 1 · Now showing</p>'+
    '<h1 class="we-title"><span>Four AIs</span> <span>vs. the market</span></h1>'+
    '<p class="we-sub">An exhibition in '+N+' rounds, and counting.</p>'+
    '<div class="we-stmt"><p class="we-lab">Curator’s statement</p>'+
    '<p>When a big company reports its earnings, its stock can jump or drop hard. Before each report, four AIs say which way it will go, and how far. The next market close grades them.</p>'+
    '<p>Each one plays a pretend $100,000. The richest makes the real call: a pool of $EZ fees, bet on its pick. <b>Nobody said it would be EZ.</b></p></div>'+
    '<div class="we-film"><p class="we-lab">Orientation film · your guide · 1 min 20</p></div>'+
    '<nav class="we-plan" aria-label="Floor plan"><p class="we-lab">Floor plan</p><ol>'+
      '<li><a href="#" data-to="we-r1"><b>1</b><span>The artists</span><i>Who is winning</i></a></li>'+
      '<li><a href="#" data-to="we-r2"><b>2</b><span>The collection</span><i>Every graded round</i></a></li>'+
      '<li><a href="#" data-to="we-r3"><b>3</b><span>The question</span><i>Smart or lucky?</i></a></li>'+
      '<li><a href="#" data-to="we-r4"><b>4</b><span>Next exhibition</span><i>Tonight, then NVIDIA</i></a></li>'+
    '</ol><a class="we-shop" href="#" data-to="we-r5">Gift shop: Get $EZ →</a></nav>'+
  '</div>';
  var bet=D.querySelector('section.x2o-bet');if(bet){en.querySelector('.we-film').appendChild(bet);bet.classList.add('we-keep')}
  W.appendChild(en);

  function door(n,name,cls){var d=el('div','we-door '+cls,'<span class="we-dn">'+n+'</span><span class="we-dt">'+name+'</span>');d.setAttribute('aria-hidden','true');return d}

  /* ---------- Room 1: the artists ---------- */
  W.appendChild(door('Room 1','The artists','we-d1'));
  var r1=el('section','we-room we-r1');r1.id='we-r1';r1.dataset.room='Room 1 · The artists';
  var rows=MK.map(function(m,i){var t=A[m],n=t.W+t.L,sk=N-n,up=t.pnl>=0,note=[];
    if(i===0)note.push('Holds the call on the pool.');
    if(t.W<t.L)note.push('Wrong more often than right.');
    if(sk>0)note.push('Sat out '+sk+' of '+N+' rounds.');else note.push('Called all '+N+' rounds.');
    return '<li class="we-art'+(i===0?' we-top':'')+'"><div class="we-por">'+logo(m,40)+'</div>'+
      '<div class="we-art-t"><p class="we-rk">No. '+(i+1)+' on the wall</p><h3>'+NM[m]+'</h3><p class="we-ver">'+t.ver+' · '+LAB[m]+'</p>'+
      '<p class="we-bal"><b class="'+(up?'we-up':'we-dn2')+'">'+usd(t.bal)+'</b> <span>'+(up?'up ':'down ')+usd(Math.abs(t.pnl))+'</span></p>'+
      '<p class="we-rec">Right '+t.W+' times, wrong '+t.L+'.</p><p class="we-note">'+note.join(' ')+'</p></div></li>'}).join('');
  r1.innerHTML='<div class="we-in"><header class="we-wall"><p class="we-stop">Stop 1</p><h2>The artists</h2>'+
    '<p class="we-wt">Each AI started on '+first+' with a pretend $100,000. On every call it bets the whole account: up means buy, down means sell. Their accounts today:</p></header>'+
    '<ol class="we-arts">'+rows+'</ol>'+
    '<p class="we-guide"><b>Guide</b> '+NM[lead]+' is on top, so '+NM[lead]+' makes the call when the pool is bet. One bad round can change that.</p></div>';
  W.appendChild(r1);

  /* ---------- Room 2: the collection (the real graded slabs) ---------- */
  W.appendChild(door('Room 2','The collection','we-d2'));
  var r2=el('section','we-room we-r2');r2.id='we-r2';r2.dataset.room='Room 2 · The collection';
  r2.innerHTML='<div class="we-in"><header class="we-wall"><p class="we-stop">Stop 2</p><h2>The collection</h2>'+
    '<p class="we-wt">Every round is a work: a film of the four calls and what the stock did, sealed in a graded case. 10 is near perfect, 1 is a wipeout.</p></header>'+
    '<div class="we-hang"></div><aside class="we-plac" aria-live="polite"></aside>'+
    '<p class="we-guide"><b>Guide</b> Newest first. Swipe to walk back to Round 1. Tap a case to see the calls.</p></div>';
  var rec=D.getElementById('record');if(rec){r2.querySelector('.we-hang').appendChild(rec);rec.classList.add('we-keep')}
  W.appendChild(r2);

  /* ---------- Room 3: the question ---------- */
  W.appendChild(door('Room 3','The question','we-d3'));
  var r3=el('section','we-room we-r3');r3.id='we-r3';r3.dataset.room='Room 3 · The question';
  r3.innerHTML='<div class="we-in"><header class="we-wall"><p class="we-stop">Stop 3</p><h2>Smart, or lucky?</h2>'+
    '<p class="we-wt">Up or down is a coin toss. So toss a coin for every call an AI made, and see if the coin does as well.</p></header>'+
    '<div class="we-ex"><div class="we-pick" role="tablist" aria-label="Pick an AI">'+MK.map(function(m,i){return '<button type="button" role="tab" data-m="'+m+'" aria-selected="'+(i===0)+'">'+logo(m,18)+NM[m]+'</button>'}).join('')+'</div>'+
    '<div class="we-exb"><p class="we-exh"></p><div class="we-row"><span class="we-rl">The AI</span><div class="we-dots we-ai"></div></div>'+
    '<div class="we-row"><span class="we-rl">Your coin</span><div class="we-dots we-coin"></div></div>'+
    '<button type="button" class="we-toss">Toss the coins</button><p class="we-res" aria-live="polite"></p><p class="we-odds"></p></div></div>'+
    '<p class="we-fine">Green: right on direction. Red: wrong. Small samples, so this can still flip.</p></div>';
  W.appendChild(r3);

  /* ---------- Room 4: next exhibition ---------- */
  W.appendChild(door('Room 4','Next exhibition','we-d4'));
  var r4=el('section','we-room we-r4');r4.id='we-r4';r4.dataset.room='Room 4 · Next exhibition';
  var now=new Date(),np=nyParts(now),today=np.month+'/'+np.day,byDay={};
  PENDING.forEach(function(p){var k=p.resolves||'';(byDay[k]=byDay[k]||[]).push(p)});
  var days=Object.keys(byDay).sort(function(a,b){var x=md(a),y=md(b);if(!x)return 1;if(!y)return -1;return (x.m*40+x.d)-(y.m*40+y.d)});
  var crates=days.map(function(k){var t=md(k),lbl=!t?'Date to come':((t.m+'/'+t.d)===today?'Unveiled at today’s close':'Unveiled '+WD[new Date(t.y,t.m-1,t.d).getDay()]+' '+MON[t.m-1]+' '+t.d+', at the close');
    var L=byDay[k].map(function(p){var ups=p.calls.filter(function(c){return c.dir==='UP'}).length,dn=p.calls.length-ups;
      return '<li><span class="we-cl">'+coLogo(p.ticker)+'</span><span class="we-cn"><b>'+p.co+'</b><i>'+
        (ups===p.calls.length?'All '+ups+' say up':dn===p.calls.length?'All '+dn+' say down':ups+' say up, '+dn+' say down')+'</i></span>'+
        '<span class="we-cv">'+p.calls.map(function(c){return '<span title="'+NM[c.m]+'">'+logo(c.m,13)+'<em class="'+(c.dir==='UP'?'we-u':'we-v')+'">'+(c.dir==='UP'?'▲':'▼')+'</em></span>'}).join('')+'</span></li>'}).join('');
    return '<div class="we-crate"><p class="we-lab">'+lbl+'</p><ul>'+L+'</ul></div>'}).join('');
  var before=nv?UPCOMING.filter(function(u){return u.n<nv.n}).length:0,cd='',bt=null;
  if(nv){var t=md(nv.called),dt=new Date(t.y,t.m-1,t.d+1);while(dt.getDay()===0||dt.getDay()===6)dt.setDate(dt.getDate()+1);
    bt=nyClose(dt.getFullYear(),dt.getMonth()+1,dt.getDate());cd=WD[dt.getDay()]+' '+MON[dt.getMonth()]+' '+dt.getDate()}
  r4.innerHTML='<div class="we-in"><header class="we-wall"><p class="we-stop">Stop 4</p><h2>Next exhibition</h2>'+
    '<p class="we-wt">These calls are locked in. The stocks have not answered yet.</p></header>'+
    '<div class="we-next"><div class="we-crates">'+crates+'<p class="we-more">Then '+before+' more rounds before NVIDIA reports on '+day(nv&&nv.called)+'.</p></div>'+
    '<div class="we-poster"><img src="media/ez-gpu2.jpg" alt="An NVIDIA chip" loading="lazy"><div class="we-pt"><p class="we-lab">Opening '+cd+' at the close</p>'+
    '<h3>Bet #1: NVIDIA</h3><p class="we-cd" data-t="'+(bt?+bt:'')+'"></p>'+
    '<ul><li>'+PS+'% of $EZ creator fees fill a pool.</li><li>The AI on top of Room 1 makes the call. We bet the pool on it.</li>'+
    '<li><b class="we-u">Right:</b> the profit buys back $EZ.</li><li><b class="we-v">Wrong:</b> the pool can be wiped out.</li></ul>'+
    '<p class="we-s2">The first of many. Season 2 brings more bets.</p></div></div></div>'+
    '<p class="we-guide"><b>Guide</b> Calls go up before each report. Nobody can change them after.</p></div>';
  W.appendChild(r4);

  /* ---------- gift shop ---------- */
  W.appendChild(door('Exit','Gift shop','we-d5'));
  var r5=el('section','we-room we-r5');r5.id='we-r5';r5.dataset.room='Gift shop';
  var x=(window.CONFIG&&CONFIG.x)||'https://x.com/earningszn';
  r5.innerHTML='<div class="we-in"><header class="we-wall"><p class="we-stop">Exit</p><h2>Gift shop</h2></header>'+
    '<div class="we-shop2"><div class="we-mem"><p class="we-lab">Membership · free</p><h3>New works every weekday.</h3><p>Every call goes up on X before the report, and every result after the close.</p>'+
    '<a class="we-xbtn" href="'+x+'" target="_blank" rel="noopener">Follow @earningszn on X</a></div>'+
    '<div class="we-tok"><p class="we-lab">At the counter</p><h3>$EZ</h3><ol><li><b>Check the address.</b> Not posted yet. It appears here, and only here, at launch. Anyone DMing you one before that is a scammer.</li>'+
    '<li><b>Use this page’s link.</b> Opens at launch.</li></ol></div></div>'+
    '<p class="we-fine">Best case, an AI buys back $EZ with its winnings. Worst case, the most entertaining way to lose money. $EZ is a memecoin. Nothing here is financial advice or a promise of value, return or payout.</p></div>';
  W.appendChild(r5);

  main.insertBefore(W,main.firstChild);

  /* wayfinding: where you are, as you walk */
  var wf=el('nav','we-wf');wf.setAttribute('aria-label','Rooms');
  var RM=[['we-r0','Entrance'],['we-r1','1'],['we-r2','2'],['we-r3','3'],['we-r4','4'],['we-r5','Shop']];
  wf.innerHTML='<span class="we-here"><i></i><b>Entrance</b></span><span class="we-wfl">'+RM.map(function(r){return '<a href="#" data-to="'+r[0]+'">'+r[1]+'</a>'}).join('')+'</span>';
  D.body.appendChild(wf);
  D.addEventListener('click',function(e){var a=e.target.closest('[data-to]');if(!a)return;e.preventDefault();var t=D.getElementById(a.dataset.to);if(t)scrollTo({top:t.getBoundingClientRect().top+scrollY-56,behavior:'smooth'})});
  function here(){var y=innerHeight*.45,cur=RM[0];RM.forEach(function(r){var e=D.getElementById(r[0]);if(e&&e.getBoundingClientRect().top<y)cur=r});
    var e=D.getElementById(cur[0]);wf.querySelector('.we-here b').textContent=e.dataset.room;wf.dataset.r=cur[0];
    wf.querySelectorAll('[data-to]').forEach(function(a){a.classList.toggle('on',a.dataset.to===cur[0])})}
  addEventListener('scroll',here,{passive:true});here();

  /* Room 2 placard: follows the case in front (phone) or the one you point at (desktop wall) */
  var pl=r2.querySelector('.we-plac');
  function placard(card){if(!card)return;var n=+card.dataset.n,r=G.filter(function(g){return g.n===n})[0],h;
    var acc='EZ.S1.'+('00'+n).slice(-3);
    if(r){var up=r.a>0,mv=(up?'rose ':'fell ')+pc(r.a),dirw=function(d){return d==='UP'?'rise':'fall'};
      var C=r.calls.map(function(c){return {m:c[0],d:/^DOWN/.test(c[1])?'DOWN':'UP',g:parseFloat(c[1].replace(/^(UP|DOWN)\s*/,'')),off:+c[2]}}),
          R=C.filter(function(c){return (c.d==='UP')===up}),nn=C.length,word=nn===4?'four':nn===3?'three':nn,
          win=(r.win||'').split(' & ').filter(Boolean),wc=C.filter(function(c){return win.indexOf(c.m)>=0}),s;
      if(!R.length)s='All '+word+' said it would '+dirw(C[0].d)+'. It '+mv+'. Nobody wins this one.';
      else if(R.length===nn)s='All '+word+' called the direction. It '+mv+'.';
      else if(R.length===1)s='Only '+NM[R[0].m]+' said it would '+dirw(R[0].d)+'. It '+mv+'.';
      else s=and(R.map(function(c){return NM[c.m]}))+' said it would '+dirw(R[0].d)+'. It '+mv+'.';
      if(wc.length===1)s+=' '+NM[wc[0].m]+' came closest: '+pc(wc[0].off)+' off.';
      else if(wc.length>1)s+=' '+and(wc.map(function(c){return NM[c.m]}))+' tie for closest, '+pc(wc[0].off)+' off.';
      var best=null;Object.keys(A).forEach(function(m){var q=A[m].per[n];if(q&&(!best||q.v>best.v))best={m:m,v:q.v}});
      var gm=/Grade: (\w+) ([\d.]+) of 10/.exec(card.getAttribute('aria-label')||'');
      h='<p class="we-pn">Round '+n+'<span>'+acc+'</span></p><h3>'+r.co+' <i>('+r.ticker+')</i></h3>'+
        '<p class="we-pm">Animated film, 2026 · graded at the close, '+day(r.resolves)+'</p><p class="we-ps">'+s+'</p>'+
        '<p class="we-pf">'+(gm?'<span><b>'+gm[2]+'</b> '+gm[1]+'</span>':'')+(best&&best.v>0?'<span>Best trade: '+NM[best.m]+' <b class="we-up">'+sgn(best.v)+'</b></span>':'<span>Every trade lost money</span>')+'</p>'}
    else{var p=PENDING.filter(function(q){return q.n===n})[0],u=UPCOMING.filter(function(q){return q.n===n})[0],q=p||u;if(!q)return;
      h='<p class="we-pn">Round '+n+'<span>'+acc+'</span></p><h3>'+q.co+' <i>('+q.ticker+')</i></h3>'+
        (p?'<p class="we-pm">Work in progress · calls locked '+day(p.called)+'</p><p class="we-ps">The four calls are in. The market answers at the close'+(p.resolves?' on '+day(p.resolves):'')+'.</p>'
          :'<p class="we-pm">Not yet made · calls due '+day(u.called)+'</p><p class="we-ps">The AIs call it before '+q.co+' reports.</p>')}
    pl.innerHTML=h}
  var car=D.getElementById('car');
  function cur(){placard(D.querySelector('#car .card.cur'))}
  if(car){new MutationObserver(cur).observe(car,{subtree:true,attributes:true,attributeFilter:['class']});
    car.addEventListener('mouseover',function(e){if(!H.classList.contains('x2p-wall'))return;var c=e.target.closest('.card');if(c)placard(c)})}
  if(H.classList.contains('x2p-wall')){var wl=[].slice.call(D.querySelectorAll('#car .card.x2p-wl'));placard(wl[0]||D.querySelector('#car .card.cur'))}else cur();

  /* Room 3: the coin */
  var ex=r3.querySelector('.we-ex'),sel=lead,tries={};
  function show(m){sel=m;var t=A[m],n=t.W+t.L,p=binomTail(n,t.W),f;
    ex.querySelectorAll('[data-m]').forEach(function(b){b.setAttribute('aria-selected',b.dataset.m===m)});
    ex.querySelector('.we-exh').innerHTML='<b>'+NM[m]+'</b> made '+n+' calls and got the direction right on '+t.W+'.';
    ex.querySelector('.we-ai').innerHTML=t.seq.map(function(s){return '<i class="'+(s==='W'?'w':'l')+'"></i>'}).join('');
    ex.querySelector('.we-coin').innerHTML=t.seq.map(function(){return '<i></i>'}).join('');
    if(p<.5){f=Math.round(1/p);f='A fair coin does this well about <b>1 time in '+f+'</b>.'}else f='A fair coin does at least this well about <b>'+Math.round(p*10)+' times in 10</b>.';
    ex.querySelector('.we-odds').innerHTML=f;var k=tries[m];
    ex.querySelector('.we-res').innerHTML=k?'Your tosses: '+k.n+'. The coin matched or beat '+NM[m]+' '+k.b+' times.':'Tap to toss '+n+' coins, one for each call.'}
  ex.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(b)return show(b.dataset.m);
    if(!e.target.closest('.we-toss'))return;var t=A[sel],n=t.W+t.L,D2=ex.querySelectorAll('.we-coin i'),hit=0,i=0,m=sel;
    D2.forEach(function(d){d.className=''});
    var red=matchMedia('(prefers-reduced-motion: reduce)').matches;
    (function step(){for(var j=0;j<(red?n:3)&&i<n;j++,i++){var w=Math.random()<.5;if(w)hit++;D2[i].className=w?'w':'l'}
      if(i<n)return setTimeout(step,24);var k=tries[m]=tries[m]||{n:0,b:0};k.n++;if(hit>=t.W)k.b++;
      ex.querySelector('.we-res').innerHTML='Your coin: right <b>'+hit+'</b> of '+n+'. '+NM[m]+': '+t.W+'. '+(hit>=t.W?'The coin did as well.':NM[m]+' wins this one.')+' <span>(Tosses so far: '+k.n+', coin matched or beat it '+k.b+'.)</span>'})()});
  show(lead);

  /* countdown */
  var cde=r4.querySelector('.we-cd');function tick(){var t=+cde.dataset.t;if(!t)return;var s=Math.max(0,(t-Date.now())/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),mi=Math.floor(s%3600/60);
    cde.innerHTML='<span><b>'+d+'</b> days</span><span><b>'+h+'</b> hours</span><span><b>'+mi+'</b> minutes</span>'}
  tick();setInterval(tick,30000);

  H.classList.add('we-on');
  window.__weReady=true;
}
})();
