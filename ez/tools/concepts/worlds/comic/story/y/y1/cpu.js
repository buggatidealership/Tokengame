// one-off: the materials' render time at 4x CPU (throttle set before the take is injected)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');
(async()=>{const b=await chromium.launch();const {p}=await open(b,390,'now');const cdp=await p.context().newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
 const fs=require('fs');await p.addStyleTag({content:fs.readFileSync(__dirname+'/y1.css','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/y1.js','utf8')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('y1-ready'),null,{timeout:60000});const r=await p.evaluate(()=>Y1check());console.log('materials ms at 4x',r.matMs,r.tex);
 await p.emulateMedia({reducedMotion:'reduce'});const an=await p.evaluate(()=>document.getAnimations().filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.y1-st')&&a.playState==='running').length);console.log('running y1 animations under reduced motion',an);await b.close()})();
