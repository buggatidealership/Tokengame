// node run.js <out dir> <section cover|up|back> <takes e.g. now,c1,c2,c3> [widths 390,320,1280]
// Lays take <t>.css and <t>.js over the built X3+ page and shoots one element. A take's JS adds html.se-ready when done.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3],TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const SEL={chars:'.wc-chars',cliff:'.wc-cliff',cover:'#wc-book .wc-cover',up:'#wc-up',back:'#wc-book > .wc-back'}[SEC];
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html')+(SEC==='up'?'#/upcoming':''),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>scrollTo(0,0));
  if(t!=='now'){const ps=t.split('+');await p.addStyleTag({content:rd('_se.css')+ps.map(x=>rd(x+'.css')).join('')});await p.evaluate(ps=>ps.forEach(x=>document.documentElement.classList.add('se-t-'+x)),ps);
    await p.addScriptTag({content:rd('_se.js')+ps.map(x=>rd(x+'.js')).join('')});await p.waitForFunction(()=>document.documentElement.classList.contains('se-ready'),null,{timeout:20000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  {const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}}
  if(SEC!=='cover'){await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-60)},SEL);}
  else await p.evaluate(()=>scrollTo(0,0));
  await p.waitForTimeout(+process.env.SHOT_AT||3000);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const n=document.querySelector(s);const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},SEL);
  const pad=14;
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}.png`,clip:{x:0,y:Math.max(0,bb.y-pad),width:W,height:Math.min(bb.height+pad+16,+process.env.MAXH||9000)},fullPage:true});
  const m=await p.evaluate(s=>{const n=document.querySelector(s),r=n.getBoundingClientRect(),VW=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.offsetParent)return false;const cs=getComputedStyle(e);return (q.right>VW+1||q.left<-1)&&cs.visibility!=='hidden'}).map(e=>e.className&&String(e.className).slice(0,30)).slice(0,5);
    const clip=[...n.querySelectorAll('[class*="se-"]')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'&&!/se-ok/.test(e.className)).map(e=>String(e.className).slice(0,30)).slice(0,5);
    return {sw:document.documentElement.scrollWidth,w:Math.round(r.width),h:Math.round(r.height),out,clip}},SEL);
  console.log(W,SEC,t,JSON.stringify(m),er.join('|')||'ok');await p.close()}
 await b.close()})();
