// node run.js <out dir> <takes e.g. v1,v2,v3> [widths 390,1280,320]   env: RM=1 reduced motion, NOSHOT=1 checks only, DPR (default 2 under 600px, 1 above)
// Lays _v.css/_v.js and a take over the built X3+ page, then shoots the section at each of its five beats.
const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('../../../../live-r1/_fonts.js');const fs=require('fs');
const OUT=process.argv[2],TS=(process.argv[3]||'v1').split(','),WS=(process.argv[4]||'390,1280').split(',').map(Number);fs.mkdirSync(OUT,{recursive:true});
const rd=f=>fs.readFileSync(__dirname+'/'+f,'utf8');
(async()=>{const b=await chromium.launch();const res=[];
 for(const W of WS)for(const t of TS){const dpr=+(process.env.DPR||(W<600?2:1));
  const p=await b.newPage({viewport:{width:W,height:W<600?844:1000},deviceScaleFactor:dpr,reducedMotion:process.env.RM?'reduce':'no-preference'});await FONTS(p);
  const er=[];p.on('pageerror',e=>er.push(e.message));p.on('console',m=>{if(m.type()==='error')er.push('console:'+m.text().slice(0,140))});
  await p.goto('http://localhost:8914/v47-live-x3plus.html',{waitUntil:'load',timeout:150000});
  await p.waitForFunction(()=>document.documentElement.classList.contains('x2p-world')&&!document.documentElement.classList.contains('x2p-cur'),null,{timeout:90000});
  await p.waitForFunction(()=>document.querySelector('#wc-book .wc-lr .wc11d-pg'),null,{timeout:30000});
  await p.addStyleTag({content:rd('_v.css')+rd(t+'.css')});await p.addScriptTag({content:rd('_v.js')+rd(t+'.js')});
  await p.waitForFunction(()=>document.documentElement.classList.contains('vv-ready'),null,{timeout:30000});
  await p.waitForFunction(()=>document.fonts.status==='loaded');
  await p.addStyleTag({content:'.x2p-cw{display:none!important}'});
  await p.evaluate(()=>{const h=document.querySelector('header.top');if(h)h.style.visibility='hidden';[...document.body.querySelectorAll('*')].forEach(x=>{const c=getComputedStyle(x);if(c.position==='fixed'&&x.offsetHeight<140&&x.offsetHeight>0)x.style.visibility='hidden'})});
  await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-lr');scrollTo(0,s.getBoundingClientRect().top+scrollY-20)});await p.waitForTimeout(600);
  const lines=[];
  for(let i=0;i<5;i++){await p.evaluate(i=>window.__vvGo(i),i);await p.waitForTimeout(i===1?1800:700);
    const m=await p.evaluate(()=>{const s=document.querySelector('#wc-book .wc-lr'),r=s.getBoundingClientRect(),VW=innerWidth,root=document.querySelector('.vv-root');
      const cur=root.querySelector(`[data-vb="${root.dataset.cur}"]`);
      const vis=e=>{const c=getComputedStyle(e);return c.visibility!=='hidden'&&c.display!=='none'&&e.getClientRects().length};
      const out=[...s.querySelectorAll('*')].filter(e=>{const q=e.getBoundingClientRect();return q.width&&vis(e)&&!e.closest('[aria-hidden="true"][data-vb]')&&(q.right>VW+.5||q.left<-.5)}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,26)).slice(0,6);
      /* every visible piece of the current beat's picture stays inside its picture box */
      const pic=cur&&(cur.querySelector('[data-pic]')||cur.querySelector('.vv1-pic,.vv2-pic,.vv3-pic'))||cur;const pr=pic.getBoundingClientRect();
      const spill=[...pic.querySelectorAll('*')].filter(e=>{if(e.closest('svg')&&e.tagName!=='svg')return false;if(!vis(e))return false;const q=e.getBoundingClientRect();if(!q.width)return false;return q.left<pr.left-1||q.right>pr.right+1||q.top<pr.top-1||q.bottom>pr.bottom+1}).map(e=>String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className).slice(0,22)+':'+Math.round(Math.max(pr.left-e.getBoundingClientRect().left,e.getBoundingClientRect().right-pr.right,pr.top-e.getBoundingClientRect().top,e.getBoundingClientRect().bottom-pr.bottom))).slice(0,6);
      const clip=[...(cur||s).querySelectorAll('b,small,p,span,em')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').map(e=>e.className+':'+e.textContent.slice(0,16)).slice(0,5);
      return {sw:document.documentElement.scrollWidth,vw:VW,secH:Math.round(r.height),rootH:Math.round(root.getBoundingClientRect().height),out,spill,clip,y:r.top+scrollY}});
    lines.push(`  beat ${i+1}: secH=${m.secH} rootH=${m.rootH} sw=${m.sw}/${m.vw} out=${JSON.stringify(m.out)} spill=${JSON.stringify(m.spill)} clip=${JSON.stringify(m.clip)}`);
    if(!process.env.NOSHOT)await p.screenshot({path:`${OUT}/${t}-${W}-${i+1}.png`,clip:{x:0,y:m.y-4,width:W,height:m.secH+12},fullPage:true})}
  const line=`${W} ${t}${process.env.RM?' RM':''} ${er.join('|')||'no errors'}\n`+lines.join('\n');console.log(line);res.push(line);await p.close()}
 fs.writeFileSync(OUT+'/checks.txt',res.join('\n')+'\n',{flag:'a'});await b.close()})();
