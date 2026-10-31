/* Direction 1 "Admit One" (owner, 2026-10-22: "look more like an actual paper ticket", no staple). The bet sits on a classic admission
   roll ticket: thick off-white card stock (fine fibre grain, a few longer fibres, faint uneven tone, toned edges, a lit top edge and a
   shaded bottom edge for the card's thickness), a die cut with a concave quarter-circle bite at each corner and a half-circle notch top and
   bottom at the perforation, the perforation itself as a row of punched round holes (real holes through the paper, cut by the mask) with a
   slight lip, a thin double-rule frame printed at a constant inset from the die line (arcs around every bite and notch), the green and
   red bars as printed colour bars inside the frame a hair off register, micro labels in small caps ("$EZ · SEASON 1", "ADMIT ONE" set
   vertically by the perforation) and a red numbering-machine serial "No 000001" on the body and again on the stub. Shadow: a soft contact
   shadow plus the site's hard offset shadow kept small. Layout as concept 5: film ticket above, a gap, then this ticket full bleed on phones,
   the label left, the stub with the page's own #gpu (photo + live svg countdown) at concept 2's crop right. No filter on any ancestor of the
   chip (the blur sits on a sibling). Mock injector: eval on the loaded X2+ page, then call window.__fit().
   Round 2 (art director): the die-cut mask sits on its own paper layer (.bt-pp) and on two drop-out overlays, never on an ancestor of the
   chip; finer punched holes (1.7px radius, 6.5px pitch) with a lit lip and a shaded wall; the black pass drifts 1.3/-0.9px against the die;
   the stub serial turns about its centre (it was printed across the holes); the chip window is a picture plate (stock margin + ink keyline,
   no bezel); fewer specks; a darker printed gold for the $; the photo matte on the stock (static tooth + .06 cream, normal blend, below the
   live digits); the label multiplied onto the paper and roughened a hair (a static SVG displacement on the label only).
   window.__fitFlags = {wash, ink, rough} turns those three off for comparison. */
