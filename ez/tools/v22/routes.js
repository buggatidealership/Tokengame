
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

/* ---------- rounds: one poster per round ---------- */
function winIcons(v){return '<span class="ws">'+(v.win.length?v.win.map(function(m){return logo(m)}).join(""):'<span class="lg nob" aria-hidden="true">✗</span>')+'<span class="sr">'+(v.win.length?'Winner '+v.win.map(nm).join(" and "):'No winner')+'</span></span>'}
/* the company's logo when CO_LOGOS has one, else a ticker badge that fits ("2317.TW" shows as 2317) */
function tkBadge(t){if(CO_LOGOS[String(t||"").toUpperCase()])return coMark(t);var s=String(t||"").split(".")[0].slice(0,5);
  return '<span class="co-mark tkb'+(s.length>3?' l'+s.length:'')+'" aria-hidden="true">'+esc(s)+'</span>'}
/* the season in one picture: every round on one line. Graded rounds are bars (up above the line, down below, height = the
   move), capped with the winner's colour; rounds still to come are dots. Tap a round to open it. */
function svgLogo(m,cx,cy,s){var M=MODELS[m],k=s*.62/24;return '<g class="s-lg"><rect x="'+(cx-s/2)+'" y="'+(cy-s/2)+'" width="'+s+'" height="'+s+'" rx="'+(s*.225)+'" style="fill:'+M.bg+'"/>'+
  '<g transform="translate('+(cx-s/2+s*.19)+','+(cy-s/2+s*.19)+') scale('+k+')"><path d="'+M.d+'" style="fill:'+M.fg+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+'/>'+(M.dot?'<path d="'+M.dot+'" style="fill:'+M.dotc+'"/>':'')+'</g></g>'}
function seasonSVG(W,H,cls){var G=ALLN.filter(function(n){return findR(n)||findP(n)}),U=ALLN.filter(function(n){return G.indexOf(n)<0}),L=20,R=20,Y0=H*.5,UP=H*.5-58,DN=H*.5-58;
  var gw=(W-L-R)*(U.length?.74:1),gs=G.length?gw/G.length:0,us=U.length?(W-L-R-gw)/U.length:0,bw=Math.min(30,gs*.56),ls=Math.min(30,Math.max(20,gs*.62));
  var mx=Math.max.apply(null,ROUNDS.map(function(r){return Math.abs(r.a)}).concat([1]));
  var o='<svg class="ssvg '+cls+'" viewBox="0 0 '+W+' '+H+'" role="group" aria-label="The season: '+NR+' rounds graded, '+(ALLN.length-NR)+' to come">';
  var tx=L+gw;if(U.length)o+='<line class="s-now" x1="'+tx+'" x2="'+tx+'" y1="16" y2="'+(H-30)+'"/>'+(cls==="s-wide"?'<text class="s-nowt" x="'+(tx+8)+'" y="28">Today</text>':'')+'<text class="s-nowt" x="'+(W-R)+'" y="28" text-anchor="end">'+U.length+' to come</text>';
  o+='<line class="s-axis" x1="'+L+'" x2="'+(W-R)+'" y1="'+Y0+'" y2="'+Y0+'"/>';
  function link(n,v,inner){return '<a href="#/round/'+n+'" class="s-r" aria-label="'+esc(plain(v))+(v.st==="graded"?', '+v.out+', '+(v.win.length?'won by '+v.win.map(nm).join(" and "):'no winner'):v.st==="calls"?', calls are in':', calls '+fmtDate(v.called))+'"><title>'+esc(plain(v))+(v.st==="graded"?' · '+v.out:'')+'</title>'+inner+'</a>'}
  G.forEach(function(n,i){var cx=L+gs*i+gs/2,v=rv(n),s='<rect class="s-hit" x="'+(cx-gs/2)+'" y="8" width="'+gs+'" height="'+(H-16)+'"/>';
    if(v.st==="graded"){var h=Math.max(6,Math.abs(v.a)/mx*(v.a>0?UP:DN)),y=v.a>0?Y0-h:Y0,cy=v.a>0?y-ls/2-6:y+h+ls/2+6;
      s+='<rect class="s-bar '+(v.a>0?'u':'d')+'" x="'+(cx-bw/2)+'" y="'+y+'" width="'+bw+'" height="'+h+'" rx="3"/>';
      if(v.win.length>1){var s2=ls*.78;s+=svgLogo(v.win[1],cx+s2*.32,cy+(v.a>0?-s2*.32:s2*.32),s2)+svgLogo(v.win[0],cx-s2*.32,cy+(v.a>0?s2*.12:-s2*.12),s2)}
      else if(v.win.length)s+=svgLogo(v.win[0],cx,cy,ls);
      else s+='<g class="s-x" transform="translate('+cx+','+cy+')"><circle r="'+(ls*.42)+'"/><path d="M-4,-4L4,4M4,-4L-4,4"/></g>'}
    else s+='<circle class="s-dot p" cx="'+cx+'" cy="'+Y0+'" r="8"/>';
    s+='<text class="s-n" x="'+cx+'" y="'+(H-8)+'">'+n+'</text>';o+=link(n,v,s)});
  U.forEach(function(n,i){var cx=L+gw+us*i+us/2,v=rv(n);o+=link(n,v,'<rect class="s-hit" x="'+(cx-us/2)+'" y="'+(Y0-14)+'" width="'+us+'" height="28"/><circle class="s-dot" cx="'+cx+'" cy="'+Y0+'" r="'+Math.min(4.5,us*.32)+'"/>')});
  return o+'</svg>'}
