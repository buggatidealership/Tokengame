const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();for(const w of [320,360,390,430,1280]){const p=await b.newPage({viewport:{width:w,height:844}});await FONTS(p);
 await p.goto('http://localhost:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(4000);
 console.log(w,await p.evaluate(()=>{const n=document.querySelector('.nav');const cs=getComputedStyle(n);return JSON.stringify({nav:n.getBoundingClientRect().width,disp:cs.display,gtc:cs.gridTemplateColumns,gap:cs.gap,hdr:document.querySelector('header.top').getBoundingClientRect().height,a:[...n.children].map(a=>{const c=getComputedStyle(a);return a.textContent.trim().slice(0,12)+':'+a.getBoundingClientRect().width.toFixed(0)+'/'+a.scrollWidth+' fs'+c.fontSize+' pad'+c.padding+' ls'+c.letterSpacing})})}));await p.close()}
 await b.close()})();
