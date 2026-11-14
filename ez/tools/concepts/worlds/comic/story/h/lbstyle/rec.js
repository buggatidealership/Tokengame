// node rec.js <out.mp4> <take a|b|c|now> [width 390]  (serve ez/ on PORT, default 8961)
// Records, on the real page: Overview -> tap Leaderboard (the chapter turn), then the window switch on the bill
// (24h, 7 days, Season), then a scroll to the scoreboard and its own switch. Playwright video -> mp4 (H.264, faststart).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const R=require('./run.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],T=process.argv[3]||'a',W=+process.argv[4]||390,PORT=process.env.PORT||8961;
(async()=>{const b=await chromium.launch();const dir=fs.mkdtempSync('/tmp/claude-0/rec-');
 const H=W<600?844:800;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,recordVideo:{dir,size:{width:W,height:H}}});
 const p=await ctx.newPage();await FONTS(p);const t00=Date.now();
 await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>window.SS&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000}).catch(()=>{});
 if(T!=='now')await R.inject(p,T);await p.waitForTimeout(2500);
 const t0=(Date.now()-t00)/1000;await p.waitForTimeout(700);
 await p.click('header nav a[data-r="leaderboard"]');await p.waitForTimeout(3200);
 for(const k of ['#wc11n-t1','#wc11n-t2','#wc11n-t0']){await p.click('#wc-lb '+k);await p.waitForTimeout(1900)}
 for(let i=0;i<24;i++){await p.mouse.wheel(0,W<600?40:30);await p.waitForTimeout(40)}
 await p.evaluate(()=>{const e=document.querySelector('#wc-lb .ss3-tk');window.scrollTo({top:e.getBoundingClientRect().top+scrollY-70,behavior:'smooth'})});await p.waitForTimeout(1600);
 await p.click('#wc-lb .ss-swb[data-k="d1"]');await p.waitForTimeout(2000);await p.click('#wc-lb .ss-swb[data-k="season"]');await p.waitForTimeout(1500);
 const v=p.video();await ctx.close();const src=await v.path();await b.close();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(Math.max(0,t0-.2)),'-i',src,'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2,fps=25','-c:v','libx264','-pix_fmt','yuv420p','-crf','24','-movflags','+faststart',OUT]);
 console.log(OUT,(fs.statSync(OUT).size/1e6).toFixed(2)+' MB');fs.rmSync(dir,{recursive:true})})();
