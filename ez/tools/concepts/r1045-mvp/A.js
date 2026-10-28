/* A, Certificate of record: the record's certificate's sibling. Same stock, gold double frame, title and No., then the record itself:
   "This certifies that" + the headline, the deck, the P&L in the Market box's double rule, the rest of the table as ledger lines,
   the punch line as Remarks, and the rarity as the office's round rubber stamp at the foot (where the certificate's holo stamp sits). */
B45.R.a=function(D,uid){var E=B45.E;
 var st=D.strip.map(function(a){a.pl=a.v;return '<span class="a-sr"><span class="a-sn b45-p">'+B45.mark(a.m)+' '+E(a.m)+'</span><b class="b45-an b45-dp '+(/^\+/.test(a.pl)?'ok':'no')+'">'+E(a.pl)+'</b></span>'}).join('');
 return '<i class="a-fr"></i><div class="a-hd"><div class="b45-lb b45-p a-t">★ Certificate of record ★</div><div class="b45-an b45-gold a-k">'+E(D.tag)+'</div><div class="b45-lb b45-p a-no">No. '+B45.no(D.n)+' · '+E(D.date)+'</div></div>'+
 '<div class="a-bd"><div class="b45-lb b45-p a-cf">This certifies that</div><h4 class="b45-an b45-h b45-p a-h b45-fit">'+D.h+'</h4><p class="a-dk b45-bc b45-p">'+E(D.dk)+'</p></div><div class="b45-sp"></div>'+
 '<div class="a-box"><div class="a-bl"><span class="b45-lb b45-p">'+E(D.lab)+'</span><span class="b45-bc b45-p a-who b45-fit">'+E(D.who)+(D.pos?' · '+E(D.pos):'')+'</span></div><b class="b45-an b45-dp a-big b45-fit '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b></div>'+
 '<div class="a-st">'+st+'</div>'+
 '<div class="b45-sp"></div><p class="a-rm b45-bc b45-p"><span class="b45-lb">Remarks.</span> '+E(D.pun)+'</p><div class="b45-sp"></div>'+
 '<div class="a-ft"><div class="a-fl"><span class="b45-lb b45-p">'+E(D.cs)+'</span><span class="b45-lb b45-p a-sim">'+E(D.sim)+'</span><span class="b45-film b45-p">↻ See the '+D.film+'</span></div>'+B45.seal('RARITY ★ $EZ ★ SEASON 1 ★ ',D.rar.replace(/^1 in /,'1 in '),'a'+uid,'#a8231a',1)+'</div>'};
