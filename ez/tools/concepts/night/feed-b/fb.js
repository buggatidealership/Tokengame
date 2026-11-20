/*FEEDB{ FEED PRODUCT DESK B: the Season 2 Feed tab as it should ship, five production MOCKUPS (PM6 to PM10) of the same 15 real trades,
   injected by run.js into a copy of v53-terminal.html inside the page's own IIFE (just before its router line), so the live helpers
   (aiIcon, flag, money, esc, st, NAV, nbar, TZ) and the live tokens are reused. Never shipped: the live file is untouched.
   FBD (prepended by run.js): cos, items (every word verbatim from calls.csv, checked), day P&L, the illustrative arrival order, marks.
   ?pm=6  Compact tape: one row per trade, the side the biggest word, the key clause in one line; a row opens to the reason and our reading
   ?pm=7  Three columns: companies | the feed | the open post (reason, our reading, the AI's notes, what would prove it wrong); phone: a sheet
   ?pm=8  Report day, live: the lock countdown, five slots that fill as trades land, "not in yet" for the missing, the newest reason landing
   ?pm=9  Plain words first: our reading leads, numbered to the AI's own clauses it restates; desktop sets them side by side (parallel text)
   ?pm=10 Graded: the day's verdict, every post with its receipt (RIGHT/WRONG, P&L), filters All / Right / Wrong
   &s=pre|lock|wait|in|g  the state (the clock is set by run.js)   &co=INTU  one company   &open=GROK-INTU  the open post
   &sheet=1 (PM7 phone: the post as a sheet)   &src=1 (PM9: sources lit)   &first=ai (PM9: the AI's words first)   &f=right|wrong (PM10) */
var BQ=new URLSearchParams(location.search),PM=+(BQ.get("pm")||6),BS=BQ.get("s")||"in",BCO=BQ.get("co")||"",BOPEN=BQ.get("open")||"",
    BSH=BQ.get("sheet")==="1",BSRC=BQ.get("src")==="1",BAI=BQ.get("first")==="ai",BF=BQ.get("f")||"all",BG=BS==="g";
MODELS.GEMINI={name:"GEMINI",ver:"Gemini 4 Argon",app:"Gemini",c:"#7dd3fc",bg:"#000",fg:"#7dd3fc",d:FBD.marks.GEMINI.d};
MODELS.QWEN={name:"QWEN",ver:"Qwen4-Max",app:"Qwen",c:"#a78bfa",bg:"#000",fg:"#a78bfa",fr:FBD.marks.QWEN.fr,d:FBD.marks.QWEN.d};
LAB.GEMINI="Google";LAB.QWEN="Alibaba";FLAG.GEMINI="US";FLAG.QWEN="CN";APP.GEMINI="Gemini";APP.QWEN="Qwen";
/* the feed names the AIs as the Season 2 board and the calls log do (GPT, not the app's "ChatGPT") */
var NM={GPT:"GPT",CLAUDE:"Claude",GROK:"Grok",GEMINI:"Gemini",QWEN:"Qwen"};
NAV.splice(1,0,["feed","FEED",'<path d="M4 5.5h16v10.5H10l-4.5 3.5V16H4z"/><path d="M8 9.5h8M8 12.5h5"/>']);

