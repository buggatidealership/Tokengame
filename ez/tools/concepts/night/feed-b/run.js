// FEED PRODUCT DESK B (night of 20 Nov 2026): five production mockups of the Season 2 Feed tab, PM6 to PM10, shown INSIDE a copy of the
// live terminal (ez/v53-terminal.html). Never touches a live file.
//   node tools/concepts/night/feed-b/run.js <outdir>        (from ez/; then /usr/bin/python3 tools/concepts/night/feed-b/board.py <outdir>)
//   ONLY=PM6,PM8 limits the takes; FILM=1 also writes the phone and desktop screens the walkthrough film uses (dopa/w6/nt/pmB/).
// Data: ez/data/s2-calls/calls.csv (sides, sizes, confidence, every reason verbatim, the graded move and P&L), ../../feed/words.json (the key
// clause, verbatim), plain.json (OUR reading, each sentence tied to the verbatim clauses it restates). It refuses to build when a shown text,
// a key clause, a source clause or a "proves it wrong" line is not verbatim, or when a reading holds a number the AI did not write, or when a
// P&L is not $100K x side x move. Measures at 320/390/1280: sideways scroll, anything poking out of its panel, cut or spilled text,
// overlapping atoms, sibling slots, text contrast (WCAG, composited over the page ground), tap targets (>= 44 px).
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'fbout');fs.mkdirSync(OUT,{recursive:true});
const readCSV=require(path.join(EZ,'tools/concepts/feed/csv.js'));
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};

/* ---------------- data, checked ---------------- */
const CSV=readCSV(fs.readFileSync(path.join(EZ,'data/s2-calls/calls.csv'),'utf8'));
const W=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/feed/words.json'),'utf8'));
const P=JSON.parse(fs.readFileSync(path.join(HERE,'plain.json'),'utf8'));
const CL=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/data/close-2026-11-20.json'),'utf8'));
const M5=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/models5.json'),'utf8'));
const KEY={GPT:'GPT',Claude:'CLAUDE',Grok:'GROK',Gemini:'GEMINI',Qwen:'QWEN'};
const fails=[];const must=(ok,msg)=>{if(!ok)fails.push(msg)};
const TK=['INTU','KEYS','ESTC'];
const cos=TK.map(t=>{const r=CL.rounds.find(x=>x.ticker===t);return {t,co:r.co,n:r.s2n,logo:'tools/concepts/dopa/'+r.logo,move:r.move}});
/* the order calls land on report day is ILLUSTRATIVE: the sheet records no filing time. We use the order of the owner's screenshots. */
const ARR=['CLAUDE','GPT','QWEN','GEMINI','GROK'];
const items=[];
TK.forEach(t=>{const R=CL.rounds.find(r=>r.ticker===t);ARR.forEach(k=>{const mk=Object.keys(KEY).find(m=>KEY[m]===k);
  const row=CSV.find(r=>r.ticker===t&&r.model===mk),w=W[t][mk],pl=P[t][mk],j=R.calls.find(x=>x.k===k);
  must(row&&w&&pl&&j,'missing '+t+' '+k);
  const all=['why','take','thesis','kill','lessons_entry','other_reasoning'].map(f=>row[f]||'').join(' \n ');
  /* the reason as shown: the AI's WHY line, its leading "Short, small: " / "Long, small: " dropped (the side badge says it), a word hidden in
     the screenshot shown as […] */
  let shown=row.why.replace(/^(Short|Long), small: /,'');const raw=shown;shown=shown.replace(/\[hidden\]f/,'[…]');
  must(row.why.indexOf(raw)>-1,'NOT VERBATIM '+t+' '+k);
  must(shown.indexOf(w.hl)>-1,'key clause not inside the shown reason '+t+' '+k+': '+w.hl);
  const srcs=[];const s=pl.s.map(([txt,sr])=>{const ix=sr.map(c=>{must(raw.indexOf(c)>-1,'SOURCE NOT VERBATIM IN THE SHOWN REASON '+t+' '+k+': '+c);let i=srcs.indexOf(c);if(i<0){srcs.push(c);i=srcs.length-1}return i});
    (txt.match(/\d+(\.\d+)?/g)||[]).forEach(n=>must(all.indexOf(n)>-1,'READING HOLDS A NUMBER THE AI DID NOT WRITE '+t+' '+k+': '+n));
    must(!/\b(bet|bets|paper|simulated)\b|\b(go|goes|going) (up|down)\b|said it would/i.test(txt),'banned word in reading '+t+' '+k+': '+txt);return [txt,ix]});
  if(pl.wrong)must(all.indexOf(pl.wrong)>-1,'"proves it wrong" NOT VERBATIM '+t+' '+k);
  const words=pl.s.map(x=>x[0]).join(' ').split(/\s+/).length;must(words<=25,'READING LONGER THAN 25 WORDS '+t+' '+k+': '+words);
  const notes=pl.notes?row[pl.notes]:'';
  must(row.side===j.side&&+row.size_pct===Math.abs(j.call),'sheet vs close JSON '+t+' '+k);
  const pnl=Math.round((row.side==='LONG'?1:-1)*R.move*1000);must(pnl===j.pnl&&pnl===+row.pnl_usd,'P&L '+t+' '+k+' '+pnl+' vs '+j.pnl+' vs '+row.pnl_usd);
  must((row.right==='yes')===j.right,'right/wrong '+t+' '+k);
  items.push({words,k,t,side:row.side,size:+row.size_pct,conf:+row.confidence_pct,why:shown,hl:w.hl,srcs,plain:s,wrong:pl.wrong||'',notes,notesField:pl.notes||'',pnl,right:j.right,move:R.move})})});
