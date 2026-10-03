
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
var TODAYK=dkey(new Date()),RBIG=false;
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
  return '<li><a class="rcd '+v.st+'" href="#/round/'+n+'"><span class="rcd-a">'+art+'</span><span class="rcd-t">Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+' <span aria-hidden="true">·</span> '+esc(v.co)+(hasTk(v)?' <span class="tk">('+esc(v.ticker)+')</span>':'')+'</span><span class="rcd-f">'+foot+'</span></a></li>'}
function rtile(n){var v=rv(n);
  return '<li><a class="rtl" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<span class="rt"><small>Round '+n+(!RBIG&&isBig(v.ticker)?' <i class="star" title="Big name">★</i>':'')+'</small><b>'+esc(v.co)+'</b><span>'+(hasTk(v)?esc(v.ticker)+' · ':'')+'Result '+fmtDate(v.resolves)+'</span></span></a></li>'}
function timeline(){var days=DAYS.map(function(D){return {k:D.k,d:D.d,ns:RBIG?D.ns.filter(function(n){return isBig(rv(n).ticker)}):D.ns}}).filter(function(D){return D.ns.length}),nk=nextK(days);
  if(!days.length)return '<p class="empty">No big names yet.</p>';
  return days.map(function(D){var L=dayLabel(D),done=D.ns.filter(function(n){return rv(n).st!=="sealed"}),seal=D.ns.filter(function(n){return rv(n).st==="sealed"}),
      st=D.ns.every(function(n){return rv(n).st==="graded"})?'Graded':D.ns.some(function(n){return rv(n).st==="calls"})?'Calls are in':'Calls come in';
    return '<section class="rday'+(D.k===nk?' next':'')+(D.k<TODAYK?' past':'')+'" data-k="'+D.k+'" aria-label="'+esc(L.w+' '+L.m)+'"><div class="rdh"><h2>'+esc(L.m)+'</h2><span class="rdw">'+esc(L.w)+'</span>'+(D.k===nk?'<b class="nx">Next</b>':'')+'<span class="rds">'+st+' · '+D.ns.length+'</span></div>'+
      (done.length?'<ul class="rcds">'+done.map(rcard).join("")+'</ul>':'')+(seal.length?'<ul class="rtls">'+seal.map(rtile).join("")+'</ul>':'')+'</section>'}).join("")}
function vRounds(){var x=CONFIG.x?'<a href="'+esc(CONFIG.x)+'" target="_blank" rel="noopener">Follow on X</a>':'Follow on X (link at launch)';
  return '<div class="rhd"><h1 tabindex="-1">Upcoming</h1><div class="seg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All</button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names</button></div></div>'+
    '<p class="rfoot">Every call goes out before the report. '+x+' to see them first. <span aria-hidden="true">·</span> <button type="button" class="lnk" id="icsB">Add the season to your calendar</button> <span id="icsMsg" class="note" aria-live="polite"></span></p>'+
    '<div id="rtl" class="rtline">'+timeline()+'</div>'}
/* put a day (the next one, or a shared round's day) in the middle of the screen */
function centerDay(root,k){var s=(k&&$('.rday[data-k="'+k+'"]',root))||$(".rday.next",root);if(!s)return;
  var y=s.getBoundingClientRect().top+scrollY-Math.max(120,innerHeight*.32);window.scrollTo(0,Math.max(0,y))}
function wireRounds(root){
  /* the title and the All / Big names switch stay under the top bar */
  function th(){var t=$(".top");if(t)document.documentElement.style.setProperty("--toph",t.offsetHeight+"px")}th();addEventListener("resize",th);
  $$("[data-big]",root).forEach(function(b){b.addEventListener("click",function(){RBIG=b.dataset.big==="1";$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    $("#rtl",root).innerHTML=timeline();centerDay(root)})});
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
    '<span class="lb-m" role="rowheader">'+logo(m)+'<span class="pc-t"><h3><a href="#/model/'+m.toLowerCase()+'">'+nm(m)+'</a></h3><small>'+esc(MODELS[m].ver||'')+'</small></span></span>'+
    '<span class="lb-c" role="cell"><b>'+(C.g?pctOf(C.right,C.g)+'%':'n/a')+'</b><small>'+C.right+' of '+C.g+'</small></span>'+
    '<span class="lb-c" role="cell"><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</b><small>points</small></span>'+
    '<span class="lb-c roi '+(b==null?'':up?'pu':'pd')+'" role="cell"><b>'+(b==null?'n/a':pctTxt(b))+'</b><small>'+(b==null?'':usd(b))+'</small></span>'+
    '<span class="lb-f" role="cell">'+formDots(C)+'</span>'+
    '<span class="lb-w pc-w" role="cell"><b>'+C.won+'</b><span>'+(C.won===1?'win':'wins')+'</span></span></li>'}
