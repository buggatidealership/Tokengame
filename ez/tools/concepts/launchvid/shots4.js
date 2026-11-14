// Screens of the real terminal staged at R43 Bloom Energy, for the 3D reveal (v4). Phone 390x844 at 3x.
// 43 = before the close (Bloom in play, board as of R42), 44 = after (board as of R43). The clock is fixed to those moments.
const {chromium}=require('playwright');const O=__dirname+'/scr/';require('fs').mkdirSync(O,{recursive:true});
(async()=>{const b=await chromium.launch();const errs=[];
 const shot=async(n,when,hash,name,full)=>{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3});const p=await ctx.newPage();
  await p.clock.setFixedTime(new Date(when));p.on('pageerror',e=>errs.push(name+': '+e.message));
  await p.goto('http://localhost:8996/_term-staged-'+n+'.html#'+hash);await p.waitForTimeout(1800);
  await p.evaluate(()=>{const n=document.getElementById('nav');if(n)n.style.display='none'});
  await p.screenshot({path:O+name+'.png',fullPage:!!full});
  const info=await p.evaluate(()=>{const r=s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top+scrollY),Math.round(b.width),Math.round(b.height)]};
    return {h:document.documentElement.scrollHeight,ip:r('.ip'),ipc:r('.ipc'),lt:r('.lt'),rows:[...document.querySelectorAll('.lt')].slice(0,1).flatMap(t=>[...t.querySelectorAll('tbody tr')].map(tr=>{const b=tr.getBoundingClientRect();return [Math.round(b.top+scrollY),Math.round(b.height)]}))}});
  console.log(name,JSON.stringify(info));await ctx.close()};
 await shot(43,'2026-10-22T19:40:00Z','next','up-43',true);
 await shot(43,'2026-10-22T19:40:00Z','leaders','lb-43',true);
 await shot(44,'2026-10-23T20:30:00Z','leaders','lb-44',true);
 console.log('errs',errs.join('|')||'none');await b.close()})();
