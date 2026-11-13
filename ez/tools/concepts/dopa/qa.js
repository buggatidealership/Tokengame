// node qa.js <round> [video.mp4] : the outcome video's QA. Reads every number drawn on screen at the key moments straight from the page
// and checks it against data/r<round>.json (which prep.js built from the sheet); then checks the file with ffprobe. Exits 1 on any miss.
const {chromium}=require('playwright');const fs=require('fs');const {execSync}=require('child_process');
const [n,vid]=process.argv.slice(2);const D=JSON.parse(fs.readFileSync(__dirname+'/data/r'+n+'.json'));let bad=0;
const $=v=>(v<0?'−':'+')+'$'+Math.abs(v).toLocaleString('en-US'),M=v=>v===0?'$0':$(v);
const ok=(c,msg)=>{console.log((c?'PASS ':'FAIL ')+msg);if(!c)bad++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1350}});await p.goto('http://localhost:8993/outcome.html?r='+n);await p.waitForFunction(()=>window.READY===1,null,{timeout:120000});
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
await b.close();
if(vid){const pr=JSON.parse(execSync(`ffprobe -v error -show_entries stream=codec_name,width,height,r_frame_rate:format=duration,bit_rate,size -of json "${vid}"`));const v=pr.streams.find(s=>s.width),a=pr.streams.find(s=>!s.width);
  ok(v.width===1080&&v.height===1350&&v.r_frame_rate==='30/1'&&v.codec_name==='h264'&&a.codec_name==='aac',`1080x1350 30 fps h264+aac`);ok(Math.abs(+pr.format.duration-15.5)<.05,`duration ${(+pr.format.duration).toFixed(2)} s`);
  ok(+pr.format.bit_rate>=5e6,`bitrate ${(pr.format.bit_rate/1e6).toFixed(1)} Mb/s (X minimum 5)`);ok(+pr.format.size<15e6||+pr.format.bit_rate>=5e6,`size ${(pr.format.size/1e6).toFixed(1)} MB`);
  const y=execSync(`ffmpeg -loglevel error -i "${vid}" -frames:v 1 -vf scale=64:80,format=gray -f rawvideo -`);ok(y.reduce((s,x)=>s+x,0)/y.length>12,'frame 0 is drawn (not black)');
  const pk=execSync(`ffmpeg -i "${vid}" -af volumedetect -f null - 2>&1 | grep max_volume`).toString();ok(+pk.match(/(-?[\d.]+) dB/)[1]<=-1,'audio peak '+pk.trim().split(':').pop())}
console.log(bad?`${bad} CHECK(S) FAILED`:'ALL CHECKS PASS');process.exit(bad?1:0)})();
