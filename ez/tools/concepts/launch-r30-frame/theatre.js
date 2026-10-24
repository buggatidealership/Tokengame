/* Round 30, concept "theatre" (pass 2): the film as the stage of a paper toy theatre, drawn to the frame's own size (redrawn when it changes).
   Layers, back to front: the die-cut card (the site's card stock; the tickets' hard shadow follows the cut, no outline), the engraved plate
   (black line work and flat hand-colour tints laid by stencil, multiplied into the card), the hot foil (the gilt round the opening, the
   fringe on the swags, the tie-back cords, and on desktop the tassels), then the film. On phones the plate is pared down: flat curtains with
   two folds in a darker shade of the cloth, a fringe line without threads, no tassels. Idempotent: a second run reuses the layer and observer. */
var D=document,H=D.documentElement,vt=D.querySelector('.x2p-vt');if(!vt)return;
H.classList.add('r30th');
var NS='http://www.w3.org/2000/svg',tag=vt.querySelector('.vt-tag'),vp=vt.querySelector('.vt-p');
var lay=vt.querySelector(':scope>.r30-th');
if(!lay){lay=D.createElement('div');lay.className='r30-th';lay.setAttribute('aria-hidden','true');
  lay.innerHTML='<div class="r30-sh"><i class="r30-cd"></i></div><svg class="r30-ink" xmlns="'+NS+'" focusable="false"></svg><div class="r30-fw"><i class="r30-fo"></i></div>';
  vt.insertBefore(lay,vt.firstChild)}
var cd=lay.querySelector('.r30-cd'),ink=lay.querySelector('.r30-ink'),fo=lay.querySelector('.r30-fo');
function n(v){return Math.round(v*100)/100}
function mask(el,W,Hh,body){var u='url("data:image/svg+xml,'+encodeURIComponent("<svg xmlns='"+NS+"' width='"+n(W)+"' height='"+n(Hh)+"' viewBox='0 0 "+n(W)+" "+n(Hh)+"'>"+body+"</svg>")+'")';
  el.style.webkitMaskImage=u;el.style.maskImage=u}
/* a seeded wobble, so the engraving is the same on every redraw */
function rnd(s){var x=Math.sin(s*127.1+311.7)*43758.5453;return x-Math.floor(x)}
function poly(a){return a.map(function(p){return n(p[0])+','+n(p[1])}).join('L')}
/* an engraved stroke: a filled ribbon along pts whose half-width comes from hw(t, y), so it can swell and taper like a burin line */
function rib(pts,hw,fill){var a=[],b=[],N=pts.length-1;pts.forEach(function(p,j){var w=hw(N?j/N:0,p[1]);a.push([p[0]-w,p[1]]);b.push([p[0]+w,p[1]])});
  return '<path d="M'+poly(a)+'L'+poly(b.reverse())+'Z" fill="'+fill+'"/>'}
/* the heading's box, and where its baseline sits in it (a probe on the baseline). Anton's capitals stand .864em tall (measured on the ink at 3x;
   the canvas's text metrics come back rounded, so not those) */
function capBox(){if(!tag)return null;var fs=parseFloat(getComputedStyle(tag).fontSize)||13.5,p=D.createElement('i');
  p.setAttribute('aria-hidden','true');p.style.cssText='display:inline-block;width:0;height:0;vertical-align:baseline';tag.appendChild(p);
  var tb=tag.getBoundingClientRect(),bl=p.getBoundingClientRect().top-tb.top;tag.removeChild(p);return {cap:.864*fs,bl:bl,w:tb.width}}
