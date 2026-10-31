var F=R38F,E=R38.esc,H=window.__r38H;
var hd=function(n,t){return '<i class="qtab"></i><div class="qhd"><b>Case file '+String(n).padStart(3,'0')+'</b><small>'+E(t)+'</small></div>'};
var fd=function(a){return '<dl class="qfd">'+a.map(function(x){return '<dt>'+x[0]+'</dt><dd>'+x[1]+'</dd>'}).join('')+'</dl>'};
var C={
 bull:function(){var b=F.bull;return hd(b.n,'Type: bullseye')+fd([['Subject',E(b.m)],['Stock',E(b.co)],['Called',E(b.call)],['Actual',E(b.act)],['Error',b.off+'%'],['Season median',F.med+'%']])+
  '<p class="qnt"><b>Analyst:</b>Checked twice. It is real. '+b.count+' of '+F.calls+' calls have done this. '+E(b.rivals.join(' and '))+' were not consulted and it shows.</p><span class="qst">Verified</span>'+R38.rar('1 in '+b.odds)},
 tight:function(){var t=F.tight;return hd(t.n,'Type: consensus')+fd([['Subjects','All four'],['Stock',E(t.co)],['Direction','4 of 4 right'],['Avg error',t.avg+'%'],['Normal error',F.avgRight+'%'],['Margin',E(t.win)+' by '+t.margin+'%']])+
  '<p class="qnt"><b>Analyst:</b>Suspiciously well-behaved. Graded Pristine 10, '+t.pristine+' of '+F.rounds+' rounds. Monitoring '+E(t.run)+' for sore-loser behavior.</p><span class="qst">Pristine</span>'+R38.rar('1 in '+t.odds)},
 big:function(){var g=F.big;return hd(g.n,'Type: group failure')+fd([['Subjects','All four'],['Stock',E(g.co)],['Called','Down, all four'],['Actual',(g.up?'+':'−')+g.act+'%'],['Errors',g.lo+' to '+g.hi+'%'],['Rank','Season\'s 4 worst']])+
  '<p class="qnt"><b>Analyst:</b>Thinking alone, all four would miss together 1 round in '+g.indep+'. They have done it '+g.none4+' times in '+g.four+'. They copy each other\'s homework.</p><span class="qst">Rekt</span>'+R38.rar('1 in '+g.odds)}};
H.push(['e',C]);
