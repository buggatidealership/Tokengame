// node run.js <out dir> <section sol|lb> <takes e.g. now,c1,c2,c3> [widths 390,1280]
// Shoots one section of the built X3+ with a story take laid over it (take CSS + JS from this folder).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3]||'sol',TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8'),ex=f=>fs.existsSync(__dirname+'/'+f);
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html')+(SEC==='lb'?'#/leaderboard':''),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  if(t!=='now'){await p.addScriptTag({content:rd('_c.js')});await p.addStyleTag({content:rd('_c.css')});if(ex(t+'.css'))await p.addStyleTag({content:rd(t+'.css')});await p.addScriptTag({content:rd(t+'.js')});
    try{await p.waitForFunction(t=>document.documentElement.classList.contains('sc-ready-'+t),t,{timeout:8000})}catch(e){console.log('NOT READY',t,er.join('|'));await p.close();continue}}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(500);
  const sel=SEC==='lb'?(t==='now'?'#wc-lb .wc-race':'#wc-lb .sc-race'):'.wc-splash';
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},sel);await p.waitForTimeout(+(process.env.WAIT||2600));
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.setProperty('display','none','important')})});
  // for the leaderboard shoot from the take's section through the scoreboard (or the scoreboard alone for today)
  const bb=await p.evaluate(([s,lb])=>{const a=document.querySelector(s).getBoundingClientRect();let bt=a.bottom;if(lb&&!s.includes('wc-race')){const sb=document.querySelector('#wc-lb .wc-sb').getBoundingClientRect();bt=Math.max(bt,sb.top+Math.min(sb.height,innerWidth<600?330:420));}
    const pre=a.top;return {x:0,y:pre+scrollY,width:innerWidth,height:bt-pre}},[sel,SEC==='lb']);
  const top=SEC==='lb'&&t!=='now'?await p.evaluate(()=>{const c=document.querySelector('#wc-lb .wc-tab-cv');return c.getBoundingClientRect().bottom+scrollY}):bb.y;
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}.png`,clip:{x:0,y:Math.min(top,bb.y)-8,width:W,height:Math.min(bb.y+bb.height-Math.min(top,bb.y)+16,6000)},fullPage:true});
  const chk=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,iw:innerWidth,ov:[...document.querySelectorAll('[class*="sc-"]')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+.5||r.left<-.5)}).map(e=>e.className.baseVal||e.className).slice(0,5)}));
  console.log(SEC,W,t,JSON.stringify(chk),er.join('|')||'ok');await p.close()}
 await b.close()})();
