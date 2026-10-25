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
