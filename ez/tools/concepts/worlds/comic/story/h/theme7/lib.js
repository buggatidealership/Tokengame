// shared: open the built X2+ page, optional inject, stitched long capture by scrolling the real viewport
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const PORT=process.env.PORT||8960;
async function open(b,W,dpr,inject,opts={}){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:dpr||1,reducedMotion:opts.reduce?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);
 const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,140))});
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
 if(inject){await p.evaluate(v=>{window.__T7=v},opts.id||'');await p.addScriptTag({content:fs.readFileSync(inject,'utf8')})}
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=400){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});
 await p.waitForTimeout(1200);return {ctx,p,er}}
async function hideFixed(p){await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})})}
async function longShot(p,file,y0,y1){const vh=await p.evaluate(()=>innerHeight);const W=await p.evaluate(()=>innerWidth);const parts=[];
 for(let y=y0;y<y1;y+=vh){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(250);const sy=await p.evaluate(()=>scrollY);const f=`${file}.part${parts.length}.png`;await p.screenshot({path:f});parts.push({f,sy,want:y})}
 fs.writeFileSync(file+'.json',JSON.stringify({W,vh,y0,y1,parts}));return parts}
module.exports={chromium,open,hideFixed,longShot};
