/*S2SITE{ Season 2 on the EZ Terminal: a MOCKUP, injected at render time into a copy of v53-terminal.html by run.js.
   It runs inside the page's own IIFE (inserted just before the router line), so it reuses the live helpers
   (aiIcon, coIcon, flag, money, kfmt, liveCards, lastDay, nyClose, tm, TZ, BACK, CRN) and the live markup classes.
   Never shipped: the live file is untouched.
   ?take=A  season switch (Season 2 | Season 1 tabs, Season 2 default; &season=1 opens Season 1)
   ?take=B  Season 2 table under a slim Season 1 champion strip (&open=1 opens Season 1 from the strip)
   ?take=C  Upcoming: the In play cards with five AIs, Season 2's rounds as Next trades rows
   ?take=D  after tonight's close: Intuit graded with an EXAMPLE move of -3% (no result exists yet), on take B's layout */
var S2Q=new URLSearchParams(location.search),TAKE=(S2Q.get("take")||"A").toUpperCase(),S2SEA=S2Q.get("season")==="1"?1:2,S1OPEN=S2Q.get("open")==="1";

/* the two new AIs: marks from tools/concepts/dopa/s2c.html (NEW); colours picked distinct from GPT #10a37f, Claude #d97757,
   Kimi #1e80ff, Grok #111 and from the terminal's long/short/leader inks (validated, see run.js report) */
MODELS.GEMINI={name:"GEMINI",ver:"Gemini 4 Argon",app:"Gemini",c:"#7dd3fc",bg:"#000",fg:"#7dd3fc",d:"M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81"};
MODELS.QWEN={name:"QWEN",ver:"Qwen4-Max",app:"Qwen",c:"#a78bfa",bg:"#000",fg:"#a78bfa",fr:"evenodd",d:"M12.604 1.34c.393.69.784 1.382 1.174 2.075a.18.18 0 00.157.091h5.552c.174 0 .322.11.446.327l1.454 2.57c.19.337.24.478.024.837-.26.43-.513.864-.76 1.3l-.367.658c-.106.196-.223.28-.04.512l2.652 4.637c.172.301.111.494-.043.77-.437.785-.882 1.564-1.335 2.34-.159.272-.352.375-.68.37-.777-.016-1.552-.01-2.327.016a.099.099 0 00-.081.05 575.097 575.097 0 01-2.705 4.74c-.169.293-.38.363-.725.364-.997.003-2.002.004-3.017.002a.537.537 0 01-.465-.271l-1.335-2.323a.09.09 0 00-.083-.049H4.982c-.285.03-.553-.001-.805-.092l-1.603-2.77a.543.543 0 01-.002-.54l1.207-2.12a.198.198 0 000-.197 550.951 550.951 0 01-1.875-3.272l-.79-1.395c-.16-.31-.173-.496.095-.965.465-.813.927-1.625 1.387-2.436.132-.234.304-.334.584-.335a338.3 338.3 0 012.589-.001.124.124 0 00.107-.063l2.806-4.895a.488.488 0 01.422-.246c.524-.001 1.053 0 1.583-.006L11.704 1c.341-.003.724.032.9.34zm-3.432.403a.06.06 0 00-.052.03L6.254 6.788a.157.157 0 01-.135.078H3.253c-.056 0-.07.025-.041.074l5.81 10.156c.025.042.013.062-.034.063l-2.795.015a.218.218 0 00-.2.116l-1.32 2.31c-.044.078-.021.118.068.118l5.716.008c.046 0 .08.02.104.061l1.403 2.454c.046.081.092.082.139 0l5.006-8.76.783-1.382a.055.055 0 01.096 0l1.424 2.53a.122.122 0 00.107.062l2.763-.02a.04.04 0 00.035-.02.041.041 0 000-.04l-2.9-5.086a.108.108 0 010-.113l.293-.507 1.12-1.977c.024-.041.012-.062-.035-.062H9.2c-.059 0-.073-.026-.043-.077l1.434-2.505a.107.107 0 000-.114L9.225 1.774a.06.06 0 00-.053-.031zm6.29 8.02c.046 0 .058.02.034.06l-.832 1.465-2.613 4.585a.056.056 0 01-.05.029.058.058 0 01-.05-.029L8.498 9.841c-.02-.034-.01-.052.028-.054l.216-.012 6.722-.012z"};
LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN";APP.GEMINI="Gemini";APP.QWEN="Qwen";

