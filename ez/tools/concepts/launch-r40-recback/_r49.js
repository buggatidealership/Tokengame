/* Round 49 (owner, 2026-10-25): back to round 47's card ("the ones that I like in terms of the layout"), with the winner's golden line
   kept and its mark reading PASS in gold, every PASS/FAIL smaller so the names and calls get the room, and "Calls filed" back at the
   foot beside the stamp, a little higher and without its box. The stamp goes a new way: a hologram, like the $EZ one on every card's
   label and the ones in passports, carrying the EZ. logo the owner uses on X (traced from that avatar). Each foil drifts and catches the
   light the way a hologram does when the card moves (SMIL on the gradients; held still at one moment for the boards). */
var R49=(function(){var E=R40.esc,M=R41,Z=R45,K=0;function uid(){return 'x49'+(++K)+Math.random().toString(36).slice(2,6)}
  var G='#1f6b3f',R='#a8231a',Y='#a98329',P='#f7f4ec';
  /* the EZ. logo, traced from the owner's X avatar (a 400 x 400 box; the black disc is cx 198.7, cy 199.4, r 198.2); cleaned: the
     cut between the E's top bar and the Z ended in a small stair-step (owner, 2026-10-25: "is that a visual issue?"), now a clean point,
     and the tracing's sub-pixel corner bevels are squared off */
  var LG={e:'M116.8,88.0 L86.2,152.0 L102.1,152.0 L55.0,274.5 L154.2,274.5 L188.5,225.8 L128.7,225.8 L137.5,204.0 L170.2,203.5 L193.2,162.0 L149.1,162.0 L154.8,145.0 L143.4,138.5 L217.9,138.2 L192.2,182.0 L234.9,182.0 L181.5,250.8 L136.0,315.8 L272.5,315.8 L292.5,265.0 L230.4,265.0 L328.2,130.8 L225.1,130.8 L253.0,87.8 Z',
    g:'M146.2,287.0 L133.0,287.0 L106.5,327.2 L119.0,326.5 Z M86.8,169.5 L74.8,169.5 L29.5,282.2 L43.7,282.2 Z M105.8,92.5 L89.5,95.8 L55.5,169.2 L69.0,169.2 Z',
    r:'M304.5,259.0 L300.5,269.5 L313.0,268.2 L317.0,258.8 Z M361.5,126.0 L344.0,126.5 L269.5,235.8 L256.0,257.5 L276.2,257.0 Z M279.0,87.8 L266.7,87.5 L251.5,117.2 L262.2,119.0 Z',
    y:'M334.2,281.2 L302.0,281.2 L288.2,315.8 L321.0,315.5 Z'};
  var LC={k:'#04070e',e:'#f8f0d9',g:'#03c870',r:'#ff3a31',y:'#fdbc2a'};
  /* the letters, slashes and dot (no disc), centred on (cx,cy), w wide; f gives each part's fill (or none) */
  function logo(cx,cy,w,f){var k=w/331.3;return '<g transform="translate('+(cx-195.9*k).toFixed(2)+' '+(cy-207.4*k).toFixed(2)+') scale('+k.toFixed(4)+')">'+
    (f.e?'<path d="'+LG.e+'" fill="'+f.e+'"/>':'')+(f.g?'<path d="'+LG.g+'" fill="'+f.g+'"/>':'')+(f.r?'<path d="'+LG.r+'" fill="'+f.r+'"/>':'')+(f.y?'<path d="'+LG.y+'" fill="'+f.y+'"/>':'')+'</g>'}
  /* the whole avatar (disc and all) on a disc of radius rr centred on (cx,cy) */
  function avatar(cx,cy,rr,f){var k=rr/198.2;return '<g transform="translate('+(cx-198.7*k).toFixed(2)+' '+(cy-199.4*k).toFixed(2)+') scale('+k.toFixed(4)+')">'+
    (f.k?'<circle cx="198.7" cy="199.4" r="198.2" fill="'+f.k+'"/>':'')+'<path d="'+LG.e+'" fill="'+f.e+'"/><path d="'+LG.g+'" fill="'+f.g+'"/><path d="'+LG.r+'" fill="'+f.r+'"/><path d="'+LG.y+'" fill="'+f.y+'"/></g>'}
  /* the letters' outline only, its stroke sw in the stamp's own units */
  function ol(cx,cy,w,sw,col,op){var k=w/331.3;return '<path transform="translate('+(cx-195.9*k).toFixed(2)+' '+(cy-207.4*k).toFixed(2)+') scale('+k.toFixed(4)+')" d="'+LG.e+'" fill="none" stroke="'+col+'" stroke-opacity="'+op+'" stroke-width="'+(sw/k).toFixed(2)+'" stroke-linejoin="round"/>'}
  /* foils. spec: a silver rainbow; pass: a passport's cool teal, violet and rose; brand: the label's own hologram (mint, cream, rose,
     gold); gold: an iridescent gold; oil: a dark oil-slick holo for the black disc of the logo */
  var PAL={spec:['#eef1f6','#ffc6e2','#ffe6a0','#c2f3c6','#a2e7ff','#c8b6ff','#eef1f6'],pass:['#d6f4ff','#b4a4ff','#ff9fd6','#9ff3df','#7fc4ff','#d6f4ff'],
    brand:['#9ff0c4','#f7e7a8','#ffb3ae','#f2b632','#9ff0c4'],gold:['#f7e3a3','#d4ad52','#fff1c6','#c49640','#f1d993','#ffe8b5','#e5c066','#f7e3a3'],
    oil:['#120d1f','#3a2a74','#11524c','#6a2747','#28205a','#0f3a46','#120d1f']};
  function hg(id,pal,x2,y2,dur,dx){var a=PAL[pal];return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="'+x2+'" y2="'+y2+'" spreadMethod="repeat">'+
    a.map(function(c,i){return '<stop offset="'+(i/(a.length-1)).toFixed(3)+'" stop-color="'+c+'"/>'}).join('')+
    '<animateTransform attributeName="gradientTransform" type="translate" values="0 0;'+dx+' '+(dx*y2/x2/3).toFixed(1)+'" dur="'+dur+'s" repeatCount="indefinite"/></linearGradient>'}
  /* the light catching it: a narrow white sheen that sweeps across now and then */
  function glint(id,dur,op){return '<linearGradient id="'+id+'" gradientUnits="userSpaceOnUse" x1="-70" y1="-10" x2="-36" y2="14"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity="'+(op||.8)+'"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>'+
    '<animateTransform attributeName="gradientTransform" type="translate" values="0 0;230 0;230 0" keyTimes="0;.55;1" dur="'+dur+'s" repeatCount="indefinite"/></linearGradient>'}
  /* diffraction grooves: fine lines a little brighter than the foil */
  function grooves(id,per,ang,op){return '<pattern id="'+id+'" patternUnits="userSpaceOnUse" width="'+per+'" height="'+per+'" patternTransform="rotate('+ang+')"><rect width="'+(per*.45).toFixed(2)+'" height="'+per+'" fill="#fff" fill-opacity="'+op+'"/></pattern>'}
  /* foil hot-stamped into card: the card's grain multiplied in, lightly */
  function grain(id,s){return '<filter id="'+id+'" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="'+(s||11)+'" result="n"/><feColorMatrix in="n" type="saturate" values="0" result="g"/>'+
    '<feComponentTransfer in="g" result="t"><feFuncR type="linear" slope=".24" intercept=".8"/><feFuncG type="linear" slope=".24" intercept=".8"/><feFuncB type="linear" slope=".24" intercept=".8"/></feComponentTransfer>'+
    '<feComposite in="t" in2="SourceGraphic" operator="in" result="tm"/><feBlend in="SourceGraphic" in2="tm" mode="multiply"/></filter>'}
  function heavy(id,seed){return '<filter id="'+id+'" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="'+seed+'" result="f"/>'+
    '<feColorMatrix in="f" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -8 6.2" result="m"/><feGaussianBlur in="SourceGraphic" stdDeviation=".22" result="b"/><feComposite in="b" in2="m" operator="in"/></filter>'}
  function arc(id,cx,cy,r,top){return '<defs><path id="'+id+'" d="M '+(cx-r)+','+cy+' A '+r+','+r+' 0 0 '+(top?1:0)+' '+(cx+r)+','+cy+'"/></defs>'}
  function ring(id,cx,cy,r){return '<defs><path id="'+id+'" d="M '+cx+','+(cy+r)+' a '+r+','+r+' 0 1,1 0.01,0"/></defs>'}
  function tp(pid,txt,fs,fill,ls,len,w){return '<text text-rendering="geometricPrecision" font-family="Archivo, sans-serif" font-weight="'+(w||900)+'" font-size="'+fs+'" letter-spacing="'+(ls||0)+'" fill="'+fill+'"><textPath href="#'+pid+'" startOffset="50%" text-anchor="middle"'+(len?' textLength="'+len.toFixed(1)+'" lengthAdjust="spacing"':'')+'>'+E(txt)+'</textPath></text>'}
  function t(x,y,txt,fs,fill,o){o=o||{};return '<text text-rendering="geometricPrecision" x="'+x+'" y="'+y+'" text-anchor="'+(o.a||'middle')+'" font-family="'+(o.f||'Archivo, sans-serif')+'" font-weight="'+(o.w||900)+'" font-size="'+fs+'" letter-spacing="'+(o.ls||0)+'" fill="'+fill+'"'+(o.op?' fill-opacity="'+o.op+'"':'')+'>'+E(txt)+'</text>'}
  var dt=function(D){return D.graded.toUpperCase()+' 2026'};
  function sv(cls,vb,label,defs,body){return '<svg class="x49s '+cls+'" viewBox="'+vb+'" role="img" aria-label="'+E(label)+'"><defs>'+defs+'</defs>'+body+'</svg>'}
  function lab(D){return 'EZ hologram: graded '+dt(D)+' by the market close'}
  /* 1 the certificate seal, in holo: round 47's favourite, its gold made a silver rainbow hologram, the EZ. logo at its heart */
  function seal(D){var id=uid(),p='';for(var i=0;i<56;i++){var a=i/56*Math.PI*2,r=i%2?44.5:49;p+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}p+='Z';
    var defs=hg(id+'h','spec',46,26,6,46)+glint(id+'l',6)+grooves(id+'q',1.6,62,.13)+grain(id+'n',13)+'<clipPath id="'+id+'c"><path d="'+p+'"/></clipPath>';
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="100" fill="url(#'+id+'h)"/></g><rect width="100" height="100" fill="url(#'+id+'q)"/><rect width="100" height="100" fill="url(#'+id+'l)"/></g>'+
      '<path d="'+p+'" fill="none" stroke="#5d6270" stroke-opacity=".55" stroke-width=".7"/><circle cx="50" cy="50" r="41.2" fill="none" stroke="#3b3f4b" stroke-opacity=".5" stroke-width=".7"/>'+
      arc(id+'a',50,50,32.6,1)+arc(id+'b',50,50,38.6,0)+tp(id+'a','GRADED',6.4,'#262a35',1.4)+tp(id+'b',dt(D),5.6,'#262a35',.7)+
      '<circle cx="50" cy="50" r="25.6" fill="#f4efe2"/>'+avatar(50,50,24.4,LC);
    return sv('x49-c','0 0 100 100',lab(D),defs,body)}
  /* 2 the label's hologram, grown into the stamp: the same mint, cream, rose and gold foil as the $EZ on every card's label, now with
     the EZ. logo struck into it and GRADED with the date under it */
  function label(D){var id=uid(),S='M6,1.5 H94 Q98.5,1.5 98.5,6 V54 Q98.5,58.5 94,58.5 H6 Q1.5,58.5 1.5,54 V6 Q1.5,1.5 6,1.5 Z';
    var defs=hg(id+'h','brand',52,22,6,52)+glint(id+'l',6)+grooves(id+'q',1.5,-28,.14)+grain(id+'n',17)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>';
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="60" fill="url(#'+id+'h)"/></g><rect width="100" height="60" fill="url(#'+id+'q)"/><rect width="100" height="60" fill="url(#'+id+'l)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#141218" stroke-opacity=".6" stroke-width="1"/>'+
      logo(50,25,54,{e:'#141218',g:'#0f9a57',r:'#e0342b',y:'#d99a12'})+t(50,52.4,'GRADED · '+dt(D),6.3,'#141218',{ls:.5,op:.88});
    return sv('x49-r','0 0 100 60',lab(D),defs,body)}
  /* 3 the passport rosette: a guilloche of fine curves in a cool passport foil, the EZ. logo cut out of the foil so the card shows
     through (demetallised, as on a passport's data page), GRADED and the date round the rim */
  function rosette(D){var id=uid(),gl='',n=10;
    for(var j=0;j<n;j++){var d='';for(var i=0;i<=180;i++){var a=i/180*Math.PI*2,r=31+8.5*Math.sin(7*a+j*Math.PI*2/n/7*3.5);d+=(i?'L':'M')+(50+r*Math.cos(a)).toFixed(2)+','+(50+r*Math.sin(a)).toFixed(2)}gl+='<path d="'+d+'Z"/>'}
    var og='';for(var j2=0;j2<3;j2++){var d2='';for(var i2=0;i2<=240;i2++){var a2=i2/240*Math.PI*2,r2=41.5+1.6*Math.sin(30*a2+j2*2.1);d2+=(i2?'L':'M')+(50+r2*Math.cos(a2)).toFixed(2)+','+(50+r2*Math.sin(a2)).toFixed(2)}og+='<path d="'+d2+'Z"/>'}
    var defs=hg(id+'h','pass',40,30,6,40)+hg(id+'h2','pass',-34,26,6,-34)+glint(id+'l',6,.7)+grain(id+'n',19)+
      '<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100"><circle cx="50" cy="50" r="46.5" fill="#fff"/>'+logo(50,50,46,{e:'#000'})+'</mask>';
    var body='<g mask="url(#'+id+'m)"><g filter="url(#'+id+'n)"><circle cx="50" cy="50" r="46.5" fill="url(#'+id+'h)"/></g>'+
      '<g fill="none" stroke="#4b4f8f" stroke-opacity=".42" stroke-width=".5">'+gl+'</g><g fill="none" stroke="#ffffff" stroke-opacity=".7" stroke-width=".28" transform="rotate(4 50 50)">'+gl+'</g>'+
      '<g fill="none" stroke="#3e4380" stroke-opacity=".45" stroke-width=".35">'+og+'</g><circle cx="50" cy="50" r="46.5" fill="url(#'+id+'l)"/></g>'+
      '<circle cx="50" cy="50" r="46.5" fill="none" stroke="#3a3f52" stroke-opacity=".55" stroke-width=".7"/>'+logo(50,50,46,{e:'none',g:LC.g,r:LC.r,y:LC.y})+
      ol(50,50,46,1.3,'#20243a',.85)+
      ring(id+'t',50,50,43.4)+tp(id+'t','GRADED · '+dt(D)+' · BY THE MARKET CLOSE ·',4.5,'#262a38',.4,2*Math.PI*43.4*.965);
    return sv('x49-c','0 0 100 100',lab(D),defs,body)}
  /* 4 the logo as the seal: the X avatar itself as a die-cut holo sticker, its black disc an oil-slick foil, GRADED and the date
     under the letters */
  function badge(D){var id=uid();
    var defs=hg(id+'h','oil',44,30,6,44)+glint(id+'l',6,.45)+grooves(id+'q',1.4,90,.07)+'<clipPath id="'+id+'c"><circle cx="50" cy="50" r="47"/></clipPath>';
    var body='<circle cx="50" cy="50" r="48.6" fill="#f4efe2"/><g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'h)"/><rect width="100" height="100" fill="url(#'+id+'q)"/></g>'+
      avatar(50,47,45.5,{e:LC.e,g:LC.g,r:LC.r,y:LC.y})+arc(id+'b',50,50,41.6,0)+tp(id+'b','GRADED · '+dt(D),5.4,'#f8f0d9',.6)+
      '<g clip-path="url(#'+id+'c)"><rect width="100" height="100" fill="url(#'+id+'l)"/></g><circle cx="50" cy="50" r="47" fill="none" stroke="#000" stroke-opacity=".5" stroke-width=".6"/>';
    return sv('x49-c x49-stk','0 0 100 100',lab(D),defs,body)}
  /* 5 ink over holo: a holo laminate like a visa's, the EZ. logo running through it, and GRADED struck across it in green ink */
  function visa(D){var id=uid(),S='M4,2 H96 Q98,2 98,4 V62 Q98,64 96,64 H4 Q2,64 2,62 V4 Q2,2 4,2 Z',pat='';
    for(var y=-6;y<72;y+=13)for(var x=-8+((y/13)%2?8:0);x<110;x+=19)pat+=logo(x,y,13,{e:'#fff',g:'#fff',r:'#fff',y:'#fff'});
    var defs=hg(id+'h','spec',40,24,6,40)+hg(id+'h2','spec',-26,30,6,-26)+glint(id+'l',6)+grooves(id+'q',1.5,34,.12)+grain(id+'n',23)+heavy(id+'k',29)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>'+
      '<mask id="'+id+'m" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="66"><rect width="100" height="66" fill="#000"/><g opacity=".9">'+pat+'</g></mask>';
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="66" fill="url(#'+id+'h)"/><rect width="100" height="66" fill="url(#'+id+'h2)" mask="url(#'+id+'m)"/></g><rect width="100" height="66" fill="url(#'+id+'q)"/><rect width="100" height="66" fill="url(#'+id+'l)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#3b404c" stroke-opacity=".5" stroke-width=".7"/>'+
      '<g transform="rotate(-9 50 33)" style="mix-blend-mode:multiply"><g filter="url(#'+id+'k)"><rect x="12" y="11" width="76" height="44" rx="5" fill="none" stroke="'+G+'" stroke-width="2.6"/><rect x="15.5" y="14.5" width="69" height="37" rx="3" fill="none" stroke="'+G+'" stroke-width=".9"/>'+
      t(50,37,'GRADED',15,G,{f:'Anton, Impact, sans-serif',w:400,ls:1})+t(50,44.4,dt(D),6.2,G,{ls:.6})+t(50,49.4,'BY THE MARKET CLOSE',3.8,G,{ls:.4})+logo(50,20.3,11,{e:G,g:G,r:G,y:G})+'</g></g>';
    return sv('x49-v','0 0 100 66',lab(D),defs,body)}
  /* 6 the authentication hologram: an iridescent gold security label in the way league memorabilia is certified, the EZ. logo, GRADED,
     the date, the card's own serial and a three-letter code from the round's record (the first letters of its SHA-256) */
  function auth(D){var id=uid(),S='M14,2 H86 A12,12 0 0 1 98,14 V40 A12,12 0 0 1 86,52 H14 A12,12 0 0 1 2,40 V14 A12,12 0 0 1 14,2 Z';
    var r=ROUNDS.filter(function(x){return x.n===D.n})[0],rec=[r.n,r.ticker,r.called,r.resolves].concat(r.calls.map(function(x){return x[0]+':'+x[1]})).concat(['close:'+r.a]).join('|');
    var hx=R48.sha256(rec),AB='ACDEFGHJKLMNPQRTUVWXY',code='';for(var q=0;q<3;q++)code+=AB[parseInt(hx.substr(q*2,2),16)%AB.length];
    var defs=hg(id+'h','gold',38,22,6,38)+glint(id+'l',6,.75)+grooves(id+'q',1.4,-35,.15)+grain(id+'n',31)+'<clipPath id="'+id+'c"><path d="'+S+'"/></clipPath>';
    var body='<g clip-path="url(#'+id+'c)"><g filter="url(#'+id+'n)"><rect width="100" height="54" fill="url(#'+id+'h)"/></g><rect width="100" height="54" fill="url(#'+id+'q)"/><rect width="100" height="54" fill="url(#'+id+'l)"/></g>'+
      '<path d="'+S+'" fill="none" stroke="#5a4210" stroke-opacity=".6" stroke-width=".8"/><path d="M2,22 h4 M2,32 h4 M94,22 h4 M94,32 h4" stroke="#5a4210" stroke-opacity=".55" stroke-width=".8"/>'+
      '<circle cx="27" cy="27" r="19.5" fill="'+LC.k+'"/>'+avatar(27,27,19.5,{e:LC.e,g:LC.g,r:LC.r,y:LC.y})+
      t(71,21,'GRADED',11.5,'#2c2006',{f:'Anton, Impact, sans-serif',w:400,ls:.8})+t(71,30,dt(D),5.6,'#2c2006',{ls:.4})+
      '<path d="M53,34.6 H89" stroke="#2c2006" stroke-opacity=".45" stroke-width=".5"/>'+t(71,41.2,'EZ-'+String(D.n).padStart(4,'0')+' · '+code,6.2,'#2c2006',{f:"'Barlow Condensed', sans-serif",w:700,ls:.6});
    return sv('x49-a','0 0 100 54',lab(D),defs,body)}
  var ST={seal:seal,label:label,rosette:rosette,badge:badge,visa:visa,auth:auth};
  function build(D,o){var rows=Z.rows4(D),cf=o.cf||'free';
    var rh=rows.map(function(x,i){var g=x.win,cls=g?' r41fd':' lp',tilt=[-6,-4,-7,-5][i];
      var mk=M.mini({shape:'cart',word:x.ok?'PASS':'FAIL',c:g?Y:(x.ok?G:R),rot:tilt,seed:i+21,w:29,h:13,fs:7.2,ls:.5,wf:.5,cls:'x46-m x49-m'});
      return '<div class="x46-r '+(g?'win wg':x.ok?'ok':'no')+'"><b class="x46-rk'+cls+'">'+x.r4+'</b><span class="r40mk x46-mk">'+x.svg+'</span><span class="x46-nm'+cls+'">'+E(x.n)+'</span>'+mk+'<span class="x46-cl'+(g?' r41fd':' lp '+(x.up?'up':'dn'))+'">'+E(x.call)+'</span></div>'}).join('');
    var h='<div class="x46-fr"></div><div class="x46-hd"><p class="x46-t"><i class="x46-sr r41fd">★</i><span class="lp">Certificate</span><i class="x46-sr r41fd">★</i></p><p class="x46-no lp">No. '+String(D.n).padStart(4,'0')+'</p></div>'+
      '<p class="x46-sec"><span class="lp">What they predicted</span></p><div class="x46-rows">'+rh+'</div>'+
      '<div class="x46-out"><small class="lp">Market</small><b class="lp '+(D.dn?'dn':'up')+'">'+E(D.move)+'</b></div>'+
      '<div class="x46-ft"><div class="x46-fl"><p class="x46-cf x47-cf x49-cf'+(cf==='box'?' x49-box':'')+'"><small class="lp">Calls filed</small><b class="lp">'+E(D.called)+'</b></p>'+
      (D.film?'<p class="x46-film lp">↻ See the '+(window.FILMS&&FILMS[D.n]?'film':'picture')+'</p>':'')+'</div>'+
      '<div class="x46-st x49-st" style="--r49:'+(o.rot==null?6:o.rot)+'deg">'+ST[o.stamp](D)+'</div></div>';
    var el=R40.over(D.face,h,'x46 x47 x49 x49-'+o.stamp+' '+(o.cls||''));
    /* hold the foils still at one moment for the boards (the page would let them drift) */
    el.querySelectorAll('svg.x49s').forEach(function(s){try{s.pauseAnimations();s.setCurrentTime(o.t==null?1.6:o.t)}catch(e){}});return el}
  return {build:build,ST:ST,logo:logo,avatar:avatar,LG:LG,LC:LC}})();
window.R49=R49;
