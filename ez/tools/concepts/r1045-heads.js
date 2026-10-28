/* r1045: the section heads in the EZ. logo's language, the straps restyled to match, the standings strap smaller (owner, 2026-10-28).
   node r1045-heads.js [now,A,B,C,D,E] [390,320,1280] -> scratchpad/r1045/<id>-<w>-<rec|std|proof>.png + a JSON of measures */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const D=__dirname+'/r1045-heads/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1045/';fs.mkdirSync(S,{recursive:true});
const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
const GF='https://fonts.googleapis.com/css2?family=Kanit:ital,wght@1,600;1,700;1,800;1,900&family=Saira+Condensed:wght@600;700;800&display=swap';
(async()=>{const b=await chromium.launch();const ids=(process.argv[2]||'now,A,B,C,D,E').split(','),ws=(process.argv[3]||'390,320,1280').split(',').map(Number),out={};
 for(const id of ids)for(const w of ws){const dpr=w>760?1.5:3;const c=await b.newContext({viewport:{width:w,height:w>760?900:844},deviceScaleFactor:dpr,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await FONTS(p);
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load',timeout:90000}).catch(()=>{});
  await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});
  await p.addStyleTag({content:'html{scroll-behavior:auto!important}'});
  /* bring every section near so the page's own fitting has run before ours */
  for(const s of ['#record','#standings','#learn','#highlights','#x2pSt']){await p.evaluate(s=>document.querySelector(s).scrollIntoView(),s);await p.waitForTimeout(500)}
  await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
  if(id!=='now'){await p.evaluate(u=>new Promise(r=>{const l=document.createElement('link');l.rel='stylesheet';l.href=u;l.onload=r;l.onerror=r;document.head.appendChild(l)}),GF);
   await p.evaluate(rd(D+'_copy.js'));await p.evaluate(rd(D+'_base.js'));await p.addStyleTag({content:(id[0]==='M'?rd(D+'_base.css').split('\n').filter(l=>l.indexOf('.x2p-strap')<0).join('\n')+rd(D+'_m.css'):rd(D+'_base.css'))+rd(D+id+'.css')});if(rd(D+id+'.js'))await p.evaluate(rd(D+id+'.js'));}
  await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(800);if(id!=='now')await p.evaluate(()=>{window.H45&&H45.info()});
  await p.evaluate(rd(D+'_fit.js'));const fit=id==='now'?null:await p.evaluate(()=>window.__h45fit());await p.waitForTimeout(400);
  const m=await p.evaluate(()=>{const W=innerWidth,o={sw:document.documentElement.scrollWidth,secs:{}};const R=e=>{const r=e.getBoundingClientRect();return {l:+r.left.toFixed(1),r:+r.right.toFixed(1),t:+(r.top+scrollY).toFixed(1),b:+(r.bottom+scrollY).toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)}};
   const nl=l=>{const g=document.createRange();g.selectNodeContents(l);const t=[];[...g.getClientRects()].forEach(r=>{if(r.width&&!t.some(q=>Math.abs(q-r.top)<4))t.push(r.top)});return t.length};
   for(const s of ['#record','#standings','#learn','#highlights','#x2pSt','#get']){const sh=document.querySelector(s+' .sh');if(!sh)continue;const h=sh.querySelector('h2'),sp=sh.querySelector('.x2p-strap'),q={};
    q.h2=R(h);q.h2lines=nl(h);q.h2fs=getComputedStyle(h).fontSize;if(sp){q.strap=R(sp);q.lines=[...sp.querySelectorAll('li')].map(l=>nl(l));q.lifs=getComputedStyle(sp.querySelector('li')).fontSize;['::before','::after'].forEach(k=>{const c=getComputedStyle(sp,k);if(c.content!=='none'&&c.display!=='none'){const sr=sp.getBoundingClientRect();q[k]=[c.left,c.right,c.width]}});q.sr=[+sp.getBoundingClientRect().left.toFixed(1),+sp.getBoundingClientRect().right.toFixed(1)]}
    q.bad=[];sh.querySelectorAll('*').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>W+.5||r.left<-.5)q.bad.push('out '+(e.className||e.tagName))});o.secs[s]=q}
   const bd=document.querySelector('#standings .stx-roll')||document.querySelector('#standings .x2p-flip');const pt=document.querySelector('#learn .pt-cd')||document.querySelector('#learn .x2p-pt');
   o.board=bd&&R(bd);o.proof=pt&&R(pt);const ey=s=>R(document.querySelector(s+' .sh .tx'));o.gapStd=bd?+(o.board.t-o.secs['#standings'].h2.t).toFixed(1):null;o.gapProof=pt?+(o.proof.t-o.secs['#learn'].h2.t).toFixed(1):null;
   const ib=document.querySelector('#standings .x2p-flipbtn i');if(ib){const a=R(ib),hh=o.secs['#standings'].h2;o.info=a;o.infoOverH2=a.l<hh.r-1&&a.t<hh.b?'OVERLAP':'ok'}
   return o});
  out[id+'-'+w]={fit,m,errs};console.log(id,w,'sw',m.sw,'fit',JSON.stringify(fit),'gapStd',m.gapStd,'gapProof',m.gapProof,'board',m.board&&m.board.w+'x'+m.board.h,'proof',m.proof&&m.proof.w+'x'+m.proof.h,errs.join('|')||'ok');
  for(const s in m.secs){const q=m.secs[s];console.log('   ',s,'h2',q.h2fs,q.h2lines+'L',q.h2.l+'-'+q.h2.r,'strap',q.lifs,JSON.stringify(q.lines),'sr',JSON.stringify(q.sr),q['::after']?'aft '+q['::after']:'',q.bad.length?q.bad.join(','):'')}
  /* the three crops */
  const crops=await p.evaluate(()=>{const top=s=>{const e=document.querySelector(s+' .sh');return e.getBoundingClientRect().top+scrollY};const bot=e=>e.getBoundingClientRect().bottom+scrollY;
   const bd=document.querySelector('#standings .stx-roll')||document.querySelector('#standings .x2p-flip'),pt=document.querySelector('#learn .pt-cd')||document.querySelector('#learn .x2p-pt');
   return {rec:[top('#record'),bot(document.querySelector('#record .sh'))],std:[top('#standings'),bd.getBoundingClientRect().top+scrollY],proof:[top('#learn'),pt.getBoundingClientRect().top+scrollY]}});
  const hd=await p.evaluate(()=>{const h=document.querySelector('header');return h?h.getBoundingClientRect().height:0});
  for(const [k,[y0,y1]] of Object.entries(crops)){const extra=k==='rec'?22:(w>760?230:190);const H=Math.min((w>760?900:844)-hd-4,y1-y0+28+extra);
   await p.evaluate(y=>scrollTo(0,y),y0-hd-20);await p.waitForTimeout(500);
   const top=await p.evaluate(([s])=>document.querySelector(s+' .sh').getBoundingClientRect().top,[k==='rec'?'#record':k==='std'?'#standings':'#learn']);
   await p.screenshot({path:S+id+'-'+w+'-'+k+'.png',clip:{x:0,y:Math.max(0,top-28),width:w,height:H+12}})}
  await c.close()}
 fs.writeFileSync(S+'measure-'+ids.join('_')+'-'+ws.join('_')+'.json',JSON.stringify(out,null,1));await b.close()})();
