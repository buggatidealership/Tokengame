// Round 37 (owner, 2026-10-24): record backs ("See the stats") as a real card or ticket with a real graded stamp, and the MVP backs
// as a short story column (story first: headline, the story, then the calls, then Stock moved and Winner, the grade line last), each
// in a different art style. Shoots the real X2+ page: ids r* on the record's centred card (R45 today), m* on the TSMC MVP card.
// usage: node launch-r37-backs.js <id> <outdir/> [widths]
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2],OUT=process.argv[3],WS=(process.argv[4]||'390').split(',').map(Number),D=path.join(__dirname,'launch-r37-backs');
const rd=f=>fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'';
const css=rd('_base.css')+'\n'+rd(id+'.css'),js=rd('_base.js')+'\n'+(id[0]==='m'?rd('_story.js')+'\n':'')+rd(id+'.js'),REC=id[0]==='r';
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
for(const W of WS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Special+Elite&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;0,8..60,900;1,8..60,400&family=Pirata+One&display=block';document.head.appendChild(l)});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
 if(REC){await p.evaluate(async()=>{const c=document.querySelector('#car .card.cur');c.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,400));if(!c.classList.contains('flipped')){const f=c.querySelector('[data-flip],.flipb');f?f.click():c.click()}await new Promise(r=>setTimeout(r,900))})}
 else{await p.evaluate(async()=>{const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(x=>/tight/i.test(x.textContent));w.scrollIntoView({block:'center'});await new Promise(r=>setTimeout(r,400));if(window.__x2pHlGo)window.__x2pHlGo(1);await new Promise(r=>setTimeout(r,900));const c=w.querySelector('.card');if(!c.classList.contains('flipped'))c.click();await new Promise(r=>setTimeout(r,900))})}
 if(id!=='now'){await p.evaluate(({css,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(js))()},{css,js});
   await p.evaluate(async()=>{await document.fonts.load('16px "Special Elite"');await document.fonts.load('16px "Source Serif 4"');await document.fonts.load('16px "Pirata One"');await document.fonts.ready});await p.waitForTimeout(500)}
 const m=await p.evaluate(()=>{const el=document.querySelector('.r37p');if(!el)return{};const R=el.getBoundingClientRect();const over=[];el.querySelectorAll('*').forEach(e=>{if(e.closest('svg'))return;const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5)over.push((e.className||e.tagName)+' '+Math.round(r.right-R.right)+'/'+Math.round(r.bottom-R.bottom))});
   const cut=[];el.querySelectorAll('*').forEach(e=>{if(e instanceof HTMLElement&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')cut.push(e.className)});return{w:Math.round(R.width),h:Math.round(R.height),over:over.slice(0,5),cut:cut.slice(0,5)}});
 const sel=REC?'#car .card.cur':'#x2pHl .x2p-hi.on';
 const el=REC?await p.$('#car .card.cur'):await p.evaluateHandle(()=>[...document.querySelectorAll('#x2pHl .x2p-hi')].find(x=>/tight/i.test(x.textContent)));
 await el.screenshot({path:OUT+id+'-'+W+'.png'});console.log(id,W,JSON.stringify(m),errs.length?errs:'');await c.close()}
await b.close()})();
