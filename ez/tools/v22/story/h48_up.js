/* ===== H48b UPCOMING (EZ Live X6+ only; owner, 2026-11-03, night: "what about the upcoming section?"; round H49, 2026-11-04: "remove
   noise; one thing to care about per card"). The Upcoming tab in the Saturday-morning show's look, so the three tabs read as one
   programme. 1 the painted ribbon "Coming up · The schedule" as the tab's banner; 2 filters that combine (Big names, Mag 7, Tech, On
   Hyperliquid; remembered across tab switches); 3 everything in the order the closes grade it: the next bell (day, date, each exchange's
   own close, a countdown that ticks once a minute, N of M trades in), its companies with trades in as the Overview's next-trade card (the
   top model's trade on the gold strip, the field on one row, the split on one line, Follow on Hyperliquid where a market exists), then
   "Also at this close", then every later day, "Date to come" last; 4 the end card, "Follow on X for the bell", with the next close. A
   market line shows only where Hyperliquid lists the company. Every row opens its round (#/round/N). Every figure from ez-data.js
   (PENDING, UPCOMING, CAPS, RMETA, CO_LOGOS, CONFIG) through h48_data.js; Hyperliquid from its snapshot, refreshed live once by the
   Overview's script (H48D.refreshHL, H48D.onHL). Mounted into #view each time the router draws the tab; X2+'s departures board
   (story/x2p_up.js) is still built underneath, hidden, and comes back with window.__h48UpOff=1 or when this fails (window.__h48UpErr,
   html.h48-upx). window.__H48NOW (ms) moves the clock, for tests only. ===== */
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
  var cap=function(t){return (W.CAPS||{})[t]||0},meta=function(n){return (W.RMETA||{})[n]||{}};
  var fut=D.next.map(function(u){var r=raw[u.n]||{},ex=exOf(u.ticker),cl=u.resolves?xcloseAt(r.resolves,u.ticker):null,
      tr=ord.map(function(m){return u.tr.filter(function(x){return x.m===m})[0]}).filter(Boolean),m7=!!meta(u.n).mag7,c=cap(u.ticker);
    return {n:u.n,co:u.co,ticker:u.ticker,called:u.called,resolves:u.resolves,dated:!!u.resolves,close:cl,ex:ex[0],tz:ex[1],
      tr:tr,nIn:tr.length,missing:ord.filter(function(m){return !tr.some(function(x){return x.m===m})}),mag7:m7,bet:u.ticker==="NVDA",cap:c,
      big:m7||c>0,tech:meta(u.n).sector==="Information Technology",hl:E.hlMarket(u.ticker),k:u.resolves?E.dayKey(u.resolves):0}});
  var M={E:E,D:D,NOW:NOW,today:today,tk:tk,ord:ord,lead:lead,fut:fut,nAll:fut.length,x:(W.CONFIG&&CONFIG.x)||"https://x.com/earningszn"};
  M.all=plan(fut,M);return M}
/* the filters (owner, 2026-11-04: "Big names" becomes a filter; they combine): a round shows when it passes every filter that is on.
   Big names = Mag 7 or one of the 200 largest companies by market cap (CAPS in ez-data.js); Mag 7 and the sector from the sheet (RMETA);
   On Hyperliquid = a market there today */
