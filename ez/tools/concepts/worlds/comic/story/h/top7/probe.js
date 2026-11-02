// node probe.js <width> [take|now] : measures the top's parts on the built X2+ page (overlay from this folder when a take is given)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
(async()=>{const [W,T]=process.argv.slice(2);const w=+W;const b=await chromium.launch();
 const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:1});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
 await p.goto('http://localhost:8984/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(T&&T!=='now'){await p.addStyleTag({content:fs.readFileSync(path.join(__dirname,T+'.css'),'utf8')});if(fs.existsSync(path.join(__dirname,T+'.js')))await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,T+'.js'),'utf8')})}
 await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1500);await p.evaluate(()=>window.__t4&&window.__t4.place());await p.waitForTimeout(500);
 const r=await p.evaluate(()=>{const R=s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.top+scrollY),Math.round(r.height)]};
  const hdr=document.querySelector('header.top');return {hdr:hdr?Math.round(hdr.getBoundingClientRect().height):0,sec:R('section.t4'),b1:R('.t4-b1'),h1:R('.t4-h1'),bleed:R('.t4-b1 .t4-bleed'),gut:R('.t5-bg'),b2:R('.t4-b2'),h2:R('.t4-b2 .t4-h2'),frs:R('.t4-frs'),
   fr:[...document.querySelectorAll('.t4-frs>.t4-fr')].map(f=>Math.round(f.getBoundingClientRect().height)),b3:R('.t4-b3'),strip:R('.f4-strip'),fs:document.querySelector('section.t4').dataset.c3fs,meet:R('section.ch .ch-h'),sw:document.documentElement.scrollWidth,vw:document.documentElement.clientWidth,err:window.__x2pTopErr?String(window.__x2pTopErr):null,ov:window.__t7err||null}});
 console.log(JSON.stringify({w,T,...r,er}));await b.close()})();
