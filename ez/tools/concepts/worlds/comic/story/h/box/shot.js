// node shot.js <outdir> [styles ink,logo] [widths 390,1280] [opts a,b,c] : frames of the whole path + checks (every word's surface, overflow, sideways scroll, errors)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SS=(process.argv[3]||'ink,logo').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),OS=(process.argv[5]||'a,b,c').split(',');if(OUT&&require.main===module)fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8971,DIR='/tools/concepts/worlds/comic/story/h/box/';
async function open(b,s,o,W,opt){const H=W<600?844:800;const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)},opt||{}));const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
 await p.goto(`http://localhost:${PORT}${DIR}box.html?s=${s}&o=${o}`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
 await p.evaluate(()=>Promise.all([...document.querySelectorAll('video')].filter(v=>!v.classList.contains('film')).map(v=>v.readyState>=1?0:new Promise(r=>{v.onloadedmetadata=r;setTimeout(r,4000)}))));return {ctx,p,er,H}}
module.exports={open};
const sec=(p,sel,f)=>p.evaluate(([sel,f])=>{const s=document.querySelector(sel);scrollTo({top:s.offsetTop+(s.offsetHeight-innerHeight)*f,behavior:'instant'});dispatchEvent(new Event('scroll'))},[sel,f]);
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const s of SS){for(const o of OS){const {ctx,p,er}=await open(b,s,o,W);const pre=`${OUT}/${s}-${W}`;
  if(o==='a'){for(const [k,f] of [['1cover',0],['2taking',.5],['3taken',1]]){await sec(p,'.cover',f);await p.waitForTimeout(900);await p.screenshot({path:`${pre}-${k}.png`})}}
  // the loop: every object closed, then opened (video skipped to its end state)
  const objs=await p.$$('.obj');for(let i=0;i<objs.length;i++){if(o!=='a'&&i<3)continue;await p.evaluate(i=>{const f=document.querySelectorAll('.obj')[i];scrollTo({top:f.getBoundingClientRect().top+scrollY-64,behavior:'instant'})},i);await p.waitForTimeout(250);await objs[i].screenshot({path:`${pre}-${o}-obj${i+1}-closed.png`});
    await p.evaluate(i=>{const f=document.querySelectorAll('.obj')[i];f.classList.add('open')},i);await p.waitForTimeout(700);await objs[i].screenshot({path:`${pre}-${o}-obj${i+1}-open.png`})}
  if(o==='a'){for(const [k,f] of [['4doors',0],['5opening',.4],['6open',1]]){await sec(p,'.cinema',f);await p.waitForTimeout(900);await p.screenshot({path:`${pre}-${k}.png`})}}
  const m=await p.evaluate(()=>{const bad=[],inv=[];document.querySelectorAll('.obj').forEach(f=>f.classList.add('open'));document.querySelector('.cinema').classList.add('open');
    for(const e of document.querySelectorAll('.it')){const fs=parseFloat(getComputedStyle(e).fontSize);inv.push(`${e.textContent.trim()} -> ${e.dataset.on} (${fs.toFixed(1)}px)`);
     if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)bad.push('overflow '+e.textContent.trim().slice(0,30));if(fs<9)bad.push('small '+fs.toFixed(1)+'px: '+e.textContent.trim().slice(0,30))}
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,bad,inv}});
  fs.writeFileSync(`${pre}-${o}-inv.txt`,m.inv.join('\n'));console.log(W,s,o,'sideways',m.sw>m.vw,JSON.stringify(m.bad),er.join('|')||'ok');await ctx.close()}}
 await b.close()})();