/* ---------- the race: one chart, four ways to score it (wins, hit rate, average miss, ROI). Like "Are they learning?",
   a switch picks the measure and the card flips to it. Each AI is a racer: its logo rides its line to the finish.
   Every number is worked out from ROUNDS here; shared wins count for both. ---------- */
var RMET={
  wins:{t:"Wins",sub:"Rounds won, round by round.",step:true,f:function(v){return String(v)}},
  hit:{t:"Hit rate",sub:"Share of calls with the direction right, round by round.",f:function(v){return Math.round(v)+"%"}},
  miss:{t:"Avg miss",sub:"Average points off the real move. Smaller is better, so the closest rides on top.",inv:true,f:function(v){return v.toFixed(2)}},
  roi:{t:"ROI",sub:"$10,000 following every call, all in. Hypothetical, before fees.",zero:true,f:function(v){return (v>=0?"+":"−")+Math.abs(v).toFixed(1)+"%"}}};
var RKEYS=["wins","hit","miss","roi"],RCUR="wins";
function raceData(k){var S={};RK.forEach(function(m){var w=0,g=0,ok=0,err=0,bal=10000,p=[k==="wins"||k==="roi"?0:null];
    ROUNDS.forEach(function(r){var c=callOf(r,m);if(r.win&&r.win.split(" & ").indexOf(m)>-1)w++;
      if(c){g++;ok+=callOk(r,c);err+=parseFloat(c[2]);bal*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100}
      p.push(k==="wins"?w:k==="hit"?(g?ok/g*100:null):k==="miss"?(g?err/g:null):(bal/10000-1)*100)});S[m]=p});return S}
