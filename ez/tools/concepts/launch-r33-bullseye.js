// Round 33 mockups (owner, 2026-10-24): a fourth kind of Memorable prediction for bullseyes ("how many bullseyes... becomes part of
// the competition", "when they're right... how well on average", "within the range type of streak"; Tesla, Grok 0.02% off).
// Shoots the real X2+ page (local server on 8897) with one option injected: launch-r33-bullseye/common.css + <id>.css, and
// common.js + <id>.js (function bodies run after load; the option sets window.__r33cfg = {tag:'<the new card's tag>'}).
// usage: node launch-r33-bullseye.js <id> [outdir] -> <id>-390.png (the section as a visitor sees it, landed on the new card),
//   <id>-390-back.png (the new card turned), <id>-320.png, <id>-1280.png, <id>-1280-back.png, <id>.json (card sizes against the
//   record card, anything clipped or overflowing on the new card, horizontal scroll, errors)
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const id=process.argv[2],OUT=process.argv[3]||S+'r33a/out/',DIR=path.join(__dirname,'launch-r33-bullseye');
const rd=f=>fs.existsSync(path.join(DIR,f))?fs.readFileSync(path.join(DIR,f),'utf8'):'';
const css=rd('common.css')+'\n'+rd(id+'.css'),js=rd('common.js')+'\n;(function(){'+rd(id+'.js')+'\n})();';
fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
const sizes=[['390',{viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}],
             ['320',{viewport:{width:320,height:640},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}],
             ['1280',{viewport:{width:1280,height:900},deviceScaleFactor:1,reducedMotion:'reduce'}]];
