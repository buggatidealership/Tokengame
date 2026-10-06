
/* ================= V22 · SEASON LIVE: pages =================
   The board is Season, untouched. The other pages render into #view from the same data. */
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function arrow(dn){return '<span aria-hidden="true">'+(dn?'▼':'▲')+'</span><span class="sr">'+(dn?'Down ':'Up ')+'</span>'}
function pill(dn,txt){return '<b class="pill '+(dn?'d':'u')+'">'+arrow(dn)+esc(txt)+'</b>'}
var RK=ROWS.map(function(T){return T.m});
var CAR={};ACTIVE.forEach(function(m){CAR[m]=career(m)});
function rkOf(m){var T=ROWS.filter(function(T){return T.m===m})[0];return T?rankOf(T):RK.length}
var ALLN=ROUNDS.map(function(r){return r.n}).concat(PENDING.map(function(u){return u.n}),UPCOMING.map(function(u){return u.n})).sort(function(a,b){return a-b});
function findR(n){return ROUNDS.filter(function(r){return r.n===n})[0]||null}
function findP(n){return PENDING.filter(function(r){return r.n===n})[0]||null}
function findU(n){return UPCOMING.filter(function(r){return r.n===n})[0]||null}
/* one view of any round: graded, calls in, or sealed */
function rv(n){var r=findR(n);
  if(r){var wn=r.win?r.win.split(" & "):[];return {n:n,co:r.co,ticker:r.ticker,called:r.called,resolves:r.resolves,timing:r.timing,st:"graded",a:r.a,out:r.out,win:wn,head:r.head,tag:r.tag,
    calls:parsed(r).map(function(c){c.win=wn.indexOf(c.m)>-1;return c})}}
  var p=findP(n);if(p)return {n:n,co:p.co,ticker:p.ticker,called:p.called,resolves:p.resolves,timing:p.timing,st:"calls",win:[],
    calls:p.calls.map(function(c){return {m:c.m,dn:c.dir==="DOWN",mag:c.mag+"%"}})};
  var u=findU(n);if(u)return {n:n,co:u.co,ticker:u.ticker,called:u.called,resolves:u.resolves,timing:u.timing,st:"sealed",win:[],calls:[]};
  return null}
function pctOf(a,b){return b?Math.round(a/b*100):0}

/* ---------- time: the US market close (4:00 pm New York) ---------- */
var NYF=null;try{NYF=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"})}catch(e){}
function nyParts(t){var o={};if(!NYF){var d=new Date(t-4*36e5);return {y:d.getUTCFullYear(),mo:d.getUTCMonth()+1,d:d.getUTCDate(),h:d.getUTCHours(),mi:d.getUTCMinutes(),s:d.getUTCSeconds()}}
  NYF.formatToParts(new Date(t)).forEach(function(p){o[p.type]=+p.value});return {y:o.year,mo:o.month,d:o.day,h:o.hour%24,mi:o.minute,s:o.second}}
function nyOff(t){var p=nyParts(t);return (Date.UTC(p.y,p.mo-1,p.d,p.h,p.mi,p.s)-Math.floor(t/1000)*1000)/6e4}
function nyAt(y,mo,d,h,mi){var g=Date.UTC(y,mo-1,d,h,mi),t=g-nyOff(g)*6e4;return g-nyOff(t)*6e4}
function closeOn(date){return nyAt(date.getFullYear(),date.getMonth()+1,date.getDate(),16,0)}
function cdHTML(t,label){return '<div class="cd" role="timer" aria-label="'+esc(label)+'" data-cd="'+t+'">'+cdIn(t)+'</div>'}
function cdIn(t){var ms=Math.max(0,t-Date.now()),s=Math.floor(ms/1000),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60;
  function b(v,l){return '<span><b>'+(v<10?"0":"")+v+'</b><small>'+l+'</small></span>'}
  return (d?b(d,d===1?"day":"days"):"")+b(h,"hrs")+b(m,"min")+(d?"":b(x,"sec"))}
setInterval(function(){$$("[data-cd]").forEach(function(el){el.innerHTML=cdIn(+el.dataset.cd)})},1000);

/* ---------- saving files: a normal download on the real site; inside the claude.ai preview, the downloads capability
   (which does not take .ics, so the calendar says it works on the live site) ---------- */
var DL=null;try{if(window.claude&&claude.use)claude.use("downloads").then(function(d){DL=d}).catch(function(){})}catch(e){}
function inViewer(){return !!(window.claude&&claude.use)}
function save(blob,name){
  if(inViewer()){if(/\.ics$/.test(name))return Promise.reject({code:"ics_preview"});if(!DL)return Promise.reject({code:"unavailable"});return DL.save({filename:name,data:blob})}
  var a=document.createElement("a"),u=URL.createObjectURL(blob);a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){URL.revokeObjectURL(u);a.remove()},1500);return Promise.resolve({status:"saved"})}

/* ---------- the calendar: an .ics made here from PENDING and UPCOMING ---------- */
function icsEsc(s){return String(s).replace(/\\/g,"\\\\").replace(/;/g,"\\;").replace(/,/g,"\\,").replace(/\n/g,"\\n")}
function icsFold(l){var o=[],s=l;while(s.length>60){o.push(s.slice(0,60));s=" "+s.slice(60)}o.push(s);return o.join("\r\n")}
function ymd(d){return d.getFullYear()+String(d.getMonth()+1).padStart(2,"0")+String(d.getDate()).padStart(2,"0")}
function icsText(){var st=new Date().toISOString().replace(/[-:]/g,"").replace(/\.\d+/,""),L=["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//EZ//Earnings Zeason//EN","CALSCALE:GREGORIAN","METHOD:PUBLISH","X-WR-CALNAME:EZ rounds"];
  function ev(id,d,sum,desc){var e=new Date(d.getFullYear(),d.getMonth(),d.getDate()+1);
    L.push("BEGIN:VEVENT","UID:"+id+"@ez-rounds","DTSTAMP:"+st,"DTSTART;VALUE=DATE:"+ymd(d),"DTEND;VALUE=DATE:"+ymd(e),"SUMMARY:"+icsEsc(sum),"DESCRIPTION:"+icsEsc(desc),"TRANSP:TRANSPARENT","END:VEVENT")}
  PS.concat(US).sort(function(a,b){return a.n-b.n}).forEach(function(u){var c=mmdd(u.called),r=mmdd(u.resolves),t="EZ Round "+u.n+" · "+plainCo(u);
    if(c)ev("r"+u.n+"-calls",c,t+" calls filed","Four AIs file their calls on "+plainCo(u)+" before the report.");
    if(r)ev("r"+u.n+"-graded",r,t+" graded","Graded at the first market close after the report.")});
  L.push("END:VCALENDAR");return L.map(icsFold).join("\r\n")+"\r\n"}

/* ---------- the big names: the companies most people follow before and during earnings. Owner-editable:
   set BIG in ez-data.js to replace this list. Grouped for reading only; the page never shows the groups. ---------- */
var BIGS=((typeof BIG!=="undefined"&&BIG)||[
  /* banks and money */ "JPM","GS","MS","BAC","C","WFC","BLK","V","MA",
  /* pharma and health */ "LLY","NVO","JNJ","PFE","MRK","ABBV","AZN","NVS","AMGN","UNH",
  /* AI: chips, chip gear, servers and storage, worldwide */ "NVDA","TSM","TSMC","2330.TW","ASML","ASML.AS","AMD","AVGO","ARM","MU","INTC","QCOM","MRVL","SMCI","DELL","ANET","005930.KS","000660.KS","285A.T","8035.T","6857.T","2317.TW","STX","PLTR","ORCL",
  /* the Magnificent Seven */ "AAPL","MSFT","GOOGL","GOOG","AMZN","META","TSLA",
  /* names everyone knows */ "NFLX","COST","WMT","NKE","PEP","KO","MCD","DIS","GME"]).map(function(t){return String(t).toUpperCase()});
function isBig(t){return BIGS.indexOf(String(t||"").toUpperCase())>-1}
function tkBadge(t){if(CO_LOGOS[String(t||"").toUpperCase()])return coMark(t);var s=String(t||"").split(".")[0].slice(0,5);
  return '<span class="co-mark tkb'+(s.length>3?' l'+s.length:'')+'" aria-hidden="true">'+esc(s)+'</span>'}

/* ---------- rounds: one timeline of days. Done rounds above, what's next below; the page opens on the next day,
   in the middle of the screen. Done rounds (and rounds with calls in) are small cards that open the full card;
   scheduled rounds are compact tiles, two or three to a line. Big names: the same timeline, big names only. ---------- */