if(fails.length){console.error('DATA CHECK FAILED\n'+fails.join('\n'));process.exit(1)}
const day={};ARR.forEach(k=>{day[k]=items.filter(x=>x.k===k).reduce((a,x)=>a+x.pnl,0)});
must(day.GROK===17660&&day.CLAUDE===3520&&day.GEMINI===-7920&&day.QWEN===-17660&&day.GPT===-22060,'day P&L does not match the Season 2 board');
if(fails.length){console.error(fails.join('\n'));process.exit(1)}
const FBD={cos,items,arr:ARR,day,marks:{GEMINI:{d:M5.GEMINI.d},QWEN:{d:M5.QWEN.d,fr:M5.QWEN.fr}}};

function page(){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');
  const css=fs.readFileSync(path.join(HERE,'fb.css'),'utf8'),js='var FBD='+JSON.stringify(FBD)+';\n'+fs.readFileSync(path.join(HERE,'fb.js'),'utf8');
  const hook='var h0=(location.hash||"").slice(1);';if(t.split(hook).length!==2)throw new Error('router line not found once');
  t=t.replace(hook,js+'\n'+hook);return t+'\n<style>\n'+css+'\n</style>\n'}
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__fb.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page())}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});

/* clocks (UTC): Thu Nov 19 2:21 PM EST (2 of 5 in), 3:01 PM (locked), 9:30 PM (reported, waiting for Friday's close);
   Fri Nov 20 1:09 PM (in play), 6:30 PM (graded) */
const C={pre:'2026-11-19T19:21:00Z',lock:'2026-11-19T20:01:00Z',wait:'2026-11-20T02:30:00Z',in:'2026-11-20T18:09:00Z',g:'2026-11-20T23:30:00Z'};
// [name, query, clock, widths, {vp: viewport-only shot}]
let SHOTS=[
 ['PM6-in','pm=6&s=in&open=GROK-INTU',C.in,[320,390,1280]],['PM6-g','pm=6&s=g&open=CLAUDE-INTU',C.g,[320,390,1280]],['PM6-pre','pm=6&s=pre',C.pre,[320,390]],
 ['PM7-in','pm=7&s=in&open=GROK-INTU',C.in,[320,390,1280]],['PM7-sheet','pm=7&s=in&open=GROK-INTU&sheet=1',C.in,[320,390],{vp:1}],['PM7-g','pm=7&s=g&co=INTU&open=CLAUDE-INTU',C.g,[390,1280]],
 ['PM8-pre','pm=8&s=pre',C.pre,[320,390,1280]],['PM8-lock','pm=8&s=lock',C.lock,[390,1280]],['PM8-wait','pm=8&s=wait',C.wait,[320,390]],
 ['PM9-in','pm=9&s=in',C.in,[320,390,1280]],["PM9-src","pm=9&s=in&open=CLAUDE-INTU&src=1",C.in,[390,1280]],['PM9-ai','pm=9&s=in&first=ai',C.in,[390]],
 ['PM10-g','pm=10&s=g',C.g,[320,390,1280]],['PM10-right','pm=10&s=g&f=right',C.g,[390,1280]],['PM10-wrong','pm=10&s=g&f=wrong&co=INTU',C.g,[390]]];
if(process.env.ONLY){const o=process.env.ONLY.split(',');SHOTS=SHOTS.filter(s=>o.some(x=>s[0].indexOf(x)===0))}
const CAP={390:1900,320:1900,1280:1500};   /* board shots stop here (CSS px); measurements cover the whole page */

