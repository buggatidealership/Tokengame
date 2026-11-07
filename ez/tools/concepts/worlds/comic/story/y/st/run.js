// node run.js <out dir> <takes pop,manga,...|all|mix> [widths 390] : C2 "the page of panels" in each style, laid over the built X3+ page. Port 8928.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
const SOLO=['pop','manga','neon','chrome','clay','holo','sticker','riso','deco','western','blocks','glass'];
const MIX=['m1','m2','m3','m4','m5'];
const TAKES={pop:{cv:'c2'},manga:{},neon:{},chrome:{box:1},clay:{box:1},holo:{box:1},sticker:{box:1},riso:{},deco:{box:1},western:{box:1},blocks:{box:1},glass:{box:1},
  m1:{css:['riso','m1'],cls:'st-riso'},m2:{css:['glass','m2'],cls:'st-glass',box:1},m3:{css:['neon','m3'],cls:'st-neon'},m4:{css:['deco','m4'],cls:'st-deco',box:1},m5:{css:['manga','m5'],cls:'st-manga'}};
const FONTLINK='https://fonts.googleapis.com/css2?family=Bangers&family=Luckiest+Guy&family=Monoton&family=Bungee&family=Bungee+Shade&family=Bungee+Inline&family=Fredoka:wght@500;600;700&family=Limelight&family=Poiret+One&family=Permanent+Marker&family=Archivo+Black&family=Orbitron:wght@700;800;900&family=Rye&family=Space+Grotesk:wght@500;600;700&family=Dela+Gothic+One&family=Rubik+Mono+One&display=swap';
let A=process.argv[3]||'all';A=A==='all'?SOLO.concat(MIX):A==='solo'?SOLO:A==='mix'?MIX:A.split(',');
const OUT=process.argv[2],WS=(process.argv[4]||'390').split(',').map(Number);if(OUT)fs.mkdirSync(OUT,{recursive:true});
async function open(b,W,t,o={}){const H=o.h||(W<600?844:1000);const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:o.dpr||2,reducedMotion:o.rm?'reduce':'no-preference'});await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  await p.goto('http://localhost:8928/v47-live-x3plus.html',{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForTimeout(500);const K=TAKES[t];
  await p.addStyleTag({content:fs.readFileSync(__dirname+'/../cv/_cv.css','utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+'/../cv/_cv.js','utf8')});
  if(K.cv){await p.addStyleTag({content:fs.readFileSync(__dirname+`/../cv/${K.cv}.css`,'utf8')});await p.addScriptTag({content:fs.readFileSync(__dirname+`/../cv/${K.cv}.js`,'utf8')});
    await p.waitForFunction(c=>document.documentElement.classList.contains(c+'-ready'),K.cv,{timeout:30000})}
  else{await p.evaluate(h=>{const l=document.createElement('link');l.rel='stylesheet';l.href=h;document.head.append(l)},FONTLINK);
    await p.addStyleTag({content:rd('_st.css')});for(const c of (K.css||[t]))await p.addStyleTag({content:rd(c+'.css')});
    await p.evaluate(([n,c])=>{window.STT={name:'stt-'+n,cls:c}},[t,(K.cls||'st-'+t)+(K.box?' st-box':'')+' st-'+t]);
    await p.evaluate(async()=>{await new Promise(r=>setTimeout(r,300));await document.fonts.ready});
    await p.addScriptTag({content:rd('_st.js')});await p.waitForFunction(c=>document.documentElement.classList.contains(c),'stt-'+t+'-ready',{timeout:30000})}
  await p.evaluate(()=>document.fonts.ready);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(o.wait||1800);return {p,er}}
module.exports={open,SOLO,MIX};
if(require.main===module)(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const R=[];
 for(const W of WS)for(const t of A){const {p,er}=await open(b,W,t);
  await p.screenshot({path:`${OUT}/${t}-${W}.png`});
  const m=await p.evaluate(()=>{const cv=document.querySelector('#wc-book .wc-cover');const o=[];
    cv.querySelectorAll('*').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&(b.right>innerWidth+0.5||b.left<-0.5))o.push(String(e.className.baseVal??e.className).slice(0,30)+' '+Math.round(b.left)+'..'+Math.round(b.right))});
    /* empty area per panel: share of the panel's visible box that no content box covers (4px cells) */
    const cover=[...cv.querySelectorAll('.st-p,.st-mh,.c2-p,.c2-mh')].map(pn=>{const r=pn.getBoundingClientRect();
      const cs=getComputedStyle(pn);const x0=r.left+parseFloat(cs.paddingLeft),x1=r.right-parseFloat(cs.paddingRight),y0=r.top,y1=r.bottom;
      const leaves=[...pn.querySelectorAll('img,svg,.st-w,.st-b,.st-coin,.st-pf,.st-cap,.st-con,.st-tk,.st-slab,.st-bal,.st-iss,.c2-b,.c2-cap,.cvx-tk,.cvx-slab,.pp-ext,.pp-coin,.cvx-pf,.c2-bal,.c2-iss,.c2-co b')].filter(e=>!e.closest('.st-gr,.c2-gr')).map(e=>e.getBoundingClientRect()).filter(b=>b.width&&b.height);
      let tot=0,hit=0;for(let y=y0;y<y1;y+=4)for(let x=x0;x<x1;x+=4){tot++;if(leaves.some(b=>x>=b.left&&x<b.right&&y>=b.top&&y<b.bottom))hit++}
      return (pn.className.match(/(st|c2)-(p\d|mh)/)||['?'])[0]+' '+Math.round(100*hit/tot)+'%'});
    /* nothing laid over a company logo */
    const lg=[...cv.querySelectorAll('.st-lg,.c2-lg')].map(e=>e.getBoundingClientRect());const ov=[];
    cv.querySelectorAll('.st-w,.st-b,.st-coin,.st-say,.c2-b,.c2-say').forEach(e=>{const b=e.getBoundingClientRect();lg.forEach(l=>{const ix=Math.min(b.right,l.right)-Math.max(b.left,l.left),iy=Math.min(b.bottom,l.bottom)-Math.max(b.top,l.top);if(ix>1&&iy>1)ov.push(String(e.className).slice(0,24))})});
    const emoji=/\p{Extended_Pictographic}/u.test(cv.innerText.replace(/[▲▼★·↓]/g,''));
    return {sw:document.documentElement.scrollWidth,over:o.slice(0,6),cover,overLogo:ov,emoji}});
  R.push({t,W,...m,err:er.slice()});console.log(JSON.stringify(R[R.length-1]));await p.close()}
 fs.writeFileSync(OUT+'/checks-'+A.join('_').slice(0,60)+'-'+WS.join('_')+'.json',JSON.stringify(R,null,1));await b.close()})();
