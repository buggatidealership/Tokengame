// node measure.js W H URL TAG : screenshots each viewport of the Overview and measures it from the DOM
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const W=+process.argv[2],H=+process.argv[3],URL=process.argv[4],TAG=process.argv[5];
const OUT=__dirname+'/out/'+TAG;fs.mkdirSync(OUT,{recursive:true});
const b=await chromium.launch({proxy:{server:'http://127.0.0.1:46741',bypass:'localhost,127.0.0.1'},args:['--ignore-certificate-errors','--autoplay-policy=no-user-gesture-required']});
const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:1,ignoreHTTPSErrors:true});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto(URL,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
// warm: scroll through once slowly so lazy parts build, then back to top
const SH=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let y=0;y<SH;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(150)}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
const hdr=await p.evaluate(()=>{const h=document.querySelector('header');const cs=getComputedStyle(h);return {h:Math.round(h.getBoundingClientRect().height),pos:cs.position}});
const step=H-(hdr.pos==='sticky'||hdr.pos==='fixed'?hdr.h:0);
const total=await p.evaluate(()=>document.documentElement.scrollHeight);
const res=[];let k=0;
for(let y=0;;y+=step){const yy=Math.min(y,total-H);await p.evaluate(y=>scrollTo(0,y),yy);await p.waitForTimeout(1600);
 const m=await p.evaluate(fs_measure,{});m.y=yy;m.k=k;
 await p.screenshot({path:`${OUT}/s${String(k).padStart(2,'0')}.png`});
 res.push(m);k++;if(yy>=total-H)break}
