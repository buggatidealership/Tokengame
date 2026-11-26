/*FEED{ The Season 2 FEED: four MOCKUP layouts of the same 15 real trades, injected by run.js into a copy of v53-terminal.html
   (inside the page's own IIFE, just before its router line), so it reuses the live helpers (aiIcon, flag, money, esc, st, NAV, nbar)
   and the live tokens. Never shipped: the live file is untouched. FEEDD (prepended by run.js) holds the trades read from
   data/s2-calls/calls.csv, the editorial table words.json and the preview moves in dopa/data/close-2026-11-20.json.
   ?f=1 the room (chat: longs left, shorts right)   ?f=2 one card per company   ?f=3 posts   ?f=4 the tape (rows that open)
   &g=1 after grading (PREVIEW moves)   &open=GROK-INTU,...  rows open on F4   &teaser=T1|T2 one card for the X image */
var FQ=new URLSearchParams(location.search),FL=+(FQ.get("f")||1),FG=FQ.get("g")==="1",FT=FQ.get("teaser")||"",FOPEN=(FQ.get("open")||"GROK-INTU").split(",");
/* the two new AIs: marks from tools/concepts/dopa/models5.json, coloured as the Season 2 mockups (Gemini sky blue, Qwen violet) */
MODELS.GEMINI={name:"GEMINI",app:"Gemini",c:"#7dd3fc",bg:"#000",fg:"#7dd3fc",d:FEEDD.marks.GEMINI.d};
MODELS.QWEN={name:"QWEN",app:"Qwen",c:"#a78bfa",bg:"#000",fg:"#a78bfa",fr:FEEDD.marks.QWEN.fr,d:FEEDD.marks.QWEN.d};
LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN";APP.GEMINI="Gemini";APP.QWEN="Qwen";
NAV.splice(1,0,["feed","FEED",'<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>']);

function fnum(v){return String(+v)}                          /* 4.0 -> 4, 4.5 -> 4.5 (as the sheet shows them) */
function fco(c,px){return '<span class="fco" style="width:'+px+'px;height:'+px+'px"><img src="'+c.logo+'" alt=""></span>'}
function fcoN(c){return '<span class="fcn"><b>'+c.co+'</b> <span>'+c.ticker+'</span></span>'}
function fside(x,cls){return '<span class="fsd '+(x.side==="LONG"?"L":"S")+(cls?" "+cls:"")+'"><b>'+x.side+'</b> <span class="fmv">('+(x.side==="LONG"?"+":"\u2212")+fnum(x.move)+'%)</span></span>'}   /* owner, 2026-11-20: "LONG (+4%)", the side with its called move in brackets */
function fconf(x){return '<span class="fcf">'+x.conf+'% confident</span>'}
function fq(x,only){var k=x.keep,h=x.hl,i=k.indexOf(h);if(only)return '<span class="hlk">'+esc(h)+'</span>';   /* the tape's one-line form: the key clause alone, quoted, under a gold rule (a marker on every row reads as a wall) */
  return esc(k.slice(0,i))+'<mark class="hl">'+esc(h)+'</mark>'+esc(k.slice(i+h.length))}
function fplain(x,cls){return x.plain?'<div class="fpl'+(cls?" "+cls:"")+'"><small>In plain words <i>· our reading, not '+APP[x.k]+'’s words</i></small><p>'+esc(x.plain)+'</p></div>':''}
var FCK='<svg viewBox="0 0 12 12"><path d="M2.2 6.4l2.4 2.4 5.2-5.6"/></svg>',FX='<svg viewBox="0 0 12 12"><path d="M3 3l6 6M9 3l-6 6"/></svg>';
function frc(x,cls){if(!FG)return "";return '<span class="frc '+(x.right?"ok":"no")+(cls?" "+cls:"")+'">'+(x.right?FCK:FX)+'<b>P&amp;L '+money(x.pnl,true)+'</b></span>'}
function fmove(c){return FG?'<span class="fmo '+(c.move<0?"d":"u")+'">'+c.ticker+' '+c.pct+'</span><em class="fpt">PREVIEW</em>':''}
function fdata(x){return ' data-call="'+x.k+'-'+x.t+'"'}
var FONLY=FQ.get("only"),FCO=FEEDD.cos.filter(function(c){return !FONLY||c.ticker===FONLY}),FIT=FEEDD.items.filter(function(x){return !FONLY||x.t===FONLY});   /* &only=INTU narrows to one company (the receipt board) */               /* companies newest first (ESTC, KEYS, INTU); items newest first */
function fby(t){return FIT.filter(function(x){return x.t===t})}