function measure(){const W=innerWidth,vis=e=>{const r=e.getBoundingClientRect();if(r.width<.5||r.height<.5)return null;
    let x=e;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return null;x=x.parentElement}return r};
  const res={W,sw:document.documentElement.scrollWidth,poke:[],trunc:[],spill:[],overlap:[],slots:{},contrast:{min:99,fails:[],n:0},taps:{n:0,fails:[]}};
  const root=document.querySelector('main .fbv');if(!root){res.err='no feed view';return res}
  const all=[...root.querySelectorAll('*')];
  all.forEach(e=>{const r=vis(e);if(!r)return;const pn=e.closest('.pn');if(!pn||e.closest('.fb-scroll'))return;const p=pn.getBoundingClientRect();
    if(r.right>p.right+.5||r.left<p.left-.5)res.poke.push((typeof e.className==='string'?e.className:e.tagName)+' "'+(e.textContent||'').trim().slice(0,30)+'" dx '+Math.max(r.right-p.right,p.left-r.left).toFixed(1))});
  all.forEach(e=>{if(!vis(e))return;const c=getComputedStyle(e);if(e.matches('[data-clamp],[data-clamp] *'))return;
    if((c.textOverflow==='ellipsis'||c.overflow==='hidden')&&(e.scrollWidth>e.clientWidth+1)&&e.textContent.trim()&&!e.matches('.ai,.bco,.pn,.fb-scroll,[data-trunc-ok]'))res.trunc.push(e.tagName+'.'+e.className+' "'+e.textContent.trim().slice(0,40)+'"')});
  all.forEach(e=>{if(!vis(e))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const c=getComputedStyle(e);if(c.display==='inline'||c.overflow==='hidden')return;
    const rg=document.createRange();rg.selectNodeContents(e);const t=rg.getBoundingClientRect(),b=e.getBoundingClientRect();if(t.width>b.width+1.5||t.right>b.right+1.5)res.spill.push((typeof e.className==='string'?e.className:e.tagName)+' "'+e.textContent.trim().slice(0,24)+'" '+t.width.toFixed(0)+'>'+b.width.toFixed(0))});
  /* overlaps inside each sibling item and each panel: text line boxes and marks */
  root.querySelectorAll('[data-sib], .pn').forEach(pn=>{const at=[];[...pn.querySelectorAll('*')].forEach(e=>{if(e.closest('.ai,.bco,.fl')&&!e.matches('.ai,.bco,.fl'))return;if(!vis(e))return;if(e.closest('.fb-scroll')&&!pn.matches('.fb-scroll'))return;
      const own=e.matches('.ai,.bco,svg.fl')||[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)return;
      let rs;if(e.matches('.ai,.bco,svg.fl'))rs=[e.getBoundingClientRect()];else{rs=[];[...e.childNodes].forEach(n=>{if(n.nodeType!==3||!n.textContent.trim())return;const rg=document.createRange();rg.selectNodeContents(n);rs.push(...rg.getClientRects())})}
      const cl=e.closest('[data-clamp]');if(cl){const cb=cl.getBoundingClientRect();rs=[...rs].filter(r=>r.top<cb.bottom-1&&r.bottom>cb.top+1)}   /* lines hidden by a line clamp are not drawn */
      rs.forEach(r=>at.push([e,r]))});
    for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){const [a,ra]=at[i],[b,rb]=at[j];if(a===b||a.contains(b)||b.contains(a))continue;
      const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left),iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top);
      if(ix>.75&&iy>.75){const k=(typeof a.className==='string'?a.className:'svg')+' "'+a.textContent.trim().slice(0,14)+'" x '+(typeof b.className==='string'?b.className:'svg')+' "'+b.textContent.trim().slice(0,14)+'" '+ix.toFixed(1)+'x'+iy.toFixed(1);if(res.overlap.indexOf(k)<0)res.overlap.push(k)}}});
  /* siblings: items of one kind (data-sib) and the same width; each [data-slot] at the same place (edge in data-edge) */
  const g={};root.querySelectorAll('[data-sib]').forEach(r=>{const b=vis(r);if(!b)return;const k=r.dataset.sib+'|'+Math.round(b.width);(g[k]=g[k]||[]).push(r)});
  Object.entries(g).forEach(([k,rows])=>{if(rows.length<2)return;const slots={};rows.forEach(r=>{const rr=r.getBoundingClientRect();r.querySelectorAll('[data-slot]').forEach(e=>{if(e.parentElement.closest('[data-sib]')!==r)return;const b=vis(e);if(!b)return;
      const ed=e.dataset.edge||'l',x=ed==='r'?b.right-rr.left:ed==='c'?(b.left+b.right)/2-rr.left:b.left-rr.left;(slots[e.dataset.slot]=slots[e.dataset.slot]||[]).push(x)})});
    Object.entries(slots).forEach(([s,v])=>{if(v.length<2)return;res.slots[k.split('|')[0]+' '+s]={n:v.length,dx:+(Math.max(...v)-Math.min(...v)).toFixed(2)}})});
  /* contrast: every visible text element against its backgrounds, composited down to the page ground */
  const pc=s=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [p[0],p[1],p[2],p.length>3?p[3]:1]};
  const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
  const over=(top,bot)=>{const a=top[3];return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1]};
  const GROUND=[10,46,32,1];   /* #0a2e20: the page gradient's light band, the worst case under a panel */
  all.forEach(e=>{const r=vis(e);if(!r)return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;if(e.closest('[aria-hidden="true"]'))return;
    const cs=getComputedStyle(e);if(cs.webkitTextFillColor&&cs.webkitTextFillColor.indexOf('rgba(0, 0, 0, 0)')===0)return;
    let fg=pc(cs.color);let chain=[];let x=e;while(x&&x!==document.documentElement){const b=pc(getComputedStyle(x).backgroundColor);if(b&&b[3]>0)chain.push(b);x=x.parentElement}
    let bg=GROUND;for(let i=chain.length-1;i>=0;i--)bg=over(chain[i],bg);
    /* an element's own opacity (and its ancestors') thins its text */
    let op=1;x=e;while(x&&x!==document.body){op*=+getComputedStyle(x).opacity;x=x.parentElement}
    fg=over([fg[0],fg[1],fg[2],fg[3]*op],bg);const L1=lum(fg),L2=lum(bg),cr=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);res.contrast.n++;
    if(cr<res.contrast.min)res.contrast.min=+cr.toFixed(2);if(cr<4.5)res.contrast.fails.push((typeof e.className==='string'?e.className:e.tagName)+' "'+e.textContent.trim().slice(0,22)+'" '+cr.toFixed(2))});
  /* taps: every control in the feed view at least 44 x 44 */
  root.querySelectorAll('button,a,[role=button],[tabindex="0"]').forEach(e=>{const r=vis(e);if(!r)return;res.taps.n++;if(r.width<43.5||r.height<43.5)res.taps.fails.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,18)+'" '+r.width.toFixed(0)+'x'+r.height.toFixed(0))});
  return res}

