// node rec.js <out.mp4> <sol|lb> <take> <action> [seconds] [width]: records a take's motion as frames (screenshot loop) -> mp4
// actions: luck (I1: one guess, then three luck runs), replay (I2), pull (I3), toggle (I5: close, week, season), idle
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs'),cp=require('child_process');
const [OUTF,SEC,T,ACT]=process.argv.slice(2),SECS=+(process.argv[6]||8),W=+(process.argv[7]||390);process.env.SECX=SEC;

(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});
 const p=await b.newPage({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2});await require('../../../../live-r1/_fonts.js')(p);
 await p.goto('http://localhost:8923/v47-live-x3plus.html'+(SEC==='lb'?'#/leaderboard':''),{waitUntil:'load',timeout:120000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');await p.addStyleTag({content:rd('_si.css')+rd(T+'.css')});await p.addScriptTag({content:rd('_si.js')});
 if(ACT==='replay'||ACT==='pull'){/* let the take start its own motion when it scrolls in */}
 await p.addScriptTag({content:rd(T+'.js')});await p.waitForFunction(t=>document.documentElement.classList.contains('si-ready-'+t),T);await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
 const sel=SEC==='lb'?'.wc-tab-cv':'.si-sol';
 const y=await p.evaluate(s=>{const n=document.querySelector(s);return n.getBoundingClientRect().top+scrollY-10},sel);
 await p.evaluate(y=>scrollTo(0,y),y);
 const dir=fs.mkdtempSync(require('os').tmpdir()+'/sirec-');let n=0;const t0=Date.now(),times=[];
 const act=(async()=>{await p.waitForTimeout(500);
  if(ACT==='luck'){await p.evaluate(()=>{SI.setSeed(5)});await p.click('.si1-up');await p.waitForTimeout(1500);for(let i=0;i<3;i++){await p.click('.si1-luck');await p.waitForTimeout(2600)}}
  if(ACT==='toggle'){const ck=k=>p.evaluate(k=>document.querySelector(`.si5-tg button[data-k="${k}"]`).click(),k);
    await p.waitForTimeout(700);await ck('close');await p.waitForTimeout(1800);
    await p.evaluate(()=>{const s=document.querySelector('#wc-lb .wc-sb');scrollTo({top:s.getBoundingClientRect().top+scrollY-20,behavior:'smooth'})});await p.waitForTimeout(1200);
    await ck('week');await p.waitForTimeout(1800);await ck('season');}
  if(ACT==='pull'){await p.evaluate(()=>{const e=document.querySelector('.si-i3');e.classList.remove('si3-in');e.offsetWidth});await p.waitForTimeout(700);await p.evaluate(()=>document.querySelector('.si-i3').classList.add('si3-in'))}})();
 const cdp=await p.context().newCDPSession(p);cdp.on('Page.screencastFrame',async e=>{const f=`${dir}/f${String(n).padStart(4,'0')}.jpg`;fs.writeFileSync(f,Buffer.from(e.data,'base64'));times.push(e.metadata.timestamp*1000);n++;cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId}).catch(()=>{})});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,maxWidth:W*2,maxHeight:(W<600?844:900)*2,everyNthFrame:1});
 await new Promise(r=>setTimeout(r,SECS*1000));await cdp.send('Page.stopScreencast');
 await act;
 let list='';for(let i=0;i<n;i++){const d=Math.max(.001,((i+1<n?times[i+1]:times[i]+80)-times[i])/1000);list+=`file '${dir}/f${String(i).padStart(4,'0')}.jpg'\nduration ${d.toFixed(3)}\n`}list+=`file '${dir}/f${String(n-1).padStart(4,'0')}.jpg'\n`;
 fs.writeFileSync(dir+'/l.txt',list);cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${dir}/l.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -crf 22 -movflags +faststart ${OUTF}`);
 console.log(require('child_process').execSync(`/usr/bin/python3 -c "from PIL import Image;print(Image.open('${dir}/f0000.jpg').size)"`).toString().trim(),OUTF,n,'frames',(n/SECS).toFixed(1),'fps');fs.rmSync(dir,{recursive:true,force:true});await b.close()})();
