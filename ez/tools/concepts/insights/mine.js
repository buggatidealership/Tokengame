// Insights mined from the sheet (ez-data.js): every number here is computed, never typed. node mine.js
global.window=global;const fs=require('fs');eval(fs.readFileSync(__dirname+'/../../../ez-data.js','utf8')+';global.R=ROUNDS;global.MK=MODEL_KEYS;global.RM=RMETA;global.P=PENDING');
const R2=R.slice().sort((a,b)=>a.n-b.n),N=R2.length,M=MK;
const dir=c=>/^UP/.test(c[1])?1:-1, mag=c=>parseFloat(String(c[1]).replace(/[^0-9.]/g,''));
const pct=(a,b)=>b?Math.round(100*a/b):0;
// one-sided binomial p: chance of >=k right out of n at 50%
function pAtLeast(k,n,p=.5){let s=0;for(let i=k;i<=n;i++){s+=comb(n,i)*Math.pow(p,i)*Math.pow(1-p,n-i)}return s}
function comb(n,k){let r=1;for(let i=1;i<=k;i++)r=r*(n-k+i)/i;return r}
function wilson(k,n,z=1.96){if(!n)return[0,0];const p=k/n,d=1+z*z/n,c=p+z*z/(2*n),h=z*Math.sqrt(p*(1-p)/n+z*z/(4*n*n));return[(c-h)/d,(c+h)/d]}
const out=[];const L=s=>out.push(s);
// base rates
const down=R2.filter(r=>r.a<0).length;L(`ROUNDS ${N}, market down ${down} (${pct(down,N)}%), up ${N-down}. mean |move| ${(R2.reduce((s,r)=>s+Math.abs(r.a),0)/N).toFixed(2)}%`);
// per model: hit, long share, hit when long, hit when short, vs always-short baseline on the rounds it traded
for(const m of M){let n=0,w=0,lo=0,lw=0,sh=0,sw=0,pl=0,bs=0;R2.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;const d=dir(c),ok=(d>0)===(r.a>0);if(ok)w++;pl+=1000*d*r.a;if(d>0){lo++;if(ok)lw++}else{sh++;if(ok)sw++}if(r.a<0)bs++});
 const ci=wilson(w,n);L(`${m.padEnd(6)} ${w}/${n} ${pct(w,n)}% [${Math.round(ci[0]*100)}-${Math.round(ci[1]*100)}] p=${pAtLeast(w,n).toFixed(3)} | long ${lo} (${pct(lw,lo)}% right) short ${sh} (${pct(sw,sh)}% right) | always-short on same rounds: ${bs}/${n} ${pct(bs,n)}% | P&L ${Math.round(pl)}`)}
// sectors
const sect={};R2.forEach(r=>{const s=(RM[r.n]||{}).sector||'?';(sect[s]=sect[s]||[]).push(r)});
L('\nSECTOR (n rounds): per model W-L');
Object.entries(sect).sort((a,b)=>b[1].length-a[1].length).forEach(([s,rs])=>{const row=M.map(m=>{let w=0,n=0,pl=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++;pl+=1000*dir(c)*r.a});return `${m[0]}${m[1]} ${w}-${n-w} ${pl>=0?'+':''}${Math.round(pl/1000)}K`});const dn=rs.filter(r=>r.a<0).length;L(`${s.slice(0,24).padEnd(24)} n=${String(rs.length).padStart(2)} down ${pct(dn,rs.length)}% | ${row.join(' | ')}`)});
// tech = Information Technology + Communication? show industry groups too
const grp={};R2.forEach(r=>{const g=(RM[r.n]||{}).group||'?';(grp[g]=grp[g]||[]).push(r)});
L('\nINDUSTRY GROUP n>=6:');Object.entries(grp).filter(([g,rs])=>rs.length>=6).sort((a,b)=>b[1].length-a[1].length).forEach(([g,rs])=>{L(`${g.slice(0,40).padEnd(40)} n=${rs.length} | `+M.map(m=>{let w=0,n=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++});return `${m[0]}${m[1]} ${w}/${n}`}).join(' '))});
// consensus
L('\nCONSENSUS (rounds with 4 calls):');const four=R2.filter(r=>r.calls.length===4);const bk={};four.forEach(r=>{const u=r.calls.filter(c=>dir(c)>0).length,maj=u>=3?1:u<=1?-1:0;const key=u===4||u===0?'4-0':u===2?'2-2':'3-1';(bk[key]=bk[key]||[]).push({r,maj,u})});
for(const k of ['4-0','3-1','2-2']){const a=bk[k]||[];if(k==='2-2'){L(`2-2 split: ${a.length} rounds`);continue}const right=a.filter(x=>(x.maj>0)===(x.r.a>0)).length;L(`${k}: ${a.length} rounds, majority right ${right} (${pct(right,a.length)}%)`);
 if(k==='3-1'){const lone={};a.forEach(x=>{const lc=x.r.calls.find(c=>(dir(c)>0)!==(x.maj>0));const ok=(dir(lc)>0)===(x.r.a>0);lone[lc[0]]=lone[lc[0]]||[0,0];lone[lc[0]][1]++;if(ok)lone[lc[0]][0]++});L('  lone dissenter right: '+Object.entries(lone).map(([m,v])=>`${m} ${v[0]}/${v[1]}`).join(', '))}}
