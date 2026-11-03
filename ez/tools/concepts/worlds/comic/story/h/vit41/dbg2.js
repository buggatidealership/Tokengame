const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const V of ['now','belt']){const ctx=await b.newContext({viewport:{width:320,height:844},hasTouch:true,isMobile:true});const p=await ctx.newPage();await FONTS(p);
 await p.goto(`http://127.0.0.1:8961/${V==='now'?'before.html':'v46-live-x2plus.html'}`,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pVit,null,{timeout:150000});await p.waitForTimeout(3000);
 console.log(V,await p.evaluate(()=>{const lb=document.querySelector('.vt-hero .vt-lb');const o=[];let n=0;
   const orig=lb.querySelector('.vt-nm').getBoundingClientRect;
   const gb=Element.prototype.getBoundingClientRect;Element.prototype.getBoundingClientRect=function(){if(this===lb)n++;return gb.call(this)};
   window.__x2pVit.fit();Element.prototype.getBoundingClientRect=gb;return 'closest '+!!lb.closest('.vt-belt .vt-it')+' inRoot '+document.getElementById('x2pVit').contains(lb)+' nHero '+document.querySelectorAll('.vt-hero .vt-lb').length+' lb rect calls '+n+' w '+lb.offsetWidth+' cls '+lb.className+' fs '+lb.querySelector('.vt-nm').style.fontSize}));await ctx.close()}await b.close()})();
