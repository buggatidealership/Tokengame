// node run.js <out dir> <takes e.g. now,d1,d2> [widths 390,1280]: the Smart-or-lucky section of a snapshot of X3+,
// today's and each direction laid over it (CSS + JS injected). PAGE env picks the page (default _snap-sol.html).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,d1,d2,d3,d4,d5').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),PAGE=process.env.PAGE||'_snap-sol.html';
fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/'+PAGE,{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  if(t!=='now'){await p.addStyleTag({content:rd('_base.css')+rd(t+'.css')});await p.evaluate(()=>{window.__slShot=1});
   for(const f of ['_data.js','_mount.js',t+'.js'])await p.addScriptTag({content:rd(f)})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(t==='d5'?2600:900);
  const sel='.wc-splash';await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(400);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const chk=await p.evaluate(s=>{const n=document.querySelector(s),r=n.getBoundingClientRect();let over=[];n.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&(q.right>r.right+1||q.left<r.left-1)&&!e.closest('.sl3-strip'))over.push(e.className+':'+Math.round(q.left)+'-'+Math.round(q.right))});
    // text that overflows its own box
    n.querySelectorAll('*').forEach(e=>{if(e.children.length===0&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')over.push('clip '+e.className)});
    return {sw:document.documentElement.scrollWidth,over:over.slice(0,6)}},sel);
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},sel);
  await p.screenshot({path:`${OUT}/${W}-${t}.png`,clip:{x:Math.max(0,bb.x),y:bb.y-4,width:Math.min(W,bb.width),height:Math.min(bb.height+8,6000)},fullPage:true});
  console.log(W,t,'sw',chk.sw,JSON.stringify(chk.over),er.join('|')||'ok');await p.close()}
 await b.close()})();
