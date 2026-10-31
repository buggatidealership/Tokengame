const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
(async()=>{const b=await chromium.launch();const {ctx,p,er}=await R.open(b,390,844,1);await R.inject(p,process.argv[2]||'i');const C=await R.cuts(p);console.log(C);
for(const k of [0,1,2,3]){await R.go(p,C[k]-422);await p.waitForTimeout(800);
 console.log(k,await p.evaluate(()=>[...document.querySelectorAll('.bki-ov')].map((o,i)=>{const a=o.getAnimations();const s=document.querySelectorAll('.bki-s')[i];return i+':'+getComputedStyle(o).visibility+' s='+getComputedStyle(o).getPropertyValue('--bki-s')+' anims='+a.length+' sent@'+Math.round(s.getBoundingClientRect().top)+' '+(a[0]?a[0].timeline&&a[0].timeline.constructor.name+' '+(a[0].currentTime&&a[0].currentTime.toString()):'')}).join(' | ')))}
console.log(er.join('|')||'ok');await b.close()})();
