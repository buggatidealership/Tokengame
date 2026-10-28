/* B, Admit one: the bet ticket's language (green head band and red foot band with their words knocked out of the ink, scalloped
   sides, a row of punched holes). The story on the ticket, the P&L on its stub under the perforation, "Admit one" and the rarity
   in the red band. */
B45.R.b=function(D,uid){var E=B45.E;
 var st=D.strip.map(function(a){return '<span><i class="b45-p">'+E(a.m)+'</i><b class="b45-an b45-dp '+(a.ok?'ok':'no')+'">'+E(a.v)+'</b></span>'}).join('');
 return '<div class="b-band b-g"><span class="b45-an b45-ko b-k">★ '+E(D.tag)+' ★</span><span class="b45-lb b45-ko">Round '+E(D.n)+'</span></div>'+
 '<div class="b45-sp"></div><div class="b-in"><div class="b45-lb b45-p b-ev">$EZ Season 1 · Graded '+E(D.date)+'</div><h4 class="b45-an b45-h b45-p b-h b45-fit">'+D.h+'</h4><p class="b-dk b45-p">'+E(D.dk)+'</p>'+
 '<p class="b-pu b45-p">'+E(D.pun)+'</p></div><div class="b45-sp"></div>'+
 '<div class="b-pf" aria-hidden="true"></div>'+
 '<div class="b-stub"><div class="b-sl"><span class="b45-lb b45-p">'+E(D.lab)+'</span><span class="b-who b45-p">'+E(D.who)+(D.pos?' · '+E(D.pos):'')+'</span><b class="b45-an b45-dp b-big '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b><span class="b45-lb b45-p b-cs">'+E(D.cs)+'</span></div>'+
 '<div class="b-sr"><span class="b45-lb b45-p b-nb">No</span><span class="b45-an b45-p b-sn">'+('000000'+D.n).slice(-6)+'</span><span class="b-st">'+st+'</span></div></div>'+
 '<div class="b-fine b45-lb b45-p"><span>'+E(D.sim)+'</span><span class="b45-film">↻ See the '+D.film+'</span></div>'+
 '<div class="b-band b-r"><span class="b45-lb b45-ko">Admit one</span><span class="b45-an b45-ko b-rar">★ '+E(D.rar)+'</span></div>'};
