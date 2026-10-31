// node run.js <out dir> [widths 390,1280,320] env: RM=1 reduced motion, NOSHOT=1 checks only
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS){const dpr=W<600?2:1;
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,160))});
  await p.goto('http://localhost:8916/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:rd('z1.css')});await p.addScriptTag({content:rd('z1.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('z1-ready'),null,{timeout:30000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(500);
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(4500);
  const m=await p.evaluate(()=>{const z=document.getElementById('z1'),VW=innerWidth;const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&e.getClientRects().length};
    const out=[...z.querySelectorAll('*')].filter(e=>{if(e.closest('svg')&&e.tagName!=='svg')return false;if(!vis(e))return false;const q=e.getBoundingClientRect();return q.width&&(q.right>VW+.5||q.left<-.5)&&!e.closest('.z1-thumbs,details:not([open]),.vt-tag,.z1-xtra')}).map(e=>String(e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,30)).slice(0,8);
    const clip=[...z.querySelectorAll('b,small,p,span,em,a')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible'&&!e.closest('.z1-thumbs,.z1-art,.z1-fslot')).map(e=>e.className+':'+e.textContent.slice(0,20)).slice(0,8);
    /* text that spills out of its panel */
    const spill=[];z.querySelectorAll('.z1-fp,.z1-row,.z1-tn,.z1-ep2,.z1-out,.z1-bp,.z1-ttl').forEach(pn=>{const r=pn.getBoundingClientRect();if(pn.closest('details:not([open])'))return;pn.querySelectorAll('b,small,p,span,i').forEach(e=>{if(!vis(e)||e.closest('.z1-crown,.z1-smack,.z1-late,.z1-cap,.z1-peek,.z1-pins,.z1-fv'))return;const q=e.getBoundingClientRect();if(q.width&&(q.right>r.right+1||q.left<r.left-1||q.bottom>r.bottom+1))spill.push(pn.className.split(' ')[0]+'>'+String(e.className).slice(0,16)+':'+e.textContent.slice(0,12))})});
    const r=z.getBoundingClientRect();return {sw:document.documentElement.scrollWidth,vw:VW,out,clip,spill:spill.slice(0,10),err:window.__z1Err||'',h:Math.round(r.bottom+scrollY)}});
  console.log(W,process.env.RM?'RM':'',JSON.stringify(m),er.join(' | ')||'no errors');
  if(!process.env.NOSHOT){await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header')&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
    const part=7800/dpr;let k=1;for(let y=0;y<m.h;y+=part,k++){await p.screenshot({path:`${OUT}/z1-${W}-${k}.png`,clip:{x:0,y,width:W,height:Math.min(part,m.h-y)},fullPage:true})}}
  await p.close()}
 await b.close()})();
