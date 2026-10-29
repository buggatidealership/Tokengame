// node frames.js T1,T2,...  -> frames/<take>-<i>.png: the P&L -> Accuracy switch paused at fractions of each take (seeked via getAnimations)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const open=require('./_page.js');const fs=require('fs');
const TK=(process.argv[2]||'T1,T2,T3,T4,T5').split(','),FRS={T1:[.12,.3,.5,.72],T2:[.2,.3,.4,.58],T3:[.14,.36,.56,.76],T4:[.18,.4,.6,.8],T5:[.2,.4,.62,.84]};
const DUR={T1:640,T2:560,T3:660,T4:640,T5:660};fs.mkdirSync(__dirname+'/frames',{recursive:true});
(async()=>{const b=await chromium.launch();for(const t of TK){const FR=FRS[t];fs.writeFileSync(`${__dirname}/frames/${t}.json`,JSON.stringify(FR.map(f=>Math.round(f*DUR[t]))));const errs=[];const ctx=await b.newContext({viewport:{width:390,height:720},deviceScaleFactor:2});const p=await open(ctx,t,errs);
 const clip=await p.evaluate(()=>{const r=document.querySelector('#learn .x2p-pt .pt-cd').getBoundingClientRect();return {x:0,y:Math.max(0,r.top-16),width:390,height:Math.min(720-Math.max(0,r.top-16),r.height+40)}});
 await p.screenshot({path:`${__dirname}/frames/${t}-0.png`,clip});
 await p.evaluate(()=>{window.__taReady=0;document.querySelector('#learn .pt-tb [data-pt="hit"]').click()});
 await p.waitForFunction(()=>window.__taReady>0,null,{timeout:5000});
 await p.evaluate(()=>{const cd=document.querySelector('#learn .x2p-pt .pt-cd');window.__all=document.getAnimations().filter(a=>a.timeline===document.timeline&&a.effect&&a.effect.target&&(a.effect.target===cd||cd.contains(a.effect.target)));window.__all.forEach(a=>a.pause())});
 for(let i=0;i<FR.length;i++){await p.evaluate(ms=>{window.__all.forEach(a=>{a.currentTime=ms})},FR[i]*DUR[t]);await p.waitForTimeout(120);await p.screenshot({path:`${__dirname}/frames/${t}-${i+1}.png`,clip})}
 await p.evaluate(()=>window.__all.forEach(a=>a.play()));await p.waitForTimeout(1500);
 await p.screenshot({path:`${__dirname}/frames/${t}-9.png`,clip});console.log(t,errs.join(' | ')||'no errors',JSON.stringify(await open.state(p)));await ctx.close()}
 await b.close()})();
