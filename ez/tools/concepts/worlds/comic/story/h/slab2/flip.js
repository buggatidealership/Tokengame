// node flip.js <take> <round> <out.webm> [width]: records the opened round turning to the take's back (Playwright video)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const [t,n,out,W0]=process.argv.slice(2),W=+W0||390,GF='https://fonts.googleapis.com/css2?family=Bangers&family=Anton&family=Barlow+Condensed:wght@600;800&family=Shantell+Sans:wght@500;700;800&family=Special+Elite&display=block';
const FL=t=>t==='cov'?'cov':'page',CSS=t=>rd('../slabback/_sb.css')+rd('_s2.css')+rd(FL(t)+'.css'),JS=t=>rd('../round/_r.js')+rd('../slabback/_sb.js')+'window.S2B='+rd('balloons.json')+';'+rd('_s2.js')+rd(FL(t)+'.js');
(async()=>{const b=await chromium.launch();const dir=__dirname+'/.vid';const ctx=await b.newContext({viewport:{width:W,height:W<600?844:860},recordVideo:{dir,size:{width:W,height:W<600?844:860}}});const p=await ctx.newPage();await FONTS(p);
await p.goto(`http://localhost:8951/v47-live-x3plus.html#/round/${n}`,{waitUntil:'load',timeout:150000});
await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .zlab'),null,{timeout:200000});
await p.addStyleTag({url:GF}).catch(()=>{});await p.addStyleTag({content:CSS(t)});await p.addScriptTag({content:JS(t)});
await p.evaluate(({t,n})=>SB.show(t,+n,false),{t,n});await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));await p.waitForTimeout(2500);
const t0=Date.now();await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(4000);
await p.evaluate(()=>document.querySelector('#x2pRm .sb .sb-flip').click());await p.waitForTimeout(3000);
const v=p.video();await ctx.close();fs.renameSync(await v.path(),out);console.log('saved',out);await b.close()})();
