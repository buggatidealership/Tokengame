// rounds3: record the tap for one place. node video.js <outdir> <place> [W]x[H]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,PL,SZ]=process.argv.slice(2);const[W,H]=(SZ||'390x844').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:OUT,size:{width:W,height:H}}});
 const p=await ctx.newPage();await fonts(p);
 await p.goto(`http://localhost:8931/tools/concepts/worlds/comic/story/h/rounds3/mock.html?p=${PL}`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 const tap=async sel=>{const e=await p.$(sel);const bb=await e.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)};
 await tap('.stg .cv');await p.waitForTimeout(2600);await p.mouse.click(W/2,H-30);await p.waitForTimeout(1200);
 for(let i=0;i<8;i++){await p.mouse.wheel(0,90);await p.waitForTimeout(90)}
 await p.waitForTimeout(800);await tap('.wall .cv:nth-child(4)');await p.waitForTimeout(2600);await p.mouse.click(W/2,H-30);await p.waitForTimeout(1200);
 await tap('.wall .cv:nth-child(6)');await p.waitForTimeout(2600);await p.mouse.click(W/2,H-30);await p.waitForTimeout(1400);
 const v=p.video();await ctx.close();console.log(await v.path());await b.close()})();
