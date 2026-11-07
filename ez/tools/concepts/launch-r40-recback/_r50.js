/* Round 50 (owner, 2026-10-25, on round 49): the foot reads Calls filed, then Graded on, then the stamp, and the stamp no longer
   carries the date; See the film smaller. The logo is part of each stamp, drawn in the hologram itself (the letters a second foil
   angle with a raised edge, the slashes and the dot in green, red and gold tinted foil), never the black-disc avatar laid on top:
   the full-colour logo will be everywhere else on the site. Picks carried on: 1 the certificate seal, more integrated (hot-stamped
   flush into the card: no lift, the card's grain through the foil, pressed edges); 2 the label's hologram, turned further right and
   set higher; 3 the passport rosette, subtler; 4 the logo stamp, more stampy (rings and a legend, the logo smaller, its letters in
   foil); 6 the authentication hologram in the seal's silver rainbow, and 6b the same hologram holding the dates itself. */
var R50=(function(){var E=R40.esc,Z=R45,H=R49,K=0;function uid(){return 'x50'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',P='#f7f4ec';
  var SPEC=H.PAL.spec,BRAND=H.PAL.brand,OIL=H.PAL.oil,
    SOFT=['#f1f3f6','#f6dbe9','#f7efcf','#dcf3df','#d3eef8','#e2dbf7','#f1f3f6'],
    GT=['#c9f7dd','#5fd99b','#e9fff3','#2fbf7a','#a8f0c9','#c9f7dd'],RT=['#ffd1cc','#ff6b5e','#fff0ee','#e0443a','#ffb3aa','#ffd1cc'],YT=['#ffefb8','#f7c24a','#fff8dc','#e0a422','#ffe08a','#ffefb8'];
  function hx(id,a,x2,y2,dx){return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="'+x2+'" y2="'+y2+'" spreadMethod="repeat">'+
    a.map(function(c,i){return '<stop offset="'+(i/(a.length-1)).toFixed(3)+'" stop-color="'+c+'"/>'}).join('')+
    '<animateTransform attributeName="gradientTransform" type="translate" values="0 0;'+dx+' '+(dx*y2/x2/3).toFixed(1)+'" dur="6s" repeatCount="indefinite"/></linearGradient>'}
  /* the card's grain pressed through the foil, stronger than round 49's (hot-stamped foil follows the paper's fibres) */
  function grain2(id,s){return '<filter id="'+id+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.05" numOctaves="3" seed="'+(s||5)+'" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/>'+
    '<feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".36" intercept=".72"/><feFuncG type="linear" slope=".36" intercept=".72"/><feFuncB type="linear" slope=".36" intercept=".72"/></feComponentTransfer>'+
    '<feComposite in="t" in2="SourceGraphic" operator="in" result="tm"/><feBlend in="SourceGraphic" in2="tm" mode="multiply"/></filter>'}
  /* the logo in the foil: the letters a second foil angle, the slashes and the dot in tinted foils, a raised edge (light above and
     left, dark below and right) so it reads as part of the hologram */
  function mark(id,cx,cy,w,o){o=o||{};var d=(o.d||.6),L=o.lt==null?.9:o.lt,S=o.sd==null?.62:o.sd;
    /* broad bands on the letters (one or two hues across them at a time), drifting the other way from the field's foil */
    var defs=hx(id+'b',o.pal||SPEC,-78,96,-78)+hx(id+'g',GT,40,52,40)+hx(id+'r',RT,40,52,40)+hx(id+'y',YT,40,52,40);
    var one=function(f){return H.logo(cx,cy,w,{e:f,g:f,r:f,y:f})};
    return {defs:defs,body:'<g transform="translate('+d+' '+(d*1.15).toFixed(2)+')" fill-opacity="'+S+'">'+one('#1c1830')+'</g>'+
      '<g transform="translate('+(-d*.8).toFixed(2)+' '+(-d*.9).toFixed(2)+')" fill-opacity="'+L+'">'+one('#ffffff')+'</g>'+
      H.logo(cx,cy,w,{e:'url(#'+id+'b)',g:'url(#'+id+'g)',r:'url(#'+id+'r)',y:'url(#'+id+'y)'})+
      '<g fill="none" stroke="#24203a" stroke-opacity="'+(o.kl==null?.38:o.kl)+'" stroke-linejoin="round" transform="translate('+(cx-195.9*w/331.3).toFixed(2)+' '+(cy-207.4*w/331.3).toFixed(2)+') scale('+(w/331.3).toFixed(4)+')"><path d="'+H.LG.e+'" stroke-width="'+(.5*331.3/w).toFixed(2)+'"/></g>'}}
  function sv(cls,vb,label,defs,body){return '<svg class="x50s '+cls+'" viewBox="'+vb+'" role="img" aria-label="'+E(label)+'"><defs>'+defs+'</defs>'+body+'</svg>'}
  var lab='EZ hologram: graded by the market close';
  /* 1 the certificate seal, hot-stamped: flush in the card, the grain through it, its edge pressed; the logo struck into the foil */
  function seal(D){var id=uid(),p='';for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r=i%2?44.5:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    var m=mark(id+'m',50,52,46,{pal:['#dfe6ef','#9fe0ff','#f6b6dc','#fff0b0','#b6f2c8','#c3b0ff','#dfe6ef']});
    var defs=hx(id+'h',SPEC,46,26,46)+H.glint(id+'l',6,.6)+H.grooves(id+'q',1.6,62,.1)+grain2(id+'n',13)+'<clipPath id="'+id+'c"><path d="'+p+'"/></clipPath>'+m.defs;
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="100" fill="url(#'+id+'h)"/></g><rect width="100" height="100" fill="url(#'+id+'q)"/></g>'+
      '<path d="'+p+'" fill="none" stroke="#4d5160" stroke-opacity=".45" stroke-width=".6"/><circle cx="50" cy="50" r="40.6" fill="none" stroke="#3b3f4b" stroke-opacity=".42" stroke-width=".6"/>'+
      H.arc(id+'a',50,50,33.2,1)+H.arc(id+'z',50,50,38.4,0)+H.tp(id+'a','GRADED',6.6,'#262a35',1.6)+H.tp(id+'z','BY THE MARKET CLOSE',4.6,'#262a35',.5)+
      m.body+'<g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'l)"/></g>';
    return sv('x50-c x50-pr','0 0 100 100',lab,defs,body)}
  /* 2 the label's hologram: the label's own foil, the logo struck into it, GRADED under it */
  function label(D){var id=uid(),S='M6,1.5 H94 Q98.5,1.5 98.5,6 V54 Q98.5,58.5 94,58.5 H6 Q1.5,58.5 1.5,54 V6 Q1.5,1.5 6,1.5 Z';
    var m=mark(id+'m',50,26,56,{pal:['#e6ecf5','#a9d8ff','#c9b8ff','#ffc4e1','#e6ecf5'],sd:.5});
    var defs=hx(id+'h',BRAND,52,22,52)+H.glint(id+'l',6)+H.grooves(id+'q',1.5,-28,.12)+H.grain(id+'n',17)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>'+m.defs;
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="60" fill="url(#'+id+'h)"/></g><rect width="100" height="60" fill="url(#'+id+'q)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#141218" stroke-opacity=".5" stroke-width=".9"/>'+m.body+H.t(50,53.2,'GRADED',6.8,'#141218',{ls:2.2,op:.85})+
      '<g clip-path="url(#'+id+'c)"><rect width="100" height="60" fill="url(#'+id+'l)"/></g>';
    return sv('x50-r x50-pr','0 0 100 60',lab,defs,body)}
  /* 3 the passport rosette, subtler: a pale foil, faint guilloche, the whole logo cut out of the foil so the card shows through */
  function rosette(D){var id=uid(),gl='',og='',n=10;
    for(var j=0;j<n;j++){var d='';for(var i=0;i<=180;i++){var a=i/180*Math.PI*2,r=31+8.5*Math.sin(7*a+j*Math.PI*2/n/7*3.5);d+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}gl+='<path d="'+d+'Z"/>'}
    for(var j2=0;j2<3;j2++){var d2='';for(var i2=0;i2<=240;i2++){var a2=i2/240*Math.PI*2,r2=41.5+1.6*Math.sin(30*a2+j2*2.1);d2+=(i2?'L':'M')+(50+r2*Math.cos(a2)).toFixed(2)+','+(50+r2*Math.sin(a2)).toFixed(2)}og+='<path d="'+d2+'Z"/>'}
    var cut=H.logo(50,50,46,{e:'#000',g:'#000',r:'#000',y:'#000'});
    var defs=hx(id+'h',SOFT,40,30,40)+H.glint(id+'l',6,.45)+H.grain(id+'n',19)+'<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><circle cx="50" cy="50" r="46.5" fill="#fff"/>'+cut+'</mask>';
    var body='<g mask="url(#'+id+'m)"><g filter="url(#'+id+'n)"><circle cx="50" cy="50" r="46.5" fill="url(#'+id+'h)" fill-opacity=".85"/></g>'+
      '<g fill="none" stroke="#5a5f8f" stroke-opacity=".2" stroke-width=".45">'+gl+'</g><g fill="none" stroke="#ffffff" stroke-opacity=".55" stroke-width=".26" transform="rotate(4 50 50)">'+gl+'</g>'+
      '<g fill="none" stroke="#5a5f8f" stroke-opacity=".22" stroke-width=".3">'+og+'</g><circle cx="50" cy="50" r="46.5" fill="url(#'+id+'l)"/></g>'+
      '<circle cx="50" cy="50" r="46.5" fill="none" stroke="#3a3f52" stroke-opacity=".35" stroke-width=".6"/>'+
      '<g fill="none" stroke="#3a3f52" stroke-opacity=".42" stroke-width=".9" stroke-linejoin="round" transform="translate('+(50-195.9*46/331.3).toFixed(2)+' '+(50-207.4*46/331.3).toFixed(2)+') scale('+(46/331.3).toFixed(4)+')"><path d="'+H.LG.e+'" stroke-width="6.5"/><path d="'+H.LG.g+'" stroke-width="6.5"/><path d="'+H.LG.r+'" stroke-width="6.5"/><path d="'+H.LG.y+'" stroke-width="6.5"/></g>'+
      H.ring(id+'t',50,50,43.4)+H.tp(id+'t','EZ · GRADED BY THE MARKET CLOSE ·',4.4,'#3a3f52',.4,2*Math.PI*43.4*.965);
    return sv('x50-c x50-pr x50-ro','0 0 100 100',lab,defs,body)}
  /* 4 the logo stamp: the oil-slick disc as a stamp, two foil rings and GRADED BY THE MARKET CLOSE round it, the logo smaller and
     in foil inside */
  function badge(D){var id=uid();var m=mark(id+'m',50,51,40,{pal:SPEC,sd:.6,lt:.35});
    var defs=hx(id+'h',OIL,44,30,44)+hx(id+'k',SPEC,30,18,30)+H.glint(id+'l',6,.4)+H.grooves(id+'q',1.4,90,.06)+'<clipPath id="'+id+'c"><circle cx="50" cy="50" r="47"/></clipPath>'+m.defs;
    var body='<g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'h)"/><rect width="100" height="100" fill="url(#'+id+'q)"/></g>'+
      '<circle cx="50" cy="50" r="44.4" fill="none" stroke="url(#'+id+'k)" stroke-width="2"/><circle cx="50" cy="50" r="33.4" fill="none" stroke="url(#'+id+'k)" stroke-width=".9"/>'+
      H.ring(id+'t',50,50,36.1)+H.tp(id+'t','GRADED · BY THE MARKET CLOSE ·',5.2,'url(#'+id+'k)',.6,2*Math.PI*36.1*.965)+m.body+
      '<g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'l)"/></g><circle cx="50" cy="50" r="47" fill="none" stroke="#000" stroke-opacity=".45" stroke-width=".6"/>';
    return sv('x50-c x50-pr','0 0 100 100',lab,defs,body)}
  function code3(D){var r=ROUNDS.filter(function(x){return x.n===D.n})[0],rec=[r.n,r.ticker,r.called,r.resolves].concat(r.calls.map(function(x){return x[0]+':'+x[1]})).concat(['close:'+r.a]).join('|');
    var hx2=R48.sha256(rec),AB='ACDEFGHJKLMNPQRTUVWXY',c='';for(var q=0;q<3;q++)c+=AB[parseInt(hx2.substr(q*2,2),16)%AB.length];return c}
  /* 6 the authentication hologram in the seal's silver rainbow: the logo struck into the foil, GRADED, the serial and its code */
  function auth(D){var id=uid(),S='M14,2 H86 A12,12 0 0 1 98,14 V40 A12,12 0 0 1 86,52 H14 A12,12 0 0 1 2,40 V14 A12,12 0 0 1 14,2 Z';
    var m=mark(id+'m',27,27,36,{pal:['#dfe6ef','#9fe0ff','#f6b6dc','#fff0b0','#b6f2c8','#c3b0ff','#dfe6ef']});
    var defs=hx(id+'h',SPEC,38,22,38)+H.glint(id+'l',6,.7)+H.grooves(id+'q',1.4,-35,.12)+grain2(id+'n',31)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>'+m.defs;
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="54" fill="url(#'+id+'h)"/></g><rect width="100" height="54" fill="url(#'+id+'q)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#4a4f60" stroke-opacity=".5" stroke-width=".8"/><path d="M2,22 h4 M2,32 h4 M94,22 h4 M94,32 h4" stroke="#4a4f60" stroke-opacity=".5" stroke-width=".8"/>'+m.body+
      H.t(71,25.5,'GRADED',12,'#22252f',{f:'Anton, Impact, sans-serif',w:400,ls:.8})+'<path d="M54,30.8 H88" stroke="#22252f" stroke-opacity=".4" stroke-width=".5"/>'+
      H.t(71,40,'EZ-'+String(D.n).padStart(4,'0')+' · '+code3(D),6.4,'#22252f',{f:"'Barlow Condensed', sans-serif",w:700,ls:.6})+
      '<g clip-path="url(#'+id+'c)"><rect width="100" height="54" fill="url(#'+id+'l)"/></g>';
    return sv('x50-a x50-pr','0 0 100 54',lab,defs,body)}
  /* 6b the same hologram as the record of the dates: Calls filed and Graded on printed in it, beside the logo */
  function authbox(D){var id=uid(),S='M12,2 H128 A10,10 0 0 1 138,12 V42 A10,10 0 0 1 128,52 H12 A10,10 0 0 1 2,42 V12 A10,10 0 0 1 12,2 Z';
    var m=mark(id+'m',25,27,34,{pal:['#dfe6ef','#9fe0ff','#f6b6dc','#fff0b0','#b6f2c8','#c3b0ff','#dfe6ef']});
    var defs=hx(id+'h',SPEC,40,22,40)+H.glint(id+'l',6,.7)+H.grooves(id+'q',1.4,-35,.12)+grain2(id+'n',37)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>'+m.defs;
    var k='#22252f',row=function(y,a,b){return H.t(52,y,a,5,k,{a:'start',ls:.9})+H.t(132,y,b,8.6,k,{a:'end',f:"'Barlow Condensed', sans-serif",w:700,ls:.3})};
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="140" height="54" fill="url(#'+id+'h)"/></g><rect width="140" height="54" fill="url(#'+id+'q)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#4a4f60" stroke-opacity=".5" stroke-width=".8"/><path d="M2,22 h4 M2,32 h4 M134,22 h4 M134,32 h4" stroke="#4a4f60" stroke-opacity=".5" stroke-width=".8"/>'+m.body+
      row(17.4,'CALLS FILED',D.called)+'<path d="M52,21.6 H132" stroke="'+k+'" stroke-opacity=".3" stroke-width=".5"/>'+row(31.4,'GRADED ON',D.graded)+'<path d="M52,35.6 H132" stroke="'+k+'" stroke-opacity=".3" stroke-width=".5"/>'+
      H.t(52,45.4,'EZ-'+String(D.n).padStart(4,'0')+' · '+code3(D),5.6,k,{a:'start',f:"'Barlow Condensed', sans-serif",w:700,ls:.8})+H.t(132,45.4,'GRADED',7.4,k,{a:'end',f:'Anton, Impact, sans-serif',w:400,ls:.9})+
      '<g clip-path="url(#'+id+'c)"><rect width="140" height="54" fill="url(#'+id+'l)"/></g>';
    return sv('x50-ab x50-pr','0 0 140 54',lab,defs,body)}
  var ST={seal:seal,label:label,rosette:rosette,badge:badge,auth:auth,authbox:authbox};
  function build(D,o){var rows=Z.rows4(D),M=R41,Y='#a98329',box=o.stamp==='authbox';
    var rh=rows.map(function(x,i){var g=x.win,cls=g?' r41fd':' lp',tilt=[-6,-4,-7,-5][i];
      var mk=M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:g?Y:(x.ok?G:R),rot:tilt,seed:i+21,w:29,h:13,fs:7.2,ls:.5,wf:.5,cls:'x46-m x49-m'});
      return '<div class="x46-r '+(g?'win wg':x.ok?'ok':'no')+'"><b class="x46-rk'+cls+'">'+x.r4+'</b><span class="r40mk x46-mk">'+x.svg+'</span><span class="x46-nm'+cls+'">'+E(x.n)+'</span>'+mk+'<span class="x46-cl'+(g?' r41fd':' lp '+(x.up?'up':'dn'))+'">'+E(x.call)+'</span></div>'}).join('');
    var film=D.film?'<p class="x46-film lp x50-film">↻ See the '+(window.FILMS&&FILMS[D.n]?'film':'picture')+'</p>':'';
    var dates=box?'':'<div class="x50-dt"><p class="x50-d"><small class="lp">Calls filed</small><b class="lp">'+E(D.called)+'</b></p><p class="x50-d"><small class="lp">Graded on</small><b class="lp">'+E(D.graded)+'</b></p></div>';
    var h='<div class="x46-fr"></div><div class="x46-hd"><p class="x46-t"><i class="x46-sr r41fd">★</i><span class="lp">Certificate</span><i class="x46-sr r41fd">★</i></p><p class="x46-no lp">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
      '<p class="x46-sec"><span class="lp">What they predicted</span></p><div class="x46-rows">'+rh+'</div>'+
      '<div class="x46-out"><small class="lp">Market</small><b class="lp '+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
      '<div class="x46-ft x50-ft'+(box?' x50-bx':'')+'"><div class="x50-fl">'+dates+film+'</div>'+
      '<div class="x50-st" style="--r50:'+(o.rot==null?6:o.rot)+'deg;--y50:'+(o.y||0)+'px">'+ST[o.stamp](D)+'</div></div>';
    var el=R40.over(D.face,h,'x46 x47 x49 x50 x50-'+o.stamp+' '+(o.cls||''));
    el.querySelectorAll('svg.x50s').forEach(function(s){try{s.pauseAnimations();s.setCurrentTime(o.t==null?1.6:o.t)}catch(e){}});return el}
  return {build:build,ST:ST,mark:mark}})();
window.R50=R50;
