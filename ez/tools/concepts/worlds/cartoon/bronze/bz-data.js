/* bronze: every figure on both mockup pages is computed here from ez-data.js (ROUNDS, PENDING, UPCOMING, SHEET, MODELS ...).
   Nothing is typed in except the bet's close, read off the live page's bet card (see BET below). */
(function(){
var ORDER=["GROK","CLAUDE","GPT","KIMI"];
var COL={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"};
var FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};
var LAB={GROK:"United States",CLAUDE:"United States",GPT:"United States",KIMI:"China"};
var NAME={GROK:"Grok",CLAUDE:"Claude",GPT:"GPT",KIMI:"Kimi"};
/* The bet: the live page's bet card (v46-live-x2plus.html, .hb5-tab) reads "At the close · Nov 18" and counts down to
   4 pm New York that day (15 days, 0 hours, 14 minutes at 20:46 UTC on Nov 3). Taken from there, not worked out here. */
var BET={tag:"At the close · Nov 18",t:Date.UTC(2026,10,18,21,0,0)};
var MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
function pd(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return null;var y=+m[3];if(y<100)y+=2000;return {y:y,m:+m[1],d:+m[2]}}
function key(o){return o?o.y*10000+o.m*100+o.d:0}
function fmt(o){return o?MON[o.m-1]+" "+o.d:""}
function wday(o){return o?WD[new Date(Date.UTC(o.y,o.m-1,o.d)).getUTCDay()]:""}
/* exchange closes for the 24-hour window: each round is graded at its own exchange's close */
function ex(t){t=String(t);
  if(/\.KS$/.test(t))return ["Asia/Seoul",15,30];if(/\.T$/.test(t)||/^(KIOXIA|SOFTBANK|NINTENDO)$/.test(t))return ["Asia/Tokyo",15,30];
  if(/\.TW$/.test(t))return ["Asia/Taipei",13,30];if(/\.L$/.test(t))return ["Europe/London",16,30];
  if(/\.(DE|AS|SW)$/.test(t)||/^(BMW|DHL)$/.test(t))return [/\.SW$/.test(t)?"Europe/Zurich":/\.AS$/.test(t)?"Europe/Amsterdam":"Europe/Berlin",17,30];
  if(/\.HK$/.test(t))return ["Asia/Hong_Kong",16,0];return ["America/New_York",16,0]}
function tzOff(ms,tz){var p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=x.value});
  return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute,+p.second)-ms}
function closeAt(r){var d=pd(r.resolves);if(!d)return null;var e=ex(r.ticker);var g=Date.UTC(d.y,d.m-1,d.d,e[1],e[2]);return g-tzOff(g,e[0])}
function nyToday(now){var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"numeric",month:"numeric",day:"numeric"}).formatToParts(new Date(now)).forEach(function(x){p[x.type]=x.value});return {y:+p.year,m:+p.month,d:+p.day}}
function addDays(o,n){var t=new Date(Date.UTC(o.y,o.m-1,o.d)+n*864e5);return {y:t.getUTCFullYear(),m:t.getUTCMonth()+1,d:t.getUTCDate()}}
function money(v,sign){var a=Math.round(Math.abs(v)).toLocaleString("en-US");return (v<0?"−":(sign===false?"":"+"))+"$"+a}
function kmoney(v){var a=Math.abs(v),s=v<0?"−":"+";return s+"$"+(a>=1000?(a/1000).toFixed(a>=100000?0:1).replace(/\.0$/,"")+"K":Math.round(a))}
function pct(a){return (a<0?"−":"+")+Math.abs(a).toFixed(2)+"%"}
/* sectors from the SHEET's own SECTOR column, read through SHEET_HEADER (RMETA is checked first) */
var SECT={};(function(){var i=SHEET_HEADER.indexOf("SECTOR"),j=SHEET_HEADER.indexOf("MAG 7");SHEET.forEach(function(r){var n=+r[0];var s=(typeof RMETA!=="undefined"&&RMETA[n]&&RMETA[n].sector)||(i>-1?String(r[i]||"").trim():"");SECT[n]={s:s,m7:j>-1&&/^TRUE$/i.test(String(r[j]))}})})();
/* one trade: dir +1 long / -1 short; P&L = 100000 x dir x move / 100 (flat $100K, simulated) */
var R=ROUNDS.slice().sort(function(a,b){return a.n-b.n}).map(function(r){
  var tr={};r.calls.forEach(function(c){var up=/^UP/i.test(c[1]);var mag=parseFloat(String(c[1]).replace(/[^0-9.]/g,""));var v=100000*(up?1:-1)*r.a/100;tr[c[0]]={long:up,mag:mag,v:v,w:v>0}});
  var wins=r.win?r.win.split(" & "):[];var d=pd(r.resolves);
  return {n:r.n,co:r.co,t:r.ticker,a:r.a,move:pct(r.a),called:pd(r.called),res:d,rk:key(d),close:closeAt(r),tr:tr,win:wins,film:FILMS[r.n]||null,sector:(SECT[r.n]||{}).s||"",m7:(SECT[r.n]||{}).m7}});
