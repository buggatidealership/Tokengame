// node close.js <out dir> <takes> [tickers]: 4x close-ups of single tiles (default Lilly, CAT, Volkswagen) at a 390 phone
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=process.argv[3].split(','),TK=(process.argv[4]||'LLY,CAT,VOW3.DE').split(',');const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();for(const t of TS){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:4});await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const ps=t.split('+');await p.addStyleTag({content:rd('_sa.css')+ps.map(x=>rd(x+'.css')).join('')});await p.evaluate(ps=>ps.forEach(x=>document.documentElement.classList.add('sa-t-'+x)),ps);
 await p.evaluate(()=>document.querySelector('.wc-season').scrollIntoView());await p.waitForTimeout(800);
 await p.addScriptTag({content:rd('_sa.js')+(ps.some(x=>/^g\d/.test(x))?rd('_gen.js'):'')+ps.map(x=>rd(x+'.js')).join('')});await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:30000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
 for(const k of TK){const n=await p.evaluate(k=>{const r=ROUNDS.find(r=>r.ticker===k);return r&&r.n},k);const el=await p.$(`.wc-season .wc-bi[href="#/round/${n}"]`);await el.screenshot({path:`${OUT}/close-${t}-${k}.png`})}
 console.log('close',t);await p.close()}await b.close()})();