var FL=[["big","Big names",function(u){return u.big}],["mag7","Mag 7",function(u){return u.mag7}],["tech","Tech",function(u){return u.tech}],["hl","On Hyperliquid",function(u){return !!u.hl}]];
function pass(u){return FL.every(function(f){return !st.f[f[0]]||f[2](u)})}
function anyOn(){return FL.some(function(f){return st.f[f[0]]})}
/* everything in the order the closes grade it: a close that has rung (result soon), the next bell, every later day, "Date to come" last */
function plan(F,M){var NOW=M.NOW,big1=function(a,b){return (b.mag7-a.mag7)||(b.bet-a.bet)||(b.cap-a.cap)||(a.n-b.n)};
  var rung=F.filter(function(u){return u.dated&&u.close!=null&&u.close<=NOW}).sort(big1);
  var g={};F.forEach(function(u){if(u.dated&&u.close!=null&&u.close<=NOW)return;var k=u.dated?u.k:99999999;(g[k]=g[k]||[]).push(u)});
  var days=Object.keys(g).sort(function(a,b){return a-b}).map(function(k){var rs=g[k].sort(function(a,b){return (b.nIn-a.nIn)||big1(a,b)}),cls={};
    rs.forEach(function(u){if(u.close!=null){var c=cls[u.ex+u.close]||(cls[u.ex+u.close]={ex:u.ex,tz:u.tz,close:u.close});}});
    return {k:+k,dated:+k!==99999999,day:rs[0].resolves,rounds:rs,closes:Object.keys(cls).map(function(x){return cls[x]}).sort(function(a,b){return a.close-b.close}),
      nIn:rs.reduce(function(a,u){return a+u.nIn},0),nAll:rs.length*M.ord.length}});
  var bell=days.length&&days[0].dated?days.shift():null;
  if(bell){var t1=new Date(Date.UTC(M.today[0],M.today[1],M.today[2])+864e5);bell.close=bell.closes[0].close;
    bell.rel=bell.k===M.tk?"Today":bell.k===M.E.dayKey([t1.getUTCFullYear(),t1.getUTCMonth(),t1.getUTCDate()])?"Tomorrow":""}
  return {rung:rung,bell:bell,days:days,n:F.length}}

/* ---------- drawing ---------- */
var st={f:{}},X=null,lastW=0,tmr=0;
function esc(s){return H48UI.esc(s)}
/* name and ticker together, as the Overview's cards print them (h48_data.js coLabel: the sheet's ticker as it is) */
function label(u){return H48D.coLabel(u.ticker)}
function cos(n){return n+" compan"+(n===1?"y":"ies")}
function closeLine(cs){return cs.map(function(c){return c.ex+" close · "+hm(c.close,c.tz)}).join(" · ")}
function tags(u){return (u.mag7?'<span class="h8-utg">Mag 7</span>':'')+(u.bet?'<span class="h8-utg">Bet #1</span>':'')}
/* the market line, only where a market exists (owner, 2026-11-04: never "No Hyperliquid market"; the filter covers the rest) */
function mktTxt(mk){return '<b>'+esc(mk.name)+'</b><span class="h8-msep"> · </span>$'+mk.oi.toFixed(1)+'M open interest'+(mk.thin?' · <em>thin market</em>':'')}
function srRow(u,line){return label(u)+", round "+u.n+(u.mag7?", Mag 7":"")+(u.bet?", Bet #1":"")+". "+line+". "+(u.hl?"On Hyperliquid: "+u.hl.name+", $"+u.hl.oi.toFixed(1)+"M open interest"+(u.hl.thin?", thin market":"")+". ":"")+"Open its round."}
/* one company with no trades yet: a listing on a painted plate, the whole plate opens its round */
function row(u){var past=u.called&&X.E.dayKey(u.called)<X.tk,line=past?"Trades not in yet":"Trades drop before the earnings";
  return '<li class="h8-uli"><a class="h8-urw h8-pl h8-t" href="#/round/'+u.n+'" aria-label="'+esc(srRow(u,line))+'">'+
    H48UI.co(u.ticker,34)+'<span class="h8-urt" aria-hidden="true"><span class="h8-urn">'+esc(label(u))+tags(u)+'</span>'+
    '<span class="h8-nxgd">Round '+u.n+' · '+line+'</span>'+(u.hl?'<span class="h8-mkl" data-h8mk="'+esc(u.ticker)+'">'+mktTxt(u.hl)+'</span>':'')+'</span></a></li>'}
/* one company with trades in: the Overview's next-trade card (h48_ui.js nextCard), tightened (owner, 2026-11-04): the field's three on one
   row, the split on one line beside its label, the market line only where a market exists; a trade still missing reads "not in yet" */
