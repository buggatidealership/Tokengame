// FEED PRODUCT DESK A (night studio, 20 Nov 2026): five production mockups of the Season 2 Feed tab, shown inside the live terminal.
// node tools/concepts/night/feed-a/run.js <outdir>     (from ez/; then /usr/bin/python3 tools/concepts/night/feed-a/board.py <outdir>)
// Never touches a live file. Builds the data from data/s2-calls/calls.csv (every word verbatim), feed/words.json (the kept line and its
// one marked clause), plain.json (our plain readings and the jargon rule) and dopa/data/close-2026-11-20.json (moves, P&L); refuses to
// build on any mismatch. Hands the browser a copy of v53-terminal.html with pm.css appended and FA + pm.js run inside the page's own
// script (just before its router line), so the mockups reuse the live helpers and tokens. Writes pm.html (the same page, static, with
// <base> to ez/) for opening by hand. Shoots PM1..PM5 x states (pre: calls coming in, in: all in, g: graded) at 320/390/1280 and measures:
// sideways scroll, anything poking out of its panel, cut or spilled text, overlapping atoms, sibling slots, text contrast, tap targets,
// and every printed side, confidence, P&L, quote and plain reading against the files.
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const EZ=path.resolve(__dirname,'../../../..'),HERE=__dirname,OUT=path.resolve(process.argv[2]||'faout');fs.mkdirSync(OUT,{recursive:true});
const readCSV=require(path.join(EZ,'tools/concepts/feed/csv.js'));
const MIME={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.json':'application/json'};

/* ---- data ---- */
const CSV=readCSV(fs.readFileSync(path.join(EZ,'data/s2-calls/calls.csv'),'utf8'));
const W=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/feed/words.json'),'utf8'));
const PJ=JSON.parse(fs.readFileSync(path.join(HERE,'plain.json'),'utf8'));
const CL=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/data/close-2026-11-20.json'),'utf8'));
const M5=JSON.parse(fs.readFileSync(path.join(EZ,'tools/concepts/dopa/models5.json'),'utf8'));
const KEY={GPT:'GPT',Claude:'CLAUDE',Grok:'GROK',Gemini:'GEMINI',Qwen:'QWEN'},AIO=['GPT','CLAUDE','GROK','GEMINI','QWEN'];
const fails=[];const must=(ok,msg)=>{if(!ok)fails.push(msg)};
const cos=CL.rounds.slice().sort((a,b)=>b.n-a.n).map(r=>({ticker:r.ticker,co:r.co,n:r.s2n,logo:'tools/concepts/dopa/'+r.logo,move:r.move,pct:r.pct}));
const jscore=s=>PJ.jargon.filter(j=>s.indexOf(j)>-1).length;
const items=[];
cos.forEach(c=>{const R=CL.rounds.find(r=>r.ticker===c.ticker);AIO.forEach(k=>{
  const nm=Object.keys(KEY).find(m=>KEY[m]===k),row=CSV.find(r=>r.ticker===c.ticker&&r.model===nm),w=W[c.ticker][nm],j=R.calls.find(x=>x.k===k);
  must(row&&w&&j,'missing '+c.ticker+' '+k);const keep=w.keep,core=keep.replace(/ …$/,'');
  must(row.why.indexOf(core)>-1,'NOT VERBATIM '+c.ticker+' '+k);must(keep.indexOf(w.hl)>-1,'highlight outside the kept text '+c.ticker+' '+k);
  must(!/\[(cut off|hidden)\]/.test(keep),'kept text holds a hidden marker '+c.ticker+' '+k);
  must(row.side===j.side&&+row.size_pct===Math.abs(j.call),'sheet vs close JSON '+c.ticker+' '+k);
  const pnl=Math.round((row.side==='LONG'?1:-1)*R.move*1000);must(pnl===j.pnl&&pnl===+row.pnl_usd,'P&L '+c.ticker+' '+k);
  must((row.right==='yes')===j.right,'right '+c.ticker+' '+k);must(+row.move_pct===R.move,'move '+c.ticker);
  const id=k+'-'+c.ticker,js=jscore(keep),pl=PJ.plain[id];
  must(!pl||!/[—–]/.test(pl.p),'long dash in plain '+id);
  // the AI's own fields, verbatim; a field the screenshot cut off is kept out of a production page and flagged ("[cut off]" text)
  const f=n=>{const v=(row[n]||'').trim();return /^\[cut off\]$/.test(v)?'':v};
  items.push({k,t:c.ticker,co:c.co,n:c.n,side:row.side,size:+row.size_pct,conf:+row.confidence_pct,keep,hl:w.hl,why:row.why,
    take:f('take'),thesis:f('thesis'),kill:f('kill'),lessons:f('lessons_entry'),other:f('other_reasoning'),sources:f('sources_shown'),receipt:f('journal_receipt'),
    jargon:js,plain:pl?pl.p:'',fold:js>=3,pnl:j.pnl,right:j.right,move:R.move,pct:R.pct})})});
// every jargon post must have a reading
items.forEach(x=>must(!x.fold||x.plain,'jargon post without a plain reading '+x.k+'-'+x.t));
if(fails.length){console.error('DATA CHECK FAILED\n'+fails.join('\n'));process.exit(1)}
console.log('jargon scores',items.map(x=>x.k+'-'+x.t+' '+x.jargon+(x.fold?' FOLD':'')).join(', '));
const FA={cos,items,marks:{GEMINI:{d:M5.GEMINI.d},QWEN:{d:M5.QWEN.d,fr:M5.QWEN.fr}}};

function page(base){let t=fs.readFileSync(path.join(EZ,'v53-terminal.html'),'utf8');
  const css=fs.readFileSync(path.join(HERE,'pm.css'),'utf8'),js='var FA='+JSON.stringify(FA)+';\n'+fs.readFileSync(path.join(HERE,'pm.js'),'utf8');
  const hook='var h0=(location.hash||"").slice(1);';if(t.split(hook).length!==2)throw new Error('router line not found once');
  t=t.replace(hook,js+'\n'+hook);if(base)t='<base href="../../../../">'+t;
  return t+'\n<style>\n'+css+'\n</style>\n'}
fs.writeFileSync(path.join(HERE,'pm.html'),page(true));   // open by hand from a server rooted at ez/: /tools/concepts/night/feed-a/pm.html?pm=1&s=in
const srv=http.createServer((q,s)=>{const u=decodeURIComponent(q.url.split('?')[0]);
  if(u==='/__pm.html'){s.writeHead(200,{'content-type':'text/html'});return s.end(page(false))}
  const f=path.join(EZ,u);if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);return s.end()}
  s.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(s)});
