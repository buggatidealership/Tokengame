/* digital-native: a signature stamp in ink. The hash is a real SHA-256 of the round's record (round, ticker, dates, the four calls,
   the close), so anyone with the recipe can recompute it; the check is drawn on a pixel grid */
var D=window.__r40D,r=ROUNDS.filter(function(x){return x.n===D.n})[0];
var rec=[r.n,r.ticker,r.called,r.resolves].concat(r.calls.map(function(x){return x[0]+':'+x[1]})).concat(['close:'+r.a]).join('|');
var px='',P=[[6,1],[5,2],[6,2],[4,3],[5,3],[0,3],[1,4],[3,4],[4,4],[1,3],[2,4],[2,5],[3,5]];P.forEach(function(q){px+='<rect x="'+(4+q[0]*3.2)+'" y="'+(6+q[1]*3.2)+'" width="2.6" height="2.6"/>'});
function mk(h){var id='dg'+Math.random().toString(36).slice(2,6);return '<svg class="x43-dg" viewBox="0 0 116 50" width="104" height="45" aria-label="Graded '+D.graded+' 2026 at the market close, record hash '+h+'" role="img"><defs>'+R41.worn(id,1.6,8)+'</defs><g filter="url(#'+id+')" fill="#1f6b3f" stroke="#1f6b3f">'+
  '<rect x="1" y="1" width="114" height="48" rx="3" fill="none" stroke-width="1.5"/><path d="M30 4V46" stroke-width=".8"/>'+px+
  '<text x="34" y="13" font-family="Anton, Impact, sans-serif" font-size="11" letter-spacing=".8" stroke="none">GRADED</text>'+
  '<text x="34" y="23" font-family="Special Elite, monospace" font-size="6.2" stroke="none">'+D.graded.toUpperCase()+' 2026 · 16:00 ET</text>'+
  '<text x="34" y="31.5" font-family="Special Elite, monospace" font-size="6.2" stroke="none">BY THE MARKET CLOSE</text>'+
  '<text x="34" y="42" font-family="Special Elite, monospace" font-size="5.8" stroke="none">SHA-256 '+h+'</text>'+
  '</g></svg>'}
var el=R43.build(D,{win:'gold',stamp:function(){return mk('········')},cls:'m4'});
crypto.subtle.digest('SHA-256',new TextEncoder().encode(rec)).then(function(b){var x=[].map.call(new Uint8Array(b),function(v){return ('0'+v.toString(16)).slice(-2)}).join('');el.querySelector('.x43-st').innerHTML=mk(x.slice(0,6)+'…'+x.slice(-4));window.__x43rec=rec+' => '+x});
