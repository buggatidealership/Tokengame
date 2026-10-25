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

/* Round 43 (owner, 2026-10-25): round 42's option 2 (Certificate, gold winning line, hallmark PASS/FAIL) with slim date boxes,
   no "Direction", no verify line, "Market" for "Outcome", and the stamp of approval at the foot, right, turned to the right.
   o.stamp(D) returns the stamp's markup; o.win as in R42 ('gold' or 'crown'). */
var R43=(function(){var E=R40.esc,M=R41;
  function build(D,o){var v=function(x,i){return M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?'#1f6b3f':'#a8231a',rot:0,seed:i+21,w:34,h:16,fs:8.6,wf:1.2})};
    var rows=D.rows.map(function(x,i){var w=x.win,rk=w&&o.win==='crown'?M.crown('xcf-cr'):'<b class="xcf-rk">'+(x.ok?x.rk:'')+'</b>';
      return '<div class="xcf-r '+(w?'win w-'+o.win:x.ok?'ok':'no')+'">'+rk+'<span class="r40mk xcf-mk">'+x.svg+'</span><span class="xcf-nm">'+E(x.n)+'</span><span class="xcf-cl '+(x.up?'up':'dn')+'">'+E(x.call)+'</span>'+v(x,i)+'</div>'}).join('');
    var h='<div class="xcf-fr"></div><div class="xcf-hd"><p class="xcf-t"><i class="r41fd">★</i><span>'+E(o.head||'Certificate')+'</span><i class="r41fd">★</i></p><p class="xcf-no">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
     '<div class="x43-ds"><p><small>Calls filed</small><b>'+E(D.called)+'</b></p><p><small>Graded</small><b>'+E(D.graded)+'</b></p></div>'+
     '<p class="xcf-sec"><span>What they predicted</span></p><div class="xcf-rows x43-rows">'+rows+'</div>'+
     '<div class="xcf-out x43-out"><small>Market</small><b class="'+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
     '<div class="x43-ft">'+(D.film?'<p class="xcf-fl">↻ See the film</p>':'')+'</div><div class="x43-st">'+o.stamp(D)+'</div>';
    var el=R40.over(D.face,h,'xcf x43 '+(o.cls||''));
    if(o.win==='gold')[].forEach.call(el.querySelectorAll('.xcf-r.win .xcf-rk,.xcf-r.win .xcf-nm,.xcf-r.win .xcf-cl'),function(e){e.classList.add('r41fd')});
    return el}
  var K=0;function uid(){return 'x43'+(++K)+Math.random().toString(36).slice(2,6)}
  /* sealing wax: a poured blob (uneven rim), the matrix pressed in ($EZ), a gloss; optional ribbon tails under it */
  function wax(D,o){o=o||{};var id=uid(),p='',n=40;for(var i=0;i<n;i++){var a=i/n*Math.PI*2,r=44+((i*37)%7)*0.9-(i%5===0?3:0)+(i%9===0?2.5:0);p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1)}p+='Z';
    var c=o.c||['#e0564a','#b3261c','#6e140c'];
    var rib=o.ribbon?'<path d="M40 70 18 122 27 115 33 126 54 76Z" fill="#1f6b3f"/><path d="M48 76 66 126 72 115 82 122 60 70Z" fill="#a8231a"/><path d="M40 70 18 122 27 115 33 126 54 76Z" fill="url(#'+id+'s)"/><path d="M48 76 66 126 72 115 82 122 60 70Z" fill="url(#'+id+'s)"/>':'';
    return '<svg class="x43-wax'+(o.ribbon?' rb':'')+'" viewBox="0 0 100 '+(o.ribbon?128:100)+'" aria-label="Sealed: graded '+E(D.graded)+'" role="img"><defs>'+
      '<radialGradient id="'+id+'g" cx="38%" cy="32%" r="75%"><stop offset="0" stop-color="'+c[0]+'"/><stop offset=".55" stop-color="'+c[1]+'"/><stop offset="1" stop-color="'+c[2]+'"/></radialGradient>'+
      '<radialGradient id="'+id+'i" cx="60%" cy="65%" r="70%"><stop offset="0" stop-color="'+c[0]+'"/><stop offset=".6" stop-color="'+c[1]+'"/><stop offset="1" stop-color="'+c[2]+'"/></radialGradient>'+
      '<linearGradient id="'+id+'s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".25"/><stop offset=".5" stop-color="#fff" stop-opacity=".12"/><stop offset="1" stop-color="#000" stop-opacity=".25"/></linearGradient>'+
      '<path id="'+id+'t" d="M 27,50 A 23,23 0 0 1 73,50"/><path id="'+id+'b" d="M 25,50 A 25,25 0 0 0 75,50"/></defs>'+rib+
      '<path d="'+p+'" fill="url(#'+id+'g)"/>'+
      '<circle cx="50" cy="50" r="32" fill="url(#'+id+'i)"/><circle cx="50" cy="50" r="32" fill="none" stroke="'+c[2]+'" stroke-opacity=".7" stroke-width="1.6"/><circle cx="50.6" cy="50.8" r="32" fill="none" stroke="'+c[0]+'" stroke-opacity=".55" stroke-width=".9"/>'+
      '<circle cx="50" cy="50" r="27" fill="none" stroke="'+c[2]+'" stroke-opacity=".55" stroke-width=".8"/>'+
      '<g font-family="Archivo, sans-serif" font-weight="900" letter-spacing=".9"><text font-size="6.4" fill="'+c[2]+'" fill-opacity=".75"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">GRADED</textPath></text>'+
      '<text font-size="6" fill="'+c[2]+'" fill-opacity=".75"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+E(D.graded.toUpperCase())+' 2026</textPath></text></g>'+
      '<text x="49.2" y="56.2" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="20" fill="#ff9a8c" fill-opacity=".85">$EZ</text>'+
      '<text x="50.9" y="57.9" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="20" fill="'+c[2]+'">$EZ</text>'+
      '<text x="50" y="57" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="20" fill="'+c[1]+'">$EZ</text>'+
      '<ellipse cx="36" cy="30" rx="10" ry="5" transform="rotate(-30 36 30)" fill="#fff" opacity=".22"/></svg>'}
  /* a rubber stamp in ink, round, rim words */
  function ink(D,o){return R40.stamp({c:o.c||'#a8231a',top:o.top||'$EZ GRADING',bot:o.bot||'BY THE MARKET CLOSE',mid:'GRADED',ms:14,date:D.graded.toUpperCase()+' 2026',rot:0,cls:'x43-ink',seed:o.seed||5})}
  /* blind emboss: the verified-badge rosette pressed into the card with no ink (light from top left) */
  function emboss(D){var id=uid(),p='';for(var i=0;i<24;i++){var a=i/24*Math.PI*2,r=i%2?40:46;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1)}p+='Z';
    var g='<path d="'+p+'"/><path d="M33 51 45 63 68 37" fill="none" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
    var e='<path d="'+p+'" fill="none" stroke-width="1.6"/><circle cx="50" cy="50" r="33" fill="none" stroke-width="1.2"/><path d="M34 51 45 62 67 38" fill="none" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>';
    return '<svg class="x43-emb" viewBox="0 0 100 100" aria-label="Embossed: graded '+E(D.graded)+'" role="img"><defs><path id="'+id+'b" d="M 21,50 A 29,29 0 0 0 79,50"/></defs>'+
      '<g stroke="#4a3f2c" stroke-opacity=".42" transform="translate(-.8 -.9)">'+e+'</g><g stroke="#fffdf4" stroke-opacity=".95" transform="translate(.8 .9)">'+e+'</g>'+
      '<text font-family="Archivo, sans-serif" font-weight="900" font-size="6.4" letter-spacing="1" fill="#4a3f2c" fill-opacity=".45"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">GRADED '+E(D.graded.toUpperCase())+'</textPath></text></svg>'}
  return {build:build,wax:wax,ink:ink,emboss:emboss}})();
