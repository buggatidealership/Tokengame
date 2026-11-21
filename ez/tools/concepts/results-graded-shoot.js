const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2']];
const CSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const MK=fs.readFileSync(S+'rs/mock.js','utf8');
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [mode,scrollTo] of (process.argv[2]?[[process.argv[2],0]]:[['A',0],['B',0],['C','grid'],['D','list']])){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(mode+':'+e.message));
  await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:CSS}));
  await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
  await p.route(/fonts\.gstatic\.com/,x=>x.abort());
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/results');await p.waitForTimeout(2800);
  const r=await p.evaluate(([js,m])=>{eval(js);return window.__mk(m)},[MK,mode]);await p.waitForTimeout(1200);
  if(scrollTo==='grid')await p.evaluate(()=>{const g=document.querySelector('.mk-grid');window.scrollTo(0,g.getBoundingClientRect().top+scrollY-250)});
  if(scrollTo==='list')await p.evaluate(()=>{const g=document.querySelector('ol.rx3');window.scrollTo(0,g.getBoundingClientRect().top+scrollY-120)});
  await p.waitForTimeout(1200);await p.screenshot({path:S+'rs/mk-'+mode+'.png'});console.log(mode,JSON.stringify(r));await p.close()}
 console.log(errs.join('|')||'no errors');await b.close()})();
