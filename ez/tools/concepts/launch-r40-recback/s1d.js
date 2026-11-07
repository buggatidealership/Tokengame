/* S1·D hallmark: an homage to silver hallmarks (since 1300 an assay office, not the maker, tested the metal and struck its marks in a row).
   Here: the office ($EZ), the standard (2/4 right on direction), the winner's crown, the date letter (the round), struck into grey board;
   PASS / FAIL struck in clipped-corner cartouches like the marks; crown only for the winner */
var D=window.__r40D,E=R40.esc,M=R41;
var v=function(x,i){return M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?'#1f6b3f':'#a8231a',rot:0,seed:i+21,w:32,h:15,fs:8,wf:1.2})};
var hm=(function(){var id='hm'+Date.now(),c='#1b181c',cr='M5.2 13.6 4 4.6l5 4L13 .8l4 7.8 5-4-1.2 9z M5.4 15h15.2v2.6H5.4z';
  function g(x,shape,inner){var s;if(shape==='oval')s='<ellipse cx="'+(x+15)+'" cy="13" rx="14" ry="11" fill-opacity=".1" stroke-width="1.6"/>';else if(shape==='oct')s='<path d="M'+(x+5)+' 2H'+(x+25)+'L'+(x+29)+' 6V20L'+(x+25)+' 24H'+(x+5)+'L'+(x+1)+' 20V6Z" fill-opacity=".1" stroke-width="1.6"/>';else if(shape==='rnd')s='<rect x="'+(x+1)+'" y="2" width="28" height="22" rx="7" fill-opacity=".1" stroke-width="1.6"/>';else s='<path d="M'+(x+1)+' 2H'+(x+29)+'V24H'+(x+1)+'Z" fill-opacity=".1" stroke-width="1.6"/>';return s+inner}
  var t=function(x,y,s,f,fs){return '<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+(f||'Anton, Impact, sans-serif')+'" font-size="'+(fs||10)+'" stroke="none">'+s+'</text>'};
  return '<svg class="d-hm" viewBox="0 0 134 26" aria-label="Hallmarks: $EZ office, '+D.hit+' of '+D.nc+' right, the winner, round '+D.n+'" role="img"><defs>'+M.worn(id,1.4,13)+'</defs><g filter="url(#'+id+')" fill="'+c+'" stroke="'+c+'">'+
   g(0,'oct',t(15,17,'$EZ',0,10))+g(35,'oval',t(50,17,D.hit+'/'+D.nc,0,10.5))+g(70,'rnd','<path transform="translate(72,4) scale(1)" d="'+cr+'" stroke="none"/>')+g(105,'sq',t(120,17,'R'+D.n,0,10))+'</g></svg>'})();
R40.over(D.face,'<div class="d-band"><b>$EZ Grading Office</b><small>'+M.rep(D)+'</small></div>'+
 '<div class="d-hmw">'+hm+'<p>Tested by the market, not the maker.</p></div>'+
 '<p class="d-dt"><span>Filed <b>'+E(D.called)+'</b></span><span>Graded <b>'+E(D.graded)+'</b></span></p>'+
 '<div class="d-rows">'+M.rows(D,'d',{crown:'only',v:v})+'</div>'+
 '<div class="d-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="d-vf">Verify: earningszn.xyz/#/round/'+D.n+'</p>'+(D.film?'<p class="d-ft">↻ See the film</p>':''),'d');
