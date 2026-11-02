// node run.js <outdir> <shots: now,a,a.d7,b,b.d1.fri,...> [widths 390,1280] [dpr 2]   (ez/ served on PORT, default 8992)
// a shot id = take[.key][.fri]: key is the switch to press after the build, .fri moves the mockup clock to Fri Oct 30, 6:30 pm New York.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8992;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const [take,...opt]=id.split('.');const fri=opt.includes('fri'),key=opt.find(x=>x!=='fri');
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?DPR:+(process.env.DDPR||1),reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  const bad=[];p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().replace(/^.*\/ez\//,''))});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl&&window.MODELS,null,{timeout:120000});await p.waitForTimeout(1200);
  if(take!=='now'){await p.addStyleTag({content:rd('_m.css')+rd(take+'.css')});
   if(fri)await p.evaluate(()=>{window.__LBNOW=Date.parse('2026-10-30T22:30:00Z')});
   for(const f of ['_d.js',take+'.js','_m.js'])await p.addScriptTag({content:rd(f)});
   await p.evaluate(t=>__LB(t),take);await p.evaluate(()=>document.fonts.ready);
   if(key)await p.evaluate(([t,k])=>{const g=window['__LB'+t.toUpperCase()];g&&g(k)},[take,key]);
   await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#lbx img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});
  }else{await p.evaluate(()=>{const n=document.querySelector('header nav.nav');})}
  await p.waitForTimeout(+(process.env.WAIT||900));
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('header'))return;if(getComputedStyle(x).position==='fixed')x.style.setProperty('visibility','hidden','important')})});
  const m=await p.evaluate(()=>{const L=document.getElementById('lbx');const o={sw:document.documentElement.scrollWidth,vw:innerWidth};if(!L)return o;
    const r=L.getBoundingClientRect();o.secH=Math.round(r.height);o.bottom=Math.round(r.bottom+scrollY);
    let mn=99,mt='';L.querySelectorAll('*').forEach(e=>{if(!e.childNodes.length)return;const t=[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).length;if(!t)return;const cs=getComputedStyle(e);if(cs.display==='none'||e.closest('.sr'))return;const f=parseFloat(cs.fontSize);if(f<mn){mn=f;mt=e.textContent.trim().slice(0,20)}});o.minFont=mn;o.minT=mt;
    o.clip=[...L.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);if(cs.display==='none'||e.closest('.sr')||e.tagName==='svg'||e.closest('svg'))return false;return e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible'}).map(e=>e.className+':'+e.textContent.trim().slice(0,16)).slice(0,6);
    o.outside=[...L.querySelectorAll('b,small,span,img')].filter(e=>{const a=e.getBoundingClientRect();return a.width&&(a.right>innerWidth+.5||a.left<-.5)}).map(e=>e.className+':'+e.textContent.trim().slice(0,14)).slice(0,6);
    o.imgFail=[...L.querySelectorAll('img')].filter(i=>!i.naturalWidth).map(i=>i.src.slice(-24));return o});
  const H=Math.min(m.bottom||1600,7000);
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:0,y:0,width:W,height:H},fullPage:true});
  m.errors=er;m.bad=bad.slice(0,5);res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
