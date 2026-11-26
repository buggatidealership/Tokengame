// node measure.js <take|now> <route> <width>: the goal's checks, measured on the rendered page
const {chromium}=require('playwright'),fs=require('fs'),path=require('path');
(async()=>{const [take,route,w]=process.argv.slice(2);const b=await chromium.launch();const p=await b.newPage({viewport:{width:+w,height:844}});
await p.goto('http://localhost:8811/'+route,{waitUntil:'networkidle'});await p.waitForTimeout(1500);
if(take!=='now'){await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,'common.css'),'utf8')+fs.readFileSync(path.join(__dirname,take+'.css'),'utf8')});
 await p.evaluate(fs.readFileSync(path.join(__dirname,'fix.js'),'utf8'));const js=path.join(__dirname,take+'.js');if(fs.existsSync(js))await p.evaluate(fs.readFileSync(js,'utf8'))}
await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const sz={},fam={};let min=99,minEl='',clip=0,txt='';
 for(const el of document.querySelectorAll('.app *')){if(!el.offsetParent&&getComputedStyle(el).position!=='fixed')continue;const own=[...el.childNodes].some(n=>n.nodeType===3&&n.nodeValue.trim());if(!own)continue;
  const cs=getComputedStyle(el);if(cs.visibility==='hidden'||+cs.opacity===0)continue;const f=parseFloat(cs.fontSize);sz[f]=(sz[f]||0)+1;fam[cs.fontFamily.split(',')[0].replace(/"/g,'')]=1;if(f<min){min=f;minEl=el.className+' '+el.textContent.trim().slice(0,20)}
  if(el.scrollWidth>el.clientWidth+1&&cs.overflow==='hidden')clip++;txt+=el.textContent+' '}
 return {sizes:Object.keys(sz).length,families:Object.keys(fam),min,minEl,clip,hscroll:document.documentElement.scrollWidth>innerWidth,paper:/paper/i.test(txt),alltime:/all time/i.test(txt)}});
console.log(JSON.stringify({take,route,w,...r}));await b.close()})();
