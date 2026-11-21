/* v4 "Admit One x Fight Night" (owner, 2026-10-22: "I sort of like the ticket format more from Admit One, but I prefer ... the colors
   in general, the layout of the colors and how everything is written, more from Fight Night").
   FORMAT from Admit One (v1): the die cut (a concave quarter-circle bite at each corner, a half-circle notch top and bottom at the
   perforation), the perforation as a row of punched round holes with a lit lip and a shaded wall, the thin printed double-rule frame
   with its arcs, the card stock (fibre grain, longer fibres, toned cut edges, a lit top edge and a shaded bottom edge for the card's
   thickness), the soft contact shadow plus the small hard offset, and the chip window as a picture plate (stock margin + ink keyline).
   COLOURS, THEIR LAYOUT AND THE WRITING from Fight Night (v2): the green header strip ("★ $EZ MAIN EVENT ★" over the body, "SEASON 1"
   over the stub), the red footer strip ("ADMIT ONE" over the body, "№ 000001" over the stub), the ivory body, "BET #1:" pressed in ink
   and "NVIDIA" in gold foil over a red print offset, three red stars under it, centred in the body column, the faint red sunburst.
   The strips are solids printed to bleed, so the die cuts straight through them: the corner bites, the notches and the punched holes
   all go through the green and the red. The double rule is printed on the ivory between the strips (frame "inside"): type and fine
   rules are kept off the solids and away from the trim, as a printer would, and its corners and the perforation keep A's arcs.
   Dropped: A's side colour bars, vertical "ADMIT ONE", "$EZ · SEASON 1" line and serials; B's torn edge, worn corners, crease, gloss.
   NVIDIA's foil is one smooth mirror gradient (bright top, a single soft horizon, warm bounce at the foot) with a lit top rim and a
   dark keyline, no hard stops, so it reads as stamped foil and not as stripes. Static, no animation.
   No filter, mask or blend on any ancestor of the live #gpu chip: the paper, the rules and the shadows are siblings of it.
   Mock injector: eval on the loaded X2+ page, then call window.__fit(). window.__fitFlags = {frame:'around'} draws A's frame the
   old way (round the die line, knocked out of the strips) for comparison only. */
