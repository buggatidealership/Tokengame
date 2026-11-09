// node shot.js <outdir> : boards of live1 (the terminal + W2's Live now and Last matchday), fixed clocks
const {chromium}=require('playwright');const O=process.argv[2];require('fs').mkdirSync(O,{recursive:true});
const B='http://localhost:8996/tools/concepts/studio/live1/index.html';
(async()=>{const b=await chromium.launch();const errs=[];
for(const [n,q,h,w,t] of [
 ['up-live-390','','#next',390,'2026-11-09T18:42:00Z'],
 ['up-ip-390','','#next',390,'2026-11-09T09:30:00Z'],
 ['lb-live-390','?at=lb','',390,'2026-11-09T18:42:00Z'],
 ['up-live-1280','','#next',1280,'2026-11-09T18:42:00Z'],
 ['live-terminal-390','LIVE','#next',390,'2026-11-09T18:42:00Z']]){
 const ctx=await b.newContext({viewport:{width:w,height:w<500?844:900},deviceScaleFactor:2,timezoneId:'America/New_York'});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(n+': '+e.message));
 await p.clock.setFixedTime(new Date(t));
 const url=q==='LIVE'?'http://localhost:8996/v53-terminal.html'+h:B+q+h;
 await p.goto(url);await p.waitForTimeout(2200);
 const sw=await p.evaluate(()=>document.documentElement.scrollWidth);
 await p.screenshot({path:`${O}/${n}.png`,fullPage:true});console.log(n,'sw',sw);await ctx.close()}
console.log('errs',errs.join(' | ')||'none');await b.close()})();
