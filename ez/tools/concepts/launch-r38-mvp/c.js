var F=R38F,E=R38.esc,H=window.__r38H;
var hd=function(n,co){return '<div class="qhd"><span class="qbug">Recap</span><small>Round '+n+' · '+E(co)+'</small></div>'};
var cs=function(k){return '<div class="r38c">'+F[k].calls.map(function(c){return '<span class="'+(c.ok?'ok':'no')+'"><b>'+E(c.m)+'</b><span>'+E(c.v)+' <i>'+(c.ok?'✓':'✗')+'</i></span></span>'}).join('')+'</div>'};
var tt=function(l,lv,lc,r,rv,rc){return '<div class="qtt"><div><small>'+l+'</small><b class="'+lc+'">'+lv+'</b></div><i>vs</i><div><small>'+r+'</small><b class="'+rc+'">'+rv+'</b></div></div>'};
var C={
 bull:function(){var b=F.bull;return hd(b.n,b.co)+'<h4>'+E(b.m)+' by bullseye</h4>'+
  '<p class="qpb">Two corners said up. Two said down. '+E(b.m)+' called <b>'+E(b.call)+'</b>. The bell rang at <b>'+E(b.act)+'</b>. '+E(b.rivals.join(' and '))+' went the wrong way entirely. '+(b.other?E(b.other.m)+' got the direction and still landed '+b.other.off+'% wide.':'')+'</p>'+
  tt(E(b.m)+' missed by',b.off+'%','qgd','Typical miss',F.med+'%','qrd')+cs('bull')+R38.rar('1 in '+b.odds)},
 tight:function(){var t=F.tight;return hd(t.n,t.co)+'<h4>'+E(t.win)+', by a paper cut</h4>'+
  '<p class="qpb">No knockdowns. All four swung '+(t.dir==='fall'?'down':'up')+' and all four landed. '+E(t.win)+' <b>'+t.winOff+'%</b> off, '+E(t.run)+' <b>'+t.runOff+'%</b>. Settled by '+t.margin+'%. A Pristine 10, the best grade there is.</p>'+
  tt('This round, avg miss',t.avg+'%','qgd','Normal right call',F.avgRight+'%','qrd')+cs('tight')+R38.rar('1 in '+t.odds)},
 big:function(){var g=F.big;return hd(g.n,g.co)+'<h4>Nobody. Ref stopped it.</h4>'+
  '<p class="qpb">All four came out swinging down. '+E(g.co)+' '+g.moved+' <b>'+g.act+'%</b> and put the whole card on the canvas. '+(g.worst?'The four worst calls of the season, in one round. ':'')+E(g.hiM)+' went down hardest, <b>'+g.hi+'%</b> off.</p>'+
  tt(E(g.co)+' moved',(g.up?'▲':'▼')+g.act+'%','qrd','Normal move ×',g.x+'x','qgd')+cs('big')+R38.rar('1 in '+g.odds)}};
H.push(['c',C]);
