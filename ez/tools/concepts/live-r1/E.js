/* E · The session: the trading day as a dial (phones) or a bar (desktop) that fills from the open at 9:30 to the bell at
   4:00 New York time; the words say what the bell does today. Redrawn once a minute. */
(function(){var L=LV,p=L.sessionPct(),top,sub,k;
  if(L.atBell.length){top="Bell "+L.left();sub=L.atBell.length+" graded at it";k="bell"}
  else if(L.waiting.length){top="Bell rung";sub="Results soon";k="rung"}
  else if(L.open){top="Bell "+L.left();sub=L.due.length?L.due.length+" calls due today":"Nothing graded";k="due"}
  else{top="Market shut";sub="Opens "+L.bellLabel.split(" ")[0]+" 9:30";k="shut"}
  var r=12,C=2*Math.PI*r,dial='<svg class="lv-e-d lv-ph" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="'+r+'" class="lv-e-tr"/><circle cx="15" cy="15" r="'+r+'" class="lv-e-ar" stroke-dasharray="'+(C*p).toFixed(2)+' '+C.toFixed(2)+'" transform="rotate(-90 15 15)"/>'+
    '<path class="lv-e-bl" d="M15 9.2c-2.2 0-3.6 1.7-3.6 3.9v2.6l-1.3 1.9h9.8l-1.3-1.9v-2.6c0-2.2-1.4-3.9-3.6-3.9zM13.6 18.6a1.4 1.4 0 0 0 2.8 0z"/></svg>';
  var bar='<span class="lv-e-b lv-dk" aria-hidden="true"><small>9:30</small><span class="lv-e-bt"><span class="lv-e-bf" style="width:'+(p*100).toFixed(1)+'%"></span><i style="left:'+(p*100).toFixed(1)+'%"></i></span><small>4:00</small>'+
    '<svg viewBox="0 0 30 30" class="lv-e-bb"><path class="lv-e-bl" d="M15 6.5c-3.3 0-5.4 2.6-5.4 5.9v3.9l-2 2.9h14.8l-2-2.9v-3.9c0-3.3-2.1-5.9-5.4-5.9zM12.9 20.6a2.1 2.1 0 0 0 4.2 0z"/></svg></span>';
  lvPill("lv-e lv-e-"+k,dial+bar+'<span class="lv-e-t"><b>'+lvE(top)+'</b><small>'+lvE(sub)+'</small></span>',top+". "+sub+".");
})();
