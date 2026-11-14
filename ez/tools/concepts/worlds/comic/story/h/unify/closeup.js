// node closeup.js tag [overlays] : DPR-2 shots of the three most changed spots at 390
const {open}=require('./lib');(async()=>{const [tag,...ov]=process.argv.slice(2);const {b,p}=await open(390,844,{dpr:2,css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js'))});
await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});const spots={rounds:['.t4-b2',0,0,560],models:['.ch',0,0,560],proof:['#learn',0,0,0]};
for(const k in spots){const [s,dx,dy,hmax]=spots[k];const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView({block:'start'});const r=e.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:r.height}},s);
 await p.waitForTimeout(900);await p.screenshot({path:`out/cu-${k}-${tag}.png`,fullPage:true,clip:{x:0,y:Math.max(0,r.y-6),width:390,height:hmax||r.h+12}})}
await b.close()})();
