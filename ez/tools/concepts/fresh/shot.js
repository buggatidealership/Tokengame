const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const er=[];p.on('pageerror',e=>er.push(e.message));
for(const c of process.argv[2].split(',')){await p.goto('file://'+__dirname+'/f.html?c='+c);await p.waitForFunction(()=>window.READY,{timeout:20000});await p.waitForTimeout(400);await p.screenshot({path:__dirname+'/'+c+'.jpg',type:'jpeg',quality:92})}
console.log('errs',er.length?er:'none');await b.close()})();
