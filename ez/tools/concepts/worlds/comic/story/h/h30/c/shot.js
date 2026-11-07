// H30 C · measure and shoot. node shot.js <outdir> [widths=390,320] [now=2026-11-02T18:00:00Z]
// Writes <outdir>/w<W>-s<i>.png per section (s1 includes the header), <outdir>/w<W>.json (heights, words, errors),
// <outdir>/first.png (390x664 at 3x), <outdir>/d<W>.png full pages for widths >= 1000.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const out=process.argv[2]||'/tmp/h30c';const widths=(process.argv[3]||'390,320,1280').split(',').map(Number);
const NOW=process.argv[4]||'2026-11-02T18:00:00Z';
const URL=`http://127.0.0.1:${process.env.PORT||8983}/tools/concepts/worlds/comic/story/h/h30/c/index.html?now=${encodeURIComponent(NOW)}`;
fs.mkdirSync(out,{recursive:true});
async function open(b,w,h,dpr){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:dpr,isMobile:w<700,hasTouch:w<700});
  const p=await ctx.newPage();const er=[];p.on('pageerror',e=>er.push(String(e)));p.on('console',m=>{if(m.type()==='error')er.push(m.text())});
  p.on('requestfailed',r=>{if(!/\.mp4|\.webm/.test(r.url()))er.push('fail '+r.url())});
  await p.goto(URL,{waitUntil:'load',timeout:90000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('c-ready'),null,{timeout:30000});
  await p.waitForTimeout(2300);return {ctx,p,er}}
(async()=>{const b=await chromium.launch();
 for(const w of widths){
  if(w>=1000){const {ctx,p,er}=await open(b,w,900,1);
    const m=await p.evaluate(()=>{const top=document.querySelector('.top').getBoundingClientRect().height;const r=[...document.querySelectorAll('section.fr')].map(s=>{const b=s.getBoundingClientRect();return {id:s.id,x:Math.round(b.x),y:Math.round(b.y+scrollY),w:Math.round(b.width),h:Math.round(b.height)}});return {top,r,H:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth}});
    await p.screenshot({path:path.join(out,`d${w}.png`),fullPage:true});
    fs.writeFileSync(path.join(out,`d${w}.json`),JSON.stringify({m,er},null,1));console.log(w,JSON.stringify(m),er);await ctx.close();continue}
  const {ctx,p,er}=await open(b,w,664,2);
  const m=await p.evaluate(()=>{const H=document.querySelector('.top').getBoundingClientRect().height;
    const toks=el=>el.innerText.replace(/[←-⇿▲▼↗↓·]/g,' ').split(/\s+/).filter(x=>/[A-Za-z0-9]/.test(x));
    /* words = prose and labels; figs = numbers, dates' digits, R80, 45W (counted apart) */
    const words=el=>toks(el).filter(x=>/[A-Za-z]/.test(x)&&!/^R\d+$|^\d+[WL]$|^[WL]$/.test(x)).length;const figs=el=>toks(el).length-words(el);
    const ovf=[];document.querySelectorAll('section *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>innerWidth+.5||r.left<-.5))ovf.push(e.className+':'+Math.round(r.left)+'-'+Math.round(r.right))});
    return {header:H,sw:document.documentElement.scrollWidth,ovf:ovf.slice(0,12),secs:[...document.querySelectorAll('section.fr')].map((s,i)=>{const b=s.getBoundingClientRect();return {id:s.id,y:b.y+scrollY,h:b.height,frame:i?b.height:b.height+H,words:words(s)+(i?0:words(document.querySelector('.top'))),figs:figs(s)}})}});
  for(let i=0;i<m.secs.length;i++){const s=m.secs[i];const y=i?s.y:0,h=i?s.h:s.h+m.header;
    await p.setViewportSize({width:w,height:Math.ceil(h)});
    await p.evaluate(y=>window.scrollTo(0,y),y);await p.waitForTimeout(250);
    // the sticky header would cover later sections: hide it for their shots
    await p.evaluate(i=>{document.querySelector('.top').style.visibility=i?'hidden':''},i);
    await p.screenshot({path:path.join(out,`w${w}-s${i+1}.png`),clip:{x:0,y:0,width:w,height:Math.ceil(h)}});
    await p.evaluate(()=>{document.querySelector('.top').style.visibility=''})}
  fs.writeFileSync(path.join(out,`w${w}.json`),JSON.stringify({m,er},null,1));
  console.log(w,JSON.stringify(m.secs.map(s=>[s.id,Math.round(s.frame),s.words,s.figs])),'sw',m.sw,'ovf',m.ovf,er);
  await ctx.close();
  if(w===390){const c2=await open(b,390,664,3);await c2.p.screenshot({path:path.join(out,'first.png')});await c2.ctx.close()}}
 await b.close()})();
