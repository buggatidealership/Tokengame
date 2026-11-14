// node shots.js <hash> <WxH> <outprefix> [N screens] : screenshots of the built X4+ page
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const [hash,size,out,nn]=process.argv.slice(2);const [VW,VH]=(size||'390x844').split('x').map(Number);const N=+(nn||5);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:+(process.env.DPR||(VW<600?2:1))});await FONTS(p);
const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
const t0=Date.now();await p.goto('http://localhost:8897/'+(process.env.PAGE||'v48-live-x4plus.html')+(hash&&hash!=='-'?hash:''),{waitUntil:'load'});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});const lift=Date.now()-t0;
await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(900);
const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
const hdr=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);
for(let i=0;i<N;i++){await p.evaluate(y=>scrollTo(0,y),i*(VH-hdr));await p.waitForTimeout(900);await p.screenshot({path:`${out}-${i}.png`});}
const info=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,h:document.documentElement.scrollHeight,world:document.documentElement.classList.contains('x2p-world')}));
console.log(size,hash,'lift',lift,JSON.stringify(info),'hdr',hdr,'\nerrors:',er.join('\n')||'none');await b.close()})();
