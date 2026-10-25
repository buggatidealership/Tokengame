/* shared row markup for the keep-the-content options: rank (or ✗), the mark, the name, a Winner tag, the call */
function R40rows(D,pre){var E=R40.esc;return D.rows.map(function(x){return '<div class="'+pre+'-r '+(x.win?'win':x.ok?'ok':'no')+'"><b class="'+pre+'-rk">'+(x.ok?x.rk:'✗')+'</b><span class="r40mk '+pre+'-mk">'+x.svg+'</span><span class="'+pre+'-nm">'+E(x.n)+'</span>'+(x.win?'<i class="'+pre+'-wn">Winner</i>':'')+'<span class="'+pre+'-cl '+(x.up?'up':'dn')+'">'+E(x.call)+'</span></div>'}).join('')}

/* Round 41 (owner, 2026-10-25): five takes on S1. Shared pieces: a crown printed in gold foil (today's winner icon, carried over),
   small ink stamps for PASS / FAIL in brand inks and non-shield shapes, and the rows with a verdict column. */
var R41=(function(){var E=R40.esc,K=0;
  function worn(id,f,seed){return '<filter id="'+id+'" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="'+(f||1.6)+'" numOctaves="2" seed="'+(seed||3)+'" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -2.2 1.9" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in"/></filter>'}
  function gold(id){return '<linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe28a"/><stop offset=".45" stop-color="#f2b632"/><stop offset=".7" stop-color="#ffd86b"/><stop offset="1" stop-color="#b9821a"/></linearGradient>'}
  /* the crown: three points and a band, hot-foil stamped */
  function crown(cls){var id='r41c'+(++K);return '<svg class="r41cr '+(cls||'')+'" viewBox="0 0 24 19" aria-hidden="true"><defs>'+gold(id)+'</defs><path fill="url(#'+id+')" d="M2.2 13.6 1 3.6l6 4.8L12 .8l5 7.6 6-4.8-1.2 10z"/><path fill="url(#'+id+')" d="M2.4 15h19.2v3.2H2.4z"/><circle cx="12" cy="9.6" r="1.5" fill="#b9821a" opacity=".55"/></svg>'}
  /* a small rubber stamp: rect (rounded, double rule), oval (inspection mark) or cart (clipped-corner cartouche, the hallmark's frame) */
  function mini(o){var id='r41m'+(++K),W=o.w||40,H=o.h||17,c=o.c,s='';
    if(o.shape==='oval')s='<ellipse cx="'+W/2+'" cy="'+H/2+'" rx="'+(W/2-1)+'" ry="'+(H/2-1)+'" fill="none" stroke-width="1.3"/><ellipse cx="'+W/2+'" cy="'+H/2+'" rx="'+(W/2-3)+'" ry="'+(H/2-3)+'" fill="none" stroke-width=".6"/>';
    else if(o.shape==='cart'){var k=4;s='<path d="M'+k+' 1H'+(W-k)+'L'+(W-1)+' '+k+'V'+(H-k)+'L'+(W-k)+' '+(H-1)+'H'+k+'L1 '+(H-k)+'V'+k+'Z" fill="none" stroke-width="1.4"/>'}
    else if(o.shape==='solid')s='<rect x=".8" y=".8" width="'+(W-1.6)+'" height="'+(H-1.6)+'" rx="2"/>';
    else s='<rect x=".8" y=".8" width="'+(W-1.6)+'" height="'+(H-1.6)+'" rx="2.5" fill="none" stroke-width="1.3"/><rect x="2.8" y="2.8" width="'+(W-5.6)+'" height="'+(H-5.6)+'" rx="1.2" fill="none" stroke-width=".5"/>';
    return '<svg class="r41mini '+(o.cls||'')+'" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" style="--rot:'+(o.rot||0)+'deg" aria-label="'+E(o.word)+'" role="img"><defs>'+worn(id+'w',o.wf||2.4,o.seed)+'</defs><g filter="url(#'+id+'w)" stroke="'+c+'" fill="'+c+'">'+s+
      '<text x="'+W/2+'" y="'+(H/2+(o.fs||8.6)*.36)+'" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="'+(o.fs||8.6)+'" letter-spacing="'+(o.ls||.7)+'" stroke="none" fill="'+(o.shape==='solid'?(o.k||'#f1ead8'):c)+'">'+E(o.word)+'</text></g></svg>'}
  /* rows: rank (or the crown), the mark, the name (+ Winner tag), the call, the verdict */
  function rows(D,pre,o){return D.rows.map(function(x,i){var cr=x.win?(o.crown==='only'||o.crown==='gold'?crown(pre+'-cr'):''):'';
      var rk=x.win&&o.crown!=='tag'?cr:'<b class="'+pre+'-rk">'+(x.ok?x.rk:'')+'</b>';
      var tag=x.win&&o.crown==='tag'?'<i class="'+pre+'-wn">'+crown(pre+'-cr')+'Winner</i>':x.win&&o.crown==='gold'?'<i class="'+pre+'-wn">Winner</i>':'';
      return '<div class="'+pre+'-r '+(x.win?'win':x.ok?'ok':'no')+'">'+rk+'<span class="r40mk '+pre+'-mk">'+x.svg+'</span><span class="'+pre+'-nm">'+E(x.n)+tag+'</span><span class="'+pre+'-cl '+(x.up?'up':'dn')+'">'+E(x.call)+'</span>'+(o.v?o.v(x,i):'')+'</div>'}).join('')}
  function rep(D){return 'Report No. '+String(D.n).padStart(4,'0')}
  return {crown:crown,mini:mini,rows:rows,worn:worn,gold:gold,rep:rep}})();
