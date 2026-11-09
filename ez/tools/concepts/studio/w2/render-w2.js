// node render-w2.js <outdir> <fps> <from> <to> : the phone walk-through, 390x693 CSS px at 2.77 = 1080x1920
const {chromium}=require('playwright');const fs=require('fs');const [,,out,fps0,from0,to0]=process.argv;const fps=+(fps0||30),from=+(from0||0),to=+(to0||33.6);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:693},deviceScaleFactor:2.7693,timezoneId:'America/New_York',locale:'en-US'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://localhost:8996/tools/concepts/studio/w2/index.html?now=2026-11-09T18:42:00Z&r=1&walk=1#today');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2000);
 fs.mkdirSync(out,{recursive:true});let k=0;
 for(let f=0;f<=Math.round(to*fps);f++){const t=f/fps;await p.evaluate(t=>window.R(t),t);if(t>=from){await p.screenshot({path:`${out}/f${String(k++).padStart(4,'0')}.jpg`,type:'jpeg',quality:90})}}
 console.log('frames',k,'errs',errs.join('|')||'none');await b.close()})();
