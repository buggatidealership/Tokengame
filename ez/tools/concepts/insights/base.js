// Every edge against the dumbest rival: a perma-bear that shorts every report it is compared on.
global.window=global;const fs=require('fs');eval(fs.readFileSync(__dirname+'/../../../ez-data.js','utf8')+';global.R=ROUNDS;global.MK=MODEL_KEYS;global.RM=RMETA');
const R2=R.slice().sort((a,b)=>a.n-b.n),dir=c=>/^UP/.test(c[1])?1:-1,mag=c=>parseFloat(String(c[1]).replace(/[^0-9.]/g,''));
const comb=(n,k)=>{let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r};const pge=(k,n,p)=>{let s=0;for(let i=k;i<=n;i++)s+=comb(n,i)*p**i*(1-p)**(n-i);return s};
function cmp(label,rows){// rows: [{d,a}]
 const n=rows.length,w=rows.filter(x=>(x.d>0)===(x.a>0)).length,bs=rows.filter(x=>x.a<0).length,pl=rows.reduce((s,x)=>s+1000*x.d*x.a,0),bpl=rows.reduce((s,x)=>s-1000*x.a,0);
 const pb=bs/n;console.log(`${label.padEnd(44)} n=${String(n).padStart(2)} right ${w} (${Math.round(100*w/n)}%) | perma-bear ${bs} (${Math.round(100*bs/n)}%) | P&L ${Math.round(pl/1000)}K vs bear ${Math.round(bpl/1000)}K | p(vs coin)=${pge(w,n,.5).toFixed(3)} p(vs bear rate)=${pge(w,n,Math.min(.99,Math.max(pb,.5))).toFixed(3)}`)}
const callRows=(m,f)=>R2.flatMap(r=>{const c=r.calls.find(c=>c[0]===m);return c&&(!f||f(r,c))?[{d:dir(c),a:r.a,r,c}]:[]});
for(const m of MK)cmp(m+' all',callRows(m));
cmp('CLAUDE tech',callRows('CLAUDE',r=>RM[r.n].sector==='Information Technology'));
cmp('GROK tech',callRows('GROK',r=>RM[r.n].sector==='Information Technology'));
cmp('CLAUDE software&services',callRows('CLAUDE',r=>/Software/.test(RM[r.n].group)));
cmp('CLAUDE tech hardware',callRows('CLAUDE',r=>/Hardware/.test(RM[r.n].group)));
cmp('GPT big names',callRows('GPT',r=>RM[r.n].mag7||((CAPS||{})[r.ticker]||0)>=500));
// Grok big calls
const gm=callRows('GROK').map(x=>mag(x.c)).sort((a,b)=>a-b),med=gm[gm.length>>1];
cmp('GROK big calls (>'+med+'%)',callRows('GROK',(r,c)=>mag(c)>med));
cmp('GROK small calls',callRows('GROK',(r,c)=>mag(c)<=med));
cmp('GROK big SHORT calls',callRows('GROK',(r,c)=>mag(c)>med&&dir(c)<0));
cmp('GROK long calls',callRows('GROK',(r,c)=>dir(c)>0));
// lone dissenter
for(const m of ['GROK','CLAUDE','GPT','KIMI']){const rows=R2.filter(r=>r.calls.length===4).flatMap(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return[];const others=r.calls.filter(x=>x[0]!==m);if(others.every(o=>dir(o)===-dir(c)))return[{d:dir(c),a:r.a}];return[]});
 const lo=rows.filter(x=>x.d>0).length;cmp(m+' alone vs other three ('+lo+' long)',rows)}
// unanimous
cmp('all four agree',R2.filter(r=>r.calls.length===4&&(r.calls.every(c=>dir(c)>0)||r.calls.every(c=>dir(c)<0))).map(r=>({d:dir(r.calls[0]),a:r.a})));
// down share by month (season drift?)
const bym={};R2.forEach(r=>{const m=String(r.resolves).split('/')[0];(bym[m]=bym[m]||[]).push(r)});console.log('down share by month: '+Object.entries(bym).map(([m,rs])=>`${m}: ${rs.filter(r=>r.a<0).length}/${rs.length}`).join('  '));
// how often each AI shorts by month
console.log('Grok short share by half: '+[R2.slice(0,45),R2.slice(45)].map(h=>{const cs=h.flatMap(r=>r.calls.filter(c=>c[0]==='GROK'));return cs.filter(c=>dir(c)<0).length+'/'+cs.length}).join(' vs '));
// actual vs called size by abs
const big=R2.filter(r=>Math.abs(r.a)>=8);console.log(`moves of 8%+: ${big.length}/${R2.length}; any AI called 8%+: `+R2.reduce((s,r)=>s+r.calls.filter(c=>mag(c)>=8).length,0)+' of '+R2.reduce((s,r)=>s+r.calls.length,0)+' calls');
