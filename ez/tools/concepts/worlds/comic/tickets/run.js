// node run.js <out dir> <takes e.g. now,t1,t2,t3> [widths e.g. 390,1440]: the built X3+ with mk.js + base.css + <take>.css,
// shot per section: tomorrow at the close, every round so far, meet the models, smart or lucky
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,t1,t2,t3').split(','),WS=(process.argv[4]||'390,1440').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const SECS=(process.env.SECS||'tn,bi,ch,cn').split(',').map(k=>[k,{tn:'.wc-cliff',bi:'.wc-season',ch:'.wc-chars',cn:'.wc-splash'}[k]]);
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){const parts=t.split('+'),base=parts[0];
   await p.addStyleTag({content:fs.readFileSync(__dirname+'/base.css','utf8')+fs.readFileSync(__dirname+'/'+base+'.css','utf8')});
   await p.evaluate(s=>{window.__take=s},base);await p.addScriptTag({content:fs.readFileSync(__dirname+'/mk.js','utf8')});
   if(parts.length>1){await p.addStyleTag({content:fs.readFileSync(__dirname+'/k-base.css','utf8')+parts.slice(1).map(k=>fs.readFileSync(__dirname+'/'+k+'.css','utf8')).join('\n')});
    await p.evaluate(ks=>{document.documentElement.classList.add('tkm-k',...ks.map(k=>'tkm-'+k))},parts.slice(1));
    await p.addScriptTag({content:fs.readFileSync(__dirname+'/k.js','utf8')});
    const kf=parts.slice(1).filter(k=>/^kf\d/.test(k));
    if(kf.length){await p.addStyleTag({content:fs.readFileSync(__dirname+'/kf-base.css','utf8')});
     await p.evaluate(ks=>{document.documentElement.classList.add('tkm-kf');window.__kfPal={kf2:'night',kf3:'print'}[ks[0]]||'bold';window.__kfShot=1},kf);
     await p.addScriptTag({content:fs.readFileSync(__dirname+'/kf.js','utf8')});
     if(!process.env.LIVE)await p.evaluate(()=>setTimeout(()=>document.querySelectorAll('.wc-ch').forEach(c=>c.classList.add('kf-in')),300));await p.waitForTimeout(1800)}}}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
  for(const [k,s] of SECS){const e=await p.$(s);if(!e)continue;await e.scrollIntoViewIfNeeded();await p.waitForTimeout(500);
   await p.evaluate(()=>{document.querySelector('header.top')&&(document.querySelector('header.top').style.visibility='hidden');[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
   if(W>=1000){await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},s);await p.waitForTimeout(500);
     const bb=await e.boundingBox();await p.screenshot({path:`${OUT}/${W}-${k}-${t.replace(/\+/g,'_')}.png`,clip:{x:Math.max(0,bb.x-12),y:Math.max(0,bb.y-8),width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,(W<600?844:900)-Math.max(0,bb.y-8))}})}
   else{const bb=await e.evaluate(n=>{const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}});await p.screenshot({path:`${OUT}/${W}-${k}-${t.replace(/\+/g,'_')}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,6000)},fullPage:true})}}
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(W,t,'scrollWidth',sw,er.join('|')||'ok');await p.close()}
 await b.close()})();
