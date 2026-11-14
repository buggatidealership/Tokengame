/* J · The stub: a ticket stub off the site's roll; the dot sits in its printed circle, the number is the round on now */
(function(){var s=lvState(),r=s.rounds,num=r.length?"No. "+lvRange(r):"",
  sub={bell:"Bell "+LV.left(),due:"Calls due",rung:"Results soon",off:"Back "+LV.nextLabel.split(" ")[0]}[s.k];
  lvPill("lv-j lv-"+s.k,'<span class="lv-j-c"><i class="lv-dot"></i></span><span class="lv-j-t"><b>'+lvE(num)+'</b><small>'+lvE(sub)+'</small></span><span class="lv-j-x lv-dk">'+lvE(s.full)+'</span>',s.aria)})();