window.__fit=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('v4fit'))return 'already';H.classList.add('v4fit');
  var F=window.__fitFlags||{},AROUND=F.frame==='around';
  var P='html.x2p.x2d.v4fit';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var enc=function(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'};
  var INK='#141217',PAPER='#e9ddbf',GREEN='#1f7a45',RED='#c8372a';
  /* ---- textures (A's stock): static data-URI svgs, rasterised once ---- */
  var GRAIN=enc("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='t' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .30 0 0 0 0 .22 0 0 0 0 .11 1.5 0 0 0 -.79'/></filter><filter id='l' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.7' numOctaves='2' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 .98 -1.7 0 0 0 .79'/></filter><filter id='s' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='1' seed='19' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .28 0 0 0 0 .2 0 0 0 0 .1 0 7 0 0 -5.05'/></filter><rect width='200' height='200' filter='url(#t)'/><rect width='200' height='200' filter='url(#l)'/><rect width='200' height='200' filter='url(#s)'/></svg>");
  /* paper showing through the solids: fine drop-outs (A) and B's ink voids, a starved patch toward the header's far end, rubbed scuffs */
  var DROP=enc("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='d' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' seed='23' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .96 0 0 0 0 .93 0 0 0 0 .86 0 6 0 0 -4.3'/></filter><rect width='180' height='180' filter='url(#d)'/></svg>");
  var NZ=function(body,w,op){return enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+w+"'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>"+body+"</filter><rect width='100%' height='100%' filter='url(#f)' opacity='"+op+"'/></svg>")};
  var VOID=NZ("<feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='21' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  14 0 0 0 -10.4'/>",180,.32);
  var VOID2=enc("<svg xmlns='http://www.w3.org/2000/svg' width='220' height='17'><defs><linearGradient id='g'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#fff' stop-opacity='.25'/><stop offset='1' stop-color='#fff'/></linearGradient><mask id='m'><rect width='100%' height='100%' fill='url(#g)'/></mask></defs><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='2' seed='37'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  12 0 0 0 -8.2'/></filter><rect width='100%' height='100%' filter='url(#f)' mask='url(#m)' opacity='.5'/></svg>");
  var SCUFF=NZ("<feTurbulence type='fractalNoise' baseFrequency='.03 .09' numOctaves='3' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .92  0 0 0 0 .84  9 0 0 0 -6.3'/>",360,.2);
  var MOTTLE=enc("<svg xmlns='http://www.w3.org/2000/svg' width='560' height='180'><filter id='m' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='.011 .03' numOctaves='3' seed='8'/><feColorMatrix values='0 0 0 0 .55 0 0 0 0 .40 0 0 0 0 .18 .9 0 0 0 -.39'/></filter><rect width='560' height='180' filter='url(#m)'/></svg>");
  var STAR=function(c){return enc("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='"+c+"' d='M10 .8l2.7 6.1 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.4 1.5-6.5-5-4.4 6.6-.6z'/></svg>")};
  /* longer fibres and a few specks, seeded so every load is the same sheet */
  var seed=20261022,rnd=function(){seed|=0;seed=seed+0x6D2B79F5|0;var t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296};
  var FW=300,FH=200,fs='';
  for(var k=0;k<34;k++){var x=rnd()*FW,y=rnd()*FH,a=rnd()*Math.PI*2,L=5+rnd()*rnd()*30,bend=(rnd()-.5)*L*.5,
    ex=x+Math.cos(a)*L,ey=y+Math.sin(a)*L,cx=(x+ex)/2-Math.sin(a)*bend,cy=(y+ey)/2+Math.cos(a)*bend,
    col=rnd()<.72?'110,84,48':(rnd()<.6?'96,104,122':'160,70,60'),op=(.13+rnd()*.19).toFixed(2),w=(.4+rnd()*.45).toFixed(2);
    fs+="<path d='M"+x.toFixed(1)+' '+y.toFixed(1)+'Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+ex.toFixed(1)+' '+ey.toFixed(1)+"' stroke='rgba("+col+','+op+")' stroke-width='"+w+"' fill='none' stroke-linecap='round'/>"}
  for(k=0;k<9;k++){fs+="<circle cx='"+(rnd()*FW).toFixed(1)+"' cy='"+(rnd()*FH).toFixed(1)+"' r='"+(.3+rnd()*.45).toFixed(2)+"' fill='rgba(55,40,22,"+(.22+rnd()*.25).toFixed(2)+")'/>"}
  var FIB=enc("<svg xmlns='http://www.w3.org/2000/svg' width='"+FW+"' height='"+FH+"'>"+fs+"</svg>");
  var PTOOTH=enc("<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='g' x='0' y='0' width='100%' height='100%'><feTurbulence type='fractalNoise' baseFrequency='1.3' numOctaves='2' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95 0 0 0 0 .92 0 0 0 0 .84 1.15 0 0 0 -.6'/></filter><rect width='160' height='160' filter='url(#g)'/></svg>");
  /* ---- A's die line: four corner bites, a notch top and bottom at the perforation, the punched holes; full-size layers, intersected ---- */
  var cut=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .35px),#000 calc('+r+' + .45px))'};
  var DIE=[cut('0 0','var(--rb)'),cut('100% 0','var(--rb)'),cut('0 100%','var(--rb)'),cut('100% 100%','var(--rb)'),
    cut('var(--px) 0','var(--rn)'),cut('var(--px) 100%','var(--rn)'),
    'radial-gradient(circle at var(--px) 50%,#0000 calc(var(--hr) - .3px),#000 calc(var(--hr) + .4px)) 0 50%/100% var(--hp) repeat-y'].join(',');
  var MASK='-webkit-mask:'+DIE+';-webkit-mask-composite:source-in;mask:'+DIE+';mask-composite:intersect;';
  var STRIPS='linear-gradient(180deg,#000 0 var(--st),#0000 var(--st) calc(100% - var(--sb)),#000 calc(100% - var(--sb)))';
  var hole=function(at,r){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),#000 calc('+r+' + .3px))'};
  var ring=function(at,r,w,c){return 'radial-gradient(circle at '+at+',#0000 calc('+r+' - .3px),'+c+' '+r+','+c+' calc('+r+' + '+w+'px),#0000 calc('+r+' + '+(w+.4)+'px))'};
  /* the double rule printed on the ivory between the strips: its sides at A's inset from the die line, a concave arc at each corner
     (echoing the bites) and a half-round dip under each notch (echoing the notches); d = distance in from the outer rule, w = weight */
  var ruleIn=function(d,w){
    var o='-'+d+'px',e='calc(100% + '+d+'px)',rc='calc(var(--rc) + '+d+'px)',rq='calc(var(--rq) + '+d+'px)',qx='calc(var(--px) - var(--fi) - '+d+'px)',c='var(--ink)';
    var M=[hole(o+' '+o,rc),hole(e+' '+o,rc),hole(o+' '+e,rc),hole(e+' '+e,rc),hole(qx+' '+o,rq),hole(qx+' '+e,rq)].join(',');
    return 'position:absolute;left:calc(var(--fi) + '+d+'px);right:calc(var(--fi) + '+d+'px);top:calc(var(--st) + var(--fg) + '+d+'px);bottom:calc(var(--sb) + var(--fg) + '+d+'px);'+
      'border:'+w+'px solid '+c+';background:'+[ring(o+' '+o,rc,w,c),ring(e+' '+o,rc,w,c),ring(o+' '+e,rc,w,c),ring(e+' '+e,rc,w,c),ring(qx+' '+o,rq,w,c),ring(qx+' '+e,rq,w,c)].join(',')+
      ';background-origin:border-box;-webkit-mask:'+M+';-webkit-mask-composite:source-in;mask:'+M+';mask-composite:intersect;pointer-events:none'};
  /* comparison only: A's own frame (round the die line at a constant inset), ink on the ivory and knocked out (paper) on the strips */
  var ruleAround=function(i,w,c){
    var ri='calc(var(--rb) + '+i+'px)',rn='calc(var(--rn) + '+i+'px)',px='calc(var(--px) - '+i+'px)',o='-'+i+'px',e='calc(100% + '+i+'px)';
    var M=[hole(o+' '+o,ri),hole(e+' '+o,ri),hole(o+' '+e,ri),hole(e+' '+e,ri),hole(px+' '+o,rn),hole(px+' '+e,rn)].join(',');
    return 'position:absolute;inset:'+i+'px;border:'+w+'px solid '+c+';background:'+
      [ring(o+' '+o,ri,w,c),ring(e+' '+o,ri,w,c),ring(o+' '+e,ri,w,c),ring(e+' '+e,ri,w,c),ring(px+' '+o,rn,w,c),ring(px+' '+e,rn,w,c)].join(',')+
      ';background-origin:border-box;-webkit-mask:'+M+';-webkit-mask-composite:source-in;mask:'+M+';mask-composite:intersect;pointer-events:none'};
  var css=[
    /* geometry: --b is the body column (B's), the perforation sits at its right edge; --st/--sb are the strips (B's, a touch slimmer on phones) */
    P+' .x2p-bt{--ink:rgba(20,18,23,.88);--ls:clamp(25px,7.4vw,34px);--rb:11px;--rn:8px;--hr:1.7px;--hp:6.5px;'+
      '--b:clamp(128px,41vw,200px);--px:var(--b);--st:clamp(15px,4vw,17px);--sb:var(--st);--fi:5px;--fg:2.5px;--rc:4.5px;--rq:3.5px;'+
      '--pad:calc(var(--st) + 12px);'+(AROUND?'--st:clamp(19px,5vw,22px);--pad:calc(var(--st) + 5px);':'')+
      'position:relative;isolation:isolate;margin:22px 0 0;max-width:560px;color:'+INK+'}',
    /* A's shadows: a soft contact shadow (blurred sibling, never an ancestor of the chip) and the site's hard offset, small */
    P+' .bt-sh{position:absolute;inset:0;z-index:-2;filter:blur(4.5px);transform:translate(2px,6px);pointer-events:none}',
    P+' .bt-sh>i,'+P+' .bt-hs{position:absolute;inset:0;background:#000;'+MASK+'}',
    P+' .bt-sh>i{opacity:.75}',
    P+' .bt-hs{z-index:-1;transform:translate(4px,4px);pointer-events:none}',
    /* the card: B's grid (body column | stub), the strips' depth as padding */
    P+' .bt-p{position:relative;display:grid;grid-template-columns:var(--b) minmax(0,1fr);align-items:center;padding:var(--pad) 0;min-height:0}',
    /* the paper: its own absolutely placed layer, die-cut by the mask; the label and the chip sit on it unmasked */
    P+' .bt-pp{position:absolute;inset:0;z-index:0;pointer-events:none;'+MASK+
      'background:'+[
        /* each hole's cut wall: a lit lip upper left, a shaded wall lower right (light from the top left) */
        'radial-gradient(circle at calc(var(--px) + .7px) calc(50% + .9px),#0000 calc(var(--hr) - .1px),rgba(70,48,20,.55) calc(var(--hr) + .2px),#0000 calc(var(--hr) + 1.1px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at calc(var(--px) - .6px) calc(50% - .7px),#0000 calc(var(--hr) - .1px),rgba(255,255,255,.7) calc(var(--hr) + .1px),#0000 calc(var(--hr) + .9px)) 0 50%/100% var(--hp) repeat-y',
        'radial-gradient(circle at var(--px) 50%,rgba(84,58,26,.34) calc(var(--hr) + .4px),rgba(84,58,26,0) calc(var(--hr) + 1.7px)) 0 50%/100% var(--hp) repeat-y',
        /* toning along every cut: the bites, the notches, the straight edges; the top edge catches light, the bottom shows the card's thickness */
        'radial-gradient(circle at 0 0,#0000 var(--rb),rgba(140,100,45,.18) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 0,#0000 var(--rb),rgba(140,100,45,.18) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 0 100%,#0000 var(--rb),rgba(110,78,34,.24) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at 100% 100%,#0000 var(--rb),rgba(110,78,34,.26) calc(var(--rb) + .5px),#0000 calc(var(--rb) + 6px))',
        'radial-gradient(circle at var(--px) 0,#0000 var(--rn),rgba(140,100,45,.17) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'radial-gradient(circle at var(--px) 100%,#0000 var(--rn),rgba(110,78,34,.22) calc(var(--rn) + .5px),#0000 calc(var(--rn) + 5px))',
        'linear-gradient(180deg,rgba(255,255,255,.55) 0 1px,rgba(150,112,58,.10) 1px,#0000 6px)',
        'linear-gradient(0deg,rgba(60,40,14,.45) 0 1.2px,rgba(120,90,45,.14) 1.2px,#0000 7px)',
        'linear-gradient(90deg,rgba(255,255,255,.4) 0 .8px,rgba(150,112,58,.12) .8px,#0000 6px)',
        'linear-gradient(270deg,rgba(78,54,22,.3) 0 1px,rgba(150,112,58,.12) 1px,#0000 6px)',
        /* light across the card, slightly brighter top left, a hair darker bottom right */
        'linear-gradient(168deg,rgba(255,255,255,.1),rgba(255,255,255,0) 42%,rgba(110,80,35,.07))',
        /* B's aged rim: the ivory a shade warmer toward the edges */
        'radial-gradient(140% 120% at 45% 40%,#0000 55%,rgba(130,92,30,.15))',
        /* B's print: rubbed scuffs and ink voids (paper on paper disappears, so they only show on the solids) */
        SCUFF+' 140px 3px/360px',
        VOID+' 0 0/180px',
        VOID2+' right 14px top 0/220px var(--st) no-repeat',
        /* B's letterpress strips, bled past the die: ink with a darker squeeze edge on the inner side */
        'linear-gradient(#0000 calc(var(--st) - 1.2px),rgba(0,0,0,.22) calc(var(--st) - 1.2px)) 0 0/100% var(--st) no-repeat',
        'linear-gradient('+GREEN+','+GREEN+') 0 0/100% var(--st) no-repeat',
        'linear-gradient(rgba(0,0,0,.22) 1.2px,#0000 1.2px) 0 100%/100% var(--sb) no-repeat',
        'linear-gradient('+RED+','+RED+') 0 100%/100% var(--sb) no-repeat',
        /* the card under the ink: A's fibres and grain (the solids cover them, as ink covers the sheet) */
        FIB+' 0 0/'+FW+'px '+FH+'px',
        GRAIN+' 0 0/200px 200px',
        /* B's pale red sunburst round the name, fading out toward the edges of the body column */
        'radial-gradient(closest-side at 50% 52%,#0000 35%,'+PAPER+' 100%) 0 0/var(--b) 100% no-repeat',
        'repeating-conic-gradient(from 3deg at 50% 52%,rgba(200,55,42,.05) 0 5deg,#0000 5deg 10deg) 0 0/var(--b) 100% no-repeat',
        MOTTLE+' 0 0/100% 100%',
        PAPER].join(',')+'}',
    /* the drop-outs stop at the strips: the ivory keeps only A's clean grain */
    /* printed rules (A's weights: a heavier outer and a hairline inner, 3.3px apart), the black pass a hair off the die */
    AROUND?P+' .bt-r1{'+ruleAround(5,1.3,'var(--ink)')+'}':P+' .bt-r1{'+ruleIn(0,1.3)+'}',
    AROUND?P+' .bt-r2{'+ruleAround(8.3,.7,'var(--ink)')+'}':P+' .bt-r2{'+ruleIn(3.3,.7)+'}',
    P+' .bt-r1,'+P+' .bt-r2{transform:translate(.8px,-.4px)}',
    /* the perforation's lip either side of the holes (A), on the ivory only: on the solids it read as a scratch */
    P+' .bt-pl{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,#0000 calc(var(--px) - 4.5px),rgba(255,255,255,.3) calc(var(--px) - 4.5px) calc(var(--px) - 3.5px),#0000 calc(var(--px) - 3.5px) calc(var(--px) + 3.6px),rgba(96,70,32,.16) calc(var(--px) + 3.6px) calc(var(--px) + 5.2px),#0000 calc(var(--px) + 5.2px));'+
      '-webkit-mask:linear-gradient(180deg,#0000 var(--st),#000 var(--st) calc(100% - var(--sb)),#0000 calc(100% - var(--sb)));mask:linear-gradient(180deg,#0000 var(--st),#000 var(--st) calc(100% - var(--sb)),#0000 calc(100% - var(--sb)))}',
    /* ---- B's strip labels, reversed out of the ink ---- */
    P+' .bt-st{position:absolute;left:0;right:0;z-index:2;display:flex;align-items:center;pointer-events:none;font:800 8.6px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#f3ead3;white-space:nowrap}',
    P+' .bt-st.bt-hd{top:0;height:var(--st)}',P+' .bt-st.bt-ft{bottom:0;height:var(--sb)}',
    AROUND?P+' .bt-st.bt-hd{top:9px;height:calc(var(--st) - 9px)}'+P+' .bt-st.bt-ft{bottom:9px;height:calc(var(--sb) - 9px)}':'',
    P+' .bt-st span{display:flex;align-items:center;gap:5px}',P+' .bt-st span i{display:block;width:7px;height:7px;background:'+STAR('#f2b632')+' 0 0/100% no-repeat}',
    P+' .bt-st .l{width:var(--b);justify-content:center;padding:0 5px 0 calc(12px + .22em)}',P+' .bt-st .r{flex:1;justify-content:center;padding:0 15px 0 10px}',
    /* the serial: B's numbering-machine "No 000001" in ink on the red, right edge on the chip window's right edge */
    P+' .bt-st .r.e{justify-content:flex-end;padding:0 15px 0 0}',
    P+' .bt-st .bt-no{display:block;text-transform:none;letter-spacing:.16em;margin-right:-.16em;color:'+INK+';opacity:.86;transform:translate(.6px,-.4px) rotate(-.6deg);font-variant-numeric:tabular-nums}',
    P+' .bt-st .bt-no u{display:inline-block;font-size:.7em;line-height:1;vertical-align:.42em;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:1.5px;margin:0 .32em 0 .02em;letter-spacing:0}',
    P+' .bt-st .bt-no s{text-decoration:none;position:relative}',
    /* ---- B's label, centred in the body column ---- */
    P+' .bt-b{position:relative;z-index:1;display:grid;justify-items:center;align-content:center;min-width:0;padding:0 5px 0 12px}',
    P+' .bt-b .x2p-cdh{margin:0;display:block;padding:0}',
    P+' .bt-b .x2p-cdh .k{display:none}',
    P+'[data-theme] .bt-b .x2p-cdh b{display:block;text-align:center;font:400 var(--ls)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:'+INK+';text-shadow:none;white-space:nowrap}',
    /* "BET #1:" pressed in ink: B's letterpress (a pale lip under each stroke), edges roughened a hair by the press (static) */
    P+' .bt-b .x2p-cdh .bt-ink{display:block;text-shadow:0 .9px 0 rgba(255,251,238,.75)}',
    P+' .bt-b .x2p-cdh b i{font-style:normal;color:'+INK+'}',
    'html.v4rough'+P.slice(4)+' .bt-b .x2p-cdh .bt-ink{filter:url(#btRough)}',
    /* "NVIDIA" in gold foil: the red print offset and a dark keyline below (B), then the foil itself: a lit top rim and one smooth mirror gradient */
    P+' .bt-b .x2p-cdh b em{position:relative;display:table;margin:.05em auto 0;font-style:normal;color:transparent;text-shadow:.055em .055em 0 '+RED+';-webkit-text-stroke:.75px #3a2706}',
    P+' .bt-b .x2p-cdh b em::before,'+P+' .bt-b .x2p-cdh b em::after{content:attr(data-t);content:attr(data-t) / "";position:absolute;left:0;top:0;right:0;text-shadow:none;-webkit-text-stroke:0;pointer-events:none}',
    P+' .bt-b .x2p-cdh b em::before{color:#fff7dc;transform:translate(.35px,-1.05px)}',
    P+' .bt-b .x2p-cdh b em::after{transform:translate(.5px,-.45px);-webkit-text-fill-color:transparent;-webkit-background-clip:text;background-clip:text;background:'+
      (F.foil||[
        /* one soft specular bloom high on the left (the light), and a faint cool kiss of the room top right: mirror, not stripes */
        'radial-gradient(ellipse 46% 70% at 28% 18%,rgba(255,252,236,.72),rgba(255,248,214,.3) 45%,rgba(255,244,200,0) 75%)',
        'radial-gradient(ellipse 40% 60% at 86% 22%,rgba(255,250,232,.38),rgba(255,250,232,0) 70%)',
        /* the mirror: bright sky, a single soft horizon below the middle, the warm bounce of the paper at the foot */
        'linear-gradient(180deg,#fff0bf 0%,#fddc7a 18%,#f5c043 38%,#e3a628 50%,#b98110 57%,#d89d24 64%,#f3bf45 80%,#fcdc8a 100%)'
      ].join(','))+';-webkit-background-clip:text;background-clip:text}',
    /* B's three red stars under the name */
    P+' .bt-mk{display:flex;align-items:center;justify-content:center;gap:6px;margin:8px 0 0}',
    P+' .bt-mk i{display:block;width:8px;height:8px;background:'+STAR(RED)+' 0 0/100% no-repeat}',P+' .bt-mk i:nth-child(2){width:10px;height:10px}',
    /* ---- the stub: A's picture plate (a thin margin of the stock, then an ink keyline), concept 2's crop ---- */
    P+' .bt-s{position:relative;z-index:1;min-width:0;display:flex;align-items:center;padding:0 15px 0 10px}',
    P+' .bt-s #gpu{margin:0!important;width:100%;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:0!important;box-shadow:none!important;outline:.9px solid rgba(20,18,23,.82)!important;outline-offset:2px!important;background:#000}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    /* the photo printed on the stock: a static paper tooth and a faint ivory wash between the photo and the live digits (normal blend, no filter) */
    P+' .bt-s #gpu .gpu-img::before{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:'+PTOOTH+' 0 0/160px 160px,linear-gradient(rgba(239,228,200,.06),rgba(239,228,200,.06))}',
    P+' .bt-s #gpu .gpu-img .gpu-core{z-index:2}',
    /* ---- phones: hero on two lines, the film and the bet ticket full bleed, a gap of about 20px between them ---- */
    '@media (max-width:599.98px){',
    P+'[data-theme] section.hero{padding-top:20px}',
    P+'[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    P+' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P+' .x2p-vt{margin:22px -16px 0;max-width:none;overflow-x:clip}',
    P+' .x2p-vt .vt-tag{left:16px}',
    P+' .x2p-bt{margin:20px -16px 0;max-width:none;overflow-x:clip}',
    P+' section.x2o-bet + section.x2o-rc{padding-top:22px}',
    '}'
  ].join('\n');
  if(F.rough!==0)H.classList.add('v4rough');
  var st=d.createElement('style');st.id='v4fit-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var mk=function(tag,cls,html){var e=d.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e};
  var hid=function(e){e.setAttribute('aria-hidden','true');return e};
  /* the label: "Bet #1:" wrapped so the press roughening stays off the foil (same words, same reading order) */
  var lb=h.querySelector('b'),em=lb&&lb.querySelector('em');
  if(lb&&em&&!lb.querySelector('.bt-ink')){var sp=mk('span','bt-ink');while(lb.firstChild&&lb.firstChild!==em)sp.appendChild(lb.firstChild);lb.insertBefore(sp,em);lb.insertBefore(d.createTextNode(' '),em);
    if(/\s$/.test(sp.textContent)&&sp.lastChild.nodeType===3)sp.lastChild.nodeValue=sp.lastChild.nodeValue.replace(/\s+$/,'')}
  if(em)em.setAttribute('data-t',em.textContent);
  var bt=mk('div','x2p-bt'),sh=hid(mk('div','bt-sh')),hs=hid(mk('div','bt-hs')),p=mk('div','bt-p'),b=mk('div','bt-b'),s=mk('div','bt-s');
  sh.appendChild(mk('i'));bt.appendChild(sh);bt.appendChild(hs);bt.appendChild(p);g.parentNode.insertBefore(bt,g);
  if(F.rough!==0){var fs2=d.createElementNS('http://www.w3.org/2000/svg','svg');fs2.setAttribute('width','0');fs2.setAttribute('height','0');fs2.setAttribute('aria-hidden','true');fs2.style.cssText='position:absolute;width:0;height:0';
    fs2.innerHTML="<filter id='btRough' x='-4%' y='-4%' width='108%' height='108%'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' seed='5' result='n'/><feDisplacementMap in='SourceGraphic' in2='n' scale='.55' xChannelSelector='R' yChannelSelector='G'/></filter>";bt.appendChild(fs2)}
  var pp=hid(mk('div','bt-pp'));p.appendChild(pp);
  ['bt-pl','bt-r1','bt-r2'].forEach(function(c){pp.appendChild(hid(mk('i',c)))});
  if(AROUND){/* the same frame knocked out of the strips: paper-coloured over the solids */
    var ko=hid(mk('i','bt-ko'));ko.style.cssText='position:absolute;inset:0;-webkit-mask:'+STRIPS+';mask:'+STRIPS;pp.appendChild(ko);
    var k1=hid(mk('i','bt-r1')),k2=hid(mk('i','bt-r2'));k1.style.setProperty('--ink','#efe4c8');k2.style.setProperty('--ink','#efe4c8');ko.appendChild(k1);ko.appendChild(k2)}
  b.appendChild(h);b.appendChild(hid(mk('div','bt-mk','<i></i><i></i><i></i>')));p.appendChild(b);
  p.appendChild(s);s.appendChild(g);
  /* B's strips and words; the serial's digits inked a touch unevenly, as a numbering machine does */
  var ink=[1,.84,.95,.88,1,.9],dy=[0,.3,-.2,.2,-.3,.1];
  var num='N<u>o</u> '+'000001'.split('').map(function(c,i){return '<s style="opacity:'+ink[i]+';top:'+dy[i]+'px">'+c+'</s>'}).join('');
  p.appendChild(hid(mk('div','bt-st bt-hd','<span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 1</span>')));
  p.appendChild(hid(mk('div','bt-st bt-ft','<span class="l">Admit one</span><span class="r e"><span class="bt-no">'+num+'</span></span>')));
  var im=g.querySelector('img');if(im){im.loading='eager'}
  return 'ok'};
