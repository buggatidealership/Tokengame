// node tiles-run.js <out> <takes k0,k1,k2,k3> [widths]  : the live X3+ "Every round so far" with the tile mockups laid over it (serve ez/ on :8941)
const R=require('../run.js');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const fs=require('fs');
const [OUT,T,WS]=[process.argv[2],process.argv[3].split(','),(process.argv[4]||'390,1280').split(',').map(Number)];
const B='tools/concepts/worlds/comic/story/h/ground3/tiles/img/';const NF={67:'n67-cat',71:'n71-sbux',75:'n75-coin',77:'n77-cvx',79:'n79-azn',80:'n80-xom'};
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();
for(const W of WS)for(const t of T){const {ctx,p,er}=await R.open(b,W,W<600?2:1);
 if(t!=='k0'){await p.addStyleTag({content:fs.readFileSync(__dirname+'/tiles.css','utf8')});
  await p.evaluate(([t,B,NF])=>{const h=document.documentElement;h.classList.add('tk-'+t.replace('n',''),'tk-n');window.__NF=[B,NF]},[t,B,NF])}
 const sec=await p.$('#wc-book .wc-season');await sec.scrollIntoViewIfNeeded();await p.waitForTimeout(2500);
 await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season');s.scrollIntoView();});await p.waitForTimeout(1500);
 if(t!=='k0')await p.evaluate(()=>{const [B,NF]=window.__NF;document.querySelectorAll('#wc-book .wc-season .wc-bi.hr-tile').forEach(a=>{const n=+(a.getAttribute('href')||'').replace(/\D/g,'');if(NF[n]){a.classList.add('tk-nf');const ar=a.querySelector('.hr-art');ar.style.backgroundImage=`url(${B}${NF[n]}.jpg)`;const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');x.drawImage(im,0,0,8,8);const d=x.getImageData(0,7,1,1).data;a.style.setProperty('--nfg',`rgb(${d[0]},${d[1]},${d[2]})`)};im.src=B+NF[n]+'.jpg'}})});
 await p.waitForTimeout(1500);
 const g=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-season .wc-bis');const r=s.getBoundingClientRect();return {x:r.left,y:r.top+scrollY,w:r.width,h:Math.min(r.height,innerWidth<600?1100:900),sw:document.documentElement.scrollWidth,vw:innerWidth}});
 await p.evaluate(y=>scrollTo(0,y-20),g.y);await p.waitForTimeout(900);const sy=await p.evaluate(()=>scrollY);
 await p.addStyleTag({content:'header.top{visibility:hidden!important}'});
 await p.screenshot({path:`${OUT}/tiles-${W}-${t}.png`,clip:{x:Math.max(0,g.x-8),y:g.y-sy-8,width:Math.min(W,g.w+16),height:g.h+16}});
 console.log(W,t,'sw',g.sw,'vw',g.vw,er.join('|')||'ok');await ctx.close()}
await b.close()})();