const CLOCK={pre:'2026-11-19T18:30:00Z',in:'2026-11-19T20:45:00Z',g:'2026-11-20T23:30:00Z'};   // 1:30 PM and 3:45 PM Thu Nov 19, 6:30 PM Fri Nov 20 (New York)
let SHOTS=[];[1,2,3,4,5].forEach(n=>['pre','in','g'].forEach(s=>SHOTS.push(['PM'+n+'-'+s,'pm='+n+'&s='+s,s])));
const WIDTHS=[320,390,1280];if(process.env.ONLY){const o=process.env.ONLY.split(',');SHOTS=SHOTS.filter(s=>o.some(x=>s[0].indexOf(x)===0))}
const CAP={390:3300,1280:1900,320:0};

function measure(){const W=innerWidth,vis=e=>{const r=e.getBoundingClientRect();if(r.width<.5||r.height<.5)return null;
    let x=e;while(x&&x!==document.body){const c=getComputedStyle(x);if(c.display==='none'||c.visibility==='hidden'||+c.opacity===0)return null;x=x.parentElement}return r};
  const res={W,sw:document.documentElement.scrollWidth,poke:[],trunc:[],spill:[],overlap:[],slots:{},nums:[],contrast:{min:99,fails:[],n:0},taps:{n:0,fails:[]}};
  const all=[...document.querySelectorAll('main *')];
  all.forEach(e=>{const r=vis(e);if(!r)return;const pn=e.closest('.pn');if(!pn||e.closest('.na-pk,.pick'))return;const p=pn.getBoundingClientRect();
    if(r.right>p.right+.5||r.left<p.left-.5)res.poke.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' "'+(e.textContent||'').trim().slice(0,30)+'" dx '+Math.max(r.right-p.right,p.left-r.left).toFixed(1))});
  all.forEach(e=>{if(!vis(e))return;const c=getComputedStyle(e);if((c.textOverflow==='ellipsis'||c.overflow==='hidden')&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+1)&&e.textContent.trim()&&!e.matches('.na-co,.ai,.pn,.na-clamp,.na-fold,.na-pk,.pick'))res.trunc.push(e.tagName+'.'+e.className+' "'+e.textContent.trim().slice(0,40)+'"')});
  all.forEach(e=>{if(!vis(e))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const c=getComputedStyle(e);if(c.display==='inline')return;
    const rg=document.createRange();rg.selectNodeContents(e);const t=rg.getBoundingClientRect(),b=e.getBoundingClientRect();if(t.width>b.width+1.5||t.right>b.right+1.5)res.spill.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,24)+'" '+t.width.toFixed(0)+'>'+b.width.toFixed(0))});
  document.querySelectorAll('main [data-call], main .na-card').forEach(pn=>{const at=[];[...pn.querySelectorAll('*')].forEach(e=>{if(e.closest('.ai,.na-co,.na-fl')&&!e.matches('.ai,.na-co,.na-fl'))return;if(!vis(e))return;
      const own=e.matches('.ai,.na-co,svg')||[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim());if(!own)return;if(e.closest('.na-clamp'))return;
      let rs;if(e.matches('.ai,.na-co,svg'))rs=[e.getBoundingClientRect()];else{rs=[];[...e.childNodes].forEach(n=>{if(n.nodeType!==3||!n.textContent.trim())return;const rg=document.createRange();rg.selectNodeContents(n);rs.push(...rg.getClientRects())})}
      rs.forEach(r=>at.push([e,r]))});
    for(let i=0;i<at.length;i++)for(let j=i+1;j<at.length;j++){const [a,ra]=at[i],[b,rb]=at[j];if(a===b||a.contains(b)||b.contains(a))continue;
      const ix=Math.min(ra.right,rb.right)-Math.max(ra.left,rb.left),iy=Math.min(ra.bottom,rb.bottom)-Math.max(ra.top,rb.top);
      if(ix>.75&&iy>.75)res.overlap.push((a.className.baseVal!==undefined?'svg':a.className||a.tagName)+' "'+a.textContent.trim().slice(0,16)+'" x '+(b.className.baseVal!==undefined?'svg':b.className||b.tagName)+' "'+b.textContent.trim().slice(0,16)+'" '+ix.toFixed(1)+'x'+iy.toFixed(1))}});
  // siblings: the same slot in every copy of one component, at the same place (left, centre or right edge, measured from the copy)
  const set=(name,rows,slots)=>{rows=rows.filter(r=>vis(r));if(rows.length<2)return;slots.forEach(([k,sel,edge])=>{const xs=[];rows.forEach(r=>{const e=r.querySelector(sel);const b=e&&vis(e);if(!b)return;const rr=r.getBoundingClientRect();
      xs.push([b.left-rr.left,(b.left+b.right)/2-rr.left,b.right-rr.left])});if(xs.length<2)return;
    const i={l:0,c:1,r:2}[edge],v=xs.map(x=>x[i]);res.slots[name+' '+k]={n:xs.length,dx:+(Math.max(...v)-Math.min(...v)).toFixed(2),edge}})};
  const groups=sel=>{const g={};document.querySelectorAll(sel).forEach(r=>{const k=Math.round(r.getBoundingClientRect().width)+'|'+(r.dataset.grp||'');(g[k]=g[k]||[]).push(r)});return Object.values(g)};
  groups('main .na-p').forEach((g,i)=>set('post'+i,g,[['mark','.na-ph .ai','l'],['name','.na-nm','l'],['logo','.na-tr .na-co','l'],['company','.na-tr .na-cn','l'],['side','.na-tr .na-sd','r'],['conf','.na-tr .na-cf','l'],['receipt','.na-rc','l']]));
  groups('main .na-r2').forEach((g,i)=>set('pm2 row'+i,g,[['mark','.ai','l'],['name','.na-nm','l'],['side','.na-sd','r'],['conf','.na-cf','l'],['clause','.na-kq','l'],['receipt','.na-rc','r']]));
  groups('main .na-c3').forEach((g,i)=>set('pm3 card'+i,g,[['mark','.ai','l'],['name','.na-nm','l'],['side','.na-sd','r'],['conf','.na-cf','l'],['clause','.na-kq','l'],['receipt','.na-rc','l']]));
  groups('main .na-e5').forEach((g,i)=>set('pm5 entry'+i,g,[['logo','.na-co','l'],['company','.na-cn','l'],['side','.na-sd','r'],['test','.na-tst','l'],['receipt','.na-rc','l']]));
  groups('main .na-pk button').forEach((g,i)=>set('chip'+i,g,[['mark','.ai','l']]));
  // contrast: every own text against the first opaque ground behind it (alpha grounds composited up the tree); WCAG 2 relative luminance
  const P=s=>{const m=s.match(/rgba?\(([^)]+)\)/);if(!m)return null;const a=m[1].split(/[ ,\/]+/).filter(Boolean).map(Number);return [a[0],a[1],a[2],a.length>3?a[3]:1]};
  const lum=c=>{const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(c[0])+.7152*f(c[1])+.0722*f(c[2])};
  const over=(top,bot)=>{const a=top[3];return [top[0]*a+bot[0]*(1-a),top[1]*a+bot[1]*(1-a),top[2]*a+bot[2]*(1-a),1]};
  const gi=c=>{const m=(c.backgroundImage||'').match(/rgba?\([^)]+\)/g);if(!m)return null;return m.map(P).sort((a,b)=>b[3]-a[3])[0]};
  const ground=e=>{const st=[];let x=e;while(x){const c=getComputedStyle(x),b=(P(c.backgroundColor)&&P(c.backgroundColor)[3]>0)?P(c.backgroundColor):gi(c);if(b&&b[3]>0){st.push(b);if(b[3]>=1)break}x=x.parentElement}
    let g=[14,12,11,1];for(let i=st.length-1;i>=0;i--)g=over(st[i],g);return g};
  all.forEach(e=>{if(!vis(e))return;if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const c=getComputedStyle(e);if(c.color==='rgba(0, 0, 0, 0)'||c.webkitTextFillColor==='rgba(0, 0, 0, 0)')return;
    let fg=P(c.color),op=1,x=e;while(x){op*=+getComputedStyle(x).opacity;x=x.parentElement}if(!fg)return;const g=ground(e);fg=over([fg[0],fg[1],fg[2],fg[3]*op],g);
    const L1=lum(fg),L2=lum(g),r=(Math.max(L1,L2)+.05)/(Math.min(L1,L2)+.05);res.contrast.n++;if(r<res.contrast.min)res.contrast.min=+r.toFixed(2);
    if(r<4.5)res.contrast.fails.push((e.className||e.tagName)+' "'+e.textContent.trim().slice(0,22)+'" '+r.toFixed(2))});
  // tap targets: every control in the mockup (buttons, links, tappable rows) at least 44 x 44 css px
  document.querySelectorAll('main button, main a, main [data-tap], main [data-nago], nav.nav button').forEach(e=>{const r=vis(e);if(!r)return;res.taps.n++;if(r.height<43.5||r.width<43.5)res.taps.fails.push((e.className||e.tagName)+' "'+(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,20)+'" '+r.width.toFixed(0)+'x'+r.height.toFixed(0))});
  // printed trades
  document.querySelectorAll('main [data-call]').forEach(e=>{const q=s=>{const x=[...e.querySelectorAll(s)].find(y=>vis(y)&&y.closest('[data-call]')===e);return x?x.textContent.replace(/\s+/g,' ').trim():null};
    res.nums.push({id:e.getAttribute('data-call'),side:q('.na-sd'),conf:q('.na-cf'),pnl:q('.na-rc .na-pl'),quote:q('.na-q'),kq:q('.na-kq'),plain:q('.na-pw p')})});
  return res}

