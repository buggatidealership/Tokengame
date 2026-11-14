/* R3 Grading slip: the form a card travels with when it is graded: cream form stock with printed blue rules, the details typed on a
   typewriter, the calls as a typed table with ticked boxes, and the grader's red stamp across the signature line */
var D=R37.recData(),E=R37.esc;
var rows=D.rows.map(function(r){var ok=r.st==='win'||r.st==='ok';return '<div class="t3-r"><span class="bx">'+(ok?'✓':'✗')+'</span><span class="nm">'+E(r.n.toUpperCase())+'</span><span class="cl">'+E(r.call)+'</span>'+(r.st==='win'?'<span class="wn">WIN</span>':'<span></span>')+'</div>'}).join('');
R37.over(D.face,'<div class="t3-hd"><span>Grading slip</span><span>No. '+String(D.n).padStart(6,'0')+'</span></div>'+
 '<div class="t3-f"><small>Company</small><b>'+E(D.co.toUpperCase())+' ('+E(D.tk)+')</b></div>'+
 '<div class="t3-f2"><div class="t3-f"><small>Filed</small><b>'+E(D.called.toUpperCase())+'</b></div><div class="t3-f"><small>Graded</small><b>'+E(D.graded.toUpperCase())+'</b></div></div>'+
 '<p class="t3-sec">Calls, closest first</p><div class="t3-rows">'+rows+'</div>'+
 '<div class="t3-f"><small>Market close</small><b class="'+(D.a<0?'r37dn':'r37up')+'">'+(D.a<0?'▼':'▲')+Math.abs(D.a).toFixed(2)+'%</b></div>'+
 '<div class="t3-sig"><span>Grader</span></div><div class="t3-foot">↻ See the film</div>'+
 R37.stamp({c:'#c0281e',date:D.graded.toUpperCase()+' 2026',rot:-7,cls:'t3-st',seed:13}),'t3');
