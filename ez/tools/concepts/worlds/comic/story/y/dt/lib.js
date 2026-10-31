/* Round DT (2026-10-31): the detail pass. Hand-tuned SVG pieces that close the gap between a stock pop-art comic page and ours.
   DT.word      lettering, each letter its own glyph (size, angle, baseline bounce), a two-tone fill split by a highlight,
                halftone INSIDE the letters (dots growing toward one edge), an inner rim light, a white keyline, a thick ink
                outline, a coloured extrusion and a stepped ink drop.
   DT.dots      halftone as shading: colour-on-colour dots on a rotated grid, size grows with darkness (radial falloff).
   DT.rays      an irregular sunburst (wedges of varied width).          DT.speed  tapered ink strokes (thick root, sharp tip).
   DT.burst     a hand-shaped jagged burst (varied spikes), nested.      DT.cloud  puffs of varied size, shading crescents, inner curves.
   DT.star / DT.bolt / DT.debris / DT.face / DT.panel.
   Every function returns an SVG string; ids are unique per call. Works standalone and on the live page. */
window.DT=window.DT||(function(){
const INK='#0d0b10';let uid=0;const id=p=>'dt'+p+(++uid);
const rng=s=>{s=(s|0)||1;return ()=>((s=Math.imul(s^(s>>>15),2246822507)^Math.imul(s^(s>>>13),3266489909),(s>>>0)%100000)/100000)};
const f1=n=>(Math.round(n*10)/10).toString();
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const cv=document.createElement('canvas').getContext('2d');
const mw=(ch,font,size)=>{cv.font=`${size}px "${font}"`;return cv.measureText(ch).width};
const PAL={
 red:['#ffb3a6','#ff4a33','#d4180f','#8a0a05'],yellow:['#fffbd0','#ffe83a','#ffb000','#a35a00'],blue:['#c9e8ff','#4ea6ff','#1f5fd8','#0b2a78'],
 green:['#e4ffc9','#8be04a','#2fa52b','#0d4a18'],orange:['#ffe3a8','#ffb12e','#ff6a0a','#8a2a00'],white:['#ffffff','#fffbe8','#f0dfb0','#6a4a14'],
 pink:['#ffd0e0','#ff6a9e','#e0145a','#6b0626']};
/* lettering. o: x,y (centre of the baseline), size, font, rot, fill (PAL key), dot (dot colour), dotTo ('b' bottom|'r' right|'br'),
   jr (letter angle jitter, deg), jb (baseline bounce, fraction of size), js (size jitter), grow (size change first to last letter, fraction),
   track (advance factor), key (white keyline px), out (ink outline px), depth (extrusion steps), dx,dy (extrusion step), drop (extra ink drop px),
   seed, hl (rim light), anchor ('middle'|'start') */
function word(txt,o){const r=rng(o.seed||7),font=o.font||'Luckiest Guy',S=o.size||40,ch=[...txt],n=ch.length,P=PAL[o.fill||'yellow'];
 const key=o.key!=null?o.key:Math.max(1.2,S*.05),out=o.out!=null?o.out:Math.max(1.6,S*.07),dp=o.depth!=null?o.depth:Math.max(2,Math.round(S*.1)),
  dx=o.dx!=null?o.dx:.9,dy=o.dy!=null?o.dy:1,drop=o.drop!=null?o.drop:Math.max(2,S*.07),tr=o.track||.94;
 const {L,tot}=layout(txt,o);
 let x=o.anchor==='start'?0:-tot/2;let t='';
 for(const l of L){const cx=x+l.w*tr/2;t+=`<text x="${f1(cx)}" y="${f1(l.b)}" style="font-size:${f1(l.s)}px" text-anchor="middle" transform="rotate(${f1(l.a)} ${f1(cx)} ${f1(l.b-l.s*.35)})">${esc(l.c)}</text>`;x+=l.w*tr}
 const x0=o.anchor==='start'?0:-tot/2,top=-S*1.05,bot=S*.25,G=id('g'),C=id('c'),F=id('f');
 const ff=`class="dtw" style="font-family:'${font}';letter-spacing:0;font-weight:400;font-style:normal"`;
 const use=(a)=>`<use href="#${G}" ${a}/>`;
 let s=`<g transform="translate(${f1(o.x)} ${f1(o.y)}) rotate(${o.rot||0})" ${ff} stroke-linejoin="round"><defs><g id="${G}">${t}</g><clipPath id="${C}">${t}</clipPath>
  <linearGradient id="${F}" gradientUnits="userSpaceOnUse" x1="0" y1="${f1(top+S*.12)}" x2="${f1(S*.12)}" y2="${f1(bot)}"><stop offset="0" stop-color="${P[0]}"/><stop offset=".3" stop-color="${P[1]}"/><stop offset=".47" stop-color="${P[1]}"/><stop offset=".47" stop-color="${P[0]}"/><stop offset=".495" stop-color="${P[0]}"/><stop offset=".53" stop-color="${P[2]}"/><stop offset="1" stop-color="${P[2]}"/></linearGradient></defs>`;
 const ow=2*(key+out);
 /* stepped drop: a hard ink slab beyond the coloured extrusion */
 if(drop>0)s+=use(`transform="translate(${f1((dp+drop)*dx)} ${f1((dp+drop)*dy)})" fill="${INK}" stroke="${INK}" stroke-width="${f1(ow)}"`);
 for(let k=dp;k>0;k--)s+=use(`transform="translate(${f1(k*dx)} ${f1(k*dy)})" fill="${INK}" stroke="${INK}" stroke-width="${f1(ow)}"`);
 for(let k=dp;k>0;k--)s+=use(`transform="translate(${f1(k*dx)} ${f1(k*dy)})" fill="${P[3]}" stroke="${P[3]}" stroke-width="${f1(2*key)}"`);
 /* the coloured extrusion's own thin ink edge where it meets the face: one more ink outline pass of the face */
 s+=use(`fill="${INK}" stroke="${INK}" stroke-width="${f1(ow)}"`);
 s+=use(`fill="#fff" stroke="#fff" stroke-width="${f1(2*key)}"`);
 s+=use(`fill="url(#${F})"`);
 /* halftone inside the letters: dots grow toward one edge, a darker shade of the fill */
 const dc=o.dot||P[2],to=o.dotTo||'b',sp=o.dsp||Math.max(3,S*.09);
 s+=`<g clip-path="url(#${C})">`+dots(x0-6,top,tot+12,bot-top,{sp,ang:45,col:dc,rmax:sp*.7,f:(X,Y)=>{const ty=(Y-top)/(bot-top),tx=(X-x0)/tot;const t=to==='r'?tx:to==='br'?(tx*.45+ty*.75):ty;return Math.max(0,Math.min(1,(t-.22)/.78))**1.1}});
 if(o.hl!==false)s+=use(`transform="translate(${f1(S*.022)} ${f1(S*.026)})" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="${f1(Math.max(.7,S*.026))}"`);
 s+=`</g>`;
 /* thin inner detail line along the face's edge (line weight: thick outside, thin inside) */
 s+=use(`fill="none" stroke="${INK}" stroke-opacity=".55" stroke-width="${f1(Math.max(.6,S*.012))}"`);
 return s+`</g>`}
/* the glyph placement of a word: each letter its own size, angle and baseline; o.sizes scales single letters */
function layout(txt,o){const r=rng(o.seed||7),font=o.font||'Luckiest Guy',S=o.size||40,ch=[...txt],n=ch.length,tr=o.track||.94;const L=[];let tot=0;
 for(let i=0;i<n;i++){const g=(o.grow?(1+o.grow*(n>1?i/(n-1)-.5:0)):1)*(o.sizes?o.sizes[i]||1:1),s=S*g*(1+((r()-.5)*2)*(o.js!=null?o.js:.05)),w=mw(ch[i],font,s);
  L.push({c:ch[i],s,w,b:((r()-.5)*2)*(o.jb!=null?o.jb:.05)*S,a:((r()-.5)*2)*(o.jr!=null?o.jr:5)+(o.lean||0)});tot+=w*tr}
 return {L,tot}}
/* the drawn width of a word at size 1 unit: scale o.size to fit a width */
function fit(txt,o,maxW){const t=layout(txt,o).tot,pad=2*((o.key!=null?o.key:o.size*.05)+(o.out!=null?o.out:o.size*.07))+(o.depth!=null?o.depth:o.size*.1)+(o.size*.07);return t+pad<=maxW?o.size:o.size*(maxW/(t+pad))}
/* halftone dots in a box. o: sp (spacing), ang (grid angle), rmax, col, f(x,y) -> 0..1 (dot size) */
function dots(x0,y0,w,h,o){const sp=o.sp||7,a=(o.ang!=null?o.ang:45)*Math.PI/180,ca=Math.cos(a),sa=Math.sin(a),cx=x0+w/2,cy=y0+h/2,R=Math.hypot(w,h)/2+sp,m=Math.ceil(R/sp);let d='';
 for(let u=-m;u<=m;u++)for(let v=-m;v<=m;v++){const px=cx+u*sp*ca-v*sp*sa,py=cy+u*sp*sa+v*sp*ca;if(px<x0-sp||px>x0+w+sp||py<y0-sp||py>y0+h+sp)continue;
  const rr=(o.rmax||sp*.55)*o.f(px,py);if(rr<.3)continue;d+=`M${f1(px-rr)} ${f1(py)}a${f1(rr)} ${f1(rr)} 0 1 0 ${f1(2*rr)} 0a${f1(rr)} ${f1(rr)} 0 1 0 ${f1(-2*rr)} 0`}
 return `<path d="${d}" fill="${o.col}"${o.op?` opacity="${o.op}"`:''}/>`}
/* radial shading falloff: small dots at the subject, large at the far edges */
const radial=(cx,cy,r0,r1,g=1.3,floor=0)=>(x,y)=>{const t=Math.max(0,Math.min(1,(Math.hypot(x-cx,y-cy)-r0)/(r1-r0)));return Math.max(floor,t**g)};
/* an irregular sunburst: wedges of varied angular width and spacing */
function rays(cx,cy,R,col,o={}){const r=rng(o.seed||3),n=o.n||22;let d='',a=r()*.3;
 while(a<Math.PI*2+a*0){const w=(.25+r()*1.1)*Math.PI*2/n/2,g=(.4+r()*1.2)*Math.PI*2/n/2;const a1=a+w;
  d+=`M${f1(cx)} ${f1(cy)}L${f1(cx+R*Math.cos(a))} ${f1(cy+R*Math.sin(a))}L${f1(cx+R*Math.cos(a1))} ${f1(cy+R*Math.sin(a1))}Z`;a=a1+g;if(a>Math.PI*2)break}
 return `<path d="${d}" fill="${col}"${o.op?` opacity="${o.op}"`:''}/>`}
/* tapered speed or impact lines from the subject: root (thick) at r0, a point at the tip. o: n, l0,l1 (length), w0,w1 (root width), a0,a1 (angle range), col, inward */
function speed(cx,cy,r0,o={}){const r=rng(o.seed||5),n=o.n||30,a0=o.a0!=null?o.a0:0,a1=o.a1!=null?o.a1:Math.PI*2;let d='';
 for(let i=0;i<n;i++){const a=a0+(a1-a0)*(i+r()*.8)/n,rr=r0*(.9+r()*.3),L=(o.l0||20)+r()*((o.l1||60)-(o.l0||20)),w=(o.w0||1.5)+r()**2*((o.w1||5)-(o.w0||1.5));
  const ux=Math.cos(a),uy=Math.sin(a),px=-uy,py=ux;let bx=cx+ux*rr,by=cy+uy*rr,tx=cx+ux*(rr+L),ty=cy+uy*(rr+L);if(o.inward){[bx,tx]=[tx,bx];[by,ty]=[ty,by]}
  d+=`M${f1(bx+px*w/2)} ${f1(by+py*w/2)}L${f1(tx)} ${f1(ty)}L${f1(bx-px*w/2)} ${f1(by-py*w/2)}Z`}
 return `<path d="${d}" fill="${o.col||INK}"${o.op?` opacity="${o.op}"`:''}/>`}
/* hand-shaped jagged burst points: varied spike lengths and angles */
function burstPts(cx,cy,rIn,rOut,n,seed,o={}){const r=rng(seed||9),p=[],sx=o.sx||1,sy=o.sy||1;
 for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2+(o.a||-1.57)+((r()-.5)*.5)*Math.PI*2/n,b=a+Math.PI/n*(.8+r()*.4);
  const ro=rOut*(.62+r()*.55)*(r()<.18?1.22:1),ri=rIn*(.86+r()*.22);
  p.push([cx+ro*Math.cos(a)*sx,cy+ro*Math.sin(a)*sy],[cx+ri*Math.cos(b)*sx,cy+ri*Math.sin(b)*sy])}
 return p}
const pts=(p,k=1,cx=0,cy=0)=>p.map(([x,y])=>f1(cx+(x-cx)*k)+','+f1(cy+(y-cy)*k)).join(' ');
/* a nested burst: ink drop, outer colour with a thick ink contour, inner colour(s) with a thin ink line. o: c (outer, inner...), drop */
function burst(cx,cy,rIn,rOut,n,seed,o={}){const p=burstPts(cx,cy,rIn,rOut,n,seed,o),c=o.c||['#ff3a31','#fff'],dr=o.drop!=null?o.drop:5,ow=o.ow||3.4;
 let s=`<polygon points="${pts(p)}" fill="${INK}" transform="translate(${dr} ${dr})"/><polygon points="${pts(p)}" fill="${c[0]}" stroke="${INK}" stroke-width="${ow}" stroke-linejoin="miter" stroke-miterlimit="8"/>`;
 const ks=o.ks||[.8,.62];for(let i=1;i<c.length;i++)s+=`<polygon points="${pts(p,ks[i-1],cx,cy)}" fill="${c[i]}"${i===1?` stroke="${INK}" stroke-width="1.1" stroke-linejoin="miter"`:''}/>`;
 if(o.shade){const K=id('bk'),k1=c.length>1?ks[0]:1,sh=o.shoff||7;s+=`<defs><clipPath id="${K}"><polygon points="${pts(p,k1,cx,cy)}"/></clipPath></defs><g clip-path="url(#${K})"><polygon points="${pts(p,k1,cx,cy)}" fill="${o.shade}"/><polygon points="${pts(p,k1*.97,cx,cy)}" fill="${c[c.length>1?1:0]}" transform="translate(${-sh} ${-sh*.8})"/></g>`}
 return s}
/* a cloud of puffs of varied size, shading crescents bottom-right, thin inner curves where the puffs meet */
function cloud(cx,cy,rx,ry,o={}){const r=rng(o.seed||11),n=o.n||9,P=[],C=id('cl'),sh=o.shade||'#b9c9e6',ow=o.ow||3.4,dr=o.drop!=null?o.drop:5;
 for(let i=0;i<n;i++){const a=i/n*Math.PI*2+(r()-.5)*.4,pr=Math.min(rx,ry)*(.34+r()*.32);P.push([cx+(rx-pr*.35)*Math.cos(a),cy+(ry-pr*.35)*Math.sin(a),pr,a])}
 const body=P.map(([x,y,pr])=>`<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(pr)}"/>`).join('')+`<ellipse cx="${cx}" cy="${cy}" rx="${f1(rx*.86)}" ry="${f1(ry*.82)}"/>`;
 let s=`<defs><clipPath id="${C}">${body}</clipPath></defs><g fill="${INK}" transform="translate(${dr} ${dr})">${body}</g><g fill="${INK}" stroke="${INK}" stroke-width="${f1(ow*2)}">${body}</g><g fill="${o.fill||'#fff'}">${body}</g>`;
 s+=`<g clip-path="url(#${C})"><g fill="${sh}">${P.map(([x,y,pr])=>`<circle cx="${f1(x+pr*.18)}" cy="${f1(y+pr*.22)}" r="${f1(pr)}"/>`).join('')}</g><g fill="${o.fill||'#fff'}">${P.map(([x,y,pr])=>`<circle cx="${f1(x-pr*.1)}" cy="${f1(y-pr*.08)}" r="${f1(pr*.9)}"/>`).join('')}<ellipse cx="${f1(cx-rx*.06)}" cy="${f1(cy-ry*.06)}" rx="${f1(rx*.72)}" ry="${f1(ry*.62)}"/></g>`;
 s+=`<g fill="none" stroke="${INK}" stroke-width="1.2" stroke-linecap="round">${P.map(([x,y,pr,a])=>{const k=.93,b0=a+Math.PI-.45,b1=a+Math.PI+.25;return `<path d="M${f1(x+pr*k*Math.cos(b0))} ${f1(y+pr*k*Math.sin(b0))}A${f1(pr*k)} ${f1(pr*k)} 0 0 1 ${f1(x+pr*k*Math.cos(b1))} ${f1(y+pr*k*Math.sin(b1))}"/>`}).join('')}</g></g>`;
 if(o.trail){const [tx,ty]=o.trail;[[.0,7],[.45,4.8],[.8,3]].forEach(([t,rr])=>{const x=cx+(tx-cx)*(.55+t*.45),y=cy+(ty-cy)*(.55+t*.45);s+=`<circle cx="${f1(x+2)}" cy="${f1(y+2)}" r="${rr}" fill="${INK}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${rr}" fill="#fff" stroke="${INK}" stroke-width="2"/>`})}
 return s}
/* a five-point star with a lit and a shaded half on each arm */
function star(cx,cy,R,o={}){const p=[],rot=(o.rot||0)*Math.PI/180;for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2+rot,rr=i%2?R*.44:R;p.push([cx+rr*Math.cos(a),cy+rr*Math.sin(a)])}
 const c=o.c||['#fff36a','#ffc400'];let s=`<polygon points="${pts(p)}" fill="${INK}" transform="translate(${o.drop||3} ${o.drop||3})"/><polygon points="${pts(p)}" fill="${c[0]}" stroke="${INK}" stroke-width="${o.ow||2.6}" stroke-linejoin="round"/>`;
 let d='';for(let i=0;i<10;i+=2){const q=p[(i+1)%10];d+=`M${f1(cx)} ${f1(cy)}L${f1(p[i][0])} ${f1(p[i][1])}L${f1(q[0])} ${f1(q[1])}Z`}
 return s+`<path d="${d}" fill="${c[1]}"/><path d="${p.filter((_,i)=>i%2===0).map(([x,y])=>`M${f1(cx)} ${f1(cy)}L${f1(x)} ${f1(y)}`).join('')}" stroke="${INK}" stroke-width=".9" stroke-opacity=".6"/><polygon points="${pts(p)}" fill="none" stroke="${INK}" stroke-width="${o.ow||2.6}" stroke-linejoin="round"/>`}
