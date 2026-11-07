/* A · The bug: a broadcast scorebug. One big number (rounds in play), what happens to them, and the clock to the bell */
(function(){var L=LV,s;
  function state(){if(L.atBell.length)return {n:L.atBell.length,w:"At the bell",sub:L.atBell.map(L.short).join(" · "),clk:L.left(),clkD:L.hms(),cl:"To the close",k:"bell"};
    if(L.waiting.length)return {n:L.waiting.length,w:"Bell rung",sub:"Results soon",clk:"",clkD:"4:00 PM",cl:"Closed",k:"rung"};
    if(L.due.length)return {n:L.due.length,w:"Calls due",sub:"Today",subD:L.due.slice(0,2).map(L.short).join(" · ")+" +"+(L.due.length-2),clk:"",clkD:"R"+lvRange(L.due),cl:L.graded+" graded",k:"due"};
    return {n:L.nextDay.length,w:"On the card",sub:L.nextLabel,subD:L.nextDay.slice(0,2).map(L.short).join(" · ")+" +"+(L.nextDay.length-2),clk:"",clkD:"R"+lvRange(L.nextDay),cl:L.nextLabel.split(" ")[0]+" calls",k:"next"}}
  s=state();
  lvPill("lv-a lv-a-"+s.k,'<span class="lv-a-n">'+s.n+'</span><span class="lv-a-t"><b>'+lvE(s.w)+'</b>'+
    '<small class="lv-ph">'+lvE(s.clk?s.clk:s.sub)+'</small><small class="lv-dk">'+lvE(s.subD||s.sub)+'</small></span>'+
    '<span class="lv-a-c lv-dk"><b>'+lvE(s.clkD)+'</b><small>'+lvE(s.cl)+'</small></span>',
    s.n+" rounds "+s.w.toLowerCase()+", "+(s.clk?s.clk+" to the close":s.sub));
})();
