
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
function poster(n){var v=rv(n),f=v.st==="graded"?FILMS[n]:preFilm(v),cls="pt-a"+(f?"":" soon")+(v.st==="calls"?" pend":"");
  var head='<span class="pt-h"><small>Round '+n+'</small>'+(v.st==="calls"?'<span class="tag y y-live"><i aria-hidden="true"></i>Calls in</span>':v.tag?'<span class="tag y">'+esc(v.tag)+'</span>':'')+'</span>';
  var foot='<span class="pt-f"><b class="ttl">'+esc(v.co)+'</b>'+(v.st==="graded"?pill(v.a<0,v.out.replace(/^[+−-]/,""))+winIcons(v):'<span class="tag">'+RESOLVE_WORD+' '+fmtDate(v.resolves)+'</span>')+'</span>';
  var art=f?'<img src="'+MEDIA+f.p+'.jpg" alt="" loading="lazy" decoding="async">':tkBadge(v.ticker)+'<span class="fs">Film soon</span>';
  return '<li data-w="'+(v.st==="graded"?(v.win.length?v.win.join(" "):"NONE"):"PEND")+'"><a class="'+cls+'" href="#/round/'+n+'"'+(f?' data-f="'+f.f+'"':'')+' aria-label="'+esc(plain(v))+(v.st==="graded"?', '+v.out+', '+(v.win.length?'won by '+v.win.map(nm).join(" and "):'no winner'):', calls are in')+'">'+art+head+foot+'</a></li>'}
function vRounds(){
  var up=ROUNDS.filter(function(r){return r.a>0}).length,big=ROUNDS.slice().sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)})[0],best=null;
  ROUNDS.forEach(function(r){parsed(r).forEach(function(c){if(c.ok&&(!best||c.off<best.c.off))best={r:r,c:c}})});
  var nw=ROUNDS.filter(function(r){return !r.win}).length;
  var sum='<div class="rs-sum"><div><small>Graded</small><b>'+NR+'</b><span>'+(PS.length?PS.length+' with calls in · ':'')+US.length+' to come</span></div>'+
    '<div><small>Went up</small><b>'+up+' of '+NR+'</b><span>Down '+(NR-up)+' times</span></div>'+
    (big?'<div><small>Biggest move</small><b>'+big.out+'</b><span>R'+big.n+' · '+esc(big.co)+'</span></div>':'')+
    (best?'<div><small>Closest call</small><b>'+best.c.off.toFixed(2)+'</b><span>Points off · '+nm(best.c.m)+', R'+best.r.n+'</span></div>':'')+'</div>';
  var fl=[['all','All',NR+PS.length]].concat(RK.filter(function(m){return CAR[m]&&CAR[m].won}).map(function(m){return [m,nm(m)+' wins',CAR[m].won]}));if(nw)fl.push(['NONE','No winner',nw]);
  var flt='<div class="flt" role="group" aria-label="Filter the rounds">'+fl.map(function(f,i){return '<button type="button" data-fl="'+f[0]+'" aria-pressed="'+(i?'false':'true')+'">'+(MODELS[f[0]]?logo(f[0]):'')+f[1]+' <b>'+f[2]+'</b></button>'}).join("")+'</div>';
  var list=PS.map(function(u){return u.n}).concat(ROUNDS.slice().reverse().map(function(r){return r.n}));
  return '<h1 tabindex="-1">Every round</h1><p class="sub">Calls filed before the report. Graded at the first market close after it, on the closing price. Never edited. Tap a round for the film, the calls and a share image.</p>'+
    sum+flt+'<ul class="pg" id="pg">'+list.map(poster).join("")+'</ul>'+
    (US.length?'<p class="note" style="margin-top:22px">'+US.length+' more rounds are scheduled. <a href="#/upcoming">See what\'s coming →</a></p>':'')}