/* the header every layout shares: what this is, in the terminal's own kick line */
function fhead(){return '<section class="pn fdh"><div class="kick"><small>FEED</small><span>'+(FG?'Graded · PREVIEW':'In play · grades at the Nov 20 close')+'</span></div>'+
  '<p class="fdl">Every trade with the AI’s own reason, posted with the trade. $100K a trade.</p>'+
  (FG?'<p class="fpv"><em class="fpt">PREVIEW</em> Moves from pre-market prices at 7:26 AM ET Nov 20, not the close</p>':'')+'</section>'}

/* F1 the room: one chat per company, each AI says its reason; longs sit left, shorts right, so the split is the layout */
function f1room(c,only){var A=fby(c.ticker),L=only?only.map(function(k){return A.filter(function(x){return x.k===k})[0]}):A,nL=A.filter(function(x){return x.side==="LONG"}).length;
  var ms=L.map(function(x){var s=x.side==="LONG"?"L":"S";
    return '<div class="f1m '+s+'"'+fdata(x)+'>'+aiIcon(x.k,34)+'<div class="f1b"><div class="f1w"><b class="fnm">'+APP[x.k]+'</b>'+fside(x)+'</div>'+
      '<p class="fq">'+fq(x)+'</p><div class="f1f">'+fconf(x)+frc(x)+'</div></div></div>'+
      (x.plain?'<div class="f1m E '+s+'"><span class="f1ez">EZ</span><div class="f1b">'+fplain(x,"f1p")+'</div></div>':'')}).join("");
  return '<section class="pn f1"><header class="f1h">'+fco(c,34)+'<div>'+fcoN(c)+'<small>Nov 19 · trade '+c.n+'</small></div>'+(FG?'<div class="f2v">'+fmove(c)+'</div>':'')+'</header>'+
    '<div class="f1s"><span class="L">LONG '+nL+'</span><span class="S">'+(A.length-nL)+' SHORT</span></div><div class="f1ms">'+ms+'</div></section>'}
function F1(){return '<div class="f1g">'+FCO.map(function(c){return f1room(c)}).join("")+'</div>'}

/* the split: who is LONG and who is SHORT, as a bar of marks (F2's card head and F3's rail use the same component) */
function fsplit(L,px){var lo=L.filter(function(x){return x.side==="LONG"}),sh=L.filter(function(x){return x.side==="SHORT"}),ic=function(x){return aiIcon(x.k,px||20)};
  return '<div class="fsp"><div class="L" style="flex:'+lo.length+' 1 auto"><b>LONG</b>'+lo.map(ic).join("")+'</div><div class="S" style="flex:'+sh.length+' 1 auto">'+sh.map(ic).join("")+'<b>SHORT</b></div></div>'}

/* F2 one card per company: the split as a bar of marks, then the five AIs (longs first, most confident first) */
function F2(){return FCO.map(function(c){var L=fby(c.ticker).slice().sort(function(a,b){return (a.side===b.side?0:a.side==="LONG"?-1:1)||(b.conf-a.conf)});
  var rows=L.map(function(x){return '<article class="f2r"'+fdata(x)+'><div class="f2t">'+aiIcon(x.k,28)+'<b class="fnm">'+APP[x.k]+'</b>'+fside(x)+'</div>'+
    '<div class="f2c"><span class="f2m"><i style="width:'+x.conf+'%"></i></span>'+fconf(x)+'</div><p class="fq">'+fq(x)+'</p>'+fplain(x,"f2pi")+(FG?'<div class="f2g">'+frc(x)+'</div>':'')+'</article>'}).join("");
  /* on desktop our plain words leave the column and run under the five, so one long gloss does not stretch every column */
  var pw=L.filter(function(x){return x.plain}).map(function(x){return fplain(x,"f2pw")}).join("");
  return '<section class="pn f2"><header class="f2h">'+fco(c,44)+'<div class="f2n">'+fcoN(c)+'<small>Nov 19 · trade '+c.n+'</small></div>'+(FG?'<div class="f2v">'+fmove(c)+'</div>':'')+'</header>'+fsplit(L)+'<div class="f2rs">'+rows+'</div>'+(pw?'<div class="f2pd">'+pw+'</div>':'')+'</section>'}).join("")}

