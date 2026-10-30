// node run.js <take dir name q7|q8> <out dir> [modes: b1,b2,b3,b4,d3]  shots of each beat at 390x844 and beat 3 at 1280x800
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const T=process.argv[2],OUT=process.argv[3],MODES=(process.argv[4]||'b1,b2,b3,b4,d3').split(',');fs.mkdirSync(OUT,{recursive:true});
const DIR=path.join(__dirname,'..',T),ART='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/q78/art/';
const rd=f=>fs.readFileSync(f,'utf8');const PORT=process.env.PORT||8914;
(async()=>{const b=await chromium.launch();
 for(const M of MODES){const desk=M[0]==='d',beat=+M[1];const W=desk?1280:390,HH=desk?800:844;
  const p=await b.newPage({viewport:{width:W,height:HH},deviceScaleFactor:desk?1:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  await p.route(/\/q78\//,r=>r.fulfill({contentType:'image/jpeg',body:fs.readFileSync(ART+r.request().url().split('/q78/')[1])}));
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.addStyleTag({content:rd(path.join(__dirname,'_data.js')).slice(0,0)+rd(path.join(DIR,T+'.css'))});
  await p.addScriptTag({content:rd(path.join(__dirname,'_data.js'))});await p.addScriptTag({content:rd(path.join(DIR,T+'.js'))});
  await p.waitForFunction(t=>document.documentElement.classList.contains(t+'-ready'),T,{timeout:20000});
  await p.evaluate(()=>{scrollTo(0,0);[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0&&!x.closest('header.top'))x.style.visibility='hidden'})});
  await p.evaluate(([t,bt])=>window['__'+t+'Go'](bt),[T,beat]);
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(+(process.env.WAIT||4800));
  await p.screenshot({path:`${OUT}/${T}-${M}.png`});
  const m=await p.evaluate(t=>{const S=document.getElementById(t);const VW=innerWidth;
    const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&c.opacity!=='0'&&e.getClientRects().length};
    const panels=[...S.querySelectorAll('[data-panel]')].filter(vis).map(pn=>{const r=pn.getBoundingClientRect();let tot=0,emp=0;
      for(let y=r.top+3;y<r.bottom-2;y+=4)for(let x=r.left+3;x<r.right-2;x+=4){if(y<0||y>innerHeight)continue;tot++;const e=document.elementFromPoint(x,y);if(e===pn)emp++}
      return (pn.className.baseVal??pn.className).toString().split(' ')[0]+'#'+Math.round(r.width)+'x'+Math.round(r.height)+':'+(tot?Math.round(emp/tot*100):0)+'%'});
    // nothing over a logo or over the art: points inside every visible logo/art img must hit the img itself
    const cover=[...S.querySelectorAll('img')].filter(vis).map(im=>{const r=im.getBoundingClientRect();let tot=0,bad=0;
      for(let y=r.top+2;y<r.bottom-1;y+=5)for(let x=r.left+2;x<r.right-1;x+=5){if(y<0||y>innerHeight||x<0||x>VW)continue;tot++;const e=document.elementFromPoint(x,y);if(e&&e!==im&&!im.contains(e))bad++}
      return im.getAttribute('src').split('/').pop()+':'+(tot?Math.round(bad/tot*1000)/10:0)+'%'}).filter(s=>!/:0%$/.test(s));
    const clip=[...S.querySelectorAll('b,span,em,p,h2,small,i,li')].filter(e=>vis(e)&&getComputedStyle(e).overflow!=='visible'&&!e.closest('.q7-sp')&&(e.scrollWidth>e.clientWidth+1)).map(e=>e.textContent.trim().slice(0,20));
    const r=S.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,vw:VW,sec:[Math.round(r.top),Math.round(r.bottom)],vh:innerHeight,panels,cover,clip}},T);
  console.log(M,JSON.stringify(m),er.join('|')||'no errors');await p.close()}
 await b.close()})();
