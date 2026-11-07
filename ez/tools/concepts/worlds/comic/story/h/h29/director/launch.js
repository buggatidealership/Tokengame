// node launch.js <outdir> : (a) the after-launch state at 390: the sticky bar where it shows (a gutter in its band, scrolling up), and the end
// (bar gone, the CA whole with Copy, Buy $EZ); (b) the bet section in both caption wordings (main = the owner's words, alt = rule 9).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {load}=require('./_load.js');const fs=require('fs');
(async()=>{const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
 const go=async(after)=>{const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2});const p=await ctx.newPage();await FONTS(p);await load(p,{after});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(1200);await p.evaluate(()=>window.__h29d&&__h29d.fit());return p};
 const p=await go(()=>{window.__h29dLaunch=true});const res=[];
 const gt=await p.evaluate(()=>[...document.querySelectorAll('.h29-gutter')].filter(g=>g.getBoundingClientRect().height&&getComputedStyle(g).display!=='none').map(g=>Math.round(g.getBoundingClientRect().top+scrollY)));
 for(const [k,gi] of [['a',2],['b',4]]){const y=gt[gi]+8-(844-64);await p.evaluate(y=>scrollTo(0,y+40),y);await p.waitForTimeout(300);await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(900);
  const on=await p.evaluate(()=>{const b=window.__h29dBar;const n=window.__h29dNumIn&&__h29dNumIn();return {on:b.classList.contains('on'),num:n}});
  await p.screenshot({path:`${OUT}/L-${k}.png`});res.push({k,y,...on})}
 await p.evaluate(()=>scrollTo(0,document.documentElement.scrollHeight));await p.waitForTimeout(900);await p.screenshot({path:`${OUT}/L-c.png`});
 res.push({k:'c',on:await p.evaluate(()=>window.__h29dBar.classList.contains('on'))});
 for(const [k,after] of [['main',null],['rule',()=>{window.__h29dBet='rule'}]]){const q=k==='main'?p:await go(after);
  const r=await q.evaluate(()=>{const e=document.querySelector('#x2pSt');e.scrollIntoView();return true});await q.waitForTimeout(700);
  const box=await q.evaluate(()=>{const e=document.querySelector('.hb5')||document.querySelector('#x2pSt');const r=e.getBoundingClientRect();return {x:0,y:Math.max(0,r.top),width:390,height:Math.min(r.height,844-Math.max(0,r.top))}});
  await q.screenshot({path:`${OUT}/bet-${k}.png`,clip:box})}
 console.log(JSON.stringify(res));await b.close()})();
