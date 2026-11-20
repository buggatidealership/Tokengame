// The Season 2 FEED: MOCKUPS shown inside the live terminal. Never touches a live file.
// node tools/concepts/feed/run.js <outdir>      (from ez/; then /usr/bin/python3 tools/concepts/feed/board.py <outdir>)
// Builds the data from data/s2-calls/calls.csv + words.json (refuses anything not verbatim) + dopa/data/close-2026-11-20.json,
// serves ez/ on a local port, hands the browser a copy of v53-terminal.html with feed.css appended and FEEDD + feed.js run inside
// the page's own script (just before its router line), shoots F1..F4 at 320/390/1280 (and graded, and the two X teasers),
// and measures: sideways scroll, anything poking out of its panel, cut or spilled text, overlapping atoms, sibling slots,
// and every printed number against calls.csv and the JSON.
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');const readCSV=require('./csv.js');
const EZ=path.resolve(__dirname,'../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'feedout');fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};

/* ---- data: every word and number from the files, checked ---- */
const CSV=readCSV(fs.readFileSync(path.join(EZ,'data/s2-calls/calls.csv'),'utf8'));
const W=JSON.parse(fs.readFileSync(path.join(HERE,'words.json'),'utf8'));
const CL=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/data/close-2026-11-20.json'),'utf8'));
const M5=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/models5.json'),'utf8'));
const KEY={GPT:'GPT',Claude:'CLAUDE',Grok:'GROK',Gemini:'GEMINI',Qwen:'QWEN'},AIO=['GPT','CLAUDE','GROK','GEMINI','QWEN'];
const fails=[];const must=(ok,msg)=>{if(!ok)fails.push(msg)};
const cos=CL.rounds.slice().sort((a,b)=>b.n-a.n).map(r=>({ticker:r.ticker,co:r.co,n:r.s2n,logo:'tools/concepts/dopa/'+r.logo,move:r.move,pct:r.pct}));
const items=[];
cos.forEach(c=>{const R=CL.rounds.find(r=>r.ticker===c.ticker);AIO.forEach(k=>{
  const row=CSV.find(r=>r.ticker===c.ticker&&KEY[r.model]===k),w=W[c.ticker][Object.keys(KEY).find(m=>KEY[m]===k)],j=R.calls.find(x=>x.k===k);
  must(row&&w&&j,'missing '+c.ticker+' '+k);const keep=w.keep,core=keep.replace(/ …$/,'');
  must(row.why.indexOf(core)>-1,'NOT VERBATIM '+c.ticker+' '+k+': '+core);must(keep.indexOf(w.hl)>-1,'highlight not inside the kept text '+c.ticker+' '+k);
  must(!/\[(cut off|hidden)\]/.test(keep),'kept text holds a hidden or cut-off marker '+c.ticker+' '+k);
  must(row.side===j.side&&+row.size_pct===Math.abs(j.call),'sheet vs close JSON '+c.ticker+' '+k);
  const pnl=Math.round((row.side==='LONG'?1:-1)*R.move*1000);must(pnl===j.pnl,'P&L '+c.ticker+' '+k+' '+pnl+' vs '+j.pnl);
  items.push({k,t:c.ticker,side:row.side,move:+row.size_pct,conf:+row.confidence_pct,keep,hl:w.hl,plain:w.plain||'',pnl:j.pnl,right:j.right})})});
if(fails.length){console.error('DATA CHECK FAILED\n'+fails.join('\n'));process.exit(1)}
const FEEDD={cos,items,marks:{GEMINI:{d:M5.GEMINI.d},QWEN:{d:M5.QWEN.d,fr:M5.QWEN.fr}}};

function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');
  const css=fs.readFileSync(path.join(HERE,'feed.css'),'utf8'),js='var FEEDD='+JSON.stringify(FEEDD)+';\n'+fs.readFileSync(path.join(HERE,'feed.js'),'utf8');
  const hook='var h0=(location.hash||"").slice(1);';if(t.split(hook).length!==2)throw new Error('router line not found once');
  t=t.replace(hook,js+'\n'+hook);return t+'\n<style>\n'+css+'\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__feed.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const CLOCK='2026-11-20T18:09:00Z';   // 1:09 PM in New York, Fri Nov 20 (the trades are in, the close is tonight)
// [name, query]
let SHOTS=[['F1','f=1'],['F2','f=2'],['F3','f=3'],['F4','f=4&open=GROK-INTU'],['F1g','f=1&g=1'],['F2g','f=2&g=1'],['F3g','f=3&g=1'],['F4g','f=4&g=1&open=GROK-INTU']];
const WIDTHS=[320,390,1280];if(process.env.ONLY){const o=process.env.ONLY.split(',');SHOTS=SHOTS.filter(s=>o.indexOf(s[0])>-1)}
const TEASE=process.env.ONLY&&!/T/.test(process.env.ONLY)?[]:[['T1','teaser=T1&g=1'],['T2','teaser=T2']];

function measure(){const W=innerWidth,vis=e=>{const r=e.getBoundingClientRect();if(r.width<.5||r.height<.5)return null;
    let x=e;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return null;x=x.parentElement}return r};
  const res={W,sw:document.documentElement.scrollWidth,fonts:[...document.fonts].filter(f=>f.status==='loaded').map(f=>f.family+' '+f.weight).filter((v,i,a)=>a.indexOf(v)===i),poke:[],trunc:[],spill:[],overlap:[],slots:{},nums:[]};
  const all=[...document.querySelectorAll('main *')];
  // 1 anything outside its panel
  all.forEach(e=>{const r=vis(e);if(!r)return;const pn=e.closest('.pn');if(!pn)return;const p=pn.getBoundingClientRect();
    if(r.right>p.right+.5||r.left<p.left-.5)res.poke.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' "'+(e.textContent||'').trim().slice(0,30)+'" dx '+Math.max(r.right-p.right,p.left-r.left).toFixed(1))});
  // 2 cut text and text spilling out of its box
  all.forEach(e=>{if(!vis(e))return;const c=getComputedStyle(e);if((c.textOverflow==='ellipsis'||c.overflow==='hidden')&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)&&e.textContent.trim()&&!e.matches('.fco,.ai,.pn'))res.trunc.push(e.tagName+'.'+e.className+' "'+e.textContent.trim().slice(0,40)+'"')});
  all.forEach(e=>{if(!vis(e))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const c=getComputedStyle(e);if(c.display==='inline')return;
    const rg=document.createRange();rg.selectNodeContents(e);const t=rg.getBoundingClientRect(),b=e.getBoundingClientRect();if(t.width>b.width+1.5||t.right>b.right+1.5)res.spill.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,24)+'" '+t.width.toFixed(0)+'>'+b.width.toFixed(0))});
  // 3 overlapping atoms in each card: text-bearing elements (each line box of an inline) and the marks
  document.querySelectorAll('main [data-call], main .pn').forEach(pn=>{const at=[];[...pn.querySelectorAll('*')].forEach(e=>{if(e.closest('.ai,.fco')&&!e.matches('.ai,.fco'))return;if(!vis(e))return;
      const own=e.matches('.ai,.fco,svg')||[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)return;
      let rs;if(e.matches('.ai,.fco,svg'))rs=[e.getBoundingClientRect()];else{rs=[];[...e.childNodes].forEach(n=>{if(n.nodeType!==3||!n.textContent.trim())return;const rg=document.createRange();rg.selectNodeContents(n);rs.push(...rg.getClientRects())})}
      rs.forEach(r=>at.push([e,r]))});
    for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){const [a,ra]=at[i],[b,rb]=at[j];if(a===b||a.contains(b)||b.contains(a))continue;
      const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left),iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top);
      if(ix>.75&&iy>.75)res.overlap.push((a.className.baseVal!==undefined?'svg':a.className||a.tagName)+' "'+a.textContent.trim().slice(0,16)+'" x '+(b.className.baseVal!==undefined?'svg':b.className||b.tagName)+' "'+b.textContent.trim().slice(0,16)+'" '+ix.toFixed(1)+'x'+iy.toFixed(1))}});
  // 4 siblings: every slot of every card of one kind at the same place (left, centre or right edge, measured from the card)
  const set=(name,rows,slots)=>{rows=rows.filter(r=>vis(r));if(rows.length<2)return;slots.forEach(([k,sel,edge])=>{const xs=[];rows.forEach(r=>{const e=r.querySelector(sel);const b=e&&vis(e);if(!b)return;const rr=r.getBoundingClientRect();
      xs.push([b.left-rr.left,(b.left+b.right)/2-rr.left,b.right-rr.left])});if(xs.length<2)return;
    const i={l:0,c:1,r:2}[edge],v=xs.map(x=>x[i]);res.slots[name+' '+k]={n:xs.length,dx:+(Math.max(...v)-Math.min(...v)).toFixed(2),edge}})};
  // a row's slots are measured inside rows of the same width (F1 bubbles of one side, F2 rows of one card, etc.)
  const groups=(sel)=>{const g={};document.querySelectorAll(sel).forEach(r=>{const k=Math.round(r.getBoundingClientRect().width)+'|'+(r.classList.contains('S')?'S':'L');(g[k]=g[k]||[]).push(r)});return Object.values(g)};
  groups('main .f1m:not(.E)').forEach((g,i)=>set('F1 bubble'+i+(g[0].classList.contains('S')?'(short)':'(long)'),g,[['mark','.ai',g[0].classList.contains('S')?'r':'l'],['name','.fnm','l'],['side','.f1w .fsd','r'],['reason','.fq','l'],['confidence','.fcf','l'],['receipt','.frc','r']]));
  set('F1 rooms',[...document.querySelectorAll('main .f1')],[['logo','.f1h .fco','l'],['company','.f1h .fcn','l'],['split L','.f1s .L','l'],['split S','.f1s .S','r']]);
  set('F2 cards',[...document.querySelectorAll('main .f2')],[['logo','.f2h .fco','l'],['company','.f2h .fcn','l'],['bar','.f2s','l']]);
  groups('main .f2r').forEach((g,i)=>set('F2 rows'+i,g,[['mark','.ai','l'],['name','.fnm','l'],['side','.f2t .fsd','r'],['meter','.f2m','l'],['confidence','.fcf','l'],['reason','.fq','l'],['receipt','.frc','l']]));
  groups('main .f3').forEach((g,i)=>set('F3 posts'+i,g,[['mark','.f3h .ai','l'],['name','.fnm','l'],['side','.f3sd','r'],['reason','.f3q','l'],['logo','.f3c .fco','l'],['company','.f3c .fcn','l'],['card side','.f3cs','r'],['receipt','.frc','r']]));
  groups('main .f4r').forEach((g,i)=>set('F4 rows'+i,g,[['mark','.ai','l'],['name','.fnm','l'],['logo','.f4co .fco','l'],['side','.f4sd','l'],['confidence','.fcf','l'],['line','.f4k','l'],['caret','.f4cv','r']]));
  // 5 the numbers and words as printed, per trade
  document.querySelectorAll('main [data-call]').forEach(e=>{const q=s=>{const x=[...e.querySelectorAll(s)].find(y=>vis(y));return x?x.textContent.replace(/\s+/g,' ').trim():null};
    res.nums.push({id:e.getAttribute('data-call'),side:q('.fsd'),conf:q('.fcf'),pnl:q('.frc'),quote:q('.fq'),plain:q('.fpl p')})});
  return res}

