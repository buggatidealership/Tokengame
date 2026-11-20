// The season system: MOCKUPS shown inside the live terminal (night studio, 2026-11-20). Never touches a live file.
// node tools/concepts/night/season/run.js <outdir> [shot,shot...]   (from ez/; then /usr/bin/python3 tools/concepts/night/season/board.py <outdir>)
// Serves ez/ on a local port and hands the browser a copy of v53-terminal.html with data.js loaded before the page's script, season.js run
// inside the page's own script (just before its router line) and base.css + a.css + b.css + c.css appended. Fixes the clock at Fri Nov 20,
// 6:30 PM New York (after the close that graded Season 2's first three trades), shoots each view at 320/390/1280 and measures:
// sideways scroll, text cut or spilling, overlapping text, tap targets under 44px, the faces actually used, and (in contrast.py) text contrast.
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'seasonout');fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};
function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');
  const css=['base.css','a.css','b.css','c.css'].map(f=>fs.readFileSync(path.join(HERE,f),'utf8')).join('\n'),js=fs.readFileSync(path.join(HERE,'season.js'),'utf8');
  const hook='var h0=(location.hash||"").slice(1);';if(t.split(hook).length!==2)throw new Error('router line not found once');
  const ds='<script src="ez-data.js"></script>';if(t.split(ds).length!==2)throw new Error('data script not found once');
  t=t.replace(ds,'<script src="tools/concepts/night/season/data.js"></script>\n'+ds).replace(hook,js+'\n'+hook);
  return t+'\n<style>\n'+css+'\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__season.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const CLOCK='2026-11-20T23:30:00Z';
// [name, query, hash]
const VIEWS=[];for(const d of 'ABC'){VIEWS.push([d+'-s1lb','dir='+d+'&season=1','#leaders'],[d+'-s1up','dir='+d+'&season=1','#next'],[d+'-lb','dir='+d,'#leaders'],[d+'-up','dir='+d,'#next'],[d+'-fd','dir='+d,'#feed'])}
let WIDTHS=[320,390,1280];if(process.env.W)WIDTHS=process.env.W.split(',').map(Number);
const only=process.argv[3]?process.argv[3].split(','):null;
function measure(){const W=innerWidth,vis=e=>{const r=e.getBoundingClientRect();if(r.width<.5||r.height<.5)return null;let x=e;while(x&&x!==document.documentElement){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return null;x=x.parentElement}return r};
  const res={W,sw:document.documentElement.scrollWidth,trunc:[],spill:[],overlap:[],tap:[],faces:{},text:[]};
  const scope=[...document.querySelectorAll('header.top *, main *, nav.nav *')];
  const own=e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());
  scope.forEach(e=>{const r=vis(e);if(!r)return;const c=getComputedStyle(e);
    if((c.textOverflow==='ellipsis'||c.overflow==='hidden')&&e.scrollWidth>e.clientWidth+1&&own(e))res.trunc.push(e.className+' "'+e.textContent.trim().slice(0,30)+'"');
    if(own(e)){const f=c.fontFamily.split(',')[0].replace(/["']/g,'').trim();res.faces[f]=(res.faces[f]||0)+1;
      const rg=document.createRange();rg.selectNodeContents(e);const t=rg.getBoundingClientRect();if(c.display!=='inline'&&t.width>r.width+1.5&&c.overflow!=='hidden')res.spill.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,24)+'" '+t.width.toFixed(0)+'>'+r.width.toFixed(0));
      if(t.right>W+.5||t.left<-.5)res.spill.push('offscreen '+(e.className||e.tagName)+' "'+e.textContent.trim().slice(0,24)+'"');
      const r1=(c.display==='inline'&&e.getClientRects().length)?e.getClientRects()[0]:r;
      res.text.push({nav:!!e.closest('nav.nav'),x:r1.left+scrollX,y:r1.top+scrollY,w:r1.width,h:r1.height,c:c.color,fs:parseFloat(c.fontSize),t:e.textContent.trim().slice(0,30),sel:e.tagName+'.'+(e.className.baseVal!==undefined?'':e.className)})}});
  /* tap targets: every button and link in the header, main and the bottom nav */
  document.querySelectorAll('header.top button, header.top a, main button, main a, nav.nav button').forEach(e=>{const r=vis(e);if(!r)return;if(r.height<43.5||r.width<43.5)res.tap.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,22)+'" '+r.width.toFixed(0)+'x'+r.height.toFixed(0))});
  /* overlapping text atoms inside main */
  const at=[...document.querySelectorAll('main *')].filter(e=>own(e)||e.matches('.ai,.co2,.okm,.fm i')).filter(e=>!e.closest('.ai,.co2,.okm')||e.matches('.ai,.co2,.okm')).map(e=>[e,vis(e)]).filter(x=>x[1]);
  for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){const [a,ra]=at[i],[b,rb]=at[j];if(a.contains(b)||b.contains(a))continue;const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left),iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top);
    if(ix>1&&iy>1)res.overlap.push((a.className||a.tagName)+' "'+a.textContent.trim().slice(0,14)+'" x '+(b.className||b.tagName)+' "'+b.textContent.trim().slice(0,14)+'" '+ix.toFixed(1)+'x'+iy.toFixed(1))}
  res.wide=[];if(res.sw>W)document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&r.right>W+.5&&!e.closest('.a-chips,.b-chips,.c-chips,.s2pk,.tabs,.sub,.pick')){let x=e.parentElement,inner=false;while(x){const c=getComputedStyle(x);if(/auto|scroll|hidden|clip/.test(c.overflowX)){inner=true;break}x=x.parentElement}if(!inner)res.wide.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' '+r.right.toFixed(0))}});res.wide=res.wide.slice(0,6);
  return res}