function wireRounds(root){
  $$("[data-fl]",root).forEach(function(b){b.addEventListener("click",function(){var k=b.dataset.fl;
    $$("[data-fl]",root).forEach(function(x){x.setAttribute("aria-pressed",String(x===b))});
    $$("#pg li",root).forEach(function(li){var w=li.dataset.w.split(" ");li.hidden=!(k==="all"||w.indexOf(k)>-1)})})});
  /* a poster plays its film while you hover it (mouse only, never with reduced motion) */
  if(reduce||!matchMedia("(hover: hover)").matches)return;
  $$(".pt-a[data-f]",root).forEach(function(a){var v=null;
    a.addEventListener("mouseenter",function(){if(!v){v=document.createElement("video");v.muted=true;v.loop=true;v.playsInline=true;v.setAttribute("aria-hidden","true");
      v.innerHTML='<source src="'+MEDIA+a.dataset.f+'.webm" type="video/webm"><source src="'+MEDIA+a.dataset.f+'.mp4" type="video/mp4">';a.insertBefore(v,a.children[1])}
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
    '<div class="rh">'+(g?'<span class="tag n">Graded</span>':v.st==="calls"?'<span class="tag y"><i aria-hidden="true"></i>Calls are in</span>':'<span class="tag">Sealed</span>')+(v.tag?'<span class="tag y">'+esc(v.tag)+'</span>':'')+'</div>'+
    '<h1 tabindex="-1">Round '+n+' · '+coTkn(v)+'</h1>'+(v.head?'<p class="sub">'+esc(v.head)+'</p>':'')+
    '<div class="rgrid"><div>'+filmBox(v)+'</div><div><h2 class="grp-h" style="margin-top:0">The calls</h2>'+calls+out+
      '<div class="facts"><div><small>Calls filed</small><b>'+fmtDate(v.called)+'</b></div><div><small>'+(g?'Graded':RESOLVE_WORD)+'</small><b>'+fmtDate(v.resolves)+'</b></div></div>'+(tl?'<p class="note" style="margin-top:8px">Reports '+tl.toLowerCase()+'.</p>':'')+rc+'</div></div>'+
    '<section class="blk" aria-labelledby="shH"><div class="hh"><h2 id="shH">Share this round</h2></div><div class="share"><canvas id="cv" width="1200" height="675" role="img" aria-label="Share image for '+esc(plain(v))+'"></canvas>'+
      '<div class="acts"><p class="note">A 1200 by 675 image with the calls, the outcome and the standings. Made on this page, saved by you.</p><button type="button" class="btn" id="dlB">Download share image</button><button type="button" class="btn lt" id="cpB">Copy link</button><p class="stat-msg" id="shMsg" aria-live="polite"></p></div></div></section>'}
function wireRound(root,n){var v=rv(n),vid=$("video",root),fp=$("#fp",root);
  if(vid&&fp)fp.addEventListener("click",function(){if(vid.paused){var p=vid.play();if(p&&p.catch)p.catch(function(){});fp.textContent="❚❚ Pause film";fp.setAttribute("aria-pressed","false")}else{vid.pause();fp.textContent="▶ Play film";fp.setAttribute("aria-pressed","true")}});
  var cv=$("#cv",root);drawCard(cv,v);
  if(document.fonts&&document.fonts.load)Promise.all(['800 40px "Barlow Condensed"','700 20px "Barlow"'].map(function(f){return document.fonts.load(f).catch(function(){})})).then(function(){if(cv.isConnected)drawCard(cv,v)});
  $("#dlB",root).addEventListener("click",function(){var msg=$("#shMsg",root);try{cv.toBlob(function(b){if(b)save(b,"ez-round-"+n+".png").then(function(){msg.textContent="Saved ez-round-"+n+".png."},function(e){msg.textContent=e&&e.code==="declined"?"No file saved.":"Couldn't save the image here."});else msg.textContent="Could not make the image in this browser."},"image/png")}catch(e){msg.textContent="Could not make the image in this browser."}});
  $("#cpB",root).addEventListener("click",function(){var url=location.href.replace(/#.*$/,"")+"#/round/"+n,msg=$("#shMsg",root);
    function fb(){msg.innerHTML='<label class="sr" for="lnk">Link to this round</label><input class="linkbox" id="lnk" readonly value="'+esc(url)+'">';var i=$("#lnk",root);i.focus();i.select();try{document.execCommand("copy")}catch(e){}}
    if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(url).then(function(){msg.textContent="Link copied."},fb);else fb()})}

/* ---------- the share image, drawn on canvas (no images, so it never taints and always saves) ---------- */
var PATHS={};function mpath(d){if(!PATHS[d])PATHS[d]=new Path2D(d);return PATHS[d]}
function rrect(c,x,y,w,h,r){c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath()}
function fit(c,txt,font,size,max){c.font=font.replace("%",size+"px");while(c.measureText(txt).width>max&&size>10){size-=2;c.font=font.replace("%",size+"px")}return size}
function tri(c,x,y,s,dn){c.beginPath();if(dn){c.moveTo(x,y-s*.45);c.lineTo(x+s,y-s*.45);c.lineTo(x+s/2,y+s*.45)}else{c.moveTo(x,y+s*.45);c.lineTo(x+s,y+s*.45);c.lineTo(x+s/2,y-s*.45)}c.closePath();c.fill()}
function drawLogo(c,m,x,y,s){var M=MODELS[m];rrect(c,x,y,s,s,s*.225);c.fillStyle=M.bg;c.fill();c.lineWidth=2;c.strokeStyle="#12131a";c.stroke();
  c.save();var k=s*.62/24;c.translate(x+s*.19,y+s*.19);c.scale(k,k);c.fillStyle=M.fg;c.fill(mpath(M.d),M.fr==="evenodd"?"evenodd":"nonzero");if(M.dot){c.fillStyle=M.dotc;c.fill(mpath(M.dot))}c.restore()}
function crownPath(c,x,y,w){var h=w*.7;c.beginPath();c.moveTo(x,y+h);c.lineTo(x,y+h*.25);c.lineTo(x+w*.27,y+h*.55);c.lineTo(x+w*.5,y);c.lineTo(x+w*.73,y+h*.55);c.lineTo(x+w,y+h*.25);c.lineTo(x+w,y+h);c.closePath()}
function drawCard(cv,v){var c=cv.getContext("2d");if(!c)return;
  var INK="#12131a",FIELD="#f4efe6",CARD="#ffffff",SLAB="#101a3a",GOLD="#ffc72c",GRN="#1fcf6b",RED="#ff4136",INK2="#4a4c58",ON2="#b9c0d6";
  var FD='800 % "Barlow Condensed", Impact, sans-serif',FB='700 % "Barlow", system-ui, sans-serif';
  c.clearRect(0,0,1200,675);c.fillStyle=FIELD;c.fillRect(0,0,1200,675);
  c.fillStyle=SLAB;c.fillRect(0,0,1200,150);
  c.textBaseline="alphabetic";c.font=FD.replace("%","64px");
  var mx=48;[["$",GOLD],["E",GRN],["Z",RED]].forEach(function(p){c.fillStyle=p[1];c.fillText(p[0],mx,98);mx+=c.measureText(p[0]).width+1});
  c.fillStyle=GOLD;c.font=FB.replace("%","20px");c.fillText(("ROUND "+v.n+(v.st==="graded"?" · GRADED "+fmtDate(v.resolves):v.st==="calls"?" · CALLS ARE IN":" · CALLS "+fmtDate(v.called))).toUpperCase(),170,62);
  var title=plainCo(v).toUpperCase();fit(c,title,FD,58,980);c.fillStyle="#ffffff";c.fillText(title,170,118);
  c.fillStyle=GOLD;c.fillRect(0,150,1200,6);
  rrect(c,48,184,700,404,22);c.fillStyle=CARD;c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
  c.fillStyle=INK2;c.font=FB.replace("%","17px");c.fillText("THE CALLS",72,218);
  var rows=v.calls.length?v.calls:ACTIVE.map(function(m){return {m:m,sealed:true}}),y=236,rh=80;
  rows.slice(0,4).forEach(function(cl){var g=v.st==="graded";
    rrect(c,68,y,660,rh-12,14);c.fillStyle=cl.win?GOLD:(g&&cl.ok?"#e2f8eb":FIELD);c.fill();c.lineWidth=cl.win?3.5:2;c.strokeStyle=INK;c.stroke();
    drawLogo(c,cl.m,84,y+10,48);
    c.fillStyle=INK;c.font=FD.replace("%","36px");c.fillText(nm(cl.m).toUpperCase(),148,y+48);
    var nw=c.measureText(nm(cl.m).toUpperCase()).width;
    if(cl.win){var wx=148+nw+16;rrect(c,wx,y+20,124,30,15);c.fillStyle=CARD;c.fill();c.lineWidth=2;c.stroke();c.fillStyle=GOLD;crownPath(c,wx+12,y+26,24);c.fill();c.lineWidth=1.5;c.strokeStyle=INK;c.stroke();c.fillStyle=INK;c.font=FB.replace("%","16px");c.fillText("WINNER",wx+44,y+41)}
    if(cl.sealed){c.fillStyle=INK2;c.font=FB.replace("%","18px");c.textAlign="right";c.fillText("SEALED UNTIL "+fmtDate(v.called).toUpperCase(),708,y+44);c.textAlign="left"}
    else{var pw=128;rrect(c,708-pw,y+12,pw,44,9);c.fillStyle=cl.dn?RED:GRN;c.fill();c.fillStyle=INK;tri(c,708-pw+14,y+34,18,cl.dn);c.font=FD.replace("%","32px");c.textAlign="right";c.fillText(cl.mag,708-14,y+46);c.textAlign="left";
      if(g){c.fillStyle=INK2;c.font=FB.replace("%","17px");c.textAlign="right";c.fillText(cl.ok?"OFF "+cl.off.toFixed(2):"WRONG WAY",708-pw-16,y+42);c.textAlign="left"}}
    y+=rh});
  rrect(c,780,184,372,186,22);c.fillStyle=v.st==="graded"?(v.a<0?RED:GRN):CARD;c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
  c.fillStyle=INK;c.font=FB.replace("%","18px");c.fillText(ACTUAL_WORD.toUpperCase(),806,222);
  if(v.st==="graded"){tri(c,808,300,46,v.a<0);c.font=FD.replace("%","104px");c.fillText(v.out.replace(/^[+−-]/,""),868,334)}
  else{c.font=FD.replace("%","52px");c.fillText(RESOLVE_WORD.toUpperCase()+" "+fmtDate(v.resolves).toUpperCase(),806,300);c.font=FB.replace("%","18px");c.fillStyle=INK2;c.fillText("At the first market close after the report",806,336)}
  rrect(c,780,394,372,194,22);c.fillStyle=SLAB;c.fill();c.lineWidth=4;c.strokeStyle=INK;c.stroke();
  c.fillStyle=GOLD;c.font=FD.replace("%","34px");c.fillText("WINNER",806,440);
  if(v.st==="graded"){if(v.win.length){var wy=468;v.win.slice(0,2).forEach(function(m){drawLogo(c,m,806,wy,46);c.fillStyle="#ffffff";c.font=FD.replace("%","44px");c.fillText(nm(m).toUpperCase(),866,wy+40);wy+=56})}
    else{c.fillStyle="#ffffff";c.font=FD.replace("%","48px");c.fillText("NOBODY",806,510);c.fillStyle=ON2;c.font=FB.replace("%","18px");c.fillText("Every call went the wrong way",806,546)}}
  else{c.fillStyle="#ffffff";c.font=FD.replace("%","44px");c.fillText("TO BE GRADED",806,508);c.fillStyle=ON2;c.font=FB.replace("%","18px");c.fillText("By the market, not by us",806,546)}
  c.fillStyle=INK;c.fillRect(0,612,1200,63);
  c.fillStyle=GOLD;c.font=FB.replace("%","17px");c.fillText("STANDINGS",48,651);
  var line=ROWS.map(function(T){return nm(T.m).toUpperCase()+" "+T.won}).join("  ·  ");c.fillStyle="#ffffff";fit(c,line,FD,30,560);c.fillText(line,160,652);
  c.fillStyle=ON2;c.font=FB.replace("%","16px");c.textAlign="right";c.fillText("Calls filed before the report. Graded by the market.",1152,650);c.textAlign="left"}

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
