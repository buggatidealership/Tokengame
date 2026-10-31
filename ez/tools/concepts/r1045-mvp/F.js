/* F, A's certificate in B's arrangement: the certificate's head where B has its green band (title, the highlight in gold foil, No.),
   the story centred, a line of punched holes as the counterfoil's tear line (stock certificates were torn from a stub book), the stub
   with the P&L and each AI's P&L beside it, and at the foot the fine print with the round red seal where B's red band carried the rarity. */
B45.R.f=function(D,uid){var E=B45.E;
 var st=D.strip.map(function(a){return '<span><i class="b45-p">'+B45.mark(a.m)+' '+E(a.m)+'</i><b class="b45-an b45-dp '+(a.ok?'ok':'no')+'">'+E(a.v)+'</b></span>'}).join('');
 return '<i class="a-fr"></i><div class="a-hd"><div class="b45-lb b45-p a-t">★ Certificate of record ★</div><div class="b45-an b45-gold a-k">'+E(D.tag)+'</div><div class="b45-lb b45-p a-no">No. '+B45.no(D.n)+' · '+E(D.date)+'</div></div>'+
 '<div class="b45-sp"></div><div class="f-in"><div class="b45-lb b45-p a-cf">This certifies that</div><h4 class="b45-an b45-h b45-p f-h b45-fit">'+D.h+'</h4><p class="f-dk b45-p">'+E(D.dk)+'</p>'+
 '<p class="f-pu b45-p">'+E(D.pun)+'</p></div><div class="b45-sp"></div>'+
 '<div class="f-pf" aria-hidden="true"></div>'+
 '<div class="f-stub"><div class="f-sl"><span class="b45-lb b45-p">'+E(D.lab)+'</span><span class="f-who b45-p b45-fit">'+E(D.who)+(D.pos?' · '+E(D.pos):'')+'</span><b class="b45-an b45-dp f-big b45-fit '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b><span class="b45-lb b45-p f-cs">'+E(D.cs)+'</span></div>'+
 '<div class="f-sr">'+st+'</div></div>'+
 '<div class="f-ft"><div class="f-fl"><span class="b45-lb b45-p">'+E(D.sim)+'</span><span class="b45-film b45-p">↻ See the '+D.film+'</span></div>'+B45.seal('RARITY ★ $EZ ★ SEASON 1 ★ ',D.rar,'f'+uid,'#a8231a',1)+'</div>'};
