const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const V of ['now','drawers']){const ctx=await b.newContext({viewport:{width:+process.argv[2],height:844},hasTouch:true,isMobile:true});const p=await ctx.newPage();await FONTS(p);
 if(V==='drawers')await p.addInitScript(()=>{window.__x2pDrawers=1});
 await p.goto(`http://127.0.0.1:8961/${V==='now'?'before.html':'v46-live-x2plus.html'}`,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:150000});await p.waitForTimeout(3000);
  const f=()=>p.evaluate(()=>[...document.querySelectorAll('#x2pVit .vt-case .vt-nm, #x2pVit .vt-cab .vt-nm')].slice(0,9).map(e=>e.textContent+':'+getComputedStyle(e).fontSize+'/'+(e.style.fontSize||'-')+'/w'+e.closest('.vt-sl').getBoundingClientRect().width.toFixed(2)+'/'+e.closest('.vt-lb').className).join(' '));
 const a=await f();await p.evaluate(()=>window.__x2pVit.fit());const c=await f();console.log(V,'\n load:',a,'\n refit:',c);await ctx.close()}await b.close()})();
