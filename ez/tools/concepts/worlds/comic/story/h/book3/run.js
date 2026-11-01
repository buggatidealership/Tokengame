// node run.js <out> <takes now,r1,r2,r3,d2> [widths 390,1280] : mounts a book3 take over the built X3+ page; writes the full page
// (in screen-height slices plus a stitched long shot), frames at every hand-over (the gutter between two chapters in the middle
// of the screen), and audit.json (plain words outside the world, overflow, console errors).
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'now,r1,r2,r3').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);if(require.main===module)fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');const PORT=process.env.PORT||8971;
async function open(b,t,W,opt){const H=W<600?844:800;const ctx=await b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||1)},opt||{}));const p=await ctx.newPage();await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));
  await p.goto(`http://localhost:${PORT}/v47-live-x3plus.html`,{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur')&&document.querySelector('#wc-book .wc-cover'),null,{timeout:90000});
  await p.waitForTimeout(1500);
  if(t==='now'){await p.addStyleTag({content:rd('_b3.css')});await p.addScriptTag({content:rd('_b3.js')+';B3T.now={};B3.mount("now");document.documentElement.classList.remove("b3-on")'})}
  else{await p.addStyleTag({content:rd('_b3.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_b3.js')+';'+(t==='d2'?rd('r2.js'):'')+rd(t+'.js')+`;B3.mount(${JSON.stringify(t)})`})}
  await p.waitForFunction(()=>document.documentElement.classList.contains('b3-ready'),null,{timeout:20000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  // let lazy images in: walk the page once
  await p.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight*.8){scrollTo(0,y);await new Promise(r=>setTimeout(r,140))}scrollTo(0,0)});
  await p.waitForTimeout(1200);return {ctx,p,er,H}}
module.exports={open};
if(require.main===module)(async()=>{const b=await chromium.launch();const AUD={};
 for(const W of WS)for(const t of TS){if(t==='d2'&&W<900)continue;const {ctx,p,er,H}=await open(b,t,W,{deviceScaleFactor:+(process.env.DPR||(W<600?2:1))});
  const hand=await p.evaluate(()=>{const top=e=>e.getBoundingClientRect().top+scrollY;return [...document.querySelectorAll('#wc-book .b3-ch')].slice(1).map(s=>{const pv=s.closest('.b3-sp')||s;let a=pv.previousElementSibling;while(a&&/b3-br|b3-hand|pp-sr/.test(a.className))a=a.previousElementSibling;
    const br=pv.previousElementSibling&&/b3-br/.test(pv.previousElementSibling.className)?pv.previousElementSibling:null;
    return {ch:s.dataset.ch,y:br?top(br)+br.offsetHeight/2-innerHeight/2:top(pv)-innerHeight*.45}})});
  const sticky=t==='r3';
  for(const h of hand){const y=Math.max(0,Math.round(h.y+(sticky?H*.15:0)));await p.evaluate(y=>{scrollTo({top:y,behavior:'instant'});dispatchEvent(new Event('scroll'))},y);await p.waitForTimeout(900);
   await p.screenshot({path:`${OUT}/${t}-${W}-h${h.ch}.png`})}
  // the full page as screen slices (sticky takes can't be shot as one long image)
  const HH=await p.evaluate(()=>document.documentElement.scrollHeight);let i=0;
  for(let y=0;y<HH;y+=H){await p.evaluate(y=>{scrollTo({top:y,behavior:'instant'});dispatchEvent(new Event('scroll'))},y);await p.waitForTimeout(450);await p.screenshot({path:`${OUT}/${t}-${W}-s${String(i++).padStart(2,'0')}.png`})}
  const a=await p.evaluate(()=>Object.assign(B3.audit(),{nar:window.__b3}));a.err=er.slice(0,3);a.slices=i;AUD[t+'-'+W]=a;
  console.log(W,t,JSON.stringify(a));await ctx.close()}
 fs.writeFileSync(OUT+'/audit.json',JSON.stringify(AUD,null,1));await b.close()})();
