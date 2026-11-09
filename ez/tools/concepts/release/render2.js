// node render2.js <outdir> [query] : vid2.html at 30 fps with motion blur, into <outdir>/seg%03d.mp4 (one per second) and list.txt.
// Each output frame is the average of M samples across a 180 degree shutter (the first half of the frame's 1/30 s); M is 12 in the
// seconds that hold a fling, a tap or the phone's entry and exit, 4 elsewhere (env MB, MBF override). ez/ served on :8996. DSF=1 is the
// draft size (1080x1350); DSF=2 only for the master, after every layer is approved. A and B (seconds) limit the range.
const {chromium}=require('playwright');const fs=require('fs');const {execFileSync}=require('child_process');
const out=process.argv[2],q=process.argv[3]||'',fps=30,D=26,DSF=+(process.env.DSF||1),A=+(process.env.A||0),B=+(process.env.B||D),FAST=[3,7,8,9,11,13,14,15,18,21,22],PAGE=process.env.PAGE||'vid2.html';
(async()=>{fs.mkdirSync(out+'/tmp',{recursive:true});const errs=[];let list='';
 for(let sec=A;sec<B;sec++){const seg=`${out}/seg${String(sec).padStart(3,'0')}.mp4`;list+=`file 'seg${String(sec).padStart(3,'0')}.mp4'\n`;if(fs.existsSync(seg))continue;
  const M=FAST.includes(sec)?+(process.env.MBF||12):+(process.env.MB||4);
  for(let tries=0;tries<3;tries++){const b=await chromium.launch();try{const p=await b.newPage({viewport:{width:1080,height:1350},deviceScaleFactor:DSF});p.on('pageerror',e=>errs.push(e.message));
    await p.goto('http://localhost:8996/tools/concepts/release/'+PAGE+q);await p.waitForFunction(()=>window.READY===1,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);
    let n=0;for(let f=0;f<fps;f++)for(let j=0;j<M;j++){const t=sec+(f+j*.5/M)/fps;await p.evaluate(t=>window.R(t),t);await p.screenshot({path:`${out}/tmp/c${String(n++).padStart(5,'0')}.jpg`,type:'jpeg',quality:96})}
    await b.close();break}catch(e){errs.push('retry '+sec+': '+e.message.split('\n')[0]);try{await b.close()}catch(_){}}}
  execFileSync('ffmpeg',['-v','error','-y','-framerate',String(fps*M),'-i',`${out}/tmp/c%05d.jpg`,'-vf',`tmix=frames=${M},select='eq(mod(n\\,${M})\\,${M-1})',setpts=N/(${fps}*TB)`,'-r',String(fps),'-c:v','libx264','-preset','fast','-crf','7','-pix_fmt','yuv444p',seg+'.tmp.mp4']);
  fs.renameSync(seg+'.tmp.mp4',seg);for(const x of fs.readdirSync(out+'/tmp'))fs.unlinkSync(out+'/tmp/'+x);console.log('sec',sec,'M',M)}
 fs.writeFileSync(out+'/list.txt',list);console.log('done errs',errs.join('|')||'none')})();
