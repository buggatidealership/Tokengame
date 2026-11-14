// node run.js <out> <takes now,a,b,..> [widths 390,1280,320] [shots 78,57,51,p80,f78,m78]   (p = pending replay, f = front, m = mid-flip)
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('/home/user/Tokengame/ez/tools/concepts/live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),SH=(process.argv[5]||'78,57,51,p80').split(',');fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';const PORT=process.env.PORT||8951;
const GF='https://fonts.googleapis.com/css2?family=Bangers&family=Anton&family=Barlow+Condensed:wght@600;800&family=Shantell+Sans:wght@500;700;800&family=Special+Elite&display=block';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:860},deviceScaleFactor:W<600?2:1});const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))er.push(m.text())});
  for(const s of SH){const kind=s[0].match(/[pfm]/)?s[0]:'b',n=parseInt(s.replace(/^\D/,''));
   await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html?${Date.now()}#/round/${n}`,{waitUntil:'load',timeout:150000});
   await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#x2pRm .zlab'),null,{timeout:200000});await p.waitForTimeout(1500);
   if(t!=='now'){await p.addStyleTag({url:GF}).catch(()=>{});await p.addStyleTag({content:rd('_sb.css')+rd(t+'.css')});await p.addScriptTag({content:rd('../round/_r.js')+rd('_sb.js')+rd(t+'.js')})}
   let pre=false;if(t!=='now')pre=await p.evaluate(({t,n,pend})=>{try{SB.show(t,n,pend);return true}catch(e){return false}},{t,n,pend:kind==='p'});
   if(pre){await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(700)}
   if(kind!=='f'){await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');(c.querySelector('[data-flip]')||c).click()});await p.waitForTimeout(kind==='m'?(+process.env.MID||260):2000)}
   if(t!=='now'&&kind!=='f'&&!pre){await p.evaluate(({t,n,pend})=>SB.show(t,n,pend),{t,n,pend:kind==='p'});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(900)}
   if(kind!=='m')await p.evaluate(()=>{const c=document.querySelector('#x2pRm .card');const s=c&&c.querySelector('.sb');if(s&&!c.classList.contains('flipped')&&!c.querySelector('.face.front .sb'))0});
   await p.evaluate(()=>document.querySelectorAll('video').forEach(v=>{try{v.pause()}catch(e){}}));
   const m=await p.evaluate(()=>{const sb=document.querySelector('#x2pRm .sb');const R=sb&&sb.getBoundingClientRect();
     const ov=sb?[...sb.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&(r.right>R.right+1||r.left<R.left-1||r.bottom>R.bottom+1)&&!e.closest('.sb-bleed')}).map(e=>String(e.className.baseVal??e.className).slice(0,18)).slice(0,5):[];
     const clip=sb?[...sb.querySelectorAll('b,span,small,em')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').length:0;
     return {sw:document.documentElement.scrollWidth-innerWidth,win:R?Math.round(R.width)+'x'+Math.round(R.height):'-',ov,clip}});
   await p.screenshot({path:`${OUT}/${t}-${s}-${W}.png`});console.log(W,t,s,JSON.stringify(m),er.slice(0,2).join('|')||'ok');er.length=0}
  await ctx.close()}
 await b.close()})();