var RACE_INK={GROK:"#e9e9ef"};
function rcol(m){return RACE_INK[m]||MODELS[m].c}
/* draw one measure into a face: the track (SVG) and the racers (logos that ride each line) */
function drawRace(face,k,anim){var M=RMET[k],S=raceData(k),n=ROUNDS.length,box=$(".rc-trk",face);if(!box)return;
  var W=Math.max(300,box.clientWidth),sm=W<560,H=sm?250:320,L=sm?30:44,R=sm?118:150,T=26,B=34;
  var vals=[];RK.forEach(function(m){S[m].forEach(function(v){if(v!=null)vals.push(v)})});
  var lo=Math.min.apply(null,vals),hi=Math.max.apply(null,vals);
  if(k==="wins"){lo=0;hi=Math.max(hi,1)}else if(k==="hit"){lo=0;hi=100}else if(k==="miss"){lo=0;hi=Math.ceil(hi/5)*5||5}else{var a=Math.max(Math.abs(lo),Math.abs(hi),5);a=Math.ceil(a/10)*10;lo=-a;hi=a}
  function X(i){return L+i/n*(W-L-R)}function Y(v){var t=(v-lo)/(hi-lo);if(M.inv)t=1-t;return T+(1-t)*(H-T-B)}
  var off={};RK.forEach(function(m,i){off[m]=(i-(RK.length-1)/2)*3});
  var ticks=k==="wins"?Array.from({length:hi+1},function(_,i){return i}):k==="hit"?[0,25,50,75,100]:k==="miss"?Array.from({length:hi/5+1},function(_,i){return i*5}):[lo,lo/2,0,hi/2,hi];
  var g='';ticks.forEach(function(v){g+='<line class="'+(M.zero&&v===0?'rt-z':'rt-g')+'" x1="'+L+'" x2="'+X(n)+'" y1="'+Y(v)+'" y2="'+Y(v)+'"/><text class="rt-y" x="'+(L-8)+'" y="'+(Y(v)+4)+'">'+(k==="hit"?v+"%":k==="roi"?(v>0?"+":v<0?"−":"")+Math.abs(v)+"%":v)+'</text>'});
  for(var i=1;i<=n;i++)if(n<=14||i%5===0||i===n)g+='<text class="rt-x" x="'+X(i)+'" y="'+(H-10)+'">R'+ROUNDS[i-1].n+'</text>';
  /* the finish: a checkered strip at the last round */
  g+='<defs><pattern id="chk-'+k+'" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="#fff"/><rect x="4" y="4" width="4" height="4" fill="#fff"/></pattern></defs><rect class="rt-fin" x="'+(X(n)-4)+'" y="'+(T-12)+'" width="8" height="'+(H-B-T+12)+'" fill="url(#chk-'+k+')"/>';
  var paths={},ends=[];RK.forEach(function(m){var p=S[m],d="",first=-1;for(var i=0;i<=n;i++){if(p[i]==null)continue;var x=X(i),y=Y(p[i])+off[m];
      if(first<0){d="M"+x.toFixed(1)+","+y.toFixed(1);first=i}else d+=M.step?"H"+x.toFixed(1)+"V"+y.toFixed(1):"L"+x.toFixed(1)+","+y.toFixed(1)}
    paths[m]=d;if(p[n]!=null)ends.push({m:m,v:p[n],y:Y(p[n])+off[m]})});
  /* the order at the finish: best first, labels pushed apart so none overlap, each tied to its line */
  var order=ends.slice().sort(function(a,b){return M.inv?a.v-b.v:b.v-a.v});
  var lab=order.slice();lab.forEach(function(e){e.ly=Math.max(T-6,e.y)});for(var j=1;j<lab.length;j++)if(lab[j].ly-lab[j-1].ly<30)lab[j].ly=lab[j-1].ly+30;
  var LX=X(n)+(sm?22:30);
  g+=lab.map(function(e){return '<path class="rt-k" d="M'+(X(n)+5)+','+e.y+'C'+(X(n)+14)+','+e.y+' '+(LX-12)+','+e.ly+' '+(LX-2)+','+e.ly+'" stroke="'+rcol(e.m)+'"/>'}).join("");
  var lines=RK.slice().reverse().map(function(m){return paths[m]?'<path class="rt-l" data-m="'+m+'" d="'+paths[m]+'" stroke="'+rcol(m)+'"/>':''}).join("");
  box.innerHTML='<svg class="rt" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" role="img" aria-label="'+esc(M.t)+' after round '+ROUNDS[n-1].n+': '+order.map(function(e){return nm(e.m)+' '+M.f(e.v)}).join(", ")+'">'+g+lines+
    '<line class="rt-cur" y1="'+T+'" y2="'+(H-B)+'" x1="-9" x2="-9"/><rect class="rt-hit" x="'+L+'" y="0" width="'+(X(n)-L)+'" height="'+H+'"/></svg>'+
    RK.map(function(m){return paths[m]?'<span class="rt-rc'+(order[0]&&order[0].m===m?' lead':'')+'" data-m="'+m+'" style="offset-path:path(\''+paths[m]+'\')">'+logo(m)+'</span>':''}).join("")+
    lab.map(function(e){var pos=order.indexOf(e);return '<span class="rt-lb" style="left:'+LX+'px;top:'+e.ly+'px"><b>'+(pos+1)+(pos===0?'st':pos===1?'nd':pos===2?'rd':'th')+'</b>'+logo(e.m)+'<span>'+nm(e.m)+'</span><strong>'+M.f(e.v)+'</strong></span>'}).join("")+
    '<div class="rc-tip" hidden></div>';
  box.style.height=H+"px";
  var go=anim&&!reduce&&CSS.supports&&CSS.supports("offset-path","path('M0,0L1,1')");
  $$(".rt-rc",box).forEach(function(el){if(!CSS.supports||!CSS.supports("offset-path","path('M0,0L1,1')")){var e=ends.filter(function(x){return x.m===el.dataset.m})[0];if(e){el.style.left=X(n)+"px";el.style.top=e.y+"px";el.style.offsetPath="none"}return}
    el.style.offsetDistance="100%";if(go)el.animate([{offsetDistance:"0%"},{offsetDistance:"100%"}],{duration:1600,easing:"cubic-bezier(.45,.05,.3,1)"})});
  $$(".rt-l",box).forEach(function(p){if(!go)return;var len=p.getTotalLength();p.style.strokeDasharray=len;p.animate([{strokeDashoffset:len},{strokeDashoffset:0}],{duration:1600,easing:"cubic-bezier(.45,.05,.3,1)"})});
  $$(".rt-lb",box).forEach(function(el){if(go)el.animate([{opacity:0},{opacity:0,offset:.85},{opacity:1}],{duration:1900})});
  /* hover or touch: the standings after any round */
  var sv=$("svg",box),tip=$(".rc-tip",box),cur=$(".rt-cur",box);
  function at(e){var r=sv.getBoundingClientRect(),x=(e.clientX-r.left)/r.width*W,i=0,bd=1e9;for(var q=1;q<=n;q++){var dx=Math.abs(X(q)-x);if(dx<bd){bd=dx;i=q}}return i}
  function show(e){var i=at(e);if(!i)return;cur.setAttribute("x1",X(i));cur.setAttribute("x2",X(i));var r=ROUNDS[i-1];
    tip.innerHTML='<b>After round '+r.n+' · '+esc(r.co)+'</b>'+RK.filter(function(m){return S[m][i]!=null}).sort(function(a,b){return M.inv?S[a][i]-S[b][i]:S[b][i]-S[a][i]}).map(function(m){return '<span>'+logo(m)+nm(m)+' <b>'+M.f(S[m][i])+'</b></span>'}).join("");
    tip.hidden=false;tip.style.left=Math.max(4,Math.min(W-tip.offsetWidth-4,X(i)+12))+"px"}
  function hide(){tip.hidden=true;cur.setAttribute("x1",-9);cur.setAttribute("x2",-9)}
  sv.addEventListener("pointermove",show);sv.addEventListener("pointerdown",show);sv.addEventListener("pointerleave",hide)}
