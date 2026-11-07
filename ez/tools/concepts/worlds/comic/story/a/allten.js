// node allten.js <out dir> <takes>: every logo tile (no film) at a 390 phone, after "Show all", one png per take and ticker
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=process.argv[3].split(',');const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();for(const t of TS){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load',timeout:120000});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 const ps=t.split('+');await p.addStyleTag({content:rd('_sa.css')+ps.map(x=>rd(x+'.css')).join('')});await p.evaluate(ps=>ps.forEach(x=>document.documentElement.classList.add('sa-t-'+x)),ps);
 await p.evaluate(()=>{document.querySelector('.wc-season .wc-more').click();document.querySelector('.wc-season').scrollIntoView()});await p.waitForTimeout(600);
 await p.addScriptTag({content:rd('_sa.js')+(ps.some(x=>/^g\d/.test(x))?rd('_gen.js'):'')+ps.map(x=>rd(x+'.js')).join('')});await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:60000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
 const ns=await p.evaluate(()=>[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>!a.querySelector('.wc-bi-art img:not(.wc-lgimg)')).map(a=>a.getAttribute('href').replace(/\D/g,'')));
 for(const n of ns){const el=await p.$(`.wc-season .wc-bi[href="#/round/${n}"]`);await el.scrollIntoViewIfNeeded();await p.waitForTimeout(80);await el.screenshot({path:`${OUT}/ten-${t}-${n}.png`})}
 console.log('ten',t,ns.join(','));await p.close()}await b.close()})();
