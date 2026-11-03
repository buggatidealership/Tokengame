/* ===== H48 DATA (EZ Live X6+ only; owner, 2026-11-03: "do one version where you apply it to what we have today"). Every figure the
   new Overview and the Leaderboard's action strip print is worked out here from ez-data.js at render time (ROUNDS, PENDING, UPCOMING,
   SHEET, RMETA, TICKERS, CO_LOGOS, SIM, CONFIG, FILMS). Nothing is typed in, with one exception, labelled on the page: Hyperliquid's
   markets, a snapshot of its API taken on 2026-11-03 (tools/concepts/worlds/cartoon/hl-markets-2026-11-03.json), cut down to the
   tickers the sheet has today and to markets that are still listed, as {coin:[[dex, open interest $M], ...]}. A sheet ticker is
   looked up as it is, else without its exchange suffix (ASML.AS -> ASML). After the cover lifts, refreshHL() asks Hyperliquid's own
   API for the same markets once (in a try, never blocking); when it answers, the open interest is live, else the snapshot stays,
   with its date. Ported from the H47 Saturday-morning take (tools/concepts/worlds/cartoon/saturday/ezx.js). ===== */
(function(){
if(window.H48D)return;
var W=window;
var MK=["GROK","CLAUDE","GPT","KIMI"];
var COL={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"};
var NAME={GROK:"Grok",CLAUDE:"Claude",GPT:"GPT",KIMI:"Kimi"};
var FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};
var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
var HL_SNAP={"GME":[["xyz",3]],"ORCL":[["xyz",18.4]],"BB":[["xyz",7.6]],"COST":[["xyz",0.4]],"MU":[["xyz",94.8]],"ASML":[["xyz",2]],"NFLX":[["xyz",5.7]],"SPCX":[["xyz",166]],"IBM":[["xyz",0.8]],"LRCX":[["xyz",0.3],["para",0.2]],"META":[["xyz",137.6]],"TSLA":[["xyz",38.9]],"BE":[["xyz",3.3]],"WDC":[["xyz",2.2]],"GLW":[["xyz",0.5],["para",0.8]],"STX":[["para",0.2]],"HOOD":[["xyz",19.2]],"GEV":[["xyz",0.6]],"EBAY":[["xyz",0.2]],"GOOGL":[["xyz",285.3]],"MSFT":[["xyz",25]],"NOW":[["xyz",3.1]],"LLY":[["xyz",6.2]],"RDDT":[["xyz",1.4],["para",0.2]],"SNDK":[["xyz",162.8],["io",4.9]],"AMZN":[["xyz",21.8]],"COIN":[["xyz",15.9]],"MSTR":[["xyz",42.7]],"CVX":[["xyz",0.2]],"INTC":[["xyz",120.2]],"PLTR":[["xyz",7.1]],"AAPL":[["xyz",67.5],["io",0.1]],"AMD":[["xyz",17.9]],"ARM":[["xyz",3.7]],"QCOM":[["xyz",1.5]],"GPRO":[["io",0.2]],"LITE":[["xyz",20.2]],"NET":[["xyz",4.5],["para",0.2]],"DKNG":[["xyz",0.4]],"TTWO":[["para",1.5]],"HIMS":[["xyz",1.7]],"USAR":[["xyz",1.8]],"CRWV":[["xyz",14.5]],"RKLB":[["xyz",5]],"NBIS":[["xyz",41.5],["io",7.2]],"SOFTBANK":[["xyz",1.4]],"AMAT":[["xyz",0.9]],"NVDA":[["xyz",75.2],["io",0.6]]};
var HL_ASOF="Nov 3";

function md(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null}
function dayKey(a){return a?a[0]*10000+(a[1]+1)*100+a[2]:0}
function parts(t,tz){var f=new Intl.DateTimeFormat("en-US",{timeZone:tz,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date(t)),o={};f.forEach(function(x){o[x.type]=x.value});return {y:+o.year,m:+o.month-1,d:+o.day,h:+o.hour%24,mi:+o.minute}}
function nyToday(now){var p=parts(now,"America/New_York");return [p.y,p.m,p.d]}
function addDays(a,k){var t=new Date(Date.UTC(a[0],a[1],a[2])+k*864e5);return [t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]}
function fmtDay(a,long){if(!a)return "";var t=new Date(Date.UTC(a[0],a[1],a[2]));return (long?WD[t.getUTCDay()]+" ":"")+MON[a[1]]+" "+a[2]}

function build(){
  /* one trade: a flat $100,000, long on UP, short on DOWN (the page's own __x2pPnl rule) */
  function trade(r,c){var up=/^UP/.test(c[1]),mag=String(c[1]).replace(/^(UP|DOWN)\s*/,"").replace(/%$/,"");var v=100000*(up?1:-1)*r.a/100;return {m:c[0],up:up,size:mag,v:v,w:v>0}}
  var R=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)}).slice().sort(function(a,b){return a.n-b.n});
  R.forEach(function(r){r.__h8={tr:r.calls.map(function(c){return trade(r,c)}),day:md(r.resolves),sector:(W.RMETA&&RMETA[r.n]&&RMETA[r.n].sector)||""}});
  function stats(rs){var s={};MK.forEach(function(m){s[m]={m:m,pl:0,w:0,l:0,n:0,seq:[],short:0}});
    rs.forEach(function(r){r.__h8.tr.forEach(function(t){var x=s[t.m];if(!x)return;x.n++;x.pl+=t.v;if(t.w)x.w++;else x.l++;if(!t.up)x.short++;x.seq.push({w:t.w,r:r,v:t.v})})});
    MK.forEach(function(m){var x=s[m];x.hit=x.n?x.w/x.n:null;x.first=x.seq.length?x.seq[0].r.n:null});return s}
  var season=stats(R),N=R.length;
  /* the order everywhere: season P&L, an AI under half the graded rounds after the rest (x2p_lb.js's rule, the Leaderboard's own) */
  var ord=MK.slice().sort(function(a,b){var x=season[a],y=season[b],qa=x.n>=N/2,qb=y.n>=N/2;if(qa!==qb)return qa?-1:1;return (y.pl-x.pl)||((y.hit||0)-(x.hit||0))});
  /* lines over time, one point per graded round (the hit rate starts every line at 50%: (right + 1) / (trades + 2)) */
  function series(){var out={},acc={};MK.forEach(function(m){out[m]={pl:[],hit:[]};acc[m]={pl:0,w:0,n:0}});
    R.forEach(function(r){r.__h8.tr.forEach(function(t){var a=acc[t.m];if(!a)return;a.pl+=t.v;a.n++;if(t.w)a.w++});
      MK.forEach(function(m){var a=acc[m];out[m].pl.push(a.pl);out[m].hit.push((a.w+1)/(a.n+2))})});return out}
  /* what's next: rows with trades in (PENDING), then rows with nothing yet (UPCOMING), in the order they are graded (undated last) */
  var tin=(W.PENDING||[]).map(function(p){return {in:true,n:p.n,co:p.co,ticker:p.ticker,called:md(p.called),resolves:md(p.resolves),
    tr:(p.calls||[]).map(function(c){return {m:c.m,up:c.dir==="UP",size:String(c.mag)}})}});
  var cup=(W.UPCOMING||[]).map(function(u){return {in:false,n:u.n,co:u.co,ticker:u.ticker,called:md(u.called),resolves:md(u.resolves),tr:[]}});
  var next=tin.concat(cup).sort(function(x,y){var kx=x.resolves?dayKey(x.resolves):9e9,ky=y.resolves?dayKey(y.resolves):9e9;return (kx-ky)||((y.in?1:0)-(x.in?1:0))||(x.n-y.n)});
  /* the bet: the page's own rule (routes.js EZ5_BET) when it is on the page, else x2p_more.js's betAt, copied verbatim */
  function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
    const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
    const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
    const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
    let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
  var BET=typeof W.EZ5_BET==="function"?W.EZ5_BET():betAt();
  /* the season's week (Mon to Fri, from the sheet's first trade date) */
  var today=nyToday(Date.now()),ci=(W.SHEET_HEADER||[]).indexOf("CALL DATE (T-1)"),first=md((W.SHEET&&SHEET[0]&&SHEET[0][ci<0?2:ci])||"");
  var weekNo=first?Math.floor((Date.UTC(today[0],today[1],today[2])-Date.UTC(first[0],first[1],first[2]))/(7*864e5))+1:null;
  /* the walkthrough: the newest round with a film where exactly one AI was right, the move 10% or less (the Saturday take's rule) */
  var recap=R.slice().reverse().filter(function(r){return W.FILMS&&FILMS[r.n]&&r.__h8.tr.filter(function(t){return t.w}).length===1&&Math.abs(r.a)<=10})[0]||R[N-1];
  return {R:R,N:N,season:season,ord:ord,stats:stats,series:series,next:next,BET:BET,weekNo:weekNo,today:today,recap:recap,
    nT:R.reduce(function(a,r){return a+r.__h8.tr.length},0)}}

