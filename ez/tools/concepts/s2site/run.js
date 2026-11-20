// Season 2 on the EZ Terminal: MOCKUPS shown inside the live terminal. Never touches a live file.
// node tools/concepts/s2site/run.js <outdir>      (from ez/; then python3 tools/concepts/s2site/board.py <outdir>)
// Serves ez/ on a local port, hands the browser a copy of v53-terminal.html with s2.css appended and s2.js run inside the
// page's own script (just before its router line), fixes the clock, shoots each take at 320/390/1280 and measures:
// sideways scroll, anything poking out of its panel, truncated text, overlapping atoms, and sibling slots across rows.
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'s2out');fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};
function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');
  const css=fs.readFileSync(path.join(HERE,'s2.css'),'utf8'),js=fs.readFileSync(path.join(HERE,'s2.js'),'utf8');
  const hook='var h0=(location.hash||"").slice(1);';if(t.split(hook).length!==2)throw new Error('router line not found once');
  t=t.replace(hook,js+'\n'+hook);if(!/<\/style>\s*$/.test(t.trim())&&t.lastIndexOf('</style>')<0)throw new Error('no style');
  return t+'\n<style>\n'+css+'\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__s2.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const PRE='2026-11-20T18:09:00Z',POST='2026-11-20T23:30:00Z';   // 1:09 PM and 6:30 PM in New York, Fri Nov 20
// [name, query, hash, clock, board?]
const SHOTS=[['A-s2','take=A','',PRE,1],['A-s1','take=A&season=1','',PRE,1],['B','take=B','',PRE,1],['B-open','take=B&open=1','',PRE,1],
 ['C','take=C','#next',PRE,1],['D','take=D','',POST,1],['live-lb','LIVE','',PRE,0],['live-up','LIVE','#next',PRE,0]];
const WIDTHS=[320,390,1280];if(process.env.ONLY){const o=process.env.ONLY.split(',');SHOTS.splice(0,SHOTS.length,...SHOTS.filter(s=>o.indexOf(s[0])>-1))}
function measure(){const W=innerWidth,R=[],vis=e=>{const r=e.getBoundingClientRect();if(r.width<.5||r.height<.5)return null;if(e.closest('[hidden]')||e.closest('.flip:not(.fl-on)>.bk')||e.closest('.flip.fl-on>.fr'))return null;
    let x=e;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return null;x=x.parentElement}return r};
  const res={W,sw:document.documentElement.scrollWidth,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family).filter((v,i,a)=>a.indexOf(v)===i),poke:[],trunc:[],overlap:[],slots:{}};
  const all=[...document.querySelectorAll('main *')];
  // 1 anything outside its panel (a tab strip scrolls on its own, so it is checked for hidden overflow instead)
  all.forEach(e=>{const r=vis(e);if(!r)return;const pn=e.closest('.pn');if(!pn)return;const p=pn.getBoundingClientRect();
    if(e.closest('.tabs')){return}if(r.right>p.right+.5||r.left<p.left-.5)res.poke.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' '+(e.textContent||'').trim().slice(0,30)+' dx '+Math.max(r.right-p.right,p.left-r.left).toFixed(1))});
  document.querySelectorAll('main .tabs').forEach(t=>{if(vis(t)&&t.scrollWidth>t.clientWidth+1)res.poke.push('tabs scroll '+t.textContent.trim().slice(0,40)+' '+t.scrollWidth+'>'+t.clientWidth)});
  // 2 truncated text
  all.forEach(e=>{if(!vis(e))return;const c=getComputedStyle(e);if((c.textOverflow==='ellipsis'||c.overflow==='hidden')&&e.scrollWidth>e.clientWidth+1&&e.textContent.trim())res.trunc.push(e.tagName+'.'+e.className+' "'+e.textContent.trim().slice(0,40)+'"')});
  // 2b text spilling out of a box squeezed narrower than its words (a 0-wide grid cell has no rect, so 3 cannot see it)
  res.spill=[];all.forEach(e=>{if(e.closest('[hidden]')||e.closest('.flip:not(.fl-on)>.bk'))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;let x=e,ok=true;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'){ok=false;break}x=x.parentElement}if(!ok)return;
    const c=getComputedStyle(e);if(c.overflow==='hidden'||c.textOverflow==='ellipsis')return;const rg=document.createRange();rg.selectNodeContents(e);const t=rg.getBoundingClientRect(),b=e.getBoundingClientRect();if(t.width>b.width+1.5&&c.display!=='inline')res.spill.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,24)+'" '+t.width.toFixed(0)+'>'+b.width.toFixed(0))});
  // 3 overlapping atoms in each panel: text-bearing elements and marks (ai, co, flag, crown, svg charts)
  document.querySelectorAll('main .pn, main .s2ex').forEach(pn=>{const at=[...pn.querySelectorAll('*')].filter(e=>{if(e.closest('.ai,.co,svg.fl,svg.lv-cr')&&!e.matches('.ai,.co,svg.fl,svg.lv-cr'))return false;
      if(e.matches('.ai,.co,svg.fl,svg.lv-cr,.pc svg,.l5 i'))return true;return [...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())}).map(e=>[e,vis(e)]).filter(x=>x[1]);
    for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){const [a,ra]=at[i],[b,rb]=at[j];if(a.contains(b)||b.contains(a))continue;
      const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left),iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top);
      if(ix>.75&&iy>.75)res.overlap.push((a.className.baseVal!==undefined?'svg':a.className||a.tagName)+' "'+a.textContent.trim().slice(0,16)+'" x '+(b.className.baseVal!==undefined?'svg':b.className||b.tagName)+' "'+b.textContent.trim().slice(0,16)+'" '+ix.toFixed(1)+'x'+iy.toFixed(1))}});
  // 4 siblings: every slot of every row at the same place (left or right edge, and the same height in its row)
  const set=(name,rows,slots)=>{rows=rows.filter(r=>vis(r));if(rows.length<2)return;slots.forEach(([k,sel,edge])=>{const xs=[],ys=[];rows.forEach(r=>{const e=r.querySelector(sel);const b=e&&vis(e);if(!b)return;const rr=r.getBoundingClientRect();
      xs.push([b.left-rr.left,(b.left+b.right)/2-rr.left,b.right-rr.left]);ys.push((b.top+b.bottom)/2-rr.top)});
    if(xs.length<2)return;const sp=i=>Math.max(...xs.map(v=>v[i]))-Math.min(...xs.map(v=>v[i]));const d=[sp(0),sp(1),sp(2)],bi=d.indexOf(Math.min(...d));
    res.slots[name+' '+k]={n:xs.length,dx:+d[bi].toFixed(2),edge:['left','centre','right'][bi],dy:+(Math.max(...ys)-Math.min(...ys)).toFixed(2)}})};
  document.querySelectorAll('main table.lt').forEach((t,ti)=>{const rows=[...t.querySelectorAll('tbody tr')];const hr=!!t.querySelector('.l5');
    set('table'+ti+(hr?'(hit)':'(p&l)'),rows,[['rank','.no','l'],['mark','.ai','l'],['name','.nm2 b','l'],['version','.nm2 small','l'],['tag','.s2tg','l'],['crown','.lv-cr','l'],
      ...(hr?[['last5','.l5','c'],['W/L','.wlc span','c'],['hit','.hr','c']]:[['last round','td:nth-child(2) > *','l'],['P&L','.pc b','r'],['spark','.pc svg','r']])])});
  set('lineup',[...document.querySelectorAll('.s2lr')],[['mark','.ai','l'],['name','.cn','l'],['version','small','l'],['lab','.s2lab','r'],['flag','.s2lab .fl','l']]);
  set('in-play cards',[...document.querySelectorAll('.lv-c')],[['status','.lv-st','l'],['round','.lv-hd>span:nth-child(2)','l'],['grades','.lv-hd .r','r'],['LONG','.lv-sd.L h4','c'],['SHORT','.lv-sd.S h4','c'],['logo','.lv-mid .co','c'],['name','.lv-mid .nm','c'],['score','.lv-mid .sc','c'],['foot','.lv-ft','l']]);
  set('next rows',[...document.querySelectorAll('.ur')],[['logo','.co','l'],['name','.cn','l'],['when','.ut b','r']]);
  set('first close',[...document.querySelectorAll('.s2fc')],[['logos','.cos','l']]);
  return res}
