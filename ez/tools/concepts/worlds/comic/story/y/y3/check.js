// node check.js: hard-rule checks at 320, 390, 1280 and the main-thread cost at 4x CPU, today vs y3. Port 8923.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,W,t){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000}});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8923/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(t==='y3'){await p.addStyleTag({content:rd('y3.css')});await p.addScriptTag({content:rd('y3.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('y3-ready'),null,{timeout:20000})}
  await p.evaluate(()=>document.fonts.ready);return {p,er}}
(async()=>{const b=await chromium.launch();const out={rules:[],perf:{}};
 for(const W of [320,390,1280]){const {p,er}=await open(b,W,'y3');
  await p.evaluate(()=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY-20)});await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const ov=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));
    const cards=[...document.querySelectorAll('.y3-d')].map(d=>{const leaf=d.querySelector('.y3-leaf').getBoundingClientRect();
      const objs=['.y3-plate','.y3-lite','.y3-lvw','.y3-stk','.y3-clip'].map(s=>d.querySelector(s).getBoundingClientRect());
      // empty leaf area: sample a 4px grid, a point is "empty" if no object covers it
      let e=0,n=0;for(let y=Math.max(leaf.top,d.getBoundingClientRect().top);y<leaf.bottom;y+=4)for(let x=leaf.left;x<leaf.right;x+=4){n++;if(!objs.some(o=>x>=o.left&&x<=o.right&&y>=o.top&&y<=o.bottom))e++}
      const sh=d.querySelector('.y3-sheet');
      // logos: the mark in the lite and the company logo on the sheet must not be covered by another element
      const mk=d.querySelector('.y3-mk svg').getBoundingClientRect(),lg=d.querySelector('.y3-bst img');
      const covered=[mk,lg&&lg.getBoundingClientRect()].filter(Boolean).map(q=>{const el=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);return el?el.className.baseVal!==undefined?el.className.baseVal:el.className:'none'});
      return {m:d.dataset.m,emptyLeafPct:Math.round(e/n*100),sheetOverflow:sh.scrollHeight-sh.clientHeight,logoTopEl:covered}});
    const txt=document.querySelector('.y3-hall').innerText;const emoji=/\p{Extended_Pictographic}/u.test(txt);
    return {sw:document.documentElement.scrollWidth,emoji,cards}});
  out.rules.push({W,errors:er,...r});console.log(W,JSON.stringify(r));await p.close()}
 // cost: 4x CPU, section sitting still on screen, 6 s
 for(const t of ['now','y3']){const res=[];for(let k=0;k<3;k++){const {p}=await open(b,390,t);
   await p.evaluate(()=>{const n=document.querySelector('.wc-chars');scrollTo(0,n.getBoundingClientRect().top+scrollY+60)});await p.waitForTimeout(2500);
   const c=await p.context().newCDPSession(p);await c.send('Performance.enable');await c.send('Emulation.setCPUThrottlingRate',{rate:4});await new Promise(r=>setTimeout(r,800));
   const g=async()=>Object.fromEntries((await c.send('Performance.getMetrics')).metrics.map(m=>[m.name,m.value]));
   const a=await g();await new Promise(r=>setTimeout(r,6000));const z=await g();
   res.push({task:+(z.TaskDuration-a.TaskDuration).toFixed(3),script:+(z.ScriptDuration-a.ScriptDuration).toFixed(3),layout:+(z.LayoutDuration-a.LayoutDuration).toFixed(3),style:+(z.RecalcStyleDuration-a.RecalcStyleDuration).toFixed(3)});await p.close()}
  res.sort((x,y)=>x.task-y.task);out.perf[t]={median:res[1],runs:res};console.log(t,JSON.stringify(res))}
 fs.writeFileSync(process.argv[2]||'/dev/null',JSON.stringify(out,null,1));await b.close()})();
