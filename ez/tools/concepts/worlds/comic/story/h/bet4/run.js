// node run.js <outdir> <ids now,a,b,c> [widths 320,390,1280] [dpr 2]   (serve ez/: cd ez && python3 -m http.server 8971; PORT=8971)
// Lays _b4.css/_b4.js + <take>.css/.js over the built v46-live-x2plus.html's bet section (#x2pSt), shoots it as <id>-<W>.png,
// prints measurements: sideways scroll, errors, elements past the viewport, the countdown digits, the visible words in the section.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8971;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:process.env.RM?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('bd-ready'),null,{timeout:60000});await p.waitForTimeout(500);
  if(id!=='now'){await p.addStyleTag({content:rd('_b4.css')+rd(id+'.css')});await p.addScriptTag({content:rd('_b4.js')+rd(id+'.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('b4-ready'),null,{timeout:20000})}
  await p.evaluate(()=>{const s=document.querySelector('#x2pSt');scrollTo(0,s.getBoundingClientRect().top+scrollY-100)});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  await p.waitForTimeout(+(process.env.WAIT||2200));
  await p.waitForFunction(()=>{const t=Date.now()%1000;return t>550&&t<800},null,{polling:20});
  await p.evaluate(()=>{document.querySelectorAll('#x2pSt svg').forEach(s=>{try{s.pauseAnimations();s.setCurrentTime(+(window.__b4T||1.8))}catch(e){}});
    [...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('#x2pSt'))return;const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.setProperty('visibility','hidden','important')})});
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.waitForTimeout(200);
  const bx=await p.evaluate(()=>{const s=document.querySelector('#x2pSt'),r=s.getBoundingClientRect();return {y:r.top+scrollY,h:r.height}});
  const m=await p.evaluate(()=>{const S=document.querySelector('#x2pSt');const words=s=>(s.match(/[\w$%#&'’.:-]+/g)||[]).length;
    const tw=document.createTreeWalker(S,NodeFilter.SHOW_TEXT);let n,wc=0,txt=[];
    while(n=tw.nextNode()){const e=n.parentElement,s=n.textContent.trim();if(!s)continue;const cs=getComputedStyle(e);const r=e.getBoundingClientRect();
      if(!r.width||cs.visibility==='hidden'||cs.opacity==='0')continue;let hid=false;for(let a=e;a&&a!==S;a=a.parentElement){const c=getComputedStyle(a);if(c.display==='none'||c.visibility==='hidden'||(c.clip&&c.clip.includes('rect(0'))||c.clipPath==='inset(50%)'){hid=true;break}}
      if(hid||e.closest('.hb-sr,.b4-sr,.x2p-sr,.sr-only'))continue;if(r.width<=1&&r.height<=1)continue;wc+=words(s);txt.push(s.slice(0,40))}
    const out=[...S.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width)return false;const cs=getComputedStyle(e);if(cs.visibility==='hidden')return false;
      if(e.closest('.hbc-die,.hbc-lab'))return false;return q.right>innerWidth+.5||q.left<-.5}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,6);
    const dig=[...S.querySelectorAll('[data-b4d]')].map(x=>x.textContent).join(':')||[...S.querySelectorAll('.hbc-num')].map(x=>x.textContent).join(':');
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(S.getBoundingClientRect().height),words:wc,txt:txt.slice(0,40),out,dig}});
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:0,y:Math.max(0,bx.y-10),width:W,height:Math.min(bx.h+20,7000)},fullPage:true});
  m.errors=er;res[id+'@'+W]=m;console.log(id,W,JSON.stringify({sw:m.sw,vw:m.vw,h:m.h,words:m.words,out:m.out,dig:m.dig,err:er.slice(0,3)}));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
