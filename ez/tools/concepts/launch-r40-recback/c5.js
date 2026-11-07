/* C5 Certificate of authenticity: like a PSA or GIA cert you can look up. Security-printed paper with a fine line screen and a green
   double frame, a cert number and the address to verify it, the calls as a register with dotted leaders, the market's close, the
   grader's signature in ink and a holographic $EZ sticker */
var D=window.__r40D,E=R40.esc;
R40.over(D.face,'<div class="c5-hd"><b>Certificate of authenticity</b><small>Cert No. 2026-'+String(D.n).padStart(4,'0')+'<br>Verify at earningszn.xyz/#/round/'+D.n+'</small></div>'+
 '<div class="c5-reg">'+D.rows.map(function(x){return '<p class="c5-l'+(x.win?' win':'')+'"><b>'+E(x.n)+'</b><i></i><span class="'+(x.up?'up':'dn')+'">'+E(x.call)+'</span><span>'+(x.win?'★ Winner':x.ok?'#'+x.rk:'✗ Wrong way')+'</span></p>'}).join('')+'</div>'+
 '<div class="c5-out"><small>Market close</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(D.film?'<p class="c5-fl">↻ See the film</p>':'')+
 '<div class="c5-sg"><span><em>A. Grader</em>Calls filed '+E(D.called)+'<br>Graded '+E(D.graded)+'</span><span class="c5-holo">$EZ</span></div>','c5');
