/* H · The live bug: a red LIVE tab with the dot, like a broadcast's corner bug, and one fact beside it */
(function(){var s=lvState(),tab={bell:"LIVE",due:"LIVE",rung:"BELL",off:"NEXT"}[s.k],
  ph={bell:s.short,due:s.n+" due",rung:"Soon",off:LV.nextLabel.split(" ")[0]}[s.k],dk={bell:s.full+" · "+LV.left(),due:s.full,rung:s.full,off:s.full}[s.k];
  lvPill("lv-h lv-"+s.k,'<span class="lv-h-t"><i class="lv-dot"></i><b>'+tab+'</b></span><span class="lv-h-v"><span class="lv-ph">'+lvE(ph)+'</span><span class="lv-dk">'+lvE(dk)+'</span></span>',s.aria)})();
