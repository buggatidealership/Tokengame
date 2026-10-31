// node run.js <out dir> [widths 390,1280,320] : the whole Overview as "The issue" (z4), full page shots + checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number),NOW=process.env.NOW==='1';fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8919/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(!NOW){await p.addStyleTag({content:rd('_z4.css')});await p.addScriptTag({content:rd('_z4.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('z4-ready')||window.__z4Err,null,{timeout:30000});
   const e=await p.evaluate(()=>window.__z4Err&&String(window.__z4Err.stack));if(e)console.log('ERR',e)}
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(50)}
  await p.evaluate(()=>{document.documentElement.classList.remove('z4-sdt');const s=document.querySelector('.z4-strip');if(s)s.classList.add('z4-done');scrollTo(0,0)});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1500);
  const chk=await p.evaluate(()=>{const sw=document.documentElement.scrollWidth,iw=innerWidth;const clip=[];
    document.querySelectorAll('#z4-issue *').forEach(el=>{const cs=getComputedStyle(el);if(el.offsetParent===null)return;if((cs.overflow==='hidden'||cs.textOverflow==='ellipsis')&&el.scrollWidth>el.clientWidth+1&&el.children.length<3)clip.push((el.className||el.tagName)+':'+el.textContent.trim().slice(0,30))});
    const wide=[...document.querySelectorAll('#z4-issue *')].filter(el=>{const r=el.getBoundingClientRect();return r.width&&r.right>iw+1&&!el.closest('.z4-rk-row')}).slice(0,8).map(el=>el.className+' '+Math.round(el.getBoundingClientRect().right));
    const cardOv=[...document.querySelectorAll('.z4-cd-f,.z4-cd-b,.z4-p,.z4-mini a,.z4-bi')].filter(e=>e.scrollHeight>e.clientHeight+1).map(e=>e.className.slice(0,20));const ih=document.getElementById('z4-issue');return {cardOv,sw,iw,clip:clip.slice(0,12),wide,h:ih?Math.round(ih.getBoundingClientRect().height):0,top:ih?Math.round(ih.getBoundingClientRect().top+scrollY):0}});
  console.log(W,JSON.stringify(chk),er.join(' | ')||'no errors');
  const top=chk.top||0,h=NOW?await p.evaluate(()=>document.documentElement.scrollHeight):chk.h+top+10;
  await p.screenshot({path:`${OUT}/${W}${NOW?'-now':''}.png`,clip:{x:0,y:0,width:W,height:Math.min(h,16000)},fullPage:true});
  await p.close()}
 await b.close()})();
