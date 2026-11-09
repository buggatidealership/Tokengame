/* EZ Matchday (W2): every earnings report is a fixture, LONG v SHORT; the four AIs line up on either side.
   Data: ez-data.js (ROUNDS, PENDING, UPCOMING, MODELS, CO_LOGOS, FILMS), resolution/paths.js (PATHS), maps.js (REPORT, HL snapshot). */
(function(){
"use strict";
/* ================= clock: real time, ?now=ISO for a fixed moment, or the film's R(t) ================= */
var Q=new URLSearchParams(location.search),T0=Q.get("now")?Date.parse(Q.get("now")):null,RT=null,RMODE=Q.has("r"),BOOT=performance.now();
function now(){return RT!=null?T0+RT*1000:(T0!=null?T0+(performance.now()-BOOT):Date.now())}

/* ================= data ================= */
var MK=["GPT","KIMI","CLAUDE","GROK"],TC={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"},FLAG={KIMI:"CN",GPT:"US",CLAUDE:"US",GROK:"US"};
var REPORT=(window.W2MAPS||{}).REPORT||{},HL=(window.W2MAPS||{}).HL||{};
function pd(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?{y:2000+(+m[3]%100),m:+m[1],d:+m[2]}:null}
function side(t){return /^DOWN/i.test(t)?-1:1}
function mag(t){return parseFloat(String(t).replace(/[^0-9.]/g,""))}
function app(m){return MODELS[m].app}

/* exchanges: [time zone, close h, close m, name, open h, open m] */
var EXC={"":["America/New_York",16,0,"NYSE",9,30],T:["Asia/Tokyo",15,30,"Tokyo",9,0],KS:["Asia/Seoul",15,30,"Seoul",9,0],KQ:["Asia/Seoul",15,30,"Seoul",9,0],TW:["Asia/Taipei",13,30,"Taipei",9,0],HK:["Asia/Hong_Kong",16,0,"Hong Kong",9,30],
  DE:["Europe/Berlin",17,30,"Frankfurt",9,0],AS:["Europe/Amsterdam",17,30,"Amsterdam",9,0],PA:["Europe/Paris",17,30,"Paris",9,0],SW:["Europe/Zurich",17,30,"Zurich",9,0],MI:["Europe/Rome",17,30,"Milan",9,0],L:["Europe/London",16,30,"London",8,0]};
function exOf(tk){var x=(String(tk||"").match(/\.([A-Z]+)$/)||[])[1]||"";return EXC[x]||EXC[""]}
function parts(ms,tz){var p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",weekday:"short"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=x.type==="weekday"?x.value:+x.value});return p}
function tzOff(ms,tz){var p=parts(ms,tz);return Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute)-Math.floor(ms/6e4)*6e4}
function at(ymd,tz,h,m){var g=Date.UTC(ymd.y,ymd.m-1,ymd.d,h,m);return g-tzOff(g,tz)}
function closeOn(ymd,tk){var e=exOf(tk);return at(ymd,e[0],e[1],e[2])}
function nextClose(afterMs,tk){var e=exOf(tk),c=parts(afterMs,e[0]);for(var i=0;i<10;i++){var dt=new Date(Date.UTC(c.year,c.month-1,c.day+i)),wd=dt.getUTCDay();if(wd===0||wd===6)continue;var t=closeOn({y:dt.getUTCFullYear(),m:dt.getUTCMonth()+1,d:dt.getUTCDate()},tk);if(t>afterMs)return t}return null}
/* is the grading exchange in session right now, on the grading day? */
function inSession(t,ft,tk){var e=exOf(tk),p=parts(t,e[0]),q=parts(ft,e[0]);if(p.weekday==="Sat"||p.weekday==="Sun")return false;if(p.year!==q.year||p.month!==q.month||p.day!==q.day)return false;var mm=p.hour*60+p.minute;return mm>=e[4]*60+e[5]&&mm<e[1]*60+e[2]}

/* every graded trade: flat $100K, P&L = $100K x side x move */
var T={};MK.forEach(function(m){T[m]=[]});
ROUNDS.forEach(function(r){var y=pd(r.resolves)||pd(r.called);r._ft=closeOn(y,r.ticker);r._win=(r.win||"").split(" & ").filter(Boolean);
  r.calls.forEach(function(c){var s=side(c[1]);T[c[0]].push({r:r,s:s,mag:mag(c[1]),pnl:1000*s*r.a,ok:(s>0)===(r.a>0),date:r._ft})})});
function agg(m,days){var lim=days?now()-days*864e5:-Infinity,L=T[m].filter(function(x){return x.date>=lim&&x.date<=now()}),p=0,w=0;L.forEach(function(x){p+=x.pnl;if(x.ok)w++});return {L:L,p:p,w:w,l:L.length-w,n:L.length,hr:L.length?w/L.length:0}}
function rank(days){return MK.slice().sort(function(a,b){return agg(b,days).p-agg(a,days).p})}

/* fixtures: rounds in play (PENDING) and rounds to come (UPCOMING) */
function fixtures(){var F=[];
  (PENDING||[]).forEach(function(p){var g=pd(p.resolves),ft;if(g)ft=closeOn(g,p.ticker);else{var c=pd(p.called);ft=c?nextClose(Date.UTC(c.y,c.m-1,c.d,23,59),p.ticker):null}
    var R=REPORT[p.ticker];F.push({n:p.n,co:p.co,tk:p.ticker,kind:"pend",calls:(p.calls||[]).map(function(c){return {m:c.m,s:c.dir==="DOWN"?-1:1,mag:+c.mag}}),ko:R?Date.parse(R.t):null,kest:!!(R&&R.est),ft:ft,fest:!g})});
  UPCOMING.forEach(function(u){var R=REPORT[u.ticker],ko=R?Date.parse(R.t):null;F.push({n:u.n,co:u.co,tk:u.ticker,kind:"up",calls:[],ko:ko,kest:!!(R&&R.est),ft:ko?nextClose(ko,u.ticker):null,fest:!!(R&&R.est)})});
  return F}
/* live = trades in and the grading exchange is in session; in play = trades in, exchange shut; await = the bell has rung */
function stateOf(f){var t=now();if(f.calls.length){if(!f.ft)return "ip";if(t>=f.ft)return "await";return inSession(t,f.ft,f.tk)?"live":"ip"}
  if(f.ko&&t>=f.ko)return f.ft&&t<f.ft?"nolu":"await";return "pre"}

/* ================= formatting ================= */
var TZN=(function(){try{return new Intl.DateTimeFormat("en-US",{timeZoneName:"short"}).formatToParts(new Date(now())).filter(function(p){return p.type==="timeZoneName"})[0].value}catch(e){return ""}})();
function hm(ms){return new Date(ms).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"})}
function tl(ms,est){return (est?"~":"")+hm(ms)}
function hmP(ms,est){var s=hm(ms).split(" ");return (est?"~":"")+s[0]+'<small>'+s[1]+' '+TZN+'</small>'}
function rng(a,b,est){var A=hm(a),B=hm(b),ma=A.slice(-2),mb=B.slice(-2);return (est?"~":"")+(ma===mb?A.slice(0,-3):A)+" to "+B}
function dkey(ms){var d=new Date(ms);return d.getFullYear()*1e4+(d.getMonth()+1)*100+d.getDate()}
function dshort(ms){return new Date(ms).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
function wd(ms){return new Date(ms).toLocaleDateString("en-US",{weekday:"short"})}
function rel(ms){var k=dkey(ms);return k===dkey(now())?"Today":k===dkey(now()+864e5)?"Tomorrow":k===dkey(now()-864e5)?"Yesterday":""}
function dayHead(ms){var r=rel(ms);return r?r+' <span>'+dshort(ms)+'</span>':dshort(ms)}
function whenDay(ms){var r=rel(ms);return r==="Today"?"":(r||wd(ms))+" "}
function money(v,k){var a=Math.abs(Math.round(v)),s=k&&a>=1e3?(a/1e3).toFixed(a>=1e5?0:1)+"K":a.toLocaleString("en-US");return (v<0?"−":"+")+"$"+s}
function pct(a){return (a<0?"−":"+")+Math.abs(a).toFixed(2)+"%"}
function cdx(ms){var s=Math.max(0,Math.floor(ms/1000)),d=Math.floor(s/86400),h=Math.floor(s%86400/3600),m=Math.floor(s%3600/60),x=s%60,p=function(n){return (n<10?"0":"")+n};
  return d>=2?d+"d "+h+"h":s>=3600?(d*24+h)+"h "+p(m)+"m":m+"m "+p(x)+"s"}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}
function winners(w){return w.length?w.map(app).join(" & ")+" won":"Nobody won"}

/* ================= marks ================= */
var DIM={bg:"#161a23",fg:"#6b717c",ring:"rgba(244,239,226,.16)"};
function crest(m,px,crown,dim){var M=MODELS[m];return '<span class="cr" style="width:'+px+'px;height:'+px+'px;background:'+(dim?DIM.bg:M.bg)+';--tc:'+(dim?DIM.ring:TC[m])+'" title="'+M.app+'"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="'+(dim?DIM.fg:M.fg)+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+(dim?DIM.fg:M.dotc)+'" d="'+M.dot+'"/>':'')+'</svg>'+(crown?CROWN:'')+'</span>'}
var CROWN='<svg class="crown" viewBox="0 0 24 14" aria-label="closest trade"><path fill="#fdbc2a" stroke="#05070c" stroke-width="1.2" stroke-linejoin="round" d="M2 12.5 1 3l6 4.5L12 1l5 6.5L23 3l-1 9.5z"/></svg>';
/* name and ticker travel together, so a wordmark too small to read in its disc is still named */
function tkr(t){return '<em class="tkr">'+esc(t)+'</em>'}
function logo(t,px){var L=CO_LOGOS[t];
  return '<span class="lg'+(L&&L.dark?' k':'')+'" style="width:'+px+'px;height:'+px+'px">'+(L?'<img src="../../../../media/'+L.f+'" alt="">':'')+'</span>'}
function flag(c){return c==="CN"?'<svg class="fl" viewBox="0 0 30 20" aria-label="China"><rect width="30" height="20" fill="#de2910"/><path fill="#ffde00" d="M6 3l1.2 3.6H11L8 8.8l1.1 3.6L6 10.2 2.9 12.4 4 8.8 1 6.6h3.8z"/></svg>':'<svg class="fl" viewBox="0 0 30 20" aria-label="United States"><rect width="30" height="20" fill="#b22234"/>'+[2.3,6.9,11.5,16.1].map(function(y){return '<rect y="'+y+'" width="30" height="1.55" fill="#fff"/>'}).join("")+'<rect width="13" height="10.8" fill="#3c3b6e"/></svg>'}
function hlUrl(t){var h=HL[t];return h?'https://app.hyperliquid.xyz/trade/'+h[1]+':'+h[0]:''}
function hlLink(t){return HL[t]?'<a class="hlp" href="'+hlUrl(t)+'" target="_blank" rel="noopener"><span class="hl-l">Hyperliquid</span><span class="hl-s">HL</span> ›</a>':''}

/* ================= components ================= */
/* the match card: LONG v SHORT, every AI named under its mark */
function matchCard(o){var L=o.calls.filter(function(c){return c.s>0}),S=o.calls.filter(function(c){return c.s<0}),done=o.state==="ft",wS=done?(o.move<0?"S":"L"):"",pre=!o.calls.length;
  function col(arr,k,lab){var lose=done&&wS!==k,px=arr.length>=3?28:34,cls="sd "+k+(done?(wS===k?" win":" lose"):"");
    return '<div class="'+cls+'"><h4>'+lab+'</h4><div class="sl'+(arr.length===4?' n4':'')+'">'+(arr.length?arr.map(function(c){return '<div class="p">'+crest(c.m,px,done&&o.win.indexOf(c.m)>-1,lose)+'<span class="an">'+app(c.m)+'</span><small>'+c.mag+'<em>%</em></small></div>'}).join(""):'<div class="none">'+(pre?'Not in yet':'Nobody')+'</div>')+'</div></div>'}
  var st={live:'<span class="st live"><i></i>LIVE</span>',ip:'<span class="st ip"><i></i>IN PLAY</span>',ft:'<span class="st ft">FT</span>',await:'<span class="st aw">RESULT DUE</span>',pre:'<span class="st pre">UP NEXT</span>',nolu:'<span class="st aw">TRADES NOT IN</span>'}[o.state],
      mid=done?'<span class="sc '+(o.move<0?"d":"u")+'">'+pct(o.move)+'</span>':pre?(o.ko?'<span class="lab">Kickoff</span><span class="ko2">'+tl(o.ko,o.kest)+'</span>':''):'<span class="sc q num">'+L.length+'<i class="v">v</i>'+S.length+'</span>';
  return '<div class="mc"><div class="mc-hd">'+st+'<span>Round '+o.n+'</span><span class="r">'+(o.hdr||"")+'</span></div>'+
    '<div class="mc-bd">'+col(L,"L","LONG")+'<div class="mid">'+logo(o.tk,52)+'<span class="nm">'+esc(o.co)+'</span><span class="tk">'+esc(o.tk)+'</span>'+mid+'</div>'+col(S,"S","SHORT")+'</div>'+
    (o.foot?'<div class="mc-ft">'+o.foot+'</div>':'')+'</div>'}
function pendHdr(f,st){return st==="await"?"Graded "+whenDay(f.ft)+tl(f.ft,f.fest):"Grades "+whenDay(f.ft)+tl(f.ft,f.fest)}
function liveCard(f,link){var st=stateOf(f),ex=exOf(f.tk);
  var foot=st==="live"?'<span>Trades in before the report. The '+ex[3]+' close at <b>'+tl(f.ft,f.fest)+'</b> grades all four. <b class="num" data-cd="'+f.ft+'" data-pre="Closes in ">Closes in '+cdx(f.ft-now())+'</b></span>':
    st==="ip"?'<span>Trades in before the report. The market is shut; the '+ex[3]+' close <b>'+whenDay(f.ft)+tl(f.ft,f.fest)+'</b> grades all four.</span>':'<span>The close has rung. The result posts when the sheet updates.</span>';
  var c=matchCard({n:f.n,co:f.co,tk:f.tk,calls:f.calls,state:st,ft:f.ft,ko:f.ko,kest:f.kest,hdr:pendHdr(f,st),foot:foot});
  return link===false?c:'<a href="#match/'+f.n+'" style="display:block">'+c+'</a>'}
function fixRow(f){var st=stateOf(f),due=f.ko?(st==="pre"?'Trades<span class="xs"> due</span> <i>'+rng(f.ko-2*36e5,f.ko-36e5,f.kest)+'</i>'+(f.kest?' (est.)':''):'Trades not in yet'):'Report date to come';
  return '<div class="fr"><a class="cover" href="#match/'+f.n+'" aria-label="'+esc(f.co)+', round '+f.n+'"></a><span class="ko'+(f.ko?'':' tbc')+'">'+(f.ko?hmP(f.ko,f.kest):'TBC')+'</span>'+logo(f.tk,36)+
    '<span class="who"><span class="nl"><b>'+esc(f.co)+tkr(f.tk)+'</b>'+hlLink(f.tk)+'</span><span>'+due+'</span>'+(f.ft?'<span>Full time '+whenDay(f.ft)+tl(f.ft,f.fest)+'</span>':'')+'</span></div>'}
function resRow(r){var calls={};r.calls.forEach(function(c){calls[c[0]]=side(c[1])});
  var lu=MK.filter(function(m){return calls[m]}).map(function(m){var ok=calls[m]*r.a>0;return crest(m,19,r._win.indexOf(m)>-1,!ok)}).join("");
  return '<a class="rr" href="#match/'+r.n+'">'+logo(r.ticker,36)+'<span class="who"><b>'+esc(r.co)+tkr(r.ticker)+'</b><span>'+winners(r._win)+'</span></span><span class="lu">'+lu+'</span><span class="sc '+(r.a<0?"d":"u")+'">'+pct(r.a)+'</span></a>'}
function tableStrip(){var R=rank(0);return '<div class="ts">'+R.map(function(m,i){var a=agg(m,0);return '<a class="tc'+(i===0?' g':'')+'" href="#team/'+m+'" style="--tc:'+TC[m]+'"><span class="pos">'+(i+1)+'</span>'+crest(m,30)+'<b>'+app(m)+'</b><span class="pl '+(a.p<0?"d":"u")+'">'+money(a.p,1)+'</span></a>'}).join("")+'</div>'}
function weekBar(){var first=Date.UTC(2026,8,7),wk=Math.floor((now()-first)/(7*864e5))+1,last=Math.floor((Date.UTC(2026,10,17)-first)/(7*864e5))+1;
  return {wk:Math.min(wk,last),last:last,bar:'<span class="bar">'+Array.from({length:last},function(_,i){return '<i class="'+(i+1<wk?'on':i+1===wk?'now':'')+'"></i>'}).join("")+'</span>'}}
function hero(){var m=rank(0)[0],a=agg(m,0),w=weekBar();
  return '<div class="hero"><div><div class="ey">'+w.bar+'Season 1 · Week '+w.wk+' of '+w.last+'</div><h1>'+crest(m,40)+'<span>'+app(m)+' leads. <span class="pl'+(a.p<0?' d':'')+'">'+money(a.p,0)+'</span><small>on '+a.n+' trades, $100K each</small></span></h1></div>'+
    '<p>4 AIs trade every earnings report. $100K a trade, graded at the close.</p></div>'}

/* ================= views ================= */
var VIEW="today",ARG=null,STATE={win:0,hlo:0,more:0};
function nextBell(F){var act=F.filter(function(f){var s=stateOf(f);return s==="live"||s==="ip"}).sort(function(a,b){return a.ft-b.ft}),t=now();
  if(act.length){var b=act[0].ft;return {t:b,est:act[0].fest,ex:exOf(act[0].tk),grades:act.filter(function(f){return f.ft===b})}}
  return {t:nextClose(t,""),ex:EXC[""],grades:[]}}
function scorebug(F){var b=nextBell(F),g=b.grades;
  var x=g.length?logo(g[0].tk,32)+'<span class="lab">Grades<b>'+(g.length===1?esc(g[0].co.split(" ")[0]):g.length+' rounds')+'</b></span>':'<span class="lab">Grades<b>Nothing</b></span>';
  return '<div class="bug"><div class="bug-k">Next<br>bell<small>'+b.ex[3]+'</small></div><div class="bug-t"><b class="num"><em>Closes in</em><span data-cd="'+b.t+'" style="display:inline;margin:0;color:inherit;font:inherit">'+cdx(b.t-now())+'</span></b><span>'+(rel(b.t)||wd(b.t))+' '+tl(b.t,b.est)+' '+TZN+'</span></div><div class="bug-x">'+x+'</div></div>'}
function lastDay(){var mx=0;ROUNDS.forEach(function(r){if(r._ft<=now())mx=Math.max(mx,dkey(r._ft))});return ROUNDS.filter(function(r){return dkey(r._ft)===mx}).sort(function(a,b){return b.n-a.n})}
function upNext(F){var up=F.filter(function(f){return f.kind==="up"&&f.ko&&f.ko>now()-3*36e5}).sort(function(a,b){return a.ko-b.ko}),d=up.length?dkey(up[0].ko):0;return up.filter(function(f){return dkey(f.ko)===d})}
function vToday(){var F=fixtures(),act=F.filter(function(f){var s=stateOf(f);return s==="live"||s==="ip"||s==="await"}),tonight=upNext(F),LD=lastDay(),nl=act.filter(function(f){return stateOf(f)==="live"}).length,
    tn=tonight.length?rel(tonight[0].ko):"";
  var tblock='<div class="sh"><h2>Table</h2><span class="sub">P&amp;L, $100K a trade</span><a class="more" href="#table">Full table</a></div>'+tableStrip();
  return '<div class="today view"><div class="wide">'+hero()+scorebug(F)+'<div class="ph-only">'+tblock+'</div></div>'+
    '<div class="colA">'+
      (act.length?'<div class="sh">'+(nl?'<span class="lvd"></span><h2>Live now</h2>':'<h2>In play</h2>')+'<span class="sub">'+act.length+' round'+(act.length>1?'s':'')+' with trades in</span></div>'+act.map(function(f){return liveCard(f)}).join(""):'')+
      (tonight.length?'<div class="sh"><h2>'+(tn==="Today"?"Tonight":tn||dshort(tonight[0].ko))+'</h2><span class="sub">'+tonight.length+' kick off · your time</span><a class="more" href="#fixtures">Fixtures</a></div><div class="list">'+tonight.map(fixRow).join("")+'</div>':'')+
    '</div><div class="colB"><div class="dk-only">'+tblock+'</div>'+
      '<div class="sh"><h2>Last matchday</h2><span class="sub">'+dshort(LD[0]._ft)+'</span><a class="more" href="#results">Results</a></div><div class="list">'+LD.map(resRow).join("")+'</div>'+
    '</div></div>'}
function vFixtures(){var all=fixtures(),F=all.filter(function(f){return f.kind==="up"&&(!STATE.hlo||HL[f.tk])}).sort(function(a,b){return (a.ko||9e15)-(b.ko||9e15)}),g={},order=[];
  F.forEach(function(f){var k=f.ko?dkey(f.ko):"tbc";if(!g[k]){g[k]=[];order.push(k)}g[k].push(f)});
  var act=all.filter(function(f){var s=stateOf(f);return (s==="live"||s==="ip"||s==="await")&&(!STATE.hlo||HL[f.tk])});
  return '<div class="view narrow"><h1 class="ph1">Fixtures</h1><p>Kickoff is the earnings report, in your time ('+TZN+'). Full time is the next market close. ~ marks an estimated time.</p>'+
   '<div class="chips"><button class="chip'+(STATE.hlo?'':' on')+'" data-hlo="0">All</button><button class="chip'+(STATE.hlo?' on':'')+'" data-hlo="1">On Hyperliquid</button></div>'+
   (act.length?'<div class="sh"><h2>In play</h2></div>'+act.map(function(f){return liveCard(f)}).join(""):'')+
   order.map(function(k){var L=g[k];return '<div class="dh">'+(k==="tbc"?"Date to come":dayHead(L[0].ko))+'</div><div class="list">'+L.map(fixRow).join("")+'</div>'}).join("")+'</div>'}
function vResults(){var by={},ks=[];ROUNDS.slice().sort(function(a,b){return b._ft-a._ft||b.n-a.n}).forEach(function(r){var k=dkey(r._ft);if(!by[k]){by[k]=[];ks.push(k)}by[k].push(r)});
  var show=ks.slice(0,4+STATE.more*6);
  return '<div class="view narrow"><h1 class="ph1">Results</h1><p>Every graded round, '+ROUNDS.length+' so far. A lit mark took the right side. The crown is the closest trade.</p>'+
   show.map(function(k){var L=by[k];return '<div class="dh">'+dayHead(L[0]._ft)+' <span>· '+L.length+' FT</span></div><div class="list">'+L.map(resRow).join("")+'</div>'}).join("")+
   (show.length<ks.length?'<button class="loadmore" data-more="1">Earlier matchdays</button>':'')+'</div>'}
function vTable(){var d=STATE.win,R=rank(d);
  var rows=R.map(function(m,i){var a=agg(m,d),all=agg(m,0),L5=T[m].filter(function(x){return x.date<=now()}).slice().sort(function(x,y){return x.date-y.date||x.r.n-y.r.n}).slice(-5),
      z=(!d&&i===0)?" zg":(all.hr<.5?" zr":""),best=all.L.slice().sort(function(x,y){return y.pnl-x.pnl})[0],l7=agg(m,7);
    return '<a class="lt-r'+z+'" href="#team/'+m+'"><span class="z"></span><span class="ps">'+(i+1)+'</span><span class="tm">'+crest(m,30)+'<div><b>'+app(m)+'</b><small>'+L5.map(function(x){return '<i class="fm '+(x.ok?"w":"l")+'">'+(x.ok?"W":"L")+'</i>'}).join("")+'</small></div></span>'+
      '<span class="v">'+a.w+'-'+a.l+'</span><span class="v">'+(a.n?Math.round(a.hr*100)+'%':'–')+'</span><span class="pl '+(a.p<0?"d":"u")+'">'+money(a.p,1)+'</span>'+
      '<span class="v lt-x '+(l7.p<0?"d":"u")+'">'+(l7.n?money(l7.p,1):'–')+'</span><span class="v lt-x">'+(best?esc(best.r.co)+' '+money(best.pnl,1):'')+'</span></a>'}).join("");
  return '<div class="view"><h1 class="ph1">Table</h1><p>Every AI trades $100K on every earnings report, long or short. P&amp;L counts the move from the last close before the report to the next close.</p>'+
   '<div style="margin-top:12px" class="seg"><button data-win="0" class="'+(d?'':'on')+'">Season 1</button><button data-win="7" class="'+(d===7?'on':'')+'">Last 7 days</button></div>'+
   '<div class="lt"><div class="lt-h"><span></span><span style="padding-left:14px">Team</span><span>W-L</span><span>Hit</span><span>P&amp;L</span><span class="lt-x">7 days</span><span class="lt-x">Best trade</span></div>'+rows+'</div>'+
   '<div class="key">'+(!d?'<span><i style="background:var(--gold)"></i>Top of the table on Nov 16 picks the side of Bet #1, the $EZ pool on NVIDIA. The pool can be wiped out.</span>':'')+'<span><i style="background:var(--dn)"></i>Under 50% hit rate at the end of Season 1: relegated. DeepSeek and Qwen wait in tryouts.</span></div>'+
   '<div class="sh"><h2>The race</h2><span class="sub">Season P&amp;L after every round</span></div><div class="chartbox">'+raceChart()+'</div></div>'}

function wipe(id,x,y,w,h){return '<defs><clipPath id="'+id+'"><rect class="wipe" x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'"/></clipPath></defs>'}
function series(){var ser={};MK.forEach(function(k){var c=0,v=[[0,0]];ROUNDS.forEach(function(r,i){var x=T[k].filter(function(t){return t.r===r})[0];if(x){c+=x.pnl;v.push([i+1,c])}});ser[k]=v});return ser}
function raceChart(){var DK=innerWidth>=980,W=DK?1100:380,H=DK?300:230,pl=8,pr=DK?120:84,pt=14,pb=26,ser=series(),lo=0,hi=0,n=ROUNDS.length,R=rank(0);
  MK.forEach(function(k){ser[k].forEach(function(p){lo=Math.min(lo,p[1]);hi=Math.max(hi,p[1])})});
  function X(i){return pl+(W-pl-pr)*i/n}function Y(v){return pt+(H-pt-pb)*(1-(v-lo)/(hi-lo))}
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Season P&amp;L race, round by round"><line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="rgba(244,239,226,.22)" stroke-dasharray="3 4"/>'+wipe("cr",0,0,W-pr+2,H)+'<g clip-path="url(#cr)">';
  var ends=R.map(function(k){var l=ser[k][ser[k].length-1];return {k:k,x:X(l[0]),y:Y(l[1]),v:l[1]}});
  R.slice().reverse().forEach(function(k){s+='<polyline fill="none" stroke="'+TC[k]+'" stroke-width="'+(k===R[0]?3:2)+'" stroke-linejoin="round" points="'+ser[k].map(function(p){return X(p[0]).toFixed(1)+","+Y(p[1]).toFixed(1)}).join(" ")+'"/>'});
  s+='</g>';for(var i=1;i<ends.length;i++)if(ends[i].y-(ends[i-1].ly||ends[i-1].y)<31)ends[i].ly=(ends[i-1].ly||ends[i-1].y)+31;
  ends.forEach(function(e){var ly=e.ly||e.y;s+='<circle cx="'+e.x+'" cy="'+e.y+'" r="4" fill="'+TC[e.k]+'"/><text class="fadein" x="'+(e.x+9)+'" y="'+(ly+1)+'" fill="'+TC[e.k]+'" font-size="12.5" font-family="Archivo" font-weight="800">'+app(e.k)+'</text><text class="fadein" x="'+(e.x+9)+'" y="'+(ly+14)+'" fill="'+(e.v<0?"#ff3a31":"#03c870")+'" font-size="12" font-family="Archivo" font-weight="800">'+money(e.v,1)+'</text>'});
  return s+'<text x="'+pl+'" y="'+(H-6)+'" fill="#5c626d" font-size="11" font-family="Archivo" font-weight="700">Round 1</text><text x="'+(W-pr)+'" y="'+(H-6)+'" text-anchor="end" fill="#5c626d" font-size="11" font-family="Archivo" font-weight="700">Round '+ROUNDS[n-1].n+'</text></svg>'}
function seasonChart(m){var DK=innerWidth>=980,W=DK?640:380,H=DK?250:200,pl=8,pr=DK?70:62,pt=14,pb=26,ser=series(),lo=0,hi=0,n=ROUNDS.length;
  MK.forEach(function(k){ser[k].forEach(function(p){lo=Math.min(lo,p[1]);hi=Math.max(hi,p[1])})});
  function X(i){return pl+(W-pl-pr)*i/n}function Y(v){return pt+(H-pt-pb)*(1-(v-lo)/(hi-lo))}
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+app(m)+' season P&amp;L, round by round"><line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="rgba(244,239,226,.22)" stroke-dasharray="3 4"/><text x="'+(W-pr+6)+'" y="'+(Y(0)+4)+'" fill="#5c626d" font-size="11" font-family="Archivo" font-weight="700">$0</text>';
  MK.filter(function(k){return k!==m}).forEach(function(k){s+='<polyline fill="none" stroke="'+TC[k]+'" stroke-opacity=".22" stroke-width="1.5" points="'+ser[k].map(function(p){return X(p[0]).toFixed(1)+","+Y(p[1]).toFixed(1)}).join(" ")+'"/>'});
  var me=ser[m],last=me[me.length-1];
  s+=wipe("cs",pl,0,W-pr+2,H)+'<g clip-path="url(#cs)"><polyline fill="none" stroke="'+TC[m]+'" stroke-width="3" stroke-linejoin="round" points="'+me.map(function(p){return X(p[0]).toFixed(1)+","+Y(p[1]).toFixed(1)}).join(" ")+'"/></g>';
  s+='<circle class="fadein" cx="'+X(last[0])+'" cy="'+Y(last[1])+'" r="4.5" fill="'+TC[m]+'"/><text class="fadein" x="'+(X(last[0])+9)+'" y="'+(Y(last[1])+4)+'" fill="'+TC[m]+'" font-size="13" font-family="Archivo" font-weight="800">'+money(last[1],1)+'</text>';
  return s+'<text x="'+pl+'" y="'+(H-6)+'" fill="#5c626d" font-size="11" font-family="Archivo" font-weight="700">Round 1</text><text x="'+(W-pr)+'" y="'+(H-6)+'" text-anchor="end" fill="#5c626d" font-size="11" font-family="Archivo" font-weight="700">Round '+ROUNDS[n-1].n+'</text></svg>'}
function vTeam(m){if(!MODELS[m])m="GROK";var M=MODELS[m],a=agg(m,0),R=rank(0),pos=R.indexOf(m)+1,L=a.L.slice().sort(function(x,y){return y.date-x.date||y.r.n-x.r.n}),
    best=a.L.slice().sort(function(x,y){return y.pnl-x.pnl})[0],worst=a.L.slice().sort(function(x,y){return x.pnl-y.pnl})[0],ord=["th","st","nd","rd","th"][pos]||"th",vid='../../../../media/founder-'+m.toLowerCase()+'-anim';
  function row(x,lab){return '<a class="rr" href="#match/'+x.r.n+'">'+logo(x.r.ticker,36)+'<span class="who"><b>'+esc(x.r.co)+tkr(x.r.ticker)+'</b><span>'+lab+(x.s>0?'Long':'Short')+' '+x.mag+'%</span></span><span class="sc '+(x.r.a<0?"d":"u")+'" style="font-size:14px">'+pct(x.r.a)+'</span><span class="sc '+(x.pnl<0?"d":"u")+'">'+money(x.pnl,1)+'</span></a>'}
  return '<div class="tp view" style="--tc:'+TC[m]+'"><div class="wide"><a class="back" href="#table">Table</a><div class="tp-hd"><div class="ph"><video src="'+vid+'.mp4" poster="'+vid+'.jpg" muted loop playsinline autoplay></video></div>'+
    '<div class="tp-id">'+crest(m,58)+'<div><h1>'+M.app+'</h1><p>'+flag(FLAG[m])+M.ver+'</p></div></div>'+
    '<div class="tp-pos"><b>'+pos+'<small style="font-size:.42em;vertical-align:.9em">'+ord+'</small></b><span>in Season 1<br>'+(pos===1?'Top of the table':money(agg(R[0],0).p-a.p,1).replace("+","")+' behind '+app(R[0]))+'</span></div></div>'+
    '<div class="kp"><div><small>P&amp;L</small><b class="'+(a.p<0?"d":"u")+'" data-count="'+a.p+'">'+money(a.p,0)+'</b></div><div><small>W-L</small><b>'+a.w+'-'+a.l+'</b></div><div><small>Hit rate</small><b>'+Math.round(a.hr*100)+'%</b></div></div></div>'+
    '<div><div class="sh"><h2>Season so far</h2><span class="sub">P&amp;L after each round</span></div><div class="chartbox">'+seasonChart(m)+'</div>'+
    '<div class="sh"><h2>Form</h2><span class="sub">Last 10, newest right</span></div><div class="form10">'+L.slice(0,10).reverse().map(function(x){return '<i class="fm '+(x.ok?"w":"l")+'" title="'+esc(x.r.co)+'">'+(x.ok?"W":"L")+'</i>'}).join("")+'</div></div>'+
    '<div><div class="sh"><h2>Best and worst</h2></div><div class="list">'+row(best,"Best · ")+row(worst,"Worst · ")+'</div>'+
    '<div class="sh"><h2>Recent matches</h2><a class="more" href="#results">All results</a></div><div class="list">'+L.slice(0,5).map(function(x){return row(x,"")}).join("")+'</div></div></div>'}

/* the match timeline: P&L on $100K from the report to the close (PATHS, scaled so the end equals the sheet) */
function timeline(r){var P=(window.PATHS||{})[r.n];if(!P)return '';
  var pp=P.path,N=pp.length,kk=(r.a/100)/((pp[N-1]/P.p0)-1),VS=pp.map(function(v){return (v/P.p0-1)*kk*100});VS[N-1]=r.a;
  var DK=innerWidth>=980,OI=Math.round(96*17.75/24),W=DK?640:380,H=DK?280:230,pl=10,pr=DK?86:74,pt=16,pb=30,sides={L:[],S:[]};r.calls.forEach(function(c){sides[side(c[1])>0?"L":"S"].push(c[0])});
  var vals=[];["L","S"].forEach(function(k){if(sides[k].length)VS.forEach(function(v){vals.push((k==="L"?1:-1)*v*1000)})});var lo=Math.min.apply(null,vals.concat([0])),hi=Math.max.apply(null,vals.concat([0])),pad=(hi-lo)*.08;lo-=pad;hi+=pad;
  function X(i){return pl+(W-pl-pr)*i/(N-1)}function Y(v){return pt+(H-pt-pb)*(1-(v-lo)/(hi-lo))}
  var s='<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="P&amp;L on $100K through the night"><rect x="'+X(OI)+'" y="'+pt+'" width="'+(X(N-1)-X(OI))+'" height="'+(H-pt-pb)+'" fill="rgba(244,239,226,.035)"/><line x1="'+pl+'" x2="'+(W-pr)+'" y1="'+Y(0)+'" y2="'+Y(0)+'" stroke="rgba(244,239,226,.25)" stroke-dasharray="3 4"/>';
  [[0,"KO · Report"],[OI,"Market open"],[N-1,"FT · Close"]].forEach(function(e,j){s+='<line x1="'+X(e[0])+'" x2="'+X(e[0])+'" y1="'+pt+'" y2="'+(H-pb+4)+'" stroke="rgba(244,239,226,'+(j===2?.5:.16)+')"/>'+(j===1?'<text x="'+(X(e[0])-5)+'" y="'+(pt+12)+'" text-anchor="end" fill="#8d929c" font-size="10" font-family="Archivo" font-weight="800" letter-spacing=".6">MARKET OPEN</text>':'<text x="'+X(e[0])+'" y="'+(H-10)+'" text-anchor="'+(j===0?"start":"end")+'" fill="'+(j===2?"#f4efe2":"#8d929c")+'" font-size="11" font-family="Archivo" font-weight="800" letter-spacing=".6">'+e[1].toUpperCase()+'</text>')});
  s+=wipe("ct",0,0,W-pr+2,H)+'<g clip-path="url(#ct)">';var lab='';
  ["L","S"].forEach(function(k){var ms=sides[k];if(!ms.length)return;var sg=k==="L"?1:-1,pts=VS.map(function(v,i){return X(i).toFixed(1)+","+Y(sg*v*1000).toFixed(1)}).join(" "),end=sg*VS[N-1]*1000;
    ms.forEach(function(m,j){s+='<polyline fill="none" stroke="'+TC[m]+'" stroke-width="3" stroke-linejoin="round" stroke-linecap="butt" points="'+pts+'"'+(ms.length>1?' stroke-dasharray="14 '+(14*(ms.length-1))+'" stroke-dashoffset="'+(-14*j)+'"':'')+'/>'});
    lab+='<text class="fadein" x="'+(W-pr+8)+'" y="'+(Y(end)+5)+'" fill="'+(end<0?"#ff3a31":"#03c870")+'" font-size="14" font-family="Archivo" font-weight="850">'+money(end,1)+'</text><text class="fadein" x="'+(W-pr+8)+'" y="'+(Y(end)+19)+'" fill="#8d929c" font-size="10" font-family="Archivo" font-weight="800" letter-spacing=".8">'+(k==="L"?"LONG":"SHORT")+' ×'+ms.length+'</text>'});
  return s+'</g>'+lab+'</svg>'}
function lineups(calls,r,f){/* graded: P&L and the miss; in play: side, size and how it is graded */
  return '<div class="list lu-t">'+calls.map(function(c){var p=r?1000*c.s*r.a:null,won=r&&r._win.indexOf(c.m)>-1;
    return '<div class="lr">'+crest(c.m,30,won)+'<span><b>'+app(c.m)+'</b><span>'+(r?(c.s*r.a>0?'Right side':'Wrong side')+' · missed by '+c.miss.toFixed(2)+'%':'Graded at the close')+'</span></span><span class="rt">'+(r?'<span class="pl '+(p<0?"d":"u")+'">'+money(p,0)+'</span>':'')+'<span class="side '+(c.s>0?'L':'S')+'">'+(c.s>0?'LONG':'SHORT')+' '+c.mag+'%</span></span></div>'}).join("")+'</div>'}
function vMatch(n){var r=ROUNDS.filter(function(x){return x.n==n})[0];
  if(!r){var f=fixtures().filter(function(x){return x.n==n})[0];if(!f)return vToday();var st=stateOf(f),back=f.kind==="pend"?'<a class="back" href="#today">Today</a>':'<a class="back" href="#fixtures">Fixtures</a>';
    if(f.calls.length){/* in play */
      return '<div class="mcx view"><div class="wide">'+back+liveCard(f,false)+'</div><div><div class="ev">'+(f.ko?'<div><small>Kickoff</small><b>'+whenDay(f.ko)+tl(f.ko,f.kest)+'</b></div>':'')+'<div><small>Full time</small><b>'+whenDay(f.ft)+tl(f.ft,f.fest)+'</b></div><div><small>'+(st==="await"?'Status':'Closes in')+'</small><b class="num"'+(st==="await"?'>Result due':' data-cd="'+f.ft+'">'+cdx(f.ft-now()))+'</b></div></div>'+
        (HL[f.tk]?'<a class="cta" href="'+hlUrl(f.tk)+'" target="_blank" rel="noopener">Follow '+esc(f.co)+' on Hyperliquid ›</a>':'')+'</div>'+
        '<div><div class="sh"><h2>Line-ups</h2><span class="sub">$100K each</span></div>'+lineups(f.calls.map(function(c){return {m:c.m,s:c.s,mag:c.mag}}),null,f)+'</div></div>'}
    /* still to come */
    var card=matchCard({n:f.n,co:f.co,tk:f.tk,calls:[],state:st==="pre"?"pre":st,ko:f.ko,kest:f.kest,hdr:f.ko?dshort(f.ko):"Date to come",
      foot:f.ko?'<span>Trades due before the report, <b>'+rng(f.ko-2*36e5,f.ko-36e5,f.kest)+'</b>'+(f.kest?' (est.)':'')+'.</span>':'<span>The report date is not set yet.</span>'});
    return '<div class="mcx view"><div class="wide">'+back+card+'</div><div><div class="ev">'+(f.ko?'<div><small>Kickoff</small><b>'+whenDay(f.ko)+tl(f.ko,f.kest)+'</b></div>':'<div><small>Kickoff</small><b>To come</b></div>')+(f.ft?'<div><small>Full time</small><b>'+whenDay(f.ft)+tl(f.ft,f.fest)+'</b></div>':'')+'<div><small>Trades</small><b>Not in yet</b></div></div>'+
      (HL[f.tk]?'<a class="cta" href="'+hlUrl(f.tk)+'" target="_blank" rel="noopener">Follow '+esc(f.co)+' on Hyperliquid ›</a>':'')+'</div>'+
      '<div><p class="note">Each AI goes long or short on '+esc(f.co)+' before the report. The next market close after the report grades every trade.</p></div></div>'}
  var calls=r.calls.map(function(c){return {m:c[0],s:side(c[1]),mag:mag(c[1]),miss:+c[2]}}),win=r._win,ko=r._ft-24*36e5,film=FILMS&&FILMS[r.n],rightN=calls.filter(function(c){return c.s*r.a>0}).length;
  var head=matchCard({n:r.n,co:r.co,tk:r.ticker,calls:calls,state:"ft",move:r.a,win:win,hdr:dshort(r._ft),foot:'<span><b>'+winners(win)+'.</b> '+(win.length?'Closest trade to the move.':'Every AI took the wrong side.')+'</span>'});
  var wc=calls.filter(function(c){return win.indexOf(c.m)>-1}),pw=win.length?win.map(app).join(" & "):"Nobody";
  var potm='<div class="potm">'+(wc.length?wc.map(function(c){return crest(c.m,40,true)}).join(""):'<span></span>')+'<div><small>Closest trade</small><b>'+pw+'</b><span>'+(wc.length?(wc[0].s>0?'Long ':'Short ')+wc[0].mag+'%, the move was '+pct(r.a):'Every AI took the wrong side.')+'</span></div><span class="pl '+(wc.length&&r.a*wc[0].s<0?"d":"u")+'">'+(wc.length?money(1000*wc[0].s*r.a,1):'')+'</span></div>';
  var t=timeline(r),sorted=calls.slice().sort(function(a,b){return 1000*b.s*r.a-1000*a.s*r.a||a.miss-b.miss});
  return '<div class="mcx view"><div class="wide"><a class="back" href="#results">Results</a>'+head+'</div>'+
   '<div>'+(t?'<div class="sh"><h2>Match timeline</h2><span class="sub">P&amp;L on $100K, report to close</span></div><div class="chartbox">'+t+'</div>'+
     '<div class="ev"><div><small>Kickoff</small><b>Report, '+wd(ko)+'</b></div><div><small>Full time</small><b>'+wd(r._ft)+' '+hm(r._ft)+'</b></div><div><small>Right side</small><b>'+rightN+' of '+calls.length+'</b></div></div>'
     :'<div class="sh"><h2>Full time</h2></div><div class="ev"><div><small>Full time</small><b>'+dshort(r._ft)+' '+hm(r._ft)+'</b></div><div><small>Right side</small><b>'+rightN+' of '+calls.length+'</b></div></div>')+
     (film?'<div class="sh"><h2>Highlights</h2><span class="sub">Round '+r.n+' film</span></div><div class="hilite"><video controls playsinline preload="none" poster="../../../../media/'+film.p+'.jpg" src="../../../../media/'+film.f+'.mp4"></video></div>':'')+'</div>'+
   '<div><div class="sh"><h2>Player of the match</h2></div>'+potm+'<div class="sh"><h2>Line-ups</h2><span class="sub">$100K each</span></div>'+lineups(sorted,r)+
   '<p class="note">P&amp;L here is flat: $100,000 on every trade, so every AI on the same side makes the same. Missed by: the gap between the move the AI traded for and the real move.</p></div></div>'}

/* ================= router ================= */
var TABS=[["today","Today",'<path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" fill="none"/>'],["fixtures","Fixtures",'<rect x="3.5" y="5" width="17" height="15" rx="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 10h17M8 3v4M16 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'],["results","Results",'<path d="M5 20V10M12 20V4M19 20v-7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>'],["table","Table",'<path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><circle cx="7" cy="6" r="1.6" fill="currentColor"/>']];
function curTab(){if(VIEW==="team")return "table";if(VIEW!=="match")return VIEW;if(ROUNDS.some(function(r){return r.n==ARG}))return "results";return (PENDING||[]).some(function(p){return p.n==ARG})?"today":"fixtures"}
function nav(){var F=fixtures(),nl=F.filter(function(f){return stateOf(f)==="live"}).length,cur=curTab(),w=weekBar();
  document.getElementById("tabbar").innerHTML=TABS.map(function(t){return '<a href="#'+t[0]+'" class="'+(cur===t[0]?'on':'')+'"><svg viewBox="0 0 24 24">'+t[2]+'</svg>'+t[1]+(t[0]==="today"&&nl?'<span class="lv">'+nl+'</span>':'')+'</a>'}).join("");
  document.getElementById("dnav").innerHTML=TABS.map(function(t){return '<a href="#'+t[0]+'" class="'+(cur===t[0]?'on':'')+'">'+t[1]+(t[0]==="today"&&nl?'<span class="lv">LIVE</span>':'')+'</a>'}).join("");
  document.getElementById("mw").innerHTML=w.bar+'S1 · Wk '+w.wk}
var COUNT0=0;
function route(){var h=(location.hash||"#today").slice(1).split("/");VIEW=h[0]||"today";ARG=h[1];
  if(["today","fixtures","results","table","team","match"].indexOf(VIEW)<0)VIEW="today";
  var html=VIEW==="fixtures"?vFixtures():VIEW==="results"?vResults():VIEW==="table"?vTable():VIEW==="team"?vTeam(ARG):VIEW==="match"?vMatch(ARG):vToday();
  document.getElementById("app").innerHTML=html;nav();COUNT0=now();if(!STATE.keep)window.scrollTo(0,0);STATE.keep=0;watchCharts();tick()}
window.addEventListener("hashchange",route);
document.addEventListener("click",function(e){var b=e.target.closest("[data-win],[data-hlo],[data-more]");if(!b)return;
  if(b.dataset.win!=null)STATE.win=+b.dataset.win;if(b.dataset.hlo!=null)STATE.hlo=+b.dataset.hlo;if(b.dataset.more)STATE.more++;STATE.keep=1;var y=scrollY;route();window.scrollTo(0,y)});
/* charts draw in when they reach the screen */
var IO=window.IntersectionObserver&&!RMODE?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("on");IO.unobserve(e.target)}})},{threshold:.35}):null;
function watchCharts(){document.querySelectorAll(".chartbox").forEach(function(c){if(IO)IO.observe(c);else c.classList.add("on")})}

