const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');
const OUT=process.argv[2];
(async()=>{const b=await chromium.launch();
for(const [W,H] of [[390,844],[1280,900]])for(const hash of ['','#/upcoming','#/leaderboard']){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8942/v47-live-x3plus.html'+hash,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});await p.waitForTimeout(2500);
 const info=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
  const secs=[...document.querySelectorAll('main section, main > div, .wc-up, .wc-lb, [class*="wc-"]')].filter(e=>vis(e)&&e.getBoundingClientRect().height>150&&e.parentElement&&(e.parentElement.tagName==='MAIN'||e.parentElement.id==='app'||/view|tab|wc-root|wc-w/.test(e.parentElement.className))).slice(0,30).map(e=>({c:String(e.className).slice(0,60),id:e.id,top:Math.round(e.getBoundingClientRect().top+scrollY),h:Math.round(e.getBoundingClientRect().height),t:(e.innerText||'').slice(0,60).replace(/\n/g,' | ')}));return secs});
 console.log(W,hash,JSON.stringify(info,null,0));
 await p.screenshot({path:`${OUT}/live-${W}${hash.replace(/[#\/]/g,'')||'ov'}.png`,fullPage:true});await ctx.close()}
await b.close()})();
