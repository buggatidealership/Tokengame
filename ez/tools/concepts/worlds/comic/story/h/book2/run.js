// node run.js <out> <takes now,a,b,c> [widths 390,1280] : mounts a book2 take over the built X3+ page and shoots five moments:
// 1 the cover, 2 the cover opening (half way), 3 the first spread (open), 4 a chapter turn (ch1 > ch2, boundary at 55%), 5 inside a chapter (header and tabs)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,a,b,c').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8961;
async function open(b,t,W,opt){const H=W<600?844:800;const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2)},opt||{}));const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(800);
  if(t!=='now'){await p.addStyleTag({content:rd('_b2.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_b2.js')+';'+rd(t+'.js')+`;B2.mount(${JSON.stringify(t)})`});await p.waitForFunction(()=>document.documentElement.classList.contains('b2-ready'),null,{timeout:20000})}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>Promise.race([new Promise(r=>setTimeout(r,8000)),Promise.all([...document.querySelectorAll('.b2-cv img,.b2-stage img,img')].filter(i=>!i.complete&&i.loading!=='lazy').slice(0,30).map(i=>new Promise(r=>{i.onload=i.onerror=r})))]));
  await p.waitForTimeout(1200);return {ctx,p,er,H}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const {ctx,p,er,H}=await open(b,t,W);
  const pos=await p.evaluate(()=>{const st=document.querySelector('.b2-stage');const ch=[...document.querySelectorAll('#wc-book > section')].filter(s=>getComputedStyle(s).display!=='none');
    const top=e=>e.getBoundingClientRect().top+scrollY;const run=st?st.offsetHeight-innerHeight:innerHeight*.6;
    const c1=document.querySelector('.b2-ch[data-ch="1"]')||ch[1],c2=document.querySelector('.b2-ch[data-ch="2"]')||ch[2];
    return {open:(st?top(st):0)+run*.4,done:(st?top(st):0)+run*1,turn:(()=>{const d=c2.previousElementSibling;if(d&&/b2b-door|b2c-gut/.test(d.className))return top(d)+(d.offsetHeight-innerHeight)*.45+(/gut/.test(d.className)?-innerHeight*.25:0);return top(c2)-innerHeight*.55})(),inside:top(c2)+innerHeight*.35,c1:top(c1)}});
  const shots=[['1cover',0],['2opening',pos.open],['3spread',pos.done],['4turn',pos.turn],['5inside',pos.inside]];
  const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth,b2:window.__b2}));
  for(const [k,y] of shots){await p.evaluate(y=>{scrollTo({top:y,behavior:'instant'});dispatchEvent(new Event('scroll'))},Math.round(y));await p.waitForTimeout(1600);
   await p.screenshot({path:`${OUT}/${t}-${W}-${k}.png`})}
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