/* ================= live tick: countdowns and count-ups ================= */
function tick(){var t=now();
  document.querySelectorAll("[data-cd]").forEach(function(el){el.textContent=(el.dataset.pre||"")+cdx(+el.dataset.cd-t)});
  document.querySelectorAll("[data-count]").forEach(function(el){var v=+el.dataset.count,k=Math.min(1,(t-COUNT0)/1100),e=1-Math.pow(1-k,3);el.textContent=money(v*e,0)})}
function loop(){tick();if(RT==null)requestAnimationFrame(loop)}

/* ================= film mode: R(t) drives the clock and every animation ================= */
window.APP={go:function(h){history.pushState(null,"","#"+h);route()},state:STATE,route:route,
  touch:function(x,y,a){var el=document.getElementById("touch");el.style.left=x+"px";el.style.top=y+"px";el.style.opacity=a;el.style.transform="scale("+(.6+.4*a)+")"},
  end:function(a){var el=document.getElementById("endcard");el.style.opacity=a;el.style.transform="scale("+(1.03-.03*a)+")"}};
window.R=function(t){RT=t;var ms=t*1000;document.getAnimations().forEach(function(a){if(a.__b==null)a.__b=ms<50?ms-2000:ms;a.pause();a.currentTime=Math.max(0,ms-a.__b)});
  var vs=[].slice.call(document.querySelectorAll("video"));tick();if(window.WALK)window.WALK(t);
  return Promise.all(vs.map(function(v){return new Promise(function(res){if(!v.duration){res();return}v.pause();var tt=(t%v.duration);if(Math.abs(v.currentTime-tt)<.01){res();return}v.addEventListener("seeked",function(){res()},{once:true});v.currentTime=tt;setTimeout(res,400)})}))};

/* ================= boot: refresh REPORT and HL from the live terminal; the snapshot in maps.js is the fallback ================= */
function boot(){return Promise.resolve()}
fetch("../../../../v53-terminal.html").then(function(r){return r.text()}).then(function(s){
  var a=s.match(/var REPORT=(\{[\s\S]*?\}\});/),b=s.match(/var HL=(\{.*?\});/);
  if(!a||!b)throw new Error("pattern not found");REPORT=Function("return "+a[1])();HL=Function("return "+b[1])();document.documentElement.dataset.maps="terminal";
}).catch(function(e){console.warn("[EZ Matchday] Could not read REPORT/HL from v53-terminal.html ("+e.message+"); using the maps.js snapshot of 2026-11-09.");document.documentElement.dataset.maps="snapshot"})
.then(boot).then(function(){if(RMODE)RT=0;route();if(!RMODE)loop()});
})();
