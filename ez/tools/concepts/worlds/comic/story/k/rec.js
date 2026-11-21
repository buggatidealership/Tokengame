// node rec.js <out.mp4> <take:seconds:label>... : records each take's first screen in real time at 390x844 (CDP screencast), labels, joins.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),{execSync}=require('child_process');
const OUT=process.argv[2],JOBS=process.argv.slice(3).map(s=>{const [t,d,...l]=s.split(':');return {t,d:+d,l:l.join(':')}});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const TMP=fs.mkdtempSync(require('os').tmpdir()+'/kcrec-');
(async()=>{const b=await chromium.launch();const parts=[];
 for(const [i,j] of JOBS.entries()){const W=390,H=844;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2});fs.mkdirSync(TMP+'/v'+i);
  const p=await ctx.newPage();await FONTS(p);await p.goto('http://localhost:8911/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:rd('_k.css')+rd(j.t+'.css')});await p.evaluate(t=>document.documentElement.classList.add('kc-on'),j.t);
  await p.addScriptTag({content:rd('../e/_se.js')+rd('_k.js')+rd(j.t+'.js')});await p.waitForFunction(()=>document.documentElement.classList.contains('se-ready'));await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>scrollTo(0,+(new URLSearchParams(location.search).get('y')||0)));
  await p.evaluate(()=>scrollTo(0,0));
  await p.waitForTimeout(900);
  const cdp=await ctx.newCDPSession(p);const fr=[];cdp.on('Page.screencastFrame',async e=>{const n=fr.length;fs.writeFileSync(`${TMP}/v${i}/f${String(n).padStart(5,'0')}.jpg`,Buffer.from(e.data,'base64'));fr.push(e.metadata.timestamp);try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(_){}});
  await cdp.send('Page.startScreencast',{format:'jpeg',quality:88,everyNthFrame:1});
  await p.waitForTimeout(j.d*1000+400);await cdp.send('Page.stopScreencast');await ctx.close();
  const t0=fr[0];let txt='';fr.forEach((t,n)=>{const nx=n+1<fr.length?fr[n+1]:t0+j.d;txt+=`file '${TMP}/v${i}/f${String(n).padStart(5,'0')}.jpg'\nduration ${Math.max(.001,Math.min(nx,t0+j.d)-t).toFixed(4)}\n`});
  txt+=`file '${TMP}/v${i}/f${String(fr.length-1).padStart(5,'0')}.jpg'\n`;fs.writeFileSync(`${TMP}/c${i}.txt`,txt);
  const lab=j.l.replace(/'/g,"’").replace(/:/g,'\\:');
  execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/c${i}.txt -t ${j.d} -vf "fps=30,scale=780:-2,drawbox=x=0:y=0:w=iw:h=64:color=0x1b1820@1:t=fill,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf:text='${lab}':fontcolor=0xfdbc2a:fontsize=30:x=20:y=17" -c:v libx264 -pix_fmt yuv420p -crf 21 ${TMP}/p${i}.mp4`);
  parts.push(`${TMP}/p${i}.mp4`);console.log('recorded',j.t,fr.length,'frames')}
 fs.writeFileSync(TMP+'/list.txt',parts.map(f=>`file '${f}'`).join('\n'));
 execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${TMP}/list.txt -c copy -movflags +faststart ${OUT}`);fs.rmSync(TMP,{recursive:true});console.log(OUT);await b.close()})();
