const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:664}});await FONTS(p);
await p.goto('http://127.0.0.1:8982/tools/concepts/worlds/comic/story/h/h30/b/index.html',{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>{const c=document.createElement('canvas').getContext('2d');const o={};for(const f of ['Bebas Neue','Shantell Sans']){c.font=`40px "${f}"`;o[f]=[...'0123456789'].map(d=>c.measureText(d).width.toFixed(1)).join(' ')}
 o.fontsLoaded=[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).filter((v,i,a)=>a.indexOf(v)===i);
 o.tnum=getComputedStyle(document.body).fontFeatureSettings;const s=document.createElement("span");s.style.cssText="font:400 40px Shantell Sans;position:absolute";document.body.append(s);o.domDigits=[..."0123456789"].map(d=>{s.textContent=d;return s.getBoundingClientRect().width.toFixed(1)}).join(" ");return o});console.log(JSON.stringify(r,null,1));await b.close()})();
