// node run.js <out> <ids p1,p2> [W 390] [film take] : lays _t7.js over the built X2+ page, stitched full Overview capture <out>/full-<W>-<id>.png + measure.json
const L=require('./lib.js'),fs=require('fs');const OUT=process.argv[2],IDS=process.argv[3].split(','),W=+(process.argv[4]||390),FT=process.argv[5]||'';fs.mkdirSync(OUT,{recursive:true});
const FILM=__dirname+'/_t7film.js',T7=__dirname+'/_t7.js';
(async()=>{const b=await L.chromium.launch();const res={};
 for(const id of IDS){const {ctx,p,er}=await L.open(b,W,1);
  await p.evaluate(([id,ft])=>{window.__T7=id;window.__T7F=ft},[id,FT]);
  if(fs.existsSync(FILM))await p.addScriptTag({content:fs.readFileSync(FILM,'utf8')});
  await p.addScriptTag({content:fs.readFileSync(T7,'utf8')});await p.waitForTimeout(2500);
  await p.evaluate(()=>window.__t7&&window.__t7.draw&&window.__t7.draw());await p.waitForTimeout(800);
  await L.hideFixed(p);
  const m=await p.evaluate(()=>({H:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,vw:innerWidth,bands:window.__t7&&window.__t7.bands,gaps:window.__t7&&window.__t7.gaps,err:String(window.__t7Err||window.__t7fErr||'')}));
  await L.longShot(p,`${OUT}/full-${W}-${id}${FT?'-'+FT:''}`,0,m.H);m.errors=er;res[id]=m;console.log(id,JSON.stringify(m).slice(0,900));await ctx.close()}
 fs.writeFileSync(`${OUT}/measure-${W}${FT?'-'+FT:''}.json`,JSON.stringify(res,null,1));await b.close()})();
