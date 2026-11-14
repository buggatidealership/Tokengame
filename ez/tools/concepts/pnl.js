/* P&L round (owner, 2026-10-26: a trading competition between AIs, for pump.fun traders): standings as a P&L board, the proof's
   P&L / Accuracy / Sector tabs, the MVP backs with P&L. node pnl.js std|proof|mvp [widths] -> scratchpad/pnl/ */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const D=__dirname+'/pnl/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/pnl/';fs.mkdirSync(S,{recursive:true});
const rd=f=>fs.readFileSync(D+f,'utf8'),mode=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);
async function page(b,W){const c=await b.newContext({viewport:{width:W,height:W>760?1000:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.waitForTimeout(1200);return p}
async function inj(p,css,js,pre){await p.evaluate(([css,js,pre])=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(0,eval)(pre||'');(0,eval)(js)},[css,js,pre]);await p.waitForTimeout(500)}
async function over(p,sel){return p.evaluate(sel=>{const R=document.querySelector(sel).getBoundingClientRect(),o=[];document.querySelectorAll(sel+' .pn-rec,'+sel+' .lb-c,'+sel+' .pt-r>*,'+sel+' .pn,'+sel+' .pn *').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&(q.right>R.right+.5||q.left<R.left-.5))o.push(e.className);if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')o.push('clip '+e.className)});return o.slice(0,5)},sel)}
(async()=>{const b=await chromium.launch();
 for(const W of WS){
  if(mode==='std')for(const id of ['now','SA','SB']){const p=await page(b,W);
    if(id!=='now')await inj(p,rd('std.css'),rd('_sim.js')+'\n'+(id==='SB'?rd('SB.js')+'\n':'')+rd('SA.js'));
    await p.evaluate(()=>document.querySelector('#standings').scrollIntoView());await p.waitForTimeout(500);
    console.log(id,W,JSON.stringify(await over(p,'#standings')),p.errs.join('|'));await (await p.$('#standings')).screenshot({path:S+'std-'+id+'-'+W+'.png'});await p.context().close()}
  if(mode==='proof')for(const id of ['now','PA']){const p=await page(b,W);const css=rd('proof.css');
    await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForTimeout(800);
    for(const tab of ['roi','hit','sector']){await p.evaluate(t=>document.querySelector('#learn button[data-pt='+t+']').click(),tab);await p.waitForTimeout(900);
      if(id==='PA'){if(tab==='roi')await inj(p,css,rd('_sim.js')+'\n'+rd('PA.js'));else await p.evaluate(()=>document.querySelectorAll('#learn button[data-pt]').forEach(b=>{b.textContent={roi:'P&L',hit:'Accuracy'}[b.getAttribute('data-pt')]||b.textContent}));if(tab==='sector')await inj(p,'',rd('PS.js'),'window.__pnSec="g"')}
      const el=await p.$('#learn .x2p-pt')||await p.$('#learn');console.log(id,tab,W,JSON.stringify(await over(p,'#learn')),p.errs.join('|'));await el.screenshot({path:S+'proof-'+id+'-'+tab+'-'+W+'.png'})}
    if(id==='PA'){await p.evaluate(()=>{const l=document.querySelector('#learn');l.classList.remove('pn-g');l.classList.add('pn-c')});await p.waitForTimeout(300);await (await p.$('#learn .x2p-pt')||await p.$('#learn')).screenshot({path:S+'proof-PC-sector-'+W+'.png'})}
    await p.context().close()}
  if(mode==='mvp')for(const id of ['now','M1','M2','M3']){const p=await page(b,W);
    await p.evaluate(()=>document.querySelector('#x2pHl').scrollIntoView({block:'center'}));await p.waitForTimeout(800);
    if(id!=='now')await inj(p,rd('mvp.css'),rd('_sim.js')+'\n'+rd('mvp.js'),'window.__pm="'+id+'"');await p.evaluate(()=>window.dispatchEvent(new Event('resize')));await p.waitForTimeout(700);
    for(const [k,src] of [['bull','bullseye'],['tight','tight'],['big','biggest']]){
      const m=await p.evaluate(async src=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')];const i=ws.findIndex(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent));window.__x2pHlGo(i,true);await new Promise(r=>setTimeout(r,900));
        const w=ws[i],card=w.querySelector(':scope>.card.x2p-s0')||w.querySelector('.card');card.classList.add('flipped');await new Promise(r=>setTimeout(r,700));const back=card.querySelector('.face.back'),R=back.getBoundingClientRect(),o=[];
        back.querySelectorAll('.x2p-rc *').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&(q.bottom>R.bottom+.5||q.right>R.right+.5))o.push(e.className||e.tagName)});return o.slice(0,4)},src);
      const el=await p.evaluateHandle(src=>[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent)),src);
      await el.screenshot({path:S+'mvp-'+id+'-'+k+'-'+W+'.png'});console.log(id,k,W,JSON.stringify(m),p.errs.join('|'))}
    await p.context().close()}}
 await b.close()})();
