/* R2 Card back: the back of a vintage trading card, grey-brown board printed in two inks (black and red): a red title bar with the
   company knocked out, the round line, a stat table (rank, AI, call, right way), the close, one line of trivia worked out from the
   data, and a green ink stamp */
var D=R37.recData(),E=R37.esc;
var w=D.rows.filter(function(r){return r.st==='win'})[0];
var off=w?Math.abs(Math.abs(parseFloat(w.call.replace(/[^\d.]/g,'')))-Math.abs(D.a)).toFixed(2):null;
var rows=D.rows.map(function(r){var ok=r.st==='win'||r.st==='ok';return '<tr class="'+r.st+'"><td class="rk">'+E(r.rk)+'</td><td class="nm">'+E(r.n)+'</td><td class="cl">'+E(r.call)+'</td><td class="ok">'+(ok?'✓':'✗')+'</td></tr>'}).join('');
R37.over(D.face,'<div class="t2-bar"><b>'+E(D.co)+'</b><small>'+E(D.tk)+' · Round '+D.n+'</small></div>'+
 '<p class="t2-ln">Called '+E(D.called)+' · Graded '+E(D.graded)+'</p>'+
 '<table class="t2-tb"><thead><tr><th>Rk</th><th>AI</th><th>Call</th><th>Way</th></tr></thead><tbody>'+rows+'</tbody></table>'+
 '<div class="t2-close"><span>Market close</span><b class="'+(D.a<0?'r37dn':'r37up')+'">'+(D.a<0?'▼':'▲')+Math.abs(D.a).toFixed(2)+'%</b></div>'+
 (w?'<p class="t2-fact"><b>Did you know?</b> '+E(w.n)+' called '+E(w.call)+' and the stock moved '+Math.abs(D.a).toFixed(2)+'%. Only '+off+'% off.</p>':'')+
 '<div class="t2-foot">↻ See the film</div>'+
 R37.stamp({c:'#1f7a46',date:D.graded.toUpperCase()+' 2026',rot:10,cls:'t2-st',seed:9}),'t2');