function card(u){var E=X.E,U=H48UI,L=X.lead,ord=X.ord,t=u.tr.filter(function(x){return x.m===L})[0],mk=u.hl;
  var lg=u.tr.filter(function(x){return x.up}).length,sh=u.nIn-lg,nm=u.missing.length;
  var h='<li class="h8-uli h8-ucw"><article class="h8-nx h8-pl h8-ucd" aria-labelledby="h8un'+u.n+'">'+
    '<a class="h8-nxhd h8-ulk" href="#/round/'+u.n+'">'+U.co(u.ticker,38)+'<span class="h8-urt"><span class="h8-nxcn" id="h8un'+u.n+'">'+esc(label(u))+'</span><span class="h8-nxgd">Round '+u.n+' · '+u.nIn+' of '+ord.length+' trades in</span></span><span class="h8-sr">Open its round</span></a>';
  /* owner, 2026-11-04, on this card: the size at the far end of the gold strip (as on the Overview's cards); the field's trades beside their
     names; the split up beside "The field"; the market beside the Follow button. One row less, a smaller card. */
  var cl=t?(t.up?"h8-long":"h8-short"):"";
  h+=t?'<div class="h8-nxtop">'+U.badge(L,34)+'<div><span class="h8-nxbig '+cl+'">'+(t.up?"Long":"Short")+'</span></div><span class="h8-nxsz h8-nxbig '+cl+'">'+t.size+'%</span></div>':
    '<div class="h8-nxtop h8-no">'+U.badge(L,34)+'<div><span class="h8-nxlb">'+E.NAME[L]+'&rsquo;s trade</span><span class="h8-nxwt">Not in yet</span></div></div>';
  h+='<div class="h8-ufld"><div class="h8-ufh"><span class="h8-nxlb">The field</span><p class="h8-usp"><span class="h8-nxlb">The split</span><span class="h8-usv"><b class="h8-long">'+lg+' long</b>, <b class="h8-short">'+sh+' short</b>'+(nm?' · '+nm+' not in yet':'')+'</span></p></div><div class="h8-uf3">'+ord.filter(function(m){return m!==L}).map(function(m){var x=u.tr.filter(function(q){return q.m===m})[0];
      return '<span class="h8-uf1'+(x?'':' h8-unin')+'"><span class="h8-ufn">'+U.badge(m,18)+E.NAME[m]+'</span>'+(x?'<i class="'+(x.up?"h8-long":"h8-short")+'">'+U.size(x)+'</i>':'<i>not in yet</i>')+'</span>'}).join("")+'</div></div>';
  if(mk)h+='<div class="h8-hl h8-uhl" data-h8hl="'+esc(u.ticker)+'">'+(t?'<a class="h8-btn h8-hlb" href="'+esc(mk.url)+'" target="_blank" rel="noopener">Follow '+E.NAME[L]+'&rsquo;s '+(t.up?"long":"short")+' on Hyperliquid</a>':'')+'<span class="h8-mkl" data-h8mk="'+esc(u.ticker)+'">'+mktTxt(mk)+'</span></div>';
  return h+'</article></li>'}
/* a group of companies graded at one close: the cards first, then the listings */
function list(rs,also){var ci=rs.filter(function(u){return u.nIn}),ro=rs.filter(function(u){return !u.nIn}),h="";
  if(ci.length)h+='<ul class="h8-unxs">'+ci.map(card).join("")+'</ul>';
  if(ro.length)h+=(ci.length&&also?'<p class="h8-ugl">Also at this close</p>':'')+'<ul class="h8-urs'+(ci.length?' h8-uaf':'')+'">'+ro.map(row).join("")+'</ul>';
  return h}
function sw(on,txt,k){return '<button type="button" class="h8-sw" data-uf="'+k+'" aria-pressed="'+on+'">'+txt+'</button>'}

