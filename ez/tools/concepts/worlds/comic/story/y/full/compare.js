// node compare.js <out dir> [takes now,ink,cut,press,screen] [W 390] [dpr 3]: close-ups of the inner elements, today and each take
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,ink,cut,press,screen').split(','),W=+(process.argv[4]||390),DPR=+(process.argv[5]||3);fs.mkdirSync(OUT,{recursive:true});
/* each crop: a selector for today and one for the book, and an optional max height */
const CROPS=[['cover','.sh-grid','.cvx.c2 .c2-ra',0],['card','.pp1-c.pp1-r1 .pp1-cap','.pp1-c.pp1-r1 .pp1-cap',0],['badge','.pp1-c.pp1-r1 .pp1-top','.pp1-c.pp1-r1 .pp1-top',0],
  ['tiles','.wc-season .wc-bis','.wc-season .wc-bis',0.34],['bet','.wc-bet .wc-bet-l','.wc-bet .wc-bet-l',0],['tabs','header.top','header.top',0]];
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 for(const t of TS){const {p,er}=await open(b,W,t==='now'?'now':'full',{dpr:DPR,take:t});
  for(const [nm,s0,s1,frac] of CROPS){const sel=t==='now'?s0:s1;const ok=await p.evaluate(s=>{const e=document.querySelector(s);if(!e)return false;scrollTo(0,e.getBoundingClientRect().top+scrollY-(s==='header.top'?0:90));return true},sel);if(!ok){console.log('missing',t,nm);continue}
   await p.waitForTimeout(500);const bb=await p.evaluate(([s,f])=>{const r=document.querySelector(s).getBoundingClientRect();const h=f?r.height*f:r.height;return {x:Math.max(0,r.left-8),y:Math.max(0,r.top-8),width:Math.min(innerWidth-Math.max(0,r.left-8),r.width+16),height:Math.min(innerHeight-Math.max(0,r.top-8),h+16)}},[sel,frac]);
   await p.screenshot({path:`${OUT}/${nm}-${t}.png`,clip:bb})}
  console.log(t,er.join('|')||'ok');await p.close()}
 await b.close()})();
