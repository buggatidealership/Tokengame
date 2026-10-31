/* D, Press release: the grading office's letterhead (the EZ. logo printed in its four inks, "Earnings Zeason" with its green E and
   red Z, a gold double rule), "For immediate release", the headline, the deck as the standfirst, a dateline and the punch line as
   the lead, the P&L as a ledger with dotted leaders, ### to close, and the rarity struck as a rectangular rubber stamp. */
B45.R.d=function(D,uid){var E=B45.E;
 var led=D.strip.map(function(a){return '<li><span class="b45-p">'+E(a.m)+'</span><i></i><b class="b45-an b45-dp '+(a.ok?'ok':'no')+'">'+E(a.v)+'</b></li>'}).join('');
 return '<div class="d-lh"><span class="d-lg b45-stp">'+B45.logo+'</span><div class="d-nm"><b class="b45-an b45-p"><span class="b45-g">E</span>arnings <span class="b45-r">Z</span>eason</b><span class="b45-lb b45-p">$EZ grading office · Season 1</span></div></div>'+
 '<div class="d-rel"><span class="b45-lb b45-r">For immediate release</span><span class="b45-lb b45-p">Round '+E(D.n)+' · '+E(D.date)+'</span></div>'+
 '<h4 class="b45-an b45-h b45-p d-h b45-fit">'+D.h+'</h4><p class="d-dk b45-p">'+E(D.dk)+'</p>'+
 '<p class="d-lead b45-p"><b class="b45-lb">'+E(D.co)+', '+E(D.date)+'.</b> '+E(D.pun)+'</p><div class="b45-sp"></div>'+
 '<ul class="d-led"><li class="d-top"><span class="b45-p">'+E(D.lab)+(D.star?'<small class="b45-fit">'+E(D.who)+' · '+E(D.pos)+'</small>':'')+'</span><i></i><b class="b45-an b45-dp b45-fit '+(D.pos0?'ok':'no')+'">'+E(D.big)+'</b></li>'+led+'</ul>'+
 '<div class="d-sim b45-lb b45-p">'+E(D.cs)+' · '+E(D.sim)+'</div><div class="b45-sp"></div>'+
 '<div class="d-ft"><div class="d-fl"><b class="b45-an b45-p">###</b><span class="b45-film b45-p">↻ See the '+D.film+'</span></div>'+
 '<svg class="d-stamp b45-stp b45-w2" viewBox="0 0 120 52" aria-hidden="true"><g transform="rotate(-7 60 26)" fill="none" stroke="#a8231a"><rect x="4" y="6" width="112" height="40" rx="3" stroke-width="3"/><rect x="8.5" y="10.5" width="103" height="31" rx="1.5" stroke-width="1.2"/></g>'+
 '<g transform="rotate(-7 60 26)" fill="#a8231a" text-anchor="middle" text-rendering="geometricPrecision"><text x="60" y="22" font-family="Archivo,sans-serif" font-style="italic" font-weight="900" font-stretch="62%" font-size="8.5" letter-spacing="2.2">RARITY</text><text x="60" y="37.5" font-family="Anton,Impact,sans-serif" font-size="15" letter-spacing=".6">★ '+E(D.rar).toUpperCase()+'</text></g></svg></div>'};
