// EZ teaser renderer. usage (from ez/, with a static server on :8765 serving ez/):
//   node teaser/render.js stills OUTDIR 0,60,150        -> PNG stills at those frames
//   node teaser/render.js full OUTDIR                    -> every frame + the synthesized audio as WAV
//   node teaser/render.js range OUTDIR 0,359,2,1         -> frames 0..359 where i%2==1 (split a render across processes)
//   node teaser/render.js audio OUTDIR                   -> only the WAV
//   PAGE=ez-chrome.html (default ez-teaser.html) picks the piece; add ?ns=1 to PAGE for quick looks. WebGL runs on SwiftShader (no GPU here).
// Freezes the page at t = i / fps through window.renderAt(t) and saves each frame. Every frame is a pure function of t.
// Hype film additions (other pages are unaffected):
//   PAGE='ez-hype.html?pass=plate&cut=15'  frames are saved under the name window.frameName(i) gives (master plate frame, e.g. m1110.png)
//   PAGE='ez-hype.html?pass=type&cut=15&variant=uk' PLATES=/dir  serves /dir/m*.png to the page at teaser/__plates/
//   TIMING=1 prints the time each frame took; READY_MS sets how long to wait for the page (default 20000)
// Site3D film additions (ez-site3d.html; other pages are unaffected unless these are set):
//   VENDOR=dir      serves https://cdn.jsdelivr.net/npm/three@0.170.0/** from dir/three@0.170.0/ (Chromium here cannot reach
//                   jsdelivr; dir/three@0.170.0/SHA256SUMS lists the vendored files, fetched from that URL with curl)
//   TEX=dir         serves **/__site3d/** from dir (the capture step's textures and manifest.json)
//   SKIP_EXISTING=1 skips a frame whose output file already exists (frame names carry a key of everything the frame is drawn
//                   from, so an existing file is a finished frame): resumable chunks, and frames that share a plate render once
//   ALPHA=1         saves frames with a transparent background (the film's type states, composited later by ffmpeg)
//   node teaser/render.js names OUTDIR   -> OUTDIR/names.txt: window.frameName(i) for every frame, one per line
//   Exits 1 if renderAt fails (e.g. a missing plate) and 2 if the page threw any uncaught error, so scripts with set -e stop.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');
const [mode='stills',out='teaser-out',list='0']=process.argv.slice(2);
(async()=>{fs.mkdirSync(path.join(out,'frames'),{recursive:true});
  const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
  const errs=[],perrs=[];p.on('pageerror',e=>{errs.push(String(e));perrs.push(String(e))});p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const PAGE=process.env.PAGE||'ez-teaser.html';p.setDefaultTimeout(0);
  const EXT={'.js':'text/javascript','.json':'application/json','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
  if(process.env.VENDOR){const dir=process.env.VENDOR;await p.route('https://cdn.jsdelivr.net/npm/three@0.170.0/**',r=>{
    const f=path.join(dir,decodeURIComponent(new URL(r.request().url()).pathname).replace(/^\/npm\//,''));
    if(fs.existsSync(f))r.fulfill({path:f,contentType:'text/javascript'});else r.fulfill({status:404,body:''})})}
  if(process.env.TEX){const dir=process.env.TEX;await p.route('**/__site3d/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname).split('/__site3d/')[1]||'';
    const f=path.join(dir,u);if(!u.includes('..')&&fs.existsSync(f))r.fulfill({path:f,contentType:EXT[path.extname(f)]||'application/octet-stream'});else r.fulfill({status:404,body:''})})}
  if(process.env.PLATES){const dir=process.env.PLATES;await p.route('**/__plates/**',r=>{const f=path.join(dir,path.basename(new URL(r.request().url()).pathname));
    if(fs.existsSync(f))r.fulfill({path:f,contentType:'image/png'});else r.fulfill({status:404,body:''})})}
  await p.goto('http://localhost:8765/teaser/'+PAGE,{waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.__ready===true||!!window.__err,null,{timeout:+(process.env.READY_MS||20000)});
  const perr=await p.evaluate(()=>window.__err||null);if(perr){console.log('page error',perr);await b.close();process.exit(1)}
  const N=await p.evaluate(()=>window.N),FPS=await p.evaluate(()=>window.FPS);
  const bs=await p.evaluate(()=>window.HYPE_DATA&&window.HYPE_DATA.betSrc);if(bs)console.log('bet date source:',bs);
  if(mode==='names'){const nm=await p.evaluate(N=>{const a=[];for(let i=0;i<N;i++)a.push(window.frameName?window.frameName(i):String(i).padStart(4,'0'));return a},N);
    fs.writeFileSync(path.join(out,'names.txt'),nm.join('\n')+'\n');console.log('names',nm.length,'unique',new Set(nm).size);await b.close();return}
  const frames=mode==='full'?[...Array(N).keys()]:mode==='audio'?[]:mode==='range'?(()=>{const [a,b,k=1,o=0]=list.split(',').map(Number),r=[];for(let i=a;i<=b;i++)if(i%k===o)r.push(i);return r})():list.split(',').map(Number);
  const stage=await p.$('#stage');
  let skipped=0;
  for(const i of frames){const t0=Date.now();
    if(process.env.SKIP_EXISTING){const nm0=await p.evaluate(i=>window.frameName?window.frameName(i):null,i)||String(i).padStart(4,'0');
      if(fs.existsSync(path.join(out,'frames',nm0+'.png'))){skipped++;continue}}
    try{await p.evaluate(t=>window.renderAt(t),i/FPS)}catch(e){console.log('render error at frame',i,String(e).split('\n')[0]);await b.close();process.exit(1)}
    const nm=await p.evaluate(i=>window.frameName?window.frameName(i):null,i)||String(i).padStart(4,'0');
    await stage.screenshot({path:path.join(out,'frames',nm+'.png'),omitBackground:!!process.env.ALPHA});
    if(process.env.TIMING)console.log('frame',i,nm,'ms',Date.now()-t0)}
  if(mode==='full'||mode==='audio'){const b64=await p.evaluate(()=>window.renderAudio());fs.writeFileSync(path.join(out,'audio.wav'),Buffer.from(b64,'base64'))}
  if(skipped)console.log('skipped (already rendered)',skipped);
  console.log('frames',frames.length,'N',N,'FPS',FPS,'errors',errs.length?errs.join(' | '):'none');await b.close();
  if(perrs.length){console.log('page errors:',perrs.length);process.exit(2)}})();
