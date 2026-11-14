// node zoom.js <out dir> [take ink] [W 390]: 3x close-ups of the lettering, a title, the cuts and the page turn, for the letter-by-letter check
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs');
const OUT=process.argv[2],T=process.argv[3]||'ink',W=+(process.argv[4]||390);fs.mkdirSync(OUT,{recursive:true});
const Z=[['head','.cvx.c2 .c2-mh',0,0],['mtitle','.wc-chars > .cb-ttl',0,0],['turn','.cb-turn',40,40],['gut','.cb-gut',60,60],['tear','.wc-splash',30,-1],['diag','.wc-bet',70,-1],['back','.wc-back .wc-motto',10,10]];
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p}=await open(b,W,'full',{dpr:3,take:T});
 for(const [nm,sel,above,below] of Z){const n=await p.evaluate(([s,a])=>{const e=document.querySelector(s);if(!e)return 0;scrollTo(0,e.getBoundingClientRect().top+scrollY-a-60);return 1},[sel,above]);if(!n)continue;await p.waitForTimeout(500);
  const bb=await p.evaluate(([s,a,bl])=>{const r=document.querySelector(s).getBoundingClientRect();const h=bl<0?Math.min(220,r.height):r.height+bl;return {x:0,y:Math.max(0,r.top-a),width:innerWidth,height:Math.min(innerHeight-Math.max(0,r.top-a),h+a)}},[sel,above,below]);
  await p.screenshot({path:`${OUT}/${nm}.png`,clip:bb})}
 await b.close()})();
