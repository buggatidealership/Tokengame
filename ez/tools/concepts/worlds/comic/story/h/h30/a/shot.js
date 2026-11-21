// node shot.js <outdir> [widths]  : screenshots each frame of the A concept, prints measured heights, words, overflow
// widths default 390,320,1280,1536. Needs the static server: python3 -m http.server 8981 (from ez/)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'.';const WS=(process.argv[3]||'390,320,1280,1536').split(',').map(Number);
const URL='http://localhost:8981/tools/concepts/worlds/comic/story/h/h30/a/index.html?board=1';
(async()=>{
  const b=await chromium.launch();fs.mkdirSync(OUT,{recursive:true});
  for(const w of WS){
    const desk=w>=1100;const h=desk?(w>=1500?864:800):664;
    const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:desk?1:2,isMobile:!desk,hasTouch:!desk});
    const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
    await p.goto(URL,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
    const info=await p.evaluate(()=>{
      const bar=document.querySelector('.bar').getBoundingClientRect().height;
      const secs=[...document.querySelectorAll('main > section')].map((s,i)=>{const r=s.getBoundingClientRect();
        const txt=s.innerText.replace(/\s+/g,' ').trim();const words=txt.split(' ').filter(x=>/[A-Za-z0-9]/.test(x));
        // overflow: any element wider than the section or poking out horizontally
        let over=0;s.querySelectorAll('*').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&(q.right>innerWidth+0.5||q.left<-0.5))over++});
        return {id:s.id,top:r.top+scrollY,bot:r.bottom+scrollY,h:Math.round(r.height+(i===0?bar:0)),words:words.length,over}});
      return {secs,doc:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,iw:innerWidth};
    });
    console.log('W',w,'doc',info.doc,'scrollW',info.sw,'errs',errs.length?errs:'none');
    info.secs.forEach(s=>console.log(' ',s.id,'h',s.h,'words',s.words,'over',s.over));
    if(desk){await p.screenshot({path:path.join(OUT,`full-${w}.png`),fullPage:true});}
    else{
      for(const s of info.secs){const el=await p.$('#'+s.id);await el.screenshot({path:path.join(OUT,`${w}-${s.id}.png`)});}
      await p.screenshot({path:path.join(OUT,`first-${w}.png`)});
      await p.screenshot({path:path.join(OUT,`full-${w}.png`),fullPage:true});
    }
    fs.writeFileSync(path.join(OUT,`m-${w}.json`),JSON.stringify(info));
    await ctx.close();
  }
  await b.close();
})();