// majority of all 4 when unanimous: which direction
const un=(bk['4-0']||[]);L(`  unanimous long ${un.filter(x=>x.maj>0).length}, unanimous short ${un.filter(x=>x.maj<0).length}; unanimous short right ${un.filter(x=>x.maj<0&&x.r.a<0).length}/${un.filter(x=>x.maj<0).length}, unanimous long right ${un.filter(x=>x.maj>0&&x.r.a>0).length}/${un.filter(x=>x.maj>0).length}`);
// conviction: bigger called moves right more often?
L('\nCONVICTION (called size above own median vs below):');for(const m of M){const cs=[];R2.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(c)cs.push({mg:mag(c),ok:(dir(c)>0)===(r.a>0)})});const med=cs.map(x=>x.mg).sort((a,b)=>a-b)[cs.length>>1];const hi=cs.filter(x=>x.mg>med),lo=cs.filter(x=>x.mg<=med);L(`${m.padEnd(6)} median ${med}% | big calls ${hi.filter(x=>x.ok).length}/${hi.length} ${pct(hi.filter(x=>x.ok).length,hi.length)}% | small ${lo.filter(x=>x.ok).length}/${lo.length} ${pct(lo.filter(x=>x.ok).length,lo.length)}%`)}
// size realism
L('\nSIZE: mean called |move| vs actual');for(const m of M){let s=0,n=0,a=0;R2.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;s+=mag(c);a+=Math.abs(r.a);n++});L(`${m.padEnd(6)} calls ${(s/n).toFixed(2)}% vs actual ${(a/n).toFixed(2)}%`)}
// mag7 / big caps
const big=r=>(RM[r.n]||{}).mag7||((CAPS||{})[r.ticker]||0)>=500;L('\nBIG NAMES (Mag 7 or $500B+): ');const bg=R2.filter(big),sm=R2.filter(r=>!big(r));L(`big n=${bg.length}, rest n=${sm.length}`);for(const m of M){const f=rs=>{let w=0,n=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++});return `${w}/${n} ${pct(w,n)}%`};L(`${m.padEnd(6)} big ${f(bg)} | rest ${f(sm)}`)}
// split half stability
L('\nSPLIT HALF (rounds 1-'+(N>>1)+' vs rest):');for(const m of M){const f=rs=>{let w=0,n=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++});return [w,n]};const a=f(R2.slice(0,N>>1)),b=f(R2.slice(N>>1));L(`${m.padEnd(6)} first ${a[0]}/${a[1]} ${pct(a[0],a[1])}% | second ${b[0]}/${b[1]} ${pct(b[0],b[1])}%`)}
// walk-forward rules, no hindsight: $100K per round
L('\nWALK-FORWARD RULES ($100K per round, flat, before fees):');
function rule(name,pick){let pl=0,n=0,w=0;R2.forEach((r,i)=>{const prior=R2.slice(0,i);const d=pick(r,prior);if(!d)return;n++;pl+=1000*d*r.a;if((d>0)===(r.a>0))w++});L(`${name.padEnd(46)} trades ${n} W ${w} (${pct(w,n)}%) P&L ${pl>=0?'+':''}${Math.round(pl).toLocaleString()}`)}
const plOf=(m,rs)=>rs.reduce((s,r)=>{const c=r.calls.find(c=>c[0]===m);return s+(c?1000*dir(c)*r.a:0)},0);
const hitOf=(m,rs)=>{let w=0,n=0;rs.forEach(r=>{const c=r.calls.find(c=>c[0]===m);if(!c)return;n++;if((dir(c)>0)===(r.a>0))w++});return n?(w+1)/(n+2):.5};
rule('always short',()=>-1);rule('always long',()=>1);
rule('follow P&L leader so far',(r,p)=>{if(p.length<5)return 0;const best=M.slice().sort((a,b)=>plOf(b,p)-plOf(a,p)).find(m=>r.calls.find(c=>c[0]===m));const c=r.calls.find(c=>c[0]===best);return c?dir(c):0});
rule('follow hit-rate leader so far',(r,p)=>{if(p.length<5)return 0;const best=M.slice().sort((a,b)=>hitOf(b,p)-hitOf(a,p)).find(m=>r.calls.find(c=>c[0]===m));const c=r.calls.find(c=>c[0]===best);return c?dir(c):0});
rule('majority (skip 2-2)',(r)=>{const u=r.calls.filter(c=>dir(c)>0).length,d=r.calls.length-u;return u>d?1:d>u?-1:0});
rule('only when all agree',(r)=>{const u=r.calls.filter(c=>dir(c)>0).length;return r.calls.length>=3&&(u===0||u===r.calls.length)?(u?1:-1):0});
rule('sector specialist so far (best hit in sector, n>=4)',(r,p)=>{const s=(RM[r.n]||{}).sector;const ps=p.filter(x=>(RM[x.n]||{}).sector===s);if(ps.length<4)return 0;const best=M.slice().sort((a,b)=>hitOf(b,ps)-hitOf(a,ps)).find(m=>r.calls.find(c=>c[0]===m));const c=r.calls.find(c=>c[0]===best);return c?dir(c):0});
rule('inverse GPT',(r)=>{const c=r.calls.find(c=>c[0]==='GPT');return c?-dir(c):0});
for(const m of M)rule('follow '+m,(r)=>{const c=r.calls.find(c=>c[0]===m);return c?dir(c):0});
console.log(out.join('\n'));
