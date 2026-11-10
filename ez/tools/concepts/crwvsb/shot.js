const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});
for(const f of [1,2,3,4]){await p.goto('http://localhost:8999/sb.html?f='+f);await p.waitForFunction(()=>window.READY===1);await p.waitForTimeout(300);await p.screenshot({path:'f'+f+'.png'})}await b.close()})();
