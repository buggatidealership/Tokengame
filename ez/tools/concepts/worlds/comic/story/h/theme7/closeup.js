// node closeup.js <out> <id> [film] : 3x close-ups of every world gap (and the beat seams in Meet the models) at 390
const L=require('./lib.js'),fs=require('fs');const [OUT,ID,FT]=process.argv.slice(2);
(async()=>{const b=await L.chromium.launch();const {ctx,p}=await L.open(b,390,3);await p.evaluate(([id,ft])=>{window.__T7=id;window.__T7F=ft||''},[ID,FT]);
 await p.addScriptTag({content:fs.readFileSync(__dirname+'/_t7film.js','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/_t7.js','utf8')});await p.waitForTimeout(2500);await p.evaluate(()=>window.__t7.draw());await p.waitForTimeout(800);await L.hideFixed(p);
 const G=await p.evaluate(()=>[...document.querySelectorAll('.t7-gapv')].map(g=>{const r=g.getBoundingClientRect();return {t:r.top+scrollY,h:r.height,beat:g.classList.contains('beat')}}));
 const info=await p.evaluate(()=>window.__t7.gaps);let i=0;
 for(const g of G){const y=Math.round(g.t+g.h/2);await p.evaluate(y=>scrollTo(0,y-200),y);await p.waitForTimeout(300);const sy=await p.evaluate(()=>scrollY);
  await p.screenshot({path:`${OUT}/cu-${ID}-${i}${g.beat?'b':''}.png`,clip:{x:0,y:y-sy-90,width:390,height:180}});i++}
 fs.writeFileSync(`${OUT}/cu-${ID}.json`,JSON.stringify({G,info}));console.log(G.length,JSON.stringify(info));await ctx.close();await b.close()})();
