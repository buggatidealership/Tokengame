// node run.js <out dir> <section every|tonight> <takes e.g. now,e1,e2,e3> [widths 390,1280]
// lays a take (w/<take>.css + w/<take>.js, plus the shared _w.js/_w.css) over the built X3+ and shoots one section
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3]||'every',TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),ex=f=>fs.existsSync(__dirname+'/'+f);
const SEL={every:'.wc-season',tonight:'.wc-cliff'}[SEC];
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
  await p.goto('http://localhost:8915/'+(process.env.PAGE||'v47-live-x3plus.html'),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.waitForFunction(()=>document.querySelector('.wc-season canvas.sa-gc5')||!document.querySelector('.wc-season'),null,{timeout:30000}).catch(()=>{});
  if(t!=='now'){if(ex('_w.css'))await p.addStyleTag({content:rd('_w.css')});await p.addStyleTag({content:rd(t+'.css')});
    if(SEC==='every')await p.addScriptTag({content:'window.__wwDemo=1'});if(ex('_w.js'))await p.addScriptTag({content:rd('_w.js')});await p.addScriptTag({content:rd(t+'.js')});
    await p.waitForFunction(t=>document.documentElement.classList.contains('ww-ready-'+t),t,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},SEL);await p.waitForTimeout(900);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<160&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},SEL);
  const cut=+(process.env.CUT||(W<600?3600:2400));
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,cut)},fullPage:true});
  const chk=await p.evaluate(s=>{const sec=document.querySelector(s),o=[];sec.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+1&&/hidden|clip/.test(cs.overflowX)&&cs.textOverflow!=='ellipsis'&&e.clientWidth>0)o.push((e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className)+'')});return {sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,clip:o.slice(0,6)}},SEL);
  console.log(SEC,W,t,'sw',chk.sw,'/',chk.cw,'clipped',JSON.stringify(chk.clip),er.join('|')||'ok');await p.close()}
 await b.close()})();
