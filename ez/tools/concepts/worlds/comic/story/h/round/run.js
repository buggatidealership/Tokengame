// node run.js <out> <takes now,t1,..> [widths 390,1280] [shots 78f,78b,57b,80f,pf]
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),SH=(process.argv[5]||'78f,78b,57b,80f,pf').split(',');fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const PORT=process.env.PORT||8941;
const GF='https://fonts.googleapis.com/css2?family=Special+Elite&family=Bangers&family=Luckiest+Guy&family=Anton&family=Barlow+Condensed:wght@600;800&family=Shantell+Sans:wght@500;700;800&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:860},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  for(const s of SH){const n=parseInt(s)||80,side=(s.match(/^\d+([fb])/)||[0,'f'])[1],pend=s==='pf',w=s.match(/w-(.+)$/);
   const hn=pend?80:n;await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/round/${hn}`,{waitUntil:'load',timeout:150000});
   await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .zlab'),null,{timeout:120000});await p.waitForTimeout(1500);
   await p.evaluate(n=>{const l=document.querySelector('#x2pRm .zlab');window.__rhGrade={};window.__rhGrade[n]={ds:l.querySelector('.ds').textContent.trim(),gr:l.querySelector('.gr').textContent.trim()}},hn);
   if(t==='now'){if(side==='b'){await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(2200)}}
   else{await p.addStyleTag({url:GF}).catch(()=>{});await p.addStyleTag({content:rd('_r.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_r.js')+rd(t+'.js')});
    await p.evaluate(({n,side,pend,w})=>RHT.show(n,side==='b'?'back':'front',{pend,world:w&&w[1]}),{n,side,pend,w});
    await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200)}
   await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));
   const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,ov:[...document.querySelectorAll('#rh *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>innerWidth+1||r.left<-1)&&!e.closest('.rh-bleed')}).map(e=>String(e.className.baseVal??e.className).slice(0,20)).slice(0,4)}));
   await p.screenshot({path:`${OUT}/${t}-${s}-${W}.png`});console.log(W,t,s,JSON.stringify(m),er.slice(0,2).join('|')||'ok');er.length=0}
  await ctx.close()}
 await b.close()})();
