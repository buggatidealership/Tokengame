const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const out=process.argv[2];
for(const v of ['A','B','C']){const p=await b.newPage({viewport:{width:1500,height:500}});await p.goto('http://localhost:8995/tools/concepts/xbanner/banner.html#'+v);await p.waitForTimeout(2500);await p.screenshot({path:out+'/x-banner-'+v+'.png'});await p.close()}await b.close()})();
