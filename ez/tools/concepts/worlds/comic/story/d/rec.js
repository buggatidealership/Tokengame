// node rec.js <take> <out.mp4> [width 390]: records the whole section scrolling through at real speed (the browser's own screencast at
// device pixels, each frame held for its real time), every panel's
// arrival motion playing as it comes into view; holds on each panel. The page's header and the crawl are hidden.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const [t,OUT,W0]=process.argv.slice(2),W=+(W0||390),H=W<600?844:900;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),A=f=>fs.readFileSync(__dirname+'/../a/'+f,'utf8');
const TMP=fs.mkdtempSync(require('os').tmpdir()+'/sdrec-');
(async()=>{const b=await chromium.launch({args:['--force-device-scale-factor=2']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2});
 const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load',timeout:120000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:A('_sa.css')+A('p3.css')});await p.addScriptTag({content:A('_sa.js')+A('p3.js')});
 await p.addStyleTag({content:rd('_sd.css')+rd(t+'.css')+'header.top{visibility:hidden}body > div:has(> .x2p-cw-run){display:none!important}'});await p.addScriptTag({content:rd('_sd.js')+rd(t+'.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('sd-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const n=document.querySelector('.wc-lr');scrollTo(0,n.getBoundingClientRect().top+scrollY-30)});await p.waitForTimeout(1500);
 const cdp=await ctx.newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async e=>{fr.push({d:e.data,t:e.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:W*2,maxHeight:H*2,everyNthFrame:1});await p.waitForTimeout(300);
 // glide down panel by panel: each panel's top near the top of the screen, then hold while its motion plays
 const stops=await p.evaluate(()=>[...document.querySelectorAll('.sd-st [aria-label^="Step"], .wc-lr-5')].map(e=>e.getBoundingClientRect().top+scrollY-70));
 let y=await p.evaluate(()=>scrollY);
 for(const s of stops){const steps=Math.max(1,Math.round(Math.abs(s-y)/34));for(let i=1;i<=steps;i++){await p.evaluate(v=>scrollTo(0,v),y+(s-y)*i/steps);await p.waitForTimeout(16)}y=s;await p.waitForTimeout(2300)}
 await p.waitForTimeout(800);await cdp.send('Page.stopScreencast');await b.close();
 let lst='';fr.forEach((f,i)=>{const fn=`${TMP}/f${String(i).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.d,'base64'));const du=i<fr.length-1?Math.max(.001,fr[i+1].t-f.t):.5;lst+=`file '${fn}'\nduration ${du.toFixed(4)}\n`});
 lst+=`file '${TMP}/f${String(fr.length-1).padStart(5,'0')}.jpg'\n`;fs.writeFileSync(TMP+'/l.txt',lst);
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/l.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart -an ${OUT}`);
 fs.rmSync(TMP,{recursive:true});console.log(OUT,fr.length,'frames',(fr[fr.length-1].t-fr[0].t).toFixed(1)+'s')})();