function raceHTML(){return '<section class="blk" aria-labelledby="raceH"><div class="hh"><h2 id="raceH">The race</h2></div>'+
  '<div class="lsw rsw" role="group" aria-label="Score the race by">'+RKEYS.map(function(k){return '<button type="button" data-rk="'+k+'" aria-pressed="'+(k===RCUR)+'">'+RMET[k].t+'</button>'}).join("")+'</div>'+
  '<div class="rflip" id="rflip"><div class="rf-in">'+[0,1].map(function(i){return '<div class="rf-face'+(i?' back':'')+'"'+(i?' aria-hidden="true"':'')+'><p class="rf-sub"></p><div class="rc-trk"></div></div>'}).join("")+'</div></div></section>'}
function wireRace(root){var fl=$("#rflip",root);if(!fl)return;var faces=$$(".rf-face",fl),front=0,seen=false;
  function fill(i,k,anim){$(".rf-sub",faces[i]).textContent=RMET[k].sub;drawRace(faces[i],k,anim)}
  fill(0,RCUR,false);
  if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting&&!seen){seen=true;io.disconnect();fill(front,RCUR,true)}})},{threshold:.4});io.observe(fl)}
  $$("[data-rk]",root).forEach(function(b){b.addEventListener("click",function(){var k=b.dataset.rk;if(k===RCUR)return;RCUR=k;
    $$("[data-rk]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    var nx=1-front;fill(nx,k,false);fl.classList.toggle("flipped",nx===1);faces[front].setAttribute("aria-hidden","true");faces[nx].removeAttribute("aria-hidden");front=nx;
    setTimeout(function(){fill(front,k,true)},reduce?0:380)})});
  var rt;addEventListener("resize",function(){clearTimeout(rt);rt=setTimeout(function(){if(fl.isConnected)fill(front,RCUR,false)},200)})}

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
  function tile(kick,head,m,big,unit,n){return '<a class="rec" href="#/round/'+n+'"><small>'+kick+'</small><h3>'+esc(head)+'</h3><span class="rec-v">'+logo(m)+'<b>'+big+'</b><i>'+unit+'</i></span></a>'}
  var out='';
  if(wr.rs.length>1)out+=tile("Most wins in a row",wr.rs.length===2?nm(wr.m)+" takes "+listCo(wr.rs)+" back to back":wr.rs.length===3?nm(wr.m)+" runs the table on "+listCo(wr.rs):nm(wr.m)+" wins "+word(wr.rs.length)+" straight",wr.m,wr.rs.length,"in a row",wr.rs[wr.rs.length-1].n);
  out+=tile("Closest call",best.off<1?nm(best.m)+" calls "+best.r.co+" by a hair":nm(best.m)+" gets closest on "+best.r.co,best.m,best.off.toFixed(2),"pts off",best.r.n);
  out+=tile("Biggest miss",nm(worst.m)+" whiffs on "+worst.r.co,worst.m,worst.off.toFixed(2),"pts off",worst.r.n);
  if(rr.rs.length>1)out+=tile("Most right calls in a row",rr.rs.length<4?nm(rr.m)+" gets the direction right on "+listCo(rr.rs):nm(rr.m)+" gets the direction right "+word(rr.rs.length)+" times running",rr.m,rr.rs.length,"in a row",rr.rs[rr.rs.length-1].n);
  return out}
