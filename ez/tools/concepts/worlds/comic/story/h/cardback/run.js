// node run.js <out> <takes now,a,b,c,d> [widths 390,1280] [rounds 64,80,51]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),RS=(process.argv[5]||'64,80,51').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8993,DPR=+process.env.DPR||0;
const GF='https://fonts.googleapis.com/css2?family=Bangers&family=Anton&family=Shantell+Sans:wght@500;600;700;800&display=block';
(async()=>{const b=await chromium.launch();const rep=[];
 for(const W of WS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:860},deviceScaleFactor:DPR||(W<600?2:1)});const p=await ctx.newPage();await FONTS(p);const er=[];
  p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  for(const n of RS){
   await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html?${Date.now()}#/round/${n}`,{waitUntil:'load',timeout:150000});
   await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .card .xc'),null,{timeout:200000});await p.waitForTimeout(1200);
   await p.addStyleTag({url:GF}).catch(()=>{});await p.addStyleTag({content:rd('cb.css')});await p.addScriptTag({content:rd('cb.js')});
   await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(1600);
   for(const t of TS){
    if(t!=='now'){await p.evaluate(({t,n})=>CB.show(t,n),{t,n});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500)}
    else await p.evaluate(()=>{const o=document.querySelector('#x2pRm .cb');if(o)o.remove();const f=document.querySelector('#x2pRm .fin.cb-on');f&&f.classList.remove('cb-on')});
    await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));
    const m=await p.evaluate(()=>{const o=document.querySelector('#x2pRm .cb');if(!o)return {};const P=o.querySelector('.cb-p').getBoundingClientRect();
      const bad=[];o.querySelectorAll('.cb-f').forEach(f=>{const R=f.getBoundingClientRect();f.querySelectorAll('*').forEach(e=>{if(e.closest('.cb-wt')||e.closest('svg'))return;const r=e.getBoundingClientRect();if(!r.width)return;
        if(r.right>R.right+1.5||r.left<R.left-1.5||r.bottom>R.bottom+1.5||r.top<R.top-1.5)bad.push((f.className.split(' ')[1]||'')+'>'+(e.className.baseVal??e.className)+':'+Math.round(Math.max(r.right-R.right,R.left-r.left,r.bottom-R.bottom,R.top-r.top)))});
        if(f.scrollWidth>f.clientWidth+1)bad.push('sw:'+f.className.split(' ')[1])});
      const fs=[...o.querySelectorAll('.cb-co,.cb-nm,.cb-tr,.cb-mv,.cb-pf,small,.cb-dt b,.cb-sl b,.cb-wn')].map(e=>parseFloat(getComputedStyle(e).fontSize)*(+document.querySelector('#x2pRm .x2p-rmz').style.zoom||1));
      const fam=new Set([...o.querySelectorAll('*')].filter(e=>e.childNodes.length&&[...e.childNodes].some(x=>x.nodeType===3&&x.textContent.trim())).map(e=>getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g,'')));
      return {plate:Math.round(P.width)+'x'+Math.round(P.height),minFont:Math.min(...fs).toFixed(1),fonts:[...fam].join('/'),bad:bad.slice(0,6),sw:document.documentElement.scrollWidth-innerWidth}});
    const f=`${OUT}/${t}-${n}-${W}.png`;await p.screenshot({path:f});
    if(process.env.CLOSE){const el=await p.$('#x2pRm .cb-p');if(el)await el.screenshot({path:`${OUT}/close-${t}-${n}-${W}.png`})}
    const line=[W,t,n,JSON.stringify(m),er.length?er.slice(0,2).join('|'):'ok'].join(' ');console.log(line);rep.push(line);er.length=0}}
  await ctx.close()}
 fs.writeFileSync(OUT+'/measure.txt',rep.join('\n'));await b.close()})();