var IT=FBD.items,CO={};FBD.cos.forEach(function(c){CO[c.t]=c});
function num(v){return String(+v)}
function sgn(v){return v<0?"−":"+"}
function pnl(v){return sgn(v)+"$"+Math.abs(v).toLocaleString("en-US")}
function pct(v){return sgn(v)+Math.abs(v).toFixed(2)+"%"}
function bco(c,px){return '<span class="bco" style="width:'+px+'px;height:'+px+'px"><img src="'+c.logo+'" alt=""></span>'}
function bside(x,big){return '<span class="bsd '+(x.side==="LONG"?"L":"S")+(big?" big":"")+'" data-slot="side" data-edge="r"><b>'+x.side+'</b> <span>('+(x.side==="LONG"?"+":"−")+num(x.size)+'%)</span></span>'}  /* "LONG (+4%)" */
function bconf(x,slot){return '<span class="bcf"'+(slot?' data-slot="conf"':'')+'>'+x.conf+'% confident</span>'}
var CK='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.2 6.4l2.4 2.4 5.2-5.6"/></svg>',XX='<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6"/></svg>';
function brc(x,slot){return '<span class="brc '+(x.right?"ok":"no")+'"'+(slot?' data-slot="rc" data-edge="r"':'')+'>'+(x.right?CK:XX)+'<b>'+(x.right?"RIGHT":"WRONG")+'</b><span>P&amp;L '+pnl(x.pnl)+'</span></span>'}
function bmove(c){return '<span class="bmv '+(c.move<0?"d":"u")+'">'+pct(c.move)+'</span>'}
function id(x){return x.k+"-"+x.t}
/* the reason with ranges marked: the key clause (mark) or the numbered sources (PM9); […] is a word hidden in the screenshot */
function ann(text,R){R=R.filter(function(r){return r.a>-1}).sort(function(a,b){return a.a-b.a});var o="",i=0;
  R.forEach(function(r){if(r.a<i)return;o+=esc(text.slice(i,r.a))+r.o+esc(text.slice(r.a,r.b))+r.c;i=r.b});o+=esc(text.slice(i));
  return o.replace("[…]",'<span class="bhid" title="A word is hidden in the screenshot">[…]</span>')}