/* FILM=1: the screens the walkthrough film (dopa/nt-pmB.html) uses, and where things are on them, into dopa/w6/nt/pmB/ */
const FD=path.join(EZ,'tools/concepts/dopa/w6/nt/pmB');
const FS=[['f6a','pm=6&s=in',C.in,{p:['[data-call="GROK-INTU"] .b6h','.b6t']}],['f6b','pm=6&s=in&open=GROK-INTU',C.in,{p:['[data-call="GROK-INTU"] .b6h','[data-call="GROK-INTU"] .bpl','[data-call="GROK-INTU"] .bq']}],
 ['f7a','pm=7&s=in',C.in,{w:1280,p:['[data-call="GROK-INTU"].b7p','.b7r','.b7m','.b7l']}],['f7b','pm=7&s=in&open=GROK-INTU',C.in,{w:1280,p:['[data-call="GROK-INTU"].b7p','.b7r','.b7r .bpl','.b7r .b7hd']}],
 ['f8a','pm=8&s=pre&n=1','2026-11-19T19:10:00Z',{p:['.b8s','.b8sl:nth-child(2)','.b8cd','.b8ps']}],['f8b','pm=8&s=pre&n=2','2026-11-19T19:21:00Z',{p:['.b8s','.b8sl:nth-child(2)','.b8p.new','.b8cd']}],
 ['f8c','pm=8&s=pre&n=3','2026-11-19T19:34:00Z',{p:['.b8s','.b8sl:nth-child(3)','.b8p.new']}],['f8d','pm=8&s=lock',C.lock,{p:['.b8s','.b8cd','.b8in']}],
 ['f9a','pm=9&s=in',C.in,{p:['.b9p .b9more','.b9p .b9r','.b9p']}],['f9b','pm=9&s=in&open=CLAUDE-INTU&src=1',C.in,{p:['.b9p.op .b9r','.b9p.op .b9w','.b9p.op']}],
 ['f10a','pm=10&s=g',C.g,{p:['.b10v','.b10f [data-bf="right"]','.b10p','.b10hl']}],['f10b','pm=10&s=g&f=right',C.g,{p:['.b10p','.b10p .b10rc','.b10f [data-bf="right"]']}]];
