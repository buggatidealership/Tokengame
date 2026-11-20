// quick look: node look.js <url-path> <out.png> <width> [fullPage]  (serves ez/ on a local port; fixed clock Fri Nov 20 2026, 1:09 PM NY)
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..');const [u,out,w,fp]=process.argv.slice(2);
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};
const srv=http.createServer((q,s)=>{const p=decodeURIComponent(q.url.split('?')[0]);const f=path.join(EZ,p);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
(async()=>{await new Promise(r=>srv.listen(0,r));const b=await chromium.launch();const W=+w;const ctx=await b.newContext({viewport:{width:W,height:W<500?844:800},deviceScaleFactor:W<500?2:1,timezoneId:'America/New_York'});const p=await ctx.newPage();
await p.clock.setFixedTime(new Date('2026-11-20T18:09:00Z'));await p.goto(`http://localhost:${srv.address().port}${u}`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);
await p.screenshot({path:out,fullPage:!!fp});await b.close();srv.close()})();
