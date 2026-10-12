/* EZ films round 2, "The Object": the WebGL plate (three.js 0.170.0, vendored). Loaded by ez-r2-object.html (pass=plate|both).
   One set on a porcelain sweep: the smoked-glass $ pot with a gold $ inlay on the navy $EZ plinth, gold $ coins (instanced, every
   motion analytic and seeded), the BUY / SELL tags and the FEE gate, the glass Y that splits the coins SIM.poolShare : rest, the
   round card, the leaderboard stack and its frosted sleeve, the bet tray, the NVIDIA chip (media/ez-gpu2.jpg, owner-cleared) with
   the site's 5 x 7 LED countdown, and the payoff tray with the $EZ tile. No shadow maps, no bloom: pre-blurred contact shadows,
   RoomEnvironment reflections, a neutral key and a neutral white rim. Subframes are averaged in the page (8-bit sum, one rounding). */
export async function init(C){
const {THREE,RoomEnvironment,RoundedBoxGeometry,SVGLoader,mergeGeometries,Q,PASS,FPS,DUR,N,RES,NSQ,MARKS,FRONT,LEDC,VERSION,DATAKEY,fail,cl,lin,mix,sm,EA,EOUT,EIN,EIO,r4,hash,rng,T,SHOTS,shotOf,
  COIN_R,COIN_T,POT_B1,POT_B2,N2,POT_B5,TRAY_SL,DISH_SL,ND2,toPot,POTX,PLH,WALL,TRAYP,TRW,TRH,TRD,CHIPP,DISHP,DISHY,
  XD,WWID,NWID,DIVW,XI,YSPLIT,YEXITW,YIN,YINB,NSLX,NSLY,YNK,YEXITN,XNC0,XNC1,YR,YFUN0,YFUN1,TAGX,CARDP,CW,CH,CTH,STACKP,SW,SHh,SD,SG,PAYP,
  B1F,b1Start,b1Land,STRATE,ST0,stSpawn,STN,PIC,CALLS,SHOW,SHOWUP,OUTMAG,LADDER,LAST,D0,MODELS}=C;
const D2R=Math.PI/180;
await Promise.all(['600 100px G','650 100px G','500 100px G','600 100px GM','700 100px GM','800 100px MS'].map(s=>document.fonts.load(s)));
await document.fonts.ready;
if(!document.fonts.check('600 100px G')||!document.fonts.check('600 100px GM'))fail('fonts did not load');

/* =================== RENDERER =================== */
const glc=document.getElementById('gl'),outc=document.getElementById('out'),og=outc.getContext('2d',{willReadFrequently:true});
const R=new THREE.WebGLRenderer({canvas:glc,antialias:true,preserveDrawingBuffer:true,alpha:false,powerPreference:'high-performance'});
R.setPixelRatio(1);R.setSize(RES,RES,false);glc.style.width=glc.style.height='1080px';
R.outputColorSpace=THREE.SRGBColorSpace;R.toneMapping=THREE.NeutralToneMapping;R.toneMappingExposure=1.0;R.sortObjects=true;
const ANISO=R.capabilities.getMaxAnisotropy();
const scene=new THREE.Scene();
{const pm=new THREE.PMREMGenerator(R);scene.environment=pm.fromScene(new RoomEnvironment(),0.04).texture;scene.environmentIntensity=0.85;pm.dispose()}
const key=new THREE.DirectionalLight(0xffffff,1.55);key.position.set(2.2,6,3.2);scene.add(key);
const rim=new THREE.DirectionalLight(0xffffff,2.0);rim.position.set(-3,2.2,-5);scene.add(rim);
const fill=new THREE.DirectionalLight(0xffffff,0.35);fill.position.set(-4,1.5,3);scene.add(fill);
scene.add(new THREE.HemisphereLight(0xffffff,0xe8e2d4,0.35));

/* the ground: a screen-space porcelain sweep (exact #f5f4f0, the gold wash #f1e4be over the bottom 30% at 35%), drawn first;
   the apron fades every object back into it from y 704 to 740, so nothing but the floor sits under the legal line */
const GROUND=[0xf5/255,0xf4/255,0xf0/255],WASH=[0xf1/255,0xe4/255,0xbe/255];
const BGV='varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy*2.0,0.0,1.0);}';
const BGF='uniform vec3 uG;uniform vec3 uW;uniform float uA;varying vec2 vUv;void main(){float y=1.0-vUv.y;vec3 c=mix(uG,uW,smoothstep(0.70,1.0,y)*0.35);'+
  'float a=uA>0.5?smoothstep(704.0/1080.0,740.0/1080.0,y):1.0;gl_FragColor=vec4(c,a);}';
function screenQuad(apron){const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.ShaderMaterial({vertexShader:BGV,fragmentShader:BGF,
  uniforms:{uG:{value:new THREE.Vector3(...GROUND)},uW:{value:new THREE.Vector3(...WASH)},uA:{value:apron?1:0}},depthTest:false,depthWrite:false,transparent:!!apron}));
  m.frustumCulled=false;m.renderOrder=apron?1e9:-1e9;scene.add(m);return m}
screenQuad(false);screenQuad(true);

/* pre-blurred contact shadows (film30) */
function shadowPlane(w,h,blur,op,r=0.02){const c=document.createElement('canvas'),S=512,pad=blur*2.4;c.width=c.height=S;const g=c.getContext('2d');
  const sx=(S-2*pad)/Math.max(w,h);g.fillStyle='#000';g.fillRect(0,0,S,S);g.filter='blur('+blur+'px)';g.fillStyle='#fff';const W=w*sx,H=h*sx;
  g.beginPath();g.roundRect((S-W)/2,(S-H)/2,W,H,r*sx);g.fill();const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.NoColorSpace;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(S/sx,S/sx),new THREE.MeshBasicMaterial({color:0x3d3a33,alphaMap:t,transparent:true,opacity:op,depthWrite:false,toneMapped:false}));
  m.rotation.x=-Math.PI/2;m.renderOrder=-10;m.userData.op=op;return m}
