// node run.js <out dir> <takes c2,c2d> [width 390]: the X3+ cover with cover take C2 (cv/) and, for c2d, the detail pass (dt/c2d.*) over it. Port 8929.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'c2,c2d').split(','),W=+(process.argv[4]||390);fs.mkdirSync(OUT,{recursive:true});
const cv=f=>fs.readFileSync(__dirname+'/../cv/'+f,'utf8'),dt=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const t of TS){const p=await b.newPage({viewport:{width:W,height:844},deviceScaleFactor:2});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8929/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForTimeout(600);
  await p.addStyleTag({content:cv('_cv.css')});await p.addStyleTag({content:cv('c2.css')});await p.addScriptTag({content:cv('_cv.js')});await p.addScriptTag({content:cv('c2.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('c2-ready'),null,{timeout:30000});
  if(t==='c2d'){await p.addStyleTag({content:dt('c2d.css')});await p.addScriptTag({content:dt('lib.js')});await p.addScriptTag({content:dt('c2d.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('c2d-ready'),null,{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2000);
  await p.screenshot({path:`${OUT}/${t}-${W}.png`});
  const m=await p.evaluate(()=>{const o=[];document.querySelectorAll('.c2 *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>innerWidth+.5||r.left<-.5))o.push(String(e.className.baseVal??e.className).slice(0,30)+' '+Math.round(r.left)+'..'+Math.round(r.right))});return {sw:document.documentElement.scrollWidth,over:o.slice(0,8)}});
  console.log(JSON.stringify({t,W,...m,err:er}));await p.close()}
 await b.close()})();
