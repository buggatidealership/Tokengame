// node audit.js W tag [overlay files...] : screen-by-screen audit of fonts and gold/yellow/green/red uses on what is visible
const {open}=require('./lib');const fs=require('fs');
(async()=>{const [W,tag,...ov]=process.argv.slice(2);const H=844;const {b,p,errs}=await open(+W,H,{css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
const total=await p.evaluate(()=>document.documentElement.scrollHeight);
const acc={fonts:{},cols:{}};
for(let y=0;;y+=H-120){const yy=Math.min(y,total-H);await p.evaluate(y=>scrollTo(0,y),yy);await p.waitForTimeout(700);
 const r=await p.evaluate(scan);
 for(const k in r.fonts){const o=acc.fonts[k]||(acc.fonts[k]={n:0,ex:new Set()});o.n+=r.fonts[k].n;r.fonts[k].ex.forEach(e=>o.ex.add(e))}
 for(const k in r.cols){const o=acc.cols[k]||(acc.cols[k]={n:0,ex:new Set()});o.n+=r.cols[k].n;r.cols[k].ex.forEach(e=>o.ex.add(e))}
 if(yy>=total-H)break}
const ser=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,{n:Math.round(v.n),ex:[...v.ex].slice(0,6)}]));
const out={W:+W,total,sw:await p.evaluate(()=>document.documentElement.scrollWidth),errs,fonts:ser(acc.fonts),cols:ser(acc.cols)};
fs.writeFileSync(`out/audit-${tag}-${W}.json`,JSON.stringify(out,null,1));console.log(tag,W,'total',total,'sw',out.sw,'errs',errs.length,errs.slice(0,3));await b.close()})();
function scan(){
 const VW=innerWidth,VH=innerHeight;const Y=scrollY;
 const isect=(a,b)=>({l:Math.max(a.l,b.l),t:Math.max(a.t,b.t),r:Math.min(a.r,b.r),b:Math.min(a.b,b.b)});const area=r=>Math.max(0,r.r-r.l)*Math.max(0,r.b-r.t);const R=r=>({l:r.left,t:r.top,r:r.right,b:r.bottom});
 const cache=new Map();
 function clipOf(el){if(cache.has(el))return cache.get(el);let res;
  if(!el||el===document.documentElement||el===document.body){res={c:{l:0,t:0,r:VW,b:VH},op:1}}
  else{const par=clipOf(el.parentElement||document.body);if(!par)res=null;else{const cs=getComputedStyle(el);
   if(cs.display==='none'||cs.visibility==='hidden'||cs.contentVisibility==='hidden')res=null;else{let op=par.op*(+cs.opacity);let c=par.c;if(cs.position==='fixed')c={l:0,t:0,r:VW,b:VH};
    if((cs.overflowX!=='visible'||cs.overflowY!=='visible'||cs.contain.includes('paint'))&&!(el instanceof SVGElement&&el.tagName!=='svg')){const r=R(el.getBoundingClientRect());c=isect(c,{l:cs.overflowX==='visible'?-1e5:r.l,r:cs.overflowX==='visible'?1e5:r.r,t:cs.overflowY==='visible'?-1e5:r.t,b:cs.overflowY==='visible'?1e5:r.b})}
    if(/rect\(0/.test(cs.clip)||/inset\(50%|circle\(0/.test(cs.clipPath))c={l:0,t:0,r:0,b:0};
    res=op<0.05?null:{c,op}}}}cache.set(el,res);return res}
 const vis=(el,r)=>{const cl=clipOf(el);if(!cl)return 0;return area(isect(R(r||el.getBoundingClientRect()),cl.c))};
 // section of an element
 const marks=[['header.top','0 header'],['.t4-b1','1 headline + chip'],['.t5-bg','1 headline + chip'],['.t4-b2','2 How a round works'],['.t4-b3','3 The whole game (film)'],['.f4-cx','3 The whole game (film)'],['.ch','4 Meet the models'],['#record','5 Every round so far'],['#learn','6 Smart or lucky'],['#x2pSt','7 The bet'],['#get','8 Next on the card / Get / Follow'],['footer','9 Footer'],['header','0 header']];
 const secOf=el=>{for(const [s,n] of marks){if(el.closest&&el.closest(s))return n}return '0 other: '+(el.closest('section,div[class]')||el).className.toString().split(' ')[0]};
 const desc=el=>{const c=(el.getAttribute('class')||'').split(/\s+/).filter(Boolean).slice(0,2).join('.');return el.tagName.toLowerCase()+(c?'.'+c:'')};
 const cv=document.createElement('canvas');cv.width=cv.height=1;const cx=cv.getContext('2d',{willReadFrequently:true});
 const parse=c=>{cx.clearRect(0,0,1,1);cx.fillStyle='rgba(0,0,0,0)';cx.fillStyle=c;cx.fillRect(0,0,1,1);const d=cx.getImageData(0,0,1,1).data;return {r:d[0],g:d[1],b:d[2],a:d[3]/255}};
 const hex=c=>'#'+[c.r,c.g,c.b].map(x=>x.toString(16).padStart(2,'0')).join('');
 const cls=c=>{if(c.a<0.15)return null;const r=c.r/255,g=c.g/255,b=c.b/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2,d=mx-mn;if(d<0.12)return null;const s=d/(1-Math.abs(2*l-1));let h=mx===r?60*(((g-b)/d)%6):mx===g?60*((b-r)/d+2):60*((r-g)/d+4);if(h<0)h+=360;if(s<0.4||l<0.12||l>0.9)return null;if(h>=36&&h<62&&d<0.33)return null;
  if(h>=36&&h<47)return 'gold'; if(h>=47&&h<62)return 'yellow'; if(h>=85&&h<175)return 'green'; if(h<12||h>=340)return 'red'; if(h>=12&&h<36)return 'orange'; if(h>=180&&h<260)return 'blue'; return null};
 const cols={},fonts={};
 const addC=(el,prop,raw,txt)=>{const ms=String(raw).match(/rgba?\([^)]*\)|#[0-9a-f]{3,8}\b/gi);if(!ms)return;const seen=new Set();for(const m of ms){const c=parse(m);const k=cls(c);if(!k||seen.has(k))continue;seen.add(k);const key=[secOf(el),k,prop,desc(el)].join(' | ');const o=cols[key]||(cols[key]={n:0,ex:new Set()});o.n++;o.ex.add(hex(c)+(txt?' "'+txt.slice(0,28)+'"':''))}};
 const all=document.querySelectorAll('body *');
 for(const el of all){if(/^(SCRIPT|STYLE|NOSCRIPT|IMG|VIDEO|CANVAS|SOURCE|PICTURE|IFRAME|BR)$/.test(el.tagName))continue;const r=el.getBoundingClientRect();if(r.bottom<0||r.top>VH||r.right<0||r.left>VW)continue;if(vis(el)<4)continue;
  const cs=getComputedStyle(el);const own=[...el.childNodes].filter(n=>n.nodeType===3&&n.nodeValue.trim()).map(n=>n.nodeValue.trim()).join(' ');
  if(own){const tf=cs.webkitTextFillColor;const clip=/text/.test(cs.backgroundClip+cs.webkitBackgroundClip);addC(el,'text',clip?cs.backgroundImage:(tf&&!/rgba\(0, 0, 0, 0\)/.test(tf)?tf:cs.color),own);
   if(cs.textShadow!=='none')addC(el,'text-shadow',cs.textShadow,own);if(parseFloat(cs.webkitTextStrokeWidth)>0)addC(el,'text-stroke',cs.webkitTextStrokeColor,own);
   const f=cs.fontFamily.split(',')[0].replace(/["']/g,'').trim();const key=f+' | '+secOf(el);const o=fonts[key]||(fonts[key]={n:0,ex:new Set()});o.n+=own.split(/\s+/).length;o.ex.add(desc(el)+' "'+own.slice(0,22)+'" '+cs.fontSize+(cs.fontVariantNumeric!=='normal'?' '+cs.fontVariantNumeric:''))}
  if(el instanceof SVGElement){if(cs.fill&&cs.fill!=='none')addC(el,'svg-fill',cs.fill);if(cs.stroke&&cs.stroke!=='none')addC(el,'svg-stroke',cs.stroke);if(el.tagName==='stop')addC(el,'svg-stop',cs.stopColor)}
  else{addC(el,'bg',cs.backgroundColor);if(cs.backgroundImage!=='none'&&!/url\(/.test(cs.backgroundImage))addC(el,'bg-gradient',cs.backgroundImage);
   for(const s of ['Top','Right','Bottom','Left'])if(parseFloat(cs['border'+s+'Width'])>0)addC(el,'border',cs['border'+s+'Color']);
   if(cs.boxShadow!=='none')addC(el,'box-shadow',cs.boxShadow);if(cs.filter!=='none')addC(el,'filter',cs.filter);if(parseFloat(cs.outlineWidth)>0&&cs.outlineStyle!=='none')addC(el,'outline',cs.outlineColor)}
  for(const ps of ['::before','::after']){const pc=getComputedStyle(el,ps);if(pc.content==='none'||pc.display==='none')continue;addC(el,'bg'+ps,pc.backgroundColor);if(pc.backgroundImage!=='none'&&!/url\(/.test(pc.backgroundImage))addC(el,'grad'+ps,pc.backgroundImage);if(pc.content!=='""'&&pc.content!=='normal'){addC(el,'text'+ps,pc.color,pc.content)}for(const s of ['Top','Bottom'])if(parseFloat(pc['border'+s+'Width'])>0)addC(el,'border'+ps,pc['border'+s+'Color']);if(pc.boxShadow!=='none')addC(el,'box-shadow'+ps,pc.boxShadow)}
 }
 const ser=o=>Object.fromEntries(Object.entries(o).map(([k,v])=>[k,{n:v.n,ex:[...v.ex]}]));return {fonts:ser(fonts),cols:ser(cols)}}
