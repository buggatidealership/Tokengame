/* Saturday-morning take (H47, helper "saturday"): every figure is computed here from ez-data.js at render time.
   Nothing is typed in. Both pages load ../../../../../ez-data.js first, then this file. */
(function(){
var MK=["GROK","CLAUDE","GPT","KIMI"];
var COL={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"};
var NAME={GROK:"Grok",CLAUDE:"Claude",GPT:"GPT",KIMI:"Kimi"};
var FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};
var LAB={GROK:"xAI",CLAUDE:"Anthropic",GPT:"OpenAI",KIMI:"Moonshot AI"};
var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function md(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null}
function dayKey(a){return a?a[0]*10000+(a[1]+1)*100+a[2]:0}
/* the instant a wall-clock time in a time zone happens */
function zoned(y,m,d,h,mi,tz){var g=Date.UTC(y,m,d,h,mi);for(var i=0;i<2;i++){var p=parts(g,tz),as=Date.UTC(p.y,p.m,p.d,p.h,p.mi);g+=Date.UTC(y,m,d,h,mi)-as}return g}
function parts(t,tz){var f=new Intl.DateTimeFormat("en-US",{timeZone:tz,year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",hourCycle:"h23"}).formatToParts(new Date(t)),o={};f.forEach(function(x){o[x.type]=x.value});return {y:+o.year,m:+o.month-1,d:+o.day,h:+o.hour%24,mi:+o.minute}}
/* each exchange's own close, local time (as the live site's xcloseAt) */
function exch(t){t=String(t);if(/\.KS$/.test(t))return ["Asia/Seoul",15,30];if(/\.T$/.test(t)||/^(KIOXIA|NINTENDO|SOFTBANK)$/.test(t))return ["Asia/Tokyo",15,30];
  if(/\.TW$/.test(t))return ["Asia/Taipei",13,30];if(/\.HK$/.test(t))return ["Asia/Hong_Kong",16,0];if(/\.L$/.test(t))return ["Europe/London",16,30];
  if(/\.(DE|AS|SW|PA|MI)$/.test(t)||/^(BMW|DHL|SAP)$/.test(t))return ["Europe/Berlin",17,30];return ["America/New_York",16,0]}
function closeAt(r){var a=md(r.resolves);if(!a)return null;var e=exch(r.ticker);return zoned(a[0],a[1],a[2],e[1],e[2],e[0])}
function nyToday(now){var p=parts(now,"America/New_York");return [p.y,p.m,p.d]}
function addDays(a,k){var t=new Date(Date.UTC(a[0],a[1],a[2])+k*864e5);return [t.getUTCFullYear(),t.getUTCMonth(),t.getUTCDate()]}
function fmtDay(a,long){if(!a)return "";var t=new Date(Date.UTC(a[0],a[1],a[2]));return (long?WD[t.getUTCDay()]+" ":"")+MON[a[1]]+" "+a[2]}

/* one trade: $100,000 flat, long on UP, short on DOWN */
function trade(r,c){var up=/^UP/.test(c[1]),mag=String(c[1]).split(" ")[1]||"";var v=Math.round(100000*(up?1:-1)*r.a/100);return {m:c[0],up:up,size:mag,v:v,w:v>0}}

var R=ROUNDS.slice().sort(function(a,b){return a.n-b.n});
R.forEach(function(r){r.tr=r.calls.map(function(c){return trade(r,c)});r.closeT=closeAt(r);r.day=md(r.resolves);r.sector=(typeof RMETA!=="undefined"&&RMETA[r.n]&&RMETA[r.n].sector)||""});

function stats(rs){var s={};MK.forEach(function(m){s[m]={m:m,pl:0,w:0,l:0,n:0,seq:[],best:null,worst:null}});
  rs.forEach(function(r){r.tr.forEach(function(t){var x=s[t.m];if(!x)return;x.n++;x.pl+=t.v;if(t.w)x.w++;else x.l++;x.seq.push({w:t.w,r:r,v:t.v});
    if(!x.best||t.v>x.best.v)x.best={v:t.v,r:r};if(!x.worst||t.v<x.worst.v)x.worst={v:t.v,r:r}})});
  MK.forEach(function(m){var x=s[m];x.hit=x.n?x.w/x.n:null;x.last5=x.seq.slice(-5)});return s}

var now=Date.now();
var latestDay=R.reduce(function(a,r){return dayKey(r.day)>dayKey(a)?r.day:a},null);
var latestRounds=R.filter(function(r){return dayKey(r.day)===dayKey(latestDay)});
var today=nyToday(now),from7=addDays(today,-6);
var win={
  season:{key:"season",label:"Season",rs:R},
  d7:{key:"d7",label:"7 days",rs:R.filter(function(r){var k=dayKey(r.day);return k>=dayKey(from7)&&k<=dayKey(today)}),from:from7,to:today},
  h24:{key:"h24",label:"24 hours",rs:R.filter(function(r){return r.closeT&&r.closeT<=now&&r.closeT>now-864e5})}
};
Object.keys(win).forEach(function(k){win[k].st=stats(win[k].rs)});
var season=win.season.st,atLatest=stats(latestRounds);

function rank(st,by){return MK.slice().sort(function(a,b){var x=st[a],y=st[b];
  if(by==="hit"){var hx=x.n?x.hit:-1,hy=y.n?y.hit:-1;return (hy-hx)||(y.pl-x.pl)}return (y.pl-x.pl)||((y.hit||0)-(x.hit||0))})}

/* lines over time, one point per graded round in order (the hit rate starts every line at 50%) */
function series(rs){var out={};MK.forEach(function(m){out[m]={pl:[],hit:[],ns:[]}});var acc={};MK.forEach(function(m){acc[m]={pl:0,w:0,n:0}});
  rs.forEach(function(r,i){r.tr.forEach(function(t){var a=acc[t.m];if(!a)return;a.pl+=t.v;a.n++;if(t.w)a.w++});
    MK.forEach(function(m){var a=acc[m];out[m].pl.push(a.pl);out[m].hit.push((a.w+1)/(a.n+2));out[m].ns.push(r.n)})});return out}

/* by sector: trades won of trades made */
function sectors(rs){var t={};rs.forEach(function(r){var k=r.sector||"Other";t[k]=t[k]||{};r.tr.forEach(function(x){var c=t[k][x.m]=t[k][x.m]||{w:0,n:0};c.n++;if(x.w)c.w++})});
  return Object.keys(t).map(function(k){var n=0;MK.forEach(function(m){n+=(t[k][m]||{n:0}).n});return {sector:k,c:t[k],n:n}}).sort(function(a,b){return b.n-a.n})}

/* what's next: rows with trades in (PENDING), then rows with nothing yet (UPCOMING) */
function byCall(a,b){return (dayKey(md(a.called))-dayKey(md(b.called)))||(a.n-b.n)}
var tradesIn=PENDING.slice().sort(byCall).map(function(p){return {n:p.n,co:p.co,ticker:p.ticker,called:md(p.called),resolves:md(p.resolves),
  tr:p.calls.map(function(c){return {m:c.m,up:c.dir==="UP",size:c.mag}})}});
var comingUp=UPCOMING.slice().sort(byCall).map(function(u){return {n:u.n,co:u.co,ticker:u.ticker,called:md(u.called),resolves:md(u.resolves)}});

/* the bet: the live page's own rule (routes.js EZ5_BET), copied unchanged so the date matches its bet card */
function betAt(){function nyClose(y,m,d){var f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)}
  var b=md(SIM.betDate||CONFIG.betDate);if(b)return nyClose(b[0],b[1],b[2]);
  var nv=[].concat(UPCOMING,PENDING).filter(function(u){return u.ticker==="NVDA"})[0],c=nv&&md(nv.called);if(!c)return null;
  var dt=new Date(Date.UTC(c[0],c[1],c[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);
  return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
var BET=betAt();

/* the season's week (Mon to Fri, from the first trade's day) */
var first=md((SHEET[0]||[])[2]);var weekNo=first?Math.floor((Date.UTC(today[0],today[1],today[2])-Date.UTC(first[0],first[1],first[2]))/(7*864e5))+1:null;

/* the walkthrough: the newest round with a film where exactly one AI was right, and a typical move (10% or less) */
var recap=R.slice().reverse().filter(function(r){return r.film&&r.tr.filter(function(t){return t.w}).length===1&&Math.abs(r.a)<=10})[0]||R[R.length-1];

function money(v,sign){var a=Math.abs(Math.round(v)),s=a.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");return (v>0?"+":v<0?"−":(sign?"±":""))+"$"+s}
function kmoney(v){var a=Math.abs(v);var s=a>=1000?(a/1000).toFixed(a>=100000?0:1).replace(/\.0$/,"")+"K":String(a);return (v>0?"+":v<0?"−":"")+"$"+s}
function pct(a){return (a>0?"+":a<0?"−":"")+Math.abs(a).toFixed(2)+"%"}
function coName(t){return (typeof TICKERS!=="undefined"&&TICKERS[t])||t}
function coLabel(r){return coName(r.ticker)+" ("+r.ticker+")"}
function logoSrc(t,base){var L=CO_LOGOS[t];return L?(base||"")+"media/"+(L.f||L):null}
function winners(r){return r.win?r.win.split(" & "):[]}

window.EZX={MK:MK,COL:COL,NAME:NAME,FLAG:FLAG,LAB:LAB,R:R,win:win,season:season,atLatest:atLatest,latestDay:latestDay,latestRounds:latestRounds,
  today:today,from7:from7,rank:rank,series:series,sectors:sectors,tradesIn:tradesIn,comingUp:comingUp,BET:BET,weekNo:weekNo,recap:recap,
  money:money,kmoney:kmoney,pct:pct,coName:coName,coLabel:coLabel,logoSrc:logoSrc,winners:winners,fmtDay:fmtDay,md:md,dayKey:dayKey,stats:stats,now:now};
})();
