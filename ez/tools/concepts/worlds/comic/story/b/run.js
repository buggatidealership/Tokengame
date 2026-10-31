// node run.js <out dir> <section: cliff|bet> <takes e.g. now,c1,c2,c3> [widths 390,1280]
// lays a take's CSS (b/<take>.css) and JS (b/<take>.js, which adds html.sb-ok-<take> when done) over the built X3+ and shoots one section
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],SEC=process.argv[3],TS=(process.argv[4]||'now').split(','),WS=(process.argv[5]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const SEL={cliff:'.wc-cliff',bet:'.wc-bet'}[SEC]||SEC;
const rd=f=>fs.existsSync(__dirname+'/'+f)?fs.readFileSync(__dirname+'/'+f,'utf8'):'';
(async()=>{const b=await chromium.launch();
 for(const W of WS)for(const t of TS){const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:2,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console: '+m.text())});
  await p.goto('http://localhost:8897/'+(process.env.PAGE||'v47-live-x3plus.html'),{waitUntil:'load'});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  const H=await p.evaluate(()=>document.documentElement.scrollHeight);for(let y=0;y<H;y+=500){await p.evaluate(y=>scrollTo(0,y),y);await p.waitForTimeout(40)}
  /* LEAD=<model>: a test of the leader changing (not real data): that model's P&L and the leader's swap places before the take builds */
  if(process.env.LEAD)await p.evaluate(m=>{const f=window.__x2pPnl;window.__x2pPnl=()=>{const r=f(),A={...r.A},top=Object.keys(A).sort((a,b)=>A[b].pnl-A[a].pnl)[0];
    if(top!==m){const x={...A[top]},y={...A[m]},t=x.pnl;x.pnl=y.pnl;y.pnl=t;A[top]=x;A[m]=y}return {...r,A}}},process.env.LEAD);
  if(t!=='now'){await p.addStyleTag({content:rd('_sb.css')+'\n'+rd(t+'.css')});await p.addScriptTag({content:rd('_sb.js')});await p.addScriptTag({content:rd(t+'.js')});
    await p.waitForFunction(t=>document.documentElement.classList.contains('sb-ok-'+t),t,{timeout:20000})}
  if(process.env.FAKE4)await p.evaluate(()=>window.__sbFake4&&window.__sbFake4());
  await p.waitForFunction(()=>document.fonts.status==='loaded');await p.waitForTimeout(+(process.env.WAIT||1200));
  await p.evaluate(s=>{const n=document.querySelector(s);scrollTo(0,n.getBoundingClientRect().top+scrollY-20)},SEL);await p.waitForTimeout(900);
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<120&&x.offsetHeight>0)x.style.visibility='hidden'})});
  const bb=await p.evaluate(s=>{const r=document.querySelector(s).getBoundingClientRect();return {x:r.left+scrollX,y:r.top+scrollY,width:r.width,height:r.height}},SEL);
  await p.screenshot({path:`${OUT}/${SEC}-${W}-${t}.png`,clip:{x:Math.max(0,bb.x-12),y:bb.y-8,width:Math.min(W-Math.max(0,bb.x-12),bb.width+24),height:Math.min(bb.height+16,5000)},fullPage:true});
  const ov=await p.evaluate(s=>{const out=[],root=document.querySelector(s);
    /* 1) text that runs past its own box (leaf elements of the take) */
    root.querySelectorAll('[class*="sb-"] *, [class*="sb-"]').forEach(e=>{if(e.closest('svg'))return;const cs=getComputedStyle(e);if(cs.display==='inline'||cs.display==='none')return;
      const leaf=![...e.children].some(c=>!/^(I|EM|SMALL|B|BR)$/.test(c.tagName)||getComputedStyle(c).display!=='inline');if(!e.classList.contains('wc-sr')&&leaf&&cs.textOverflow!=="ellipsis"&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+1)out.push('text:'+e.className+':'+e.textContent.trim().slice(0,18))});
    /* 2) anything in flow that leaves its card (ticket, or the take's own box) sideways */
    root.querySelectorAll('.wc-tnp,[data-sb-card]').forEach(t=>{const R=t.getBoundingClientRect();t.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e);if(cs.position==='absolute'||cs.position==='fixed'||e.closest('svg')||cs.display==='none'||e.closest('[aria-hidden="true"]'))return;const r=e.getBoundingClientRect();const o=Math.max(R.left-r.left,r.right-R.right);if(r.width&&o>1)out.push('box:'+(e.className.baseVal===undefined?e.className:'')+':'+e.textContent.trim().slice(0,18)+':'+o.toFixed(1)+'px')})});
    /* 3) labels marked data-sb-l: inside their data-sb-box, never on top of one another */
    root.querySelectorAll('[data-sb-box]').forEach(bx=>{const B=bx.getBoundingClientRect(),L=[...bx.querySelectorAll('[data-sb-l]')].map(e=>[e,e.getBoundingClientRect()]);
      L.forEach(([e,r],i)=>{if(e.scrollWidth>e.clientWidth+1)out.push('textlab:'+e.textContent.trim());if(r.left<B.left-.5||r.right>B.right+.5||r.top<B.top-.5||r.bottom>B.bottom+.5)out.push('outside:'+e.textContent.trim());
        L.slice(i+1).forEach(([f,q])=>{if(r.left<q.right-.5&&q.left<r.right-.5&&r.top<q.bottom-.5&&q.top<r.bottom-.5)out.push('overlap:'+e.textContent.trim()+'/'+f.textContent.trim())})})});
    return [...new Set(out)].slice(0,10)},SEL);
  const rm=process.env.RM?await p.evaluate(()=>document.getAnimations().filter(a=>{const e=a.effect&&a.effect.target;return e&&e.closest&&e.closest('[class*="sb-"]')&&a.playState==='running'}).map(a=>(a.animationName||a.transitionProperty||'anim')+'@'+a.effect.target.className).slice(0,5)):'';
  console.log(W,SEC,t,process.env.RM?'RM running:'+JSON.stringify(rm):'','sw',await p.evaluate(()=>document.documentElement.scrollWidth),'clipped',JSON.stringify(ov),er.join('|')||'ok');await p.close()}
 await b.close()})();
