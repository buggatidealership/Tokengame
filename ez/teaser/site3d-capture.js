// EZ SITE3D, the capture step: the website's own elements, saved from the live main page for the film's 3D set.
//   node teaser/site3d-capture.js OUTDIR          (from ez/, with the static server on :8765 serving ez/)
//   env MARKS=1   keep the AI labs' marks on the standings cards (default: hidden; the 2026-10-11 critique item 7 made
//                 "AI labs by name only, not their marks" a must-fix; set MARKS=1 only after counsel clears them)
// Loads v24-live-x2.html (the main page, which reads ez-data.js at load) at 1280 px, device scale 3, and saves:
//   face-0..N.png  the standings cards (#roster > li), INK ONLY on a transparent background: rank, name, wins, as the site
//                  sets them. The film skin (injected CSS; the page file is not touched) removes each card's fill, its
//                  outline and its offset shadow (the outline and the offset shadow were the cartoonish part), the stat
//                  column (an ad never says "buyback odds"), the crown and the "Bets on NVIDIA" tag (today's tag would imply
//                  that today's #1 makes the NVIDIA call), and the marks unless MARKS=1. Each card's own fill is recorded
//                  in the manifest (#1: the foil's four stops) and rebuilt as the card's material in the film.
//   badge.png      footer .badge (the $EZ tile), for reference; its size, radius and colour go in the manifest
//   g-tank.png     #/buyback .gauge .g-tank (the pot gauge), for reference; size, radius, fill and empty colour in the manifest
//   manifest.json  the data hash of ez-data.js, LADDER and SIM as the page saw them, every element's box and colours. The
//                  film refuses textures whose LADDER differs from the ez-data.js it loads ("stale textures").
// Fonts: fonts.googleapis.com is blocked here, so the page's Google Fonts CSS is served from teaser/fonts/site/barlow.css.
const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');
const fs=require('fs'),path=require('path'),crypto=require('crypto');
const EZ=path.resolve(__dirname,'..'),FONTS=path.join(__dirname,'fonts','site');
const OUT=path.resolve(process.argv[2]||'site3d-tex');fs.mkdirSync(OUT,{recursive:true});
const MARKS=process.env.MARKS==='1';
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex').slice(0,12);
const barlow=fs.readFileSync(path.join(FONTS,'barlow.css'),'utf8');
async function open(b,hash){const ctx=await b.newContext({viewport:{width:1280,height:900},deviceScaleFactor:3});const p=await ctx.newPage();
  p.errs=[];p.on('pageerror',e=>p.errs.push(String(e)));
  await p.route(/fonts\.googleapis\.com\/css2/,r=>r.fulfill({contentType:'text/css',body:barlow}));
  await p.route(/fonts\.gstatic\.com/,r=>r.fulfill({status:404,body:''}));
  await p.route(/fonts\.local\/.*\.woff2/,r=>{const f=path.join(FONTS,path.basename(new URL(r.request().url()).pathname));
    fs.existsSync(f)?r.fulfill({contentType:'font/woff2',body:fs.readFileSync(f)}):r.fulfill({status:404,body:''})});
  await p.goto('http://localhost:8765/v24-live-x2.html'+hash,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);return p}
const SKIN=`#roster>li,#roster>li::before,#roster>li::after{background:transparent!important;background-image:none!important;box-shadow:none!important;border-color:transparent!important;animation:none!important}
 #roster>li .crown,#roster>li .pc-best,#roster>li .pc-s{visibility:hidden!important}
 #roster>li .lg{box-shadow:none!important}${MARKS?'':'\n #roster>li .lg{visibility:hidden!important}'}`;