function shadows(parent,w,d,x,z,k=1){const a=shadowPlane(w*0.99,d*0.99,6,0.42*k),b=shadowPlane(w*1.08,d*1.12,30,0.24*k);a.position.set(x,0.0012,z);b.position.set(x,0.001,z+0.03);parent.add(a,b);return [a,b]}
const loadImg=src=>new Promise((ok,no)=>{const i=new Image();i.onload=()=>ok(i);i.onerror=()=>no(new Error('image '+src));i.src=src});
const cvTex=(w,h,draw,cs=THREE.SRGBColorSpace)=>{const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,c);const t=new THREE.CanvasTexture(c);t.colorSpace=cs;t.anisotropy=ANISO;t.userData={c,g};return t};
function F(g,w,px,fam,stretch){g.font=(stretch?'condensed ':'')+w+' '+px+'px '+(fam||'G');g.fontStretch=stretch||'normal'}
const tri=(g,x,y,s,up,col)=>{g.fillStyle=col;g.beginPath();if(up){g.moveTo(x,y+s*0.88);g.lineTo(x+s,y+s*0.88);g.lineTo(x+s/2,y)}else{g.moveTo(x,y);g.lineTo(x+s,y);g.lineTo(x+s/2,y+s*0.88)}g.closePath();g.fill()};
function tilePath(g,M,x,y,S){g.save();g.fillStyle=M.bg;g.beginPath();g.roundRect(x,y,S,S,S*0.18);g.fill();if(/^#(000|000000)$/i.test(M.bg)){g.strokeStyle='rgba(16,26,58,.25)';g.lineWidth=2;g.stroke()}else{g.strokeStyle='rgba(16,26,58,.22)';g.lineWidth=2;g.stroke()}
  g.translate(x+S*0.18,y+S*0.18);g.scale(S*0.64/24,S*0.64/24);g.fillStyle=M.fg;g.fill(new Path2D(M.d),M.fr||'nonzero');if(M.dot){g.fillStyle=M.dotc||'#1e80ff';g.fill(new Path2D(M.dot))}g.restore()}
const INK='#101a3a',INK2='#5b6273',PORC=0xf7f6f2;

/* =================== MATERIALS =================== */
const SWP={dir:{value:new THREE.Vector4(0.94,0.34,0,0)},amp:{value:0}};      /* the light sweep (B1): a band along dir.xyz at dir.w */
const porcelain=(c=PORC)=>new THREE.MeshPhysicalMaterial({color:c,roughness:0.34,metalness:0,clearcoat:0.55,clearcoatRoughness:0.16});
const navyMat=()=>new THREE.MeshPhysicalMaterial({color:0x101a3a,roughness:0.38,metalness:0,clearcoat:0.7,clearcoatRoughness:0.12});
/* smoked glass: tinted body (alpha 0.22, fresnel edge to 0.7) plus reflections added on top (premultiplied), no transmission */
function glassMat(side,tint=0x3a4256,alpha=0.09,edge=0.85){const m=new THREE.MeshPhysicalMaterial({color:tint,roughness:0.05,metalness:0,transparent:true,opacity:alpha,side,depthWrite:false,envMapIntensity:1.25,ior:1.5});
  m.blending=THREE.CustomBlending;m.blendSrc=THREE.OneFactor;m.blendDst=THREE.OneMinusSrcAlphaFactor;m.blendSrcAlpha=THREE.OneFactor;m.blendDstAlpha=THREE.OneMinusSrcAlphaFactor;
  m.onBeforeCompile=sh=>{sh.uniforms.uSw=SWP.dir;sh.uniforms.uSwA=SWP.amp;sh.uniforms.uEdge={value:edge};
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <project_vertex>','#include <project_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;uniform vec4 uSw;uniform float uSwA;uniform float uEdge;')
      .replace('#include <opaque_fragment>','float fr=pow(1.0-clamp(abs(dot(normalize(normal),normalize(vViewPosition))),0.0,1.0),1.7);float a=mix(diffuseColor.a,uEdge,fr);'+
        'float band=uSwA*exp(-pow((dot(vWP,uSw.xyz)-uSw.w)/0.06,2.0));vec3 edgeC=vec3(0.86,0.886,0.918)*fr*0.18;'+
        'vec3 dk=vec3(0.03,0.04,0.07);gl_FragColor=vec4(mix(totalDiffuse,dk,fr)*a+totalSpecular*2.2*(1.0-0.7*fr)+edgeC+band*vec3(0.9,0.94,1.0)*0.3*(0.3+fr),clamp(a+band*0.08,0.0,1.0));')};
  m.customProgramCacheKey=()=>'glass'+side+'-'+edge;return m}
const goldInlay=()=>{const m=new THREE.MeshPhysicalMaterial({color:0xe2b250,metalness:1,roughness:0.3,clearcoat:0.3,clearcoatRoughness:0.25,envMapIntensity:1.1});
  m.onBeforeCompile=sh=>{sh.uniforms.uSw=SWP.dir;sh.uniforms.uSwA=SWP.amp;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <project_vertex>','#include <project_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;uniform vec4 uSw;uniform float uSwA;')
      .replace('#include <opaque_fragment>','outgoingLight+=uSwA*exp(-pow((dot(vWP,uSw.xyz)-uSw.w)/0.07,2.0))*vec3(1.0,0.84,0.5)*0.9;\n#include <opaque_fragment>')};
  m.customProgramCacheKey=()=>'inlay';return m};

/* =================== THE $ COIN =================== */
const DOLLAR='M224.86 8.29Q151.86 8.29 107.29 37.14Q62.71 66 42.5 117.71Q22.29 169.43 22 238H159.71Q159.71 196.86 166.78 172.86Q173.86 148.85 187.43 138.57Q201 128.28 219.43 128.28Q238.43 128.28 248.93 136.43Q259.43 144.57 264.14 159.43Q268.86 174.28 268.86 194Q268.86 222.71 258.29 242.14Q247.72 261.57 225.64 278.22Q203.57 294.86 168.43 314.57Q140.86 331 115.43 349.86Q90 368.72 70 394.14Q50 419.57 38.86 453.07Q27.72 486.57 27.72 531.29Q27.72 598.29 52.93 640.21Q78.14 682.14 122.93 701.86Q167.71 721.57 226.86 721.57Q288.14 721.57 331.36 699.14Q374.57 676.71 397.57 629.29Q420.57 581.86 420.57 506.57H280.43Q281.29 543.57 275.14 565Q269 586.43 257.93 595.22Q246.86 604 229 604Q212.43 604 202.28 596.5Q192.14 589 187.64 575.36Q183.14 561.72 183.14 542.29Q183.14 515 192.14 497.07Q201.14 479.14 221.28 463.78Q241.43 448.43 274.57 429.57Q305.86 412.14 333.36 391.5Q360.86 370.86 381.64 344.64Q402.43 318.43 414.71 284.71Q427 251 427 207.43Q427 140.14 404.21 95.79Q381.43 51.43 336.78 29.86Q292.14 8.29 224.86 8.29ZM178 -85V60.28H272V-85ZM178 652V814.86H272V652Z';
const dollarPath=new Path2D(DOLLAR);
/* face: colour (satin gold, darker rim groove, the $ with a dark keyline so it reads small) and a height-derived normal map */
function coinFace(){const S=512,c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');
  const gr=g.createRadialGradient(S*0.42,S*0.38,S*0.05,S/2,S/2,S*0.52);gr.addColorStop(0,'#f2cd72');gr.addColorStop(0.7,'#e2b250');gr.addColorStop(1,'#c79a3e');g.fillStyle=gr;g.fillRect(0,0,S,S);
  g.strokeStyle='#9a7228';g.lineWidth=S*0.018;g.beginPath();g.arc(S/2,S/2,S*0.41,0,7);g.stroke();
  const gs=S*0.62/900;g.save();g.translate(S/2-224.5*gs,S/2+365*gs);g.scale(gs,-gs);g.lineWidth=26;g.strokeStyle='#7d5a1c';g.stroke(dollarPath);g.fillStyle='#f6d98c';g.fill(dollarPath);g.restore();
  const col=new THREE.CanvasTexture(c);col.colorSpace=THREE.SRGBColorSpace;col.anisotropy=ANISO;
  /* height: rim ring + $ (blurred), then normals */
  const h=document.createElement('canvas');h.width=h.height=S;const hg=h.getContext('2d');hg.fillStyle='#000';hg.fillRect(0,0,S,S);hg.filter='blur(3px)';
  hg.strokeStyle='#fff';hg.lineWidth=S*0.05;hg.beginPath();hg.arc(S/2,S/2,S*0.465,0,7);hg.stroke();
  hg.save();hg.translate(S/2-224.5*gs,S/2+365*gs);hg.scale(gs,-gs);hg.fillStyle='#fff';hg.fill(dollarPath);hg.restore();
  const hd=hg.getImageData(0,0,S,S).data,n=hg.createImageData(S,S),nd=n.data,H=(x,y)=>hd[((Math.min(S-1,Math.max(0,y)))*S+Math.min(S-1,Math.max(0,x)))*4]/255;
  for(let y=0;y<S;y++)for(let x=0;x<S;x++){const dx=(H(x+1,y)-H(x-1,y))*3.2,dy=(H(x,y+1)-H(x,y-1))*3.2,l=Math.hypot(dx,dy,1),i=(y*S+x)*4;
    nd[i]=Math.round((-dx/l*0.5+0.5)*255);nd[i+1]=Math.round((dy/l*0.5+0.5)*255);nd[i+2]=Math.round((1/l*0.5+0.5)*255);nd[i+3]=255}
  const nc=document.createElement('canvas');nc.width=nc.height=S;nc.getContext('2d').putImageData(n,0,0);const nt=new THREE.CanvasTexture(nc);nt.colorSpace=THREE.NoColorSpace;nt.anisotropy=ANISO;
  return {col,nt}}
const CF=coinFace();
const reed=(()=>{const c=document.createElement('canvas');c.width=512;c.height=8;const g=c.getContext('2d'),im=g.createImageData(512,8);
  for(let x=0;x<512;x++){const s=Math.sin(x/512*2*Math.PI*90),v=Math.round((s*0.45+0.5)*255);for(let y=0;y<8;y++){const i=(y*512+x)*4;im.data[i]=v;im.data[i+1]=128;im.data[i+2]=230;im.data[i+3]=255}}
  g.putImageData(im,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.NoColorSpace;return t})();
const coinSide=new THREE.MeshStandardMaterial({color:0xd7a948,metalness:1,roughness:0.5,normalMap:reed,normalScale:new THREE.Vector2(0.9,0.9)});
const coinFaceM=new THREE.MeshStandardMaterial({map:CF.col,metalness:1,roughness:0.46,normalMap:CF.nt,normalScale:new THREE.Vector2(1,1)});
const coinGeo=new THREE.CylinderGeometry(COIN_R,COIN_R,COIN_T,48,1,false);
const MAXC=520;const coins=new THREE.InstancedMesh(coinGeo,[coinSide,coinFaceM,coinFaceM],MAXC);coins.frustumCulled=false;coins.count=0;scene.add(coins);
const CM=new THREE.Matrix4(),CQ=new THREE.Quaternion(),CV=new THREE.Vector3(),CS=new THREE.Vector3(1,1,1);let NC=0;
function putCoin(p,q,s=1){if(NC>=MAXC||s<=0.001)return;CS.setScalar(s);CM.compose(p,q,CS);coins.setMatrixAt(NC++,CM)}
function endCoins(){coins.count=NC;coins.instanceMatrix.needsUpdate=true}
const QFACE=new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2);   /* coin face toward +z (the camera) */
function tumble(seed,tt){const R0=rng(seed*7+3);const ax=new THREE.Vector3(R0()-0.5,R0()-0.5,R0()-0.5).normalize();const a0=R0()*6.28,w=5+R0()*6;
  return new THREE.Quaternion().setFromAxisAngle(ax,a0+w*tt)}

/* =================== THE $ POT, THE PLINTH, THE $ INLAY =================== */
const POTW=new THREE.Group();scene.add(POTW);                        /* pivot: the pot's bottom-left edge (it tips toward the tray) */
POTW.position.set(POTX-0.5,PLH,0);const POTI=new THREE.Group();POTI.position.set(0.5,0,0);POTW.add(POTI);
{const parts=[[1,WALL,1,0,WALL/2,0],[WALL,1-WALL,1,-0.5+WALL/2,WALL+(1-WALL)/2,0],[WALL,1-WALL,1,0.5-WALL/2,WALL+(1-WALL)/2,0],
    [1-2*WALL,1-WALL,WALL,0,WALL+(1-WALL)/2,0.5-WALL/2],[1-2*WALL,1-WALL,WALL,0,WALL+(1-WALL)/2,-0.5+WALL/2]].map(([w,h,d,x,y,z])=>{const g=new RoundedBoxGeometry(w,h,d,2,0.012);g.translate(x,y,z);return g});
  const geo=mergeGeometries(parts);const back=new THREE.Mesh(geo,glassMat(THREE.BackSide));back.renderOrder=10;const front=new THREE.Mesh(geo,glassMat(THREE.FrontSide));front.renderOrder=12;POTI.add(back,front)}
const svgShapes=(d)=>{const data=new SVGLoader().parse('<svg xmlns="http://www.w3.org/2000/svg"><path d="'+d+'"/></svg>');return data.paths.flatMap(p=>SVGLoader.createShapes(p))};
{const sh=svgShapes(DOLLAR),s=0.64/900;
  const g=new THREE.ExtrudeGeometry(sh,{depth:12,bevelEnabled:true,bevelThickness:6,bevelSize:5,bevelSegments:3,curveSegments:10});g.translate(-224.5,-365,0);g.scale(s,s,s);
  const inl=new THREE.Mesh(g,goldInlay());inl.position.set(0,0.52,0.5+0.006);POTI.add(inl);
  const k=new THREE.ExtrudeGeometry(sh,{depth:2,bevelEnabled:true,bevelThickness:1,bevelSize:13,bevelSegments:1,curveSegments:10});k.translate(-224.5,-365,0);k.scale(s,s,s);
  const key=new THREE.Mesh(k,new THREE.MeshStandardMaterial({color:0x101a3a,roughness:0.5}));key.position.set(0,0.52,0.5+0.002);POTI.add(key)}
const PLINTH=new THREE.Group();PLINTH.position.set(POTX,0,0);scene.add(PLINTH);
{const b=new THREE.Mesh(new RoundedBoxGeometry(1.16,PLH,1.16,3,0.02),navyMat());b.position.y=PLH/2;PLINTH.add(b);
  const t=cvTex(1160,300,g=>{F(g,800,190,'MS','75%');g.textBaseline='alphabetic';const parts=[['$','#ffc72c'],['E','#1fcf6b'],['Z','#ff4136']];
    const w=parts.reduce((s,p)=>s+g.measureText(p[0]).width,0)+12;let x=(1160-w)/2;parts.forEach(p=>{g.fillStyle=p[1];g.fillText(p[0],x,222);x+=g.measureText(p[0]).width+6})});
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1.16,PLH),new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:0.45,metalness:0,emissive:0xffffff,emissiveMap:t,emissiveIntensity:0.12}));
  m.position.set(0,PLH/2,0.58+0.0015);PLINTH.add(m);shadows(PLINTH,1.16,1.16,0,0,1.1)}
