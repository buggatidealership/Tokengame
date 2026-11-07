/* r1031 targets T1 to T3 (owner, 2026-10-27: "the dots are different here from previous iterations"): the earlier paper ticket's holes
   placed on a golden-angle spiral (every hole in its own place), drawn three ways. window.__tV = 'T1' | 'T2' | 'T3'. */
(function(){var V=window.__tV,MC={GPT:'#1b181c',GROK:'#1b181c',CLAUDE:'#d97757',KIMI:'#1e80ff'},ga=Math.PI*(3-Math.sqrt(5));
 var G=ROUNDS.filter(function(r){return typeof r.a==="number"&&!isNaN(r.a)});
 document.querySelectorAll('.rz-pf .rz-tg figure').forEach(function(f){var nm=f.querySelector('figcaption .rz-lx:not(.rz-n)').textContent.trim().toUpperCase(),calls=[];
  G.forEach(function(r){var c=(r.calls||[]).filter(function(x){return x[0]===nm})[0];if(!c)return;var dn=/^DOWN/.test(c[1]);calls.push({ok:(dn?-1:1)>0===(r.a>0),off:parseFloat(c[2])||0})});
  var R=60,C=73,h='<svg viewBox="0 0 146 146" aria-hidden="true" style="width:100%;max-width:150px">';
  var band=function(r0,r1,col,op){return r0?'<circle cx="'+C+'" cy="'+C+'" r="'+((r0+r1)/2)+'" fill="none" stroke="'+col+'" stroke-width="'+(r1-r0)+'" opacity="'+op+'"/>':'<circle cx="'+C+'" cy="'+C+'" r="'+r1+'" fill="'+col+'" opacity="'+op+'"/>'};
  if(V==='T1'){/* the earlier paper target: rings printed in white and red ink, the % off in each ring, a fine crosshair */
   h+=''+band(0,R/4,'#c2261d',1)+band(R/2,3*R/4,'#c2261d',1)+band(R/4,R/2,'#fffbf1',1)+band(3*R/4,R,'#fffbf1',1)+
    '<circle cx="'+C+'" cy="'+C+'" r="'+R+'" fill="none" stroke="rgba(40,16,12,.35)" stroke-width=".6"/><path d="M'+(C-R)+','+C+'H'+(C+R)+'M'+C+','+(C-R)+'V'+(C+R)+'" stroke="rgba(40,16,12,.28)" stroke-width=".5"/>'+
    [[3,1],[6,2],[9,3],[12,4]].map(function(v,i){return '<text x="'+(C+(v[1]-.5)/4*R).toFixed(1)+'" y="'+(C+2)+'" font-size="5.6" font-family="Barlow Condensed,sans-serif" font-weight="700" text-anchor="middle" fill="'+(i%2?'rgba(196,38,30,.95)':'rgba(255,246,232,.95)')+'">'+v[0]+'%</text>'}).join('')}
  else{h+=band(0,R/4,'#ff3a31',1)+band(R/4,R/2,'#fffdf8',1)+band(R/2,3*R/4,'#ff3a31',1)+band(3*R/4,R,'#fffdf8',1)+'<circle cx="'+C+'" cy="'+C+'" r="'+R+'" fill="none" stroke="rgba(4,7,14,.55)" stroke-width=".7"/>'+
   '<circle cx="'+C+'" cy="'+C+'" r="2.6" fill="#fdbc2a"/><path d="M'+(C-R)+','+C+'H'+(C+R)+'M'+C+','+(C-R)+'V'+(C+R)+'" stroke="rgba(4,7,14,.25)" stroke-width=".5"/>'}
  calls.forEach(function(c,i){if(!c.ok)return;var a=i*ga,r=Math.min(c.off,12)/12*R,x=(C+r*Math.cos(a)).toFixed(1),y=(C+r*Math.sin(a)).toFixed(1);
   if(V==='T3')h+='<circle cx="'+x+'" cy="'+y+'" r="2.7" fill="'+MC[nm]+'" stroke="#fffdf8" stroke-width=".8"/>';
   else h+='<circle cx="'+x+'" cy="'+y+'" r="3.1" fill="rgba(255,250,236,.85)"/><circle cx="'+x+'" cy="'+y+'" r="2.3" fill="#1b1613"/><circle cx="'+(+x-.6)+'" cy="'+(+y-.6)+'" r=".7" fill="rgba(255,255,255,.25)"/>'});
  var old=f.querySelector('svg');if(old)old.outerHTML=h+'</svg>'})})();
