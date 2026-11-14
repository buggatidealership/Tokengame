// node rec.js <frames dir> [width]: records G3's doors opening as the section scrolls into view (CDP screencast frames with their timestamps)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],W=+(process.argv[3]||390);fs.mkdirSync(OUT,{recursive:true});const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:W<600?760:900},deviceScaleFactor:2});await FONTS(p);
 await p.goto('http://localhost:8917/v47-live-x3plus.html',{waitUntil:'load'});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.addStyleTag({content:rd('_gr.css')+rd('g3.css')});await p.addScriptTag({content:rd('_gr.js')});
 await p.evaluate(()=>{const s=document.querySelector('.wc-chars');scrollTo(0,s.getBoundingClientRect().top+scrollY-innerHeight-50)});
 await p.addScriptTag({content:rd('g3.js')});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});
 const c=await p.context().newCDPSession(p);const fr=[];c.on('Page.screencastFrame',async e=>{fr.push({d:e.data,t:e.metadata.timestamp});await c.send('Page.screencastFrameAck',{sessionId:e.sessionId})});
 await c.send('Page.startScreencast',{format:'jpeg',quality:85,everyNthFrame:1});
 const y0=await p.evaluate(()=>scrollY),y1=await p.evaluate(()=>{const s=document.querySelector('.wc-chars');return s.getBoundingClientRect().top+scrollY+60});
 await p.waitForTimeout(400);for(let i=1;i<=30;i++){await p.evaluate(y=>scrollTo(0,y),y0+(y1-y0)*(1-Math.pow(1-i/30,2)));await p.waitForTimeout(33)}
 await p.waitForTimeout(4200);await c.send('Page.stopScreencast');
 let l='';fr.forEach((f,i)=>{fs.writeFileSync(`${OUT}/f${String(i).padStart(4,'0')}.jpg`,Buffer.from(f.d,'base64'));const dur=i<fr.length-1?fr[i+1].t-f.t:0.1;l+=`file 'f${String(i).padStart(4,'0')}.jpg'\nduration ${dur.toFixed(4)}\n`});
 fs.writeFileSync(OUT+'/list.txt',l);console.log(fr.length,'frames');await b.close()})();