const potSlot=(s)=>CV.set(s.p.x,WALL+s.p.y,s.p.z).applyMatrix4(POTI.matrixWorld);

/* =================== THE BET TRAY (and a copy for the payoff) =================== */
function makeTray(){const G=new THREE.Group();const pivot=new THREE.Group();G.add(pivot);const body=new THREE.Group();pivot.add(body);
  const b=new THREE.Mesh(new RoundedBoxGeometry(TRW,TRH,TRD,3,0.03),porcelain());b.position.y=TRH/2;body.add(b);
  [[TRW,0.07,0.03,0,TRD/2-0.015],[TRW,0.07,0.03,0,-TRD/2+0.015],[0.03,0.07,TRD,-TRW/2+0.015,0],[0.03,0.07,TRD,TRW/2-0.015,0]].forEach(([w,h,d,x,z])=>{
    const r=new THREE.Mesh(new RoundedBoxGeometry(w,h,d,2,0.01),porcelain());r.position.set(x,TRH+h/2-0.004,z);body.add(r)});
  /* engraved up / down on the front face, filled green and red */
  const t=cvTex(1240,300,g=>{const s=236;[[true,'#1fcf6b',360],[false,'#ff4136',644]].forEach(([up,col,x])=>{g.save();g.translate(4,5);tri(g,x,(300-s*0.88)/2,s,up,'rgba(16,26,58,.28)');g.restore();tri(g,x,(300-s*0.88)/2,s,up,col)})});
  const f=new THREE.Mesh(new THREE.PlaneGeometry(TRW,TRH),new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:0.4,metalness:0}));f.position.set(0,TRH/2,TRD/2+0.0012);body.add(f);
  return {G,pivot,body}}
const TRAY=makeTray();TRAY.G.position.copy(TRAYP);scene.add(TRAY.G);shadows(TRAY.G,TRW,TRD,0,0);
const traySlot=(tr,s,out)=>out.set(s.p.x,TRH+s.p.y,s.p.z).applyMatrix4(tr.body.matrixWorld);

/* =================== THE OPS DISH (31%) =================== */
const DISH=new THREE.Group();DISH.position.copy(DISHP);scene.add(DISH);
{const col=new THREE.Mesh(new THREE.CylinderGeometry(0.055,0.07,DISHY,40),porcelain());col.position.y=DISHY/2;DISH.add(col);
  const pts=[[0,0],[0.17,0],[0.19,0.012],[0.2,0.05],[0.19,0.055],[0.175,0.02],[0,0.02]].map(p=>new THREE.Vector2(p[0],p[1]));
  const d=new THREE.Mesh(new THREE.LatheGeometry(pts,48),porcelain());d.position.y=DISHY;DISH.add(d);shadows(DISH,0.16,0.16,0,0,0.8)}
const dishSlot=(s,out)=>out.set(DISHP.x+s.p.x,DISHY+0.02+s.p.y,DISHP.z+s.p.z);

/* =================== THE RAIL, THE TAGS, THE FEE GATE (funnel), THE GLASS Y =================== */
const FEE=new THREE.Group();scene.add(FEE);
{const rod=new THREE.Mesh(new THREE.CylinderGeometry(0.014,0.014,4.4,24),new THREE.MeshStandardMaterial({color:0xc9cdd3,metalness:1,roughness:0.22}));rod.rotation.z=Math.PI/2;rod.position.set(XI,YR,-0.05);FEE.add(rod)}
function tagTex(up){return cvTex(1120,340,g=>{g.fillStyle='#fbfaf7';g.fillRect(0,0,1120,340);g.strokeStyle='rgba(16,26,58,.5)';g.lineWidth=4;g.beginPath();g.roundRect(14,14,1092,312,22);g.stroke();
  const s=130;tri(g,80,(340-s*0.88)/2,s,up,up?'#1fcf6b':'#ff4136');F(g,600,150,'GM');g.letterSpacing='6px';g.fillStyle=INK;g.textBaseline='middle';g.fillText(up?'BUY $EZ':'SELL $EZ',250,178)})}
function makeTag(up){const G=new THREE.Group();const b=new THREE.Mesh(new RoundedBoxGeometry(0.56,0.17,0.035,3,0.012),porcelain(0xfbfaf7));G.add(b);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(0.56,0.17),new THREE.MeshStandardMaterial({map:tagTex(up),roughness:0.42,metalness:0}));f.position.z=0.0182;G.add(f);
  [-0.2,0.2].forEach(x=>{const r=new THREE.Mesh(new THREE.TorusGeometry(0.024,0.005,10,28),new THREE.MeshStandardMaterial({color:0xc9cdd3,metalness:1,roughness:0.25}));r.position.set(x,0.105,-0.03);r.rotation.y=Math.PI/2;G.add(r)});
  FEE.add(G);return G}
const TAGB=makeTag(true),TAGS=makeTag(false);
{const pts=[];for(let i=0;i<=12;i++){const u=i/12;pts.push(new THREE.Vector2(mix(0.055,0.13,u*u*0.6+u*0.4),mix(YFUN1,YFUN0,u)))}
  const g=new THREE.LatheGeometry(pts,48);[THREE.BackSide,THREE.FrontSide].forEach((sd,i)=>{const m=new THREE.Mesh(g,glassMat(sd,0x3a4256,0.07,0.82));m.position.x=XI;m.renderOrder=10+i*2;FEE.add(m)});
  const ring=new THREE.Mesh(new THREE.TorusGeometry(0.13,0.006,10,48),new THREE.MeshStandardMaterial({color:0xc9cdd3,metalness:1,roughness:0.22}));ring.rotation.x=Math.PI/2;ring.position.set(XI,YFUN0,0);FEE.add(ring);
  const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.006,0.006,YR-YFUN0+0.02,10),new THREE.MeshStandardMaterial({color:0xc9cdd3,metalness:1,roughness:0.22}));arm.position.set(XI,(YR+YFUN0)/2,-0.05);FEE.add(arm)}
/* the Y: a flat smoked-glass vessel (front and back plates of the Y outline, thin walls along its edges), depth 0.09 */
const FORK=new THREE.Group();scene.add(FORK);
const YP=[[XI-0.15,YIN],[XI-0.15,YINB],[XD-WWID,YSPLIT],[XD-WWID,YEXITW],[XD,YEXITW],[XD,YSPLIT],[XD+DIVW,YSPLIT],[XD+DIVW,YNK],[XD+DIVW+NSLX,YEXITN],
  [XD+DIVW+NWID+NSLX,YEXITN],[XD+DIVW+NWID,YNK],[XD+DIVW+NWID,YSPLIT],[XI+0.15,YINB],[XI+0.15,YIN]];
{const shp=new THREE.Shape(YP.map(p=>new THREE.Vector2(p[0],p[1])));const pg=new THREE.ShapeGeometry(shp);const FD=0.09;
  [FD/2,-FD/2].forEach(z=>{[THREE.BackSide,THREE.FrontSide].forEach((sd,i)=>{const m=new THREE.Mesh(pg,glassMat(sd,0x55648a,0.27,0.82));m.position.z=z;m.renderOrder=10+i*2;FORK.add(m)})});
  const walls=[];const open=new Set([3,8,13]);/* the two exits and the inlet top are open */
  for(let i=0;i<YP.length;i++){if(open.has(i))continue;const a=YP[i],b=YP[(i+1)%YP.length];const dx=b[0]-a[0],dy=b[1]-a[1],L=Math.hypot(dx,dy);
    const g=new THREE.BoxGeometry(L+0.012,0.012,FD+0.012);g.rotateZ(Math.atan2(dy,dx));g.translate((a[0]+b[0])/2,(a[1]+b[1])/2,0);walls.push(g)}
  const wg=mergeGeometries(walls);[THREE.BackSide,THREE.FrontSide].forEach((sd,i)=>{const m=new THREE.Mesh(wg,glassMat(sd,0x1e2740,0.7,0.95));m.renderOrder=11+i*2;FORK.add(m)})}

