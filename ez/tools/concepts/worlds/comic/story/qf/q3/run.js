// node run.js <id: q3|q4> <out dir>: four beats at 390x844 and beat 3 at 1280x800 on the built X3+, plus hard-rule checks
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const ID=process.argv[2],OUT=process.argv[3],FR=process.env.FR;fs.mkdirSync(OUT,{recursive:true});
const dir=__dirname+'/../'+ID+'/';
const frames={};for(const [k,f] of Object.entries({a:'f1.jpg',b:'f14.jpg',c:'f16.jpg',d:'f9.5.jpg'}))frames[k]='data:image/jpeg;base64,'+fs.readFileSync(FR+'/'+f).toString('base64');
const probe=(id)=>{const out=[];const P=[...document.querySelectorAll(`.${id}-pg.on .${id}-p, .${id}-pg.on .${id}-cap, .${id}-pg.on .${id}-band`)];
  const lum=c=>{const m=c.match(/[\d.]+/g);if(!m)return 0;if(m.length>3&&+m[3]<.5)return -1;return (.2126*m[0]+.7152*m[1]+.0722*m[2])/255};
  const content=[];const walk=n=>{for(const k of n.childNodes){if(k.nodeType===3&&k.textContent.trim()){const r=document.createRange();r.selectNodeContents(k);content.push(...r.getClientRects())}else if(k.nodeType===1){const cs=getComputedStyle(k);if(cs.display==='none'||cs.visibility==='hidden')continue;
    if(k.tagName==='IMG'||k.tagName.toLowerCase()==='svg'||(cs.backgroundImage!=='none'&&!/repeating/.test(cs.backgroundImage)))content.push(k.getBoundingClientRect());if(k.tagName.toLowerCase()!=='svg')walk(k)}}};
  P.forEach(p=>{const R=p.getBoundingClientRect();if(R.width<4)return;content.length=0;const cs=getComputedStyle(p);if(cs.backgroundImage!=='none'&&!/gradient/.test(cs.backgroundImage))content.push(R);walk(p);
    let tot=0,fill=0,white=0;for(let x=R.left+4;x<R.right-4;x+=6)for(let y=R.top+4;y<R.bottom-4;y+=6){if(y<0||y>innerHeight)continue;tot++;if(content.some(c=>x>=c.left&&x<=c.right&&y>=c.top&&y<=c.bottom))fill++;
      let e=document.elementFromPoint(x,y);while(e&&e!==document.body){const c=getComputedStyle(e);const L=lum(c.backgroundColor);if(L>=0&&(c.backgroundImage==='none'||/gradient/.test(c.backgroundImage))){if(L>.85&&c.backgroundImage==='none')white++;break}if(c.backgroundImage!=='none'&&!/gradient/.test(c.backgroundImage))break;e=e.parentElement}}
    out.push({p:(p.className.split(' ').slice(0,2).join('.')),w:Math.round(R.width),h:Math.round(R.height),empty:tot?Math.round(100*(1-fill/tot)):0,white:tot?Math.round(100*white/tot):0})});
  const over=[];document.querySelectorAll(`.${id}-pg.on img[src*="logos/"], .${id}-pg.on [data-subj]`).forEach(l=>{const a=l.getBoundingClientRect();if(!a.width)return;
    document.querySelectorAll(`.${id}-pg.on *`).forEach(e=>{if(e===l||e.contains(l)||l.contains(e))return;const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none')return;const b=e.getBoundingClientRect();if(!b.width||!b.height)return;
      const ix=Math.min(a.right,b.right)-Math.max(a.left,b.left),iy=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(ix>1&&iy>1&&(l.compareDocumentPosition(e)&Node.DOCUMENT_POSITION_FOLLOWING))over.push((l.getAttribute('src')||l.className).slice(-20)+' x '+e.className)})});
  return {panels:out,over,sw:document.documentElement.scrollWidth};};
(async()=>{const b=await chromium.launch();
 const shots=[[390,844,1],[390,844,2],[390,844,3],[390,844,4],[1280,800,3]];
 for(const [W,H,beat] of shots){const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:W<600?2:1});await FONTS(p);await p.emulateMedia({reducedMotion:'reduce'});
  const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8912/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.evaluate(f=>{window.__qF=f},frames);
  await p.addStyleTag({content:fs.readFileSync(dir+ID+'.css','utf8')});
  await p.addScriptTag({content:fs.readFileSync(__dirname+'/_data.js','utf8')});await p.addScriptTag({content:fs.readFileSync(dir+ID+'.js','utf8')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('q-ready'));
  await p.evaluate(n=>__qGo(n),beat);await p.evaluate(()=>scrollTo(0,0));
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(900);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&!x.closest('header')&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  await p.screenshot({path:`${OUT}/${ID}-${W}-b${beat}.png`});
  const r=await p.evaluate(probe,ID);const sh=await p.evaluate(id=>{const s=document.querySelector('#'+id+'s');return Math.round(s.getBoundingClientRect().bottom)},ID);
  console.log(W,'beat',beat,'sw',r.sw,'section bottom',sh,'/',H,er.join('|')||'no errors');r.panels.forEach(x=>console.log('  ',x.p,x.w+'x'+x.h,'empty',x.empty+'%','white',x.white+'%'));console.log('   logo/subject overlaps:',r.over.length?r.over.join('; '):'none');await p.close()}
 await b.close()})();
