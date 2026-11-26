// node rec.js <out.mp4> <take n1..n4> [width 390] : records the window switch (Season, then Last 24 hours, Last 7 days,
// Season) from the browser's own screencast frames at their real timing, through ffmpeg. Temp frames are removed.
const fs=require('fs'),cp=require('child_process');const {open}=require('./run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const [OUTF,T]=process.argv.slice(2),W=+(process.argv[4]||390),H=W<600?844:820;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,W,T,{h:H,dpr:2});
 await p.waitForFunction(()=>document.fonts.status==='loaded');
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
 await p.evaluate(()=>{const n=document.querySelector('#wc-lb .wc-tab-cv');scrollTo(0,n.getBoundingClientRect().top+scrollY-12)});await p.waitForTimeout(800);
 const dir=fs.mkdtempSync(require('os').tmpdir()+'/snrec-');let n=0;const times=[];
 const cdp=await p.context().newCDPSession(p);cdp.on('Page.screencastFrame',async e=>{fs.writeFileSync(`${dir}/f${String(n).padStart(4,'0')}.jpg`,Buffer.from(e.data,'base64'));times.push(e.metadata.timestamp*1000);n++;cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId}).catch(()=>{})});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,maxWidth:W*2,maxHeight:H*2,everyNthFrame:1});
 /* a real tap on each stub, so the stub's own press shows */
 const ck=k=>p.click(`.sn-stub[data-k="${k}"]`);
 await p.waitForTimeout(1500);await ck('d1');await p.waitForTimeout(2600);await ck('d7');await p.waitForTimeout(2600);await ck('season');await p.waitForTimeout(2600);
 await cdp.send('Page.stopScreencast');await p.waitForTimeout(200);
 let list='';for(let i=0;i<n;i++){const d=Math.max(.001,((i+1<n?times[i+1]:times[i]+80)-times[i])/1000);list+=`file '${dir}/f${String(i).padStart(4,'0')}.jpg'\nduration ${d.toFixed(3)}\n`}list+=`file '${dir}/f${String(n-1).padStart(4,'0')}.jpg'\n`;
 fs.writeFileSync(dir+'/l.txt',list);cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${dir}/l.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2,format=yuv420p" -c:v libx264 -crf 23 -movflags +faststart ${OUTF}`);
 console.log(OUTF,n,'frames',er.join('|')||'ok');fs.rmSync(dir,{recursive:true,force:true});await b.close()})();
