// node shot.js <page.html> <out.png> <width> <dpr>  : full-page screenshot of this folder's mockup pages, served from ez/ on :8995
const {chromium}=require('playwright');
(async()=>{const [,,page,out,w,dpr,hh]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+(hh||900)},deviceScaleFactor:+dpr||1});
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
p.on('requestfailed',r=>errs.push('FAIL '+r.url()));
await p.goto('http://localhost:8995/tools/concepts/worlds/cartoon/funnies/'+page,{waitUntil:'networkidle'});
await p.evaluate(()=>document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager'));
for(let y=0;y<200000;y+=500){const H=await p.evaluate(()=>document.documentElement.scrollHeight);if(y>H)break;await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(90)}await p.evaluate(()=>scrollTo(0,0));
await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(2500);
const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight}));
await p.screenshot({path:out,fullPage:true});console.log(JSON.stringify(m),errs.slice(0,10).join('\n'));await b.close()})();
