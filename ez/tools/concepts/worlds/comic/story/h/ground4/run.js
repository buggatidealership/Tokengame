// node run.js <out> <ids now,g1,..> [widths 390,1280] [dpr 1]: serve ez/ on 8954 first. Lays _g4.js over v46-live-x2plus.html,
// shoots the Overview from the top to the end of the bet (full-<W>-<id>.png) and a 3x close-up of the gutter after the film (cu-<W>-<id>.png).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now,g1').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||1);fs.mkdirSync(OUT,{recursive:true});
const G4=fs.readFileSync(__dirname+'/_g4.js','utf8');const res={};
async function prep(p,id){await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(id!=='now'){await p.evaluate(id=>{window.__G4=id},id);await p.addScriptTag({content:G4})}
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}scrollTo(0,0)});
 await p.waitForTimeout(1500);await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed')x.style.visibility='hidden'})});}
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await prep(p,id);
  const m=await p.evaluate(()=>{const s=document.getElementById('x2pSt'),r=s.getBoundingClientRect();return {sw:document.documentElement.scrollWidth,vw:innerWidth,H:document.documentElement.scrollHeight,betEnd:Math.round(r.bottom+scrollY),guts:document.querySelectorAll('.g4-gut').length}});
  await p.screenshot({path:`${OUT}/full-${W}-${id}.png`,clip:{x:0,y:0,width:W,height:m.betEnd+10},fullPage:true});
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 // close-ups at 3x: the film -> Meet the models joint, and the record head
 for(const id of IDS){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:3,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);await prep(p,id);
  const y=await p.evaluate(()=>{const c=document.querySelector('.ch');return Math.round(c.getBoundingClientRect().top+scrollY)});
  await p.screenshot({path:`${OUT}/cu-${id}.png`,clip:{x:0,y:y-210,width:390,height:330},fullPage:true});
  const y2=await p.evaluate(()=>{const c=document.getElementById('record');return Math.round(c.getBoundingClientRect().top+scrollY)});
  await p.screenshot({path:`${OUT}/cu2-${id}.png`,clip:{x:0,y:y2-110,width:390,height:330},fullPage:true});await ctx.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(res,null,1));await b.close()})();
