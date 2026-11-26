/* C, Card back: a 1950s trading card's back (Topps from 1957: a card number in a printed badge, a bio, a stat line, the rarity star
   bottom right), printed in two inks, red and black, on the same stock. The headline is knocked out of a red ink panel, the deck and
   punch line are the bio, the calls and each AI's P&L on the call are the stat table, the star of the card on a yellow ink tint. */
B45.R.c=function(D,uid){var E=B45.E;
 var rows=D.acct.map(function(a){return '<tr class="'+(a.star?'c-star':'')+'"><td class="c-ai b45-p">'+B45.mark(a.m)+' '+E(a.m)+'</td><td class="b45-an b45-p c-cl">'+E(a.v)+'</td><td class="c-ok b45-p '+(a.ok?'ok':'no')+'">'+(a.ok?'✓':'✗')+'</td><td class="b45-an c-pl '+(/^\+/.test(a.pl)?'ok':'no')+'"><span class="b45-dp">'+E(a.pl)+'</span></td></tr>'}).join('');
 var tot=D.star?'':'<tr class="c-tot"><td class="b45-lb b45-p" colspan="3">'+E(D.lab)+'</td><td class="b45-an c-pl '+(D.pos0?'ok':'no')+'"><span class="b45-dp">'+E(D.big)+'</span></td></tr>';
 return '<div class="c-top"><div class="c-no b45-stp"><span class="b45-lb">No.</span><b class="b45-an">'+E(D.n)+'</b></div><div class="c-id"><b class="b45-an b45-p c-k">'+E(D.tag)+'</b><span class="b45-lb b45-p c-co">'+E(D.co)+' · '+E(D.date)+'</span><span class="b45-lb c-gr b45-p">'+E(D.ds)+' '+E(D.gr)+'</span></div></div>'+
 '<div class="c-hp b45-stp"><h4 class="b45-an b45-h b45-ko c-h b45-fit">'+D.h+'</h4></div>'+
 '<p class="c-bio b45-p">'+E(D.dk)+' <b>'+E(D.pun)+'</b></p><div class="b45-sp"></div>'+
 '<table class="c-tb"><thead><tr class="b45-stp"><th class="b45-lb b45-ko">AI</th><th class="b45-lb b45-ko">Call</th><th></th><th class="b45-lb b45-ko">P&amp;L</th></tr></thead><tbody>'+rows+tot+'</tbody></table>'+
 '<div class="c-mv b45-lb b45-p">'+E(D.cs)+'</div><div class="b45-sp"></div>'+
 '<div class="c-ft"><div class="c-fl"><span class="b45-lb b45-p">'+E(D.sim)+'</span><span class="b45-film b45-p">↻ See the '+D.film+'</span></div><div class="c-rar b45-stp"><b>★</b><span class="b45-an">'+E(D.rar)+'</span></div></div>'};