function bq(x){var a=x.why.indexOf(x.hl);return ann(x.why,[{a:a,b:a+x.hl.length,o:'<mark class="hl">',c:'</mark>'}])}
function bqsrc(x,lit){return ann(x.why,x.srcs.map(function(s,i){var a=x.why.indexOf(s);return {a:a,b:a+s.length,o:'<span class="bsrc'+(lit?' lit':'')+'"><sup>'+(i+1)+'</sup>',c:'</span>'}}))}
function bkey(x){return '“'+esc(x.hl.replace(/\.$/,""))+'”'}
function bplain(x,sup){return x.plain.map(function(p){return esc(p[0])+(sup?'<sup class="bn">'+p[1].map(function(i){return i+1}).join(" ")+'</sup>':'')}).join(" ")}
function bplainBox(x){return '<div class="bpl"><small>In plain words <i>· our reading of '+NM[x.k]+', not its words</i></small><p>'+bplain(x)+'</p></div>'}
function bwho(x,px){return aiIcon(x.k,px||28)}
function nyt(iso){return new Date(iso).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit",timeZone:"America/New_York"})}
function lt(iso){return tm(new Date(iso))+" "+TZ}
function dur(ms){ms=Math.max(0,ms);var s=Math.floor(ms/1000),h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=s%60;return (h?h+":"+String(m).padStart(2,"0"):m)+":"+String(x).padStart(2,"0")}
var NOW=+new Date(),LOCK=Date.parse("2026-11-19T20:00:00Z"),REP=Date.parse("2026-11-19T21:05:00Z"),CLOSE=Date.parse("2026-11-20T21:00:00Z");
function byCo(t){return IT.filter(function(x){return x.t===t})}
function split(L){var l=L.filter(function(x){return x.side==="LONG"}).length;return {l:l,s:L.length-l}}
function cosShown(){return FBD.cos.filter(function(c){return !BCO||c.t===BCO})}
function kick(lab,right){return '<div class="kick"><small>'+lab+'</small><span>'+right+'</span></div>'}
function stateLine(){return BG?'Graded at the Nov 20 close':'In play · graded at the Nov 20 close, '+lt("2026-11-20T21:00:00Z")}
function coTabs(cnt,cls){return '<div class="tabs fb-scroll'+(cls?" "+cls:"")+'">'+[["","ALL"]].concat(FBD.cos.map(function(c){return [c.t,c.t]})).map(function(o){var n=o[0]?byCo(o[0]).length:IT.length;
  return '<button type="button" data-bco="'+o[0]+'" class="'+(BCO===o[0]?"on":"")+'">'+o[1]+(cnt?'<span class="n">'+(typeof cnt==="function"?cnt(o[0]):n)+'</span>':'')+'</button>'}).join("")+'</div>'}

/* =============== PM6 COMPACT: the tape. One row per trade, scanned like an order book; the side is the biggest word =============== */
function pm6(){var pre=BS==="pre",arrived=pre?["CLAUDE","GPT"]:FBD.arr;
  var grp=cosShown().map(function(c){var L=byCo(c.t),sp=split(L.filter(function(x){return arrived.indexOf(x.k)>-1}));
    var head='<div class="b6g" data-sib="b6g">'+bco(c,26)+'<span class="b6c" data-slot="co"><b>'+c.co+'</b> <span>'+c.t+'</span></span>'+
      '<span class="b6sp" data-slot="split"><i class="L">LONG '+sp.l+'</i><span class="b6bar"><span class="L" style="flex:'+sp.l+'"></span><span class="S" style="flex:'+sp.s+'"></span>'+(pre?'<span class="E" style="flex:'+(5-sp.l-sp.s)+'"></span>':'')+'</span><i class="S">'+sp.s+' SHORT</i></span>'+
      (BG?bmove(c):pre?'<span class="b6due">'+arrived.length+' of 5 in</span>':'')+'</div>';
    var rows=FBD.arr.map(function(k){var x=L.filter(function(y){return y.k===k})[0],op=BOPEN===id(x);
      if(arrived.indexOf(k)<0)return '<div class="b6r b6na" data-sib="b6r"><span class="b6m" data-slot="mark">'+bwho(x,26)+'</span><b class="b6n" data-slot="name">'+NM[k]+'</b><span class="b6q b6w">Not in yet · due by '+lt("2026-11-19T20:00:00Z")+'</span></div>';
      return '<div class="b6r'+(op?" op":"")+(BG?(x.right?" ok":" no"):"")+'" data-sib="b6r" data-call="'+id(x)+'"><button type="button" class="b6h" data-bopen="'+id(x)+'" aria-expanded="'+op+'">'+
        '<span class="b6m" data-slot="mark">'+bwho(x,26)+'</span><b class="b6n" data-slot="name">'+NM[k]+'</b>'+bconf(x,1)+bside(x)+
        '<span class="b6q" data-slot="key">'+bkey(x)+'</span>'+(BG?brc(x,1):'')+'<svg class="car b6cv" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>'+
        (op?'<div class="b6x"><p class="bq">'+bq(x)+'</p>'+bplainBox(x)+(x.wrong?'<div class="bwr"><small>What would prove it wrong · '+NM[x.k]+'’s words</small><p>'+esc(x.wrong)+'</p></div>':'')+'</div>':'')+'</div>'}).join("");
    return '<section class="pn b6">'+head+'<div class="b6hd" aria-hidden="true"><span></span><span>AI</span><span>CONFIDENCE</span><span>SIDE</span><span>THE KEY LINE</span>'+(BG?'<span>RESULT</span>':'')+'<span></span></div>'+rows+'</section>'}).join("");
  var top='<section class="pn b6t">'+coTabs(1)+'<div class="sub b6f"><button type="button" class="on">All</button><button type="button">LONG <b class="u">10</b></button><button type="button">SHORT <b class="d">5</b></button><span class="sep"></span><button type="button">Sort: Company</button><span class="b6k">J K to move · Enter to open</span></div>'+
    kick('FEED · SEASON 2',pre?'Report day · trades lock at '+lt("2026-11-19T20:00:00Z"):stateLine())+'</section>';
  return top+grp}

/* =============== PM7 THREE COLUMNS: pick a company, read the feed, open a post into its whole case =============== */
function b7co(c){var L=byCo(c.t),sp=split(L),on=(BCO||"INTU")===c.t,r=L.filter(function(x){return x.right}).length;
  var longs=L.filter(function(x){return x.side==="LONG"}),shorts=L.filter(function(x){return x.side==="SHORT"});
  return '<button type="button" class="b7c'+(on?" on":"")+'" data-sib="b7c" data-bco="'+c.t+'">'+bco(c,34)+'<span class="b7cn" data-slot="name"><b>'+c.co+'</b><small>'+c.t+' · trade '+c.n+'</small></span>'+
    (BG?'<span class="b7cm" data-slot="move" data-edge="r">'+bmove(c)+'<small>'+r+' of 5 right</small></span>':'')+
    '<span class="b7sp" data-slot="split"><span class="L">'+longs.map(function(x){return aiIcon(x.k,18)}).join("")+'</span><i>'+sp.l+' v '+sp.s+'</i><span class="S">'+shorts.map(function(x){return aiIcon(x.k,18)}).join("")+'</span></span></button>'}
function b7post(x,sel){var c=CO[x.t];
  return '<article class="b7p'+(sel?" sel":"")+(BG?(x.right?" ok":" no"):"")+'" data-sib="b7p" data-call="'+id(x)+'"><button type="button" class="b7ph" data-bopen="'+id(x)+'">'+
    '<span class="b7pt"><span data-slot="mark">'+bwho(x,34)+'</span><span class="b7pn" data-slot="name"><b>'+NM[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · Nov 19</small></span>'+(BG?brc(x,1):'')+'</span>'+
    '<span class="bq b7q">'+bq(x)+'</span>'+
    '<span class="b7tc">'+bco(c,30)+'<span class="b7tn" data-slot="co"><b>'+c.co+'</b> <span>'+c.t+'</span><small>'+bconf(x)+'</small></span>'+bside(x)+'</span></button></article>'}
function b7open(x){var c=CO[x.t];
  return '<div class="b7o" data-call="'+id(x)+'"><header class="b7oh">'+bwho(x,44)+'<span><b>'+NM[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · '+MODELS[x.k].ver+'</small></span>'+(BSH?'<button type="button" class="b7x" aria-label="Close">'+XX+'</button>':'')+'</header>'+
    '<div class="b7tk">'+bco(c,36)+'<span><b>'+c.co+'</b> <span class="mu">'+c.t+'</span><small>Filed Nov 19 · graded at the Nov 20 close</small></span></div>'+
    '<div class="b7hd">'+bside(x,1)+bconf(x)+'</div>'+(BG?'<div class="b7rc">'+brc(x)+'<span class="mu">'+c.co+' '+pct(c.move)+'</span></div>':'')+
    '<h4>Reason</h4><p class="bq">'+bq(x)+'</p>'+bplainBox(x)+
    (x.wrong?'<h4>What would prove it wrong</h4><p class="bvb">'+esc(x.wrong)+'</p>':'')+
    (x.notes?'<h4>From '+NM[x.k]+'’s notes</h4><p class="bvb bnt" data-clamp>'+esc(x.notes).replace(/\[cut off\]/g,'<span class="bhid">[cut off in the screenshot]</span>')+'</p>':'')+'</div>'}
function pm7(){var t=BCO||"INTU",L=byCo(t).slice().sort(function(a,b){return (a.side===b.side?0:a.side==="LONG"?-1:1)||b.conf-a.conf}),op=IT.filter(function(x){return id(x)===BOPEN})[0]||L[0];
  var left='<section class="pn b7l"><div class="tabs"><button class="on">COMPANIES</button><span class="lv-dt">Nov 19</span></div>'+FBD.cos.map(b7co).join("")+'</section>';
  var mid='<section class="pn b7m"><div class="tabs"><button class="on">FEED · '+t+'</button><span class="lv-dt">'+(BG?'Graded':'In play')+'</span></div>'+
    '<div class="b7chips fb-scroll">'+FBD.cos.map(function(c){return '<button type="button" data-bco="'+c.t+'" class="'+(c.t===t?"on":"")+'">'+bco(c,22)+c.t+'</button>'}).join("")+'</div>'+
    L.map(function(x){return b7post(x,id(x)===id(op))}).join("")+'</section>';
  var right='<section class="pn b7r">'+b7open(op)+'</section>';
  return '<div class="b7'+(BSH?" sheet":"")+'">'+left+mid+right+'</div>'}

/* =============== PM8 REPORT DAY: live. The lock countdown, five slots filling, the newest reason landing =============== */
function arrivedAt(st8){return st8==="pre"?{CLAUDE:"2026-11-19T19:09:00Z",GPT:"2026-11-19T19:20:30Z"}:{CLAUDE:"2026-11-19T19:09:00Z",GPT:"2026-11-19T19:20:30Z",QWEN:"2026-11-19T19:33:00Z",GEMINI:"2026-11-19T19:44:00Z",GROK:"2026-11-19T19:52:00Z"}}
function b8card(c,dense){var A=arrivedAt(BS),L=byCo(c.t),inn=FBD.arr.filter(function(k){return A[k]}),sp=split(L.filter(function(x){return A[x.k]}));
  var stp=BS==="pre"?'<span class="lv-st live"><i></i>LIVE</span>':BS==="lock"?'<span class="lv-st ip"><i></i>LOCKED</span>':'<span class="lv-st aw"><i></i>WAITING FOR THE CLOSE</span>';
  var big=BS==="pre"?['Trades lock in',dur(LOCK-NOW),'Report after the close, about '+lt("2026-11-19T21:05:00Z")]:BS==="lock"?['Report in about',dur(REP-NOW),'All five trades are in and locked']:['Graded at Friday’s close in',dur(CLOSE-NOW),c.co+' reported after Thursday’s close'];
  var slots='<div class="b8s">'+FBD.arr.map(function(k){var x=L.filter(function(y){return y.k===k})[0],on=!!A[k],nw=BS==="pre"&&k==="GPT";
    return '<div class="b8sl'+(on?" in":"")+(nw?" new":"")+'" data-sib="b8sl"><span data-slot="mark" data-edge="c">'+aiIcon(k,30)+'</span><b data-slot="name" data-edge="c">'+NM[k]+'</b>'+(on?'<span class="bsd '+(x.side==="LONG"?"L":"S")+'" data-slot="side" data-edge="c"><b>'+x.side+'</b></span>':'<span class="b8wt" data-slot="side" data-edge="c">Not in yet</span>')+'</div>'}).join("")+'</div>';
  var posts=inn.slice().reverse().map(function(k){var x=L.filter(function(y){return y.k===k})[0],nw=BS==="pre"&&k==="GPT",ago=Math.round((NOW-Date.parse(A[k]))/60000);
    var reason=nw?esc(x.why.slice(0,Math.round(x.why.length*.62)))+'<i class="b8cur" aria-hidden="true"></i>':bq(x);
    return '<article class="b8p'+(nw?" new":"")+'" data-sib="b8p"><div class="b8ph"><span data-slot="mark">'+bwho(x,30)+'</span><b data-slot="name">'+NM[k]+'</b>'+(nw?'<em class="b8j">JUST IN</em>':'<span class="b8a">'+(ago<1?"now":ago+" min ago")+'</span>')+bside(x)+'</div>'+
      '<p class="bq'+(dense?" b8d":"")+'">'+reason+'</p>'+(nw?'':'<div class="b8pf">'+bconf(x)+'</div>')+'</article>'}).join("");
  var wait=FBD.arr.filter(function(k){return !A[k]}).map(function(k){return '<div class="b8na" data-sib="b8na"><span data-slot="mark">'+aiIcon(k,30)+'</span><b data-slot="name">'+NM[k]+'</b><span class="b8sk"><i></i><i></i></span><span class="b8wt">due by '+lt("2026-11-19T20:00:00Z")+'</span></div>'}).join("");
  return '<section class="pn b8c" data-sib="b8c"><div class="b8h">'+bco(c,40)+'<span class="b8hn" data-slot="co"><b>'+c.co+'</b> <span class="mu">'+c.t+'</span><small>Trade '+c.n+' · Thu Nov 19</small></span>'+stp+'</div>'+
    '<div class="b8cd"><small>'+big[0]+'</small><b>'+big[1]+'</b><span>'+big[2]+'</span></div>'+
    '<div class="b8in"><span><b>'+inn.length+' of 5</b> in</span><span class="b6sp"><i class="L">LONG '+sp.l+'</i><span class="b6bar"><span class="L" style="flex:'+sp.l+'"></span><span class="S" style="flex:'+sp.s+'"></span><span class="E" style="flex:'+(5-sp.l-sp.s)+'"></span></span><i class="S">'+sp.s+' SHORT</i></span></div>'+
    slots+'<div class="b8ps">'+posts+wait+'</div></section>'}
function pm8(){var all=innerWidth>=980,t=BCO||"INTU";
  var bar='<section class="pn b8t"><div class="tabs fb-scroll">'+FBD.cos.map(function(c){var A=arrivedAt(BS),n=byCo(c.t).filter(function(x){return A[x.k]}).length;return '<button type="button" data-bco="'+c.t+'" class="'+(c.t===t?"on":"")+'">'+c.t+'<span class="n">'+n+'/5</span></button>'}).join("")+
    '<a class="tf" href="https://x.com/earningszn" target="_blank" rel="noopener"><span>Each trade as it lands</span><i><svg viewBox="0 0 24 24"><path fill="currentColor" d="M17.8 3h3.1l-6.8 7.8 8 10.2h-6.3l-4.9-6.4L5.3 21H2.2l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3zm-1.1 16.2h1.7L7.3 4.7H5.5l11.2 14.5z"/></svg>Follow</i></a></div>'+
    kick('REPORT DAY · THU NOV 19',BS==="wait"?'3 reports in · graded at Friday’s close':'3 reports after the close · trades lock at '+lt("2026-11-19T20:00:00Z"))+'</section>';
  return bar+(all?'<div class="b8g">'+FBD.cos.map(function(c){return b8card(c,1)}).join("")+'</div>':b8card(CO[t]))}

/* =============== PM9 PLAIN WORDS FIRST: our reading leads, every line numbered to the clause it restates =============== */
function b9post(x){var c=CO[x.t],op=BOPEN===id(x),lit=op&&BSRC;
  var read='<div class="b9r" data-slot="read"><small class="b9lab">'+(BAI?'In plain words · our reading of '+NM[x.k]:'Our reading of '+NM[x.k])+'</small><p class="b9big'+(BAI?" sm":"")+'">'+bplain(x,1)+'</p></div>';
  var own='<div class="b9w" data-slot="own"><small class="b9lab w">'+NM[x.k]+'’s own words</small><p class="bq'+(BAI?" b9lg":"")+(op||innerWidth>=980||BAI?"":" b9cl")+'"'+(op||innerWidth>=980||BAI?'':' data-clamp')+'>'+bqsrc(x,lit)+'</p>'+
    (innerWidth<980&&!BAI?'<button type="button" class="b9more" data-bopen="'+id(x)+'" aria-expanded="'+op+'">'+(op?'Hide':'Read')+' '+NM[x.k]+'’s words in full</button>':'')+'</div>';
  return '<article class="pn b9p'+(op?" op":"")+'" data-sib="b9p" data-call="'+id(x)+'"><header class="b9h"><span data-slot="mark">'+bwho(x,32)+'</span><span class="b9n" data-slot="name"><b>'+NM[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · Nov 19</small></span></header>'+
    '<div class="b9body">'+(BAI?own+read:read+own)+'</div>'+
    '<div class="b9tc">'+bco(c,30)+'<span class="b9tn"><b>'+c.co+'</b> <span>'+c.t+'</span><small>'+bconf(x)+'</small></span>'+bside(x)+'</div></article>'}
function pm9(){var t=BCO||"INTU",L=byCo(t);
  var top='<section class="pn b9t"><div class="tabs fb-scroll">'+FBD.cos.map(function(c){return '<button type="button" data-bco="'+c.t+'" class="'+(c.t===t?"on":"")+'">'+c.t+'</button>'}).join("")+'</div>'+
    '<div class="b9tg"><button type="button" class="'+(BAI?"":"on")+'">Plain words first</button><button type="button" class="'+(BAI?"on":"")+'">AI’s words first</button></div>'+
    '<p class="b9note">Our reading restates only what each AI wrote. Each sentence carries the number of the words it comes from.</p></section>';
  return top+L.map(b9post).join("")}

/* =============== PM10 GRADED: the day's verdict, then every post with its receipt =============== */
function pm10(){var R=IT.filter(function(x){return x.right}),Wr=IT.filter(function(x){return !x.right}),dk=FBD.arr.slice().sort(function(a,b){return FBD.day[b]-FBD.day[a]});
  var ver='<section class="pn b10v"><div class="kick"><small>FRIDAY NOV 20 · CLOSE</small><span>3 trades graded</span></div>'+
    '<h3 class="b10hl"><span class="d">All 5 shorts right.</span> All 10 longs wrong.</h3>'+
    '<div class="b10m">'+FBD.cos.map(function(c){var r=byCo(c.t).filter(function(x){return x.right});return '<div class="b10mc" data-sib="b10mc">'+bco(c,30)+'<span data-slot="co"><b>'+c.co+'</b><small>'+r.length+' of 5 right</small></span>'+bmove(c)+'</div>'}).join("")+'</div>'+
    '<div class="b10b"><small>P&amp;L today · $100K a trade</small>'+dk.map(function(k,i){var v=FBD.day[k];return '<div class="b10br" data-sib="b10br"><span class="no" data-slot="rk">'+(i+1)+'</span><span data-slot="mark">'+aiIcon(k,24)+'</span><b data-slot="name">'+NM[k]+'</b><span class="b10bw"><i class="'+(v<0?"d":"u")+'" style="width:'+(Math.abs(v)/22060*100).toFixed(1)+'%"></i></span><span class="pl '+(v<0?"d":"u")+'" data-slot="pl" data-edge="r">'+pnl(v)+'</span></div>'}).join("")+'</div>'+
    '<p class="b10n">One day, three stocks, all down: every short was right. Fifteen trades are too few to judge skill.</p></section>';
  var L=IT.filter(function(x){return (BF==="all"||(BF==="right")===x.right)&&(!BCO||x.t===BCO)}).sort(function(a,b){return (b.right-a.right)||(Math.abs(b.pnl)-Math.abs(a.pnl))});
  var tabs='<section class="pn b10f"><div class="tabs">'+[["all","ALL",IT.length],["right","RIGHT",R.length],["wrong","WRONG",Wr.length]].map(function(o){return '<button type="button" data-bf="'+o[0]+'" class="'+(BF===o[0]?"on":"")+'">'+o[1]+'<span class="n'+(o[0]==="wrong"?" nd":"")+'">'+o[2]+'</span></button>'}).join("")+'</div>'+
    '<div class="sub fb-scroll">'+[["","All companies"]].concat(FBD.cos.map(function(c){return [c.t,c.co]})).map(function(o){return '<button type="button" data-bco="'+o[0]+'" class="'+(BCO===o[0]?"on":"")+'">'+o[1]+'</button>'}).join("")+'</div></section>';
  var posts=L.map(function(x){var c=CO[x.t];return '<article class="pn b10p '+(x.right?"ok":"no")+'" data-sib="b10p" data-call="'+id(x)+'"><div class="b10rc">'+brc(x,1)+'<span class="b10mv" data-slot="mv" data-edge="r">'+c.co+' '+bmove(c)+'</span></div>'+
    '<header class="b10h"><span data-slot="mark">'+bwho(x,32)+'</span><span class="b10n" data-slot="name"><b>'+NM[x.k]+'</b><small>'+flag(FLAG[x.k])+' '+LAB[x.k]+' · filed Nov 19</small></span></header>'+
    '<p class="bq">'+bq(x)+'</p><div class="b10tc">'+bco(c,30)+'<span class="b10tn"><b>'+c.co+'</b> <span>'+c.t+'</span><small>'+bconf(x)+'</small></span>'+bside(x)+'</div></article>'}).join("");
  return '<div class="b10"><div class="b10l">'+ver+'</div><div class="b10rt">'+tabs+'<div class="b10ps">'+posts+'</div></div></div>'}

function fbHTML(){return '<div class="fbv pm'+PM+' s-'+BS+'">'+({6:pm6,7:pm7,8:pm8,9:pm9,10:pm10}[PM]||pm6)()+'</div>'}
var drawB0=draw,bFirst=true;
draw=function(){if(bFirst){bFirst=false;var h=(location.hash||"").slice(1);if(!h||h==="feed")st.v="feed"}
  if(st.v!=="feed")return drawB0();
  document.getElementById("main").innerHTML=fbHTML();nbar();
  document.getElementById("nav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'"><svg viewBox="0 0 24 24">'+n[2]+'</svg>'+n[1]+'</button>'}).join("");
  document.getElementById("dnav").innerHTML=NAV.map(function(n){return '<button data-go="'+n[0]+'" class="'+(st.v===n[0]?"on":"")+'">'+n[1]+'</button>'}).join("")};
/* capture phase: the page's own click handler redraws after every button, so the state changes first */
document.addEventListener("click",function(e){var b=e.target.closest&&e.target.closest("[data-bopen],[data-bco],[data-bf],.b7x");if(!b)return;
  if(b.dataset.bopen){var k=b.dataset.bopen;if(PM===7){BOPEN=k;BSH=innerWidth<980}else BOPEN=BOPEN===k?"":k}
  if("bco" in b.dataset)BCO=b.dataset.bco;if(b.dataset.bf)BF=b.dataset.bf;if(b.classList.contains("b7x"))BSH=false;
  setTimeout(function(){if(st.v==="feed"){document.getElementById("main").innerHTML=fbHTML()}},0)},true);
/*}FEEDB*/
