/* EZ story pages (v25 Quiet, v26 Round, v27 Board): small shared helpers on top of ez-data.js.
   Every number comes from ez-data.js. Nothing is typed by hand here. */
var EZS=(function(){
  var STAKE=100000;
  var NAMES={GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"};
  function nm(m){return NAMES[m]||m}
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  /* "Nike (NKE)"; the name alone when the ticker is the name (RPM, Kioxia) */
  function co(r){var t=String(r.ticker||"");return r.co+(t&&String(r.co).toUpperCase()!==t.toUpperCase()?" ("+t+")":"")}
  function date(d){return fmtDate(d)}
  /* if you had followed each AI: the stake all in on every call, buy on up, short on down, compounding. Before fees. */
  var active=MODEL_KEYS.filter(function(m){return MODELS[m]&&(ROUNDS.some(function(r){return callOf(r,m)})||PENDING.some(function(u){return u.calls.some(function(c){return c.m===m})}))});
  var follow=active.map(function(m){var bal=STAKE,n=0,path=[STAKE];
    ROUNDS.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;bal*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;path.push(bal)});
    return {m:m,bal:bal,n:n,path:path}}).filter(function(o){return o.n}).sort(function(a,b){return b.bal-a.bal});
  function usd(v){return "$"+Math.round(v).toLocaleString("en-US")}
  function pct(b){var p=(b/STAKE-1)*100;return (p>=0?"+":"−")+Math.abs(p).toFixed(1)+"%"}
  /* standings with hit counts as numbers */
  var board=LADDER.map(function(L){var p=L.dir.split("/").map(function(x){return +x.trim()});return {m:L.m,won:L.won,right:p[0],n:p[1],avg:L.avg}});
  var last=ROUNDS[ROUNDS.length-1]||null;
  var live=PENDING[0]||null;
  var next=UPCOMING[0]||null;
  var total=ROUNDS.length+PENDING.length+UPCOMING.length;
  var pot=Math.round((SIM.poolShare!=null?SIM.poolShare:.69)*100);
  /* a call as "▼ 3%" */
  function arrow(dirTxt){return /^DOWN/i.test(dirTxt)?"▼":"▲"}
  function callTxt(c){var d=c[1].split(" ");return arrow(d[0])+" "+d[1]}
  function liveTxt(c){return arrow(c.dir)+" "+c.mag+"%"}
  function outTxt(r){return (r.a<0?"▼ ":"▲ ")+Math.abs(r.a)+"%"}
  /* the call that came closest in a graded round, among the right-direction calls */
  function winners(r){return r.win?r.win.split(" & "):[]}
  return {STAKE:STAKE,nm:nm,esc:esc,co:co,date:date,follow:follow,usd:usd,pct:pct,board:board,last:last,live:live,next:next,total:total,
    graded:ROUNDS.length,pot:pot,ops:100-pot,lev:SIM.leverage,callTxt:callTxt,liveTxt:liveTxt,outTxt:outTxt,winners:winners,logo:logo,coMark:coMark};
})();

