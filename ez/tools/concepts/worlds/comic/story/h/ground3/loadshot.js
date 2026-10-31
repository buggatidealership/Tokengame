// node loadshot.js <out> now,h,s,c 390,1280   : the loading cover held on the built page with each take laid over it
const R=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const [OUT,T,WS]=[process.argv[2],process.argv[3].split(','),(process.argv[4]||'390,1280').split(',').map(Number)];
const B='tools/concepts/worlds/comic/story/h/ground3/';
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
for(const W of WS)for(const t of T){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:800},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto('http://localhost:8941/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(800);
 if(t!=='now')await p.addStyleTag({content:fs.readFileSync(__dirname+'/load.css','utf8').replace(/@B@/g,B)});
 await p.evaluate(t=>{const h=document.documentElement;h.classList.remove('x2p-rv');h.classList.add('x2p-cur');if(t!=='now')h.classList.add('g3l','g3l-'+t);scrollTo(0,0)},t);
 if(t==='c')await p.addScriptTag({content:fs.readFileSync(__dirname+'/load.js','utf8')});
 if(process.env.LY)await p.evaluate(v=>document.documentElement.style.setProperty('--g3ly',v),process.env.LY);
 await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/load-${W}-${t}.png`});console.log(W,t,er.join('|')||'ok');await ctx.close()}
await b.close()})();
