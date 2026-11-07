/* H · E with D's colours in its middle panel (owner, 2026-10-28: "take the middle part of D and replace that with the middle part of E,
   but keep the middle part style of E... the colors... have the logo feel"): E's print kept (double rule, corner stars, wood type, the
   starburst) on the logo's black, the figure in the logo's gold, the words in cream, the rule in gold, the burst in the logo's red */
(function(){var q=q41,f=q43;f.font("Alfa+Slab+One");
 var burst='<span class="q43e-bu'+(q.on?" on":"")+'"><b>'+(q.on?"On<br>air":"Off<br>air")+'</b></span>';
 var head='<b class="q42-bw q43e-bw">Season 1 · Week '+q.wk+'</b>',foot='<b class="q42-bw q43e-bw">Season 1</b>'+q.bar("q42-bb")+'<b class="q42-bw q43e-bw"><u>'+q.graded+'</u>/'+q.total+' · NVDA ★</b>';
 var d=f.make("q43-e q43-h",[f.lastP(),f.nowP(burst,"Today"),f.nextP()],{head:head,foot:foot});
 /* wood type: the count big, its word small under it */
 [].slice.call(d.querySelectorAll(".q42-t .q41-v,.q42-n .q41-v")).forEach(function(v){var m=/^(\d+)\s+(.*)$/.exec(v.textContent);if(m){v.classList.add("q43e-n");v.innerHTML="<b>"+m[1]+"</b><small>"+lvE(m[2])+"</small>"}})})();
