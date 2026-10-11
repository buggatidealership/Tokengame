// EZ teaser renderer. usage (from ez/, with a static server on :8765 serving ez/):
//   node teaser/render.js stills OUTDIR 0,60,150        -> PNG stills at those frames
//   node teaser/render.js full OUTDIR                    -> every frame + the synthesized audio as WAV
//   node teaser/render.js range OUTDIR 0,359,2,1         -> frames 0..359 where i%2==1 (split a render across processes)
//   node teaser/render.js audio OUTDIR                   -> only the WAV
//   PAGE=ez-chrome.html (default ez-teaser.html) picks the piece; add ?ns=1 to PAGE for quick looks. WebGL runs on SwiftShader (no GPU here).
// Freezes the page at t = i / fps through window.renderAt(t) and saves each frame. Every frame is a pure function of t.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path');
const [mode='stills',out='teaser-out',list='0']=process.argv.slice(2);
(async()=>{fs.mkdirSync(path.join(out,'frames'),{recursive:true});
  const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader-webgl','--enable-unsafe-swiftshader']});const p=await b.newPage({viewport:{width:1080,height:1080},deviceScaleFactor:1});
  const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  const PAGE=process.env.PAGE||'ez-teaser.html';p.setDefaultTimeout(0);
  await p.goto('http://localhost:8765/teaser/'+PAGE,{waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.__ready===true,null,{timeout:20000});
  const N=await p.evaluate(()=>window.N),FPS=await p.evaluate(()=>window.FPS);
  const frames=mode==='full'?[...Array(N).keys()]:mode==='audio'?[]:mode==='range'?(()=>{const [a,b,k=1,o=0]=list.split(',').map(Number),r=[];for(let i=a;i<=b;i++)if(i%k===o)r.push(i);return r})():list.split(',').map(Number);
  const stage=await p.$('#stage');
  for(const i of frames){await p.evaluate(t=>window.renderAt(t),i/FPS);
    await stage.screenshot({path:path.join(out,'frames',String(i).padStart(4,'0')+'.png')})}
  if(mode==='full'||mode==='audio'){const b64=await p.evaluate(()=>window.renderAudio());fs.writeFileSync(path.join(out,'audio.wav'),Buffer.from(b64,'base64'))}
  console.log('frames',frames.length,'N',N,'FPS',FPS,'errors',errs.length?errs.join(' | '):'none');await b.close()})();
