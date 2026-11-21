// node rec.js <out.mp4> : 390px recording of the chip's live digits. The clock is shifted (Date.now + offset) so the countdown sits 5 s
// before an hour boundary: seconds roll 04..00, then the minutes and hours roll over. Shifted clock, said in REPORT.md.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const OUT=process.argv[2],TMP=fs.mkdtempSync(require('os').tmpdir()+'/rec');
(async()=>{const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:780,height:1688},deviceScaleFactor:1});const p=await ctx.newPage();await FONTS(p);
 await p.goto('http://localhost:8942/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('.wc-bet'),null,{timeout:90000});
 await p.addStyleTag({content:'html{zoom:2}'});await p.addStyleTag({content:rd('_b.css')+rd('chip.css')+rd('s1.css')});
 await p.evaluate(()=>{const o=Date.now;window.__o=o;window.__off=0;Date.now=()=>o()+window.__off});
 await p.addScriptTag({content:rd('_b.js')+rd('chip.js')+rd('s1.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('bt-ready'));
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const a=document.querySelector('.c2-art');scrollTo(0,a.getBoundingClientRect().top+scrollY-120)});
 await p.waitForTimeout(1500);
 const cdp=await ctx.newCDPSession(p);const fr=[];
 cdp.on('Page.screencastFrame',async f=>{fr.push({t:f.metadata.timestamp,d:f.data});await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{})});
 await cdp.send('Page.startScreencast',{format:'png',maxWidth:780,maxHeight:1688,everyNthFrame:1});
 await p.waitForTimeout(400);
 await p.evaluate(()=>{const L=BT.left();window.__off=((L.s%3600)-5)*1000+(1000-(window.__o()%1000))-150});
 await p.waitForTimeout(8600);await cdp.send('Page.stopScreencast');
 const box=await p.evaluate(()=>{const r=document.querySelector('.c2-fr').getBoundingClientRect();return {y:Math.max(0,Math.round(r.top-70)),h:Math.round(r.height+90),iw:innerWidth}});
 let list='';fr.forEach((f,i)=>{fs.writeFileSync(`${TMP}/f${i}.png`,Buffer.from(f.d,'base64'));const d=i<fr.length-1?fr[i+1].t-f.t:.04;list+=`file '${TMP}/f${i}.png'\nduration ${d.toFixed(4)}\n`});
 fs.writeFileSync(TMP+'/l.txt',list);const k=2;
 cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/l.txt -t 8 -vf "crop=780:440:0:${Math.max(0,box.y*k-70)},fps=30" -c:v libx264 -pix_fmt yuv420p -crf 17 ${OUT}`);
 console.log(fr.length,'frames');await ctx.close();
 await b.close();console.log('ok',OUT)})();
