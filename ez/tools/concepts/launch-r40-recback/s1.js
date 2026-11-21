/* S1 Grading report: printed office band and report number, the dates in printed fields, a blue approval seal (milled rim, the office
   round the rim) struck across them, the calls as a printed table, the outcome in a double frame, a verify line like PSA and GIA reports */
var D=window.__r40D,E=R40.esc;
R40.over(D.face,'<div class="s1-band"><b>$EZ Grading Office</b><small>Report No. '+String(D.n).padStart(4,'0')+'</small></div>'+
 '<div class="s1-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<p class="s1-sec">What they predicted</p><div class="s1-rows">'+R40rows(D,'s1')+'</div>'+
 '<div class="s1-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="s1-vf"><span>Verify: earningszn.xyz/#/round/'+D.n+'</span><span>Grader 04</span></p>'+(D.film?'<p class="s1-ft">↻ See the film</p>':'')+
 R40.stamp({c:'#2b3f9e',mid:'APPROVED',date:D.graded.toUpperCase()+' 2026',rot:-14,cls:'s1-st'}),'s1');