/* =================== THE NVIDIA CHIP (film30's card: media/ez-gpu2.jpg + the site's LED grid) =================== */
const photo=await loadImg('../media/ez-gpu2.jpg');
const CWc=1.834,CDc=1.362,CT=0.05,HOVER=0.045,PX=px=>(px-999)/1000,PZ=py=>(py-744)/1000;
const CHIPTILT=10*D2R,CHS=0.8;const chip=new THREE.Group();chip.position.copy(CHIPP);chip.position.y=(HOVER+(CDc/2)*Math.sin(CHIPTILT))*CHS;chip.rotation.x=CHIPTILT;chip.scale.setScalar(CHS);scene.add(chip);
/* the chip stands on a porcelain wedge, tilted 25 degrees toward the camera, so its dies read in the wide shots */
const WEDGE=(()=>{const h=CDc*Math.sin(CHIPTILT)+HOVER*0.5,d=CDc*Math.cos(CHIPTILT)*0.96;const sh=new THREE.Shape([new THREE.Vector2(d/2,0.0),new THREE.Vector2(-d/2,0),new THREE.Vector2(-d/2,h)]);const g=new THREE.ExtrudeGeometry(sh,{depth:CWc*0.94,bevelEnabled:true,bevelThickness:0.01,bevelSize:0.01,bevelSegments:2});g.translate(0,0,-CWc*0.47);g.rotateY(-Math.PI/2);const m=new THREE.Mesh(g,porcelain());m.position.set(CHIPP.x,0,CHIPP.z);m.scale.setScalar(CHS);scene.add(m);return m})();
{const body=new THREE.Mesh(new RoundedBoxGeometry(CWc+0.002,CT,CDc+0.002,4,0.006),new THREE.MeshPhysicalMaterial({color:0x1a1e26,metalness:0.6,roughness:0.5}));body.position.y=CT/2;chip.add(body)}
const ptex=new THREE.Texture(photo);ptex.colorSpace=THREE.SRGBColorSpace;ptex.anisotropy=ANISO;ptex.repeat.set(1834/2000,1362/1500);ptex.offset.set(82/2000,75/1500);ptex.needsUpdate=true;
const mrTex=(()=>{const W=1024,H=Math.round(1024*1362/1834),c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d',{willReadFrequently:true});
  g.drawImage(photo,82,63,1834,1362,0,0,W,H);const d=g.getImageData(0,0,W,H),a=d.data;
  for(let i=0;i<a.length;i+=4){const r=a[i],gg=a[i+1],b=a[i+2],mx=Math.max(r,gg,b),mn=Math.min(r,gg,b),sat=mx?(mx-mn)/mx:0,lum=(r+gg+b)/3;
    const goldK=cl((r-b-40)/50)*cl((lum-70)/50)*(r>=gg?1:0.3),dieK=(1-goldK)*cl((sat-0.12)/0.2)*cl((lum-80)/60);
    a[i]=0;a[i+1]=Math.round((0.6-0.34*goldK-0.38*dieK)*255);a[i+2]=Math.round((goldK+0.55*dieK)*255);a[i+3]=255}
  g.putImageData(d,0,0);const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.NoColorSpace;t.anisotropy=ANISO;return t})();
{const top=new THREE.Mesh(new THREE.PlaneGeometry(CWc-0.004,CDc-0.004),new THREE.MeshPhysicalMaterial({map:ptex,emissiveMap:ptex,emissive:0xffffff,emissiveIntensity:0.24,roughness:1,metalness:1,roughnessMap:mrTex,metalnessMap:mrTex,clearcoat:0.4,clearcoatRoughness:0.22}));
  top.rotation.x=-Math.PI/2;top.position.y=CT+0.0006;chip.add(top)}
{const a=shadowPlane(CWc*0.99*CHS,CDc*0.9*CHS,7,0.42),b=shadowPlane(CWc*1.03*CHS,CDc*1.0*CHS,34,0.22);a.position.set(CHIPP.x,0.002,CHIPP.z);b.position.set(CHIPP.x,0.0015,CHIPP.z+0.04);scene.add(a,b);chip.userData.sh=[a,b,WEDGE]}
const F5={0:"01110100011000110001100011000101110",1:"00100011000010000100001000010001110",2:"01110100010000100010001000100011111",3:"11110000010000101110000010000111110",
  4:"00010001100101010010111110001000010",5:"11111100001111000001000011000101110",6:"00110010001000011110100011000101110",7:"11111000010001000100010000100001000",
  8:"01110100011000101110100011000101110",9:"01110100011000101111000010001001100"};
const PANELS=[{x:478,u:['DAYS','HRS']},{x:1078,u:['MIN','SEC']}],PY=628,P=17.2,CSZ=13.6,TOP=CT+0.0012,LEDY=TOP+0.0046;
const blkMat=new THREE.MeshPhysicalMaterial({color:0x0d0f13,metalness:0.1,roughness:0.42,clearcoat:0.5,clearcoatRoughness:0.12,envMapIntensity:0.5});
const CELLS=[],LABS=[];
PANELS.forEach(pn=>{for(let q=0;q<2;q++){const gx=pn.x+19+q*(12*P+30),bw=10*P+CSZ+14,bh=6*P+CSZ+14;
  const b=new THREE.Mesh(new RoundedBoxGeometry(bw/1000,0.0036,bh/1000,2,0.0016),blkMat);b.position.set(PX(gx-7+bw/2),TOP+0.0018,PZ(PY+14+bh/2));chip.add(b);
  for(let dg=0;dg<2;dg++)for(let r=0;r<7;r++)for(let c=0;c<5;c++)CELLS.push({x:PX(gx+(dg*6+c)*P+CSZ/2),z:PZ(PY+21+r*P+CSZ/2),dig:CELLS.length/35|0,k:r*5+c});
  LABS.push({x:gx+5*P+CSZ/2,t:pn.u[q]})}});
const COLONS=[];PANELS.forEach(pn=>{const cx=pn.x+19+(10*P+CSZ+12*P+30)/2;[2,4].forEach(rr=>COLONS.push({x:PX(cx),z:PZ(PY+21+rr*P+CSZ/2)}))});
const LEDON=LEDC==='red'?0xff3b30:0xffcf3d,LEDGLOW=LEDC==='red'?'#ff4136':'#ffc72c';
const cellGeo=new RoundedBoxGeometry(CSZ/1000,0.0016,CSZ/1000,2,0.0007);
const onMat=new THREE.MeshBasicMaterial({color:LEDON,toneMapped:false}),offMat=new THREE.MeshStandardMaterial({color:0x22252c,roughness:0.55,metalness:0,envMapIntensity:0.3});
const onI=new THREE.InstancedMesh(cellGeo,onMat,CELLS.length),offI=new THREE.InstancedMesh(cellGeo,offMat,CELLS.length);chip.add(onI,offI);
{const colI=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.0048,0.0048,0.0016,20),onMat,COLONS.length),o=new THREE.Object3D();
  COLONS.forEach((c,i)=>{o.position.set(c.x,LEDY,c.z);o.updateMatrix();colI.setMatrixAt(i,o.matrix)});chip.add(colI)}
{const X0=400,X1=1700,W=2048,H=160,sx=W/(X1-X0);const t=cvTex(W,H,g=>{g.font='700 '+Math.round(46*sx)+'px GM';g.textAlign='center';g.textBaseline='middle';g.lineJoin='round';g.letterSpacing=Math.round(6*sx)+'px';
    LABS.forEach(L=>{const x=(L.x-X0)*sx;g.strokeStyle='#0b0b0d';g.lineWidth=Math.round(9*sx);g.strokeText(L.t,x,H/2);g.fillStyle='#f2efe6';g.fillText(L.t,x,H/2)})});
  const m=new THREE.Mesh(new THREE.PlaneGeometry((X1-X0)/1000,(X1-X0)/1000*H/W),new THREE.MeshBasicMaterial({map:t,transparent:true,toneMapped:false,depthWrite:false}));
  m.rotation.x=-Math.PI/2;m.position.set(PX((X0+X1)/2),TOP+0.0008,PZ(PY+176));chip.add(m)}
const GLX0=400,GLY0=600,GLW=1300,GLH=200,GS=0.5;
const glowT=cvTex(GLW*GS,GLH*GS,()=>{});const glowMat=new THREE.MeshBasicMaterial({map:glowT,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0.5,toneMapped:false});
{const m=new THREE.Mesh(new THREE.PlaneGeometry(GLW/1000,GLH/1000),glowMat);m.rotation.x=-Math.PI/2;m.position.set(PX(GLX0+GLW/2),TOP+0.006,PZ(GLY0+GLH/2));chip.add(m)}
const dm=new THREE.Object3D();let ledKey='';
function setLED(sec){sec=Math.max(0,Math.floor(sec));const v=[Math.min(99,Math.floor(sec/86400)),Math.floor(sec%86400/3600),Math.floor(sec%3600/60),sec%60];
  const digs=v.flatMap(n=>{const s=String(n).padStart(2,'0');return [+s[0],+s[1]]}),k=digs.join('');if(k===ledKey)return k;ledKey=k;
  const g=glowT.userData.g;g.clearRect(0,0,GLW*GS,GLH*GS);g.filter='blur(7px)';g.fillStyle=LEDGLOW;let a=0,b=0;
  CELLS.forEach(c=>{const on=F5[digs[c.dig]][c.k]==='1';dm.position.set(c.x,LEDY,c.z);dm.updateMatrix();
    if(on){onI.setMatrixAt(a++,dm.matrix);const px=(c.x*1000+999-GLX0)*GS,pz=(c.z*1000+744-GLY0)*GS;g.fillRect(px-CSZ*GS/2-1,pz-CSZ*GS/2-1,CSZ*GS+2,CSZ*GS+2)}else offI.setMatrixAt(b++,dm.matrix)});
  COLONS.forEach(c=>{const px=(c.x*1000+999-GLX0)*GS,pz=(c.z*1000+744-GLY0)*GS;g.beginPath();g.arc(px,pz,6*GS,0,7);g.fill()});g.filter='none';
  onI.count=a;offI.count=b;onI.instanceMatrix.needsUpdate=offI.instanceMatrix.needsUpdate=true;glowT.needsUpdate=true;return k}