function dayOf(v){return mmdd(v.st==="sealed"?v.called:v.resolves)}
function dkey(d){return d?d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"):"9999"}
var DAYS=(function(){var m={};ALLN.forEach(function(n){var v=rv(n),d=dayOf(v),k=dkey(d);(m[k]=m[k]||{k:k,d:d,ns:[]}).ns.push(n)});
  return Object.keys(m).sort().map(function(k){var D=m[k];D.ns.sort(function(x,y){var bx=isBig(rv(x).ticker),by=isBig(rv(y).ticker);return (by-bx)||(x-y)});return D})})();
/* EXP: the build sets window.EZ_EXP for the experiments. "" = Season Live as is; "x1" = a Results tab (the films as a
   gallery) and Upcoming only for what's ahead; "x2" = X1 plus the call grid, the findings and the round list (below). */
var EXP=window.EZ_EXP||"";
/* X2 = X1 plus: every call as one square (Leaderboard), what the record shows (Leaderboard), the round list (Results). */
var X1=EXP==="x1"||EXP==="x2",X2=EXP==="x2";if(X2){document.documentElement.classList.add("x2");(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap";document.head.appendChild(l)})()}
var TODAYK=dkey(new Date()),RBIG=false,RF="all",UF="all",US="",RLOOK="brand";
function xsh(no,eb,title,sub,h1,id,side){var tag=h1?"h1":"h2";return '<div class="xsh'+(side?' wside':'')+'"><div class="xsh-t"><'+tag+(id?' id="'+id+'"':'')+(h1?' tabindex="-1"':'')+'><span class="no">'+no+'</span><span class="mk">'+title+'</span></'+tag+'>'+(sub?'<p>'+sub+'</p>':'')+'</div>'+(side||'')+'</div>'}
/* a company's colour (CO_LOGOS.c, from tools/fetch_logos.py) and the ink that reads on it */
function bcol(t){var L=CO_LOGOS[String(t||"").toUpperCase()];return L&&L.c||"#12131a"}
function onCol(h){var c=parseInt(h.slice(1),16),r=c>>16&255,g=c>>8&255,b=c&255;return (0.2126*r+0.7152*g+0.0722*b)>150?"#12131a":"#ffffff"}
function dayLabel(D){if(!D.d)return {w:"Later",m:"TBC"};return {w:D.k===TODAYK?"Today":D.d.toLocaleDateString("en-US",{weekday:"long"}),m:fmtDate((D.d.getMonth()+1)+"/"+D.d.getDate())}}
/* the next day: the first day from today that still has a round to come (else the last day) */
function nextK(days){var x=days.filter(function(D){return D.k>=TODAYK&&D.ns.some(function(n){return rv(n).st!=="graded"})})[0]||days.filter(function(D){return D.k>=TODAYK})[0]||days[days.length-1];return x?x.k:null}
/* a done round: the film still, then one line (round, star, company and ticker: the still already shows the name big),
   then the winner with its logo. A round with calls in shows the four calls instead. */
function rcard(n){var v=rv(n),src=findR(n)||findP(n),art,foot;
  if(v.st==="graded"){art=src.poster?'<img src="'+MEDIA+src.poster+'.jpg" alt="" loading="lazy" decoding="async">':'<span class="rcd-b">'+tkBadge(v.ticker)+'</span>';
    foot=v.win.length?'<small>Winner</small><span class="rcd-w">'+v.win.map(function(m){return logo(m)}).join("")+'<b>'+v.win.map(nm).join(" & ")+'</b></span>':'<span class="rcd-w"><span class="lg nob" aria-hidden="true">✗</span><b>No winner</b></span>'}
  else{art='<span class="rcd-b">'+tkBadge(v.ticker)+'<em>Calls are in</em></span>';
    foot='<span class="rcd-c">'+v.calls.map(function(c){return '<span>'+logo(c.m)+'<b class="'+(c.dn?'cd':'cu')+'">'+(c.dn?'▼':'▲')+esc(c.mag)+'</b></span>'}).join("")+'</span>'}
  var c=bcol(v.ticker);
  return '<li><a class="rcd '+v.st+'" style="--bc:'+c+';--bi:'+onCol(c)+'" href="#/round/'+n+'"><span class="rcd-a">'+art+'</span><span class="rcd-t"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+'</small><b>'+esc(v.co)+(hasTk(v)?' <span class="tk">('+esc(v.ticker)+')</span>':'')+'</b></span><span class="rcd-f">'+foot+'</span></a></li>'}
function rtile(n){var v=rv(n),c=bcol(v.ticker);
  return '<li><a class="rtl" style="--bc:'+c+';--bi:'+onCol(c)+'" data-tk="'+esc(String(v.ticker||"").split(".")[0])+'" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<span class="rt"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+'</small><b>'+esc(v.co)+'</b><span>'+(hasTk(v)?esc(v.ticker):'')+(v.resolves?(hasTk(v)?' · ':'')+'Result '+fmtDate(v.resolves):'')+'</span></span></a></li>'}
/* X2: a round whose calls are in, as a tile like the others (full row) with the four calls on the same line */
function rtileCalls(n){var v=rv(n),c=bcol(v.ticker);
  return '<li class="rtc-li"><a class="rtl rtc" style="--bc:'+c+';--bi:'+onCol(c)+'" data-tk="'+esc(String(v.ticker||"").split(".")[0])+'" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<span class="rt"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+' · <em class="rtc-in">Calls are in</em></small><b>'+esc(v.co)+'</b><span>'+(hasTk(v)?esc(v.ticker)+' · ':'')+'Result '+fmtDate(v.resolves)+'</span></span>'
    +'<span class="rtc-c">'+v.calls.map(function(x){return '<span>'+logo(x.m)+'<b>'+(x.dn?'▼':'▲')+esc(x.mag)+'</b></span>'}).join("")+'</span></a></li>'}
function upOk(n){return !X1||(inF(n,UF)&&(!US||secOfN(n)===US))}
function timeline(){var days=DAYS.map(function(D){return {k:D.k,d:D.d,ns:D.ns.filter(function(n){return (!RBIG||isBig(rv(n).ticker))&&(!EXP||rv(n).st!=="graded")&&upOk(n)})}}).filter(function(D){return D.ns.length}),nk=nextK(days);
  if(!days.length)return '<p class="empty">No rounds coming up in this filter.</p>';
  if(!days.length)return '<p class="empty">No big names yet.</p>';
  return days.map(function(D){var L=dayLabel(D),done=D.ns.filter(function(n){return rv(n).st!=="sealed"}),seal=D.ns.filter(function(n){return rv(n).st==="sealed"}),
      st=D.ns.every(function(n){return rv(n).st==="graded"})?'Graded':D.ns.some(function(n){return rv(n).st==="calls"})?'Calls are in':'Calls come in';
    return '<section class="rday'+(D.k===nk?' next':'')+(D.k<TODAYK?' past':'')+'" data-k="'+D.k+'" aria-label="'+esc(L.w+' '+L.m)+'"><div class="rdh"><h2>'+esc(L.m)+'</h2><span class="rdw">'+esc(L.w)+'</span>'+(D.k===nk?'<b class="nx">Next</b>':'')+'<span class="rds">'+st+' · '+D.ns.length+'</span></div>'+
      (X2?(D.ns.filter(function(n){return rv(n).st==="graded"}).length?'<ul class="rcds">'+D.ns.filter(function(n){return rv(n).st==="graded"}).map(rcard).join("")+'</ul>':'')+'<ul class="rtls">'+D.ns.filter(function(n){return rv(n).st==="calls"}).map(rtileCalls).join("")+seal.map(rtile).join("")+'</ul>'
        :(done.length?'<ul class="rcds">'+done.map(rcard).join("")+'</ul>':'')+(seal.length?'<ul class="rtls">'+seal.map(rtile).join("")+'</ul>':''))+'</section>'}).join("")}
function cchip(n){var v=rv(n),c=bcol(v.ticker),r;
  if(v.st==="graded")r='<span class="cc-r '+(v.a<0?'d':'u')+'">'+(v.a<0?'▼':'▲')+esc(v.out.replace(/^[+−-]/,""))+'</span>'+(v.win.length?v.win.map(function(m){return logo(m)}).join(""):'<span class="lg nob" aria-hidden="true">✗</span>');
  else if(v.st==="calls")r='<span class="cc-r p">Calls in</span>';
  else r='<span class="cc-r s">'+fmtDate(v.resolves)+'</span>';
  return '<li><a class="cch '+v.st+'" style="--bc:'+c+'" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<b>'+esc(v.co)+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+'</b>'+r+'</a></li>'}
function compactList(){var days=DAYS.map(function(D){return {k:D.k,d:D.d,ns:RBIG?D.ns.filter(function(n){return isBig(rv(n).ticker)}):D.ns}}).filter(function(D){return D.ns.length}),nk=nextK(days);
  if(!days.length)return '<p class="empty">No big names yet.</p>';
  return '<div class="cpt">'+days.map(function(D){var L=dayLabel(D);
    return '<section class="rday cday'+(D.k===nk?' next':'')+(D.k<TODAYK?' past':'')+'" data-k="'+D.k+'" aria-label="'+esc(L.w+' '+L.m)+'"><div class="cd-d"><b>'+esc(L.m)+'</b><small>'+esc(L.w.slice(0,3))+'</small>'+(D.k===nk?'<i class="nx">Next</i>':'')+'</div><ul class="cd-l">'+D.ns.map(cchip).join("")+'</ul></section>'}).join("")+'</div>'}
function gtile(n){var v=rv(n),r=findR(n),c=bcol(v.ticker);
  return '<li><a class="gt" style="--bc:'+c+'" href="#/round/'+n+'"><span class="gt-a">'+(r&&r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy" decoding="async">':'<span class="gt-x">'+tkBadge(v.ticker)+'</span>')+
    (r&&r.film?'<video muted loop playsinline preload="none" data-f="'+r.film+'" aria-hidden="true"></video>':'')+
    '<span class="gt-mv '+(v.a<0?'d':'u')+'">'+(v.a<0?'▼':'▲')+esc(v.out.replace(/^[+−-]/,""))+'</span></span>'+
    '<span class="gt-b"><span class="gt-l"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+' ·</small> '+esc(v.co)+(hasTk(v)?' <span class="tk">('+esc(v.ticker)+')</span>':'')+'</span>'+
    '<span class="gt-w">'+(v.win.length?'<small>Winner</small>'+v.win.map(function(m){return logo(m)}).join("")+'<b>'+v.win.map(nm).join(" & ")+'</b>':'<span class="lg nob" aria-hidden="true">✗</span><b>No winner</b>')+'</span></span></a></li>'}
var SECT_SHORT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
function secOfN(n){return ((typeof RMETA!=="undefined"&&RMETA[n])||{}).sector||""}
function inF(n,f){var d=(typeof RMETA!=="undefined"&&RMETA[n])||{};return f==="mag7"?!!d.mag7:f==="ai"?(d.themes||[]).indexOf("AI")>-1:true}
function gallery(newest){var ns=ROUNDS.map(function(r){return r.n}).filter(function(n){return (!RBIG||isBig(rv(n).ticker))&&inF(n,RF)});if(newest)ns.reverse();
  if(ns.length)return '<ul class="gal">'+ns.map(gtile).join("")+'</ul>';
  /* nothing graded in this filter yet: say which one comes first */
  var nx=PENDING.concat(UPCOMING).filter(function(u){return inF(u.n,RF)}).sort(function(a,b){return a.n-b.n})[0];
  return '<p class="empty">'+(RF==="mag7"?'No Mag 7 round graded yet.':RF==="ai"?'No AI round graded yet.':'No big names yet.')+(nx?' First up: '+esc(nx.co)+', round '+nx.n+(nx.resolves?', result '+fmtDate(nx.resolves):nx.called?', calls '+fmtDate(nx.called):'')+'.':'')+'</p>'}
function wireGallery(root){if(!matchMedia("(hover:hover)").matches||reduce)return;
  root.addEventListener("mouseover",function(e){var a=e.target.closest&&e.target.closest(".gt");if(!a)return;var v=$("video",a);if(!v)return;
    if(!v.src)v.src=MEDIA+v.dataset.f+(v.canPlayType("video/webm")?".webm":".mp4");v.classList.add("on");var p=v.play();if(p&&p.catch)p.catch(function(){})});
  root.addEventListener("mouseout",function(e){var a=e.target.closest&&e.target.closest(".gt");if(!a||a.contains(e.relatedTarget))return;var v=$("video",a);if(v){v.pause();v.classList.remove("on")}})}
/* the shelf: rounds that hold a record, worked out from ROUNDS */
function RS(){return ROUNDS.filter(function(r){return !RBIG||isBig(r.ticker)})}
function shelf(){if(X2)return shelfX2();var RR=ROUNDS;if(!RR.length)return '';var calls=[];RR.forEach(function(r){r.calls.forEach(function(c){calls.push({m:c[0],r:r,off:parseFloat(c[2])})})});
  function avgOff(r){var o=r.calls.map(function(c){return parseFloat(c[2])});return o.reduce(function(a,b){return a+b},0)/o.length}
  function dirWord(r){return r.a>0?"rose":"fell"}
  var close=calls.slice().sort(function(a,b){return a.off-b.off})[0];
  var tight=RR.map(function(r){return {r:r,v:avgOff(r)}}).sort(function(a,b){return a.v-b.v})[0];
  var big=RR.slice().sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)})[0];
  var none=RR.filter(function(r){return !r.win}),used=[close.r,tight.r,big];
  var wrong=none.filter(function(r){return used.indexOf(r)<0}).sort(function(a,b){return avgOff(b)-avgOff(a)})[0]||none[none.length-1];
  function allSame(r){var d=r.calls.map(function(c){return /^DOWN/.test(c[1])});return d.every(function(x){return x===d[0]})?(d[0]?"down":"up"):null}
  function story(r){var w=r.calls.filter(function(c){return !callOk(r,c)}).length,same=allSame(r);
    return w===r.calls.length?(same?"Every AI called it "+same+".":"Every AI got the direction wrong."):w?w+" of "+r.calls.length+" called it the wrong way.":"All "+r.calls.length+" called the direction right."}
  var avgAll=calls.reduce(function(a,c){return a+c.off},0)/calls.length,
      avgRnd=RR.reduce(function(a,r){return a+avgOff(r)},0)/RR.length,
      avgMv=RR.reduce(function(a,r){return a+Math.abs(r.a)},0)/RR.length;
  function x(v){return v>=10?Math.round(v)+"x":v.toFixed(1).replace(/\.0$/,"")+"x"}
  function verb(dn){return dn?"fall":"rise"}
  /* a card: what it is (big), then one short paragraph that tells the story; watch, top right */
  function f(kick,r,text,big){if(X2)return '<li><a class="hfx" href="#/round/'+r.n+'" style="--bc:'+bcol(r.ticker)+'" aria-label="'+kick+': open round '+r.n+', '+esc(r.co)+'"><span class="hfx-a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy">':'')+'<b class="hfx-big">'+big+'</b>'+(r.film?'<i class="hfx-w" aria-hidden="true">▶</i>':'')+'</span><span class="hfx-t"><span class="hfx-k">'+kick+'</span><span class="hfx-p">'+text+'</span></span></a></li>';
    return '<li><a class="hcd" href="#/round/'+r.n+'" style="--bc:'+bcol(r.ticker)+'" aria-label="'+kick+': open round '+r.n+', '+esc(r.co)+'"><span class="hcd-t"><span class="hcd-k">'+kick+'</span><i class="hcd-w" aria-hidden="true">'+(r.film?'▶':'→')+'</i></span><span class="hcd-p">'+text+'</span></a></li>'}
  var cs=said(close.r,close.m),cdn=/^down/.test(cs),same=wrong?allSame(wrong):null,others=wrong?none.filter(function(r){return r!==wrong}).map(function(r){return esc(r.co)}):[];
  function and(a){return a.length<2?a.join(""):a.slice(0,-1).join(", ")+" and "+a[a.length-1]}
  return '<ul class="'+(X2?'hfxs':'hcl')+'">'+
    f("Closest call",close.r,nm(close.m)+' said '+esc(close.r.co)+' would '+verb(cdn)+' '+cs.replace(/^\w+\s*/,"")+' after its earnings. It '+dirWord(close.r)+' '+close.r.out.replace(/^[+−-]/,"")+'. Nobody has come closer: <b>'+close.off.toFixed(2)+' points from perfect</b>, '+x(avgAll/close.off)+' closer than the average call.',close.off.toFixed(2)+'<small>pts off</small>')+
    f("Tightest race",tight.r,esc(tight.r.co)+' '+dirWord(tight.r)+' '+tight.r.out.replace(/^[+−-]/,"")+'. All '+tight.r.calls.length+' AIs landed <b>'+tight.v.toFixed(2)+' points off on average</b>, their best round together. A usual round is '+avgRnd.toFixed(1)+'. '+story(tight.r),tight.v.toFixed(2)+'<small>pts avg</small>')+
    f("Biggest move",big,esc(big.co)+' '+(big.a>0?'jumped':'dropped')+' <b>'+big.out.replace(/^[+−-]/,"")+'</b> after its earnings, '+x(Math.abs(big.a)/avgMv)+' the average move. '+story(big),(big.a>0?'▲':'▼')+Math.abs(big.a)+'%')+
    (wrong?f("Everyone was wrong",wrong,(same?'Every AI said '+esc(wrong.co)+' would '+(same==="down"?'fall':'rise')+'. It '+dirWord(wrong)+' <b>'+wrong.out.replace(/^[+−-]/,"")+'</b>.':'Nobody got '+esc(wrong.co)+' right. It '+dirWord(wrong)+' <b>'+wrong.out.replace(/^[+−-]/,"")+'</b>.')+
      ' '+none.length+' of '+RR.length+' rounds had no winner'+(others.length?', with '+and(others):'')+'.','0<small>of '+wrong.calls.length+' right</small>'):'')+'</ul>'}
/* X2 highlights: the film on top with what kind of moment it is; then the moment in one plain, slightly cheeky
   sentence; then what happened; then the receipts (the numbers, each with what it means). */
function shelfX2(){var RR=ROUNDS;if(!RR.length)return '';var calls=[];RR.forEach(function(r){r.calls.forEach(function(c){calls.push({m:c[0],r:r,off:parseFloat(c[2])})})});
  function avgOff(r){var o=r.calls.map(function(c){return parseFloat(c[2])});return o.reduce(function(a,b){return a+b},0)/o.length}
  function mv(r){return (r.a>0?'▲ ':'▼ ')+String(r.out).replace(/^[+−-]/,"")}
  function x(v){return v>=10?Math.round(v)+"x":v.toFixed(1).replace(/\.0$/,"")+"x"}
  var close=calls.slice().sort(function(a,b){return a.off-b.off})[0],tight=RR.map(function(r){return {r:r,v:avgOff(r)}}).sort(function(a,b){return a.v-b.v})[0],
      big=RR.slice().sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)})[0],none=RR.filter(function(r){return !r.win}),used=[close.r,tight.r,big];
  var wrong=none.filter(function(r){return used.indexOf(r)<0}).sort(function(a,b){return avgOff(b)-avgOff(a)})[0]||none[none.length-1];
  var avgAll=calls.reduce(function(a,c){return a+c.off},0)/calls.length,avgRnd=RR.reduce(function(a,r){return a+avgOff(r)},0)/RR.length,avgMv=RR.reduce(function(a,r){return a+Math.abs(r.a)},0)/RR.length;
  function dirs(r){var d=r.calls.map(function(c){return isDn(c)});return d.every(function(v){return v===d[0]})?(d[0]?"down":"up"):null}
  function card(kick,r,head,body,rec){return '<li><a class="hx2" href="#/round/'+r.n+'" style="--bc:'+bcol(r.ticker)+'" aria-label="'+kick+': open round '+r.n+', '+esc(r.co)+'">'+
    '<span class="hx2-a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy">':'')+'<span class="hx2-k">'+kick+'</span>'+(r.film?'<i class="hx2-w" aria-hidden="true">▶</i>':'')+'</span>'+
    '<span class="hx2-t"><span class="hx2-h">'+head+'</span><span class="hx2-p">'+body+'</span><span class="hx2-r">'+rec.map(function(q){return '<span><b>'+q[0]+'</b><small>'+q[1]+'</small></span>'}).join("")+'</span></span></a></li>'}
  var cc=callOf(close.r,close.m),out='<ul class="hx2s">';
  out+=card("Closest call",close.r,nm(close.m)+' basically read '+esc(close.r.co)+'\'s mind.','It called '+callAmt(cc)+'. '+esc(close.r.co)+' moved '+mv(close.r)+'.',
    [[close.off.toFixed(2)+' pts','off the real move'],[x(avgAll/close.off),'closer than a typical call']]);
  var td=dirs(tight.r);
  out+=card("Tightest race",tight.r,'All '+String(NUMW[tight.r.calls.length]||tight.r.calls.length).toLowerCase()+' AIs huddled around '+esc(tight.r.co)+'.',esc(tight.r.co)+' moved '+mv(tight.r)+'. Every call landed within a few points of it'+(td?', all calling '+td:'')+'.',
    [[tight.v.toFixed(2)+' pts','average miss that round'],[avgRnd.toFixed(1)+' pts','in a normal round']]);
  var bd=dirs(big);
  out+=card("Biggest move",big,esc(big.co)+(big.a>0?' went vertical.':' fell off a cliff.'),esc(big.co)+' moved '+mv(big)+' after earnings'+(bd&&(bd==="down")!==(big.a<0)?', and every AI called it '+bd+'. Ouch.':'.'),
    [[mv(big),'in one day'],[x(Math.abs(big.a)/avgMv),'a normal earnings move']]);
  if(wrong){var wd=dirs(wrong);
    out+=card("Everyone was wrong",wrong,esc(wrong.co)+' fooled all '+String(NUMW[wrong.calls.length]||wrong.calls.length).toLowerCase()+'.',(wd?'Every AI said '+(wd==="down"?'down':'up')+'. ':'')+esc(wrong.co)+' moved '+mv(wrong)+'. Nobody won the round.',
      [['0 of '+wrong.calls.length,'got the direction right'],[none.length+' of '+RR.length,'rounds with no winner']])}
  return out+'</ul>'}
