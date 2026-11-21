const {execSync}=require('child_process');const {chromium}=require(execSync('npm root -g').toString().trim()+'/playwright');const fs=require('fs');
const D=__dirname+'/fr';fs.rmSync(D,{recursive:true,force:true});fs.mkdirSync(D);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:1360},deviceScaleFactor:1.25});
 await p.goto('file://'+__dirname+'/h10.html');await p.waitForTimeout(800);
 const N=12*30;for(let i=0;i<N;i++){await p.evaluate(t=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=t}),i*1000/30);
  await p.screenshot({path:D+'/'+String(i).padStart(4,'0')+'.png'})}
 await b.close()})();
