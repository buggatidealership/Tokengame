// node run.js <outdir> [widths 390,1280] [styles n,l]   (serve ez/ on PORT, default 8973)
// Opens the real X3+ page on the Upcoming tab, hides its cover, mounts the floor, the round strip and Your call (floor.js) in both styles,
// and shoots every market state (demo New York times from the sheet's own dates) and every Your call state. Then the Overview's Tonight version.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const PORT=process.env.PORT||8973;const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const FL='https://fonts.googleapis.com/css2?family=Kalam:wght@700&family=Rye&family=Special+Elite&family=Kanit:ital,wght@1,900&family=Barlow+Condensed:wght@700&display=block';
const CSS=rd('floor.css').replace(/url\(img\//g,'url(/tools/concepts/worlds/comic/story/h/floor/img/');
const STATES=[['am','2026-11-02T11:05:00-05:00','Mon Nov 2, 11:05 am: market open'],['close','2026-10-30T16:00:05-04:00','Fri Oct 30, 4:00 pm: the bell'],
  ['after','2026-10-30T17:45:00-04:00','Fri Oct 30, 5:45 pm: after the bell'],['night','2026-11-02T05:40:00-05:00','Mon Nov 2, 5:40 am: overnight'],['wkend','2026-10-31T13:00:00-04:00','Sat Oct 31, 1:00 pm: weekend']];
const HIST=[{n:78,co:'Intel',ticker:'INTC',dir:'down'},{n:79,co:'AstraZeneca',ticker:'AZN',dir:'up'},{n:80,co:'Exxon Mobil',ticker:'XOM',dir:'up'}];
async function open(b,W,hash){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:800},deviceScaleFactor:W>1000?1:2});const p=await ctx.newPage();await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/${hash||''}`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>window.__x2pPnl&&document.documentElement.classList.contains('p1-on'),null,{timeout:120000});
  await p.waitForTimeout(2500);await p.addStyleTag({url:FL});await p.addStyleTag({content:CSS});await p.addScriptTag({content:rd('floor.js')});
  await p.evaluate(()=>{document.querySelectorAll('body *').forEach(e=>{if(getComputedStyle(e).position==='fixed')e.style.setProperty('visibility','hidden','important')});document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}});try{localStorage.removeItem('ez-yourcall')}catch(e){}});
  await p.evaluate(()=>document.fonts.ready);return {ctx,p,er}}
module.exports={open,STATES,HIST};
const waitImgs=p=>p.waitForFunction(()=>[...document.querySelectorAll('.fx img,.fxr img,.fxc img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});
const shot=async(p,sel,path)=>{await waitImgs(p);await p.waitForTimeout(1100);const e=await p.$(sel);await e.scrollIntoViewIfNeeded();await p.waitForTimeout(300);await e.screenshot({path})};
if(require.main===module)(async()=>{const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number),SS=(process.argv[4]||'n,l').split(',');fs.mkdirSync(OUT,{recursive:true});
 const b=await chromium.launch();const log=[];
 for(const W of WS){
  /* today's live Upcoming top, for the board */
  {const {ctx,p}=await open(b,W,'upcoming');await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(600);await p.screenshot({path:`${OUT}/live-up-${W}.png`});await ctx.close()}
  for(const s of SS){const {ctx,p,er}=await open(b,W,'upcoming');const wide=W>=1000;
   await p.evaluate(([s,wide])=>{const up=document.getElementById('wc-up');up.querySelector('.wc-tab-cv').style.display='none';const h=document.createElement('div');h.id='fxhost';h.style.cssText='background:#04070e;padding-bottom:18px';
     up.insertBefore(h,up.firstChild);FX.floor.mount(h,{style:s,wide});FX.rounds.mount(h,{style:s});FX.call.mount(h,{style:s,wide})},[s,wide]);
   for(const [st,t] of STATES){await p.evaluate(t=>{FX.setNow(Date.parse(t))},t);await p.waitForTimeout(1300);
     await shot(p,'#fxhost .fx',`${OUT}/floor-${s}-${st}-${W}.png`);const m=await p.evaluate(()=>({t:FX.floor.last.title,l:FX.floor.last.lines,sw:document.documentElement.scrollWidth}));log.push(['floor',s,st,W,JSON.stringify(m)]);}
   await p.evaluate(()=>FX.setNow(Date.parse('2026-10-31T13:00:00-04:00')));
   await shot(p,'#fxhost .fxr',`${OUT}/rounds-${s}-${W}.png`);
   /* Your call: open, stamped up, then a later visit after the close with three calls already graded */
   await shot(p,'#fxhost .fxc',`${OUT}/call-${s}-open-${W}.png`);
   await p.click('#fxhost .fxc-hit.up');await p.waitForTimeout(700);await shot(p,'#fxhost .fxc',`${OUT}/call-${s}-called-${W}.png`);
   log.push(['call',s,W,JSON.stringify(await p.evaluate(()=>FX.call.check))]);
   await p.evaluate(H=>{localStorage.setItem('ez-yourcall',JSON.stringify({v:1,calls:H}));FX.mem=null;document.querySelector('#fxhost .fxc')._draw()},HIST);
   await shot(p,'#fxhost .fxc',`${OUT}/call-${s}-result-${W}.png`);log.push(['call',s,W,JSON.stringify(await p.evaluate(()=>FX.call.check))]);
   /* overflow check at this width */
   log.push(['sw',s,W,await p.evaluate(()=>document.documentElement.scrollWidth)]);
   log.push(['errors',s,W,er.slice(0,4).join(' | ')||'none']);await ctx.close();
   /* Tonight at the close, end of the Overview: the counter */
   {const {ctx,p,er}=await open(b,W,'');await p.evaluate(s=>{FX.setNow(Date.parse('2026-10-31T13:00:00-04:00'));const c=document.querySelector('section.wc-cliff');const h=document.createElement('div');h.id='fxt';h.style.cssText='padding:8px 0 16px';c.appendChild(h);FX.call.mount(h,{style:s,counter:1})},s);
    await p.evaluate(()=>{document.querySelectorAll('section').forEach(x=>x.classList.remove('wc-offs'))});
    await shot(p,'section.wc-cliff',`${OUT}/tonight-${s}-${W}.png`);await shot(p,'#fxt .fxc',`${OUT}/tonight-${s}-open-${W}.png`);
    await p.click('#fxt .fxc-hit.dn');await p.waitForTimeout(700);await shot(p,'#fxt .fxc',`${OUT}/tonight-${s}-called-${W}.png`);
    log.push(['tonight',s,W,JSON.stringify(await p.evaluate(()=>FX.call.check)),'sw',await p.evaluate(()=>document.documentElement.scrollWidth),er.slice(0,3).join('|')||'none']);await ctx.close()}
  }}
 console.log(log.map(x=>x.join(' ')).join('\n'));await b.close()})();