window.R43=R43;

/* Round 44 (owner, 2026-10-25): the stamp must be part of the card, not laid on it, and it is our own: an "EZ" mark (no $).
   The EZ monogram: the E and the Z share their top and bottom bars (82 x 60 units). Every stamp is drawn the way the real thing
   marks paper: ink with uneven pressure, the grain through it and a slight bleed, multiplied into the stock; or the paper itself
   changed (embossed, punched, debossed foil). */
var R44=(function(){var E=R40.esc,K=0;function uid(){return 'x44'+(++K)+Math.random().toString(36).slice(2,6)}
  var MONO='M0 0H82V11H0Z M0 49H82V60H0Z M0 0H13V60H0Z M0 24.5H32V35.5H0Z M66 11H82L50 49H34Z';
  var MONO_E='M0 0H41V11H0Z M0 49H41V60H0Z M0 0H13V60H0Z M0 24.5H32V35.5H0Z',MONO_Z='M41 0H82V11H41Z M41 49H82V60H41Z M66 11H82L50 49H34Z';
  function inside(x,y){if(y<0||y>60||x<0||x>82)return false;if(y<11||y>49||x<13)return true;if(y>=24.5&&y<=35.5&&x<32)return true;var l=66-32*(y-11)/38;return x>=l&&x<=l+16}
  function mono(cx,cy,w,d){var k=w/82;return '<path transform="translate('+(cx-41*k).toFixed(2)+' '+(cy-30*k).toFixed(2)+') scale('+k.toFixed(4)+')" d="'+(d||MONO)+'"/>'}
  /* ink as a rubber stamp leaves it: speckle where the rubber missed, a slow pressure change across the strike, a slight bleed */
  function ink(id,seed,fine,press){return '<filter id="'+id+'" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">'+
    '<feTurbulence type="fractalNoise" baseFrequency="'+(fine||1.1)+'" numOctaves="2" seed="'+seed+'" result="f"/><feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.9 1.75" result="fm"/>'+
    '<feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="1" seed="'+(seed+7)+'" result="c"/><feColorMatrix in="c" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 '+(press||-1.5)+' 1.45" result="cm"/>'+
    '<feComposite in="fm" in2="cm" operator="arithmetic" k1="1" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".32" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'}
  function rim(id,r1,r2){return '<path id="'+id+'t" d="M '+(50-r1)+',50 A '+r1+','+r1+' 0 0 1 '+(50+r1)+',50"/><path id="'+id+'b" d="M '+(50-r2)+',50 A '+r2+','+r2+' 0 0 0 '+(50+r2)+',50"/>'}
  function rimText(id,top,bot,fs){return '<text font-family="Archivo, sans-serif" font-weight="900" font-size="'+(fs||7)+'" letter-spacing="1.1"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+E(top)+'</textPath></text>'+
    '<text font-family="Archivo, sans-serif" font-weight="900" font-size="'+((fs||7)-.6)+'" letter-spacing="1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+E(bot)+'</textPath></text>'}
  var date=function(D){return D.graded.toUpperCase()+' 2026'};
  /* 1 the ink seal: round, the EZ mark in the middle, struck over the frame's corner like a real stamp catching the border */
  function inkSeal(D,o){o=o||{};var id=uid(),c=o.c||'#b3261c';return '<svg class="x44 x44-ink" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(date(D))+' by the market close"><defs>'+ink(id+'f',o.seed||11)+rim(id,36,38)+'</defs>'+
    '<g filter="url(#'+id+'f)" fill="'+c+'" stroke="'+c+'"><circle cx="50" cy="50" r="46" fill="none" stroke-width="2.6"/><circle cx="50" cy="50" r="41.5" fill="none" stroke-width="1"/><circle cx="50" cy="50" r="28" fill="none" stroke-width="1"/>'+
    '<g stroke="none">'+rimText(id,'EZ GRADED','BY THE MARKET CLOSE',7.2)+mono(50,45,30)+'<text x="50" y="66" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="6.2" letter-spacing=".6">'+E(date(D))+'</text></g></g></svg>'}
  /* 2 two inks: the E in green, the Z in red, struck from two blocks a hair out of register, as two-colour stamps print */
  function twoInk(D){var id=uid();return '<svg class="x44 x44-two" viewBox="0 0 124 62" role="img" aria-label="EZ graded '+E(date(D))+' by the market close"><defs>'+ink(id+'a',21,1.1)+ink(id+'b',29,1.1)+'</defs>'+
    '<g filter="url(#'+id+'b)" fill="#b3261c" stroke="#b3261c"><rect x="1.5" y="1.5" width="121" height="59" rx="4" fill="none" stroke-width="2.2"/><rect x="5" y="5" width="114" height="52" rx="2" fill="none" stroke-width=".8"/>'+mono(30,31,38,MONO_Z)+
    '<g stroke="none"><text x="88" y="25" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="15" letter-spacing="1">GRADED</text><text x="88" y="38" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="7" letter-spacing=".6">'+E(date(D))+'</text>'+
    '<text x="88" y="49" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="4.7" letter-spacing=".3">BY THE MARKET CLOSE</text></g></g>'+
    '<g filter="url(#'+id+'a)" fill="#1f6b3f" transform="translate(.8 -.6)">'+mono(30,31,38,MONO_E)+'</g><path d="M56 12V50" stroke="#b3261c" stroke-width=".8" filter="url(#'+id+'b)"/></svg>'}
  /* 3 the embosser: a notary's crimp seal pressed into the card, no ink; only the paper's own light and shadow show it */
  function crimp(D){var id=uid(),p='';for(var i=0;i<72;i++){var a=i/72*Math.PI*2,r=i%2?43.5:47;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    var g='<path d="'+p+'" fill="none" stroke-width="1.3"/><circle cx="50" cy="50" r="39" fill="none" stroke-width="1.1"/><circle cx="50" cy="50" r="28.5" fill="none" stroke-width=".9"/>'+
      '<g stroke="none" fill-opacity="1">'+rimText(id,'EZ GRADED','BY THE MARKET CLOSE',7)+mono(50,46,30)+'<text x="50" y="66" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="6" letter-spacing=".6">'+E(date(D))+'</text></g>';
    return '<svg class="x44 x44-emb" viewBox="0 0 100 100" role="img" aria-label="Embossed EZ seal, graded '+E(date(D))+'"><defs>'+rim(id,33,35)+
      '<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><g fill="#000" stroke="#000">'+g+'</g></mask></defs>'+
      '<g mask="url(#'+id+'m)"><g fill="#fffbef" stroke="#fffbef" opacity=".95" transform="translate(.75 .85)">'+g+'</g><g fill="#3d3324" stroke="#3d3324" opacity=".42" transform="translate(-.7 -.8)">'+g+'</g></g>'+
      '<g fill="#3d3324" stroke="#3d3324" opacity=".05">'+g+'</g></svg>'}
  /* 4 the perfin: EZ punched through the card in holes, as banks cancelled cheques and firms marked their stamps; the date in red ink */
  function perfin(D){var id=uid(),h='',s=5.6;for(var y=s/2;y<60;y+=s)for(var x=s/2;x<82;x+=s)if(inside(x,y))h+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="1.85"/>';
    return '<svg class="x44 x44-pf" viewBox="-14 -4 110 84" role="img" aria-label="EZ punched through the card, graded '+E(date(D))+'"><defs>'+ink(id+'f',31)+'</defs>'+
      '<g fill="#fffaee" opacity=".85" transform="translate(.45 .55)">'+h+'</g><g fill="#120f17">'+h+'</g><g fill="#000" opacity=".5" transform="translate(-.25 -.3)" style="mix-blend-mode:multiply">'+h+'</g>'+
      '<g filter="url(#'+id+'f)" fill="#b3261c"><text x="41" y="75" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="7.6" letter-spacing=".6">GRADED '+E(date(D))+'</text></g></svg>'}
  /* 5 red foil, debossed: the seal pressed into the card through red foil; the press leaves a wall above and a lip below */
  function foil(D){var id=uid();var face='<circle cx="50" cy="50" r="40"/>';
    return '<svg class="x44 x44-foil" viewBox="0 0 100 100" role="img" aria-label="EZ foil seal, graded '+E(date(D))+'"><defs>'+rim(id,31,33)+
      '<linearGradient id="'+id+'g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e5584b"/><stop offset=".38" stop-color="#a8231a"/><stop offset=".55" stop-color="#d9463a"/><stop offset=".78" stop-color="#8e1b13"/><stop offset="1" stop-color="#c33a2e"/></linearGradient>'+
      '<filter id="'+id+'n" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves="2" seed="5" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .55 -.1" result="a"/><feComposite in="a" in2="SourceGraphic" operator="in"/></filter></defs>'+
      '<linearGradient id="'+id+'w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c0d06" stop-opacity=".85"/><stop offset=".45" stop-color="#1c0d06" stop-opacity="0"/><stop offset=".6" stop-color="#fff4e0" stop-opacity="0"/><stop offset="1" stop-color="#fff4e0" stop-opacity=".9"/></linearGradient>'+
      '<circle cx="50" cy="50" r="40" fill="url(#'+id+'g)"/><circle cx="50" cy="50" r="40" fill="#000" filter="url(#'+id+'n)" opacity=".7"/>'+
      '<circle cx="50" cy="50" r="39" fill="none" stroke="url(#'+id+'w)" stroke-width="2.4"/><circle cx="50" cy="50" r="41.2" fill="none" stroke="url(#'+id+'w)" stroke-width="1" opacity=".6" transform="rotate(180 50 50)"/>'+
      '<circle cx="50" cy="50" r="35.5" fill="none" stroke="#5e0f0a" stroke-width="1" opacity=".75"/><circle cx="50.5" cy="50.6" r="35.5" fill="none" stroke="#ff9a8c" stroke-width=".6" opacity=".5"/>'+
      '<g fill="#ff9a8c" opacity=".55" transform="translate(.45 .5)">'+rimText(id,'EZ GRADED',date(D),6.6)+mono(50,49,32)+'</g><g fill="#4e0c08" opacity=".9">'+rimText(id,'EZ GRADED',date(D),6.6)+mono(50,49,32)+'</g></svg>'}
  /* 6 wax pressed into the card: thin at its edge so the grain shows through, and the oil it leaves in the paper around it */
  function wax(D){var id=uid(),p='',n=44;for(var i=0;i<n;i++){var a=i/n*Math.PI*2,r=43+((i*37)%7)*0.8-(i%5===0?2.5:0)+(i%9===0?2:0);p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(1)+','+(50+r*Math.sin(a)).toFixed(1)}p+='Z';
    return '<svg class="x44 x44-wax" viewBox="0 0 100 100" role="img" aria-label="EZ wax seal, graded '+E(date(D))+'"><defs>'+rim(id,24,26)+
      '<radialGradient id="'+id+'g" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#c8392d"/><stop offset=".6" stop-color="#a8231a"/><stop offset=".9" stop-color="#7a160f"/><stop offset="1" stop-color="#7a160f" stop-opacity=".55"/></radialGradient>'+
      '<filter id="'+id+'h" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="3"/></filter></defs>'+
      '<path d="'+p+'" transform="translate(50 50) scale(1.08) translate(-50 -50)" fill="#7a4a1c" opacity=".16" filter="url(#'+id+'h)"/>'+
      '<path d="'+p+'" fill="url(#'+id+'g)"/><circle cx="50" cy="50" r="31" fill="#9c2017"/><circle cx="50" cy="50" r="31" fill="none" stroke="#5e0f0a" stroke-width="1.3" opacity=".8"/><circle cx="50.6" cy="50.7" r="31" fill="none" stroke="#e0564a" stroke-width=".8" opacity=".55"/>'+
      '<g fill="#e0564a" opacity=".7" transform="translate(-.5 -.55)">'+rimText(id,'EZ GRADED',date(D),5.8)+mono(50,49,26)+'</g><g fill="#5e0f0a" opacity=".9">'+rimText(id,'EZ GRADED',date(D),5.8)+mono(50,49,26)+'</g></svg>'}
  return {mono:mono,inkSeal:inkSeal,twoInk:twoInk,crimp:crimp,perfin:perfin,foil:foil,wax:wax}})();
window.R44=R44;
