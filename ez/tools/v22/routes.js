
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
   gallery) and Upcoming only for what's ahead; "x2" = Upcoming opens on what's next, with the films as a gallery above. */
var EXP=window.EZ_EXP||"";
var TODAYK=dkey(new Date()),RBIG=false,RLOOK="brand";
function xsh(no,eb,title,sub,h1,id){var tag=h1?"h1":"h2";return '<div class="xsh"><span class="no">'+no+'</span><span class="eb">'+eb+'</span><'+tag+(id?' id="'+id+'"':'')+(h1?' tabindex="-1"':'')+'><span class="mk">'+title+'</span></'+tag+'>'+(sub?'<p>'+sub+'</p>':'')+'</div>'}
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
  return '<li><a class="rtl" style="--bc:'+c+';--bi:'+onCol(c)+'" data-tk="'+esc(String(v.ticker||"").split(".")[0])+'" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<span class="rt"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+'</small><b>'+esc(v.co)+'</b><span>'+(hasTk(v)?esc(v.ticker)+' · ':'')+'Result '+fmtDate(v.resolves)+'</span></span></a></li>'}
function timeline(){var days=DAYS.map(function(D){return {k:D.k,d:D.d,ns:D.ns.filter(function(n){return (!RBIG||isBig(rv(n).ticker))&&(!EXP||rv(n).st!=="graded")})}}).filter(function(D){return D.ns.length}),nk=nextK(days);
  if(!days.length)return '<p class="empty">No big names yet.</p>';
  return days.map(function(D){var L=dayLabel(D),done=D.ns.filter(function(n){return rv(n).st!=="sealed"}),seal=D.ns.filter(function(n){return rv(n).st==="sealed"}),
      st=D.ns.every(function(n){return rv(n).st==="graded"})?'Graded':D.ns.some(function(n){return rv(n).st==="calls"})?'Calls are in':'Calls come in';
    return '<section class="rday'+(D.k===nk?' next':'')+(D.k<TODAYK?' past':'')+'" data-k="'+D.k+'" aria-label="'+esc(L.w+' '+L.m)+'"><div class="rdh"><h2>'+esc(L.m)+'</h2><span class="rdw">'+esc(L.w)+'</span>'+(D.k===nk?'<b class="nx">Next</b>':'')+'<span class="rds">'+st+' · '+D.ns.length+'</span></div>'+
      (done.length?'<ul class="rcds">'+done.map(rcard).join("")+'</ul>':'')+(seal.length?'<ul class="rtls">'+seal.map(rtile).join("")+'</ul>':'')+'</section>'}).join("")}
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
function gallery(newest){var ns=ROUNDS.map(function(r){return r.n}).filter(function(n){return !RBIG||isBig(rv(n).ticker)});if(newest)ns.reverse();
  return ns.length?'<ul class="gal">'+ns.map(gtile).join("")+'</ul>':'<p class="empty">No big names yet.</p>'}
function wireGallery(root){if(!matchMedia("(hover:hover)").matches||reduce)return;
  root.addEventListener("mouseover",function(e){var a=e.target.closest&&e.target.closest(".gt");if(!a)return;var v=$("video",a);if(!v)return;
    if(!v.src)v.src=MEDIA+v.dataset.f+(v.canPlayType("video/webm")?".webm":".mp4");v.classList.add("on");var p=v.play();if(p&&p.catch)p.catch(function(){})});
  root.addEventListener("mouseout",function(e){var a=e.target.closest&&e.target.closest(".gt");if(!a||a.contains(e.relatedTarget))return;var v=$("video",a);if(v){v.pause();v.classList.remove("on")}})}