function seasonLegend(){return '<p class="s-leg"><span><i class="up"></i>Went up</span><span><i class="dn"></i>Went down</span><span>Logo on top: the winner</span><span><i class="x"></i>No winner</span></p>'}
/* one round as a card: the film still on top, the name and the result underneath (never over the film's own text) */
function tkBadge(t){if(CO_LOGOS[String(t||"").toUpperCase()])return coMark(t);var s=String(t||"").split(".")[0].slice(0,5);
  return '<span class="co-mark tkb'+(s.length>3?' l'+s.length:'')+'" aria-hidden="true">'+esc(s)+'</span>'}
function rcard(n){var v=rv(n),f=v.st==="graded"?FILMS[n]:preFilm(v),g=v.st==="graded";
  var art=f?'<img src="'+MEDIA+f.p+'.jpg" alt="" loading="lazy" decoding="async">':'<span class="rc-soon">'+tkBadge(v.ticker)+'<small>Film soon</small></span>';
  var res=g?pill(v.a<0,v.out.replace(/^[+−-]/,""))+'<span class="ws">'+(v.win.length?v.win.map(function(m){return logo(m)}).join(""):'<span class="lg nob" aria-hidden="true">✗</span>')+'<span class="sr">'+(v.win.length?'Winner '+v.win.map(nm).join(" and "):'No winner')+'</span></span>'
    :'<span class="tag y"><i aria-hidden="true"></i>Calls in</span>';
  return '<li><a class="rc'+(g&&!v.win.length?' none':'')+(g?'':' pend')+'" href="#/round/'+n+'"'+(f?' data-f="'+f.f+'"':'')+'><span class="rc-art">'+art+'</span>'+
    '<span class="rc-b"><span class="rc-t"><small>Round '+n+'</small><b>'+esc(v.co)+'</b></span><span class="rc-r">'+res+'</span></span></a></li>'}
function vRounds(){var up=ROUNDS.filter(function(r){return r.a>0}).length,nw=ROUNDS.filter(function(r){return !r.win}).length;
  var res=PS.map(function(u){return u.n}).concat(ROUNDS.slice().reverse().map(function(r){return r.n}));
  var mo=null,cu='';if(PS.length)cu+='<h2 class="grp-h"><i aria-hidden="true"></i>Calls are in</h2><ul class="ul">'+PS.map(function(u){return urow(u,true)}).join("")+'</ul>';
  US.forEach(function(u){var d=mmdd(u.called),k=d?d.toLocaleString("en-US",{month:"long",year:"numeric"}):"Later";if(k!==mo){cu+=(mo?'</ul>':'')+'<h2 class="mo-h">'+esc(k)+'</h2><ul class="ul">';mo=k}cu+=urow(u,false)});if(mo)cu+='</ul>';
  return '<h1 tabindex="-1">Every round</h1><p class="sub">'+NR+' graded, '+(PS.length+US.length)+' to come. Each bar is one result, as big as the move. The logo on top won it.</p>'+
    '<figure class="season">'+seasonSVG(1000,320,"s-wide")+seasonSVG(420,330,"s-tall")+seasonLegend()+'</figure>'+
    '<div class="seg" role="tablist" aria-label="Rounds"><button type="button" role="tab" id="tbR" aria-selected="true" aria-controls="pnR">Results <b>'+NR+'</b></button><button type="button" role="tab" id="tbU" aria-selected="false" aria-controls="pnU">Coming up <b>'+(PS.length+US.length)+'</b></button></div>'+
    '<div id="pnR" role="tabpanel" aria-labelledby="tbR"><ul class="rcg">'+res.map(rcard).join("")+'</ul></div>'+
    '<div id="pnU" role="tabpanel" aria-labelledby="tbU" hidden>'+(cu||'<p class="empty">The next rounds are posted soon.</p>')+'<p class="note" style="margin-top:18px"><a href="#/upcoming">Countdown and calendar →</a></p></div>'}
