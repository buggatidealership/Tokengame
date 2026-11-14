/* S6 · The season band: what the top bar lost ("Zeason one"), back as a slim printed band under the tabs, above the headline:
   Season 1 · Week 8 of 11, one segment per week (gone in ink, this week lit with the dot), graded count; late in the season it says
   what comes after. */
(function(){var S=S5,s=lvState();
  var seg=S.W.map(function(w){return '<i class="s6-'+(w.n<S.now?"past":w.n===S.now?"now":"fut")+(w.n===S.finWeek?" s6-f":"")+'"></i>'}).join("");
  var d=document.createElement("div");d.className="lv5 s6 lv-"+s.k+(S.late?" late":"");d.setAttribute("aria-label","Season 1, week "+S.now+" of "+S.weeks+". "+S.graded+" of "+S.total+" rounds graded.");
  d.innerHTML='<div class="s6-c pp"><span class="s6-t"><i class="lv-dot"></i><b>Season 1</b><em>Wk '+S.now+'/'+S.weeks+'</em></span><span class="s6-seg">'+seg+'</span>'+
    (S.late?'<span class="s6-nx">Next: <b>Season 2</b></span>':'<span class="s6-n"><b>'+S.graded+'</b>/'+S.total+' graded</span>')+'</div>';
  var hero=document.querySelector(".hero");hero.parentNode.insertBefore(d,hero)})();
