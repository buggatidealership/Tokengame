/* MVP backs with money in place of the four call chips (owner, 2026-10-26). node mvp-money.js [ids] -> scratchpad/mm/
   ids: now (today's back), A, B, C, D (see mvp-money/money.js). Shoots the three slots (Bullseye top card, Tightest race, Biggest move)
   turned to the story side at 360, 390 and 1280px, and reports anything that overflows the back or overlaps another block. */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const D=__dirname+'/mvp-money/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/mm/';fs.mkdirSync(S,{recursive:true});
const IDS=(process.argv[2]||'now,A,B,C,D').split(','),KINDS=[['bull','bullseye'],['tight','tight'],['big','biggest']];
(async()=>{const b=await chromium.launch();
 for(const W of (process.env.WS||'390,360,1280').split(',').map(Number))for(const id of IDS){
  const c=await b.newContext({viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
  await p.evaluate(()=>document.querySelector('#x2pHl').scrollIntoView({block:'center'}));await p.waitForTimeout(1200);
  if(id!=='now')await p.evaluate(([css,js,id])=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);window.__mm=id;(0,eval)(js)},[fs.readFileSync(D+'money.css','utf8'),fs.readFileSync(D+'money.js','utf8'),id]);
  /* let the page's own fitting (eqH) run again with the new block in */
  await p.evaluate(()=>window.dispatchEvent(new Event('resize')));await p.waitForTimeout(700);
  for(const [k,src] of KINDS){
   const m=await p.evaluate(async src=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')];const i=ws.findIndex(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent));
     window.__x2pHlGo(i,true);await new Promise(r=>setTimeout(r,900));const w=ws[i],card=w.querySelector(':scope>.card.x2p-s0')||w.querySelector('.card');card.classList.add('flipped');await new Promise(r=>setTimeout(r,700));
     const back=card.querySelector('.face.back'),R=back.getBoundingClientRect(),o=[];const blocks=[...back.querySelectorAll('.x2p-rc>*')];
     back.querySelectorAll('.x2p-rc *').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.bottom>R.bottom+.5||q.right>R.right+.5)o.push('out '+(e.className||e.tagName))});
     for(let a=0;a<blocks.length;a++)for(let z=a+1;z<blocks.length;z++){const A=blocks[a].getBoundingClientRect(),B=blocks[z].getBoundingClientRect();if(A.height&&B.height&&A.bottom>B.top+.5&&B.bottom>A.top+.5&&A.right>B.left&&B.right>A.left)o.push('overlap '+blocks[a].className+' / '+blocks[z].className+' '+(A.bottom-B.top).toFixed(1))}
     const st=back.querySelector('.x2p-hw p');return {o:o.slice(0,6),story:st&&getComputedStyle(st).fontSize}},src);
   const el=await p.evaluateHandle(src=>[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent)),src);
   await el.screenshot({path:S+id+'-'+k+'-'+W+'.png'});console.log(id,k,W,JSON.stringify(m))}
  if(errs.length)console.log('errors',errs);await c.close()}
 await b.close()})();
