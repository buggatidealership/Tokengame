// node shot.js <out> [takes a,b,c,d,e] [widths 390,1280] : each take at the cover, mid-opening and open; prints checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'a,b,c,d,e').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);if(OUT)fs.mkdirSync(OUT,{recursive:true});
const PORT=process.env.PORT||8962,DIR='/tools/concepts/worlds/comic/story/h/cover6/';
async function open(b,t,W,opt){const H=W<600?844:800;const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)},opt||{}));const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}${DIR}take.html?t=${t}`,{waitUntil:'load'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);await p.evaluate(()=>dispatchEvent(new Event('resize')));await p.waitForTimeout(300);return {ctx,p,er,H}}
module.exports={open};
const at=(p,f)=>p.evaluate(f=>{const st=document.getElementById('stage');scrollTo({top:st.offsetTop+(st.offsetHeight-innerHeight)*f,behavior:'instant'});dispatchEvent(new Event('scroll'))},f);
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const {ctx,p,er}=await open(b,t,W);
  for(const [k,f] of [['1cover',0],['2open',.42],['3inside',1]]){await at(p,f);await p.waitForTimeout(k=='1cover'?2300:700);await p.screenshot({path:`${OUT}/${t}-${W}-${k}.png`})}
  const m=await p.evaluate(()=>{const bad=[];for(const e of document.querySelectorAll('.it')){if(e.matches('.film,.cut,.tape,.curl'))continue;const half=e.closest('.half');if(half)continue;
     if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)bad.push(e.textContent.trim().slice(0,30)+' '+(e.scrollWidth-e.clientWidth)+'x'+(e.scrollHeight-e.clientHeight));
     const fs=parseFloat(getComputedStyle(e).fontSize);if(fs<9&&e.closest('.scene'))bad.push('small '+fs.toFixed(1)+'px: '+e.textContent.trim().slice(0,24))}
   return {sw:document.documentElement.scrollWidth,vw:innerWidth,bad}});
  console.log(W,t,'sideways',m.sw>m.vw,JSON.stringify(m.bad),er.join('|')||'ok');await ctx.close()}
 await b.close()})();
