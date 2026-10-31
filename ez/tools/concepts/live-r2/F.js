/* F · Today's pill, honest: the same yellow pill and dot; the dot glows only when live, the words say what is live */
(function(){var s=lvState(),L=LV,ph={bell:s.short,due:s.n+" due",rung:"Results",off:"Back "+L.nextLabel.split(" ")[0]}[s.k],
  dk={bell:"Live: "+s.full+" · "+L.left(),due:"Live: "+s.full,rung:"Bell rung: "+s.full,off:"Off air · "+s.full}[s.k];
  lvPill("lv-f lv-"+s.k,'<i class="lv-dot"></i><span class="lv-ph">'+lvE(ph)+'</span><span class="lv-dk">'+lvE(dk)+'</span>',s.aria)})();