(async()=>{const b=await chromium.launch();
  const man={dataHash:sha(path.join(EZ,'ez-data.js')),pageHash:sha(path.join(EZ,'v24-live-x2.html')),captured:new Date().toISOString(),page:'v24-live-x2.html',marks:MARKS,items:{}};
  let p=await open(b,'#/');
  man.data=await p.evaluate(()=>({ladder:LADDER.map(l=>({m:l.m,name:MODELS[l.m].name,won:l.won,avg:l.avg})),lev:SIM.leverage,lead:SIM.leadHours,stop:SIM.stopLoss,pool:SIM.poolShare,
    last:(()=>{const r=ROUNDS.slice().sort((a,b)=>a.n-b.n).pop();return {n:r.n,resolves:r.resolves}})()}));
  /* the page's own colours, read before the skin goes on */
  man.colors=await p.evaluate(()=>{const cs=getComputedStyle(document.documentElement),v=n=>cs.getPropertyValue(n).trim();
    const cards=[...document.querySelectorAll('#roster > li')].map(li=>{const s=getComputedStyle(li),a=li.querySelector('h3 a')||li.querySelector('h3'),w=li.querySelector('.pc-w b');
      return {cls:li.className,bg:s.backgroundColor,bgImage:s.backgroundImage!=='none'?'foil':'',ink:getComputedStyle(a).color,wins:w?getComputedStyle(w).color:null,radius:s.borderRadius}});
    return {field:v('--field'),field2:v('--field2'),ink:v('--ink'),slab:v('--slab'),foil:[v('--foil-1'),v('--foil-2'),v('--foil-3'),v('--foil-4')],
      mark:{s:v('--mark-s'),e:v('--mark-e'),z:v('--mark-z')},cards}});
  await p.addStyleTag({content:SKIN});
  /* every ancestor of the cards loses its background too (the page's bands), so the faces come out on transparency */
  await p.evaluate(()=>{const seen=new Set();document.querySelectorAll('#roster > li').forEach(li=>{for(let e=li.parentElement;e;e=e.parentElement){if(seen.has(e))continue;seen.add(e);
    e.style.setProperty('background','transparent','important');e.style.setProperty('background-image','none','important')}})});
  await p.waitForTimeout(300);
  const els=await p.$$('#roster > li');let k=0;
  for(const e of els){await e.scrollIntoViewIfNeeded();const f=`face-${k}.png`;await e.screenshot({path:path.join(OUT,f),omitBackground:true});
    const bb=await e.boundingBox();man.items[f]={sel:'#/ #roster > li:nth-child('+(k+1)+')',w:bb.width,h:bb.height,shows:man.data.ladder[k],fill:man.colors.cards[k]};k++}
  const bd=await p.$('footer .badge');if(bd){await bd.scrollIntoViewIfNeeded();await bd.screenshot({path:path.join(OUT,'badge.png'),omitBackground:true});const bb=await bd.boundingBox();
    man.items['badge.png']={sel:'#/ footer .badge',w:bb.width,h:bb.height,radius:await bd.evaluate(e=>getComputedStyle(e).borderRadius),bg:await bd.evaluate(e=>getComputedStyle(e).backgroundColor)}}
  man.items.split=await p.evaluate(()=>({sel:'#/ .mt-split #mtP, #mtL',pot:(document.querySelector('#mtP')||{}).textContent||null,ops:(document.querySelector('#mtL')||{}).textContent||null}));
  if(p.errs.length)man.pageErrors=p.errs.slice(0,5);
  await p.context().close();
  p=await open(b,'#/buyback');
  const g=await p.$('.gauge .g-tank');if(g){await g.scrollIntoViewIfNeeded();await g.screenshot({path:path.join(OUT,'g-tank.png'),omitBackground:true});const bb=await g.boundingBox();
    man.items['g-tank.png']={sel:'#/buyback .gauge .g-tank',w:bb.width,h:bb.height,radius:await g.evaluate(e=>getComputedStyle(e).borderRadius),
      empty:await g.evaluate(e=>getComputedStyle(e).backgroundColor),fill:await p.$eval('#gFill',e=>getComputedStyle(e).backgroundColor)}}
  await p.context().close();await b.close();
  /* the check the film repeats: the faces must show ez-data.js's LADDER */
  if(man.data.ladder.length!==Object.keys(man.items).filter(f=>/^face-/.test(f)).length)throw new Error('capture: card count differs from LADDER');
  if(man.data.stop!=null)console.warn('warning: SIM.stopLoss is set; the film refuses to render a stop-loss scenario it does not show');
  fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(man,null,1));console.log(JSON.stringify({out:OUT,dataHash:man.dataHash,marks:MARKS,ladder:man.data.ladder.map(l=>l.name+' '+l.won).join(', '),cards:man.colors.cards.map(c=>c.bg+(c.bgImage?' foil':'')+' ink '+c.ink)}))})()
  .catch(e=>{console.error(e);process.exit(1)});
