// node shot.js <page> <out.png> <width> <dpr> [extra query]  : full-page screenshot of one of this folder's pages
const {chromium}=require(require.resolve('playwright',{paths:['/opt/node-tools/node_modules',process.cwd()]}));
(async()=>{const [,,page,out,w,dpr,q]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+w<600?844:900},deviceScaleFactor:+dpr});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8995/tools/concepts/worlds/cartoon/satire/'+page+'?shot=1'+(q||''),{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});
await p.waitForTimeout(400);
const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight}));
await p.screenshot({path:out,fullPage:true});console.log(JSON.stringify(m),errs.length?'ERR '+errs.join(' | '):'no errors');await b.close()})();
