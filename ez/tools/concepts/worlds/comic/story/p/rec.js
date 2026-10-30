// node rec.js <tmp dir> <out.mp4>: records P1, P3, P4, P2 at 390x844 (real-time video of the page), joined with ffmpeg
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');const {execSync}=require('child_process');
const TMP=process.argv[2],OUT=process.argv[3],D=__dirname+'/',rd=f=>fs.readFileSync(f,'utf8');fs.mkdirSync(TMP,{recursive:true});
const NAME={p1:'P1 · The docked bill',p2:'P2 · Stamped window',p3:'P3 · Thumb dock',p4:'P4 · Punch the ticket'};
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const parts=[];
 for(const t of ['p1','p3','p4','p2']){const ctx=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:2,recordVideo:{dir:TMP,size:{width:780,height:1688}}});
  const t0=Date.now();const p=await ctx.newPage();await FONTS(p);
  await p.goto('http://localhost:8931/v47-live-x3plus.html#/leaderboard',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&window.__wc11Show,null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=600){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  await p.addStyleTag({content:rd(D+'_sp.css')+rd(D+t+'.css')+`.sp-rlab{position:fixed;left:8px;top:50%;z-index:99;background:#15121a;color:#fdbc2a;font:800 11px/1 system-ui;padding:5px 7px;border-radius:3px;transform:rotate(-90deg) translateX(-50%);transform-origin:0 0;letter-spacing:.04em}`});
  await p.addScriptTag({content:rd(D+'_sp.js')});await p.addScriptTag({content:rd(D+t+'.js')});
  await p.evaluate(n=>document.body.insertAdjacentHTML('beforeend',`<div class="sp-rlab">${n}</div>`),NAME[t]);
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  const yOf=s=>p.evaluate(s=>{const e=document.querySelector(s);return e.getBoundingClientRect().top+scrollY},s);
  const glide=async(to,ms)=>{const from=await p.evaluate(()=>scrollY),n=Math.round(ms/40);for(let i=1;i<=n;i++){const k=i/n,e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;await p.evaluate(y=>scrollTo(0,y),from+(to-from)*e);await p.waitForTimeout(40)}};
  const bill=await yOf('.wc11n-bill');await p.evaluate(y=>scrollTo(0,y-120),bill);await p.waitForTimeout(400);const ss=(Date.now()-t0)/1000;await p.waitForTimeout(1100);
  const sb=await yOf('#wc-lb .wc-sbd .wc-h2');
  if(t==='p2'){await glide(sb-115,1600);await p.waitForTimeout(900);await p.click('.sp-c2 [data-spk="d1"]');await p.waitForTimeout(2200);await glide(sb+160,900);await p.waitForTimeout(700);
    await glide(sb-115,700);await p.click('.sp-c2 [data-spk="d7"]');await p.waitForTimeout(2400)}
  else if(t==='p4'){await glide(sb+40,1600);await p.waitForTimeout(900);await p.click('.wc-sb-r:nth-child(1) .sp-pb[data-spk="d1"]');await p.waitForTimeout(2300);
    await p.click('.wc-sb-r:nth-child(1) .sp-pb[data-spk="d7"]');await p.waitForTimeout(2300)}
  else{const c=t==='p1'?'.sp-c1':'.sp-c3';await glide(sb+60,1800);await p.waitForTimeout(900);await p.click(c+' [data-spk="d1"]');await p.waitForTimeout(2200);
    await glide(sb+520,1100);await p.waitForTimeout(500);await p.click(c+' [data-spk="d7"]');await p.waitForTimeout(2000);
    await glide(bill-120,1500);await p.waitForTimeout(1600)}
  const v=p.video();await ctx.close();const f=await v.path();parts.push([f,ss]);console.log(t,f)}
 await b.close();
 const cut=parts.map(([f,ss],i)=>{const o=TMP+'/cut'+i+'.mp4';execSync(`ffmpeg -y -loglevel error -ss ${ss.toFixed(2)} -i "${f}" -vf "scale=780:-2,fps=30" -c:v libx264 -pix_fmt yuv420p -crf 23 ${o}`);return o});
 const list=TMP+'/list.txt';fs.writeFileSync(list,cut.map(f=>`file '${f}'`).join('\n'));
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${list} -c copy -movflags +faststart ${OUT}`);console.log(OUT)})();
