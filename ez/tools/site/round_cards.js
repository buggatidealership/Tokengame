// Every round its own link (owner, 2026-10-28): for each graded round and each round with calls in, a share picture made from the
// round's own slab (1200x630, media/share/r<n>-<hash>.jpg) and a page at /r/<n> whose share tags carry it, sending people on to #/round/<n>.
// X never receives the part of a link after #, so earningszn.xyz/#/round/54 can only show the site's one picture; /r/54 shows round 54.
// Usage (from ez/): node tools/site/round_cards.js <site_out_dir>   Pictures are cached in ez/media/share by a hash of what they show.
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const EZ=path.resolve(__dirname,'..','..'),OUT=path.resolve(process.argv[2]||path.join(EZ,'..','site')),CACHE=path.join(EZ,'media','share');
const URL='https://earningszn.xyz/',V='card-v1';
let PW;try{PW=require('playwright')}catch(e){try{PW=require('/opt/node22/lib/node_modules/playwright')}catch(e2){console.log('round_cards: playwright missing, skipped');process.exit(0)}}
let FONTS=null;try{FONTS=require(path.join(EZ,'tools','concepts','live-r1','_fonts.js'))}catch(e){}
const TYPES={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.mp4':'video/mp4','.webm':'video/webm','.woff2':'font/woff2'};
const srv=http.createServer((q,r)=>{const f=path.join(EZ,decodeURIComponent(q.url.split('?')[0]));if(!f.startsWith(EZ)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':TYPES[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)});
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],MO=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
function day(d){const m=String(d||'').match(/(\d+)\/(\d+)\/(\d+)/);if(!m)return '';const t=new Date(Date.UTC(2000+(+m[3]%100),+m[1]-1,+m[2]));return WD[t.getUTCDay()]+' '+MO[t.getUTCMonth()]+' '+t.getUTCDate()}
const NM={GPT:'GPT',KIMI:'Kimi',CLAUDE:'Claude',GROK:'Grok'};
const and=a=>a.length<2?a.join(''):a.slice(0,-1).join(', ')+' and '+a[a.length-1];
const money=v=>(v<0?'−$':'+$')+Math.abs(Math.round(v)).toLocaleString('en-US');
const pct=v=>(v<0?'−':'+')+Math.abs(v).toFixed(2)+'%';
(async()=>{
 await new Promise(r=>srv.listen(0,'127.0.0.1',r));const base='http://127.0.0.1:'+srv.address().port+'/';
 const b=await PW.chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});if(FONTS)await FONTS(p);
 await p.goto(base+'v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 // what each card says, from the page's own data and P&L (a flat $100K bet on every call, 2026-10-31)
 const R=await p.evaluate(()=>{const P=window.__x2pPnl();const g=ROUNDS.map(u=>{const right=u.calls.filter(c=>c[1]&&(/UP/.test(c[1])?1:-1)*u.a>0).map(c=>c[0]);const called=u.calls.filter(c=>c[1]).map(c=>c[0]);
   const pn=called.map(m=>[m,P.A[m]&&P.A[m].per[u.n]?P.A[m].per[u.n].v:0]).sort((a,b)=>b[1]-a[1]);
   return {k:'g',n:u.n,co:u.co,t:u.ticker,a:u.a,win:u.win||'',calls:u.calls,right,called,best:pn[0],pn,film:!!(FILMS[u.n]),poster:FILMS[u.n]?FILMS[u.n].p:'',miss:(u.calls.find(c=>c[0]===String(u.win).split(/\s*&\s*/)[0])||[])[2]||''}});
  const pe=PENDING.filter(u=>u.calls&&u.calls.some(c=>c.dir)).map(u=>({k:'p',n:u.n,co:u.co,t:u.ticker,res:u.resolves||'',calls:u.calls.map(c=>[c.m,c.dir,c.mag])}));return g.concat(pe)});
 fs.mkdirSync(CACHE,{recursive:true});fs.mkdirSync(path.join(OUT,'media','share'),{recursive:true});fs.mkdirSync(path.join(OUT,'r'),{recursive:true});
 const logo='data:image/svg+xml;base64,'+fs.readFileSync(path.join(__dirname,'ez-logo.svg')).toString('base64');
 const c=await b.newPage({viewport:{width:1200,height:630}});if(FONTS)await FONTS(c);let made=0;
 for(const u of R){
  let line1='',line2='',title='',desc='';
  if(u.k==='g'){const up=u.a>0,w=String(u.win).split(/\s*&\s*/).filter(Boolean).map(m=>NM[m]),n=u.called.length,k=u.right.length,four=n===4?'four':String(n);
   const miss=u.miss?(+u.miss).toFixed(2).replace(/\.?0+$/,'')+'% off':'';
   if(k===0)line1='All '+four+' called it wrong.';else if(k===1)line1='Only <b>'+NM[u.right[0]]+'</b> said '+(up?'up':'down')+'.';
   else if(k===n)line1='All '+four+' said '+(up?'up':'down')+'. <b>'+and(w)+'</b> '+(w.length>1?'tie, ':'closest, ')+miss+'.';
   else line1='<b>'+and(w)+'</b> '+(w.length>1?'tie, ':'closest, ')+miss+'. '+k+' of '+n+' right.';
   // a flat stake: every call that got the direction made the same, so name the round's winner (closest call), else the first caller
   const wk=String(u.win).split(/\s*&\s*/).filter(Boolean)[0],e=u.pn.find(x=>x[0]===wk)||u.best;
   line2='If you’d bet $100K on '+NM[e[0]]+'’s call: <span class="'+(e[1]<0?'d':'u')+'">'+money(e[1])+'</span>';
   title='Round '+u.n+' · '+u.co+' '+pct(u.a)+' · Earnings Zeason';desc=line1.replace(/<[^>]+>/g,'')+' Graded at the close.'}
  else{title='Round '+u.n+' · '+u.co+' · calls locked · Earnings Zeason';const d=day(u.res);desc=u.calls.map(c=>NM[c[0]]+' '+(c[1]==='UP'?'+':'−')+c[2]+'%').join(' · ')+'. Graded at the close'+(d?', '+d:'')+'.'}
  const h=crypto.createHash('sha256').update(JSON.stringify([V,u,line1,line2,title,desc])).digest('hex').slice(0,10);const name='r'+u.n+'-'+h+'.jpg',cf=path.join(CACHE,name);
  if(!fs.existsSync(cf)){
   // the slab, as the round's pop-up shows it: a film round front (its poster) and back; anything else its one face
   await p.evaluate(n=>{location.hash='#/round/'+n},u.n);
   await p.waitForFunction(n=>{const c=document.querySelector('#x2pRm .card');return c&&c.offsetWidth>100&&c.textContent.indexOf('Round '+n+' ·')>=0},u.n,{timeout:20000});await p.waitForTimeout(1800);
   await p.evaluate(()=>{document.querySelectorAll('#x2pRm video').forEach(v=>{v.pause();v.style.visibility='hidden'});document.querySelectorAll('#x2pRm .snd').forEach(e=>e.style.visibility='hidden');
    document.querySelectorAll('#x2pRm .xc-pend .xc-out .xc-cd').forEach(e=>{e.className='lp xc-q';e.textContent='At the close'})});await p.waitForTimeout(300);
   const shot=async()=>{const r=await p.evaluate(()=>{const q=document.querySelector('#x2pRm .card').getBoundingClientRect();return {x:q.left-4,y:q.top-4,width:q.width+8,height:q.height+8}});return (await p.screenshot({clip:r})).toString('base64')};
   const imgs=[await shot()];
   if(u.k==='g'&&u.film){await p.click('#x2pRm .card',{position:{x:60,y:300}}).catch(()=>{});await p.waitForTimeout(1400);imgs.push(await shot())}
   const body=u.k==='g'?
     '<div class="eb">Round '+u.n+' · Graded at the close</div><div class="co">'+esc(u.co)+'</div><div class="mv '+(u.a<0?'d':'u')+'">'+pct(u.a)+'</div><div class="ln">'+line1+'</div><div class="ln s">'+line2+'</div>'
    :'<div class="eb">Round '+u.n+' · Locked before the report</div><div class="co">'+esc(u.co)+'</div><div class="calls">'+u.calls.map(c=>'<span><i>'+NM[c[0]]+'</i><b class="'+(c[1]==='UP'?'u':'d')+'">'+(c[1]==='UP'?'+':'−')+c[2]+'%</b></span>').join('')+'</div><div class="ln">Graded at the close'+(day(u.res)?', <b>'+day(u.res)+'</b>':'')+'.</div>';
   await c.setContent('<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Kanit:ital,wght@1,900&family=Saira+Condensed:wght@600;700&family=Barlow+Condensed:wght@800&display=swap"><style>'+CSS+'</style><div class="sc"><div class="cards">'+imgs.map(i=>'<img src="data:image/png;base64,'+i+'">').join('')+'</div><div class="tx"><div class="br"><img src="'+logo+'"><span><span class="e">E</span>arnings <span class="z">Z</span>eason</span></div>'+body+'<div class="ft">earningszn.xyz/r/'+u.n+'</div></div></div>',{waitUntil:'load'});
   await c.evaluate(()=>document.fonts.ready);
   await c.evaluate(()=>{const e=document.querySelector('.co'),max=document.querySelector('.tx').clientWidth;let s=64;while(e.scrollWidth>max&&s>30){s-=2;e.style.fontSize=s+'px'}});
   await c.screenshot({path:cf,type:'jpeg',quality:88});made++;
   for(const f of fs.readdirSync(CACHE))if(f.startsWith('r'+u.n+'-')&&f!==name)fs.unlinkSync(path.join(CACHE,f))}
  fs.copyFileSync(cf,path.join(OUT,'media','share',name));
  const img=URL+'media/share/'+name,to='/#/round/'+u.n;
  fs.writeFileSync(path.join(OUT,'r',u.n+'.html'),'<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>'+esc(title)+'</title>\n<meta name="description" content="'+esc(desc)+'">\n<meta property="og:type" content="website"><meta property="og:site_name" content="Earnings Zeason"><meta property="og:url" content="'+URL+'r/'+u.n+'">\n<meta property="og:title" content="'+esc(title)+'"><meta property="og:description" content="'+esc(desc)+'">\n<meta property="og:image" content="'+img+'"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="'+esc(title)+'">\n<meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@earningszn"><meta name="twitter:title" content="'+esc(title)+'"><meta name="twitter:description" content="'+esc(desc)+'"><meta name="twitter:image" content="'+img+'">\n<link rel="icon" href="/media/icon.svg" type="image/svg+xml"><meta http-equiv="refresh" content="0;url='+to+'"><script>location.replace("'+to+'")</script><style>html{color-scheme:dark}body{margin:0;background:#0b0a14;color:#f8f0d9;font:600 18px system-ui,sans-serif;display:grid;place-items:center;min-height:100vh}a{color:#fdbc2a}</style></head><body><a href="'+to+'">Round '+u.n+' · '+esc(u.co)+'</a></body></html>\n')}
 console.log('round_cards: '+R.length+' rounds, '+made+' new pictures');await b.close();srv.close()})().catch(e=>{console.error('round_cards failed:',e);process.exit(1)});
const CSS=`*{box-sizing:border-box;margin:0}body{margin:0}
.sc{width:1200px;height:630px;background:#0b0a14;position:relative;overflow:hidden;display:flex;align-items:center;gap:44px;padding:0 50px 0 40px;color:#f3ead6}
.sc::before{content:"";position:absolute;inset:0;background:repeating-conic-gradient(from 0deg at 18% 50%,rgba(255,255,255,.035) 0 2deg,transparent 2deg 9deg)}
.sc::after{content:"";position:absolute;left:0;right:0;bottom:0;height:14px;background:linear-gradient(90deg,#03c870 0 50%,#ff3a31 50%)}
.cards{display:flex;gap:14px;position:relative;flex:none}.cards img{height:540px;filter:drop-shadow(0 18px 30px rgba(0,0,0,.6))}
.cards img:first-child{transform:rotate(-2deg)}.cards img+img{transform:rotate(2.5deg) translateY(6px)}
.tx{position:relative;display:flex;flex-direction:column;gap:10px;min-width:0;flex:1}
.br{display:flex;align-items:center;gap:12px;font:800 22px/1 "Barlow Condensed",sans-serif;letter-spacing:.06em;text-transform:uppercase}.br img{width:52px;height:52px}.br .e{color:#03c870}.br .z{color:#ff3a31}
.eb{font:700 21px/1 "Saira Condensed",sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#f2b632;margin-top:18px}
.co{font:900 italic 64px/1 Kanit,sans-serif;text-transform:uppercase;text-shadow:-.065em .03em 0 #03c870;white-space:nowrap}
.mv{font:400 92px/1 Anton,sans-serif}.u{color:#2fd27f}.d{color:#ff5a4f}
.ln{font:600 30px/1.2 "Saira Condensed",sans-serif}.ln b{color:#f2b632;font-weight:700}.ln.s{font-size:25px;color:#cfc6b3}
.ft{font:700 22px/1 "Saira Condensed",sans-serif;color:#8d8798;letter-spacing:.04em;margin-top:14px}
.calls{display:grid;grid-template-columns:auto auto;gap:6px 26px;font:400 34px/1.05 Anton,sans-serif;margin-top:6px;width:max-content}
.calls span{display:flex;gap:10px;align-items:baseline}.calls i{font:700 24px/1 "Saira Condensed",sans-serif;font-style:normal;color:#cfc6b3;letter-spacing:.06em;text-transform:uppercase;width:88px}`;
