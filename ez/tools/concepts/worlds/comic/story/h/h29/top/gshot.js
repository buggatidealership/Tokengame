const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:200},deviceScaleFactor:3});
await p.setContent(`<html><head><style>${fs.readFileSync('../_gutter.css','utf8')} body{margin:0;background:#04070e;overflow-x:clip} .c{width:358px;margin:0 auto;padding:20px 0}</style></head><body><div class="c"><div class="h29-gutter"></div></div></body></html>`);
await p.waitForTimeout(500);await p.screenshot({path:'out/gut.png'});await b.close()})();
