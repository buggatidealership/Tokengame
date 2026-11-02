// node run.js <out> <ids now,A,B,C,D> [widths 390,1280] [dpr 2] : serve ez/ on 8961 first. Shoots the film beat (beat-<W>-<id>.png),
// the whole top (top-<W>-<id>.png) and prints the measurements (tests 1, 2, 6, film shown whole, sideways scroll, errors) to measure.json.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now,A,B,C,D').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');let res={};try{res=JSON.parse(fs.readFileSync(OUT+'/measure.json'))}catch(e){}
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8961/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id!=='now'){await p.addStyleTag({content:rd('_f2.css')});await p.evaluate(i=>window.__F2=i,id);await p.addScriptTag({content:rd('_f2.js')});await p.waitForFunction(()=>window.__f2||window.__f2Err,null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.waitForFunction(()=>[...document.querySelectorAll('.t4 img')].every(i=>i.complete),null,{timeout:60000});await p.evaluate(()=>window.__t5&&__t5.place());await p.waitForTimeout(900);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});
  const r=await p.evaluate(()=>{const e=document.querySelector('.t4-b3').getBoundingClientRect(),s=document.querySelector('section.t4').getBoundingClientRect();return {by:e.top+scrollY,bh:e.height,sy:s.top+scrollY,sh:s.height}});
  await p.screenshot({path:`${OUT}/beat-${W}-${id}.png`,clip:{x:0,y:r.by-8,width:W,height:r.bh+16},fullPage:true,timeout:180000});
  await p.screenshot({path:`${OUT}/top-${W}-${id}.png`,clip:{x:0,y:r.sy,width:W,height:r.sh+40},fullPage:true,timeout:180000});
  const m=await p.evaluate(()=>{const o={sw:document.documentElement.scrollWidth,vw:innerWidth,err:window.__f2Err&&String(window.__f2Err)};
    const pic=document.querySelector('.f2-pic')||document.querySelector('.t4-scr'),img=pic.querySelector('img'),pr=pic.getBoundingClientRect(),ir=img.getBoundingClientRect();
    o.frameCss=[+pr.width.toFixed(1),+pr.height.toFixed(1)];o.srcShown=Math.round(img.naturalWidth*pr.width/ir.width);o.need3x=Math.ceil(pr.width*3);o.t1=o.srcShown>=o.need3x;
    const v=pic.querySelector('video'),vr=v.getBoundingClientRect();o.videoCss=[+vr.width.toFixed(1),+vr.height.toFixed(1)];
    // the film's picture inside the video box (object-fit contain): its share of the glass box, and whether all of it is inside the frame
    const s=Math.min(vr.width/16,vr.height/9),fw=16*s,fh=9*s;o.filmCss=[+fw.toFixed(1),+fh.toFixed(1)];o.filmFillsGlass=+(fw*fh/(vr.width*vr.height)).toFixed(3);
    o.filmInside=vr.left>=pr.left-.5&&vr.right<=pr.right+.5&&vr.top>=pr.top-.5&&vr.bottom<=pr.bottom+.5;o.filmShareOfFrame=+(fw*fh/(pr.width*pr.height)).toFixed(3);o.filmWidthShare=+(fw/pr.width).toFixed(3);
    const c=document.createElement('canvas').getContext('2d');c.font='100px Anton';const capR=c.measureText('1').actualBoundingBoxAscent/100;
    const t=pic.querySelector('.f2-t');if(t){o.ledCap=+(parseFloat(getComputedStyle(t).fontSize)*capR).toFixed(1)}
    const h=document.querySelector('.t4-b3 .t4-h2');o.headPx=+parseFloat(getComputedStyle(h).fontSize).toFixed(1);o.headText=h.textContent.trim();
    const hw=h.querySelector('.t4-hw').getBoundingClientRect();o.headFits=hw.right<=innerWidth+.5;
    const ord=[...document.querySelectorAll('section.t4>div[class^="t4-b"]')].map(x=>x.className.split(' ')[0]);o.order=ord.join(' ');
    return o});
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
