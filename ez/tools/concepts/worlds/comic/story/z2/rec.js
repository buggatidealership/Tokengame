// node rec.js <out.mp4>: the grading page stamping on comprehension, then the giant-size special's living krackle (390 wide)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const OUT=process.argv[2];const TMP=process.env.TMPD||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z2/vid';
(async()=>{fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:1,recordVideo:{dir:TMP,size:{width:390,height:700}}});
 const p=await ctx.newPage();await FONTS(p);const t0=Date.now();
 await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('z2.css')+'.x2p-cw{display:none!important}'});await p.addScriptTag({content:rd('z2.js')});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const e=document.querySelector('.z2-p1');scrollTo(0,e.getBoundingClientRect().top+scrollY-60)});await p.waitForTimeout(1500);
 const tA=Date.now()-t0;
 await p.evaluate(()=>{const e=document.querySelector('.z2-p3');window.scrollTo({top:e.getBoundingClientRect().top+scrollY-120,behavior:'smooth'})});
 await p.waitForTimeout(5500);
 await p.evaluate(()=>{const e=document.querySelector('.z2-gs');scrollTo(0,e.getBoundingClientRect().top+scrollY-10)});await p.waitForTimeout(5000);
 const tB=Date.now()-t0;await ctx.close();await b.close();
 const v=fs.readdirSync(TMP).find(f=>f.endsWith('.webm'));
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(tA/1000),'-t',String((tB-tA)/1000),'-i',TMP+'/'+v,'-c:v','libx264','-pix_fmt','yuv420p','-crf','22','-vf','scale=780:-2:flags=lanczos','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true,force:true});console.log(OUT,tA,tB)})();
