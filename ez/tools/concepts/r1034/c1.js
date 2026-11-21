/* r1034 C1: the lighter ink set inline (CERTU2's own !important rules outrank a sheet): every printed piece but the title and No.,
   PASS/FAIL and the holo stamp */
(function(){document.querySelectorAll('.card .xc').forEach(function(x){x.querySelectorAll('.xc-sec,.xc-rk,.xc-mk,.xc-nm,.xc-cl,.xc-out,.xc-d,.xc-film,.xc-wn').forEach(function(e){
  e.style.setProperty('filter','url(#x2pcL)','important');e.style.setProperty('mix-blend-mode','multiply','important');e.style.setProperty('text-shadow','none','important')});
 x.querySelectorAll('.xc-out b,.xc-out small,.xc-d b,.xc-d small,.xc-mk svg').forEach(function(e){e.style.setProperty('filter','none','important');e.style.setProperty('text-shadow','none','important')})})})();
