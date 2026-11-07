/* S2 · The line to NVIDIA: a transit line map. One stop per week; the line is printed solid up to this week, this week's stop carries
   the on-air dot and "You are here", the stops ahead carry their biggest company, the terminus is the NVIDIA bet in gold and a dashed
   branch runs on to Season 2. */
(function(){var S=S5,s=lvState();
  var stops=S.W.map(function(w){var c=w.n<S.now?"past":w.n===S.now?"now":"fut",fin=w.n===S.finWeek,
      top=c==="now"?'<span class="s2-here"><i class="lv-dot"></i>Now</span>':fin?'<span class="s2-t">'+lvLogo(S.fin,"lv-prt")+'</span>':(c==="fut"&&w.big[0]?lvLogo(w.big[0],"lv-prt"):"");
    return '<li class="s2-'+c+(fin?" s2-f":"")+'"><span class="s2-top">'+top+'</span><span class="s2-st"></span><small>'+(fin?"Bet #1":"W"+w.n)+'</small></li>'}).join("");
  var d=document.createElement("div");d.className="lv5 s2 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1, week "+S.now+" of "+S.weeks+". "+S.graded+" of "+S.total+" graded. The season ends with the NVIDIA bet, then Season 2.");
  d.style.setProperty("--p",((S.now-1)/(S.weeks-1)*100).toFixed(2)+"%");
  d.innerHTML='<div class="s2-c pp"><div class="s2-hd"><b class="val pr">Season 1 <i>· Week '+S.now+' of '+S.weeks+'</i></b><span class="lab"><b class="val">'+S.graded+'</b>/'+S.total+' graded</span></div>'+
   '<div class="s2-map"><ol class="s2-l">'+stops+'</ol><span class="s2-nx"><small class="lab">'+(S.late?"Next":"Then")+'</small><b class="pr">Season 2</b></span></div>'+
   '<p class="s2-ft lab">'+(S.late?'Last stop: <b>NVIDIA</b>. Then the line runs on.':'This week: <b>'+S.cur.R.length+' calls</b> · '+S.cur.mag.map(function(r){return lvE(r.ticker)}).join(" · "))+'</p></div>';
  lv4.mount(d)})();