(async()=>{await new Promise(r=>srv.listen(0,r));const port=srv.address().port;const b=await chromium.launch();const report={},errs=[];
  for(const [n,q,s] of SHOTS)for(const w of WIDTHS){
    const ctx=await b.newContext({viewport:{width:w,height:w<500?844:860},deviceScaleFactor:w<500?2:1,timezoneId:'America/New_York',locale:'en-US'});const p=await ctx.newPage();
    p.on('pageerror',e=>errs.push(n+'@'+w+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(n+'@'+w+' console: '+m.text())});
    await p.clock.setFixedTime(new Date(CLOCK[s]));await p.goto(`http://localhost:${port}/__pm.html?${q}&now=${CLOCK[s]}`,{waitUntil:'networkidle'}).catch(e=>errs.push(n+' goto '+e.message));
    await p.evaluate(()=>document.fonts&&document.fonts.ready);await p.waitForTimeout(600);
    report[n+'@'+w]=await p.evaluate(measure);
    if(w>320){await p.addStyleTag({content:'.nav{position:static!important}.app{padding-bottom:16px!important}'});await p.waitForTimeout(120);
      const h=await p.evaluate(()=>document.documentElement.scrollHeight),cap=CAP[w];
      await p.screenshot({path:`${OUT}/${n}-${w}.png`,fullPage:true,clip:{x:0,y:0,width:w,height:Math.min(h,cap)}});
      if(h>cap)fs.writeFileSync(`${OUT}/${n}-${w}.cut`,String(h))}
    await ctx.close()}
  fs.writeFileSync(`${OUT}/report.json`,JSON.stringify({errs,report},null,1));
  const sg=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US');let bad=[],seen=0;
  for(const k in report)report[k].nums.forEach(x=>{const it=items.find(i=>i.k+'-'+i.t===x.id);if(!it){bad.push(k+' unknown '+x.id);return}seen++;
    const sd=it.side+' ('+(it.side==='LONG'?'+':'−')+String(it.size)+'%)';
    if(x.side!==null&&x.side!==sd)bad.push(k+' '+x.id+' side '+x.side);
    if(x.conf!==null&&x.conf!==it.conf+'% confident')bad.push(k+' '+x.id+' confidence '+x.conf);
    if(x.pnl!==null&&x.pnl!=='P&L '+sg(it.pnl))bad.push(k+' '+x.id+' P&L '+x.pnl);
    const qn=x.quote&&x.quote.replace(/^“|”$/g,'');if(qn!==null&&qn!==it.keep&&qn!==it.why&&qn!==it.take&&qn!==it.hl)bad.push(k+' '+x.id+' words "'+x.quote.slice(0,50)+'"');
    const kn=x.kq&&x.kq.replace(/^“|”$/g,'');if(kn!==null&&kn!==it.hl)bad.push(k+' '+x.id+' key clause "'+x.kq.slice(0,40)+'"');
    if(x.plain!==null&&x.plain!==it.plain)bad.push(k+' '+x.id+' plain words')});
  let worstC=99,tapF=0,cF=0;
  for(const k in report){const m=report[k],off=Object.entries(m.slots).filter(([s,v])=>v.dx>1);worstC=Math.min(worstC,m.contrast.min);tapF+=m.taps.fails.length;cF+=m.contrast.fails.length;
    console.log(k.padEnd(13),'sw',m.sw+'/'+m.W,'poke',m.poke.length,'cut',m.trunc.length,'spill',m.spill.length,'overlap',m.overlap.length,'slots',Object.keys(m.slots).length,'off>1px',off.length?off.map(([s,v])=>s+' dx'+v.dx).join('; '):'none',
      'contrast min',m.contrast.min,'('+m.contrast.n+' texts, '+m.contrast.fails.length+' <4.5)','taps',m.taps.n,'small',m.taps.fails.length);
    if(m.poke.length)console.log('   poke',m.poke.slice(0,4).join(' | '));if(m.trunc.length)console.log('   cut',m.trunc.slice(0,4).join(' | '));
    if(m.spill.length)console.log('   spill',m.spill.slice(0,4).join(' | '));if(m.overlap.length)console.log('   overlap',m.overlap.slice(0,4).join(' | '));
    if(m.contrast.fails.length)console.log('   contrast',m.contrast.fails.slice(0,5).join(' | '));if(m.taps.fails.length)console.log('   taps',m.taps.fails.slice(0,5).join(' | '))}
  console.log('printed trades checked',seen,'mismatches',bad.length?'\n'+bad.slice(0,30).join('\n'):0);
  console.log('worst contrast',worstC,'contrast fails',cF,'small taps',tapF);console.log('errors',errs.length?errs.slice(0,20).join('\n'):'none');await b.close();srv.close()})();
