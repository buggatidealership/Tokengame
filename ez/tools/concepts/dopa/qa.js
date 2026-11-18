// node qa.js <round> [video.mp4] : the outcome video's QA. Reads every number drawn on screen at the key moments straight from the page
// and checks it against data/r<round>.json (which prep.js built from the sheet); then checks the file with ffprobe. Exits 1 on any miss.
// The Season 1 finale cut (finale:true in the data, or FINALE=1 to test it on another round) adds its own checks and expects 20.8 s.
const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');
const [n,vid]=process.argv.slice(2);const D=JSON.parse(fs.readFileSync(__dirname+'/data/r'+n+'.json'));let bad=0;
const $=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US'),M=v=>v===0?'$0':$(v);
const ok=(c,msg)=>{console.log((c?'PASS ':'FAIL ')+msg);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});const perr=[];p.on('pageerror',e=>perr.push(e.message));p.on('console',m=>{if(m.type()==='error')perr.push(m.text())});const FIN=!!D.finale||process.env.FINALE==='1',DUR=FIN?20.8:15.5;await p.goto('http://localhost:8993/outcome.html?r='+n+(FIN&&!D.finale?'&finale=1':''));await p.waitForFunction(()=>window.READY===1,null,{timeout:120000});
const at=async(t,f)=>p.evaluate(([t,f])=>{window.R(t);return eval(f)},[t,f]);
const vis='[...document.querySelectorAll(".row")].map(r=>({pl:r.querySelector(".pl").textContent,side:r.querySelector(".sd").textContent,win:!!r.querySelector(".win")&&+getComputedStyle(r.querySelector(".win")).opacity>.9}))';
const f8=await at(8.2,vis);
D.ai.forEach((a,i)=>{ok(f8[i].pl===M(a.pnl),`FINAL ${a.name} shows ${f8[i].pl}, data ${M(a.pnl)}`);ok(f8[i].side===a.side,`${a.name} side ${f8[i].side}`);ok(f8[i].win===a.right,`${a.name} WINNER badge ${f8[i].win}`)});
ok(['GPT','Kimi','Claude','Grok'].join()===D.ai.map(a=>a.name).join(),'card order GPT, Kimi, Claude, Grok');
const sum=await at(10.6,'[document.querySelector("#mwho").textContent,document.querySelector("#mamt").textContent,document.querySelector("#ms1").textContent,document.querySelector("#ms2").textContent]');
ok((sum[0]+' '+sum[1].replace(' EACH',' each')).replace(/\s+/g,' ').trim()===D.line1,`summary "${sum[0]} ${sum[1]}" = "${D.line1}"`);
ok(sum[2]===`THIS ROUND · ${D.co.toUpperCase()} ${D.pct}`&&sum[3]===D.line3,`summary lines "${sum[2]}" / "${sum[3]}"`);
const sv='Object.fromEntries([...document.querySelectorAll(".srow")].map(r=>[r.dataset.k,r.querySelector(".v").textContent]))';
const s0=await at(12.1,sv),s1=await at(15.3,sv);
D.ai.forEach(a=>{ok(s0[a.k]===M(D.season0[a.k]),`season before ${a.name} ${s0[a.k]} = ${M(D.season0[a.k])}`);ok(s1[a.k]===M(D.season1[a.k]),`season after ${a.name} ${s1[a.k]} = ${M(D.season1[a.k])}`);ok(D.season0[a.k]+a.pnl===D.season1[a.k],`${a.name} before + round = after`)});
const words=[];for(const t of [0,3,8,10.6,15.3])words.push(await at(t,'document.body.innerText'));const txt=words.join(' ');
ok(!/\b(up|down)\b/i.test(txt),'no "up" or "down" on screen');ok(txt.includes('Simulated $100K per trade · not advice'),'footer present');ok(!/-\$/.test(txt),'minus sign is U+2212');
// a round the page cannot draw (2026-11-18: R110 had no resolution date, so the clock and chart were NaN while every number above passed)
for(const tt of [2.6,4,6,8.2,12]){const tx=await p.evaluate(t=>{window.R(t);return document.body.innerText},tt);ok(!/undefined|NaN|Infinity|null/.test(tx),`no undefined/NaN on screen at ${tt} s`)}
ok(D.total>0&&D.open>0,`the clock has a timeline (${D.total} min, open at ${D.open})`);ok(perr.length===0,`no page errors (${perr.length}${perr.length?': '+perr[0].slice(0,80):''})`);
// the Season 1 finale cut: the label, the winner and the final P&L on the sheet against the data; a normal round must not show any of it
const fq='({line:document.querySelector("#fline").textContent,lop:+getComputedStyle(document.querySelector("#fline")).opacity,who:document.querySelector("#fwho").textContent,verb:document.querySelector("#fverb").textContent,amt:document.querySelector("#famt").textContent,aop:+getComputedStyle(document.querySelector("#famt")).opacity,op:+getComputedStyle(document.querySelector("#fsheet")).opacity,tag:getComputedStyle(document.querySelector("#tfin")).display,rows:Math.max(...[...document.querySelectorAll(".srow")].map(r=>+getComputedStyle(r).opacity)),head:+getComputedStyle(document.querySelector("#ssn")).opacity,txt:document.body.innerText})';
const fin=await at(20.2,fq);
if(FIN){const top=D.season1[D.order[0]],lead=D.order.filter(k=>D.season1[k]===top).map(k=>D.ai.find(a=>a.k===k).name),nm=lead.length>1?lead.slice(0,-1).join(', ')+' and '+lead.at(-1):lead[0];
  ok(fin.op>.99&&fin.who.trim()===nm,`finale: the sheet names "${fin.who.trim()}", the season leader is "${nm}"`);ok(fin.verb===(lead.length>1?'win':'wins')+' Season 1.',`finale: "${fin.verb}"`);
  ok(fin.aop>.99&&fin.amt===M(top),`finale: final total on screen ${fin.amt} = data ${M(top)}`);ok(fin.tag==='block','finale: SEASON 1 FINALE marker in the title');
  // one thing at a time (WRAP-BRIEF.md round 4): the line alone, then the sheet without its number, then the number; nothing else left on screen
  const a1=await at(16.8,fq),a2=await at(17.95,fq);
  ok(a1.line==='Season 1 is over.'&&a1.lop>.99&&a1.op===0&&a1.rows<.01,`finale: "${a1.line}" stands alone at 16.8 s (sheet ${a1.op}, board ${a1.rows.toFixed(2)})`);
  ok(a2.op>.99&&a2.aop===0,`finale: at 17.95 s the sheet is in and its number is not yet (${a2.aop})`);
  ok(fin.head<.01&&fin.rows<.01&&!/FINAL ·|IN FRONT/.test(fin.txt),`finale: the last scene carries no board, no "Season P&L" heading (${fin.head}) and no bare label`);
  ok(!/undefined|NaN|Infinity|null/.test(fin.txt)&&!/undefined|NaN|Infinity|null/.test(a1.txt),'finale: no undefined/NaN on screen at 16.8 and 20.2 s');ok(D.finale?D.n===112:true,'finale data is round 112'+(D.finale?'':' (forced test on round '+D.n+')'))}