function money(v){var a=Math.abs(Math.round(v)),s=a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");return (v>=0.5?"+":v<=-0.5?"−":"")+"$"+s}
function kmoney(v){var a=Math.abs(v);var s=a>=1000?(a/1000).toFixed(a>=100000?0:1).replace(/\.0$/,"")+"K":String(Math.round(a));return (v>0?"+":v<0?"−":"")+"$"+s}
function pct(a){return (a>0?"+":a<0?"−":"")+Math.abs(a).toFixed(2)+"%"}
function coName(t){return (W.TICKERS&&TICKERS[t])||t}
function coLabel(t){return coName(t)+" ("+t+")"}
function winners(r){return r.win&&!/NO WINNER/i.test(r.win)?String(r.win).split(" & "):[]}
/* a 95% range for a hit rate on n trades (Wilson) */
function wilson(w,n){if(!n)return null;var z=1.96,p=w/n,d=1+z*z/n,c=(p+z*z/(2*n))/d,h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n))/d;return [c-h,c+h]}

/* Hyperliquid: the market to follow is the listed one with the most open interest; under $10M it is marked thin */
var HL=HL_SNAP,HLlive=false;
function hlKey(t){t=String(t);if(HL[t])return t;var b=t.split(".")[0];return HL[b]?b:null}
function hlMarket(t){var k=hlKey(t);if(!k)return null;var m=HL[k].slice().sort(function(a,b){return b[1]-a[1]});if(!m.length)return null;
  return {name:m[0][0]+":"+k,oi:m[0][1],thin:m[0][1]<10,url:"https://app.hyperliquid.xyz/trade/"+m[0][0]+":"+k}}
