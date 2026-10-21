// EZ grading system mockups (PSA architecture applied to $EZ). All numbers from ez-data.js.
const fs=require('fs'),path=require('path');const R=__dirname;
const TF='/home/user/Tokengame/ez/teaser/fonts/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/';
eval(fs.readFileSync('/home/user/Tokengame/ez/ez-data.js','utf8')+';global.ROUNDS=ROUNDS;global.PENDING=PENDING;global.UPCOMING=UPCOMING;global.MODELS=MODELS;global.logo=logo;global.FILMS=FILMS');
const MO=['','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],md=s=>{const m=String(s).match(/(\d+)\/(\d+)/);return MO[+m[1]]+' '+(+m[2])};
const nm=m=>{const n=(MODELS[m]&&MODELS[m].name)||m;return n.length<=3?n:n[0]+n.slice(1).toLowerCase()};
// the grade: direction sets the band, closeness adds one; pristine = all right and every call within 2%
function grade(r){const n=r.calls.length,h=r.calls.filter(c=>(c[1].indexOf('DOWN')<0)===(r.a>0)).length,f=h/n;
  let band=f===1?9:f>=.66?7:f>=.5?5:f>0?3:1;const avg=r.calls.reduce((s,c)=>s+parseFloat(c[2]),0)/n;
  const g=band+((f===1?avg<=1.5:avg<=3)?1:0),pr=f===1&&n===4&&r.calls.every(c=>parseFloat(c[2])<=2);
  const best=Math.min(...r.calls.filter(c=>(c[1].indexOf('DOWN')<0)===(r.a>0)).map(c=>parseFloat(c[2])).concat([99]));
  const ups=r.calls.filter(c=>c[1].indexOf('DOWN')<0).length;
  return {g,pr,h,n,avg,best:best===99?null:best,cons:Math.max(ups,n-ups)+'-'+Math.min(ups,n-ups)}}
const WORD={10:'GEM',9:'PERFECT',8:'STRONG',7:'STRONG',6:'SPLIT',5:'SPLIT',4:'ROUGH',3:'ROUGH',2:'REKT',1:'REKT'};
const HOBBY={10:'GEM MT',9:'MINT',8:'NM-MT',7:'NM',6:'EX-MT',5:'EX',4:'VG-EX',3:'VG',2:'GOOD',1:'PR'};
const MEAN={10:'All right, and close',9:'All right',8:'3 of 4 right, and close',7:'3 of 4 right',6:'2 of 4 right, and close',5:'2 of 4 right',4:'1 of 4 right, and close',3:'1 of 4 right',2:'none right, but close',1:'none right'};
const GR=ROUNDS.map(r=>Object.assign({r},grade(r)));const by=n=>GR.find(x=>x.r.n===n);
const pop={};GR.forEach(x=>pop[x.g]=(pop[x.g]||0)+1);const nPr=GR.filter(x=>x.pr).length;
const FF=[['Anton',400,S+'trio/fonts/Anton.woff2'],['Barlow',500,TF+'barlow-500.woff2'],['Barlow',700,TF+'barlow-700.woff2'],['Barlow',800,TF+'barlow-800.woff2'],['Barlow Condensed',800,TF+'barlow-condensed-800.woff2'],['Mono','100 900',TF+'geist-mono-latin-wght-normal.woff2']];
const FONTS=FF.map(f=>`@font-face{font-family:'${f[0]}';font-weight:${f[1]};src:url(file://${f[2]})}`).join('');
const css=`${FONTS}*{box-sizing:border-box}body{margin:0;background:#0d0b12;color:#f3ead6;font-family:Barlow,sans-serif}
.pg{padding:34px 36px 40px;width:1500px;background:radial-gradient(120% 60% at 80% 0%,rgba(242,182,50,.07),transparent 60%),#0d0b12}
.ttl{display:flex;align-items:baseline;gap:14px;margin:0 0 6px}.ttl b{font:400 34px/1 Anton;text-transform:uppercase}.ttl span{font:600 15px/1.3 Barlow;color:#a49fb4}
.sub{font:500 15px/1.4 Barlow;color:#d6cebb;margin:0 0 22px;max-width:1100px}
.row{display:flex;gap:22px;align-items:flex-start;flex-wrap:wrap}
.slab{width:250px;padding:92px 11px 11px;border-radius:12px;position:relative;background:linear-gradient(160deg,rgba(255,255,255,.13) 0 44%,rgba(255,255,255,.05) 44%),rgba(18,16,26,.55);
 box-shadow:0 0 0 2.5px #000,inset 1.5px 1.5px 0 rgba(255,255,255,.75),inset -1.5px -1.5px 0 rgba(255,255,255,.25),6px 7px 0 0 #000}
.slab::before{content:"";position:absolute;inset:5px;border-radius:8px;border:1px solid rgba(242,182,50,.55)}
.lab{position:absolute;left:11px;right:11px;top:11px;height:72px;border-radius:3px;background:#fbfaf6;color:#141217;box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px #b8262a;display:grid;grid-template-columns:minmax(0,1fr) auto;padding:7px 9px 6px 10px;font-family:'Barlow Condensed'}
.lab.blk{background:linear-gradient(135deg,#ffe28a 0%,#f2b632 38%,#ffd86b 55%,#d99a1c 100%);color:#141217;box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px #8a5c0a}
.lab.sub2{box-shadow:0 0 0 1.5px #000,inset 0 0 0 3.5px #8f8a7e}
.l{display:grid;align-content:space-between;min-width:0}.l .y{font-weight:800;font-size:8.5px;letter-spacing:.08em}.l .y i{font-style:normal}.l .y .s{color:#c9900e}.l .y .e{color:#1f8f55}.l .y .z{color:#c8372d}
.lab.blk .l .y{color:#141217}.lab.blk .l .y .s{color:#141217}
.l .nm small{font-size:11px;letter-spacing:.02em;opacity:.75}.l .nm{font-weight:800;font-size:15px;line-height:1;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.l .vr{font-weight:800;font-size:8px;letter-spacing:.1em;color:#b8262a}.lab.blk .l .vr{color:#5a3c05}.lab.blk .r .no,.lab.blk .r .ds,.lab.blk .r .gr{color:#141217}
.l .cb{display:flex;align-items:center;gap:5px;font:600 7px/1 Mono;color:#5d564a}.lab.blk .l .cb{color:#3b2a08}
.l .cb i{width:40px;height:7px;background:repeating-linear-gradient(90deg,currentColor 0 1px,transparent 1px 2px,currentColor 2px 4px,transparent 4px 5px)}
.l .cb em{width:22px;height:9px;border-radius:2px;background:linear-gradient(100deg,#9ff0c4,#f7e7a8 30%,#ffb3ae 55%,#f2b632 80%,#9ff0c4);box-shadow:0 0 0 1px rgba(0,0,0,.55);margin-left:4px}
.r{display:grid;justify-items:end;align-content:space-between;padding-left:8px}.r .no{font-weight:800;font-size:9px}.r .ds{font-weight:800;font-size:9px;letter-spacing:.1em;white-space:nowrap}
.r .gr{font:400 30px/.9 Anton;letter-spacing:-.01em}.r .st{font-weight:800;font-size:12px;letter-spacing:.04em;text-align:right;line-height:1.05}
.face{border-radius:4px;overflow:hidden;box-shadow:0 0 0 2px #000,0 0 0 5px rgba(255,255,255,.1),0 0 0 6px rgba(255,255,255,.35);background:#15131d;aspect-ratio:1/1.15;display:grid}
.face img{width:100%;height:100%;object-fit:cover;display:block}
.face.empty{place-items:center;font:400 22px/1 Anton;color:#a49fb4;letter-spacing:.06em;background:repeating-linear-gradient(45deg,#15131d 0 12px,#1b1825 12px 24px)}
.cap{margin-top:12px;font:600 13px/1.35 Barlow;color:#a49fb4;max-width:250px}.cap b{color:#f3ead6}
.box{background:#15131d;border:2px solid #000;box-shadow:5px 6px 0 #000;padding:18px 20px}
table{border-collapse:collapse;width:100%;font:500 14px/1.2 Barlow}th{font:800 11px/1 'Barlow Condensed';letter-spacing:.14em;text-transform:uppercase;color:#a49fb4;text-align:left;padding:6px 8px;border-bottom:1.5px solid #3a3546}
td{padding:7px 8px;border-bottom:1px solid #2a2633}td.g{font:400 24px/1 Anton;width:52px}td.w{font:800 14px/1 'Barlow Condensed';letter-spacing:.08em;color:#f2b632}td.h{color:#a49fb4;font-size:13px}td.p{font:400 20px/1 Anton;text-align:right}
.bars{display:grid;grid-template-columns:repeat(10,1fr);gap:10px;align-items:end;height:200px;margin-top:12px}
.bar{display:grid;align-content:end;justify-items:center;gap:6px;height:100%}.bar i{width:100%;background:#f3ead6;border:2px solid #000;box-shadow:3px 3px 0 #000}.bar.k i{background:#f2b632}
.bar b{font:400 18px/1 Anton}.bar span{font:800 12px/1 'Barlow Condensed';letter-spacing:.08em;color:#a49fb4}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:26px}
.subs{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin:12px 0}.subs div{background:#fbfaf6;color:#141217;border:2px solid #000;padding:8px;text-align:center;box-shadow:inset 0 0 0 2.5px #b8262a}
.subs small{display:block;font:800 9px/1 'Barlow Condensed';letter-spacing:.14em}.subs b{display:block;font:400 22px/1.1 Anton;margin-top:4px}.subs em{display:block;font:600 10px/1.2 Barlow;font-style:normal;color:#5d564a}
.cert{background:#fbfaf6;color:#141217;border:2px solid #000;box-shadow:6px 7px 0 #f2b632,6px 7px 0 2px #000;padding:22px 24px}
.cert h3{font:400 28px/1 Anton;margin:4px 0 12px;text-transform:uppercase}.cert .k{font:800 11px/1 'Barlow Condensed';letter-spacing:.16em;color:#b8262a}
.cert dl{display:grid;grid-template-columns:150px 1fr;gap:6px 14px;margin:0;font:600 14px/1.3 Barlow}.cert dt{color:#5d564a}.cert dd{margin:0;font-weight:800}
.ok{color:#11714a}.no{color:#c8372d}
.pill{display:inline-block;padding:3px 8px;border:2px solid #000;font:800 11px/1 'Barlow Condensed';letter-spacing:.1em;background:#4fe39a;color:#03140a}`;
function slab(o){const g=o.g;const cls=o.pr?'lab blk':(o.state?'lab sub2':'lab');
 const right=o.state?`<span class="no">#${o.n}</span><span class="st">${o.state}</span>`:
   `<span class="no">#${o.n}</span><span class="ds">${o.pr?'PRISTINE':WORD[g]}</span><span class="gr">${g}</span>`;
 return `<div><div class="slab"><div class="${cls}"><div class="l"><span class="y">2026 <i class="s">$</i><i class="e">E</i><i class="z">Z</i> SEASON 1</span><span class="nm">${o.co}${o.tk?` <small>(${o.tk})</small>`:""}</span>${o.vr?`<span class="vr">${o.vr}</span>`:''}<span class="cb"><i></i>${String(o.n).padStart(8,'0')}<em></em></span></div><div class="r">${right}</div></div>
 ${o.img?`<div class="face"><img src="media/${o.img}.jpg"></div>`:`<div class="face empty">${o.empty||''}</div>`}</div><p class="cap">${o.cap}</p></div>`}
const poster=n=>FILMS[n]&&FILMS[n].p;
const pick=[30,32,31,27,28,10];
const caps={30:'All four right, every call within 2%. <b>Pristine 10</b>: the gold label.',32:'All four right, average miss 1.2%. <b>Gem 10.</b>',31:'All four right, average miss 1.9%. <b>9</b>: right, not close enough for the 10.',27:'3 of 4 right. <b>7.</b>',28:'1 of 4 right. <b>3.</b> Sealed forever.',10:'Nobody called it. A 16% jump. <b>1</b>, with SHOCK MOVE on the label.'};
let s1=pick.map(n=>{const x=by(n);return slab({n,co:x.r.co,tk:x.r.ticker,g:x.g,pr:x.pr,img:poster(n),vr:n===10?'SHOCK MOVE':'',cap:caps[n]})}).join('');
const P=PENDING.find(p=>p.ticker==='NFLX'),U=UPCOMING[0];
s1+=slab({n:P.n,co:P.co,tk:P.ticker,state:'IN GRADING<br>CLOSE '+md(P.resolves).toUpperCase(),empty:'CALLS LOCKED',cap:'Calls in, waiting for the close. Was "At grading".'});
s1+=slab({n:U.n,co:U.co,tk:U.ticker,state:'NOT YET<br>SUBMITTED',empty:'SEALED',cap:'Calls due '+md(U.called)+'. Was "Calls due".'});
const page1=`<div class="pg"><div class="ttl"><b>The EZ grade</b><span>Option: one number, 1 to 10, like a graded card</span></div>
<p class="sub">Every round gets a grade the moment the market closes. Direction decides the band, being close adds a point. A 10 needs all four right and an average miss of 1.5% or less. Pristine needs every single call within 2%. Real rounds, real grades.</p>
<div class="row">${s1}</div></div>`;
// page 2: the system
const rows=[10,9,8,7,6,5,4,3,2,1].map(g=>`<tr><td class="g">${g}</td><td class="w">${WORD[g]}</td><td class="h">${HOBBY[g]}</td><td>${MEAN[g]}</td><td class="p">${pop[g]||0}</td></tr>`).join('');
const mx=Math.max(...Object.values(pop));
const bars=[1,2,3,4,5,6,7,8,9,10].map(g=>`<div class="bar${g===10?' k':''}"><b>${pop[g]||0}</b><i style="height:${Math.max(3,((pop[g]||0)/mx)*150)}px"></i><span>${g}</span></div>`).join('');
const ge=by(32);
const page2=`<div class="pg"><div class="ttl"><b>The system around it</b><span>Scale, population report, subgrades, cert lookup</span></div>
<p class="sub">How PSA builds trust, mapped to $EZ: a published scale, a count of every grade ever given, the reasons behind each grade, and a page anyone can look up. Grades describe how accurate the AIs were, never what anything is worth.</p>
<div class="grid2"><div class="box"><div class="ttl"><b style="font-size:22px">The scale</b><span>EZ word · hobby word (option) · what it means · rounds so far</span></div>
<table><tr><th>Grade</th><th>EZ</th><th>Hobby</th><th>What happened</th><th style="text-align:right">Pop</th></tr>${rows}</table>
<p class="sub" style="margin:10px 0 0;font-size:13px">"Close" = average miss within 1.5% when all are right, within 3% otherwise. Pristine (gold label): all four right and every call within 2%. Pop: ${nPr} pristine so far.</p></div>
<div style="display:grid;gap:26px"><div class="box"><div class="ttl"><b style="font-size:22px">Season 1 population report</b><span>${GR.length} rounds graded</span></div><div class="bars">${bars}</div>
<p class="sub" style="margin:10px 0 0;font-size:13px">Gem rate ${Math.round(100*(pop[10]||0)/GR.length)}%. A 10 stays rare by rule, not by luck.</p></div>
<div class="box"><div class="ttl"><b style="font-size:22px">Back of the card: subgrades</b><span>GE Aerospace · round 32</span></div>
<div class="subs"><div><small>DIRECTION</small><b>${ge.h}/${ge.n}</b><em>called it</em></div><div><small>PRECISION</small><b>${ge.avg.toFixed(1)}%</b><em>average miss</em></div><div><small>CLOSEST</small><b>${ge.best.toFixed(2)}%</b><em>Claude's miss</em></div><div><small>CONSENSUS</small><b>${ge.cons}</b><em>all said down</em></div></div></div></div></div>
<div style="margin-top:26px" class="cert"><span class="k">CERT LOOKUP · earningszn.xyz/cert/00000032</span><h3>GE Aerospace (GE) · Gem 10</h3>
<dl><dt>Set</dt><dd>2026 $EZ Season 1 · round 32 of ${ROUNDS.length+PENDING.length+UPCOMING.length}</dd><dt>Calls filed</dt><dd>${md(ge.r.called)}, before the report <span class="pill">PROOF ON X</span></dd><dt>Graded</dt><dd>${md(ge.r.resolves)} market close · GE ${ge.r.out}</dd>
<dt>Calls</dt><dd>${ge.r.calls.map(c=>nm(c[0])+' '+c[1].replace('DOWN','▼').replace('UP','▲')+' <span class="ok">✓</span>').join(' · ')}</dd><dt>Population</dt><dd>${pop[10]} rounds at 10 · ${nPr} pristine · none higher</dd></dl></div></div>`;
for(const [f,b] of [['p1.html',page1],['p2.html',page2]])fs.writeFileSync(path.join(R,f),`<!doctype html><meta charset="utf-8"><style>${css}</style>${b}`);
console.log(JSON.stringify(pop),nPr);
