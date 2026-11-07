// node run.js <out dir> <variants e.g. now,C1,C2,D,C2+D> : the built X3+ with each variant's CSS laid over it,
// shot at 390x844: the first screen, the Last round, the cast; and at 1280x800 the first screen
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],VS=(process.argv[3]||'now').split(',');fs.mkdirSync(OUT,{recursive:true});
const css=v=>v==='now'?'/* now */':v.split('+').flatMap(k=>k==='D2'?['D','D2']:[k]).map(k=>fs.readFileSync(__dirname+'/'+k+'.css','utf8')+(k==='C2'?fs.readFileSync(__dirname+'/C1.css','utf8'):'')).join('\n');
(async()=>{const b=await chromium.launch();
 for(const [W,H,parts] of [[390,844,['top','.wc-lr','.wc-chars']],[1280,800,['top']]])for(const v of VS){
  const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await FONTS(p);
  await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:css(v)});await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
  for(const s of parts){if(s!=='top'){await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-60)},s)}else await p.evaluate(()=>scrollTo(0,0));
   await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/${W}-${s.replace(/\W/g,'')||'top'}-${v.replace('+','')}.png`})}
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);console.log(W,v,'scrollWidth',sw);await p.close()}
 await b.close()})();
