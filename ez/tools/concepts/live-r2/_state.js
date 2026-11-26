/* live-r2 shared: the dot only glows when something is really live. One honest state from LV (live-r1/_model.js):
     bell   rounds with calls in are graded at today's close, market open  -> red, pulsing, the clock to 4pm ET
     due    the AIs' calls are due today (a trading day)                    -> red, pulsing
     rung   the bell has rung on rounds with calls in, results not synced   -> amber, slow breath
     off    nothing today (weekend, holiday, a quiet day)                   -> no glow, a grey dot, when it is back on */
window.lvState=function(){var L=LV;
  if(L.atBell.length&&L.bellToday&&L.open)return {k:"bell",on:1,n:L.atBell.length,rounds:L.atBell,head:"Live",line:L.atBell.length+" at the bell",short:L.left(),clock:L.hms(),
    full:L.atBell.map(L.short).join(" · ")+" graded at the close",aria:L.atBell.length+" rounds graded at today's close, "+L.left()+" to go"};
  if(L.waiting.length)return {k:"rung",on:0,n:L.waiting.length,rounds:L.waiting,head:"Bell rung",line:"Results soon",short:"Results soon",clock:"",
    full:L.waiting.map(L.short).join(" · ")+" · results soon",aria:"The bell has rung on "+L.waiting.length+" rounds, results soon"};
  if(L.due.length)return {k:"due",on:1,n:L.due.length,rounds:L.due,head:"Live",line:L.due.length+" calls due",short:L.due.length+" calls due",clock:"",
    full:L.due.slice(0,3).map(L.short).join(" · ")+(L.due.length>3?" +"+(L.due.length-3):"")+" · calls due today",aria:L.due.length+" calls due today"};
  var nd=L.nextLabel.split(" ")[0];
  return {k:"off",on:0,n:L.nextDay.length,rounds:L.nextDay,head:"Off air",line:"Back "+nd,short:"Back "+nd,clock:"",
    full:"Back "+L.nextLabel+" · "+L.nextDay.length+" calls due",aria:"Off air, back "+L.nextLabel+" with "+L.nextDay.length+" calls"}};
