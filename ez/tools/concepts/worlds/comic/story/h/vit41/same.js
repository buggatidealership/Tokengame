// node same.js : the vitrine (.vt-case) and the cabinet (.vt-cab, with __x2pDrawers=1) element by element, today's page against the build:
// every element's box relative to its container (0.01px), its text and its main computed styles; plus a pixel compare with the container's top
// put on a whole pixel in both (a shot at a fractional y re-samples every edge).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const OUT=process.argv[2],PORT=process.env.PORT||8961;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const R={};
 for(const W of [320,390,1280])for(const V of ['now','drawers']){const ph=W<600;
  const ctx=await b.newContext({viewport:{width:W,height:ph?844:900},deviceScaleFactor:1,hasTouch:ph,isMobile:ph,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  if(V==='drawers')await p.addInitScript(()=>{window.__x2pDrawers=1});
  await p.goto(`http://127.0.0.1:${PORT}/${V==='now'?'before.html':'v46-live-x2plus.html'}`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:150000});await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(4000);
  for(const s of ['.vt-case','.vt-cab']){
   const j=await p.evaluate(s=>{const C=document.querySelector('#x2pVit '+s),c=C.getBoundingClientRect();const K=['font','color','backgroundImage','transform','filter','opacity','display'];
     return [...C.querySelectorAll('*')].map(e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return [e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className,+(r.left-c.left).toFixed(2),+(r.top-c.top).toFixed(2),+r.width.toFixed(2),+r.height.toFixed(2),e.children.length?'':e.textContent.trim(),...K.map(k=>cs[k])].join('|')})},s);
   (R[W+s]=R[W+s]||{})[V]=j;
   await p.evaluate(s=>{document.documentElement.style.scrollBehavior='auto';[...document.body.querySelectorAll('*')].forEach(x=>{const q=getComputedStyle(x).position;if(q==='fixed'||q==='sticky')x.style.setProperty('display','none','important')});
     const C=document.querySelector('#x2pVit '+s);const y=C.getBoundingClientRect().top+scrollY;const d=y-Math.floor(y);document.querySelector('#x2pVit').style.transform=`translateY(${-d}px)`;scrollTo(0,Math.floor(y)-40)},s);
   await p.waitForTimeout(400);await (await p.$('#x2pVit '+s)).screenshot({path:`${OUT}/al-${W}-${V}-${s.slice(4)}.png`});await p.evaluate(()=>{document.querySelector('#x2pVit').style.transform=''})}
  await ctx.close()}
 for(const k in R){const a=R[k].now,c=R[k].drawers;let d=0;const ex=[];a.forEach((x,i)=>{if(/\|0\|0\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|[^|]*\|none$/.test(x)&&/\|none$/.test(c[i]))return;if(x!==c[i]){d++;if(ex.length<3)ex.push([x,c[i]])}});
  const [w,s]=[k.match(/^\d+/)[0],k.replace(/^\d+\.vt-/,'')];let ae='';try{ae=cp.execSync(`compare -metric AE ${OUT}/al-${w}-now-${s}.png ${OUT}/al-${w}-drawers-${s}.png null: 2>&1 || true`).toString()}catch(e){ae=String(e.stdout)}
  console.log(k,'elements',a.length,c.length,'differing',d,'pixels differing',ae.trim(),JSON.stringify(ex))}
 await b.close()})();
