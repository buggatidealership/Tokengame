// node rmcheck.js: with reduced motion, every take must have no running animation on its own elements
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();for(const [sec,t] of [['sol','i1'],['sol','i2'],['sol','i3'],['lb','i4'],['lb','i5'],['lb','i6']]){
 const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8923/v47-live-x3plus.html'+(sec==='lb'?'#/leaderboard':''),{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');await p.addStyleTag({content:rd('_si.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_si.js')});await p.addScriptTag({content:rd(t+'.js')});
 await p.evaluate(()=>{const n=document.querySelector('.si-sol,#wc-lb');n.scrollIntoView()});await p.waitForTimeout(1500);
 if(t==='i1')await p.evaluate(()=>document.querySelector('.si1-luck').click());if(t==='i5')await p.evaluate(()=>document.querySelector('.si5-tg button').click());await p.waitForTimeout(600);
 const n=await p.evaluate(()=>document.getAnimations().filter(a=>{const e=a.effect&&a.effect.target;return e&&e.closest&&(e.closest('[class*="si"]')&&String(e.className.baseVal||e.className).match(/si\d|si-/))&&a.playState==='running'}).map(a=>String(a.effect.target.className.baseVal||a.effect.target.className).slice(0,30)));
 console.log(t,'running animations:',n.length,n.slice(0,4).join('|'),er.join('|')||'no errors');await p.close()}await b.close()})();
