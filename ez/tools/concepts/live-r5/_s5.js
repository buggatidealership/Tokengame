/* live-r5 shared: the season, from ez-data.js and the New York clock (LV, live-r1/_model.js). Weeks run Monday to Friday from the first
   round's call date; a round belongs to the week it was called in. window.__S5SIM (the late-season board only) counts every round called
   before today as graded, so the bar can show the season's last week before it happens; it never shows a result. */
window.S5=(function(){var L=LV,all=[].concat(ROUNDS.map(function(r){return {r:r,g:1}}),PENDING.map(function(r){return {r:r,g:0}}),UPCOMING.map(function(r){return {r:r,g:0}})),
  K=L.K,DAY=864e5,d=function(k){return new Date(k+"T12:00:00Z")},mon=function(k){var t=d(k),w=t.getUTCDay();return t.getTime()-((w+6)%7)*DAY},
  first=all.map(function(x){return K(x.r.called)}).sort()[0],wk=function(k){return Math.floor((mon(k)-mon(first))/(7*DAY))+1};
  if(window.__S5SIM)all.forEach(function(x){if(K(x.r.called)<L.today)x.g=1});
  var W=[];all.forEach(function(x){var i=wk(K(x.r.called))-1;(W[i]=W[i]||{n:i+1,R:[],g:0}).R.push(x.r);if(x.g)W[i].g++});
  var MAG={NVDA:1,AAPL:1,MSFT:1,GOOGL:1,AMZN:1,META:1,TSLA:1},MON=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  W.forEach(function(w){w.big=lvBig(w.R);w.mag=w.R.filter(function(r){return MAG[r.ticker]});var t=new Date(mon(K(w.R[0].called)));w.label=MON[t.getUTCMonth()]+" "+t.getUTCDate()});
  var now=wk(L.today),g=all.filter(function(x){return x.g}).length,fin=all.filter(function(x){return x.r.ticker==="NVDA"})[0];
  return {W:W,now:now,weeks:W.length,graded:g,total:all.length,pct:g/all.length,cur:W[now-1],next:W[now],fin:fin&&fin.r,finWeek:fin?wk(K(fin.r.called)):W.length,
    left:W.length-now,late:W.length-now<=1,wk:wk}})();
