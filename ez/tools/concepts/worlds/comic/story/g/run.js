// node run.js <out dir> <takes e.g. now,g1,g2,g3> [widths 390,320,1280]   env: GAL=1 every round as a main event, MAXH=px, SHOT_AT=ms
// Lays helper e's shared code, then _sg and a take, over the built X3+ page's Upcoming tab, and shoots the tab's lists.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,320,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8921;
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  if(process.env.GAL)await p.addInitScript(()=>{window.__sgAll=1});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html#/upcoming`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t!=='now'){await p.addStyleTag({content:rd('../e/_se.css')+rd('_sg.css')+rd(t+'.css')});
    await p.addScriptTag({content:rd('../e/_se.js')+rd('_sg.js')+rd(t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('sg-ready'),null,{timeout:60000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  {const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}}
  await p.waitForTimeout(+process.env.SHOT_AT||2500);
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(()=>{const up=document.getElementById('wc-up'),a=up.querySelector(':scope > .wc-flt')||up,kids=[...up.children].filter(e=>e.offsetParent&&!e.classList.contains('wc-back')&&!e.classList.contains('wc-cover')&&e.getBoundingClientRect().height>0);
    const t=a.getBoundingClientRect().top+scrollY,bt=Math.max(...kids.map(e=>e.getBoundingClientRect().bottom+scrollY));return {y:t,h:bt-t}});
  const pad=14,h=Math.min(bb.h+pad+16,+process.env.MAXH||20000);
  await p.screenshot({path:`${OUT}/up-${W}-${t}${process.env.GAL?'-gal':''}.png`,clip:{x:0,y:Math.max(0,bb.y-pad),width:W,height:h},fullPage:true});
  const m=await p.evaluate(()=>{const n=document.querySelector('.sg-up')||document.getElementById('wc-up'),VW=innerWidth;
    const out=[...n.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width||!e.offsetParent)return false;if(e.closest('.sg-art,.sg-mini'))return false;return q.right>VW+1||q.left<-1}).map(e=>String(e.className).slice(0,30)).slice(0,5);
    /* text that runs out of its own card: a call chip or name past the ticket's right edge */
    const spill=[...n.querySelectorAll('.sg-cl,.sg-nm,.sg-un b,.sg-hd small,.sg-co')].filter(e=>{const c=e.closest('.sg-tk');if(!c)return false;const a=e.getBoundingClientRect(),z=c.getBoundingClientRect();return a.width&&(a.right>z.right+.5||a.left<z.left-.5)}).map(e=>e.className+':'+(e.closest('[data-t]')||{}).dataset?.t).slice(0,8);
    const ell=[...n.querySelectorAll('.sg-un b')].filter(e=>e.scrollWidth>e.clientWidth+1).map(e=>e.textContent);
    const cards=n.querySelectorAll('.sg-m').length,unders=n.querySelectorAll('.sg-u').length,painted=n.querySelectorAll('.sg-art canvas,.sg-art .sg3-bn').length;
    return {sw:document.documentElement.scrollWidth,out,spill,ell,cards,unders,painted}});
  console.log(W,t,JSON.stringify(m),er.join('|')||'ok');await p.close()}
 await b.close()})();