function hlAsOf(){return HLlive?"Hyperliquid, live":"Hyperliquid, as of "+HL_ASOF}
var hlP=null,hlSubs=[];
function onHL(f){hlSubs.push(f)}
function refreshHL(){if(hlP)return hlP;var dex={};Object.keys(HL_SNAP).forEach(function(k){HL_SNAP[k].forEach(function(x){dex[x[0]]=1})});
  var ctl=W.AbortController?new AbortController():null,to=setTimeout(function(){if(ctl)ctl.abort()},8000);
  hlP=Promise.all(Object.keys(dex).map(function(d){return fetch("https://api.hyperliquid.xyz/info",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({type:"metaAndAssetCtxs",dex:d}),signal:ctl&&ctl.signal})
    .then(function(r){if(!r.ok)throw new Error("hl "+r.status);return r.json()}).then(function(j){return [d,j]})})).then(function(all){
    var nx={};all.forEach(function(a){var d=a[0],u=a[1][0].universe,cx=a[1][1];u.forEach(function(m,i){if(m.isDelisted)return;var k=String(m.name).split(":")[1];if(!HL_SNAP[k])return;
      var c=cx[i]||{},oi=(+c.openInterest||0)*(+c.oraclePx||+c.markPx||0)/1e6;(nx[k]=nx[k]||[]).push([d,Math.round(oi*10)/10])})});
    /* only when every market came back: a half answer would mix live and old figures */
    if(Object.keys(nx).length<Object.keys(HL_SNAP).length*0.8)throw new Error("hl partial");
    HL=nx;HLlive=true;clearTimeout(to);hlSubs.forEach(function(f){try{f()}catch(e){}});return true}).catch(function(e){clearTimeout(to);W.__h48HlErr=e;return false});
  return hlP}

var D=null;
W.H48D={get:function(){if(!D&&W.ROUNDS&&ROUNDS.length)D=build();return D},MK:MK,COL:COL,NAME:NAME,FLAG:FLAG,money:money,kmoney:kmoney,pct:pct,
  coName:coName,coLabel:coLabel,winners:winners,wilson:wilson,hlMarket:hlMarket,hlAsOf:hlAsOf,refreshHL:refreshHL,onHL:onHL,
  fmtDay:fmtDay,md:md,dayKey:dayKey,nyToday:nyToday};
})();
