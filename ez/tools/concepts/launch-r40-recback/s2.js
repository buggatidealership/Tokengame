/* S2 Today's dark back, with the stamp of approval as its background: a large blind-embossed seal of the grading office behind the
   rows (a pale lip and a dark wall, no ink), and a crisp mint ink stamp, APPROVED with the date, where today's GRADED ring sits */
var D=window.__r40D,E=R40.esc;
var seal=R40.stamp({c:'#efe4c8',mid:'$EZ',ms:22,top:'OFFICIAL GRADING SEAL',bot:'EARNINGSZN · SEASON 1',rot:0,cls:'s2-in'}).replace('class="r40stamp s2-in"','class="s2-in"');
R40.over(D.face,'<div class="s2-wm" style="filter:drop-shadow(-1px -1px 0 rgba(255,255,255,.5)) drop-shadow(1px 1px 0 rgba(0,0,0,.9))">'+seal+'</div>'+
 '<div class="s2-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<p class="s2-sec">What they predicted</p><div class="s2-rows">'+R40rows(D,'s2')+'</div>'+
 '<div class="s2-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(D.film?'<p class="s2-ft">↻ See the film</p>':'')+
 R40.stamp({c:'#4fe39a',mid:'APPROVED',ms:12.5,date:D.graded.toUpperCase(),rot:-10,cls:'s2-st'}),'s2');
