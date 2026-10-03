
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
function wireCal(root){var b=$("#icsB",root);if(b)b.addEventListener("click",function(){var m=$("#icsMsg",root);
  save(new Blob([icsText()],{type:"text/calendar"}),"ez-rounds.ics").then(function(){m.textContent="Downloaded ez-rounds.ics. Open it to add the rounds."},
    function(e){m.textContent=e&&e.code==="ics_preview"?"Calendar files can't be saved from this preview. This button works on the live site.":e&&e.code==="declined"?"No file saved.":"Couldn't save the file here."})})}

/* ---------- the big names: the companies most people follow before and during earnings. Owner-editable:
   set BIG in ez-data.js to replace this starter list (ideally from a real interest ranking, like the most anticipated
   earnings lists). Big names sort first and wear a star. ---------- */
var BIGS=((typeof BIG!=="undefined"&&BIG)||["JPM","GS","BAC","WFC","C","MS","BLK","UNH","JNJ","PEP","DAL","TSMC","2330.TW","ASML.AS","005930.KS","NKE","MU","ACN","COST","ORCL","GME"]).map(function(t){return String(t).toUpperCase()});
function isBig(t){return BIGS.indexOf(String(t||"").toUpperCase())>-1}
function tkBadge(t){if(CO_LOGOS[String(t||"").toUpperCase()])return coMark(t);var s=String(t||"").split(".")[0].slice(0,5);
  return '<span class="co-mark tkb'+(s.length>3?' l'+s.length:'')+'" aria-hidden="true">'+esc(s)+'</span>'}

/* ---------- rounds: one strip of days, past on the left, what's next on the right (like a scores app).
   Graded and calls-in rounds sit on the day the market answered or answers; scheduled ones on the day the calls come in.
   Pick a day, see its rounds. Scales to hundreds of rounds: only one day's rounds are on screen at a time. ---------- */