const ledAt=t=>{const s=shotOf(t);if(s===1)return D0;if(t>=T.b8)return D0;return D0+Math.ceil(T.b8-t)};
PIC.led=[];for(let k=Math.ceil(T.b7);k<T.b8;k++)PIC.led.push(k+(T.b8-Math.floor(T.b8)));   /* the LED steps in B7 (sound: a click per second) */

/* =================== THE ROUND CARD (porcelain; front = the calls, back = the real move) =================== */
const CARD=new THREE.Group();CARD.position.copy(CARDP);scene.add(CARD);
const CPX=1600;                                                         /* canvas px per unit */
let filmImg=null;if(FRONT==='film'){try{filmImg=await loadImg('__site3d/r'+SHOW.n+'.jpg')}catch(e){fail('front=film needs TEX=dir with r'+SHOW.n+'.jpg')}}
const cardFront=cvTex(Math.round(CW*CPX),Math.round(CH*CPX),(g,c)=>{const W=c.width,H=c.height;g.fillStyle='#fbfaf7';g.fillRect(0,0,W,H);
  g.strokeStyle='rgba(16,26,58,.35)';g.lineWidth=4;g.beginPath();g.roundRect(18,18,W-36,H-36,26);g.stroke();
  F(g,600,100,'GM');g.letterSpacing='2px';g.fillStyle=INK2;g.textBaseline='alphabetic';const hd='ROUND '+SHOW.n+' · '+SHOW.co.toUpperCase();let hs=100;while(g.measureText(hd).width>W-152&&hs>60){hs-=4;F(g,600,hs,'GM')}g.fillText(hd,76,160);
  let y0=250;if(filmImg){const iw=W-152,ih=Math.round(iw*0.5);g.save();g.beginPath();g.roundRect(76,196,iw,ih,16);g.clip();const k=Math.max(iw/filmImg.width,ih/filmImg.height);
    g.drawImage(filmImg,76+(iw-filmImg.width*k)/2,196+(ih-filmImg.height*k)/2,filmImg.width*k,filmImg.height*k);g.restore();y0=196+ih+30}
  g.fillStyle='rgba(16,26,58,.16)';g.fillRect(76,y0-40,W-152,3);
  const rh=filmImg?(H-y0-60)/4:(H-y0-70)/4;
  CALLS.forEach((c,i)=>{const y=y0+i*rh,M=MODELS[c.m];const ts=filmImg?110:140;if(MARKS)tilePath(g,M,76,y+(rh-ts)/2,ts);
    F(g,650,filmImg?100:132);g.letterSpacing='0px';g.fillStyle=INK;g.textBaseline='middle';g.fillText(c.name,76+(MARKS?ts+36:0),y+rh/2+4);
    F(g,650,filmImg?100:132,'GM');g.letterSpacing='0px';const txt=c.has?c.mag:'NO CALL';const tw=g.measureText(txt).width;g.fillText(txt,W-76-tw,y+rh/2+4);
    if(c.has){const s=filmImg?70:92;tri(g,W-76-tw-s-20,y+rh/2-s*0.44,s,c.dir==='UP',c.dir==='UP'?'#1fcf6b':'#ff4136')}
    if(i<3){g.fillStyle='rgba(16,26,58,.10)';g.fillRect(76,y+rh-1,W-152,2)}})});
const cardBack=cvTex(Math.round(CW*CPX),Math.round(CH*CPX),(g,c)=>{const W=c.width,H=c.height;g.fillStyle='#fbfaf7';g.fillRect(0,0,W,H);
  g.strokeStyle='rgba(16,26,58,.35)';g.lineWidth=4;g.beginPath();g.roundRect(18,18,W-36,H-36,26);g.stroke();
  F(g,600,112,'GM');g.letterSpacing='6px';g.fillStyle=INK2;g.textBaseline='alphabetic';g.fillText('REAL MOVE',76,160);
  F(g,600,300,'G');g.letterSpacing='-6px';g.fillStyle=INK;const mw=g.measureText(OUTMAG).width;const s=230;tri(g,76,262,s,SHOWUP,SHOWUP?'#1fcf6b':'#ff4136');g.fillStyle=INK;g.fillText(OUTMAG,76+s+40,480);
  const y0=600,rh=(H-y0-60)/4;g.fillStyle='rgba(16,26,58,.16)';g.fillRect(76,y0-24,W-152,3);
  CALLS.forEach((c,i)=>{const y=y0+i*rh,dim=!c.ok,a=dim?0.45:1;g.globalAlpha=a;const M=MODELS[c.m];const ts=120;
    if(c.win){g.globalAlpha=1;g.fillStyle='#ffc72c';g.fillRect(40,y+14,16,rh-28)}
    if(MARKS)tilePath(g,M,76,y+(rh-ts)/2,ts);F(g,650,112);g.letterSpacing='0px';g.fillStyle=INK;g.textBaseline='middle';g.fillText(c.name,76+(MARKS?ts+30:0),y+rh/2+3);
    if(c.win){F(g,600,72,'GM');g.letterSpacing='4px';const nw=(()=>{F(g,650,112);return g.measureText(c.name).width})();F(g,600,72,'GM');g.fillStyle=INK;g.fillText('WINS',76+(MARKS?ts+30:0)+nw+28,y+rh/2+3)}
    F(g,650,112,'GM');g.letterSpacing='0px';const txt=c.has?c.mag:'NO CALL';const tw=g.measureText(txt).width;g.fillStyle=INK;g.fillText(txt,W-76-tw,y+rh/2+3);
    if(c.has){const ss=66;tri(g,W-76-tw-ss-18,y+rh/2-ss*0.44,ss,c.dir==='UP',c.dir==='UP'?'#1fcf6b':'#ff4136')}g.globalAlpha=1})});
{const b=new THREE.Mesh(new RoundedBoxGeometry(CW,CH,0.036,3,0.016),porcelain(0xfbfaf7));b.position.y=CH/2;CARD.userData.body=b;
  const piv=new THREE.Group();piv.position.y=0;CARD.add(piv);piv.add(b);
  const f=new THREE.Mesh(new THREE.PlaneGeometry(CW-0.012,CH-0.012),new THREE.MeshStandardMaterial({map:cardFront,roughness:0.5,metalness:0}));f.position.set(0,CH/2,0.018+0.0008);piv.add(f);
  const k=new THREE.Mesh(new THREE.PlaneGeometry(CW-0.012,CH-0.012),new THREE.MeshStandardMaterial({map:cardBack,roughness:0.5,metalness:0}));k.position.set(0,CH/2,-0.018-0.0008);k.rotation.y=Math.PI;piv.add(k);
  CARD.userData.piv=piv;shadows(CARD,CW,0.16,0,0,1.25)}

/* =================== THE LEADERBOARD STACK, THE FROSTED SLEEVE, THE DIRECTION TILES =================== */
const STACK=new THREE.Group();STACK.position.copy(STACKP);scene.add(STACK);
const SPX=1400;
function slabTex(i,named){const L=LADDER[i],M=MODELS[L.m];return cvTex(Math.round(SW*SPX),Math.round(SHh*SPX),(g,c)=>{const W=c.width,H=c.height;
  if(named){g.fillStyle='#fbfaf7';g.fillRect(0,0,W,H)}else g.clearRect(0,0,W,H);
  g.textBaseline='middle';F(g,600,120,'GM');g.letterSpacing='2px';g.fillStyle=INK;
  F(g,600,150,'GM');if(named){g.fillText('#'+(i+1),66,H/2+6);if(MARKS)tilePath(g,M,300,(H-168)/2,168);F(g,650,160);g.letterSpacing='0px';g.fillText(M.name,300+(MARKS?204:0),H/2+8);
    F(g,650,190,'GM');g.letterSpacing='0px';const w=String(L.won);const tw=g.measureText(w).width;g.fillText(w,W-120-tw,H/2+10)}
  else{F(g,650,190,'GM');g.fillText('#'+(i+1),66,H/2+10)}})}
const SLABS=LADDER.map((L,i)=>{const G=new THREE.Group();STACK.add(G);const b=new THREE.Mesh(new RoundedBoxGeometry(SW,SHh,SD,3,0.012),porcelain(0xfbfaf7));G.add(b);
  const fn=new THREE.Mesh(new THREE.PlaneGeometry(SW-0.01,SHh-0.01),new THREE.MeshStandardMaterial({map:slabTex(i,true),roughness:0.5,metalness:0,transparent:true}));fn.position.z=SD/2+0.0008;G.add(fn);
  const fr=new THREE.Mesh(new THREE.PlaneGeometry(SW-0.01,SHh-0.01),new THREE.MeshStandardMaterial({map:slabTex(i,false),roughness:0.5,metalness:0,transparent:true,opacity:0,depthWrite:false}));fr.position.z=SD/2+0.0012;G.add(fr);
  let bar=null;if(i===0){bar=new THREE.Mesh(new RoundedBoxGeometry(0.028,SHh-0.02,0.012,2,0.004),new THREE.MeshStandardMaterial({color:0xffc72c,roughness:0.4,emissive:0xffc72c,emissiveIntensity:0.3}));bar.position.set(-SW/2+0.03,0,SD/2+0.004);G.add(bar)}
  return {G,fn,fr,bar}});
