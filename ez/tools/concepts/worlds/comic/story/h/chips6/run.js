// chips6: node run.js <out> <takes> [widths 320,390,1280] : serve ez/ on port 8951 first. A take is now | N6 | N6~grid | N6~print | N6~enamel.
// Shoots X2+'s standings (now) or the chips6 section laid over the built page; prints sideways scroll, errors, surfaces outside their
// painting, fitted lines outside their field or touching, the smallest text, the data and every box per chip.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'320,390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8951/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  const [tk,o]=t.split('~');
  if(t!=='now'){await p.addStyleTag({content:rd('_c6.css')});await p.evaluate(o=>{window.__C6FP=(o&&o!=='grid')?o:'etch';window.__C6GRID=o==='grid'},o);await p.addScriptTag({content:rd('_c6.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('c6-ready'));}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__c6&&__c6.fit());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'||c.position==='sticky')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug),header.top{visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.c6 img,#standings img')].every(i=>i.complete));
  await p.waitForTimeout(1500);await p.evaluate(()=>window.__c6&&__c6.fit());
  const sel=t==='now'?'#standings':'section.c6';
  const r=await p.evaluate(s=>{const e=document.querySelector(s);e.scrollIntoView();const b=e.getBoundingClientRect();return {y:Math.max(0,b.top+scrollY-8),h:Math.ceil(b.height+16)}},sel);
  await p.waitForTimeout(400);const nm=t.replace(/~/g,'-');
  await p.screenshot({path:`${OUT}/ch-${W}-${nm}.png`,clip:{x:0,y:r.y,width:W,height:r.h},fullPage:true});
  if(t!=='now'){const bt=await p.$$('section.c6 .c6-one');for(let i=0;i<bt.length;i++)await bt[i].screenshot({path:`${OUT}/one-${W}-${nm}-${i}.png`})}
  const m=await p.evaluate(()=>{const s=document.querySelector('section.c6');if(!s)return {sw:document.documentElement.scrollWidth};
    const out=[...s.querySelectorAll('.c6-sf,.c6-die,.c6-try')].filter(e=>{const r=e.getBoundingClientRect(),a=e.closest('.c6-pic').getBoundingClientRect();return r.left<a.left-1||r.right>a.right+1||r.top<a.top-1||r.bottom>a.bottom+1}).length;
    const over=[];[...s.querySelectorAll('.c6-sf svg')].forEach(sv=>{const vb=sv.viewBox.baseVal;
      const ts=[...sv.querySelectorAll('text')].map(t=>{const b=t.getBBox(),fs=+t.getAttribute('font-size'),y=+t.getAttribute('y'),g=t.closest('.ch-fit');let r=[b.x,y-fs*.74,b.x+b.width,y+fs*.03];
        const m=g&&g.transform.baseVal.consolidate();if(m){const M=m.matrix;r=[M.a*r[0]+M.e,M.d*r[1]+M.f,M.a*r[2]+M.e,M.d*r[3]+M.f]}return [t,r]});
      ts.forEach(([t,r])=>{const o=Math.max(-r[0],r[2]-vb.width);if(o>1)over.push('field:'+t.textContent+':'+(o/vb.width*100).toFixed(1)+'%')});
      for(let i=0;i<ts.length;i++)for(let j=i+1;j<ts.length;j++){const A=ts[i][1],C=ts[j][1];if(A[0]<C[2]-.5&&C[0]<A[2]-.5&&A[1]<C[3]-.5&&C[1]<A[3]-.5)over.push('hit:'+ts[i][0].textContent+'/'+ts[j][0].textContent)}});
    const lab=[...s.querySelectorAll('.c6-label text')].map(e=>{const r=e.getBoundingClientRect();return {t:e.textContent,h:+r.height.toFixed(1)}}).sort((a,b)=>a.h-b.h);
    const fits=[...s.querySelectorAll('.ch-fit')].map(g=>g.textContent.slice(0,14)+':'+g.dataset.k).join(' ');
    return {sw:document.documentElement.scrollWidth,vw:innerWidth,h:Math.round(s.getBoundingClientRect().height),outSurf:out,overField:over,smallest:lab.slice(0,3),fits,data:window.__c6.data,boxes:window.__c6.boxes()}});
  console.log(W,t,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
