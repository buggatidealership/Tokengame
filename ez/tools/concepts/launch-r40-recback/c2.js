/* C2 Inspection stamps: white butcher paper and one purple ink, as on a meat grader's shield (the USDA grade shield; its ink colour is
   from memory, not checked). Each AI's call gets the grader's shield struck beside it: PASSED for the right way (the winner's shield
   carries a star), REJECTED for the wrong way; the dates are stamped at the foot */
var D=window.__r40D,E=R40.esc,k=0;
var sh=function(x){var C=x.ok?'#5b2a86':'#b3261c',t=x.ok?'PASSED':'REJECT',r=(++k%2?-7:5);
 return '<svg class="c2-sh" style="--r:'+r+'deg" viewBox="0 0 40 40" aria-hidden="true"><g fill="none" stroke="'+C+'" stroke-width="1.6"><path d="M20 3 L35 8 L33 24 Q30 33 20 37 Q10 33 7 24 L5 8 Z"/></g>'+
 '<text x="20" y="'+(x.win?17:22)+'" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="'+(x.ok?8.5:7.8)+'" fill="'+C+'">'+t+'</text>'+(x.win?'<text x="20" y="29" text-anchor="middle" font-size="8" fill="'+C+'">★ #1</text>':x.ok?'<text x="20" y="31" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="5.5" fill="'+C+'">#'+x.rk+'</text>':'')+'</svg>'};
R40.over(D.face,'<div class="c2-hd"><b>Inspected</b><small>$EZ grading · Est. '+D.n+'</small></div>'+
 D.rows.map(function(x){return '<div class="c2-r"><span class="r40mk">'+x.svg+'</span><span class="c2-n">'+E(x.n)+'</span><span class="c2-c '+(x.up?'up':'dn')+'">'+E(x.call)+'</span>'+sh(x)+'</div>'}).join('')+
 '<div class="c2-out"><small>Weighed at<br>the close</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(D.film?'<p class="c2-fl">↻ See the film</p>':'')+
 '<div class="c2-ds"><span class="c2-dt">FILED '+E(D.called).toUpperCase()+'</span><span class="c2-dt">GRADED '+E(D.graded).toUpperCase()+'</span></div>','c2');
