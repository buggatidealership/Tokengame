/* R1 Ticket: the back of the card is the standings' ticket stock: a green band with the round knocked out of the ink, the dates in
   printed boxes, the four calls as printed lines (rank in red ink, the mark printed, the call in the direction's ink), the market's
   close in a double frame, and a red rubber stamp, GRADED with the date, struck across the dates at an angle */
var D=R37.recData(),E=R37.esc;
var rows=D.rows.map(function(r){return '<div class="t1-r '+r.st+'"><b class="rk">'+E(r.rk)+'</b><span class="r37mk">'+r.svg+'</span><span class="nm">'+E(r.n)+'</span>'+(r.st==='win'?'<i class="wn">Winner</i>':'')+'<span class="cl '+(r.call.indexOf('▲')>-1?'r37up':'r37dn')+'">'+E(r.call)+'</span></div>'}).join('');
R37.over(D.face,'<div class="t1-band"><span>Round '+D.n+' · '+E(D.co)+'</span></div>'+
 '<div class="t1-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<p class="t1-sec">What they predicted</p><div class="t1-rows">'+rows+'</div>'+
 '<div class="t1-out"><small>Market close</small><b class="'+(D.a<0?'r37dn':'r37up')+'">'+(D.a<0?'▼ ':'▲ ')+Math.abs(D.a).toFixed(2)+'%</b></div>'+
 '<div class="t1-foot"><span>↻ See the film</span></div>'+
 R37.stamp({c:'#b3261c',date:D.graded.toUpperCase()+' 2026',rot:-12,cls:'t1-st'}),'t1');
