/* ===== H48b UPCOMING (EZ Live X6+ only; owner, 2026-11-03, night: "what about the upcoming section?"). The Upcoming tab in the
   Saturday-morning show's look, so the three tabs read as one programme: a painted TV-listings page, "This week on Four AIs Trade
   Earnings". 1 the next bell (day, date, each exchange's own close, a countdown that ticks once a minute, N of M trades in); 2 every company
   graded at that close: with trades in, the Overview's next-trade card (the top model's trade on the gold strip, the field, the split,
   Follow on Hyperliquid), with a trade missing, "not in yet"; with none, a listing that says the trades drop before the earnings;
   3 the schedule, day by day after that, the big names first (Mag 7, then market cap from CAPS), rows with no grading date last under
   "Date to come"; a filter All / On Hyperliquid; 4 the end card, "Follow on X for the bell", with the next close. Every row opens its
   round (#/round/N). Every figure from ez-data.js (PENDING, UPCOMING, CAPS, RMETA, CO_LOGOS, CONFIG) through h48_data.js; Hyperliquid
   from its snapshot, refreshed live once by the Overview's script (H48D.refreshHL, H48D.onHL). Mounted into #view each time the router
   draws the tab; X2+'s departures board (story/x2p_up.js) is still built underneath, hidden, and comes back with window.__h48UpOff=1 or
   when this fails (window.__h48UpErr, html.h48-upx). window.__H48NOW (ms) moves the clock, for tests only. ===== */
