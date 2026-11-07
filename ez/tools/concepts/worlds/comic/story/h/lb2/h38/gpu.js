// node gpu.js <outdir> <takes csv> : phone 390x844 at DPR 2.75 (forced), GPU memory capped at 40 MB vs uncapped; scrolls the Leaderboard
// mockup in steps and shoots the viewport at each stop; prints the share of pixels that differ (>24 on any channel) per stop (a dropped tile shows as a difference).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');const cp=require('child_process');
const OUT=process.argv[2],TK=process.argv[3].split(','),LB=__dirname+'/../../lb/';const rd=f=>fs.readFileSync(f,'utf8');const tf=(t,e)=>t==='c'?LB+'c.'+e:__dirname+'/'+t+'.'+e;
async function shoot(take,mb,dir){fs.mkdirSync(dir,{recursive:true});const args=['--enable-gpu-rasterization','--ignore-gpu-blocklist','--force-device-scale-factor=2.75'];if(mb)args.push('--force-gpu-mem-available-mb='+mb);
 const b=await chromium.launch({args});const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2.75,isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://127.0.0.1:8997/v46-live-x2plus.html',{waitUntil:'load',timeout:180000});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl,null,{timeout:120000});await p.waitForTimeout(1000);
 await p.addStyleTag({content:rd(LB+'_m.css')+(take==='c'?'':rd(__dirname+'/_r.css'))+rd(tf(take,'css'))});
 for(const f of [LB+'_d.js',...(take==='c'?[]:[__dirname+'/_r.js']),tf(take,'js'),LB+'_m.js'])await p.addScriptTag({content:rd(f)});
 await p.evaluate(t=>__LB(t),take);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 const H=await p.evaluate(()=>document.getElementById('lbx').getBoundingClientRect().bottom+scrollY);const stops=[];for(let y=0;y<H;y+=700)stops.push(y);
 for(const y of stops){await p.evaluate(async y=>{const s=scrollY,n=8;for(let i=1;i<=n;i++){scrollTo(0,s+(y-s)*i/n);await new Promise(r=>setTimeout(r,60))}},y);await p.waitForTimeout(2000);await p.screenshot({path:`${dir}/s${y}.png`})}
 await b.close();return stops}
(async()=>{for(const t of TK){const st=await shoot(t,0,`${OUT}/${t}-free`);await shoot(t,40,`${OUT}/${t}-40`);
 const r=cp.execFileSync('/usr/bin/python3',[__dirname+'/../../../../../../perf/gpu/diff.py',`${OUT}/${t}-free`,`${OUT}/${t}-40`]).toString().trim().split('\n').join(' | ');console.log(t,r)}})();