function wireRounds(root){var tabs=[$("#tbR",root),$("#tbU",root)];
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",String(on));$("#"+x.getAttribute("aria-controls"),root).hidden=!on})}
  tabs.forEach(function(t,i){t.addEventListener("click",function(){sel(t)});t.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key==="ArrowLeft"){e.preventDefault();var o=tabs[1-i];sel(o);o.focus()}})});
  if(reduce||!matchMedia("(hover: hover)").matches)return;
  $$(".rc[data-f]",root).forEach(function(a){var v=null,box=$(".rc-art",a);
    a.addEventListener("mouseenter",function(){if(!v){v=document.createElement("video");v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute("aria-hidden","true");
      v.innerHTML='<source src="'+MEDIA+a.dataset.f+'.webm" type="video/webm"><source src="'+MEDIA+a.dataset.f+'.mp4" type="video/mp4">';box.appendChild(v)}
      var p=v.play();if(p&&p.catch)p.catch(function(){})});
    a.addEventListener("mouseleave",function(){if(v)v.pause()})})}

/* ---------- a round's page ---------- */
function filmBox(v){var f=v.st==="graded"?FILMS[v.n]:preFilm(v);
  if(!f)return '<div class="rfilm"><div class="seal"><span class="mark" aria-hidden="true"><span class="s">$</span><span class="e">E</span><span class="z">Z</span></span><span class="sl">'+(v.st==="sealed"?'Sealed until '+fmtDate(v.called):'Film soon')+'</span></div></div>';
  return '<div class="rfilm"><video playsinline muted loop preload="metadata" poster="'+MEDIA+f.p+'.jpg" aria-label="Round '+v.n+' film'+(v.st!=="graded"?', the calls':'')+'"'+(reduce?'':' autoplay')+'><source src="'+MEDIA+f.f+'.webm" type="video/webm"><source src="'+MEDIA+f.f+'.mp4" type="video/mp4"></video>'+
    '<button type="button" class="fp" id="fp" aria-pressed="'+(reduce?'true':'false')+'">'+(reduce?'▶ Play film':'❚❚ Pause film')+'</button></div>'}
