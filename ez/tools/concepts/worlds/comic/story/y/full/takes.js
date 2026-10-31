/* Round FULL (2026-10-31): the inner elements' handmade takes. The owner: the 3D pop treatment (extruded lettering, glossy fills,
   bursts) is for each section's headline only; everything inside the modules is handmade in another way, calmer than the headline.
   One take per page load: window.__cbTake = 'ink' | 'cut' | 'press' | 'screen'.
     ink    · hand-inked: a brush outline whose width swells and thins, flat colour, crosshatch where the shade falls, a hatched cast shadow
     cut    · cut paper: scissor-cut facets, the paper's white core showing at the cut, a fine grain, a soft lift off the page (no ink line)
     press  · letterpress / rubber stamp: flat ink with worn speckle where the press missed, a darker squeeze at the edge, pressed in (lip and wall), no shadow
     screen · screen print: two flat inks a hair off register under a black key line, a second ink as the shadow
   CBT.skinURI(w,h,o) -> a CSS url() of a box, pill, circle or frame drawn that way; CBT.IL(text,o) -> an inline svg of the words lettered that way.
   Shapes only in the url()s (no text there), so they rasterise once. */
window.CBT=(function(){const X=window.DT,INK=X.INK,f1=X.f1,TAKE=window.__cbTake||'ink';
const PAL={yellow:['#fff3a6','#ffd93a','#f2a600','#a35a00'],green:['#9af0c0','#1fbf6e','#0b8a48','#053b20'],red:['#ffaaa0','#f2463a','#c3160e','#5e0703'],
  blue:['#a8d2ff','#3d8df2','#1a56c8','#0b2366'],pink:['#ffb8d2','#f2508c','#c8125a','#5a0322'],black:['#55505e','#24202a','#121016','#000000'],
  white:['#ffffff','#fff8e6','#e9d8ad','#6a4a14'],gold:['#fff0a0','#ffcc22','#e69400','#7a2a06'],cream:['#ffffff','#fff3d0','#eed3a0','#5b2a0c'],
  purple:['#dcbcff','#a35ef0','#6b24d0','#33106b'],orange:['#ffd29a','#ff9330','#e0600a','#6e2104'],nv:['#d8ff98','#86d91f','#4a9400','#203d00'],
  GROK:['#cfc9d8','#8d8796','#3a3540','#0d0b10'],CLAUDE:['#ffcfae','#ff8a4c','#d0581e','#6e2104'],GPT:['#b8f5df','#2fcf9c','#0e8f6c','#05402e'],KIMI:['#bcd6ff','#4a90ff','#1a5fe0','#0b2366']};
const pal=k=>Array.isArray(k)?k:PAL[k]||PAL.yellow;
/* ---- outlines as points (clockwise, y down), so a ring can swell along its length ---- */
function pts(kind,w,h,k,seed,o={}){const r=X.rng(seed),wob=o.wob!=null?o.wob:.45,J=()=>(r()-.5)*2*wob,P=[];
  if(kind==='circle'||kind==='pill'){const rad=Math.min(w,h)/2-k,cx=w/2,cy=h/2,half=kind==='pill'?Math.max(0,w/2-h/2):0,n=o.facet||(kind==='pill'?12:26);
    if(kind==='circle'){for(let i=0;i<n*2;i++){const a=Math.PI*i/n-Math.PI/2;P.push([cx+Math.cos(a)*(rad+J()),cy+Math.sin(a)*(rad+J())])}}
    else{const arc=(ax,a0)=>{for(let i=0;i<=n;i++){const a=a0+Math.PI*i/n;P.push([ax+Math.cos(a)*(rad+J()),cy+Math.sin(a)*(rad+J())])}};arc(cx+half,-Math.PI/2);arc(cx-half,Math.PI/2)}}
  else{const rr=o.round||0,x0=k,y0=k,x1=w-k,y1=h-k,st=o.step||Math.max(9,Math.min(w,h)/3);
    const side=(ax,ay,bx,by)=>{const L=Math.hypot(bx-ax,by-ay)||1,n=Math.max(1,Math.round(L/st));for(let i=0;i<n;i++){const t=i/n,nx=-(by-ay)/L,ny=(bx-ax)/L,j=i?J():J()*(o.corner||1.3);P.push([ax+(bx-ax)*t+nx*j,ay+(by-ay)*t+ny*j])}};
    if(rr>0){const R=Math.min(rr,(x1-x0)/2,(y1-y0)/2),c=(cx,cy,a0)=>{for(let i=0;i<=4;i++){const a=a0+Math.PI/2*i/4;P.push([cx+Math.cos(a)*R,cy+Math.sin(a)*R])}};
      c(x1-R,y0+R,-Math.PI/2);c(x1-R,y1-R,0);c(x0+R,y1-R,Math.PI/2);c(x0+R,y0+R,Math.PI)}
    else{side(x0,y0,x1,y0);side(x1,y0,x1,y1);side(x1,y1,x0,y1);side(x0,y1,x0,y0)}}
  return P}
const path=(P,dx=0,dy=0)=>'M'+P.map(p=>f1(p[0]+dx)+' '+f1(p[1]+dy)).join('L')+'Z';
/* the inward normal at each point, for a ring that swells and thins */
function inset(P,wf){const n=P.length;return P.map((p,i)=>{const a=P[(i-1+n)%n],b=P[(i+1)%n],tx=b[0]-a[0],ty=b[1]-a[1],L=Math.hypot(tx,ty)||1,w=wf(i,n);return [p[0]-ty/L*w,p[1]+tx/L*w]})}
let uid=0;const id=p=>p+(++uid);
/* hatching patterns (inked take) */
const hatch=(hid,ang,sp,sw,col,op)=>`<pattern id="${hid}" patternUnits="userSpaceOnUse" width="${sp}" height="${sp}" patternTransform="rotate(${ang})"><path d="M0 0V${sp}" stroke="${col||INK}" stroke-width="${sw}"${op?` stroke-opacity="${op}"`:''}/></pattern>`;
/* a paper grain (cut take) and a worn-ink speckle mask (press take), drawn once */
let SPECK='';function speck(){if(SPECK)return SPECK;const c=document.createElement('canvas');c.width=c.height=96;const g=c.getContext('2d'),im=g.createImageData(96,96),r=X.rng(31);
  for(let i=0;i<96*96;i++){const v=r();const a=v<.018?0:v<.05?150:255;im.data[i*4]=im.data[i*4+1]=im.data[i*4+2]=255;im.data[i*4+3]=a}g.putImageData(im,0,0);
  /* a few larger misses */for(let k=0;k<3;k++){g.globalCompositeOperation='destination-out';g.beginPath();g.arc(r()*96,r()*96,.6+r()*1.1,0,7);g.fill()}return SPECK=c.toDataURL('image/png')}
const GRAIN=`<filter id="gr" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feColorMatrix values="0 0 0 0 .3 0 0 0 0 .22 0 0 0 0 .12 0 0 0 .5 -.12"/></filter>`;

/* ================= box skins ================= */
const cache={};
/* o: pal, kind (box|pill|circle), frame (ring only, drawn above the content), drop (room for the shadow), seed, role ('cap' torn caption, 'stamp') */
function skinURI(w,h,o){const key=[TAKE,w,h,o.pal,o.kind,o.frame?1:0,o.droponly?1:0,o.seed||0,o.role||''].join('|');if(cache[key])return cache[key];
  const p=pal(o.pal),kind=o.kind||'box',sd=o.seed||7,dr=o.drop!=null?o.drop:3,W=w+dr,Hh=h+dr;let s='';
  if(TAKE==='ink'){const P=pts(kind,w,h,0,sd,{wob:.55}),bw=o.frame?2.6:2,r=X.rng(sd+3),ph=r()*6,
      wf=(i,n)=>Math.max(.7,bw*(.62+.55*Math.sin(i/n*Math.PI*2*2+ph)+.25*(r()-.5))),In=inset(P,wf),hid=id('h'),h2=id('k'),cl=id('c');
    s+=`<defs>${hatch(hid,45,2.6,.75)}${hatch(h2,-45,2.6,.7)}<clipPath id="${cl}"><path d="${path(In)}"/></clipPath></defs>`;
    if(o.droponly||!o.frame&&dr>0)s+=`<path d="${path(P,dr*.8,dr*.8)}" fill="url(#${hid})"/>`;
    if(o.droponly)return cache[key]=X.uri(W,Hh,s);
    if(!o.frame){s+=`<path d="${path(In)}" fill="${p[1]}"/><g clip-path="url(#${cl})"><path d="M${f1(w)} ${f1(h*.3)}L${f1(w)} ${f1(h)}L${f1(w*.3)} ${f1(h)}Z" fill="url(#${hid})" opacity=".42"/><path d="M${f1(w)} ${f1(h*.66)}L${f1(w)} ${f1(h)}L${f1(w*.66)} ${f1(h)}Z" fill="url(#${h2})" opacity=".42"/>
      <path d="M${f1(w*.1)} ${f1(Math.min(h*.32,7))}Q${f1(w*.16)} ${f1(Math.min(h*.16,3.5))} ${f1(Math.min(w*.32,30))} ${f1(Math.min(h*.18,3.6))}" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".75"/></g>`}
    s+=`<path d="${path(P)} ${path(In)}" fill="${INK}" fill-rule="evenodd"/>`}
  else if(TAKE==='cut'){const P=pts(kind,w,h,.5,sd,{wob:.15,step:Math.max(14,Math.min(w,h)*.9),corner:4,facet:kind==='pill'?5:9});
    if(o.droponly||!o.frame){s+=`<path d="${path(P,1.8,2.6)}" fill="rgba(13,11,16,.16)"/><path d="${path(P,.9,1.4)}" fill="rgba(13,11,16,.2)"/>`}
    if(o.droponly)return cache[key]=X.uri(W,Hh,s);
    if(o.frame){const In=inset(P,(i,n)=>2.6+.9*Math.sin(i*1.7+sd));s+=`<path d="${path(P)} ${path(In)}" fill="#1c1820" fill-rule="evenodd"/><path d="${path(In)}" fill="none" stroke="#fffdf6" stroke-width=".9" stroke-opacity=".6"/>`}
    else{const cl=id('c'),In=inset(P,()=>.9);s+=`<defs>${GRAIN}<clipPath id="${cl}"><path d="${path(In)}"/></clipPath></defs><path d="${path(P)}" fill="#fffaf0"/><path d="${path(In,-.5,-.5)}" fill="${p[1]}"/>
      <g clip-path="url(#${cl})"><rect width="${w}" height="${h}" filter="url(#gr)" opacity=".55"/><path d="M0 ${f1(h)}L${f1(w)} ${f1(h*.55)}L${f1(w)} ${f1(h)}Z" fill="${p[2]}" opacity=".22"/></g>`}}
  else if(TAKE==='press'){const P=pts(kind,w,h,.4,sd,{wob:.12,round:kind==='box'?2.2:0}),mk=id('m'),ink=p[2],sq=p[3];
    if(o.droponly)return cache[key]=X.uri(W,Hh,'');
    s+=`<defs><pattern id="${mk}p" patternUnits="userSpaceOnUse" width="96" height="96"><image href="${speck()}" width="96" height="96"/></pattern><mask id="${mk}"><rect width="${W}" height="${Hh}" fill="url(#${mk}p)"/></mask></defs>`;
    if(o.frame){const In=inset(P,()=>2.4),In2=inset(P,()=>4.6),In3=inset(P,()=>5.6);s+=`<g mask="url(#${mk})"><path d="${path(P)} ${path(In)}" fill="#1a1620" fill-rule="evenodd"/><path d="${path(In2)} ${path(In3)}" fill="#1a1620" fill-rule="evenodd" opacity=".85"/></g>`}
    else{const In=inset(P,()=>1.3);s+=`<path d="${path(P,0,1)}" fill="rgba(255,255,255,.5)"/><g mask="url(#${mk})"><path d="${path(P)}" fill="${sq}" opacity=".9"/><path d="${path(In)}" fill="${ink}"/></g><path d="${path(P,0,-.6)}" fill="none" stroke="rgba(0,0,0,.28)" stroke-width=".8"/>`}}
  else{/* screen */const P=pts(kind,w,h,1,sd,{wob:.25}),off=[1.4,-1.1];
    if(o.droponly||!o.frame)s+=`<path d="${path(P,dr*.75,dr*.75)}" fill="${p[3]}" opacity=".85"/>`;
    if(o.droponly)return cache[key]=X.uri(W,Hh,s);
    if(o.frame){const In=inset(P,()=>2.2);s+=`<path d="${path(P,off[0],off[1])} ${path(In,off[0],off[1])}" fill="${p[2]}" fill-rule="evenodd" opacity=".9"/><path d="${path(P)} ${path(In)}" fill="${INK}" fill-rule="evenodd"/>`}
    else s+=`<path d="${path(P,off[0],off[1])}" fill="${p[1]}"/><path d="${path(P)}" fill="none" stroke="${INK}" stroke-width="1.7" stroke-linejoin="round"/>`}
  return cache[key]=X.uri(W,Hh,s)}

/* ================= inner lettering: calmer than a headline, never extruded ================= */
const FONT={ink:'Bangers',cut:'Luckiest Guy',press:'Anton',screen:'Bangers'};
const LIGHT={white:1,cream:1};
/* the colour each take lets a word take: cut paper never prints white on a pale stock (letters cut from black paper there);
   letterpress prints a light ink on dark stock and the deeper tone of a colour elsewhere */
function inkOf(fill,p){if(TAKE==='cut'){if(LIGHT[fill])return '#1c1820';if(fill==='GROK')return '#f2eef6';return p[1]}
  if(TAKE==='press'){if(LIGHT[fill])return '#fff6dc';if(fill==='GROK')return '#dcd6e4';if(fill==='yellow'||fill==='gold')return '#ffcf2e';return p[1]}
  return p[1]}
function IL(txt,o){const font=o.font||FONT[TAKE],S=o.size,p=pal(o.fill),q={font,size:S,jr:o.jr!=null?o.jr:(TAKE==='cut'?5:2.5),jb:o.jb!=null?o.jb:(TAKE==='cut'?.05:.025),js:o.js!=null?o.js:.03,seed:o.seed||7,track:o.track||(font==='Anton'?.98:.96)};
  const ink=o.flat||inkOf(o.fill,p);const {L,tot}=X.layout(txt,q),pad=Math.max(3,S*.18),dr=Math.max(1.5,S*.08),W=tot+pad*2+dr,Hh=S*1.18+pad*2+dr,rot=(o.rot||0)*Math.PI/180,W2=W+Hh*Math.abs(Math.sin(rot)),H2=Hh+W*Math.abs(Math.sin(rot));
  let x=pad+(W2-W)/2,base=pad+S*.92+(H2-Hh)/2,g='';const glyph=(dx,dy,attr)=>{let t='',xx=x;for(const l of L){const cx=xx+l.w*q.track/2;t+=`<text x="${f1(cx+dx)}" y="${f1(base+l.b+dy)}" font-size="${f1(l.s)}" text-anchor="middle" transform="rotate(${f1(l.a)} ${f1(cx+dx)} ${f1(base-l.s*.35+dy)})">${X.esc(l.c)}</text>`;xx+=l.w*q.track}return `<g ${attr}>${t}</g>`};
  const sw=Math.max(1.2,S*(TAKE==='ink'?.085:.07));
  if(TAKE==='ink'){const hid=id('lh');g+=`<defs>${hatch(hid,45,Math.max(1.8,S*.09),Math.max(.5,S*.03))}</defs>`+glyph(dr,dr,`fill="url(#${hid})" stroke="url(#${hid})" stroke-width="${f1(sw)}"`)+glyph(0,0,`fill="${ink}" stroke="${INK}" stroke-width="${f1(sw)}" paint-order="stroke" stroke-linejoin="round"`)}
  else if(TAKE==='cut'){g+=glyph(dr*.8,dr*1.1,`fill="rgba(13,11,16,.24)" stroke="rgba(13,11,16,.24)" stroke-width="${f1(S*.16)}" stroke-linejoin="round"`)+glyph(0,0,`fill="${ink}" stroke="#fffaf0" stroke-width="${f1(S*.15)}" paint-order="stroke" stroke-linejoin="round"`)+glyph(0,0,`fill="none" stroke="rgba(13,11,16,.45)" stroke-width=".7"`)}
  else if(TAKE==='press'){const mk=id('lm');g+=`<defs><pattern id="${mk}p" patternUnits="userSpaceOnUse" width="96" height="96"><image href="${speck()}" width="96" height="96"/></pattern><mask id="${mk}"><rect width="${f1(W2)}" height="${f1(H2)}" fill="url(#${mk}p)"/></mask></defs>`
    +glyph(0,Math.max(.8,S*.04),`fill="rgba(255,255,255,.55)"`)+glyph(0,0,`fill="${ink}" mask="url(#${mk})"`)+glyph(0,-.5,`fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".6"`)}
  else{g+=glyph(dr,dr,`fill="${p[3]}" opacity=".85"`)+glyph(S*.05,-S*.04,`fill="${ink}"`)+glyph(0,0,`fill="none" stroke="${INK}" stroke-width="${f1(Math.max(1,S*.055))}" stroke-linejoin="round"`)}
  const out=`<g transform="rotate(${o.rot||0} ${f1(W2/2)} ${f1(H2/2)})" font-family="${font}" style="font-family:'${font}';font-weight:400;font-style:normal;letter-spacing:0">${g}</g>`;
  return {w:W2,h:H2,inner:out,svg:X.svg(W2,H2,out,'cb-il '+(o.cls||''))}}
return {TAKE,skinURI,IL,PAL}})();
