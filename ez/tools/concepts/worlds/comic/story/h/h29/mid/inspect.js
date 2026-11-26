// node inspect.js <width> : dumps the Meet the models and Every round so far DOM summary of the built v46
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');
const PORT=process.env.PORT||9741;
(async()=>{const w=+(process.argv[2]||390);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:w,height:844},deviceScaleFactor:1})).newPage();await FONTS(p);
const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(3000);
const r=await p.evaluate(()=>{const out={};const secs=[...document.querySelectorAll('main section, main>*')].filter(s=>s.getBoundingClientRect().height>40).map(s=>({tag:s.tagName,id:s.id,cls:(s.className||'').toString().slice(0,80),y:Math.round(s.getBoundingClientRect().top+scrollY),h:Math.round(s.getBoundingClientRect().height)}));out.secs=secs;
 const c8=document.querySelector('section.c8');if(c8){out.c8=c8.outerHTML.replace(/<svg[\s\S]*?<\/svg>/g,'<svg/>').replace(/<style[\s\S]*?<\/style>/g,'').slice(0,6000)}
 const rec=document.getElementById('record');if(rec){out.rec=[...rec.children].map(c=>c.tagName+'.'+c.className+' '+Math.round(c.getBoundingClientRect().height)).join('\n');}
 out.cls=document.documentElement.className;return out});
console.log(JSON.stringify(r,null,1));console.log(er);await b.close()})();
