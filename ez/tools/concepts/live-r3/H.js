/* H · The live bug, with logos: a red LIVE tab with the dot, then the companies on now as logos (desktop names the first) */
(function(){var s=lvState(),R=s.rounds,tab={bell:"LIVE",due:"LIVE",rung:"BELL",off:"NEXT"}[s.k];
  var ph=lvStack(R,3),dk=(s.k==="off"?'<span class="lv-wd">'+lvE(LV.nextLabel)+'</span>':'')+lvLead(R,3,{long:1})+'<span class="lv-wd2">'+{bell:" · "+LV.left()+" to the close",due:" · calls due today",rung:" · results soon",off:""}[s.k]+'</span>';
  (function(a){a.setAttribute("data-tol","3");return lvFit(a)})(lvPill("lv-h lv-"+s.k,'<span class="lv-h-t"><i class="lv-dot"></i><b>'+tab+'</b></span><span class="lv-h-v"><span class="lv-ph lv-row">'+ph+'</span><span class="lv-dk lv-row">'+dk+'</span></span>',s.aria))})();
