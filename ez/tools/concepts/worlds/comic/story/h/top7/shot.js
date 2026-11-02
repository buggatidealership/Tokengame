// node shot.js <width> <take|now> <outprefix> [dpr] : full capture of the top (section.t4 through Meet the models' head) + arrival screen + HRW screen
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
(async()=>{const [W,T,out,dpr]=process.argv.slice(2);const w=+W,VH=w<760?664:(w>=1900?1000:800);const b=await chromium.launch({args:['--force-gpu-mem-available-mb=40']});
 const ctx=await b.newContext({viewport:{width:w,height:VH},deviceScaleFactor:+(dpr||2)});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 await p.goto('http://localhost:8984/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(T!=='now'){await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,T+'.css'),'utf8')});if(fs.existsSync(path.join(__dirname,T+'.js')))await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,T+'.js'),'utf8')})}
 await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForTimeout(2200);
 await p.evaluate(()=>window.__t4&&window.__t4.place());await p.waitForTimeout(700);
 const m=await p.evaluate(()=>{const R=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.bottom+scrollY)]};
  const hd=document.querySelector('header.top').getBoundingClientRect().height,b2=R('.t4-b2'),h2=R('.t4-b2 .t4-h2'),fl=[...document.querySelectorAll('.t4-frs>.t4-fr')].map(f=>{const r=f.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.bottom+scrollY)]});
  const top=Math.min(h2[0],b2[0]),bot=Math.max(b2[1],...fl.map(f=>f[1]));
  return {hd:Math.round(hd),sec:R('section.t4'),h1:R('.t4-h1'),strip:R('.f4-strip'),hrw:[top,bot,bot-top],meet:R('section.ch .ch-h'),frames:fl,sw:document.documentElement.scrollWidth,vw:document.documentElement.clientWidth,err:window.__x2pTopErr?String(window.__x2pTopErr):null,t7:window.__t7err?String(window.__t7err):null,
   persp:[...document.querySelectorAll('section.t4 *')].filter(e=>{const z=getComputedStyle(e);return (z.transform.startsWith('matrix3d')||z.perspective!=='none')&&e.offsetWidth>innerWidth*1.2}).length}});
 if(out!=='-'){
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed')x.style.visibility='hidden'})});
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(400);await p.screenshot({path:out+'-a.png'});
 const y=m.hrw[0]-m.hd-8;await p.evaluate(v=>scrollTo(0,v),y);await p.waitForTimeout(500);await p.screenshot({path:out+'-b.png'});
 const sy=await p.evaluate(()=>scrollY);m.bscroll=sy;
 await p.evaluate(()=>{const h=document.querySelector('header.top');h.style.position='relative'});await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
 const ch=Math.min((m.meet?m.meet[0]:m.sec[1])+40,6000);await p.setViewportSize({width:w,height:ch});await p.waitForTimeout(800);await p.evaluate(()=>window.__t4&&window.__t4.place());await p.waitForTimeout(500);
 await p.screenshot({path:out+'-full.png',clip:{x:0,y:0,width:w,height:ch}});}
 m.fits=m.hrw[2]<=VH-m.hd;console.log(JSON.stringify({w,T,VH,...m,er}));fs.writeFileSync((out==='-'?'/dev/null':out+'.json'),JSON.stringify({w,T,VH,...m,er}));await b.close()})();