/* the shelf: rounds that hold a record, worked out from ROUNDS */
function RS(){return ROUNDS.filter(function(r){return !RBIG||isBig(r.ticker)})}
function shelf(){var RR=RS();if(!RR.length)return '';var calls=[];RR.forEach(function(r){r.calls.forEach(function(c){calls.push({m:c[0],r:r,off:parseFloat(c[2])})})});
  var close=calls.slice().sort(function(a,b){return a.off-b.off})[0];
  var tight=RR.map(function(r){var o=r.calls.map(function(c){return parseFloat(c[2])});return {r:r,v:o.reduce(function(a,b){return a+b},0)/o.length}}).sort(function(a,b){return a.v-b.v})[0];
  var big=RR.slice().sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)})[0];
  var none=RR.filter(function(r){return !r.win});
  function f(kick,r,line){return '<li><a class="shf" href="#/round/'+r.n+'"><span class="shf-a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="" loading="lazy">':'')+'</span><span class="shf-t"><small>'+kick+'</small><b>'+esc(r.co)+'</b><span>'+line+'</span></span></a></li>'}
  return '<ul class="shl">'+f("Closest call",close.r,nm(close.m)+' off by '+close.off.toFixed(2)+' pts')+f("Tightest race",tight.r,'All four '+tight.v.toFixed(2)+' pts off on average')+
    f("Biggest move",big,(big.a>0?'▲ ':'▼ ')+big.out.replace(/^[+−-]/,""))+(none.length?f("Nobody got it",(none.filter(function(r){return r!==big&&r!==close.r&&r!==tight.r}).pop()||none[none.length-1]),none.length+' round'+(none.length>1?'s':'')+' with no winner'):'')+'</ul>'}
function hero(){var RR=RS(),r=RR[RR.length-1];if(!r)return '';var v=rv(r.n);
  return '<a class="hero2" href="#/round/'+r.n+'" style="--bc:'+bcol(r.ticker)+'"><span class="h2a">'+(r.poster?'<img src="'+MEDIA+r.poster+'.jpg" alt="">':'')+(r.film&&!reduce?'<video muted loop playsinline autoplay preload="metadata" aria-hidden="true"'+(r.poster?' poster="'+MEDIA+r.poster+'.jpg"':'')+'><source src="'+MEDIA+r.film+'.webm" type="video/webm"><source src="'+MEDIA+r.film+'.mp4" type="video/mp4"></video>':'')+'</span>'+
    '<span class="h2t"><small>Latest result · '+fmtDate(r.resolves)+'</small><b>Round '+r.n+' · '+esc(r.co)+(hasTk(v)?' <span class="tk">('+esc(r.ticker)+')</span>':'')+'</b><span class="h2m '+(r.a<0?'d':'u')+'">'+(r.a<0?'▼':'▲')+esc(r.out.replace(/^[+−-]/,""))+'</span>'+
    '<span class="gt-w">'+(v.win.length?'<small>Winner</small>'+v.win.map(function(m){return logo(m)}).join("")+'<b>'+v.win.map(nm).join(" & ")+'</b>':'<span class="lg nob" aria-hidden="true">✗</span><b>No winner</b>')+'</span><span class="h2o">Open the card →</span></span></a>'}
function bigSeg(){var all=ROUNDS.length,bg=ROUNDS.filter(function(r){return isBig(r.ticker)}).length;
  return '<div class="seg bseg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All <b>'+all+'</b></button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names <b>'+bg+'</b></button></div>'}
function resultsBody(){return '<section class="xsec">'+xsh("01",RBIG?"Big names":"Results","Latest result",RBIG?"The newest round on a big name.":"The newest graded round.")+hero()+'</section>'+
  '<section class="xsec">'+xsh("02","Records","Record rounds","The rounds that set the marks so far.")+shelf()+'</section>'+
  '<section class="xsec">'+xsh("03","Archive","Every round","Newest first. Tap a round for the full card.")+gallery(true)+'</section>'}
