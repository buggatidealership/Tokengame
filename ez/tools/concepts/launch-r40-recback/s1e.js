/* S1·E inspection sheet: green ledger paper, the band in the brand's green, every AI ticked under PASS or REJECT with the totals under
   the columns (how many got the direction), today's crown + Winner on the winning row, the approval stamp at the foot, left */
var D=window.__r40D,E=R40.esc,M=R41;
var tk=function(ok){var id='et'+Math.random().toString(36).slice(2,7);return '<svg class="e-tk" viewBox="0 0 14 14" aria-hidden="true"><defs>'+M.worn(id,2,7)+'</defs><g filter="url(#'+id+')">'+(ok?'<path d="M2.4 7.6 5.6 11 11.8 2.6" fill="none" stroke="#1f6b3f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M3 3l8 8M11 3l-8 8" fill="none" stroke="#a8231a" stroke-width="2.2" stroke-linecap="round"/>')+'</g></svg>'};
var v=function(x){return '<span class="e-bx">'+(x.ok?tk(1):'')+'</span><span class="e-bx">'+(x.ok?'':tk(0))+'</span>'};
R40.over(D.face,'<div class="e-band"><b>$EZ Grading Office</b><small>'+M.rep(D)+'</small></div>'+
 '<div class="e-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<div class="e-hd"><span>Inspection: direction</span><span>Pass</span><span>Reject</span></div>'+
 '<div class="e-rows">'+M.rows(D,'e',{crown:'tag',v:v})+'</div>'+
 '<div class="e-tot"><span>Total</span><b class="ok">'+D.hit+'</b><b class="no">'+(D.nc-D.hit)+'</b></div>'+
 '<div class="e-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="e-vf"><span>Verify: earningszn.xyz/#/round/'+D.n+'</span><span>Inspector: the market close</span></p>'+(D.film?'<p class="e-ft">↻ See the film</p>':'')+
 R40.stamp({c:'#a8231a',top:'$EZ GRADING OFFICE',bot:'DON’T TRUST · TRACK',mid:'GRADED',ms:14,date:D.graded.toUpperCase()+' 2026',rot:10,cls:'e-st',seed:3}),'e');
