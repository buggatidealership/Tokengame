// node run.js <id> <outdir>: four beats at 390x844 and beat 3 at 1280x800, with checks. env RM=1 reduced motion.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const ID=process.argv[2],OUT=process.argv[3];fs.mkdirSync(OUT,{recursive:true});
const FR=JSON.parse(fs.readFileSync(process.env.FRJ,'utf8'));
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const shots=(process.env.SHOTS||'390:1,390:2,390:3,390:4,320:3,1280:3').split(',').map(s=>s.split(':').map(Number));
(async()=>{const b=await chromium.launch();
 for(const W of [...new Set(shots.map(s=>s[0]))]){const p=await b.newPage({viewport:{width:W,height:W<600?844:800},deviceScaleFactor:W<600?2:1,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8911/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.evaluate(fr=>{window.__qFr=fr},FR);
  await p.addStyleTag({content:rd('../'+ID+'/'+ID+'.css')});await p.addScriptTag({content:rd('_q.js')});await p.addScriptTag({content:rd('../'+ID+'/'+ID+'.js')});
  await p.waitForFunction(id=>document.documentElement.classList.contains(id+'-ready'),ID,{timeout:20000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);
  await p.evaluate(()=>{scrollTo(0,0);[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header.top')&&!x.closest('[id$="-book"]'))x.style.visibility='hidden'})});
  for(const [w,beat] of shots.filter(s=>s[0]===W)){
   await p.evaluate(b=>window.__qBeat(b),beat);await p.waitForTimeout(+(process.env.WAIT||6500));
   const m=await p.evaluate(()=>{const bk=document.querySelector('[id$="-book"]');const VW=innerWidth,VH=innerHeight;
    const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&+c.opacity>0.05&&e.getClientRects().length};
    const fl=[...bk.querySelectorAll('img.qfilm')].filter(vis).map(i=>i.getBoundingClientRect())[0];
    // overlaps: visible leaf-ish elements (text or svg or img) intersecting the film art
    let ov=[];if(fl){ov=[...bk.querySelectorAll('*')].filter(e=>vis(e)&&!e.matches('img.qfilm,.q2-iris')&&!e.contains(document.querySelector('img.qfilm'))&&!e.closest('.qfilm')&&(e.children.length===0||e.tagName==='svg')).filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&r.right>fl.left+1&&r.left<fl.right-1&&r.bottom>fl.top+1&&r.top<fl.bottom-1}).map(e=>e.tagName+'.'+String(e.className.baseVal??e.className).slice(0,24))}
    // empty area per panel: sample points, a point is empty when the topmost element is a bare container (no text, no image, no background image) inside the panel
    const panels=[...bk.querySelectorAll('[data-qp]')].filter(vis).map(pn=>{const r=pn.getBoundingClientRect();let n=0,e0=0;
      for(let y=Math.max(r.top,0)+2;y<Math.min(r.bottom,VH);y+=6)for(let x=Math.max(r.left,0)+2;x<Math.min(r.right,VW);x+=6){n++;const h=document.elementFromPoint(x,y);if(!h)continue;const c=getComputedStyle(h);
        const bare=c.backgroundImage==='none'&&!['IMG','svg','path','SVG'].includes(h.tagName)&&!(h.closest('svg'))&&![...h.childNodes].some(t=>t.nodeType===3&&t.textContent.trim());if(bare)e0++}
      return {p:pn.dataset.qp,empty:+(e0/n*100).toFixed(1)}});
    const br=bk.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:VW,book:[Math.round(br.top),Math.round(br.height)],fit:Math.round(bk.scrollHeight-bk.clientHeight),panels,ov:ov.slice(0,12),nov:ov.length,film:fl?[fl.left,fl.top,fl.width,fl.height].map(Math.round):null}});
   console.log(W,'beat',beat,JSON.stringify(m),er.join(' | ')||'no errors');
   fs.writeFileSync(`${OUT}/${W}-b${beat}.json`,JSON.stringify(m));
   await p.screenshot({path:`${OUT}/${W}-b${beat}.png`});
  }
  await p.close()}
 await b.close()})();
