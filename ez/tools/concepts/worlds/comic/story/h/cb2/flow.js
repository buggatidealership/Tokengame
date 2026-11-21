const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const out=[];
for(const rm of [false,true]){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,reducedMotion:rm?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load/.test(m.text()))er.push(m.text())});
await p.goto('http://127.0.0.1:8997/v46-live-x2plus.html#/round/57',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card'),null,{timeout:200000});await p.waitForTimeout(1500);
const st=()=>p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');return {n:c&&c.getAttribute('data-n'),cls:c&&c.className.slice(0,60),cb:!!document.querySelector('#x2pRm .cb'),no:document.querySelector('#x2pRm .cb-no')?.textContent,hash:location.hash}});
await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1500);out.push(['flipped',await st()]);
await p.evaluate(()=>document.querySelector('#x2pRm .cb [data-flip]').click());await p.waitForTimeout(1500);out.push(['plate See the film',await st()]);
const nx=await p.$('#x2pRm [class*=nx], #x2pRm button[aria-label*=ext]');if(nx){await nx.click();await p.waitForTimeout(1800);out.push(['next',await st()]);
 await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('.face.front [data-flip]')||c).click()});await p.waitForTimeout(1500);out.push(['next flipped',await st()])}else out.push(['no next button']);
await p.keyboard.press('Escape');await p.waitForTimeout(1200);out.push(['closed',await st()]);out.push(['rm '+rm+' errors',er]);await ctx.close()}
console.log(JSON.stringify(out,null,0));await b.close()})();