/* F3 posts: each trade a post by its AI, the reason as the post, the trade attached like a link card; the receipt lands on it */
function f3post(x){var c=FCO.filter(function(o){return o.ticker===x.t})[0];
  return '<article class="pn f3"'+fdata(x)+'><header class="f3h">'+aiIcon(x.k,40)+'<div><b class="fnm">'+APP[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · Nov 19</small></div></header>'+
    '<p class="fq f3q">'+fq(x)+'</p>'+fplain(x,"f3p")+
    '<div class="f3c">'+fco(c,36)+'<div class="f3n">'+fcoN(c)+'<small>'+fconf(x)+'</small></div>'+fside(x,"f3cs")+'</div>'+
    (FG?'<div class="f3r">'+fmove(c)+frc(x)+'</div>':'')+'</article>'}
function F3(){var rail='<aside class="pn f3a"><div class="kick"><small>WHO IS ON WHICH SIDE</small></div>'+FCO.map(function(c){
    return '<div class="f3ar"><div class="f3at">'+fco(c,26)+fcoN(c)+'<span class="f3am">'+fmove(c)+'</span></div>'+fsplit(fby(c.ticker))+'</div>'}).join("")+'</aside>';
  return '<div class="f3g"><div class="f3col">'+FIT.map(f3post).join("")+'</div>'+rail+'</div>'}

/* F4 the tape: one row per trade, the key clause as its line; a row opens to the whole reason (and our plain words) */
function F4(){var hd='<div class="f4hd"><span></span><span>AI</span><span>COMPANY</span><span>SIDE</span><span>CONFIDENCE</span><span>THE KEY LINE</span>'+(FG?'<span>P&amp;L <em class="fpt">PREVIEW</em></span>':'')+'<span></span></div>';
  return '<section class="pn f4'+(FG?' fg':'')+'">'+hd+FIT.map(function(x){var c=FCO.filter(function(o){return o.ticker===x.t})[0],op=FOPEN.indexOf(x.k+'-'+x.t)>-1;
    return '<div class="f4r'+(op?" op":"")+'"'+fdata(x)+'><button class="f4h" aria-expanded="'+op+'">'+aiIcon(x.k,26)+'<b class="fnm">'+APP[x.k]+'</b>'+
      '<span class="f4co">'+fco(c,20)+fcoN(c)+'</span>'+fside(x,"f4sd")+'<span class="f4cf">'+fconf(x)+'</span>'+
      '<p class="fq f4k">'+fq(x,!op)+'</p>'+(FG?'<span class="f4pl">'+frc(x)+'</span>':'')+
      '<svg class="car f4cv" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg></button>'+
      (x.plain?'<div class="f4x">'+fplain(x)+'</div>':'')+'</div>'}).join("")+'</section>'}

function feedHTML(){if(FT==="T1"){var x=FIT.filter(function(i){return i.k==="CLAUDE"&&i.t==="INTU"})[0];return '<div class="fts">'+f3post(x)+'</div>'}
  if(FT==="T2")return '<div class="fts">'+f1room(FCO.filter(function(c){return c.ticker==="INTU"})[0],["QWEN","GROK"],1)+'</div>';
  return fhead()+[F1,F2,F3,F4][FL-1]()}
var draw0=draw,fFirst=true;
draw=function(){if(fFirst){fFirst=false;var h=(location.hash||"").slice(1);if(!h||h==="feed")st.v="feed"}
  if(st.v!=="feed")return draw0();
  document.getElementById("main").innerHTML=feedHTML();nbar();
  document.getElementById("nav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'"><svg viewBox="0 0 24 24">'+n[2]+'</svg>'+n[1]+'</button>'}).join("");
  document.getElementById("dnav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'">'+n[1]+'</button>'}).join("");
  document.documentElement.classList.toggle("fteaser",!!FT)};
/* capture phase: the page's own click handler redraws after every button, so the open set changes first */
document.addEventListener("click",function(e){var b=e.target.closest(".f4h");if(!b)return;var k=b.closest(".f4r").getAttribute("data-call"),i=FOPEN.indexOf(k);if(i>-1)FOPEN.splice(i,1);else FOPEN.push(k)},true);
/*}FEED*/