function build(root){
  var M=X,E=M.E,F=M.fut.filter(pass),P=plan(F,M),b=P.bell,on=anyOn(),h="",logo='<img src="media/ez-mark.svg" alt="" width="28" height="28">';
  /* ---------- 1. the tab's banner: the painted ribbon (owner, 2026-11-04: it takes the masthead's place) ---------- */
  h+='<div class="h8-bump h8-utop" aria-hidden="true"><p class="h8-bt"><small>Coming up</small><span data-h8let="83" data-h8amp=".7">The schedule</span></p></div><h1 class="h8-sr">Coming up: the schedule</h1>';

  /* ---------- 2. the filters, then the next bell and every company graded at it ---------- */
  h+='<section class="h8-ubs h8-g" aria-labelledby="h8uh2"><div class="h8-wrap">';
  h+='<div class="h8-uflt" role="group" aria-label="Filter the schedule"><span class="h8-lbl">Show</span>'+sw(!on,'All','all')+FL.map(function(f){return sw(!!st.f[f[0]],f[1],f[0])}).join("")+
    '<span class="h8-uasof">'+(on?'Showing '+F.length+' of '+M.nAll:M.nAll+' on the card')+' · Markets: <span class="h8-asof">'+esc(E.hlAsOf())+'</span></span></div>';
  if(P.rung.length)h+='<div class="h8-ug"><p class="h8-ugl">The bell has rung · result soon</p>'+list(P.rung,false)+'</div>';
  if(b){var L0=left(b.close-M.NOW);
    h+='<div class="h8-ubell"><div class="h8-ubh"><p class="h8-act">The next bell'+(b.rel?' · '+b.rel.toLowerCase():'')+'</p>'+
      '<h2 class="h8-let" id="h8uh2" data-h8let="82" data-h8amp=".6">'+esc(dLong(b.day))+'</h2><p class="h8-ucl">'+esc(closeLine(b.closes))+'</p></div>'+
      '<div class="h8-ustw h8-pl"><div class="h8-ust"><span class="h8-num h8-ubig" data-h8ucd="'+b.close+'" role="timer" aria-label="'+esc(L0?L0.sr+" to the "+b.closes[0].ex+" close":"The bell")+'">'+leftHtml(L0)+'</span><span class="h8-lbl">to the bell</span></div>'+
      '<div class="h8-ust"><span class="h8-num h8-ubig">'+b.nIn+' <small>of</small> '+b.nAll+'</span><span class="h8-lbl">trades in · '+cos(b.rounds.length)+'</span></div></div></div>';
    h+='<div class="h8-ug">'+list(b.rounds,true)+'</div>'}
  else h+='<div class="h8-ubell"><div class="h8-ubh"><p class="h8-act">The next bell</p><h2 class="h8-let" id="h8uh2" data-h8let="82" data-h8amp=".6">'+(F.length?'No close date yet':'Nothing in this filter')+'</h2>'+
      '<p class="h8-ucl">'+(F.length?'Trades drop before each company&rsquo;s earnings':'<button type="button" class="h8-sw" data-uf="all" aria-pressed="false">Show all</button>')+'</p></div></div>';
  h+='</div></section>';

  /* ---------- 3. every later day, then "Date to come" ---------- */
  if(P.days.length){h+='<section class="h8-usc h8-g" aria-labelledby="h8uh3"><div class="h8-wrap"><h2 class="h8-sr" id="h8uh3">Later on the schedule</h2>';
    P.days.forEach(function(g,i){h+='<div class="h8-ug h8-uday"><div class="h8-udh"><h3 class="h8-let h8-udt" data-h8let="'+(85+i)+'" data-h8amp=".6">'+esc(g.dated?dLong(g.day):"Date to come")+'</h3>'+
      '<p class="h8-udl">'+esc((g.dated?closeLine(g.closes):"Graded once the date is set")+' · '+cos(g.rounds.length))+'</p></div>'+list(g.rounds,false)+'</div>'});
    h+='</div></section>'}

  /* ---------- 4. the end card: follow on X for the bell (the next close of the whole card, whatever the filter) ---------- */
  var B=M.all.bell,nb=B?B.closes[0]:null,L1=nb?left(nb.close-M.NOW):null;
  h+='<section class="h8-uend" aria-labelledby="h8uh4"><div class="h8-uec"><div class="h8-uin"><p class="h8-umk">Don&rsquo;t miss it</p>'+
    '<h2 class="h8-let" id="h8uh4" data-h8let="95">Follow on X for the bell</h2>'+
    (nb?'<p class="h8-unt"><span class="h8-lbl">Next close</span>'+esc(dShort(B.day)+' · '+nb.ex+' '+hm(nb.close,nb.tz))+' · in <span class="h8-num" data-h8ucd="'+nb.close+'">'+leftHtml(L1)+'</span></p>':'')+
    '</div></div><div class="h8-uft h8-g"><div class="h8-wrap">'+(M.x?'<p class="h8-ubtn"><a class="h8-btn h8-cr" href="'+esc(M.x)+'" target="_blank" rel="noopener"><svg class="h8-x" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L2 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z"/></svg>Follow on X</a></p>':'')+
    '<p class="h8-small"><span class="h8-plg" aria-hidden="true">'+logo+'</span><span>Markets: <span class="h8-asof">'+esc(E.hlAsOf())+'</span>. Only the top model&rsquo;s trade links to Hyperliquid; under $10M open interest is a thin market. Simulated record, $100K a trade, before fees. Not financial advice. Hyperliquid is not available in every country.</span></p></div></div></section>';

  root.innerHTML=h;
  H48UI.letterAll(root);
  logoCol(root);fitField(root);
  /* a filter redraws the tab in place: the scroll and the pressed switch's focus stay */
  root.querySelectorAll("[data-uf]").forEach(function(bt){bt.addEventListener("click",function(){var k=bt.getAttribute("data-uf"),y=scrollY;
    if(k==="all")st.f={};else st.f[k]=!st.f[k];build(root);scrollTo({top:y,behavior:"instant"});var f=root.querySelector('.h8-uflt [data-uf="'+k+'"]');if(f)f.focus({preventScroll:true})})});
  clock(root)}

