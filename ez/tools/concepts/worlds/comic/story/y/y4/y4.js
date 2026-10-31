/* y4 · texture only (2026-10-31). Today's Meet the models card, same DOM, same words, same sizes; only the surface changes.
   window.__y4(t) with t = t0..t5 sets the html class and (re)builds the drawn layers on every .wc-ch.
   Everything is drawn here once (canvas or data URI) and then left still: no live SVG lighting, nothing redrawn per frame. */
(()=>{
const D=document,H=D.documentElement,R=Math.min(3,window.devicePixelRatio||1);
const sm=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
const LX=-.75,LY=-.66; // key light from the top left
/* the model's own colour for the rim light; Grok's brand colour is near black, so its rim is a cool white */
const lum=h=>{const n=parseInt(h.replace('#','').padEnd(6,'0').slice(0,6),16);return (.2126*(n>>16&255)+.7152*(n>>8&255)+.0722*(n&255))/255};
const rimOf=m=>{let c=(window.MODELS&&MODELS[m]&&MODELS[m].c)||'#888';if(c.length===4)c='#'+[...c.slice(1)].map(x=>x+x).join('');return lum(c)<.2?'#cfdcff':c};

function canvas(host,cls,w,h){const c=D.createElement('canvas');c.className='y4-x y4-cv '+cls;c.width=Math.max(1,Math.round(w*R));c.height=Math.max(1,Math.round(h*R));
  c.style.width=w+'px';c.style.height=h+'px';host.appendChild(c);const x=c.getContext('2d');x.scale(R,R);return [c,x]}
function off(w,h){const c=D.createElement('canvas');c.width=Math.max(1,Math.round(w*R));c.height=Math.max(1,Math.round(h*R));const x=c.getContext('2d');x.scale(R,R);return [c,x]}
/* AM halftone: one screen per ink plate, on an integer lattice (a,b)*s so a tile can repeat seamlessly along x.
   Dot radius grows with darkness (area ~ darkness), like an offset screen. */
function screen(x,w,h,dark,pl){
  for(const p of pl){const {a,b,s,col,k=1,g=1.15}=p,ux=a*s,uy=b*s,vx=-b*s,vy=a*s,pitch=s*Math.hypot(a,b),N=Math.ceil((w+h)/s/Math.min(1,Math.hypot(a,b)))+4;
    x.fillStyle=col;x.beginPath();
    for(let i=-N;i<=N;i++)for(let j=-N;j<=N;j++){const px=i*ux+j*vx,py=i*uy+j*vy;if(px<-pitch||py<-pitch||px>w+pitch||py>h+pitch)continue;
      const d=Math.min(1,dark(Math.min(w-.01,Math.max(0,px)),Math.min(h-.01,Math.max(0,py)))*k);if(d<.03)continue;const r=pitch*.5*Math.sqrt(d)*g;x.moveTo(px+r,py);x.arc(px,py,r,0,6.2832)}
    x.fill()}}
/* hatching: parallel strokes where the shadow is deepest, thicker as it darkens (Imageworks' "Hatcher" idea, by hand) */
function hatch(x,w,h,dark,{thr=.55,sp=3.2,ang=-.785,col='rgba(21,18,26,.7)',wmax=1.1}={}){
  const ca=Math.cos(ang),sa=Math.sin(ang),L=Math.hypot(w,h);x.strokeStyle=col;x.lineCap='round';
  for(let o=-L;o<=L;o+=sp){let prev=null;for(let t=-L;t<=L;t+=1.2){const px=w/2+t*ca-o*sa,py=h/2+t*sa+o*ca;
      if(px<0||py<0||px>w||py>h){prev=null;continue}const d=dark(px,py);if(d<thr){prev=null;continue}
      if(prev){x.lineWidth=.25+(d-thr)/(1-thr)*wmax;x.beginPath();x.moveTo(prev[0],prev[1]);x.lineTo(px,py);x.stroke()}prev=[px,py]}}}
/* hatching that repeats every P px along x (for the waving flag's fold tile) */
function hatchTile(x,P,h,dark,{thr=.6,sp=4,col='rgba(21,18,26,.6)',wmax=.9}={}){x.strokeStyle=col;x.lineCap='round';
  for(let c=-h-P;c<=P+h;c+=sp){let prev=null;for(let y=0;y<=h;y+=1){const px=c+y;const d=dark(((px%P)+P)%P,y);
      if(d<thr){prev=null;continue}if(prev){x.lineWidth=.25+(d-thr)/(1-thr)*wmax;x.beginPath();x.moveTo(prev[0],prev[1]);x.lineTo(px,y);x.stroke()}prev=[px,y]}}}
const CMY=(k=1,s=1)=>[{a:3,b:1,s:1.6*s,col:'rgba(0,150,214,.72)',k},{a:1,b:3,s:1.6*s,col:'rgba(214,0,122,.62)',k:k*.85},{a:1,b:1,s:2.5*s,col:'rgba(21,18,26,.8)',k:k*.55,g:1}];

/* paper: speckle and fibres, one tile for the whole page */
let GRAIN=null,MOTTLE=null,BRUSH=null,BRUSHC=null,STREAK=null;
function grain(){if(GRAIN)return GRAIN;const S=180,[c,x]=off(S,S);const id=x.getImageData(0,0,c.width,c.height),d=id.data;
  for(let i=0;i<d.length;i+=4){const v=200+Math.random()*55;d[i]=v;d[i+1]=v-4;d[i+2]=v-14;d[i+3]=Math.random()<.5?Math.random()*70:0}
  x.putImageData(id,0,0);x.setTransform(R,0,0,R,0,0);
  for(let i=0;i<70;i++){const px=Math.random()*S,py=Math.random()*S,a=Math.random()*6.28,l=4+Math.random()*12;x.strokeStyle=`rgba(${120+Math.random()*60|0},${100+Math.random()*50|0},70,${.12+Math.random()*.2})`;
    x.lineWidth=.3+Math.random()*.4;x.beginPath();x.moveTo(px,py);x.quadraticCurveTo(px+Math.cos(a)*l*.5+Math.random()*3,py+Math.sin(a)*l*.5+Math.random()*3,px+Math.cos(a)*l,py+Math.sin(a)*l);x.stroke()}
  for(let i=0;i<120;i++){x.fillStyle=`rgba(60,45,30,${Math.random()*.35})`;x.fillRect(Math.random()*S,Math.random()*S,.5+Math.random(),.5+Math.random())}
  return GRAIN=c.toDataURL()}
/* ink density: soft blotches where the ink went on thin (screen-blended white) */
function mottle(){if(MOTTLE)return MOTTLE;const S=260,[c,x]=off(S,S);
  for(let i=0;i<46;i++){const px=Math.random()*S,py=Math.random()*S,r=8+Math.random()*30;for(const dx of [-S,0,S])for(const dy of [-S,0,S]){const g=x.createRadialGradient(px+dx,py+dy,0,px+dx,py+dy,r);
      g.addColorStop(0,`rgba(255,250,236,${.10+Math.random()*.16})`);g.addColorStop(1,'rgba(255,250,236,0)');x.fillStyle=g;x.fillRect(px+dx-r,py+dy-r,2*r,2*r)}}
  for(let i=0;i<900;i++){x.fillStyle=`rgba(255,250,236,${Math.random()*.5})`;x.fillRect(Math.random()*S,Math.random()*S,.6,.6)}
  return MOTTLE=c.toDataURL()}
/* paint: overlapping loaded-brush strokes in greys around 50% (overlay-blended, so they modulate the colour beneath) */
function brush(dirA=-.5,hue=null){const S=240,[c,x]=off(S,S);x.fillStyle='rgb(128,128,128)';x.fillRect(0,0,S,S);
  for(let i=0;i<260;i++){const px=Math.random()*S,py=Math.random()*S,a=dirA+(Math.random()-.5)*.5,l=18+Math.random()*46,wd=4+Math.random()*12,v=95+Math.random()*70|0;
    for(const dx of [-S,0,S])for(const dy of [-S,0,S]){x.save();x.translate(px+dx,py+dy);x.rotate(a);
      const g=x.createLinearGradient(0,-wd/2,0,wd/2);const al=.18+Math.random()*.22;g.addColorStop(0,`rgba(${v},${v},${v},0)`);g.addColorStop(.25,`rgba(${v},${v},${v},${al})`);g.addColorStop(.75,`rgba(${v},${v},${v},${al})`);g.addColorStop(1,`rgba(${v},${v},${v},0)`);
      x.fillStyle=g;x.beginPath();x.ellipse(0,0,l/2,wd/2,0,0,6.283);x.fill();
      x.strokeStyle=`rgba(${v-30},${v-30},${v-30},.18)`;x.lineWidth=.4;for(let k=-wd/2+1;k<wd/2;k+=1.6){x.beginPath();x.moveTo(-l/2+2,k);x.lineTo(l/2-2,k+(Math.random()-.5));x.stroke()}x.restore()}}
  return c.toDataURL()}
/* brushed metal: fine horizontal streaks for real foil */
function streak(){if(STREAK)return STREAK;const W=220,Hh=60,[c,x]=off(W,Hh);for(let y=0;y<Hh;y+=.5){const v=100+Math.random()*80|0;x.fillStyle=`rgba(${v},${v},${v},.5)`;x.fillRect(0,y,W,.5)}
  for(let i=0;i<300;i++){const v=Math.random()<.5?40:230;x.fillStyle=`rgba(${v},${v},${v},${Math.random()*.4})`;x.fillRect(Math.random()*W,Math.random()*Hh,8+Math.random()*40,.4)}
  return STREAK=c.toDataURL()}

/* dark(x,y) for a flat plate lit from the top left: the far edges fall into shadow */
const plate=(w,h,a=.05,b=.62,m=.8)=>(x,y)=>m*sm(a,b,((x/w-.5)*-LX+(y/h-.5)*-LY));
const edges=(w,h,er=24,eb=20,m=.62)=>(x,y)=>m*Math.max(sm(w-er,w,x),sm(h-eb,h,y));
const disc=(w,h)=>(x,y)=>{const nx=(x-w/2)/(w/2),ny=(y-h/2)/(h/2),r=Math.hypot(nx,ny);if(r>1)return 0;const nz=Math.sqrt(Math.max(0,1-r*r));const lam=nx*LX+ny*LY+nz*.25;return sm(.25,-.55,lam)*.95};

function fold(card,lit){/* the waving flag's own fold tile (160px, the same loop as today), now with dots in the folds' shade */
  const fd=card.querySelector('.wc-flg-fd');if(!fd)return;const h=fd.offsetHeight||card.offsetHeight,P=160,[c,x]=off(P,h);
  const dk=(px)=>Math.pow(Math.max(0,Math.cos(2*Math.PI*px/P)),1.3);const dark=(px,py)=>dk(px)*(.55+.25*py/h);
  screen(x,P,h,dark,[{a:3,b:1,s:1.6,col:'rgba(0,120,200,.7)'},{a:1,b:3,s:1.6,col:'rgba(200,0,110,.55)',k:.85},{a:1,b:1,s:2.5,col:'rgba(21,18,26,.75)',k:.5,g:1}]);
  hatchTile(x,P,h,(px,py)=>dark(px,py),{thr:.62,sp:4});fd.style.setProperty('--y4fd',`url(${c.toDataURL()})`);
  if(lit){const [c2,x2]=off(P,h);const g=x2.createLinearGradient(0,0,P,0);g.addColorStop(0,'rgba(255,214,150,0)');g.addColorStop(.38,'rgba(255,214,150,0)');g.addColorStop(.5,'rgba(255,236,190,.75)');g.addColorStop(.62,'rgba(255,214,150,0)');g.addColorStop(1,'rgba(255,214,150,0)');
    x2.fillStyle=g;x2.fillRect(0,0,P,h);const i=D.createElement('i');i.className='y4-x y4-fdh';i.style.setProperty('--y4fh',`url(${c2.toDataURL()})`);const an=fd.getAnimations&&fd.getAnimations()[0];if(an&&an.currentTime!=null)i.style.animationDelay=(-(an.currentTime%4000))+'ms';fd.after(i)}}

function sv(card,lit){/* T1 Spider-Verse print (and T2 on top) */
  const W=card.offsetWidth,Hh=card.offsetHeight,m=card.dataset.m,rim=rimOf(m);card.style.setProperty('--y4rim',rim);
  const flg=card.querySelector('.wc-flg');if(flg){const w=flg.offsetWidth,h=flg.offsetHeight,[,x]=canvas(flg,'y4-flsh',w,h);
    const dk=lit?(px,py)=>Math.max(.95*sm(.5,.62,px/w)*(.75+.25*py/h),plate(w,h,.25,.8,.7)(px,py)):plate(w,h,.05,.7,.75);
    screen(x,w,h,dk,CMY(1));hatch(x,w,h,dk,{thr:lit?.8:.6,sp:3.4})}
  fold(card,lit);
  const tks=card.querySelector('.wc-tks');if(tks){const w=tks.offsetWidth,h=tks.offsetHeight,[,x]=canvas(tks,'y4-tksh',w,h);
    const dk=(px,py)=>.85*Math.max(sm(.5,1,py/h),sm(w*.55,w,px)*.7);
    screen(x,w,h,dk,[{a:3,b:1,s:1.6,col:'rgba(200,0,90,.55)'},{a:1,b:3,s:1.6,col:'rgba(150,70,0,.55)'},{a:1,b:1,s:2.5,col:'rgba(21,18,26,.7)',k:.5,g:1}]);hatch(x,w,h,dk,{thr:.62,sp:3})}
  const f=card.querySelector('.wc-ch-pic .wc-face');if(f){const w=f.clientWidth,h=f.clientHeight,[c,x]=canvas(f,'y4-fcsh',w,h);
    x.save();x.beginPath();x.arc(w/2,h/2,w/2,0,6.283);x.clip();const dk=disc(w,h);screen(x,w,h,dk,CMY(1,.85));hatch(x,w,h,dk,{thr:.7,sp:2.6,wmax:.8});x.restore()}
  const tx=card.querySelector('.wc-ch-tx');if(tx){const w=tx.clientWidth,h=tx.clientHeight,[,x]=canvas(tx,'y4-txsh',w,h);
    const dk=lit?(px,py)=>Math.max(edges(w,h,30,22,.7)(px,py),.42*sm(.7,1,px/w)):edges(w,h,24,18,.55);
    screen(x,w,h,dk,[{a:3,b:1,s:1.6,col:'rgba(0,150,214,.5)'},{a:1,b:3,s:1.6,col:'rgba(214,0,122,.45)'}])}
  const rl=card.querySelector('.wc-ch-role');if(rl){const w=rl.clientWidth,h=rl.clientHeight,[,x]=canvas(rl,'y4-rlsh',w,h);screen(x,w,h,(px,py)=>.7*sm(.45,1,py/h),[{a:3,b:1,s:1.3,col:'rgba(200,0,90,.5)'},{a:1,b:3,s:1.3,col:'rgba(150,70,0,.5)'}])}
  if(lit){/* the ticket bends: a hard terminator two thirds across, the shade side in dots, a rim of the model's colour on the far edge */
    ['y4-key','y4-keyw'].forEach(c=>{const k=D.createElement('i');k.className='y4-x '+c;card.appendChild(k)});const rr=D.createElement('i');rr.className='y4-x y4-rimx';card.appendChild(rr);
    const [,x]=canvas(card,'y4-cast',W,Hh);/* the caption box's long cast shadow on the flag: dots that thin out with distance */
    if(tx){const sx=tx.offsetLeft+10,sy=tx.offsetTop+9,tw=tx.offsetWidth,th=tx.offsetHeight;
      const inBox=(px,py)=>px>=sx&&py>=sy&&px<=sx+tw&&py<=sy+th;
      screen(x,W,Hh,(px,py)=>inBox(px,py)?.85*Math.min(1,.55+.45*sm(sx+tw+10,sx,px))*Math.min(1,.6+.4*sm(sy+th+9,sy,py)):0,[{a:1,b:1,s:2.2,col:'rgba(30,20,60,.85)',g:1.05}])}}
  const gr=D.createElement('i');gr.className='y4-x y4-grain';card.appendChild(gr)}

function painted(card){const W=card.offsetWidth;card.style.setProperty('--y4rim',rimOf(card.dataset.m));
  ['y4-pl','y4-pd','y4-pb'].forEach(c=>{const i=D.createElement('i');i.className='y4-x '+c;card.appendChild(i)});
  const tx=card.querySelector('.wc-ch-tx');if(tx){const i=D.createElement('i');i.className='y4-x y4-pbt';tx.appendChild(i)}
  const tks=card.querySelector('.wc-tks');if(tks){const i=D.createElement('i');i.className='y4-x y4-pbs';tks.appendChild(i)}
  const f=card.querySelector('.wc-ch-pic .wc-face');if(f){const i=D.createElement('i');i.className='y4-x y4-pbf';f.appendChild(i)}}

function press(card){['y4-lpg','y4-lpm'].forEach(c=>{const i=D.createElement('i');i.className='y4-x '+c;card.appendChild(i)});
  /* registration marks in two corners, the four plates a hair apart */
  [['y4-reg y4-reg-a'],['y4-reg y4-reg-b']].forEach(([c])=>{const s=D.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('class','y4-x '+c);s.setAttribute('viewBox','-8 -8 16 16');s.setAttribute('aria-hidden','true');
    s.innerHTML=[['#00a0de',-.35,.2],['#e2007a',.3,-.25],['#f2c200',.15,.35],['#15121a',0,0]].map(([k,dx,dy])=>`<g transform="translate(${dx} ${dy})" fill="none" stroke="${k}" stroke-width=".7" style="mix-blend-mode:multiply"><circle r="4.2"/><path d="M-7 0H7M0-7V7"/></g>`).join('');card.appendChild(s)})}

function foil(card){['y4-gl'].forEach(c=>{const i=D.createElement('i');i.className='y4-x '+c;card.appendChild(i)});
  const tks=card.querySelector('.wc-tks');if(tks){const i=D.createElement('i');i.className='y4-x y4-brm';tks.appendChild(i)}
  const f=card.querySelector('.wc-ch-pic .wc-face');if(f){const i=D.createElement('i');i.className='y4-x y4-dome';f.appendChild(i)}}

function defs(){if(D.getElementById('y4defs'))return;const s=D.createElementNS('http://www.w3.org/2000/svg','svg');s.id='y4defs';s.setAttribute('width','0');s.setAttribute('height','0');s.setAttribute('aria-hidden','true');s.style.position='absolute';
  s.innerHTML='<filter id="y4rough" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".8" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.3" xChannelSelector="R" yChannelSelector="G"/></filter>'+
   '<filter id="y4spread" x="-3%" y="-3%" width="106%" height="106%"><feMorphology operator="dilate" radius=".25" in="SourceGraphic" result="d"/><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="7"/><feDisplacementMap in="d" scale=".9" xChannelSelector="R" yChannelSelector="G" result="r"/><feGaussianBlur in="r" stdDeviation=".22"/></filter>';D.body.appendChild(s)}
window.__y4=function(t){defs();D.querySelectorAll('.y4-x').forEach(n=>n.remove());D.querySelectorAll('.wc-flg-fd').forEach(n=>n.style.removeProperty('--y4fd'));
  H.classList.remove('y4-sv','y4-lt','y4-pt','y4-lp','y4-fo','y4-t0','y4-t1','y4-t2','y4-t3','y4-t4','y4-t5');H.classList.add('y4-'+t);
  const cls={t1:['y4-sv'],t2:['y4-sv','y4-lt'],t3:['y4-pt'],t4:['y4-lp'],t5:['y4-fo']}[t]||[];cls.forEach(c=>H.classList.add(c));
  H.style.setProperty('--y4grain',`url(${grain()})`);
  if(t==='t3'){if(!BRUSH){BRUSH=brush(-.45);BRUSHC=brush(.2)}H.style.setProperty('--y4brush',`url(${BRUSH})`);H.style.setProperty('--y4brush2',`url(${BRUSHC})`)}
  if(t==='t4')H.style.setProperty('--y4mottle',`url(${mottle()})`);
  if(t==='t5')H.style.setProperty('--y4streak',`url(${streak()})`);
  D.querySelectorAll('section.wc-chars .wc-ch').forEach(card=>{if(t==='t1')sv(card,false);else if(t==='t2')sv(card,true);else if(t==='t3')painted(card);else if(t==='t4')press(card);else if(t==='t5')foil(card)});
  H.classList.add('y4-ready')};
})();