function hero(){var RR=RS(),r=RR[RR.length-1];if(!r)return '';var v=rv(r.n);
  return '<a class="hero2" href="#/round/'+r.n+'" style="--bc:'+bcol(r.ticker)+'"><span class="h2a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="">':'')+(r.film&&!reduce?'<video muted loop playsinline autoplay preload="metadata" aria-hidden="true"'+(r.poster?' poster="'+MEDIA+r.poster+'.jpg"':'')+'><source src="'+MEDIA+r.film+'.webm" type="video/webm"><source src="'+MEDIA+r.film+'.mp4" type="video/mp4"></video>':'')+'</span>'+
    '<span class="h2t"><small>Latest result · '+fmtDate(r.resolves)+'</small><b>Round '+r.n+' · '+esc(r.co)+(hasTk(v)?' <span class="tk">('+esc(r.ticker)+')</span>':'')+'</b><span class="h2m '+(r.a<0?'d':'u')+'">'+(r.a<0?'▼':'▲')+esc(r.out.replace(/^[+−-]/,""))+'</span>'+
    '<span class="gt-w">'+(v.win.length?'<small>Winner</small>'+v.win.map(function(m){return logo(m)}).join("")+'<b>'+v.win.map(nm).join(" & ")+'</b>':'<span class="lg nob" aria-hidden="true">✗</span><b>No winner</b>')+'</span><span class="h2o">Open the card →</span></span></a>'}
/* Every round, X1: All, Mag 7, AI. Counts are graded rounds. */
function fSeg(){function c(f){return ROUNDS.filter(function(r){return inF(r.n,f)}).length}
  return '<div class="seg bseg" role="group" aria-label="Which rounds">'+[["all","All"],["mag7","Mag 7"],["ai","AI"]].map(function(x){return '<button type="button" data-rf="'+x[0]+'" aria-pressed="'+(RF===x[0])+'">'+x[1]+' <b>'+c(x[0])+'</b></button>'}).join("")+'</div>'}
function bigSeg(){var all=ROUNDS.length,bg=ROUNDS.filter(function(r){return isBig(r.ticker)}).length;
  return '<div class="seg bseg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All <b>'+all+'</b></button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names <b>'+bg+'</b></button></div>'}
function vResults(){RBIG=false;RF="all";return '<h1 tabindex="-1" class="sr">Results</h1><section class="xsec">'+xsh("01","","Highlights",X2?"The rounds CT would screenshot.":"The rounds worth knowing so far.")+shelf()+'</section>'+
  '<section class="xsec">'+xsh("02","","Every round",X2?"Every W, every L, every round where they all got rekt. Newest first. Tap one for the full card.":"Newest first. Tap a round for the full card.",false,"",fSeg())+'<div id="gal">'+(X2?roundList():gallery(true))+'</div></section>'}
