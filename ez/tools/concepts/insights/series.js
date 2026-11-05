// Data for the insights review page: cumulative flat P&L per AI vs "short every report", right-on-down vs right-on-up.
global.window=global;const fs=require('fs');eval(fs.readFileSync(__dirname+'/../../../ez-data.js','utf8')+';global.R=ROUNDS;global.MK=MODEL_KEYS;global.RM=RMETA;global.P=PENDING');
const R2=R.slice().sort((a,b)=>a.n-b.n),dir=c=>/^UP/.test(c[1])?1:-1;
const out={n:R2.length,rounds:R2.map(r=>[r.n,r.co,r.a]),bear:[],ai:{}};let b=0;const cum={};MK.forEach(m=>{cum[m]=0;out.ai[m]=[]});
for(const r of R2){b+=-1000*r.a;out.bear.push(Math.round(b));for(const m of MK){const c=r.calls.find(c=>c[0]===m);if(c)cum[m]+=1000*dir(c)*r.a;out.ai[m].push(Math.round(cum[m]))}}
out.split={};for(const m of MK){const rows=R2.flatMap(r=>{const c=r.calls.find(c=>c[0]===m);return c?[{d:dir(c),a:r.a}]:[]});
 const dn=rows.filter(x=>x.a<0),up=rows.filter(x=>x.a>0);out.split[m]={down:[dn.filter(x=>x.d<0).length,dn.length],up:[up.filter(x=>x.d>0).length,up.length],short:rows.filter(x=>x.d<0).length,calls:rows.length}}
// hit-rate leader walk-forward: how often was its call a short?
let s=0,t=0;const hr={};MK.forEach(m=>hr[m]=[0,0]);for(const r of R2){const el=MK.filter(m=>hr[m][1]>=3);if(el.length){const lead=el.sort((x,y)=>hr[y][0]/hr[y][1]-hr[x][0]/hr[x][1])[0];const c=r.calls.find(c=>c[0]===lead);if(c){t++;if(dir(c)<0)s++}}
 for(const c of r.calls){hr[c[0]][1]++;if((dir(c)>0)===(r.a>0))hr[c[0]][0]++}}
out.leaderShorts=[s,t];
console.log(JSON.stringify(out));
