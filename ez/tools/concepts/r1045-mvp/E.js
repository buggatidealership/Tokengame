/* E, Trade confirmation: the slip a broker sends after a fill, as a printed form on the certificate's stock: "★ Confirmation ★" and
   No., the headline as the memo, then printed fields (account, position, settled, the move), the P&L in the big box, the other
   accounts in a row of fields, the punch line as the note, and SETTLED struck in green (a gain) or red (a loss) PASS ink with the date. */
B45.R.e=function(D,uid){var E=B45.E,mv=(D.cs.match(/moved ([^ ]+)$/)||[])[1]||'',cl=(D.cs.match(/^Called ([^ ]+)/)||[])[1]||'';
 var f=function(l,v,c){return '<div class="e-f'+(c?' '+c:'')+'"><small class="b45-lb b45-p">'+l+'</small><b class="b45-an b45-p b45-fit">'+v+'</b></div>'};
 var oth=D.strip.map(function(a){return '<div class="e-o"><small class="b45-lb b45-p">'+E(a.m)+'</small><b class="b45-an b45-dp '+(a.ok?'ok':'no')+'">'+E(a.v)+'</b></div>'}).join('');
 var col=D.pos0?'#1f6b3f':'#a8231a';
 return '<div class="e-hd"><span class="b45-lb b45-p e-t">★ Trade confirmation ★</span><span class="b45-lb b45-p e-no">No. '+B45.no(D.n)+'</span></div>'+
 '<div class="e-memo"><small class="b45-lb b45-p">Memo · '+E(D.tag)+'</small><h4 class="b45-an b45-h b45-p e-h b45-fit">'+D.h+'</h4><p class="e-dk b45-p">'+E(D.dk)+'</p></div><div class="b45-sp"></div>'+
 '<div class="e-grid">'+f('Account',E(D.who))+f(D.star?'Position':'Market',E(D.pos||D.co))+(cl?f('Called',E(cl)):f('Settled',E(D.date)))+f('Moved',E(mv),/^\+/.test(mv)?'ok':'no')+'</div>'+
 '<div class="e-pl"><small class="b45-lb b45-p">'+(D.star?'Realized P&amp;L':E(D.lab))+'</small><b class="b45-an b45-dp b45-fit '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b></div>'+
 '<div class="e-oth">'+oth+'</div>'+
 '<p class="e-note b45-p"><b class="b45-lb">Note.</b> '+E(D.pun)+'</p><div class="b45-sp"></div>'+
 '<div class="e-ft"><div class="e-fl"><span class="b45-lb b45-p">'+E(D.sim)+'</span><span class="b45-lb b45-p e-rar">★ Rarity '+E(D.rar)+'</span><span class="b45-film b45-p">↻ See the '+D.film+'</span></div>'+
 '<svg class="e-stamp b45-stp b45-w1" viewBox="0 0 110 56" aria-hidden="true"><g transform="rotate(-8 55 28)"><rect x="4" y="5" width="102" height="46" rx="4" fill="none" stroke="'+col+'" stroke-width="3"/>'+
 '<text x="55" y="31" text-anchor="middle" font-family="Anton,Impact,sans-serif" font-size="21" letter-spacing="1.2" fill="'+col+'" text-rendering="geometricPrecision">SETTLED</text>'+
 '<text x="55" y="44" text-anchor="middle" font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="62%" font-size="7.2" letter-spacing="1.1" fill="'+col+'">AT THE CLOSE · '+E(D.date).toUpperCase()+'</text></g></svg></div>'};