/* WINS column header on the top slab's top face (read at the elevation) */
const SLEEVE=new THREE.Group();STACK.add(SLEEVE);
const SLW=SW+0.12,SLD=SD+0.12,SLH=4*SHh+3*SG+0.07;
{const frost=(sd)=>{const m=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:0.55,metalness:0,transparent:true,opacity:0.6,side:sd,depthWrite:false,envMapIntensity:0.6});return m};
  const parts=[[SLW,SLH,0.012,0,SLH/2,SLD/2],[SLW,SLH,0.012,0,SLH/2,-SLD/2],[0.012,SLH,SLD,-SLW/2,SLH/2,0],[0.012,SLH,SLD,SLW/2,SLH/2,0]].map(([w,h,d,x,y,z])=>{const g=new RoundedBoxGeometry(w,h,d,2,0.005);g.translate(x,y,z);return g});
  const g=mergeGeometries(parts);[THREE.BackSide,THREE.FrontSide].forEach((sd,i)=>{const m=new THREE.Mesh(g,frost(sd));m.renderOrder=10+i*2;SLEEVE.add(m)});
  const eg=new THREE.EdgesGeometry(new THREE.BoxGeometry(SLW,SLH,SLD));const e=new THREE.LineSegments(eg,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:0.9}));e.position.y=SLH/2;SLEEVE.add(e)}
const DIRT=[true,false].map(up=>{const G=new THREE.Group();STACK.add(G);const b=new THREE.Mesh(new RoundedBoxGeometry(0.32,0.32,0.05,3,0.014),porcelain(0xfbfaf7));G.add(b);
  const t=cvTex(512,512,g=>{tri(g,96,110,320,up,up?'#1fcf6b':'#ff4136')});const f=new THREE.Mesh(new THREE.PlaneGeometry(0.31,0.31),new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:0.45}));f.position.z=0.0262;G.add(f);return G});
const stackSh=shadows(STACK,SW+0.14,SD+0.14,0,0,1.0);

/* =================== THE PAYOFF SET (the same tray and heap, a navy $EZ tile behind) =================== */
const PAY=new THREE.Group();PAY.position.copy(PAYP);scene.add(PAY);
const PTRAY=makeTray();PAY.add(PTRAY.G);shadows(PAY,TRW,TRD,0,0);
const PTILE=new THREE.Group();PTILE.position.set(0.50,0,-0.62);PAY.add(PTILE);
const tileGlow={value:0};
{const b=new THREE.Mesh(new RoundedBoxGeometry(0.5,0.5,0.07,3,0.018),navyMat());b.position.y=0.25+0.16;PTILE.add(b);
  const st=new THREE.Mesh(new RoundedBoxGeometry(0.16,0.16,0.16,2,0.01),navyMat());st.position.y=0.08;PTILE.add(st);
  const t=cvTex(620,620,g=>{F(g,800,330,'MS','75%');g.textBaseline='alphabetic';const parts=[['$','#ffc72c'],['E','#1fcf6b'],['Z','#ff4136']];
    const w=parts.reduce((s,p)=>s+g.measureText(p[0]).width,0)+12;let x=(620-w)/2;parts.forEach(p=>{g.fillStyle=p[1];g.fillText(p[0],x,430);x+=g.measureText(p[0]).width+6})});
  const mm=new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:0.45,emissive:0xffffff,emissiveMap:t,emissiveIntensity:0.1});PTILE.userData.mm=mm;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5),mm);m.position.set(0,0.41,0.0355);PTILE.add(m);shadows(PTILE,0.5,0.12,0,0,0.7);
  const ht=cvTex(256,256,g=>{const gr=g.createRadialGradient(128,128,20,128,128,128);gr.addColorStop(0,'rgba(255,214,110,1)');gr.addColorStop(0.45,'rgba(255,199,44,.45)');gr.addColorStop(1,'rgba(255,199,44,0)');g.fillStyle=gr;g.fillRect(0,0,256,256)});
  const halo=new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.1),new THREE.MeshBasicMaterial({map:ht,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false,opacity:0,toneMapped:false}));halo.position.set(0,0.41,-0.06);halo.renderOrder=5;PTILE.add(halo);PTILE.userData.halo=halo}

/* =================== CAMERA: long lens, lens shift (verticals straight), pk = how much of the elevation is real pitch =================== */
const cam=new THREE.PerspectiveCamera(22,1,0.05,80);const V3=new THREE.Vector3();
function place(o,half){const el=o.el*D2R,az=o.az*D2R,[tx,ty,tz]=o.tgt;cam.fov=o.fov;cam.aspect=half?0.5:1;
  cam.position.set(tx+o.dist*Math.cos(el)*Math.sin(az),ty+o.dist*Math.sin(el),tz+o.dist*Math.cos(el)*Math.cos(az));
  const pitch=-el*(o.pk||0);const dx=-Math.sin(az)*Math.cos(pitch),dy=Math.sin(pitch),dz=-Math.cos(az)*Math.cos(pitch);
  cam.up.set(0,1,0);cam.lookAt(cam.position.x+dx,cam.position.y+dy,cam.position.z+dz);cam.clearViewOffset();cam.updateProjectionMatrix();cam.updateMatrixWorld();
  const W=half?540:1080;V3.set(tx,ty,tz).project(cam);const px=(V3.x+1)/2*W,py=(1-V3.y)/2*1080;
  cam.setViewOffset(W,1080,px-o.sx,py-o.sy,W,1080);cam.updateProjectionMatrix();cam.updateMatrixWorld()}
const lerpCam=(a,b,u)=>{const o={};for(const k of ['dist','el','az','fov','sx','sy','pk'])o[k]=mix(a[k]||0,b[k]||0,u);o.tgt=a.tgt.map((v,i)=>mix(v,b.tgt[i],u));return o};
const camKey=o=>[...o.tgt,o.dist,o.el,o.az,o.fov,o.sx,o.sy,o.pk||0].map(r4).join(',');
const drift=(o,rate,dt)=>Object.assign({},o,{dist:o.dist*(1-rate*dt)});
/* poses (tuned against the style frames) */
const CAM=Q.get('cam')?JSON.parse(Q.get('cam')):{};
const P0=Object.assign({tgt:[POTX,0.70,0],dist:7.5,el:11,az:20,fov:22,sx:900,sy:368,pk:0},CAM.P0||{});
const A2=Object.assign({tgt:[XI,YR-0.16,0],dist:4.95,el:7,az:-10,fov:18,sx:540,sy:430,pk:0},CAM.A2||{});
const B2H=Object.assign({tgt:[XI,1.72,0],dist:8.2,el:4,az:0,fov:20,sx:805,sy:200,pk:0},CAM.B2H||{});
const C3=Object.assign({tgt:[CARDP.x,CH/2,0],dist:5.05,el:5,az:-8,fov:22,sx:540,sy:452,pk:0.3},CAM.C3||{});
const S4a=Object.assign({tgt:[STACKP.x,0.42,0],dist:6.6,el:18,az:-12,fov:22,sx:540,sy:500,pk:0.35},CAM.S4a||{});
const S4b=Object.assign({tgt:[STACKP.x,0.42,0],dist:6.8,el:16,az:0,fov:22,sx:540,sy:510,pk:0.35},CAM.S4b||{});
const P5=Object.assign({tgt:[0.05,0.55,0.1],dist:9.3,el:8,az:14,fov:26,sx:670,sy:530,pk:0},CAM.P5||{});
const H6=Object.assign({tgt:[PAYP.x,0.32,-0.2],dist:8.9,el:24,az:0,fov:22,sx:270,sy:528,pk:0.35},CAM.H6||{});
const M7=Object.assign({tgt:[CHIPP.x+0.15,0.2,-0.35],dist:5.2,el:24,az:6,fov:22,sx:540,sy:520,pk:0.5},CAM.M7||{});
chip.updateMatrixWorld(true);const LEDW=new THREE.Vector3(PX(1010),CT,PZ(707)).applyMatrix4(chip.matrixWorld);
const C7=Object.assign({tgt:[LEDW.x,LEDW.y,LEDW.z],dist:3.45,el:56,az:2,fov:22,sx:585,sy:404,pk:1},CAM.C7||{});
window.R2_CAMS={P0,A2,B2H,C3,S4a,S4b,P5,H6,M7,C7};
/* B1 push-in: 3 %/s, from rest (so the loop seam has no jump); B7 pull-back arrives at P0 at rest on the last frame */
const b1Cam=t=>{const s=t-0.6*(1-Math.exp(-t/0.6));return Object.assign({},P0,{dist:P0.dist*(1-0.03*s)})};

/* =================== THE STATE (a pure function of t) =================== */
const vis=(o,v)=>{o.visible=v};
const QA=new THREE.Quaternion(),QB=new THREE.Quaternion();const PV=new THREE.Vector3(),PW=new THREE.Vector3(),PU=new THREE.Vector3();
let SPLIT=null,camNow=null;
function setSets(s){vis(POTW,s===1||s===2||s===5||s===7);vis(PLINTH,s===1||s===2||s===5||s===7);vis(TRAY.G,s===1||s===5||s===7);vis(chip,s===1||s===5||s===7);chip.userData.sh.forEach(m=>vis(m,s===1||s===5||s===7));
  vis(DISH,s===2);vis(FEE,s===2);vis(FORK,s===2);vis(CARD,s===3);vis(STACK,s===4);vis(PAY,s===6)}
/* falling into the pot from the wide arm (B1, the refill): from above the frame to the slot */
function fallCoin(k,tt,slot,spawn){/* tt = time since start, F = duration */const u=cl(tt/B1F);const p=potSlot(slot).clone();
  const R0=rng(1000+k);const sx=POTX-0.5+0.5+(R0()-0.5)*0.12,sz=(R0()-0.5)*0.12;const y0=1.95;
  PV.set(mix(sx,p.x,EIO(u)),mix(y0,p.y,0.45*u+0.55*u*u),mix(sz,p.z,EIO(u)));QA.copy(tumble(k,tt));const qs=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,0,0));
  QB.copy(slot.q).premultiply(POTI.getWorldQuaternion(qs));QA.slerp(QB,sm(lin(u,0.82,1)));putCoin(PV,QA)}
