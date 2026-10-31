// node run.js <outdir> <takes now,g1,...> <widths 390,1280>   (serve ez/ on :8931)
// Lays <take>.css over the built X3+ page and shoots (a) Overview from the top to the end of Every round so far, (b) Upcoming top.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
for(const W of WS)for(const t of TS)for(const tab of (process.env.TABS||'ov,up').split(',')){
 const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 const bytes={n:0};p.on('response',async r=>{if(/\/h\/ground\/img\//.test(r.url())){try{bytes.n+=(await r.body()).length}catch(e){}}});
 await p.goto('http://localhost:8931/v47-live-x3plus.html'+(tab==='up'?'#/upcoming':''),{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
 await p.waitForTimeout(tab==='up'?8000:3500);
 if(t!=='now'){const css=rd(t+'.css').replace(/url\(img\//g,'url(tools/concepts/worlds/comic/story/h/ground/img/');await p.addStyleTag({content:css});await p.evaluate(t=>document.documentElement.classList.add('gr-on','gr-'+t),t);
  if(rd(t+'.js'))await p.addScriptTag({content:rd(t+'.js')})}
 // finish count-ups and reveals: scroll through
 const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Math.min(H,7000);y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(260)}
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2500);
 await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.getBoundingClientRect().top>innerHeight-130&&!x.closest('header'))x.style.visibility='hidden'})});
 const bot=await p.evaluate(tab=>{if(tab==='up'){const e=document.querySelector('#wc-up .sg-d')||document.querySelector('.sg-d');return Math.round(e.getBoundingClientRect().top+scrollY+Math.min(560,e.getBoundingClientRect().height))}
   const s=document.querySelector('.wc-season');return Math.round(s.getBoundingClientRect().bottom+scrollY+24)},tab);
 if(t==='g1'){ // a fixed layer: shoot the page screen by screen while scrolling, as a visitor sees it, and stitch
   const VH=W<600?844:900,dpr=W<600?2:1,parts=[];for(let y=0,k=0;y<bot;y+=VH,k++){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(500);
     const sy=await p.evaluate(()=>scrollY);const fn=`${OUT}/_p${k}.png`;await p.screenshot({path:fn});parts.push([fn,sy]);if(k===0)await p.addStyleTag({content:'header.top{visibility:hidden!important}'})}
   require('child_process').execFileSync('/usr/bin/python3',['-c',`import sys,json\nfrom PIL import Image\nP=json.loads(sys.argv[1]);d=${dpr};B=Image.new('RGB',(${W}*d,${bot}*d))\nfor f,y in P:B.paste(Image.open(f).convert('RGB'),(0,int(y*d)))\nB.save(sys.argv[2])`,JSON.stringify(parts),`${OUT}/${tab}-${W}-${t}.png`]);
 } else await p.screenshot({path:`${OUT}/${tab}-${W}-${t}.png`,fullPage:true,clip:{x:0,y:0,width:W,height:bot}});
 const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,vw:innerWidth}));
 console.log(W,t,tab,JSON.stringify(m),'imgKB',Math.round(bytes.n/1024),er.join('|')||'ok');await ctx.close()}
await b.close()})();