(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const report={},errs=[];
  const go=async(ctx,q)=>{const p=await ctx.newPage();p.on('pageerror',e=>errs.push(q+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(q+' console: '+m.text())});
    await p.clock.setFixedTime(new Date(CLOCK));await p.goto(`http://localhost:${port}/__feed.html?${q}`,{waitUntil:'networkidle'}).catch(e=>errs.push(q+' goto '+e.message));
    await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(700);return p};
  for(const [n,q] of SHOTS)for(const w of WIDTHS){if(/g$/.test(n)&&w===320)continue;
    const ctx=await b.newContext({viewport:{width:w,height:w<500?844:800},deviceScaleFactor:w<500?2:1,timezoneId:'America/New_York',locale:'en-US'});const p=await go(ctx,q);
    report[n+'@'+w]=await p.evaluate(measure);
    await p.addStyleTag({content:'.nav{position:static!important}.app{padding-bottom:16px!important}'});await p.waitForTimeout(120);
    if(w>320)await p.screenshot({path:`${OUT}/${n}-${w}.png`,fullPage:true});await ctx.close()}
  /* the X images: one card filling a 1080x1350 frame. Find the width at which the frame (header + card) is 4:5, then shoot at 1080/w */
  for(const [n,q] of TEASE){let best=null;for(let w=330;w<=520;w+=10){const ctx=await b.newContext({viewport:{width:w,height:Math.round(w*1.25)},deviceScaleFactor:1,timezoneId:'America/New_York'});
      const p=await go(ctx,q);const h=await p.evaluate(()=>{const c=document.querySelector('.fts>*').getBoundingClientRect();return c.bottom+18});await ctx.close();
      if(h<=w*1.25){best=w;break}}
    best=best||520;const ctx=await b.newContext({viewport:{width:best,height:Math.round(best*1.25)},deviceScaleFactor:1080/best,timezoneId:'America/New_York'});const p=await go(ctx,q);
    report[n+'@'+best]=await p.evaluate(measure);await p.screenshot({path:`${OUT}/${n}.png`});await ctx.close();console.log(n,'frame width',best,'css px, scale',(1080/best).toFixed(3))}
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({errs,report},null,1));
  /* numbers and words as printed vs the files */
  const sg=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US');let bad=[],seen=0;
  for(const k in report)report[k].nums.forEach(x=>{const it=items.find(i=>i.k+'-'+i.t===x.id);seen++;
    if(x.side!==null&&x.side!==it.side+' '+String(it.move)+'%')bad.push(k+' '+x.id+' side '+x.side);
    if(x.conf!==null&&x.conf!==it.conf+'% confident')bad.push(k+' '+x.id+' confidence '+x.conf);
    if(x.pnl!==null&&x.pnl!=='P&L '+sg(it.pnl))bad.push(k+' '+x.id+' P&L '+x.pnl);
    if(x.quote!==null&&x.quote!==it.keep&&x.quote!==it.hl)bad.push(k+' '+x.id+' words "'+x.quote.slice(0,50)+'"');
    if(x.plain!==null&&x.plain!==it.plain)bad.push(k+' '+x.id+' plain words')});
  for(const k in report){const m=report[k],off=Object.entries(m.slots).filter(([s,v])=>v.dx>1);
    console.log(k.padEnd(10),'sw',m.sw+'/'+m.W,'poke',m.poke.length,'cut',m.trunc.length,'spill',m.spill.length,'overlap',m.overlap.length,'slots',Object.keys(m.slots).length,'off>1px',off.length?off.map(([s,v])=>s+' dx'+v.dx).join('; '):'none');
    if(m.poke.length)console.log('   poke',m.poke.slice(0,4).join(' | '));if(m.trunc.length)console.log('   cut',m.trunc.slice(0,4).join(' | '));
    if(m.spill.length)console.log('   spill',m.spill.slice(0,4).join(' | '));if(m.overlap.length)console.log('   overlap',m.overlap.slice(0,4).join(' | '))}
  console.log('printed trades checked',seen,'mismatches',bad.length?'\n'+bad.join('\n'):0);
  console.log('fonts',(Object.values(report)[0]||{fonts:[]}).fonts.join(', '));console.log('errors',errs.length?errs.join('\n'):'none');await b.close();srv.close()})();
