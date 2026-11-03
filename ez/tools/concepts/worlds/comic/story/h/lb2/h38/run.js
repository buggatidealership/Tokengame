// node run.js <outdir> <shots: now,c,d,d.hit,...> [widths 390,1280] [dpr 2]   (ez/ served on PORT, default 8997)
// take c comes from ../../lb (as built today); every other take from this folder (its .js/.css on top of _r.js). A shot id = take[.key]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=process.argv[3].split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2),PORT=process.env.PORT||8997;fs.mkdirSync(OUT,{recursive:true});
const LB=__dirname+'/../../lb/';const rd=f=>fs.readFileSync(f,'utf8');const tf=(t,e)=>t==='c'?LB+'c.'+e:__dirname+'/'+t+'.'+e;
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){
  const [take,key]=id.split('.');
  const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:W<600?DPR:+(process.env.DDPR||1),reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push('c:'+m.text().slice(0,160))});
  const bad=[];p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().replace(/^.*\/ez\//,''))});
  await p.goto(`http://127.0.0.1:${PORT}/v46-live-x2plus.html`,{waitUntil:'domcontentloaded',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&window.__x2pPnl&&window.MODELS,null,{timeout:120000});await p.waitForTimeout(1200);
  if(take!=='now'){await p.addStyleTag({content:rd(LB+'_m.css')+(take==='c'?'':rd(__dirname+'/_r.css'))+rd(tf(take,'css'))});
   for(const f of [LB+'_d.js',...(take==='c'?[]:[__dirname+'/_r.js']),tf(take,'js'),LB+'_m.js'])await p.addScriptTag({content:rd(f)});
   await p.evaluate(t=>__LB(t),take);await p.evaluate(()=>document.fonts.ready);
   if(key)await p.evaluate(([t,k])=>{const g=window['__LB'+t.toUpperCase()];g&&g(k)},[take,key]);
   await p.evaluate(async()=>{await Promise.all([...document.querySelectorAll('#lbx img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r})))});
  }
  await p.waitForTimeout(+(process.env.WAIT||900));
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{if(x.closest('header'))return;if(getComputedStyle(x).position==='fixed')x.style.setProperty('display','none','important')})});
  const m=await p.evaluate(()=>{const L=document.getElementById('lbx');const o={sw:document.documentElement.scrollWidth,vw:innerWidth};if(!L)return o;
    const r=L.getBoundingClientRect();o.secH=Math.round(r.height);const bd=L.querySelector('.r-board,.c-board');o.boardBottom=bd?Math.round(bd.getBoundingClientRect().bottom+scrollY+(L.querySelector('.r-when,.c-when')?0:0)):0;o.bottom=Math.round(r.bottom+scrollY);
    const vis=e=>{const cs=getComputedStyle(e);return cs.display!=='none'&&cs.visibility!=='hidden'&&!e.closest('.sr')&&+cs.opacity>0};
    const leaves=[...L.querySelectorAll('*')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&vis(e)&&!e.closest('svg'));
    let mn=99,mt='';leaves.forEach(e=>{const f=parseFloat(getComputedStyle(e).fontSize);if(f<mn){mn=f;mt=e.textContent.trim().slice(0,20)}});o.minFont=mn;o.minT=mt;
    /* text boxes from Range rects (the ink box of the text, not the element) */
    const box=e=>{const rg=document.createRange();rg.selectNodeContents(e);const rs=[...rg.getClientRects()].filter(q=>q.width>.5&&q.height>.5);return rs};
    const B=leaves.map(e=>({e,rs:box(e)}));const col=[];
    for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const A=B[i],C=B[j];if(A.e.contains(C.e)||C.e.contains(A.e))continue;
      for(const a of A.rs)for(const c of C.rs){const ia=a.height*.15,ic=c.height*.15,ox=Math.min(a.right,c.right)-Math.max(a.left,c.left),oy=Math.min(a.bottom-ia,c.bottom-ic)-Math.max(a.top+ia,c.top+ic);
        if(ox>1.5&&oy>2){col.push(A.e.textContent.trim().slice(0,14)+' × '+C.e.textContent.trim().slice(0,14)+' '+ox.toFixed(1)+'x'+oy.toFixed(1))}}}
    o.collide=[...new Set(col)].slice(0,10);
    o.clip=[...L.querySelectorAll('*')].filter(e=>{const cs=getComputedStyle(e);if(!vis(e)||e.tagName==='svg'||e.closest('svg'))return false;return e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible'&&e.textContent.trim()}).map(e=>e.className+':'+e.textContent.trim().slice(0,16)).slice(0,6);
    o.outside=[...L.querySelectorAll('b,small,span,img')].filter(e=>{const a=e.getBoundingClientRect();return vis(e)&&a.width&&(a.right>innerWidth+.5||a.left<-.5)}).map(e=>e.className+':'+e.textContent.trim().slice(0,14)).slice(0,6);
    o.fonts=[...new Set(leaves.map(e=>getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,'')))];
    o.imgFail=[...L.querySelectorAll('img')].filter(i=>!i.naturalWidth).map(i=>i.src.slice(-24));return o});
  const H=Math.min(m.bottom||1600,7000);
  await p.screenshot({path:`${OUT}/${id}-${W}.png`,clip:{x:0,y:0,width:W,height:H},fullPage:true});
  m.errors=er;m.bad=bad.slice(0,5);res[id+'@'+W]=m;console.log(id,W,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
