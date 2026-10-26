/* F · Today's pill, honest, with logos: the biggest company on now named beside its logo, the next ones as logos, then +k */
(function(){var s=lvState(),R=s.rounds;
  var ph=s.k==="off"?'<span class="lv-wd">'+lvE(LV.nextLabel.split(" ")[0])+'</span>'+lvStack(R,2):lvLead(R,3);
  var dk='<span class="lv-wd2">'+{bell:"Live: ",due:"Live: ",rung:"Bell rung: ",off:"Off air · back "+LV.nextLabel+": "}[s.k]+'</span>'+lvLead(R,3,{long:1})+
    '<span class="lv-wd2">'+{bell:" · "+LV.left()+" to the close",due:" · calls due today",rung:" · results soon",off:""}[s.k]+'</span>';
  lvFit(lvPill("lv-f lv-"+s.k,'<i class="lv-dot"></i><span class="lv-ph lv-row">'+ph+'</span><span class="lv-dk lv-row">'+dk+'</span>',s.aria))})();
