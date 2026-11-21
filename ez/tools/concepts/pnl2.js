/* node pnl2.js sizing|miss [width] -> scratchpad/pnl2/ */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const D=__dirname+'/pnl2/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/pnl2/';fs.mkdirSync(S,{recursive:true});
const mode=process.argv[2],W=+(process.argv[3]||390);
(async()=>{const b=await chromium.launch();
 const page=async()=>{const c=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.waitForTimeout(1200);return p};
 if(mode==='sizing')for(const k of ['S0','S1','S2']){const p=await page();await p.evaluate(k=>{window.__sz=k},k);await p.evaluate(fs.readFileSync(D+'sizing.js','utf8'));
   await p.evaluate(()=>document.querySelector('#standings').scrollIntoView());await p.waitForTimeout(300);
   const ol=await p.$('#standings ol.lbl');await ol.screenshot({path:S+'sz-'+k+'-'+W+'.png'});console.log(k,p.errs.join('|'));await p.context().close()}
 if(mode==='miss')for(const k of ['now','M1','M2','M3','M4']){const p=await page();
   await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(500);await p.evaluate(()=>document.querySelector('#learn [data-pt=miss]').click());await p.waitForTimeout(900);
   if(k!=='now'){await p.addStyleTag({content:fs.readFileSync(D+'miss.css','utf8')});await p.evaluate(k=>{window.__mo=k},k);await p.evaluate(fs.readFileSync(D+'miss.js','utf8'))}
   await p.waitForTimeout(400);const ov=await p.evaluate(()=>{const B=document.querySelector('#learn .pt-body'),R=B.getBoundingClientRect();return {h:Math.round(R.height),sh:B.scrollHeight,ch:B.clientHeight,
     over:[...B.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&(q.bottom>R.bottom+1||q.right>R.right+1)}).slice(0,4).map(e=>e.className.baseVal!==undefined?e.tagName:e.className)}});
   await (await p.$('#learn .x2p-pt')).screenshot({path:S+'miss-'+k+'-'+W+'.png'});console.log(k,JSON.stringify(ov),p.errs.join('|'));await p.context().close()}
 await b.close()})();
