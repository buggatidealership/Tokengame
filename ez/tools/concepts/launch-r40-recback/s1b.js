/* S1·B filing cabinet: no office name, only the folder tab "Report No. 0043" on manila; the GRADED date stamp at the top (where received
   and filed stamps go), crown only for the winner, PASS / REJECT as oval inspection marks */
var D=window.__r40D,E=R40.esc,M=R41;
var v=function(x,i){return M.mini({shape:'oval',word:x.ok?'PASS':'REJECT',c:x.ok?'#1f7a45':'#b3261c',rot:[-4,3,-2,4][i],seed:i+5,w:40,h:17,fs:x.ok?8.4:7.4,ls:.5})};
var ds=(function(){var id='bds'+Date.now(),W=84,H=40,c='#b3261c';return '<svg class="b-ds" viewBox="0 0 '+W+' '+H+'" aria-label="Graded '+E(D.graded)+' 2026" role="img"><defs>'+M.worn(id,1.8,9)+'</defs><g filter="url(#'+id+')" fill="'+c+'" stroke="'+c+'">'+
  '<rect x="1" y="1" width="'+(W-2)+'" height="'+(H-2)+'" rx="3" fill="none" stroke-width="1.6"/><path d="M4 13.5H'+(W-4)+'M4 27H'+(W-4)+'" stroke-width=".9"/>'+
  '<text x="'+W/2+'" y="10.6" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="7.4" letter-spacing="1.6" stroke="none">GRADED</text>'+
  '<text x="'+W/2+'" y="24.4" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="10.6" letter-spacing="1" stroke="none">'+E(D.graded.toUpperCase())+' 2026</text>'+
  '<text x="'+W/2+'" y="35.4" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="5.6" letter-spacing=".5" stroke="none">BY THE MARKET CLOSE</text></g></svg>'})();
R40.over(D.face,'<div class="b-top"><span class="b-tab"><b>'+M.rep(D)+'</b></span></div>'+
 '<div class="b-in"><p class="b-co">'+E(D.co)+' ('+E(D.tk)+')</p>'+
 '<div class="b-ds2"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div>'+ds+'</div>'+
 '<p class="b-sec"><span>What they predicted</span><span>Direction</span></p><div class="b-rows">'+M.rows(D,'b',{crown:'only',v:v})+'</div>'+
 '<div class="b-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="b-vf">Verify: earningszn.xyz/#/round/'+D.n+'</p>'+(D.film?'<p class="b-ft">↻ See the film</p>':'')+'</div>','b');
