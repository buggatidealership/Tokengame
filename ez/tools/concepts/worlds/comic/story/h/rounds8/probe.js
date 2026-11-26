// node probe.js : dumps the facts rounds8 needs, and shoots today's #record at 390.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const OUT=process.argv[2]||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r8';require('fs').mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 p.on('pageerror',e=>console.log('ERR',e.message));
 await p.goto('http://127.0.0.1:8973/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 const f=await p.evaluate(()=>{const G=ROUNDS.filter(r=>r.a!=null&&r.out);const P=window.__x2pPnl();
  return {n:G.length,keysR:Object.keys(G[0]),last:G[G.length-1],first:G[0],pnlKeys:Object.keys(P),A:Object.keys(P.A),perEx:P.A.GROK.per[G[G.length-1].n],films:Object.keys(window.FILMS||{}).length,
   pend:(window.PENDING||[]).length,up:(window.UPCOMING||[]).length,hlcount:document.querySelectorAll('#highlights .card').length}});
 console.log(JSON.stringify(f,null,1));
 await p.evaluate(()=>document.getElementById('record').scrollIntoView());await p.waitForTimeout(2500);
 const box=await p.evaluate(()=>{const s=document.querySelector('#record .r6'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
 await p.screenshot({path:OUT+'/now-390.png',clip:{x:0,y:box.y,width:390,height:Math.min(box.h,6000)},fullPage:true});console.log(box);
 await b.close()})();
