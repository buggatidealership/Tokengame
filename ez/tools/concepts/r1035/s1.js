/* r1035 S1 again (owner: "there still a little double edge at the top of the writing" on the names, hit rate and P&L): every field but
   the stub in the lighter ink #x2pcL; inside the fields no pressed edge at all (no text-shadow, no drop-shadow), set inline so the
   board's own !important rules cannot put it back */
(function(){var d=document;d.querySelectorAll('#standings.x2p-tix ol.lbl>li').forEach(function(li){
 [].slice.call(li.children).forEach(function(f,i){if(f.classList.contains('rk')||(li.classList.contains('x2p-n5')&&i===0))return;
  f.style.setProperty('filter','url(#x2pcL)','important');f.style.setProperty('mix-blend-mode','multiply','important');f.style.setProperty('text-shadow','none','important');
  f.querySelectorAll('*').forEach(function(e){e.style.setProperty('text-shadow','none','important');if(e.tagName!=='g'&&e.tagName!=='path')e.style.setProperty('filter','none','important')})})})})();