function vRound(n){var v=rv(n);if(!v)return null;var i=ALLN.indexOf(n),pv=ALLN[i-1],nx=ALLN[i+1],g=v.st==="graded";
  var calls=v.calls.length?'<ul class="cr">'+v.calls.map(function(c){return '<li class="'+(c.win?'win':g&&c.ok?'ok':'')+'">'+(c.win?'<span class="crown"><i aria-hidden="true">👑</i>Winner</span>':'')+
      '<span class="rk">'+(g?(c.rank?'<span class="sr">Rank </span>'+c.rank:'<span class="x" aria-hidden="true">✗</span><span class="sr">Wrong way</span>'):'')+'</span><a class="who" href="#/model/'+c.m.toLowerCase()+'">'+logo(c.m)+'<span class="nm">'+nm(c.m)+'</span></a>'+
      '<span class="off">'+(g?'off '+c.off.toFixed(2):'')+'</span>'+pill(c.dn,c.mag)+'</li>'}).join("")+'</ul>'
    :'<p class="empty">Sealed. The calls are filed on '+fmtDate(v.called)+', before the report.</p>';
  var out=g?'<div class="outr"><small>'+ACTUAL_WORD+'</small>'+pill(v.a<0,v.out.replace(/^[+−-]/,""))+'</div><div class="winr'+(v.win.length?'':' none')+'"><small>Winner</small><span class="wv">'+(v.win.length?v.win.map(function(m){return '<span class="wn">'+logo(m)+nm(m)+'</span>'}).join(""):'<span class="wn">Nobody</span>')+'</span></div>'
    :'<div class="outr"><small>'+ACTUAL_WORD+'</small><span class="tag">'+RESOLVE_WORD+' '+fmtDate(v.resolves)+'</span></div>';
  var tl=timingLabel(v.timing);
  var rc=RECEIPTS&&RECEIPTS[n]?'<div class="rcpt"><small>Receipt</small><a href="'+esc(RECEIPTS[n])+'" target="_blank" rel="noopener">Calls posted before the report → view receipt</a></div>':'<div class="rcpt"><small>Receipt</small><span>Public proof of the calls, posted before the report. Link added at launch.</span></div>';
  return '<nav class="rnav" aria-label="Rounds">'+(pv?'<a href="#/round/'+pv+'">← R'+pv+'</a>':'<a class="gap" aria-hidden="true" tabindex="-1">←</a>')+'<a class="all" href="#/rounds">All rounds</a>'+(nx?'<a href="#/round/'+nx+'">R'+nx+' →</a>':'<a class="gap" aria-hidden="true" tabindex="-1">→</a>')+'</nav>'+
    '<div class="rh">'+(g?'<span class="tag n">Graded</span>':v.st==="calls"?'<span class="tag y"><i aria-hidden="true"></i>Calls are in</span>':'<span class="tag">Sealed</span>')+(v.tag?'<span class="tag y">'+esc(v.tag)+'</span>':'')+'<button type="button" class="shr rsh" data-share="'+n+'" aria-label="Share round '+n+'">'+shareGlyph()+'<span>Share</span></button></div>'+
    '<h1 tabindex="-1">Round '+n+' · '+coTkn(v)+'</h1>'+(v.head?'<p class="sub">'+esc(v.head)+'</p>':'')+
    '<div class="rgrid"><div>'+filmBox(v)+'</div><div><h2 class="grp-h" style="margin-top:0">The calls</h2>'+calls+out+
      '<div class="facts"><div><small>Calls filed</small><b>'+fmtDate(v.called)+'</b></div><div><small>'+(g?'Graded':RESOLVE_WORD)+'</small><b>'+fmtDate(v.resolves)+'</b></div></div>'+(tl?'<p class="note" style="margin-top:8px">Reports '+tl.toLowerCase()+'.</p>':'')+rc+'</div></div>'}
function wireRound(root,n){var v=rv(n),vid=$("video",root),fp=$("#fp",root);
  if(vid&&fp)fp.addEventListener("click",function(){if(vid.paused){var p=vid.play();if(p&&p.catch)p.catch(function(){});fp.textContent="❚❚ Pause film";fp.setAttribute("aria-pressed","false")}else{vid.pause();fp.textContent="▶ Play film";fp.setAttribute("aria-pressed","true")}});
  var sb=$(".rsh",root);if(sb)sb.addEventListener("click",function(){shareRound(sb)})}
