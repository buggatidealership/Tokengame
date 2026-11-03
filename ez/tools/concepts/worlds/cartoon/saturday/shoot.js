// node shoot.js <page> <width> <dpr> <out.png> : full-page screenshot of one of my own pages (served from ez/ on :8995)
const {chromium}=require('playwright');
(async()=>{
  const [page,w,dpr,out]=process.argv.slice(2);
  const b=await chromium.launch();
  const p=await b.newPage({viewport:{width:+w,height:844},deviceScaleFactor:+dpr});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('http://localhost:8995/tools/concepts/worlds/cartoon/saturday/'+page,{waitUntil:'load'});
  await p.evaluate(()=>document.fonts.ready);
  // scroll my own page through once so the charts draw in and images load
  const H=await p.evaluate(()=>document.body.scrollHeight);
  for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(120)}
  await p.evaluate(()=>scrollTo(0,0));
  await p.waitForTimeout(6000);
  await p.evaluate(()=>new Promise(r=>{const v=document.getElementById('tvv');if(!v||v.readyState>=2&&!v.seeking)return r();v.addEventListener('seeked',()=>r(),{once:true});setTimeout(r,4000)}));
  // the charts as a reader sees them once they have drawn in (the draw-in is a one-off entrance)
  await p.evaluate(()=>document.querySelectorAll('.ln').forEach(x=>{x.style.transition='none';x.style.strokeDashoffset='0';x.style.clipPath='none'}));
  await p.waitForTimeout(300);
  // capture in bands and stitch (one huge capture can crash the renderer)
  const TH=await p.evaluate(()=>document.documentElement.scrollHeight),band=1600,parts=[];
  for(let y=0,i=0;y<TH;y+=band,i++){const h=Math.min(band,TH-y),f=out.replace(/\.png$/,'')+'.part'+i+'.png';await p.screenshot({path:f,clip:{x:0,y,width:+w,height:h},fullPage:true});parts.push(f)}
  require('child_process').execFileSync('convert',[...parts,'-append',out]);parts.forEach(f=>require('fs').unlinkSync(f));
  const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,h:document.body.scrollHeight}));
  console.log(JSON.stringify(m),errs.length?'ERRORS: '+errs.join(' | '):'no errors');
  await b.close();
})();