window.R41=R41;

/* Round 42 (owner, 2026-10-25): the combo. Certificate header (S3) on C's white stock, B's typed "Calls filed" box, C's gold seal
   (carrying the graded date), ONE winner mark (crown, gold line or the word), D's PASS/FAIL cartouches or E's tick columns. */
var R42=(function(){var E=R40.esc,M=R41;
  function seal(D,cls){var id='cs'+Math.random().toString(36).slice(2,7),p='';for(var i=0;i<48;i++){var a=i/48*Math.PI*2,r=i%2?44:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    return '<svg class="xcf-seal '+(cls||'')+'" viewBox="0 0 100 100" aria-label="Graded '+E(D.graded)+' 2026" role="img"><defs>'+M.gold(id+'g')+'<path id="'+id+'t" d="M 20,50 A 30,30 0 0 1 80,50"/><path id="'+id+'b" d="M 18,50 A 32,32 0 0 0 82,50"/></defs>'+
    '<path d="'+p+'" fill="url(#'+id+'g)"/><circle cx="50" cy="50" r="38" fill="none" stroke="#9a6a12" stroke-width="1" opacity=".7"/><circle cx="50" cy="50" r="27" fill="none" stroke="#9a6a12" stroke-width=".7" opacity=".7"/>'+
    '<g fill="#6e4a0a" opacity=".9"><text font-family="Archivo, sans-serif" font-weight="900" font-size="7.4" letter-spacing="1.2"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">$EZ GRADING</textPath></text>'+
    '<text font-family="Archivo, sans-serif" font-weight="900" font-size="6.8" letter-spacing="1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">SEASON 1</textPath></text>'+
    '<text x="50" y="49" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="12" letter-spacing=".6">GRADED</text><text x="50" y="61" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="8">'+E(D.graded.toUpperCase())+'</text></g></svg>'}
  var tk=function(ok){var id='ct'+Math.random().toString(36).slice(2,7);return '<svg class="xcf-tk" viewBox="0 0 14 14" aria-hidden="true"><defs>'+M.worn(id,2,7)+'</defs><g filter="url(#'+id+')">'+(ok?'<path d="M2.4 7.6 5.6 11 11.8 2.6" fill="none" stroke="#1f6b3f" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>':'<path d="M3 3l8 8M11 3l-8 8" fill="none" stroke="#a8231a" stroke-width="2.2" stroke-linecap="round"/>')+'</g></svg>'};
  function build(D,o){var tick=o.mark==='tick',top=o.seal!=='foot';
    var v=tick?function(x){return '<span class="xcf-bx">'+(x.ok?tk(1):'')+'</span><span class="xcf-bx">'+(x.ok?'':tk(0))+'</span>'}:function(x,i){return M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?'#1f6b3f':'#a8231a',rot:0,seed:i+21,w:32,h:15,fs:8,wf:1.2})};
    var rows=D.rows.map(function(x,i){var w=x.win;
      var rk=w&&o.win==='crown'?M.crown('xcf-cr'):'<b class="xcf-rk">'+(x.ok?x.rk:'')+'</b>';
      return '<div class="xcf-r '+(w?'win w-'+o.win:x.ok?'ok':'no')+'">'+rk+'<span class="r40mk xcf-mk">'+x.svg+'</span><span class="xcf-nm">'+E(x.n)+(w&&o.win==='word'?'<i class="xcf-wn">Winner</i>':'')+'</span><span class="xcf-cl '+(x.up?'up':'dn')+'">'+E(x.call)+'</span>'+v(x,i)+'</div>'}).join('');
    var h='<div class="xcf-fr"></div><div class="xcf-hd"><p class="xcf-t"><i class="r41fd">★</i><span>'+E(o.head)+'</span><i class="r41fd">★</i></p><p class="xcf-no">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
     '<div class="xcf-ds'+(top?' sl':'')+'"><div class="xcf-bxd"><small>Calls filed</small><b>'+E(D.called)+'</b></div>'+(top?seal(D,'sl-t'):'<div class="xcf-bxd"><small>Graded</small><b>'+E(D.graded)+'</b></div>')+'</div>'+
     (tick?'<div class="xcf-th"><span>What they predicted</span><span>Pass</span><span>Reject</span></div>':'<p class="xcf-sec"><span>What they predicted</span><span>Direction</span></p>')+
     '<div class="xcf-rows'+(tick?' xcf-ck':'')+'">'+rows+'</div>'+
     (tick?'<div class="xcf-tot"><span>Total</span><b class="ok">'+D.hit+'</b><b class="no">'+(D.nc-D.hit)+'</b></div>':'')+
     '<div class="xcf-out"><small>Outcome</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
     '<div class="xcf-ft"><p class="xcf-vf">Verify: earningszn.xyz/#/round/'+D.n+'<br>Grader: the market close</p>'+(top?'':seal(D,'sl-f'))+'</div>'+(D.film?'<p class="xcf-fl">↻ See the film</p>':'');
    var el=R40.over(D.face,h,'xcf '+(o.cls||''));
    if(o.win==='gold')[].forEach.call(el.querySelectorAll('.xcf-r.win .xcf-rk,.xcf-r.win .xcf-nm,.xcf-r.win .xcf-cl'),function(e){e.classList.add('r41fd')});
    return el}
  return {build:build,seal:seal}})();
window.R42=R42;
