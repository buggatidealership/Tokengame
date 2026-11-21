/* S4 · The season curve: pump.fun's own progress bar, borrowed. The bar fills as rounds get graded; it "graduates" to Season 2 after
   the NVIDIA bet. The page's own green, a striped fill, the percentage in it. */
(function(){var S=S5,s=lvState(),p=Math.round(S.pct*100);
  var d=document.createElement("div");d.className="lv5 s4 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1 is "+p+"% graded: "+S.graded+" of "+S.total+" rounds. Week "+S.now+" of "+S.weeks+". Season 2 follows the NVIDIA bet.");
  d.innerHTML='<div class="s4-c"><div class="s4-hd"><span><b class="s4-t">Season 1 curve</b><small>Week '+S.now+' of '+S.weeks+'</small></span><b class="s4-p">'+p+'%</b></div>'+
   '<div class="s4-bar"><i style="width:'+Math.max(p,3)+'%"></i></div>'+
   '<div class="s4-ft"><span><b>'+S.graded+'</b> of '+S.total+' graded</span><span class="s4-gr">'+(S.late?'Graduating to <b>Season 2</b>':'Graduates to <b>Season 2</b> after the NVIDIA bet')+'</span></div>'+
   (S.late?'':'<div class="s4-up"><span><i class="lv-dot"></i>This week</span>'+lvLead(S.cur.R,3)+'<span class="s4-n">'+S.cur.R.length+' calls</span></div>')+'</div>';
  lv4.mount(d)})();