/* ---------- conversion pages (v28 Race, v29 Your call, v30 Receipts): more shared helpers ---------- */
(function(S){
  /* the race: what $STAKE would be after each round if you copied each AI (index 0 = before round 1). A model that joined
     later starts at the stake on the round before its first call. "Always up" is the benchmark: long every stock, every round. */
  var R=ROUNDS;
  S.rounds=R.map(function(r){return {n:r.n,co:r.co,ticker:r.ticker}});
  S.first={};
  S.series=S.board.map(function(b){var pts=[],bal=S.STAKE,started=false;
    R.forEach(function(r,i){var c=callOf(r,b.m);if(!c)return;if(!started){pts.push([i,bal]);started=true;S.first[b.m]=r.n}
      bal*=1+(/^DOWN/.test(c[1])?-1:1)*r.a/100;pts.push([i+1,bal])});
    return {m:b.m,pts:pts,bal:bal}}).sort(function(a,b){return b.bal-a.bal});
  var ub=S.STAKE,up=[[0,ub]];R.forEach(function(r,i){ub*=1+r.a/100;up.push([i+1,ub])});
  S.always={pts:up,bal:ub};
  S.upRounds=R.filter(function(r){return r.a>0}).length;
  S.callsFiled=R.reduce(function(s,r){return s+r.calls.length},0)+PENDING.reduce(function(s,p){return s+p.calls.length},0);
  S.noWinner=R.filter(function(r){return !r.win}).length;
  S.upcoming=function(k){return UPCOMING.slice(0,k)};
  /* the market close for a ticker on an M/D/YY date, as a UTC Date. The grade is the first close of the stock's own exchange.
     New York 16:00 (US daylight time until the first Sunday of November), Taipei 13:30, Tokyo and Seoul 15:30,
     London 16:30, Frankfurt, Zurich and Amsterdam 17:30 (EU summer time until the last Sunday of October). */
  var EXCH={TW:["tw"],T:["jp"],KS:["kr"],L:["uk"],DE:["eu"],SW:["eu"],AS:["eu"]};
  var NAMED={KIOXIA:"jp",NINTENDO:"jp",SOFTBANK:"jp",BMW:"eu",DHL:"eu"};
  function usDst(y,mo,da){if(mo<3||mo>11)return false;if(mo>3&&mo<11)return true;var f=new Date(Date.UTC(y,mo-1,1)).getUTCDay();
    if(mo===3){var s=1+((7-f)%7)+7;return da>=s}var e=1+((7-f)%7);return da<e}
  function euDst(y,mo,da){if(mo<3||mo>10)return false;if(mo>3&&mo<10)return true;var l=new Date(Date.UTC(y,mo,0)),last=l.getUTCDate()-l.getUTCDay();return mo===3?da>=last:da<last}
  S.exch=function(t){t=String(t||"").toUpperCase();if(NAMED[t])return NAMED[t];var m=t.match(/\.([A-Z]+)$/);return m&&EXCH[m[1]]?EXCH[m[1]][0]:"us"};
  S.closeAt=function(d,t){var m=String(d).match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var y=2000+(+m[3]),mo=+m[1],da=+m[2],x=S.exch(t),h,mi=0;
    if(x==="tw"){h=5;mi=30}else if(x==="jp"||x==="kr"){h=6;mi=30}else if(x==="uk"){h=euDst(y,mo,da)?15:16;mi=30}else if(x==="eu"){h=euDst(y,mo,da)?15:16;mi=30}
    else h=usDst(y,mo,da)?20:21;
    return new Date(Date.UTC(y,mo-1,da,h,mi,0))};
  S.left=function(t){var ms=t-Date.now();if(ms<=0)return null;var h=Math.floor(ms/36e5),mi=Math.floor(ms%36e5/6e4);
    return h>=48?Math.floor(h/24)+" days":h>=1?h+"h "+mi+"m":mi+"m"};
  /* X: the follow link (CONFIG.x) and prefilled posts */
  S.xUrl=CONFIG.x||"";
  S.post=function(text,url){return "https://x.com/intent/post?text="+encodeURIComponent(text)+(url?"&url="+encodeURIComponent(url):"")};
  /* what changed since this browser was last here (kept only in this browser) */
  S.since=function(key){var now={g:ROUNDS.length,lead:S.board[0].m,t:Date.now()},prev=null;
    try{prev=JSON.parse(localStorage.getItem(key)||"null");localStorage.setItem(key,JSON.stringify(now))}catch(e){}
    if(!prev||prev.g>=now.g)return null;
    return {graded:R.slice(prev.g),leadChanged:prev.lead!==now.lead}};
  S.store={get:function(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}},
    set:function(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

  /* the race chart: thin grey lines, the leader in the accent, "always up" dashed, end labels that never collide,
     a crosshair + tooltip on hover/touch. Colours come from the page's CSS variables (--ink, --ink2, --line, --hi). */
  S.mountRace=function(el,o){o=o||{};var W=el.clientWidth||600,H=o.h||(W<520?250:300),padL=6,padR=W<520?92:112,padT=14,padB=26;
    var all=[].concat.apply([],S.series.map(function(s){return s.pts.map(function(p){return p[1]})})).concat(S.always.pts.map(function(p){return p[1]}));
    var lo=Math.min.apply(null,all),hi=Math.max.apply(null,all),pad=(hi-lo)*.08;lo-=pad;hi+=pad;
    var N=R.length,X=function(i){return padL+(W-padL-padR)*i/N},Y=function(v){return padT+(H-padT-padB)*(1-(v-lo)/(hi-lo))};
    var d=function(pts){return pts.map(function(p,k){return (k?"L":"M")+X(p[0]).toFixed(1)+","+Y(p[1]).toFixed(1)}).join("")};
    var lead=S.series[0].m,lines=[];
    var svg='<svg viewBox="0 0 '+W+' '+H+'" width="100%" height="'+H+'" role="img" aria-label="'+S.esc(o.label||"")+'" style="display:block;overflow:visible">';
    svg+='<line x1="'+padL+'" x2="'+(W-padR)+'" y1="'+Y(S.STAKE)+'" y2="'+Y(S.STAKE)+'" stroke="var(--line)" stroke-width="1"/>';
    if(W>=520)svg+='<text x="'+padL+'" y="'+(Y(S.STAKE)+14)+'" fill="var(--ink2)" font-size="11" font-family="var(--fb)">Start '+S.usd(S.STAKE)+'</text>';
    svg+='<path d="'+d(S.always.pts)+'" fill="none" stroke="var(--ink2)" stroke-width="1.5" stroke-dasharray="4 4"/>';
    S.series.slice().reverse().forEach(function(s){var L=s.m===lead;
      svg+='<path d="'+d(s.pts)+'" fill="none" stroke="'+(L?'var(--hi)':'var(--ink2)')+'" stroke-opacity="'+(L?1:.55)+'" stroke-width="'+(L?3:1.6)+'" stroke-linejoin="round" stroke-linecap="round"/>';
      var e=s.pts[s.pts.length-1];svg+='<circle cx="'+X(e[0])+'" cy="'+Y(e[1])+'" r="'+(L?5:3.5)+'" fill="'+(L?'var(--hi)':'var(--ink2)')+'" stroke="var(--bg)" stroke-width="2"/>'});
    /* end labels, pushed apart so they never overlap */
    var labs=S.series.map(function(s){return {m:s.m,y:Y(s.bal),v:s.bal,L:s.m===lead}}).concat([{m:"UP",y:Y(S.always.bal),v:S.always.bal}]).sort(function(a,b){return a.y-b.y});
    for(var i=1;i<labs.length;i++)if(labs[i].y-labs[i-1].y<36)labs[i].y=labs[i-1].y+36;
    var ov=labs[labs.length-1].y-(H-padB);if(ov>0)labs.forEach(function(l){l.y-=ov});
    var lab='';labs.forEach(function(l){var nm=l.m==="UP"?"Always up":S.nm(l.m);
      lab+='<div class="rc-l'+(l.L?' rc-lead':'')+(l.m==="UP"?' rc-up':'')+'" style="top:'+(l.y-10)+'px"><b>'+nm+'</b><span>'+S.usd(l.v)+'</span></div>'});
    var ticks='';[1,Math.ceil(N/2),N].forEach(function(n){ticks+='<text x="'+X(n)+'" y="'+(H-6)+'" fill="var(--ink2)" font-size="11" font-family="var(--fb)" text-anchor="middle">R'+R[n-1].n+'</text>'});
    svg+=ticks+'<line class="rc-x" x1="0" x2="0" y1="'+padT+'" y2="'+(H-padB)+'" stroke="var(--ink)" stroke-width="1" opacity="0"/></svg>';
    el.style.position="relative";el.innerHTML=svg+'<div class="rc-labs" style="position:absolute;left:'+(W-padR+10)+'px;top:0;right:0">'+lab+'</div><div class="rc-tip" hidden></div>';
    var sv=el.querySelector("svg"),xl=el.querySelector(".rc-x"),tip=el.querySelector(".rc-tip");
    function at(i){var r=R[i-1],rows=S.series.map(function(s){var p=s.pts.filter(function(p){return p[0]===i})[0];return p?'<div><span>'+S.nm(s.m)+'</span><b>'+S.usd(p[1])+'</b></div>':''}).join("")
        +'<div class="rc-tu"><span>Always up</span><b>'+S.usd(S.always.pts[i][1])+'</b></div>';
      xl.setAttribute("x1",X(i));xl.setAttribute("x2",X(i));xl.setAttribute("opacity",".35");
      tip.innerHTML='<p>Round '+r.n+' · '+S.esc(S.co(r))+' <em class="'+(r.a<0?'d':'u')+'">'+S.outTxt(r)+'</em></p>'+rows;tip.hidden=false;
      var x=X(i)*el.clientWidth/W;tip.style.left=Math.min(Math.max(0,x-90),el.clientWidth-190)+"px"}
    function mv(e){var b=sv.getBoundingClientRect(),cx=(e.touches?e.touches[0].clientX:e.clientX)-b.left,i=Math.round((cx*W/b.width-padL)/(W-padL-padR)*N);
      if(i<1||i>N){out();return}at(i)}
    function out(){tip.hidden=true;xl.setAttribute("opacity","0")}
    sv.addEventListener("pointermove",mv);sv.addEventListener("pointerdown",mv);sv.addEventListener("pointerleave",out);
    return {lead:lead}};
})(EZS);

/* ---------- experiment pages (v31 to v35): everything the main page says, computed the same way ---------- */
(function(S){
  var R=ROUNDS,M=S.board.map(function(b){return b.m});
  function dn(c){return /^DOWN/.test(c[1])}
  function ok(r,c){return dn(c)===(r.a<0)}
  function won(r,m){return S.winners(r).indexOf(m)>-1}
  var W=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve"];
  S.word=function(k){return W[k]||String(k)};
  S.models=M;
  S.ver=function(m){return (MODELS[m]&&MODELS[m].ver)||""};
  /* standings rows exactly as the main page shows them: hit rate %, average miss (points), ROI on $100,000, wins */
  S.rows=M.map(function(m){var b=S.board.filter(function(x){return x.m===m})[0],f=S.follow.filter(function(x){return x.m===m})[0];
    return {m:m,ver:S.ver(m),won:b.won,right:b.right,n:b.n,hit:Math.round(b.right/b.n*100),avg:b.avg,bal:f?f.bal:S.STAKE,roi:f?S.pct(f.bal):"+0.0%"}});
  /* the last k rounds for one AI: w = won, g = right way, r = wrong way, n = no call yet */
  S.form=function(m,k){return R.slice(-k).map(function(r){var c=callOf(r,m);return !c?"n":won(r,m)?"w":ok(r,c)?"g":"r"})};
  /* hit rate after each round (only rounds the AI called) */
  S.hitPath={};M.forEach(function(m){var n=0,o=0;S.hitPath[m]=R.map(function(r){var c=callOf(r,m);if(c){n++;if(ok(r,c))o++}return n?{n:r.n,pct:Math.round(o/n*100),calls:n}:null})});
  /* every call with its distance from the real move (the bullseye) */
  S.shots={};M.forEach(function(m){S.shots[m]=R.map(function(r){var c=callOf(r,m);return c?{r:r,said:c[1],v:(dn(c)?-1:1)*parseFloat(c[1].split(" ")[1]),off:parseFloat(c[2]),ok:ok(r,c),won:won(r,m)}:null}).filter(Boolean)});
  /* how we grade: the four rules, word for word from the main page */
  S.rules=[["Direction first.","Did the AI call up or down correctly? Wrong way, it's out."],["Then size.","Of the AIs that got the direction right, the one closest to the real move wins the round."],
    ["Nobody right, nobody wins.","If every AI gets the direction wrong, the round has no winner."],["Ties.","Equal wins are split by who was closer on average."]];
  /* record holders: longest winning streak (rounds won in a row), closest call ever, biggest miss ever */
  S.records=(function(){var best={m:null,rs:[]};M.forEach(function(m){var cur=[];R.forEach(function(r){var c=callOf(r,m);if(!c)return;if(won(r,m)){cur.push(r);if(cur.length>best.rs.length)best={m:m,rs:cur.slice()}}else cur=[]})});
    var all=[];R.forEach(function(r){r.calls.forEach(function(c){all.push({m:c[0],r:r,said:c[1],off:parseFloat(c[2])})})});
    var cl=all.slice().sort(function(a,b){return a.off-b.off})[0],wo=all.slice().sort(function(a,b){return b.off-a.off})[0];
    return {streak:best,closest:cl,worst:wo}})();
  /* highlights (Results): closest call, tightest race, biggest move, everyone was wrong */
  S.highlights=(function(){function avg(r){return r.calls.reduce(function(s,c){return s+parseFloat(c[2])},0)/r.calls.length}
    var tight=R.slice().sort(function(a,b){return avg(a)-avg(b)})[0],big=R.slice().sort(function(a,b){return Math.abs(b.a)-Math.abs(a.a)})[0],
      none=R.filter(function(r){return !r.win}),used=[S.records.closest.r,tight,big],
      wrong=none.filter(function(r){return used.indexOf(r)<0}).sort(function(a,b){return avg(b)-avg(a)})[0]||none[none.length-1];
    var allOff=[];R.forEach(function(r){r.calls.forEach(function(c){allOff.push(parseFloat(c[2]))})});
    var avgAll=allOff.reduce(function(a,b){return a+b},0)/allOff.length,avgRnd=R.reduce(function(s,r){return s+avg(r)},0)/R.length,avgMv=R.reduce(function(s,r){return s+Math.abs(r.a)},0)/R.length;
    return {closest:S.records.closest,closeX:avgAll/S.records.closest.off,tight:{r:tight,v:avg(tight)},avgRound:avgRnd,big:big,bigX:Math.abs(big.a)/avgMv,wrong:wrong,noWinner:none}})();
  /* unusual findings: the same rules as the main page (each needs at least 5 cases) */
  S.findings=(function(){var out=[],MIN=5,ag={n:0,ok:0},sp={n:0,ok:0},up={n:0,ok:0},dw={n:0,ok:0};
    R.forEach(function(r){var s=r.calls.reduce(function(t,c){return t+(dn(c)?-1:1)},0);if(Math.abs(s)===r.calls.length){ag.n++;if((s>0)===(r.a>0))ag.ok++}else if(s!==0){sp.n++;if((s>0)===(r.a>0))sp.ok++}
      r.calls.forEach(function(c){var o=dn(c)?dw:up;o.n++;if(ok(r,c))o.ok++})});
    if(ag.n>=MIN){var a=ag.ok/ag.n,b=sp.n?sp.ok/sp.n:0,P=PENDING[0],now=null;
      if(P&&P.calls.length>1){var ps=P.calls.reduce(function(t,c){return t+(c.dir==="DOWN"?-1:1)},0);if(Math.abs(ps)===P.calls.length)now="Right now: all "+S.word(P.calls.length)+" say "+(ps>0?"up":"down")+" on "+S.co(P)+"."}
      out.push({k:"When they all agree",head:a<.5?"When they all agree, they're usually wrong":a===.5?"When they all agree, it's a coin flip":"When they all agree, they're usually right",
        expl:"In "+S.word(ag.n)+" rounds every AI called the same direction. They were right in "+S.word(ag.ok)+" of them."+(sp.n?(b>a?" When they disagreed, going with the majority worked better.":" When they disagreed, the majority did no better."):""),
        stats:[[ag.ok+" of "+ag.n,"right when all agree"]].concat(sp.n?[[sp.ok+" of "+sp.n,"majority right when split"]]:[]),base:(ag.n+sp.n)+" rounds",now:now})}
    if(up.n>=MIN&&dw.n>=MIN){var u=up.ok/up.n,d=dw.ok/dw.n;out.push({k:"Up calls vs down calls",head:u-d>=.2?"Good at calling ups. Bad at calling downs.":d-u>=.2?"Better at calling drops than gains":"Up or down, the same hit rate",
      expl:"When an AI says a stock will rise, it "+(u>.5?"usually does":"often doesn't")+". When it says the stock will fall, it's "+(d>.5?"usually right":"usually wrong")+".",stats:[["▲ "+up.ok+" of "+up.n,"up calls right"],["▼ "+dw.ok+" of "+dw.n,"down calls right"]],base:(up.n+dw.n)+" calls"})}
    var sz=M.map(function(m){var n=0,ca=0,ma=0;R.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;ca+=parseFloat(c[1].split(" ")[1]);ma+=Math.abs(r.a)});return n>=MIN?{m:m,n:n,c:ca/n,a:ma/n}:null}).filter(Boolean).sort(function(x,y){return Math.abs(y.c-y.a)-Math.abs(x.c-x.a)})[0];
    if(sz&&Math.abs(sz.c-sz.a)>=.5)out.push({k:"How big",head:S.nm(sz.m)+(sz.c<sz.a?" plays it too safe":" swings too big"),expl:S.nm(sz.m)+"'s calls expect "+(sz.c<sz.a?"smaller":"bigger")+" moves than the market makes. Right or wrong on direction, it "+(sz.c<sz.a?"undersells":"oversells")+" how far the stock goes.",
      stats:[[sz.c.toFixed(1)+"%","its average call"],[sz.a.toFixed(1)+"%","average real move"]],base:sz.n+" rounds"});
    var hr=M.map(function(m){var n=0,o=0;R.forEach(function(r){var c=callOf(r,m);if(!c)return;n++;if(ok(r,c))o++});return n>=MIN?{m:m,n:n,ok:o}:null}).filter(Boolean);
    if(hr.length>1){var lo=hr.slice().sort(function(a,b){return a.ok/a.n-b.ok/b.n})[0],hi=hr.slice().sort(function(a,b){return b.ok/b.n-a.ok/a.n})[0],inv=lo.n-lo.ok;
      if(inv/lo.n>.5)out.push({k:"Just for fun",head:"Inverse "+S.nm(lo.m),expl:"Betting against every "+S.nm(lo.m)+" call would have been right "+S.word(inv)+" times out of "+lo.n+". "+(inv/lo.n>=hi.ok/hi.n?"That ties the best AI. ":"")+"It's a joke. "+S.nm(lo.m)+" has been informed.",
        stats:[[inv+" of "+lo.n,"right, betting against "+S.nm(lo.m)]],base:lo.n+" rounds",fun:true})}
    return out})();
  /* how big could it get: the main page's estimator, same assumptions and formula (an estimate, not a promise) */
  var A={volPct:SIM.volPct!=null?+SIM.volPct:25,feePct:SIM.feePct!=null?+SIM.feePct:0.7,poolShare:SIM.poolShare!=null?SIM.poolShare:0.69,days:60,move:5};
  S.calcA=A;S.MCAPS=[1e6,1e7,1e8,5e8,1e9];S.LEVS=[2,5,10];
  S.calc=function(mcap,lev){var perDay=mcap*A.volPct/100*A.feePct/100*A.poolShare,bet=perDay*A.days;return {mcap:mcap,lev:lev,bet:bet,buyback:bet*lev*A.move/100}};
  S.money=function(v){var a=Math.abs(v),u="";if(a>=1e9){a/=1e9;u="B"}else if(a>=1e6){a/=1e6;u="M"}else if(a>=1e3){a/=1e3;u="K"}
    var t=a>=100?String(Math.round(a*(1+1e-9))):(a*(1+1e-9)).toPrecision(3).replace(/\.?0+$/,"");return "$"+t+u};
  S.calcFine="Estimate, not a promise. Assumes "+A.volPct+"% daily volume, "+A.feePct+"% fee, "+A.days+" days, a "+A.move+"% move.";
  /* what operations pays for next (the main page's three steps; the first is now) */
  S.steps=[["More models","Max plans on each AI's newest model. Gemini and Qwen are next, then Mistral and NVIDIA's Nemotron.",true],["The pipeline runs itself","Calls, films and site updates run on their own. A human signs off.",false],["The AI places its own bet","No human in between.",false]];
})(EZS);
