/* G · On air: a studio lightbox. Lit red glass with ON AIR when live, dark glass when not; a line under it says what */
(function(){var s=lvState(),w={bell:"ON AIR",due:"ON AIR",rung:"ON AIR",off:"OFF AIR"}[s.k],
  ph={bell:s.short+" to close",due:s.n+" calls due",rung:"Results soon",off:s.short}[s.k],dk={bell:s.full+" · "+LV.left(),due:s.full,rung:s.full,off:s.full}[s.k];
  lvPill("lv-g lv-"+s.k,'<span class="lv-g-box"><i class="lv-dot"></i><b>'+w+'</b></span><small class="lv-ph">'+lvE(ph)+'</small><small class="lv-dk">'+lvE(dk)+'</small>',s.aria)})();
