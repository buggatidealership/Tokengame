// node rec.js <out.mp4> <take e.g. t1+k3+kf1> [WxH] : records a slow scroll into Meet the models with the take's motion live
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path'),{execSync}=require('child_process');
const OUT=process.argv[2],T=process.argv[3],[W,H]=(process.argv[4]||'390x844').split('x').map(Number);
const tmp=fs.mkdtempSync(path.join(require('os').tmpdir(),'rec-'));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,recordVideo:{dir:tmp,size:{width:W,height:H}}});
 const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const parts=T.split('+');const r=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
 await p.addStyleTag({content:r('base.css')+r(parts[0]+'.css')});await p.evaluate(s=>{window.__take=s},parts[0]);await p.addScriptTag({content:r('mk.js')});
 const ks=parts.slice(1);await p.addStyleTag({content:r('k-base.css')+ks.map(k=>r(k+'.css')).join('\n')});
 await p.evaluate(ks=>document.documentElement.classList.add('tkm-k',...ks.map(k=>'tkm-'+k)),ks);await p.addScriptTag({content:r('k.js')});
 const kf=ks.filter(k=>/^kf\d/.test(k));if(kf.length){await p.addStyleTag({content:r('kf-base.css')});await p.evaluate(ks=>{document.documentElement.classList.add('tkm-kf');window.__kfPal={kf2:'night',kf3:'print'}[ks[0]]||'bold'},kf);await p.addScriptTag({content:r('kf.js')})}
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
 const y0=await p.evaluate(h=>document.querySelector('.wc-chars').getBoundingClientRect().top+scrollY-h*.9,H);
 await p.evaluate(y=>scrollTo(0,y),y0);await p.waitForTimeout(600);
 const y1=await p.evaluate(()=>{const c=document.querySelector('.wc-chars');return c.getBoundingClientRect().bottom+scrollY-innerHeight+20});
 const steps=150;for(let i=0;i<=steps;i++){await p.evaluate(y=>scrollTo(0,y),y0+(y1-y0)*(i/steps));await p.waitForTimeout(40)}
 await p.waitForTimeout(2500);const v=p.video();await ctx.close();const src=await v.path();await b.close();
 const F='/usr/local/lib/python3.11/dist-packages/imageio_ffmpeg/binaries/ffmpeg-linux-x86_64-v7.0.2';
 execSync(`${F} -y -loglevel error -sseof -13 -i "${src}" -c:v libx264 -crf 20 -pix_fmt yuv420p -movflags +faststart "${OUT}"`);console.log('ok',OUT)})();
