// node rec.js <out.mp4> [width 390]: records the race show on a phone: titles, the grading at the fork, the drive-in, the big race.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2],W=+(process.argv[3]||390),H=W<600?844:800;const TMP=fs.mkdtempSync('/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z3rec-');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:W*2,height:H*2}}});
 const p=await ctx.newPage();const T0=Date.now();await FONTS(p);
 await p.goto('http://localhost:8918/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
 /* warm the media so posters are in before the take */
 await p.addStyleTag({content:rd('z3.css')});await p.addScriptTag({content:rd('z3.js').replace("requestAnimationFrame(()=>op.classList.add('z3-go'))","window.__z3open=()=>op.classList.add('z3-go')")});
 await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(async()=>{const H=document.documentElement.scrollHeight;for(let y=0;y<H;y+=900){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 /* reset the beats that fired while warming */
 await p.evaluate(()=>{document.querySelectorAll('#z3 .z3-go').forEach(e=>e.classList.remove('z3-go'))});
 await p.reload({waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
 await p.addStyleTag({content:rd('z3.css')});await p.addScriptTag({content:rd('z3.js').replace("requestAnimationFrame(()=>op.classList.add('z3-go'))","window.__z3open=()=>op.classList.add('z3-go')")});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(700);
 const start=(Date.now()-T0)/1000;await p.evaluate(()=>window.__z3open());
 const glide=async(sel,off,ms)=>p.evaluate(([sel,off,ms])=>new Promise(r=>{const e=document.querySelector(sel),y0=scrollY,y1=Math.max(0,e.getBoundingClientRect().top+scrollY-off),t0=performance.now();
   const f=t=>{const k=Math.min(1,(t-t0)/ms),e2=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo(0,y0+(y1-y0)*e2);k<1?requestAnimationFrame(f):r()};requestAnimationFrame(f)}),[sel,off,ms]);
 await p.waitForTimeout(3200);
 await glide('.z3-sb1',150,1100);await p.waitForTimeout(1800);
 await glide('.z3-sb2',90,900);await p.waitForTimeout(1300);
 await glide('.z3-sb3',(H-p.viewportSize().width*230/340)/2-10,1000);await p.waitForTimeout(5600);
 await glide('.z3-sb4',140,800);await p.waitForTimeout(1500);
 await glide('.z3-trk',110,1100);await p.waitForTimeout(4200);
 await glide('.z3-l3',140,700);await p.waitForTimeout(1600);
 await glide('.z3-tn .z3-grs0',110,1100);await p.waitForTimeout(1600);
 await glide('.z3-bgp',110,1100);await p.waitForTimeout(2600);
 await glide('.z3-end',100,900);await p.waitForTimeout(1800);
 const end=(Date.now()-T0)/1000;const v=p.video();await ctx.close();const src=await v.path();
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(start-.2),'-to',String(end),'-i',src,'-vf','fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','20','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true,force:true});await b.close();console.log(OUT,(end-start).toFixed(1)+'s')})();