/* a lightning bolt */
function bolt(x,y,s,rot,o={}){const P='0,0 14,-2 9,13 18,12 2,40 7,20 -1,21';const c=o.c||['#fff36a','#ffb000'],G=id('bg');
 return `<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s})"><defs><linearGradient id="${G}" x1="0" y1="0" x2="1" y2="1"><stop offset=".45" stop-color="${c[0]}"/><stop offset=".45" stop-color="${c[1]}"/></linearGradient></defs><polygon points="${P}" fill="${INK}" transform="translate(2.4 2.4)"/><polygon points="${P}" fill="url(#${G})" stroke="${INK}" stroke-width="${f1(2.2/s)}" stroke-linejoin="miter"/></g>`}
/* debris: small ink marks flung out round a point */
function debris(cx,cy,r0,r1,n,seed,o={}){const r=rng(seed||13);let d='';const a0=o.a0||0,a1=o.a1||Math.PI*2;
 for(let i=0;i<n;i++){const a=a0+(a1-a0)*r(),rr=r0+r()*(r1-r0),x=cx+rr*Math.cos(a),y=cy+rr*Math.sin(a),k=r(),z=2+r()*3.5;
  if(k<.4)d+=`M${f1(x)} ${f1(y)}l${f1(Math.cos(a)*z*1.6)} ${f1(Math.sin(a)*z*1.6)}l${f1(-Math.sin(a)*1.4)} ${f1(Math.cos(a)*1.4)}Z`;
  else if(k<.75)d+=`M${f1(x)} ${f1(y-z*.6)}l${f1(z*.7)} ${f1(z*1.1)}l${f1(-z*1.3)} ${f1(-z*.2)}Z`;
  else d+=`M${f1(x-z*.4)} ${f1(y)}a${f1(z*.4)} ${f1(z*.4)} 0 1 0 ${f1(z*.8)} 0a${f1(z*.4)} ${f1(z*.4)} 0 1 0 ${f1(-z*.8)} 0`}
 return `<path d="${d}" fill="${o.col||INK}"/>`}
