// EZ SITE3D QA, page checks (site3d-render.sh step 6). node teaser/site3d-qa.js OUTDIR   (env PAGE, VENDOR, TEX as render.js)
// Writes OUTDIR/qa-page.json and OUTDIR/strings.json (every on-screen string and the field it comes from). Exits 1 when a
// key subject falls below y 800 (under the uk band), #1 rises above y 300 on the board, or the loop seam's dies differ.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');const OUT=process.argv[2];
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:1080,height:1080}});
  const V=process.env.VENDOR,T=process.env.TEX;
  await p.route('https://cdn.jsdelivr.net/npm/three@0.170.0/**',r=>{const f=path.join(V,new URL(r.request().url()).pathname.replace(/^\/npm\//,''));fs.existsSync(f)?r.fulfill({path:f,contentType:'text/javascript'}):r.fulfill({status:404,body:''})});
  await p.route('**/__site3d/**',r=>{const f=path.join(T,new URL(r.request().url()).pathname.split('/__site3d/')[1]);fs.existsSync(f)?r.fulfill({path:f}):r.fulfill({status:404,body:''})});
  await p.goto('http://localhost:8765/teaser/'+process.env.PAGE);await p.waitForFunction(()=>window.__ready||window.__err,null,{timeout:+(process.env.READY_MS||180000)});
  const err=await p.evaluate(()=>window.__err||null);if(err){console.log('page error',err);process.exit(1)}
  const q=await p.evaluate(()=>window.SITE3D_QA());await b.close();
  fs.writeFileSync(path.join(OUT,'strings.json'),JSON.stringify(q.strings,null,1));fs.writeFileSync(path.join(OUT,'qa-page.json'),JSON.stringify(q,null,1));
  console.log('QA page: window violations',q.window.length,q.window.slice(0,6).map(x=>x.join(' ')).join(' | ')||'none');
  console.log('QA page: loop seam dies',q.seam.f0,'->',q.seam.f1799,q.seam.same?'same':'DIFFERENT');
  console.log('QA page: strings',q.strings.length,'(strings.json)');
  process.exit(q.window.length||!q.seam.same?1:0)})();
