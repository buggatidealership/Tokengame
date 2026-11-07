// node gaps.js <W>: loads A3 over the page and measures, in each table row, (col 2's ink end -> W-L's ink start) and (W-L's ink end ->
// col 4's ink start), plus each title's centre against its figures' extent. Ink = the text's own box (a Range), boxes for Last 5.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'',W=+process.argv[2]||390,ID=process.argv[3]||'a3';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:900},reducedMotion:'reduce'})).newPage();await FONTS(p);
await p.goto('http://localhost:'+(process.env.PORT||8991)+'/v46-live-x2plus.html',{waitUntil:'domcontentloaded',timeout:150000});
await p.waitForFunction(()=>window.P5&&P5.cur&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
await p.addStyleTag({content:rd('_s9.css')+rd('_a3core.css')+rd(ID+'.css')});await p.addScriptTag({content:rd('../sol7/_s7.js')+rd('../sol8/_s8.js')+rd('_s9.js')+rd('_a3core.js')+rd(ID+'.js')});
await p.evaluate(()=>document.querySelector('#learn').scrollIntoView());await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(1200);
const r=await p.evaluate(()=>{const ink=e=>{const g=document.createRange();g.selectNodeContents(e);return g.getBoundingClientRect()};
 return [...document.querySelectorAll('.s9a3-t')].map(t=>{const rows=[...t.querySelectorAll('.s9a2-r')].map(r=>{const c2=r.querySelector('.c2'),c3=r.querySelector('.c3'),c4=r.querySelector('.c4');
   const a=ink(c2),m=ink(c3),z=ink(c4);return {nm:r.textContent.slice(0,6),g1:+(m.left-a.right).toFixed(2),g2:+(z.left-m.right).toFixed(2),a,m,z}});
  const hd=[...t.querySelectorAll('.s9a2-h span')].slice(1).map((h,i)=>{const k=['a','m','z'][i],x0=Math.min(...rows.map(r=>r[k].left)),x1=Math.max(...rows.map(r=>r[k].right)),hb=ink(h);return +(((hb.left+hb.right)/2)-((x0+x1)/2)).toFixed(2)});
  return {rows:rows.map(r=>[r.nm,r.g1,r.g2,+(r.g1-r.g2).toFixed(2)]),titleOff:hd}})});
console.log(ID,W,JSON.stringify(r));await b.close()})();
