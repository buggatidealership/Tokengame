// node shot.js <out dir> <width>x<height> [hash] [full|sections] : the built X3+ (v47) from localhost:8897
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],[VW,VH]=(process.argv[3]||'390x844').split('x').map(Number),HASH=process.argv[4]||'',MODE=process.argv[5]||'full',PAGE=process.env.PAGE||'v47-live-x3plus.html';
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:VW<600?2:1});await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push('pageerror '+e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text().slice(0,200))});
 if(process.env.INIT)await p.addInitScript(process.env.INIT);
 await p.goto('http://localhost:8897/'+PAGE+(process.env.Q||'')+HASH,{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(900);
 const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
 const info=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,err:String(window.__x2pWorldErr||''),world:document.documentElement.classList.contains('x2p-world'),h:document.documentElement.scrollHeight}));
 const tag=process.env.TAG||'';
 if(MODE==='full'){await p.screenshot({path:`${OUT}/full${tag}-${VW}${HASH.replace(/\W/g,'')}.png`,fullPage:true})}
 else{const sel=MODE;const n=await p.$$eval(sel,x=>x.length);for(let i=0;i<n;i++){const el=(await p.$$(sel))[i];await el.scrollIntoViewIfNeeded();await p.waitForTimeout(700);await el.screenshot({path:`${OUT}/s${tag}-${VW}-${i}.png`})}}
 if(process.env.EVAL)console.log(await p.evaluate(process.env.EVAL));
 console.log(VW,JSON.stringify(info),'errors:',er.join(' | ')||'none');await b.close()})();