else ok(fin.op===0&&fin.lop===0&&fin.tag==='none','not the finale: no finale marker, no line, no winner sheet');
await b.close();
if(vid){const pr=JSON.parse(execSync(`ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate:format=duration,bit_rate,size -of json "${vid}"`));const v=pr.streams.find(s=>s.width),a=pr.streams.find(s=>!s.width);
  ok(v.width===1080&&v.height===1350&&v.r_frame_rate==='30/1'&&v.codec_name==='h264'&&a.codec_name==='aac',`1080x1350 30 fps h264+aac`);ok(Math.abs(+pr.format.duration-DUR)<.05,`duration ${(+pr.format.duration).toFixed(2)} s (expected ${DUR})`);
  ok(+pr.format.bit_rate>=5e6,`bitrate ${(pr.format.bit_rate/1e6).toFixed(1)} Mb/s (X minimum 5)`);ok(+pr.format.size<15e6||+pr.format.bit_rate>=5e6,`size ${(pr.format.size/1e6).toFixed(1)} MB`);
  const y=execSync(`ffmpeg -loglevel error -i "${vid}" -frames:v 1 -vf scale=64:80,format=gray -f rawvideo -`);ok(y.reduce((s,x)=>s+x,0)/y.length>12,'frame 0 is drawn (not black)');
  const pk=execSync(`ffmpeg -i "${vid}" -af volumedetect -f null - 2>&1 | grep max_volume`).toString();ok(+pk.match(/(-?[\d.]+) dB/)[1]<=-1,'audio peak '+pk.trim().split(':').pop())}
console.log(bad?`${bad} CHECK(S) FAILED`:'ALL CHECKS PASS');process.exit(bad?1:0)})();
