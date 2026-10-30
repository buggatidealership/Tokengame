// node rec.js <take|now> <out.mp4> [width]: the board scrolls into view (marks arrive), then Season -> 24h -> 7 days on the board's own switch.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const {open}=require('./run.js');const fs=require('fs'),cp=require('child_process'),path=require('path');
const T=process.argv[2],OUT=process.argv[3],W=+(process.argv[4]||1280),VH=W<600?920:1000;
(async()=>{const tmp=fs.mkdtempSync('/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/xxrec-');
 const b=await chromium.launch({args:['--disable-dev-shm-usage']});const {p,er}=await open(b,W,T,{h:VH,dpr:W<600?2:1});
 await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
 await p.addStyleTag({content:'body > .x2p-cw,.sb-dock{display:none!important}'});
 const top=await p.evaluate(()=>document.querySelector('.ss-host').getBoundingClientRect().top+scrollY-16);
 const y0=Math.max(0,top-VH*.9);await p.evaluate(y=>scrollTo(0,y),y0);await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
 const cdp=await p.context().newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async f=>{fr.push({d:f.data,t:f.metadata.timestamp});try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});
 await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,everyNthFrame:1});await p.waitForTimeout(500);
 /* a calm scroll into view (900 ms, ease in-out) */
 await p.evaluate(([a,b])=>new Promise(r=>{const t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/900),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;scrollTo(0,a+(b-a)*e);if(k<1)requestAnimationFrame(f);else r()})(t0)}),[y0,top]);
 await p.waitForTimeout(2600);
 for(const k of ['d1','d7']){await p.evaluate(k=>document.querySelector(`.ss-host .ss-swb[data-k="${k}"]`).click(),k);await p.waitForTimeout(2300)}
 await cdp.send('Page.stopScreencast');await b.close();
 let lst='';fr.forEach((f,j)=>{const fn=`${tmp}/f${String(j).padStart(4,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.d,'base64'));const d=j<fr.length-1?Math.max(.01,fr[j+1].t-f.t):.5;lst+=`file '${fn}'\nduration ${d.toFixed(3)}\n`});
 lst+=`file '${tmp}/f${String(fr.length-1).padStart(4,'0')}.jpg'\n`;fs.writeFileSync(tmp+'/l.txt',lst);
 cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${tmp}/l.txt -vf "fps=30,scale=trunc(iw/2)*2:trunc(ih/2)*2" -c:v libx264 -pix_fmt yuv420p -crf 20 -movflags +faststart ${OUT}`);
 console.log(OUT,fr.length,'frames',(fr[fr.length-1].t-fr[0].t).toFixed(1)+'s',er.join('|')||'ok');fs.rmSync(tmp,{recursive:true,force:true})})();
