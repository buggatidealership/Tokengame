// Screens for the switch film (dopa/nt-season.html), shot from the real mockup page so the phone shows the real UI (night studio, 2026-11-20).
// node tools/concepts/night/season/cap.js [kit]   (from ez/; default kit A). Writes tools/concepts/dopa/w6/nt/season/:
//   s1.jpg, s2.jpg      the two seasons' Leaderboard at 390x844, 3x (one phone screen each)
//   up-NN.jpg           the switch from Season 1 to Season 2, frozen every 1/30 s for 1.0 s (the real View Transition, paused and stepped)
//   bk-NN.jpg           the switch back to Season 1, the same way
//   el-<name>.png       rows to lift out of the phone (3x), and el.json with their boxes on the 390x844 screen
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..'),HERE=__dirname,KIT=(process.argv[2]||'A').toUpperCase(),OUT=path.join(EZ,'tools/concepts/dopa/w6/nt/season');fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json'};
function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');const css=['base.css','a.css','b.css','c.css'].map(f=>fs.readFileSync(path.join(HERE,f),'utf8')).join('\n'),js=fs.readFileSync(path.join(HERE,'season.js'),'utf8');
  t=t.replace('<script src="ez-data.js"></script>','<script src="tools/concepts/night/season/data.js"></script>\n<script src="ez-data.js"></script>').replace('var h0=(location.hash||"").slice(1);',js+'\nvar h0=(location.hash||"").slice(1);');
  /* the film's screens: no scroll bar, a 46px status bar above the header (the phone's island sits there), the bottom nav where a phone has it */
  return t+'\n<style>\n'+css+'\nhtml{scrollbar-width:none}body{padding-top:46px}\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);if(u==='/__season.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const N=31,STEP=1000/30;
(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,timezoneId:'America/New_York',locale:'en-US'});const p=await ctx.newPage();
  await p.clock.setFixedTime(new Date('2026-11-20T23:30:00Z'));
  await p.goto(`http://localhost:${port}/__season.html?dir=${KIT}&season=1#leaders`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900);
  const shot=async f=>p.screenshot({path:path.join(OUT,f),type:'jpeg',quality:90});
  const boxes=async()=>p.evaluate(()=>{const o={};const q=(k,s)=>{const e=document.querySelector(s);if(e){const r=e.getBoundingClientRect();o[k]=[r.x,r.y,r.width,r.height].map(v=>+v.toFixed(1))}};
    q('mark','header.top .brand svg');q('logo','header.top .brand b');q('sw1','[data-sea="1"]');q('sw2','[data-sea="2"]');
    document.querySelectorAll('main [data-m], main tr[data-pick]').forEach(e=>{const k=(e.getAttribute('data-m')||e.getAttribute('data-pick'));if(o['row-'+k])return;const r=e.getBoundingClientRect();o['row-'+k]=[r.x,r.y,r.width,r.height].map(v=>+v.toFixed(1))});return o});
  const el={};el.s1=await boxes();await shot('s1.jpg');
  const els=async(pre,list)=>{const h=await p.addStyleTag({content:'.nav{visibility:hidden!important}'});for(const [k,sel] of list){const e=await p.$(sel);if(!e)continue;await e.screenshot({path:path.join(OUT,'el-'+pre+k+'.png'),omitBackground:false})}await h.evaluate(e=>e.remove())};
  await els('s1-',[['grok','main tr[data-pick="GROK"]'],['kimi','main tr[data-pick="KIMI"]']]);
  for(const [to,tag] of [[2,'up'],[1,'bk']]){
    await p.evaluate(to=>document.querySelector('[data-sea="'+to+'"]').click(),to);await p.evaluate(async()=>{if(window.__vt)await window.__vt.ready});
    await p.evaluate(()=>document.getAnimations().forEach(a=>a.pause()));
    for(let i=0;i<N;i++){await p.evaluate(t=>document.getAnimations().forEach(a=>{try{a.currentTime=t}catch(e){}}),i*STEP);await p.waitForTimeout(40);await shot(tag+'-'+String(i).padStart(2,'0')+'.jpg')}
    await p.evaluate(()=>document.getAnimations().forEach(a=>{try{a.finish()}catch(e){}}));await p.waitForTimeout(700);
    if(to===2){el.s2=await boxes();await shot('s2.jpg');
      await els('s2-',[['grok','main .a-hero'],['gemini','main [data-m="GEMINI"]'],['qwen','main [data-m="QWEN"]'],['kimi','main [data-m="KIMI"]'],['sw','#ssw']]);
      el.s2kimi=await p.evaluate(()=>{const r=document.querySelector('main [data-m="KIMI"]').getBoundingClientRect();return [r.x,r.y,r.width,r.height]})}}
  fs.writeFileSync(path.join(OUT,'el.json'),JSON.stringify(el,null,1));console.log(JSON.stringify(el).slice(0,600));await b.close();srv.close()})();