(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const report={},errs=[];
  for(const [n,q,h] of VIEWS){if(only&&!only.some(o=>n===o||n.startsWith(o+'-')||n.startsWith(o)))continue;
   for(const w of WIDTHS){const ctx=await b.newContext({viewport:{width:w,height:w<500?844:860},deviceScaleFactor:w<500?2:1,timezoneId:'America/New_York',locale:'en-US',reducedMotion:'reduce'});
    const p=await ctx.newPage();p.on('pageerror',e=>errs.push(n+'@'+w+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(n+'@'+w+' console: '+m.text())});
    await p.clock.setFixedTime(new Date(CLOCK));
    await p.goto(`http://localhost:${port}/__season.html?${q}${h}`,{waitUntil:'networkidle'}).catch(e=>errs.push(n+' goto '+e.message));
    await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(700);
    const m=await p.evaluate(measure);report[n+'@'+w]=m;
    if(w<500){const NT='header.top *, main *, nav.nav *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}';
      const h=await p.addStyleTag({content:NT});await p.waitForTimeout(80);await p.screenshot({path:`${OUT}/${n}-${w}-vp-nt.png`});await h.evaluate(e=>e.remove());await p.waitForTimeout(60)}
    /* a full-page shot keeps the fixed bottom nav at the first screen's foot: put it at the end of the page for the board */
    await p.addStyleTag({content:'.nav{position:static!important;margin:16px auto 0!important;left:auto!important;right:auto!important;bottom:auto!important}.app{padding-bottom:16px!important}'});await p.waitForTimeout(150);
    const H=await p.evaluate(()=>document.documentElement.scrollHeight),cap=w<500?2400:1700,clip={x:0,y:0,width:w,height:Math.min(H,cap)};
    await p.setViewportSize({width:w,height:Math.min(H,cap)});await p.waitForTimeout(250);
    await p.screenshot({path:`${OUT}/${n}-${w}.png`,clip});
    if(w!==320){await p.addStyleTag({content:'header.top *, main *, nav.nav *{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;text-decoration-color:transparent!important}'});await p.waitForTimeout(100);await p.screenshot({path:`${OUT}/${n}-${w}-nt.png`,clip})}
    await ctx.close()}}
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({errs,report},null,1));
  for(const k in report){const m=report[k];console.log(k.padEnd(12),'sw',m.sw+'/'+m.W,'trunc',m.trunc.length,'spill',m.spill.length,'overlap',m.overlap.length,'tap<44',m.tap.length,'faces',Object.keys(m.faces).join('|'),m.wide&&m.wide.length?'WIDE '+m.wide.join(';'):'')}
  console.log('errors',errs.length?errs.join('\n'):'none');await b.close();srv.close()})();