/* the live page never says "paper": the How it works back and the foot note, mocked without it */
BACK=BACK.replace("We put $100K of paper money on each pick.","We put $100K on each pick.");

/* a company with no logo in CO_LOGOS shows its ticker on the disc, never an empty disc or a broken image */
var coIcon0=coIcon;coIcon=function(t){if(CO_LOGOS[t])return coIcon0(t);var s=String(t).replace(/\..*$/,"");return '<span class="co k s2tk" title="'+s+'"><i>'+s+'</i></span>'};

/* Season 1 exactly as the live page built it (MK, T: flat $100K, P&L = $100K x direction x move) */
var S1K=MK.slice(),S1T=T;
/* Season 2: the owner's sheet, rows after 112 (held off the site by sync_sheet.py), read 2026-11-20. Sheet UP/DOWN shown as LONG/SHORT. */
var S2K=["GROK","CLAUDE","GPT","GEMINI","QWEN"],S2NEW=["GEMINI","QWEN"];
var S2SHEET=[[113,"INTU","Intuit",[["GPT","UP",4.5],["CLAUDE","DOWN",4],["GROK","DOWN",2.4],["GEMINI","UP",5],["QWEN","UP",4]]],
 [114,"KEYS","Keysight",[["GPT","UP",5.5],["CLAUDE","UP",4],["GROK","DOWN",2.2],["GEMINI","DOWN",6],["QWEN","UP",5]]],
 [115,"ESTC","Elastic",[["GPT","UP",7],["CLAUDE","UP",6],["GROK","UP",2.8],["GEMINI","UP",11.5],["QWEN","DOWN",8]]]];
/* take D only: an EXAMPLE move for Intuit, made up to show the layout after the first close. Not a result. */
var S2EX=TAKE==="D"?{113:-3}:{};
var S2R=S2SHEET.map(function(x){return {n:x[0]-112,sn:x[0],ticker:x[1],co:x[2],called:"11/19/26",resolves:"11/20/26",a:S2EX[x[0]],
  calls:x[3].map(function(c){return {m:c[0],dir:c[1],mag:String(c[2]),v:(c[1]==="DOWN"?-1:1)*c[2]}})}});
var S2G=S2R.filter(function(r){return typeof r.a==="number"});
PENDING=S2R.filter(function(r){return typeof r.a!=="number"});
var T2={};S2K.forEach(function(m){T2[m]=[]});
S2G.forEach(function(r){r.calls.forEach(function(c){var s=c.dir==="DOWN"?-1:1;T2[c.m].push({r:r,s:s,mag:+c.mag,pnl:1000*s*r.a,ok:(s>0)===(r.a>0),off:Math.abs(c.v-r.a),date:pd(r.resolves)})})});

function ag2(TT,m){var L=TT[m]||[],p=0,ok=0,off=0;L.forEach(function(x){p+=x.pnl;if(x.ok)ok++;off+=x.off});return {L:L,p:p,w:ok,l:L.length-ok,hr:L.length?ok/L.length:0,off:L.length?off/L.length:0}}
/* rank by P&L, ties by the smaller average miss; equal P&L shares the place (1, 1, 3) */
function order(K,TT,key){var A={};K.forEach(function(m){A[m]=ag2(TT,m)});var o=K.slice().sort(function(a,b){return key==="hr"?((A[b].hr-A[a].hr)||(A[b].w-A[a].w)||(A[a].off-A[b].off)):((A[b].p-A[a].p)||(A[a].off-A[b].off))});
  var rk={};o.forEach(function(m,i){var prev=o[i-1];rk[m]=(i&&(key==="hr"?(A[prev].hr===A[m].hr&&A[prev].w===A[m].w):A[prev].p===A[m].p))?rk[prev]:i+1});return {o:o,rk:rk,A:A}}
