var F=R38F,E=R38.esc,H=window.__r38H;
var hd=function(dt,n){return '<div class="qhd"><b>$EZ WIRE</b><small>Telegram · '+E(dt)+' · Round '+n+'</small></div>'};
var tp=function(a){return '<div class="qtp">'+a.map(function(s){return '<span>'+s+' <em>STOP</em></span>'}).join('')+'</div>'};
var up=function(s){return E(s).toUpperCase()};
var C={
 bull:function(){var b=F.bull;return hd(b.date,b.n)+'<span class="qfl">Flash</span>'+tp([up(b.m)+' CALLS '+up(b.co)+' '+(b.dir==='fall'?'DOWN':'UP')+' '+b.callAbs,up(b.co)+' '+(b.moved==='fell'?'FALLS':'RISES')+' '+b.actAbs,'MISS '+b.off+' PCT','TYPICAL MISS '+F.med,up(b.rivals.join(' and '))+' SAID '+(b.dir==='fall'?'UP':'DOWN'),up(b.zero.join(' and '))+' STILL ZERO BULLSEYES','NOBODY TELL THEM'])+
  '<p class="qft">'+b.count+' bullseyes in '+F.calls+' calls</p>'+R38.rar('1 in '+b.odds)},
 tight:function(){var t=F.tight;return hd(t.date,t.n)+'<span class="qfl">Flash</span>'+tp(['ALL FOUR SAY '+up(t.co)+' '+(t.dir==='fall'?'DOWN':'UP'),up(t.co)+' '+(t.moved==='fell'?'FALLS':'RISES')+' '+t.act,'AVG MISS '+t.avg,up(t.win)+' BEATS '+up(t.run)+' BY '+t.margin,'GRADED PRISTINE 10','ONLY '+t.pristine+' IN '+F.rounds+' ROUNDS',''+up(t.run)+' DEMANDS RECOUNT'])+
  '<p class="qft">Normal right call misses by '+F.avgRight+'%</p>'+R38.rar('1 in '+t.odds)},
 big:function(){var g=F.big;return hd(g.date,g.n)+'<span class="qfl">Flash</span>'+tp(['ALL FOUR SAY '+up(g.co)+' DOWN',up(g.co)+' '+(g.up?'UP ':'DOWN ')+g.act,'BIGGEST MOVE OF SEASON',(g.worst?'FOUR WORST CALLS OF SEASON':up(g.hiM)+' OFF BY '+g.hi),up(g.hiM)+' OFF BY '+g.hi,'NO SURVIVORS'])+
  '<p class="qft">All four wrong together: '+g.none4+' of '+g.four+' rounds</p>'+R38.rar('1 in '+g.odds)}};
H.push(['d',C]);