function streamPot(t,cycle){/* B1 (cycle time t) and the refill (t-24): coins 0.. landing in POT_B1 */
  for(let k=0;k<POT_B1.length;k++){const s0=b1Start(k);if(s0>t)break;const tt=t-s0;if(tt>=B1F){CV.copy(potSlot(POT_B1[k]));putCoin(CV.clone(),QB.copy(POT_B1[k].q))}else fallCoin(k,tt,POT_B1[k])}}
/* the fork path of stream coin i at time t (B2) */
const FA=0.26,FB=0.16,FCW=0.10,FCN0=0.03,FCN1=0.19,FDW=0.36,FDN=0.12;
function forkCoin(i,t,potIdx,dishIdx){const s0=stSpawn(i);const pre=i<4?0.34:0;const tt=t-s0;if(tt<0)return;const R0=rng(2000+i);
  if(i<4&&tt<pre){/* the shed: out of the tag, one flip, into the gate, through it */const buy=i%2===0;const tx=XI+(buy?-TAGX+0.16:TAGX-0.16);
    if(tt<0.22){const u=tt/0.22,e=EOUT(u);const up=sm(Math.min(1,u*2.2));PV.set(mix(tx,XI,EIO(lin(u,0.3,1))),YR-0.11+0.29*up-0.17*sm(lin(u,0.55,1)),mix(-0.045,0,e));
      QA.copy(QFACE).premultiply(QB.setFromAxisAngle(new THREE.Vector3(1,0,0),2*Math.PI*EIO(u)));putCoin(PV,QA,1);return}
    const u=(tt-0.22)/0.12;PV.set(XI,mix(YFUN0+0.02,YFUN1,u*u),0);QA.copy(QFACE).premultiply(QB.setFromAxisAngle(new THREE.Vector3(0,0,1),u*2));putCoin(PV,QA,1);return}
  let x=tt-pre;const pot=toPot(i);const jx=(R0()-0.5)*0.12;
  const wideX=XD-WWID/2+(R0()-0.5)*(WWID-2*COIN_R-0.04);
  const spin=QB.setFromAxisAngle(new THREE.Vector3(0,0,1),-(x*2.6)/COIN_R*0.25);
  if(x<FA){const u=x/FA;PV.set(XI+jx*Math.min(1,u*1.6),mix(YFUN1,YIN,0.6*u+0.4*u*u),0);QA.copy(QFACE).premultiply(spin);putCoin(PV,QA);return}x-=FA;
  const xc=pot?wideX:XNC0;
  if(x<FB){const u=x/FB;PV.set(mix(XI+jx,xc,sm(u)),mix(YIN,YSPLIT,u),0);QA.copy(QFACE).premultiply(spin);putCoin(PV,QA);return}x-=FB;
  if(pot){if(x<FCW){const u=x/FCW;PV.set(xc,mix(YSPLIT,YEXITW,u),0);QA.copy(QFACE).premultiply(spin);putCoin(PV,QA);return}x-=FCW;
    const sl=POT_B2[N2+potIdx];if(!sl)return;const p=potSlot(sl);
    if(x<FDW){const u=x/FDW;PV.set(mix(xc,p.x,EIO(u)),mix(YEXITW,p.y,u*u),mix(0,p.z,EIO(u)));QA.copy(QFACE).premultiply(spin);QA.slerp(sl.q,sm(lin(u,0.7,1)));putCoin(PV,QA);return}
    putCoin(PV.copy(p),sl.q);return}
  if(x<FCN0){const u=x/FCN0;PV.set(XNC0,mix(YSPLIT,YNK,u),0);QA.copy(QFACE).premultiply(spin);putCoin(PV,QA);return}x-=FCN0;
  if(x<FCN1){const u=x/FCN1;PV.set(mix(XNC0,XNC1,u),mix(YNK,YEXITN,u),0);QA.copy(QFACE).premultiply(spin);putCoin(PV,QA);return}x-=FCN1;
  const sl=DISH_SL[ND2+dishIdx];if(!sl)return;dishSlot(sl,PU);
  if(x<FDN){const u=x/FDN;PV.set(mix(XNC1,PU.x,EIO(u)),mix(YEXITN,PU.y,u*u),mix(0,PU.z,EIO(u)));QA.copy(QFACE).premultiply(spin);QA.slerp(sl.q,sm(lin(u,0.6,1)));putCoin(PV,QA);return}
  putCoin(PV.copy(PU),sl.q)}
const STL=(()=>{/* landing times of the stream (sound + QA) */let pi=0,di=0;const out=[];for(let i=0;i<STN;i++){const pot=toPot(i);const s=stSpawn(i)+(i<4?0.34:0)+FA+FB+(pot?FCW+FDW:FCN0+FCN1+FDN);out.push({i,pot,land:s,idx:pot?pi++:di++})}return out})();
STL.forEach(o=>{if(o.land<6.5)(o.pot?PIC.b2pot:PIC.b2dish).push([o.land,o.pot?(N2+o.idx)/(N2+60):0])});
for(let k=0;k<POT_B1.length;k++){const l=b1Land(k);if(l>=0&&l<3)PIC.b1.push(l);const l2=l+24;if(l2>=T.refill&&l2<24)PIC.b1.push(l2)}
/* the pour (B5): each coin of POT_B5 rides the tipping pot, slides to the lip, flies onto TRAY_SL in release order */
const TIPA=38*D2R;const tipAt=t=>t<T.tip1?TIPA*EA(lin(t,T.hit,T.tip1)):TIPA*(1-EIO(lin(t,T.tip1,T.right1)));
const POUR=(()=>{const n=POT_B5.length,ymax=Math.max(...POT_B5.map(s=>s.p.y));const R0=rng(77);
  const ord=POT_B5.map((s,k)=>({k,score:(1-s.p.y/ymax)*0.75+(s.p.x+0.46)/0.92*0.25+R0()*0.05})).sort((a,b)=>a.score-b.score);
  const rel=new Array(n),tray=new Array(n);ord.forEach((o,r)=>{rel[o.k]=T.pour0+0.30*r/n+0.01*R0();tray[o.k]=r});return {rel,tray}})();
const SLA=0.07,FLY=0.27;
for(let k=0;k<POT_B5.length;k+=12)PIC.pourLand.push(POUR.rel[k]+SLA+FLY);
const potMatAt=(t)=>{POTW.rotation.z=tipAt(t);POTW.updateMatrixWorld(true);return POTI.matrixWorld.clone()};
function pourCoins(t){const Mt=potMatAt(t);const qPot=new THREE.Quaternion().setFromRotationMatrix(Mt);
  for(let k=0;k<POT_B5.length;k++){const s=POT_B5[k],r=POUR.rel[k];const ts=TRAY_SL[POUR.tray[k]];
    if(t<r){PV.set(s.p.x,WALL+s.p.y,s.p.z).applyMatrix4(Mt);QA.copy(s.q).premultiply(qPot);putCoin(PV,QA);continue}
    const Mr=potMatAt(Math.min(t,r+SLA));const lipL=PU.set(-0.47,1.0,s.p.z*0.8).applyMatrix4(Mr).clone();
    if(t<r+SLA){const u=(t-r)/SLA;PV.set(mix(s.p.x,-0.47,u*u),mix(WALL+s.p.y,1.0,u),mix(s.p.z,s.p.z*0.8,u)).applyMatrix4(Mr);const qr=new THREE.Quaternion().setFromRotationMatrix(Mr);QA.copy(s.q).premultiply(qr);putCoin(PV,QA);continue}
    traySlot(TRAY,ts,PW);const u=cl((t-r-SLA)/FLY);if(u<1){const e=u;PV.set(mix(lipL.x,PW.x,e),mix(lipL.y,PW.y,e)+0.18*Math.sin(Math.PI*e)*(1-e)-0.0*e,mix(lipL.z,PW.z,e));
      QA.copy(tumble(k,t-r));QA.slerp(ts.q,sm(lin(u,0.75,1)));putCoin(PV,QA);continue}
    putCoin(PW,ts.q)}
  potMatAt(t)}
