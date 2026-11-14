// node rmcheck.js <take>: with reduced motion, counts running animations and transitions inside the take and the scoreboard after arrival
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {lay}=require('./run.js');
(async()=>{const b=await chromium.launch();for(const t of process.argv[2].split(',')){const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await lay(p,t);await p.waitForFunction(t=>document.documentElement.classList.contains('sf-ready-'+t),t);
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
 await p.waitForTimeout(200);
 console.log(t,await p.evaluate(()=>{const a=document.getAnimations().filter(x=>{const e=x.effect&&x.effect.target;return e&&e.closest&&e.closest('.sf-top,.wc-sbd .sf-ds,.sc-race')});return a.length+' animations: '+a.slice(0,4).map(x=>(x.animationName||x.transitionProperty)+'@'+String(x.effect.target.className).slice(0,20)).join(',')}),er.join('|')||'ok');await p.close()}
 await b.close()})();
