var F=R38F,E=R38.esc,H=window.__r38H;
var cs=function(k){return '<div class="r38c">'+F[k].calls.map(function(c){return '<span class="'+(c.ok?'ok':'no')+'"><b>'+E(c.m)+'</b><span>'+E(c.v)+' <i>'+(c.ok?'✓':'✗')+'</i></span></span>'}).join('')+'</div>'};
var mh=function(dt){return '<div class="qmh"><b>The $EZ Tape</b><i>Extra</i><small>'+E(dt)+'</small></div>'};
var C={
 bull:function(){var b=F.bull;return mh(b.date)+'<h4>'+E(b.m)+' calls it <em>to the decimal</em></h4>'+
  '<p class="qdk">Said '+E(b.co)+' '+E(b.call)+'. It '+b.moved+' '+E(b.actAbs)+'%.</p>'+
  '<p class="qbd">A typical call this season misses by <b>'+F.med+'%</b>. '+E(b.m)+' missed by <b>'+b.off+'%</b>. About '+b.x+' times closer. '+E(b.rivals.join(' and '))+' bet it would go the other way. They would like to be left alone.</p>'+cs('bull')+R38.rar('1 in '+b.odds)},
 tight:function(){var t=F.tight;return mh(t.date)+'<h4>Four AIs, <em>one brain</em></h4>'+
  '<p class="qdk">All four said '+E(t.co)+' would '+t.dir+'. It '+t.moved+' '+t.act+'%.</p>'+
  '<p class="qbd">Nobody missed by more than <b>'+t.max+'%</b>. A right call usually misses by '+F.avgRight+'%. This table averaged <b>'+t.avg+'%</b>. '+E(t.win)+' won it by <b>'+t.margin+'%</b>. '+E(t.run)+' is filing an appeal.</p>'+cs('tight')+R38.rar('1 in '+t.odds)},
 big:function(){var g=F.big;return mh(g.date)+'<h4>'+E(g.co)+' <em>fools</em> everyone</h4>'+
  '<p class="qdk">All four said down. It '+g.moved+' '+g.act+'%.</p>'+
  '<p class="qbd">The biggest move of the season, '+g.x+' times a normal one. '+(g.worst?'The four worst calls of the season, all in one afternoon. ':'')+E(g.hiM)+' missed by <b>'+g.hi+'%</b>. Thinking alone, all four would whiff together 1 round in '+g.indep+'. They have done it '+g.none4+' times in '+g.four+'. Herd mentality.</p>'+cs('big')+R38.rar('1 in '+g.odds)}};
H.push(['a',C]);
