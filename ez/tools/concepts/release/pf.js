// Release video, the AI profile scene (owner, 2026-11-10: "a scene that shows the chart for the individual models").
// node pf.js [ISO time] -> scr/pf-<m>.png (the page, nav hidden, 3x), scr/pfz-<m>.png (the chart without its line, 3x crop),
// scr/chrome-pf.png, scr/hi-pfc.png + hi-pfc0.png (Grok's P&L card at 6x, with and without the line), scr/mask-pfc.png, scr/pf.json
const {chromium}=require('playwright');const fs=require('fs');const O=__dirname+'/scr/';const T=process.argv[2]||'2026-11-09T18:52:00Z';
const ORD=['GROK','CLAUDE','GPT','KIMI'];
(async()=>{const b=await chromium.launch();const R={};const errs=[];
 const ctx=async(dsf)=>{const c=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:dsf,timezoneId:'America/New_York'});const p=await c.newPage();await p.clock.setFixedTime(new Date(T));p.on('pageerror',e=>errs.push(e.message));return [c,p]};
 const rects=p=>p.evaluate(()=>{const r=e=>{const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.top+scrollY),Math.round(b.width),Math.round(b.height)]};
  const s=[...document.querySelectorAll('section.pn')];return {secs:s.map(r),chips:[...document.querySelectorAll('.pick button')].map(e=>({k:e.getAttribute('data-pick'),r:r(e)})),
   svg:r(document.querySelector('.chart svg')),big:r(document.querySelector('.big strong')),who:r(document.querySelector('.who')),pickSL:document.querySelector('.pick').scrollLeft,
   txt:document.querySelector('.who').innerText.replace(/\s+/g,' ')+' | '+document.querySelector('.big').innerText.replace(/\s+/g,' ')}});
 const hideLine=p=>p.evaluate(()=>{document.querySelectorAll('.chart svg path,.chart svg circle').forEach(e=>e.style.visibility='hidden')});
 let [c,p]=await ctx(3);await p.goto('http://localhost:8997/#grok');await p.waitForTimeout(2200);await p.screenshot({path:O+'chrome-pf.png'});
 await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none'});
 for(const m of ORD){if(m!=='GROK'){await p.evaluate(m=>{document.querySelector('.pick button[data-pick="'+m+'"]').click()},m);await p.waitForTimeout(500);await p.evaluate(()=>{const n=document.querySelector('nav.nav');if(n)n.style.display='none'})}
  R[m]=await rects(p);await p.screenshot({path:O+'pf-'+m.toLowerCase()+'.png',fullPage:true});
  const sv=R[m].svg;await hideLine(p);await p.screenshot({path:O+'pfz-'+m.toLowerCase()+'.png',fullPage:true,clip:{x:sv[0],y:sv[1],width:sv[2],height:sv[3]}});
  await p.evaluate(()=>document.querySelectorAll('.chart svg path,.chart svg circle').forEach(e=>e.style.visibility=''))}
 await c.close();
 [c,p]=await ctx(6);await p.goto('http://localhost:8997/#grok');await p.waitForTimeout(2200);await p.evaluate(()=>{document.querySelector('nav.nav').style.display='none';const h=document.querySelector('header.top');if(h)h.style.position='static'});await p.waitForTimeout(300);
 const cr=(await rects(p)).secs[1];R.card=cr;await p.screenshot({path:O+'hi-pfc.png',fullPage:true,clip:{x:cr[0],y:cr[1],width:cr[2],height:cr[3]}});
 await hideLine(p);await p.screenshot({path:O+'hi-pfc0.png',fullPage:true,clip:{x:cr[0],y:cr[1],width:cr[2],height:cr[3]}});await c.close();
 require('child_process').execSync(`ffmpeg -loglevel error -y -i ${O}hi-pfc.png -vf "format=gray,lut=y='clip((val-70)*3\\,0\\,255)'" ${O}mask-pfc.png`);
 fs.writeFileSync(O+'pf.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R));console.log('errs',errs.join('|')||'none');await b.close()})();
