// The switch's transition, frozen at set moments, and the fixed-core check (night studio, 2026-11-20).
// node tools/concepts/night/season/trans.js <outdir> [A,B,C]   (from ez/)
// For each kit: opens Season 1 (the live terminal plus the switch), taps "Season 2", pauses every animation (the view-transition layers and
// the page's own entrances) and shoots it at 0, 120, 260, 420, 620 and 1000 ms; then taps "Season 1" and does the same. Measures the EZ.
// mark and the logotype: their boxes in Season 1 and Season 2 (must be identical, RESEARCH.md switch rule 1 and 2) and the largest pixel
// change inside the mark's box across every frame of the transition (rule 6: the mark stays still while the world changes around it).
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'transout');fs.mkdirSync(OUT,{recursive:true});
const DIRS=(process.argv[3]||'A,B,C').split(','),TS=[0,120,260,420,620,1000],W=+(process.env.W||390);
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'};
function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');const css=['base.css','a.css','b.css','c.css'].map(f=>fs.readFileSync(path.join(HERE,f),'utf8')).join('\n'),js=fs.readFileSync(path.join(HERE,'season.js'),'utf8');
  t=t.replace('<script src="ez-data.js"></script>','<script src="tools/concepts/night/season/data.js"></script>\n<script src="ez-data.js"></script>').replace('var h0=(location.hash||"").slice(1);',js+'\nvar h0=(location.hash||"").slice(1);');return t+'\n<style>\n'+css+'\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);if(u==='/__season.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const box=()=>{const m=document.querySelector('header.top .brand svg').getBoundingClientRect(),l=document.querySelector('header.top .brand b').getBoundingClientRect();return {mark:[m.x,m.y,m.width,m.height].map(v=>+v.toFixed(2)),logo:[l.x,l.y,l.width,l.height].map(v=>+v.toFixed(2))}};
(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const res={};
  for(const d of DIRS){const ctx=await b.newContext({viewport:{width:W,height:W<500?844:860},deviceScaleFactor:W<500?2:1,timezoneId:'America/New_York',locale:'en-US'});const p=await ctx.newPage();
    const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.clock.setFixedTime(new Date('2026-11-20T23:30:00Z'));
    await p.goto(`http://localhost:${port}/__season.html?dir=${d}&season=1#leaders`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
    const r={s1:await p.evaluate(box)};
    for(const [to,tag] of [[2,'up'],[1,'back']]){
      await p.evaluate(to=>{document.querySelector('[data-sea="'+to+'"]').click()},to);
      await p.evaluate(async()=>{if(window.__vt)await window.__vt.ready});
      await p.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
      for(const t of TS){await p.evaluate(t=>document.getAnimations().forEach(a=>{try{a.currentTime=t}catch(e){}}),t);await p.waitForTimeout(60);
        await p.screenshot({path:`${OUT}/${d}-${tag}-${t}.png`})}
      await p.evaluate(()=>document.getAnimations().forEach(a=>{try{a.finish()}catch(e){}}));await p.waitForTimeout(500);
      r[to===2?'s2':'s1b']=await p.evaluate(box)}
    r.errs=errs;res[d]=r;await ctx.close()}
  fs.writeFileSync(`${OUT}/trans.json`,JSON.stringify(res,null,1));console.log(JSON.stringify(res));await b.close();srv.close()})();