async function filmShots(b,port){fs.mkdirSync(FD,{recursive:true});const geo={};
  for(const [n,q,clock,o] of FS){const w=o.w||390,dsf=w>500?1.5:3;
    const ctx=await b.newContext({viewport:{width:w,height:w>500?800:844},deviceScaleFactor:dsf,timezoneId:'America/New_York',locale:'en-US'});const p=await ctx.newPage();
    await p.clock.setFixedTime(new Date(clock));await p.goto(`http://localhost:${port}/__fb.html?${q}#feed`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(500);
    if(w>500){await p.screenshot({path:path.join(FD,n+'.jpg'),type:'jpeg',quality:92})}
    else{if(n==='f6a'){await p.locator('#nav').screenshot({path:path.join(FD,'nav.jpg'),type:'jpeg',quality:92})}
      await p.addStyleTag({content:'.nav{display:none!important}.app{padding-bottom:20px!important}.top{position:relative!important}.b8cur{animation:none!important}'});await p.waitForTimeout(150);
      const H=await p.evaluate(()=>document.documentElement.scrollHeight);await p.screenshot({path:path.join(FD,n+'.jpg'),type:'jpeg',quality:90,fullPage:true,clip:{x:0,y:0,width:w,height:Math.min(H,2600)}})}
    geo[n]=await p.evaluate(sels=>{const r={top:document.querySelector('.top').getBoundingClientRect().bottom+scrollY,H:Math.min(document.documentElement.scrollHeight,2600)};sels.forEach(s=>{const e=document.querySelector(s);if(e){const b=e.getBoundingClientRect();r[s]=[b.left,b.top+scrollY,b.width,b.height].map(v=>+v.toFixed(1))}});return r},o.p);
    await ctx.close()}
  fs.writeFileSync(path.join(FD,'geo.json'),JSON.stringify(geo,null,1));console.log('film screens',Object.keys(geo).length,'->',FD)}
(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const report={},errs=[];
  if(process.env.FILM){await filmShots(b,port);if(process.env.FILM==='only'){await b.close();srv.close();return}}
  for(const [n,q,clock,widths,opt] of SHOTS)for(const w of widths){
    const ctx=await b.newContext({viewport:{width:w,height:w<500?844:860},deviceScaleFactor:w<500?2:1,timezoneId:'America/New_York',locale:'en-US'});
    const p=await ctx.newPage();p.on('pageerror',e=>errs.push(n+'@'+w+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(n+'@'+w+' console: '+m.text())});
    await p.clock.setFixedTime(new Date(clock));
    await p.goto(`http://localhost:${port}/__fb.html?${q}#feed`,{waitUntil:'networkidle'}).catch(e=>errs.push(n+' goto '+e.message));
    await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(600);
    if(process.env.EVAL){console.log(n+'@'+w,JSON.stringify(await p.evaluate(process.env.EVAL)));await ctx.close();continue}
    report[n+'@'+w]=await p.evaluate(measure);
    if(w===320){await ctx.close();continue}
    if(opt&&opt.vp){await p.screenshot({path:`${OUT}/${n}-${w}.png`})}
    else{await p.addStyleTag({content:'.nav{position:static!important}.app{padding-bottom:16px!important}'});await p.waitForTimeout(120);
      const H=await p.evaluate(()=>document.documentElement.scrollHeight);
      await p.screenshot({path:`${OUT}/${n}-${w}.png`,clip:{x:0,y:0,width:w,height:Math.min(H,CAP[w])},fullPage:true})}
    await ctx.close()}
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({errs,report},null,1));
  for(const k in report){const m=report[k];if(m.err){console.log(k,m.err);continue}const bad=Object.entries(m.slots).filter(([s,v])=>v.dx>1);
    console.log(k.padEnd(16),'sw',m.sw+'/'+m.W,'poke',m.poke.length,'trunc',m.trunc.length,'spill',m.spill.length,'overlap',m.overlap.length,'slots',Object.keys(m.slots).length,'off>1px',bad.length?bad.map(([s,v])=>s+' '+v.dx).join('; '):'none',
      '| contrast min',m.contrast.min,'fails',m.contrast.fails.length,'| taps',m.taps.n,'small',m.taps.fails.length)}
  console.log('errors',errs.length?errs.join('\n'):'none');await b.close();srv.close()})();
