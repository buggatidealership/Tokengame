// node close.js <out> <takes> : the BOARD frame alone at 3x (390 wide page), per take.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TKS=(process.argv[3]||'a,c').split(',');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const t of TKS){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_b5.css')});await p.evaluate(x=>window.__B5=x,t);await p.addScriptTag({content:rd('_b5.js')});await p.waitForFunction(()=>window.__b5||window.__b5Err)}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(1500);await p.evaluate(()=>window.__t5.place());await p.waitForTimeout(500);
  const el=await p.$('li.q4-board .t4-pic');await el.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await el.screenshot({path:`${OUT}/close-${t}.png`});console.log(t);await ctx.close()}
 await b.close()})();