function dayOf(v){return mmdd(v.st==="sealed"?v.called:v.resolves)}
function dkey(d){return d?d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"):"9999"}
var DAYS=(function(){var m={};ALLN.forEach(function(n){var v=rv(n),d=dayOf(v),k=dkey(d);(m[k]=m[k]||{k:k,d:d,ns:[]}).ns.push(n)});
  return Object.keys(m).sort().map(function(k){var D=m[k];D.ns.sort(function(x,y){var bx=isBig(rv(x).ticker),by=isBig(rv(y).ticker);return (by-bx)||(x-y)});return D})})();
var TODAYK=dkey(new Date()),RSEL=null,RBIG=false;
function startDay(){var i=-1;DAYS.forEach(function(D,j){if(i<0&&D.k>=TODAYK)i=j});return i<0?DAYS.length-1:i}
function rrow(n){var v=rv(n),r;
  if(v.st==="graded")r=pill(v.a<0,v.out.replace(/^[+−-]/,""))+'<span class="rw"><small>Winner</small>'+(v.win.length?v.win.map(function(m){return logo(m)}).join("")+'<b>'+v.win.map(nm).join(" & ")+'</b>':'<span class="lg nob" aria-hidden="true">✗</span><b>Nobody</b>')+'</span>';
  else if(v.st==="calls")r='<span class="rc4">'+v.calls.map(function(c){return '<span>'+logo(c.m)+'<b class="'+(c.dn?'cd':'cu')+'">'+(c.dn?'▼':'▲')+esc(c.mag)+'</b></span>'}).join("")+'</span>';
  else r='<span class="rs-s">Calls '+fmtDate(v.called)+'</span>';
  return '<li><a class="rrow '+v.st+'" href="#/round/'+n+'">'+tkBadge(v.ticker)+'<span class="rt"><small>Round '+n+(isBig(v.ticker)?' · <i class="star" title="Big name">★</i>':'')+'</small><b>'+esc(v.co)+(hasTk(v)?' <span class="tk">('+esc(v.ticker)+')</span>':'')+'</b></span><span class="rr2">'+r+'</span></a></li>'}
function dayLabel(D){if(!D.d)return {w:"Later",m:"TBC"};return {w:D.k===TODAYK?"Today":D.d.toLocaleDateString("en-US",{weekday:"short"}),m:fmtDate((D.d.getMonth()+1)+"/"+D.d.getDate())}}
function dayList(i){var D=DAYS[i];if(!D)return '';var ns=RBIG?D.ns.filter(function(n){return isBig(rv(n).ticker)}):D.ns,L=dayLabel(D),past=D.k<TODAYK;
  var st=D.ns.every(function(n){return rv(n).st==="graded"})?'Graded':D.ns.some(function(n){return rv(n).st==="calls"})?'Calls are in':'Calls come in';
  return '<div class="dh"><h2>'+(D.k===TODAYK?'Today · ':'')+esc(L.m)+'</h2><span>'+st+' · '+D.ns.length+' round'+(D.ns.length>1?'s':'')+'</span></div>'+
    (ns.length?'<ul class="rl2">'+ns.map(rrow).join("")+'</ul>':'<p class="empty">No big names on this day. <button type="button" class="lnk" data-all>Show all '+D.ns.length+'</button></p>')}
function vRounds(){RSEL=RSEL==null?startDay():RSEL;
  var strip=DAYS.map(function(D,i){var L=dayLabel(D),g=D.ns.every(function(n){return rv(n).st==="graded"}),bigs=D.ns.filter(function(n){return isBig(rv(n).ticker)}).length;
    return '<button type="button" class="dchip'+(g?' past':'')+(D.k===TODAYK?' today':'')+'" data-d="'+i+'" aria-pressed="'+(i===RSEL)+'"><small>'+esc(L.w)+'</small><b>'+esc(L.m)+'</b><span class="dn" aria-label="'+D.ns.length+' rounds">'+D.ns.map(function(n){var v=rv(n);return '<i class="'+(v.st==="graded"?(v.win.length?'w':'x'):v.st==="calls"?'p':'s')+(isBig(v.ticker)?' b':'')+'"></i>'}).join("")+'</span></button>'}).join("");
  var x=CONFIG.x?'<a href="'+esc(CONFIG.x)+'" target="_blank" rel="noopener">Follow on X</a>':'Follow on X (link at launch)';
  return '<div class="rhd"><h1 tabindex="-1">Rounds</h1><div class="seg" role="group" aria-label="Which rounds"><button type="button" data-big="0" aria-pressed="'+!RBIG+'">All</button><button type="button" data-big="1" aria-pressed="'+RBIG+'">★ Big names</button></div></div>'+
    '<div class="dstrip-w"><button type="button" class="dnav" data-step="-1" aria-label="Earlier days">←</button><div class="dstrip" id="dstrip" role="group" aria-label="Pick a day">'+strip+'</div><button type="button" class="dnav" data-step="1" aria-label="Later days">→</button></div>'+
    '<div id="dlist">'+dayList(RSEL)+'</div>'+
    '<p class="rfoot">Every call goes out before the report. '+x+' to see them first. <span aria-hidden="true">·</span> <button type="button" class="lnk" id="icsB">Add the season to your calendar</button> <span id="icsMsg" class="note" aria-live="polite"></span></p>'}
function wireRounds(root){var strip=$("#dstrip",root);
  function center(sm){var b=$('[data-d="'+RSEL+'"]',strip);if(b)strip.scrollTo({left:b.offsetLeft-(strip.clientWidth-b.offsetWidth)/2,behavior:sm&&!reduce?"smooth":"auto"})}
  function pick(i){RSEL=Math.max(0,Math.min(DAYS.length-1,i));$$(".dchip",strip).forEach(function(b){b.setAttribute("aria-pressed",String(+b.dataset.d===RSEL))});$("#dlist",root).innerHTML=dayList(RSEL);center(true)}
  strip.addEventListener("click",function(e){var b=e.target.closest(".dchip");if(b)pick(+b.dataset.d)});
  $$(".dnav",root).forEach(function(b){b.addEventListener("click",function(){pick(RSEL+(+b.dataset.step))})});
  $$("[data-big]",root).forEach(function(b){b.addEventListener("click",function(){RBIG=b.dataset.big==="1";$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});$("#dlist",root).innerHTML=dayList(RSEL)})});
  root.addEventListener("click",function(e){if(e.target.closest("[data-all]")){RBIG=false;$$("[data-big]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x.dataset.big==="0"))});$("#dlist",root).innerHTML=dayList(RSEL)}});
  requestAnimationFrame(function(){center(false)});wireCal(root)}
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

/* ---------- leaderboard: the standings with more data; a row opens that model ---------- */
var CROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V8l5 4 4-8 4 8 5-4v11z" fill="#12131a"/></svg>';
function fbal(m){var o=FOLLOW.filter(function(f){return f.m===m})[0];return o?o.bal:null}
function vModels(){
  return '<h1 tabindex="-1">Leaderboard</h1><p class="sub">Ranked by rounds won, then by the smaller average miss. Tap a model for every call it made.</p>'+
    '<div class="lbw"><table class="lb"><thead><tr><th scope="col">#</th><th scope="col">Model</th><th scope="col">Wins</th><th scope="col">Right way</th><th scope="col"><span class="dt">Avg miss</span><span class="ph">Miss</span></th><th scope="col" class="hm">Streak</th><th scope="col" class="hm">$10k became</th></tr></thead><tbody>'+
    RK.map(function(m,i){var C=CAR[m],b=fbal(m),st=C.streak?(C.streak.k+' '+(C.streak.ok?'right':'wrong')):'n/a';
      return '<tr class="'+(i?'':'lead')+'" data-href="#/model/'+m.toLowerCase()+'"><td class="rk">'+rkOf(m)+'</td><td><a class="who" href="#/model/'+m.toLowerCase()+'">'+logo(m)+'<span><b>'+nm(m)+'</b><small>'+esc(MODELS[m].ver||'')+'</small></span></a></td>'+
        '<td class="w">'+C.won+'</td><td>'+pctOf(C.right,C.g)+'%<small>'+C.right+' of '+C.g+'</small></td><td>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</td><td class="hm">'+esc(st)+'</td><td class="hm">'+(b==null?'n/a':pctTxt(b))+'</td></tr>'}).join("")+
    '</tbody></table></div><p class="note hm" style="margin-top:10px">$10k became: if you had followed every call of that model, all in, from $10,000. Hypothetical, before fees.</p>'}
function wireModels(root){$$("tr[data-href]",root).forEach(function(tr){tr.addEventListener("click",function(e){if(!e.target.closest("a"))location.hash=tr.dataset.href})})}
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
function route(){var h=location.hash,p=h.replace(/^#\/?/,"").split("/"),html=null,sec="board",wire=null,openN=null;
  if(/^#\//.test(h)){
    if((p[0]==="round"&&/^\d+$/.test(p[1]||""))||p[0]==="rounds"||p[0]==="upcoming"){sec="rounds";
      if(p[0]==="round"){openN=+p[1];var v=rv(openN);if(v){var k=dkey(dayOf(v));DAYS.forEach(function(D,i){if(D.k===k)RSEL=i})}}
      if(curSec==="rounds"&&!view.hidden){if(openN)openRound(openN);return}
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
    if(!firstR){window.scrollTo(0,0);var h1=$("h1",view);if(h1)h1.focus({preventScroll:true})}}
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
