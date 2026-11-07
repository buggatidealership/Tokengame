/* C3 Passport page: the round is a page of entry stamps. Each AI's call is stamped where it landed: ADMITTED in a green rectangle for
   the right way (the winner's double-ruled, with its rank), DENIED in a red oval for the wrong way, each with the grading date; the
   market's close is the border control line at the foot */
var D=window.__r40D,E=R40.esc;var pos=[[4,2,-6],[52,6,5],[6,52,4],[54,54,-8]];
R40.over(D.face,'<div class="c3-hd"><b>Entries · '+E(D.co)+'</b><small>Page '+D.n+'</small></div><div class="c3-pg">'+
 D.rows.map(function(x,i){var q=pos[i];return '<div class="c3-s '+(x.ok?'ok':'no')+(x.win?' win':'')+'" style="left:'+q[0]+'%;top:'+q[1]+'%;--r:'+q[2]+'deg"><span class="r40mk">'+x.svg+'</span><b>'+(x.ok?'ADMITTED':'DENIED')+'</b><span>'+E(x.n)+' '+E(x.call)+'</span><span>'+(x.win?'★ #1 · ':x.ok?'#'+x.rk+' · ':'')+E(D.graded)+'</span></div>'}).join('')+'</div>'+
 '<div class="c3-bd"><small>Border control<br>Market close · filed '+E(D.called)+'</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(D.film?'<p class="c3-fl">↻ See the film</p>':''),'c3');
