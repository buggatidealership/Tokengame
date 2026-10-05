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
