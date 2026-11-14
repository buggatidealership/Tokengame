// Round 33 mockups (owner, 2026-10-24): the BACK of the graded cards tells the round's story ("you're telling a story, right? You're not
// just showing a data point"). Four narrative devices, each a pair of files in tools/concepts/launch-r33-backs/: <id>.css and <id>.js.
// The js is a function body run in the real X2+ page after load; it defines window.__r33back(card, n), which rewrites that card's back
// panel (.face.back .fin; the slab label above it stays) from the page's own data (ROUNDS, RMETA, MODELS; nothing typed). Shared
// helpers (the season's facts, the EZ grade copied from x2plus.js) are in tools/concepts/launch-r33-backs/lib.js, run first.
// usage: node launch-r33-backs.js shoot <id|now> [outdir]   -> <id>-<W>-r<n>.png (the flipped card, real size) and <id>.json (fit checks)
//        node launch-r33-backs.js board [outdir]             -> ez/x2p-launch-r33-backs-1.png, -2.png (390px) and -desktop.png (1280px)
const fs=require('fs'),path=require('path');const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
const DIR=path.join(__dirname,'launch-r33-backs'),EZ=path.join(__dirname,'..','..');
const mode=process.argv[2],ROUNDS=[40,10,30];
const read=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
const launch=()=>chromium.launch({args:['--proxy-server='+process.env.HTTPS_PROXY,'--proxy-bypass-list=127.0.0.1;localhost','--ignore-certificate-errors-spki-list='+fs.readFileSync(S+'x2p/spki.txt','utf8').trim()]});
async function shoot(id,OUT){
 fs.mkdirSync(OUT,{recursive:true});
 const css=id==='now'?'':read(path.join(DIR,id+'.css')),js=id==='now'?'':read(path.join(DIR,'lib.js'))+'\n'+read(path.join(DIR,id+'.js'));
 const b=await launch(),res={};
 for(const W of [390,320,360,1280]){
  const ctx=await b.newContext(W<700?{viewport:{width:W,height:W<360?640:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'}:{viewport:{width:W,height:900},deviceScaleFactor:1,reducedMotion:'reduce'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:30000});await p.evaluate(()=>document.fonts.ready);
  await p.evaluate(()=>{const t=document.querySelector('#standings .x2p-ast .tk');const bi=t?getComputedStyle(t).backgroundImage:'';const m=bi.match(/url\("data:image\/svg\+xml[^"]*"\)/);
    if(m)document.documentElement.style.setProperty('--r33-paper',m[0])});
  await p.evaluate(({css,js})=>{const s=document.createElement('style');s.id='r33';s.textContent=css;document.head.appendChild(s);if(js)(new Function(js))()},{css,js});
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
  res[W]={};
  for(const n of ROUNDS){
   await p.evaluate(n=>{const c=[...document.querySelectorAll('#chips .chip')].find(x=>x.textContent.trim()==='R'+n);if(c)c.click()},n);await p.waitForTimeout(500);
   const sel='#car .card[data-n="'+n+'"]';
   if(id!=='now')await p.evaluate(({sel,n})=>window.__r33back(document.querySelector(sel),n),{sel,n});
   await p.evaluate(sel=>{const c=document.querySelector(sel);if(!c.classList.contains('flipped'))c.click()},sel);
   await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700);
   await p.$eval(sel,e=>e.scrollIntoView({block:'center'}));await p.waitForTimeout(400);
   const m=await p.evaluate(sel=>{const c=document.querySelector(sel),bk=c.querySelector('.face.back'),fin=bk.querySelector('.fin'),R=e=>e.getBoundingClientRect();
     const fr=R(fin),br=R(bk),out=[];let minFs=99,words=0;
     const walk=document.createTreeWalker(bk,NodeFilter.SHOW_TEXT);let t;while(t=walk.nextNode()){const s=t.nodeValue.trim();if(!s)continue;const el=t.parentElement;const cs=getComputedStyle(el);
       if(cs.display==='none'||cs.visibility==='hidden'||el.closest('.sr,[aria-hidden="true"] .sr')||el.closest('.sr'))continue;
       const g=document.createRange();g.selectNodeContents(t);const rs=[...g.getClientRects()].filter(r=>r.width>0);if(!rs.length)continue;
       if(fin.contains(el))words+=s.split(/\s+/).length;minFs=Math.min(minFs,parseFloat(cs.fontSize));
       rs.forEach(r=>{const box=fin.contains(el)?fr:br;if(r.left<box.left-.5||r.right>box.right+.5||r.top<box.top-.5||r.bottom>box.bottom+.5)out.push(s.slice(0,30)+' ['+[r.left-box.left,box.right-r.right,r.top-box.top,box.bottom-r.bottom].map(x=>x.toFixed(1)).join(',')+']')})}
     // clipped by an ancestor with overflow hidden
     const clipped=[...fin.querySelectorAll('*')].filter(e=>!e.closest('.sr')&&(e.scrollHeight>e.clientHeight+1&&getComputedStyle(e).overflowY!=='visible'||e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='visible')).map(e=>e.className||e.tagName);
     return {card:[Math.round(br.width),Math.round(br.height)],fin:[Math.round(fr.width),Math.round(fr.height)],finScroll:[fin.scrollWidth,fin.scrollHeight],outside:out.slice(0,8),clipped:clipped.slice(0,6),minFont:minFs,words,
       flipped:c.classList.contains('flipped')}},sel);
   const bb=await (await p.$(sel)).boundingBox();const pad=W>=700?20:12;
   await p.screenshot({path:OUT+id+'-'+W+'-r'+n+'.png',clip:{x:Math.max(0,bb.x-pad),y:Math.max(0,bb.y-pad),width:bb.width+2*pad,height:bb.height+2*pad}});
   res[W][n]=m}
  res[W].errors=errs;res[W].hscroll=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  await ctx.close()}
 /* the card must keep today's size: compare with the baseline shot (shoot now) */
 const base=id!=='now'&&fs.existsSync(OUT+'now.json')?JSON.parse(read(OUT+'now.json')):null;
 if(base)for(const W of Object.keys(res))for(const n of ROUNDS){const a=res[W][n].card,z=base[W]&&base[W][n]&&base[W][n].card;res[W][n].sizeKept=!z||(Math.abs(a[0]-z[0])<1&&Math.abs(a[1]-z[1])<1);if(!res[W][n].sizeKept)res[W][n].outside.unshift('CARD SIZE '+a.join('x')+' (was '+z.join('x')+')')}
 fs.writeFileSync(OUT+id+'.json',JSON.stringify(res,null,1));
 for(const W of Object.keys(res))for(const n of ROUNDS){const m=res[W][n];console.log(id,W,'r'+n,'card',m.card.join('x'),'fin',m.fin.join('x'),'scroll',m.finScroll.join('x'),'minFont',m.minFont,'words',m.words,'outside',m.outside.length?m.outside.join(' | '):'none','clipped',m.clipped.join(',')||'none')}
 console.log(id,'errors',JSON.stringify(Object.keys(res).map(W=>res[W].errors)),'hscroll',Object.keys(res).map(W=>res[W].hscroll).join(','));
 await b.close()}
async function board(OUT){
 const O=JSON.parse(read(path.join(DIR,'options.json'))||'[]');const img=f=>'data:image/png;base64,'+fs.readFileSync(OUT+f).toString('base64');
 const b=await launch();
 const page=(opts,W,rounds)=>'<!doctype html><meta charset="utf-8"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Anton&family=Barlow+Condensed:wght@500;700&family=Barlow:wght@400;600&display=swap"><style>'+
   'body{margin:0;background:#0b0a14;color:#f3ead6;font:15px/1.4 Barlow,sans-serif;padding:28px 32px}h1{font:400 34px/1 Anton,sans-serif;text-transform:uppercase;margin:0 0 6px;letter-spacing:.01em}'+
   '.lede{color:#d6cebb;margin:0 0 22px;max-width:1500px}.op{margin:0 0 30px}.op h2{font:400 24px/1 Anton,sans-serif;text-transform:uppercase;margin:0 0 4px}.op h2 b{color:#f2b632;font-weight:400}.op p{margin:0 0 12px;color:#d6cebb;max-width:1500px}'+
   '.row{display:flex;gap:26px;align-items:flex-start}.row figure{margin:0}.row figcaption{font:700 13px/1 "Barlow Condensed",sans-serif;text-transform:uppercase;letter-spacing:.08em;color:#a49fb4;margin:0 0 8px}.row img{display:block;width:'+(W>=700?370:250)+'px}</style>'+
   '<h1>'+(W>=700?'Story backs at 1280px':'The back tells the round\'s story')+'</h1><p class="lede">Every graded card\'s back, rewritten as a story from the sheet (nothing typed): the front and the flip are unchanged, the slab label stays, the panel under it tells what happened. Shot on the real page, real size, flipped. '+(W>=700?'Desktop cards are 330 x 566.':'A 390px phone: the card is 226 x 405.')+'</p>'+
   opts.map(o=>'<div class="op"><h2><b>'+o.n+'</b> '+o.title+'</h2><p>'+o.desc+'</p><div class="row">'+rounds.map(n=>'<figure><figcaption>R'+n+' '+({40:'Tesla, split 2-2, a bullseye',10:'Accenture, everyone wrong',30:'TSMC, Pristine 10'})[n]+'</figcaption><img src="'+img(o.id+'-'+W+'-r'+n+'.png')+'"></figure>').join('')+'</div></div>').join('');
 const shotBoard=async(html,file,w)=>{const ctx=await b.newContext({viewport:{width:w,height:900},deviceScaleFactor:1});const p=await ctx.newPage();await p.setContent(html,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
   await p.screenshot({path:file,fullPage:true});await ctx.close()};
 const today={id:'now',n:'Today',title:'the stats side',desc:'For comparison: the four calls ranked, the dates, the GRADED stamp.'};
 await shotBoard(page([today,O[0],O[1]],390,ROUNDS),path.join(EZ,'x2p-launch-r33-backs-1.png'),3*276+80);
 await shotBoard(page([O[2],O[3]],390,ROUNDS),path.join(EZ,'x2p-launch-r33-backs-2.png'),3*276+80);
 await shotBoard(page([today,...O],1280,[40,10]),path.join(EZ,'x2p-launch-r33-backs-desktop.png'),2*396+80);
 console.log('boards written');await b.close()}
(async()=>{const OUT=(mode==='board'?process.argv[3]:process.argv[4])||S+'r33b/out/';if(mode==='shoot')await shoot(process.argv[3],OUT);else if(mode==='board')await board(OUT);else console.log('usage: shoot <id|now> [outdir] | board [outdir]')})();