function vResults(){return '<div class="rhd xrhd"><h1 tabindex="-1"><span class="mk">Results</span></h1>'+bigSeg()+'</div><div id="gal">'+resultsBody()+'</div>'}
function wireResults(root){$$("[data-big]",root).forEach(function(b){b.addEventListener("click",function(){RBIG=b.dataset.big==="1";$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});$("#gal",root).innerHTML=resultsBody()})});wireGallery(root)}
function body(){if(EXP==="x2")return '<section class="gsec" aria-labelledby="galH"><h2 id="galH" class="gh">Results</h2>'+gallery(false)+'</section><h2 class="gh nxh">Coming up</h2>'+timeline();return RLOOK==="compact"?compactList():timeline()}
function vRounds(){var x=CONFIG.x?'<a href="'+esc(CONFIG.x)+'" target="_blank" rel="noopener">Follow on X</a>':'Follow on X (link at launch)';
  var up=ALLN.filter(function(n){return rv(n).st!=="graded"}),ub=up.filter(function(n){return isBig(rv(n).ticker)}).length;
  return (EXP==="x1"?'<div class="rhd xrhd"><h1 tabindex="-1"><span class="mk">Upcoming</span></h1><div class="seg bseg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All <b>'+up.length+'</b></button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names <b>'+ub+'</b></button></div></div>':
    '<div class="rhd"><h1 tabindex="-1">Upcoming</h1><div class="seg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All</button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names</button></div></div>')+
    '<p class="rfoot">Every call goes out before the report. '+x+' to see them first. <span aria-hidden="true">·</span> <button type="button" class="lnk" id="icsB">Add the Zeason to your calendar</button> <span id="icsMsg" class="note" aria-live="polite"></span></p>'+
    (EXP?'':'<div class="look" role="group" aria-label="Preview a look (for review)"><small>Look</small><button type="button" data-look="brand" aria-pressed="'+(RLOOK==="brand")+'">Brand colours</button><button type="button" data-look="compact" aria-pressed="'+(RLOOK==="compact")+'">Compact</button></div>')+
    '<div id="rtl" class="rtline look-'+RLOOK+'">'+body()+'</div>'}
/* put a day (the next one, or a shared round's day) in the middle of the screen */
function centerDay(root,k){var s=(k&&$('.rday[data-k="'+k+'"]',root))||$(".rday.next",root);if(!s)return;
  var y=s.getBoundingClientRect().top+scrollY-Math.max(120,innerHeight*.32);window.scrollTo(0,Math.max(0,y))}
function wireRounds(root){
  /* the title and the All / Big names switch stay under the top bar */
  function th(){var t=$(".top");if(t)document.documentElement.style.setProperty("--toph",t.offsetHeight+"px")}th();addEventListener("resize",th);
  $$("[data-big]",root).forEach(function(b){b.addEventListener("click",function(){RBIG=b.dataset.big==="1";$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    $("#rtl",root).innerHTML=body();centerDay(root)})});
  wireGallery(root);
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
      cc.animate([{transform:"translate("+(ra.left+ra.width/2-rb.left-rb.width/2)+"px,"+(ra.top+ra.height/2-rb.top-rb.height/2)+"px) scale("+k+")",opacity:.5},{transform:"none",opacity:1}],{duration:480,easing:"cubic-bezier(.2,1.3,.35,1)"})}
    else cc.animate([{transform:"scale(.82)",opacity:0},{transform:"none",opacity:1}],{duration:340,easing:"cubic-bezier(.2,1.3,.35,1)"});
    m.animate([{backgroundColor:"transparent"},{}],{duration:260})}
  var vid=$("video",m);if(vid){vid.muted=true;vid.loop=true;vid.classList.add("on");var pp=vid.play();if(pp&&pp.catch)pp.catch(function(){})}
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
   then the return on $10,000, the last five rounds, and wins (what the ranking is decided on) on the far right.
   Under it: the title race, head to head, and the season's records. Every number comes from ROUNDS. ---------- */
var CROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V8l5 4 4-8 4 8 5-4v11z" fill="#12131a"/></svg>';
function fbal(m){var o=FOLLOW.filter(function(f){return f.m===m})[0];return o?o.bal:null}
function formDots(C){return C.hist.slice(-5).map(function(h){var cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
  return '<a class="fd '+cls+'" href="#/round/'+h.n+'" title="Round '+h.n+': '+lab+'" aria-label="Round '+h.n+': '+lab+'">'+(h.win?CROWN:h.none?'':h.ok?'✓':'✗')+'</a>'}).join("")}
function lbRow(m,i){var C=CAR[m],b=fbal(m),up=b!=null&&b>=10000;
  return '<li class="lbr pc'+(i?'':' lead')+(rkOf(m)===1&&C.won>0?' r1':'')+'" role="row">'+(i?'':'<span class="crown"><i aria-hidden="true">👑</i><span class="cw">Leads</span></span>')+
    '<span class="rk" role="cell"><sup>#</sup>'+rkOf(m)+'</span>'+
    '<span class="lb-m" role="rowheader">'+logo(m)+'<span class="pc-t"><h3>'+(EXP==="x1"?nm(m):'<a href="#/model/'+m.toLowerCase()+'">'+nm(m)+'</a>')+'</h3><small>'+esc(MODELS[m].ver||'')+'</small></span></span>'+
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
  hit:{t:"Hit rate",sub:"Calls that got the direction right."},
  miss:{t:"Avg miss",sub:"Average points off the real move. Smaller is better."},
  roi:{t:"ROI",sub:"$10,000 rolled through every call. Simulated, before fees."}};
