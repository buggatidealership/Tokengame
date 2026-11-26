/* D · Now serving: a ticket stub torn from the roll. The number is the round being decided right now (calls due, or at the
   bell); the stub says what happens to it next. Desktop adds a second stub with the season's count. */
(function(){var L=LV,list,w,clk="";
  if(L.atBell.length){list=L.atBell;w="At the bell";clk=L.left()}
  else if(L.waiting.length){list=L.waiting;w="Results soon"}
  else if(L.due.length){list=L.due;w="Calls due today"}
  else{list=L.nextDay;w="Up "+L.nextLabel.split(" ")[0]}
  var no=lvRange(list),wide=no.length>3;
  lvPill("lv-d"+(wide?" lv-d-w":""),'<span class="lv-d-s"><small>Now serving</small><b><em>No.</em>'+lvE(no)+'</b></span>'+
    '<span class="lv-d-m"><small class="lv-ph">'+lvE(clk?"Bell "+clk.replace(" ",""):w.replace(" today",""))+'</small><small class="lv-dk">'+lvE(w)+(clk?' · '+clk:'')+'</small>'+
      '<span class="lv-dk lv-d-co">'+lvE(list.slice(0,3).map(L.short).join(" · ")+(list.length>3?" +"+(list.length-3):""))+'</span></span>'+
    '<span class="lv-d-t lv-dk"><b>'+L.graded+'</b><small>graded</small><b>'+L.upcoming+'</b><small>to come</small></span>',
    "Now serving round "+no+": "+w+(clk?", "+clk+" to the close":""));
})();
