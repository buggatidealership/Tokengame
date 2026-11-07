/* G · On air, with logos: the lightbox, and under it the biggest company on now, then logos */
(function(){var s=lvState(),R=s.rounds,w=s.k==="off"?"OFF AIR":"ON AIR";
  var ph=s.k==="off"?'<span class="lv-wd">Back '+lvE(LV.nextLabel.split(" ")[0])+'</span>'+lvStack(R,2):s.k==="bell"?'<span class="lv-wd">'+lvE(LV.left())+'</span>'+lvStack(R,3):lvLead(R,2);
  var dk=(s.k==="off"?'<span class="lv-wd">Back '+lvE(LV.nextLabel)+'</span>':'')+lvLead(R,3,{long:1})+'<span class="lv-wd2">'+{bell:" · "+LV.left()+" to the close",due:" · calls due today",rung:" · results soon",off:""}[s.k]+'</span>';
  lvFit(lvPill("lv-g lv-"+s.k,'<span class="lv-g-box"><i class="lv-dot"></i><b>'+w+'</b></span><small class="lv-ph lv-row">'+ph+'</small><small class="lv-dk lv-row">'+dk+'</small>',s.aria))})();
