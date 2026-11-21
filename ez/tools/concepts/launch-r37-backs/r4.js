/* R4 Ink card: the back printed in reverse, black card with cream ink and the brand's gold as foil (the company, the winner, the
   close); the graded mark as an embossed gold foil seal with a serrated edge instead of an ink stamp */
var D=R37.recData(),E=R37.esc;
var rows=D.rows.map(function(r){return '<div class="t4-r '+r.st+'"><b class="rk">'+E(r.rk)+'</b><span class="r37mk">'+r.svg+'</span><span class="nm">'+E(r.n)+'</span><span class="cl '+(r.call.indexOf('▲')>-1?'r37up':'r37dn')+'">'+E(r.call)+'</span></div>'}).join('');
var seal=(function(){var pts=[];for(var i=0;i<48;i++){var a=i*Math.PI/24,rr=i%2?44:48;pts.push((50+rr*Math.cos(a)).toFixed(1)+','+(50+rr*Math.sin(a)).toFixed(1))}
 return '<svg class="t4-seal" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="t4g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f6dc93"/><stop offset=".35" stop-color="#d9a73a"/><stop offset=".55" stop-color="#fbe8a8"/><stop offset="1" stop-color="#b98321"/></linearGradient>'+
 '<path id="t4a" d="M 18,50 A 32,32 0 0 1 82,50"/></defs><polygon points="'+pts.join(' ')+'" fill="url(#t4g)"/><circle cx="50" cy="50" r="38" fill="none" stroke="rgba(90,55,5,.55)" stroke-width="1.2"/>'+
 '<text font-family="Archivo, sans-serif" font-weight="900" font-size="7.5" letter-spacing="1" fill="rgba(80,48,4,.85)"><textPath href="#t4a" startOffset="50%" text-anchor="middle">$EZ GRADED</textPath></text>'+
 '<text x="50" y="58" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="15" fill="rgba(80,48,4,.9)">'+E(D.graded.toUpperCase())+'</text>'+
 '<text x="50" y="72" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="6.5" letter-spacing=".8" fill="rgba(80,48,4,.85)">SEASON 1</text></svg>'})();
R37.over(D.face,'<div class="t4-hd"><small>Round '+D.n+' · '+E(D.tk)+'</small><b class="fo">'+E(D.co)+'</b><span>Called '+E(D.called)+' · Graded '+E(D.graded)+'</span></div>'+
 '<div class="t4-rows">'+rows+'</div>'+
 '<div class="t4-out"><small>Market close</small><b class="fo">'+(D.a<0?'▼ ':'▲ ')+Math.abs(D.a).toFixed(2)+'%</b></div><div class="t4-foot">↻ See the film</div>'+seal,'t4');
