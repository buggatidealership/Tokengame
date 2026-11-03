/* rubberhose / rh-core.js : every figure on both mockup pages is computed here from ez-data.js (the sheet) at render time.
   Nothing is typed by hand. Flat $100,000 per trade: v = 100000 x dir x move / 100; a W is v > 0. */
(function(G){
var BASE="../../../../../";                       /* ez/ from ez/tools/concepts/worlds/cartoon/rubberhose/ */
var MED=BASE+"media/";
var ORDER=["GROK","CLAUDE","GPT","KIMI"];
var COL={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"};
var NICE={GROK:"Grok",CLAUDE:"Claude",GPT:"GPT",KIMI:"Kimi"};
var FLAG={GROK:"US",CLAUDE:"US",GPT:"US",KIMI:"CN"};
var STAKE=100000;
function dirOf(s){return /^\s*DOWN/i.test(s)?-1:1}
function magOf(s){var m=String(s).match(/([\d.]+)\s*%/);return m?parseFloat(m[1]):NaN}
function pv(r,c){return STAKE*dirOf(c[1])*r.a/100}
function ymd(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null}
/* exchange of a ticker and its closing wall time (local) */
function exch(t){t=String(t).toUpperCase();
  if(/\.KS$/.test(t))return ["Asia/Seoul",15,30];
  if(/\.T$/.test(t)||/^(KIOXIA|NINTENDO|SOFTBANK)$/.test(t))return ["Asia/Tokyo",15,30];
  if(/\.TW$/.test(t)||t==="TSMC")return ["Asia/Taipei",13,30];
  if(/\.L$/.test(t))return ["Europe/London",16,30];
  if(/\.AS$/.test(t))return ["Europe/Amsterdam",17,30];
  if(/\.SW$/.test(t))return ["Europe/Zurich",17,30];
  if(/\.DE$/.test(t)||/^(BMW|DHL)$/.test(t))return ["Europe/Berlin",17,30];
  return ["America/New_York",16,0]}
function tzOff(ms,tz){var p={};new Intl.DateTimeFormat("en-US",{timeZone:tz,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=x.value});
  return Date.UTC(+p.year,+p.month-1,+p.day,+p.hour%24,+p.minute,+p.second)-ms}
function wall(y,m,d,h,mi,tz){var g=Date.UTC(y,m,d,h,mi);var o=tzOff(g,tz);var t=g-o;return t-(tzOff(t,tz)-o)}
function closeAt(r){var d=ymd(r.resolves);if(!d)return null;var e=exch(r.ticker);return wall(d[0],d[1],d[2],e[1],e[2],e[0])}
function nyYMD(ms){var p={};new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(new Date(ms)).forEach(function(x){p[x.type]=x.value});return [+p.year,+p.month-1,+p.day]}
function key(a){return a[0]*10000+(a[1]+1)*100+a[2]}
var DOW=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function dayLabel(a){var dt=new Date(Date.UTC(a[0],a[1],a[2],12));return DOW[dt.getUTCDay()]+" "+MON[a[1]]+" "+a[2]}
function shortDay(a){return MON[a[1]]+" "+a[2]}

var R=ROUNDS.slice().sort(function(x,y){return x.n-y.n});
/* one row per trade */
var TR=[];R.forEach(function(r){r.calls.forEach(function(c){var v=pv(r,c);TR.push({r:r,m:c[0],dir:dirOf(c[1]),mag:magOf(c[1]),v:v,w:v>0})})});

/* windows */
var NOW=Date.now(),TODAY=nyYMD(NOW);
function within7(r){var d=ymd(r.resolves);if(!d)return false;var k=key(d),t0=new Date(Date.UTC(TODAY[0],TODAY[1],TODAY[2]-6,12)),lo=key([t0.getUTCFullYear(),t0.getUTCMonth(),t0.getUTCDate()]);return k>=lo&&k<=key(TODAY)}
function within24(r){var t=closeAt(r);return t!=null&&t<=NOW&&t>NOW-864e5}
var lastCloseT=Math.max.apply(null,R.map(closeAt).filter(function(x){return x!=null}));
var lastCloseDay=nyYMD(lastCloseT);
function atLastClose(r){var d=ymd(r.resolves);return d&&key(d)===key(lastCloseDay)}
var W7lo=(function(){var t0=new Date(Date.UTC(TODAY[0],TODAY[1],TODAY[2]-6,12));return [t0.getUTCFullYear(),t0.getUTCMonth(),t0.getUTCDate()]})();
var WIN={season:{id:"season",label:"Season",long:"Season",f:function(){return true}},
  d7:{id:"d7",label:"7 days",long:"Last 7 days",f:within7,span:shortDay(W7lo)+" to "+shortDay(TODAY)},
  h24:{id:"h24",label:"24 hours",long:"Last 24 hours",f:within24}};

function stats(win){var f=(WIN[win]||WIN.season).f,out={},rs=R.filter(f);
  ORDER.forEach(function(m){out[m]={m:m,pl:0,w:0,l:0,n:0,hit:null,last5:[],lastClose:0,lastCloseN:0,bigW:null,bigL:null}});
  TR.forEach(function(t){if(!f(t.r))return;var o=out[t.m];o.pl+=t.v;o.n++;if(t.w)o.w++;else o.l++;
    if(!o.bigW||t.v>o.bigW.v)o.bigW=t;if(!o.bigL||t.v<o.bigL.v)o.bigL=t});
  ORDER.forEach(function(m){var o=out[m];o.hit=o.n?o.w/o.n:null;
    var mine=TR.filter(function(t){return t.m===m});o.last5=mine.slice(-5).map(function(t){return {w:t.w,r:t.r}});
    mine.forEach(function(t){if(atLastClose(t.r)){o.lastClose+=t.v;o.lastCloseN++}})});
  return {rounds:rs,by:out}}
function rank(st,by){return ORDER.slice().sort(function(a,b){var A=st.by[a],B=st.by[b];
  if(by==="hit"){var x=(B.hit==null?-1:B.hit)-(A.hit==null?-1:A.hit);if(Math.abs(x)>1e-12)return x}
  return (B.pl-A.pl)||(A.m<B.m?-1:1)})}
/* time series, round by round (only rounds in the window) */
function series(win){var f=(WIN[win]||WIN.season).f,rs=R.filter(f),s={};
  ORDER.forEach(function(m){s[m]={pl:[{n:0,y:0}],hit:[{n:0,y:.5}]}});
  var acc={};ORDER.forEach(function(m){acc[m]={pl:0,w:0,n:0}});
  rs.forEach(function(r,i){r.calls.forEach(function(c){var m=c[0],v=pv(r,c),A=acc[m];A.pl+=v;A.n++;if(v>0)A.w++;
      s[m].pl.push({n:i+1,y:A.pl,r:r});s[m].hit.push({n:i+1,y:(A.w+1)/(A.n+2),r:r})})});
  return {rounds:rs,s:s}}
/* sectors (season): SECTOR column of SHEET, read through SHEET_HEADER */
var SC=SHEET_HEADER.map(function(h){return String(h).trim().toUpperCase()}).indexOf("SECTOR"),RC=SHEET_HEADER.map(function(h){return String(h).trim().toUpperCase()}).indexOf("ROUND");
var SECT={};SHEET.forEach(function(row){SECT[+row[RC]]=String(row[SC]||"").trim()});
var SSHORT={"Information Technology":"Tech","Financials":"Finance","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Health Care":"Health","Industrials":"Industrials","Communication Services":"Media & telecom","Energy":"Energy","Materials":"Materials","Utilities":"Utilities","Real Estate":"Real estate"};
function sectors(){var t={};TR.forEach(function(x){var s=SECT[x.r.n]||"";if(!s)return;var k=SSHORT[s]||s;t[k]=t[k]||{name:k,full:s,n:0};var o=t[k][x.m]=t[k][x.m]||{w:0,n:0};o.n++;if(x.w)o.w++;t[k].n++});
  return Object.keys(t).map(function(k){return t[k]}).sort(function(a,b){return b.n-a.n})}
function noSector(){return R.filter(function(r){return !SECT[r.n]}).map(function(r){return r.n})}

/* the bet: ported verbatim from the live page (tools/v22/routes.js EZ5_BET), so the date and countdown match its bet card */
function EZ5_BET(){function md(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null}
  function nyClose(y,m,d){var f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)}
  var b=md(SIM.betDate||CONFIG.betDate);if(b)return nyClose(b[0],b[1],b[2]);
  var nv=[].concat(typeof UPCOMING!=="undefined"?UPCOMING:[],typeof PENDING!=="undefined"?PENDING:[]).filter(function(u){return u.ticker==="NVDA"})[0],c=nv&&md(nv.called);
  if(!c)return null;var dt=new Date(Date.UTC(c[0],c[1],c[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);
  return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function EZ5_DAY(t){return new Date(t).toLocaleDateString("en-US",{month:"short",day:"numeric",timeZone:"America/New_York"})}

/* what's next: SHEET rows without a move, grouped by grading day (trades in first) */
function nextUp(){var all=[].concat(PENDING.map(function(p){return {u:p,inn:true}}),UPCOMING.map(function(u){return {u:u,inn:false}}));
  var g={};all.forEach(function(x){var d=ymd(x.u.resolves)||ymd(x.u.called);if(!d)return;var k=key(d);(g[k]=g[k]||{k:k,d:d,items:[]}).items.push(x)});
  return Object.keys(g).sort().map(function(k){var o=g[k];o.items.sort(function(a,b){return (b.inn-a.inn)||((CAPS[b.u.ticker]||0)-(CAPS[a.u.ticker]||0))||(a.u.n-b.u.n)});return o})}

/* formatting */
function money(v,short){var s=v<0?"−":"+",a=Math.abs(Math.round(v));if(short&&a>=1000)return s+"$"+(a/1000).toFixed(a>=100000?0:1).replace(/\.0$/,"")+"K";return s+"$"+a.toLocaleString("en-US")}
function pct(x,d){return (x*100).toFixed(d==null?0:d)+"%"}
function mv(a){return (a<0?"−":"+")+Math.abs(a).toFixed(2)+"%"}
function coName(t){return TICKERS[t]||t}
function logoSrc(t){var L=CO_LOGOS[String(t).toUpperCase()];return L?MED+(L.f||L):null}
function logoDark(t){var L=CO_LOGOS[String(t).toUpperCase()];return !!(L&&L.dark)}
function film(n){var f=FILMS[n];return f?{mp4:MED+f.f+".mp4",poster:MED+f.p+".jpg"}:null}
function mark(m,size,cls){var M=MODELS[m];size=size||20;return '<svg class="'+(cls||"mk")+'" viewBox="0 0 24 24" width="'+size+'" height="'+size+'" aria-hidden="true"><path fill="'+COL[m]+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+COL[m]+'" d="'+M.dot+'"/>':'')+'</svg>'}
function flag(m,cls){var c=FLAG[m];
  if(c==="CN")return '<svg class="'+(cls||"flag")+'" viewBox="0 0 30 20" aria-label="China" role="img"><defs><linearGradient id="fgc'+m+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2382c"/><stop offset=".55" stop-color="#c7231a"/><stop offset="1" stop-color="#8f1610"/></linearGradient></defs><rect width="30" height="20" rx="1.6" fill="url(#fgc'+m+')"/><path fill="#ffd23a" d="M5.6 3.2l.9 2.6h2.7l-2.2 1.6.8 2.6-2.2-1.6-2.2 1.6.8-2.6L2 5.8h2.7z"/><circle cx="11" cy="2.6" r=".75" fill="#ffd23a"/><circle cx="12.8" cy="4.6" r=".75" fill="#ffd23a"/><circle cx="12.8" cy="7.4" r=".75" fill="#ffd23a"/><circle cx="11" cy="9.3" r=".75" fill="#ffd23a"/><rect width="30" height="20" rx="1.6" fill="none" stroke="rgba(255,240,200,.55)" stroke-width=".8"/><path d="M0 0h30v7H0z" fill="rgba(255,255,255,.12)"/></svg>';
  var st="";for(var i=0;i<7;i++)st+='<rect y="'+(i*20/6.5).toFixed(2)+'" width="30" height="'+(20/13).toFixed(2)+'" fill="#c8312e"/>';
  return '<svg class="'+(cls||"flag")+'" viewBox="0 0 30 20" aria-label="United States" role="img"><rect width="30" height="20" rx="1.6" fill="#efe6d2"/>'+st+'<rect width="13" height="10.8" fill="#24366e"/><g fill="#efe6d2">'+[[2.2,2],[5.2,2],[8.2,2],[11,2],[3.7,4.4],[6.7,4.4],[9.6,4.4],[2.2,6.8],[5.2,6.8],[8.2,6.8],[11,6.8],[3.7,9]].map(function(p){return '<circle cx="'+p[0]+'" cy="'+p[1]+'" r=".6"/>'}).join("")+'</g><rect width="30" height="20" rx="1.6" fill="none" stroke="rgba(255,240,200,.55)" stroke-width=".8"/><path d="M0 0h30v7H0z" fill="rgba(255,255,255,.14)"/></svg>'}
function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

G.RH={BASE:BASE,MED:MED,ORDER:ORDER,COL:COL,NICE:NICE,FLAG:FLAG,R:R,TR:TR,WIN:WIN,stats:stats,rank:rank,series:series,sectors:sectors,noSector:noSector,
  bet:EZ5_BET,betDay:EZ5_DAY,nextUp:nextUp,money:money,pct:pct,mv:mv,coName:coName,logoSrc:logoSrc,logoDark:logoDark,film:film,mark:mark,flag:flag,esc:esc,
  pv:pv,dirOf:dirOf,magOf:magOf,closeAt:closeAt,lastCloseDay:lastCloseDay,dayLabel:dayLabel,shortDay:shortDay,ymd:ymd,TODAY:TODAY,poolShare:SIM.poolShare,leadHours:SIM.leadHours}
})(window);
