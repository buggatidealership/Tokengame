/* r1041: the strip under the film as a breathing timeline in four new shapes (F film strip, B boarding pass, R receipt, S scorebug) and
   four live marks other than the antenna in the header pill (Plx lightbox, Pty tally, Pme meter, Pbg bug). node r1041.js [F,B,R,S] [Plx,Pty,Pme,Pbg] -> scratchpad/r1041/. */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');const FONTS=require('./live-r1/_fonts.js');
const EZ='/home/user/Tokengame/ez/',D=__dirname+'/r1041/',D9=__dirname+'/r1039/',D1=__dirname+'/live-r1/',D3=__dirname+'/live-r3/',D4=__dirname+'/live-r4/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/r1041/';
fs.mkdirSync(S,{recursive:true});const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
/* wed: today as the sheet has it (Wed 28 Oct 1:09 pm ET: 15 calls due); bell: Fri 23 Oct 2:51 pm ET with R43 to R45 back to calls in;
   sat: Sat 24 Oct, off air */
const MOMENTS={wed:['2026-10-28T17:09:00Z',null],bell:['2026-10-23T18:51:00Z',[43,44,45]],sat:['2026-10-24T15:00:00Z',null]};
async function open(b,w,m,h){const ctx=await b.newContext({viewport:{width:w,height:h||844},deviceScaleFactor:2,timezoneId:'America/New_York',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;await FONTS(p);const M=MOMENTS[m];await p.clock.setFixedTime(new Date(M[0]));
 await p.route(/ez-data\.js/,r=>{let s=fs.readFileSync(EZ+'ez-data.js','utf8');if(M[1])s=s.replace('\nbuild(SHEET_HEADER,SHEET);','\nSHEET.forEach(function(r){if('+JSON.stringify(M[1])+'.indexOf(+r[0])>-1)r[12]=""});\nbuild(SHEET_HEADER,SHEET);');r.fulfill({contentType:'application/javascript',body:s})});
 await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForFunction(()=>!document.documentElement.classList.contains('x2p-cur'),null,{timeout:40000});await p.waitForTimeout(3500);
 await p.evaluate(rd(D1+'_model.js'));return p}
async function inject(p,opts,pill){const css=rd(D3+'_r2.css')+rd(D+'_d.css')+(pill?rd(D+'_p.css'):'')+opts.map(o=>rd(D+o+'.css')).join('\n'),js=[rd(D1+'_common.js'),rd(D3+'_state.js'),rd(D3+'_logos.js'),rd(D4+'_lv4.js'),rd(D+'_d.js')].concat(opts.map(o=>rd(D+o+'.js'))).join('\n');
 await p.evaluate(([css,js])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);(0,eval)(js)},[css,js]);await p.waitForTimeout(700)}
async function measure(p){return p.evaluate(()=>{const W=innerWidth,o={sw:document.documentElement.scrollWidth,bad:[]};
 document.querySelectorAll('.q41 *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.right>W+.5||r.left<-.5)o.bad.push('out '+e.className);if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')o.bad.push('clip '+e.className)});
 const m=document.querySelector('.q41'),f=document.querySelector('.x2p-vt'),y=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null,yb=e=>e?Math.round(e.getBoundingClientRect().bottom+scrollY):null;
 Object.assign(o,{film:[y(f),yb(f)],mod:[y(m),yb(m)]});return o})}
(async()=>{const b=await chromium.launch();const L=(process.argv[2]||'F,B,R,S').split(',').filter(x=>x&&x!=='none'),P=(process.argv[3]||'Plx,Pty,Pme,Pbg').split(',').filter(x=>x&&x!=='none');
 for(const opt of L)for(const [w,m] of [[390,'wed'],[390,'bell'],[390,'sat'],[320,'wed'],[1280,'wed']]){const p=await open(b,w,m,w>760?900:844);await inject(p,[opt]);const r=await measure(p);
  await p.evaluate(()=>{const f=document.querySelector('.x2p-vt');f.scrollIntoView({block:'start'});scrollBy(0,-12)});await p.waitForTimeout(300);
  const box=await p.evaluate(()=>{const f=document.querySelector('.x2p-vt').getBoundingClientRect(),m=document.querySelector('.q41').getBoundingClientRect();return {y:f.top-12,h:m.bottom-f.top+28}});
  await p.screenshot({path:S+opt+'-'+m+'-'+w+'.png',clip:{x:0,y:Math.max(0,box.y),width:w,height:Math.min(box.h,(w>760?900:844)-Math.max(0,box.y))}});
  console.log(opt,m,w,JSON.stringify(r),p.errs.join('|'));await p.context().close()}
 for(const opt of P)for(const [w,m] of (process.env.PW?[[390,'wed']]:[[390,'wed'],[390,'bell'],[390,'sat'],[320,'wed'],[1280,'wed']])){const p=await open(b,w,m,w>760?900:844);await inject(p,[opt],1);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
  const r=await p.evaluate(()=>{const c=document.querySelector('#liveChip'),R=c.getBoundingClientRect(),o={w:Math.round(R.width),h:Math.round(R.height),sw:document.documentElement.scrollWidth,hit:[]};
   const kids=[...c.querySelectorAll('*')].map(e=>e.getBoundingClientRect()).filter(x=>x.width);const L=Math.min(...kids.map(x=>x.left)),Rr=Math.max(...kids.map(x=>x.right)),T=Math.min(...kids.map(x=>x.top)),B=Math.max(...kids.map(x=>x.bottom));
   document.querySelectorAll('header .brand, header .x2p-xhd, header .nav a').forEach(e=>{const q=e.getBoundingClientRect();if(q.width&&q.right>L&&q.left<Rr&&q.bottom>T&&q.top<B)o.hit.push(e.className||e.tagName)});
   const hd=document.querySelector('header').getBoundingClientRect();o.hdr=Math.round(hd.height);return o});
  await p.screenshot({path:S+opt+'-'+m+'-'+w+'.png',clip:{x:0,y:0,width:w,height:Math.min(140,r.hdr+8)}});console.log(opt,m,w,JSON.stringify(r),p.errs.join('|')||'ok');await p.context().close()}
 await b.close()})();
