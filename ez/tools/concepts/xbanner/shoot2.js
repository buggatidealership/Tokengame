const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const [v,w,h] of [['D',1500,500],['S',1200,630]]){const p=await b.newPage({viewport:{width:w,height:h}});await p.goto('http://localhost:8995/tools/concepts/xbanner/banner.html#'+v);await p.waitForTimeout(2500);await p.screenshot({path:__dirname+'/x-banner-'+v+'.png'});await p.close()}await b.close()})();
