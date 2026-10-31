// Mockups: the record certificate fully "stamped" (owner, 2026-10-26). Today's build, P (PASS stamp ink everywhere), L (pressed letterpress).
// node cert-stamped.js <scratch dir>; X2+ build on :8897; fontroute.js routes Google Fonts. Nothing on the site changes.
const {chromium}=require('/opt/node22/lib/node_modules/playwright'),fs=require('fs');const S=process.argv[2]+'/';
(async()=>{const b=await chromium.launch();
for(const opt of (process.argv[3]||'today,P,L').split(','))for(const w of [390,1280]){
 const p=await b.newPage({viewport:{width:w,height:900},deviceScaleFactor:3});await require(S+'fontroute.js')(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(5500);
 if(opt!=='today')await p.addStyleTag({content:fs.readFileSync(__dirname+'/cert-stamped/'+opt+'.css','utf8')});
 for(const r of (w===390?['R45','R43','R4']:['R43'])){
  await p.evaluate(r=>{const c=[...document.querySelectorAll('#record button,#record a')].find(e=>e.textContent.trim()===r);if(c)c.click();document.querySelector('#record').scrollIntoView()},r);await p.waitForTimeout(1600);
  const ok=await p.evaluate(()=>{const c=document.querySelector('#car .card.cur');if(!c)return 'none';c.click();return c.querySelector('.rx3-h,.lbl,.slab-l')?'ok':'ok'});await p.waitForTimeout(1600);
  if(/^U/.test(opt))await p.evaluate(fs.readFileSync(__dirname+'/cert-stamped/pm.js','utf8'));await p.waitForTimeout(200);
  const c=await p.$('#car .card.cur');await c.screenshot({path:S+'cs/'+opt+'-'+w+'-'+r+'.png'});
  await p.evaluate(()=>document.querySelector('#car .card.cur').click());await p.waitForTimeout(900)}
 console.log(opt,w,errs.join('|'));await p.close()}
await b.close()})();
