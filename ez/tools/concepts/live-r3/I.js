/* I · Tally light, with logos: the lamp; beside it the companies on now (the biggest named, the rest as logos) or the clock to the
   bell, and one small line under it */
(function(){var s=lvState(),L=LV,R=s.rounds;
  var top=s.k==="bell"?'<b class="lv-clk">'+L.hms()+'</b>':s.k==="off"?'<b>Back '+lvE(L.nextLabel.split(" ")[0])+'</b>':'<span class="lv-line">'+lvLead(R,3)+'</span>';
  var sub=s.k==="bell"||s.k==="off"?'<span class="lv-line">'+lvStack(R,3)+'</span>':'<span class="lv-sw lv-ph">'+(s.k==="due"?"due today":"results soon")+'</span><span class="lv-sw lv-dk">'+(s.k==="due"?"calls due today":"results soon")+'</span>';
  var a=lvFit(lvPill("lv-i lv-"+s.k,'<span class="lv-i-l"><i class="lv-dot"></i></span><span class="lv-i-t">'+top+'<small class="lv-sub">'+sub+'</small></span>',s.aria));
  if(s.k==="bell"){var b=a.querySelector(".lv-clk");setInterval(function(){b.textContent=L.hms()},1000)}})();
