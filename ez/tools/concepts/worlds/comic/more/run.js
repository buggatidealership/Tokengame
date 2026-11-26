// node run.js <out dir> <takes e.g. m1,m2> [widths 390,1280]: each take shot "now" and with the mockup laid over the built X3+
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'m1,m2,m3,m4,m5').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const T={m1:['#/leaderboard','.wc-sb'],m2:['','.wc-cliff'],m3:['','.wc-season'],m4:['','.wc-splash'],m5:['','.wc-cover']};
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS)for(const v of ['now',t]){const [hash,sel]=T[t];
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/v47-live-x3plus.html'+hash,{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(v!=='now'){await p.addStyleTag({content:rd('_base.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_flags.js')});await p.addScriptTag({content:rd(t+'.js')})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1000);
  const e=await p.$(sel);if(!e){console.log('missing',sel);continue}
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(400);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await e.evaluate(n=>{const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}});
  await p.screenshot({path:`${OUT}/${W}-${t}-${v==='now'?'now':'mock'}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W,bb.width+24),height:Math.min(bb.height+16,5000)},fullPage:true});
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(W,t,v,'sw',sw,er.join('|')||'ok');await p.close()}
 await b.close()})();
