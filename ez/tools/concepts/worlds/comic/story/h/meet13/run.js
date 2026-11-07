// node run.js <outdir> <ids now,n0,n1,n2,n3> [widths 390,1280] [dpr 2]   (ez/ served on PORT, default 8989)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8989;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const ctx=await b.newContext({viewport:{width:W,height:W<600?664:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  const bad=[];p.on('requestfailed',r=>{if(/meet13/.test(r.url()))bad.push(r.url())});
  await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl&&window.MODELS&&document.querySelector('section.c8 .c8-one'),null,{timeout:120000});await p.waitForTimeout(1500);
  if(id!=='now'){await p.addStyleTag({content:rd('m13.css')});await p.addScriptTag({content:rd('m13.js')});await p.evaluate(id=>__M13(id),id)}
  await p.evaluate(()=>document.querySelector('section.c8').scrollIntoView());await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.waitForFunction(()=>[...document.querySelectorAll('section.c8 image')].length===0||true);await p.waitForTimeout(+(process.env.WAIT||2500));
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('section.c8'))return;const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.setProperty('visibility','hidden','important')})});
  const bx=await p.evaluate(()=>{const r=document.querySelector('section.c8').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}});
  const m=await p.evaluate(()=>{const L=document.querySelector('section.c8'),lr=L.getBoundingClientRect();const o={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(lr.height),secW:Math.round(lr.width)};
    const svg=L.querySelector('.m13-svg');if(svg){const r=svg.getBoundingClientRect();o.svgH=Math.round(r.height);o.svgW=Math.round(r.width);
      let mn=99,mt='';svg.querySelectorAll(':scope>g text').forEach(t=>{const b=t.getBoundingClientRect();if(b.height<mn&&t.textContent.trim()){mn=b.height;mt=t.textContent.slice(0,20)}});o.minTextH=+mn.toFixed(1);o.minT=mt;
      const ims=[...svg.querySelectorAll('image')];o.imgs=ims.length}
    return o});
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:W<600?0:bx.x,y:bx.y,width:W<600?W:bx.w,height:Math.min(bx.h,4000)},fullPage:true});
  m.errors=er;m.bad=bad;res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
