/* Hub Overview mockup (2026-10-29): the Overview as tonight's show. Laid over the built X2+ page by run.js (never shipped).
   Every number comes from ez-data.js (ROUNDS, PENDING, UPCOMING, CAPS, CO_LOGOS, MODELS) and window.__x2pPnl(); the clock is New York's.
   1 a broadcast bar that never changes shape (season and week, the belt and its gap, the next bell), in the header on phones and on top of
     the right rail from 1200px; 2 hero + film as they are; 3 Fight night: the rounds graded at the next close, main event, co-main and the
     undercard, each AI in its corner; 4 the last bell: the result ticket in fight words over the record's own cards (the newest 8);
     5 the belt race (the season ticket as it is); 6 stubs into Results and Leaderboard; 7 the bet and Get $EZ.
   Off the Overview: the proof (to Leaderboard), the MVPs and the full record (to Results), the live strip (the bar and Fight night say it). */
(function(){var d=document,H=d.documentElement;H.classList.add("hub");
 var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};
 var NM={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"},INK={GPT:"#1b181c",KIMI:"#1b181c",GROK:"#1b181c",CLAUDE:"#d97757"};
 /* ---- the New York clock (as the live strip) ---- */
 var NYF=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"});
 function zp(tz,t){var o={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"}).formatToParts(new Date(t)).forEach(function(q){o[q.type]=+q.value});return o}
 function ny(t){var o={};NYF.formatToParts(new Date(t)).forEach(function(q){o[q.type]=+q.value});return {y:o.year,mo:o.month,d:o.day,h:o.hour%24,mi:o.minute,s:o.second}}
 /* local wall time in a time zone -> epoch ms */
 function atTZ(tz,y,mo,dd,h,mi){var g=Date.UTC(y,mo-1,dd,h,mi||0);for(var i=0;i<2;i++){var q=zp(tz,g),w=Date.UTC(q.year,q.month-1,q.day,q.hour%24,q.minute);g+=Date.UTC(y,mo-1,dd,h,mi||0)-w}return g}
 function key(y,mo,dd){return y+"-"+String(mo).padStart(2,"0")+"-"+String(dd).padStart(2,"0")}
 function K(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?key(2000+(+m[3]%100),+m[1],+m[2]):"9999"}
 var HOL={"2026-11-26":1,"2026-12-25":1,"2027-01-01":1},EARLY={"2026-11-27":13,"2026-12-24":13};
 var WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],WDL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 function kd(k){var p=k.split("-");return new Date(Date.UTC(+p[0],+p[1]-1,+p[2]))}
 function kadd(k,n){var t=new Date(kd(k).getTime()+n*864e5);return key(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate())}
 function trading(k){var w=kd(k).getUTCDay();return w>0&&w<6&&!HOL[k]}
 function bellOf(k){var p=k.split("-");return atTZ("America/New_York",+p[0],+p[1],+p[2],EARLY[k]||16,0)}
 function kf(k,o){var t=kd(k);return (o==="l"?WDL:WD)[t.getUTCDay()]+(o==="s"?"":" "+MON[t.getUTCMonth()]+" "+t.getUTCDate())}
 function left(ms){if(ms<=0)return "0m";var m=Math.ceil(ms/6e4),dd=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;return dd?dd+"d "+h+"h":h?h+"h "+String(mi).padStart(2,"0")+"m":mi+"m"}
 function etTime(t){var q=ny(t),h=q.h%12||12;return h+(q.mi?":"+String(q.mi).padStart(2,"0"):"")+(q.h<12?" AM":" PM")+" ET"}
 /* a foreign listing grades at its own exchange's close (as the pending certificate's xcloseAt) */
 var XC={KS:["Asia/Seoul",15,30,"Seoul"],T:["Asia/Tokyo",15,30,"Tokyo"],TW:["Asia/Taipei",13,30,"Taipei"],HK:["Asia/Hong_Kong",16,0,"Hong Kong"],L:["Europe/London",16,30,"London"],
  DE:["Europe/Berlin",17,30,"Frankfurt"],PA:["Europe/Paris",17,30,"Paris"],AS:["Europe/Amsterdam",17,30,"Amsterdam"],MI:["Europe/Rome",17,30,"Milan"],SW:["Europe/Zurich",17,30,"Zurich"],MC:["Europe/Madrid",17,30,"Madrid"]};
 function closeOf(u){var k=K(u.resolves);if(k==="9999")return null;var x=XC[(String(u.ticker).split(".")[1]||"").toUpperCase()],p=k.split("-");
  return x?{t:atTZ(x[0],+p[0],+p[1],+p[2],x[1],x[2]),city:x[3]}:{t:bellOf(k),city:""}}
 var cap=function(u){return (window.CAPS||{})[String(u.ticker).toUpperCase()]||0};
 var big=function(L){return L.map(function(u,i){return {u:u,i:i,c:cap(u)}}).sort(function(a,b){return (b.c-a.c)||(a.i-b.i)}).map(function(x){return x.u})};
 var money=function(v){return (v<0?"−$":"+$")+Math.abs(Math.round(v)).toLocaleString("en-US")};
 var money0=function(v){return "$"+Math.abs(Math.round(v)).toLocaleString("en-US")};
 var pct=function(v){return (v<0?"−":"+")+Math.abs(v).toFixed(2)+"%"};
 var mark=function(m,cls){var M=MODELS[m];return M?'<svg class="hub-mk '+(cls||"")+'" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="'+(M.fr||"nonzero")+'" fill="'+(INK[m]||"#1b181c")+'" d="'+M.d+'"/></svg>':""};
 var logo=function(u,cls){var t=String(u.ticker).toUpperCase(),L=(window.CO_LOGOS||{})[t],f=L&&(L.f||L);
  return f?'<span class="hub-lg '+(cls||"")+(L.dark?" dk":"")+'"><img src="'+MEDIA+f+'" alt=""></span>':'<span class="hub-lg hub-lgt '+(cls||"")+'">'+esc(t.slice(0,4))+"</span>"};
 var tick=function(u){var t=String(u.ticker);return /^\d/.test(t)?"":t};

 /* ---- the model of the night ---- */
 function model(){var now=Date.now(),q=ny(now),today=key(q.y,q.mo,q.d),P=window.__x2pPnl();
  var ms=Object.keys(P.A).sort(function(a,b){return P.A[b].pnl-P.A[a].pnl}),rk={};ms.forEach(function(m,i){rk[m]=i+1});
  /* the next bell: the first trading day whose 4pm New York is still ahead */
  var bk=today;for(var i=0;i<10;i++){if(trading(bk)&&bellOf(bk)>now)break;bk=kadd(bk,1)}
  /* fight night: the rounds with their calls locked, graded on the soonest grading day still to come */
  var lock=PENDING.filter(function(u){return u.calls&&u.calls.some(function(c){return c.dir})&&K(u.resolves)!=="9999"&&K(u.resolves)>=today});
  var tk=lock.map(function(u){return K(u.resolves)}).sort()[0]||null,TN=tk?big(lock.filter(function(u){return K(u.resolves)===tk})):[];
  /* the last bell: the newest graded day, biggest company first */
  var lk=ROUNDS.reduce(function(a,u){var k=K(u.resolves);return k!=="9999"&&k>a?k:a},"0000"),LB=big(ROUNDS.filter(function(u){return K(u.resolves)===lk}));
  /* the belt before that day: each balance minus what that day's calls made */
  var before={};ms.forEach(function(m){before[m]=P.A[m].pnl-LB.reduce(function(s,u){var e=P.A[m].per[u.n];return s+(e?e.v:0)},0)});
  var bms=ms.slice().sort(function(a,b){return before[b]-before[a]});
  var first=ROUNDS.map(function(u){return K(u.called)}).sort()[0],mon=function(k){var t=kd(k),w=t.getUTCDay();return t.getTime()-((w+6)%7)*864e5},wk=first?Math.floor((mon(today)-mon(first))/(7*864e5))+1:1;
  return {now:now,today:today,P:P,ms:ms,rk:rk,bell:bellOf(bk),bk:bk,tk:tk,TN:TN,lk:lk,LB:LB,was:bms[0],wk:wk,graded:ROUNDS.length,total:ROUNDS.length+PENDING.length+UPCOMING.length}}
 function dayWord(M,k,past){if(k===M.today)return past?"Today":"Tonight";var t=kd(k),n=kd(M.today);var dd=Math.round((t-n)/864e5);if(dd===1)return "Tomorrow";if(dd===-1)return "Yesterday";return kf(k,"l")}

 /* ---- the paper: the bet's own stock, read once from a ticket on the page ---- */
 var lst=function(v){var o=[],dp=0,st=0;for(var i=0;i<v.length;i++){var c=v[i];if(c==="(")dp++;else if(c===")")dp--;else if(c===","&&!dp){o.push(v.slice(st,i).trim());st=i+1}}o.push(v.slice(st).trim());return o};
 var STOCK=null;function stock(){if(STOCK)return STOCK;var pp=d.querySelector("#x2pSt .bt-pp")||d.querySelector(".bs-nx .bt-pp");if(!pp)return null;var L=lst(getComputedStyle(pp).backgroundImage);if(L.length<27)return null;
  STOCK={grain:L[23],paper:L[L.length-1],g:L[19],r:L[21]};var s=H.style;s.setProperty("--hub-grain",STOCK.grain);s.setProperty("--hub-paper",STOCK.paper);s.setProperty("--hub-gink",STOCK.g);s.setProperty("--hub-rink",STOCK.r);return STOCK}
 /* the ticket's own layers with the fibres (22) and the sunburst (24, 25) off, as the season ticket does */
 function paper(t){var pp=t.querySelector(".bt-pp");if(!pp)return;pp.style.removeProperty("background-image");var L=lst(getComputedStyle(pp).backgroundImage);if(L.length<27)return;L[22]=L[24]=L[25]="none";pp.style.backgroundImage=L.join(", ")}
 function tk(cls,inner,head,foot,st){return '<div class="bs-nx hub-t '+cls+'"'+(st?' style="'+st+'"':"")+'><div class="bt-sh"><i></i></div><div class="bt-hs"></div><div class="bt-p"><div class="bt-pp"><i class="bt-pl"></i><i class="bt-r1"></i><i class="bt-r2"></i></div>'+
   inner+'<div class="bt-st bt-hd">'+head+'</div><div class="bt-st bt-ft">'+foot+"</div></div></div>"}
 var ko=function(t,c){return '<b class="hub-ko'+(c?" "+c:"")+'">'+t+"</b>"};
 var star='<i class="hub-st" aria-hidden="true"></i>';

 /* ---- 1 the broadcast bar ---- */
 function bug(M){var L=M.ms[0],S=M.ms[1],P=M.P,gap=P.A[L].pnl-P.A[S].pnl;
  return '<div class="hub-bug" role="status" aria-label="Season 1, week '+M.wk+'. '+NM[L]+' holds the belt at '+money(P.A[L].pnl)+', '+money0(gap)+' clear of '+NM[S]+'. Next bell in '+left(M.bell-M.now)+'.">'+
   '<div class="hub-bw"><div class="hub-bp">'+
   '<span class="hub-bs">'+ko("S1","hub-b1")+ko("Week "+M.wk,"hub-b2")+"</span>"+
   '<span class="hub-bb"><small class="hub-bl">The belt</small><span class="hub-bh">'+mark(L)+'<b class="hub-gold" data-t="'+NM[L].toUpperCase()+'">'+NM[L].toUpperCase()+'</b><b class="hub-bpl">'+money(P.A[L].pnl)+'</b></span><small class="hub-bg">'+money0(gap)+" clear of "+NM[S]+"</small></span>"+
   '<span class="hub-bn">'+ko("Next bell","hub-b2")+ko(left(M.bell-M.now),"hub-b1 hub-cd")+"</span>"+
   "</div></div></div>"}

 /* ---- 3 fight night ---- */
 function corners(M,u){var C=u.calls.filter(function(c){return c.dir}),bu=C.filter(function(c){return c.dir==="UP"}),be=C.filter(function(c){return c.dir==="DOWN"});
  var ent=function(c){var L=M.rk[c.m]===1;return '<li class="'+(L?"hub-L":"")+'">'+mark(c.m)+'<span class="hub-an">'+NM[c.m]+(L?'<i class="hub-belt" title="Holds the belt">★</i>':"")+'</span><b class="hub-sz">'+(c.dir==="UP"?"+":"−")+esc(c.mag)+"%</b></li>"};
  var side=function(L,w,cls){return '<div class="hub-cn '+cls+'"><b class="hub-ch"><span class="hub-cnum">'+L.length+"</span> "+w+(L.length===1?"":"s")+"</b>"+(L.length?"<ul>"+L.map(ent).join("")+"</ul>":'<p class="hub-none">Empty corner</p>')+"</div>"};
  return '<div class="hub-fc">'+side(bu,"bull","bu")+'<i class="hub-vs">vs</i>'+side(be,"bear","be")+"</div>"}
 function split(M,u){var L=M.ms[0],S=M.ms[1],a=(u.calls.filter(function(c){return c.m===L})[0]||{}).dir,b=(u.calls.filter(function(c){return c.m===S})[0]||{}).dir;return a&&b&&a!==b}
 function headline(M,u,lbl){var cl=closeOf(u),foreign=cl&&cl.city;
  var inner='<span class="hub-stub"><small>No.</small><b>'+u.n+'</b></span><div class="hub-bd">'+
   '<a class="hub-co" href="#/round/'+u.n+'">'+logo(u,"hub-lgb")+'<span class="hub-cot"><b class="hub-nm">'+esc(u.co)+"</b>"+(tick(u)?"<small>"+esc(tick(u))+"</small>":"")+"</span></a>"+
   (split(M,u)?'<span class="hub-bf">Belt fight</span>':"")+corners(M,u)+
   (foreign?'<p class="hub-fx">'+esc(cl.city)+" close · "+etTime(cl.t)+"</p>":"")+"</div>";
  return tk("hub-me",inner,'<span class="hub-hl">'+star+ko(lbl)+star+'</span>'+ko(foreign?"Bell "+etTime(cl.t):"Bell "+etTime(M.bell)),ko("Calls locked "+kf(K(u.called),"s"))+ko("Nº "+String(u.n).padStart(6,"0"),"hub-no"),"--b:62px;--px:62px")}
 function undercard(M,U){var cols=["GPT","KIMI","CLAUDE","GROK"];
  var hd='<div class="hub-uh"><span></span>'+cols.map(function(m){return '<span class="hub-uc">'+mark(m)+"<small>"+NM[m]+"</small></span>"}).join("")+'<span class="hub-ut"><i class="u">▲</i>v<i class="d">▼</i></span></div>';
  var row=function(u){var cl=closeOf(u),byM={};u.calls.forEach(function(c){byM[c.m]=c});var nb=u.calls.filter(function(c){return c.dir==="UP"}).length,nr=u.calls.filter(function(c){return c.dir==="DOWN"}).length;
   return '<a class="hub-ur" href="#/round/'+u.n+'">'+'<span class="hub-uco">'+logo(u)+'<span class="hub-cot"><b>'+esc(u.co)+"</b><small>"+(cl&&cl.city?esc(cl.city)+" close · "+etTime(cl.t):"No. "+u.n+(tick(u)?" · "+esc(tick(u)):""))+(split(M,u)?' · <i class="hub-bfs">Belt fight</i>':"")+"</small></span></span>"+
    cols.map(function(m){var c=byM[m];if(!c||!c.dir)return '<span class="hub-uv">·</span>';return '<span class="hub-uv '+(c.dir==="UP"?"u":"d")+(M.rk[m]===1?" L":"")+'"><i>'+(c.dir==="UP"?"▲":"▼")+"</i>"+esc(c.mag)+"</span>"}).join("")+
    '<span class="hub-ut"><b class="u">'+nb+'</b>–<b class="d">'+nr+"</b></span></a>"};
  return tk("hub-uc-t",'<div class="hub-ub">'+hd+U.map(row).join("")+"</div>",'<span class="hub-hl">'+star+ko("Undercard · "+U.length+" fights")+star+"</span>"+ko("Bell "+etTime(M.bell)),ko("Calls locked before the reports")+ko("Graded at the close"),"--b:0px;--px:-80px")}
 function fightNight(M){if(!M.TN.length)return "";var L=M.ms[0],S=M.ms[1],P=M.P,gap=P.A[L].pnl-P.A[S].pnl,sp=M.TN.filter(function(u){return split(M,u)});
  var lines=[M.TN.length+" fights. Calls locked before the reports.",
   NM[L]+" holds the belt, "+money0(gap)+" clear of "+NM[S]+".",
   sp.length?NM[S]+" takes the other corner on "+sp.map(function(u){return u.co}).join(" and ")+".":NM[L]+" and "+NM[S]+" share a corner in every fight."];
  var dw=dayWord(M,M.tk);
  return '<section id="hubTn" class="sec hub-sec" aria-labelledby="hubTnH"><div class="sh"><div class="tx"><span class="no">01</span><span class="eb">'+esc(dw)+" · "+esc(kf(M.tk))+'</span><h2 id="hubTnH" class="h45-h hub-h"><span class="h45-w h45-L">Fight</span> <span class="h45-w h45-R">night</span></h2></div>'+
   '<div class="x2p-strap hub-strap"><span class="x2p-bug" aria-hidden="true">On the card</span><ul class="x2o-ul lede">'+lines.map(function(t){return "<li>"+esc(t)+"</li>"}).join("")+"</ul></div></div>"+
   '<div class="hub-card"><div class="hub-main">'+headline(M,M.TN[0],"Main event")+(M.TN[1]?headline(M,M.TN[1],"Co-main event"):"")+"</div>"+(M.TN.length>2?undercard(M,M.TN.slice(2)):"")+"</div></section>"}

 /* ---- 4 the last bell ---- */
 function lastBell(M){var u=M.LB[0];if(!u)return "";var P=M.P,C=u.calls.map(function(c){return {m:c[0],dir:/^UP/.test(c[1])?"UP":"DOWN",call:c[1],miss:c[2]}});
  var up=u.a>=0,right=C.filter(function(c){return (c.dir==="UP")===up}),win=String(u.win||"").split(/\s*&\s*/).filter(Boolean);
  var corner=(up?"Bulls":"Bears")+" win",tally=right.length===0?"Nobody called it":right.length===1?"1 of "+C.length+" called it":right.length+" of "+C.length+" called it";
  var pr=C.map(function(c){return {m:c.m,v:(P.A[c.m].per[u.n]||{v:0}).v}}).sort(function(a,b){return b.v-a.v}),W=pr[0],Lo=pr[pr.length-1];
  var L=M.ms[0],S=M.ms[1],keeps=M.was===L,gap=P.A[L].pnl-P.A[S].pnl;
  var belt=keeps?NM[L]+" keeps the belt":NM[L]+" takes the belt from "+NM[M.was];
  var lone=right.length===1?" "+NM[right[0].m]+" the lone "+(up?"bull":"bear")+".":"";
  var fld=function(lbl,body,cls){return '<span class="hub-f '+(cls||"")+'"><small>'+lbl+"</small>"+body+"</span>"};
  var crown=win.length?win.map(function(m){return mark(m)+"<b>"+NM[m]+"</b>"}).join(""):"<b>Nobody</b>";
  var miss=win.length?(C.filter(function(c){return c.m===win[0]})[0]||{}).miss:null;
  var also=M.LB.slice(1).map(function(r){var w=String(r.win||"").split(/\s*&\s*/).filter(Boolean).map(function(m){return NM[m]});
   return '<a class="hub-al" href="#/round/'+r.n+'">'+logo(r)+"<b>"+esc(r.co)+'</b><b class="'+(r.a<0?"d":"u")+'">'+pct(r.a)+"</b><small>"+(w.length?esc(w.join(" & "))+(w.length>1?" share the crown":" takes the crown"):"Nobody called it")+"</small></a>"}).join("");
  var inner='<span class="hub-stub"><small>No.</small><b>'+u.n+'</b></span><div class="hub-bd hub-rb">'+
   '<a class="hub-co" href="#/round/'+u.n+'">'+logo(u,"hub-lgb")+'<span class="hub-cot"><b class="hub-nm">'+esc(u.co)+"</b>"+(tick(u)?"<small>"+esc(tick(u))+"</small>":"")+'</span><b class="hub-mv '+(up?"u":"d")+'">'+pct(u.a)+"</b></a>"+
   '<p class="hub-fw"><b>'+corner+".</b> "+tally+"."+esc(lone)+"</p>"+
   '<div class="hub-fs">'+fld(win.length>1?"Shared crown":"Crown",'<span class="hub-fv">'+crown+"</span>"+(miss?'<i class="hub-fm">'+esc(miss)+"% off</i>":""),"cr")+
    fld("Biggest W",'<span class="hub-fv">'+mark(W.m)+"<b>"+NM[W.m]+'</b></span><i class="hub-fm '+(W.v<0?"d":"u")+'">'+money(W.v)+"</i>")+
    fld("Biggest L",'<span class="hub-fv">'+mark(Lo.m)+"<b>"+NM[Lo.m]+'</b></span><i class="hub-fm '+(Lo.v<0?"d":"u")+'">'+money(Lo.v)+"</i>")+"</div>"+
   '<p class="hub-belt-l">'+star+"<b>"+esc(belt)+".</b> "+money(P.A[L].pnl)+", "+money0(gap)+" clear of "+NM[S]+".</p>"+
   (also?'<div class="hub-also"><small class="hub-alh">Also on the card</small>'+also+"</div>":"")+"</div>";
  return tk("hub-res",inner,'<span class="hub-hl">'+star+ko("Main event result")+star+"</span>"+ko(kf(M.lk)),ko("Graded at the close")+ko(M.LB.length+" fights"),"--b:62px;--px:62px")}
 var goStub=function(href,k,t,s){return '<a class="hub-go" href="'+href+'"><span class="hub-gw"><span class="hub-gp">'+ko(k,"hub-gk")+'<span class="hub-gt"><b>'+t+"</b><small>"+s+'</small></span><i class="hub-ga" aria-hidden="true">→</i></span></span></a>'};

 /* ---- the head fitter: each new head on one line, as the page's heads ---- */
 function fitH(){[].forEach.call(d.querySelectorAll(".hub-h"),function(h){var w=h.parentNode.clientWidth;if(!w)return;var z=Math.min(46,Math.max(23,innerWidth*.071));if(H.classList.contains("hub-desk"))z=Math.min(z,44);h.style.setProperty("font-size",z+"px","important");var n=0;
   while(h.scrollWidth>w+1&&z>14&&n++<60){z-=.5;h.style.setProperty("font-size",z+"px","important")}})}
 /* strap lines one line each (as the page's fitLines) */
 function fitS(){[].forEach.call(d.querySelectorAll(".hub-strap ul"),function(ul){var li=[].slice.call(ul.children);li.forEach(function(l){l.style.fontSize=""});var z=parseFloat(getComputedStyle(li[0]).fontSize),n=0;
   var one=function(){return li.every(function(l){var r=d.createRange();r.selectNodeContents(l);return r.getClientRects().length<=1||l.getClientRects().length&&Math.round(r.getBoundingClientRect().height)<=Math.round(z*1.5)})};
   while(!one()&&z>11&&n++<40){z-=.5;li.forEach(function(l){l.style.fontSize=z+"px"})}})}

 /* ---- the build ---- */
 var M=null,built=false;
 function build(){M=model();if(!stock())return false;var main=d.querySelector("main.wrap");if(!main)return false;
  /* tabs: Tonight, Upcoming, Results, Leaderboard (the last two as links in the mockup) */
  var nav=d.querySelector("header .nav");if(nav&&!nav.__hub){nav.__hub=1;var a=nav.querySelector('[data-r="board"]');if(a)a.textContent="Tonight";var so=nav.querySelector(".x2p-soon");if(so)so.remove();
   ["Results","Leaderboard"].forEach(function(t){var x=d.createElement("a");x.href="#/"+t.toLowerCase();x.textContent=t;x.setAttribute("data-r",t.toLowerCase());x.addEventListener("click",function(e){e.preventDefault()});nav.appendChild(x)})}
  /* the bar */
  var b0=d.querySelector(".hub-bug");if(b0)b0.remove();var tmp=d.createElement("div");tmp.innerHTML=bug(M);var B=tmp.firstChild;placeBug(B);
  /* fight night after the film */
  var bet=main.querySelector("section.x2o-bet"),old=d.getElementById("hubTn");if(old)old.remove();tmp.innerHTML=fightNight(M);var TN=tmp.firstChild;if(TN&&bet)bet.after(TN);
  /* the last bell: the record's section, its head and strap kept, words changed; the result ticket over the record's own cards */
  var rec=d.getElementById("record");if(rec&&!rec.__hub){rec.__hub=1;var sh=rec.querySelector(".sh");var eb=sh&&sh.querySelector(".eb");if(eb)eb.textContent="Results · "+kf(M.lk);
   var h2=sh&&sh.querySelector("h2");if(h2){h2.classList.add("hub-hide");var n2=d.createElement("h2");n2.className="h45-h hub-h";n2.id="hubLbH";n2.innerHTML='<span class="h45-w h45-L">'+(dayWord(M,M.lk,1)==="Today"?"Today’s":"The last")+'</span> <span class="h45-w h45-R">bell</span>';h2.after(n2)}
   var res=d.createElement("div");res.className="hub-resw";res.innerHTML=lastBell(M);sh.after(res);
   var car=rec.querySelector(".car");var go=d.createElement("div");go.className="hub-gow";go.innerHTML=goStub("#/results","Results","Every graded card",M.graded+" rounds · the full record · MVPs");(rec.querySelector(".car-ctl")||car).after(go)}
  /* the belt race: the season ticket as it is, its eyebrow in the fight voice; a stub into the Leaderboard */
  var st=d.getElementById("standings");if(st&&!st.__hub){st.__hub=1;var e2=st.querySelector(".sh .eb");if(e2)e2.textContent="The belt";
   var g2=d.createElement("div");g2.className="hub-gow";g2.innerHTML=goStub("#/leaderboard","Leaderboard","The proof","P&L, accuracy, target hits, sectors");st.appendChild(g2)}
  [].forEach.call(d.querySelectorAll(".hub-t"),paper);
  order();land();fitH();fitS();built=true;return true}
 function placeBug(B){B=B||d.querySelector(".hub-bug");if(!B)return;var desk=matchMedia("(min-width:1200px)").matches;H.classList.toggle("hub-desk",desk);
  if(desk){var st=d.getElementById("standings");if(st&&B.parentNode!==st)st.insertBefore(B,st.firstChild)}
  else{var ti=d.querySelector("header .top-in"),nav=ti&&ti.querySelector(".nav");if(ti&&B.parentNode!==ti)ti.insertBefore(B,nav)}}
 /* the order, the numbers (the page re-numbers its own sections) */
 function order(){var main=d.querySelector("main.wrap");if(!main)return;var seq=["hubTn","record","standings","x2pSt","get"],bet=main.querySelector("section.x2o-bet"),prev=bet;
  seq.forEach(function(id){var s=d.getElementById(id);if(s&&prev&&prev.nextElementSibling!==s){prev.after(s)}if(s)prev=s});
  var no={hubTn:"01",record:"02",standings:"03",x2pSt:"04",get:"05"};Object.keys(no).forEach(function(id){var s=d.getElementById(id),n=s&&s.querySelector(".sh .no");if(n&&n.textContent!==no[id])n.textContent=no[id]})}
 /* the record lands on the last bell's main event (the page's own round picker does the move) */
 var landed=0;function land(){if(!M||!M.LB[0]||landed>3)return;var c=d.querySelector('#chips .chip[data-i="'+(M.LB[0].n-1)+'"]');if(c){c.click();landed++}}
 function tickBug(){if(!M)return;var cd=d.querySelector(".hub-bug .hub-cd");if(cd)cd.textContent=left(M.bell-Date.now())}
 var n=0;(function poll(){var ok=false;try{ok=H.classList.contains("x2pbt")&&d.querySelector(".x2p-vt")&&d.querySelector("#standings .stx-board")&&window.__x2pPnl&&typeof ROUNDS!=="undefined"&&d.querySelector("#car .card")&&d.querySelector("#x2pSt .bt-pp");
   if(ok&&!built)build();if(built){order();placeBug();if(n<30)land()}}catch(e){console.error("hub",e);window.__hubErr=e}
  if(++n<80)setTimeout(poll,250)})();
 var lw=innerWidth;addEventListener("resize",function(){if(innerWidth===lw)return;lw=innerWidth;placeBug();setTimeout(function(){[].forEach.call(d.querySelectorAll(".hub-t"),paper);fitH();fitS()},120)});
 if(d.fonts&&d.fonts.ready)d.fonts.ready.then(function(){setTimeout(function(){fitH();fitS()},200)});
 setInterval(tickBug,30000);
 window.__hubModel=function(){return M}})();
