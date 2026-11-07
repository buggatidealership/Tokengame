// node ctx.js <take|now> <out.png> [W]: the section in its page context at desktop width (full viewport width, section's rows)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const id=process.argv[2],W=+(process.argv[4]||1280);const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
await p.route('**/media/s7-*',r=>{const f=__dirname+'/../sol7/img/'+r.request().url().split('/').pop().split('?')[0];r.fulfill({path:f,contentType:'image/jpeg'})});
await p.route('**/media/s25-coin.jpg',r=>r.fulfill({path:__dirname+'/../sol6/h25/out/s25-coin.jpg',contentType:'image/jpeg'}));
await p.goto('http://localhost:'+(process.env.PORT||8987)+'/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
if(id!=='now'){await p.addStyleTag({content:rd('../sol7/_s7.css')+rd('_s8.css')+rd(id+'.css')});await p.addScriptTag({content:rd('../sol7/_s7.js')+rd('_s8.js')+rd(id+'.js')})}
await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{const s=document.querySelector('#learn').getBoundingClientRect();const sib=[...document.querySelectorAll('main.wrap>section')].map(e=>{const q=e.getBoundingClientRect();return e.id+':'+Math.round(q.left)+','+Math.round(q.top+scrollY)+','+Math.round(q.width)+'x'+Math.round(q.height)});return {y:s.top+scrollY,h:s.height,sib}});
console.log(JSON.stringify(r));
await p.screenshot({path:process.argv[3],clip:{x:0,y:Math.max(0,r.y-300),width:W,height:r.h+600},fullPage:true});await b.close()})();
