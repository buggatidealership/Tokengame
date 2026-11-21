/* P1 · The wire: a slim strip under the header (it scrolls away with the page) with the day's card, the last close's
   results and the season count, each a small printed stub. It never moves by itself: a thumb swipes it. */
(function(){var L=LV,st=[];
  var arr=function(a){return a<0?'<i class="lv-dn">▼'+Math.abs(a).toFixed(2)+'%</i>':'<i class="lv-up">▲'+a.toFixed(2)+'%</i>'};
  var names=function(l){return l.slice(0,3).map(function(u){return lvE(u.co)}).join(", ")+(l.length>3?" +"+(l.length-3):"")};
  if(L.atBell.length)st.push('<span class="lv-w-s lv-w-hot"><em>At the bell · '+L.left()+'</em><b>'+names(L.atBell)+'</b><small>calls locked</small></span>');
  if(L.waiting.length)st.push('<span class="lv-w-s lv-w-hot lv-w-rung"><em>Bell rung</em><b>'+names(L.waiting)+'</b><small>results soon</small></span>');
  if(L.due.length)st.push('<span class="lv-w-s lv-w-hot"><em>Today · '+L.due.length+' calls due</em><b>'+names(L.due)+'</b></span>');
  else if(!L.atBell.length&&L.nextDay.length)st.push('<span class="lv-w-s"><em>'+lvE(L.nextLabel)+' · '+L.nextDay.length+' calls due</em><b>'+names(L.nextDay)+'</b></span>');
  var day=L.lastLabel.split(" ")[0];
  L.lastBatch.slice().reverse().slice(0,4).forEach(function(r,i){var c=r.win?r.calls.filter(function(c){return c[0]===r.win.split(" & ")[0]})[0]:null;
    st.push('<span class="lv-w-s"><em>'+(i?'':day+' close · ')+'R'+r.n+'</em><b>'+lvE(L.short(r))+' '+arr(r.a)+'</b><small>'+(r.win?lvE(r.win.split(" & ").map(L.nm).join(" & "))+(c?', '+c[2]+'% off':''):'nobody right')+'</small></span>')});
  st.push('<span class="lv-w-s lv-w-ss"><em>Season 1</em><b>'+L.graded+' graded</b><small>'+L.upcoming+' to come</small></span>');
  var w=document.createElement("nav");w.className="lv-wire";w.setAttribute("aria-label","Latest");
  w.innerHTML='<div class="lv-w-in lv-scroll">'+st.join("")+'</div>';
  document.querySelector("header.top").after(w);
})();
