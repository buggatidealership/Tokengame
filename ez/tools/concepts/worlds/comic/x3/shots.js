// node shots.js hash WxH N prefix : N screens from the top of the tab (full viewport steps)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');
const hash=process.argv[2]||'',[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),N=+(process.argv[4]||5),pre=process.argv[5]||'/tmp/claude-0/s';
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:+(process.env.DPR||1)});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html')+hash,{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
 const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(800);
 for(let i=0;i<N;i++){await p.evaluate(y=>scrollTo(0,y),i*(VH-120));await p.waitForTimeout(900);await p.screenshot({path:`${pre}-${i}.png`})}
 console.log('height',Hh,'sw',await p.evaluate(()=>document.documentElement.scrollWidth),'errors',er.join('\n')||'none');await b.close()})();
