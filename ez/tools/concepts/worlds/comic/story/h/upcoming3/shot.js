// node shot.js W tag [overlay files...]  : the Upcoming tab, full page + first frame (390x664 / W x 800) + measures
const {open}=require('./lib');const fs=require('fs');(async()=>{const [W,tag,...ov]=process.argv.slice(2);const w=+W,ph=w<700?664:800;
 const {b,p,errs}=await open(w,ph,{hash:process.env.HASH||'#/upcoming',css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js')),dpr:+(process.env.DPR||2)});
 if(ov.length)await p.waitForFunction(()=>document.querySelector('.u3-root'),null,{timeout:30000}).catch(()=>errs.push('no u3-root'));
 await p.evaluate(()=>{const c=document.querySelector('.x2p-cw');if(c)c.style.visibility='hidden'});
 await p.evaluate(async()=>{const S=document.documentElement.scrollHeight;for(let y=0;y<S;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}scrollTo(0,0)});
 await p.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager')});
 await p.waitForFunction(()=>[...document.querySelectorAll('#view img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1200);
 await p.screenshot({path:`out/${tag}-${W}-first.png`});
 await p.screenshot({path:`out/${tag}-${W}.png`,fullPage:true});
 const m=await p.evaluate(()=>{const de=document.documentElement,R=document.querySelector('.u3-root');const out={sh:de.scrollHeight,sw:de.scrollWidth,vw:innerWidth};
  if(R){out.over=[];const rr=R.getBoundingClientRect();R.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&!e.closest('svg')&&(r.right>innerWidth+.5||r.left<-.5)&&getComputedStyle(e).position!=='fixed')out.over.push((e.className&&e.className.baseVal===undefined?e.className:e.tagName)+' '+Math.round(r.left)+'..'+Math.round(r.right))});out.over=out.over.slice(0,12);
   out.clip=[];R.querySelectorAll('[data-fit]').forEach(e=>{if(e.scrollWidth>e.clientWidth+1)out.clip.push(e.textContent.slice(0,30))});
   out.persp=[...R.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);return s.perspective!=='none'||/matrix3d|perspective/.test(s.transform)}).length;
   out.anims=document.getAnimations().filter(a=>a.effect&&a.effect.target&&R.contains(a.effect.target)).length;
   out.imgs=[...R.querySelectorAll('img')].length;out.firstH=Math.round(rr.top+scrollY)}
  return out});
 m.errs=errs;fs.writeFileSync(`out/${tag}-${W}.json`,JSON.stringify(m));console.log(tag,W,JSON.stringify(m));await b.close()})();
