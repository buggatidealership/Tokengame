// Screens for v5 (R72 Reddit): the real terminal staged before the drop, in play, and after the close. Phone 390x844 at 3x.
const {chromium}=require('playwright');const O=__dirname+'/scr5/';require('fs').mkdirSync(O,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
 const shot=async(m,when,hash,name)=>{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const p=await ctx.newPage();
  await p.clock.setFixedTime(new Date(when));p.on('pageerror',e=>errs.push(name+': '+e.message));
  await p.goto('http://localhost:8996/_term-r72-'+m+'.html#'+hash);await p.waitForTimeout(1800);
  await p.evaluate(()=>{const n=document.getElementById('nav');if(n)n.style.display='none'});
  await p.screenshot({path:O+name+'.png'});
  const info=await p.evaluate(()=>{const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top),Math.round(b.width),Math.round(b.height)]};
   const rows=[...document.querySelectorAll('.ur')].filter(e=>/Reddit/.test(e.textContent));
   return {rd:r(rows[0]),ip:r(document.querySelector('.ip')),ipc:r(document.querySelector('.ipc')),tiles:[...document.querySelectorAll('.ipc>div')].map(r),lt:r(document.querySelector('.lt')),rows:[...(document.querySelector('.lt')||{querySelectorAll:()=>[]}).querySelectorAll('tbody tr')].map(r)}});
  console.log(name,JSON.stringify(info));await ctx.close()};
 await shot('pre','2026-10-29T17:58:00Z','next','pre');
 await shot('play','2026-10-29T19:40:00Z','next','play');
 await shot('play','2026-10-29T19:40:00Z','leaders','lb-pre');
 await shot('post','2026-10-30T20:30:00Z','leaders','lb-post');
 console.log('errs',errs.join('|')||'none');await b.close()})();
