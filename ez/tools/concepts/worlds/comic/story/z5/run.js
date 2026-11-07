// node run.js <out dir> [widths 390,1280,320]   env: RM=1 reduced motion, NOSHOT=1 checks only, LIVE=1 (motion on, no still)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280,320').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res=[];
 for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8920/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.evaluate(()=>{window.__z5ExPoster='tools/concepts/worlds/comic/story/z5/r56-q.jpg'});if(!process.env.LIVE)await p.evaluate(()=>{window.__z5Still=true});
  await p.addStyleTag({content:rd('z5.css')});await p.addScriptTag({content:rd('z5.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('z5-ready')||window.__z5Err,null,{timeout:30000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  {const H2=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H2;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(60)}}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1500);
  const m=await p.evaluate(()=>{const bk=document.getElementById('z5-book'),VW=innerWidth,vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&e.getClientRects().length};
    const out=[...bk.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&vis(e)&&!e.closest('.z5-sr')&&(q.right>VW+.5||q.left<-.5)}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,26)).slice(0,8);
    const clip=[...bk.querySelectorAll('b,small,p,span,em,a')].filter(e=>vis(e)&&!e.closest('.z5-sr')&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').map(e=>String(e.className).slice(0,20)+':'+e.textContent.slice(0,18)).slice(0,8);
    const imgs=[...bk.querySelectorAll('img')].filter(i=>vis(i)&&i.naturalWidth&&!i.closest('.z5-reel')&&!i.closest('.z5-cf-ph:not(.z5-cf-nf .z5-cf-ph)')).map(i=>{const r=i.getBoundingClientRect();return {s:+(Math.max(r.width,r.height)*devicePixelRatio/Math.max(i.naturalWidth,i.naturalHeight)).toFixed(2),src:i.src.split('/').pop()}}).sort((a,b)=>b.s-a.s).slice(0,3);
    const r=bk.getBoundingClientRect();return {sw:document.documentElement.scrollWidth,vw:VW,h:Math.round(r.height),y:Math.round(r.top+scrollY),out,clip,imgs,err:String(window.__z5Err||'')}});
  if(!process.env.NOSHOT){await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
    const total=m.y+m.h+20,part=7600;let i=0;for(let y=0;y<total;y+=part){i++;await p.screenshot({path:`${OUT}/${W}-${i}.png`,clip:{x:0,y,width:W,height:Math.min(part,total-y)},fullPage:true})}}
  const line=`${W}${process.env.RM?' RM':''} ${JSON.stringify(m)} ${er.join('|')||'no errors'}`;console.log(line);res.push(line);await p.close()}
 fs.writeFileSync(OUT+'/checks.txt',res.join('\n')+'\n',{flag:'a'});await b.close()})();
