// node shots2.js <out> : close-ups at 3x (bell, clock, lettering, ticket) and an 8 s screen recording of C2 at 390
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
async function open(b,t,opt){const ctx=await b.newContext(opt);const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8943/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.addStyleTag({content:rd('_c.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_c.js')+rd(t+'.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('cv-ready'));await p.evaluate(()=>scrollTo(0,0));await p.waitForFunction(()=>document.fonts.status==='loaded');return {ctx,p}}
(async()=>{const b=await chromium.launch();
 const mode=process.argv[3]||'all';
 if(mode!=='rec'){
 for(const [t,sel,name] of [['c1','.c1-bellw','bell'],['c2','.c2-clockw','clock'],['c1','.c1-head','lettering'],['c3','.c3-stage','ticket']]){
  const {ctx,p}=await open(b,t,{viewport:{width:390,height:844},deviceScaleFactor:3});await p.waitForTimeout(t==='c1'&&name==='bell'?4700:2500);
  await p.locator('#wc-book '+sel).first().screenshot({path:`${OUT}/cu-${name}.png`});await ctx.close()}}
 if(mode!=='cu'){
 const {ctx,p}=await open(b,'c2',{viewport:{width:390,height:844},deviceScaleFactor:1,recordVideo:{dir:OUT+'/rec',size:{width:390,height:844}}});
 await p.waitForTimeout(1500);await p.waitForTimeout(9500);
 const v=p.video();await ctx.close();fs.renameSync(await v.path(),OUT+'/rec.webm')}
 await b.close()})();
