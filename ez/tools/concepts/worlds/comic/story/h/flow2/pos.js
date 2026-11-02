const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
(async()=>{const w=+process.argv[2]||390,T=process.argv[3]||'now',O=process.argv[4]||'friend';const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:844}});const p=await ctx.newPage();await FONTS(p);
await p.goto('http://localhost:8995/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
await p.evaluate(([t,o])=>{window.__F2T=t;window.__F2O=o},[T,O]);
await p.addStyleTag({content:fs.readFileSync('_f2.css','utf8')+(fs.existsSync(T+'.css')?fs.readFileSync(T+'.css','utf8'):'')+'\n'});await p.addScriptTag({content:fs.readFileSync('_f2.js','utf8')+fs.readFileSync(T+'.js','utf8')});
await p.waitForTimeout(2500);
console.log(await p.evaluate(()=>{const s=document.querySelector('section.t4');return [...s.children].map(e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return e.tagName+'.'+String(e.className).slice(0,40)+' y='+Math.round(r.top+scrollY)+' h='+Math.round(r.height)+' pos='+c.position+' mt='+c.marginTop}).join('\n')+'\nT4 h='+s.getBoundingClientRect().height+' disp='+getComputedStyle(s).display}));
await b.close()})();
