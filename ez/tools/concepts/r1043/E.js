/* E · Two-ink picture-house ticket: A's ticket printed the way old cinema tickets were, in two inks a hair out of register. Slab-serif
   wood type for the figures (Alfa Slab One), each frame a printed double rule with corner stars, today marked with a red starburst that
   says "On air" (grey off air) */
(function(){var q=q41,f=q43;f.font("Alfa+Slab+One");
 var burst='<span class="q43e-bu'+(q.on?" on":"")+'"><b>'+(q.on?"On<br>air":"Off<br>air")+'</b></span>';
 var head='<b class="q42-bw q43e-bw">Season 1 · Week '+q.wk+'</b>',foot='<b class="q42-bw q43e-bw">Season 1</b>'+q.bar("q42-bb")+'<b class="q42-bw q43e-bw"><u>'+q.graded+'</u>/'+q.total+' · NVDA ★</b>';
 var d=f.make("q43-e",[f.lastP(),f.nowP(burst,"Today"),f.nextP()],{head:head,foot:foot});
 /* wood type: the count big, its word small under it */
 [].slice.call(d.querySelectorAll(".q42-t .q41-v,.q42-n .q41-v")).forEach(function(v){var m=/^(\d+)\s+(.*)$/.exec(v.textContent);if(m){v.classList.add("q43e-n");v.innerHTML="<b>"+m[1]+"</b><small>"+lvE(m[2])+"</small>"}})})();