function vModels(){
  return '<h1 tabindex="-1">Current standings</h1><p class="sub">Ranked by rounds won, then by the smaller average miss. Tap an AI for every call it made.</p>'+
    '<div class="lbx" role="table" aria-label="Current standings"><div class="lbh" role="row"><span role="columnheader"><span class="sr">Rank</span></span><span role="columnheader"><span class="sr">AI</span></span><span role="columnheader">Hit rate</span><span role="columnheader"><span class="dt">Avg miss</span><span class="ph">Miss</span></span><span role="columnheader">ROI</span><span role="columnheader" class="lb-f">Last 5</span><span role="columnheader">Wins</span></div>'+
    '<ol class="lbl" role="rowgroup">'+RK.map(lbRow).join("")+'</ol></div>'+
    '<p class="lbn"><b>Hit rate</b>: share of calls with the direction right. <b>Avg miss</b>: how far the call was from the real move, in points. <b>ROI</b>: $10,000 that followed every call, all in. Hypothetical, before fees.</p>'+
    raceHTML()+
    '<section class="blk" aria-labelledby="recH"><div class="hh"><h2 id="recH">Season records</h2></div><div class="recs">'+records()+'</div></section>'}
function wireModels(root){wireRace(root)}
function vModel(m){if(!CAR[m])return null;var C=CAR[m],calls=C.hist.filter(function(h){return !h.none});
  var okc=calls.filter(function(h){return h.ok}),best=okc.slice().sort(function(a,b){return a.off-b.off})[0],worst=calls.slice().sort(function(a,b){return b.off-a.off})[0];
  function callCard(h,lab){if(!h)return '<div class="box"><small>'+lab+'</small><b>Not yet</b><p>No right-way calls graded yet.</p></div>';var r=h.r,dn=/^DOWN/.test(h.said);
    return '<a class="box" href="#/round/'+r.n+'"><small>'+lab+'</small><b>R'+r.n+' · '+coTkn(r)+'</b><p>Called <strong>'+(dn?'down ':'up ')+esc(h.said.replace(/^\w+\s*/,""))+'</strong>. It moved <strong>'+r.out+'</strong>. '+(h.ok?'Right way, off by ':'Wrong way, off by ')+h.off.toFixed(2)+' points.</p></a>'}
  var st=C.streak?(C.streak.k+' '+(C.streak.ok?'right':'wrong')):'n/a';
  return '<nav class="mnav" aria-label="Models"><a class="back" href="#/leaderboard">← Leaderboard</a>'+RK.map(function(k){return '<a href="#/model/'+k.toLowerCase()+'"'+(k===m?' aria-current="page"':'')+'>'+logo(k)+nm(k)+'</a>'}).join("")+'</nav>'+
    '<div class="mh">'+logo(m)+'<div class="t"><span class="eb">#'+rkOf(m)+' on the leaderboard</span><h1 tabindex="-1" style="margin-top:8px">'+nm(m)+'</h1><p class="note">'+esc(MODELS[m].ver||'')+' · '+C.g+' graded call'+(C.g===1?'':'s')+' so far.</p></div></div>'+
    '<div class="tiles"><div><small>Wins</small><b>'+C.won+'</b><span>Rounds won outright or shared</span></div><div><small>Right way</small><b>'+pctOf(C.right,C.g)+'%</b><span>'+C.right+' of '+C.g+' calls</span></div><div><small>Average miss</small><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</b><span>Points from the real move</span></div>'+
      '<div><small>Current streak</small><b>'+esc(st)+'</b><span>Right or wrong way, in a row</span></div></div>'+
    '<section class="blk" aria-labelledby="hiH"><div class="hh"><h2 id="hiH">Every round</h2><p>One dot per round. Tap one to see the card.</p></div><ol class="strip">'+
      C.hist.map(function(h){var cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
        return '<li><a href="#/round/'+h.n+'" aria-label="Round '+h.n+': '+lab+'"><span class="dt '+cls+'" aria-hidden="true">'+(h.win?CROWN:h.none?'·':h.ok?'✓':'✗')+'</span><small aria-hidden="true">R'+h.n+'</small></a></li>'}).join("")+'</ol>'+
      '<p class="legend"><span><i style="background:var(--ez-gold)"></i>Won</span><span><i style="background:var(--ez-green)"></i>Right way</span><span><i style="background:var(--ez-red)"></i>Wrong way</span><span><i style="background:var(--card)"></i>No call</span></p></section>'+
    '<section class="blk" aria-labelledby="bwH"><div class="hh"><h2 id="bwH">Best and worst</h2></div><div class="bw">'+callCard(best,"Best call · smallest miss, right way")+callCard(worst,"Worst call · biggest miss")+'</div></section>'+
    '<section class="blk" aria-labelledby="tgH"><div class="hh"><h2 id="tgH">How close</h2></div><div class="tgv tg1" id="tg1"></div></section>'}
