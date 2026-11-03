// node shot.js <page> <out.png> <width> <dpr> [extra query] : full-page screenshot of one of this folder's pages,
// captured in 3000px bands and stitched (a single capture of a 19,000-device-pixel page can fail under memory pressure).
const {chromium}=require(require.resolve('playwright',{paths:['/opt/node-tools/node_modules',process.cwd()]}));
const {execFileSync}=require('child_process'),fs=require('fs'),path=require('path'),os=require('os');
(async()=>{const [,,page,out,w,dpr,q]=process.argv;const b=await chromium.launch();
const p=await b.newPage({viewport:{width:+w,height:+w<600?844:900},deviceScaleFactor:+dpr});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8995/tools/concepts/worlds/cartoon/satire/'+page+'?shot=1'+(q||''),{waitUntil:'networkidle'});
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
await p.evaluate(async()=>{await Promise.all([...document.images].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});
await p.waitForTimeout(400);
const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.documentElement.scrollHeight}));
const dir=fs.mkdtempSync(path.join(os.tmpdir(),'satshot-'));const parts=[];const band=1600;
await p.setViewportSize({width:+w,height:band});await p.waitForTimeout(300);
for(let y=0,i=0;y<m.h;y+=band,i++){const f=path.join(dir,'p'+String(i).padStart(2,'0')+'.png');const top=Math.min(y,m.h-band);
  await p.evaluate(t=>window.scrollTo(0,t),top);await p.waitForTimeout(250);
  const cut=y-top;await p.screenshot({path:f,clip:{x:0,y:cut,width:m.cw,height:Math.min(band,m.h-y)}});parts.push(f)}
execFileSync('convert',[...parts,'-append','+repage',out]);parts.forEach(f=>fs.unlinkSync(f));fs.rmdirSync(dir);
console.log(JSON.stringify(m),errs.length?'ERR '+errs.join(' | '):'no errors');await b.close()})();
