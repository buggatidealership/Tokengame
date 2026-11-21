/* C1 Subgrades: a Beckett-style back. The market's close is the gold strip on top (the answer everyone was graded against), the four
   AIs are the four subgrade boxes (call, then why: Winner and how far off, How far off, or Wrong way), the dates and a blind seal at the foot */
var D=window.__r40D,E=R40.esc;
var box=function(x){return '<div class="c1-b '+(x.win?'win':x.ok?'ok':'no')+'"><span class="r40mk">'+x.svg+'</span><span class="c1-n">'+E(x.n)+'</span><span class="c1-c '+(x.up?'up':'dn')+'">'+E(x.call)+'</span><span class="c1-v">'+(x.win?'★ Winner · '+x.off.toFixed(2)+'% off':x.ok?'#'+x.rk+' · '+x.off.toFixed(2)+'% off':'✗ Wrong way')+'</span></div>'};
var seal=R40.stamp({c:'#d9a92a',mid:'$EZ',ms:20,top:'GRADING OFFICE',bot:'SEASON 1',rot:0}).replace('class="r40stamp ','class="c1-seal ');
R40.over(D.face,'<div class="c1-mk"><small>Market close</small><b>'+E(D.move)+'</b></div><p class="c1-sub">Subgrades · how each AI called it</p>'+
 '<div class="c1-g">'+D.rows.map(box).join('')+'</div>'+(D.film?'<p class="c1-fl">↻ See the film</p>':'')+
 '<div class="c1-ft"><span>Filed<b>'+E(D.called)+'</b></span><span>Graded<b>'+E(D.graded)+'</b></span>'+seal+'</div>','c1');
