const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';const TF='/home/user/Tokengame/ez/teaser/fonts/';
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',600,TF+'barlow-700.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed','100 900',TF+'barlow-condensed-800.woff2']];
const CSS=FF.map((f,i)=>"@font-face{font-family:'"+f[0]+"';font-weight:"+f[1]+";src:url(https://fontfile.local/"+i+".woff2)}").join('');
const MK=fs.readFileSync(S+'rs/mock.js','utf8'),MK2=fs.readFileSync(S+'rs/mock2.js','utf8');
const RUNS=[['h0',{on:0},0],['h0b',{on:0,flip:1},0],['h1b',{on:1,flip:1},0],['h2b',{on:2,flip:1},0],['rD',{on:0,rest:'D'},'list'],['rC',{on:0,rest:'C'},'grid']];
(async()=>{const b=await chromium.launch();const errs=[];
 for(const [name,o,scr] of RUNS){const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(name+':'+e.message));
  await p.route(/fonts\.googleapis\.com/,x=>x.fulfill({contentType:'text/css',body:CSS}));
  await p.route(/fontfile\.local/,x=>{const i=+x.request().url().match(/(\d+)\.woff2/)[1];x.fulfill({contentType:'font/woff2',body:fs.readFileSync(FF[i][2])})});
  await p.route(/fonts\.gstatic\.com/,x=>x.abort());
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html#/results');await p.waitForTimeout(2800);
  await p.evaluate(([a,b2,o])=>{eval(a);eval(b2);return window.__mk2(o)},[MK,MK2,o]);await p.waitForTimeout(1500);
  if(scr==='list')await p.evaluate(()=>{const g=document.querySelector('ol.rx3');window.scrollTo(0,g.getBoundingClientRect().top+scrollY-170)});
  if(scr==='grid')await p.evaluate(()=>{const g=document.querySelector('.mk-grid');window.scrollTo(0,g.getBoundingClientRect().top+scrollY-170)});
  if(!scr)await p.evaluate(()=>{const h=document.querySelector('.x2p-hl-sec');window.scrollTo(0,h.getBoundingClientRect().top+scrollY-120)});
  await p.waitForTimeout(1000);await p.screenshot({path:S+'rs/m2-'+name+'.png'});await p.close()}
 console.log(errs.join('|')||'no errors');await b.close()})();
