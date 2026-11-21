/* G, A2 and F morphed (owner's arrows on A2 and F): A2's head and story (left-aligned), then F's punch line centred between dotted rules,
   then F's stub: the P&L big on the left with its label, the other AIs' P&L as a list on the right; then A2's fine print and seal.
   The combined box has no "All 4 AIs · <ticker>" line (as A3); the Bullseye's single-AI stub keeps "Kimi · Long Novartis". */
B45.R.g=function(D,uid){var E=B45.E;
 var st=D.strip.map(function(a){return '<span><i class="b45-p">'+B45.mark(a.m)+' '+E(a.m)+'</i><b class="b45-an b45-dp '+(a.ok?'ok':'no')+'">'+E(a.v)+'</b></span>'}).join('');
 return '<i class="a-fr"></i><div class="a-hd"><div class="b45-lb b45-p a-t">★ Certificate of record ★</div><div class="b45-an b45-gold a-k">'+E(D.tag)+'</div><div class="b45-lb b45-p a-no">No. '+B45.no(D.n)+' · '+E(D.date)+'</div></div>'+
 '<div class="a-bd"><div class="b45-lb b45-p a-cf">This certifies that</div><h4 class="b45-an b45-h b45-p a-h b45-fit">'+D.h+'</h4><p class="a-dk b45-bc b45-p">'+E(D.dk)+'</p></div><div class="b45-sp"></div>'+
 '<p class="g-pu b45-p">'+E(D.pun)+'</p><div class="b45-sp"></div>'+
 '<div class="f-stub"><div class="f-sl"><span class="b45-lb b45-p">'+E(D.lab)+'</span>'+(D.star?'<span class="f-who b45-p b45-fit">'+E(D.who)+' · '+E(D.pos)+'</span>':'')+'<b class="b45-an b45-dp f-big b45-fit '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b></div>'+
 '<div class="f-sr">'+st+'</div></div><div class="b45-sp"></div>'+
 '<div class="a-ft"><div class="a-fl"><span class="b45-lb b45-p">'+E(D.cs)+'</span><span class="b45-lb b45-p a-sim">'+E(D.sim)+'</span><span class="b45-film b45-p">↻ See the '+D.film+'</span></div>'+B45.seal('RARITY ★ $EZ ★ SEASON 1 ★ ',D.rar,'g'+uid,'#a8231a',1)+'</div>'};
