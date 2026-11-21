// node run.js <out dir> <takes e.g. now,b1,b2,b3> [widths 390,1280]: tomorrow at the close on the built X3+ with a brand take
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,b1,b2,b3').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html'),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){await p.addStyleTag({content:rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('bk-'+t.slice(1)),t);
    await p.addScriptTag({content:rd('_pal.js')});await p.addScriptTag({content:rd('brand.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('bk-ready'),null,{timeout:20000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
  const sel='.wc-cliff';await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(400);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
  await p.screenshot({path:`${OUT}/${W}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,5000)},fullPage:true});
  const ov=await p.evaluate(()=>[...document.querySelectorAll('.wc-tnp')].filter(t=>t.scrollWidth>t.clientWidth+1).length);
  console.log(W,t,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),'overflowing tickets',ov,er.join('|')||'ok');await p.close()}
 await b.close()})();