(function(){
var d=document,H=d.documentElement,W=window;
if(!H.classList.contains("h48"))return;
if(W.__h48UpOff){H.classList.add("h48-upx");return}

/* ---------- each exchange's own close: x2plus.js xcloseAt, copied verbatim (it is private to x2plus.js) ---------- */
function xcloseAt(s,tk){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var y=2000+(+m[3]),mo=+m[1],d=+m[2],x=(String(tk||"").match(/\.([A-Z]+)$/)||[])[1];
  if(x==="KS"||x==="KQ"||x==="T")return Date.UTC(y,mo-1,d,6,30);if(x==="TW")return Date.UTC(y,mo-1,d,5,30);if(x==="HK")return Date.UTC(y,mo-1,d,8);
  if(x==="L"||x==="AS"||x==="DE"||x==="SW"||x==="PA"||x==="MI"||x==="MC"){var ls=function(mm){var t=new Date(Date.UTC(y,mm,0));return t.getUTCDate()-t.getUTCDay()},
    su=(mo>3&&mo<10)||(mo===3&&d>=ls(3))||(mo===10&&d<ls(10)),h=(x==="L"?16:17)-1-(su?1:0);return Date.UTC(y,mo-1,d,h+(x==="L"?1:0),30)}
  return xclose(s)}
function xclose(s){if(!s)return null;var m=String(s).match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;
  var y=2000+(+m[3]),mo=+m[1],d=+m[2],nov=new Date(Date.UTC(y,10,1)),fs=1+(7-nov.getUTCDay())%7,mar=new Date(Date.UTC(y,2,1)),ss=1+(7-mar.getUTCDay())%7+7;
  var dst=(mo>3&&mo<11)||(mo===3&&d>=ss)||(mo===11&&d<fs);return Date.UTC(y,mo-1,d,dst?20:21)}
/* the city and time zone of an exchange, from the ticker's suffix (the same table as x2p_up.js), to print the close in local time */
var EX={KS:["Seoul","Asia/Seoul"],KQ:["Seoul","Asia/Seoul"],T:["Tokyo","Asia/Tokyo"],TW:["Taipei","Asia/Taipei"],HK:["Hong Kong","Asia/Hong_Kong"],L:["London","Europe/London"],
  AS:["Amsterdam","Europe/Amsterdam"],DE:["Frankfurt","Europe/Berlin"],SW:["Zurich","Europe/Zurich"],PA:["Paris","Europe/Paris"],MI:["Milan","Europe/Rome"],MC:["Madrid","Europe/Madrid"]};
function exOf(t){var x=(String(t||"").match(/\.([A-Z]+)$/)||[])[1];return EX[x]||["New York","America/New_York"]}
var TF={};function hm(ms,tz){try{var f=TF[tz]||(TF[tz]=new Intl.DateTimeFormat("en-US",{timeZone:tz,hour:"numeric",minute:"2-digit"}));return f.format(new Date(ms)).replace(/\s?([AP])M$/,function(a,b){return " "+b.toLowerCase()+"m"})}catch(e){return ""}}
var WDL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function dLong(a){var t=new Date(Date.UTC(a[0],a[1],a[2]));return WDL[t.getUTCDay()]+", "+MON[a[1]]+" "+a[2]}
function dShort(a){return H48D.fmtDay(a,true)}
/* time left, once a minute: days and hours, else hours and minutes */
function left(ms){if(!(ms>0))return null;var m=Math.ceil(ms/6e4),dd=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;return dd?{a:dd,ua:"d",b:h,ub:"h",sr:dd+" day"+(dd>1?"s":"")+", "+h+" hour"+(h===1?"":"s")}:h?{a:h,ua:"h",b:mi,ub:"m",sr:h+" hour"+(h===1?"":"s")+", "+mi+" minute"+(mi===1?"":"s")}:{a:mi,ua:"m",sr:mi+" minute"+(mi===1?"":"s")}}
function leftHtml(L){return L?L.a+'<u>'+L.ua+'</u>'+(L.b!=null?' '+String(L.b).padStart(2,"0")+'<u>'+L.ub+'</u>':''):'Now'}

/* ---------- the model: every round still to come, from the sheet ---------- */
function model(){
  var E=H48D,D=E.get(),NOW=W.__H48NOW||Date.now(),ord=D.ord,lead=ord[0],today=E.nyToday(NOW),tk=E.dayKey(today);
  var raw={};(W.PENDING||[]).concat(W.UPCOMING||[]).forEach(function(p){raw[p.n]=p});
  var cap=function(t){return (W.CAPS||{})[t]||0},m7=function(n){return !!((W.RMETA||{})[n]||{}).mag7};
  var fut=D.next.map(function(u){var r=raw[u.n]||{},ex=exOf(u.ticker),cl=u.resolves?xcloseAt(r.resolves,u.ticker):null,
      tr=ord.map(function(m){return u.tr.filter(function(x){return x.m===m})[0]}).filter(Boolean);
    return {n:u.n,co:u.co,ticker:u.ticker,called:u.called,resolves:u.resolves,dated:!!u.resolves,close:cl,ex:ex[0],tz:ex[1],
      tr:tr,nIn:tr.length,missing:ord.filter(function(m){return !tr.some(function(x){return x.m===m})}),mag7:m7(u.n),bet:u.ticker==="NVDA",cap:cap(u.ticker),
      hl:E.hlMarket(u.ticker),k:u.resolves?E.dayKey(u.resolves):0}});
  var big1=function(a,b){return (b.mag7-a.mag7)||(b.bet-a.bet)||(b.cap-a.cap)||(a.n-b.n)};
  /* the next bell: the soonest close still to come; every round graded on that day at a close still to come */
  var dated=fut.filter(function(u){return u.dated&&u.close!=null}).sort(function(a,b){return (a.close-b.close)||big1(a,b)});
  var nx=dated.filter(function(u){return u.close>NOW})[0],bell=null;
  if(nx){var rs=dated.filter(function(u){return u.k===nx.k&&u.close>NOW});
    var cls={};rs.forEach(function(u){var c=cls[u.ex+u.close]||(cls[u.ex+u.close]={ex:u.ex,tz:u.tz,close:u.close,n:0});c.n++});
    bell={k:nx.k,day:nx.resolves,close:nx.close,closes:Object.keys(cls).map(function(k){return cls[k]}).sort(function(a,b){return a.close-b.close}),
      rounds:rs.slice().sort(function(a,b){return (b.nIn-a.nIn)||big1(a,b)})}
    bell.nIn=rs.reduce(function(a,u){return a+u.nIn},0);bell.nAll=rs.length*ord.length;
    var t1=new Date(Date.UTC(today[0],today[1],today[2])+864e5);bell.rel=nx.k===tk?"Today":nx.k===E.dayKey([t1.getUTCFullYear(),t1.getUTCMonth(),t1.getUTCDate()])?"Tomorrow":""}
  var inBell=function(u){return bell&&bell.rounds.indexOf(u)>-1};
  /* graded at a close that has passed, no result in the sheet yet */
  var soon=dated.filter(function(u){return u.close<=NOW}).sort(big1);
  var rest=fut.filter(function(u){return !inBell(u)&&soon.indexOf(u)<0});
  /* trades in, graded after the next bell: cards too */
  var later=rest.filter(function(u){return u.nIn>0}).sort(function(a,b){return ((a.close||9e15)-(b.close||9e15))||big1(a,b)});
  var sched=rest.filter(function(u){return !u.nIn});
  /* the big names, as today's "Hot upcoming predictions": Mag 7 first (NVIDIA is also Bet #1), then market cap; four */
  var big=sched.filter(function(u){return u.mag7||u.cap>0}).sort(big1).slice(0,4);
  var days={};sched.forEach(function(u){if(big.indexOf(u)>-1)return;var k=u.dated?u.k:99999999;(days[k]=days[k]||[]).push(u)});
  var DAYS=Object.keys(days).sort(function(a,b){return a-b}).map(function(k){var rs=days[k].sort(big1),u0=rs[0];
    var cls={};rs.forEach(function(u){if(u.close!=null)cls[u.ex]=cls[u.ex]||{ex:u.ex,tz:u.tz,close:u.close}});
    return {k:+k,dated:+k!==99999999,day:u0.resolves,rounds:rs,closes:Object.keys(cls).map(function(x){return cls[x]}).sort(function(a,b){return a.close-b.close})}});
  return {E:E,D:D,NOW:NOW,today:today,tk:tk,ord:ord,lead:lead,fut:fut,bell:bell,soon:soon,later:later,big:big,DAYS:DAYS,
    nAll:fut.length,nHL:fut.filter(function(u){return u.hl}).length,x:(W.CONFIG&&CONFIG.x)||"https://x.com/earningszn"}}

/* ---------- drawing ---------- */
var st={hl:false},X=null,lastW=0,tmr=0;
function esc(s){return H48UI.esc(s)}
/* name and ticker together, as the Overview's cards print them (h48_data.js coLabel: the sheet's ticker as it is) */
function label(u){return H48D.coLabel(u.ticker)}
function closeLine(cs){return cs.map(function(c){return c.ex+" close · "+hm(c.close,c.tz)}).join(" · ")}
function tags(u){return (u.mag7?'<span class="h8-utg">Mag 7</span>':'')+(u.bet?'<span class="h8-utg">Bet #1</span>':'')}
function mkt(u){var mk=u.hl;return mk?'<span class="h8-mkl" data-h8hl2="'+esc(u.ticker)+'"><b>'+esc(mk.name)+'</b> · $'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')+'</span>':
  '<span class="h8-mkl h8-unm">No Hyperliquid market</span>'}
function srRow(u,line){return label(u)+", round "+u.n+(u.mag7?", Mag 7":"")+(u.bet?", Bet #1":"")+". "+line+". "+(u.hl?"On Hyperliquid: "+u.hl.name+", $"+u.hl.oi.toFixed(1)+"M open interest"+(u.hl.thin?", thin market":""):"No Hyperliquid market")+". Open its round."}
/* one company with no trades yet: a listing on a painted plate, the whole plate opens its round */
function row(u,big){var X0=X,past=u.called&&X0.E.dayKey(u.called)<X0.tk;
  var line=past?"Trades not in yet":"Trades drop before the earnings",when=big?(u.dated?"Graded at the close "+dShort(u.resolves):"Date to come"):"";
  return '<li class="h8-uli" data-hl="'+(u.hl?1:0)+'"><a class="h8-urw h8-pl h8-t'+(big?' h8-ubg':'')+'" href="#/round/'+u.n+'" aria-label="'+esc(srRow(u,(when?when+". ":"")+line))+'">'+
    H48UI.co(u.ticker,big?44:34)+'<span class="h8-urt" aria-hidden="true"><span class="h8-urn">'+esc(label(u))+tags(u)+'</span>'+
    (when?'<span class="h8-nxgd h8-uwh">'+esc(when)+'</span>':'')+
    '<span class="h8-nxgd">Round '+u.n+' · '+line+'</span>'+mkt(u)+'</span></a></li>'}
/* one company with trades in: the Overview's next-trade card (h48_ui.js nextCard), with the trades still missing shown as not in yet */
function card(u,inBell){var E=X.E,U=H48UI,L=X.lead,ord=X.ord,t=u.tr.filter(function(x){return x.m===L})[0];
  var lg=u.tr.filter(function(x){return x.up}).length,sh=u.nIn-lg,nm=u.missing.length;
  var sub="Round "+u.n+" · "+u.nIn+" of "+ord.length+" trades in"+(inBell?"":" · graded "+(u.dated?dShort(u.resolves):"date to come"));
  var h='<li class="h8-uli h8-ucw" data-hl="'+(u.hl?1:0)+'"><article class="h8-nx h8-pl h8-ucd" aria-labelledby="h8un'+u.n+'">'+
    '<a class="h8-nxhd h8-ulk" href="#/round/'+u.n+'">'+U.co(u.ticker,38)+'<span class="h8-urt"><span class="h8-nxcn" id="h8un'+u.n+'">'+esc(label(u))+'</span><span class="h8-nxgd">'+esc(sub)+'</span></span><span class="h8-sr">Open its round</span></a>';
  h+=t?'<div class="h8-nxtop">'+U.badge(L,34)+'<div><span class="h8-nxlb">'+E.NAME[L]+'&rsquo;s trade</span><span class="h8-nxbig '+(t.up?"h8-long":"h8-short")+'">'+U.size(t)+'</span></div></div>':
    '<div class="h8-nxtop h8-no">'+U.badge(L,34)+'<div><span class="h8-nxlb">'+E.NAME[L]+'&rsquo;s trade</span><span class="h8-nxwt">Not in yet</span></div></div>';
  h+='<div class="h8-nxfld"><span class="h8-nxlb">The field</span>'+ord.filter(function(m){return m!==L}).map(function(m){var x=u.tr.filter(function(q){return q.m===m})[0];
      return x?'<span class="h8-nxf">'+U.badge(m,18)+E.NAME[m]+' <i class="'+(x.up?"h8-long":"h8-short")+'">'+U.size(x)+'</i></span>':
        '<span class="h8-nxf h8-unin">'+U.badge(m,18)+E.NAME[m]+' <i>not in yet</i></span>'}).join("")+'</div>';
  h+='<p class="h8-usp"><span class="h8-nxlb">The split</span><span><b class="h8-long">'+lg+' long</b>, <b class="h8-short">'+sh+' short</b>'+(nm?' · '+nm+' not in yet':'')+'</span></p>';
  return h+U.follow(u.ticker,L,t)+'</article></li>'}
function sw(on,txt,k){return '<button type="button" class="h8-sw" data-uf="'+k+'" aria-pressed="'+on+'">'+txt+'</button>'}

function build(root){
  var M=X,E=M.E,D=M.D,b=M.bell,h="",logo='<img src="media/icon.svg" alt="" width="28" height="28">';
  /* ---------- 1. the listings page's masthead ---------- */
  h+='<section class="h8-umh" aria-labelledby="h8uh1"><div class="h8-umt"><p class="h8-umk">This week on</p>'+
    '<h1 class="h8-let" id="h8uh1" data-h8let="81" aria-label="This week on Four AIs Trade Earnings">Four AIs Trade Earnings</h1>'+
    '<p class="h8-uep" aria-hidden="true"><span>Season 1</span>'+(D.weekNo?'<span>Week '+D.weekNo+'</span>':'')+'<span>'+M.nAll+' on the card</span></p></div></section>';

  /* ---------- 2. the next bell, and every company graded at it ---------- */
  h+='<section class="h8-ubs h8-g" aria-labelledby="h8uh2"><div class="h8-wrap">';
  if(b){var L0=left(b.close-M.NOW);
    h+='<div class="h8-ubell"><div class="h8-ubh"><p class="h8-act">The next bell'+(b.rel?' · '+b.rel.toLowerCase():'')+'</p>'+
      '<h2 class="h8-let" id="h8uh2" data-h8let="82" data-h8amp=".6">'+esc(dLong(b.day))+'</h2><p class="h8-ucl">'+esc(closeLine(b.closes))+'</p></div>'+
      '<div class="h8-ustw h8-pl"><div class="h8-ust"><span class="h8-num h8-ubig" data-h8ucd="'+b.closes[0].close+'" role="timer" aria-label="'+esc(L0?L0.sr+" to the "+b.closes[0].ex+" close":"The bell")+'">'+leftHtml(L0)+'</span><span class="h8-lbl">to the bell</span></div>'+
      '<div class="h8-ust"><span class="h8-num h8-ubig">'+b.nIn+' <small>of</small> '+b.nAll+'</span><span class="h8-lbl">trades in · '+b.rounds.length+' compan'+(b.rounds.length===1?'y':'ies')+'</span></div></div></div>';
  }else h+='<div class="h8-ubell"><div class="h8-ubh"><p class="h8-act">The next bell</p><h2 class="h8-let" id="h8uh2" data-h8let="82" data-h8amp=".6">No close on the card yet</h2>'+
      '<p class="h8-ucl">Trades drop before each company&rsquo;s earnings</p></div></div>';
  h+='<div class="h8-uflt" role="group" aria-label="Show"><span class="h8-lbl">Show</span>'+sw(!st.hl,'All · '+M.nAll,'all')+sw(st.hl,'On Hyperliquid · '+M.nHL,'hl')+
    '<span class="h8-uasof">Markets: <span class="h8-asof">'+esc(E.hlAsOf())+'</span></span></div>';
  if(b){var bi=b.rounds.filter(function(u){return u.nIn}),bo=b.rounds.filter(function(u){return !u.nIn}),bh=b.rounds.filter(function(u){return u.hl}).length;
    if(bi.length)h+='<ul class="h8-unxs h8-ug" data-hln="'+bi.filter(function(u){return u.hl}).length+'">'+bi.map(function(u){return card(u,true)}).join("")+'</ul>';
    if(bo.length)h+='<div class="h8-ug" data-hln="'+bo.filter(function(u){return u.hl}).length+'"><p class="h8-ugl">Also at this close</p><ul class="h8-urs">'+bo.map(function(u){return row(u,false)}).join("")+'</ul></div>';
    h+='<p class="h8-uhe" data-hln="'+bh+'">None of the companies graded at this close has a Hyperliquid market.</p>'}
  if(M.later.length)h+='<div class="h8-ug" data-hln="'+M.later.filter(function(u){return u.hl}).length+'"><p class="h8-ugl">Trades in · graded after the next bell</p><ul class="h8-unxs">'+M.later.map(function(u){return card(u,false)}).join("")+'</ul></div>';
  if(M.soon.length)h+='<div class="h8-ug" data-hln="'+M.soon.filter(function(u){return u.hl}).length+'"><p class="h8-ugl">Graded at a close that has rung · result soon</p><ul class="h8-urs">'+M.soon.map(function(u){return u.nIn?card(u,false):row(u,false)}).join("")+'</ul></div>';
  h+='</div></section>';

  /* ---------- 3. the schedule ---------- */
  if(M.big.length||M.DAYS.length){
    h+='<div class="h8-bump" aria-hidden="true"><p class="h8-bt"><small>Coming up</small><span data-h8let="83" data-h8amp=".7">The schedule</span></p></div>';
    h+='<section class="h8-usc h8-g" aria-labelledby="h8uh3"><div class="h8-wrap"><h2 class="h8-sr" id="h8uh3">The schedule</h2>';
    if(M.big.length)h+='<div class="h8-ug h8-ubgs" data-hln="'+M.big.filter(function(u){return u.hl}).length+'"><h3 class="h8-let h8-udt" data-h8let="84" data-h8amp=".6">The big names</h3><ul class="h8-urs h8-urb">'+M.big.map(function(u){return row(u,true)}).join("")+'</ul></div>';
    M.DAYS.forEach(function(g,i){h+='<div class="h8-ug h8-uday" data-hln="'+g.rounds.filter(function(u){return u.hl}).length+'"><div class="h8-udh"><h3 class="h8-let h8-udt" data-h8let="'+(85+i)+'" data-h8amp=".6">'+esc(g.dated?dLong(g.day):"Date to come")+'</h3>'+
      '<p class="h8-udl">'+esc((g.dated?closeLine(g.closes):"Graded once the date is set")+' · '+g.rounds.length+' compan'+(g.rounds.length===1?'y':'ies'))+'</p></div><ul class="h8-urs">'+g.rounds.map(function(u){return row(u,false)}).join("")+'</ul></div>'});
    h+='</div></section>'}

  /* ---------- 4. the end card: follow on X for the bell ---------- */
  var nb=b?b.closes[0]:null,L1=nb?left(nb.close-M.NOW):null;
  h+='<section class="h8-uend" aria-labelledby="h8uh4"><div class="h8-uec"><div class="h8-uin"><p class="h8-umk">Don&rsquo;t miss it</p>'+
    '<h2 class="h8-let" id="h8uh4" data-h8let="95">Follow on X for the bell</h2>'+
    (nb?'<p class="h8-unt"><span class="h8-lbl">Next close</span>'+esc(dShort(b.day)+' · '+nb.ex+' '+hm(nb.close,nb.tz))+' · in <span class="h8-num" data-h8ucd="'+nb.close+'">'+leftHtml(L1)+'</span></p>':'')+
    
    '</div></div><div class="h8-uft h8-g"><div class="h8-wrap">'+(M.x?'<p class="h8-ubtn"><a class="h8-btn h8-cr" href="'+esc(M.x)+'" target="_blank" rel="noopener"><svg class="h8-x" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>Follow on X</a></p>':'')+'<p class="h8-small"><span class="h8-plg" aria-hidden="true">'+logo+'</span><span>Markets: <span class="h8-asof">'+esc(E.hlAsOf())+'</span>. Only the top model&rsquo;s trade links to Hyperliquid; under $10M open interest is a thin market. Simulated record, $100K a trade, before fees. Not financial advice. Hyperliquid is not available in every country.</span></p></div></div></section>';

  root.innerHTML=h;root.classList.toggle("h8-uhl",st.hl);
  H48UI.letterAll(root);
  root.querySelectorAll("[data-uf]").forEach(function(bt){bt.addEventListener("click",function(){var on=bt.getAttribute("data-uf")==="hl";if(on===st.hl)return;st.hl=on;
    root.classList.toggle("h8-uhl",on);root.querySelectorAll("[data-uf]").forEach(function(x){x.setAttribute("aria-pressed",String((x.getAttribute("data-uf")==="hl")===on))})})});
  clock(root)}

/* the countdowns tick once a minute (no seconds); when the bell rings, the page moves on to the next close */
function clock(root){clearTimeout(tmr);var bc=X&&X.bell?X.bell.closes[0].close:null;
  var set=function(){if(!root.isConnected)return false;var now=W.__H48NOW||Date.now();
    if(bc&&now>=bc){X=model();build(root);return false}
    root.querySelectorAll("[data-h8ucd]").forEach(function(el){var L=left(+el.getAttribute("data-h8ucd")-now),s=leftHtml(L);if(el.innerHTML!==s)el.innerHTML=s;if(el.getAttribute("role")==="timer"&&L)el.setAttribute("aria-label",L.sr+" to the bell")});return true};
  var next=function(){if(!set())return;var now=W.__H48NOW||Date.now(),ms=bc?(bc-now)%6e4:6e4;tmr=setTimeout(next,(ms>0?ms:6e4)+60)};
  var now0=W.__H48NOW||Date.now(),ms0=bc?(bc-now0)%6e4:6e4;tmr=setTimeout(next,(ms0>0?ms0:6e4)+60)}

/* ---------- mount: every time the router draws the tab (h48_lb.js's pattern) ---------- */
var timer=0;
function mount(){timer=0;var v=d.getElementById("view");if(!v||H.getAttribute("data-sec")!=="upcoming"||v.hidden)return;if(v.querySelector(":scope>#h48up"))return;
  if(!(W.H48D&&W.H48UI&&W.ROUNDS&&ROUNDS.length&&W.MODELS))return again();
  try{X=model();var root=d.createElement("div");root.id="h48up";root.className="h8r";v.appendChild(root);build(root);lastW=innerWidth;W.__h48Up=X}
  catch(e){W.__h48UpErr=e;H.classList.add("h48-upx");try{console.error("h48up",e)}catch(z){}var o=d.getElementById("h48up");if(o)o.remove()}}
function again(){if(!timer&&!W.__h48UpErr)timer=setTimeout(mount,40)}
function watch(){var v=d.getElementById("view");if(!v)return setTimeout(watch,100);
  new MutationObserver(function(){if(!W.__h48UpErr&&H.getAttribute("data-sec")==="upcoming"&&!v.querySelector(":scope>#h48up"))again()}).observe(v,{childList:true});
  new MutationObserver(again).observe(H,{attributes:true,attributeFilter:["data-sec"]});mount()}
watch();
/* Hyperliquid's own figures, once the Overview's script has asked for them: the open interest and the filter's counts go live */
if(W.H48D)H48D.onHL(function(){var r=d.getElementById("h48up");if(r&&X){var y=scrollY;X=model();build(r);scrollTo({top:y,behavior:"instant"})}});
})();
