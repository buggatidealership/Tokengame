// Round 40 (owner, 2026-10-25): the record cards' stats side as a stamp of approval; 3 options on today's content (s1-s3), 5 carte
// blanche (c1-c5); the label's result line as the headline in all. Shoots the real X2+ page, round 43 (Bloom Energy) by default.
// usage: node launch-r40-recback.js <ids,comma> <outdir/> [widths] [round]   (id "now" = today's back; "lab" = today's + the new label)
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const IDS=process.argv[2].split(','),OUT=process.argv[3],WS=(process.argv[4]||'390').split(',').map(Number),N=+(process.argv[5]||43),D=path.join(__dirname,'launch-r40-recback');
const rd=f=>fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'';
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
for(const W of WS)for(const id of IDS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:+(process.env.DSF||2),isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:+(process.env.DSF||2),reducedMotion:'reduce'});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Special+Elite&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;0,8..60,900;1,8..60,400&family=Pirata+One&family=Caveat:wght@600;700&display=block';document.head.appendChild(l)});
 await p.evaluate(async N=>{window.R40N=N;const c=document.querySelector('#record .card[data-n="'+N+'"]');c.scrollIntoView({block:'center',inline:'center'});await new Promise(r=>setTimeout(r,900));
   if(!c.classList.contains('cur')){c.click();await new Promise(r=>setTimeout(r,900))}if(!c.classList.contains('flipped')){c.click();await new Promise(r=>setTimeout(r,1100))}
   await document.fonts.ready;for(const f of ['16px "Special Elite"','16px "Source Serif 4"','16px "Pirata One"','700 16px Caveat'])await document.fonts.load(f)},N);
 if(id!=='now'){await p.evaluate(({css,base,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(base))();const D=R40.data(R40.N);R40.label(D);window.__r40D=D;if(js)(new Function(js))()},{css:rd('_base.css')+'\n'+rd(id+'.css'),base:rd('_base.js')+'\n'+rd('_rows.js')+'\nwindow.R40rows=R40rows;\n'+rd('_r48.js')+'\n'+rd('_r49.js')+'\n'+rd('_r50.js'),js:id==='lab'?'':rd(id+'.js')});await p.waitForTimeout(500)}
 const m=await p.evaluate(()=>{const el=document.querySelector('.r40p'),c=document.querySelector('#record .card[data-n="'+(window.R40N||43)+'"]'),lab=c.querySelector('.face.back .zlab'),w=lab&&lab.querySelector('.zwhy');
   const o={flipped:c.classList.contains('flipped'),card:Math.round(c.getBoundingClientRect().height),why:w?Math.round(w.scrollWidth)+'/'+Math.round(w.clientWidth):''};if(!el)return o;const R=el.getBoundingClientRect(),over=[];
   el.querySelectorAll('*').forEach(e=>{if(e.closest('svg'))return;const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5)over.push((e.className||e.tagName)+' '+Math.round(r.right-R.right)+'/'+Math.round(r.bottom-R.bottom))});
   o.w=Math.round(R.width);o.h=Math.round(R.height);o.over=over.slice(0,5);return o});
 const el=await p.$('#record .card[data-n="'+N+'"]');await el.screenshot({path:OUT+id+'-'+W+'.png'});console.log(id,W,JSON.stringify(m),errs.length?errs:'');await c.close()}
await b.close()})();
