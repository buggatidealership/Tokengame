// node run.js <outdir> <ids now,a,b,c> [widths 390,1280] [dpr 2]   (serve ez/: cd ez && python3 -m http.server 8991; PORT=8991)
// Lays _s2.css/_s2.js + <id>.css/.js over the built v46-live-x2plus.html's bet section (#x2pSt), shoots the bet section plus the
// Season 2 beat (<id>-<W>.png) and the beat alone in a 390x664 frame (<id>-<W>-beat.png), prints measurements.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8991;fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const VH=W<600?664:800;
  const ctx=await b.newContext({viewport:{width:W,height:VH},deviceScaleFactor:DPR,reducedMotion:process.env.RM?'reduce':'no-preference'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('hb-ready'),null,{timeout:60000});await p.waitForTimeout(500);
  if(id!=='now'){await p.addStyleTag({content:rd('_s2.css')+rd(id+'.css')});await p.addScriptTag({content:rd('_s2.js')+rd(id+'.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('s2-ready'),null,{timeout:20000})}
  await p.evaluate(()=>{const s=document.querySelector('#x2pSt');scrollTo(0,s.getBoundingClientRect().top+scrollY-60)});
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
  await p.waitForTimeout(+(process.env.WAIT||2500));
  await p.evaluate(()=>{const b=document.querySelector('.s2b');if(b){const r=b.getBoundingClientRect();scrollTo(0,r.top+scrollY-(innerHeight-r.height)/2)}});await p.waitForTimeout(2600);
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('#x2pSt'))return;const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.setProperty('visibility','hidden','important')})});
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});await p.waitForTimeout(200);
  const m=await p.evaluate(()=>{const S=document.querySelector('#x2pSt'),bt=document.querySelector('.s2b');const r=S.getBoundingClientRect();
    const br=bt&&bt.getBoundingClientRect();
    const out=[...S.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();if(!q.width)return false;if(getComputedStyle(e).visibility==='hidden')return false;if(e.closest('.hbc-die,.hbc-lab,.hb5-st'))return false;return q.right>innerWidth+.5||q.left<-.5}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,24)).slice(0,6);
    let words=0;if(bt){const tw=document.createTreeWalker(bt,NodeFilter.SHOW_TEXT);let n;while(n=tw.nextNode()){const e=n.parentElement;if(e.closest('.s2-sr'))continue;const q=e.getBoundingClientRect();if(!q.width)continue;words+=(n.textContent.match(/[\w$%#&'’.:-]+/g)||[]).length}}
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,secH:Math.round(r.height),secY:Math.round(r.top+scrollY),beatY:br?Math.round(br.top+scrollY):null,beatH:br?Math.round(br.height):0,words,out}});
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:0,y:Math.max(0,m.secY-10),width:W,height:Math.min(m.secH+20,7000)},fullPage:true});
  if(m.beatY!=null){const fy=Math.max(0,m.beatY-(W<600?Math.max(0,(VH-m.beatH)/2):60));
    await p.screenshot({path:`${OUT}/${id}-${W}-beat.png`,clip:{x:0,y:fy,width:W,height:VH},fullPage:true})}
  else{const fy=m.secY+m.secH-VH;await p.screenshot({path:`${OUT}/${id}-${W}-beat.png`,clip:{x:0,y:Math.max(0,fy),width:W,height:VH},fullPage:true})}
  m.errors=er;res[id+'@'+W]=m;console.log(id,W,JSON.stringify({...m,errors:er.slice(0,3)}));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
