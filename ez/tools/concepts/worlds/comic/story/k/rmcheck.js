// node rmcheck.js: under reduced motion, nothing in the cover may animate and autoplay must not advance; with motion, step 2 shows after ~5.5 s
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();for(const t of ['k1','k2','k3','k4'])for(const rm of ['reduce','no-preference']){const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:rm});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
await p.goto('http://localhost:8911/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
await p.addStyleTag({content:rd('_k.css')+rd(t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('kc-on'),t);await p.addScriptTag({content:rd('../e/_se.js')+rd('_k.js')+rd(t+'.js')});await p.waitForTimeout(6000);
const r=await p.evaluate(()=>{const cv=document.querySelector('#wc-book .wc-cover');const a=document.getAnimations().filter(x=>x.playState==='running'&&x.effect&&x.effect.target&&cv.contains(x.effect.target)&&!x.effect.target.closest('.wc-film-slot'));
 const on=document.querySelector('.kc-dot.kc-on');return {running:a.length,names:[...new Set(a.map(x=>x.animationName||'?'))].slice(0,6).join(','),step:on?+on.dataset.i+1:'-'}});
/* interaction: a tap on the stage goes to the next step; ArrowLeft goes back */
let tap='-';if(t!=='k4'){const s=await p.evaluate(()=>{const d=document.querySelector('.kc-dot.kc-on');return +d.dataset.i});await p.click('.kc-vp,.kc-tilt,.kc-pad');await p.waitForTimeout(300);tap=s+'->'+await p.evaluate(()=>+document.querySelector('.kc-dot.kc-on').dataset.i);
 await p.keyboard.press('ArrowLeft');await p.waitForTimeout(200);tap+='->'+await p.evaluate(()=>+document.querySelector('.kc-dot.kc-on').dataset.i)}
console.log(t,rm,JSON.stringify(r),'tap',tap,er.join('|')||'ok');await ctx.close()}await b.close()})();
