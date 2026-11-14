// node shoot.js <outdir> : phone shots of the CTA and Buyback mockups (served from ez/ on :8996)
const {chromium}=require('playwright');const out=process.argv[2];
(async()=>{const b=await chromium.launch();const errs=[];
 const shot=async(q,hash,name,opt={})=>{const p=await b.newPage({viewport:{width:opt.w||390,height:844},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(name+': '+e.message));
  await p.goto('http://localhost:8996/mock-cta.html'+q+'#'+hash);await p.waitForTimeout(1500);
  const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
  if(opt.end){await p.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await p.waitForTimeout(300)}
  await p.screenshot({path:out+'/'+name+'.png',fullPage:!!opt.full});console.log(name,'scrollWidth',sw);await p.close()};
 await shot('?c=1','leaders','c1-leaders-end',{end:1});
 await shot('?c=1','next','c1-upcoming-end',{end:1});
 await shot('?c=2','leaders','c2-leaders');
 await shot('?c=2&b=1','bet','b1-flow',{full:1});
 await shot('?c=1&b=2','bet','b2-tank',{full:1});
 await shot('?c=2&b=2','bet','b2-desk',{w:1280});
 await shot('?c=1&b=1','bet','b1-320',{w:320,full:1});
 console.log('errs',errs.join('|')||'none');await b.close()})();