function stats(rs){var o={};ORDER.forEach(function(m){o[m]={m:m,p:0,w:0,l:0,n:0,seq:[],bw:null,bl:null,sect:{}}});
  rs.forEach(function(r){ORDER.forEach(function(m){var t=r.tr[m];if(!t)return;var S=o[m];S.n++;S.p+=t.v;if(t.w)S.w++;else S.l++;S.seq.push({r:r,t:t});
    if(!S.bw||t.v>S.bw.t.v)S.bw={r:r,t:t};if(!S.bl||t.v<S.bl.t.v)S.bl={r:r,t:t};
    var s=r.sector||"Other";S.sect[s]=S.sect[s]||{w:0,n:0};S.sect[s].n++;if(t.w)S.sect[s].w++})});
  ORDER.forEach(function(m){var S=o[m];S.hit=S.n?S.w/S.n:null;S.last5=S.seq.slice(-5)});return o}
function rank(st,by){return ORDER.slice().sort(function(a,b){var A=st[a],B=st[b];
  if(by==="hit"){var x=(B.hit==null?-1:B.hit)-(A.hit==null?-1:A.hit);return x||B.p-A.p}return B.p-A.p||((B.hit||0)-(A.hit||0))})}
var now=Date.now(),today=nyToday(now),wk0=key(addDays(today,-6)),tk=key(today);
var latest=R.reduce(function(a,r){return r.rk>a?r.rk:a},0);
var W={
  season:{id:"season",label:"Season",rounds:R},
  d7:{id:"d7",label:"7 days",rounds:R.filter(function(r){return r.rk>=wk0&&r.rk<=tk}),from:addDays(today,-6),to:today},
  h24:{id:"h24",label:"24 hours",rounds:R.filter(function(r){return r.close!=null&&r.close<=now&&r.close>now-864e5})}
};
var lastRounds=R.filter(function(r){return r.rk===latest});
var lastDay=lastRounds.length?lastRounds[0].res:null;
/* time series for the charts: hit rate (right+1)/(trades+2), so every line starts at 50%; cumulative P&L from $0 */
function series(rs){var o={};ORDER.forEach(function(m){var right=0,n=0,p=0,pts=[],pp=[];rs.forEach(function(r,i){var t=r.tr[m];if(!t)return;if(!n){pts.push([i,0.5]);pp.push([i,0])}n++;if(t.w)right++;p+=t.v;pts.push([i+1,(right+1)/(n+2)]);pp.push([i+1,p])});o[m]={hit:pts,pnl:pp}});return o}
/* what's next: rounds with trades in and no result, then rounds with no trades yet, soonest first */
function srt(a,b){return key(pd(a.resolves)||pd(a.called))-key(pd(b.resolves)||pd(b.called))||a.n-b.n}
var PEND=PENDING.slice().sort(srt).map(function(p){var tr={};p.calls.forEach(function(c){tr[c.m]={long:c.dir==="UP",mag:+c.mag}});return {n:p.n,co:p.co,t:p.ticker,res:pd(p.resolves),called:pd(p.called),tr:tr}});
var UP=UPCOMING.slice().sort(function(a,b){return key(pd(a.called))-key(pd(b.called))||a.n-b.n}).map(function(p){return {n:p.n,co:p.co,t:p.ticker,res:pd(p.resolves),called:pd(p.called)}});
window.BZ={ORDER:ORDER,COL:COL,FLAG:FLAG,LAB:LAB,NAME:NAME,BET:BET,R:R,W:W,stats:stats,rank:rank,series:series,PEND:PEND,UP:UP,
  lastRounds:lastRounds,lastDay:lastDay,today:today,now:now,fmt:fmt,wday:wday,money:money,kmoney:kmoney,pct:pct,pd:pd,key:key,
  co:function(t){return (TICKERS[t]||t)+" ("+t+")"},logo:function(t){var L=CO_LOGOS[t];return L?MEDIA+(L.f||L):null},brand:function(t){var L=CO_LOGOS[t];return L&&L.c||"#3a3a3a"},
  film:function(n){var f=FILMS[n];return f?{mp4:MEDIA+f.f+".mp4",poster:MEDIA+f.p+".jpg"}:null}};
})();
