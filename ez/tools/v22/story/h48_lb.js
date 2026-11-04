/* ===== H48 LEADERBOARD (EZ Live X6+ only; replaces x2p_lb.js on this page). The owner, 2026-11-03, on the H47 satire take's scorecard:
   "who to follow on the left, and then... where the next ones come up. The wording is great. And then straight on the right, you have the
   table to back it up... Then where they win, the big score, the big ouch." Its layout and words, drawn in the Saturday-morning look:
   1 Who to follow? (window and ranking; the window's leader with its founder's cel, P&L, W-L and hit rate; the season's golden ticket and
   the freeze; the leader's next trades with "Follow on Hyperliquid"), 2 The table (standings, the P&L or hit-rate chart, companies
   Hyperliquid lists today), 3 Where they win (by sector), 4 The big score, the big ouch (biggest W and L), then the small print once.
   Windows by R11's rule: 24 hours = rounds graded at their own exchange's close in the last 24 hours, no fallback; 7 days = today in New
   York and the six days before. The ranking is the live board's (x2p_lb.js): an AI under half the graded rounds goes after the rest, then
   the window's P&L (or hit rate, from 5 trades). Every figure from ez-data.js through h48_data.js. Mounted into #view each time the
   router draws the tab; a failure is kept in window.__h48LbErr and X2's own board shows again. window.__H48NOW (ms) moves the clock, for
   tests only. ===== */
