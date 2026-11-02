// node run.js <out> <ids e.g. A-L,A-T,B-L,now> [widths 390,1280] [dpr 2] : serve ez/ on 8973 first. Lays _r8.css + _r8.js over the built v46-live-x2plus.html,
// shoots #record (sec-<W>-<id>.png), prints tests (cap heights of live words, image source px vs 3x, sideways scroll, overflow, errors, a tap opens the round).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],IDS=(process.argv[3]||'A-L').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number),DPR=+(process.argv[5]||2);fs.mkdirSync(OUT,{recursive:true});
const IM='tools/concepts/worlds/comic/story/h/rounds8/img/web/';
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res={};
 for(const W of WS)for(const id of IDS){const ctx=await b.newContext({viewport:{width:W,height:W<600?844:900},deviceScaleFactor:DPR,reducedMotion:'reduce'});const p=await ctx.newPage();await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('c:'+m.text().slice(0,140))});
  await p.goto('http://127.0.0.1:8973/v46-live-x2plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(800);
  if(id!=='now'){const [t,h0]=id.split('-'),h=h0.replace('+','');await p.addStyleTag({content:rd('_r8.css').replace(/__IM__/g,IM)});await p.evaluate(([t,h])=>{window.__R8=t;window.__R8H=h},[t,h]);await p.addScriptTag({content:rd('_r8.js')});await p.waitForFunction(()=>document.querySelector('.r8'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.evaluate(()=>{document.querySelectorAll('#record img').forEach(i=>{i.loading='eager'});document.getElementById('record').scrollIntoView()});
  await p.waitForTimeout(500);await p.evaluate(()=>window.__r8&&window.__r8.render());if(id.includes('+'))await p.evaluate(()=>document.querySelector('.r8 .r8-more').click());
  await p.waitForFunction(()=>[...document.querySelectorAll('#record .r8 img')].every(i=>i.complete),null,{timeout:60000}).catch(()=>{});await p.evaluate(()=>Promise.all([...document.querySelectorAll('#record .r8 img')].map(i=>i.decode().catch(()=>{}))));await p.waitForTimeout(1500);
  await p.addStyleTag({content:'body>div:has(>.x2p-cw-bug){display:none!important}'});await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const s=getComputedStyle(x).position;if(s==='fixed'||s==='sticky')x.style.setProperty('display','none','important')})});
  const box=await p.evaluate(()=>{const s=document.querySelector('#record .r8')||document.querySelector('#record .r6'),r=s.getBoundingClientRect();return {y:r.top+scrollY-12,h:r.height+24}});
  await p.screenshot({path:`${OUT}/sec-${W}-${id}.png`,clip:{x:0,y:box.y,width:W,height:Math.min(box.h,9000)},fullPage:true});
  const m=await p.evaluate(()=>{const R=document.querySelector('.r8');const out={sw:document.documentElement.scrollWidth,vw:innerWidth,secH:R?Math.round(R.getBoundingClientRect().height):0,small:[],imgs:[],trim:[],over:[]};if(!R)return out;
    const cv=document.createElement('canvas').getContext('2d');
    R.querySelectorAll('b,i,em,span,p').forEach(e=>{if(![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const cs=getComputedStyle(e);if(cs.display==='none'||!e.offsetParent)return;
      cv.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const cap=cv.measureText('H').actualBoundingBoxAscent;const t=[...e.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent).join('').trim();out.small.push([+cap.toFixed(2),t.slice(0,30)]);if(t.endsWith('…'))out.trim.push(t)});
    out.small.sort((a,b)=>a[0]-b[0]);out.minCap=out.small.slice(0,4);out.under9=out.small.filter(c=>c[0]<9).length;out.nText=out.small.length;delete out.small;
    /* overflow: any text box sticking out of its link or card */
    R.querySelectorAll('a.r8-it,a.r8-hero,.r8-more').forEach(a=>{const ar=a.getBoundingClientRect();a.querySelectorAll('b,span,em,i').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>ar.right+1.5||r.left<ar.left-1.5||r.bottom>ar.bottom+1.5)out.over.push((e.textContent||e.className).slice(0,24)+' '+Math.round(Math.max(r.right-ar.right,ar.left-r.left,r.bottom-ar.bottom)))})});
    const seen=new Set();R.querySelectorAll('img').forEach(i=>{const r=i.getBoundingClientRect(),k=i.src.split('/').pop().replace(/r\d+/,'rN');if(!r.width||seen.has(k))return;seen.add(k);out.imgs.push({f:k,cssW:+r.width.toFixed(1),srcW:i.naturalWidth,x3:i.naturalWidth>=r.width*3})});
    out.dead=[...R.querySelectorAll('a.r8-it')].slice(0,1).map(a=>Math.round(a.getBoundingClientRect().height));
    out.links=R.querySelectorAll('a').length;out.items=R.querySelectorAll('.r8-list>li').length;out.moreTxt=(R.querySelector('.r8-more')||{}).textContent;out.hero=window.__r8&&window.__r8.hero;out.top=window.__r8&&window.__r8.top&&{n:window.__r8.top.r.n,v:window.__r8.top.v,who:window.__r8.top.who};
    return out});
  if(id!=='now'&&W===390&&/-L/.test(id)){const a=await p.$('.r8 a[href^="#/round/"]');if(a){const href=await a.getAttribute('href');await a.click({force:true});await p.waitForTimeout(1500);m.tap={href,hash:await p.evaluate(()=>location.hash),slab:await p.evaluate(()=>{const e=document.getElementById('x2pRm');return !!e&&getComputedStyle(e).display!=='none'&&e.getBoundingClientRect().height>50})}}}
  m.errors=er;res[W+'-'+id]=m;console.log(W,id,JSON.stringify(m));await ctx.close()}
 fs.writeFileSync(OUT+'/measure-'+IDS.join('')+'-'+WS.join('_')+'.json',JSON.stringify(res,null,1));await b.close()})();