var S1C=order(S1K,S1T,"p").o[0],S1REL=S1K.filter(function(m){return ag2(S1T,m).hr<.5});
/* R110 to R112 have no resolution date in the sheet, so the live Last matchday stops at Nov 13; the owner's rule (graded at the next
   close after the report) and the page's REPORT times give Nov 17 (Disney, Home Depot) and Nov 18 (NVIDIA). Mockup only. */
ROUNDS.forEach(function(r){if(r.resolves||typeof r.a!=="number")return;var R=REPORT[r.ticker],d;if(R){var t=new Date(R.t);d=new Date(t);if(+t>=+nyClose(t))do{d.setDate(d.getDate()+1)}while(d.getDay()===0||d.getDay()===6)}else{var c=pd(r.called);d=new Date(c);do{d.setDate(d.getDate()+1)}while(d.getDay()===0||d.getDay()===6)}
  r.resolves=(d.getMonth()+1)+"/"+d.getDate()+"/"+String(d.getFullYear()).slice(2);r.s2fill=1});
var S1D0=null,S1D1=null;ROUNDS.forEach(function(r){var a=pd(r.called),b=pd(r.resolves)||a;if(a&&(!S1D0||a<S1D0))S1D0=a;if(b&&(!S1D1||b>S1D1))S1D1=b});
function md(d){return d.toLocaleDateString("en-US",{month:"short",day:"numeric"})}

function nameCell(m,rank,gold,o){var crown=!o.bare&&o.crown===m,tag=!o.bare&&o.tags[m]?'<em class="s2tg '+o.tags[m][0]+'">'+o.tags[m][1]+'</em>':'';
  return '<td class="ac"><span class="nm2"><span class="no'+(gold?" g":"")+'">'+rank+'</span><span class="s2mk">'+(crown?CRN:'')+aiIcon(m,24)+'</span><span><b>'+MODELS[m].app+' '+flag(FLAG[m])+tag+'</b><small>'+MODELS[m].ver+'</small></span></span></td>'}
function lr2(TT,m){var x=(TT[m]||[]).slice().sort(function(a,b){return b.r.n-a.r.n})[0];return x?'<span class="lrd">'+coIcon(x.r.ticker)+'<span><span class="pl '+(x.pnl>=0?"u":"d")+'">'+kfmt(x.pnl)+'</span><small>'+x.r.ticker.replace(/\..*$/,'')+'</small></span></span>':'<span class="s2nil">–</span>'}
function sp2(TT,m){var L=(TT[m]||[]).slice().sort(function(a,b){return a.date-b.date});if(!L.length)return '<svg viewBox="0 0 96 24"><line x1="0" y1="12" x2="96" y2="12" stroke="#5f5853" stroke-width="1.4" stroke-dasharray="3 3"/></svg>';
  var c=0,v=[0];L.forEach(function(x){c+=x.pnl;v.push(c)});var lo=Math.min.apply(null,v),hi=Math.max.apply(null,v);
  return '<svg viewBox="0 0 96 24"><polyline fill="none" stroke="'+(c>=0?"#55d6a2":"#e8576b")+'" stroke-width="1.6" points="'+v.map(function(y,i){return (96*i/(v.length-1)).toFixed(1)+","+(22-20*(y-lo)/((hi-lo)||1)).toFixed(1)}).join(" ")+'"/></svg>'}
function l52(TT,m){var L=(TT[m]||[]).slice().sort(function(a,b){return b.r.n-a.r.n}).slice(0,5).reverse(),s=L.map(function(x){return '<i class="'+(x.ok?"ok":"no")+'" title="'+x.r.co+'"></i>'}).join("");for(var i=L.length;i<5;i++)s+='<i class="e"></i>';return s}

