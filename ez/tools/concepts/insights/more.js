global.window=global;const fs=require('fs');eval(fs.readFileSync(__dirname+'/../../../ez-data.js','utf8')+';global.R=ROUNDS;global.MK=MODEL_KEYS;global.RM=RMETA;global.P=PENDING');
const R2=R.slice().sort((a,b)=>a.n-b.n),dir=c=>/^UP/.test(c[1])?1:-1;
for(const m of MK){let s=0;for(let i=R2.length-1;i>=0;i--){const c=R2[i].calls.find(c=>c[0]===m);if(!c)continue;if(dir(c)<0)s++;else break}
 const all=R2.flatMap(r=>r.calls.filter(c=>c[0]===m));const pend=P.flatMap(p=>p.calls.filter(c=>c.m===m));console.log(m,'current short streak',s,'| shorts',all.filter(c=>dir(c)<0).length,'/',all.length,'| pending calls',pend.map(c=>c.dir[0]).join(''))}
// when did Grok last go long
const lastLong=R2.filter(r=>r.calls.some(c=>c[0]==='GROK'&&dir(c)>0)).pop();console.log('Grok last long: R'+lastLong.n,lastLong.ticker,lastLong.resolves);
// sector base rates (down share) for the pending rounds' sectors, and each model's record there
P.forEach(p=>{const s=(RM[p.n]||{}).sector,rs=R2.filter(r=>(RM[r.n]||{}).sector===s),dn=rs.filter(r=>r.a<0).length;
 console.log(`R${p.n} ${p.ticker} [${s}] sector fell ${dn}/${rs.length} | calls ${p.calls.map(c=>c.m+' '+c.dir[0]+c.mag).join(', ')} | records: `+MK.map(m=>{let w=0,n=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++});return m+' '+w+'/'+n}).join(' '))});
// options-style: share of moves bigger than the biggest AI call
let bigger=0;R2.forEach(r=>{const mx=Math.max(...r.calls.map(c=>parseFloat(String(c[1]).replace(/[^0-9.]/g,''))));if(Math.abs(r.a)>mx)bigger++});console.log('moves bigger than every AI call:',bigger,'/',R2.length);
// AI P&L vs short-everything on cumulative curve sampled every 10 rounds
let g=0,b=0,c=0;R2.forEach((r,i)=>{b+=-1000*r.a;const gc=r.calls.find(x=>x[0]==='GROK');if(gc)g+=1000*dir(gc)*r.a;const cc=r.calls.find(x=>x[0]==='CLAUDE');if(cc)c+=1000*dir(cc)*r.a;if((i+1)%15===0||i===R2.length-1)console.log('after R'+r.n,'bear',Math.round(b/1000),'grok',Math.round(g/1000),'claude',Math.round(c/1000))});
