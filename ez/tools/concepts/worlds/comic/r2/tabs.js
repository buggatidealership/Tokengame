const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();for(const rm of ['no-preference','reduce']){const p=await b.newPage({viewport:{width:390,height:844},reducedMotion:rm});const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8897/v47-live-x3plus.html#/leaderboard',{waitUntil:'load'});await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world'),null,{timeout:90000});
 await p.evaluate(()=>document.querySelector('.wc-pf').scrollIntoView());await p.waitForTimeout(500);
 const bs=await p.$$('.wc-pf-tabs button');await bs[2].click();await p.waitForTimeout(60);await bs[1].click();await p.waitForTimeout(40);await bs[3].click();await p.waitForTimeout(900);
 const r1=await p.evaluate(()=>[...document.querySelectorAll('.wc-pf-v')].map(v=>v.dataset.v+':'+(v.hidden?'h':'V')+':'+getComputedStyle(v).opacity).join(' ')+' sel='+document.querySelector('[aria-selected=true]').textContent);
 await bs[3].focus();await p.keyboard.press('ArrowRight');await p.waitForTimeout(900);
 const r2=await p.evaluate(()=>[...document.querySelectorAll('.wc-pf-v')].map(v=>v.dataset.v+':'+(v.hidden?'h':'V')).join(' ')+' sel='+document.querySelector('[aria-selected=true]').textContent+' focus='+document.activeElement.textContent+' ind='+document.querySelector('.wc-pf-ind').style.transform);
 console.log(rm,r1,'|',r2,'errors',er.join(';')||'none');await p.close()}await b.close()})();