function wireResults(root){root.addEventListener("click",function(e){var b=e.target.closest("[data-rf]");if(!b)return;RF=b.dataset.rf;$$("[data-rf]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});$("#gal",root).innerHTML=X2?roundList():gallery(true);if(X2)wireRlx(root)});wireGallery(root);if(X2)wireRlx(root)}
function body(){return RLOOK==="compact"?compactList():timeline()}
function vRounds(){var x=CONFIG.x?'<a href="'+esc(CONFIG.x)+'" target="_blank" rel="noopener">Follow on X</a>':'Follow on X (link at launch)';
  var up=ALLN.filter(function(n){return rv(n).st!=="graded"}),ub=up.filter(function(n){return isBig(rv(n).ticker)}).length;
  if(X1){RBIG=false;UF="all";US=""}
  return (X1?'<h1 tabindex="-1" class="sr">Upcoming rounds</h1>':
    '<div class="rhd"><h1 tabindex="-1">Upcoming</h1><div class="seg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All</button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names</button></div></div>')+
    (X1?upBar(up)+'<p class="rfoot ufn">The calls drop before each report. '+x+' to see them first.</p>':
    '<p class="rfoot">Every call goes out before the report. '+x+' to see them first. <span aria-hidden="true">·</span> <button type="button" class="lnk" id="icsB">Add the Zeason to your calendar</button> <span id="icsMsg" class="note" aria-live="polite"></span></p>')+
    (EXP?'':'<div class="look" role="group" aria-label="Preview a look (for review)"><small>Look</small><button type="button" data-look="brand" aria-pressed="'+(RLOOK==="brand")+'">Brand colours</button><button type="button" data-look="compact" aria-pressed="'+(RLOOK==="compact")+'">Compact</button></div>')+
    '<div id="rtl" class="rtline look-'+RLOOK+'">'+body()+'</div>'}
/* Upcoming filters (X1): a theme (All, Mag 7, AI) and a sector. Counts are rounds still to come. */
function upBar(up){function c(f){return up.filter(function(n){return inF(n,f)}).length}var sc={};up.forEach(function(n){var x=secOfN(n);if(x)sc[x]=(sc[x]||0)+1});
  var secs=Object.keys(sc).sort(function(a,b){return sc[b]-sc[a]});
  /* one bar: the three themes, then the sector menu in the same pill */
  return '<div class="ufb"><div class="ufc" role="group" aria-label="Filter the calendar">'+[["all","All"],["mag7","Mag 7"],["ai","AI"]].map(function(x){return '<button type="button" data-uf="'+x[0]+'" aria-pressed="'+(UF===x[0])+'">'+x[1]+'<b>'+c(x[0])+'</b></button>'}).join("")+
    '<label class="ufs'+(US?' on':'')+'"><span class="sr">Sector</span><select id="ufSec"><option value="">Sector</option>'+secs.map(function(x){return '<option value="'+esc(x)+'"'+(US===x?' selected':'')+'>'+esc(SECT_SHORT[x]||x)+' ('+sc[x]+')</option>'}).join("")+'</select></label></div></div>'}
/* put a day (the next one, or a shared round's day) in the middle of the screen */
function centerDay(root,k){var s=(k&&$('.rday[data-k="'+k+'"]',root))||$(".rday.next",root);if(!s)return;
  var y=s.getBoundingClientRect().top+scrollY-Math.max(120,innerHeight*.32);window.scrollTo(0,Math.max(0,y))}
function wireRounds(root){
  /* the title and the All / Big names switch stay under the top bar */
  function th(){var t=$(".top");if(t)document.documentElement.style.setProperty("--toph",t.offsetHeight+"px")}th();addEventListener("resize",th);
  $$("[data-big]",root).forEach(function(b){b.addEventListener("click",function(){RBIG=b.dataset.big==="1";$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    $("#rtl",root).innerHTML=body();centerDay(root)})});
  wireGallery(root);
  function refilter(){$("#rtl",root).innerHTML=body();var b=$(".ufb",root);if(b)window.scrollTo(0,Math.max(0,b.getBoundingClientRect().top+scrollY-(parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--toph"))||0)-8))}
  $$("[data-uf]",root).forEach(function(b){b.addEventListener("click",function(){UF=b.dataset.uf;$$("[data-uf]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});refilter()})});
  var us=$("#ufSec",root);if(us)us.addEventListener("change",function(){US=us.value;us.parentNode.classList.toggle("on",!!US);refilter()});
  $$("[data-look]",root).forEach(function(b){b.addEventListener("click",function(){RLOOK=b.dataset.look;$$("[data-look]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    var t=$("#rtl",root);t.className="rtline look-"+RLOOK;t.innerHTML=body();centerDay(root)})});
  wireCal(root)}
function wireCal(root){var b=$("#icsB",root);if(b)b.addEventListener("click",function(){var m=$("#icsMsg",root);
  save(new Blob([icsText()],{type:"text/calendar"}),"ez-rounds.ics").then(function(){m.textContent="Saved ez-rounds.ics."},
    function(e){m.textContent=e&&e.code==="ics_preview"?"Works on the live site.":e&&e.code==="declined"?"Not saved.":"Couldn't save here."})})}

/* ---------- a round opens as its card, over the page (the same flip card as the record). Close it and you are
   exactly where you were. Shared links (#/round/12) open the Rounds tab on that day with the card up. ---------- */
var RMOD=null,RMFROM=null;
function closeRound(){if(!RMOD)return;$$("video",RMOD).forEach(function(v){v.pause()});RMOD.remove();RMOD=null;document.body.classList.remove("rmod-on");if(RMFROM&&RMFROM.isConnected)RMFROM.focus({preventScroll:true});RMFROM=null}
function openRound(n,from){var v=rv(n);if(!v)return;closeRound();RMFROM=from||document.activeElement;
  var src=findR(n)||findP(n)||findU(n),html=v.st==="graded"?gradedCard(src,0):v.st==="calls"?pendingCard(src,0):sealedCard(src,0);
  var m=document.createElement("div");m.className="rmod";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label",plain(v));
  m.innerHTML='<div class="rmod-c"><button type="button" class="rmod-x" aria-label="Close">✕</button>'+html+'</div>';
  document.body.appendChild(m);RMOD=m;document.body.classList.add("rmod-on");
  var c=$(".card",m);c.classList.add("cur");setFaces(c,false);
  /* the card jumps out of whatever opened it (a round card, a tile, a dot), or pops in from the middle */
  var cc=$(".rmod-c",m);if(!reduce&&cc.animate){var fr=from&&from.getBoundingClientRect?from:null,ra=fr&&fr.getBoundingClientRect(),rb=cc.getBoundingClientRect();
    if(ra&&ra.width&&ra.bottom>0&&ra.top<innerHeight){var k=Math.max(.15,Math.min(1,ra.width/rb.width));
      cc.animate([{transform:"translate("+(ra.left+ra.width/2-rb.left-rb.width/2)+"px,"+(ra.top+ra.height/2-rb.top-rb.height/2)+"px) scale("+k+")",opacity:0},{opacity:1,offset:.35},{transform:"none",opacity:1}],{duration:720,easing:"cubic-bezier(.22,.61,.36,1)"})}
    else cc.animate([{transform:"scale(.9)",opacity:0},{transform:"none",opacity:1}],{duration:520,easing:"cubic-bezier(.22,.61,.36,1)"});
    m.animate([{opacity:0},{opacity:1}],{duration:420,easing:"ease-out"})}
  var vid=$("video",m);if(vid){vid.muted=true;vid.loop=true;vid.addEventListener("playing",function(){vid.classList.add("on")},{once:true});var pp=vid.play();if(pp&&pp.catch)pp.catch(function(){})}
  m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".rmod-x")){closeRound();return}
    var sb=e.target.closest(".shr");if(sb){e.stopPropagation();shareRound(sb);return}
    var sd=e.target.closest(".snd");if(sd){if(vid){vid.muted=!vid.muted;sd.innerHTML=vid.muted?SND_OFF:SND_ON;sd.setAttribute("aria-label",vid.muted?"Sound off":"Sound on")}return}
    if(e.target.closest("a"))return;if(c.dataset.k==="g"&&e.target.closest(".card")){flip(c)}});
  $(".rmod-x",m).focus({preventScroll:true})}
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&RMOD&&!shPop)closeRound()});
/* any link to a round opens it in place, wherever it is (leaderboard dots, best and worst calls, Up next) */
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest('a[href^="#/round/"]');if(!a||e.defaultPrevented||e.metaKey||e.ctrlKey)return;
  e.preventDefault();openRound(+a.getAttribute("href").split("/")[2],a)});
function shURL(n){return location.href.replace(/#.*$/,"")+"#/round/"+n}

/* ---------- leaderboard: the standings' own rows, with more columns. Hit rate first, then the average miss,
   then the return on the stake, the last five rounds, and wins (what the ranking is decided on) on the far right.
   Under it: the title race, head to head, and the season's records. Every number comes from ROUNDS. ---------- */
var GCROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V8l5 4 4-8 4 8 5-4v11z" fill="#ffc72c" stroke="#12131a" stroke-width="2" stroke-linejoin="round"/></svg>';
var CROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V8l5 4 4-8 4 8 5-4v11z" fill="#12131a"/></svg>';
function fbal(m){var o=FOLLOW.filter(function(f){return f.m===m})[0];return o?o.bal:null}
function formDots(C){return C.hist.slice(-5).map(function(h){var cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
  return '<a class="fd '+cls+'" href="#/round/'+h.n+'" title="Round '+h.n+': '+lab+'" aria-label="Round '+h.n+': '+lab+'">'+(h.win?CROWN:h.none?'':h.ok?'✓':'✗')+'</a>'}).join("")}
/* X2: the best direction record among AIs that have called at least half the rounds */
function lbBest(){var b=null,bv=-1;RK.forEach(function(k){var C=CAR[k];if(C.g<ROUNDS.length/2)return;var v=C.right/C.g;if(v>bv){bv=v;b=k}});return b}
function lbRow(m,i){var C=CAR[m],b=fbal(m),up=b!=null&&b>=STAKE;
  return '<li class="lbr pc'+(i?'':' lead')+(rkOf(m)===1&&C.won>0?' r1':'')+'" role="row">'+(i?'':'<span class="crown"><i aria-hidden="true">👑</i><span class="cw">Leads</span></span>')+(X2&&m===lbBest()?'<small class="pc-best">Most accurate</small>':'')+
    '<span class="rk" role="cell"><sup>#</sup>'+rkOf(m)+'</span>'+
    '<span class="lb-m" role="rowheader">'+logo(m)+'<span class="pc-t"><h3>'+(X1&&!X2?nm(m):'<a href="#/model/'+m.toLowerCase()+'">'+nm(m)+'</a>')+'</h3><small>'+esc(MODELS[m].ver||'')+'</small></span></span>'+
    '<span class="lb-c" role="cell"><b>'+(C.g?pctOf(C.right,C.g)+'%':'n/a')+'</b><small>'+C.right+' of '+C.g+'</small></span>'+
    '<span class="lb-c" role="cell"><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</b><small>points</small></span>'+
    '<span class="lb-c roi '+(b==null?'':up?'pu':'pd')+'" role="cell"><b>'+(b==null?'n/a':pctTxt(b))+'</b><small>'+(b==null?'':usd(b))+'</small></span>'+
    '<span class="lb-f" role="cell">'+formDots(C)+'</span>'+
    '<span class="lb-w pc-w" role="cell"><b>'+C.won+'</b><span>'+(C.won===1?'win':'wins')+'</span></span></li>'}
/* ---------- the stats: four ways to rank the AIs (wins, hit rate, average miss, ROI). A switch picks one and the card
   flips to it, like "Are they learning?". One row per AI: rank, a bar (longer is always better), the number, one line
   of detail. Every number is worked out from ROUNDS here. ---------- */
var RMET={
  wins:{t:"Wins",sub:"Rounds won. A shared round counts for each winner."},
  hit:{t:"Hit rate",sub:X2?"<b>How often were they right about the stock's direction?</b> Only up or down counts here, not the size.":"<b>How often did they call the direction right?</b> Only up or down counts here, not the size."},
  miss:{t:"Avg miss",sub:X2?"<b>How close did they get?</b> The bullseye is what the stock did. Each dot is one call. A red dot outside missed the direction. The closer to the bullseye, the better.":"<b>How close did they get?</b> Average points off the real move, smaller is better. The bullseye is what the stock did. Each dot is one call; red dots outside missed the direction."},
  roi:{t:"ROI",sub:"<b>What would "+usd(STAKE)+" be worth now?</b> All in on every call: buy on an up call, short on a down call. Simulated, before fees."}};
var RKEYS=X1?["hit","miss","roi","sector"]:["hit","miss","roi","wins"],RCUR="hit";
var UPS_N=ROUNDS.filter(function(r){return r.a>0}).length,AVG_MOVE=ROUNDS.length?ROUNDS.reduce(function(a,r){return a+Math.abs(r.a)},0)/ROUNDS.length:0;
RMET.sector={t:X2?"Sector":"By sector",sub:"<b>Where are they sharpest?</b> Right calls by sector. Small samples for now: the grid fills in as the Zeason goes on."};
RMET.bull={t:"Up or down",sub:"<b>Do they lean up or down?</b> Each AI's up and down calls, next to what the stocks really did."};
function statRows(k){return RK.map(function(m){var C=CAR[m],calls=C.hist.filter(function(h){return !h.none});
    var shared=ROUNDS.filter(function(r){var w=r.win?r.win.split(" & "):[];return w.length>1&&w.indexOf(m)>-1}).length,bestC=calls.slice().sort(function(a,b){return a.off-b.off})[0],b=fbal(m);
    if(k==="bull"||k==="bold"){var cs=ROUNDS.map(function(r){return callOf(r,m)}).filter(Boolean),ups=cs.filter(function(c){return !/^DOWN/.test(c[1])}).length,
        mags=cs.map(function(c){return Math.abs(parseFloat(String(c[1]).replace(/^\w+\s*/,"")))}).filter(function(x){return !isNaN(x)}),am=mags.length?mags.reduce(function(a,b){return a+b},0)/mags.length:0;
      return k==="bull"?{m:m,v:cs.length?ups/cs.length*100:0,up:ups,dn:cs.length-ups,txt:cs.length?Math.round(ups/cs.length*100)+"% up":"n/a",sub:ups+" up, "+(cs.length-ups)+" down"}:{m:m,v:am,txt:am.toFixed(1)+"%",sub:"over "+mags.length+" calls"}}
    if(k==="wins")return {m:m,v:C.won,txt:String(C.won),sub:C.won?(C.won-shared)+" outright"+(shared?", "+shared+" shared":""):"Not yet"};
    if(k==="hit")return {m:m,v:C.g?C.right/C.g*100:0,txt:C.g?pctOf(C.right,C.g)+"%":"n/a",sub:C.right+" of "+C.g+" calls"};
    if(k==="miss")return {m:m,v:C.avg,txt:C.avg==null?"n/a":C.avg.toFixed(2),sub:bestC?"Best: "+bestC.off.toFixed(2)+" on "+bestC.r.co:""};
    return {m:m,v:b==null?0:(b/STAKE-1)*100,txt:b==null?"n/a":pctTxt(b),sub:b==null?"":usd(b)}})
  .filter(function(x){return x.v!=null}).sort(function(a,b){return k==="miss"?a.v-b.v:b.v-a.v})}
function drawStats(face,k,anim){var box=$(".st-box",face);if(!box)return;box.classList.toggle("sgx",k==="sector");var R=statRows(k);
  /* X1, hit rate: the direction chart from "Are they learning?" (hit rate round by round, one line per AI) */
  if(k==="hit"&&X1&&window.EZLearn){box.innerHTML='<div class="lxv hx"></div>';EZLearn.together($(".hx",box),{pctOnly:true,noCoin:true,ver:true});return}
  /* X1, ROI: the balance over the rounds, like a trading app's portfolio chart. the stake at the start, one line per AI. */
  if(k==="roi"&&X1){var N=ROUNDS.length,F=R.map(function(x){var bal=STAKE,pts=[],st=null;
        ROUNDS.forEach(function(r,i){var c=callOf(r,x.m);if(!c)return;if(st==null){st=i;pts.push([i,bal])}bal*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;pts.push([i+1,bal])});return {m:x.m,pts:pts,bal:bal,x:x}}),
      vs=[].concat.apply([STAKE],F.map(function(f){return f.pts.map(function(p){return p[1]})})),lo=Math.min.apply(null,vs),hi=Math.max.apply(null,vs),pd=(hi-lo)*.1||STAKE*.05;lo-=pd;hi+=pd;
    function X(i){return i/N*100}function Y(v){return (hi-v)/(hi-lo)*100}
    box.innerHTML='<ol class="pnl-k">'+F.map(function(f,i){var up=f.bal>=STAKE;return '<li'+(i?'':' class="lead"')+'><span class="pk-r">'+(i+1)+'</span>'+logo(f.m)+'<b class="pk-n">'+nm(f.m)+'</b><strong>'+usd(f.bal)+'</strong><em class="'+(up?'pu':'pd')+'">'+(up?'▲ ':'▼ ')+pctTxt(f.bal).replace(/^[+−]/,"")+'</em></li>'}).join("")+'</ol>'+
      '<div class="pnl"><span class="pnl-z" style="top:'+Y(STAKE).toFixed(2)+'%"><small>Start '+usd(STAKE)+'</small></span>'+
      '<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'+F.slice().reverse().map(function(f){return '<path d="'+f.pts.map(function(p,j){return (j?"L":"M")+X(p[0]).toFixed(2)+","+Y(p[1]).toFixed(2)}).join("")+'" style="stroke:'+MODELS[f.m].c+'"/>'}).join("")+'</svg>'+
      F.map(function(f){var p=f.pts[f.pts.length-1];return '<i class="pnl-d" style="left:'+X(p[0]).toFixed(2)+'%;top:'+Y(p[1]).toFixed(2)+'%;background:'+MODELS[f.m].c+'"></i>'}).join("")+
      '<span class="pnl-x"><small>R1</small><small>R'+N+'</small></span></div>';
    if(anim&&!reduce)box.querySelector(".pnl").classList.add("draw");return}
  /* X1, by sector: each AI's right calls in each sector, as "right of calls". Sectors come from the sheet's details. */
  if(k==="sector"){var SH=SECT_SHORT;
    var secOf=function(r){return ((typeof RMETA!=="undefined"&&RMETA[r.n])||{}).sector||""},cnt={};ROUNDS.forEach(function(r){var x=secOf(r);if(x)cnt[x]=(cnt[x]||0)+1});
    var cols=Object.keys(cnt).sort(function(a,b){return cnt[b]-cnt[a]});
    if(!cols.length){box.innerHTML='<p class="empty">No sectors in the sheet yet.</p>';return}
    var rows=RK.filter(function(m){return CAR[m]&&CAR[m].g});
    function cell(m,sec){var rs=ROUNDS.filter(function(r){return secOf(r)===sec}),n=0,ok=0;rs.forEach(function(r){var c=callOf(r,m);if(c){n++;if(callOk(r,c))ok++}});
      if(!n)return '<span class="sgr-c none" role="cell">–</span>';var q=ok/n;
      return '<span class="sgr-c '+(q>=.67?'hi':q>=.34?'md':'lo')+'" role="cell" title="'+nm(m)+', '+esc(sec)+': '+ok+' of '+n+' right"><b>'+ok+'/'+n+'</b></span>'}
    box.innerHTML='<div class="sgr" role="table" aria-label="Right calls by sector" style="--cols:'+cols.length+';--rows:'+rows.length+'"><div class="sgr-r sgr-h" role="row"><span role="columnheader"></span>'+cols.map(function(c){return '<span role="columnheader"><b>'+esc(SH[c]||c)+'</b><small>'+cnt[c]+' round'+(cnt[c]>1?'s':'')+'</small></span>'}).join("")+'</div>'+
      rows.map(function(m){return '<div class="sgr-r" role="row"><span class="st-who" role="rowheader">'+logo(m)+'<b>'+nm(m)+'</b></span>'+cols.map(function(c){return cell(m,c)}).join("")+'</div>'}).join("")+'</div>'+
      '<p class="sgr-k"><span><i class="hi"></i>2 of 3 or better</span><span><i class="md"></i>about half</span><span><i class="lo"></i>under a third</span></p>';
    if(anim&&!reduce)$$(".sgr-c",box).forEach(function(c,i){c.style.animationDelay=(i*30)+"ms";c.classList.add("pop")});return}
  /* X1, up or down: each AI's up calls (green) and down calls (red) in one bar, then what the stocks really did */
  if(k==="bull"){var rows=R.concat([{m:null,up:UPS_N,dn:ROUNDS.length-UPS_N}]);
    box.innerHTML='<ol class="udl">'+rows.map(function(x){var t=x.up+x.dn||1;
      return '<li class="udr'+(x.m?'':' mkt')+'"><span class="st-who">'+(x.m?logo(x.m)+'<b>'+nm(x.m)+'</b>':'<b>The stocks</b>')+'</span><span class="udb"><i class="pu" style="--w:'+(x.up/t*100).toFixed(1)+'%">'+(x.up?'▲ '+x.up:'')+'</i><i class="pd" style="--w:'+(x.dn/t*100).toFixed(1)+'%">'+(x.dn?'▼ '+x.dn:'')+'</i></span><span class="st-v"><b>'+Math.round(x.up/t*100)+'%</b><small>said up</small></span></li>'}).join("")+'</ol>';
    var mk=$(".udr.mkt small",box);if(mk)mk.textContent="went up";
    var ub=$$(".udb i",box);if(anim&&!reduce){ub.forEach(function(b){b.style.flexBasis="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){ub.forEach(function(b){b.style.flexBasis=""})})})}return}
  /* hit rate: bars (longer is better) */
  if(k==="hit"){box.innerHTML='<ol class="sxl">'+R.map(function(x,i){
      return '<li class="sxr'+(i?'':' lead')+'"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="sb"><i style="--w:'+x.v.toFixed(1)+'%;background:'+MODELS[x.m].c+'"></i></span><span class="st-v"><b>'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
    var bars=$$(".sb i",box);if(anim&&!reduce){bars.forEach(function(b){b.style.width="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){bars.forEach(function(b,i){b.style.transitionDelay=(i*90)+"ms";b.style.width=""})})})}return}
  /* avg miss: the bullseye, with the averages ranked above it */
  if(k==="miss"&&X1){box.classList.add("cmp");box.innerHTML='<div class="tgv mxt"></div>';targets($(".mxt",box),R.map(function(x){return x.m}));
    var gr=$(".tg-grid",box);R.forEach(function(x,i){var f=$('.tg[data-m="'+x.m+'"]',gr);if(!f)return;gr.appendChild(f);if(!i)f.classList.add("lead");
      $(".tg-h",f).insertAdjacentHTML("afterbegin",'<span class="tg-r">'+(i+1)+'</span>');$(".tg-h",f).insertAdjacentHTML("beforeend",'<strong>'+x.txt+'<small> pts</small></strong>')});return}
  if(k==="miss"){box.classList.remove("cmp");box.innerHTML='<ol class="mxr">'+R.map(function(x,i){return '<li'+(i?'':' class="lead"')+'><span>'+(i+1)+'</span>'+logo(x.m)+'<b>'+nm(x.m)+'</b><strong>'+x.txt+'</strong><small>pts</small></li>'}).join("")+'</ol><div class="tgv mxt"></div>';
    targets($(".mxt",box),R.map(function(x){return x.m}));return}
  /* ROI: columns up or down from the stake line */
  if(k==="roi"){var mx=Math.max.apply(null,R.map(function(x){return Math.abs(x.v)}))||1;
    box.innerHTML='<div class="rcol">'+R.map(function(x,i){var h=Math.abs(x.v)/mx*100,up=x.v>=0;
      return '<div class="rcx'+(i?'':' lead')+'"><div class="rc-up">'+(up?'<span class="rc-l pu">'+x.txt+'</span><i class="pu" style="--h:'+h.toFixed(1)+'%"></i>':'')+'</div><div class="rc-dn">'+(up?'':'<i class="pd" style="--h:'+h.toFixed(1)+'%"></i><span class="rc-l pd">'+x.txt+'</span>')+'</div>'+
        '<div class="rc-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b><small>'+esc(x.sub)+'</small></div></div>'}).join("")+'<span class="rc-base">'+usd(STAKE)+'</span></div>';
    var cols=$$(".rcol i",box);if(anim&&!reduce){cols.forEach(function(c){c.style.height="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){cols.forEach(function(c,i){c.style.transitionDelay=(i*110)+"ms";c.style.height=""})})})}return}
  /* wins: a crown per round won; a shared win is a half crown. Each crown opens its round. */
  box.innerHTML='<ol class="sxl">'+R.map(function(x,i){var won=ROUNDS.filter(function(r){return r.win&&r.win.split(" & ").indexOf(x.m)>-1});
      return '<li class="sxr wr'+(i?'':' lead')+'"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="crs">'+(won.length?won.map(function(r,j){var sh=r.win.indexOf(" & ")>-1;
        return '<a class="cr'+(sh?' crh':'')+'" style="--d:'+(j*80)+'ms" href="#/round/'+r.n+'" title="Round '+r.n+', '+esc(r.co)+(sh?' (shared)':'')+'" aria-label="Round '+r.n+' '+esc(r.co)+(sh?', shared':'')+'">'+CROWN+'</a>'}).join(""):'<span class="cr0">No wins yet</span>')+'</span><span class="st-v"><b>'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
  if(anim&&!reduce)$$(".cr",box).forEach(function(c){c.classList.add("pop")})}
function statsHTML(){return '<section class="blk" aria-labelledby="stH">'+(X1?xsh(X2?"03":"02","The stats","Stats",X2?"Pick a stat. No vibes, just numbers.":"Pick a measure. The card flips to it.",false,"stH"):'<div class="hh"><h2 id="stH">The stats</h2></div>')+
  '<div class="lsw rsw'+(X2?' rsw2':'')+'" role="group" aria-label="Rank the AIs by">'+RKEYS.map(function(k){return '<button type="button" data-rk="'+k+'" aria-pressed="'+(k===RCUR)+'">'+(X1?'<i class="skd" aria-hidden="true"></i>':'')+RMET[k].t+'</button>'}).join("")+'</div>'+
  '<div class="rflip sflip'+(X1?' sx1':'')+(X2?' sx2':'')+'" id="rflip"><div class="rf-in">'+[0,1].map(function(i){return '<div class="rf-face'+(i?' back':'')+'"'+(i?' aria-hidden="true"':'')+'><div class="st-box"></div><p class="rf-sub"></p></div>'}).join("")+'</div></div></section>'}
function wireStats(root){var fl=$("#rflip",root);if(!fl)return;var faces=$$(".rf-face",fl),front=0,seen=false;
  function fill(i,k,anim){faces[i].dataset.k=k;$(".rf-sub",faces[i]).innerHTML=RMET[k].sub;drawStats(faces[i],k,anim)}
  fill(0,RCUR,false);
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen){seen=true;io.disconnect();fill(front,RCUR,true)}})},{threshold:.4});io.observe(fl)}
  $$("[data-rk]",root).forEach(function(b){b.addEventListener("click",function(){var k=b.dataset.rk;if(k===RCUR)return;RCUR=k;
    $$("[data-rk]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    var nx=1-front;fill(nx,k,false);fl.classList.toggle("flipped",nx===1);faces[front].setAttribute("aria-hidden","true");faces[nx].removeAttribute("aria-hidden");front=nx;
    var old=faces[1-front];setTimeout(function(){fill(front,k,true)},reduce?0:380);
    /* empty the side now facing away, so the card takes the height of the side you see */
    setTimeout(function(){if(faces[1-front]===old){$(".st-box",old).innerHTML="";$(".rf-sub",old).textContent=""}},reduce?0:760)})})}

/* ---------- season records: the record book, written like a sports page. A kicker, a one-line headline, then the
   logo and the number. Each opens its round. Headlines are built from the data, so they stay true. ---------- */
function listCo(rs){var c=rs.map(function(r){return r.co});return c.length<2?c.join(""):c.slice(0,-1).join(", ")+" and "+c[c.length-1]}
var RECS=[];
function said(r,m){var c=callOf(r,m);if(!c)return "";return (/^DOWN/.test(c[1])?"down ":"up ")+String(c[1]).replace(/^\w+\s*/,"")}
function records(){var all=[];ROUNDS.forEach(function(r){r.calls.forEach(function(c){all.push({m:c[0],r:r,off:parseFloat(c[2]),ok:callOk(r,c)})})});
  if(!all.length)return '';
  var best=all.slice().sort(function(a,b){return a.off-b.off})[0],worst=all.slice().sort(function(a,b){return b.off-a.off})[0];
  /* the longest run of rounds where f holds, for each AI; a round with no call breaks a win run, not a direction run */
  function run(m,f,breakOnNone){var cur=[],bestR=[];ROUNDS.forEach(function(r){var c=callOf(r,m);
      if(c&&f(r,c)){cur.push(r);if(cur.length>bestR.length)bestR=cur.slice()}else if(c||breakOnNone)cur=[]});return {m:m,rs:bestR}}
  function winF(r,c){return r.win&&r.win.split(" & ").indexOf(c[0])>-1}
  var wr=RK.map(function(m){return run(m,winF,true)}).sort(function(a,b){return b.rs.length-a.rs.length})[0],
      rr=RK.map(function(m){return run(m,function(r,c){return callOk(r,c)},false)}).sort(function(a,b){return b.rs.length-a.rs.length})[0];
  function word(k){return ["","one","two","three","four","five","six","seven","eight","nine","ten"][k]||String(k)}
  function cos(rs){return rs.map(function(r){return r.co}).join(", ")}
  RECS=[];
  function tile(kick,head,m,big,unit,n,rs,why,sub,more){var r=findR(n),bg=r&&r.poster?' style="--bg:url(\''+MEDIA+r.poster+'.jpg\')"':'';
    if(X1){RECS.push(Object.assign({kick:kick,head:head,m:m,big:big,unit:unit,rs:rs||[r],why:why||""},more||{}));
      var rk={"Longest winning streak":["rk-win","👑"],"Closest call":["rk-close","🎯"],"Biggest miss":["rk-miss","💥"],"Longest hit streak":["rk-hit","🔥"]}[kick]||["",""];
      return '<button type="button" class="hlt rec2 '+rk[0]+'" data-rec="'+(RECS.length-1)+'"><span class="hl-wm" aria-hidden="true">'+big+'</span><span class="hl-k">'+(rk[1]?'<i class="hl-ic" aria-hidden="true">'+rk[1]+'</i>':'')+kick+'</span>'+(sub?'<span class="hl-s">'+sub+'</span>':'')+'<span class="hl-h">'+esc(head)+'</span><span class="hl-hold"><small>Record holder</small>'+logo(m)+'<b>'+nm(m)+'</b><strong>'+big+'</strong><i>'+unit+'</i></span></button>'}
    return '<a class="hlt"'+bg+' href="#/round/'+n+'"><span class="hl-k">'+kick+'</span><span class="hl-v">'+logo(m)+'<b>'+big+'</b><i>'+unit+'</i></span><span class="hl-h">'+esc(head)+'</span><span class="hl-r">Round '+n+(r?' · '+fmtDate(r.resolves):'')+' <span aria-hidden="true">→</span></span></a>'}
  var LAST=ROUNDS[ROUNDS.length-1],NEXTN=LAST?LAST.n+1:1;
  function fx(rs){var d=rs.map(function(r){return r.resolves}).sort(),a=d[0],b=d[d.length-1];return [["Rounds",rs.map(function(r){return "R"+r.n}).join(" ")],["Dates",fmtDate(a)+(b!==a?" to "+fmtDate(b):"")]]}
  /* a streak: who comes next, and whether it is still running or what broke it */
  function streakMore(lst,hold,f,breakOnNone,unitWord,goal){var nx=lst.filter(function(x){return x.m!==hold.m&&x.rs.length})[0],end=hold.rs[hold.rs.length-1],
      later=ROUNDS.filter(function(r){return r.n>end.n&&(breakOnNone||callOf(r,hold.m))}),brk=later[0],alive=!brk;
    var st=alive?"The run is still alive. "+goal+" in round "+NEXTN+" and it grows to "+(hold.rs.length+1)+".":
      "It ended in round "+brk.n+" on "+brk.co+": "+(callOf(brk,hold.m)?nm(hold.m)+" said "+said(brk,hold.m)+", it moved "+brk.out+(brk.win?" and "+brk.win.split(" & ").map(nm).join(" & ")+" took the round.":", no winner."):nm(hold.m)+" made no call.");
    return {facts:fx(hold.rs).concat([["Status",alive?"Still running":"Ended R"+brk.n]]),
      chase:nx&&nx.rs.length>1?"Next best: "+nm(nx.m)+" with "+nx.rs.length+" "+unitWord+(nx.rs.length===hold.rs.length?", level with the record.":"."):"Nobody else has strung two together yet.",story:st}}
  function callMore(c,sorted,worstWay){var nx=sorted.filter(function(x){return x.m!==c.m})[0];
    return {facts:[["Called",said(c.r,c.m)],["Moved",c.r.out],["Off by",c.off.toFixed(2)+" pts"]],
      chase:nx?(worstWay?"Next worst from the others: ":"Best of the rest: ")+nm(nx.m)+", "+nx.off.toFixed(2)+" off on "+nx.r.co+".":"",
      story:worstWay?"Nobody wants this one. It only changes hands if a call misses by more than "+c.off.toFixed(2)+" points.":"To take it, a call has to land within "+c.off.toFixed(2)+" points of the real move."}}
  var wl=RK.map(function(m){return run(m,winF,true)}).sort(function(a,b){return b.rs.length-a.rs.length}),
      rl=RK.map(function(m){return run(m,function(r,c){return callOk(r,c)},false)}).sort(function(a,b){return b.rs.length-a.rs.length});
  var out='';
  if(wr.rs.length>1)out+=tile(X1?"Longest winning streak":"Most wins in a row",wr.rs.length===2?nm(wr.m)+" goes back to back: "+cos(wr.rs):wr.rs.length===3?nm(wr.m)+" goes three for three: "+cos(wr.rs):nm(wr.m)+" is on a heater: "+word(wr.rs.length)+" straight",wr.m,wr.rs.length,"in a row",wr.rs[wr.rs.length-1].n,wr.rs,nm(wr.m)+" won "+word(wr.rs.length)+" rounds in a row. A win takes the right direction and the closest size of the four.",undefined,streakMore(wl,wr,winF,true,"in a row","Win"));
  out+=tile("Closest call",best.off<1?nm(best.m)+" basically front-ran "+best.r.co:nm(best.m)+" sniped "+best.r.co,best.m,best.off.toFixed(2),"pts off",best.r.n,[best.r],nm(best.m)+" called "+best.r.co+" "+said(best.r,best.m)+". It moved "+best.r.out+". Off by "+best.off.toFixed(2)+" points, the closest call so far.",undefined,callMore(best,all.slice().sort(function(a,b){return a.off-b.off}),false));
  out+=tile("Biggest miss",nm(worst.m)+" got rekt on "+worst.r.co,worst.m,worst.off.toFixed(2),"pts off",worst.r.n,[worst.r],nm(worst.m)+" called "+worst.r.co+" "+said(worst.r,worst.m)+". It moved "+worst.r.out+". Off by "+worst.off.toFixed(2)+" points, the furthest any call has landed.",undefined,callMore(worst,all.slice().sort(function(a,b){return b.off-a.off}),true));
  if(rr.rs.length>1&&!X2)out+=tile(X1?"Longest hit streak":"Most right calls in a row",rr.rs.length<4?nm(rr.m)+" can't miss: "+cos(rr.rs):nm(rr.m)+" calls the direction "+word(rr.rs.length)+" straight",rr.m,rr.rs.length,"in a row",rr.rs[rr.rs.length-1].n,rr.rs,nm(rr.m)+" called the direction right "+word(rr.rs.length)+" rounds running. A hit only needs up or down to be right, whatever the size.","Right direction, round after round",streakMore(rl,rr,null,false,"in a row","Call the direction right"));
  return out}
/* a record, opened: what happened, who holds it, and each round it took, small; a round opens its card */
var XMOD=null;
function closeRec(){if(XMOD){XMOD.remove();XMOD=null;document.body.classList.remove("rmod-on")}}
function openRec(i,from){var R=RECS[i];if(!R)return;closeRec();var LAST=ROUNDS[ROUNDS.length-1],k=0;function rvc(){return ' rv" style="--i:'+(k++)}
  var m=document.createElement("div");m.className="rmod";m.setAttribute("role","dialog");m.setAttribute("aria-modal","true");m.setAttribute("aria-label",R.kick);
  m.innerHTML='<article class="rxm rxn"><button type="button" class="rmod-x" aria-label="Close">✕</button>'+
    '<p class="rxn-mast'+rvc()+'"><b>The EZ record book</b><span>Updated after round '+(LAST?LAST.n:0)+'</span></p>'+
    '<small class="rxm-k'+rvc()+'">'+R.kick+'</small><h3 class="rxn-h'+rvc()+'">'+esc(R.head)+'</h3>'+
    '<p class="rxm-h'+rvc()+'">'+logo(R.m)+'<b>'+nm(R.m)+'</b><span>Record holder</span><strong>'+R.big+'</strong><i>'+R.unit+'</i></p>'+
    (R.facts?'<dl class="rxn-f'+rvc()+'">'+R.facts.map(function(f){return '<div><dt>'+f[0]+'</dt><dd>'+esc(f[1])+'</dd></div>'}).join("")+'</dl>':'')+
    '<div class="rxn-b'+rvc()+'"><p class="rxn-lede">'+esc(R.why)+'</p>'+(R.story?'<p>'+esc(R.story)+'</p>':'')+(R.chase?'<p class="rxn-ch"><span aria-hidden="true">▸</span> '+esc(R.chase)+'</p>':'')+'</div>'+
    '<h4 class="rxn-s'+rvc()+'">'+(R.rs.length>1?'The '+R.rs.length+' rounds':'The round')+'</h4>'+
    '<ol class="rxl">'+R.rs.map(function(r){var c=callOf(r,R.m),ok=c&&callOk(r,c),w=r.win&&r.win.split(" & ").indexOf(R.m)>-1;
      return '<li class="rv" style="--i:'+(k++)+'"><button type="button" class="rxt" data-n="'+r.n+'"><span class="rxt-a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy">':'')+'</span>'+
        '<span class="rxt-b"><small>Round '+r.n+'</small><b>'+esc(r.co)+'</b><span>Moved '+r.out+'</span><span class="rxt-c'+(w?' w':ok?' g':' r')+'">'+logo(R.m)+' '+esc(said(r,R.m))+(w?' · won':ok?' · right way':' · wrong way')+'</span></span></button></li>'}).join("")+'</ol></article>';
  document.body.appendChild(m);XMOD=m;document.body.classList.add("rmod-on");
  var box=$(".rxm",m);
  if(!reduce&&m.animate){m.animate([{opacity:0},{opacity:1}],{duration:320,easing:"ease-out"});
    /* it grows out of the tile you tapped, then the piece rolls out line by line */
    var a=from&&from.getBoundingClientRect?from.getBoundingClientRect():null,b=box.getBoundingClientRect();
    var t0=a&&a.width?'translate('+((a.left+a.width/2)-(b.left+b.width/2)).toFixed(0)+'px,'+((a.top+a.height/2)-(b.top+b.height/2)).toFixed(0)+'px) scale('+Math.max(.25,a.width/b.width).toFixed(3)+','+Math.max(.15,a.height/b.height).toFixed(3)+')':'translateY(24px) scale(.97)';
    box.animate([{transform:t0,opacity:.4,borderRadius:"18px"},{transform:"none",opacity:1}],{duration:620,easing:"cubic-bezier(.2,.8,.2,1)"});
    m.classList.add("roll")}
  m.addEventListener("click",function(e){if(e.target===m||e.target.closest(".rmod-x")){closeRec();if(from)from.focus({preventScroll:true});return}
    var t=e.target.closest(".rxt");if(t){var n=+t.dataset.n;closeRec();openRound(n,from)}});
  $(".rmod-x",m).focus({preventScroll:true})}
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&XMOD)closeRec()});
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-rec]");if(b)openRec(+b.dataset.rec,b)});
/* ---------- X2 ---------- */
function wonBy(r){return r.win?r.win.split(" & "):[]}
function isDn(c){return /^DOWN/.test(c[1])}
function callAmt(c){return (isDn(c)?"▼":"▲")+c[1].split(" ")[1]}
/* Every call, one square: a row per AI (standings order), a column per graded round (oldest left; the strip opens on the
   newest), the market's move along the bottom. Gold: won the round. Green: right way. Red: wrong way. Tap one for the round. */
function callGrid(){var R=ROUNDS;
  var h='<div class="cg-r cg-hd" role="row"><span class="cg-l" role="columnheader"><span class="sr">AI</span></span>'+R.map(function(r){
      return '<a class="cg-co" role="columnheader" href="#/round/'+r.n+'" title="Round '+r.n+' · '+esc(plainCo(r))+'">'+coMark(r.ticker)+'<small>R'+r.n+'</small></a>'}).join("")+'</div>';
  h=h.replace(/<\/div>$/,'<span class="cg-sh" role="columnheader">Wins<br>Right</span></div>');
  var tally={};RK.forEach(function(m){var t={n:0,ok:0,w:0};R.forEach(function(r){var c=callOf(r,m);if(!c)return;t.n++;if(isDn(c)===(r.a<0))t.ok++;if(wonBy(r).indexOf(m)>-1)t.w++});tally[m]=t});
  RK.forEach(function(m){var t=tally[m];h+='<div class="cg-r" role="row"><span class="cg-l" role="rowheader">'+logo(m)+'<b>'+nm(m)+'</b></span>'+R.map(function(r){var c=callOf(r,m);
      if(!c)return '<span class="cg-c n" role="cell" title="Round '+r.n+': '+nm(m)+' had not joined yet"><span class="sr">No call</span></span>';
      var ok=isDn(c)===(r.a<0),w=wonBy(r).indexOf(m)>-1,lab=w?"won the round":ok?"right way":"wrong way";
      return '<a class="cg-c '+(w?'w':ok?'g':'r')+'" role="cell" href="#/round/'+r.n+'" aria-label="Round '+r.n+', '+esc(plainCo(r))+': '+nm(m)+' called '+callAmt(c)+', '+lab+'">'+(w?GCROWN:'')+'<span>'+callAmt(c)+'</span></a>'}).join("")+'<span class="cg-sum" role="cell"><b>'+GCROWN+t.w+'</b><small>'+t.ok+'/'+t.n+'</small></span></div>'});
  h+='<div class="cg-r cg-mk" role="row"><span class="cg-l" role="rowheader"><b>Market</b></span>'+R.map(function(r){return '<span class="cg-m '+(r.a<0?'xd':'xu')+'" role="cell" title="Market '+r.out+'">'+(r.a<0?'▼':'▲')+Math.abs(r.a).toFixed(1)+'</span>'}).join("")+'<span class="cg-sum mk" role="cell"><small>▲'+R.filter(function(r){return r.a>0}).length+' ▼'+R.filter(function(r){return r.a<0}).length+'</small></span></div>';
  /* the takeaway: who collects the crowns, and who is wrong most often (at least FMIN calls) */
  var most=RK.slice().sort(function(a,b){return tally[b].w-tally[a].w})[0],elig=RK.filter(function(m){return tally[m].n>=FMIN}),
      worst=elig.slice().sort(function(a,b){return (tally[b].n-tally[b].ok)/tally[b].n-(tally[a].n-tally[a].ok)/tally[a].n})[0],
      take='<p class="cg-take"><b>'+nm(most)+' has the most crowns: '+tally[most].w+' of '+R.length+' rounds.</b>'+(worst&&worst!==most?' '+nm(worst)+' has the most red: wrong on '+(tally[worst].n-tally[worst].ok)+' of '+tally[worst].n+'.':'')+'</p>';
  return '<section class="blk xsec cgs" aria-labelledby="cgH">'+xsh("02","Every call","Every call, one square","Every call they ever made, on the record. Newest on the right. Tap a square for the full card.",false,"cgH")+take+
    '<div class="cg-wrap" tabindex="0" aria-label="Every call, scrolls sideways"><div class="cg" role="table" aria-label="Every call, one square" style="--n:'+R.length+'">'+h+'</div></div>'+
    '<p class="legend cg-k"><span><i class="foil"></i>Won the round</span><span><i class="k-g"></i>Right way</span><span><i class="k-r"></i>Wrong way</span><span><i style="background:var(--field)"></i>No call yet</span></p></section>'}
/* What the record shows: patterns in the calls so far, each with its sample size. A pattern only shows once it rests on
   at least FMIN cases. Small samples: they change with every round, and the page says so. */
var FMIN=5,NUMW=["zero","one","two","three","four","five","six","seven","eight","nine","ten"];
function findings(){var R=ROUNDS,cards=[];
  function pct(a,b){return b?a/b:0}
  function stat(v,l){return '<span><b>'+v+'</b><small>'+l+'</small></span>'}
  function card(k,head,expl,stats,base,cls,extra){return '<div class="fdg'+(cls?' '+cls:'')+'"><small class="fdg-k">'+k+'</small><h3>'+head+'</h3><p>'+expl+'</p>'+(extra||'')+'<div class="fdg-s">'+stats.join("")+'</div><span class="fdg-n">'+base+'</span></div>'}
  /* 1 when they all agree vs when they split */
  var ag={n:0,ok:0},sp={n:0,ok:0};
  R.forEach(function(r){var s=r.calls.reduce(function(t,c){return t+(isDn(c)?-1:1)},0);
    if(Math.abs(s)===r.calls.length){ag.n++;if((s>0)===(r.a>0))ag.ok++}else if(s!==0){sp.n++;if((s>0)===(r.a>0))sp.ok++}});
  if(ag.n>=FMIN){var a=pct(ag.ok,ag.n),b=pct(sp.ok,sp.n),P=PENDING[0],now="";
    if(P&&P.calls.length>1){var ps=P.calls.reduce(function(t,c){return t+(c.dir==="DOWN"?-1:1)},0);
      if(Math.abs(ps)===P.calls.length)now='<p class="fdg-now">Right now: all '+(NUMW[P.calls.length]||P.calls.length)+' say '+(ps>0?'up':'down')+' on '+esc(plainCo(P))+'.</p>'}
    cards.push(card("When they all agree",a<.5?"When they all agree, they're usually wrong":a===.5?"When they all agree, it's a coin flip":"When they all agree, they're usually right",
      (function(w){w=String(w);return w.charAt(0).toUpperCase()+w.slice(1)})(NUMW[ag.n]||ag.n)+' times, all four AIs picked the same direction. They were right only '+String(NUMW[ag.ok]||ag.ok).toLowerCase()+' times. '+(sp.n&&b>a?'When they argued, siding with the majority worked far better.':'Agreement means nothing here.'),
      [stat(ag.ok+' of '+ag.n,'times right when all four agreed')].concat(sp.n?[stat(sp.ok+' of '+sp.n,'times the majority was right when they split')]:[]),ag.n+sp.n+' rounds so far',now?'hot':'',now))}
  /* 2 up calls vs down calls, all AIs together */
  var up={n:0,ok:0},dn={n:0,ok:0};R.forEach(function(r){r.calls.forEach(function(c){var o=isDn(c)?dn:up;o.n++;if(isDn(c)===(r.a<0))o.ok++})});
  if(up.n>=FMIN&&dn.n>=FMIN){var u=pct(up.ok,up.n),d=pct(dn.ok,dn.n);
    cards.push(card("Up calls vs down calls",u-d>=.2?"Good at calling ups. Bad at calling downs.":d-u>=.2?"Better at calling drops than gains":"Up or down, the same hit rate",
      'When an AI says up, believe it'+(u>.5?'':' less')+'. When it says down, '+(d>.5?'it\'s usually right too':'it\'s usually wrong')+'.',
      [stat('▲ '+Math.round(u*10)+' in 10','"up" calls came true'),stat('▼ '+Math.round(d*10)+' in 10','"down" calls came true')],(up.n+dn.n)+' calls so far'))}
  /* 3 the size of the move: the AI whose average call is furthest from the average real move in its rounds */
  var sz=RK.map(function(m){var n=0,ca=0,ma=0;R.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;ca+=parseFloat(c[1].split(" ")[1]);ma+=Math.abs(r.a)});return n>=FMIN?{m:m,n:n,c:ca/n,a:ma/n}:null})
    .filter(Boolean).sort(function(x,y){return Math.abs(y.c-y.a)-Math.abs(x.c-x.a)})[0];
  if(sz&&Math.abs(sz.c-sz.a)>=.5)cards.push(card("How big",nm(sz.m)+(sz.c<sz.a?' plays it too safe':' swings too big'),
    nm(sz.m)+' keeps '+(sz.c<sz.a?'lowballing':'overhyping')+' how far a stock will run after earnings.',
    [stat(sz.c.toFixed(1)+'%','what it predicts, on average'),stat(sz.a.toFixed(1)+'%','what stocks actually move')],sz.n+' rounds so far'))
  /* 4 just for fun: betting against the AI with the lowest hit rate */
  var hr=RK.map(function(m){var n=0,ok=0;R.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;if(isDn(c)===(r.a<0))ok++});return n>=FMIN?{m:m,n:n,ok:ok}:null}).filter(Boolean);
  if(hr.length>1){var lo=hr.slice().sort(function(a,b){return a.ok/a.n-b.ok/b.n})[0],hi=hr.slice().sort(function(a,b){return b.ok/b.n-a.ok/a.n})[0],inv=lo.n-lo.ok;
    if(inv/lo.n>.5)cards.push(card("Just for fun",'Inverse '+nm(lo.m),'Betting against every '+nm(lo.m)+' call would have been right '+(NUMW[inv]||inv)+' times out of '+lo.n+'. '+(inv/lo.n>=hi.ok/hi.n?'That ties the best AI. ':'')+'It\'s a joke. '+nm(lo.m)+' has been informed.',
      [stat(inv+' of '+lo.n,'times the opposite of '+nm(lo.m)+' was right')],lo.n+' rounds so far','fun'))}
  if(!cards.length)return '';
  return '<section class="blk xsec fdgs" aria-labelledby="fdgH">'+xsh("04","Findings","Unusual findings","Weird patterns in the calls so far. Small samples, so these will flip as rounds come in. Not alpha. Not advice.",false,"fdgH")+
    '<div class="fdg-g">'+cards.join("")+'</div></section>'}
/* Results, X2: every round as one row. The calls with the winner in gold, the market's move, and a tag when nobody won. */
function roundList(){var ns=ROUNDS.filter(function(r){return inF(r.n,RF)}).slice().reverse();
  if(!ns.length)return '<p class="rfoot">No graded rounds here yet.</p>';
  return '<ol class="rlx">'+ns.map(function(r){var W=wonBy(r);
    var th=r.poster?'<span class="rlx-v" aria-hidden="true"><img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy">'+(r.film&&!reduce?'<video muted loop playsinline preload="none" poster="'+MEDIA+r.poster+'.jpg"><source src="'+MEDIA+r.film+'.webm" type="video/webm"><source src="'+MEDIA+r.film+'.mp4" type="video/mp4"></video>':'')+'<i>▶</i></span>':'';
    return '<li><a class="rlx-r'+(th?' hasv':'')+'" href="#/round/'+r.n+'" aria-label="Round '+r.n+', '+esc(plainCo(r))+': market '+r.out+', '+(W.length?W.map(nm).join(" and ")+' won':'no winner')+'">'
      +'<span class="rlx-t">'+coMark(r.ticker)+'<span><b>'+esc(plainCo(r))+'</b><small>Round '+r.n+' · '+fmtDate(r.resolves)+(W.length?'':' <em class="nw">No winner</em>')+'</small></span></span>'
      +'<span class="rlx-l"><span class="rlx-c">'+r.calls.map(function(c){var ok=isDn(c)===(r.a<0),w=W.indexOf(c[0])>-1;return '<span class="'+(w?'w':ok?'g':'r')+'">'+(w?GCROWN:'')+logo(c[0])+callAmt(c).replace("%",'<i class="pc">%</i>')+'</span>'}).join("")+'</span>'
      +'<b class="rlx-m '+(r.a<0?'xd':'xu')+'">'+(r.a<0?'▼':'▲')+Math.abs(r.a)+'%</b></span>'
      +th+'</a></li>'}).join("")+'</ol>'}
/* play the round films in the list only while they are on screen; nothing loads until a row is visible */
var RLX_IO=null;
function wireRlx(root){if(RLX_IO)RLX_IO.disconnect();if(reduce||!("IntersectionObserver" in window))return;
  /* only one film plays at a time: the visible one nearest the middle of the screen (keeps phone data light) */
  var vis=new Set(),cur=null;
  function pick(){var mid=innerHeight/2,best=null,bd=1e9;vis.forEach(function(v){var r=v.getBoundingClientRect(),d=Math.abs(r.top+r.height/2-mid);if(d<bd){bd=d;best=v}});
    if(best===cur)return;if(cur){cur.pause();cur.parentNode.classList.remove("on")}cur=best;if(cur){var p=cur.play();if(p&&p.catch)p.catch(function(){})}}
  RLX_IO=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)vis.add(e.target);else vis.delete(e.target)});pick()},{threshold:.6});
  $$(".rlx-v video",root).forEach(function(v){v.addEventListener("playing",function(){if(v===cur)v.parentNode.classList.add("on")});RLX_IO.observe(v)});
  var t;addEventListener("scroll",function(){clearTimeout(t);t=setTimeout(pick,120)},{passive:true})}
function vModels(){
  return (X1?xsh("01","Leaderboard",X2?"Current standings":"Current standings",X2?"Ranked by rounds won, then by the smaller average miss. Whoever is on top trades the pot. Tap an AI for every call it made.":"Ranked by rounds won, then by the smaller average miss.",true):'<h1 tabindex="-1">Current standings</h1><p class="sub">Ranked by rounds won, then by the smaller average miss. Tap an AI for every call it made.</p>')+
    '<div class="lbx" role="table" aria-label="Current standings"><div class="lbh" role="row"><span role="columnheader"><span class="sr">Rank</span></span><span role="columnheader"><span class="sr">AI</span></span><span role="columnheader">Hit rate</span><span role="columnheader"><span class="dt">Avg miss</span><span class="ph">Miss</span></span><span role="columnheader">ROI</span><span role="columnheader" class="lb-f">Last 5</span><span role="columnheader">Wins</span></div>'+
    '<ol class="lbl" role="rowgroup">'+RK.map(lbRow).join("")+'</ol></div>'+
    '<p class="lbn">'+(X2?'<b>A call</b>: up or down, plus how much, locked before the report. ':'')+'<b>Hit rate</b>: calls right on direction'+(X2?' (up or down), whatever the size':'')+'. <b>Avg miss</b>: points off the real move. <b>ROI</b>: '+usd(STAKE)+' rolled through every call. Simulated, before fees.</p>'+
    (X2?callGrid():'')+statsHTML()+(X2?findings()+'<section class="blk xsec" aria-labelledby="recH">'+xsh("05","Records","Hall of fame (and shame)","The three records that matter. Tap one for the story.",false,"recH")+'<div class="hls hls3">'+records()+'</div></section>':'')+
    (X2?'':'<section class="blk" aria-labelledby="recH">'+(X1?xsh("03","Highlights","Record book","Tap a record for the story behind it.",false,"recH"):'<div class="hh"><h2 id="recH">Highlights</h2></div>')+'<div class="hls">'+records()+'</div></section>')}
function wireModels(root){wireStats(root);var g=$(".cg-wrap",root);if(g)requestAnimationFrame(function(){g.scrollLeft=g.scrollWidth})}
function vModel(m){if(!CAR[m])return null;var C=CAR[m],calls=C.hist.filter(function(h){return !h.none});
  var okc=calls.filter(function(h){return h.ok}),best=okc.slice().sort(function(a,b){return a.off-b.off})[0],worst=calls.slice().sort(function(a,b){return b.off-a.off})[0];
  function callCard(h,lab){if(!h)return '<div class="box"><small>'+lab+'</small><b>Not yet</b><p>No right-way calls graded yet.</p></div>';var r=h.r,dn=/^DOWN/.test(h.said);
    return '<a class="box" href="#/round/'+r.n+'"><small>'+lab+'</small><b>R'+r.n+' · '+coTkn(r)+'</b><p>Called <strong>'+(dn?'down ':'up ')+esc(h.said.replace(/^\w+\s*/,""))+'</strong>. It moved <strong>'+r.out+'</strong>. '+(h.ok?'Right way, off by ':'Wrong way, off by ')+h.off.toFixed(2)+' points.</p></a>'}
  var st=C.streak?(C.streak.k+' '+(C.streak.ok?'right':'wrong')):'n/a';
  return '<nav class="mnav" aria-label="Models"><a class="back" href="#/leaderboard">← Leaderboard</a>'+RK.map(function(k){return '<a href="#/model/'+k.toLowerCase()+'"'+(k===m?' aria-current="page"':'')+'>'+logo(k)+nm(k)+'</a>'}).join("")+'</nav>'+
    '<div class="mh">'+logo(m)+'<div class="t"><span class="eb">#'+rkOf(m)+' on the leaderboard</span><h1 tabindex="-1" style="margin-top:8px">'+nm(m)+'</h1><p class="note">'+esc(MODELS[m].ver||'')+' · '+C.g+' graded call'+(C.g===1?'':'s')+' so far.</p></div></div>'+
    '<div class="tiles"><div><small>Wins</small><b>'+C.won+'</b><span>Rounds won outright or shared</span></div><div><small>Hit rate</small><b>'+pctOf(C.right,C.g)+'%</b><span>'+C.right+' of '+C.g+' calls</span></div><div><small>Average miss</small><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</b><span>Points from the real move</span></div>'+
      '<div><small>Current streak</small><b>'+esc(st)+'</b><span>Right or wrong way, in a row</span></div></div>'+
    '<section class="blk" aria-labelledby="hiH"><div class="hh"><h2 id="hiH">Every round</h2><p>One dot per round. Tap one to see the card.</p></div><ol class="strip">'+
      C.hist.map(function(h){var cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
        return '<li><a href="#/round/'+h.n+'" aria-label="Round '+h.n+': '+lab+'"><span class="dt '+cls+'" aria-hidden="true">'+(h.win?CROWN:h.none?'·':h.ok?'✓':'✗')+'</span><small aria-hidden="true">R'+h.n+'</small></a></li>'}).join("")+'</ol>'+
      '<p class="legend"><span><i style="background:var(--ez-gold)"></i>Won</span><span><i style="background:var(--ez-green)"></i>Right way</span><span><i style="background:var(--ez-red)"></i>Wrong way</span><span><i style="background:var(--card)"></i>No call</span></p></section>'+
    '<section class="blk" aria-labelledby="bwH"><div class="hh"><h2 id="bwH">Best and worst</h2></div><div class="bw">'+callCard(best,"Best call · smallest miss, right way")+callCard(worst,"Worst call · biggest miss")+'</div></section>'+
    '<section class="blk" aria-labelledby="tgH"><div class="hh"><h2 id="tgH">How close</h2></div><div class="tgv tg1" id="tg1"></div></section>'}
/* ---------- X2: the AI's profile. Built to be read in order: who it is (one sentence), how good it is next to the
   other three (bars, not lone numbers), its form (logos ringed by result), then every call as a small number line:
   ring = what it called, dot = what the stock did, the line between them = how far off. ---------- */
function vProfile(m){if(!CAR[m])return null;
  var C=CAR[m],calls=C.hist.filter(function(h){return !h.none}),N=RK.length,G=ROUNDS.length,FO=followAll();
  var bal=function(k){var f=FO.filter(function(x){return x.m===k})[0];return f?f.bal:STAKE};
  /* fair ranking: an AI with fewer than half the rounds called is shown but not ranked */
  var full=RK.filter(function(k){return CAR[k].g>=G/2});
  function place(k,val,better){if(full.indexOf(k)<0)return 0;var v=val(k);return 1+full.filter(function(j){return better(val(j),v)}).length}
  var hit=function(k){return CAR[k].g?CAR[k].right/CAR[k].g:0},miss=function(k){return CAR[k].avg==null?99:CAR[k].avg};
  var hR=place(m,hit,function(a,b){return a>b}),mR=place(m,miss,function(a,b){return a<b}),fR=place(m,bal,function(a,b){return a>b});
  var NW=["","one","two","three","four","five","six"][N]||N,rk=rkOf(m),nmM=nm(m),ord=["","first","second","third","fourth","fifth"];
  /* the headline: one sentence that steers what people remember (a chart's title drives recall), then the sample size */
  var me=full.indexOf(m)>-1,pos=rk===1?nmM+' leads with '+C.won+' '+(C.won===1?'win':'wins'):nmM+' is '+ord[rk]+' with '+C.won+' '+(C.won===1?'win':'wins'),tail='';
  if(me&&hR===1)tail=' and the best hit rate';
  else if(me&&mR===1)tail=' and the closest calls';
  else if(me&&hR===full.length)tail=', but the worst hit rate';
  else if(me&&mR===full.length)tail=', but misses by the most';
  else if(!me)tail=' from '+C.g+' calls since joining late';
  var verdictLine=pos+tail+'.';
  var sample=C.g+' calls so far, a small sample, so ranks can still swing.'+(C.streak?' Right now: '+C.streak.k+' '+(C.streak.ok?'right':'wrong')+' in a row.':'');
  var O2=['','1st','2nd','3rd','4th','5th','6th'];function rankTag(r){return r?'<em class="pf-tag">'+O2[r]+' place</em>':'<em class="pf-tag">not ranked yet</em>'}
  function bars(title,unit,val,fmt,better,sub){var el=function(k){return full.indexOf(k)>-1},L=RK.slice().sort(function(a,b){if(el(a)!==el(b))return el(a)?-1:1;return better(val(a),val(b))?-1:better(val(b),val(a))?1:0}),
      mx=Math.max.apply(null,RK.map(function(k){return Math.abs(val(k))}))||1;
    return '<div class="pf-cmp"><h3>'+title+'</h3><p>'+sub+'</p><ol>'+L.map(function(k){var me=k===m,v=val(k),w=Math.max(4,Math.abs(v)/mx*100);
      return '<li class="'+(me?'me':'')+'"><span class="pf-cn">'+logo(k)+nm(k)+(el(k)?'':'<em>'+CAR[k].g+' calls</em>')+'</span><span class="pf-cb"><i style="width:'+w.toFixed(1)+'%"></i></span><b>'+fmt(k,v)+'</b></li>'}).join("")+'</ol></div>'}
  var cmp='<section class="pf-sec" aria-labelledby="pfCH"><h2 id="pfCH">Against the other three</h2><div class="pf-cmps">'+
    bars("Right way","",hit,function(k){return CAR[k].right+'<span>/'+CAR[k].g+'</span>'},function(a,b){return a>b},"Calls that got up or down right. Longer is better.")+
    bars("Average miss","",function(k){return CAR[k].avg==null?0:CAR[k].avg},function(k,v){return v.toFixed(2)+'<span> pts</span>'},function(a,b){return a<b},"Points between its number and the real move. Shorter is better.")+
    bars(usd(STAKE)+" copied","",bal,function(k,v){return usd(v)},function(a,b){return a>b},"Following every call, all in. Simulated, before fees.")+'</div>'+(full.length<N?'<p class="pf-sub pf-note">'+RK.filter(function(k){return full.indexOf(k)<0}).map(nm).join(' and ')+' joined later, so '+(N-full.length===1?'it sits':'they sit')+' at the bottom until '+(N-full.length===1?'it has':'they have')+' called half the rounds.</p>':'')+'</section>';
  /* form: newest first */
  var form='<section class="pf-sec" aria-labelledby="pfFH"><h2 id="pfFH">Form</h2><p class="pf-sub">Newest first. Gold won the round, green got the direction right, red got it wrong.</p><ol class="pf-form">'+
    C.hist.slice().reverse().map(function(h){var r=ROUNDS.filter(function(x){return x.n===h.n})[0],cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
      return '<li><a href="#/round/'+h.n+'" class="'+cls+'" aria-label="Round '+h.n+', '+esc(r?r.co:'')+': '+lab+'"><span class="pf-fl">'+(r?coMark(r.ticker):'')+'</span>'+(h.win?'<span class="pf-fc">'+CROWN+'</span>':'')+'<small>'+esc(r?r.ticker.replace(/\..*$/,''):'R'+h.n)+'</small></a></li>'}).join("")+'</ol></section>';
  /* every call as a number line, on one shared scale */
  var M=5*Math.ceil(Math.max.apply(null,ROUNDS.map(function(r){return Math.max.apply(null,[Math.abs(r.a)].concat(r.calls.map(function(c){return Math.abs(parseFloat(String(c[1]).replace(/[^0-9.]/g,""))||0)})))}))/5);
  function sv(h){var v=parseFloat(String(h.said).replace(/[^0-9.]/g,""))||0;return /^DOWN/.test(h.said)?-v:v}
  function line(h,big){var W=400,H=big?64:46,y=big?32:23,X=function(v){return 14+(v+M)/(2*M)*(W-28)},cv=sv(h),av=h.r.a,cx=X(cv),ax=X(av),col=h.ok?'var(--up)':'var(--red)';
    var f=function(v){return (v>0?'+':v<0?'−':'')+Math.abs(v)+'%'};
    var lab1=Math.abs(cx-ax)<46&&cx<ax?'end':Math.abs(cx-ax)<46?'start':'middle',lab2=lab1==='end'?'start':lab1==='start'?'end':'middle';
    return '<svg class="pf-line" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Called '+f(cv)+', the stock did '+f(av)+'">'+
      '<rect x="'+X(0)+'" y="'+(y-9)+'" width="'+(W-14-X(0))+'" height="18" rx="3" fill="var(--up)" opacity=".06"/><rect x="14" y="'+(y-9)+'" width="'+(X(0)-14)+'" height="18" rx="3" fill="var(--red)" opacity=".06"/>'+
      '<line x1="14" x2="'+(W-14)+'" y1="'+y+'" y2="'+y+'" stroke="var(--ink)" stroke-opacity=".15" stroke-width="2"/>'+
      '<line x1="'+X(0)+'" x2="'+X(0)+'" y1="'+(y-11)+'" y2="'+(y+11)+'" stroke="var(--ink)" stroke-opacity=".35" stroke-width="1.5"/>'+
      '<line x1="'+cx+'" x2="'+ax+'" y1="'+y+'" y2="'+y+'" stroke="'+col+'" stroke-width="5" stroke-linecap="round" opacity=".55"/>'+
      '<circle cx="'+cx+'" cy="'+y+'" r="'+(big?8:6.5)+'" fill="var(--card)" stroke="var(--ink)" stroke-width="2.5"/>'+
      '<circle cx="'+ax+'" cy="'+y+'" r="'+(big?8:6.5)+'" fill="var(--ink)"/>'+
      '<text x="'+cx+'" y="'+(y-(big?14:11))+'" text-anchor="'+lab1+'" class="pf-tc">'+f(cv)+'</text>'+
      '<text x="'+ax+'" y="'+(y+(big?24:20))+'" text-anchor="'+lab2+'" class="pf-ta">'+f(av)+'</text></svg>'}
  function verdict(h){return '<span class="pf-v '+(h.win?'w':h.ok?'g':'r')+'">'+'<span>'+(h.win?CROWN+'Won':h.ok?'Right way':'Wrong way')+'</span><small>'+h.off.toFixed(2)+' pts off</small></span>'}
  var list='<section class="pf-sec" aria-labelledby="pfLH"><h2 id="pfLH">Every call</h2><p class="pf-sub">Filed before the report, never edited. <span class="pf-key"><i class="c"></i>its call</span> <span class="pf-key"><i class="a"></i>what the stock did</span> The line between them is the miss. Right of the middle is up, left is down.</p><ol class="pf-calls">'+
    calls.slice().reverse().map(function(h){var r=h.r;return '<li><a class="'+(h.win?'w':h.ok?'g':'r')+'" href="#/round/'+r.n+'"><span class="pf-rn">R'+r.n+'</span><span class="pf-co">'+coMark(r.ticker)+'<span><b>'+esc(r.co)+'</b><small>'+esc(r.ticker)+' · called '+fmtDate(r.called)+', graded '+fmtDate(r.resolves||r.called)+'</small></span></span>'+line(h)+verdict(h)+'</a></li>'}).join("")+'</ol></section>';
  var okc=calls.filter(function(h){return h.ok}),best=okc.slice().sort(function(a,b){return a.off-b.off})[0],worst=calls.slice().sort(function(a,b){return b.off-a.off})[0];
  function bw(h,t){if(!h)return '';var r=h.r;return '<a class="pf-bw '+(h.ok?'g':'r')+'" href="#/round/'+r.n+'"><small>'+t+'</small><b>'+esc(r.co)+' <span>R'+r.n+'</span></b>'+line(h,true)+'<p>'+h.off.toFixed(2)+' points off. '+(h.ok?'Right way.':'Wrong way.')+'</p></a>'}
  var bwS='<section class="pf-sec" aria-labelledby="pfBH"><h2 id="pfBH">Best and worst</h2><div class="pf-bws">'+bw(best,"Best call")+bw(worst,"Worst call")+'</div></section>';
  var i=RK.indexOf(m),nx=RK[(i+1)%N],pv=RK[(i-1+N)%N];
  var nav='<nav class="pf-pn" aria-label="Other AIs"><a href="#/model/'+pv.toLowerCase()+'"><small>← Previous</small>'+logo(pv)+nm(pv)+'</a><a href="#/model/'+nx.toLowerCase()+'"><small>Next →</small>'+logo(nx)+nm(nx)+'</a></nav>';
  var dots=calls.map(function(h){return h.win?'w':h.ok?'g':'r'}).sort(function(a,b){return 'wgr'.indexOf(a)-'wgr'.indexOf(b)});
  var cap='<header class="pf-hero"><div class="pf-id">'+logo(m,"pf-lg")+'<div><span class="pf-rk">#'+rk+' of '+N+'</span><h1 tabindex="-1">'+nmM+'</h1><p class="pf-ver">'+esc(MODELS[m].ver||'')+'</p></div></div>'+
    '<p class="pf-verdict">'+verdictLine+'</p>'+
    '<div class="pf-arr" role="img" aria-label="'+C.right+' of '+C.g+' calls got the direction right, '+C.won+' of them won the round"><div class="pf-dots">'+dots.map(function(c){return '<i class="'+c+'"></i>'}).join("")+'</div>'+
      '<p><b>'+C.right+' of '+C.g+'</b> calls got up or down right <span>('+pctOf(C.right,C.g)+'%)</span>. <span class="pf-lg2"><i class="w"></i>won the round <i class="g"></i>right way <i class="r"></i>wrong way</span></p></div>'+
    '<div class="pf-kpi"><div class="pf-k gold"><small>Wins</small><b>'+C.won+'</b><span>'+rankTag(place(m,function(k){return CAR[k].won},function(a,b){return a>b}))+'</span></div>'+
    '<div class="pf-k"><small>Right way</small><b>'+C.right+'<span>/'+C.g+'</span></b><span>'+rankTag(hR)+'</span></div>'+
    '<div class="pf-k"><small>Average miss</small><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'<span> pts</span></b><span>'+rankTag(mR)+'</span></div>'+
    '<div class="pf-k"><small>'+usd(STAKE)+' copied</small><b>'+usd(bal(m))+'</b><span>'+rankTag(fR)+' '+pctTxt(bal(m))+'</span></div></div>'+
    '<p class="pf-sample">'+sample+'</p></header>';
  /* one chart: $100K copied, round by round; this AI bold, the others faint, labelled at the end */
  var ser=RK.map(function(k){var b=STAKE,pts=[],started=false;ROUNDS.forEach(function(r,i){var c=callOf(r,k);if(c){if(!started){pts.push([i,STAKE]);started=true}b*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;pts.push([i+1,b])}else if(started)pts.push([i+1,b])});return {k:k,pts:pts,end:b}});
  var all=[].concat.apply([],ser.map(function(x){return x.pts.map(function(p){return p[1]})})),lo=Math.min.apply(null,all.concat([STAKE])),hi=Math.max.apply(null,all.concat([STAKE])),pad=(hi-lo)*.08;lo-=pad;hi+=pad;
  var NAR=window.innerWidth<640,CW=NAR?380:640,CH=NAR?250:260,L0=8,R0=NAR?116:104,T0=12,B0=26,cx=function(i){return L0+i/G*(CW-L0-R0)},cy=function(v){return T0+(1-(v-lo)/(hi-lo))*(CH-T0-B0)};
  var labs=ser.map(function(x){return {k:x.k,y:cy(x.end),v:x.end}}).sort(function(a,b){return a.y-b.y});for(var q=1;q<labs.length;q++)if(labs[q].y-labs[q-1].y<16)labs[q].y=labs[q-1].y+16;
  var kfmt=function(v){return '$'+Math.round(v/1000)+'K'};
  var chart='<svg class="pf-bal" viewBox="0 0 '+CW+' '+CH+'" role="img" aria-label="What '+usd(STAKE)+' copying each AI became, round by round">'+
    '<line x1="'+L0+'" x2="'+(CW-R0)+'" y1="'+cy(STAKE)+'" y2="'+cy(STAKE)+'" stroke="var(--ink)" stroke-opacity=".25" stroke-dasharray="3 4"/><text x="'+L0+'" y="'+(cy(STAKE)+15)+'" class="pf-bt">Start '+kfmt(STAKE)+'</text>'+
    ser.filter(function(x){return x.k!==m}).map(function(x){return '<polyline points="'+x.pts.map(function(p){return cx(p[0]).toFixed(1)+','+cy(p[1]).toFixed(1)}).join(" ")+'" fill="none" stroke="var(--ink)" stroke-opacity=".22" stroke-width="2" stroke-linejoin="round"/>'}).join("")+
    ser.filter(function(x){return x.k===m}).map(function(x){return '<polyline points="'+x.pts.map(function(p){return cx(p[0]).toFixed(1)+','+cy(p[1]).toFixed(1)}).join(" ")+'" fill="none" stroke="var(--ink)" stroke-width="3.5" stroke-linejoin="round" stroke-linecap="round"/>'+
      x.pts.slice(1).map(function(p){var r=ROUNDS[p[0]-1];return '<circle cx="'+cx(p[0]).toFixed(1)+'" cy="'+cy(p[1]).toFixed(1)+'" r="4.5" fill="var(--card)" stroke="var(--ink)" stroke-width="2"><title>After round '+r.n+' ('+esc(r.co)+'): '+usd(p[1])+'</title></circle>'}).join("")}).join("")+
    labs.map(function(l){return '<text x="'+(CW-R0+8)+'" y="'+(l.y+4).toFixed(1)+'" class="pf-bl'+(l.k===m?' me':'')+'">'+nm(l.k)+' '+kfmt(l.v)+'</text>'}).join("")+
    '<text x="'+cx(1)+'" y="'+(CH-6)+'" class="pf-bt" text-anchor="middle">R1</text><text x="'+cx(G)+'" y="'+(CH-6)+'" class="pf-bt" text-anchor="middle">R'+ROUNDS[G-1].n+'</text></svg>';
  var balS='<section class="pf-sec" aria-labelledby="pfMH"><h2 id="pfMH">If you had copied it</h2><p class="pf-sub">'+usd(STAKE)+' in on every call: buy on an up call, short on a down call, out at the next close. '+nmM+' in black, the others in grey. Simulated, before fees.</p>'+chart+'</section>';
  return '<nav class="mnav" aria-label="Models"><a class="back" href="#/leaderboard">← Leaderboard</a>'+RK.map(function(k){return '<a href="#/model/'+k.toLowerCase()+'"'+(k===m?' aria-current="page"':'')+'>'+logo(k)+nm(k)+'</a>'}).join("")+'</nav>'+
    '<div class="pf">'+cap+form+cmp+balS+list+bwS+nav+'</div>'}
function wireModel(root,m){var el=$("#tg1",root);if(el)targets(el,[m])}

/* ---------- buyback: the scoreboard that only means something after launch (the pot, $EZ bought back),
   then where to read more. The overview keeps the four-step explainer. ---------- */
/* X2: the market-cap calculator lives on the Buyback tab. It is one live element (its buttons are wired once on the
   board), so it moves into the tab and back rather than being copied. */
var CALC=null,CALC_MARK=null;
function calcAway(root){CALC=CALC||$("#calc");if(!CALC)return;if(!CALC_MARK){CALC_MARK=document.createComment("calc");CALC.parentNode.insertBefore(CALC_MARK,CALC)}var slot=$("#bbCalc",root);if(slot)slot.appendChild(CALC)}
function calcHome(){if(CALC&&CALC_MARK&&CALC.parentNode!==CALC_MARK.parentNode)CALC_MARK.parentNode.insertBefore(CALC,CALC_MARK)}
/* X2 Buyback: the pool first. Until launch there is no address; once CONFIG.pool (address) and CONFIG.chain are set,
   the balance is read live from a public RPC and refreshed every 30s, with a link to the explorer. */
function vBuybackX2(){var addr=CONFIG.pool||"",ch=String(CONFIG.chain||"").toLowerCase(),url=CONFIG.poolUrl||"";
  return '<h1 tabindex="-1">Buyback</h1><p class="sub">Every $EZ trade pays a fee. '+Math.round((SIM.poolShare!=null?SIM.poolShare:.69)*100)+'% of it fills this pool. The AI on top bets it on NVIDIA\'s earnings at '+(SIM.leverage!=null?SIM.leverage:5)+'x. Win, it buys back $EZ. Lose, the pool gets rekt.</p>'+
    '<div class="pool"><small>In the pool</small><b id="poolBal">'+(addr?'<span class="pool-ld">Reading the chain…</span>':'Opens at launch')+'</b>'+
    (addr?'<p class="pool-a"><span>'+esc(addr.slice(0,6)+'…'+addr.slice(-4))+'</span>'+(url?'<a href="'+esc(url)+'" target="_blank" rel="noopener">See it on the explorer ↗</a>':'')+'</p>':'<p class="pool-a">The pool address appears here, and only here, at launch. Every fee lands in it, on chain, for anyone to check.</p>')+
    '<div class="pool-r"><div><small>Bought back so far</small><b>'+(CONFIG.boughtBack?esc(CONFIG.boughtBack):'Nothing yet')+'</b></div><div><small>Next bet</small><b>NVIDIA earnings · '+(SIM.leverage!=null?SIM.leverage:5)+'x</b></div></div></div>'+
    '<div id="bbCalc"></div><p class="m-fine">A memecoin experiment. Not financial advice. The pot can be wiped out.</p>'}
function wirePool(root){var addr=CONFIG.pool,ch=String(CONFIG.chain||"").toLowerCase(),el=$("#poolBal",root);if(!addr||!el)return;
  function show(v,u){el.textContent=v.toLocaleString("en-US",{maximumFractionDigits:v<10?3:1})+" "+u}
  function read(){var req,u;if(/sol/.test(ch)){u="SOL";req=fetch("https://api.mainnet-beta.solana.com",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"getBalance",params:[addr]})}).then(function(r){return r.json()}).then(function(j){return j.result.value/1e9})}
    else{u="ETH";var rpc=/base/.test(ch)?"https://mainnet.base.org":"https://ethereum-rpc.publicnode.com";req=fetch(rpc,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({jsonrpc:"2.0",id:1,method:"eth_getBalance",params:[addr,"latest"]})}).then(function(r){return r.json()}).then(function(j){return parseInt(j.result,16)/1e18})}
    req.then(function(v){show(v,u)}).catch(function(){el.innerHTML='<span class="pool-ld">Could not reach the chain. Check the explorer.</span>'})}
  read();var t=setInterval(function(){if(!document.body.contains(el)){clearInterval(t);return}read()},30000)}
function vBuyback(){if(X2)return vBuybackX2();function v(x){return x?esc(x):'<span class="soon">Opens at launch</span>'}
  return '<h1 tabindex="-1">Buyback</h1><p class="sub">Trading fees fill a pot. An AI bets it on earnings. A right call buys back $EZ; a wrong one drains the pot.</p>'+
    '<div class="bbn"><div><small>In the pot</small><b>'+v(CONFIG.pool)+'</b></div><div><small>$EZ bought back</small><b>'+v(CONFIG.boughtBack)+'</b></div></div>'+
    '<p class="bbt">Every buyback will be listed here with its transaction.</p>'+
    '<p class="bbl"><a href="#bet">How it works</a> <span aria-hidden="true">·</span> <a href="#calc">How big it could get</a> <span aria-hidden="true">·</span> <a href="#road">Where this goes</a></p>'+
    '<p class="m-fine">A memecoin experiment. Not financial advice. The pot can be wiped out.</p>'}
/* ---------- router: #/ is the board (Season). Other routes render into #view. Plain anchors scroll the board. ---------- */
var boardEl=$("#top"),view=$("#view"),firstR=true,curSec=null;
function route(){var h=location.hash,p=h.replace(/^#\/?/,"").split("/"),html=null,sec="board",wire=null,openN=null,ck=null;
  if(/^#\//.test(h)){
    if(X1&&(p[0]==="results"||(p[0]==="round"&&findR(+p[1])))){sec="results";if(p[0]==="round")openN=+p[1];
      if(curSec==="results"&&!view.hidden){if(openN)openRound(openN);return}
      html=vResults();wire=wireResults}
    else if((p[0]==="round"&&/^\d+$/.test(p[1]||""))||p[0]==="rounds"||p[0]==="upcoming"){sec="upcoming";
      if(p[0]==="round"){openN=+p[1];var v=rv(openN);ck=v?dkey(dayOf(v)):null}
      if(curSec==="upcoming"&&!view.hidden){if(openN)openRound(openN);return}
      html=vRounds();wire=wireRounds}
    else if(p[0]==="buyback"){html=vBuyback();sec="buyback";if(X2)wire=wirePool}
    else if(p[0]==="model"&&p[1]&&X1&&!X2){html=vModels();sec="leaderboard";wire=wireModels}
    else if(p[0]==="model"&&p[1]){var m=String(p[1]).toUpperCase();html=X2?vProfile(m):vModel(m);sec="leaderboard";wire=X2?function(){}:function(r){wireModel(r,m)}}
    else if(p[0]==="models"||p[0]==="leaderboard"){html=vModels();sec="leaderboard";wire=wireModels}}
  closeRound();
  if(X2)calcHome();
  var onBoard=!html;
  $$("video",view).forEach(function(v){v.pause()});
  if(onBoard){view.hidden=true;view.innerHTML="";boardEl.hidden=false;
    var id=h&&!/^#\/?$/.test(h)&&!/^#\//.test(h)?h.slice(1):null,el=id?document.getElementById(id):null;
    if(id==="bet")sec="buyback";
    if(!firstR){if(el)requestAnimationFrame(function(){el.scrollIntoView({block:"start"})});else if(!id)window.scrollTo(0,0)}
    if(typeof home==="function")requestAnimationFrame(home)}
  else{boardEl.hidden=true;view.innerHTML=html;view.hidden=false;if(wire)wire(view);
    if(!firstR){window.scrollTo(0,0);var h1=$("h1",view);if(h1)h1.focus({preventScroll:true})}
    if(sec==="upcoming")requestAnimationFrame(function(){centerDay(view,ck)})}
  curSec=sec;document.documentElement.setAttribute("data-sec",sec);
  if(X2&&sec==="buyback"&&!onBoard)calcAway(view);
  $$(".nav a").forEach(function(a){if(a.dataset.r===sec)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  document.title=onBoard?"EZ Season Live":(($("h1",view)||{}).textContent||"EZ")+" · EZ Season Live";
  if(openN)setTimeout(function(){openRound(openN)},60);
  firstR=false}
addEventListener("hashchange",route);
route();

/* ---------- X2 Overview, the proof: How close (the targets) first and by default, showing every call so far. "Replay
   last round" (beside the card title) wipes the targets with a short static flicker, then the AIs shoot one at a time,
   slowly: each shot lands with a ripple and says how far off it was. When all have shot, the round and the real move
   appear, then "<AI> wins" pops at the top right of the winner's target. "Show every call" brings the season back. ---------- */
if(X2)(function(){var sw=$("#swDir"),sd=$("#swDist");if(!sw||!sd)return;
  sw.parentNode.insertBefore(sd,sw);sd.click();
  var box=$("#lxDist");if(!box)return;var grid=$(".tg-grid",box);if(!grid)return;
  var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,L=ROUNDS[ROUNDS.length-1],NS="http://www.w3.org/2000/svg";
  var wins=L.win?L.win.split(" & "):[];
  var head=$("#lqDist .lq-t");
  var go=document.createElement("button");go.type="button";go.className="tgx-go";if(head){head.classList.add("tgx-head");var hh=$("h3",head);(hh||head).appendChild(go)}else box.insertBefore(go,box.firstChild);
  var bar=document.createElement("div");bar.className="tgx-bar";
  bar.innerHTML='<p class="tgx-cap"><span class="tgx-all">Every call so far. The bullseye is what the stock did.</span><span class="tgx-one" hidden><small>Last round</small> <b>'+esc(L.co)+'</b> <span class="'+(L.a<0?'dn':'up')+'">'+(L.a<0?'▼ ':'▲ ')+esc(String(L.out).replace(/^[+−-]/,""))+'</span></span></p>';
  box.insertBefore(bar,box.firstChild);
  var all=$(".tgx-all",bar),one=$(".tgx-one",bar),timers=[],mode="all";
  function later(f,ms){timers.push(setTimeout(f,ms))}
  function clean(){timers.forEach(clearTimeout);timers=[];$$(".tgx-fx",grid).forEach(function(e){e.remove()});one.classList.remove("in");
    $$(".tg",grid).forEach(function(f){f.classList.remove("tgx-dim","tgx-win","tgx-noise")});$$(".tg-d",grid).forEach(function(g){g.classList.remove("tgx-off","tgx-hit","tgx-last","tgx-gone")})}
  function shot(f,c,t0){var g=$('.tg-d[data-n="'+L.n+'"]',f),sv=$(":scope > svg",f);
    var lab=document.createElement("div");lab.className="tgx-fx tgx-lab";
    lab.innerHTML=c?(c.ok?'<b>Off by '+c.off.toFixed(2)+'%</b>':'<b class="dn">Wrong way</b>')+'<span>called '+(c.dn?'▼ ':'▲ ')+esc(c.mag)+'</span>':'<span>no call</span>';
    f.appendChild(lab);
    if(!g||!sv){later(function(){lab.classList.add("in")},t0);return}
    var rp=document.createElementNS(NS,"circle");rp.setAttribute("class","tgx-fx tgx-rp"+(c&&!c.ok?" bad":""));rp.setAttribute("cx",g.dataset.x);rp.setAttribute("cy",g.dataset.y);rp.setAttribute("r",6);sv.appendChild(rp);
    later(function(){g.classList.remove("tgx-off");g.classList.add("tgx-hit","tgx-last");rp.classList.add("go")},t0);
    later(function(){lab.classList.add("in")},t0+(RM?0:450))}
  function label(){go.innerHTML=mode==="all"?'<span aria-hidden="true">▶</span>Replay':'<span aria-hidden="true">↺</span>All calls';go.setAttribute("aria-label",mode==="all"?"Replay the last round":"Show every call");go.title=go.getAttribute("aria-label")}
  function showAll(){clean();mode="all";all.hidden=false;one.hidden=true;label()}
  function replay(){clean();mode="one";all.hidden=true;one.hidden=false;label();
    var figs=$$(".tg",grid),calls=parsed(L);
    figs.forEach(function(f){f.classList.add("tgx-noise");var sv=$(":scope > svg",f),n=document.createElement("i");n.className="tgx-fx tgx-static";
      if(sv){var d=sv.getBoundingClientRect(),fr=f.getBoundingClientRect(),k=Math.min(d.width,d.height)*.88;n.style.cssText="left:"+(d.left-fr.left+(d.width-k)/2)+"px;top:"+(d.top-fr.top+(d.height-k)/2)+"px;width:"+k+"px;height:"+k+"px"}f.appendChild(n)});
    later(function(){$$(".tg-d",grid).forEach(function(g){g.classList.add(+g.dataset.n===L.n?"tgx-off":"tgx-gone")})},RM?0:220);
    later(function(){figs.forEach(function(f){f.classList.remove("tgx-noise")});$$(".tgx-static",grid).forEach(function(e){e.remove()})},RM?0:520);
    /* pacing: the eye needs ~250ms to move to a new spot and ~200-300ms per word to read, so each shot gets ~2.2s:
       land (~0.6s), its label after the landing (+0.45s), then time to read and compare before the next one */
    var t=RM?0:1100,STEP=RM?0:2200;
    figs.forEach(function(f){var m=f.getAttribute("data-m"),c=calls.filter(function(x){return x.m===m})[0];shot(f,c,t);t+=STEP});
    /* after everyone has shot: what the stock did, then who won */
    later(function(){one.classList.add("in")},t+(RM?0:300));
    later(function(){figs.forEach(function(f){f.classList.add(wins.indexOf(f.getAttribute("data-m"))>-1?"tgx-win":"tgx-dim")});
      if(wins.length)figs.forEach(function(f){if(wins.indexOf(f.getAttribute("data-m"))<0)return;var sv=$(":scope > svg",f),pop=document.createElement("div");pop.className="tgx-fx tgx-pop";pop.innerHTML=CROWN+'<span>'+nm(f.getAttribute("data-m"))+' wins</span>';
        var ring=sv&&$("circle.rg",sv);if(ring){var d=ring.getBoundingClientRect(),fr=f.getBoundingClientRect(),cx=d.left+d.width/2-fr.left,cy=d.top+d.height/2-fr.top,r=d.width/2;pop.style.left=(cx+r*.55)+"px";pop.style.top=(cy-r*.78)+"px"}
        f.appendChild(pop);var lim=(box.closest(".lq")||box).getBoundingClientRect().right-10,pr=pop.getBoundingClientRect();if(pr.right>lim)pop.style.left=(parseFloat(pop.style.left)-(pr.right-lim))+"px";requestAnimationFrame(function(){pop.classList.add("in")})});
      else{var pop=document.createElement("p");pop.className="tgx-fx tgx-none";pop.textContent="No winner: every AI got the direction wrong";bar.appendChild(pop)}},t+(RM?0:1800))}
  label();grid.style.position="relative";
  go.addEventListener("click",function(){mode==="all"?replay():showAll()});
})();

/* X2 phones: the top-bar chip uses the ticker so it fits beside the brand ("In play: STZ") */
if(X2&&typeof TARGET!=="undefined"&&TARGET&&window.matchMedia&&matchMedia("(max-width:760px)").matches){var lt=$("#liveTxt");if(lt)lt.textContent=(typeof P0!=="undefined"&&P0?"In play: ":"Next: ")+String(TARGET.ticker||TARGET.co).replace(/\..*$/,"")}
