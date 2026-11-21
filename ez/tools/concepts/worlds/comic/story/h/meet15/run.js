// node run.js <outdir> <ids now,v1,v2,v3,v4> [widths 390,1280] [dpr 2]   (ez/ served on PORT, default 8990)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8990;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const ctx=await b.newContext({viewport:{width:W,height:W<600?664:900},deviceScaleFactor:W<600?DPR:+(process.env.DDPR||1),reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  const bad=[];p.on('requestfailed',r=>{if(/meet15|founder/.test(r.url()))bad.push(r.url())});p.on('response',r=>{if(/meet15|founder/.test(r.url())&&r.status()>=400)bad.push(r.status()+' '+r.url())});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl&&window.MODELS&&document.documentElement.classList.contains('m32'),null,{timeout:120000});await p.waitForTimeout(1500);
  if(id!=='now'){await p.addStyleTag({content:rd('m15.css')});await p.addScriptTag({content:rd('m15.js')});await p.evaluate(()=>document.fonts.ready);await p.evaluate(id=>__M15(id),id)}
  await p.evaluate(()=>document.querySelector('section.c8').scrollIntoView());await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(async()=>{const ims=[...document.querySelectorAll('section.c8 .m15 image')].map(i=>i.getAttribute('href'));await Promise.all([...new Set(ims)].map(u=>new Promise(r=>{const im=new Image();im.onload=im.onerror=r;im.src=u})))});
  await p.waitForTimeout(+(process.env.WAIT||1800));
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('section.c8'))return;const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.setProperty('visibility','hidden','important')})});
  const bx=await p.evaluate(()=>{const r=document.querySelector('section.c8').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}});
  const m=await p.evaluate(()=>{const L=document.querySelector('section.c8'),lr=L.getBoundingClientRect();const o={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(lr.height),secW:Math.round(lr.width)};
    let mn=99,mt='';L.querySelectorAll('.m15 svg text').forEach(t=>{const b=t.getBoundingClientRect();if(b.height>0&&b.height<mn&&t.textContent.trim()){mn=b.height;mt=t.textContent.slice(0,24)}});o.minTextBoxH=+mn.toFixed(1);o.minT=mt;
    /* font-size in css px of the smallest live text = svg font-size x scale */
    let fmin=99,ft='';L.querySelectorAll('.m15 svg').forEach(sv=>{const k=sv.getBoundingClientRect().width/sv.viewBox.baseVal.width;sv.querySelectorAll('text').forEach(t=>{const fs=+t.getAttribute('font-size')*k;if(t.textContent.trim()&&fs<fmin){fmin=fs;ft=t.textContent.slice(0,24)}})});o.minFontPx=+fmin.toFixed(2);o.minF=ft;
    o.svgs=L.querySelectorAll('.m15 svg').length;o.images=L.querySelectorAll('.m15 image').length;o.filters=L.querySelectorAll('.m15 filter').length;
    const m14=L.querySelector('.m15');if(m14){const r=m14.getBoundingClientRect();o.hostH=Math.round(r.height);o.hostTop=Math.round(r.top-lr.top)}
    o.persp=[...L.querySelectorAll('*')].filter(e=>{const c=getComputedStyle(e);return (c.perspective&&c.perspective!=='none')||/matrix3d|perspective/.test(c.transform)}).length;o.anims=document.getAnimations().filter(a=>a.effect&&a.effect.target&&L.contains(a.effect.target)).length;
    return o});
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:W<600?0:bx.x,y:bx.y,width:W<600?W:bx.w,height:Math.min(bx.h,4000)},fullPage:true});
  m.errors=er;m.bad=bad;res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
