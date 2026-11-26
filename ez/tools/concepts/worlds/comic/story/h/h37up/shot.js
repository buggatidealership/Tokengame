// node shot.js W tag [overlay files...] : the Upcoming tab, full page + first frame + measures; outputs to the scratchpad (OUT)
// env: DPR (default 2), DATA (repo|sheet, default repo), HASH, FIRSTONLY, NOW (ms epoch to pin the clock)
const {open}=require('./lib');const fs=require('fs');
const OUT=process.env.OUT||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/h37up/';
(async()=>{const [W,tag,...ov]=process.argv.slice(2);const w=+W,ph=w<700?844:800;
 const {b,p,errs}=await open(w,ph,{hash:process.env.HASH||'#/upcoming',css:ov.filter(f=>f.endsWith('.css')),js:ov.filter(f=>f.endsWith('.js')),dpr:+(process.env.DPR||2),data:process.env.DATA||'repo',now:process.env.NOW?+process.env.NOW:null});
 await p.waitForFunction(()=>document.querySelector('.u3-root'),null,{timeout:30000}).catch(()=>errs.push('no u3-root'));
 if(ov.length)await p.waitForFunction(()=>document.querySelector('.h37-root'),null,{timeout:30000}).catch(()=>errs.push('no h37-root'));
 await p.evaluate(()=>{const c=document.querySelector('.x2p-cw');if(c)c.style.visibility='hidden'});
 await p.evaluate(async()=>{const S=document.documentElement.scrollHeight;for(let y=0;y<S;y+=500){scrollTo(0,y);await new Promise(r=>setTimeout(r,90))}scrollTo(0,0)});
 await p.evaluate(()=>{document.querySelectorAll('img').forEach(i=>i.loading='eager')});
 await p.waitForFunction(()=>[...document.querySelectorAll('#view img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1500);
 await p.screenshot({path:`${OUT}${tag}-${W}-first.png`});
 if(!process.env.FIRSTONLY)await p.screenshot({path:`${OUT}${tag}-${W}.png`,fullPage:true});
 const m=await p.evaluate(()=>{const de=document.documentElement,R=document.querySelector('.h37-root')||document.querySelector('.u3-root');const out={sh:de.scrollHeight,sw:de.scrollWidth,vw:innerWidth};
  if(R){out.over=[];R.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&!e.closest('svg')&&(r.right>innerWidth+.5||r.left<-.5)&&getComputedStyle(e).position!=='fixed'&&!e.closest('[data-clip]'))out.over.push((typeof e.className==='string'?e.className:e.tagName)+' '+Math.round(r.left)+'..'+Math.round(r.right))});out.over=out.over.slice(0,12);
   /* text that overflows its own box (clipped) */
   out.clip=[];R.querySelectorAll('[data-fitw],[data-fit],.h37-t').forEach(e=>{if(e.scrollWidth>e.clientWidth+1)out.clip.push(e.textContent.slice(0,30))});
   /* text collisions: leaf text boxes from different parents that overlap */
   const T=[...R.querySelectorAll('*')].filter(e=>!e.closest('svg')&&e.childNodes.length&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.offsetParent!==null).map(e=>{const rs=[];[...e.childNodes].filter(n=>n.nodeType===3&&n.textContent.trim()).forEach(n=>{const rg=document.createRange();rg.selectNodeContents(n);[...rg.getClientRects()].forEach(q=>{/* glyph box: trim the line-height to ~70% of the font size around the middle */const fs=parseFloat(getComputedStyle(e).fontSize),mid=(q.top+q.bottom)/2,h=Math.min(q.height,fs*.72);rs.push({left:q.left,right:q.right,top:mid-h/2,bottom:mid+h/2})})});return {e,rs}});
   out.coll=[];for(let i=0;i<T.length;i++)for(let j=i+1;j<T.length;j++){if(T[i].e.contains(T[j].e)||T[j].e.contains(T[i].e))continue;
     for(const a of T[i].rs)for(const c of T[j].rs){const ox=Math.min(a.right,c.right)-Math.max(a.left,c.left),oy=Math.min(a.bottom,c.bottom)-Math.max(a.top,c.top);const ar=Math.min((a.right-a.left)*(a.bottom-a.top),(c.right-c.left)*(c.bottom-c.top));if(ox>1.5&&oy>1.5&&ox*oy>.3*ar){out.coll.push(T[i].e.textContent.slice(0,18)+' × '+T[j].e.textContent.slice(0,18));}}}
   out.coll=[...new Set(out.coll)].slice(0,10);
   out.persp=[...R.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);return s.perspective!=='none'||/matrix3d|perspective/.test(s.transform)}).length;
   out.anims=document.getAnimations().length;
   out.fonts=[...new Set([...R.querySelectorAll('*')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())).map(e=>getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,'')))];
   out.firstH=Math.round(R.getBoundingClientRect().top+scrollY);out.h=Math.round(R.getBoundingClientRect().height)}
  return out});
 m.errs=errs;fs.writeFileSync(`${OUT}${tag}-${W}.json`,JSON.stringify(m));console.log(tag,W,JSON.stringify(m));await b.close()})();
