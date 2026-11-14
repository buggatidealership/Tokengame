/* S1·C winner in gold: white card stock, the office name foil-stamped into the black band, the winning row hot-foil stamped whole (crown,
   rank, name, call, Winner), PASS / FAIL as solid ink blocks, a gold foil seal at the top corner like a certificate's */
var D=window.__r40D,E=R40.esc,M=R41;
var v=function(x,i){return M.mini({shape:'solid',word:x.ok?'PASS':'FAIL',c:x.ok?'#1f7a45':'#b3261c',k:'#f7f3ea',rot:0,seed:i+11,w:30,h:13,fs:7.6,ls:.9,wf:.35})};
var seal=(function(){var id='cs'+Date.now(),p='';for(var i=0;i<48;i++){var a=i/48*Math.PI*2,r=i%2?44:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
  return '<svg class="c-seal" viewBox="0 0 100 100" aria-label="Graded seal" role="img"><defs>'+M.gold(id+'g')+'<path id="'+id+'t" d="M 20,50 A 30,30 0 0 1 80,50"/><path id="'+id+'b" d="M 18,50 A 32,32 0 0 0 82,50"/></defs>'+
  '<path d="'+p+'" fill="url(#'+id+'g)"/><circle cx="50" cy="50" r="38" fill="none" stroke="#9a6a12" stroke-width="1" opacity=".7"/><circle cx="50" cy="50" r="27" fill="none" stroke="#9a6a12" stroke-width=".7" opacity=".7"/>'+
  '<g fill="#7a520c" opacity=".85"><text font-family="Archivo, sans-serif" font-weight="900" font-size="7.4" letter-spacing="1.2"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">$EZ GRADING</textPath></text>'+
  '<text font-family="Archivo, sans-serif" font-weight="900" font-size="6.8" letter-spacing="1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">SEASON 1</textPath></text>'+
  '<text x="50" y="49" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="12" letter-spacing=".6">GRADED</text><text x="50" y="60" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="7">'+E(D.graded.toUpperCase())+'</text></g></svg>'})();
R40.over(D.face,'<div class="c-band"><b class="r41f">$EZ Grading Office</b><small>'+M.rep(D)+'</small></div>'+seal+
 '<div class="c-ds"><div><small>Calls filed</small><b>'+E(D.called)+'</b></div><div><small>Graded</small><b>'+E(D.graded)+'</b></div></div>'+
 '<p class="c-sec"><span>What they predicted</span></p><div class="c-rows">'+M.rows(D,'c',{crown:'gold',v:v})+'</div>'+
 '<div class="c-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
 '<p class="c-tl"><b class="ok">'+D.hit+' pass</b><b class="no">'+(D.nc-D.hit)+' fail</b></p><p class="c-vf">Verify: earningszn.xyz/#/round/'+D.n+'</p>'+(D.film?'<p class="c-ft">↻ See the film</p>':''),'c');
/* the winning row in foil: every piece of it */
[].forEach.call(document.querySelectorAll('.c .c-r.win .c-rk,.c .c-r.win .c-nm,.c .c-r.win .c-cl,.c .c-r.win .c-wn'),function(e){e.classList.add('r41fd')});
