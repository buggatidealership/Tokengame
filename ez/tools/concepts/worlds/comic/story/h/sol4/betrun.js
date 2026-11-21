// node betrun.js <out> now,k1,k2 [390,1280]: the bet chapter's parts and callouts, today and the two takes (s4bet-<t>-<W>.png)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const R=require('./run.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,k1,k2').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();for(const W of WS)for(const t of TS){const {ctx,p,er}=await R.open(b,W);
 await p.waitForFunction(()=>document.documentElement.classList.contains('hb-ready'),null,{timeout:60000});
 await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-bet');s.classList.remove('wc-offs');s.scrollIntoView()});await p.waitForTimeout(1200);
 if(t!=='now'){await p.addStyleTag({url:'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Bangers&family=Shantell+Sans:wght@400;700&display=block'});
  await p.addStyleTag({content:rd('bet.css')});await p.addScriptTag({content:`window.S4IMG='/tools/concepts/worlds/comic/story/h/sol4/img/';window.SIM=window.SIM||SIM;`+rd('bet.js')+`;S4bet('${t}')`});
  await p.evaluate(()=>document.fonts.ready);await p.waitForFunction(()=>[...document.querySelectorAll('.s4k img')].every(i=>i.complete&&i.naturalWidth),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(800)}
 await R.prep(p);
 const r=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-bet'),a=s.querySelector('.hbc-art')||s,st=s.querySelector('.hb-st'),cl=s.querySelector('.hbc-close');
   const y0=a.getBoundingClientRect().bottom-40+scrollY,y1=(cl||st).getBoundingClientRect().bottom+scrollY+10;
   const ov=[...s.querySelectorAll('.s4k-l li')].filter(li=>li.scrollHeight>li.clientHeight+1||li.scrollWidth>li.clientWidth+1).length;
   return {y0,y1,sw:document.documentElement.scrollWidth,ov,fs:[...s.querySelectorAll('.s4k-l li')].map(li=>getComputedStyle(li).fontSize)}});
 await p.screenshot({path:`${OUT}/s4bet-${t}-${W}.png`,fullPage:true,clip:{x:0,y:r.y0,width:W,height:r.y1-r.y0}});
 console.log(t,W,JSON.stringify(r),er.slice(0,3).join('|')||'ok');await ctx.close()}await b.close()})();
