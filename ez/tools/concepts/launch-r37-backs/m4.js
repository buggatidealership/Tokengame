/* M4 Fight-night recap: the program's back page, black card, cream type, gold rules, a red "Recap" bug; the headline, the story, the
   four corners (the calls), the bell (the close) and the decision (the winner), the grade in gold */
var S=R37S,H=S.H,E=R37.esc;
R37.over(H.face,'<div class="c4-hd"><span class="bug">Recap</span><small>Round '+H.n+' · '+E(H.graded)+'</small></div>'+
 '<h4 class="c4-h">'+H.head+'</h4><p class="c4-b">'+E(H.body)+'</p>'+S.calls('c4-cs')+
 '<div class="c4-res"><div><small>The bell</small>'+S.moved+'</div><div><small>Decision</small><b>'+E(H.winner)+'</b></div></div>'+
 '<p class="c4-g">'+E(H.grade)+'</p><div class="c4-f">↻ See the film</div>','c4');
