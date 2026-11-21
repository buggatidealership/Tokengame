/* I · The tally light: the dot grows into a camera's tally lamp; beside it a clock that ticks every second to the bell
   (when a close grades rounds), or what is due */
(function(){var s=lvState(),L=LV,top={bell:s.clock,due:s.n+" calls",rung:"Results",off:"Off air"}[s.k],
  sub={bell:"to the close",due:"due today",rung:"soon",off:s.short}[s.k],dk={bell:s.full,due:s.full,rung:s.full,off:s.full}[s.k];
  var a=lvPill("lv-i lv-"+s.k,'<span class="lv-i-l"><i class="lv-dot"></i></span><span class="lv-i-t"><b>'+lvE(top)+'</b><small class="lv-ph">'+lvE(sub)+'</small><small class="lv-dk">'+lvE(dk)+'</small></span>',s.aria);
  if(s.k==="bell"){var b=a.querySelector("b");setInterval(function(){b.textContent=L.hms()},1000)}})();
