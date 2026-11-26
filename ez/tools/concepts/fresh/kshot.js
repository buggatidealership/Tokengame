const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1536,height:1920}});const er=[];p.on('pageerror',e=>er.push(e.message));
for(const s of process.argv[2].split(',')){await p.goto('http://localhost:8995/pk.html?b='+s);await p.waitForFunction(()=>window.READY,{timeout:30000});await p.waitForTimeout(300);await p.screenshot({path:__dirname+'/img/k'+s+'.png'})}
console.log('errs',er.length?er:'none');await b.close()})();
