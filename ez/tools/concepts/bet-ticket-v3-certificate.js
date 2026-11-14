/* Direction 3, Share Certificate (2026-10-22): the bet ticket as a share certificate cut down to a ticket. Pale security paper with a
   split-fountain underprint (fine woven lines, green at the left fading through gold to red at the right, the way rainbow printing
   runs), security fibres and grain; an engraved green border (a solid band with white-line interlaced waves, a fine outer rule, a
   microprinted inner rule) with rosette corner blocks; red numbering-machine serials in cartouches let into the border (top left,
   bottom right); a guilloche rosette under the label; a gold foil $EZ seal stuck beside it; the live chip in an engraved double frame
   (the vignette); a row of punched holes between body and stub; the left edge torn from the certificate book. No staple, no ink
   outline: a hard offset shadow only. The film ticket above is untouched. The paper and its art sit on their own masked layer under
   the content, so nothing above the chip carries a mask or filter. Mock injector: eval on the loaded X2+ page, then window.__fit().
   Round 6 (art director's notes): two inks by default (green body, red counterfoil, as the film ticket runs green left, red right;
   window.__btInk2='none' before eval gives the one-ink green sheet); the chip's frame clears the border (thinner rings, more room on
   the right, smaller seal); the engraved plate and the two numbering passes are each a little off register; worn ink on the big label;
   fewer, shorter fibres; a paper thickness edge; the torn edge, the notches and the hole row are real cuts in one SVG mask drawn to
   size (no mask-composite needed; the shadow or page shows through the holes), and the shadow follows the torn edge only (no notch
   bites). window.__noFilmStaple=true also hides the film ticket's staple (a question for the owner; off by default). */
