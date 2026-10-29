const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await FONTS(p);
await p.goto('http://localhost:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(1500);
const o=await p.evaluate(()=>{const cls=q=>{const m={};document.querySelectorAll(q+' *').forEach(e=>{if(e.children.length===0&&e.textContent.trim()){const k=e.tagName.toLowerCase()+'.'+(typeof e.className==='string'?e.className.trim().split(/\s+/).join('.'):'');if(!m[k])m[k]=e.textContent.trim().slice(0,24)}});return Object.entries(m).slice(0,60).map(x=>x.join(' = ')).join('\n')};
return '#STX\n'+cls('#standings .stx-roll')+'\n#PROOF\n'+cls('#learn .x2p-pt')+'\n#BET\n'+cls('#x2pSt .bs-roll')+'\nDS:'+document.documentElement.getAttribute('data-sec')});
console.log(o);
for(const [q,f] of [['#standings','st'],['#learn','pr'],['#x2pSt','bt']]){await p.evaluate(q=>document.querySelector(q).scrollIntoView(),q);await p.waitForTimeout(900);await (await p.$(q)).screenshot({path:'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/c2-now-'+f+'.png'})}
await b.close()})();
