/* M2 Ticket: the story printed on the standings' ticket stock between a green band and a red band; the headline pressed in ink, the
   story in the ticket's body type, the calls rubber-stamped in boxes, the result in printed fields, the grade in red ink */
var S=R37S,H=S.H,E=R37.esc;
R37.over(H.face,'<div class="c2-band"><span>Round '+H.n+' · The story</span></div><div class="c2-in">'+
 '<h4 class="c2-h">'+H.head+'</h4><p class="c2-b">'+E(H.body)+'</p>'+S.calls('c2-cs')+
 '<div class="c2-res"><div><small>Stock moved</small>'+S.moved+'</div><div><small>Winner</small><b>'+E(H.winner)+'</b></div></div>'+
 '<p class="c2-g">'+E(H.grade)+'</p></div><div class="c2-foot"><span>↻ See the film</span></div>','c2');
