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

/* Round 45 (owner, 2026-10-25): ten iterations on round 43/44's certificate. Every word, number, logo and rule is printed into the
   stock now, the way the gold ▼5% already was: ink that carries the card's grain and thins where the plate starved (a speckle mask),
   pressed in (a dark wall above, a pale lip below). Ranks 1 to 4 on every row (right calls by closeness, then wrong calls by closeness).
   Seals in the brand's three inks only (green, red, gold). o: marks 'left'|'right', small, winMark, datesBottom, seal fn, pos 'br'|'tr'|'strip'|'stub'. */
var R45=(function(){var E=R40.esc,M=R41,K=0;function uid(){return 'x45'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',Y='#a8740f';
  var ME='M0 0H41V11H0Z M0 49H41V60H0Z M0 0H13V60H0Z M0 24.5H32V35.5H0Z',MZ='M41 0H82V11H41Z M41 49H82V60H41Z M66 11H82L50 49H34Z';
  function mono(cx,cy,w,d){var k=w/82;return '<path transform="translate('+(cx-41*k).toFixed(2)+' '+(cy-30*k).toFixed(2)+') scale('+k.toFixed(4)+')" d="'+d+'"/>'}
  function inside(x,y){if(y<0||y>60||x<0||x>82)return false;if(y<11||y>49||x<13)return true;if(y>=24.5&&y<=35.5&&x<32)return true;var l=66-32*(y-11)/38;return x>=l&&x<=l+16}
  function isE(x,y){return x<13||((y<11||y>49)&&x<41)||(y>=24.5&&y<=35.5&&x<32)}
  function ink(id,seed){return '<filter id="'+id+'" x="-12%" y="-12%" width="124%" height="124%" color-interpolation-filters="sRGB">'+
    '<feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="'+seed+'" result="f"/><feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.9 1.75" result="fm"/>'+
    '<feTurbulence type="fractalNoise" baseFrequency=".022" numOctaves="1" seed="'+(seed+7)+'" result="c"/><feColorMatrix in="c" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.4 1.4" result="cm"/>'+
    '<feComposite in="fm" in2="cm" operator="arithmetic" k1="1" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".3" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'}
  function rim(id,r1,r2){return '<path id="'+id+'t" d="M '+(50-r1)+',50 A '+r1+','+r1+' 0 0 1 '+(50+r1)+',50"/><path id="'+id+'b" d="M '+(50-r2)+',50 A '+r2+','+r2+' 0 0 0 '+(50+r2)+',50"/>'}
  function rt(id,top,bot,fs){return (top?'<text font-family="Archivo, sans-serif" font-weight="900" font-size="'+fs+'" letter-spacing="1.1"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+E(top)+'</textPath></text>':'')+
    (bot?'<text font-family="Archivo, sans-serif" font-weight="900" font-size="'+(fs-.6)+'" letter-spacing="1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+E(bot)+'</textPath></text>':'')}
  var dt=function(D){return D.graded.toUpperCase()+' 2026'};
  /* seal A: three inks from three blocks, each a hair off the last: green rings, the EZ in green and red, the words in gold */
  function tri(D){var id=uid();return '<svg class="x45s x45-tri" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+' by the market close"><defs>'+ink(id+'g',11)+ink(id+'r',17)+ink(id+'y',23)+rim(id,36,38)+'</defs>'+
    '<g filter="url(#'+id+'g)" fill="none" stroke="'+G+'"><circle cx="50" cy="50" r="46" stroke-width="2.6"/><circle cx="50" cy="50" r="28" stroke-width="1"/></g>'+
    '<g filter="url(#'+id+'r)" fill="none" stroke="'+R+'" transform="translate(.5 -.4)"><circle cx="50" cy="50" r="41.6" stroke-width="1"/></g>'+
    '<g filter="url(#'+id+'y)" fill="'+Y+'" transform="translate(-.4 .5)">'+rt(id,'EZ GRADED','BY THE MARKET CLOSE',7.2)+'<text x="50" y="66.5" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="6.2" letter-spacing=".6">'+E(dt(D))+'</text></g>'+
    '<g filter="url(#'+id+'g)" fill="'+G+'">'+mono(50,45,30,ME)+'</g><g filter="url(#'+id+'r)" fill="'+R+'" transform="translate(.5 -.4)">'+mono(50,45,30,MZ)+'</g></svg>'}
  /* seal B: the brand's own ticket as the stamp's outline (scalloped ends, a green band and a red band), the EZ inside, gold words */
  function ticket(D){var id=uid(),P='M4,1 H116 Q119,1 119,4 V24 A8,8 0 0 0 119,40 V60 Q119,63 116,63 H4 Q1,63 1,60 V40 A8,8 0 0 0 1,24 V4 Q1,1 4,1 Z';
    return '<svg class="x45s x45-tk" viewBox="0 0 120 64" role="img" aria-label="EZ graded '+E(dt(D))+' by the market close"><defs>'+ink(id+'g',31)+ink(id+'r',37)+ink(id+'y',41)+'<clipPath id="'+id+'c"><path d="'+P+'"/></clipPath></defs>'+
    '<g filter="url(#'+id+'y)" fill="none" stroke="'+Y+'"><path d="'+P+'" stroke-width="2"/><path d="M14 6H106M14 58H106" stroke-width=".7"/></g>'+
    '<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'g)" fill="'+G+'"><rect x="0" y="0" width="9" height="64"/><rect x="11" y="0" width="1.6" height="64"/></g><g filter="url(#'+id+'r)" fill="'+R+'"><rect x="111" y="0" width="9" height="64"/><rect x="107.4" y="0" width="1.6" height="64"/></g></g>'+
    '<g filter="url(#'+id+'g)" fill="'+G+'">'+mono(42,32,34,ME)+'</g><g filter="url(#'+id+'r)" fill="'+R+'" transform="translate(.5 -.4)">'+mono(42,32,34,MZ)+'</g>'+
    '<g filter="url(#'+id+'y)" fill="'+Y+'" transform="translate(-.3 .4)"><text x="81" y="26" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="12" letter-spacing=".8">GRADED</text>'+
    '<text x="81" y="37" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="900" font-size="6.2" letter-spacing=".4">'+E(dt(D))+'</text><text x="81" y="46" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="800" font-size="4.3" letter-spacing=".2">BY THE MARKET CLOSE</text></g></svg>'}
  /* seal C: the perfin, the E punched through in green-inked holes and the Z in red (an inked punch rings every hole),
     with a gold ticket-shaped dater under it */
  function perfin(D){var id=uid(),hd='',rg='',rr='',s=5.6;for(var y=s/2;y<60;y+=s)for(var x=s/2;x<82;x+=s)if(inside(x,y)){var c='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="';hd+=c+'1.75"/>';(isE(x,y)?(rg+=c+'2.45"/>'):(rr+=c+'2.45"/>'))}
    var T='M3,66 H79 Q81,66 81,68 V71 A3.2,3.2 0 0 0 81,77.4 V80 Q81,82 79,82 H3 Q1,82 1,80 V77.4 A3.2,3.2 0 0 0 1,71 V68 Q1,66 3,66 Z';
    return '<svg class="x45s x45-pf" viewBox="-3 -3 88 88" role="img" aria-label="EZ punched through the card, graded '+E(dt(D))+'"><defs>'+ink(id+'g',51)+ink(id+'r',57)+ink(id+'y',61)+'</defs>'+
      '<g filter="url(#'+id+'g)" fill="none" stroke="'+G+'" stroke-width="1.1">'+rg+'</g><g filter="url(#'+id+'r)" fill="none" stroke="'+R+'" stroke-width="1.1">'+rr+'</g>'+
      '<g fill="#fffaee" opacity=".9" transform="translate(.4 .5)">'+hd+'</g><g fill="#120f17">'+hd+'</g>'+
      '<g filter="url(#'+id+'y)"><path d="'+T+'" fill="none" stroke="'+Y+'" stroke-width="1.2"/><text x="41" y="76.6" text-anchor="middle" fill="'+Y+'" font-family="Archivo, sans-serif" font-weight="900" font-size="6.4" letter-spacing=".7">GRADED · '+E(dt(D))+'</text></g></svg>'}
  /* seal D: the notary's way, an embossed crimp (no ink) with the EZ inked green and red on the raised face and the date in gold */
  function emboss(D){var id=uid(),p='';for(var i=0;i<72;i++){var a=i/72*Math.PI*2,r=i%2?43.5:47;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    var g='<path d="'+p+'" fill="none" stroke-width="1.3"/><circle cx="50" cy="50" r="39" fill="none" stroke-width="1.1"/><circle cx="50" cy="50" r="27" fill="none" stroke-width=".9"/>';
    return '<svg class="x45s x45-emb" viewBox="0 0 100 100" role="img" aria-label="Embossed EZ seal, graded '+E(dt(D))+'"><defs>'+ink(id+'g',71)+ink(id+'r',77)+ink(id+'y',81)+rim(id,32,34)+
      '<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><rect width="100" height="100" fill="#fff"/><g fill="#000" stroke="#000">'+g+'</g></mask></defs>'+
      '<g mask="url(#'+id+'m)"><g stroke="#fffbef" opacity=".95" transform="translate(.75 .85)">'+g+'</g><g stroke="#3d3324" opacity=".42" transform="translate(-.7 -.8)">'+g+'</g></g>'+
      '<g filter="url(#'+id+'y)" fill="'+Y+'">'+rt(id,'EZ GRADED',dt(D),6.8)+'</g><g filter="url(#'+id+'g)" fill="'+G+'">'+mono(50,50,30,ME)+'</g><g filter="url(#'+id+'r)" fill="'+R+'" transform="translate(.5 -.4)">'+mono(50,50,30,MZ)+'</g></svg>'}
  /* seal E: a hallmark strip, four marks struck in a row: the EZ, GRADED, the date, the round */
  function strip(D){var id=uid();function cart(x,w){var k=3;return 'M'+(x+k)+' 1H'+(x+w-k)+'L'+(x+w-1)+' '+(k+1)+'V'+(21-k)+'L'+(x+w-k)+' 21H'+(x+k)+'L'+(x+1)+' '+(21-k)+'V'+(k+1)+'Z'}
    return '<svg class="x45s x45-st" viewBox="0 0 150 22" role="img" aria-label="Hallmarks: EZ, graded, '+E(dt(D))+', round '+D.n+'"><defs>'+ink(id+'g',91)+ink(id+'r',97)+ink(id+'y',101)+'</defs>'+
      '<g filter="url(#'+id+'g)" fill="none" stroke="'+G+'" stroke-width="1.3"><path d="'+cart(0,30)+'"/></g><g filter="url(#'+id+'g)" fill="'+G+'">'+mono(15,11,20,ME)+'</g><g filter="url(#'+id+'r)" fill="'+R+'">'+mono(15,11,20,MZ)+'</g>'+
      '<g filter="url(#'+id+'y)"><ellipse cx="55" cy="11" rx="20" ry="9.8" fill="none" stroke="'+Y+'" stroke-width="1.3"/><text x="55" y="14.2" text-anchor="middle" fill="'+Y+'" font-family="Anton, Impact, sans-serif" font-size="9" letter-spacing=".6">GRADED</text></g>'+
      '<g filter="url(#'+id+'r)"><rect x="79" y="1" width="42" height="20" rx="5" fill="none" stroke="'+R+'" stroke-width="1.3"/><text x="100" y="14" text-anchor="middle" fill="'+R+'" font-family="Archivo, sans-serif" font-weight="900" font-size="7.4" letter-spacing=".3">'+E(D.graded.toUpperCase())+' 26</text></g>'+
      '<g filter="url(#'+id+'g)"><path d="'+cart(125,25)+'" fill="none" stroke="'+G+'" stroke-width="1.3"/><text x="137.5" y="14.2" text-anchor="middle" fill="'+G+'" font-family="Anton, Impact, sans-serif" font-size="9">R'+D.n+'</text></g></svg>'}
  var SEALS={tri:tri,ticket:ticket,perfin:perfin,emboss:emboss,strip:strip};
  function rows4(D){var ok=D.rows.filter(function(x){return x.ok}).sort(function(a,b){return a.off-b.off}),no=D.rows.filter(function(x){return !x.ok}).sort(function(a,b){return a.off-b.off});return ok.concat(no).map(function(x,i){return Object.assign({},x,{r4:i+1})})}
  function mark(x,i,o){var sm=o.small,tilt=o.marks==='left'?[-8,-6,-9,-7][i]:[-2,2,-1.5,2.5][i];
    if(o.winMark&&x.win)return M.mini({shape:'cart',word:'WINNER',c:Y,rot:tilt,seed:i+31,w:sm?38:44,h:sm?13:15,fs:sm?7.4:8.2,ls:.3,wf:.9,cls:'x45-m'});
    return M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?G:R,rot:tilt,seed:i+21,w:sm?26:34,h:sm?12:15,fs:sm?6.6:8,wf:1.2,cls:'x45-m'})}
  function build(D,o){var rows=rows4(D),left=o.marks==='left';
    var rh=rows.map(function(x,i){var w=x.win,m=mark(x,i,o),gold=w?' r41fd':' lp';
      return '<div class="x45-r '+(w?'win':x.ok?'ok':'no')+'">'+(left?m:'')+'<b class="x45-rk'+gold+'">'+x.r4+'</b><span class="r40mk x45-mk">'+x.svg+'</span><span class="x45-nm'+gold+'">'+E(x.n)+'</span><span class="x45-cl'+(w?' r41fd':' lp '+(x.up?'up':'dn'))+'">'+E(x.call)+'</span>'+(left?'':m)+'</div>'}).join('');
    var ds='<div class="x45-ds"><p><small class="lp">Calls filed</small><b class="lp">'+E(D.called)+'</b></p><p><small class="lp">Graded</small><b class="lp">'+E(D.graded)+'</b></p></div>';
    var seal=o.seal?SEALS[o.seal](D):'',pos=o.pos||'br';
    var h='<div class="x45-fr"></div><div class="x45-hd'+(pos==='tr'?' al':'')+'"><p class="x45-t"><i class="x45-sr r41fd">★</i><span class="lp">'+E(o.head||'Certificate')+'</span><i class="x45-sr r41fd">★</i></p><p class="x45-no lp">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
      (o.datesBottom?'':ds)+'<p class="x45-sec"><span class="lp">What they predicted</span></p><div class="x45-rows'+(left?' ml':'')+(o.small?' sm':'')+'">'+rh+'</div>'+
      '<div class="x45-out"><small class="lp">Market</small><b class="lp '+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+(o.datesBottom?ds:'')+
      (pos==='strip'?'<div class="x45-stripw">'+seal+'</div>':'')+
      (pos==='stub'?'<div class="x45-perf"></div><div class="x45-stub">'+ticketStub(D)+'</div>':'')+
      '<div class="x45-ft">'+(D.film?'<p class="x45-fl lp">↻ See the film</p>':'')+'</div>'+((pos==='br'||pos==='tr')?'<div class="x45-pos x45-'+pos+'">'+seal+'</div>':'');
    return R40.over(D.face,h,'xcf x45 '+(o.datesBottom?'db ':'')+(o.cls||''))}
  /* the stub: the certificate's own foot torn along a perforation, printed as the seal (green band, EZ, GRADED and the date in gold, red band) */
  function ticketStub(D){var id=uid();return '<svg class="x45-sb" viewBox="0 0 180 34" preserveAspectRatio="none" role="img" aria-label="EZ graded '+E(dt(D))+' by the market close"><defs>'+ink(id+'g',111)+ink(id+'r',117)+ink(id+'y',121)+'</defs>'+
    '<g filter="url(#'+id+'g)" fill="'+G+'"><rect x="0" y="0" width="8" height="34"/><rect x="10" y="0" width="1.5" height="34"/></g><g filter="url(#'+id+'r)" fill="'+R+'"><rect x="172" y="0" width="8" height="34"/><rect x="168.5" y="0" width="1.5" height="34"/></g>'+
    '<g filter="url(#'+id+'g)" fill="'+G+'">'+mono(36,17,30,ME)+'</g><g filter="url(#'+id+'r)" fill="'+R+'" transform="translate(.5 -.4)">'+mono(36,17,30,MZ)+'</g>'+
    '<g filter="url(#'+id+'y)" fill="'+Y+'"><text x="62" y="14" font-family="Anton, Impact, sans-serif" font-size="12" letter-spacing=".8">GRADED</text><text x="62" y="23.5" font-family="Archivo, sans-serif" font-weight="900" font-size="6.6" letter-spacing=".5">'+E(dt(D))+'</text><text x="62" y="31" font-family="Archivo, sans-serif" font-weight="800" font-size="4.6" letter-spacing=".4">BY THE MARKET CLOSE</text></g></svg>'}
  return {build:build,rows4:rows4,seals:SEALS,mono:mono,ME:ME,MZ:MZ,inside:inside,isE:isE}})();
window.R45=R45;


/* Round 46 (owner, 2026-10-25): Certificate and No., straight into what they predicted, the four calls with PASS / FAIL / WINNER
   between the name and the call, the market, then "Calls filed" left and the stamp right ("graded" lives in the stamp only).
   Clean type pressed in (no starved ink, no typewriter face). The stamp is the loudest thing on the card: heavy ink, or gold foil
   when it is the only gold on the card (o.gold: the winner then prints in ink). */
var R46=(function(){var E=R40.esc,M=R41,Z=R45,K=0;function uid(){return 'x46'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',Y='#a8740f',P='#f7f4ec';
  /* heavy ink: a full strike, only a rare fleck and a soft bleed */
  function heavy(id,seed){return '<filter id="'+id+'" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="'+seed+'" result="f"/>'+
    '<feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.55" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".22" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'}
  function gold(id){return '<linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffe28a"/><stop offset=".35" stop-color="#d9a53a"/><stop offset=".55" stop-color="#ffd86b"/><stop offset=".8" stop-color="#b07b16"/><stop offset="1" stop-color="#e0b04a"/></linearGradient>'}
  /* foil sits in the card: a dark wall above, a pale lip below */
  var FOIL='filter:drop-shadow(0 -.6px 0 rgba(60,38,0,.55)) drop-shadow(0 .8px 0 rgba(255,252,240,.9))';
  function arcs(id,r1,r2){return '<path id="'+id+'t" d="M '+(50-r1)+',50 A '+r1+','+r1+' 0 0 1 '+(50+r1)+',50"/><path id="'+id+'b" d="M '+(50-r2)+',50 A '+r2+','+r2+' 0 0 0 '+(50+r2)+',50"/>'}
  function on(id,top,bot,fs,fill){return '<g fill="'+fill+'" font-family="Archivo, sans-serif" font-weight="900"><text font-size="'+fs+'" letter-spacing="1.2"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+E(top)+'</textPath></text>'+
    '<text font-size="'+fs+'" letter-spacing="1.1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+E(bot)+'</textPath></text></g>'}
  var dt=function(D){return D.graded.toUpperCase()+' 2026'};
  /* T1 the band seal: a wide green band with GRADED and the date reversed out of it, a red ring, the EZ in green and red, gold words inside */
  function band(D,goldOnly){var id=uid(),c1=goldOnly?'url(#'+id+'gg)':G,c2=goldOnly?'url(#'+id+'gg)':R,c3=goldOnly?'url(#'+id+'gg)':Y;
    var body='<circle cx="50" cy="50" r="41" fill="none" stroke="'+c1+'" stroke-width="13"/>'+on(id,'GRADED · '+dt(D),'BY THE MARKET CLOSE',7.4,goldOnly?'#3d2a06':P)+
      '<circle cx="50" cy="50" r="32" fill="none" stroke="'+c2+'" stroke-width="1.8"/>'+
      '<g fill="'+c1+'">'+Z.mono(50,50,40,Z.ME)+'</g><g fill="'+c2+'">'+Z.mono(50,50,40,Z.MZ)+'</g>';
    return '<svg class="x46s x46-band'+(goldOnly?' gf':'')+'" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+' by the market close"><defs>'+heavy(id+'h',13)+gold(id+'gg')+arcs(id,38.5,38.5)+'</defs>'+
      '<g'+(goldOnly?'':' filter="url(#'+id+'h)"')+'>'+body+'</g></svg>'}
  /* T2 the brand ticket as the stamp, filled: green and red bands, the EZ big, GRADED and the date reversed out of a gold bar */
  function ticket(D,goldOnly){var id=uid(),P2='M5,2 H115 Q118,2 118,5 V25 A8,8 0 0 0 118,41 V61 Q118,64 115,64 H5 Q2,64 2,61 V41 A8,8 0 0 0 2,25 V5 Q2,2 5,2 Z',cg=goldOnly?'url(#'+id+'gg)':G,cr=goldOnly?'url(#'+id+'gg)':R,cy=goldOnly?'url(#'+id+'gg)':Y;
    var body='<path d="'+P2+'" fill="none" stroke="'+cy+'" stroke-width="3.2"/><g clip-path="url(#'+id+'c)"><rect x="0" y="0" width="12" height="66" fill="'+cg+'"/><rect x="108" y="0" width="12" height="66" fill="'+cr+'"/></g>'+
      '<g fill="'+cg+'">'+Z.mono(40,33,40,Z.ME)+'</g><g fill="'+cr+'">'+Z.mono(40,33,40,Z.MZ)+'</g>'+
      '<text x="83" y="31" text-anchor="middle" fill="'+cy+'" font-family="Anton, Impact, sans-serif" font-size="14" letter-spacing=".6">GRADED</text>'+
      '<text x="83" y="42" text-anchor="middle" fill="'+cy+'" font-family="Archivo, sans-serif" font-weight="900" font-size="7.4" letter-spacing=".4">'+E(dt(D))+'</text>';
    return '<svg class="x46s x46-tk'+(goldOnly?' gf':'')+'" viewBox="0 0 120 66" role="img" aria-label="EZ graded '+E(dt(D))+' by the market close"><defs>'+heavy(id+'h',23)+gold(id+'gg')+'<clipPath id="'+id+'c"><path d="'+P2+'"/></clipPath></defs><g'+(goldOnly?'':' filter="url(#'+id+'h)"')+'>'+body+'</g></svg>'}
  /* T3 the perfin: the EZ punched through in holes ringed in green (E) and red (Z) ink, over a heavy gold bar with GRADED and the date */
  function perfin(D){var id=uid(),hd='',rg='',rr='',s=5.4;for(var y=s/2;y<60;y+=s)for(var x=s/2;x<82;x+=s)if(Z.inside(x,y)){var c='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="';hd+=c+'1.75"/>';(Z.isE(x,y)?(rg+=c+'2.5"/>'):(rr+=c+'2.5"/>'))}
    return '<svg class="x46s x46-pf" viewBox="-3 -3 88 84" role="img" aria-label="EZ punched through the card, graded '+E(dt(D))+'"><defs>'+heavy(id+'h',33)+'</defs>'+
      '<g filter="url(#'+id+'h)"><g fill="'+G+'">'+rg+'</g><g fill="'+R+'">'+rr+'</g><rect x="0" y="64" width="82" height="14" rx="2" fill="'+Y+'"/><text x="41" y="73.6" text-anchor="middle" fill="'+P+'" font-family="Archivo, sans-serif" font-weight="900" font-size="6.2" letter-spacing=".3">GRADED · '+E(dt(D))+'</text></g>'+
      '<g fill="#fffaee" opacity=".9" transform="translate(.4 .5)">'+hd+'</g><g fill="#120f17">'+hd+'</g></svg>'}
  /* G1 the gold seal, scalloped, struck in foil: the round-42 seal the owner liked, now with our EZ and GRADED and the date */
  function scallop(D){var id=uid(),p='';for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r=i%2?44.5:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    return '<svg class="x46s x46-sc gf" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+gold(id+'gg')+arcs(id,32,34)+'</defs><path d="'+p+'" fill="url(#'+id+'gg)"/>'+
      '<circle cx="50" cy="50" r="40" fill="none" stroke="#7a520c" stroke-width="1.1" opacity=".75"/><circle cx="50" cy="50" r="27" fill="none" stroke="#7a520c" stroke-width=".8" opacity=".75"/>'+
      on(id,'GRADED','· '+dt(D)+' ·',7.2,'#5e3f08')+'<g fill="#5e3f08" opacity=".9">'+Z.mono(50,50,30,Z.ME)+Z.mono(50,50,30,Z.MZ)+'</g><g fill="#fff3c4" opacity=".55" transform="translate(-.5 -.5)">'+Z.mono(50,50,30,Z.ME)+Z.mono(50,50,30,Z.MZ)+'</g></svg>'}
  var ST={band:function(D){return band(D,0)},ticket:function(D){return ticket(D,0)},perfin:perfin,goldBand:function(D){return band(D,1)},goldTicket:function(D){return ticket(D,1)},scallop:scallop};
  function mark(x,i,o){var tilt=[-6,-4,-7,-5][i];
    if(x.win)return M.mini({shape:'cart',word:'WINNER',c:o.gold?G:Y,rot:tilt,seed:i+31,w:46,h:16,fs:9,ls:.3,wf:.5,cls:'x46-m'});
    return M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:x.ok?G:R,rot:tilt,seed:i+21,w:36,h:16,fs:9,ls:.6,wf:.5,cls:'x46-m'})}
  function build(D,o){var rows=Z.rows4(D);
    var rh=rows.map(function(x,i){var g=x.win&&!o.gold,cls=g?' r41fd':' lp';
      return '<div class="x46-r '+(x.win?'win'+(g?' wg':''):x.ok?'ok':'no')+'"><b class="x46-rk'+cls+'">'+x.r4+'</b><span class="r40mk x46-mk">'+x.svg+'</span><span class="x46-nm'+cls+'">'+E(x.n)+'</span>'+mark(x,i,o)+'<span class="x46-cl'+(g?' r41fd':' lp '+(x.up?'up':'dn'))+'">'+E(x.call)+'</span></div>'}).join('');
    var h='<div class="x46-fr"></div><div class="x46-hd"><p class="x46-t"><i class="x46-sr'+(o.gold?' lp':' r41fd')+'">★</i><span class="lp">'+E(o.head||'Certificate')+'</span><i class="x46-sr'+(o.gold?' lp':' r41fd')+'">★</i></p><p class="x46-no lp">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
      '<p class="x46-sec"><span class="lp">What they predicted</span></p><div class="x46-rows">'+rh+'</div>'+
      '<div class="x46-out"><small class="lp">Market</small><b class="lp '+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
      '<div class="x46-ft"><div class="x46-fl"><p class="x46-cf"><small class="lp">Calls filed</small><b class="lp">'+E(D.called)+'</b></p>'+(D.film?'<p class="x46-film lp">↻ See the film</p>':'')+'</div>'+
      '<div class="x46-st">'+ST[o.stamp](D)+'</div></div>';
    return R40.over(D.face,h,'x46 '+(o.gold?'x46g ':'')+(o.cls||''))}
  return {build:build}})();
window.R46=R46;

/* Round 47 (owner, 2026-10-25): the stamps smaller; the gold not the bright metallic gradient ("cheap gold") but an antique satin
   gold with the card's grain in it, pressed in; every stamp combines the green and red inks with that gold; "Calls filed" with the
   date under it. Built on R46's card. */
var R47=(function(){var E=R40.esc,Z=R45,K=0;function uid(){return 'x47'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',P='#f7f4ec';
  function heavy(id,seed){return '<filter id="'+id+'" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="'+seed+'" result="f"/>'+
    '<feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -3 2.55" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".22" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'}
  /* antique satin gold: a narrow, muted range, the grain multiplied in */
  function sat(id){return '<linearGradient id="'+id+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cfae5c"/><stop offset=".4" stop-color="#a98329"/><stop offset=".62" stop-color="#c9a453"/><stop offset="1" stop-color="#93701f"/></linearGradient>'+
    '<filter id="'+id+'n" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/>'+
    '<feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".3" intercept=".76"/><feFuncG type="linear" slope=".3" intercept=".76"/><feFuncB type="linear" slope=".3" intercept=".76"/></feComponentTransfer>'+
    '<feComposite in="t" in2="SourceGraphic" operator="in" result="tm"/><feBlend in="SourceGraphic" in2="tm" mode="multiply"/></filter>'}
  function arcs(id,r1,r2){return '<path id="'+id+'t" d="M '+(50-r1)+',50 A '+r1+','+r1+' 0 0 1 '+(50+r1)+',50"/><path id="'+id+'b" d="M '+(50-r2)+',50 A '+r2+','+r2+' 0 0 0 '+(50+r2)+',50"/>'}
  function on(id,top,bot,fs,fill){return '<g fill="'+fill+'" font-family="Archivo, sans-serif" font-weight="900"><text font-size="'+fs+'" letter-spacing="1.1"><textPath href="#'+id+'t" startOffset="50%" text-anchor="middle">'+E(top)+'</textPath></text>'+
    '<text font-size="'+fs+'" letter-spacing="1"><textPath href="#'+id+'b" startOffset="50%" text-anchor="middle" dominant-baseline="hanging">'+E(bot)+'</textPath></text></g>'}
  var dt=function(D){return D.graded.toUpperCase()+' 2026'};
  function ez(cx,cy,w){return '<g fill="'+G+'">'+Z.mono(cx,cy,w,Z.ME)+'</g><g fill="'+R+'">'+Z.mono(cx,cy,w,Z.MZ)+'</g>'}
  /* A band seal: green band with GRADED and the date reversed out, a satin-gold ring inside, the EZ in green and red */
  function band(D){var id=uid();return '<svg class="x47s x47-c" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+heavy(id+'h',13)+sat(id+'s')+arcs(id,38.5,38.5)+'</defs>'+
    '<g filter="url(#'+id+'h)"><circle cx="50" cy="50" r="41" fill="none" stroke="'+G+'" stroke-width="13"/>'+on(id,'GRADED · '+dt(D),'BY THE MARKET CLOSE',7.4,P)+ez(50,50,40)+'</g>'+
    '<circle cx="50" cy="50" r="32" fill="none" stroke="url(#'+id+'s)" stroke-width="2.4" filter="url(#'+id+'sn)"/></svg>'}
  /* B the brand ticket: satin-gold outline and GRADED, green and red bands, the EZ */
  function ticket(D){var id=uid(),P2='M5,2 H115 Q118,2 118,5 V25 A8,8 0 0 0 118,41 V61 Q118,64 115,64 H5 Q2,64 2,61 V41 A8,8 0 0 0 2,25 V5 Q2,2 5,2 Z';
    return '<svg class="x47s x47-t" viewBox="0 0 120 66" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+heavy(id+'h',23)+sat(id+'s')+'<clipPath id="'+id+'c"><path d="'+P2+'"/></clipPath></defs>'+
    '<g filter="url(#'+id+'sn)"><path d="'+P2+'" fill="none" stroke="url(#'+id+'s)" stroke-width="3.4"/><text x="83" y="31" text-anchor="middle" fill="url(#'+id+'s)" font-family="Anton, Impact, sans-serif" font-size="14.5" letter-spacing=".6">GRADED</text><text x="83" y="42.5" text-anchor="middle" fill="url(#'+id+'s)" font-family="Archivo, sans-serif" font-weight="900" font-size="7.6" letter-spacing=".4">'+E(dt(D))+'</text></g>'+
    '<g filter="url(#'+id+'h)"><g clip-path="url(#'+id+'c)"><rect x="0" y="0" width="12" height="66" fill="'+G+'"/><rect x="108" y="0" width="12" height="66" fill="'+R+'"/></g>'+ez(40,33,40)+'</g></svg>'}
  /* C the perfin: green-ringed E, red-ringed Z, a satin-gold bar with GRADED and the date */
  function perfin(D){var id=uid(),hd='',rg='',rr='',s=5.4;for(var y=s/2;y<60;y+=s)for(var x=s/2;x<82;x+=s)if(Z.inside(x,y)){var c='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="';hd+=c+'1.75"/>';(Z.isE(x,y)?(rg+=c+'2.5"/>'):(rr+=c+'2.5"/>'))}
    return '<svg class="x47s x47-p" viewBox="-3 -3 88 84" role="img" aria-label="EZ punched through the card, graded '+E(dt(D))+'"><defs>'+heavy(id+'h',33)+sat(id+'s')+'</defs>'+
      '<g filter="url(#'+id+'h)"><g fill="'+G+'">'+rg+'</g><g fill="'+R+'">'+rr+'</g></g><g filter="url(#'+id+'sn)"><rect x="0" y="64" width="82" height="14" rx="2" fill="url(#'+id+'s)"/></g><text x="41" y="73.6" text-anchor="middle" fill="'+P+'" font-family="Archivo, sans-serif" font-weight="900" font-size="6.2" letter-spacing=".3">GRADED · '+E(dt(D))+'</text>'+
      '<g fill="#fffaee" opacity=".9" transform="translate(.4 .5)">'+hd+'</g><g fill="#120f17">'+hd+'</g></svg>'}
  /* D the certificate seal: a satin-gold scalloped seal with the EZ struck on it in green and red ink, GRADED and the date in dark ink */
  function scallop(D){var id=uid(),p='';for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r=i%2?44.5:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    return '<svg class="x47s x47-c x47-f" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+heavy(id+'h',43)+sat(id+'s')+arcs(id,31,33)+'</defs><g filter="url(#'+id+'sn)"><path d="'+p+'" fill="url(#'+id+'s)"/></g>'+
      '<circle cx="50" cy="50" r="40" fill="none" stroke="#5e430e" stroke-width="1" opacity=".7"/><circle cx="50" cy="50" r="26.5" fill="none" stroke="#5e430e" stroke-width=".8" opacity=".7"/>'+
      on(id,'GRADED','· '+dt(D)+' ·',7.2,'#4a340a')+'<g filter="url(#'+id+'h)">'+ez(50,50,32)+'</g></svg>'}
  /* E the rosette: a prize ribbon's pleats in green and red round a satin-gold centre with the EZ, GRADED and the date on it */
  function rosette(D){var id=uid(),pl='',n=24;for(var i=0;i<n;i++){var a0=i/n*Math.PI*2,a1=(i+1)/n*Math.PI*2,am=(a0+a1)/2;
      pl+='<path d="M50,50 L'+(50+48*Math.cos(a0)).toFixed(1)+','+(50+48*Math.sin(a0)).toFixed(1)+' Q'+(50+50*Math.cos(am)).toFixed(1)+','+(50+50*Math.sin(am)).toFixed(1)+' '+(50+48*Math.cos(a1)).toFixed(1)+','+(50+48*Math.sin(a1)).toFixed(1)+' Z" fill="'+(i%2?G:R)+'"/>'}
    return '<svg class="x47s x47-c" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+heavy(id+'h',53)+sat(id+'s')+arcs(id,24,26)+'</defs><g filter="url(#'+id+'h)">'+pl+'</g>'+
      '<g filter="url(#'+id+'sn)"><circle cx="50" cy="50" r="33" fill="url(#'+id+'s)"/></g><circle cx="50" cy="50" r="30" fill="none" stroke="#5e430e" stroke-width=".8" opacity=".7"/>'+
      on(id,'GRADED',dt(D),6.2,'#4a340a')+'<g filter="url(#'+id+'h)">'+ez(50,50,24)+'</g></svg>'}
  /* F the double strike: a round seal struck twice, green ring and red ring a hair apart, satin-gold words between them, the EZ */
  function dbl(D){var id=uid();return '<svg class="x47s x47-c" viewBox="0 0 100 100" role="img" aria-label="EZ graded '+E(dt(D))+'"><defs>'+heavy(id+'h',63)+heavy(id+'h2',67)+sat(id+'s')+arcs(id,35.5,37.5)+'</defs>'+
    '<g filter="url(#'+id+'h)" fill="none" stroke="'+G+'"><circle cx="50" cy="50" r="46" stroke-width="3.6"/><circle cx="50" cy="50" r="27" stroke-width="2.4"/></g>'+
    '<g filter="url(#'+id+'h2)" fill="none" stroke="'+R+'"><circle cx="50" cy="50" r="42.2" stroke-width="1.6"/></g>'+
    '<g filter="url(#'+id+'sn)">'+on(id,'EZ GRADED · '+dt(D),'BY THE MARKET CLOSE',7,'url(#'+id+'s)')+'</g><g filter="url(#'+id+'h)">'+ez(50,50,34)+'</g></svg>'}
  var ST={band:band,ticket:ticket,perfin:perfin,scallop:scallop,rosette:rosette,dbl:dbl};
  function build(D,o){var el=R46.build(D,{stamp:'band',gold:0,cls:'x47 '+(o.cls||'')});
    el.querySelector('.x46-st').innerHTML=ST[o.stamp](D);var cf=el.querySelector('.x46-cf');if(cf)cf.classList.add('x47-cf');return el}
  return {build:build}})();
window.R47=R47;
