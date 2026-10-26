/* live-r5: the season under the film (owner, 2026-10-26: "Season 1, week number... I like the progression bar... but I don't like the
   design"; "what's coming up"; Season 2 as Season 1 nears its end), headline copy for pump.fun traders and the headline's look.
     node live-r5.js season [S1..S6]   -> scratchpad/lv5/s-*.png   (moments: mon = today, late = Mon Nov 16, simulated counts)
     node live-r5.js copy               -> scratchpad/lv5/c-*.png
     node live-r5.js type [T1..T6]      -> scratchpad/lv5/t-*.png */
const fs=require('fs');const {chromium}=require('/opt/node22/lib/node_modules/playwright');
const FONTS=require('./live-r1/_fonts.js');
const EZ='/home/user/Tokengame/ez/',D=__dirname+'/live-r5/',D1=__dirname+'/live-r1/',D3=__dirname+'/live-r3/',D4=__dirname+'/live-r4/',S='/tmp/claude-0/-home-user-Tokengame/49afce95-8870-516a-9c3b-e2b261d2a0d8/scratchpad/lv5/';
fs.mkdirSync(S,{recursive:true});
const MOMENTS={mon:'2026-10-26T17:09:00Z',late:'2026-11-16T17:09:00Z'};
const rd=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
async function open(b,w,m,h){const ctx=await b.newContext({viewport:{width:w,height:h||844},deviceScaleFactor:2,timezoneId:'America/New_York',reducedMotion:'reduce'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.errs=errs;await FONTS(p);await p.clock.setFixedTime(new Date(MOMENTS[m]));
  await p.goto('http://127.0.0.1:8897/v46-live-x2plus.html',{waitUntil:'load'});await p.waitForTimeout(5200);await p.evaluate(rd(D1+'_model.js'));
  if(m==='late')await p.evaluate(()=>{window.__S5SIM=1});return p}
async function inject(p,opt,extraCss){const css=rd(D1+'_common.css')+rd(D3+'_r2.css')+rd(D+'_s5.css')+rd(D+opt+'.css')+(extraCss||''),
  js=[rd(D1+'_common.js'),rd(D3+'_state.js'),rd(D3+'_logos.js'),rd(D4+'_lv4.js'),rd(D+'_s5.js'),rd(D+opt+'.js')].join('\n');
  await p.evaluate(([css,js])=>{const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);(0,eval)(js)},[css,js]);await p.waitForTimeout(900)}
async function measure(p){return p.evaluate(()=>{const W=innerWidth,o={sw:document.documentElement.scrollWidth,W,bad:[]};
  document.querySelectorAll('.lv5 *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;if(r.left<-0.5||r.right>W+0.5)o.bad.push('out '+e.className+' '+Math.round(r.left)+'..'+Math.round(r.right));
    if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')o.bad.push('clip '+(e.className||e.tagName)+' '+e.scrollWidth+'>'+e.clientWidth)});
  /* siblings that overlap inside the module's rows */
  const m=document.querySelector('.lv5'),f=document.querySelector('.x2p-vt'),h=document.querySelector('h1');const y=e=>e?Math.round(e.getBoundingClientRect().top+scrollY):null,yb=e=>e?Math.round(e.getBoundingClientRect().bottom+scrollY):null;
  Object.assign(o,{h1:[y(h),yb(h)],film:[y(f),yb(f)],mod:[y(m),yb(m)]});return o})}
(async()=>{const mode=process.argv[2]||'season',only=process.argv[3];const b=await chromium.launch();
 if(mode==='season'){for(const opt of ['S1','S2','S3','S4','S5','S6']){if(only&&opt!==only)continue;
   await Promise.all([[390,'mon'],[390,'late'],[320,'mon'],[320,'late'],[1280,'mon']].map(async([w,m])=>{
     const p=await open(b,w,m,w>760?900:844);await inject(p,opt);const r=await measure(p);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
     await p.screenshot({path:S+'s-'+opt+'-'+m+'-'+w+'.png'});console.log(opt,m,w,JSON.stringify(r),p.errs.join('|'));await p.context().close()}))}}
 if(mode==='copy'||mode==='type'){const spec=require(D+(mode==='copy'?'_copy.js':'_type.js'));
   for(const k of Object.keys(spec)){if(only&&k!==only)continue;
     await Promise.all([[390,'mon'],[320,'mon'],[1280,'mon']].map(async([w,m])=>{const p=await open(b,w,m,w>760?900:844);
       await p.evaluate(([html,css,fonts,nofit])=>{if(fonts){const l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+fonts+'&display=swap';document.head.appendChild(l)}
         const st=document.createElement('style');st.textContent=css||'';document.head.appendChild(st);const h=document.querySelector('h1');if(html)h.innerHTML=html;h.classList.add('lvh');if(nofit)h.classList.add('nofit')},[spec[k].html,spec[k].css,spec[k].fonts,spec[k].nofit]);
       await p.waitForTimeout(1500);
       const fs2=await p.evaluate(()=>{const h=document.querySelector('h1');const P=h.parentElement,cs=getComputedStyle(P),T=P.clientWidth-parseFloat(cs.paddingLeft)-parseFloat(cs.paddingRight);
         if(!h.classList.contains('nofit')){h.style.setProperty('white-space','nowrap','important');h.style.setProperty('width','max-content','important');h.style.setProperty('max-width','none','important');let f=parseFloat(getComputedStyle(h).fontSize);const f0=f;
         while(h.getBoundingClientRect().width>T+.5&&f>18){f-=.5;h.style.setProperty('font-size',f+'px','important')}return f0+'>'+f}return 'nofit'});
       const r=await measure(p);await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(300);
       await p.screenshot({path:S+(mode==='copy'?'c-':'t-')+k+'-'+w+'.png'});console.log(k,w,fs2,JSON.stringify({h1:r.h1,film:r.film,sw:r.sw}),p.errs.join('|'));await p.context().close()}))}}
 await b.close()})();
