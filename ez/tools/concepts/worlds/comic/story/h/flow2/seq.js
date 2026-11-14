// node seq.js <width> <order> <outprefix> [states, default 0,1,1l,2,3,4,5] : take D's static states, the How a round works block only
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs'),path=require('path');
const PORT=process.env.PORT||8995;
(async()=>{const [W,O,out,ss]=process.argv.slice(2);const w=+W;const rd=f=>fs.readFileSync(path.join(__dirname,f),'utf8');
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:w,height:w<760?844:900},deviceScaleFactor:+(process.env.DPR||2)});
 const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
 await p.goto(`http://localhost:${PORT}/v46-live-x2plus.html`,{waitUntil:'load',timeout:150000});
 await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>[...document.images].forEach(i=>i.loading='eager'));
 await p.evaluate(o=>{window.__F2O=o},O);await p.addStyleTag({content:rd('_f2.css')+rd('D.css')+'\n'});await p.addScriptTag({content:rd('_f2.js')+rd('D.js')});
 await p.waitForFunction(()=>window.__f2done,null,{timeout:20000});await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(1200);await p.evaluate(()=>window.__f2place());
 await p.evaluate(()=>{[...document.body.querySelectorAll('*')].forEach(x=>{const ps=getComputedStyle(x).position;if(ps==='fixed'||ps==='sticky')x.style.visibility='hidden'})});
 await p.evaluate(()=>document.querySelector('.t4-b2').scrollIntoView({block:'start'}));await p.waitForTimeout(800);const res=[];
 for(const s of (ss||'0,1,1l,2,3,4,5').split(',')){await p.evaluate(s=>window.__f2seq(parseInt(s),/l$/.test(s)),s);await p.waitForTimeout(900);
  const r=await p.evaluate(()=>{const a=document.querySelector('.t4-b2').getBoundingClientRect();return {x:0,y:Math.max(0,a.top-10),width:innerWidth,height:Math.min(innerHeight,a.height+50)}});
  const chk=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cap:(()=>{const c=document.querySelector('.f2d-cap'),o=document.querySelector('.t4-frs').getBoundingClientRect(),q=c.getBoundingClientRect();return c.classList.contains('on')?{inside:q.left>=o.left-1&&q.right<=o.right+1&&q.top>=o.top-30&&q.bottom<=o.bottom+30}:null})()}));
  const f=`${out}-${s}.png`;await p.screenshot({path:f,clip:r});res.push({f,...chk})}
 console.log(JSON.stringify({w,O,res,er}));await b.close()})();
