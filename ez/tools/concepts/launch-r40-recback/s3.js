/* S3 Certificate stock: bank-note green with a guilloche rosette over the whole back, a printed gold double frame, the winner's name
   in gold foil, and a gold foil seal of the office in the corner */
var D=window.__r40D,E=R40.esc;
var seal=R40.stamp({c:'#e3b13a',mid:'$EZ',ms:20,top:'OFFICIAL GRADE',bot:'SEASON 1',rot:0}).replace('class="r40stamp ','class="s3-seal ');
R40.over(D.face,R40.guil(0,0,'#9fd8b4',.3)+'<p class="s3-hd">★ Certificate of grading ★</p>'+
 '<div class="s3-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<div class="s3-rows">'+R40rows(D,'s3')+'</div>'+
 '<div class="s3-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(D.film?'<p class="s3-ft">↻ See the film</p>':'')+seal,'s3');