/* one logo column for every listing on the tab, as wide as its widest logo slot (a wordmark prints long and low when h48_x_logo.js is on),
   so every name starts on the same line */
function logoCol(root){var w=0;root.querySelectorAll(".h8-urw>.h8-co").forEach(function(c){var q=c.getBoundingClientRect(),cs=getComputedStyle(c);w=Math.max(w,q.width+parseFloat(cs.marginLeft)+parseFloat(cs.marginRight))});
  if(w)root.style.setProperty("--h8ulw",Math.ceil(w)+"px")}
/* the field's three trades sit on one row, each beside its name: one size for every card, the largest at which the widest row fits (floor
   11px; below that a row may wrap) */
function fitField(root){root.style.removeProperty("--uff");var r=1,f0=0;root.querySelectorAll(".h8-uf3").forEach(function(g){if(!g.clientWidth)return;
    if(!f0)f0=parseFloat(getComputedStyle(g.querySelector(".h8-uf1")||g).fontSize);var need=0;[].forEach.call(g.children,function(c){need+=c.scrollWidth});need+=(g.children.length-1)*parseFloat(getComputedStyle(g).columnGap||6);r=Math.max(r,need/g.clientWidth)});
  if(!(r>1&&f0))return;var f=Math.max(10.5,Math.floor(f0/r*4)/4),gs=[].slice.call(root.querySelectorAll(".h8-uf3"));
  /* the marks and the gaps do not scale with the type: check the rows as drawn and step down until each is one line */
  var over=function(){return gs.some(function(g){var k=g.children,t=k.length&&k[0].getBoundingClientRect().top;return [].some.call(k,function(c){return Math.abs(c.getBoundingClientRect().top-t)>2})})};
  for(var i=0;i<14;i++){root.style.setProperty("--uff",f+"px");if(f<=10.5||!over())break;f-=.25}}
if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){var r=d.getElementById("h48up");if(r)fitField(r)});
/* the countdowns tick once a minute (no seconds); when a bell rings, the page moves on to the next close */
function clock(root){clearTimeout(tmr);var cs=[].slice.call(root.querySelectorAll("[data-h8ucd]")).map(function(e){return +e.getAttribute("data-h8ucd")}),bc=cs.length?Math.min.apply(null,cs):null;
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
if(W.H48D)H48D.onHL(function(){var r=d.getElementById("h48up");if(!r||!X)return;var sig=function(M){return M.fut.map(function(u){return u.hl?1:0}).join("")},was=sig(X);X=model();
  /* the same companies listed: the figures change in place (a redraw mid-scroll would jump the page); else the tab redraws */
  if(sig(X)!==was&&st.f.hl){var y=scrollY;build(r);scrollTo({top:y,behavior:"instant"});return}
  r.querySelectorAll("[data-h8mk]").forEach(function(el){var u=X.fut.filter(function(x){return x.ticker===el.getAttribute("data-h8mk")})[0];if(u&&u.hl)el.innerHTML=mktTxt(u.hl)});
  r.querySelectorAll(".h8-asof").forEach(function(el){el.textContent=X.E.hlAsOf()})});
})();
