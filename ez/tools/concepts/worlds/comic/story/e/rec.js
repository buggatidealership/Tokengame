// node rec.js <out.mp4> <section:take:seconds:label>... : records each take's arrival in real time (Playwright's video), trims it, labels it, joins them.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const OUT=process.argv[2],JOBS=process.argv.slice(3).map(s=>{const [sec,t,d,...l]=s.split(':');return {sec,t,d:+d,l:l.join(':')}});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const TMP=fs.mkdtempSync(require('os').tmpdir()+'/serec-');
const SEL={cover:'#wc-book .wc-cover',up:'#wc-up .se-up',back:'#wc-book > .wc-back'};
(async()=>{const b=await chromium.launch();const parts=[];
 for(const [i,j] of JOBS.entries()){const ctx=await b.newContext({viewport:{width:390,height:700},deviceScaleFactor:1,recordVideo:{dir:TMP+'/v'+i,size:{width:390,height:700}}});const t0=Date.now();
  const p=await ctx.newPage();await FONTS(p);await p.goto('http://localhost:8897/v47-live-x3plus.html'+(j.sec==='up'?'#/upcoming':''),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.evaluate(()=>{scrollTo(0,document.documentElement.scrollHeight);const h=document.querySelector('header.top');if(h)h.style.visibility='hidden'});await p.waitForTimeout(300);
  if(j.sec==='back')await p.evaluate(()=>scrollTo(0,0));
  await p.addStyleTag({content:rd('_se.css')+rd(j.t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('se-t-'+t),j.t);
  await p.addScriptTag({content:rd('_se.js')+rd(j.t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('se-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(800);
  const off=(Date.now()-t0)/1000;
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo({top:n.getBoundingClientRect().top+scrollY-(s.includes('cover')?0:40),behavior:'instant'})},SEL[j.sec]);
  await p.waitForTimeout(j.d*1000+300);await ctx.close();const vf=fs.readdirSync(TMP+'/v'+i).find(f=>f.endsWith('.webm'));
  const lab=j.l.replace(/'/g,"’");
  execSync(`ffmpeg -y -loglevel error -ss ${off.toFixed(2)} -i ${TMP}/v${i}/${vf} -t ${j.d} -vf "fps=25,drawbox=x=0:y=0:w=iw:h=34:color=0x1b1820@1:t=fill,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${lab}':fontcolor=0xfdbc2a:fontsize=16:x=12:y=9" -c:v libx264 -pix_fmt yuv420p -crf 20 ${TMP}/p${i}.mp4`);
  parts.push(`${TMP}/p${i}.mp4`);console.log('recorded',j.t,off.toFixed(1))}
 fs.writeFileSync(TMP+'/list.txt',parts.map(f=>`file '${f}'`).join('\n'));
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/list.txt -c copy -movflags +faststart ${OUT}`);fs.rmSync(TMP,{recursive:true});console.log(OUT);await b.close()})();