function trayHeap(tr,n,s=1){for(let k=0;k<n;k++){traySlot(tr,TRAY_SL[k],PW);QA.copy(TRAY_SL[k].q).premultiply(tr.body.getWorldQuaternion(QB));putCoin(PW,QA,s)}}
/* the payoff: left, the top layer (the profit) arcs into the $EZ tile; right, the tray tips back and the heap slides off its rear edge */
const PROF=(()=>{const idx=TRAY_SL.map((s,k)=>k).sort((a,b)=>TRAY_SL[b].p.y-TRAY_SL[a].p.y).slice(0,26);return new Set(idx)})();
const profOrder=[...PROF];
function payState(t,left){PTRAY.pivot.position.set(0,0,-TRD/2);PTRAY.body.position.set(0,0,TRD/2);
  const tip=left?0:(-24*D2R)*(t<17.4?EA(lin(t,T.pay0,17.4)):1-EIO(lin(t,17.55,T.pay1)));PTRAY.pivot.rotation.x=tip;PAY.updateMatrixWorld(true);
  const tq=PTRAY.body.getWorldQuaternion(new THREE.Quaternion());
  {const u=lin(t,17.62,17.98),L=left?sm(u)*0.8+0.7*Math.sin(Math.PI*u):0;PTILE.userData.mm.emissiveIntensity=0.1+L;PTILE.userData.halo.material.opacity=0.55*Math.min(1,L);PTILE.userData.halo.visible=L>0.001}
  const tileP=new THREE.Vector3(0.50,0.41,-0.62+0.05).add(PAYP);
  for(let k=0;k<TRAY_SL.length;k++){const ts=TRAY_SL[k];traySlot(PTRAY,ts,PW);
    if(left){if(!PROF.has(k)){QA.copy(ts.q).premultiply(tq);putCoin(PW,QA);continue}
      const r=profOrder.indexOf(k),t0=T.pay0+0.32*r/profOrder.length,u=cl((t-t0)/0.42);if(u<=0){QA.copy(ts.q).premultiply(tq);putCoin(PW,QA);continue}if(u>=1)continue;
      const e=EIO(u);PV.set(mix(PW.x,tileP.x,e),mix(PW.y,tileP.y,e)+0.32*Math.sin(Math.PI*e),mix(PW.z,tileP.z,e));QA.copy(ts.q).slerp(QFACE,e);putCoin(PV,QA,1-sm(lin(u,0.75,1)));continue}
    /* right: slide toward the rear edge once the tip passes 10 degrees, then drop and vanish behind the tray */
    const rk=(ts.p.z+0.3)/0.6,t0=17.18+0.22*(1-rk)+0.06*((k*37)%11)/11,u=cl((t-t0)/0.34);
    if(u<=0){QA.copy(ts.q).premultiply(tq);putCoin(PW,QA);continue}if(u>=1)continue;
    const lp=PU.set(ts.p.x,TRH+ts.p.y,ts.p.z-(ts.p.z+TRD/2+0.06)*Math.min(1,u*1.6)).applyMatrix4(PTRAY.body.matrixWorld);const drop=Math.max(0,u-0.55)/0.45;
    PV.set(lp.x,lp.y-0.5*drop*drop,lp.z-0.1*drop);QA.copy(ts.q).premultiply(tq);putCoin(PV,QA,1-sm(lin(drop,0.3,1)))}
}
PIC.payL=[17.18,17.4,17.62,17.85];PIC.payR=[17.12,17.35,17.6,17.85];
/* the leaderboard stack */
const FAN=[[-0.05,-0.035],[0.045,0.03],[0.06,-0.025],[-0.035,0.04]];
function stackState(t){const sq=EIO(lin(t,11.55,T.lid1)),nm=EOUT(lin(t,T.nm0,T.nm1));
  SLABS.forEach((s,i)=>{const fan=1-sq;s.G.position.set(FAN[i][0]*fan,(3-i)*(SHh+SG)+SHh/2,0);s.G.rotation.y=FAN[i][1]*fan;
    s.fn.material.opacity=1-nm;s.fr.material.opacity=nm});
  /* names out: the named face stays as the slab's base colour; the rank face covers it */
  SLABS.forEach(s=>{s.fn.visible=nm<0.999;s.fr.visible=nm>0.001});
  const ly=(1-EIO(lin(t,T.lid0,T.lid1)))*1.25;SLEEVE.position.y=ly;SLEEVE.visible=t>=T.lid0-0.001;
  /* B4b: #1 lifts out of the sleeve; the two direction tiles rise either side */
  const lu=EA(lin(t,T.b4b,T.lift1));const s0=SLABS[0];s0.G.position.y+=0.42*lu;s0.G.position.z+=0.06*lu;
  const tu=EA(lin(t,T.b4b+0.1,T.lift1+0.05));DIRT.forEach((g,j)=>{const sc=EOUT(lin(tu,0,0.35));g.scale.setScalar(Math.max(sc,0.001));g.position.set((j?1:-1)*(SW/2+0.18),mix(0.17,s0.G.position.y+0.02,tu),0.14);g.visible=tu>0.001;g.rotation.y=(j?-1:1)*0.12})}
const camB4=t=>{const o=lerpCam(S4a,S4b,EIO(lin(t,T.b4,T.b4b)));return o};
/* the state */
function setState(t){NC=0;SPLIT=null;const s=shotOf(t);setSets(s);SWP.amp.value=0;
  POTW.rotation.z=0;POTW.updateMatrixWorld(true);PLINTH.updateMatrixWorld(true);TRAY.G.updateMatrixWorld(true);
  let o=null,led=null;
  if(s===1){o=b1Cam(t);streamPot(t);led=ledAt(t);
    const u=lin(t,0.5,1.7);SWP.amp.value=Math.sin(Math.PI*u)*1.0;SWP.dir.value.w=mix(-0.7,2.4,EIO(u))}
  else if(s===2){if(t<T.b2b)o=drift(A2,0.01,t-T.b2a);else{const u=EA(lin(t,T.b2b,T.crane1));o=lerpCam(drift(A2,0.01,1.5),B2H,u);if(t>T.crane1)o=drift(B2H,0.03,t-T.crane1)}
    /* tags slide in, dock, shed */
    const du=EOUT(lin(t,T.b2a,T.dock));TAGB.position.set(XI-mix(1.7,TAGX,du),YR-0.11,0);TAGS.position.set(XI+mix(1.7,TAGX,du),YR-0.11,0);
    for(let k=0;k<N2;k++)putCoin(PV.copy(potSlot(POT_B2[k])),POT_B2[k].q);
    for(let k=0;k<ND2;k++){dishSlot(DISH_SL[k],PU);putCoin(PU,DISH_SL[k].q)}
    let pi=0,di=0;for(let i=0;i<STN;i++){const p=toPot(i);forkCoin(i,t,pi,di);if(p)pi++;else di++}}
  else if(s===3){o=Object.assign({},C3,{az:C3.az+6*(t-T.b3)});CARD.userData.piv.rotation.y=Math.PI*EA(lin(t,T.flip0,T.flip1))}
  else if(s===4){o=camB4(t);stackState(t)}
  else if(s===5){o=drift(P5,0.03,t-T.hit);pourCoins(t);led=ledAt(t);}
  else if(s===6){SPLIT={t};o=H6}
  else{/* B7 + B8: mid shot -> push into the dies -> hold -> pull back to P0 (at rest on the last frame) */
    if(t<T.push1)o=lerpCam(M7,C7,EA(lin(t,T.b7,T.push1)));else if(t<T.pull0)o=drift(C7,0.015,t-T.push1);
    else{const u=lin(t,T.pull0,DUR-1/FPS);const e=EIO(u);const from=drift(C7,0.015,T.pull0-T.push1);o=lerpCam(from,P0,e);o.pk=mix(from.pk,0,sm(Math.min(1,u*1.6)))}
    led=ledAt(t);if(t<T.trayOut)trayHeap(TRAY,TRAY_SL.length);
    if(t>=T.refill)streamPot(t-24)}
  if(led!=null)setLED(led);
  camNow=o;if(!SPLIT){place(o);endCoins()}
  return o}
function render(t){const o=setState(t);
  if(SPLIT){const W=RES/2;R.setScissorTest(true);
    [[true,0],[false,W]].forEach(([left,x])=>{NC=0;payState(t,left);endCoins();place(H6,true);R.setViewport(x,0,W,RES);R.setScissor(x,0,W,RES);R.render(scene,cam)});
    R.setScissorTest(false);R.setViewport(0,0,RES,RES)}
  else R.render(scene,cam)}

/* =================== SUBFRAMES AND THE PLATE =================== */
function nsAt(t){if(NSQ)return NSQ;const s=shotOf(t);
  if(s===1)return 2;if(s===2)return t<T.crane1?3:2;if(s===3)return (t>=T.flip0-0.02&&t<T.flip1+0.04)?4:1;
  if(s===4)return ((t>=T.lid0&&t<T.lid1+0.04)||(t>=T.b4b&&t<T.lift1+0.08))?2:1;
  if(s===5)return t<T.pour1+0.12?7:2;if(s===6)return (t>=T.pay0&&t<T.pay1+0.06)?3:1;
  return t>=T.refill?2:1}
const acc=new Uint16Array(1080*1080*4);
function plate(t){const s=shotOf(t),ns=nsAt(t),a=SHOTS[s-1],b=SHOTS[s]-1e-4;
  if(ns===1){render(t);og.drawImage(glc,0,0,1080,1080);return ns}
  acc.fill(0);for(let j=0;j<ns;j++){const ts=cl(t+((j+0.5)/ns-0.5)*0.5/FPS,a,b);render(ts);og.drawImage(glc,0,0,1080,1080);const d=og.getImageData(0,0,1080,1080).data;for(let i=0;i<d.length;i++)acc[i]+=d[i]}
  const im=og.createImageData(1080,1080),o=im.data;for(let i=0;i<o.length;i++)o[i]=(acc[i]+(ns>>1))/ns|0;og.putImageData(im,0,0);return ns}
window.R2_NS=f=>nsAt(f/FPS);
window.renderAt=t=>{const f=Math.min(N-1,Math.max(0,Math.round(t*FPS))),tc=f/FPS;plate(tc);if(PASS==='both')C.applyType(tc);return f};
const PLKEY=hash(JSON.stringify([VERSION,DATAKEY,RES,MARKS,FRONT,LEDC,D0,NSQ,FPS,Q.get('cam')||'']));
window.frameName=i=>PASS==='plate'?'p'+String(i).padStart(4,'0')+'-'+PLKEY+'-n'+nsAt(i/FPS):String(i).padStart(4,'0');
/* QA: screen bounds of the visible objects (the reserve zone), the LED digit height, the payoff equality */
window.R2_LED=f=>{setState(f/FPS);const c0=CELLS[0],c6=CELLS[30];chip.updateMatrixWorld(true);const a=new THREE.Vector3(c0.x,LEDY,c0.z-CSZ/2000).applyMatrix4(chip.matrixWorld).project(cam),b=new THREE.Vector3(c6.x,LEDY,c6.z+CSZ/2000).applyMatrix4(chip.matrixWorld).project(cam);return Math.round(Math.abs(a.y-b.y)/2*1080)};
window.R2_CAMAT=f=>{setState(f/FPS);return camNow?camKey(camNow):'split'};
window.R2_PROJ=(f,pts)=>{const o=setState(f/FPS);if(SPLIT)place(H6,true);return pts.map(p=>{V3.set(...p).project(cam);return [Math.round((V3.x+1)/2*(SPLIT?540:1080)),Math.round((1-V3.y)/2*1080)]})};
window.renderAt(0);
window.__ready=true;
}
