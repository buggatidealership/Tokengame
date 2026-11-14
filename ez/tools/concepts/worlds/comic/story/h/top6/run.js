// node run.js <out> <ids> [widths 390,1280] : serve ez/ on port 8954 first (cd ez && python3 -m http.server 8954).
// id = now | <T>-<L>[off]: T = A (torn paper between beats, gold trace between frames) or B (torn paper + zigzag cut); L = a (full lines, today's size), b ("4 AIs submit their predictions" kept on line 1), c ("4 AIs submit predictions"). Shoots top-<W>-<id>.png (header to the film's end)
// and fr-<W>-<id>.png (beat gutter + "How a round works" + the four frames + beat gutter); prints overflow, errors, sizes, gutter weights.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,120))});
  await p.goto('http://localhost:8954/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id!=='now'){const m=id.match(/^([AB])-([abcd])(off)?$/);await p.addStyleTag({content:rd('../top4/_t4.css')});await p.addStyleTag({content:rd('../top5/_t5.css')});await p.addStyleTag({content:rd('_t6.css')});
   await p.evaluate(([t,l])=>{window.__T5S=3;window.__T6B=1;window.__T6F=t==='A'?2:1;window.__T6L=l;window.__T4auto=false},[m[1],m[2]]);await p.addScriptTag({content:rd('_t6.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('t5-ready'));await p.evaluate(s=>__t5.all(s),m[3]?'off':'on');}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.evaluate(()=>window.__t5&&__t5.place());
  await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed')x.style.visibility='hidden'});const st=document.createElement('style');st.textContent='body>[class^="x2p-cw"],body>div:has(>.x2p-cw-bug){visibility:hidden!important}';document.head.append(st)});
  await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));await p.waitForFunction(()=>[...document.querySelectorAll('.t4 img')].every(i=>i.complete));
  await p.evaluate(()=>{const v=document.querySelector('.t4-v');if(v)v.load()});await p.waitForTimeout(900);await p.evaluate(()=>window.__t5&&__t5.place());await p.waitForTimeout(400);
  const bot=await p.evaluate(()=>{const s=document.querySelector('.t4')||document.querySelector('section.x2o-bet');return Math.ceil(s.getBoundingClientRect().bottom+scrollY)+24});
  await p.screenshot({path:`${OUT}/top-${W}-${id}.png`,clip:{x:0,y:0,width:W,height:bot},fullPage:true});
  if(id!=='now'){const e2=await p.evaluate(()=>{const g=document.querySelectorAll('.t5-bg'),a=g[0].getBoundingClientRect(),z=g[1].getBoundingClientRect();return {y:a.top+scrollY-6,h:z.bottom-a.top+12}});await p.screenshot({path:`${OUT}/fr-${W}-${id}.png`,clip:{x:0,y:e2.y,width:W,height:e2.h},fullPage:true})}
  const m=await p.evaluate(()=>{const s=document.querySelector('.t4');if(!s)return {sw:document.documentElement.scrollWidth};const vw=innerWidth,clip=[];
    s.querySelectorAll('.t4-hw,.t4-ln,.t4-cap,.t5-sh').forEach(e=>{const r=e.getBoundingClientRect();if(r.left<-.5||r.right>vw+.5)clip.push(e.textContent.slice(0,20)+':'+Math.round(r.left)+'/'+Math.round(r.right));
      const f=e.closest('.t4-fr');if(f&&e.classList.contains('t5-sh')){const fr=f.getBoundingClientRect();if(r.right>fr.right+1)clip.push('sh past frame:'+e.textContent+' '+Math.round(r.right-fr.right))}});
    const fs=x=>parseFloat(getComputedStyle(x).fontSize);
    const bg=[...s.querySelectorAll('.t5-bg')].map(g=>{const r=g.getBoundingClientRect(),cs=getComputedStyle(g);return {h:Math.round(r.height),gap:Math.round(r.height+parseFloat(cs.marginTop)+parseFloat(cs.marginBottom)),w:Math.round(r.width)}});
    const frs=s.querySelector('.t4-frs'),gs=getComputedStyle(frs);
    return {sw:document.documentElement.scrollWidth,vw,clip,sz:{h1:fs(s.querySelector('.t4-hw0')),h2:fs(s.querySelector('.t4-b2 .t4-h2')),sub:fs(s.querySelector('.t5-sh')),ln:fs(s.querySelector('.t4-ln'))},beatGut:bg,frameGap:gs.rowGap+'/'+gs.columnGap,fgMarks:(s.querySelector('.t5-fg')||{}).childElementCount,subs:[...s.querySelectorAll('.t5-sh')].map(e=>e.textContent),lines:[...s.querySelectorAll('.t4-ln')].map(e=>e.textContent),data:window.__t5&&__t5.data,lc:[...s.querySelectorAll('.t4-ln')].map(e=>{const rg=document.createRange();rg.selectNodeContents(e);const ys=new Set([...rg.getClientRects()].filter(q=>q.width>1).map(q=>Math.round(q.top)));const k=e.querySelector('.t6-k');return {n:ys.size,fs:parseFloat(getComputedStyle(e).fontSize),w:Math.round(e.clientWidth),k1:k?Math.round(k.getBoundingClientRect().top)===Math.min(...ys):null}}),fit:{fs:s.dataset.t6fs,need:s.dataset.t6need,av:s.dataset.t6av,kw:s.dataset.t6kw}}});
  console.log(W,id,'errors:',er.length,JSON.stringify(m),er.slice(0,3).join('|')||'ok');await ctx.close()}
 await b.close()})();