var RKEYS=EXP==="x1"?["hit","miss","roi","bull","bold"]:["hit","miss","roi","wins"],RCUR="hit";
var UPS_N=ROUNDS.filter(function(r){return r.a>0}).length,AVG_MOVE=ROUNDS.length?ROUNDS.reduce(function(a,r){return a+Math.abs(r.a)},0)/ROUNDS.length:0;
RMET.bull={t:"Bull/bear",sub:"Share of calls that said up. The stocks went up in "+UPS_N+" of "+ROUNDS.length+" rounds (the line)."};
RMET.bold={t:"Boldness",sub:"Average size of the call. The real moves averaged "+AVG_MOVE.toFixed(2)+"% (the line)."};
function statRows(k){return RK.map(function(m){var C=CAR[m],calls=C.hist.filter(function(h){return !h.none});
    var shared=ROUNDS.filter(function(r){var w=r.win?r.win.split(" & "):[];return w.length>1&&w.indexOf(m)>-1}).length,bestC=calls.slice().sort(function(a,b){return a.off-b.off})[0],b=fbal(m);
    if(k==="bull"||k==="bold"){var cs=ROUNDS.map(function(r){return callOf(r,m)}).filter(Boolean),ups=cs.filter(function(c){return !/^DOWN/.test(c[1])}).length,
        mags=cs.map(function(c){return Math.abs(parseFloat(String(c[1]).replace(/^\w+\s*/,"")))}).filter(function(x){return !isNaN(x)}),am=mags.length?mags.reduce(function(a,b){return a+b},0)/mags.length:0;
      return k==="bull"?{m:m,v:cs.length?ups/cs.length*100:0,txt:cs.length?Math.round(ups/cs.length*100)+"% up":"n/a",sub:ups+" up, "+(cs.length-ups)+" down"}:{m:m,v:am,txt:am.toFixed(1)+"%",sub:"over "+mags.length+" calls"}}
    if(k==="wins")return {m:m,v:C.won,txt:String(C.won),sub:C.won?(C.won-shared)+" outright"+(shared?", "+shared+" shared":""):"Not yet"};
    if(k==="hit")return {m:m,v:C.g?C.right/C.g*100:0,txt:C.g?pctOf(C.right,C.g)+"%":"n/a",sub:C.right+" of "+C.g+" calls"};
    if(k==="miss")return {m:m,v:C.avg,txt:C.avg==null?"n/a":C.avg.toFixed(2),sub:bestC?"Best: "+bestC.off.toFixed(2)+" on "+bestC.r.co:""};
    return {m:m,v:b==null?0:(b/10000-1)*100,txt:b==null?"n/a":pctTxt(b),sub:b==null?"":usd(b)}})
  .filter(function(x){return x.v!=null}).sort(function(a,b){return k==="miss"?a.v-b.v:b.v-a.v})}
