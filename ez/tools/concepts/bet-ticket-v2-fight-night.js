/* Direction 2 · Fight Night (owner, 2026-10-22: "look more like an actual paper ticket", no staple, a couple of options).
   A vintage arena event ticket to match the explainer film's arena: heavy coated card (ivory, fine grain, a soft gloss, aged edges),
   letterpress print (a green header strip and a red footer strip with a thin rule each, ink voids, edge wear, scuffs),
   "BET #1:" pressed in ink, "NVIDIA" stamped in gold foil over a red print offset, tiny stars and micro labels, rounded worn
   corners, a fold crease across the body, pin-hole perforation with V notches, and the stub's far edge torn off (fibre fringe).
   No staple. The paper is drawn by masked layers BEHIND the content: nothing with a mask or filter is an ancestor of the
   live #gpu countdown. The outline (worn corners, notches, holes, torn edge) is one SVG mask built at the ticket's exact
   pixel size by JS and rebuilt on resize. Mock injector: eval on the loaded X2+ page, then call window.__fit(). */
window.__fit=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('fnfit'))return 'already';H.classList.add('fnfit');
  var P='html.x2p.x2d.fnfit';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var U=function(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'};
  var NZ=function(body,w,op){return U("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+w+"'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>"+body+"</filter><rect width='100%' height='100%' filter='url(#f)' opacity='"+op+"'/></svg>")};
  /* paper: fine grain, slow mottle, paper fibres; print: ink voids (paper showing through), rubbed scuffs */
  var GRAIN=NZ("<feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' seed='4' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .24  0 0 0 0 .17  0 0 0 0 .08  -2.4 0 0 0 1.3'/>",220,.15);
  var MOTTLE=NZ("<feTurbulence type='fractalNoise' baseFrequency='.03' numOctaves='4' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5  0 0 0 0 .36  0 0 0 0 .14  -1.6 0 0 0 .95'/>",400,.07);
  var FIB=NZ("<feTurbulence type='fractalNoise' baseFrequency='.035 .6' numOctaves='2' seed='11' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .4  0 0 0 0 .3  0 0 0 0 .16  7 0 0 0 -4.75'/>",300,.11);
  var VOID=NZ("<feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='21' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  14 0 0 0 -10.4'/>",180,.4);
  /* where the plate starved: bigger voids, clustered toward one end of the header strip (a gradient mask inside the tile) */
  var VOID2=U("<svg xmlns='http://www.w3.org/2000/svg' width='220' height='"+17+"'><defs><linearGradient id='g'><stop offset='0' stop-color='#fff' stop-opacity='0'/><stop offset='.55' stop-color='#fff' stop-opacity='.25'/><stop offset='1' stop-color='#fff'/></linearGradient><mask id='m'><rect width='100%' height='100%' fill='url(#g)'/></mask></defs><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='2' seed='37'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .91  0 0 0 0 .82  12 0 0 0 -8.2'/></filter><rect width='100%' height='100%' filter='url(#f)' mask='url(#m)' opacity='.55'/></svg>");
  var SCUFF=NZ("<feTurbulence type='fractalNoise' baseFrequency='.03 .09' numOctaves='3' seed='5' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .95  0 0 0 0 .92  0 0 0 0 .84  9 0 0 0 -6.3'/>",360,.22);
  var STAR=function(c){return U("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'><path fill='"+c+"' d='M10 .8l2.7 6.1 6.6.6-5 4.4 1.5 6.5L10 15l-5.8 3.4 1.5-6.5-5-4.4 6.6-.6z'/></svg>")};
  var INK='#141217',PAPER='#efe4c8',GREEN='#1f7a45',RED='#c8372a';
  var TOP=17,BOT=16; /* strip heights */
  var css=[
    P+' .x2p-bt{--b:clamp(128px,38.7vw,200px);--rl:none;position:relative;isolation:isolate;margin:22px 0 0;max-width:560px;color:'+INK+'}',
    /* the four paper layers (shadow, card edge, torn fibres, printed face), each masked by the generated outline */
    P+' .x2p-bt>.bt-l{position:absolute;inset:0;pointer-events:none;-webkit-mask:var(--mA) 0 0/100% 100% no-repeat;mask:var(--mA) 0 0/100% 100% no-repeat}',
    P+' .x2p-bt>.bt-sh{background:#000;transform:translate(5px,5px);z-index:-4}',
    P+' .x2p-bt>.bt-th{background:#a08a62;transform:translate(.4px,1.5px);z-index:-3;-webkit-mask-image:var(--mT);mask-image:var(--mT)}',
    P+' .x2p-bt>.bt-fb{background:'+FIB+' 0 0/300px,#f9f4e7;z-index:-2}',
    P+' .x2p-bt>.bt-pp{z-index:-1;-webkit-mask-image:var(--mB);mask-image:var(--mB);background:'+[
      /* gloss of the coated stock */
      'linear-gradient(112deg,transparent 28%,rgba(255,255,255,.16) 41%,rgba(255,255,255,.05) 50%,transparent 60%)',
      /* worn corners on the left: the ink rubbed through */
      'radial-gradient(circle at 0 0,rgba(239,228,200,.85),rgba(239,228,200,.35) 6px,transparent 12px)',
      'radial-gradient(circle at 0 100%,rgba(239,228,200,.85),rgba(239,228,200,.35) 6px,transparent 12px)',
      /* edge wear along the top and bottom edges */
      'linear-gradient(rgba(239,228,200,.55),transparent) 0 0/100% 2px no-repeat',
      'linear-gradient(0deg,rgba(239,228,200,.55),transparent) 0 100%/100% 2px no-repeat',
      /* scuffs and ink voids (cream on cream disappears, so they only show on the print) */
      SCUFF+' 140px 3px/360px',
      VOID+' 0 0/180px',
      VOID2+' right 14px top 0/220px '+TOP+'px no-repeat',
      /* letterpress strips: ink with a darker squeeze edge, then a thin rule each */
      'linear-gradient(transparent '+(TOP-1.2)+'px,rgba(0,0,0,.22) '+(TOP-1.2)+'px) 0 0/100% '+TOP+'px no-repeat',
      'linear-gradient('+GREEN+','+GREEN+') 0 0/100% '+TOP+'px no-repeat',
      'linear-gradient(rgba(0,0,0,.22) 1.2px,transparent 1.2px) 0 100%/100% '+BOT+'px no-repeat',
      'linear-gradient('+RED+','+RED+') 0 100%/100% '+BOT+'px no-repeat',
      /* the inner rules: a separate pass, a hair off square (an SVG drawn at the ticket's size, so they stay smooth, not stepped) */
      'var(--rl) 0 0/100% 100% no-repeat',
      /* the card: fibres, grain, mottle, an aged rim (over the tint print, so the grain shows through it) */
      FIB+' 37px 11px/300px',GRAIN+' 0 0/220px',MOTTLE+' 0 0/400px',
      'radial-gradient(140% 120% at 45% 40%,transparent 55%,rgba(130,92,30,.20))',
      /* a pale red sunburst printed around the name, fading out toward the edges of the body */
      'radial-gradient(closest-side at 50% 52%,transparent 35%,'+PAPER+' 100%) 0 0/calc(var(--b) - 5px) 100% no-repeat',
      'repeating-conic-gradient(from 3deg at 50% 52%,rgba(200,55,42,.05) 0 5deg,transparent 5deg 10deg) 0 0/calc(var(--b) - 5px) 100% no-repeat',
      PAPER].join(',')+';box-shadow:inset 0 1px 0 rgba(255,255,255,.28)}',
    /* the content sits above the paper, unmasked */
    P+' .bt-p{position:relative;display:grid;grid-template-columns:var(--b) minmax(0,1fr);align-items:center;padding:'+(TOP+7)+'px 0 '+(BOT+7)+'px}',
    P+' .bt-body{display:grid;justify-items:center;align-content:center;gap:0;min-width:0;padding:0 6px}',
    P+' .bt-mk{display:flex;align-items:center;gap:5px;font:800 8.6px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.2em;text-transform:uppercase;white-space:nowrap}',
    P+' .bt-mk i{display:block;width:7px;height:7px;background:'+STAR(RED)+' 0 0/100% no-repeat}',
    P+' .bt-mk.str{gap:6px;margin:8px 0 0}',P+' .bt-mk.str i{width:8px;height:8px}',P+' .bt-mk.str i:nth-child(2){width:10px;height:10px}',
    /* strip micro labels, reversed out of the ink */
    P+' .bt-st{position:absolute;left:0;right:0;display:flex;align-items:center;justify-content:space-between;pointer-events:none;font:800 8.6px/1 "Barlow Condensed",Barlow,sans-serif;letter-spacing:.22em;text-transform:uppercase;color:#f3ead3;white-space:nowrap}',
    P+' .bt-st.bt-hd{top:0;height:'+TOP+'px}',P+' .bt-st.bt-ft{bottom:0;height:'+BOT+'px}',
    P+' .bt-st span{display:flex;align-items:center;gap:5px}',P+' .bt-st span i{display:block;width:7px;height:7px;background:'+STAR('#f2b632')+' 0 0/100% no-repeat}',
    P+' .bt-st .l{width:var(--b);justify-content:center}',P+' .bt-st .r{flex:1;justify-content:center;padding:0 22px 0 10px}',
    P+' .bt-st span.bt-no{display:block;text-transform:none;letter-spacing:.16em;text-align:right;color:'+INK+';opacity:.85;transform:translate(1px,-.5px) rotate(-.6deg);font-variant-numeric:tabular-nums}',P+' .bt-st .bt-no u{display:inline-block;font-size:.7em;line-height:1;vertical-align:.42em;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:1.5px;margin:0 .32em 0 .02em;letter-spacing:0}',
    P+' .bt-st .r.e{justify-content:flex-end;padding:0 24px 0 0}',
    /* the label: concept 2's Anton pair. "Bet #1:" pressed in ink; "NVIDIA" in gold foil over a red print offset */
    P+' .bt-p .x2p-cdh{margin:0;display:block;padding:0}',
    P+' .bt-p .x2p-cdh .k{display:none}',
    P+'[data-theme] .bt-p .x2p-cdh b{display:block;text-align:center;font:400 clamp(25px,7.4vw,34px)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:'+INK+';text-shadow:0 .9px 0 rgba(255,251,238,.75);white-space:nowrap}',
    P+' .bt-p .x2p-cdh b i{font-style:normal;color:'+INK+'}',
    P+' .bt-p .x2p-cdh b em{position:relative;display:table;margin:.05em auto 0;font-style:normal;color:transparent;text-shadow:.055em .055em 0 '+RED+';-webkit-text-stroke:.7px #3d2a06}',
    P+' .bt-p .x2p-cdh b em::after{content:attr(data-t);content:attr(data-t) / "";position:absolute;left:0;top:0;right:0;text-shadow:none;transform:translate(.6px,-.5px);-webkit-text-stroke:0;'+
      'background:linear-gradient(118deg,#d6a136 0 10%,#f4cc55 10% 41%,#fff3c2 41% 45%,#f2c54d 45% 72%,#c08c27 72% 78%,#ecbd47 78%);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}',
    /* the stub: the chip printed in an ink frame */
    P+' .bt-s{position:relative;min-width:0;display:flex;align-items:center;padding:0 22px 0 10px}',
    P+' .bt-s #gpu{margin:0!important;width:100%;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:1px!important;box-shadow:0 0 0 1px rgba(70,48,18,.55),0 0 0 3.5px rgba(239,228,200,.0),0 0 0 4.2px rgba(20,18,23,.0)!important;background:#000}',
    /* the window is die-cut: the card's cut wall casts a shadow on the chip at the top and left, its pale core shows at the bottom and right */
    P+' .bt-s #gpu .gpu-img::after{content:"";position:absolute;inset:0;pointer-events:none;z-index:3;box-shadow:inset 2.5px 2.5px 0 rgba(10,8,12,.62),inset 3px 4px 7px rgba(0,0,0,.55),inset -1.2px -1.2px 0 rgba(246,238,218,.75)}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(20px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    /* over the print only (body and strips, never the chip): the fold crease */
    P+' .bt-fx{position:absolute;inset:0;pointer-events:none;z-index:2;background:var(--cr) 0 0/100% 100% no-repeat;'+
      '-webkit-mask:linear-gradient(#000,#000) 0 0/calc(var(--b) - 5px) 100% no-repeat;mask:linear-gradient(#000,#000) 0 0/calc(var(--b) - 5px) 100% no-repeat}',
    /* the film ticket keeps its staple (owner circled the bet ticket's) */
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
  var st=d.createElement('style');st.id='fnfit-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var em=h.querySelector('em');if(em)em.setAttribute('data-t',em.textContent);
  var mk=function(t,c,html){var e=d.createElement(t);e.className=c;if(html)e.innerHTML=html;return e};
  var bt=mk('div','x2p-bt');['bt-l bt-sh','bt-l bt-th','bt-l bt-fb','bt-l bt-pp'].forEach(function(c){bt.appendChild(mk('div',c))});
  var p=mk('div','bt-p'),body=mk('div','bt-body'),s=mk('div','bt-s');
  g.parentNode.insertBefore(bt,g);bt.appendChild(p);p.appendChild(body);p.appendChild(s);
  body.appendChild(h);body.appendChild(mk('div','bt-mk str','<i></i><i></i><i></i>'));
  s.appendChild(g);
  p.appendChild(mk('div','bt-st bt-hd','<span class="l"><i></i>$EZ main event<i></i></span><span class="r">Season 1</span>'));
  p.appendChild(mk('div','bt-st bt-ft','<span class="l">Admit one</span><span class="r e bt-no">N<u>o</u> 000001</span>'));
  bt.appendChild(mk('div','bt-fx'));
  [].forEach.call(bt.querySelectorAll('.bt-mk,.bt-st'),function(e){e.setAttribute('aria-hidden','true')});
  var im=g.querySelector('img');if(im){im.loading='eager'}
  /* the outline at the ticket's exact size: worn corners, V notches and pin holes on the perforation, the stub's torn far edge.
     A = the torn fibres' reach (shadow, card edge, fibre layers), B = where the print stops (inside A along the tear) */
  function rng(a){return function(){a|=0;a=a+0x6D2B79F5|0;var t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
  var f=function(n){return +n.toFixed(2)};
  function build(){
    var W=Math.round(bt.offsetWidth),Hh=Math.round(bt.offsetHeight),b=Math.round(body.getBoundingClientRect().width);if(!W||!Hh)return;
    var R=rng(1307),ph1=R()*6,ph2=R()*6,ph3=R()*6,eB=[],eA=[],hairs=[];
    for(var y=0;y<=Hh+0.01;y+=1.2){
      var x=W-9.5+2.4*Math.sin(y/17+ph1)+1.3*Math.sin(y/6.3+ph2)+.5*Math.sin(y/3.1+ph3)+(R()-.5)*.9;
      eB.push([f(x),f(y)]);var fr=1.9+1.0*Math.sin(y/9+ph3)+.6*Math.sin(y/3.7+ph1)+R()*.7;eA.push([f(Math.min(W-.6,x+fr)),f(y)]);
      if(R()<.06)hairs.push([x+fr-.5,y,1+R()*1.8,(R()-.5)*1.6])}
    eB[eB.length-1][1]=Hh;eA[eA.length-1][1]=Hh;
    var nw=3.4,nd=4.8;
    function outline(E,hr){hr=hr||1.25;
      var s='M0 7.5 C0 3.2 1.6 .3 7.2 0 L'+f(b-nw)+' 0 L'+b+' '+nd+' L'+f(b+nw)+' 0 L'+E[0][0]+' 0';
      for(var i=1;i<E.length;i++)s+=' L'+E[i][0]+' '+E[i][1];
      s+=' L'+f(b+nw)+' '+Hh+' L'+f(b+.55)+' '+f(Hh-nd)+' L'+f(b+.7)+' '+f(Hh-nd-3.2)+' L'+f(b+.15)+' '+f(Hh-nd-7.4)+' L'+f(b-.05)+' '+f(Hh-nd-11.6)+' L'+f(b-.35)+' '+f(Hh-nd-7)+' L'+f(b-.2)+' '+f(Hh-nd-3)+' L'+f(b-.55)+' '+f(Hh-nd)+' L'+f(b-nw)+' '+Hh+' L8.4 '+Hh+' C2.4 '+f(Hh-.5)+' .3 '+f(Hh-2.8)+' 0 '+f(Hh-8.6)+' Z';
      for(var yy=10.5;yy<=Hh-10;yy+=5.2)s+=' M'+f(b-hr)+' '+f(yy)+' a'+hr+' '+hr+' 0 1 0 '+(2*hr)+' 0 a'+hr+' '+hr+' 0 1 0 '+(-2*hr)+' 0 Z';
      return s}
    var hp=hairs.map(function(h){return 'M'+f(h[0])+' '+f(h[1])+' L'+f(Math.min(W-.3,h[0]+h[2]))+' '+f(h[1]+h[3])+' L'+f(h[0])+' '+f(h[1]+.8)+' Z'}).join(' ');
    var svg=function(dd,extra){return U("<svg xmlns='http://www.w3.org/2000/svg' width='"+W+"' height='"+Hh+"' viewBox='0 0 "+W+" "+Hh+"'><path fill-rule='evenodd' d='"+dd+"'/>"+(extra||'')+"</svg>")};
    bt.style.setProperty('--mA',svg(outline(eA),"<path d='"+hp+"'/>"));
    bt.style.setProperty('--mB',svg(outline(eB)));
    bt.style.setProperty('--mT',svg(outline(eA,3.2),"<path d='"+hp+"'/>"));
    /* the rule pass: rotated about .2deg as a whole (both rules fall to the right), with a faint wobble of the press */
    var tl=W*Math.tan(.2*Math.PI/180),gy=TOP+3.7,ry=Hh-BOT-3.7;
    bt.style.setProperty('--rl',U("<svg xmlns='http://www.w3.org/2000/svg' width='"+W+"' height='"+Hh+"' viewBox='0 0 "+W+" "+Hh+"'><g fill='none' stroke-width='1.35'>"+
      "<path d='M0 "+f(gy-tl/2)+" C"+f(W*.3)+" "+f(gy-tl*.2+.25)+" "+f(W*.62)+" "+f(gy+tl*.1-.2)+" "+W+" "+f(gy+tl/2)+"' stroke='"+GREEN+"'/>"+
      "<path d='M0 "+f(ry-tl/2)+" C"+f(W*.35)+" "+f(ry-tl*.15-.2)+" "+f(W*.7)+" "+f(ry+tl*.2+.2)+" "+W+" "+f(ry+tl/2)+"' stroke='"+RED+"'/></g></svg>"));
    /* the fold: in the left margin, a slight wobble; a soft shade on the side away from the light, a pale ridge
       where the ink cracked, a 1px dark line on the lit side */
    var x0=Math.round(b*.17),x1=Math.round(b*.05),cv=function(dx){return 'M'+f(x0+dx)+' 0 C'+f(x0-2+dx)+' '+f(Hh*.35)+' '+f(x1+3+dx)+' '+f(Hh*.6)+' '+f(x1+dx)+' '+Hh};
    bt.style.setProperty('--cr',U("<svg xmlns='http://www.w3.org/2000/svg' width='"+W+"' height='"+Hh+"' viewBox='0 0 "+W+" "+Hh+"'>"+
      "<defs><linearGradient id='v' x1='0' x2='1'><stop offset='0' stop-color='#5a4020' stop-opacity='.12'/><stop offset='1' stop-color='#5a4020' stop-opacity='0'/></linearGradient></defs>"+
      "<path d='"+cv(0)+" L"+f(x1+9)+" "+Hh+" C"+f(x1+3+9)+" "+f(Hh*.6)+" "+f(x0-2+9)+" "+f(Hh*.35)+" "+f(x0+9)+" 0 Z' fill='url(#v)'/>"+
      "<path d='"+cv(-.9)+"' stroke='#5a4020' stroke-opacity='.14' stroke-width='1' fill='none'/>"+
      "<path d='"+cv(.1)+"' stroke='#fffaf0' stroke-opacity='.38' stroke-width='.9' stroke-dasharray='9 1.4 4 .8 14 1.2 6 1' fill='none'/></svg>"));
  }
  build();if(window.ResizeObserver)new ResizeObserver(function(){build()}).observe(bt);
  return 'ok'};
