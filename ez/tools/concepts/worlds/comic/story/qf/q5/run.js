// node run.js <out dir> [take id]   shoots beats 1-4 at 390x844 and beat 3 at 1280x800 (DPR 2), prints checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const OUT=process.argv[2],ID=process.argv[3]||path.basename(__dirname);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
const PORT=process.env.PORT||8913;
/* stills of the round's film, made once into the scratchpad (never the repo), handed to the page as data URLs */
const cp=require('child_process');const FR=process.env.FR||'/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/q56/frames';fs.mkdirSync(FR,{recursive:true});
const TIMES=[2,5,7.5,9.5,12.4,12.8,13.2,13.6,17,19.9];const FRAMES={};
for(const t of TIMES){const f=`${FR}/t${t}.jpg`;if(!fs.existsSync(f))cp.execFileSync('ffmpeg',['-v','error','-y','-ss',String(t),'-i',path.join(__dirname,'../../../../../../../media/round-66-shell-hd.mp4'),'-frames:v','1','-q:v','2',f]);FRAMES[t]='data:image/jpeg;base64,'+fs.readFileSync(f).toString('base64')}
(async()=>{const b=await chromium.launch();
 const shots=process.env.SHOTS?JSON.parse(process.env.SHOTS):[[390,844,[1,2,3,4]],[1280,800,[3]]];
 for(const [W,Hh,beats] of shots){const p=await b.newPage({viewport:{width:W,height:Hh},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.addStyleTag({content:rd(ID+'.css')+'.x2p-cw{display:none!important}'});await p.evaluate(F=>{window.__qfFrames=F},FRAMES);await p.addScriptTag({content:rd('_film.js')});await p.addScriptTag({content:rd(ID+'.js')});
  await p.waitForFunction(id=>document.documentElement.classList.contains(id+'-ready'),ID,{timeout:60000});
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>scrollTo(0,0));
  for(const bt of beats){await p.evaluate(([id,bt])=>window['__'+id+'Go'](bt),[ID,bt]);await p.waitForTimeout(+(process.env.WAIT||4200));
   const m=await p.evaluate(id=>{const S=document.getElementById(id),VW=innerWidth;const vis=e=>{const c=getComputedStyle(e);return c.display!=='none'&&c.visibility!=='hidden'&&e.getClientRects().length};
     const clip=[...S.querySelectorAll('*')].filter(e=>vis(e)&&e.children.length===0&&e.textContent.trim()&&(e.scrollWidth>e.clientWidth+1)&&getComputedStyle(e).overflow!=='visible').map(e=>e.className+':'+e.textContent.slice(0,16));
     const R=S.getBoundingClientRect();
     /* empty area per panel: share of each panel not covered by any visible leaf box (text, canvas, img, svg shapes) */
     const pan=[...S.querySelectorAll(S.dataset.panels||'[data-panel]')].filter(vis).map(pn=>{const q=pn.getBoundingClientRect();const g=8,Wc=Math.ceil(q.width/g),Hc=Math.ceil(q.height/g),cov=new Uint8Array(Wc*Hc);
       const leaves=[...pn.querySelectorAll('canvas,img,b,span,i,em,q,p,small,strong,text,path,circle,line,rect,polygon')].filter(e=>vis(e)&&!(e.tagName==='rect'&&e.getAttribute('class')==='q5-hatch'));
       for(const e of leaves){const a=e.getBoundingClientRect();if(!a.width&&!a.height)continue;for(let y=Math.max(0,Math.floor((a.top-q.top)/g));y<Math.min(Hc,Math.ceil((a.bottom-q.top)/g));y++)for(let x=Math.max(0,Math.floor((a.left-q.left)/g));x<Math.min(Wc,Math.ceil((a.right-q.left)/g));x++)cov[y*Wc+x]=1}
       let n=0;cov.forEach(v=>n+=v);return (pn.dataset.panel||pn.className.baseVal||pn.className).toString().slice(0,14)+':'+Math.round(100-100*n/cov.length)+'%'});
     /* pale grounds: visible elements whose own background is light (luminance over .8) */
     const lum=c=>{const m=c.match(/[\d.]+/g);if(!m||(m[3]!==undefined&&+m[3]<.5))return 0;const f=v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)};return .2126*f(+m[0])+.7152*f(+m[1])+.0722*f(+m[2])};
     const pale=[...S.querySelectorAll('*')].filter(e=>vis(e)&&lum(getComputedStyle(e).backgroundColor)>.8).map(e=>e.className.toString().slice(0,16));
     /* logo overlap: anything visible intersecting a logo img box */
     const logos=[...S.querySelectorAll('img')].filter(vis).map(i=>i.getBoundingClientRect());
     const over=[];for(const e of S.querySelectorAll('*')){if(e.tagName==='IMG'||!vis(e)||e.contains(document.querySelector('img'))||e.children.length)continue;const a=e.getBoundingClientRect();if(!a.width)continue;for(const l of logos){const ix=Math.min(a.right,l.right)-Math.max(a.left,l.left),iy=Math.min(a.bottom,l.bottom)-Math.max(a.top,l.top);if(ix>1&&iy>1&&!(a.left<=l.left&&a.right>=l.right&&a.top<=l.top&&a.bottom>=l.bottom))over.push(e.className.toString().slice(0,12))}}
     return {sw:document.documentElement.scrollWidth,vw:VW,secH:Math.round(R.height),secBottom:Math.round(R.bottom),clip,pan,pale:[...new Set(pale)].slice(0,8),over:[...new Set(over)].slice(0,8)}},ID);
   console.log(W,'beat',bt,JSON.stringify(m),er.join(' | ')||'no errors');
   await p.screenshot({path:`${OUT}/${ID}-${W}-b${bt}.png`})}
  await p.close()}
 await b.close()})();
