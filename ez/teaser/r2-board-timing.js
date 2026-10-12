// EZ film round 2, "THE BIG BOARD": write the page's timing (N, FPS, the T table, the race states) to a JSON file for the
// render script and r2-board-qa.py, so neither carries hard-coded frame numbers.
//   node teaser/r2-board-timing.js OUT.json [QUERY]      (from ez/, static server on :8765; QUERY default v=uk&asof=2026-10-12T16:00:00Z)
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs');
const [out,q]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
  await p.goto('http://localhost:8765/teaser/ez-r2-board.html?'+(q||'v=uk&asof=2026-10-12T16:00:00Z'),{waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.__ready===true||!!window.__err,null,{timeout:120000});
  const err=await p.evaluate(()=>window.__err||null);if(err){console.log('page error',err);await b.close();process.exit(1)}
  const J=await p.evaluate(()=>({N:window.N,FPS:window.FPS,T:window.R2B_T,cues:window.R2B_EVENTS.cues,loopDiff:window.R2B_LOOP_DIFF,strings:window.R2B_STRINGS.map(s=>s.text)}));
  fs.writeFileSync(out,JSON.stringify(J,null,1));console.log('N',J.N,'FPS',J.FPS,'end',J.T.end,'loopDiff',J.loopDiff);await b.close()})();