/* one renderer for either season, in the live board's own markup (lt tables, nm2 cells, flip, kick) */
function board(sea,o){var K=sea===1?S1K:S2K,TT=sea===1?S1T:T2,P=order(K,TT,"p"),H=order(K,TT,"hr"),any=K.some(function(m){return P.A[m].L.length});
  var lab=sea===1?"SEASON 1 FINAL":"SEASON 2";
  var t1='<div class="flip'+(st.how?' fl-on':'')+'"><section class="pn fr"><div class="tabs th2"><button class="on">LEADERBOARD</button><button type="button" class="hiw" data-how>How it works <i>↻</i></button></div>'+(o.top||'')+
   '<div class="kick"><small>'+lab+' P&amp;L</small><span>'+(sea===1?md(S1D0)+' – '+md(S1D1)+' · '+ROUNDS.length+' rounds':o.kick1||'$100K on every trade')+'</span></div>'+
   '<table class="lt s2lt"><thead><tr><th>AI</th><th>Last round</th><th>Season P&amp;L</th></tr></thead><tbody>'+
   P.o.map(function(m){var a=P.A[m],z=!a.L.length;return '<tr data-s2row="'+m+'">'+nameCell(m,any?P.rk[m]:"–",any&&P.rk[m]===1,o)+'<td>'+lr2(TT,m)+'</td><td class="pc"><b class="pl '+(z?"z":a.p>=0?"u":"d")+'">'+(z?"$0":money(a.p,1))+'</b>'+sp2(TT,m)+'</td></tr>'}).join("")+'</tbody></table></section>'+BACK+'</div>';
  var t2='<section class="pn"><div class="tabs"><button class="on">HIT RATE</button></div>'+
   '<div class="kick"><small>'+lab+' · RIGHT ON DIRECTION</small><span>'+(sea===1?"Under 50% hit rate: relegated":"Under 50% hit rate at season’s end is relegated")+'</span></div>'+
   '<table class="lt s2lt s2hit"><thead><tr><th>AI</th><th class="c">Last 5</th><th class="c"><span class="wlh">W/L</span></th><th class="c">Hit rate</th></tr></thead><tbody>'+
   H.o.map(function(m){var a=H.A[m],z=!a.L.length;return '<tr data-s2row="'+m+'">'+nameCell(m,any?H.rk[m]:"–",any&&H.rk[m]===1,{bare:1})+'<td class="c"><span class="l5">'+l52(TT,m)+'</span></td><td class="c mono wlc"><span>'+a.w+'/'+a.l+'</span></td><td class="c"><b class="hr '+(z?"z":a.hr>=.5?"u":"d")+'">'+(z?'–':(100*a.hr).toFixed(sea===1?1:0)+'%')+'</b>'+(sea===1&&a.hr<.5?'<em class="s2tg rel s2rz">RELEGATED</em>':'')+'</td></tr>'}).join("")+'</tbody></table></section>';
  var t3='';if(sea===1){var tmp=document.createElement("div");tmp.innerHTML=leaders0();var sx=tmp.querySelector(".pn.sx");if(sx){t3=sx.outerHTML.replace("ALL TIME · RIGHT ON DIRECTION BY SECTOR","SEASON 1 FINAL · RIGHT ON DIRECTION BY SECTOR")}}
  return '<div class="lbg"><div>'+t1+'</div><div>'+t2+'</div></div>'+t3+'<div class="note">P&amp;L: $100K on every trade, long or short as each AI calls it, graded at the next market close after earnings.</div>'}
var leaders0=leaders;