function drawStats(face,k,anim){var box=$(".st-box",face);if(!box)return;var R=statRows(k);
  /* X1, hit rate: the direction chart from "Are they learning?" (hit rate round by round, one line per AI) */
  if(k==="hit"&&EXP==="x1"&&window.EZLearn){box.innerHTML='<div class="lxv hx"></div>';EZLearn.together($(".hx",box),{pctOnly:true,noCoin:true,ver:true});return}
  /* X1, ROI: bars from the $10,000 line, green right, red left */
  if(k==="roi"&&EXP==="x1"){var mr=Math.max.apply(null,R.map(function(x){return Math.abs(x.v)}))||1;
    box.innerHTML='<ol class="sxl">'+R.map(function(x,i){var w=Math.abs(x.v)/mr*50;
      return '<li class="sxr'+(i?'':' lead')+'"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="sb dv"><i class="'+(x.v>=0?'pu':'pd')+'" style="--w:'+w.toFixed(1)+'%;'+(x.v>=0?'left:50%':'right:50%')+'"></i></span><span class="st-v"><b class="'+(x.v>=0?'pu':'pd')+'">'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
    var rb=$$(".sb i",box);if(anim&&!reduce){rb.forEach(function(b){b.style.width="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){rb.forEach(function(b,i){b.style.transitionDelay=(i*90)+"ms";b.style.width=""})})})}return}
  /* X1, bull or bear and boldness: bars with the market's line on them */
  if(k==="bull"||k==="bold"){var top=k==="bull"?100:Math.max(AVG_MOVE,Math.max.apply(null,R.map(function(x){return x.v})))*1.15,ln=(k==="bull"?(ROUNDS.length?UPS_N/ROUNDS.length*100:0):AVG_MOVE)/top*100;
    box.innerHTML='<ol class="sxl">'+R.map(function(x,i){return '<li class="sxr"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="sb ln"><i style="--w:'+(x.v/top*100).toFixed(1)+'%;background:'+MODELS[x.m].c+'"></i><em style="left:'+ln.toFixed(1)+'%"></em></span><span class="st-v"><b>'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
    var lb=$$(".sb i",box);if(anim&&!reduce){lb.forEach(function(b){b.style.width="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){lb.forEach(function(b,i){b.style.transitionDelay=(i*90)+"ms";b.style.width=""})})})}return}
  /* hit rate: bars (longer is better) */
  if(k==="hit"){box.innerHTML='<ol class="sxl">'+R.map(function(x,i){
      return '<li class="sxr'+(i?'':' lead')+'"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="sb"><i style="--w:'+x.v.toFixed(1)+'%;background:'+MODELS[x.m].c+'"></i></span><span class="st-v"><b>'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
    var bars=$$(".sb i",box);if(anim&&!reduce){bars.forEach(function(b){b.style.width="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){bars.forEach(function(b,i){b.style.transitionDelay=(i*90)+"ms";b.style.width=""})})})}return}
  /* avg miss: the bullseye, with the averages ranked above it */
  if(k==="miss"){box.classList.toggle("cmp",EXP==="x1");box.innerHTML='<ol class="mxr">'+R.map(function(x,i){return '<li'+(i?'':' class="lead"')+'><span>'+(i+1)+'</span>'+logo(x.m)+'<b>'+nm(x.m)+'</b><strong>'+x.txt+'</strong><small>pts</small></li>'}).join("")+'</ol><div class="tgv mxt"></div>';
    targets($(".mxt",box),R.map(function(x){return x.m}));return}
  /* ROI: columns up or down from the $10,000 line */
  if(k==="roi"){var mx=Math.max.apply(null,R.map(function(x){return Math.abs(x.v)}))||1;
    box.innerHTML='<div class="rcol">'+R.map(function(x,i){var h=Math.abs(x.v)/mx*100,up=x.v>=0;
      return '<div class="rcx'+(i?'':' lead')+'"><div class="rc-up">'+(up?'<span class="rc-l pu">'+x.txt+'</span><i class="pu" style="--h:'+h.toFixed(1)+'%"></i>':'')+'</div><div class="rc-dn">'+(up?'':'<i class="pd" style="--h:'+h.toFixed(1)+'%"></i><span class="rc-l pd">'+x.txt+'</span>')+'</div>'+
        '<div class="rc-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b><small>'+esc(x.sub)+'</small></div></div>'}).join("")+'<span class="rc-base">$10,000</span></div>';
    var cols=$$(".rcol i",box);if(anim&&!reduce){cols.forEach(function(c){c.style.height="0"});requestAnimationFrame(function(){requestAnimationFrame(function(){cols.forEach(function(c,i){c.style.transitionDelay=(i*110)+"ms";c.style.height=""})})})}return}
  /* wins: a crown per round won; a shared win is a half crown. Each crown opens its round. */
  box.innerHTML='<ol class="sxl">'+R.map(function(x,i){var won=ROUNDS.filter(function(r){return r.win&&r.win.split(" & ").indexOf(x.m)>-1});
      return '<li class="sxr wr'+(i?'':' lead')+'"><span class="st-rk">'+(i+1)+'</span><span class="st-who">'+logo(x.m)+'<b>'+nm(x.m)+'</b></span><span class="crs">'+(won.length?won.map(function(r,j){var sh=r.win.indexOf(" & ")>-1;
        return '<a class="cr'+(sh?' crh':'')+'" style="--d:'+(j*80)+'ms" href="#/round/'+r.n+'" title="Round '+r.n+', '+esc(r.co)+(sh?' (shared)':'')+'" aria-label="Round '+r.n+' '+esc(r.co)+(sh?', shared':'')+'">'+CROWN+'</a>'}).join(""):'<span class="cr0">No wins yet</span>')+'</span><span class="st-v"><b>'+x.txt+'</b><small>'+esc(x.sub)+'</small></span></li>'}).join("")+'</ol>';
  if(anim&&!reduce)$$(".cr",box).forEach(function(c){c.classList.add("pop")})}
function statsHTML(){return '<section class="blk" aria-labelledby="stH">'+(EXP==="x1"?xsh("02","The stats","How they stack up","Pick a measure. The card flips to it.",false,"stH"):'<div class="hh"><h2 id="stH">The stats</h2></div>')+
  '<div class="lsw rsw" role="group" aria-label="Rank the AIs by">'+RKEYS.map(function(k){return '<button type="button" data-rk="'+k+'" aria-pressed="'+(k===RCUR)+'">'+RMET[k].t+'</button>'}).join("")+'</div>'+
  '<div class="rflip sflip" id="rflip"><div class="rf-in">'+[0,1].map(function(i){return '<div class="rf-face'+(i?' back':'')+'"'+(i?' aria-hidden="true"':'')+'><p class="rf-sub"></p><div class="st-box"></div></div>'}).join("")+'</div></div></section>'}
function wireStats(root){var fl=$("#rflip",root);if(!fl)return;var faces=$$(".rf-face",fl),front=0,seen=false;
  function fill(i,k,anim){$(".rf-sub",faces[i]).textContent=RMET[k].sub;drawStats(faces[i],k,anim)}
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
  function tile(kick,head,m,big,unit,n){var r=findR(n),bg=r&&r.poster?' style="--bg:url(\''+MEDIA+r.poster+'.jpg\')"':'';
    if(EXP==="x1")return '<a class="hlt rec2"'+bg+' href="#/round/'+n+'"><span class="hl-k">'+kick+'</span><span class="hl-h">'+esc(head)+'</span><span class="hl-hold"><small>Current holder</small>'+logo(m)+'<b>'+nm(m)+'</b><strong>'+big+'</strong><i>'+unit+'</i></span></a>';
    return '<a class="hlt"'+bg+' href="#/round/'+n+'"><span class="hl-k">'+kick+'</span><span class="hl-v">'+logo(m)+'<b>'+big+'</b><i>'+unit+'</i></span><span class="hl-h">'+esc(head)+'</span><span class="hl-r">Round '+n+(r?' · '+fmtDate(r.resolves):'')+' <span aria-hidden="true">→</span></span></a>'}
  var out='';
  if(wr.rs.length>1)out+=tile(EXP==="x1"?"Longest winning streak":"Most wins in a row",wr.rs.length===2?nm(wr.m)+" goes back to back: "+cos(wr.rs):wr.rs.length===3?nm(wr.m)+" goes three for three: "+cos(wr.rs):nm(wr.m)+" is on a heater: "+word(wr.rs.length)+" straight",wr.m,wr.rs.length,"in a row",wr.rs[wr.rs.length-1].n);
  out+=tile("Closest call",best.off<1?nm(best.m)+" basically front-ran "+best.r.co:nm(best.m)+" sniped "+best.r.co,best.m,best.off.toFixed(2),"pts off",best.r.n);
  out+=tile("Biggest miss",nm(worst.m)+" got rekt on "+worst.r.co,worst.m,worst.off.toFixed(2),"pts off",worst.r.n);
  if(rr.rs.length>1)out+=tile(EXP==="x1"?"Longest hit streak":"Most right calls in a row",rr.rs.length<4?nm(rr.m)+" can't miss: "+cos(rr.rs):nm(rr.m)+" calls the direction "+word(rr.rs.length)+" straight",rr.m,rr.rs.length,"in a row",rr.rs[rr.rs.length-1].n);
  return out}
function vModels(){
  return (EXP==="x1"?xsh("01","Leaderboard","Current standings","Ranked by rounds won, then by the smaller average miss.",true):'<h1 tabindex="-1">Current standings</h1><p class="sub">Ranked by rounds won, then by the smaller average miss. Tap an AI for every call it made.</p>')+
    '<div class="lbx" role="table" aria-label="Current standings"><div class="lbh" role="row"><span role="columnheader"><span class="sr">Rank</span></span><span role="columnheader"><span class="sr">AI</span></span><span role="columnheader">Hit rate</span><span role="columnheader"><span class="dt">Avg miss</span><span class="ph">Miss</span></span><span role="columnheader">ROI</span><span role="columnheader" class="lb-f">Last 5</span><span role="columnheader">Wins</span></div>'+
    '<ol class="lbl" role="rowgroup">'+RK.map(lbRow).join("")+'</ol></div>'+
    '<p class="lbn"><b>Hit rate</b>: calls right on direction. <b>Avg miss</b>: points off the real move. <b>ROI</b>: $10,000 rolled through every call. Simulated, before fees.</p>'+
    statsHTML()+
    '<section class="blk" aria-labelledby="recH">'+(EXP==="x1"?xsh("03","Highlights","Records to beat","Each record links to the round that set it.",false,"recH"):'<div class="hh"><h2 id="recH">Highlights</h2></div>')+'<div class="hls">'+records()+'</div></section>'}
function wireModels(root){wireStats(root)}
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
function wireModel(root,m){var el=$("#tg1",root);if(el)targets(el,[m])}

/* ---------- buyback: the scoreboard that only means something after launch (the pot, $EZ bought back),
   then where to read more. The overview keeps the four-step explainer. ---------- */
function vBuyback(){function v(x){return x?esc(x):'<span class="soon">Opens at launch</span>'}
  return '<h1 tabindex="-1">Buyback</h1><p class="sub">Trading fees fill a pot. An AI bets it on earnings. A right call buys back $EZ; a wrong one drains the pot.</p>'+
    '<div class="bbn"><div><small>In the pot</small><b>'+v(CONFIG.pool)+'</b></div><div><small>$EZ bought back</small><b>'+v(CONFIG.boughtBack)+'</b></div></div>'+
    '<p class="bbt">Every buyback will be listed here with its transaction.</p>'+
    '<p class="bbl"><a href="#bet">How it works</a> <span aria-hidden="true">·</span> <a href="#calc">How big it could get</a> <span aria-hidden="true">·</span> <a href="#road">Where this goes</a></p>'+
    '<p class="m-fine">A memecoin experiment. Not financial advice. The pot can be wiped out.</p>'}
/* ---------- router: #/ is the board (Season). Other routes render into #view. Plain anchors scroll the board. ---------- */
var boardEl=$("#top"),view=$("#view"),firstR=true,curSec=null;
function route(){var h=location.hash,p=h.replace(/^#\/?/,"").split("/"),html=null,sec="board",wire=null,openN=null,ck=null;
  if(/^#\//.test(h)){
    if(EXP==="x1"&&(p[0]==="results"||(p[0]==="round"&&findR(+p[1])))){sec="results";if(p[0]==="round")openN=+p[1];
      if(curSec==="results"&&!view.hidden){if(openN)openRound(openN);return}
      html=vResults();wire=wireResults}
    else if((p[0]==="round"&&/^\d+$/.test(p[1]||""))||p[0]==="rounds"||p[0]==="upcoming"){sec="upcoming";
      if(p[0]==="round"){openN=+p[1];var v=rv(openN);ck=v?dkey(dayOf(v)):null}
      if(curSec==="upcoming"&&!view.hidden){if(openN)openRound(openN);return}
      html=vRounds();wire=wireRounds}
    else if(p[0]==="buyback"){html=vBuyback();sec="buyback"}
    else if(p[0]==="model"&&p[1]&&EXP==="x1"){html=vModels();sec="leaderboard";wire=wireModels}
    else if(p[0]==="model"&&p[1]){var m=String(p[1]).toUpperCase();html=vModel(m);sec="leaderboard";wire=function(r){wireModel(r,m)}}
    else if(p[0]==="models"||p[0]==="leaderboard"){html=vModels();sec="leaderboard";wire=wireModels}}
  closeRound();
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
  curSec=sec;
  $$(".nav a").forEach(function(a){if(a.dataset.r===sec)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  document.title=onBoard?"EZ Season Live":(($("h1",view)||{}).textContent||"EZ")+" · EZ Season Live";
  if(openN)setTimeout(function(){openRound(openN)},60);
  firstR=false}
addEventListener("hashchange",route);
route();
