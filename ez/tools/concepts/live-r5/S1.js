/* S1 · Season pass: a punch card with one box per week. Weeks gone are punched through, this week is circled in red with the on-air dot,
   weeks to come carry their biggest company, the last week the NVIDIA bet in gold. Late in the season a Season 2 stub hangs off its end. */
(function(){var S=S5,s=lvState();
  var cells=S.W.map(function(w){var c=w.n<S.now?"past":w.n===S.now?"now":"fut",fin=w.n===S.finWeek,lg=c==="past"?"":fin?'<b class="s1-fin gold">Bet #1</b>':(w.big[0]?lvLogo(w.big[0],"lv-prt"):"");
    return '<li class="s1-'+c+(fin?" s1-f":"")+'"><span class="s1-box">'+(c==="now"?'<i class="lv-dot"></i>':"")+'</span><span class="s1-lg">'+(c==="now"?'<em>'+w.R.length+'</em>':lg)+'</span><small>'+w.n+'</small></li>'}).join("");
  var d=document.createElement("div");d.className="lv5 s1 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1, week "+S.now+" of "+S.weeks+". "+S.graded+" of "+S.total+" rounds graded.");
  d.innerHTML='<div class="s1-tk pp"><div class="s1-stub"><small class="lab">Season</small><b class="pr">1</b><small class="lab">Pass</small></div>'+
   '<div class="s1-body"><div class="s1-hd"><b class="val pr">Week '+S.now+' <i>of '+S.weeks+'</i></b><span class="lab"><i class="lv-dot"></i>'+(S.late?"Final week":"This week: "+S.cur.R.length+" calls")+'</span></div>'+
   '<ol class="s1-wk">'+cells+'</ol><div class="s1-ft"><span class="s1-bar"><i style="width:'+(S.pct*100).toFixed(1)+'%"></i></span><span class="lab"><b class="val">'+S.graded+'</b> of '+S.total+' graded</span></div></div>'+
   (S.late?'<div class="s1-s2"><small class="lab">Next</small><b class="pr">Season 2</b><small class="lab">Next earnings season</small><em class="lab">Mag 7 + more</em></div>':'')+'</div>';
  lv4.mount(d)})();