/* the first close of Season 2, in the viewer's own time */
function firstClose(){var cl=nyClose(pd("11/20/26")),n=+new Date();var cos='<span class="cos">'+S2R.map(function(r){return coIcon(r.ticker)}).join("")+'</span>';
  if(TAKE==="D"){var x=S2G[0];return '<button type="button" class="s2fc" data-go="next">'+cos+'<span class="um"><b class="cn">Round 1 graded: Intuit <span class="'+(x.a<0?"d":"u")+'">'+pct(x.a)+'</span> <em class="s2ex-t">EXAMPLE</em></b><small>Keysight and Elastic: results due · closed '+tm(cl)+' '+TZ+'</small></span><i class="s2ch" aria-hidden="true"></i></button>'}
  return '<button type="button" class="s2fc" data-go="next">'+cos+'<span class="um"><b class="cn">First trades close today</b><small>Intuit, Keysight, Elastic · '+tm(cl)+' '+TZ+'</small></span><i class="s2ch" aria-hidden="true"></i></button>'}

/* who joined: the panel that replaces SEASON 2 TRYOUTS */
function lineup(foot){var kr=ag2(S1T,"KIMI");return '<section class="pn s2lu"><div class="tabs"><button class="on">NEW IN SEASON 2<span class="n">2</span></button></div>'+
  S2NEW.map(function(m){return '<div class="s2lr">'+aiIcon(m,36)+'<span class="um"><b class="cn">'+MODELS[m].app+'<em class="s2tg new">NEW</em></b><small>'+MODELS[m].ver+'</small></span><span class="s2lab">'+flag(FLAG[m])+'<b>'+LAB[m]+'</b></span></div>'}).join("")+
  (foot?'<div class="s2lf">Grok, Claude and GPT return. Kimi was relegated: '+(100*kr.hr).toFixed(1)+'% hit rate in Season 1.</div>':'')+'</section>'}

/* take A: the season switch, in the terminal's own tab style */
function seasonTabs(){return '<section class="pn ssw"><div class="tabs">'+[[2,"SEASON 2"],[1,"SEASON 1"]].map(function(x){return '<button type="button" data-s2s="'+x[0]+'" class="'+(S2SEA===x[0]?"on":"")+'">'+x[1]+'</button>'}).join("")+
  '<span class="lv-dt">'+(S2SEA===2?(TAKE==="D"?"1 of 3 graded":"Day 1 · 3 in play"):"Final · Grok wins")+'</span></div></section>'}

/* take B: the Season 1 champion strip; it opens Season 1's final table in place (the live Season 2 collapse idiom) */
function champStrip(){var g=ag2(S1T,S1C),P=order(S1K,S1T,"p");
  var tb='<table class="lt s2lt s1lt"><thead><tr><th>AI</th><th class="c">Hit rate</th><th>Final P&amp;L</th></tr></thead><tbody>'+
   P.o.map(function(m){var a=P.A[m];return '<tr data-s2row="'+m+'">'+nameCell(m,P.rk[m],P.rk[m]===1,{crown:S1C,tags:{}})+'<td class="c"><b class="hr '+(a.hr>=.5?"u":"d")+'">'+(100*a.hr).toFixed(1)+'%</b>'+(a.hr<.5?'<em class="s2tg rel s2rz">RELEGATED</em>':'')+'</td><td class="pc"><b class="pl '+(a.p>=0?"u":"d")+'">'+money(a.p,1)+'</b></td></tr>'}).join("")+'</tbody></table>';
  return '<section class="pn s1c'+(S1OPEN?" on":"")+'"><button type="button" class="s1h" data-s1c aria-expanded="'+S1OPEN+'"><span class="s2mk">'+CRN+aiIcon(S1C,34)+'</span>'+
   '<span class="um"><small>SEASON 1 CHAMPION</small><b class="cn">'+MODELS[S1C].app+' <span class="pl u">P&amp;L '+money(g.p,1)+'</span></b></span>'+
   S1REL.map(function(m){return '<span class="s1k">'+aiIcon(m,22)+'<span><b>'+MODELS[m].app+'</b><em class="s2tg rel">RELEGATED</em></span></span>'}).join("")+
   '<i class="cv" aria-hidden="true"></i></button><div class="s1b"'+(S1OPEN?'':' hidden')+'><div class="kick"><small>SEASON 1 FINAL</small><span>'+md(S1D0)+' – '+md(S1D1)+' · '+ROUNDS.length+' rounds</span></div>'+tb+'</div></section>'}

