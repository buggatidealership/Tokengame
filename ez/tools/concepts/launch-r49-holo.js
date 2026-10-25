// Round 49 (owner, 2026-10-25): the holo stamps in motion, so the hologram reads as one. Shoots the real X2+ page (round 43's back at
// 390px), steps each stamp's own animation clock frame by frame (SMIL setCurrentTime) and saves the card's foot as PNG frames.
// usage: node launch-r49-holo.js <outdir/> <ids,comma> [seconds] [fps]   (ids as the r49*.js configs, e.g. r49seal)
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const OUT=process.argv[2],IDS=process.argv[3].split(','),SEC=+(process.argv[4]||6),FPS=+(process.argv[5]||24),D=path.join(__dirname,'launch-r40-recback');
const rd=f=>fs.readFileSync(path.join(D,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
 for(const id of IDS){const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,reducedMotion:'reduce'});const p=await c.newPage();
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
  await p.evaluate(async()=>{window.R40N=43;const c=document.querySelector('#record .card[data-n="43"]');c.scrollIntoView({block:'center',inline:'center'});await new Promise(r=>setTimeout(r,900));
    if(!c.classList.contains('cur')){c.click();await new Promise(r=>setTimeout(r,900))}if(!c.classList.contains('flipped')){c.click();await new Promise(r=>setTimeout(r,1100))}await document.fonts.ready});
  await p.evaluate(({css,base,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(base))();const D=R40.data(R40.N);R40.label(D);window.__r40D=D;(new Function(js))()},
   {css:rd('_base.css'),base:rd('_base.js')+'\n'+rd('_rows.js')+'\nwindow.R40rows=R40rows;\n'+rd('_r48.js')+'\n'+rd('_r49.js'),js:rd(id+'.js')});
  await p.waitForTimeout(600);const box=await p.evaluate(()=>{const f=document.querySelector('.r40p .x46-ft').getBoundingClientRect(),o=document.querySelector('.r40p').getBoundingClientRect();
    return {x:o.left,y:f.top-12,width:o.width,height:o.bottom-f.top+12}});
  fs.mkdirSync(OUT+id,{recursive:true});const N=Math.round(SEC*FPS);
  for(let i=0;i<N;i++){await p.evaluate(t=>{document.querySelectorAll('.r40p svg.x49s').forEach(s=>{try{s.pauseAnimations();s.setCurrentTime(t)}catch(e){}})},i/FPS);
   await p.screenshot({path:OUT+id+'/f'+String(i).padStart(4,'0')+'.png',clip:box})}
  console.log(id,N,'frames',JSON.stringify(box));await c.close()}
 await b.close()})();
