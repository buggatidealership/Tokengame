/* live-r1: one true model of "where the season stands right now", computed only from ez-data.js and the clock.
   Every option reads window.LV; nothing here is typed by hand except the NYSE holiday list (which the real build would
   need too: the bell does not ring on Thanksgiving, and rings at 1pm the day after). */
(function(){
  var NYF=new Intl.DateTimeFormat("en-US",{timeZone:"America/New_York",hourCycle:"h23",year:"numeric",month:"numeric",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"});
  function ny(t){var o={};NYF.formatToParts(new Date(t)).forEach(function(q){o[q.type]=+q.value});return {y:o.year,mo:o.month,d:o.day,h:o.hour%24,mi:o.minute,s:o.second}}
  function off(t){var q=ny(t);return (Date.UTC(q.y,q.mo-1,q.d,q.h,q.mi,q.s)-Math.floor(t/1000)*1000)/6e4}
  function at(y,mo,d,h,mi){var g=Date.UTC(y,mo-1,d,h,mi||0),u=g-off(g)*6e4;return g-off(u)*6e4}
  function key(y,mo,d){return y+"-"+String(mo).padStart(2,"0")+"-"+String(d).padStart(2,"0")}
  function K(s){var m=String(s||"").match(/(\d+)\/(\d+)\/(\d+)/);return m?key(2000+(+m[3]%100),+m[1],+m[2]):"9999"}
  /* NYSE 2026-27: full closures and 1pm early closes (nyse.com/markets/hours-calendars) */
  var HOL={"2026-11-26":1,"2026-12-25":1,"2027-01-01":1,"2027-01-18":1,"2027-02-15":1},EARLY={"2026-11-27":13,"2026-12-24":13};
  var WD=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],WDL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  function kdate(k){var p=k.split("-");return new Date(Date.UTC(+p[0],+p[1]-1,+p[2]))}
  function kwd(k){return kdate(k).getUTCDay()}
  function kadd(k,n){var t=new Date(kdate(k).getTime()+n*864e5);return key(t.getUTCFullYear(),t.getUTCMonth()+1,t.getUTCDate())}
  function trading(k){var w=kwd(k);return w>0&&w<6&&!HOL[k]}
  function bellOf(k){var p=k.split("-");return at(+p[0],+p[1],+p[2],EARLY[k]||16,0)}
  function openOf(k){var p=k.split("-");return at(+p[0],+p[1],+p[2],9,30)}
  function short(u){var t=String(u.ticker||"");if(/^\d/.test(t)||t.indexOf(".")>-1)return u.co.length<=9?u.co:u.co.split(" ")[0];return t}
  function nm(m){return {GPT:"GPT",KIMI:"Kimi",CLAUDE:"Claude",GROK:"Grok"}[m]||m}
  function left(ms){if(ms<=0)return "0m";var m=Math.ceil(ms/6e4),d=Math.floor(m/1440),h=Math.floor(m%1440/60),mi=m%60;return d?d+"d "+h+"h":h?h+"h "+String(mi).padStart(2,"0")+"m":mi+"m"}
  function hms(ms){if(ms<=0)return "0:00:00";var s=Math.floor(ms/1e3);return Math.floor(s/3600)+":"+String(Math.floor(s%3600/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0")}
  function kfmt(k,o){var t=kdate(k);o=o||{};return (o.long?WDL:WD)[t.getUTCDay()]+(o.date===false?"":" "+MON[t.getUTCMonth()]+" "+t.getUTCDate())}
  /* X2's ranking rule: AIs that called at least half the graded rounds first, by hit rate, ties to the smaller average miss */
  function rank(R){var T={};R.forEach(function(r){r.calls.forEach(function(c){var m=c[0],t=T[m]||(T[m]={m:m,n:0,ok:0,err:0}),up=/^UP/.test(c[1]);t.n++;if(up===(r.a>0))t.ok++;t.err+=parseFloat(c[2])})});
    var L=Object.keys(T).map(function(m){var t=T[m];t.hr=t.ok/t.n;t.avg=t.err/t.n;t.el=t.n*2>=R.length;return t});
    L.sort(function(a,b){return (b.el-a.el)||(b.hr-a.hr)||(a.avg-b.avg)});L.forEach(function(t,i){t.rank=i+1});return L}
  function build(){
    var now=Date.now(),q=ny(now),today=key(q.y,q.mo,q.d);
    var G=ROUNDS.slice(),P=PENDING.slice(),U=UPCOMING.slice().sort(function(a,b){return K(a.called).localeCompare(K(b.called))||a.n-b.n});
    /* the next bell: today's if the market trades today and it has not rung, else the next trading day's */
    var bk=today;for(var i=0;i<10;i++){if(trading(bk)&&bellOf(bk)>now)break;bk=kadd(bk,1)}
    var bell=bellOf(bk),open=trading(today)&&now>=openOf(today)&&now<bellOf(today);
    var rungToday=trading(today)&&now>=bellOf(today);
    /* rounds with calls in: graded at the bell of their resolution date */
    var atBell=P.filter(function(u){return K(u.resolves)===bk}),
      waiting=P.filter(function(u){return K(u.resolves)<=today&&(K(u.resolves)<today||rungToday)});
    var lastK=G.reduce(function(a,r){var k=K(r.resolves);return k>a?k:a},"0000"),lastBatch=G.filter(function(r){return K(r.resolves)===lastK});
    var due=U.filter(function(u){return K(u.called)===today}),nextK=U.length?K(U[0].called):null,nextDay=U.filter(function(u){return K(u.called)===nextK});
    var Rnow=rank(G),Rprev=rank(G.filter(function(r){return K(r.resolves)<lastK}));
    Rnow.forEach(function(t){var p=Rprev.filter(function(x){return x.m===t.m})[0];t.move=p?p.rank-t.rank:0});
    /* this week (Mon to Fri of today's week): rounds by the day their calls were made */
    var w=kwd(today),mon=kadd(today,w===0?1:w===6?2:1-w),week=[];
    for(var j=0;j<5;j++){var dk=kadd(mon,j),all=[].concat(G,P,U).filter(function(r){return K(r.called)===dk});
      week.push({k:dk,n:all.length,graded:all.filter(function(r){return r.out}).length,inn:all.filter(function(r){return !r.out&&r.calls&&r.calls.length}).length,today:dk===today,past:dk<today})}
    return {now:now,ny:q,today:today,todayLabel:kfmt(today),bellKey:bk,bell:bell,bellToday:bk===today,bellLabel:kfmt(bk),open:open,rungToday:rungToday,
      atBell:atBell,waiting:waiting,graded:G.length,lastK:lastK,lastLabel:kfmt(lastK),lastBatch:lastBatch,due:due,nextK:nextK,nextLabel:nextK?kfmt(nextK):"",nextDay:nextDay,
      upcoming:U.length,pending:P.length,next:U[0]||null,stand:Rnow,leader:Rnow[0],week:week,weekCalls:week.reduce(function(a,d){return a+d.n},0),
      total:G.length+P.length+U.length,
      left:function(){return left(bell-Date.now())},hms:function(){return hms(bell-Date.now())},short:short,nm:nm,kfmt:kfmt,K:K,
      sessionPct:function(){var t=Date.now();if(!trading(today))return 0;var o=openOf(today),c=bellOf(today);return Math.max(0,Math.min(1,(t-o)/(c-o)))}}
  }
  window.LV=build();window.LVbuild=build;
})();
