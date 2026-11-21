var F=R38F,E=R38.esc,H=window.__r38H;
var rw=function(k,v,c){return '<div class="qrw"><b>'+E(k)+'</b><span class="qv '+(c||'')+'">'+v+'</span></div>'};
var all=function(x){return x.calls.map(function(c){return rw(c.m,E(c.v)+' '+(c.ok?'✓':'✗'),c.ok?'ok':'no')}).join('')};
var C={
 bull:function(){var b=F.bull;return '<div class="qhd">$EZ Book<small>Slip No. '+b.n+' · '+E(b.date)+'</small></div><div class="qbx">'+
  '<p class="qsel">SELECTION: '+E(b.m).toUpperCase()+', '+E(b.tk)+' TO '+b.dir.toUpperCase()+' '+E(b.callAbs)+'%</p>'+
  rw('Result',E(b.co)+' '+b.moved+' '+b.actAbs+'%')+rw('Margin',b.off+'%')+rw('Typical miss',F.med+'%')+rw('Odds','1 in '+b.odds)+
  '<p class="qln">'+E(b.rivals.join(' and '))+' backed the other horse. '+E(b.zero.join(' and '))+': no bullseye yet. The bookie has asked '+E(b.m)+' to leave.</p>'+
  '<span class="qst qg">Paid</span><p class="qft">'+b.count+' of '+F.calls+' calls landed this close</p>'+R38.rar('1 in '+b.odds)+'</div>'},
 tight:function(){var t=F.tight;return '<div class="qhd">$EZ Book<small>Slip No. '+t.n+' · '+E(t.date)+'</small></div><div class="qbx">'+
  '<p class="qsel">4 SELECTIONS: '+E(t.co).toUpperCase()+' TO '+t.dir.toUpperCase()+'. RESULT: '+t.moved.toUpperCase()+' '+t.act+'%</p>'+all(t)+
  rw('Winner',E(t.win)+' by '+t.margin+'%')+
  '<p class="qln">Four bets, four winners, nobody more than '+t.max+'% out. Graded Pristine, '+t.pristine+' of '+F.rounds+' rounds. The bookie is considering early retirement.</p>'+
  '<span class="qst qg">Paid ×4</span>'+R38.rar('1 in '+t.odds)+'</div>'},
 big:function(){var g=F.big;return '<div class="qhd">$EZ Book<small>Slip No. '+g.n+' · '+E(g.date)+'</small></div><div class="qbx">'+
  '<p class="qsel">4 SELECTIONS: '+E(g.co).toUpperCase()+' DOWN. RESULT: '+(g.up?'UP ':'DOWN ')+g.act+'%</p>'+all(g)+
  rw('Missed by',g.lo+' to '+g.hi+'%')+
  '<p class="qln">The four worst slips of the season, one window. The house thanks all four AIs for their generous donation.</p>'+
  '<span class="qst">Lost ×4</span>'+R38.rar('1 in '+g.odds)+'</div>'}};
H.push(['b',C]);