function wireModel(root,m){var el=$("#tg1",root);if(el)targets(el,[m])}

/* ---------- router: #/ is the board (Season). Other routes render into #view. Plain anchors scroll the board. ---------- */
var boardEl=$("#top"),view=$("#view"),firstR=true,curSec=null;
function route(){var h=location.hash,p=h.replace(/^#\/?/,"").split("/"),html=null,sec="board",wire=null,openN=null,ck=null;
  if(/^#\//.test(h)){
    if((p[0]==="round"&&/^\d+$/.test(p[1]||""))||p[0]==="rounds"||p[0]==="upcoming"){sec="upcoming";
      if(p[0]==="round"){openN=+p[1];var v=rv(openN);ck=v?dkey(dayOf(v)):null}
      if(curSec==="upcoming"&&!view.hidden){if(openN)openRound(openN);return}
      html=vRounds();wire=wireRounds}
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

/* ---------- Season Live's take on "If you'd followed each AI": the same numbers, each AI as a small line from $10,000
   to where it is now, round by round (the dashed line is $10,000) ---------- */
(function(){var L=$("#folL");if(!L||!FOLLOW.length)return;L.classList.add("fol-sp");
  var all=[].concat.apply([],FOLLOW.map(function(o){return o.path})),lo=Math.min.apply(null,all.concat([10000])),hi=Math.max.apply(null,all.concat([10000])),pad=(hi-lo)*.12||500;lo-=pad;hi+=pad;
  var W=160,H=44;function Y(v){return (H-4-(v-lo)/(hi-lo)*(H-8)).toFixed(1)}
  L.innerHTML=FOLLOW.map(function(o,i){var n=o.path.length-1,X=function(k){return (2+k/(n||1)*(W-8)).toFixed(1)},up=o.bal>=10000;
    var d=o.path.map(function(v,k){return (k?"L":"M")+X(k)+","+Y(v)}).join("");
    var svg='<svg class="fol-s" viewBox="0 0 '+W+' '+H+'" aria-hidden="true"><line x1="0" x2="'+W+'" y1="'+Y(10000)+'" y2="'+Y(10000)+'" class="z"/><path d="'+d+'" class="'+(up?'pu':'pd')+'"/><circle cx="'+X(n)+'" cy="'+Y(o.bal)+'" r="3.5" class="'+(up?'pu':'pd')+'"/></svg>';
    return '<li class="fol-r2'+(i?'':' top')+'"><span class="fol-w2">'+logo(o.m)+'<span>'+nm(o.m)+'<small>'+(MODELS[o.m].ver||'')+(o.n<NR?' · '+o.n+' rounds':'')+'</small></span></span>'+svg+
      '<span class="fol-v2"><b class="'+(up?'pu':'pd')+'">'+pctTxt(o.bal)+'</b><span>'+usd(o.bal)+'</span></span></li>'}).join("")})();