(function(){
var d=document,H=d.documentElement,W=window;
if(!H.classList.contains("h48"))return;
var SECT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
var XC={KS:['Asia/Seoul',15,30],KQ:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30],MI:['Europe/Rome',17,30],MC:['Europe/Madrid',17,30]};
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],IDF={};
/* each exchange's own close (x2p_lb.js closeAt, the same rule) */
function closeAt(t,mdy){if(!mdy)return null;var z=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],a=String(mdy).split('/').map(Number),Y=2000+(a[2]%100);
  var loc=function(x){var p=(IDF[z[0]]||(IDF[z[0]]=new Intl.DateTimeFormat('en-US',{timeZone:z[0],hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));var g=function(k){return +p.filter(function(q){return q.type===k})[0].value};return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  var want=Date.UTC(Y,a[0]-1,a[1],z[1],z[2]),x=want;for(var i=0;i<3;i++)x+=want-loc(x);return x}
var NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'});
function nyDay(ms){var p=NYF.formatToParts(new Date(ms)),g=function(k){return +p.filter(function(x){return x.type===k})[0].value};return Date.UTC(2000+g('year'),g('month')-1,g('day'))}
function dOf(s){var a=String(s).split('/').map(Number);return Date.UTC(2000+(a[2]%100),a[0]-1,a[1])}
function md(ms){var x=new Date(ms);return MON[x.getUTCMonth()]+' '+x.getUTCDate()}
function wdmd(ms){var x=new Date(ms);return DAY[x.getUTCDay()]+' '+MON[x.getUTCMonth()]+' '+x.getUTCDate()}

function data(){
  var E=H48D,D=E.get(),NOW=W.__H48NOW||Date.now(),today=nyDay(NOW),RS=D.R,N=D.N,MK=E.MK;
  var cl=function(r){return r.__h8.cl!==undefined?r.__h8.cl:(r.__h8.cl=closeAt(r.ticker,r.resolves))};
  var dAgo=function(r){return r.resolves?Math.round((today-dOf(r.resolves))/864e5):1e9};
  var inD1=function(r){var a=dAgo(r);if(a>2||a<-1)return false;var c=cl(r);return c!=null&&c<=NOW&&c>NOW-864e5};
  var inD7=function(r){var a=dAgo(r);return a>=0&&a<=6};
  var lastClose=RS.reduce(function(a,r){var c=cl(r);return c&&c<=NOW&&c>a?c:a},0),lcName=wdmd(nyDay(lastClose||NOW));
  var d1=RS.filter(inD1),d7=RS.filter(inD7),wd=today-6*864e5;
  var WIN={season:{k:'season',t:'Season',w:'season',lab:'Season P&L',when:'Since '+md(dOf(RS[0].called||RS[0].resolves))+' · '+RS.length+' rounds',rs:RS},
    d7:{k:'d7',t:'7 days',w:'7 days',lab:'7-day P&L',when:md(wd)+' to '+md(today)+' · '+d7.length+' round'+(d7.length===1?'':'s'),rs:d7},
    d1:{k:'d1',t:'24 hours',w:'24h',lab:'24h P&L',when:d1.length?d1.length+' round'+(d1.length===1?'':'s')+' at the '+md(dOf(d1[d1.length-1].resolves))+' close':'No round graded in the last 24 hours · last close '+lcName,rs:d1}};
  var tr=function(r,m){return r.__h8.tr.filter(function(t){return t.m===m})[0]};
  var win={};Object.keys(WIN).forEach(function(k){win[k]={};MK.forEach(function(m){var p=0,wn=0,l=0;WIN[k].rs.forEach(function(r){var x=tr(r,m);if(!x)return;p+=x.v;if(x.v>0)wn++;else l++});win[k][m]={pnl:p,W:wn,L:l,n:wn+l,hit:wn+l>=5?wn/(wn+l):null}})});
  /* the last close: every round graded on the newest grading day */
  var lcDay=RS.reduce(function(a,r){var t=r.resolves?dOf(r.resolves):0;return t>a?t:a},0),lcRs=RS.filter(function(r){return r.resolves&&dOf(r.resolves)===lcDay});
  var lc={};MK.forEach(function(m){var p=0,k=0;lcRs.forEach(function(r){var x=tr(r,m);if(x){p+=x.v;k++}});lc[m]={pnl:p,n:k}});
  var per={};MK.forEach(function(m){var P={m:m,seq:[],best:null,worst:null,sect:{}};RS.forEach(function(r){var x=tr(r,m);if(!x)return;var t={r:r,v:x.v,w:x.w};P.seq.push(t);
      if(!P.best||x.v>P.best.v)P.best=t;if(!P.worst||x.v<P.worst.v)P.worst=t;var s=SECT[r.__h8.sector]||r.__h8.sector;if(s){var q=P.sect[s]||(P.sect[s]={w:0,n:0});q.n++;if(x.w)q.w++}});
    P.last5=P.seq.slice(-5);per[m]=P});
  var rank=function(wk,key){return MK.slice().sort(function(x,y){var qa=D.season[x].n>=N/2,qb=D.season[y].n>=N/2;if(qa!==qb)return qa?-1:1;
    var a=win[wk][x],b=win[wk][y];if(key==='hit'){var ha=a.hit==null?-1:a.hit,hb=b.hit==null?-1:b.hit;if(hb!==ha)return hb-ha;return b.pnl-a.pnl}
    if(b.pnl!==a.pnl)return b.pnl-a.pnl;return D.season[y].pl-D.season[x].pl})};
  /* the same stock is the biggest L for the most models */
  var wc={};MK.forEach(function(m){var w=per[m].worst;if(w)(wc[w.r.n]=wc[w.r.n]||[]).push(m)});
  var shared=Object.keys(wc).map(function(n){return {n:+n,ms:wc[n]}}).sort(function(a,b){return b.ms.length-a.ms.length})[0];
  /* P&L on the companies Hyperliquid lists today */
  var hp={},nL=0;MK.forEach(function(m){hp[m]={pnl:0,W:0,L:0}});RS.forEach(function(r){if(!E.hlMarket(r.ticker))return;nL++;MK.forEach(function(m){var x=tr(r,m);if(!x)return;hp[m].pnl+=x.v;if(x.v>0)hp[m].W++;else hp[m].L++})});
  /* next: rounds with trades in that have not closed yet, then the ones whose trades are still to come (not a date gone by) */
  var nxt=D.next.filter(function(u){if(u.in){var c=u.resolves?closeAt(u.ticker,(u.resolves[1]+1)+'/'+u.resolves[2]+'/'+(u.resolves[0]%100)):null;return !c||c>NOW}return !u.called||Date.UTC(u.called[0],u.called[1],u.called[2])>=today});
  var secs=[];Object.keys(SECT).forEach(function(k){var s=SECT[k];if(MK.some(function(m){return per[m].sect[s]}))secs.push(s)});
  var lastR=RS.reduce(function(a,r){if(!a)return r;var ca=cl(a)||0,cr=cl(r)||0;return cr>ca||(cr===ca&&r.n>a.n)?r:a},null);
  return {E:E,D:D,NOW:NOW,today:today,RS:RS,N:N,MK:MK,lastR:lastR,WIN:WIN,win:win,lc:lc,lcRs:lcRs,lcDay:lcDay,per:per,rank:rank,shared:shared,hp:hp,nL:nL,nxt:nxt,secs:secs,tr:tr}}

var st={win:'season',rank:'pnl'},X=null,lastW=0;
function esc(s){return H48UI.esc(s)}
function build(root){
  var V=build.__noV?'':lbV();if(V)return buildV(root,V);
  var E=X.E,D=X.D,U=H48UI,NM=E.NAME,MK=X.MK,P=X.per;
  var Wn=X.WIN[st.win],w=X.win[st.win],ord=X.rank(st.win,st.rank),m=ord[0],x=w[m],has=Wn.rs.length>0,wl=Wn.w;
  var gold=D.ord[0],B=D.BET,frz=B&&W.SIM&&SIM.leadHours!=null?B-SIM.leadHours*36e5:null;
  var nyF=function(t,o){return new Date(t).toLocaleString('en-US',Object.assign({timeZone:'America/New_York'},o))};
  var pc1=function(v){return v==null?'–':(v*100).toFixed(1)+'%'};
  var opt=function(g,k,t){return '<button type="button" class="h8-sw" data-g="'+g+'" data-k="'+k+'" aria-pressed="'+(st[g]===k)+'">'+t+'</button>'};
  var h='';
  /* ---------- 1. who to follow ---------- */
  h+='<div class="h8-spread"><section class="h8-page h8-p1 h8-g" aria-labelledby="h8lbh1"><p class="h8-act">The scorecard</p><h2 class="h8-let" id="h8lbh1" data-h8let="71" data-h8amp=".7">Who to follow?</h2>'+
   '<div class="h8-ctl"><div class="h8-cg" role="group" aria-label="Window"><span class="h8-lbl">Window</span>'+opt('win','season','Season')+opt('win','d7','7 days')+opt('win','d1','24 hours')+'</div>'+
   '<div class="h8-cg" role="group" aria-label="Rank by"><span class="h8-lbl">Rank by</span>'+opt('rank','pnl','P&amp;L')+opt('rank','hit','Hit rate')+'</div><p class="h8-wn">'+esc(Wn.t+': '+Wn.when)+'</p></div>';
  if(has)h+='<div class="h8-who"><div class="h8-por"><img src="'+U.CAST[m]+'" alt="'+NM[m]+', drawn as a cartoon of its lab&rsquo;s founder" decoding="async"></div><div class="h8-wf h8-pl">'+
     '<div class="h8-nm">'+U.badge(m,30)+'<b>'+NM[m]+'</b></div>'+
     '<div class="h8-ln"><span class="h8-num h8-big '+(x.pnl>=0?'h8-pos':'h8-neg')+'">'+E.money(x.pnl)+'</span><span class="h8-lbl">'+esc(Wn.lab)+', $100K a trade</span></div>'+
     '<div class="h8-ln"><span class="h8-num">'+x.W+'-'+x.L+'</span><span class="h8-lbl">W-L, '+wl+'</span></div>'+
     '<div class="h8-ln"><span class="h8-num">'+pc1(x.hit)+'</span><span class="h8-lbl">Hit rate, '+wl+(x.hit==null?' (from 5 trades)':' on '+x.n+' trades')+'</span></div></div></div>';
  else h+='<p class="h8-empty h8-pl"><b>Nothing to rank in this window</b>See Season or 7 days.</p>';
  h+='<div class="h8-gt2" role="group" aria-label="The golden ticket this season: '+NM[gold]+', top season P&L '+E.money(D.season[gold].pl)+'"><div class="h8-gtstub" aria-hidden="true"><span>Golden ticket</span></div>'+
     '<div class="h8-gm" aria-hidden="true"><span class="h8-gk">The golden ticket · season</span><span class="h8-gn">'+U.badge(gold,30)+'<b>'+NM[gold]+'</b></span><span class="h8-gs">Top season P&amp;L: '+E.money(D.season[gold].pl)+'</span></div></div>'+
   (frz?'<p class="h8-frz">The board freezes '+esc(nyF(frz,{weekday:'short',month:'short',day:'numeric'}))+', '+esc(nyF(frz,{hour:'numeric',minute:'2-digit'}).replace(':00',''))+' New York, 24 hours before the bet. The top model&rsquo;s trade is the bet.</p>':'');
  var lead=has?m:gold,rows=X.nxt.filter(function(u){return u.in}).concat(X.nxt.filter(function(u){return !u.in&&E.hlMarket(u.ticker)}),X.nxt.filter(function(u){return !u.in&&!E.hlMarket(u.ticker)})).slice(0,W.matchMedia('(min-width:1000px)').matches?3:4);
  h+='<p class="h8-grp">'+NM[lead]+'&rsquo;s next trades</p><div class="h8-nts">'+rows.map(function(u){var t=u.in?u.tr.filter(function(q){return q.m===lead})[0]:null,mk=E.hlMarket(u.ticker);
     var ln=u.in?u.tr.filter(function(q){return q.up}).length:0,sn=u.in?u.tr.length-ln:0;
     var when=u.resolves?'at the close '+E.fmtDay(u.resolves,true):(u.called?'trades due '+E.fmtDay(u.called):'date to come');
     return '<article class="h8-nr h8-pl">'+U.co(u.ticker,36)+'<div><span class="h8-nm2">'+esc(E.coLabel(u.ticker))+'</span><span class="h8-nxgd">Round '+u.n+' · '+esc(when)+'</span></div>'+
      (t?'<span class="h8-stp '+(t.up?'h8-long':'h8-short')+'">'+U.badge(lead,20)+U.size(t)+'</span>':(u.in?'<span class="h8-stp h8-tbd">No trade from '+NM[lead]+'</span>':'<span class="h8-stp h8-tbd">Trades drop before the earnings</span>'))+
      (u.in&&u.tr.length>1?'<div class="h8-spl"><span class="h8-lbl">All '+u.tr.length+'</span>'+ln+' long, '+sn+' short</div>':'')+
      (mk?'<div class="h8-hl" data-h8hl="'+esc(u.ticker)+'">'+(t?'<a class="h8-btn h8-hlb" href="'+esc(mk.url)+'" target="_blank" rel="noopener">Follow on Hyperliquid</a>':'')+'<span class="h8-mkl"><b>'+esc(mk.name)+'</b> · $'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')+'</span></div>'
        :'')+'</article>'}).join('')+'</div></section>';   /* never "No Hyperliquid market" (owner, 2026-11-04) */

  /* ---------- 2. the table ---------- */
  var lcS=md(X.lcDay),wcap=st.win==='season'?'season':Wn.w;
  h+='<section class="h8-page h8-p2 h8-g" aria-labelledby="h8lbh2"><p class="h8-act">Ranked by '+(st.rank==='pnl'?'P&amp;L':'hit rate')+' · '+esc(Wn.t.toLowerCase())+'</p><h2 class="h8-let" id="h8lbh2" data-h8let="72" data-h8amp=".7">The table</h2>'+
   '<div class="h8-tbl" role="table" aria-label="Standings, '+esc(Wn.t)+'"><div class="h8-th h8-pl h8-t" role="row"><span class="h8-a1" role="columnheader">#</span><span class="h8-a2 h8-tm" role="columnheader">Model</span><span class="h8-a3" role="columnheader">P&amp;L · '+esc(wcap)+'</span>'+
   '<span class="h8-a4" role="columnheader">Last 5 · old → new</span><span class="h8-a5" role="columnheader">W-L · '+esc(wcap)+'</span><span class="h8-a6" role="columnheader">Hit · '+esc(wcap)+'</span><span class="h8-a7" role="columnheader">'+esc(lcS)+' close</span></div>'+
   ord.map(function(q,k){var y=w[q],l5=P[q].last5;return '<div class="h8-trw h8-pl'+(k===0?' h8-gold':'')+'" role="row"><div class="h8-tr"><span class="h8-tp" role="cell">'+(k+1)+'</span>'+
     '<span class="h8-tm" role="cell">'+U.badge(q,24)+'<b>'+NM[q]+'</b>'+U.flag(q,22)+'</span>'+
     '<span class="h8-tv h8-num '+(y.n?(y.pnl>=0?'h8-pos':'h8-neg'):'h8-dash')+'" role="cell">'+(y.n?E.money(y.pnl):'–')+'</span>'+
     '<span class="h8-tl5" role="cell"><span class="h8-l5" role="img" aria-label="Last 5, oldest to newest: '+esc(l5.map(function(t){return (t.w?'W':'L')+' on '+E.coName(t.r.ticker)}).join(', '))+'">'+l5.map(function(t,i){return '<i class="'+(t.w?'h8-mw':'h8-ml')+(i===l5.length-1?' h8-new':'')+'">'+(t.w?'W':'L')+'</i>'}).join('')+'</span></span>'+
     '<span class="h8-twl h8-num" role="cell">'+(y.n?y.W+'-'+y.L:'–')+'</span><span class="h8-th2 h8-num" role="cell">'+pc1(y.hit)+'</span>'+
     '<span class="h8-tc h8-num '+(X.lc[q].n?(X.lc[q].pnl>=0?'h8-pos':'h8-neg'):'h8-dash')+'" role="cell">'+(X.lc[q].n?E.money(X.lc[q].pnl):'–')+'</span></div></div>'}).join('')+'</div>'+
   '<p class="h8-cap2">'+esc(lcS)+' close = the '+X.lcRs.length+' round'+(X.lcRs.length===1?'':'s')+' graded at the '+esc(wdmd(X.lcDay))+' close. Hit rate from 5 trades.</p>'+
   '<div class="h8-chw"><h3 class="h8-let" data-h8let="73" data-h8amp=".6">'+(st.rank==='hit'?'Hit rate':'P&amp;L')+' · '+esc(Wn.t)+'</h3><p class="h8-sub2">'+(st.rank==='hit'?'Right on their long or short, round by round. Every line starts at 50%.':'$100K a trade, round by round, from $0.')+'</p>'+
   '<figure class="h8-scene h8-sc" id="h8lbsc"><div class="h8-sf" id="h8lbsf"></div></figure></div>';
  var hord=MK.slice().sort(function(a,b){return X.hp[b].pnl-X.hp[a].pnl});
  h+='<div class="h8-hlt h8-pl"><h3>Only companies Hyperliquid lists today</h3><div class="h8-hg"><span class="h8-lbl">Model · season</span><span class="h8-lbl h8-r">W-L</span><span class="h8-lbl h8-r">P&amp;L</span>'+
   hord.map(function(q){var y=X.hp[q];return '<span>'+U.badge(q,20)+NM[q]+'</span><span class="h8-r h8-num">'+y.W+'-'+y.L+'</span><span class="h8-r h8-num '+(y.pnl>=0?'h8-pos':'h8-neg')+'">'+E.money(y.pnl)+'</span>'}).join('')+'</div>'+
   '<p>'+X.nL+' of '+X.N+' rounds. Listed '+esc(E.hlWhen())+'; most were not on Hyperliquid when the trade was made.</p></div></section></div>';

  /* ---------- 3. where they win ---------- */
  var so=D.ord;
  h+='<div class="h8-spread h8-even"><section class="h8-page h8-p3 h8-g" aria-labelledby="h8lbh3"><p class="h8-act">By sector · season</p><h2 class="h8-let" id="h8lbh3" data-h8let="74" data-h8amp=".7">Where they win</h2>'+
   '<p class="h8-sub">Trades won of trades made. Ringed: the best in the row, 3 trades or more.</p>'+
   '<div class="h8-sct h8-pl" role="table" aria-label="Trades won of trades made, by sector, season"><div class="h8-sx h8-sh" role="row"><span role="columnheader">Sector</span>'+so.map(function(q){return '<span role="columnheader">'+U.badge(q,22)+'</span>'}).join('')+'</div>'+
   X.secs.map(function(s){var v=so.map(function(q){return P[q].sect[s]||{w:0,n:0}}),rt=v.map(function(q){return q.n>=3?q.w/q.n:-1}),bm=Math.max.apply(null,rt),all=rt.every(function(y){return y===bm});
     return '<div class="h8-sx" role="row"><span role="rowheader">'+esc(s)+'</span>'+v.map(function(q,i){var b=!all&&bm>=0&&rt[i]===bm;return '<span role="cell"'+(b?' aria-label="'+q.w+' of '+q.n+', the best in this row"':'')+'>'+(q.n?q.w+'/'+q.n:'–')+(b?U.ring():'')+'</span>'}).join('')+'</div>'}).join('')+'</div></section>';

  /* ---------- 4. the big score, the big ouch ---------- */
  /* owner, 2026-11-04: each card says the AI's own trade and the day, and the round's film plays beside it (the films back in the spotlight) */
  var bx=function(t,k,q){var c=q?X.tr(t.r,q):null,F=(W.FILMS||{})[t.r.n],tl='media/tile-r'+t.r.n+'-'+(F?(F.t||'f1'):'t2')+'.jpg';
    return '<div class="h8-bx h8-pl '+(k==='w'?'h8-bw':'h8-bl')+'"><div class="h8-bxt"><span class="h8-k">'+(k==='w'?'Biggest W':'Biggest L')+'</span><span class="h8-bco">'+U.co(t.r.ticker,22)+esc(E.coLabel(t.r.ticker))+'</span>'+
    '<span class="h8-am h8-num '+(t.v>=0?'h8-pos':'h8-neg')+'">'+E.money(t.v)+'</span>'+
    (c?'<span class="h8-rcall"><b class="'+(c.up?'h8-pos':'h8-neg')+'">'+(c.up?'Long':'Short')+' '+esc(c.size)+'%</b>'+(t.r.resolves?' · '+md(dOf(t.r.resolves)):'')+'</span>':'')+
    '<span class="h8-rr">Round '+t.r.n+' · moved '+E.pct(t.r.a)+'</span></div>'+
    '<a class="h8-bxv" href="#/round/'+t.r.n+'" aria-label="Open round '+t.r.n+', '+esc(E.coLabel(t.r.ticker))+'">'+(F?'<video muted loop playsinline preload="none" poster="'+tl+'" aria-hidden="true"><source src="media/'+F.f+'.mp4" type="video/mp4"></video>':'<img src="'+tl+'" alt="" loading="lazy" decoding="async">')+'</a></div>'};
  var sh=X.shared,gag='';
  if(sh&&sh.ms.length>=2){var r0=X.RS.filter(function(r){return r.n===sh.n})[0],oth=MK.filter(function(q){return sh.ms.indexOf(q)<0&&P[q].best&&P[q].best.r.n===sh.n});
    gag='<p class="h8-gag h8-pl"><b>Same stock, same day.</b> '+esc(E.coLabel(r0.ticker))+', round '+sh.n+', is the biggest L for '+sh.ms.map(function(q){return NM[q]}).join(', ').replace(/, ([^,]*)$/,' and $1')+' ('+E.money(X.tr(r0,sh.ms[0]).v)+' each)'+(oth.length?', and the biggest W for '+oth.map(function(q){return NM[q]}).join(' and ')+' ('+E.money(X.tr(r0,oth[0]).v)+').':'.')+'</p>'}
  h+='<section class="h8-page h8-p4 h8-g" aria-labelledby="h8lbh4"><p class="h8-act">Biggest W and L · season</p><h2 class="h8-let" id="h8lbh4" data-h8let="75" data-h8amp=".7">The big score, the big ouch</h2>'+
   '<div class="h8-wl">'+so.map(function(q){return '<div class="h8-wlr"><span class="h8-who2"><span class="h8-face"><img src="'+U.CAST[q]+'" alt="" loading="lazy" decoding="async"></span><span class="h8-fn">'+NM[q]+'</span></span>'+bx(P[q].best,'w',q)+bx(P[q].worst,'l',q)+'</div>'}).join('')+'</div>'+gag+
   '<p class="h8-small"><span class="h8-plg" aria-hidden="true">'+'<img src="media/ez-mark.svg" alt="" width="28" height="28">'+'</span><span>Simulated record, $100K a trade, before fees. Not financial advice. Trading can lose money; the pool can be wiped out. Hyperliquid is not available in every country. Markets: <span class="h8-asof">'+esc(E.hlAsOf())+'</span>.</span></p></section></div>';
  root.innerHTML=h;U.letterAll(root);
  root.querySelectorAll('.h8-sw').forEach(function(b){b.addEventListener('click',function(){if(st[b.dataset.g]===b.dataset.k)return;st[b.dataset.g]=b.dataset.k;var y=b.getBoundingClientRect().top;build(root);
    var nb=root.querySelector('.h8-sw[data-g="'+b.dataset.g+'"][data-k="'+b.dataset.k+'"]');if(nb){scrollBy(0,nb.getBoundingClientRect().top-y);nb.focus({preventScroll:true})}})});
  XH=0;chart(root,true);balance(root)}
/* ---------- H49c mockup takes (owner, 2026-11-04: "remove the scorecard and who to follow... you already have that section in the
   overview... the page to start at rank by PNL season, the table... the filters at the right spot... how we have in the EZ Live X2 Plus...
   you just have leaderboard. And then... season one, 84 rounds graded. And then rank by PNL, hit rate, and then season, 7 days, 24 hours").
   Off unless window.__h48LbV or ?lb= is set; the live board is unchanged. A = X2+'s board in the show (one title, the Season 1 plate, the
   filters right above the table, the table's columns follow Rank by, the chart beside it on desktop); B = the same top over today's full
   table; C = A with the filters pinned while the board is on screen. ---------- */
function lbV(){if(W.__h48LbV)return String(W.__h48LbV).toUpperCase();var q=/[?&]lb=([abcABC0])/.exec(location.search);return q?(q[1]==='0'?'':q[1].toUpperCase()):'A'}/* (launch day, owner: "the leaderboard... shouldn't have the who to follow") take A is the default; ?lb=0 the old scorecard */
function wlVids(root){var vs=root.querySelectorAll('.h8-bxv video');if(!vs.length||!W.IntersectionObserver)return;
  var still=W.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches,sd=navigator.connection&&navigator.connection.saveData;if(still||sd)return;
  var io=new IntersectionObserver(function(es){es.forEach(function(e){var v=e.target;if(e.isIntersecting){var p=v.play();if(p&&p.catch)p.catch(function(){})}else v.pause()})},{threshold:.6});
  [].forEach.call(vs,function(v){io.observe(v)})}
function buildV(root,V){
  var E=X.E,D=X.D,U=H48UI,NM=E.NAME,MK=X.MK,P=X.per;
  var Wn=X.WIN[st.win],w=X.win[st.win],ord=X.rank(st.win,st.rank),hit=st.rank==='hit',wcap=st.win==='season'?'season':Wn.w;
  var pc1=function(v){return v==null?'–':(v*100).toFixed(1)+'%'};
  var opt=function(g,k,t){return '<button type="button" class="h8-sw" data-g="'+g+'" data-k="'+k+'" aria-pressed="'+(st[g]===k)+'">'+t+'</button>'};
  var mon=function(v,n){return n?'<span class="h8-num '+(v>=0?'h8-pos':'h8-neg')+'">'+E.money(v)+'</span>':'<span class="h8-num h8-dash">–</span>'};
  var l5=function(q){var a=P[q].last5;return '<span class="h8-l5" role="img" aria-label="Last 5, oldest to newest: '+esc(a.map(function(t){return (t.w?'W':'L')+' on '+E.coName(t.r.ticker)}).join(', '))+'">'+a.map(function(t,i){return '<i class="'+(t.w?'h8-mw':'h8-ml')+(i===a.length-1?' h8-new':'')+'">'+(t.w?'W':'L')+'</i>'}).join('')+'</span>'};
  /* owner, 2026-11-04 ("is there anything we can fill it with that is interesting data... compute out of the sheet"): the streak now, the
     side it leans to and the trades within 1% of the move, all from the sheet */
  var xs=function(q){var tt=[];Wn.rs.forEach(function(r){var x=X.tr(r,q);if(x)tt.push({r:r,x:x})});var n=tt.length,sh=tt.filter(function(t){return !t.x.up}).length,
      w1=tt.filter(function(t){return t.x.w&&Math.abs((t.x.up?1:-1)*parseFloat(t.x.size)-t.r.a)<=1}).length,sq=P[q].seq,lt=sq[sq.length-1],k=0,i;
    for(i=sq.length-1;i>=0&&lt&&sq[i].w===lt.w;i--)k++;
    var cell=function(v,l,c){return '<span class="h8-xs"><b class="h8-num'+(c?' '+c:'')+'">'+v+'</b><small>'+l+'</small></span>'};
    /* owner, 2026-11-04: the streak on top, the lean under it; "within 1%" off (too much) */
    /* owner, 2026-11-04: the streak goes too (Last 5 already says it): the bias alone */
    return cell(n?Math.round(Math.max(sh,n-sh)/n*100)+'%':'–',n?(sh>=n-sh?'short':'long'):'bias')};
  var lr=X.lastR,h='';
  h+='<section class="h8-page h8-p2 h8-g h8-lbv h8-v'+V+'" aria-labelledby="h8lbh1"><h1 class="h8-let h8-lbtt" id="h8lbh1" data-h8let="71" data-h8amp=".7">Leaderboard</h1>'+
   '<p class="h8-lbcap h8-pl h8-t"><b>Season 1</b><span> · '+X.N+' rounds graded · $100K on every trade</span></p>'+
   '<div class="h8-bar"><div class="h8-cg" role="group" aria-label="Rank by"><span class="h8-lbl">Rank by</span>'+opt('rank','pnl','P&amp;L')+opt('rank','hit','Hit rate')+'</div>'+
   '<div class="h8-cg" role="group" aria-label="Window">'+opt('win','season','Season')+opt('win','d7','7 days')+opt('win','d1','24 hours')+'</div>'+
   '<p class="h8-wn">'+esc(Wn.t+': '+(st.win==='season'?Wn.when.replace(/ · \d+ rounds?$/,''):Wn.when))+'</p></div><div class="h8-brd"><div class="h8-bt">';
  if(V==='B'){var lcS=md(X.lcDay);
    h+='<div class="h8-tbl" role="table" aria-label="Standings, '+esc(Wn.t)+'"><div class="h8-th h8-pl h8-t" role="row"><span class="h8-a1" role="columnheader">#</span><span class="h8-a2 h8-tm" role="columnheader">Model</span><span class="h8-a3" role="columnheader">P&amp;L · '+esc(wcap)+'</span>'+
     '<span class="h8-a4" role="columnheader">Last 5 · old → new</span><span class="h8-a5" role="columnheader">W-L · '+esc(wcap)+'</span><span class="h8-a6" role="columnheader">Hit · '+esc(wcap)+'</span><span class="h8-a7" role="columnheader">'+esc(lcS)+' close</span></div>'+
     ord.map(function(q,k){var y=w[q];return '<div class="h8-trw h8-pl'+(k===0?' h8-gold':'')+'" role="row"><div class="h8-tr"><span class="h8-tp" role="cell">'+(k+1)+'</span>'+
       '<span class="h8-tm" role="cell">'+U.badge(q,24)+'<b>'+NM[q]+'</b>'+U.flag(q,22)+'</span>'+
       '<span class="h8-tv h8-num '+(y.n?(y.pnl>=0?'h8-pos':'h8-neg'):'h8-dash')+'" role="cell">'+(y.n?E.money(y.pnl):'–')+'</span>'+
       '<span class="h8-tl5" role="cell">'+l5(q)+'</span><span class="h8-twl h8-num" role="cell">'+(y.n?y.W+'-'+y.L:'–')+'</span><span class="h8-th2 h8-num" role="cell">'+pc1(y.hit)+'</span>'+
       '<span class="h8-tc h8-num '+(X.lc[q].n?(X.lc[q].pnl>=0?'h8-pos':'h8-neg'):'h8-dash')+'" role="cell">'+(X.lc[q].n?E.money(X.lc[q].pnl):'–')+'</span></div></div>'}).join('')+'</div>'+
     '<p class="h8-cap2">'+esc(lcS)+' close = the '+X.lcRs.length+' round'+(X.lcRs.length===1?'':'s')+' graded at the '+esc(wdmd(X.lcDay))+' close. Hit rate from 5 trades.</p>'}
  else{
    h+='<div class="h8-vt" role="table" aria-label="Standings, ranked by '+(hit?'hit rate':'P&amp;L')+', '+esc(Wn.t)+'"><div class="h8-vh" role="row"><span class="h8-vp" role="columnheader">#</span><span class="h8-vm" role="columnheader">Model</span>'+
     '<span class="h8-vx" role="columnheader">Bias · '+esc(wcap)+'</span><span class="h8-vl" role="columnheader">Last 5</span><span class="h8-vs" role="columnheader">'+(hit?'W-L · '+esc(wcap):'Last round')+'</span><span class="h8-vv" role="columnheader">'+(hit?'Hit rate · ':'P&amp;L · ')+esc(wcap)+'</span></div>'+
     ord.map(function(q,k){var y=w[q],t=lr?X.tr(lr,q):null;
       return '<div class="h8-trw h8-pl h8-vr'+(k===0?' h8-gold':'')+'" role="row"><span class="h8-vp" role="cell">'+(k+1)+'</span><span class="h8-vm" role="cell">'+U.badge(q,24)+'<b>'+NM[q]+'</b>'+U.flag(q,20)+'</span>'+
        '<span class="h8-vx" role="cell">'+xs(q)+'</span><span class="h8-vl" role="cell">'+l5(q)+'</span>'+
        '<span class="h8-vs" role="cell">'+(hit?'<span class="h8-num'+(y.n?'':' h8-dash')+'">'+(y.n?y.W+'-'+y.L:'–')+'</span>':mon(t?t.v:0,!!t))+'</span>'+
        '<span class="h8-vv" role="cell">'+(hit?'<span class="h8-num'+(y.hit==null?' h8-dash':'')+'">'+pc1(y.hit)+'</span>':mon(y.pnl,y.n))+'</span></div>'}).join('')+'</div>'+
     '<p class="h8-cap2">'+(hit?'W-L and hit rate in this window. Hit rate from 5 trades.':(lr?'Last round = '+esc(E.coLabel(lr.ticker))+', round '+lr.n+', graded at the '+esc(wdmd(dOf(lr.resolves)))+' close.':''))+'</p>'}
  h+='</div><div class="h8-bc"><div class="h8-chw"><p class="h8-grp">'+(hit?'Hit rate':'P&amp;L')+' · '+esc(Wn.t)+'</p><p class="h8-sub2">'+(hit?'Right on their long or short, round by round. Every line starts at 50%.':'$100K a trade, round by round, from $0.')+'</p>'+
   '<figure class="h8-scene h8-sc" id="h8lbsc"><div class="h8-sf" id="h8lbsf"></div></figure></div>';
  if(V==='B'){var hord=MK.slice().sort(function(a,b){return X.hp[b].pnl-X.hp[a].pnl});
    h+='<div class="h8-hlt h8-pl"><h3>Only companies Hyperliquid lists today</h3><div class="h8-hg"><span class="h8-lbl">Model · season</span><span class="h8-lbl h8-r">W-L</span><span class="h8-lbl h8-r">P&amp;L</span>'+
     hord.map(function(q){var y=X.hp[q];return '<span>'+U.badge(q,20)+NM[q]+'</span><span class="h8-r h8-num">'+y.W+'-'+y.L+'</span><span class="h8-r h8-num '+(y.pnl>=0?'h8-pos':'h8-neg')+'">'+E.money(y.pnl)+'</span>'}).join('')+'</div>'+
     '<p>'+X.nL+' of '+X.N+' rounds. Listed '+esc(E.hlWhen())+'; most were not on Hyperliquid when the trade was made.</p></div>'}
  h+='</div></div></section>';
  var keep=d.createElement('div');build.__noV=1;try{build0(keep)}finally{build.__noV=0}
  var tail=keep.querySelectorAll(':scope>.h8-spread')[1];
  root.innerHTML=h;U.letterAll(root);if(tail)root.appendChild(tail);wlVids(root);
  root.querySelectorAll('.h8-sw').forEach(function(b){b.addEventListener('click',function(){if(st[b.dataset.g]===b.dataset.k)return;st[b.dataset.g]=b.dataset.k;var y=b.getBoundingClientRect().top;build(root);
    var nb=root.querySelector('.h8-sw[data-g="'+b.dataset.g+'"][data-k="'+b.dataset.k+'"]');if(nb){scrollBy(0,nb.getBoundingClientRect().top-y);nb.focus({preventScroll:true})}})});
  /* the filters stay under the header on phones (owner, 2026-11-04), so they need its height */
  var hd=d.querySelector('header.top');root.style.setProperty('--h8hdr',(hd&&getComputedStyle(hd).position==='sticky'?hd.offsetHeight:0)+'px');
  XH=0;chart(root,true);balance(root)}
/* desktop: the two pages of a spread end level. The table's page gives its spare height to the chart (the board painted taller, at most a
   third more); the sector page gives its spare to the rows' padding. Measured, not guessed: the empty run under each page's last block. */
function used(p){var b=0;[].forEach.call(p.children,function(k){b=Math.max(b,k.getBoundingClientRect().bottom)});return b-p.getBoundingClientRect().top+parseFloat(getComputedStyle(p).paddingBottom)}
function balance(root){var desk=W.matchMedia('(min-width:1000px)').matches,sct=root.querySelector('.h8-sct');if(sct)sct.style.removeProperty('--h8sxp');
  if(!desk){if(XH){XH=0;chart(root,false)}return}
  /* the chart exactly as tall as the table's own height (measured unstretched), taller or shorter */
  var bt=root.querySelector('.h8-lbv .h8-bt'),cw=root.querySelector('.h8-lbv .h8-bc .h8-chw');
  if(bt&&cw){bt.style.alignSelf='start';var nat=bt.offsetHeight;bt.style.alignSelf='';var dd=nat-cw.offsetHeight;if(Math.abs(dd)>2){XH=XH+dd;chart(root,false)}return}
  var p1=root.querySelector('.h8-p1'),p2=root.querySelector('.h8-p2'),p3=root.querySelector('.h8-p3'),p4=root.querySelector('.h8-p4');
  var sc=root.querySelector('#h8lbsc'),dh=p1&&p2?used(p1)-used(p2):0;if(sc&&dh>2){XH=Math.min(dh,sc.offsetHeight*.34);chart(root,true)}
  var d2=used(p4)-used(p3),rs=root.querySelectorAll('.h8-sx:not(.h8-sh)').length;if(sct&&d2>2&&rs)sct.style.setProperty('--h8sxp',(9+d2/rs/2).toFixed(2)+'px')}
function build0(r){var o=r.innerHTML;build(r)}
var XH=0;
function chart(root,anim){var sc=root.querySelector('#h8lbsc'),sf=root.querySelector('#h8lbsf');if(!sc||!sc.clientWidth)return;var U=H48UI,E=X.E,Wn=X.WIN[st.win],hit=st.rank==='hit';
  U.fit(sc,sf,U.BOX.sc,.92,XH);var ends={};E.MK.forEach(function(m){var y=X.win[st.win][m];ends[m]=y.n?(hit?(y.hit==null?(y.W+' of '+y.n):(y.hit*100).toFixed(1)+'%'):E.kmoney(y.pnl)):'–'});
  U.chart(sf,'sc',{money:!hit,rs:Wn.rs,ends:ends,anim:anim,key:'lb-'+st.win+st.rank,empty:Wn.when,aria:(hit?'Hit rate':'P&L')+' round by round, '+Wn.t})}

/* ---------- mount: every time the router draws the tab ---------- */
var timer=0;
function mount(){timer=0;var v=d.getElementById('view');if(!v||H.getAttribute('data-sec')!=='leaderboard'||v.hidden)return;if(v.querySelector(':scope>#h48lb'))return;
  if(!(W.H48D&&W.H48UI&&W.ROUNDS&&ROUNDS.length))return again();
  try{X=data();var root=d.createElement('div');root.id='h48lb';root.className='h8r';v.appendChild(root);build(root);lastW=innerWidth;W.__h48Lb=X}catch(e){W.__h48LbErr=e;H.classList.add('h48-lbx');try{console.error('h48lb',e)}catch(z){}var o=d.getElementById('h48lb');if(o)o.remove()}}
function again(){if(!timer&&!W.__h48LbErr)timer=setTimeout(mount,40)}
function watch(){var v=d.getElementById('view');if(!v)return setTimeout(watch,100);
  new MutationObserver(function(){if(!W.__h48LbErr&&H.getAttribute('data-sec')==='leaderboard'&&!v.querySelector(':scope>#h48lb'))again()}).observe(v,{childList:true});
  new MutationObserver(again).observe(H,{attributes:true,attributeFilter:['data-sec']});mount()}
watch();
addEventListener('resize',function(){if(innerWidth===lastW)return;lastW=innerWidth;var r=d.getElementById('h48lb');if(r&&X)build(r)});
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){var r=d.getElementById('h48lb');if(r&&X){XH=0;chart(r,false);balance(r)}});
if(W.H48D)H48D.onHL(function(){var r=d.getElementById('h48lb');if(r&&X)build(r)});
})();
