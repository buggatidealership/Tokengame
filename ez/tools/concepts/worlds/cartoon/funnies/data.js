/* The EZ. Funnies: every number on both pages comes from ez-data.js (loaded first), computed here at render time.
   Rules copied from the live page: flat $100K a trade, W when the trade's P&L > 0, windows as x2p_lb.js (24 hours = graded at
   the round's own exchange close in the last 24 hours, no fallback; 7 days = resolves date today or the six days before, New York),
   the bet's time = x2p_more.js betAt(), verbatim. */
(function(){
var W=window,ROOT="../../../../../";
var ORDER=["GROK","CLAUDE","GPT","KIMI"];
var COL={GROK:"#e4e0d6",CLAUDE:"#ef8a55",GPT:"#b18cff",KIMI:"#58b7ff"};
var CTRY={GROK:"us",CLAUDE:"us",GPT:"us",KIMI:"cn"},CNAME={us:"United States",cn:"China"};
var NAME={GROK:"Grok",CLAUDE:"Claude",GPT:"GPT",KIMI:"Kimi"};
var SECT={"Information Technology":"Tech","Consumer Discretionary":"Consumer","Consumer Staples":"Staples","Financials":"Finance","Industrials":"Industrials","Communication Services":"Media & telecom","Health Care":"Health","Materials":"Materials","Energy":"Energy","Utilities":"Utilities","Real Estate":"Real estate"};
var XC={KS:['Asia/Seoul',15,30],KQ:['Asia/Seoul',15,30],T:['Asia/Tokyo',15,30],TW:['Asia/Taipei',13,30],HK:['Asia/Hong_Kong',16,0],L:['Europe/London',16,30],AS:['Europe/Amsterdam',17,30],DE:['Europe/Berlin',17,30],SW:['Europe/Zurich',17,30],PA:['Europe/Paris',17,30],MI:['Europe/Rome',17,30],MC:['Europe/Madrid',17,30]};
var MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DAY=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],DAYL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],MONL=['January','February','March','April','May','June','July','August','September','October','November','December'];
var IDF={};
function closeAt(t,mdy){if(!mdy)return null;var X=XC[(String(t).split('.')[1]||'')]||['America/New_York',16,0],tz=X[0],h=X[1],mi=X[2],p=String(mdy).split('/').map(Number),Y=2000+(p[2]%100);
  var loc=function(x){var q=(IDF[tz]||(IDF[tz]=new Intl.DateTimeFormat('en-US',{timeZone:tz,hourCycle:'h23',year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric'}))).formatToParts(new Date(x));var g=function(k){return +q.find(function(z){return z.type===k}).value};return Date.UTC(g('year'),g('month')-1,g('day'),g('hour')%24,g('minute'))};
  var want=Date.UTC(Y,p[0]-1,p[1],h,mi),x=want;for(var i=0;i<3;i++)x+=want-loc(x);return x}
var NYF=new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',month:'numeric',day:'numeric',year:'2-digit'});
function nyDay(ms){var p=NYF.formatToParts(new Date(ms));var g=function(k){return +p.find(function(x){return x.type===k}).value};return Date.UTC(2000+g('year'),g('month')-1,g('day'))}
function dOf(s){var p=String(s).split('/').map(Number);return Date.UTC(2000+(p[2]%100),p[0]-1,p[1])}
function md(ms){var d=new Date(ms);return MON[d.getUTCMonth()]+' '+d.getUTCDate()}
function wmd(ms){var d=new Date(ms);return DAY[d.getUTCDay()]+' '+MON[d.getUTCMonth()]+' '+d.getUTCDate()}
function longDay(ms){var d=new Date(ms);return DAYL[d.getUTCDay()]+', '+MONL[d.getUTCMonth()]+' '+d.getUTCDate()+', '+d.getUTCFullYear()}
/* the bet: x2p_more.js betAt(), verbatim */
function betAt(){const md2=s=>{const m=String(s||'').match(/(\d+)\/(\d+)\/(\d+)/);return m?[2000+(+m[3]%100),+m[1]-1,+m[2]]:null};
  const nyClose=(y,m,d)=>{const f=new Date(Date.UTC(y,2,1)).getUTCDay(),a=Date.UTC(y,2,8+(7-f)%7),g=new Date(Date.UTC(y,10,1)).getUTCDay(),b=Date.UTC(y,10,1+(7-g)%7),t=Date.UTC(y,m,d);return Date.UTC(y,m,d,t>=a&&t<b?20:21)};
  const S=window.SIM||{},C=window.CONFIG||{},bd=md2(S.betDate||C.betDate);if(bd)return nyClose(bd[0],bd[1],bd[2]);
  const nv=[].concat(window.UPCOMING||[],window.PENDING||[]).find(u=>u.ticker==='NVDA'),c0=nv&&md2(nv.called);if(!c0)return null;
  let dt=new Date(Date.UTC(c0[0],c0[1],c0[2]));do{dt=new Date(dt.getTime()+864e5)}while(dt.getUTCDay()===0||dt.getUTCDay()===6);return nyClose(dt.getUTCFullYear(),dt.getUTCMonth(),dt.getUTCDate())}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function usd(v){return (v<0?'−':'+')+'$'+Math.abs(Math.round(v)).toLocaleString('en-US')}
function usdk(v){var a=Math.abs(v);return (v<0?'−':'+')+'$'+(a>=1000?(a/1000).toFixed(a>=100000?0:1).replace(/\.0$/,'')+'K':Math.round(a))}
function pct(v){return (v<0?'−':'+')+Math.abs(v).toFixed(2).replace(/\.?0+$/,'')+'%'}
function coName(t){return (W.TICKERS&&TICKERS[t])||t}
function coLabel(r){return coName(r.ticker)+' ('+r.ticker+')'}
function logoSrc(t){var L=W.CO_LOGOS&&CO_LOGOS[String(t).toUpperCase()];return L?ROOT+'media/'+(L.f||L):null}
function poster(r){var f=W.FILMS&&FILMS[r.n];return f?ROOT+'media/'+f.p+'.jpg':(r.poster?ROOT+'media/'+r.poster+'.jpg':null)}
function film(r){var f=W.FILMS&&FILMS[r.n];return f?ROOT+'media/'+f.f+'.mp4':null}
function mark(m,size,fg,bg){var M=MODELS[m];size=size||18;fg=fg||'#1d1a18';
  return '<svg class="mk" width="'+size+'" height="'+size+'" viewBox="0 0 24 24" aria-hidden="true"><path fill="'+fg+'"'+(M.fr?' fill-rule="'+M.fr+'"':'')+' d="'+M.d+'"/>'+(M.dot?'<path fill="'+fg+'" d="'+M.dot+'"/>':'')+'</svg>'}
/* printed flags, hand-set: US and China */
function flag(c,w){w=w||22;var h=Math.round(w*0.66);
  if(c==='cn')return '<svg class="flag" width="'+w+'" height="'+h+'" viewBox="0 0 30 20" aria-label="China"><rect width="30" height="20" fill="#d7322b"/><path fill="#f5c400" d="M5 2.4l1.06 3.26h3.43l-2.78 2.02 1.06 3.26L5 8.92 2.23 10.94l1.06-3.26L.51 5.66h3.43z"/><g fill="#f5c400"><circle cx="11" cy="2.6" r=".95"/><circle cx="13" cy="4.9" r=".95"/><circle cx="13" cy="7.9" r=".95"/><circle cx="11" cy="10.1" r=".95"/></g><rect width="30" height="20" fill="none" stroke="#1d1a18" stroke-width="1.2"/></svg>';
  var st='';for(var j=0;j<13;j+=2)st+='<rect y="'+(j*20/13)+'" width="30" height="'+(20/13)+'" fill="#c8322a"/>';
  var dots='';for(var a=0;a<4;a++)for(var b=0;b<5;b++)dots+='<circle cx="'+(1.5+b*2.6)+'" cy="'+(1.3+a*2.5)+'" r=".55" fill="#f4ecd6"/>';
  return '<svg class="flag" width="'+w+'" height="'+h+'" viewBox="0 0 30 20" aria-label="United States"><rect width="30" height="20" fill="#f4ecd6"/>'+st+'<rect width="13" height="10.77" fill="#2b4c8c"/>'+dots+'<rect width="30" height="20" fill="none" stroke="#1d1a18" stroke-width="1.2"/></svg>'}

function compute(){
  var NOW=W.__FNOW||Date.now(),today=nyDay(NOW);
  var RS=ROUNDS.filter(function(r){return typeof r.a==='number'&&!isNaN(r.a)}).slice().sort(function(a,b){return a.n-b.n});
  RS.forEach(function(r){r.T={};r.calls.forEach(function(c){var up=/^UP/.test(c[1]),mag=parseFloat(c[1].replace(/^[A-Z]+\s*/,'')),v=100000*(up?1:-1)*r.a/100;
    r.T[c[0]]={m:c[0],dir:up?'LONG':'SHORT',mag:mag,v:v,w:v>0,off:parseFloat(c[2])}});
    r.wins=r.win?r.win.split(' & '):[];r.close=closeAt(r.ticker,r.resolves);r.day=r.resolves?dOf(r.resolves):0;r.sector=(RMETA[r.n]||{}).sector||''});
  function stats(list){var S={};ORDER.forEach(function(m){S[m]={m:m,pnl:0,w:0,l:0,n:0}});
    list.forEach(function(r){ORDER.forEach(function(m){var t=r.T[m];if(!t)return;var s=S[m];s.pnl+=t.v;s.n++;if(t.w)s.w++;else s.l++})});
    ORDER.forEach(function(m){var s=S[m];s.hit=s.n?s.w/s.n:null});return S}
  var season=stats(RS);
  var inD7=function(r){var a=Math.round((today-r.day)/864e5);return r.resolves&&a>=0&&a<=6};
  var inD1=function(r){return r.close!=null&&r.close<=NOW&&r.close>NOW-864e5};
  var d7=RS.filter(inD7),d1=RS.filter(inD1);
  var lastCloseMs=RS.reduce(function(a,r){return r.close&&r.close<=NOW&&r.close>a?r.close:a},0);
  var lcDay=RS.reduce(function(a,r){return r.day>a?r.day:a},0),lcRs=RS.filter(function(r){return r.day===lcDay});
  var latest=stats(lcRs);
  var W7={label:'7 days',sub:md(today-6*864e5)+' to '+md(today),rs:d7,S:stats(d7)};
  var W1={label:'24 hours',sub:d1.length?'graded at the close in the last 24 hours':'No round graded in the last 24 hours · last close '+wmd(lcDay),rs:d1,S:stats(d1),empty:!d1.length};
  var WS={label:'Season',sub:RS.length+' rounds graded',rs:RS,S:season};
  /* per model: last five trades (oldest to newest), biggest W and L, sectors */
  var per={};ORDER.forEach(function(m){var mine=RS.filter(function(r){return r.T[m]});
    var last5=mine.slice(-5).map(function(r){return {r:r,t:r.T[m]}});
    var bw=null,bl=null;mine.forEach(function(r){var t=r.T[m];if(!bw||t.v>bw.t.v)bw={r:r,t:t};if(!bl||t.v<bl.t.v)bl={r:r,t:t}});
    var sec={};mine.forEach(function(r){var k=SECT[r.sector]||r.sector||'Other';(sec[k]=sec[k]||{w:0,n:0});sec[k].n++;if(r.T[m].w)sec[k].w++});
    /* running hit rate (right+1)/(trades+2) and running P&L, after each of its own trades */
    var right=0,n=0,p=0,hit=[{x:0,y:.5}],pl=[{x:0,y:0}];mine.forEach(function(r){n++;if(r.T[m].w)right++;p+=r.T[m].v;hit.push({x:r.n,y:(right+1)/(n+2)});pl.push({x:r.n,y:p})});
    per[m]={last5:last5,bw:bw,bl:bl,sec:sec,hitS:hit,plS:pl,first:mine.length?mine[0].n:null}});
  var sectors=Object.keys(SECT).map(function(k){return SECT[k]}).filter(function(k){return ORDER.some(function(m){return per[m].sec[k]})});
  var rank=function(S,by){return ORDER.slice().sort(function(a,b){var x=S[a],y=S[b];if(by==='hit'){var hx=x.hit==null?-1:x.hit,hy=y.hit==null?-1:y.hit;return hy-hx||y.pnl-x.pnl}return y.pnl-x.pnl||((y.hit||0)-(x.hit||0))})};
  var top=rank(season,'pnl')[0];
  /* nights: grading days, newest first */
  var days={};RS.forEach(function(r){if(r.day)(days[r.day]=days[r.day]||[]).push(r)});
  var nights=Object.keys(days).map(Number).sort(function(a,b){return b-a}).map(function(d){var rs=days[d];return {day:d,rs:rs,S:stats(rs)}});
  /* coming up: trades in (PENDING), then rounds with no trades yet, by call date then round */
  var cd=function(u){return u.called?dOf(u.called):9e15};
  var pend=PENDING.slice().sort(function(a,b){return cd(a)-cd(b)||a.n-b.n});
  var up=UPCOMING.slice().sort(function(a,b){return cd(a)-cd(b)||a.n-b.n});
  var caps=W.CAPS||{};
  return {NOW:NOW,today:today,RS:RS,season:season,WS:WS,W7:W7,W1:W1,latest:latest,lcDay:lcDay,lcRs:lcRs,lastCloseMs:lastCloseMs,per:per,sectors:sectors,rank:rank,top:top,nights:nights,pend:pend,up:up,caps:caps,betAt:betAt()};
}
W.F={ROOT:ROOT,ORDER:ORDER,COL:COL,CTRY:CTRY,CNAME:CNAME,NAME:NAME,SECT:SECT,MON:MON,DAY:DAY,md:md,wmd:wmd,longDay:longDay,dOf:dOf,nyDay:nyDay,esc:esc,usd:usd,usdk:usdk,pct:pct,coName:coName,coLabel:coLabel,logoSrc:logoSrc,poster:poster,film:film,mark:mark,flag:flag,compute:compute,closeAt:closeAt};
})();
