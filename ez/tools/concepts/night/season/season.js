/*SEASON{ The season system on the EZ Terminal: a MOCKUP (night studio, 2026-11-20), injected at render time by run.js into a copy of
   v53-terminal.html, inside the page's own script just before its router line, so it reuses the live helpers (aiIcon, coIcon, flag, money,
   kfmt, agg, rank, CRN, st, draw) and never touches a live file.
   The switch: "Season 1 | Season 2" at the top of the terminal (Season 2 by default). Each segment is set in its own season's type, so the
   control shows what it switches to. Tapping it re-sets the page in the other season's kit with a View Transition: the arriving season's
   motion grammar wipes the page, and the AIs' rows glide from their old place to their new one (Kimi drops under the relegation line,
   Gemini and Qwen arrive). Season 1 is the live terminal exactly as it is today; only the switch is added.
   Switches: ?dir=A|B|C  the Season 2 kit (A Glass, B Broadcast, C The why)   ?season=1  open on Season 1   #leaders #feed #next #profile
             ?vt=<ms>     freeze the switch transition at that moment (board stills; run.js)
   Data: data.js (prep.py, the 15 calls verbatim from ez/data/s2-calls/calls.csv); Season 1 from ez-data.js through the live page. */
var SQ=new URLSearchParams(location.search),SDIR=(SQ.get("dir")||"A").toUpperCase(),SEA=2;
try{var sv=localStorage.getItem("ez-season");if(sv==="1")SEA=1}catch(e){}if(SQ.get("season"))SEA=SQ.get("season")==="1"?1:2;
if("ABC".indexOf(SDIR)<0)SDIR="A";
document.documentElement.classList.add("ss","sk"+SDIR);

/* the two new AIs (marks from tools/concepts/dopa/s2c.html via s2site/s2.js) */
MODELS.GEMINI={name:"GEMINI",ver:"Gemini 4 Argon",app:"Gemini",c:"#7dd3fc",bg:"#000",fg:"#7dd3fc",d:"M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"};
MODELS.QWEN={name:"QWEN",ver:"Qwen 4 Max",app:"Qwen",c:"#a78bfa",bg:"#000",fg:"#a78bfa",fr:"evenodd",d:"M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"};
LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN";APP.GEMINI="Gemini";APP.QWEN="Qwen";
var S2LOGO={INTU:"tools/concepts/dopa/data/co/INTU.svg",KEYS:"tools/concepts/dopa/data/co/KEYS.png",ESTC:"tools/concepts/dopa/data/co/ESTC.svg"};
function co2(t,cls){var f=S2LOGO[t]||(CO_LOGOS[t]&&"media/"+CO_LOGOS[t].f),dk=CO_LOGOS[t]&&CO_LOGOS[t].dark;return '<span class="co2 '+(dk?'dk ':'')+(cls||'')+'">'+(f?'<img src="'+f+'" alt="">':'<i>'+t+'</i>')+'</span>'}
/* every face Season 2 uses, per kit (Season 1 keeps the page's own Inter + Geist Mono) */
var SFONT={A:"Kanit:ital,wght@0,600;0,700;0,800;1,700;1,800;1,900&family=Manrope:wght@500;600;700;800",
  B:"Kanit:ital,wght@1,800&family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900",
  C:"Kanit:ital,wght@1,800&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..600&family=Bricolage+Grotesque:opsz,wght@12..96,500..800"};
(function(){var l=document.createElement("link");l.rel="stylesheet";l.href="https://fonts.googleapis.com/css2?family="+SFONT[SDIR]+"&display=swap";document.head.appendChild(l)})();

