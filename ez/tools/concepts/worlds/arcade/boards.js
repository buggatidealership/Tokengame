// node boards.js <outdir> : the screens behind the owner's boards (phone 390x844 at 2x; desktop 1536x864)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
const OUT=process.argv[2];
async function shots(b,hash,w,h,n,pre,dpr){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:dpr});await FONTS(p);
 await p.goto('http://localhost:8897/v48-live-x4plus.html'+hash,{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);const hdr=await p.evaluate(()=>document.querySelector('header.top').getBoundingClientRect().height);
 for(let i=0;i<n;i++){await p.evaluate(y=>scrollTo(0,y),i*(h-hdr));await p.waitForTimeout(1300);await p.screenshot({path:`${OUT}/${pre}-${i}.png`})}await p.close()}
(async()=>{const b=await chromium.launch();
 await shots(b,'',390,844,5,'po',2);await shots(b,'#/leaderboard',390,844,4,'pl',2);await shots(b,'#/upcoming',390,844,2,'pu',2);
 await shots(b,'',1536,864,4,'do',1);await shots(b,'#/leaderboard',1536,864,2,'dl',1);await shots(b,'#/upcoming',1536,864,1,'du',1);
 await b.close()})();
