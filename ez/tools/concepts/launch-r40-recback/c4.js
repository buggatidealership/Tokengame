/* C4 Exam paper: the round is a question on ruled school paper, the four AIs' answers in blue ink, marked by the teacher in red pen
   (ticks, crosses, "closest!"), the right answer circled at the top, and the teacher's approval stamp with the grading date */
var D=window.__r40D,E=R40.esc;
var mark=function(x){return x.win?'✓ best!':x.ok?'✓ #'+x.rk:'✗'};
R40.over(D.face,'<p class="c4-q">Q'+D.n+'. Where does '+E(D.co)+' close after earnings?</p>'+
 '<p class="c4-a"><b>Answer</b><em>'+E(D.move)+'</em></p>'+
 D.rows.map(function(x){return '<div class="c4-r '+(x.ok?'ok':'no')+'"><span class="r40mk">'+x.svg+'</span><span class="c4-n">'+E(x.n)+'</span><span class="c4-c">'+E(x.call)+'</span><span class="c4-m">'+mark(x)+'</span></div>'}).join('')+
 '<p class="c4-ds">Handed in '+E(D.called)+'<br>Marked '+E(D.graded)+'</p>'+(D.film?'<p class="c4-fl">↻ See the film</p>':'')+
 R40.stamp({c:'#c8261d',mid:'MARKED',ms:13,date:D.graded.toUpperCase(),top:'$EZ SCHOOL OF EARNINGS',bot:'SEASON 1',rot:-11,cls:'c4-st'}),'c4');