for(const [W,opt] of sizes){
 const ctx=await b.newContext(opt);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
 await p.evaluate(()=>{const t=document.querySelector('#standings .x2p-ast .tk');const bi=t?getComputedStyle(t).backgroundImage:'';const m=bi.match(/url\("data:image\/svg\+xml[^"]*"\)/);
   if(m)document.documentElement.style.setProperty('--r33-paper',m[0])});
 const inj=await p.evaluate(({css,js})=>{try{const s=document.createElement('style');s.id='r33';s.textContent=css;document.head.appendChild(s);(new Function(js))();return 'ok'}catch(e){return String(e.stack||e)}},{css,js});
 if(inj!=='ok')errs.push('inject: '+inj);
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
 await p.$eval('#highlights',e=>e.scrollIntoView({block:'start'}));await p.waitForTimeout(500);
 const cfg=await p.evaluate(()=>window.__r33cfg||{});
 /* the page lands its highlights on Tightest race once they are on screen, which can come after ours: land until the new card is
    the centred one */
 /* (the page's own go() and near() measure offsetLeft from the positioned ancestor, not the track: from 760px they centre one card
    and light another, live too. For these shots the harness centres the card by its real position and lights it.) */
 const landOn=async t=>{for(let i=0;i<6;i++){await p.evaluate(t=>{window.__r33&&window.__r33.land(t,false)},t);await p.waitForTimeout(500);
   await p.evaluate(t=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),ws=[...tr.children],w=ws.find(w=>w.querySelector('.x2p-htag').textContent===t);if(!w)return;
     const a=tr.getBoundingClientRect(),r=w.getBoundingClientRect();tr.scrollLeft+=r.left+r.width/2-(a.left+a.width/2)},t);await p.waitForTimeout(500);
   await p.evaluate(t=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),ws=[...tr.children],k=ws.findIndex(w=>w.querySelector('.x2p-htag').textContent===t);
     ws.forEach((w,i)=>{w.classList.toggle('on',i===k);w.classList.toggle('r33-on',i===k)});[...document.querySelectorAll('#x2pHl .x2p-hld button')].forEach((d,i)=>d.classList.toggle('on',i===k));
     /* a full-page shot resizes the window for a moment and the page's handler lights its own pick again: pin the lit card */
     tr.classList.add('r33-fix');if(!document.getElementById('r33fix')){const st=document.createElement('style');st.id='r33fix';
       st.textContent='html.x2p #x2pHl .x2p-hlt.r33-fix .x2p-hi{opacity:.5!important}html.x2p #x2pHl .x2p-hlt.r33-fix .x2p-hi.r33-on{opacity:1!important}';document.head.appendChild(st)}},t);
   if(await p.evaluate(t=>{const tr=document.querySelector('#x2pHl .x2p-hlt'),a=tr.getBoundingClientRect(),o=document.querySelector('#x2pHl .x2p-hi.on'),r=o&&o.getBoundingClientRect();
     return !!o&&o.querySelector('.x2p-htag').textContent===t&&Math.abs(r.left+r.width/2-(a.left+a.width/2))<2},t))return true}return false};
 const landed=await landOn(cfg.tag);if(!landed)errs.push('could not land on '+cfg.tag);
 const meas=async(tg)=>p.evaluate(tag=>{const q=s=>document.querySelector(s);const rc=q('#record .card').getBoundingClientRect();
   const hl=[...document.querySelectorAll('#x2pHl .x2p-hi')].map(w=>{const c=w.querySelector(':scope>.card').getBoundingClientRect();return {tag:w.querySelector('.x2p-htag').textContent,w:+c.width.toFixed(3),h:+c.height.toFixed(3)}});
   const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>w.querySelector('.x2p-htag').textContent===tag);const issues=[];
   if(w){const card=w.querySelector(':scope>.card'),cr=card.getBoundingClientRect();
     card.querySelectorAll('.face').forEach(f=>{const side=f.classList.contains('back')?'back':'front';if(getComputedStyle(f).visibility==='hidden')return;
       f.querySelectorAll('.fin, .fin *').forEach(e=>{const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||e.closest('[hidden]')||e.closest('.ctop'))return;const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
         /* every existing card's front .fin runs a few pixels over (its hidden title bar): only more than the first card's counts */
         const base=(()=>{const t=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>/tightest/i.test(w.querySelector('.x2p-htag').textContent)),o=t&&t.querySelector(':scope>.card .face.'+side+' .fin');return o?o.scrollHeight-o.clientHeight:0})();
         if(e.classList.contains('fin')&&e.scrollHeight-e.clientHeight>Math.max(1,base)+1)issues.push(side+': .fin content '+e.scrollHeight+' > '+e.clientHeight+' (existing cards: +'+base+')');
         if(r.right>cr.right+.5||r.left<cr.left-.5||r.bottom>cr.bottom+.5)issues.push(side+': '+(e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' outside the card');
         if(!(e instanceof SVGElement)&&(cs.whiteSpace==='nowrap'||cs.overflow==='hidden')&&e.scrollWidth>e.clientWidth+1&&e.children.length===0)issues.push(side+': clipped text "'+e.textContent.trim().slice(0,30)+'"')})})}
   const tagEl=w&&w.querySelector('.x2p-htag'),tr=tagEl&&tagEl.getBoundingClientRect();
   return {record:{w:+rc.width.toFixed(3),h:+rc.height.toFixed(3)},cards:hl,equal:hl.every(c=>Math.abs(c.w-rc.width)<.01&&Math.abs(c.h-rc.height)<.01),
     issues:[...new Set(issues)].slice(0,12),tagInView:tr?tr.left>=0&&tr.right<=innerWidth:null,hscroll:document.documentElement.scrollWidth>innerWidth+1,err:window.__r33err||null}},tg||cfg.tag);
 const m=await meas();
 const clip=await p.evaluate(()=>{const s=document.querySelector('#highlights').getBoundingClientRect(),h=document.querySelector('#x2pHl').getBoundingClientRect();return {x:0,y:Math.round(s.top+scrollY),width:innerWidth,height:Math.round(h.bottom-s.top+8)}});
 await p.screenshot({path:OUT+id+'-'+W+'.png',clip,fullPage:true});
 if(W!=='320'){await p.evaluate(t=>{const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>w.querySelector('.x2p-htag').textContent===t);const c=w&&w.querySelector(':scope>.card');if(c&&!c.classList.contains('flipped'))c.click()},cfg.tag);
   await p.waitForTimeout(900);m.back=await meas();
   const cc=await p.evaluate(t=>{const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>w.querySelector('.x2p-htag').textContent===t);const r=w.getBoundingClientRect(),c=w.querySelector(':scope>.card').getBoundingClientRect();return {x:Math.max(0,Math.round(r.left-14)),y:Math.round(r.top+scrollY-24),width:Math.round(r.width+28),height:Math.round(c.bottom-r.top+40)}},cfg.tag);
   await p.screenshot({path:OUT+id+'-'+W+'-back.png',clip:cc,fullPage:true})}
 /* a second new card (option 3's streak): its front in the carousel and its back */
 if(cfg.also){await p.evaluate(()=>{const c=document.querySelector('#x2pHl .x2p-hi .card.flipped');if(c)c.click()});if(!await landOn(cfg.also))errs.push('could not land on '+cfg.also);
   const cl2=await p.evaluate(()=>{const h=document.querySelector('#x2pHl').getBoundingClientRect();return {x:0,y:Math.round(h.top+scrollY),width:innerWidth,height:Math.round(h.height)}});
   await p.screenshot({path:OUT+id+'-'+W+'-also.png',clip:cl2,fullPage:true});
   await p.evaluate(t=>{const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>w.querySelector('.x2p-htag').textContent===t);const c=w&&w.querySelector(':scope>.card');if(c&&!c.classList.contains('flipped'))c.click()},cfg.also);
   await p.waitForTimeout(900);m.alsoBack=await meas(cfg.also);
   const cc=await p.evaluate(t=>{const w=[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>w.querySelector('.x2p-htag').textContent===t);const r=w.getBoundingClientRect(),c=w.querySelector(':scope>.card').getBoundingClientRect();return {x:Math.max(0,Math.round(r.left-14)),y:Math.round(r.top+scrollY-24),width:Math.round(r.width+28),height:Math.round(c.bottom-r.top+40)}},cfg.also);
   await p.screenshot({path:OUT+id+'-'+W+'-also-back.png',clip:cc,fullPage:true})}
 m.errors=errs;res[W]=m;await ctx.close()}
fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));
for(const W in res){const r=res[W];console.log(id,W,r.alsoBack?'also-back '+JSON.stringify(r.alsoBack.issues):'','equal',r.equal,'rec',r.record.w+'x'+r.record.h,'hscroll',r.hscroll,'issues',JSON.stringify(r.issues),'back',r.back?JSON.stringify(r.back.issues)+' eq '+r.back.equal:'-','errs',JSON.stringify(r.errors))}
await b.close()})();
