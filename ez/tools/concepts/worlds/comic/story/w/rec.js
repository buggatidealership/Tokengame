// node rec.js <frames dir> <take>: the "film arrives" move on the Shell tile at 390, frame by frame (animations seeked, 25 fps)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],t=process.argv[3];fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8915/v47-live-x3plus.html');
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
 await p.addStyleTag({content:rd('_w.css')});await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:'window.__wwDemo=1'});
 await p.addScriptTag({content:rd('_w.js')});await p.addScriptTag({content:rd(t+'.js')});await p.waitForFunction(t=>document.documentElement.classList.contains('ww-ready-'+t),t);
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
 await p.evaluate(()=>{const a=document.querySelector('.ww-after');a.querySelector('.ww-demo-l').remove();scrollTo(0,a.getBoundingClientRect().top+scrollY-200)});await p.waitForTimeout(500);
 await p.evaluate(async()=>{await window.__wwArrive(document.querySelector('.ww-after'))});
 await p.evaluate(()=>document.getAnimations().forEach(a=>{a.pause();a.__t0=a.currentTime||0}));
 await p.evaluate(()=>document.querySelector('.ww-after').scrollIntoView({block:'center'}));await p.waitForTimeout(300);
 const bb=await p.evaluate(()=>{const r=document.querySelector('.ww-after').getBoundingClientRect();return {x:r.left-4,y:r.top-4,width:r.width+10,height:r.height+10}});
 for(let i=0;i<70;i++){await p.evaluate(ms=>document.getAnimations().forEach(a=>{a.currentTime=(a.__t0||0)+ms}),i*40);await p.screenshot({path:`${OUT}/${String(i).padStart(3,'0')}.png`,clip:bb})}
 console.log(t,'frames',bb);await b.close()})();
