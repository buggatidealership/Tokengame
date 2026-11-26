// rounds4: record the tap. node video.js <outdir> <place> <style> [W]x[H]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fonts=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');
const [OUT,PL,ST,SZ]=process.argv.slice(2);const[W,H]=(SZ||'390x844').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:OUT,size:{width:W,height:H}}});
 const p=await ctx.newPage();await fonts(p);
 await p.goto(`http://localhost:8931/tools/concepts/worlds/comic/story/h/rounds4/mock.html?p=${PL}&s=${ST}`,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 for(let i=0;i<9;i++){await p.mouse.wheel(0,70);await p.waitForTimeout(110)}await p.waitForTimeout(4200);
 const tap=async n=>{const e=(await p.$$('.wall .cv'))[n];const bb=await e.boundingBox();await p.mouse.click(bb.x+bb.width/2,bb.y+bb.height/2)};
 await tap(0);await p.waitForTimeout(2600);await p.mouse.click(W/2,H-30);await p.waitForTimeout(1300);
 for(let i=0;i<6;i++){await p.mouse.wheel(0,80);await p.waitForTimeout(100)}await p.waitForTimeout(700);
 await tap(3);await p.waitForTimeout(2600);await p.mouse.click(W/2,H-30);await p.waitForTimeout(1300);
 const v=p.video();await ctx.close();console.log(await v.path());await b.close()})();
