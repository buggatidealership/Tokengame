/* Round 30, concept "theatre": draws the toy-theatre front around the film to the frame's own size (redrawn when it changes).
   Layers, back to front: the die-cut card (the site's card stock, with the hard ink shadow following the cut), the engraved plate
   (ink line and flat hand-colour tints laid by stencil a hair off register, multiplied into the card), the hot foil (gilt moulding,
   fringe, tie-back cords and tassels, footlight flames), then the film. Idempotent: a second run reuses the same layer and observer. */
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
function draw(){
  var r=vt.getBoundingClientRect(),fr=vp.getBoundingClientRect(),W=r.width,Hh=r.height;if(!W||!Hh||!fr.width)return;
  var fx=fr.left-r.left,fy=fr.top-r.top,fw=fr.width,fh=fr.height,fb=fy+fh,fR=fx+fw;
  var ph=fx<28,g=ph?2.5:3.5,yE=ph?9:12;
  var INK='#1b181c',GRN='#1f7a45',GRD='#0c3d22',RED='#c8372a',RDD='#5e1610',sw=ph?.95:1.15;
  var L=[],T=[],F=[];/* L: the black plate; T: the colour, laid by stencil a hair off the line; F: the foil */
  /* the cartouche, sized to the heading it carries */
  var th=tag?tag.getBoundingClientRect():{width:120,height:14},pw=Math.round(th.width+(ph?30:46)),pH=ph?25:31,pT=1,cx=W/2,pl=cx-pw/2,pr=cx+pw/2,sh=ph?18:30,pb=pT+pH;
  if(tag)H.style.setProperty('--r30-ht',n(pT+(pH-th.height)/2+(ph?.7:.9))+'px');
  /* 1. the die-cut: square sides, an ogee shoulder rising each side into the cartouche, a straight foot */
  var cut='M0,'+(yE+2)+'Q0,'+yE+' 2,'+yE+'L'+n(pl-sh)+','+yE+'C'+n(pl-sh*.45)+','+yE+' '+n(pl-sh*.55)+','+pT+' '+n(pl)+','+pT+
    'L'+n(pr)+','+pT+'C'+n(pr+sh*.55)+','+pT+' '+n(pr+sh*.45)+','+yE+' '+n(pr+sh)+','+yE+'L'+n(W-2)+','+yE+'Q'+n(W)+','+yE+' '+n(W)+','+(yE+2)+
    'L'+n(W)+','+n(Hh-2)+'Q'+n(W)+','+n(Hh)+' '+n(W-2)+','+n(Hh)+'L2,'+n(Hh)+'Q0,'+n(Hh)+' 0,'+n(Hh-2)+'Z';
  mask(cd,W,Hh,"<path d='"+cut+"'/>");
  /* 2. the curtains: hung from behind the pelmet to the stage floor, gathered and tied back beside the opening */
  var cT=yE+4.2+(ph?2.3:3.2),cB=fb,tie=fy+fh*.6,x0=1.2,x1=fx-g-1.4,wf=x1-x0,wt=ph?4.4:12.5,k=ph?3:6;
  function wAt(y){if(y<=tie){var u=Math.max(0,(y-cT)/(tie-cT));return wt+(wf-wt)*Math.pow(.5+.5*Math.cos(Math.PI*u),.85)}
    var v=(y-tie)/(cB-tie);return wt+(wf-wt)*Math.pow(Math.sin(Math.PI/2*v),1.4)}
  function curtain(side){
    var X=function(x){return side?W-x:x},ys=[],y,i;
    for(y=cT;y<cB;y+=1.5)ys.push(y);ys.push(cB);
    var frac=[0];for(i=1;i<=k;i++)frac.push(i/(k+1)+(rnd(i*7+side)-.5)*(ph?.06:.09));frac.push(1);
    /* the line of a fold at height y, with a small hand wobble */
    var at=function(f,y,j,s){return x0+wAt(y)*f+(s?(rnd(s*31+j+side*97)-.5)*(ph?.16:.3):0)};
    var line=function(f,s){return ys.map(function(y,j){return [X(at(f,y,j,s)),y]})};
    var edge=line(1,0);
    T.push('<path d="M'+n(X(x0))+','+n(cT)+'L'+poly(edge)+'L'+n(X(x0))+','+n(cB)+'Z" fill="'+(side?RED:GRN)+'"/>');
    /* every other fold in shade: a second, darker stencil, and the engraver's extra lines running with the cloth */
    for(i=1;i<frac.length-1;i+=2){var a=frac[i],b=frac[i+1];
      T.push('<path d="M'+poly(line(a,0))+'L'+poly(line(b,0).reverse())+'Z" fill="'+(side?RDD:GRD)+'" opacity=".42"/>');
      [1/3,2/3].forEach(function(t,m){L.push('<path d="M'+poly(line(a+(b-a)*t,i*5+m+1))+'" fill="none" stroke="'+INK+'" stroke-width="'+(ph?.3:.38)+'" opacity=".8"/>')})}
    /* the fold lines swell where the cloth is gathered at the tie */
    for(i=1;i<frac.length-1;i++){var l=line(frac[i],i),lft=[],rgt=[];
      l.forEach(function(p){var c=Math.exp(-Math.pow((p[1]-tie)/(fh*.26),2)),hw=(ph?.2:.26)+(ph?.3:.5)*c;lft.push([p[0]-hw,p[1]]);rgt.push([p[0]+hw,p[1]])});
      L.push('<path d="M'+poly(lft)+'L'+poly(rgt.reverse())+'Z" fill="'+INK+'"/>')}
    L.push('<path d="M'+poly(edge)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/>');
    /* the hem: where each fold reaches the floor it turns in a small curve */
    var hm=['M'+n(X(x0))+','+n(cB-.4)];for(i=1;i<frac.length;i++){var xa2=X(x0+wAt(cB)*frac[i-1]),xb2=X(x0+wAt(cB)*frac[i]);hm.push('Q'+n((xa2+xb2)/2)+','+n(cB-(i%2?(ph?1.6:2.6):-.2))+' '+n(xb2)+','+n(cB-.4))}
    L.push('<path d="'+hm.join('')+'" fill="none" stroke="'+INK+'" stroke-width="'+(ph?.8:1)+'"/>');
    /* the tie-back: a twisted gold cord round the gathered drape, and its tassel hanging on the stage side */
    var cw=wAt(tie),bh=ph?2.2:3,xa=x0-.4,xb=x0+cw+.9,sag=ph?.7:1.4,m=ph?2:4,sg=(xb-xa)/m,tw=ph?.8:1.4;
    for(i=0;i<m;i++){var u0=xa+i*sg+(i?.25:0),u1=xa+(i+1)*sg-(i<m-1?.25:0),cy0=tie+sag*Math.sin(Math.PI*(u0-xa)/(xb-xa)),cy1=tie+sag*Math.sin(Math.PI*(u1-xa)/(xb-xa));
      F.push("<path d='M"+n(X(u0+(i?tw:0)))+","+n(cy0-bh/2)+"L"+n(X(u1+(i<m-1?tw:0)))+","+n(cy1-bh/2)+"L"+n(X(u1))+","+n(cy1+bh/2)+"L"+n(X(u0))+","+n(cy0+bh/2)+"Z'/>")}
    var tx=xb-(ph?.9:1.6),kn=ph?1.2:2.1,ky=tie+bh/2+kn*.95,sy=ky+kn+(ph?.5:.8),tl=ph?4.6:9,ts=ph?2.8:6.4,mt=ph?3:5,thr=[];
    F.push("<circle cx='"+n(X(tx))+"' cy='"+n(ky)+"' r='"+kn+"'/>");
    F.push("<path d='M"+n(X(tx-ts*.36))+","+n(sy-(ph?.5:.8))+"h"+n((side?-1:1)*ts*.72)+"v"+(ph?.6:.9)+"h"+n((side?1:-1)*ts*.72)+"Z'/>");
    for(i=0;i<mt;i++){var v=(i+.5)/mt-.5;thr.push("M"+n(X(tx+v*ts*.6))+","+n(sy+(ph?.4:.6))+"L"+n(X(tx+v*ts))+","+n(sy+tl))}
    F.push("<path d='"+thr.join('')+"' stroke='#000' stroke-width='"+(ph?.62:.8)+"' stroke-linecap='round' fill='none'/>");
  }
  curtain(0);curtain(1);
  /* 3. the pelmet: a board with two printed rules and gold-fringed swags gathered under it, laid out from the cartouche outward */
  var vT=yE+4.2,vR=vT+(ph?2.3:3.2),fl=ph?2.3:3.4,dip=ph?5.6:10,ys0=fy-g-.9-fl-dip,span=pl-1.5,nS=Math.max(2,Math.round(span/(ph?38:56))),swW=span/nS;
  var pv=[],pt=[];
  pv.push('<path d="M0,'+n(vT)+'H'+n(pl)+'M'+n(pr)+','+n(vT)+'H'+n(W)+'" stroke="'+INK+'" stroke-width="'+sw+'"/>','<path d="M0,'+n(vR)+'H'+n(pl)+'M'+n(pr)+','+n(vR)+'H'+n(W)+'" stroke="'+INK+'" stroke-width=".55"/>');
  [0,1].forEach(function(side){var X=function(x){return side?W-x:x};
    for(var j=0;j<nS;j++){var xa=j*swW,xb=xa+swW,xm=xa+swW/2,q,dj=dip*(.92+.12*rnd(j*13+side*5));
      var bez=function(t,d){var a=X(xa),b=X(xb),c=X(xm);return [(1-t)*(1-t)*a+2*(1-t)*t*c+t*t*b,(1-t)*(1-t)*ys0+2*(1-t)*t*(ys0+2*d)+t*t*ys0]};
      var edge=[];for(q=0;q<=16;q++)edge.push(bez(q/16,dj));
      pt.push('<path d="M'+n(X(xa))+','+n(vR)+'L'+poly(edge)+'L'+n(X(xb))+','+n(vR)+'Z" fill="'+RED+'"/>');
      /* folds fanning from the gathered ends, closer together toward the belly (the shaded side) */
      [.22,.42,.6,.74,.86].forEach(function(f,i){if(ph&&i%2)return;var d=dj*(1-f*.9),yy=ys0-(1-f)*(ys0-vR)*.55,a=[];
        for(var t=0;t<=16;t++){var s=t/16,x=(1-s)*(1-s)*X(xa)+2*(1-s)*s*X(xm)+s*s*X(xb),y=(1-s)*(1-s)*ys0+2*(1-s)*s*(yy+d*2*(1-f*.2))+s*s*ys0;a.push([x,Math.min(y,bez(s,dj)[1]-.35)])}
        pv.push('<path d="M'+poly(a)+'" fill="none" stroke="'+INK+'" stroke-width="'+(f>.5?(ph?.38:.45):(ph?.5:.62))+'"/>')});
      pv.push('<path d="M'+poly(edge)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/>');
      /* where two swags meet the cloth is caught up in a short cascade */
      if(j>0)pv.push('<path d="M'+n(X(xa)-.5)+','+n(vR)+'L'+n(X(xa)-.9)+','+n(ys0+(ph?2.6:4))+'M'+n(X(xa)+.5)+','+n(vR)+'L'+n(X(xa)+.9)+','+n(ys0+(ph?2.6:4))+'" stroke="'+INK+'" stroke-width="'+(ph?.6:.75)+'"/>');
      /* the fringe: a gold heading along the swag's edge and threads hanging from it */
      F.push("<path d='M"+poly(edge)+"' stroke='#000' stroke-width='"+(ph?.9:1.2)+"' fill='none'/>");
      var len=Math.abs(X(xb)-X(xa)),nt=Math.floor(len/(ph?1.25:1.6)),tk=[];
      for(q=1;q<nt;q++){var p=bez(q/nt,dj);tk.push('M'+n(p[0])+','+n(p[1])+'v'+n(fl))}
      F.push("<path d='"+tk.join('')+"' stroke='#000' stroke-width='"+(ph?.55:.7)+"' fill='none'/>")}});
  L.push(pv.join(''));T.push('<g transform="translate(-.7 0)">'+pt.join('')+'</g>');
  /* the cartouche: a printed plate with cut-in corners, ruled twice; plain card inside so the heading reads */
  var ci=ph?4:5.5;
  function plate(o){var a=pl+o,b=pr-o,t=pT+o+.5,bb=pb-o,c=Math.max(1.5,ci-o*.6);
    return 'M'+n(a+c)+','+n(t)+'H'+n(b-c)+'A'+c+','+c+' 0 0 0 '+n(b)+','+n(t+c)+'V'+n(bb-c)+'A'+c+','+c+' 0 0 0 '+n(b-c)+','+n(bb)+'H'+n(a+c)+'A'+c+','+c+' 0 0 0 '+n(a)+','+n(bb-c)+'V'+n(t+c)+'A'+c+','+c+' 0 0 0 '+n(a+c)+','+n(t)+'Z'}
  L.push('<path d="'+plate(1)+'" fill="none" stroke="'+INK+'" stroke-width="'+sw+'"/>','<path d="'+plate(ph?3.3:4.3)+'" fill="none" stroke="'+INK+'" stroke-width=".55"/>');
  /* 4. the stage front: a row of footlight hoods on a rail under the gilt (their flames are foil), the card below plain */
  var aT=fb+g,rl=aT+(ph?7.6:11),nL=Math.max(6,Math.round(fw/(ph?30:34))),lw=fw/nL,hr=ph?3.3:4.8,hh=ph?3.4:5,j;
  L.push('<path d="M'+n(fx-g)+','+n(rl)+'H'+n(fR+g)+'" stroke="'+INK+'" stroke-width="'+sw+'"/>','<path d="M'+n(fx-g)+','+n(rl+(ph?1.8:2.6))+'H'+n(fR+g)+'" stroke="'+INK+'" stroke-width=".5"/>');
  for(j=0;j<nL;j++){var lx=fx+lw*(j+.5),fy2=rl-hh-(ph?.2:.4),fl2=ph?3.6:5.4,fw2=ph?1.35:2;
    L.push('<path d="M'+n(lx-hr)+','+n(rl)+'C'+n(lx-hr)+','+n(rl-hh)+' '+n(lx+hr)+','+n(rl-hh)+' '+n(lx+hr)+','+n(rl)+'Z" fill="#f6efdc" stroke="'+INK+'" stroke-width="'+(ph?.6:.75)+'"/>',
      '<path d="M'+n(lx-hr*.45)+','+n(rl-hh*.62)+'Q'+n(lx)+','+n(rl-hh*.9)+' '+n(lx+hr*.45)+','+n(rl-hh*.62)+'" fill="none" stroke="'+INK+'" stroke-width=".4"/>');
    F.push("<path d='M"+n(lx)+","+n(fy2-fl2)+"C"+n(lx+fw2*.4)+","+n(fy2-fl2*.55)+" "+n(lx+fw2)+","+n(fy2-fl2*.3)+" "+n(lx+fw2*.7)+","+n(fy2)+"L"+n(lx-fw2*.7)+","+n(fy2)+"C"+n(lx-fw2)+","+n(fy2-fl2*.3)+" "+n(lx-fw2*.4)+","+n(fy2-fl2*.55)+" "+n(lx)+","+n(fy2-fl2)+"Z'/>")}
  /* 5. the printed outline the card was cut along (half of it survives inside the cut) */
  L.push('<path d="'+cut+'" fill="none" stroke="'+INK+'" stroke-width="1.7"/>');
  ink.setAttribute('viewBox','0 0 '+n(W)+' '+n(Hh));ink.setAttribute('width',n(W));ink.setAttribute('height',n(Hh));
  ink.innerHTML='<defs><clipPath id="r30cut"><path d="'+cut+'"/></clipPath><filter id="r30Ink" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="t"/><feDisplacementMap in="SourceGraphic" in2="t" scale=".7" xChannelSelector="R" yChannelSelector="G"/></filter></defs>'+
    '<g clip-path="url(#r30cut)"><g transform="translate(.7 .45)" opacity=".93">'+T.join('')+'</g><g filter="url(#r30Ink)">'+L.join('')+'</g></g>';
  /* 6. the foil: the gilt moulding round the opening (plus the fringes, cords, tassels and flames gathered above) */
  F.unshift("<path fill-rule='evenodd' d='M"+n(fx-g)+","+n(fy-g)+"h"+n(fw+2*g)+"v"+n(fh+2*g)+"h"+n(-fw-2*g)+"Z M"+n(fx)+","+n(fy)+"v"+n(fh)+"h"+n(fw)+"v"+n(-fh)+"Z'/>");
  mask(fo,W,Hh,F.join(''));
}
draw();
if(D.fonts&&D.fonts.ready)D.fonts.ready.then(draw);
if(!window.__r30thRO&&window.ResizeObserver){var last='';window.__r30thRO=new ResizeObserver(function(){var r=vt.getBoundingClientRect(),k=Math.round(r.width)+'x'+Math.round(r.height);if(k!==last){last=k;draw()}});window.__r30thRO.observe(vt)}
