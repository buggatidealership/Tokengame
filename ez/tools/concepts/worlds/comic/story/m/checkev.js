// node checkev.js <shots dir>: loads the preview (port 8913) at 320/390/1280 with ?look=m3, cycles the looks, opens "Show all", reports
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
for(const W of [320,390,1280]){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:1});const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text())});
 await p.goto('http://localhost:8913/?look=m3',{waitUntil:'load',timeout:120000});
 await p.waitForFunction(()=>document.querySelector('.ev-sw'),null,{timeout:90000});
 const st=async()=>p.evaluate(()=>{const vis=[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent);
   return {look:new URLSearchParams(location.search).get('look')||'now',sw:document.documentElement.scrollWidth,logos:vis.filter(a=>a.querySelector('img.wc-lgimg')).length,painted:document.querySelectorAll('.wc-season canvas.sa-gc5').length,
   stamps:[...document.querySelectorAll('.wc-season .sa-sts')].filter(x=>x.offsetParent).length,vis:vis.length,pressed:document.querySelector('.ev-sw [aria-pressed=true]').textContent}});
 await p.evaluate(()=>document.querySelector('.wc-season').scrollIntoView());await p.waitForTimeout(2500);const r=[['load',await st()]];
 for(const k of ['g2','g5','m1','now','m3']){await p.click(`.ev-sw button[data-k="${k}"]`);await p.waitForTimeout(1500);r.push([k,await st()])}
 await p.screenshot({path:`${OUT}/ev-${W}.png`});
 await p.click('.wc-season .wc-more');await p.waitForTimeout(2000);r.push(['showall',await st()]);
 await p.click('.ev-sw button[data-k="g5"]');await p.waitForTimeout(1500);r.push(['g5all',await st()]);
 console.log(W,JSON.stringify(r),er.join('|')||'ok');await p.close()}
await b.close()})();
