/* Round FULL (2026-10-31): lettering painted once onto a canvas. An inline svg of a lettered word (each glyph its own rotated <text>,
   repeated through a dozen <use> layers) makes hundreds of paint chunks, and the compositor re-sorts them on every frame while anything
   on the page animates (measured: Layerize 1.1 s -> 3.7 s over a 9 s scroll at 4x CPU). A canvas is one paint item. Same recipe as
   DT.word (headlines: extruded, keyline, ink outline, gradient, halftone inside, rim light, thin inner line) and CBT.IL (the takes'
   calmer inner lettering). The page's own web fonts apply to canvas text. CV.lw / CV.il return {w,h,el,redraw(text)}. */
window.CV=(function(){const X=window.DT,INK=X.INK,DPR=Math.min(3,window.devicePixelRatio||1);
const mk=(w,h)=>{const c=document.createElement('canvas');c.width=Math.max(1,Math.ceil(w*DPR));c.height=Math.max(1,Math.ceil(h*DPR));c.style.width=w+'px';c.style.height=h+'px';c.className='cb-cv';c.setAttribute('aria-hidden','true');const g=c.getContext('2d');g.scale(DPR,DPR);return {c,g}};
const off=(w,h)=>{const c=document.createElement('canvas');c.width=Math.ceil(w*DPR);c.height=Math.ceil(h*DPR);const g=c.getContext('2d');g.scale(DPR,DPR);return {c,g}};
/* every glyph of a word, placed as DT.layout placed it; fn(g,ch,size) draws one glyph at the origin */
function glyphs(g,L,x0,base,tr,font,fn){let x=x0;for(const l of L){const cx=x+l.w*tr/2;g.save();g.translate(cx,base+l.b-l.s*.35);g.rotate(l.a*Math.PI/180);g.font=`${l.s}px "${font}"`;g.textAlign='center';g.textBaseline='alphabetic';fn(g,l.c,l.s,l.s*.35);g.restore();x+=l.w*tr}}
const dotsOn=(g,x0,y0,w,h,sp,rmax,col,f)=>{const a=Math.PI/4,ca=Math.cos(a),sa=Math.sin(a),cx=x0+w/2,cy=y0+h/2,m=Math.ceil((Math.hypot(w,h)/2+sp)/sp);g.fillStyle=col;g.beginPath();
  for(let u=-m;u<=m;u++)for(let v=-m;v<=m;v++){const px=cx+u*sp*ca-v*sp*sa,py=cy+u*sp*sa+v*sp*ca;if(px<x0-sp||px>x0+w+sp||py<y0-sp||py>y0+h+sp)continue;const r=rmax*f(px,py);if(r<.3)continue;g.moveTo(px+r,py);g.arc(px,py,r,0,Math.PI*2)}g.fill()};
/* ---- a headline word (DT.word's recipe) drawn into g, centred on x, baseline y ---- */
function word(g,txt,o){const font=o.font||'Luckiest Guy',S=o.size,P=Array.isArray(o.fill)?o.fill:X.PAL[o.fill||'yellow'],tr=o.track||.94;
  const key=o.key!=null?o.key:Math.max(1.2,S*.05),out=o.out!=null?o.out:Math.max(1.6,S*.07),dp=o.depth!=null?o.depth:Math.max(2,Math.round(S*.1)),dx=.9,dy=1,drop=o.drop!=null?o.drop:Math.max(2,S*.07);
  const {L,tot}=X.layout(txt,o),x0=-tot/2,ow=2*(key+out);g.save();g.translate(o.x,o.y);g.rotate((o.rot||0)*Math.PI/180);g.lineJoin='round';
  const pass=(ox,oy,fill,stroke,lw)=>{g.save();g.translate(ox,oy);glyphs(g,L,x0,0,tr,font,(q,c,s,b)=>{if(stroke&&lw>0){q.strokeStyle=stroke;q.lineWidth=lw;q.strokeText(c,0,b)}if(fill){q.fillStyle=fill;q.fillText(c,0,b)}});g.restore()};
  if(drop>0)pass((dp+drop)*dx,(dp+drop)*dy,INK,INK,ow);
  for(let k=dp;k>0;k--)pass(k*dx,k*dy,INK,INK,ow);
  for(let k=dp;k>0;k--)pass(k*dx,k*dy,P[3],P[3],2*key);
  pass(0,0,INK,INK,ow);pass(0,0,'#fff','#fff',2*key);
  const top=-S*1.05,bot=S*.25,gr=g.createLinearGradient(0,top+S*.12,S*.12,bot);[[0,P[0]],[.3,P[1]],[.47,P[1]],[.47,P[0]],[.495,P[0]],[.53,P[2]],[1,P[2]]].forEach(([t,c])=>gr.addColorStop(t,c));pass(0,0,gr,null,0);
  /* halftone inside the letters and the rim light, clipped to the glyphs on a scratch canvas */
  const pw=tot+S*.6,ph=S*1.6,O=off(pw,ph),q=O.g,ox=pw/2,oy=S*1.15;q.save();q.translate(ox,oy);glyphs(q,L,x0,0,tr,font,(z,c,s,b)=>{z.fillStyle='#000';z.fillText(c,0,b)});q.restore();
  q.globalCompositeOperation='source-in';const to=o.dotTo||'b',sp=o.dsp||Math.max(3,S*.09);
  if(!o.nodots){const dc=o.dot||P[2],tmp=off(pw,ph);dotsOn(tmp.g,ox+x0-6,oy+top,tot+12,bot-top,sp,sp*.7,dc,(X0,Y0)=>{const ty=(Y0-oy-top)/(bot-top),tx=(X0-ox-x0)/tot;const t=to==='r'?tx:to==='br'?(tx*.45+ty*.75):ty;return Math.max(0,Math.min(1,(t-.22)/.78))**1.1});q.drawImage(tmp.c,0,0,pw,ph)}
  else q.clearRect(0,0,pw,ph);
  q.globalCompositeOperation='source-over';
  /* the rim light: the glyph outline offset down-right, kept inside the glyphs */
  if(o.hl!==false){const R=off(pw,ph);R.g.save();R.g.translate(ox+S*.022,oy+S*.026);R.g.strokeStyle='rgba(255,255,255,.8)';R.g.lineWidth=Math.max(.7,S*.026);glyphs(R.g,L,x0,0,tr,font,(z,c,s,b)=>z.strokeText(c,0,b));R.g.restore();
    R.g.globalCompositeOperation='destination-in';R.g.save();R.g.translate(ox,oy);glyphs(R.g,L,x0,0,tr,font,(z,c,s,b)=>{z.fillStyle='#000';z.fillText(c,0,b)});R.g.restore();
    q.drawImage(R.c,0,0,pw,ph)}
  g.drawImage(O.c,-ox,-oy,pw,ph);
  pass(0,0,null,`rgba(13,11,16,.55)`,Math.max(.6,S*.012));g.restore()}
/* ---- a headline word as its own canvas, sized like DT.lw; extra(g,cx,cy,w,h) paints behind (a burst) ---- */
function lw(txt,o,extra){const S=o.size,{tot}=X.layout(txt,o),key=o.key!=null?o.key:S*.05,out=o.out!=null?o.out:S*.07,dp=(o.depth!=null?o.depth:Math.max(2,Math.round(S*.1)))+(o.drop!=null?o.drop:Math.max(2,S*.07)),pad=key+out+2+(o.pad||0);
  const rot=Math.abs(o.rot||0)*Math.PI/180,w0=tot+pad*2+dp,h0=S*1.2+pad*2+dp,w=w0+h0*Math.sin(rot)*.9,h=h0+w0*Math.sin(rot)*.9;const {c,g}=mk(w,h);
  const at={x:pad+tot/2+(w-w0)/2,y:pad+S*.95+(h-h0)/2};const draw=t=>{g.clearRect(0,0,w,h);if(extra)extra(g,at.x,at.y-S*.33,w,h);word(g,t,Object.assign({},o,at))};draw(txt);
  if(o.cls)c.classList.add(...o.cls.split(' '));const r={w,h,el:c,at,redraw:draw};if(!o.live)freeze(r);return r}
/* several coloured parts on one baseline */
function multi(parts,o){let x=0;const L=parts.map(p=>{const q=Object.assign({},o,p.o||{},{size:o.size});const w=X.layout(p.t,q).tot;const r={p,q,x,w};x+=w*(q.track||.94)+(p.gap||0);return r});
  const S0=o.size,pad=S0*.12+4,dp=S0*.17+3,rot=Math.abs(o.rot||0)*Math.PI/180,w0=x+pad*2+dp,h0=S0*1.2+pad*2+dp,w=w0+h0*Math.sin(rot),h=h0+w0*Math.sin(rot),{c,g}=mk(w,h);
  const ox=(w-w0)/2+pad,oy=(h-h0)/2+pad+S0*.95;g.save();g.translate(w/2,h/2);g.rotate((o.rot||0)*Math.PI/180);g.translate(-w/2,-h/2);
  L.forEach(r=>word(g,r.p.t,Object.assign({},r.q,{x:ox+r.x+r.w*(r.q.track||.94)/2,y:oy,rot:0})));g.restore();const rr={w,h,el:c};freeze(rr);return rr}

/* ---- inner lettering in the take's way (CBT.IL's recipes, painted) ---- */
let SPK=null;function speck(){if(SPK)return SPK;const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d'),r=X.rng(31);
  for(let i=0;i<180;i++){g.fillStyle=`rgba(0,0,0,${r()<.4?1:.45})`;g.beginPath();g.arc(r()*96,r()*96,.35+r()*.7,0,7);g.fill()}return SPK=c}
function il(txt,o){const T=window.CBT,TAKE=T.TAKE,FONT={ink:'Bangers',cut:'Luckiest Guy',press:'Anton',screen:'Bangers'},font=o.font||FONT[TAKE],S=o.size,p=Array.isArray(o.fill)?o.fill:T.PAL[o.fill]||T.PAL.yellow;
  const q={font,size:S,jr:o.jr!=null?o.jr:(TAKE==='cut'?5:2.5),jb:o.jb!=null?o.jb:(TAKE==='cut'?.05:.025),js:o.js!=null?o.js:.03,seed:o.seed||7,track:o.track||(font==='Anton'?.98:.96)};
  const LIGHT={white:1,cream:1};const ink=o.flat||(TAKE==='cut'?(LIGHT[o.fill]?'#1c1820':o.fill==='GROK'?'#f2eef6':p[1]):TAKE==='press'?(LIGHT[o.fill]?'#fff6dc':o.fill==='GROK'?'#dcd6e4':(o.fill==='yellow'||o.fill==='gold')?'#ffcf2e':p[1]):p[1]);
  const {L,tot}=X.layout(txt,q),pad=Math.max(3,S*.18),dr=Math.max(1.5,S*.08),W=tot+pad*2+dr,Hh=S*1.18+pad*2+dr,rot=(o.rot||0)*Math.PI/180,w=W+Hh*Math.abs(Math.sin(rot)),h=Hh+W*Math.abs(Math.sin(rot));
  const {c,g}=mk(w,h);const x0=pad+(w-W)/2,base=pad+S*.92+(h-Hh)/2,sw=Math.max(1.2,S*(TAKE==='ink'?.085:.07));
  const draw=t=>{const LL=t===txt?L:X.layout(t,q).L;g.clearRect(0,0,w,h);g.save();g.translate(w/2,h/2);g.rotate(rot);g.translate(-w/2,-h/2);g.lineJoin='round';
    const pass=(dx,dy,fn)=>{g.save();g.translate(dx,dy);glyphs(g,LL,x0,base,q.track,font,fn);g.restore()};
    if(TAKE==='ink'){/* a hatched cast shadow, then the colour with a pen outline */
      const H=off(w,h);H.g.save();H.g.translate(dr,dr);glyphs(H.g,LL,x0,base,q.track,font,(z,ch,s,b)=>{z.lineWidth=sw;z.strokeStyle='#000';z.strokeText(ch,0,b);z.fillStyle='#000';z.fillText(ch,0,b)});H.g.restore();
      H.g.globalCompositeOperation='source-in';H.g.strokeStyle=INK;H.g.lineWidth=Math.max(.5,S*.03);const sp=Math.max(1.8,S*.09);H.g.beginPath();for(let k=-h;k<w+h;k+=sp){H.g.moveTo(k,0);H.g.lineTo(k+h,h)}H.g.stroke();g.drawImage(H.c,0,0,w,h);
      pass(0,0,(z,ch,s,b)=>{z.strokeStyle=INK;z.lineWidth=sw;z.strokeText(ch,0,b);z.fillStyle=ink;z.fillText(ch,0,b)})}
    else if(TAKE==='cut'){pass(dr*.8,dr*1.1,(z,ch,s,b)=>{z.strokeStyle=z.fillStyle='rgba(13,11,16,.24)';z.lineWidth=S*.16;z.strokeText(ch,0,b);z.fillText(ch,0,b)});
      pass(0,0,(z,ch,s,b)=>{z.strokeStyle='#fffaf0';z.lineWidth=S*.15;z.strokeText(ch,0,b);z.fillStyle=ink;z.fillText(ch,0,b);z.strokeStyle='rgba(13,11,16,.45)';z.lineWidth=.7;z.strokeText(ch,0,b)})}
    else if(TAKE==='press'){pass(0,Math.max(.8,S*.04),(z,ch,s,b)=>{z.fillStyle='rgba(255,255,255,.55)';z.fillText(ch,0,b)});
      const I=off(w,h);I.g.save();glyphs(I.g,LL,x0,base,q.track,font,(z,ch,s,b)=>{z.fillStyle=ink;z.fillText(ch,0,b)});I.g.restore();I.g.globalCompositeOperation='destination-out';I.g.fillStyle=I.g.createPattern(speck(),'repeat');I.g.fillRect(0,0,w,h);g.drawImage(I.c,0,0,w,h);
      pass(0,-.5,(z,ch,s,b)=>{z.strokeStyle='rgba(0,0,0,.25)';z.lineWidth=.6;z.strokeText(ch,0,b)})}
    else{pass(dr,dr,(z,ch,s,b)=>{z.globalAlpha=.85;z.fillStyle=p[3];z.fillText(ch,0,b)});pass(S*.05,-S*.04,(z,ch,s,b)=>{z.fillStyle=ink;z.fillText(ch,0,b)});
      pass(0,0,(z,ch,s,b)=>{z.strokeStyle=INK;z.lineWidth=Math.max(1,S*.055);z.strokeText(ch,0,b)})}
    g.restore()};
  draw(txt);if(o.cls)c.classList.add(...o.cls.split(' '));const r={w,h,el:c,redraw:draw};if(!o.live)freeze(r);return r}
/* once painted, a canvas becomes a plain image: a 2D canvas is a composited layer of its own, and many of them made every frame's
   commit to the compositor heavy (measured: Commit 1.5 s -> 3.2 s over a 9 s scroll at 4x CPU). The PNG is encoded off the main thread. */
function freeze(r){if(!r||!r.el||r.el.tagName!=='CANVAS'||r._fz)return;r._fz=1;const c=r.el;
  const go=()=>c.toBlob(b=>{if(!b||!c.isConnected&&!c._cbHost)return;const im=new Image();im.src=URL.createObjectURL(b);im.className=c.className;im.style.cssText=c.style.cssText;im.alt='';im.setAttribute('aria-hidden','true');im.decoding='async';
    im.decode().then(()=>{if(c.parentNode){c.replaceWith(im);r.el=im}},()=>{})},'image/png');
  (window.requestIdleCallback||setTimeout)(go)}
/* a blank canvas of w x h painted by fn(g) */
function paint(w,h,fn){const {c,g}=mk(w,h);fn(g);const r={w,h,el:c};freeze(r);return r}
/* the drawn width of inner lettering (no canvas) */
function ilW(txt,o){const T=window.CBT,FONT={ink:'Bangers',cut:'Luckiest Guy',press:'Anton',screen:'Bangers'},font=o.font||FONT[T.TAKE],S=o.size;const {tot}=X.layout(txt,{font,size:S,jr:0,jb:0,js:0,seed:1,track:font==='Anton'?.98:.96});return tot+Math.max(3,S*.18)*2+Math.max(1.5,S*.08)}
/* put a lettering result into a host element */
const put=(host,r)=>{if(!host)return r;host.replaceChildren(r.el);return r};
return {lw,multi,il,put,word,paint,ilW,freeze}})();
