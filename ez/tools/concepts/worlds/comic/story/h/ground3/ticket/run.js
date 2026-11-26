// node run.js <outdir> <takes a,b,c> <widths 390,1280>   (start `python3 -m http.server 8941` in ez/ first)
// Lays a take of the painted proof ticket over the built X3+ page; shoots the Overview's P&L ticket and the Leaderboard's four views.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'a,b,c').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);
const BASE='tools/concepts/worlds/comic/story/h/ground3/ticket/';
const css=fs.readFileSync(__dirname+'/tk.css','utf8').replace(/@T@/g,'/'+BASE),js=fs.readFileSync(__dirname+'/tk.js','utf8');
async function open(b,W,t){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 await p.addStyleTag({content:css+'.x2p-cw{display:none!important}'});await p.evaluate(t=>{window.__TK={take:t,base:''}},t);await p.addScriptTag({content:js});await p.waitForTimeout(600);return {ctx,p,er}}
module.exports={open,css,js};
if(require.main===module)(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
for(const W of WS)for(const t of TS){const {ctx,p,er}=await open(b,W,t);
 const shot=async(sel,name)=>{const el=await p.$(sel);await el.scrollIntoViewIfNeeded();await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-60)},sel);await p.waitForTimeout(1600);
  const m=await p.evaluate(s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return {sw:document.documentElement.scrollWidth,h:Math.round(r.height)}},sel);
  await p.evaluate(()=>document.getAnimations().forEach(a=>{try{if(a.effect&&a.effect.getComputedTiming().iterations!==Infinity)a.finish()}catch(e){}}));await p.addStyleTag({content:'header.top{visibility:hidden!important}'});await el.screenshot({path:`${OUT}/${name}.png`});await p.addStyleTag({content:'header.top{visibility:visible!important}'});return m};
 const o=await shot('.tk-ov',`ov-${W}-${t}`);
 await p.evaluate(()=>{location.hash='#/leaderboard'});await p.waitForTimeout(2500);await p.evaluate(()=>window.__tkMount&&__tkMount());await p.waitForTimeout(500);
 const res=[];for(const v of ['pnl','acc','tgt','sec']){await p.evaluate(v=>{const b=document.querySelector(`.tk-lb [data-v="${v}"]`);b&&b.click()},v);await p.waitForTimeout(1500);res.push(await shot('.tk-lb',`lb-${W}-${t}-${v}`))}
 console.log(W,t,JSON.stringify(o),JSON.stringify(res),er.join('|')||'ok');await ctx.close()}
await b.close()})();
