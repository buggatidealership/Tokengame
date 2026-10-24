/* M1 The column: a clipping from the EZ paper. A small masthead and dateline, the headline in a news serif, the story as a short
   column with a drop cap, then the box score in agate type (the calls), the result line, the grade in italics */
var S=R37S,H=S.H,E=R37.esc;
R37.over(H.face,'<div class="c1-mast"><b>The $EZ Tape</b><small>Round '+H.n+' · '+E(H.graded)+'</small></div>'+
 '<h4 class="c1-h">'+H.head+'</h4><p class="c1-b">'+E(H.body)+'</p>'+
 '<div class="c1-box"><small>Box score</small>'+S.calls('c1-cs')+'</div>'+
 '<p class="c1-res">Stock moved '+S.moved+' · Winner <b>'+E(H.winner)+'</b></p>'+
 '<p class="c1-g">'+E(H.grade)+'</p><div class="c1-f">↻ See the film</div>','c1');