window.__fit=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('v1fit'))return 'already';H.classList.add('v1fit');
  var P='html.x2p.x2d.v1fit';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var enc=function(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'};
  /* ---- textures: static data-URI svgs, rasterised once ---- */
  var GRAIN=enc("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='t' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .30 0 0 0 0 .22 0 0 0 0 .11 1.5 0 0 0 -.79'/></filter><filter id='l' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 .98 -1.7 0 0 0 .79'/></filter><filter id='s' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='1' seed='19' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .28 0 0 0 0 .2 0 0 0 0 .1 0 7 0 0 -5.05'/></filter><rect width='200' height='200' filter='url(#t)'/><rect width='200' height='200' filter='url(#l)'/><rect width='200' height='200' filter='url(#s)'/></svg>");
  /* ink drop-outs: sparse paper-white specks over the printed solids (the label, the bars) */
  var WEAR=enc("<svg xmlns='http://www.w3.org/2000/svg' width='260' height='160'><filter id='w' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.09 .07' numOctaves='3' seed='31' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .42 0 0 0 0 .30 0 0 0 0 .13 2.2 0 0 0 -.92'/></filter><rect width='260' height='160' filter='url(#w)'/></svg>");
  var DROP=enc("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='d' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' seed='23' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .96 0 0 0 0 .93 0 0 0 0 .86 0 6 0 0 -4.3'/></filter><rect width='180' height='180' filter='url(#d)'/></svg>");
  var MOTTLE=enc("<svg xmlns='http://www.w3.org/2000/svg' width='560' height='180'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.011 .03' numOctaves='3' seed='8'/><feColorMatrix values='0 0 0 0 .55 0 0 0 0 .40 0 0 0 0 .18 .9 0 0 0 -.39'/></filter><rect width='560' height='180' filter='url(#m)'/></svg>");
  /* longer fibres and a few specks, seeded so every load is the same sheet */
  var seed=20261022,rnd=function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296};
  var FW=300,FH=200,fs='';
  for(var k=0;k<34;k++){var x=rnd()*FW,y=rnd()*FH,a=rnd()*Math.PI*2,L=5+rnd()*rnd()*30,bend=(rnd()-.5)*L*.5,
    ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L,cx=(x+ex)/2-Math.sin(a)*bend,cy=(y+ey)/2+Math.cos(a)*bend,
    col=rnd()<.72?'110,84,48':(rnd()<.6?'96,104,122':'160,70,60'),op=(.13+rnd()*.19).toFixed(2),w=(.4+rnd()*.45).toFixed(2);
    fs+="<path d='M"+x.toFixed(1)+' '+y.toFixed(1)+'Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+"' stroke='rgba("+col+','+op+")' stroke-width='"+w+"' fill='none' stroke-linecap='round'/>"}
  for(k=0;k<9;k++){fs+="<circle cx='"+(rnd()*FW).toFixed(1)+"' cy='"+(rnd()*FH).toFixed(1)+"' r='"+(.3+rnd()*.45).toFixed(2)+"' fill='rgba(55,40,22,"+(.22+rnd()*.25).toFixed(2)+")'/>"}
  var FIB=enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+FW+"' height='"+FH+"'>"+fs+"</svg>");
  /* ---- die line: four corner bites, a notch top and bottom at the perforation, the punched holes; all full-size layers, intersected ---- */
  var cut=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .35px),#000 calc('+r+' + .45px))'};
  var DIE=[cut('0 0','var(--rb)'),cut('100% 0','var(--rb)'),cut('0 100%','var(--rb)'),cut('100% 100%','var(--rb)'),
    cut('var(--px) 0','var(--rn)'),cut('var(--px) 100%','var(--rn)'),
    'radial-gradient(circle at var(--px) 50%,#0000 calc(var(--hr) - .3px),#000 calc(var(--hr) + .4px)) 0 50%/100% var(--hp) repeat-y'].join(',');
  var PTOOTH=enc("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95 0 0 0 0 .92 0 0 0 0 .84 1.15 0 0 0 -.6'/></filter><rect width='160' height='160' filter='url(#g)'/></svg>");
  var DLM=cut('0 0','var(--rb)')+','+cut('0 100%','var(--rb)')+','+cut('var(--px) 0','var(--rn)')+','+cut('var(--px) 100%','var(--rn)'),DRM=cut('100% 0','var(--rb)')+','+cut('100% 100%','var(--rb)');
  var MASK='-webkit-mask:'+DIE+';-webkit-mask-composite:source-in;mask:'+DIE+';mask-composite:intersect;';
  /* the printed rules follow the die line at a constant inset: a border cut round every bite and notch, plus a ring on each cut */
  var rule=function(i,w){ /* i = distance of the rule's outer edge from the paper edge, w = rule weight */
    var ri='calc(var(--rb) + '+i+'px)',rn='calc(var(--rn) + '+i+'px)',px='calc(var(--px) - '+i+'px)',o='-'+i+'px',e='calc(100% + '+i+'px)';
    var hole=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),#000 calc('+r+' + .3px))'};
    var ring=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),var(--ink) '+r+',var(--ink) calc('+r+' + '+w+'px),#0000 calc('+r+' + '+(w+.4)+'px))'};
    var M=[hole(o+' '+o,ri),hole(e+' '+o,ri),hole(o+' '+e,ri),hole(e+' '+e,ri),hole(px+' '+o,rn),hole(px+' '+e,rn)].join(',');
    return 'position:absolute;inset:'+i+'px;border:'+w+'px solid var(--ink);background:'+
      [ring(o+' '+o,ri),ring(e+' '+o,ri),ring(o+' '+e,ri),ring(e+' '+e,ri),ring(px+' '+o,rn),ring(px+' '+e,rn)].join(',')+
      ';background-origin:border-box;-webkit-mask:'+M+';-webkit-mask-composite:source-in;mask:'+M+';mask-composite:intersect;pointer-events:none'};
  var css=[
    /* geometry: --px is the perforation, from the label column's own width (the label size times Anton's width for "BET #1:") */
    P+' .x2p-bt{--wash:.06;--ink:rgba(20,18,23,.88);--red:#c8372a;--grn:#1f7a45;--ls:clamp(25px,7.4vw,34px);--rb:11px;--rn:8px;--hr:1.7px;--hp:6.5px;'+
      '--pl:27px;--bw:calc(var(--ls) * 2.93);--aw:9px;--px:calc(var(--pl) + var(--bw) + 4px + var(--aw) + 5px);'+
      'position:relative;isolation:isolate;margin:22px 0 0;max-width:560px}',
    /* shadows: a soft contact shadow (blurred sibling, never an ancestor of the chip) and the site's hard offset, small */
    P+' .bt-sh{position:absolute;inset:0;z-index:-2;filter:blur(5px);transform:translate(2px,8px);pointer-events:none}',
    P+' .bt-sh>i,'+P+' .bt-hs{position:absolute;inset:0;background:#000;'+MASK+'}',
    P+' .bt-sh>i{opacity:.75}',
    P+' .bt-hs{z-index:-1;transform:translate(4px,4px);pointer-events:none}',
    /* the card */
    P+' .bt-p{position:relative;display:flex;align-items:stretch;min-height:0;color:#141217}',
    /* the paper itself: its own absolutely placed layer, die-cut by the mask; the label and the chip sit on it unmasked */
    P+' .bt-pp{position:absolute;inset:0;z-index:0;pointer-events:none;'+MASK+
      'background:'+[
        FIB+' 0 0/'+FW+'px '+FH+'px',
        GRAIN+' 0 0/200px 200px',
        /* hole rings and the lip either side of the perforation */
        /* each hole's cut wall: a lit lip upper left, a shaded wall lower right (light from the top left) */
        'radial-gradient(circle at calc(var(--px) + .7px) calc(50% + .9px),#0000 calc(var(--hr) - .1px),rgba(70,48,20,.55) calc(var(--hr) + .2px),#0000 calc(var(--hr) + 1.1px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at calc(var(--px) - .6px) calc(50% - .7px),#0000 calc(var(--hr) - .1px),rgba(255,255,255,.75) calc(var(--hr) + .1px),#0000 calc(var(--hr) + .9px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at var(--px) 50%,rgba(84,58,26,.34) calc(var(--hr) + .4px),rgba(84,58,26,0) calc(var(--hr) + 1.7px)) 0 50%/100% var(--hp) repeat-y',
        'linear-gradient(90deg,#0000 calc(var(--px) - 4.5px),rgba(255,255,255,.3) calc(var(--px) - 4.5px) calc(var(--px) - 3.5px),#0000 calc(var(--px) - 3.5px) calc(var(--px) + 3.6px),rgba(96,70,32,.16) calc(var(--px) + 3.6px) calc(var(--px) + 5.2px),#0000 calc(var(--px) + 5.2px))',
        /* toning along every cut: the bites, the notches, the straight edges; the top edge catches light, the bottom shows the card's thickness */
        'radial-gradient(circle at 0 0,#0000 var(--rb),rgba(140,100,45,.16) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 0,#0000 var(--rb),rgba(140,100,45,.16) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 0 100%,#0000 var(--rb),rgba(110,78,34,.22) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 100%,#0000 var(--rb),rgba(110,78,34,.24) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at var(--px) 0,#0000 var(--rn),rgba(140,100,45,.15) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'radial-gradient(circle at var(--px) 100%,#0000 var(--rn),rgba(110,78,34,.2) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'linear-gradient(180deg,rgba(255,255,255,.7) 0 1px,rgba(150,112,58,.10) 1px,#0000 6px)',
        'linear-gradient(0deg,rgba(78,54,22,.42) 0 1.2px,rgba(150,112,58,.14) 1.2px,#0000 7px)',
        'linear-gradient(90deg,rgba(255,255,255,.45) 0 .8px,rgba(150,112,58,.12) .8px,#0000 6px)',
        'linear-gradient(270deg,rgba(78,54,22,.3) 0 1px,rgba(150,112,58,.12) 1px,#0000 6px)',
        /* light across the card, slightly brighter top left, a hair darker bottom right; the stub a touch lighter (less handled) */
        'linear-gradient(168deg,rgba(255,255,255,.26),rgba(255,255,255,0) 42%,rgba(110,80,35,.07))',
        MOTTLE+' 0 0/100% 100%',
        '#f3eddf'].join(',')+'}',
    /* printed rules: a heavier outer and a hairline inner, at a constant inset from the die line */
    P+' .bt-r1{'+rule(5,1.3)+'}',
    P+' .bt-r2{'+rule(8.3,.7)+'}',
    /* the black pass sits a hair off the die: real die cutting drifts, so the frame is not centred on the cut */
    P+' .bt-r1,'+P+' .bt-r2{transform:translate(1.3px,-.9px)}',
    /* the colour plates: green bar and stripe left, red right, inside the frame, a hair off register (top runs into the hairline, a gap below) */
    P+' .bt-wr{position:absolute;inset:0;pointer-events:none;background:'+WEAR+' 0 0/260px 160px;'+
      '-webkit-mask:linear-gradient(180deg,#000,#0000 7px calc(100% - 8px),#000),linear-gradient(90deg,#000,#0000 7px calc(100% - 7px),#000);mask:linear-gradient(180deg,#000,#0000 7px calc(100% - 8px),#000),linear-gradient(90deg,#000,#0000 7px calc(100% - 7px),#000)}',
    P+' .bt-cb{position:absolute;top:10px;bottom:11.4px;left:10.6px;right:9.8px;pointer-events:none;'+
      'background:linear-gradient(90deg,rgba(31,122,69,.92) 0 7px,#0000 7px 9px,rgba(31,122,69,.92) 9px 11px,#0000 11px),'+
      'linear-gradient(270deg,rgba(200,55,42,.92) 0 7px,#0000 7px 9px,rgba(200,55,42,.92) 9px 11px,#0000 11px)}',
    /* paper shows through the solids: the same grain, lighter, over the bars only */
    P+' .bt-dl,'+P+' .bt-dr{position:absolute;top:0;bottom:0;z-index:3;pointer-events:none;background:'+DROP+' 0 0/180px 180px}',
    P+' .bt-dl{left:0;width:calc(var(--px) - 3px);-webkit-mask:'+DLM+';-webkit-mask-composite:source-in;mask:'+DLM+';mask-composite:intersect}',
    P+' .bt-dr{right:0;width:26px;background-position:-60px -40px;-webkit-mask:'+DRM+';-webkit-mask-composite:source-in;mask:'+DRM+';mask-composite:intersect}',
    /* the ticket body: micro label, concept 2's label, the serial */
    P+' .bt-b,'+P+' .bt-ad,'+P+' .bt-s{z-index:1}',
    P+' .bt-b{position:relative;flex:0 0 var(--bw);margin-left:var(--pl);display:flex;flex-direction:column;justify-content:center;gap:6px;padding:16px 0 15px}',
    P+' .bt-mt{font:800 8px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.17em;text-transform:uppercase;color:var(--ink);white-space:nowrap}',
    P+' .bt-mt b{font-weight:800;letter-spacing:.06em}',P+' .bt-mt b s{text-decoration:none;color:#9a6f0a}',P+' .bt-mt b u{text-decoration:none;color:var(--grn)}',P+' .bt-mt b q{quotes:none;color:var(--red)}',
    P+' .bt-b .x2p-cdh{margin:0;display:block;padding:0}',
    P+' .bt-b .x2p-cdh .k{display:none}',
    P+'[data-theme] .bt-b .x2p-cdh b{display:block;font:400 var(--ls)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:#141217;text-shadow:none;white-space:nowrap}',
    P+' .bt-b .x2p-cdh b i{font-style:normal;color:#141217}',
    P+' .bt-b .x2p-cdh b em{display:block;margin-top:.04em;font-style:normal;color:#f2b632;-webkit-text-stroke:1px #141217;text-shadow:.05em .05em 0 #141217,.09em .09em 0 #b3261e}',
    /* numbering-machine serial: red, mono, the "o" raised and underlined, a hair off axis, ink spread */
    P+' .bt-no{font:700 10.5px/1 "Chivo Mono",ui-monospace,monospace;letter-spacing:.06em;color:rgba(200,55,42,.94);text-shadow:0 0 .5px rgba(200,55,42,.7);white-space:nowrap;transform:translate(.6px,.4px) rotate(-.6deg);transform-origin:0 50%}',
    P+' .bt-no sup{font-size:.62em;vertical-align:.5em;text-decoration:underline;text-underline-offset:1px;margin:0 .22em 0 .02em;letter-spacing:0}',
    /* "ADMIT ONE" by the perforation, and the stub's own serial on the other side */
    P+' .bt-ad{position:relative;flex:0 0 var(--aw);margin-left:4px;display:flex;align-items:center;justify-content:center}',
    P+' .bt-ad span{writing-mode:vertical-rl;transform:rotate(180deg);font:800 8.5px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.24em;text-transform:uppercase;color:var(--ink);white-space:nowrap}',
    P+' .bt-s{position:relative;flex:1 1 0;min-width:0;display:flex;align-items:center;gap:7px;margin-left:5px;padding:15px 27px 15px 7px}',
    P+' .bt-s .bt-no{writing-mode:vertical-rl;transform:rotate(180deg) translate(-.5px,.3px);transform-origin:50% 50%;font-size:9px;flex:0 0 9px;align-self:center;margin-right:-1px}',
    P+' .bt-s .bt-no sup{vertical-align:baseline;font-size:.7em;text-decoration:none;margin:0 .3em 0 0}',
    /* the chip window: concept 2's crop, printed as a picture plate: a thin margin of the stock itself (an offset outline, so the paper's grain shows in it) and an ink keyline */
    P+' .bt-s #gpu{margin:0!important;flex:1 1 0;width:auto;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:0!important;box-shadow:none!important;outline:.9px solid rgba(20,18,23,.82)!important;outline-offset:2px!important;background:#000}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    /* the photo printed on the stock: a static paper tooth and a faint cream wash between the photo and the live digits (normal blend, no filter) */
    'html.v1wash'+P.slice(4)+' .bt-s #gpu .gpu-img::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:'+PTOOTH+' 0 0/160px 160px,linear-gradient(rgba(243,237,223,var(--wash)),rgba(243,237,223,var(--wash)))}',
    'html.v1wash'+P.slice(4)+' .bt-s #gpu .gpu-img .gpu-core{z-index:2}',
    /* the label is ink on the stock: multiplied so the paper shows through the gold, edges roughened a hair by the press (static, not the chip) */
    'html.v1ink'+P.slice(4)+' .bt-b .x2p-cdh b{mix-blend-mode:multiply}',
    'html.v1rough'+P.slice(4)+' .bt-b .x2p-cdh b{filter:url(#btRough)}',
    /* ---- phones: hero on two lines, the film and the bet ticket full bleed, a gap between them (as concept 5) ---- */
    '@media (max-width:599.98px){',
    P+'[data-theme] section.hero{padding-top:20px}',
    P+'[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    P+' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P+' .x2p-vt{margin:22px -16px 0;max-width:none;overflow-x:clip}',
    P+' .x2p-vt .vt-tag{left:16px}',
    P+' .x2p-bt{margin:24px -16px 0;max-width:none;overflow-x:clip}',
    P+' section.x2o-bet + section.x2o-rc{padding-top:22px}',
    '}'
  ].join('\n');
  var F=window.__fitFlags||{wash:1,ink:1,rough:1};['wash','ink','rough'].forEach(function(k){if(F[k])H.classList.add('v1'+k)});
  var st=d.createElement('style');st.id='v1fit-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var mk=function(tag,cls,html){var e=d.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
  var bt=mk('div','x2p-bt'),sh=mk('div','bt-sh'),p=mk('div','bt-p'),b=mk('div','bt-b'),s=mk('div','bt-s');
  sh.setAttribute('aria-hidden','true');sh.appendChild(mk('i'));bt.appendChild(sh);var hs=mk('div','bt-hs');hs.setAttribute('aria-hidden','true');bt.appendChild(hs);
  bt.appendChild(p);g.parentNode.insertBefore(bt,g);
  if(F.rough){var fs2=d.createElementNS('http://www.w3.org/2000/svg','svg');fs2.setAttribute('width','0');fs2.setAttribute('height','0');fs2.setAttribute('aria-hidden','true');fs2.style.cssText='position:absolute;width:0;height:0';
    fs2.innerHTML="<filter id='btRough' x='-4%' y='-4%' width='108%' height='108%'><feTurbulence type='fractalNoise' baseFrequency='"+(F.rf||1.1)+"' numOctaves='2' seed='5' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='"+(F.rs||.9)+"' xChannelSelector='R' yChannelSelector='G'/></filter>";bt.appendChild(fs2)}
  var pp=mk('div','bt-pp');pp.setAttribute('aria-hidden','true');p.appendChild(pp);
  ['bt-wr','bt-r1','bt-r2','bt-cb'].forEach(function(c){var e=mk('i',c);e.setAttribute('aria-hidden','true');pp.appendChild(e)});
  var mt=mk('div','bt-mt','<b><s>$</s><u>E</u><q>Z</q></b> · Season 1');mt.setAttribute('aria-hidden','true');
  var no='<sup>o</sup>',ink=[1,.82,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var num=function(){return 'N'+no+' '+'000001'.split('').map(function(c,i){return '<span style="opacity:'+ink[i]+';position:relative;top:'+dy[i]+'px">'+c+'</span>'}).join('')};
  b.appendChild(mt);b.appendChild(h);var n1=mk('div','bt-no',num());n1.setAttribute('aria-hidden','true');b.appendChild(n1);p.appendChild(b);
  var ad=mk('div','bt-ad','<span>Admit one</span>');ad.setAttribute('aria-hidden','true');p.appendChild(ad);
  var n2=mk('div','bt-no',num());n2.setAttribute('aria-hidden','true');s.appendChild(n2);
  p.appendChild(s);s.appendChild(g);
  ['bt-dl','bt-dr'].forEach(function(c){var e=mk('i',c);e.setAttribute('aria-hidden','true');p.appendChild(e)});
  var im=g.querySelector('img');if(im){im.loading='eager'}
  return 'ok'};
