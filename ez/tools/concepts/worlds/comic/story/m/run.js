// node run.js <out dir> <takes now,g2,g5,m1,m2,m3> [widths 390,1280] [mode shot|close]
// Lays a take over the built X3+ page (own server, port 8913). g2/g5 are helper a's genres as made; m1..m3 are this folder's (_mg.js).
// Every take but "now" sits on helper a's S1 stamp (smaller, s1s), as the genres were shown. shot: the section + a context strip; close: four tiles at 3x.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),MODE=process.argv[5]||'shot';fs.mkdirSync(OUT,{recursive:true});
const A=__dirname+'/../a/',rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
const TK=['LLY','SHEL.L','MA','CMG'];
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const dpr=MODE==='close'?3:2;const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto('http://localhost:8913/v47-live-x3plus.html',{waitUntil:'load',timeout:120000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  await p.evaluate(()=>{const n=document.querySelector('.wc-season');scrollTo(0,n.getBoundingClientRect().top+scrollY-60)});await p.waitForTimeout(700);
  const sz0=await p.evaluate(()=>[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent).map(a=>{const r=a.getBoundingClientRect();return Math.round(r.width)+'x'+Math.round(r.height)}).join(','));
  if(t!=='now'){const gen=t[0]==='m'?rd(__dirname+'/_mg.js'):rd(A+'_gen.js');
    await p.addStyleTag({content:rd(A+'_sa.css')+rd(A+'s1.css')+rd(A+'s1s.css')+rd(A+'g5.css')+rd(__dirname+'/'+t+'.css')});
    await p.evaluate(()=>['s1','s1s'].forEach(x=>document.documentElement.classList.add('sa-t-'+x)));
    await p.addScriptTag({content:rd(A+'_sa.js')+gen+rd(A+'s1.js')+`SA.gen('${t}').then(SA.ready);`});
    await p.waitForFunction(()=>document.documentElement.classList.contains('sa-ready'),null,{timeout:60000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(900);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const m=await p.evaluate(()=>{const n=document.querySelector('.wc-season'),r=n.getBoundingClientRect();
    return {sw:document.documentElement.scrollWidth,w:Math.round(r.width),h:Math.round(r.height),tiles:[...document.querySelectorAll('.wc-season .wc-bi')].filter(a=>a.offsetParent).map(a=>{const r=a.getBoundingClientRect();return Math.round(r.width)+'x'+Math.round(r.height)}).join(','),painted:document.querySelectorAll('.wc-season canvas.sa-gc5').length}});
  if(MODE==='close'){for(const k of TK){const n=await p.evaluate(k=>{const r=ROUNDS.find(r=>r.ticker===k);return r&&r.n},k);const el=await p.$(`.wc-season .wc-bi[href="#/round/${n}"]`);await el.screenshot({path:`${OUT}/close-${t}-${k}.png`})}}
  else{const bb=await p.evaluate(()=>{const n=document.querySelector('.wc-season');const r=n.getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}});
    await p.screenshot({path:`${OUT}/season-${W}-${t}.png`,clip:{x:Math.max(0,bb.x-16),y:bb.y-10,width:Math.min(W,bb.width+32),height:bb.height+26},fullPage:true});
    const ctx=W<600?300:340;await p.screenshot({path:`${OUT}/ctx-${W}-${t}.png`,clip:{x:0,y:bb.y-ctx,width:W,height:bb.height+2*ctx},fullPage:true})}
  console.log(W,MODE,t,JSON.stringify(m),'same-size:'+(sz0===m.tiles),er.join('|')||'ok');await p.close()}
 await b.close()})();
