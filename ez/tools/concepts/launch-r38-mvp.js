// Round 38 (owner, 2026-10-25): the MVP backs rewritten for "wow": rarity, odds, the competition, some sarcasm, in five printed formats
// (A tabloid, B betting slip, C ringside recap, D wire telegram, E case file), each laid over the real back of the three MVP cards
// (the Bullseye stack's top card, Tightest race, Biggest move). Every number comes from ROUNDS through launch-r38-mvp/_facts.js.
// usage: node launch-r38-mvp.js <ids,comma> <outdir/> [widths]   (id "now" shoots today's recap)
const fs=require('fs'),path=require('path');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const IDS=process.argv[2].split(','),OUT=process.argv[3],WS=(process.argv[4]||'390').split(',').map(Number),D=path.join(__dirname,'launch-r38-mvp');
const rd=f=>fs.existsSync(path.join(D,f))?fs.readFileSync(path.join(D,f),'utf8'):'';
const KINDS=[['bull',/bullseye/i],['tight',/tight/i],['big',/biggest/i]];
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
for(const W of WS){const c=await b.newContext(W<700?{viewport:{width:W,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:2,reducedMotion:'reduce'});
 const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(process.env.BASE||'http://127.0.0.1:8897/v46-live-x2plus.html');await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});
 await p.evaluate(()=>{const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Special+Elite&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,700;0,8..60,800;1,8..60,700&family=Pirata+One&display=block';document.head.appendChild(l)});
 await p.evaluate(async()=>{document.querySelector('#x2pHl').scrollIntoView({block:'center'});await document.fonts.ready;for(const f of ['16px "Special Elite"','16px "Source Serif 4"','italic 700 16px "Source Serif 4"','16px "Pirata One"'])await document.fonts.load(f)});await p.waitForTimeout(900);
 await p.evaluate(js=>{window.__r38H=[];(new Function(js))()},rd('_facts.js'));
 for(const id of IDS){
  if(id!=='now')await p.evaluate(({css,js})=>{const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(js))()},{css:rd('_base.css')+'\n'+rd(id+'.css'),js:rd(id+'.js')});
  for(const [k,re] of KINDS){
   const m=await p.evaluate(async({id,k,src})=>{const ws=[...document.querySelectorAll('#x2pHl .x2p-hi')];const i=ws.findIndex(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent));
     window.__x2pHlGo(i,true);await new Promise(r=>setTimeout(r,900));const w=ws[i],card=w.querySelector(':scope>.card.x2p-s0')||w.querySelector('.card'),face=card.querySelector('.face.back');
     document.querySelectorAll('.r38p').forEach(e=>e.remove());face.querySelectorAll('.fin').forEach(f=>f.style.visibility='');
     if(id==='now')return {};const C=window.__r38H.find(x=>x[0]===id)[1];const el=R38.over(face,C[k](),id);
     await document.fonts.ready;await new Promise(r=>setTimeout(r,200));const R=el.getBoundingClientRect(),over=[];
     el.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>R.right+.5||r.bottom>R.bottom+.5||r.left<R.left-.5)over.push((e.className||e.tagName)+' '+Math.round(r.right-R.right)+'/'+Math.round(r.bottom-R.bottom))});
     const rar=el.querySelector('.r38rar'),rr=rar&&rar.getBoundingClientRect(),hit=[];if(rr)el.querySelectorAll('p,.r38c,dl,.tp,.ft').forEach(e=>{const q=e.getBoundingClientRect();if(q.bottom>rr.top+1&&q.right>rr.left+1&&q.top<rr.bottom)hit.push(e.className||e.tagName)});
     return {w:Math.round(R.width),h:Math.round(R.height),over:over.slice(0,4),rarHit:hit}},{id,k,src:re.source});
   const el=await p.evaluateHandle(src=>[...document.querySelectorAll('#x2pHl .x2p-hi')].find(w=>new RegExp(src,'i').test(w.querySelector('.x2p-htag').textContent)),re.source);
   await el.screenshot({path:OUT+id+'-'+k+'-'+W+'.png'});console.log(id,k,W,JSON.stringify(m));}}
 console.log(W,'errors',errs.length?errs:0);await c.close()}
await b.close()})();
