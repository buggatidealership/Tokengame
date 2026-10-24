// Round 36 (owner, 2026-10-24): the No. 5 ticket with only "In tryouts" (no "Next challenger") and the three models, the wording
// "Models in tryouts", and the ticket in other card stocks and colours. Shoots the real X2+ page with one variant injected
// (launch-r36-tryouts/<id>.css + <id>.js run in the page) and writes <out>/<id>-<w>.png (ticket No. 4 and No. 5).
// usage: node launch-r36-tryouts.js <id> <outdir/> [widths]
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2],OUT=process.argv[3],WS=(process.argv[4]||'390').split(',').map(Number),D=path.join(__dirname,'launch-r36-tryouts');
const rd=f=>fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'';
const css=rd('_base.css')+'\n'+rd(id+'.css'),js=rd('_base.js')+'\n'+rd(id+'.js');
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
for(const W of WS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
 await p.evaluate(({css,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(js))()},{css,js});
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
 const m=await p.evaluate(()=>{const n=document.querySelector('#standings li.x2p-n5'),o={h:n.offsetHeight,hs:document.documentElement.scrollWidth>innerWidth+1};
   o.over=[...n.querySelectorAll('.n5-w,.n5-c,.n5-st')].filter(e=>{const r=document.createRange();r.selectNodeContents(e);const a=r.getBoundingClientRect(),q=e.getBoundingClientRect();return a.width>q.width+.5}).map(e=>e.className);
   const w=n.querySelector('.n5-w'),bb=w.querySelector('b');if(bb){const r=document.createRange();r.selectNodeContents(bb);o.gap=+(n.querySelector('.n5-c').getBoundingClientRect().left-r.getBoundingClientRect().right).toFixed(1);o.fs=getComputedStyle(bb).fontSize}return o});
 const r=await p.evaluate(()=>{const n=document.querySelector('#standings li.x2p-n5'),q=document.querySelectorAll('#standings li.lbr')[3].getBoundingClientRect(),z=n.getBoundingClientRect();return {x:0,y:q.top+scrollY-8,width:innerWidth,height:Math.ceil(z.bottom-q.top+16)}});
 await p.screenshot({path:OUT+id+'-'+W+'.png',clip:r,fullPage:true});console.log(id,W,JSON.stringify(m),errs.length?errs:'');await c.close()}
await b.close()})();
