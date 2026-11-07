/* S1·A gold office: S1 as picked, the band in the site's gold, today's crown + Winner (printed), PASS / FAIL stamped per AI, the seal at the foot by the sign-off (where approval seals sit) */
var D=window.__r40D,E=R40.esc,M=R41;
var v=function(x,i){return M.mini({word:x.ok?'PASS':'FAIL',c:x.ok?'#1f7a45':'#b3261c',rot:[-3,2,-1.5,3][i],seed:i+2,w:34,h:15,fs:8})};
R40.over(D.face,'<div class="a-band"><b>$EZ Grading Office</b><small>'+M.rep(D)+'</small></div>'+
 '<div class="a-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<p class="a-sec"><span>What they predicted</span><span>Direction</span></p><div class="a-rows">'+M.rows(D,'a',{crown:'tag',v:v})+'</div>'+
 '<div class="a-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="a-tl"><b class="ok">'+D.hit+' pass</b> · <b class="no">'+(D.nc-D.hit)+' fail</b></p>'+
 '<p class="a-vf"><span>Verify: earningszn.xyz/#/round/'+D.n+'</span><span>Grader: the market close</span></p>'+(D.film?'<p class="a-ft">↻ See the film</p>':'')+
 R40.stamp({c:'#1f7a45',top:'$EZ GRADING OFFICE',bot:'TRACKED · NOT TRUSTED',mid:'VERIFIED',ms:13,date:D.graded.toUpperCase()+' 2026',rot:-12,cls:'a-st',seed:7}),'a');
