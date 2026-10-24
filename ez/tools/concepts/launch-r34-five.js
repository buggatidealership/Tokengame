// Round 34, set B (owner, 2026-10-24): a fifth card in Current standings in place of the "As it stands" ticket, saying more models
// are coming, paid for by 31% of the creator fees. Shoots the real X2+ page (a local server on BASE, default 8899) with one option
// injected: launch-r34-five/_base.css + <id>.css, then _data.js + <id>.js (function bodies run in the page).
// usage: node launch-r34-five.js <id|now> [outdir] [widths]  ->  <id>-<w>.png (the standings section), <id>-<w>-flip.png, <id>.json
// <id>.json: the four rows before and after (they must not move or change size), --x2p-aiw, horizontal scroll, the new card's
// pieces outside its box or cut off, the lines each one-line text draws, and whether the ⓘ flip still turns and turns back.
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2]||'now',OUT=process.argv[3]||S+'r34f/',WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DIR=path.join(__dirname,'launch-r34-five');
const BASE=process.env.BASE||'http://127.0.0.1:8899/v46-live-x2plus.html';
const rd=f=>fs.existsSync(path.join(DIR,f))?fs.readFileSync(path.join(DIR,f),'utf8'):'';
const css=id==='now'?'':rd('_base.css')+'\n'+rd(id+'.css'),js=id==='now'?'':rd('_data.js')+'\n'+rd(id+'.js');
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
for(const W of WS){
 const ctx=await b.newContext(W<700?{viewport:{width:W,height:W<360?640:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(BASE,{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
 const rows=()=>p.evaluate(()=>{const st=document.getElementById('standings'),s=st.getBoundingClientRect();return {aiw:st.style.getPropertyValue('--x2p-aiw'),
   rows:[...st.querySelectorAll('li.lbr')].map(li=>{const r=li.getBoundingClientRect();return [r.left-s.left,r.top-s.top,r.width,r.height].map(v=>+v.toFixed(2)).join(',')})}});
 const before=await rows();
 if(id!=='now'){await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r34f';s.textContent=css;document.head.appendChild(s);(new Function(js))()},{css,js});
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700)}
 const after=await rows();
 const m=await p.evaluate(()=>{const st=document.getElementById('standings'),c=st.querySelector('.r34f-card');const out={hscroll:document.documentElement.scrollWidth>innerWidth+1};
   if(!c)return out;const cr=c.getBoundingClientRect();out.card=[cr.left,cr.width,cr.height].map(v=>+v.toFixed(1));
   const clip=[];c.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height||e.closest('.sr')||e.closest('svg[width="0"]'))return;if(getComputedStyle(e).visibility==='hidden')return;
     if(e.closest('[data-free]'))return;if(r.left<cr.left-.5||r.right>cr.right+.5||r.top<cr.top-.5||r.bottom>cr.bottom+.5)clip.push((e.getAttribute('class')||e.tagName)+' '+[r.left,r.right].map(v=>v.toFixed(1)).join('-')+' vs '+[cr.left,cr.right].map(v=>v.toFixed(1)).join('-'))});
   out.clip=clip.slice(0,6);out.clipN=clip.length;
   const cut=[];c.querySelectorAll('*').forEach(e=>{if(!(e instanceof HTMLElement)||e.closest('.sr'))return;const cs=getComputedStyle(e);if(cs.overflow==='visible'&&cs.textOverflow!=='ellipsis')return;if(e.scrollWidth>e.clientWidth+1)cut.push((e.className||e.tagName)+' '+e.scrollWidth+'/'+e.clientWidth)});out.cut=cut;
   // one-line texts (data-line) and the lines each draws
   out.lines=[...c.querySelectorAll('[data-line]')].map(e=>{const g=document.createRange();g.selectNodeContents(e);const t=[];[...g.getClientRects()].forEach(r=>{if(r.width&&!t.some(q=>Math.abs(q-r.top)<4))t.push(r.top)});return t.length+':'+e.textContent.trim().slice(0,40)+' @'+getComputedStyle(e).fontSize});
   out.text=c.innerText.replace(/\s+/g,' ').slice(0,400);const next=document.getElementById('record');out.gapToRecord=+(next.getBoundingClientRect().top-cr.bottom).toFixed(1);return out});
 m.rowsSame=JSON.stringify(before.rows)===JSON.stringify(after.rows);m.aiwSame=before.aiw===after.aiw;m.aiw=after.aiw;
 const sec=await p.$('#standings');await sec.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await sec.screenshot({path:OUT+id+'-'+W+'.png'});
 // the ⓘ flip: turns, the back fills the board, turns back
 try{await p.evaluate(()=>document.querySelector('#standings .x2p-flipbtn').click());await p.waitForTimeout(400);
   m.flip=await p.evaluate(()=>{const f=document.querySelector('#standings .x2p-flip'),bk=document.getElementById('x2pHow'),fin=f.querySelector('.x2p-fin');const a=bk.getBoundingClientRect(),z=fin.getBoundingClientRect();return {on:f.classList.contains('on'),backH:+a.height.toFixed(1),boardH:+z.height.toFixed(1),over:bk.scrollHeight>bk.clientHeight+1}});
   await (await p.$('#standings .x2p-flip')).screenshot({path:OUT+id+'-'+W+'-flip.png'});
   await p.evaluate(()=>document.querySelector('#standings .x2p-flipbtn').click());await p.waitForTimeout(400);m.flip.back=await p.evaluate(()=>!document.querySelector('#standings .x2p-flip').classList.contains('on'))}catch(e){m.flip='ERR '+e}
 m.errors=errs;res[W]=m;
 console.log(id,W,'rowsSame',m.rowsSame,'aiwSame',m.aiwSame,'hscroll',m.hscroll,'clip',m.clipN,'cut',(m.cut||[]).length,'flip',JSON.stringify(m.flip),'errs',errs.length,'\n   lines',JSON.stringify(m.lines||[]),'\n   card',JSON.stringify(m.card||''),'gap',m.gapToRecord);
 await ctx.close()}
fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));await b.close()})();