/* shared links open the round's own page here */
function shURL(n){return location.href.replace(/#.*$/,"")+"#/round/"+n}

/* ---------- models ---------- */
var CROWN='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 19V8l5 4 4-8 4 8 5-4v11z" fill="#12131a"/></svg>';
function vModels(){
  return '<h1 tabindex="-1">The models</h1><p class="sub">Same question, same day, every round. Tap a model for its every call, its best and worst, and how close it gets.</p>'+
    '<div class="mg">'+RK.map(function(m,i){var C=CAR[m];return '<a class="box mcard'+(i?'':' lead')+'" href="#/model/'+m.toLowerCase()+'">'+(i?'':'<span class="crown"><i aria-hidden="true">👑</i>Leads</span>')+logo(m)+'<b>'+nm(m)+'</b>'+
      '<dl><dt>Rank</dt><dd>#'+rkOf(m)+'</dd><dt>Wins</dt><dd>'+C.won+'</dd><dt>Right way</dt><dd>'+C.right+'/'+C.g+'</dd><dt>Avg miss</dt><dd>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</dd></dl></a>'}).join("")+'</div>'}
function vModel(m){if(!CAR[m])return null;var C=CAR[m],calls=C.hist.filter(function(h){return !h.none});
  var okc=calls.filter(function(h){return h.ok}),best=okc.slice().sort(function(a,b){return a.off-b.off})[0],worst=calls.slice().sort(function(a,b){return b.off-a.off})[0];
  function callCard(h,lab){if(!h)return '<div class="box"><small>'+lab+'</small><b>Not yet</b><p>No right-way calls graded yet.</p></div>';var r=h.r,dn=/^DOWN/.test(h.said);
    return '<a class="box" href="#/round/'+r.n+'"><small>'+lab+'</small><b>R'+r.n+' · '+coTkn(r)+'</b><p>Called <strong>'+(dn?'down ':'up ')+esc(h.said.replace(/^\w+\s*/,""))+'</strong>. It moved <strong>'+r.out+'</strong>. '+(h.ok?'Right way, off by ':'Wrong way, off by ')+h.off.toFixed(2)+' points.</p></a>'}
  var st=C.streak?(C.streak.k+' '+(C.streak.ok?'right':'wrong')):'n/a';
  return '<nav class="mnav" aria-label="Models">'+RK.map(function(k){return '<a href="#/model/'+k.toLowerCase()+'"'+(k===m?' aria-current="page"':'')+'>'+logo(k)+nm(k)+'</a>'}).join("")+'</nav>'+
    '<div class="mh">'+logo(m)+'<div class="t"><span class="eb">#'+rkOf(m)+' in the standings</span><h1 tabindex="-1" style="margin-top:8px">'+nm(m)+'</h1><p class="note">'+C.g+' graded call'+(C.g===1?'':'s')+' so far.</p></div></div>'+
    '<div class="tiles"><div><small>Wins</small><b>'+C.won+'</b><span>Rounds won outright or shared</span></div><div><small>Right way</small><b>'+pctOf(C.right,C.g)+'%</b><span>'+C.right+' of '+C.g+' calls</span></div><div><small>Average miss</small><b>'+(C.avg==null?'n/a':C.avg.toFixed(2))+'</b><span>Points from the real move</span></div>'+
      '<div><small>Current streak</small><b>'+esc(st)+'</b><span>Right or wrong way, in a row</span></div></div>'+
    '<section class="blk" aria-labelledby="hiH"><div class="hh"><h2 id="hiH">Every round</h2><p>One dot per round. Tap one to open it.</p></div><ol class="strip">'+
      C.hist.map(function(h){var cls=h.none?"n":h.win?"w":h.ok?"g":"r",lab=h.none?"no call":h.win?"won":h.ok?"right way":"wrong way";
        return '<li><a href="#/round/'+h.n+'" aria-label="Round '+h.n+': '+lab+'"><span class="dt '+cls+'" aria-hidden="true">'+(h.win?CROWN:h.none?'·':h.ok?'✓':'✗')+'</span><small aria-hidden="true">R'+h.n+'</small></a></li>'}).join("")+'</ol>'+
      '<p class="legend"><span><i style="background:var(--ez-gold)"></i>Won</span><span><i style="background:var(--ez-green)"></i>Right way</span><span><i style="background:var(--ez-red)"></i>Wrong way</span><span><i style="background:var(--card)"></i>No call</span></p></section>'+
    '<section class="blk" aria-labelledby="bwH"><div class="hh"><h2 id="bwH">Best and worst</h2></div><div class="bw">'+callCard(best,"Best call · smallest miss, right way")+callCard(worst,"Worst call · biggest miss")+'</div></section>'+
    '<section class="blk" aria-labelledby="tgH"><div class="hh"><h2 id="tgH">How close</h2></div><div class="tgv tg1" id="tg1"></div></section>'}
function wireModel(root,m){var el=$("#tg1",root);if(el)targets(el,[m])}

/* ---------- upcoming ---------- */
function urow(u,pend){var c=mmdd(pend?u.resolves:u.called),tl=timingLabel(u.timing);
  return '<li><a class="ur'+(pend?' pend':'')+'" href="#/round/'+u.n+'">'+tkBadge(u.ticker)+'<span class="t"><b>R'+u.n+' · '+esc(u.co)+'</b><small>'+(pend?RESOLVE_WORD+' '+fmtDate(u.resolves):'Calls '+fmtDate(u.called)+' · '+RESOLVE_WORD+' '+fmtDate(u.resolves))+(tl?' · '+esc(tl):'')+'</small></span>'+
    (pend?'<span class="cp">'+u.calls.map(function(x){return '<span>'+logo(x.m)+'<span class="sr">'+nm(x.m)+'</span></span>'+pill(x.dir==="DOWN",x.mag+"%")}).join("")+'</span>'
      :(c?'<span class="dd" aria-hidden="true"><small>'+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][c.getMonth()]+'</small><b>'+c.getDate()+'</b></span>':''))+'</a></li>'}
function vUpcoming(){var n=PS.length+US.length,v=TARGET?rv(TARGET.n):null,pend=v&&v.st==="calls",t=null;
  if(v){var d=mmdd(pend?v.resolves:v.called);t=d?(pend?closeOn(d):+d):null}
  var nx=v?'<div class="box nx"><span class="eb">Next round</span><h2><a href="#/round/'+v.n+'">Round '+v.n+' · '+coTkn(v)+'</a></h2>'+
      (t&&t>Date.now()?'<p class="note" style="margin-top:6px">'+(pend?'Calls are in. The market answers in:':'The calls are filed in:')+'</p>'+cdHTML(t,pend?"Time to the result":"Time to the calls"):'<p class="note" style="margin-top:8px">'+(pend?'The market answers today. Results post soon.':'The calls are filed today.')+'</p>')+'</div>'
    :'<div class="box nx"><span class="eb">Season</span><h2>Every round is graded</h2></div>';
  var cal='<div class="box cal"><h3>Every round in your calendar</h3><p class="note">'+n+' round'+(n===1?'':'s')+' to come. Two all-day events each: the day the calls are filed, and the day the market answers. Works with Apple, Google and Outlook.</p>'+
    '<div><button type="button" class="btn" id="icsB"'+(n?'':' disabled')+'>Add all rounds to my calendar</button></div><p class="stat-msg" id="icsMsg" aria-live="polite"></p></div>';
  var body='';
  if(PS.length)body+='<h2 class="grp-h"><i aria-hidden="true"></i>Calls are in</h2><ul class="ul">'+PS.map(function(u){return urow(u,true)}).join("")+'</ul>';
  var mo=null;US.forEach(function(u){var d=mmdd(u.called),k=d?d.toLocaleString("en-US",{month:"long",year:"numeric"}):"Later";
    if(k!==mo){body+=(mo?'</ul>':'')+'<h2 class="mo-h">'+esc(k)+'</h2><ul class="ul">';mo=k}body+=urow(u,false)});if(mo)body+='</ul>';
  return '<h1 tabindex="-1">Up next</h1><p class="sub">Calls are filed before the report. The market answers at the next close. Tap a round to open it.</p><div class="ug">'+nx+cal+'</div>'+(body||'<p class="empty" style="margin-top:22px">The next rounds are posted soon.</p>')}

/* ---------- router: #/ is the board (Season). Other routes render into #view. Plain anchors scroll the board. ---------- */
var boardEl=$("#top"),view=$("#view"),firstR=true;
function route(){var h=location.hash,p=h.replace(/^#\/?/,"").split("/"),html=null,sec="board",wire=null;
  if(/^#\//.test(h)){
    if(p[0]==="round"&&/^\d+$/.test(p[1]||"")){var n=+p[1];html=vRound(n);sec="rounds";wire=function(r){wireRound(r,n)}}
    else if(p[0]==="rounds"){html=vRounds();sec="rounds";wire=wireRounds}
    else if(p[0]==="model"&&p[1]){var m=String(p[1]).toUpperCase();html=vModel(m);sec="models";wire=function(r){wireModel(r,m)}}
    else if(p[0]==="models"){html=vModels();sec="models"}
    else if(p[0]==="upcoming"){html=vUpcoming();sec="upcoming";wire=wireCal}}
  var onBoard=!html;
  $$("video",view).forEach(function(v){v.pause()});
  if(onBoard){view.hidden=true;view.innerHTML="";boardEl.hidden=false;
    var id=h&&!/^#\/?$/.test(h)&&!/^#\//.test(h)?h.slice(1):null,el=id?document.getElementById(id):null;
    if(id==="bet")sec="buyback";
    if(!firstR){if(el)requestAnimationFrame(function(){el.scrollIntoView({block:"start"})});else if(!id)window.scrollTo(0,0)}
    if(typeof home==="function")requestAnimationFrame(home)}
  else{boardEl.hidden=true;view.innerHTML=html;view.hidden=false;if(wire)wire(view);
    if(!firstR){window.scrollTo(0,0);var h1=$("h1",view);if(h1)h1.focus({preventScroll:true})}}
  $$(".nav a").forEach(function(a){if(a.dataset.r===sec)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
  document.title=onBoard?"EZ Season Live":(($("h1",view)||{}).textContent||"EZ")+" · EZ Season Live";
  firstR=false}
addEventListener("hashchange",route);
route();
