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
