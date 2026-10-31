/* J · The stub, with logos: the round numbers on now, the companies printed under them (biggest first) */
(function(){var s=lvState(),r=s.rounds,num=r.length?"No. "+lvRange(r):"";
  var B=lvBig(r),row='<span class="lv-stk lv-flat">'+B.slice(0,3).map(function(u){return lvLogo(u,"lv-prt")}).join("")+'</span>'+(B.length>3?'<span class="lv-more">+'+(B.length-3)+'</span>':'');
  var dk='<span class="lv-ld">'+lvLogo(B[0],"lv-prt")+'<b class="lv-nm">'+lvE(B[0].co)+'</b></span>'+B.slice(1,4).map(function(u){return lvLogo(u,"lv-prt")}).join("")+(B.length>4?'<span class="lv-more">+'+(B.length-4)+'</span>':'')+
    '<span class="lv-wd2">'+{bell:" · bell in "+LV.left(),due:" · calls due",rung:" · results soon",off:" · back "+LV.nextLabel}[s.k]+'</span>';
  lvFit(lvPill("lv-j lv-"+s.k,'<span class="lv-j-c"><i class="lv-dot"></i></span><span class="lv-j-t"><b>'+lvE(num)+'</b><small class="lv-row lv-ph">'+row+'</small></span><span class="lv-j-x lv-dk lv-row">'+dk+'</span>',s.aria))})();
