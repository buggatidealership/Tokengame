// node rec.js <out.mp4> : a 390 phone flipping through the issue (CDP screencast at real timing -> ffmpeg)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const OUT=process.argv[2];const TMP='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/z4rec';fs.rmSync(TMP,{recursive:true,force:true});fs.mkdirSync(TMP,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8919/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_z4.css')});await p.addScriptTag({content:rd('_z4.js')});
 await p.waitForFunction(()=>document.documentElement.classList.contains('z4-ready'));
 await p.evaluate(()=>{const ih=document.getElementById('z4-issue');for(let y=0;y<document.documentElement.scrollHeight;y+=600)scrollTo(0,y);scrollTo(0,0)});
 await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
 const c=await p.context().newCDPSession(p);const frames=[];
 c.on('Page.screencastFrame',async f=>{frames.push({t:f.metadata.timestamp,d:f.data});c.send('Page.screencastFrameAck',{sessionId:f.sessionId}).catch(()=>{})});
 await c.send('Page.startScreencast',{format:'jpeg',quality:88,maxWidth:780,maxHeight:1688,everyNthFrame:1});
 const W=ms=>p.waitForTimeout(ms);
 const glide=async(to,ms)=>{const y0=await p.evaluate(()=>scrollY),n=Math.max(1,Math.round(ms/45));for(let i=1;i<=n;i++){const k=i/n,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.evaluate(y=>scrollTo(0,y),y0+(to-y0)*e);await W(8)}};
 const yOf=s=>p.evaluate(s=>{const n=document.querySelector(s);return n.getBoundingClientRect().top+scrollY-64},s);
 await W(1600);
 await glide(await yOf('.z4-ad'),1700);await W(5200);              // the strip ad plays once it's read
 await glide(await yOf('.z4-cards'),1600);await W(500);
 await p.click('.z4-gold .z4-cd');await W(1700);await p.click('.z4-gold .z4-cd');await W(900);
 await glide(await yOf('.z4-box')+40,1600);await W(500);
 for(let i=0;i<3;i++){await p.click('.z4-lb-b[data-d="1"]');await W(950)}
 await p.click('.z4-lb-b[data-d="-1"]');await W(900);
 await glide(await yOf('.z4-rack'),1500);await W(400);
 for(let i=1;i<=25;i++){await p.evaluate(i=>{document.querySelector('.z4-rk-row').scrollLeft=i*28},i);await W(10)}await W(500);
 for(let i=25;i>=0;i--){await p.evaluate(i=>{document.querySelector('.z4-rk-row').scrollLeft=i*28},i);await W(8)}
 await glide(await yOf('.z4-back'),1600);await W(2600);
 await c.send('Page.stopScreencast');await b.close();
 // write frames with real durations through the concat demuxer
 let list='';frames.forEach((f,i)=>{const fn=path.join(TMP,`f${String(i).padStart(5,'0')}.jpg`);fs.writeFileSync(fn,Buffer.from(f.d,'base64'));const d=i<frames.length-1?Math.max(.008,frames[i+1].t-f.t):.5;list+=`file '${fn}'\nduration ${d.toFixed(4)}\n`});
 list+=`file '${path.join(TMP,`f${String(frames.length-1).padStart(5,'0')}.jpg`)}'\n`;fs.writeFileSync(TMP+'/list.txt',list);
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-f','concat','-safe','0','-i',TMP+'/list.txt','-vf','scale=780:-2,fps=30,format=yuv420p','-c:v','libx264','-crf','22','-preset','medium','-movflags','+faststart',OUT]);
 console.log('frames',frames.length);fs.rmSync(TMP,{recursive:true,force:true})})();
