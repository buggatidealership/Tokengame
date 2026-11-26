// node rec.js <take> <out.mp4> [width]: records the take switching windows (Season -> 24h -> 7 days -> Season) on the board's own switch
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const T=process.argv[2]||'s2',OUT=process.argv[3],W=+(process.argv[4]||1280);
(async()=>{const tmp=fs.mkdtempSync(path.join(process.env.TMPDIR||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad','ssrec-'));
 const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p}=await open(b,W,T,{h:W<600?844:1000,dpr:1});
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=450){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
 await p.waitForTimeout(1200);
 await p.evaluate(()=>{const s=document.querySelector('.ss-host');scrollTo({top:s.getBoundingClientRect().top+scrollY-16,behavior:'instant'})});await p.waitForTimeout(500);
 const bb=await p.evaluate(()=>{const r=document.querySelector('.ss-host').getBoundingClientRect();return {x:0,y:Math.max(0,r.top-8),w:innerWidth,h:Math.min(innerHeight-Math.max(0,r.top-8),r.height+20),sy:scrollY}});console.log('bb',JSON.stringify(bb));
 /* the browser's own screencast, at its real timing: each frame lasts until the next one */
 const cdp=await p.context().newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async f=>{fr.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'png',everyNthFrame:1});await p.waitForTimeout(900);
 for(const k of ['d1','d7','season']){await p.evaluate(k=>document.querySelector(`.ss-host .ss-swb[data-k="${k}"]`).click(),k);await p.waitForTimeout(1900)}
 const y1=await p.evaluate(()=>scrollY);console.log('scroll drift',y1);await cdp.send('Page.stopScreencast');await b.close();
 let lst='';fr.forEach((f,j)=>{const fn=`${tmp}/f${String(j).padStart(4,'0')}.png`;fs.writeFileSync(fn,Buffer.from(f.d,'base64'));const d=j<fr.length-1?Math.max(.01,fr[j+1].t-f.t):.5;lst+=`file '${fn}'\nduration ${d.toFixed(3)}\n`});
 lst+=`file '${tmp}/f${String(fr.length-1).padStart(4,'0')}.png'\n`;fs.writeFileSync(tmp+'/l.txt',lst);
 const c=`crop=${bb.w}:${Math.floor(bb.h/2)*2}:0:${Math.round(bb.y)}`;
 cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${tmp}/l.txt -vf "${c},fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 ${OUT}`);
 console.log(OUT,fr.length,'frames',(fr[fr.length-1].t-fr[0].t).toFixed(1)+'s');
 fs.rmSync(tmp,{recursive:true,force:true});})();