/* ---------- Season 2 numbers: one flat $100K trade per call, P&L = $100K x side x move (the sheet's own P&L column) ---------- */
var S2K=["GROK","CLAUDE","GPT","GEMINI","QWEN"],S2NEW={GEMINI:1,QWEN:1},C2=window.S2DATA.calls;
var TR2=[];C2.forEach(function(c){if(TR2.indexOf(c.n)<0)TR2.push(c.n)});TR2.sort(function(a,b){return a-b});
var RD2=TR2.map(function(n){var L=C2.filter(function(c){return c.n===n});return {n:n,t:L[0].t,co:L[0].co,move:L[0].move,calls:L}});
function a2(m){var L=C2.filter(function(c){return c.m===m}).sort(function(a,b){return a.n-b.n}),p=0,w=0;L.forEach(function(c){p+=c.pnl;if(c.ok)w++});return {L:L,p:p,w:w,l:L.length-w,last:L[L.length-1]}}
var S2O=S2K.slice().sort(function(a,b){return a2(b).p-a2(a).p});
var S1CH=rank("ALL")[0],S1CP=agg(S1CH,"ALL").p,KIMI1=agg("KIMI","ALL");
function sgn(v){return money(v,1)}
function szs(c){return (c.side==="LONG"?"+":"−")+String(+c.size)+"%"}
function mvs(v){return (v<0?"−":"+")+Math.abs(v).toFixed(2)+"%"}
function wl(a){return a.w+"–"+a.l}
function day2(s){var d=new Date(s+"T12:00:00");return d.toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"})}
function nm(m){return APP[m]||MODELS[m].app}
function words(c){var w=esc(c.words),h=esc(c.hl),i=w.indexOf(h);return i<0?w:w.slice(0,i)+'<mark>'+h+'</mark>'+w.slice(i+h.length)}
var TICK='<svg class="tk" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var CROSS='<svg class="tk" viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>';
function okm(c){return '<span class="okm '+(c.ok?"y":"n")+'" aria-label="'+(c.ok?"Right":"Wrong")+'">'+(c.ok?TICK:CROSS)+'</span>'}
/* Season 2's schedule, as the live page has it (S2: ticker, company, date, confirmed) */
function sched(){var by=[],last=null;S2.forEach(function(x){if(!/^[A-Z][a-z]{2} \d+$/.test(x[2]))return;var d=new Date(x[2]+" 2026 12:00");var k=d.toDateString();if(!last||last.k!==k){last={k:k,d:d,L:[]};by.push(last)}last.L.push(x)});return by}
function wday(d,o){return d.toLocaleDateString("en-US",o||{weekday:"short",month:"short",day:"numeric"})}

/* ---------- the switch ---------- */
var LVD='<i class="lvd" aria-hidden="true"></i>';
function swHTML(){return '<span class="sw-in">'+
  '<button type="button" role="tab" data-sea="1" aria-selected="'+(SEA===1)+'" class="sg g1"><b>Season 1</b><small>'+CRN.replace('class="lv-cr"','class="sw-cr"')+'Final · '+nm(S1CH)+'</small></button>'+
  '<button type="button" role="tab" data-sea="2" aria-selected="'+(SEA===2)+'" class="sg g2"><b>Season 2</b><small>'+LVD+'Live · '+TR2.length+' trades</small></button>'+
  '<i class="sw-th" aria-hidden="true"></i></span>'}
function mountSwitch(){var top=document.querySelector("header.top");if(!top)return;var s=document.getElementById("ssw");
  if(!s){s=document.createElement("div");s.id="ssw";s.className="ssw";s.setAttribute("role","tablist");s.setAttribute("aria-label","Season");top.querySelector(".brand").after(s)}
  s.innerHTML=swHTML();s.dataset.on=SEA;
  /* the EZ. mark and the logotype are the fixed core (RESEARCH.md, switch rules 1, 2 and 6): one set of letterforms in both seasons,
     and their own view-transition layer, so a switch leaves them still while the world changes around them */
  /* a fresh name on every switch makes the brand a layer of its own above everything the switch draws (a name that exists only in
     the new state is stacked last), so a stinger or a rule passes behind the mark, never over it */
  var br=top.querySelector(".brand");if(br)br.style.viewTransitionName="brand"+(VTB%2)}
var VTB=0;

/* ---------- Season 2 views, one markup per kit ---------- */
function rows3(a){return a.L.map(function(c){return '<span class="r3 '+(c.ok?"y":"n")+'" title="'+c.co+'">'+co2(c.t)+'<b class="pl '+(c.pnl>=0?"u":"d")+'">'+kfmt(c.pnl).replace(/^\$/,"+$")+'</b></span>'}).join("")}
function form(a){return '<span class="fm">'+a.L.map(function(c){return '<i class="'+(c.ok?"y":"n")+'" title="'+c.co+' '+(c.ok?"right":"wrong")+'"></i>'}).join("")+'</span>'}
function badge(m){return S2NEW[m]?'<em class="nw">New</em>':''}
function ghostKimi(cls){return '<div class="'+cls+'" data-m="KIMI">'+aiIcon("KIMI",28)+'<span class="gk-t"><b>Kimi</b><small>Out after Season 1 · hit rate '+(100*KIMI1.hr).toFixed(0)+'%</small></span><em class="out">Relegated</em></div>'}

function lbA(){var top=S2O[0],a=a2(top);
  var hero='<button type="button" class="a-hero gl" data-m="'+top+'" data-pick="'+top+'" data-go="profile"><i class="rim" aria-hidden="true"></i>'+
    '<span class="a-hk"><span class="a-rk">1</span><small>Leader</small></span>'+aiIcon(top,64)+
    '<span class="a-hn"><b>'+nm(top)+'</b><small>'+MODELS[top].ver+' '+flag(FLAG[top])+'</small></span>'+
    '<span class="a-hp"><small>P&amp;L</small><b class="pl '+(a.p>=0?"u":"d")+'">'+sgn(a.p)+'</b><span class="a-wl">'+wl(a)+'</span></span>'+
    '<span class="a-h3">'+rows3(a)+'</span></button>';
  var list=S2O.slice(1).map(function(m,i){var x=a2(m);return '<button type="button" class="a-row gl" data-m="'+m+'" data-pick="'+m+'" data-go="profile"><span class="a-rk">'+(i+2)+'</span>'+aiIcon(m,40)+
    '<span class="a-nm"><b>'+nm(m)+badge(m)+'</b><small>'+MODELS[m].ver+' '+flag(FLAG[m])+'</small></span>'+form(x)+'<span class="a-pc"><b class="pl '+(x.p>=0?"u":"d")+'">'+sgn(x.p)+'</b><small>W–L '+wl(x)+'</small></span></button>'}).join("");
  return '<section class="a-head"><small>Season 2 · after '+TR2.length+' trades</small><h1>Leaderboard</h1><p>Everyone started at P&amp;L $0 · $100K a trade</p></section>'+
    '<div class="a-board">'+hero+'<div class="a-list">'+list+'<div class="a-line"><span>Under 50% hit rate at season end is relegated</span></div>'+ghostKimi("a-ghost gl")+'</div></div>'}

function bug(t,c,live,sm){return '<div class="b-bug'+(sm?' sm':'')+'"><b><i>'+t+'</i></b><span><i>'+c+'</i>'+(live?'<i class="lvd"></i>':'')+'</span></div>'}
function lbB(){var rows=S2O.map(function(m,i){var x=a2(m);return '<button type="button" class="b-row'+(i===0?" b1":"")+'" data-m="'+m+'" data-pick="'+m+'" data-go="profile" style="--mc:'+(m==="GROK"?"#f7f2ea":MODELS[m].c)+'">'+
    '<span class="b-pos">'+(i+1)+'</span><i class="b-bar"></i>'+aiIcon(m,34)+'<span class="b-nm"><b>'+nm(m)+'</b><small>'+MODELS[m].ver+'</small>'+(S2NEW[m]?'<em class="nw">New</em>':'')+'</span>'+
    '<span class="b-wl">'+wl(x)+'</span>'+form(x)+'<span class="b-pl '+(x.p>=0?"u":"d")+'">'+sgn(x.p)+'</span></button>'}).join("");
  var res=RD2.slice().reverse().map(function(r){var sh=r.calls.filter(function(c){return c.side==="SHORT"}),lo=r.calls.filter(function(c){return c.side==="LONG"});
    return '<div class="b-res">'+co2(r.t)+'<span class="b-rt"><b>'+r.t+'</b><small>'+r.co+'</small></span><span class="b-mv '+(r.move<0?"d":"u")+'">'+mvs(r.move)+'</span>'+
      '<span class="b-sd"><span class="'+(r.move<0?"w":"")+'"><small>Short</small>'+sh.map(function(c){return aiIcon(c.m,20)}).join("")+'</span><span class="'+(r.move>0?"w":"")+'"><small>Long</small>'+lo.map(function(c){return aiIcon(c.m,20)}).join("")+'</span></span></div>'}).join("");
  var nx=sched().slice(0,1)[0];
  return '<div class="b-grid"><section class="b-main">'+bug("Standings","Season 2 · after "+TR2.length+" trades",1)+
    '<div class="b-th"><span>Pos</span><span>AI</span><span>W–L</span><span>Form</span><span>P&amp;L</span></div>'+rows+
    '<div class="b-zone"><span>Relegation line · under 50% at season end</span></div>'+ghostKimi("b-ghost")+'<p class="b-ft">P&amp;L from $0 · $100K on every trade</p></section>'+
    '<aside class="b-rail">'+bug("Last close","Fri Nov 20",0,1)+res+
    (nx?bug("Next",wday(nx.d),0,1)+'<div class="b-next">'+nx.L.map(function(x){return '<span>'+co2(x[0])+'<b>'+x[1]+'</b></span>'}).join("")+'</div>':'')+'</aside></div>'}

function lbC(){var top=S2O[0],n=TR2.length,nw=["","one","two","three","four","five","six"][n]||n;
  var list=S2O.map(function(m,i){var x=a2(m),c=x.last;return '<li class="c-it" data-m="'+m+'"><button type="button" class="c-btn" data-pick="'+m+'" data-go="profile"><span class="c-num">'+(i+1)+'</span>'+
    '<span class="c-bd"><span class="c-l1">'+aiIcon(m,26)+'<b>'+nm(m)+'</b>'+(S2NEW[m]?'<em class="nw">New</em>':'')+'<span class="c-pl '+(x.p>=0?"u":"d")+'">'+sgn(x.p)+'</span></span>'+
    '<span class="c-l2"><small>'+MODELS[m].ver+' · '+LAB[m]+'</small><small class="c-wl">W–L '+wl(x)+'</small></span>'+
    '<span class="c-why"><q>'+esc(c.hl)+'</q><small>'+c.side+' '+c.co+' '+okm(c)+'</small></span></span></button></li>'}).join("");
  return '<div class="c-grid"><header class="c-mast"><p class="c-kick">Season 2 · The leaderboard</p><h1>'+nm(top)+' leads after '+nw+' trades</h1>'+
    '<p class="c-dek">Five AIs, P&amp;L from $0, $100K on every trade. Each line is the AI’s latest reason, in its own words.</p></header>'+
    '<ol class="c-list">'+list+'</ol>'+
    '<aside class="c-side"><div class="c-note"><p class="c-kick">The rule</p><p>Under 50% hit rate at the end of the season and the AI is out.</p>'+ghostKimi("c-ghost")+'</div>'+
    '<div class="c-note"><p class="c-kick">Season 1</p><p>'+CRN+'<b>'+nm(S1CH)+'</b> finished first, P&amp;L <span class="u">'+sgn(S1CP)+'</span>.</p></div></aside></div>'}

/* Upcoming: what's next, then the last close */
function upData(){var sc=sched();return {sc:sc.slice(0,3),more:S2.length-sc.slice(0,3).reduce(function(s,g){return s+g.L.length},0)}}
function lastClose(cls){return RD2.slice().reverse().map(function(r){var L=r.calls.slice().sort(function(a,b){return (b.ok-a.ok)||(b.pnl-a.pnl)});
  return '<div class="'+cls+'"><div class="lc-h">'+co2(r.t)+'<span class="lc-n"><b>'+r.co+'</b><small>'+r.t+' · Trade '+r.n+'</small></span><span class="lc-mv '+(r.move<0?"d":"u")+'">'+mvs(r.move)+'</span></div>'+
    '<div class="lc-s">'+L.map(function(c){return '<span class="lc-c '+(c.ok?"y":"n")+'">'+aiIcon(c.m,22)+'<b>'+nm(c.m)+'</b><em class="sd '+(c.side==="LONG"?"L":"S")+'">'+c.side+'</em>'+okm(c)+'<span class="pl '+(c.pnl>=0?"u":"d")+'">'+sgn(c.pnl)+'</span></span>'}).join("")+'</div></div>'}).join("")}
var ALLUP=false;
function nextList(cls){var U=upData(),G=ALLUP?sched():U.sc;return G.map(function(g){return '<div class="'+cls+'"><div class="nx-d"><b>'+wday(g.d,{weekday:"short"})+'</b><span>'+wday(g.d,{month:"short",day:"numeric"})+'</span></div><div class="nx-L">'+
    g.L.map(function(x){return '<span class="nx-c">'+co2(x[0])+'<span><b>'+x[1]+'</b><small>'+x[0]+(x[3]?' · Confirmed':' · Expected')+'</small></span></span>'}).join("")+'</div></div>'}).join("")+
  '<button type="button" class="nx-more" data-s2more>'+(ALLUP?'Fewer':'All '+S2.length+' Season 2 trades')+'</button>'}
var RULE='Each AI files LONG or SHORT 1 hour before the report. The trade closes at the next market close.';
function upA(){return '<section class="a-head"><small>Season 2 · Upcoming</small><h1>Next trades</h1><p>'+RULE+'</p></section><div class="a-up"><div class="a-col">'+nextList("a-day gl")+'</div><div class="a-col"><h2 class="a-h2">Last close · Fri Nov 20</h2>'+lastClose("a-lc gl")+'</div></div>'}
function upB(){return '<div class="b-grid"><section class="b-main">'+bug("Fixtures","Season 2 · times in "+TZ)+'<p class="b-rule">'+RULE+'</p>'+nextList("b-day")+'</section>'+
  '<aside class="b-rail">'+bug("Results","Fri Nov 20",0,1)+lastClose("b-lc")+'</aside></div>'}
function upC(){return '<div class="c-grid"><header class="c-mast"><p class="c-kick">Season 2 · Upcoming</p><h1>The week ahead</h1><p class="c-dek">'+RULE+'</p></header><div class="c-main">'+nextList("c-day")+
  '<h2 class="c-h2">The last close, Friday November 20</h2>'+lastClose("c-lc")+'</div></div>'}

/* Feed: the 15 calls, newest trade first, each AI's own words with its key clause marked */
var FEEDF=null;
function post(c,cls){var r=RD2.filter(function(x){return x.n===c.n})[0];
  return '<article class="'+cls+'" data-m="'+c.m+'"><header class="po-h">'+aiIcon(c.m,36)+'<span class="po-n"><b>'+nm(c.m)+'</b><small>'+MODELS[c.m].ver+' · '+day2(c.called)+'</small></span>'+co2(c.t,"po-co")+'</header>'+
    '<div class="po-sd"><em class="sd '+(c.side==="LONG"?"L":"S")+'">'+c.side+' ('+szs(c)+')</em><span class="po-cf">'+c.conf+'% confident</span><span class="po-on">'+c.co+'</span></div>'+
    '<p class="po-w">'+words(c)+'</p><footer class="po-r '+(c.ok?"y":"n")+'">'+okm(c)+'<span>'+c.co+' '+mvs(r.move)+' at the close</span><b class="pl '+(c.pnl>=0?"u":"d")+'">P&amp;L '+sgn(c.pnl)+'</b></footer></article>'}
function feedL(cls){var L=C2.slice().sort(function(a,b){return (b.n-a.n)||(S2K.indexOf(a.m)-S2K.indexOf(b.m))});if(FEEDF)L=L.filter(function(c){return c.t===FEEDF});return L.map(function(c){return post(c,cls)}).join("")}
function chips(cls){return '<div class="'+cls+'" role="tablist">'+[[null,"All"]].concat(RD2.slice().reverse().map(function(r){return [r.t,r.co]})).map(function(x){return '<button type="button" data-ff="'+(x[0]||"")+'" aria-selected="'+(FEEDF===x[0])+'">'+x[1]+'</button>'}).join("")+'</div>'}
function feedA(){return '<section class="a-head"><small>Season 2 · Feed</small><h1>The feed</h1><p>'+C2.length+' calls · the AIs’ own words · key line marked</p></section>'+chips("a-chips")+'<div class="a-feed">'+feedL("a-po gl")+'</div>'}
function feedB(){return '<div class="b-grid"><section class="b-main">'+bug("Live feed",C2.length+" calls · their own words",1)+chips("b-chips")+feedL("b-po")+'</section>'+
  '<aside class="b-rail">'+bug("Standings","After "+TR2.length+" trades",0,1)+S2O.map(function(m,i){var x=a2(m);return '<div class="b-mini"><span class="b-pos">'+(i+1)+'</span>'+aiIcon(m,22)+'<b>'+nm(m)+'</b><span class="b-pl '+(x.p>=0?"u":"d")+'">'+sgn(x.p)+'</span></div>'}).join("")+'</aside></div>'}
function feedC(){return '<div class="c-grid"><header class="c-mast"><p class="c-kick">Season 2 · The feed</p><h1>In their own words</h1><p class="c-dek">Every call comes with its reason, in the AI’s own words. The line that carries it is marked.</p></header>'+chips("c-chips")+'<div class="c-main">'+feedL("c-po")+'</div></div>'}

/* AI profiles in Season 2: one card per AI with its trades and reasons */
function profS2(){var m=S2K.indexOf(st.m)>-1?st.m:S2O[0],x=a2(m),i=S2O.indexOf(m);var pk='<div class="s2pk">'+S2O.map(function(k){return '<button type="button" data-pick="'+k+'" data-go="profile" aria-pressed="'+(k===m)+'">'+aiIcon(k,22)+nm(k)+'</button>'}).join("")+'</div>';
  var cls={A:"a-po gl",B:"b-po",C:"c-po"}[SDIR];
  return '<section class="s2pf">'+pk+'<div class="s2ph">'+aiIcon(m,56)+'<span><b>'+nm(m)+badge(m)+'</b><small>'+MODELS[m].ver+' · '+LAB[m]+' '+flag(FLAG[m])+'</small></span><span class="s2pr"><small>#'+(i+1)+' · '+wl(x)+'</small><b class="pl '+(x.p>=0?"u":"d")+'">'+sgn(x.p)+'</b></span></div>'+
    x.L.slice().reverse().map(function(c){return post(c,cls)}).join("")+'</section>'}

/* nav for Season 2: the Feed tab is new; the order follows the season's job (who leads, why, what's next) */
var NAV2=[["leaders","LEADERBOARD",'<path d="M5 20V11M12 20V5M19 20v-6"/>'],["feed","FEED",'<path d="M5 6h14M5 12h14M5 18h9"/>'],["next","UPCOMING",'<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>'],["profile","AI PROFILES",'<circle cx="9" cy="8" r="3.5"/><path d="M3 20c.5-3.5 3-5.5 6-5.5s5.5 2 6 5.5M16 4.6a3.4 3.4 0 010 6.6M18 14.6c2 .8 3 2.6 3.3 5.4"/>']];
var LB2={A:lbA,B:lbB,C:lbC},UP2={A:upA,B:upB,C:upC},FD2={A:feedA,B:feedB,C:feedC};

/* view-transition names: each AI's first row on the page, so a switch glides the shared AIs and drops or adds the rest */
function vtNames(){var seen={};document.querySelectorAll('main tr[data-pick], main [data-m]').forEach(function(e){var m=e.getAttribute("data-pick")||e.getAttribute("data-m");if(!m||seen[m]){e.style.viewTransitionName="";return}seen[m]=1;e.style.viewTransitionName="ai-"+m.toLowerCase();e.style.viewTransitionClass="ai"})}

var draw1=draw;
draw=function(){var de=document.documentElement;de.classList.toggle("s1",SEA===1);de.classList.toggle("s2",SEA===2);mountSwitch();
  if(SEA===1){if(st.v==="feed")st.v="leaders";draw1();vtNames();return}
  var v=st.v==="home"?"leaders":st.v;var h=v==="feed"?FD2[SDIR]():v==="next"?UP2[SDIR]():v==="profile"?profS2():LB2[SDIR]();
  document.getElementById("main").innerHTML='<div class="s2v s2-'+v+'">'+h+'</div>';var ip=document.getElementById("ipill");if(ip)ip.hidden=true;
  document.getElementById("nav").innerHTML=NAV2.map(function(n){return '<button data-go="'+n[0]+'" class="'+(v===n[0]?"on":"")+'"><svg viewBox="0 0 24 24">'+n[2]+'</svg>'+n[1]+'</button>'}).join("");
  document.getElementById("dnav").innerHTML=NAV2.map(function(n){return '<button data-go="'+n[0]+'" class="'+(v===n[0]?"on":"")+'">'+n[1]+'</button>'}).join("");vtNames()};

/* the switch: the arriving season's motion grammar (data-vt on <html>), then the rows glide */
function goSeason(n){if(n===SEA)return;var de=document.documentElement;de.dataset.vt=(n===2?SDIR:"S1");
  var fx=n===2&&SDIR==="B"?"vt-stinger":n===2&&SDIR==="C"?"vt-rule":null;
  try{localStorage.setItem("ez-season",String(n))}catch(e){}
  var apply=function(){SEA=n;VTB++;draw();if(fx){var x=document.createElement("i");x.id=fx;x.setAttribute("aria-hidden","true");document.body.prepend(x)}};
  if(!document.startViewTransition||matchMedia("(prefers-reduced-motion: reduce)").matches){apply();delete de.dataset.vt;return}
  var t=document.startViewTransition(apply);window.__vt=t;t.finished.finally(function(){delete de.dataset.vt;var x=fx&&document.getElementById(fx);if(x)x.remove()})}
window.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-sea],[data-ff],[data-s2more]");if(!b)return;e.stopPropagation();
  if(b.dataset.sea)goSeason(+b.dataset.sea);else if("ff" in b.dataset){FEEDF=b.dataset.ff||null;draw()}else{ALLUP=!ALLUP;draw()}},true);
window.__season=function(){return {SEA:SEA,SDIR:SDIR,S2O:S2O,P:S2O.map(function(m){return [m,a2(m).p]})}};
window.__go=goSeason;
if(/^#feed$/.test(location.hash))st.v="feed";
/*}SEASON*/
