// node rec.js <outdir> <take> : records the Leaderboard ticket at 390x844 switching P&L -> Accuracy -> Target hits -> Sector -> P&L (webm)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const {css,js}=require('./run.js');const fs=require('fs');
(async()=>{const OUT=process.argv[2],t=process.argv[3];fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,recordVideo:{dir:OUT+'/v-'+t,size:{width:390,height:844}}});const p=await ctx.newPage();await FONTS(p);
await p.goto('http://localhost:8941/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2000);
await p.addStyleTag({content:css+'.x2p-cw,header.top{display:none!important}'});await p.evaluate(t=>{window.__TK={take:t,base:''}},t);await p.addScriptTag({content:js});
await p.evaluate(()=>{const e=document.querySelector('.tk-lb');scrollTo(0,e.getBoundingClientRect().top+scrollY-(innerHeight-e.offsetHeight)/2-20)});
await p.waitForTimeout(2600);for(const v of ['acc','tgt','sec','pnl']){await p.click(`.tk-lb [data-v="${v}"]`);await p.waitForTimeout(2100)}
await ctx.close();await b.close()})();
