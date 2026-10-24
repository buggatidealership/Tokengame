// Round 34, set C: tiny country flags on the standings tickets (owner, 2026-10-24). Shoots the real X2+ page (local server on 8897)
// with one option injected: launch-r34-flags/_flags.js, then <id>.css and <id>.js. usage: node launch-r34-flags.js [ids] [outdir]
// ids: comma list of now,o1,o2,o3,o4 (default all). Writes <id>-<w>.png (the board from its header to the last ticket),
// <id>-close.png (rows #1 and #4 at 4x on a 390px phone, i.e. twice a phone's pixels) and measures.json.
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const DIR=path.join(__dirname,'launch-r34-flags');
const ids=(process.argv[2]||'now,o1,o2,o3,o4').split(','),OUT=process.argv[3]||S+'r34g/out/';fs.mkdirSync(OUT,{recursive:true});
const common=fs.readFileSync(path.join(DIR,'_flags.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
const res={};
async function open(W,dpr){const ctx=await b.newContext(W<700?{viewport:{width:W,height:W<360?640:844},deviceScaleFactor:dpr||2,isMobile:true,hasTouch:true}:{viewport:{width:W,height:900},deviceScaleFactor:dpr||1});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
  return {ctx,p,errs}}
async function inject(p,id){if(id==='now')return;const css=fs.readFileSync(path.join(DIR,id+'.css'),'utf8'),js=fs.readFileSync(path.join(DIR,id+'.js'),'utf8');
  await p.evaluate(({common,css,js})=>{(new Function(common))();const s=document.createElement('style');s.textContent=css;document.head.appendChild(s);(new Function(js))()},{common,css,js});
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(350);await p.evaluate(()=>window.r34g&&r34g.aiw());await p.waitForTimeout(150)}
for(const id of ids){res[id]={};
 for(const W of [320,360,390,1280]){const {ctx,p,errs}=await open(W);await inject(p,id);
  await p.$eval('#standings .lbl',e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(300);
  const m=await p.evaluate(()=>{const st=document.querySelector('#standings.x2p-tix'),rows=[...st.querySelectorAll('li.lbr')],hdr=st.querySelector('.lbh');
   const R=e=>e.getBoundingClientRect(),c=r=>(r.left+r.right)/2;
   const out={hs:document.documentElement.scrollWidth>innerWidth+1,aiw:st.style.getPropertyValue('--x2p-aiw'),rows:[]};
   rows.forEach(li=>{const lr=R(li),l5=R(li.querySelector('.x2p-l5'));let right=0;
     li.querySelectorAll('.pc-t h3,.pc-t small,.pc-t .r34g-cc').forEach(t=>{const g=document.createRange();g.selectNodeContents(t);right=Math.max(right,g.getBoundingClientRect().right)});
     const f=li.querySelector('.r34g-f'),fr=f&&R(f),rk=R(li.querySelector('.rk'));let rkB=0;[...li.querySelector('.rk').children].forEach(k=>{const q=R(k);if(q.height&&getComputedStyle(k).position!=='absolute')rkB=Math.max(rkB,q.bottom)});
     const cc=li.querySelector('.r34g-cc');
     out.rows.push({name:(li.querySelector('.pc-t h3')||{}).textContent,clear:+(l5.left-right).toFixed(1),flag:fr?[+fr.width.toFixed(1),+fr.height.toFixed(1),+(fr.left-lr.left).toFixed(1),+(fr.top-lr.top).toFixed(1)]:null,
       flagInRow:fr?(fr.top>=lr.top+4&&fr.bottom<=lr.bottom-4):null,stubBottomGap:+(rk.bottom-rkB).toFixed(1),code:cc?[+R(cc).width.toFixed(1),+R(cc).height.toFixed(1)]:null})});
   const r0=rows[0],H=[...hdr.children].filter(x=>x.offsetWidth&&getComputedStyle(x).position!=='absolute');
   const pairs=[['.x2p-l5h','.x2p-l5'],[':nth-child(5)','.lb-c.roi'],[':nth-child(4)','.lb-c:not(.roi)']];
   out.labels=pairs.map(([h,v])=>{const he=hdr.querySelector(':scope>'+h),ve=r0.querySelector(':scope>'+v);return he&&ve?+(c(R(he))-c(R(ve))).toFixed(2):null});
   const top=R(hdr).top+scrollY-8,last=R(rows[rows.length-1]).bottom+scrollY+10,sr=R(st);
   out.clip={x:Math.max(0,sr.left-2),y:top,width:Math.min(innerWidth,sr.width+4),height:last-top};return out});
  m.errors=errs;res[id][W]=m;
  await p.screenshot({path:OUT+id+'-'+W+'.png',clip:m.clip,fullPage:true});
  await ctx.close()}
 // close-up: rows #1 and #4, the stub and the AI field, at twice a phone's pixels
 {const {ctx,p}=await open(390,4);await inject(p,id);await p.$eval('#standings .lbl',e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(300);
  const clips=await p.evaluate(()=>{const rows=[...document.querySelectorAll('#standings.x2p-tix li.lbr')];return [rows[0],rows[3]].map(li=>{const r=li.getBoundingClientRect(),l5=li.querySelector('.x2p-l5').getBoundingClientRect();return {x:r.left,y:r.top+scrollY,width:l5.right-r.left,height:r.height}})});
  for(let i=0;i<clips.length;i++)await p.screenshot({path:OUT+id+'-close'+(i?'4':'1')+'.png',clip:clips[i],fullPage:true});
  await ctx.close()}
 console.log(id,JSON.stringify(Object.fromEntries(Object.entries(res[id]).map(([w,m])=>[w,{hs:m.hs,aiw:m.aiw,labels:m.labels,errors:m.errors.length,rows:m.rows.map(r=>r.name+' clear '+r.clear+(r.flag?' flag '+r.flag.slice(0,2).join('x')+(r.flagInRow?'':' OUT'):'')+(r.code?' code '+r.code.join('x'):'')+' stubgap '+r.stubBottomGap)}]))))}
fs.writeFileSync(OUT+'measures.json',JSON.stringify(res,null,1));
await b.close()})();
