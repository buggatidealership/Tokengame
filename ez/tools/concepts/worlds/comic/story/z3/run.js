// node run.js <out dir> [widths 390,1280,320]   env: RM=1 reduced motion, NOSHOT=1 checks only, TODAY=1 shoot today's page
// Lays z3.css/z3.js over the built X3+ page and shoots the whole Overview (header kept).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],WS=(process.argv[3]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();
 for(const W of WS){const dpr=+(process.env.DPR||2);
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,160))});
  await p.goto('http://localhost:8918/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  if(!process.env.TODAY){await p.addStyleTag({content:rd('z3.css')});await p.addScriptTag({content:rd('z3.js')});
   await p.waitForFunction(()=>document.documentElement.classList.contains('z3-ready'),null,{timeout:30000})}
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(600);await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=400){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(350)}
  await p.evaluate(()=>document.querySelectorAll('#z3 .z3-fork,#z3 .z3-trk').forEach(e=>e.classList.add('z3-go')));await p.waitForTimeout(5200);await p.evaluate(()=>{scrollTo(0,0);[...document.body.querySelectorAll('*')].forEach(x=>{if(getComputedStyle(x).position==='fixed'&&!x.closest('header'))x.style.visibility='hidden'})});await p.waitForTimeout(500);
  const m=await p.evaluate(()=>{const z=document.querySelector('#z3');if(!z)return {};const VW=innerWidth;
    const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&e.getClientRects().length};
    const out=[...z.querySelectorAll('*')].filter(e=>{if(e.closest('svg')&&e.tagName!=='svg')return false;const q=e.getBoundingClientRect();return q.width&&vis(e)&&(q.right>VW+.5||q.left<-.5)}).map(e=>String(e.className.baseVal??e.className).slice(0,30)).slice(0,8);
    const clip=[...z.querySelectorAll('b,small,span,p,em,figcaption')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+1&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).map(e=>e.className+':'+e.textContent.slice(0,18)).slice(0,8);
    /* text that sticks out of its tile or panel */
    const box=[...z.querySelectorAll('.z3-tc,.z3-gr,.z3-lt,.z3-sbp,.z3-bgp,.z3-card')];const spill=[];box.forEach(bx=>{const r=bx.getBoundingClientRect();bx.querySelectorAll('b,small,span,p,em').forEach(e=>{if(!vis(e)||e.closest('.z3-fc'))return;const q=e.getBoundingClientRect();if(!q.width)return;if(q.left<r.left-1||q.right>r.right+1||q.bottom>r.bottom+1)spill.push(String(e.className).slice(0,16)+':'+e.textContent.slice(0,14))})});
    return {sw:document.documentElement.scrollWidth,vw:VW,h:document.documentElement.scrollHeight,out,clip,spill:spill.slice(0,10),film:!!z.querySelector('.z3-scr video'),y:z.getBoundingClientRect().top+scrollY}});
  console.log(W,process.env.RM?'RM':'',JSON.stringify(m),er.join(' | ')||'no errors');
  if(!process.env.NOSHOT)await p.screenshot({path:`${OUT}/${process.env.TODAY?'today':'z3'}-${W}.png`,fullPage:true});
  await p.close()}
 await b.close()})();
