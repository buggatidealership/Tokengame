// EZ film round 2, "THE BIG BOARD": write the page's timing (N, FPS, the T table, the race states) to a JSON file for the
// render script and r2-board-qa.py, so neither carries hard-coded frame numbers. FIX R2: also the text holds of both variants (R2B_HOLDS).
//   node teaser/r2-board-timing.js OUT.json [QUERY]      (from ez/, static server on :8765; QUERY default v=uk&asof=2026-10-12T16:00:00Z)
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs');
const [out,q]=process.argv.slice(2);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1080}});
  await p.goto('http://localhost:8765/teaser/ez-r2-board.html?'+(q||'v=uk&asof=2026-10-12T16:00:00Z'),{waitUntil:'networkidle'});
  await p.waitForFunction(()=>window.__ready===true||!!window.__err,null,{timeout:120000});
  const err=await p.evaluate(()=>window.__err||null);if(err){console.log('page error',err);await b.close();process.exit(1)}
  const J=await p.evaluate(()=>({N:window.N,FPS:window.FPS,T:window.R2B_T,cues:window.R2B_EVENTS.cues,loopDiff:window.R2B_LOOP_DIFF,strings:window.R2B_STRINGS.map(s=>s.text)}));
  /* FIX R2: the holds (R2B_HOLDS, measured on the page's event table) for both variants, for r2-board-qa.py */
  J.holds={};const qq=q||'v=uk&asof=2026-10-12T16:00:00Z';
  for(const v of ['uk','nonuk']){await p.goto('http://localhost:8765/teaser/ez-r2-board.html?'+qq.replace(/(^|&)(v|variant)=[^&]*/,'$1v='+v),{waitUntil:'networkidle'});
    await p.waitForFunction(()=>window.__ready===true||!!window.__err,null,{timeout:120000});
    const e2=await p.evaluate(()=>window.__err||null);if(e2){console.log('page error ('+v+')',e2);await b.close();process.exit(1)}
    J.holds[v]=await p.evaluate(()=>window.R2B_HOLDS)}
  fs.writeFileSync(out,JSON.stringify(J,null,1));console.log('N',J.N,'FPS',J.FPS,'end',J.T.end,'loopDiff',J.loopDiff);
  for(const v in J.holds)J.holds[v].forEach(h=>console.log(v.padEnd(6),(h.held>=h.need?'ok   ':'short')+' '+h.name.padEnd(40)+' need '+h.need.toFixed(2)+' held '+h.held.toFixed(3)));
  await b.close()})();