function draw(){
  /* the frame sits on a whole pixel (its top margin takes up the fraction the layout above leaves, under a pixel), so the card, the plate,
     the heading and the film all start on the pixel grid and nothing is snapped differently from the rest */
  var r0=vt.getBoundingClientRect(),d0=parseFloat(H.style.getPropertyValue('--r30-dy'))||0,t0=r0.top+scrollY,d1=d0+(Math.ceil(t0-.002)-t0);
  if(d1>=.998)d1-=1;if(Math.abs(d1-d0)>.002)H.style.setProperty('--r30-dy',n(d1*1000)/1000+'px');
  var r=vt.getBoundingClientRect(),fr=vp.getBoundingClientRect(),W=r.width,Hh=r.height;if(!W||!Hh||!fr.width)return;
  var fx=fr.left-r.left,fy=fr.top-r.top,fw=fr.width,fh=fr.height,fb=fy+fh,fR=fx+fw;
  var ph=fx<28,g=ph?2.2:3.5,yE=ph?9:12,gap=ph?.9:1.4,j,q,i;
  var INK='#1b181c',GRN='#1f7a45',RED='#c8372a',GSH='#0e4527',RSH='#7e1f17',sw=ph?.95:1.15;
  /* L: the black plate; T: the colour, laid by stencil; F: the foil. Lc/Tc/Fc: the centre swag, which runs behind the cartouche */
  var L=[],T=[],F=[],Lc=[],Tc=[],Fc=[];
  /* the cartouche, sized to the heading it carries */
  var cb=capBox(),pw=Math.round((cb?cb.w:120)+(ph?30:46)),pH=ph?25:31,pT=1,cx=W/2,pl=cx-pw/2,pr=cx+pw/2,sh=ph?18:30,pb=pT+pH,oi=ph?3.3:4.3;
  /* the capitals' middle on the middle between the two inner rules */
  /* the capitals centred between the plate's inner rules, on the ink. The browser paints text on a whole-pixel baseline, so the baseline is put
     on a whole pixel by design (the same result where it snaps and where it does not) and the plate, drawn at sub-pixel precision, moves the
     remaining fraction (never more than half a pixel) to sit round the capitals */
  if(cb){var yc=pT+(pH+.5)/2,top0=r.top+scrollY,Bs=Math.round(top0+yc+cb.cap/2);H.style.setProperty('--r30-ht',n(Bs-top0-cb.bl)+'px');
    pT+=(Bs-top0-cb.cap/2)-yc;pb=pT+pH}
  /* 1. the die-cut: square sides, an ogee shoulder rising each side into the cartouche, a straight foot */
  var cut='M0,'+(yE+2)+'Q0,'+yE+' 2,'+yE+'L'+n(pl-sh)+','+yE+'C'+n(pl-sh*.45)+','+yE+' '+n(pl-sh*.55)+','+pT+' '+n(pl)+','+pT+
    'L'+n(pr)+','+pT+'C'+n(pr+sh*.55)+','+pT+' '+n(pr+sh*.45)+','+yE+' '+n(pr+sh)+','+yE+'L'+n(W-2)+','+yE+'Q'+n(W)+','+yE+' '+n(W)+','+(yE+2)+
    'L'+n(W)+','+n(Hh-2)+'Q'+n(W)+','+n(Hh)+' '+n(W-2)+','+n(Hh)+'L2,'+n(Hh)+'Q0,'+n(Hh)+' 0,'+n(Hh-2)+'Z';
  mask(cd,W,Hh,"<path d='"+cut+"'/>");
  /* 2. the curtains: hung from behind the pelmet to the stage floor, gathered and tied back beside the opening, cut off by the card's edge */
  var cT=yE+4.2+(ph?2.3:3.2),cB=fb,tie=fy+fh*.6,x0=0,x1=fx-g-gap,wf=x1-x0,wt=ph?3.4:12.5,k=ph?2:6;
  function wAt(y){if(y<=tie){var u=Math.max(0,(y-cT)/(tie-cT));return wt+(wf-wt)*Math.pow(.5+.5*Math.cos(Math.PI*u),.85)}
    var v=(y-tie)/(cB-tie);return wt+(wf-wt)*Math.pow(Math.sin(Math.PI/2*v),1.4)}
  function curtain(side){
    var X=function(x){return side?W-x:x},ys=[],y;
    for(y=cT;y<cB;y+=1.5)ys.push(y);ys.push(cB);
    var frac=[0];for(i=1;i<=k;i++)frac.push(i/(k+1)+(rnd(i*7+side)-.5)*(ph?.06:.1));frac.push(1);
    /* the line of a fold at height y, with a small hand wobble */
    var at=function(f,y,j,s){return x0+wAt(y)*f+(s?(rnd(s*31+j+side*97)-.5)*(ph?.12:.3):0)};
    var line=function(f,s){return ys.map(function(y,j){return [X(at(f,y,j,s)),y]})};
    var edge=line(1,0);
    /* the cloth: one flat stencil tint, the brand's own green or red */
    T.push('<path d="M'+n(X(x0))+','+n(cT)+'L'+poly(edge)+'L'+n(X(x0))+','+n(cB)+'Z" fill="'+(side?RED:GRN)+'"/>');
    var gath=function(y){return Math.exp(-Math.pow((y-tie)/(fh*.26),2))},
        ends=function(y){return Math.max(.18,Math.min(1,(y-cT)/(ph?6:14),(cB-y)/(ph?4:10)))};
    if(ph){
      /* phone: two folds, printed in a darker shade of the cloth (a second stencil), no black line work inside the curtain */
      for(i=1;i<frac.length-1;i++)T.push(rib(line(frac[i],0),function(t,y){return (.3+.14*gath(y))*ends(y)},side?RSH:GSH));
    }else{
      /* desktop: the engraver's folds, heavy where the cloth turns into shadow, light where it comes back, swelling at the tie */
      for(i=1;i<frac.length-1;i++){var base=i%2?.5:.19;
        L.push(rib(line(frac[i],i),function(t,y){return (base+.28*gath(y))*ends(y)},INK))}
      /* and the shade inside each dark fold: short burin lines running with the cloth, stopping short of the light, never full length */
      for(i=1;i<frac.length-1;i+=2){var a=frac[i],b=frac[i+1];
        [[.32,.62,.66],[.64,.4,.4]].forEach(function(qq,m){var f=a+(b-a)*qq[0],
          segs=[[cT+4+3*rnd(i*9+m+side*7),tie-(tie-cT)*(.1+qq[1]*.45*rnd(i*3+m+side*11)+.08)],[tie+(cB-tie)*(.08+.06*rnd(i+m*5+side)),tie+(cB-tie)*(qq[2]+.22*rnd(i*5+m+side*13))]];
          segs.forEach(function(sg,u){var pts=[];ys.forEach(function(y,jj){if(y>=sg[0]&&y<=sg[1])pts.push([X(at(f,y,jj,i*7+m*3+u+1)),y])});
            if(pts.length>3)L.push(rib(pts,function(t){return .2*Math.pow(Math.sin(Math.PI*t),.7)+.02},INK))})})}
    }
    L.push('<path d="M'+poly(edge)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/>');
    /* the hem: where each fold reaches the floor it turns in a small curve */
    var hm=['M'+n(X(x0))+','+n(cB-.4)];for(i=1;i<frac.length;i++){var xa2=X(x0+wAt(cB)*frac[i-1]),xb2=X(x0+wAt(cB)*frac[i]);hm.push('Q'+n((xa2+xb2)/2)+','+n(cB-(i%2?(ph?1.5:2.6):-.2))+' '+n(xb2)+','+n(cB-.4))}
    L.push('<path d="'+hm.join('')+'" fill="none" stroke="'+INK+'" stroke-width="'+(ph?.8:1)+'"/>');
    /* the tie-back: a twisted gold cord round the gathered drape; on desktop its tassel hangs on the stage side */
    var cw=wAt(tie),bh=ph?2.2:3,xa=x0-.4,xb=x0+cw+.9,sag=ph?.7:1.4,m=ph?2:4,sg=(xb-xa)/m,tw=ph?.8:1.4;
    for(i=0;i<m;i++){var u0=xa+i*sg+(i?.25:0),u1=xa+(i+1)*sg-(i<m-1?.25:0),cy0=tie+sag*Math.sin(Math.PI*(u0-xa)/(xb-xa)),cy1=tie+sag*Math.sin(Math.PI*(u1-xa)/(xb-xa));
      F.push("<path d='M"+n(X(u0+(i?tw:0)))+","+n(cy0-bh/2)+"L"+n(X(u1+(i<m-1?tw:0)))+","+n(cy1-bh/2)+"L"+n(X(u1))+","+n(cy1+bh/2)+"L"+n(X(u0))+","+n(cy0+bh/2)+"Z'/>")}
    if(!ph){var tx=xb-1.6,kn=2.1,ky=tie+bh/2+kn*.95,sy=ky+kn+.8,tl=9,ts=6.4,mt=5,thr=[];
      F.push("<circle cx='"+n(X(tx))+"' cy='"+n(ky)+"' r='"+kn+"'/>");
      F.push("<path d='M"+n(X(tx-ts*.36))+","+n(sy-.8)+"h"+n((side?-1:1)*ts*.72)+"v.9h"+n((side?1:-1)*ts*.72)+"Z'/>");
      for(i=0;i<mt;i++){var v=(i+.5)/mt-.5;thr.push("M"+n(X(tx+v*ts*.6))+","+n(sy+.6)+"L"+n(X(tx+v*ts))+","+n(sy+tl))}
      F.push("<path d='"+thr.join('')+"' stroke='#000' stroke-width='.8' stroke-linecap='round' fill='none'/>")}
  }
  curtain(0);curtain(1);
  /* 3. the pelmet: a board with two printed rules and one valance of gold-fringed swags gathered under it. One swag hangs at the centre,
     behind the cartouche, its belly showing under the plate; the others step out from it to the card's edges (a few percent apart in
     width, mirrored, as an engraver lays out one half and repeats it) */
  var vT=yE+4.2,vR=vT+(ph?2.3:3.2),fl=ph?0:3.4,dip=ph?5.6:10,ys0=fy-g-(ph?1.3:.9)-fl-dip;
  var S0=pw+2*sh*.8,half=cx-S0/2,nS=Math.max(1,Math.round(half/(ph?40:54))),wts=[],sum=0,sws=[],x=0;
  for(j=0;j<nS;j++){var w=1+(rnd(j*17+3)-.5)*.1;wts.push(w);sum+=w}
  for(j=0;j<nS;j++){var ww=half*wts[j]/sum;sws.push([x,x+ww,dip*(.95+.08*rnd(j*13+5))]);x+=ww}
  var all=[];sws.forEach(function(s){all.push([s[0],s[1],s[2],0]);all.push([W-s[1],W-s[0],s[2],0])});all.push([half,W-half,dip,1]);
  L.push('<path d="M0,'+n(vT)+'H'+n(pl)+'M'+n(pr)+','+n(vT)+'H'+n(W)+'" stroke="'+INK+'" stroke-width="'+sw+'"/>','<path d="M0,'+n(vR)+'H'+n(pl)+'M'+n(pr)+','+n(vR)+'H'+n(W)+'" stroke="'+INK+'" stroke-width=".55"/>');
  all.forEach(function(s){var xa=s[0],xb=s[1],dj=s[2],c=s[3],xm=(xa+xb)/2,tt=c?Tc:T,ll=c?Lc:L,ff=c?Fc:F;
    var bez=function(t,d){return [(1-t)*(1-t)*xa+2*(1-t)*t*xm+t*t*xb,ys0+4*d*t*(1-t)]};
    var edge=[];for(q=0;q<=24;q++)edge.push(bez(q/24,dj));
    tt.push('<path d="M'+n(xa)+','+n(vR)+'L'+poly(edge)+'L'+n(xb)+','+n(vR)+'Z" fill="'+RED+'"/>');
    /* folds fanning from the gathered ends, closer together toward the belly (the shaded side) */
    [.22,.42,.6,.74,.86].forEach(function(f,ii){if(ph&&ii%2)return;var d=dj*(1-f*.9),yy=ys0-(1-f)*(ys0-vR)*.55,a=[];
      for(var t=0;t<=24;t++){var u=t/24,px=(1-u)*(1-u)*xa+2*(1-u)*u*xm+u*u*xb,py=(1-u)*(1-u)*ys0+2*(1-u)*u*(yy+d*2*(1-f*.2))+u*u*ys0;a.push([px,Math.min(py,bez(u,dj)[1]-.35)])}
      ll.push('<path d="M'+poly(a)+'" fill="none" stroke="'+INK+'" stroke-width="'+(f>.5?(ph?.38:.42):(ph?.5:.7))+'"/>')});
    ll.push('<path d="M'+poly(edge)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/>');
    /* desktop: where two swags meet, the cloth is caught up in a short cascade */
    if(!ph&&!c&&xa>1)ll.push('<path d="M'+n(xa-.5)+','+n(vR)+'L'+n(xa-.9)+','+n(ys0+4)+'M'+n(xa+.5)+','+n(vR)+'L'+n(xa+.9)+','+n(ys0+4)+'" stroke="'+INK+'" stroke-width=".75"/>');
    /* the fringe: a gold heading along the swag's edge; on desktop, threads hanging from it */
    ff.push("<path d='M"+poly(edge)+"' stroke='#000' stroke-width='"+(ph?1.15:1.2)+"' fill='none'/>");
    if(fl){var len=xb-xa,nt=Math.floor(len/1.6),tk=[];for(q=1;q<nt;q++){var p=bez(q/nt,dj);tk.push('M'+n(p[0])+','+n(p[1])+'v'+n(fl))}
      ff.push("<path d='"+tk.join('')+"' stroke='#000' stroke-width='.7' fill='none'/>")}});
  /* the cartouche: a printed plate with cut-in corners, ruled twice; plain card inside so the heading reads */
  var ci=ph?4:5.5;
  function plate(o){var a=pl+o,b=pr-o,t=pT+o+.5,bb=pb-o,c=Math.max(1.5,ci-o*.6);
    return 'M'+n(a+c)+','+n(t)+'H'+n(b-c)+'A'+c+','+c+' 0 0 0 '+n(b)+','+n(t+c)+'V'+n(bb-c)+'A'+c+','+c+' 0 0 0 '+n(b-c)+','+n(bb)+'H'+n(a+c)+'A'+c+','+c+' 0 0 0 '+n(a)+','+n(bb-c)+'V'+n(t+c)+'A'+c+','+c+' 0 0 0 '+n(a+c)+','+n(t)+'Z'}
  /* its rules are printed crisp, outside the rough-ink filter, so the plate sits exactly round the heading */
  var PL='<path d="'+plate(1)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/><path d="'+plate(oi)+'" fill="none" stroke="'+INK+'" stroke-width=".55"/>';
  /* what is behind the plate stays behind it: the centre swag is clipped round the plate's outer rule */
  var np='M-2,-2H'+n(W+2)+'V'+n(Hh+2)+'H-2Z'+plate(.3);
  ink.setAttribute('viewBox','0 0 '+n(W)+' '+n(Hh));ink.setAttribute('width',n(W));ink.setAttribute('height',n(Hh));
  ink.innerHTML='<defs><clipPath id="r30cut"><path d="'+cut+'"/></clipPath><clipPath id="r30np"><path clip-rule="evenodd" d="'+np+'"/></clipPath>'+
    '<filter id="r30Ink" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale="'+(ph?.5:.7)+'" xChannelSelector="R" yChannelSelector="G"/></filter></defs>'+
    '<g clip-path="url(#r30cut)"><g opacity=".93">'+T.join('')+'<g clip-path="url(#r30np)">'+Tc.join('')+'</g></g><g filter="url(#r30Ink)"><g clip-path="url(#r30np)">'+Lc.join('')+'</g>'+L.join('')+'</g>'+PL+'</g>';
  /* 4. the foil: the gilt moulding round the opening, then the fringes, cords and tassels */
  F.unshift("<path fill-rule='evenodd' d='M"+n(fx-g)+","+n(fy-g)+"h"+n(fw+2*g)+"v"+n(fh+2*g)+"h"+n(-fw-2*g)+"Z M"+n(fx)+","+n(fy)+"v"+n(fh)+"h"+n(fw)+"v"+n(-fh)+"Z'/>");
  mask(fo,W,Hh,"<defs><clipPath id='np'><path clip-rule='evenodd' d='"+np+"'/></clipPath></defs>"+F.join('')+"<g clip-path='url(#np)'>"+Fc.join('')+"</g>");
}
draw();
if(D.fonts&&D.fonts.ready)D.fonts.ready.then(draw);
/* the layout above can move the frame by a fraction without resizing it, so a window resize redraws too (once, however often this runs) */
if(!window.__r30thRZ){window.__r30thRZ=1;addEventListener('resize',function(){requestAnimationFrame(draw)})}
if(!window.__r30thRO&&window.ResizeObserver){var last='';window.__r30thRO=new ResizeObserver(function(){var r=vt.getBoundingClientRect(),k=Math.round(r.width)+'x'+Math.round(r.height);if(k!==last){last=k;draw()}});window.__r30thRO.observe(vt)}
