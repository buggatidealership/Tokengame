// node tour.js <out> [width] [hash]: full page screenshot of the built X3+ (no takes)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');
const OUT=process.argv[2],W=+(process.argv[3]||390),HS=process.argv[4]||'';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8924/v47-live-x3plus.html'+HS,{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
 await p.waitForTimeout(800);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
 await p.screenshot({path:OUT,fullPage:true});
 console.log(await p.evaluate(()=>[...document.querySelectorAll('#wc-book > section, #wc-book > p, #wc-lb > section, #wc-up > section')].map(s=>s.className+':'+Math.round(s.getBoundingClientRect().top+scrollY)+'/'+Math.round(s.offsetHeight)).join('\n')),er.join('|')||'ok');await b.close()})();
