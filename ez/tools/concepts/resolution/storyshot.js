// node storyshot.js <outdir> <name=query,...>
const {chromium}=require('playwright');const [,,O,list]=process.argv;require('fs').mkdirSync(O,{recursive:true});
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const e=[];p.on('pageerror',x=>e.push(x.message));
for(const it of list.split(',')){const i0=it.indexOf('='),n=it.slice(0,i0),qs=it.slice(i0+1);await p.goto('http://localhost:8996/tools/concepts/resolution/story.html?'+qs.replace(/;/g,'&'));await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);await p.screenshot({path:`${O}/${n}.jpg`,type:'jpeg',quality:90})}
console.log('errs',e.join('|')||'none');await b.close()})();