window.__fit=function(){
  var d=document,H=d.documentElement;if(H.classList.contains('c5fit'))return 'already';H.classList.add('c5fit');
  var P='html.x2p.x2d.c5fit';
  var CX0=392,CX1=1608,CY0=370,CY1=1056,CW=CX1-CX0,CH=CY1-CY0,pct=function(n){return (n*100).toFixed(4)+'%'};
  var G='#1d6e40',R='#c8372a',INK='#141217';
  var svg=function(s){return 'url("data:image/svg+xml,'+encodeURIComponent(s)+'")'};
  /* the paper's shape is a mask drawn to the ticket's exact size in draw(): the left edge torn from the certificate book through its
     perforation (half holes, a little uneven), a die-cut notch at each end of the hole row, and the hole row itself, all real cuts, so
     the shadow or the page shows through. The shadow's mask has the torn edge only (a continuous strip under the notches). */
  var I2=window.__btInk2===undefined?'#a8322a':window.__btInk2;if(!I2||I2==='none')I2='';
  /* underprint: a woven net of counter-phase waves (as a mask, so the split-fountain gradient colours it) */
  var wv=function(a,ph){var s='';for(var x=0;x<=24;x+=.5){s+=(x?'L':'M')+x+' '+(3.5+a*Math.sin((x/24)*2*Math.PI+ph)).toFixed(2)}return s};
  var NET=svg("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='7'><g fill='none' stroke='#000' stroke-width='.5'><path d='"+wv(2.6,0)+"'/><path d='"+wv(2.6,Math.PI)+"'/><path d='"+wv(1.1,Math.PI/2)+"' stroke-width='.35'/></g></svg>");
  /* paper: grain and security fibres (red and green, as banknote paper has) */
  var GRAIN=svg("<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' seed='7' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .22  0 0 0 0 .2  0 0 0 0 .1  -2.3 0 0 0 1.25'/></filter><rect width='100%' height='100%' filter='url(#f)' opacity='.13'/></svg>");
  var fib=function(){var r=function(a){var x=Math.sin(a*91.7)*43758.5453;return x-Math.floor(x)},q='';
    for(var i=0;i<16;i++){var x=r(i+1)*250,y=r(i+7.3)*140,a=r(i+3.1)*6.28,l=3+r(i+5.5)*5,c=i%3?'#b8352a':'#1d6e40',
      x2=x+Math.cos(a)*l,y2=y+Math.sin(a)*l,cx=(x+x2)/2+Math.cos(a+1.57)*2.2,cy=(y+y2)/2+Math.sin(a+1.57)*2.2;
      q+="<path d='M"+x.toFixed(1)+" "+y.toFixed(1)+"Q"+cx.toFixed(1)+" "+cy.toFixed(1)+" "+x2.toFixed(1)+" "+y2.toFixed(1)+"' stroke='"+c+"'/>"}
    return svg("<svg xmlns='http://www.w3.org/2000/svg' width='250' height='140'><g fill='none' stroke-width='.55' stroke-linecap='round' opacity='.4'>"+q+"</g></svg>")}();
  var MOT=svg("<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><filter id='m' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.03' numOctaves='4' seed='9' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .5  0 0 0 0 .38  0 0 0 0 .16  -1.6 0 0 0 .95'/></filter><rect width='100%' height='100%' filter='url(#m)' opacity='.08'/></svg>");
  var SPECK=svg("<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='s' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='2' seed='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .957  0 0 0 0 .94  0 0 0 0 .882  9 0 0 0 -5.6'/></filter><rect width='100%' height='100%' filter='url(#s)'/></svg>");
  var WEAR=svg("<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='w' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' seed='11' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -16 0 0 0 12.6'/></filter><rect width='100%' height='100%' filter='url(#w)'/></svg>");
  var css=[
    P+' .x2p-bt{position:relative;isolation:isolate;margin:22px 0 0;max-width:560px}',
    P+' .x2p-bt::before{content:"";position:absolute;inset:0;transform:translate(6px,6px);background:#000;z-index:-1;-webkit-mask:var(--bts) 0 0/100% 100% no-repeat;mask:var(--bts) 0 0/100% 100% no-repeat}',
    P+' .bt-p{position:relative;display:flex;align-items:center;padding:22px 21.6px 23px 21px;color:'+INK+'}',
    /* the paper layer: base, light and wear, grain, fibres; the underprint net on its ::before; the engraved art in its svg */
    P+' .bt-pp{position:absolute;inset:0;z-index:0;pointer-events:none;-webkit-mask:var(--btm) 0 0/100% 100% no-repeat;mask:var(--btm) 0 0/100% 100% no-repeat;'+
      'background:linear-gradient(168deg,rgba(255,255,255,.22),rgba(255,255,255,0) 42%,rgba(90,70,30,.06)),radial-gradient(150% 130% at 45% 40%,transparent 60%,rgba(120,92,40,.16)),'+
      GRAIN+' 0 0/200px,'+fib+' 0 0/250px 140px,'+MOT+' 0 0/400px,#f4f0e1}',
    P+' .bt-pp::before{content:"";position:absolute;inset:0;background:linear-gradient(90deg,rgba(29,110,64,.5),rgba(150,150,60,.36) 48%,rgba(200,55,42,.42));-webkit-mask:'+NET+' 0 0/24px 7px;mask:'+NET+' 0 0/24px 7px;opacity:.5}',
    P+' .bt-pp svg{position:absolute;left:0;top:0;overflow:visible}',
    P+' .bt-pp::after{content:"";position:absolute;inset:0;background:'+SPECK+' 0 0/180px;opacity:.6;box-shadow:inset 0 1px 0 rgba(255,255,255,.55),inset 0 -1.5px 0 rgba(70,48,14,.35),inset -1px 0 0 rgba(70,48,14,.2)}',
    /* the body: micro label, concept 2's label, the seal */
    P+' .bt-b{position:relative;z-index:1;flex:0 0 auto;display:flex;align-items:center;gap:3px;padding:0 9px 0 2px}',
    P+' .bt-p .x2p-cdh{flex:0 0 auto;margin:0;display:block;padding:0}',
    P+' .bt-p .x2p-cdh .k{display:none}',
    P+' .bt-mi{display:block;margin:0 0 5px 1px;font:800 6.4px/1 Archivo,Barlow,sans-serif;font-stretch:125%;letter-spacing:.2em;color:'+G+';white-space:nowrap}',
    P+'[data-theme] .bt-p .x2p-cdh b{display:block;font:400 clamp(25px,7.4vw,34px)/.94 Anton,Impact,sans-serif!important;text-transform:uppercase;letter-spacing:.01em;color:'+INK+';text-shadow:none;white-space:nowrap;-webkit-mask:'+WEAR+' 0 0/120px;mask:'+WEAR+' 0 0/120px}',
    P+' .bt-p .x2p-cdh b i{font-style:normal;color:'+INK+'}',
    P+' .bt-p .x2p-cdh b em{display:block;margin-top:.04em;font-style:normal;color:#f2b632;-webkit-text-stroke:1px '+INK+';text-shadow:.05em .05em 0 '+INK+',.09em .09em 0 #b3261e}',
    P+' .bt-seal{flex:0 0 auto;width:36px;height:36px;align-self:flex-end;margin:0 0 -11px;transform:rotate(-10deg)}',
    P+' .bt-seal svg{display:block;width:100%;height:100%;overflow:visible}',
    /* the stub: holes are drawn on the paper at its left edge; the chip window in an engraved double frame */
    P+' .bt-s{position:relative;z-index:1;flex:1 1 0;min-width:0;display:flex;align-items:center;padding:0 0 0 9.9px}',
    P+' .bt-s #gpu{margin:0!important;width:100%;max-width:none!important;min-width:0}',
    P+' .bt-s #gpu .gpu-c{border:0!important;border-radius:0!important;box-shadow:none!important;background:none!important;overflow:visible;width:100%}',
    P+'[data-theme] .bt-s #gpu .gpu-img{position:relative!important;width:100%!important;aspect-ratio:'+CW+'/'+CH+'!important;clip-path:none!important;margin:0!important;max-width:none!important;overflow:hidden!important;'+
      'border:0!important;border-radius:0!important;background:#000;box-shadow:0 0 0 1px '+INK+',0 0 0 2px #f4f0e1,0 0 0 2.7px var(--vg,'+G+'),0 0 0 3.6px #f4f0e1,0 0 0 4.4px var(--vg,'+G+')!important}',
    P+' .bt-s #gpu .gpu-img img,'+P+' .bt-s #gpu .gpu-img .gpu-core{position:absolute!important;inset:auto!important;left:'+pct(-CX0/CW)+'!important;top:'+pct(-CY0/CH)+'!important;width:'+pct(2000/CW)+'!important;height:'+pct(1500/CH)+'!important;max-width:none!important}',
    P+' .bt-s #gpuCore .gc-u{font:800 58px "Barlow Condensed",Barlow,sans-serif;letter-spacing:.12em;stroke-width:9px;transform:translateY(12px)}',
    P+' .bt-s #gpu :is(.gpu-t,.gpu-n){display:none}',
    '@media (max-width:599.98px){',
    P+'[data-theme] section.hero{padding-top:20px}',
    P+'[data-theme] section.hero h1{font-size:calc((100vw - 32px) / 10)!important;line-height:.94!important}',
    P+' section.x2o-bet:has(>.x2p-vt){padding-top:6px;margin-top:8px}',
    P+' .x2p-vt{margin:22px -16px 0;max-width:none;overflow-x:clip}',
    P+' .x2p-vt .vt-tag{left:16px}',
    P+' .x2p-bt{margin:26px -16px 0;max-width:none;overflow-x:clip}',
    P+' section.x2o-bet + section.x2o-rc{padding-top:22px}',
    '}',
    /* narrow phones: a smaller seal gives the chip the width for 18px digits */
    '@media (max-width:374.98px){'+P+' .bt-seal{width:30px;height:30px;margin-bottom:-9px}}'
  ].concat(window.__noFilmStaple?[P+' .x2p-vt .vt-st{display:none}']:[]).join('\n');
  var st=d.createElement('style');st.id='c5fit-css';st.textContent=css;d.head.appendChild(st);
  var g=d.getElementById('gpu'),h=d.querySelector('.x2p-cdh');if(!g||!h)return 'missing';
  var mk=function(t,c){var e=d.createElement(t);if(c)e.className=c;return e};
  var bt=mk('div','x2p-bt'),p=mk('div','bt-p'),pp=mk('div','bt-pp'),b=mk('div','bt-b'),s=mk('div','bt-s'),mi=mk('span','bt-mi'),se=mk('div','bt-seal');
  pp.setAttribute('aria-hidden','true');se.setAttribute('aria-hidden','true');mi.setAttribute('aria-hidden','true');mi.textContent='SEASON 1';
  g.parentNode.insertBefore(bt,g);bt.appendChild(p);p.appendChild(pp);p.appendChild(b);b.appendChild(h);h.insertBefore(mi,h.firstChild);b.appendChild(se);p.appendChild(s);s.appendChild(g);
  var im=g.querySelector('img');if(im){im.loading='eager'}
  /* the gold foil seal: serrated foil, two struck rings, ring lettering, an embossed $EZ */
  se.innerHTML=(function(){var pts=[],sh=[],n=36;for(var i=0;i<n*2;i++){var a=i*Math.PI/n,r=i%2?17.6:19.4;pts.push((Math.cos(a)*r).toFixed(2)+','+(Math.sin(a)*r).toFixed(2));sh.push((Math.cos(a)*r+.9).toFixed(2)+','+(Math.sin(a)*r+.9).toFixed(2))}
    return "<svg viewBox='-20 -20 40 40'><defs><linearGradient id='btF' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#fbe7a6'/><stop offset='.3' stop-color='#f2b632'/><stop offset='.52' stop-color='#a8761a'/><stop offset='.7' stop-color='#f5cd5e'/><stop offset='1' stop-color='#b9871f'/></linearGradient>"+
      "<radialGradient id='btD' cx='.4' cy='.35' r='.75'><stop offset='0' stop-color='#e7b545'/><stop offset='1' stop-color='#a3721a'/></radialGradient><path id='btR' d='M-11.6 0a11.6 11.6 0 1 1 23.2 0a11.6 11.6 0 1 1-23.2 0'/></defs>"+
      "<polygon points='"+sh.join(' ')+"' fill='rgba(0,0,0,.45)'/><polygon points='"+pts.join(' ')+"' fill='url(#btF)' stroke='#7c560f' stroke-width='.4'/>"+
      "<circle r='15.4' fill='none' stroke='#7c560f' stroke-width='.7'/><circle r='14.6' fill='none' stroke='#fff2c2' stroke-width='.35' opacity='.8'/><circle r='9' fill='url(#btD)' stroke='#7c560f' stroke-width='.55'/><circle r='8.4' fill='none' stroke='#fff2c2' stroke-width='.3' opacity='.7'/>"+
      "<text font-family='Archivo,Barlow,sans-serif' font-weight='800' font-size='3.3' fill='#6e4b0b'><textPath href='#btR' textLength='71' lengthAdjust='spacing'>EARNINGS ZEASON • SEASON 1 •</textPath></text>"+
      "<g font-family='Anton,Impact,sans-serif' font-size='9.2' text-anchor='middle' letter-spacing='.15'><text x='.45' y='3.75' fill='#5e3f08'>$EZ</text><text y='3.25' fill='#fff0bd'>$EZ</text></g></svg>"})();
  /* the engraved art, drawn to the paper's exact size (redrawn only when the ticket changes size) */
  var NS='http://www.w3.org/2000/svg',art=d.createElementNS(NS,'svg');pp.appendChild(art);
  var draw=function(){var w=p.clientWidth,hh=p.clientHeight;if(!w||!hh)return;var px=s.offsetLeft,bx=b.offsetLeft+b.offsetWidth/2-6,by=hh/2,o=[];
    var E=4.2,o1=E+.45,b0=E+2.1,bw=5.6,b1=b0+bw,ir=b1+1.6,f=function(n){return n.toFixed(2)};
    /* the cuts */
    var rn=function(k){var x=Math.sin(k*127.1+311.7)*43758.5453;return x-Math.floor(x)},torn='',cuts='',k=0;
    for(var ty=3;ty<hh+3;ty+=6){k++;torn+="<circle cx='"+f((rn(k)-.5)*.6)+"' cy='"+f(ty+(rn(k+50)-.5)*.5)+"' r='"+f(1.55+rn(k+90)*.35)+"'/>";if(rn(k+130)>.55)torn+="<circle cx='"+f(-.25)+"' cy='"+f(ty+3+(rn(k+170)-.5)*2)+"' r='"+f(.45+rn(k+210)*.35)+"'/>"}
    cuts="<circle cx='"+px+"' cy='0' r='3.3'/><circle cx='"+px+"' cy='"+hh+"' r='3.3'/>";
    var y0=6.4,nh=Math.max(2,Math.round((hh-2*y0)/5.2)),pt=(hh-2*y0)/nh;for(var j=0;j<=nh;j++)cuts+="<circle cx='"+px+"' cy='"+f(y0+j*pt)+"' r='1.3'/>";
    var mk=function(c){return svg("<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+hh+"'><mask id='k' x='0' y='0' width='"+w+"' height='"+hh+"' maskUnits='userSpaceOnUse'><rect width='"+w+"' height='"+hh+"' fill='#fff'/><g fill='#000'>"+c+"</g></mask><rect width='"+w+"' height='"+hh+"' mask='url(#k)'/></svg>")};
    bt.style.setProperty('--btm',mk(torn+cuts));bt.style.setProperty('--bts',mk(torn));
    art.setAttribute('width',w);art.setAttribute('height',hh);art.setAttribute('viewBox','0 0 '+w+' '+hh);
    /* guilloche rosette under the label: phase-shifted sinusoidal rings, woven */
    var rr=Math.min(hh*.4,58),ros=function(R0,A,k,n,sw,op){var q='';for(var j=0;j<n;j++){var ph=j*2*Math.PI/n/k,dd='';for(var t=0;t<=360;t+=1.5){var a=t*Math.PI/180,r=R0+A*Math.sin(k*a+ph*k);dd+=(t?'L':'M')+f(bx+Math.cos(a)*r)+' '+f(by+Math.sin(a)*r)}q+="<path d='"+dd+"Z'/>"}
      return "<g fill='none' stroke='"+G+"' stroke-width='"+sw+"' opacity='"+op+"'>"+q+'</g>'};
    o.push(ros(rr*.72,rr*.26,9,7,.45,.3),ros(rr*.34,rr*.12,7,5,.4,.26));
    /* border: fine outer rule, solid band with white-line interlaced waves, inner rule */
    var bo=[];
    bo.push("<rect x='"+f(o1)+"' y='"+f(o1)+"' width='"+f(w-2*o1)+"' height='"+f(hh-2*o1)+"' fill='none' stroke='"+G+"' stroke-width='.9'/>");
    bo.push("<path fill-rule='evenodd' fill='"+G+"' d='M"+b0+' '+b0+'H'+f(w-b0)+'V'+f(hh-b0)+'H'+b0+'Z M'+b1+' '+b1+'V'+f(hh-b1)+'H'+f(w-b1)+'V'+b1+"Z'/>");
    var lam=7,am=1.9,wave=function(x0,x1,yc,ph,vert){var dd='';for(var x=x0;x<=x1+.01;x+=.6){var y=yc+am*Math.sin((x-x0)/lam*2*Math.PI+ph);dd+=(x===x0?'M':'L')+(vert?f(y)+' '+f(x):f(x)+' '+f(y))}return dd};
    var c=b0+bw/2,wl='';[[c,0],[hh-c,0]].forEach(function(r){wl+=wave(b0,w-b0,r[0],0)+wave(b0,w-b0,r[0],Math.PI)});[[c,1],[w-c,1]].forEach(function(r){wl+=wave(b0,hh-b0,r[0],0,1)+wave(b0,hh-b0,r[0],Math.PI,1)});
    bo.push("<path d='"+wl+"' fill='none' stroke='#f4f0e1' stroke-width='.62'/>");
    var MP=new Array(60).join('$EZ SEASON 1 BET No 1 '),mp=function(x,y,rot){return "<text transform='translate("+f(x)+' '+f(y)+") rotate("+rot+")' font-family='\"Chivo Mono\",ui-monospace,monospace' font-weight='600' font-size='2.15' fill='"+G+"'>"+MP+'</text>'};
    bo.push("<clipPath id='btMP'><rect x='"+f(ir-1.4)+"' y='"+f(ir-1.4)+"' width='"+f(w-2*ir+2.8)+"' height='"+f(hh-2*ir+2.8)+"'/></clipPath><g clip-path='url(#btMP)'>"+mp(ir,ir+.75,0)+mp(w-ir,hh-ir-.75,180)+mp(ir+.75,hh-ir,-90)+mp(w-ir-.75,ir,90)+'</g>');
    /* rosette blocks at the corners */
    var cs=11;[[c,c],[w-c,c],[c,hh-c],[w-c,hh-c]].forEach(function(q){bo.push("<g transform='translate("+f(q[0])+' '+f(q[1])+")'><rect x='-"+cs/2+"' y='-"+cs/2+"' width='"+cs+"' height='"+cs+"' fill='"+G+"'/><rect x='-"+(cs/2-1)+"' y='-"+(cs/2-1)+"' width='"+(cs-2)+"' height='"+(cs-2)+"' fill='none' stroke='#f4f0e1' stroke-width='.4'/><circle r='3.3' fill='none' stroke='#f4f0e1' stroke-width='.55'/><circle r='1.5' fill='#f4f0e1'/>"+
      [0,1,2,3].map(function(k){var a=k*Math.PI/2+Math.PI/4;return "<circle cx='"+f(Math.cos(a)*3.3)+"' cy='"+f(Math.sin(a)*3.3)+"' r='.75' fill='#f4f0e1'/>"}).join('')+'</g>')});
    /* cartouches let into the border (part of the engraved plate) */
    var tw=50,th=10.5,cart=function(x0,y){return "<rect x='"+f(x0)+"' y='"+f(y-th/2)+"' width='"+tw+"' height='"+th+"' fill='#f4f0e1' stroke='"+G+"' stroke-width='.8'/><rect x='"+f(x0+1.4)+"' y='"+f(y-th/2+1.4)+"' width='"+(tw-2.8)+"' height='"+(th-2.8)+"' fill='none' stroke='"+G+"' stroke-width='.3'/>"};
    var cl=24,cr=w-24-tw;bo.push(cart(cl,c),cart(cr,hh-c));
    /* the plate is printed a touch off centre on the sheet (margins about 5.8 left, 3.6 right, 4.1 top, 5.3 bottom) */
    var PT="translate(1.1 -.6)",bs=bo.join('');
    if(I2){o.push("<clipPath id='btCL'><rect x='-9' y='-9' width='"+f(px+9)+"' height='"+(hh+18)+"'/></clipPath><clipPath id='btCR'><rect x='"+f(px)+"' y='-9' width='"+f(w-px+9)+"' height='"+(hh+18)+"'/></clipPath>"+
      "<g clip-path='url(#btCL)'><g transform='"+PT+"'>"+bs+"</g></g><g clip-path='url(#btCR)'><g transform='"+PT+"'>"+bs.split(G).join(I2).replace(/btMP/g,'btMP2')+'</g></g>');bt.style.setProperty('--vg',I2)}
    else o.push("<g transform='"+PT+"'>"+bs+'</g>');
    /* red serials: the numbering machine's own pass, each a little off from its cartouche */
    var ser=function(x0,y,dx,dy,rot){var cx=x0+tw/2;return "<text transform='translate("+f(1.1+dx)+' '+f(-.6+dy)+") rotate("+rot+' '+f(cx)+' '+f(y)+")' x='"+f(cx)+"' y='"+f(y+2.5)+"' text-anchor='middle' font-family='\"Chivo Mono\",ui-monospace,monospace' font-weight='700' font-size='7' letter-spacing='.3' fill='"+R+"'>N<tspan font-size='4.6' dy='-2.3' text-decoration='underline'>o</tspan><tspan dy='2.3'> 000001</tspan></text>"};
    o.push(ser(cl,c,.6,.45,-.6),ser(cr,hh-c,-.5,-.35,.45));
    /* the perforation: a row of punched holes from edge to edge */
    /* the perforation is cut in the mask above: nothing drawn here */
    art.innerHTML=o.join('')};
  draw();if(window.ResizeObserver){var ro=new ResizeObserver(draw);ro.observe(p);ro.observe(s)}
  if(d.fonts&&d.fonts.ready)d.fonts.ready.then(draw);
  return 'ok'};
