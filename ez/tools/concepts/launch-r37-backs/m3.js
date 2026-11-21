/* M3 The report: typed on a ruled index card (blue lines, a red margin), the headline typed in capitals and underlined, the story,
   the calls as a typed list, the result typed, and the grade struck on as a red rectangular rubber stamp */
var S=R37S,H=S.H,E=R37.esc,gw=(H.grade.split(':')[0]||'').toUpperCase();
R37.over(H.face,'<div class="c3-hd">Report · Round '+H.n+' · '+E(H.graded.toUpperCase())+'</div>'+
 '<h4 class="c3-h">'+H.head+'</h4><p class="c3-b">'+E(H.body)+'</p>'+S.calls('c3-cs')+
 '<p class="c3-res">MOVED '+S.moved+' &nbsp; WINNER: '+E(H.winner.toUpperCase())+'</p>'+
 '<p class="c3-g">'+E(H.grade.split(':').slice(1).join(':').trim())+'</p><div class="c3-f">↻ See the film</div>'+
 '<div class="c3-st"><span>'+E(gw)+'</span></div>','c3');
