const {chromium}=require('playwright');const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/c3';require('fs').mkdirSync(S,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
for(const [beat,r] of [['calls',72],['verdict',72],['end',72],['verdict',99],['verdict',97]]){await p.goto(`http://localhost:8996/tools/concepts/resolution/cards.html?beat=${beat}&r=${r}`);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:`${S}/${beat}-${r}.jpg`,type:'jpeg',quality:90})}
console.log('errs',e.join('|')||'none');await b.close()})();