/* a model's mark on a lit disc: ink drop, radial light, thick contour, thin inner rim, the mark */
function face(MODELS,m,x,y,R,o={}){const M=MODELS[m],G=id('fc');const col=m==='GROK'?'#15121a':M.c;
 return `<defs><radialGradient id="${G}" cx=".36" cy=".32" r=".75"><stop offset="0" stop-color="#fff"/><stop offset=".6" stop-color="#fbf6ea"/><stop offset="1" stop-color="#d9cfb8"/></radialGradient></defs>
  <circle cx="${x+R*.16}" cy="${y+R*.18}" r="${R}" fill="${INK}"/><circle cx="${x}" cy="${y}" r="${R}" fill="url(#${G})" stroke="${INK}" stroke-width="${o.ow||3.6}"/>
  <path d="M${f1(x-R*.72)} ${f1(y-R*.2)}A${f1(R*.75)} ${f1(R*.75)} 0 0 1 ${f1(x-R*.18)} ${f1(y-R*.73)}" fill="none" stroke="#fff" stroke-width="${f1(R*.09)}" stroke-linecap="round"/>
  <circle cx="${x}" cy="${y}" r="${f1(R*.84)}" fill="none" stroke="${INK}" stroke-width=".9" stroke-opacity=".5"/>
  <g transform="translate(${f1(x-R*.62)} ${f1(y-R*.62)}) scale(${f1(R*1.24/24*100)/100})"><path d="${M.d}" fill="${col}" fill-rule="${M.fr||'nonzero'}"/></g>`}
/* a panel ground: base, lighter glow at the subject, an irregular sunburst, colour-on-colour halftone shading from the subject */
function ground(x0,y0,w,h,cx,cy,c,o={}){const G=id('gl');const R=Math.hypot(Math.max(cx-x0,x0+w-cx),Math.max(cy-y0,y0+h-cy));
 return `<defs><radialGradient id="${G}" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${f1(R)}"><stop offset="0" stop-color="${c[0]}"/><stop offset=".45" stop-color="${c[1]}"/><stop offset="1" stop-color="${c[2]}"/></radialGradient></defs>
  <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="url(#${G})"/>${rays(cx,cy,R*1.2,c[3]||'rgba(255,255,255,.18)',{seed:o.seed||3,n:o.n||26,op:o.rop})}
  ${dots(x0,y0,w,h,{sp:o.sp||7.5,ang:o.ang!=null?o.ang:45,col:c[4],rmax:(o.sp||7.5)*.6,f:radial(cx,cy,o.r0||R*.18,o.r1||R*.95,1.15,o.floor||0)})}`}
return {INK,PAL,rng,layout,fit,word,dots,radial,rays,speed,burst,burstPts,pts,cloud,star,bolt,debris,face,ground,esc,id,f1}})();
