// node rec.js <frames dir> <out.mp4> [width 390]: the verdict playing (panel 3), then the line-up stepping up to their hit rates.
// Frames are taken by seeking the page's own CSS animations, 20 per second, so the timing is exact.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const FR=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||390);fs.mkdirSync(FR,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:844},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.evaluate(()=>{window.__z5ExPoster='tools/concepts/worlds/comic/story/z5/r56-q.jpg'});
 await p.addStyleTag({content:rd('z5.css')+'.x2p-cw{display:none!important}header.top{visibility:hidden}'});await p.addScriptTag({content:rd('z5.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
 let k=0;const shot=async sel=>{const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:0,y:r.top+scrollY-10,width:innerWidth,height:r.height+20}},sel);
   await p.screenshot({path:`${FR}/f${String(k++).padStart(4,'0')}.png`,clip:bb,fullPage:true})};
 const seq=async(sel,go,dur)=>{await p.evaluate(s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-60)},sel);await p.waitForTimeout(300);
   await p.evaluate(go);await p.waitForTimeout(30);
   for(let t=0;t<=dur;t+=50){await p.evaluate(([s,t])=>{document.querySelector(s).getAnimations({subtree:true}).forEach(a=>{a.pause();a.currentTime=t})},[sel,t]);await shot(sel)}
   for(let i=0;i<20;i++)await shot(sel)};
 await seq('.z5-cs-3',()=>window.__z5Verdict(),5100);
 await seq('.z5-wall',()=>{const w=document.querySelector('.z5-wall');w.classList.remove('z5-in');void w.offsetWidth;w.classList.add('z5-in')},1500);
 await b.close();
 /* frames differ in height between the two scenes: pad each to the tallest, centred, on the page's paper */
 cp.execFileSync('/usr/bin/python3',['-c',`import glob
from PIL import Image
fs=sorted(glob.glob('${FR}/f*.png'));H=max(Image.open(f).size[1] for f in fs);H+=H%2
for f in fs:
  i=Image.open(f).convert('RGB');B=Image.new('RGB',(i.size[0],H),'#f3ead3');B.paste(i,(0,(H-i.size[1])//2));B.save(f)`]);
 cp.execFileSync('ffmpeg',['-loglevel','error','-y','-framerate','20','-i',`${FR}/f%04d.png`,'-vf','format=yuv420p','-c:v','libx264','-crf','22',OUT]);console.log(OUT,k,'frames')})();