fs.writeFileSync(`${OUT}/m.json`,JSON.stringify({W,H,URL,hdr,step,total,errs,res},null,1));
console.log(TAG,'screens',k,'total',total,'hdr',JSON.stringify(hdr),'errs',errs.length);await b.close();
function fs_measure(){
 const VW=innerWidth,VH=innerHeight;
 const isect=(a,b)=>({l:Math.max(a.l,b.l),t:Math.max(a.t,b.t),r:Math.min(a.r,b.r),b:Math.min(a.b,b.b)});
 const area=r=>Math.max(0,r.r-r.l)*Math.max(0,r.b-r.t);
 const R=r=>({l:r.left,t:r.top,r:r.right,b:r.bottom});
 const cache=new Map();
 // visible clip region of an element: viewport ∩ every clipping ancestor; null if hidden
 function clipOf(el){if(cache.has(el))return cache.get(el);let res;
  if(!el||el===document.documentElement||el===document.body){res={c:{l:0,t:0,r:VW,b:VH},op:1}}
  else{const par=clipOf(el.parentElement||(el.parentNode&&el.parentNode.host)||document.body);
   if(!par){res=null}else{const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||cs.contentVisibility==='hidden'){res=null}else{
     let op=par.op*(+cs.opacity);let c=par.c;
     const pos=cs.position;if(pos==='fixed')c={l:0,t:0,r:VW,b:VH};
     if((cs.overflowX!=='visible'||cs.overflowY!=='visible'||cs.clipPath!=='none'||cs.clip!=='auto'||cs.contain.includes('paint'))&&!(el instanceof SVGElement&&el.tagName!=='svg')){
       const r=R(el.getBoundingClientRect());c=isect(c,{l:cs.overflowX==='visible'?-1e5:r.l,r:cs.overflowX==='visible'?1e5:r.r,t:cs.overflowY==='visible'?-1e5:r.t,b:cs.overflowY==='visible'?1e5:r.b});
       if(cs.clip!=='auto'&&/rect\(0/.test(cs.clip))c={l:0,t:0,r:0,b:0};
       if(cs.clipPath&&/inset\(50%|circle\(0/.test(cs.clipPath))c={l:0,t:0,r:0,b:0}}
     res=op<0.05?null:{c,op}}}}
  cache.set(el,res);return res}
 const visRect=(el,r)=>{const cl=clipOf(el);if(!cl)return null;const v=isect(R(r||el.getBoundingClientRect()),cl.c);return area(v)>4?v:null};
 const fam=f=>f.split(',')[0].replace(/["']/g,'').trim();
 const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});const pc={};const parse=c=>{if(pc[c]!==undefined)return pc[c];if(!c||c==='none'||c==='transparent'||/^url/.test(c))return pc[c]=null;cx.clearRect(0,0,1,1);cx.fillStyle='rgba(0,0,0,0)';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return pc[c]=d[3]===0?{r:0,g:0,b:0,a:0}:{r:d[0],g:d[1],b:d[2],a:d[3]/255}};
 const hex=c=>'#'+[c.r,c.g,c.b].map(x=>Math.round(x).toString(16).padStart(2,'0')).join('');
 // text
 const tw=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n,words=0,hw=0;const hf={},hc={};const fams={},cols={},texts=[];
 while(n=tw.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const pe=n.parentElement;if(!pe||/^(SCRIPT|STYLE|NOSCRIPT|TITLE)$/.test(pe.tagName))continue;
  if(pe.closest('[aria-hidden="true"]')&&false)continue;
  const rg=document.createRange();rg.selectNodeContents(n);const rs=[...rg.getClientRects()];if(!rs.length)continue;
  let tot=0,vis=0;for(const r of rs){const a=area(R(r));tot+=a;const v=visRect(pe,r);if(v)vis+=area(v)}
  if(!tot||vis/tot<0.15)continue;const frac=Math.min(1,vis/tot);
  const wc=t.split(' ').filter(w=>/[A-Za-z0-9$%]/.test(w)).length;const ww=wc*frac;words+=ww;
  const cs=getComputedStyle(pe);const f=fam(cs.fontFamily);fams[f]=(fams[f]||0)+ww;
  let col=pe instanceof SVGElement?cs.fill:(cs.webkitTextFillColor&&cs.webkitTextFillColor!==cs.color&&!/^rgba\(0, 0, 0, 0\)$/.test(cs.webkitTextFillColor)?cs.webkitTextFillColor:cs.color);
  let ck;if(/rgba\(0, 0, 0, 0\)/.test(cs.webkitTextFillColor)&&cs.backgroundClip==='text'||/rgba\(0, 0, 0, 0\)/.test(cs.webkitTextFillColor)&&getComputedStyle(pe).webkitBackgroundClip==='text')ck='clip-gradient';else{const pc=parse(col);ck=pc?(pc.a<0.05?'clip-gradient':hex(pc)):col}
  cols[ck]=(cols[ck]||0)+ww;
  const inH=!!pe.closest('header.top');let bx=null;for(let e=pe;e&&e!==document.body;e=e.parentElement){const c2=getComputedStyle(e);const bg=parse(c2.backgroundColor);const bc=parseFloat(c2.borderTopWidth)>=1?parse(c2.borderTopColor):null;if((bg&&bg.a>0.5)||(bc&&bc.a>0.3)||c2.backgroundImage!=='none'){bx={cls:(e.className.baseVal!==undefined?e.className.baseVal:e.className).toString().slice(0,30),bg:bg&&bg.a>0.5?hex(bg):'',bd:bc&&bc.a>0.3?hex(bc):'',img:c2.backgroundImage!=='none'};break}}if(inH){hw+=ww;hf[f]=1;hc[ck]=1}const fsz=Math.max(...rs.map(r=>r.height));texts.push({t:t.slice(0,40),fs:Math.round(fsz),f,ck,w:+ww.toFixed(1),y:Math.round(rs[0].top),x:Math.round(rs[0].left),inH,col:ck,bx,wt:cs.fontWeight,it:cs.fontStyle})}
 // cluster colours (distance < 18)
 const ck=Object.keys(cols).filter(c=>c[0]==='#').sort((a,b)=>cols[b]-cols[a]);const cl=[];
 const rgb=h=>[1,3,5].map(i=>parseInt(h.substr(i,2),16));
 for(const c of ck){const v=rgb(c);const g=cl.find(g=>Math.hypot(...g.v.map((x,i)=>x-v[i]))<18);if(g){g.w+=cols[c];g.m.push(c)}else cl.push({c,v,w:cols[c],m:[c]})}
 // motion
 const mv=new Set(),mvd=[];for(const a of document.getAnimations()){if(a.playState!=='running')continue;const ef=a.effect;if(!ef||!ef.target)continue;const el=ef.target;const v=visRect(el);if(!v||area(v)<16)continue;
   const tm=ef.getTiming?ef.getTiming():{};const key=el;if(!mv.has(key)){mv.add(key);mvd.push({n:a.animationName||a.transitionProperty||a.constructor.name,cls:(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className||el.tagName).toString().slice(0,40),pe:ef.pseudoElement||'',inf:tm.iterations===Infinity})}}
 const vids=[...document.querySelectorAll('video')].filter(v=>!v.paused&&!v.ended&&visRect(v)).map(v=>(v.currentSrc||'').split('/').pop());
 // framed objects
 const fr=[];const all=document.body.querySelectorAll('*');
 for(const el of all){if(/^(SCRIPT|STYLE|BR|SOURCE|TRACK)$/.test(el.tagName))continue;if(el instanceof SVGElement&&el.tagName!=='svg')continue;
  const v=visRect(el);if(!v)continue;const a=area(v);if(a<1600||a>0.85*VW*VH)continue;const cs=getComputedStyle(el);let why='';
  if(/^(IMG|VIDEO|CANVAS|PICTURE|svg|IFRAME)$/.test(el.tagName))why=el.tagName.toLowerCase();
  else{const bw=['Top','Right','Bottom','Left'].filter(s=>parseFloat(cs['border'+s+'Width'])>=1&&(parse(cs['border'+s+'Color'])||{a:0}).a>0.15).length;
   if(bw>=2)why='border';else if(cs.boxShadow!=='none')why='shadow';else if(cs.backgroundImage!=='none'&&!/^linear-gradient\(rgba\(0, 0, 0, 0\)/.test(cs.backgroundImage))why='bg-image';else{const bc=parse(cs.backgroundColor);if(bc&&bc.a>0.6)why='fill'}}
  if(why)fr.push({el,why,a,cls:(el.className&&el.className.baseVal!==undefined?el.className.baseVal:el.className||'').toString().slice(0,30),tag:el.tagName,r:v})}
 const top=fr.filter(f=>!fr.some(g=>g!==f&&g.el.contains(f.el)));const iou=(a,b)=>{const i=area(isect(a,b));return i/(area(a)+area(b)-i)};const ded=[];for(const f of [...fr].sort((a,b)=>b.a-a.a)){if(ded.every(g=>iou(g.r,f.r)<0.8))ded.push(f)}
 // headline candidates: biggest type
 texts.sort((a,b)=>b.fs-a.fs);
 const media=fr.filter(f=>/img|video|canvas|svg|bg-image/.test(f.why)).sort((a,b)=>b.a-a.a).slice(0,3).map(f=>({tag:f.tag,cls:f.cls,a:Math.round(f.a),r:[f.r.l,f.r.t,f.r.r,f.r.b].map(Math.round)}));
 return {words:Math.round(words),fams:Object.fromEntries(Object.entries(fams).map(([k,v])=>[k,Math.round(v)])),cols:cl.map(g=>({c:g.c,w:Math.round(g.w),n:g.m.length})),clip:Math.round(cols['clip-gradient']||0),
  moving:mv.size,mvd,vids,frames:fr.length,framesTop:top.length,framesD:ded.length,dedList:ded.map(f=>f.tag+'.'+f.cls.slice(0,18)+':'+f.why+':'+[f.r.l,f.r.t,f.r.r,f.r.b].map(Math.round).join(',')),hdrWords:Math.round(hw),hdrFams:Object.keys(hf),hdrCols:Object.keys(hc),topList:top.map(f=>f.tag+'.'+f.cls+':'+f.why).slice(0,30),bigText:texts.slice(0,6),texts:texts.filter(t=>!t.inH),media}}
})();