function exBanner(){return TAKE==="D"?'<div class="s2ex">EXAMPLE STATE · Intuit −3.00% is made up to show the board after the first close. No Season 2 result is in yet.</div>':''}

leaders=function(){
  if(TAKE==="A"){var o2={crown:S2SEA===2?S1C:S1C,tags:{}};if(S2SEA===2){S2NEW.forEach(function(m){o2.tags[m]=["new","NEW"]});o2.top=firstClose()}else{}
    return seasonTabs()+board(S2SEA,o2)+(S2SEA===2?lineup(true):'')}
  /* B and D: no tabs; the champion strip on top, Season 2 under it */
  var o={crown:null,tags:{},top:firstClose(),kick1:TAKE==="D"?'After round 1 · EXAMPLE move':'$100K on every trade'};S2NEW.forEach(function(m){o.tags[m]=["new","NEW"]});
  return exBanner()+champStrip()+board(2,o)+lineup(false)};

/* take C: Upcoming in Season 2. The live In play card takes five AIs as they are; the rounds count from Season 2's first */
var lc0=liveCards;liveCards=function(){return lc0().replace(/grades all four/g,"grades all five")};
function nextS2(){var L=S2.filter(function(x){return !st.hlo||HL[x[0]]}),N=window.__s2all?L:L.slice(0,8);
  return '<section class="pn"><div class="tabs"><button class="on">NEXT TRADES<span class="n">'+L.length+'</span></button><a class="tf" href="https://x.com/earningszn" target="_blank" rel="noopener"><span>Get the trades as they drop</span><i><svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z"/></svg>Follow</i></a></div>'+
   '<div class="flt"><button data-hlo="0" class="'+(st.hlo?'':'on')+'">All</button><button data-hlo="1" class="'+(st.hlo?'on':'')+'"><span class="hlp" style="margin:0 6px 0 0">HL</span>On Hyperliquid</button></div>'+
   '<div class="sb s2b"><b>SEASON 2</b><span>'+S2K.length+' AIs · times in '+TZ+'</span></div>'+
   '<div class="uz">Each AI files long or short 1 hour before the earnings report. The trade closes at the next market close after earnings.</div>'+
   N.map(function(x){return '<div class="ur">'+coIcon(x[0])+'<span class="um"><b class="cn">'+x[1]+hl(x[0])+'</b><small>'+x[0]+'</small></span><span class="ut"><small>'+(x[3]?'Confirmed':'Expected')+'</small><b>'+x[2]+'</b></span></div>'}).join("")+
   (L.length>8?'<button class="more" data-s2all>'+(window.__s2all?"SHOW LESS":"SHOW ALL "+L.length)+'</button>':'')+'</section>'}
upcoming=function(){return liveCards()+nextS2()+lastDay()};

document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-s2s],[data-s1c],[data-s2all]");if(!b)return;
  if(b.dataset.s2s)S2SEA=+b.dataset.s2s;if("s1c" in b.dataset)S1OPEN=!S1OPEN;if("s2all" in b.dataset)window.__s2all=!window.__s2all},true);
/* the live W/L centring measures the Last 5 column; where that column folds (320) the W/L stays where the table puts it */
var alignWL0=alignWL;alignWL=function(){if(innerWidth<=350){document.querySelectorAll('.s2hit .wlc span,.s2hit .wlh').forEach(function(e){e.style.transform=''});document.querySelectorAll('.lt:not(.s2hit)').length&&alignWL0();return}alignWL0()};
window.__s2=function(){return {TAKE:TAKE,S2K:S2K,S2R:S2R,T2:T2,S1C:S1C,S1REL:S1REL}};
/*}S2SITE*/
