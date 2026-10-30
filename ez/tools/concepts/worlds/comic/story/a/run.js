// node run.js <out dir> <section lr5|season> <takes e.g. now,p1,p2,p3> [widths 390,1280]
// Lays take <t>.css and <t>.js over the built X3+ page and shoots one section. A take's JS adds html.sa-ready when done.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3],TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const SEL={lr5:'.wc-lr-5',season:'.wc-season'}[SEC];
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html'),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){const ps=t.split('+');await p.addStyleTag({content:rd('_sa.css')+ps.map(x=>rd(x+'.css')).join('')});await p.evaluate(ps=>ps.forEach(x=>document.documentElement.classList.add('sa-t-'+x)),ps);
    await p.addScriptTag({content:rd('_sa.js')+ps.map(x=>rd(x+'.js')).join('')});await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:20000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-60)},SEL);await p.waitForTimeout(500);
  // let any arrival animation finish (the takes play once on view); SHOT_AT overrides
  await p.waitForTimeout(+process.env.SHOT_AT||3200);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const n=document.querySelector(s);const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},SEL);
  const pad=SEC==='lr5'?(W>=1000?70:34):10;
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}.png`,clip:{x:Math.max(0,bb.x-16),y:bb.y-pad,width:Math.min(W,bb.width+32),height:Math.min(bb.height+pad+16,6000)},fullPage:true});
  const m=await p.evaluate(s=>{const n=document.querySelector(s),r=n.getBoundingClientRect();
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.right>r.right+2||q.left<r.left-2)&&getComputedStyle(e).position!=='absolute'}).length;
    return {sw:document.documentElement.scrollWidth,w:Math.round(r.width),h:Math.round(r.height),out,shown:[...document.querySelectorAll('.wc-bi')].filter(x=>x.offsetParent).length}},SEL);
  console.log(W,SEC,t,JSON.stringify(m),er.join('|')||'ok');await p.close()}
 await b.close()})();
