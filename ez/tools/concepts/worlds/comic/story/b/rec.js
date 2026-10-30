// node rec.js <out.mp4> <section: cliff|bet> <takes e.g. c1,c2,c3> [width 390]: each take's motion as the section comes into view,
// frames from a screenshot loop at their real timing, joined by ffmpeg, a label burned in per take
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs'),cp=require('child_process'),path=require('path'),os=require('os');
const OUT=path.resolve(process.argv[2]),SEC=process.argv[3],TS=process.argv[4].split(','),W=+(process.argv[5]||390),H=W<600?844:900;
const SEL={cliff:'.wc-cliff',bet:'.wc-bet'}[SEC];const NAME=JSON.parse(fs.readFileSync(__dirname+'/names.json','utf8'));
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
const TMP=fs.mkdtempSync(path.join(os.tmpdir(),'sbrec-'));
(async()=>{const b=await chromium.launch();const list=[];let k=0;
 for(const t of TS){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});await FONTS(p);
  await p.goto('http://localhost:8897/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const Hh=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<Hh;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(30)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
  await p.addStyleTag({content:rd('_sb.css')+'\n'+rd(t+'.css')});await p.addScriptTag({content:rd('_sb.js')});await p.addScriptTag({content:rd(t+'.js')});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(700);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo({top:n.getBoundingClientRect().top+scrollY-(innerWidth<600?10:30)-(n.querySelector('.wc-chipw')&&innerWidth<600?140:0),behavior:'instant'})},SEL);
  const t0=Date.now();let last=null;
  while(Date.now()-t0<3400){const f=`${TMP}/f${String(k++).padStart(5,'0')}.png`;await p.screenshot({path:f});const now=Date.now();if(last)last.d=(now-last.t)/1000;last={f,t:now,lab:NAME[t]};list.push(last)}
  last.d=.9;await p.close()}
 await b.close();
 // label each frame (one label image per take, overlaid), then concat with durations
 const cc=list.map(x=>`file '${x.f}'\nduration ${x.d.toFixed(3)}`).join('\n')+`\nfile '${list[list.length-1].f}'\n`;fs.writeFileSync(TMP+'/list.txt','ffconcat version 1.0\n'+cc);
 // burn the take's name: split by take with drawtext per segment is awkward; draw it into the frames instead
 for(const x of list){cp.execFileSync('/usr/bin/python3',[__dirname+'/label.py',x.f,x.lab])}
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-f','concat','-safe','0','-i',TMP+'/list.txt','-vf','scale=trunc(iw/4)*2:trunc(ih/4)*2,fps=25,format=yuv420p','-c:v','libx264','-crf','23','-movflags','+faststart',OUT]);
 fs.rmSync(TMP,{recursive:true});console.log('wrote',OUT,list.length,'frames')})();
