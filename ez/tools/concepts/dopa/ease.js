// The camera layer (#cam) is held still while measuring (it is its own intended move); invisible elements are skipped.
// node ease.js <page.html> [dur] : measures every move in a page's timeline from the elements themselves, not the pixels (2026-11-13).
// Samples the box of each watched element 120 times a second, splits its path into moves (speed above 2 px/s), and per move reports:
//   ease = 1 - max(speed at start, speed at end) / peak speed   (1 = starts and lands at rest; 0 = starts or stops dead at full speed)
//   jump = the largest step in one 30 fps frame, as % of the frame width (a teleport shows as a big jump)
// An entrance from invisible may start fast and an exit into invisible may end fast (decelerate in, accelerate out: Material motion).
// Moves meant to hit (the bell kick, a stamp) are listed but can be excused by name. Pass: ease >= 0.8 on every unexcused move, jump <= 4%.
const {chromium}=require('playwright');const [page,dur='15.5']=process.argv.slice(2);
const WATCH=['#title','#vs','#chart','#now','#final','#made','#mamt','#ssn','.row:nth-child(1)','.row:nth-child(2)','.row:nth-child(3)','.row:nth-child(4)','.srow:nth-child(1)','.srow:nth-child(2)','.srow:nth-child(3)','.srow:nth-child(4)'];
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});await p.goto('http://localhost:8993/'+page);await p.waitForFunction(()=>window.READY===1,null,{timeout:120000});
const S=120,N=Math.round(+dur*S),tr={};for(const w of WATCH)tr[w]=[];
for(let i=0;i<=N;i++){const t=i/S;const r=await p.evaluate(([t,W])=>{window.R(t);const cam=document.getElementById('cam');const ct=cam?cam.style.transform:'';if(cam)cam.style.transform='none';const res=W.map(s=>{const e=document.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();const o=+getComputedStyle(e).opacity;return [b.x+b.width/2,b.y+b.height/2,b.width,o]});if(cam)cam.style.transform=ct;return res},[t,WATCH]);WATCH.forEach((w,j)=>tr[w].push(r[j]))}
await b.close();const out=[];
for(const w of WATCH){const a=tr[w];if(!a[0])continue;
  // speed of the box (centre and size) and of its opacity (scaled so a full fade over 1 s counts like a 300 px move)
  const sp=a.map((v,i)=>i&&(v[3]>.05||a[i-1][3]>.05)?Math.hypot(v[0]-a[i-1][0],v[1]-a[i-1][1],(v[2]-a[i-1][2])/2,(v[3]-a[i-1][3])*300)*S:0);
  let i=0;while(i<sp.length){if(sp[i]<=2){i++;continue}let j=i;while(j<sp.length&&sp[j]>2)j++;const seg=sp.slice(i,j);const pk=Math.max(...seg);
    if(j-i>=6&&pk>40){const s0=a[i][3]<.1?0:seg[0],s1=a[j-1][3]<.1?0:seg[seg.length-1];let jump=0;for(let k=i;k<j;k+=4)jump=Math.max(jump,Math.hypot(a[Math.min(k+4,a.length-1)][0]-a[k][0],a[Math.min(k+4,a.length-1)][1]-a[k][1])/1080*100);
      out.push({el:w,from:+(i/S).toFixed(2),to:+(j/S).toFixed(2),peak:Math.round(pk),ease:+(1-Math.max(s0,s1)/pk).toFixed(2),jump:+jump.toFixed(1)})}
    i=j}}
out.sort((x,y)=>x.from-y.from);for(const o of out)console.log(`${o.from.toFixed(2)}-${o.to.toFixed(2)}s ${o.el.padEnd(18)} peak ${String(o.peak).padStart(5)} px/s  ease ${o.ease.toFixed(2)}  jump ${o.jump}%`);
const bad=out.filter(o=>o.ease<.8),big=out.filter(o=>o.jump>4);console.log(`moves ${out.length}, eased (>=0.8) ${out.length-bad.length}, jumps over 4% ${big.length}`)})();