(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const report={},errs=[];
  for(const [n,q,h,clock,bd] of SHOTS)for(const w of WIDTHS){const ctx=await b.newContext({viewport:{width:w,height:w<500?844:800},deviceScaleFactor:w<500?2:1,timezoneId:'America/New_York',locale:'en-US'});
    const p=await ctx.newPage();p.on('pageerror',e=>errs.push(n+'@'+w+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(n+'@'+w+' console: '+m.text())});
    await p.clock.setFixedTime(new Date(clock));
    const url=q==='LIVE'?`http://localhost:${port}/v53-terminal.html${h}`:`http://localhost:${port}/__s2.html?${q}${h}`;
    await p.goto(url,{waitUntil:'networkidle'}).catch(e=>errs.push(n+' goto '+e.message));await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(900);
    const m=await p.evaluate(measure);report[n+'@'+w]=m;
    /* a full-page shot keeps the fixed bottom nav at the first screen's foot: put it at the end of the page for the board */
    await p.addStyleTag({content:'.nav{position:static!important}.app{padding-bottom:16px!important}'});await p.waitForTimeout(150);
    if(bd){for(let k=0;k<3;k++){try{await p.screenshot({path:`${OUT}/${n}-${w}.png`,fullPage:true});break}catch(e){errs.push(n+'@'+w+' screenshot try '+(k+1)+': '+e.message.split('\n')[0]);await p.waitForTimeout(1500)}}}
    await ctx.close()}
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({errs,report},null,1));
  for(const k in report){const m=report[k],bad=Object.entries(m.slots).filter(([s,v])=>v.dx>1||v.dy>1);
    console.log(k.padEnd(14),'sw',m.sw+'/'+m.W,'poke',m.poke.length,'trunc',m.trunc.length,'spill',m.spill.length,'overlap',m.overlap.length,'slots',Object.keys(m.slots).length,'off>1px',bad.length?bad.map(([s,v])=>s+' dx'+v.dx+' dy'+v.dy).join('; '):'none')}
  console.log('fonts',(Object.values(report)[0]||{fonts:[]}).fonts.join(', '));console.log('errors',errs.length?errs.join('\n'):'none');await b.close();srv.close()})();
