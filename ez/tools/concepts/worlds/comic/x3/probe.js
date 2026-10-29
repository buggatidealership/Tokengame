// node probe.js [hash] [WxH] [out.png] : load the built X3+ page, report the DOM state, screenshot
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
const hash=process.argv[2]||'',[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),out=process.argv[4];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 const t0=Date.now();await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html')+hash,{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});const lift=Date.now()-t0;
 await p.waitForTimeout(+(process.env.WAIT||1500));
 const o=await p.evaluate(()=>({sec:document.documentElement.getAttribute('data-sec'),cls:document.documentElement.className,world:document.documentElement.classList.contains('x2p-world'),
   nav:[...document.querySelectorAll('.nav a')].map(a=>a.textContent.trim()+'|'+(a.dataset.r||'')+'|'+a.getAttribute('href')),
   view:document.querySelector('#view')?document.querySelector('#view').children.length+' '+document.querySelector('#view').innerText.slice(0,200):'none',
   mainKids:[...document.querySelector('main').children].map(x=>x.tagName+'#'+x.id+'.'+x.className.slice(0,40)),
   hdr:document.querySelector('header.top').getBoundingClientRect().height,sw:document.documentElement.scrollWidth}));
 console.log('lift',lift,JSON.stringify(o,null,1));console.log('errors',er.join('\n')||'none');
 if(out)await p.screenshot({path:out});await b.close()})();
